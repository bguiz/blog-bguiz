---
comments: true
title: Long-lived Models in Single Page Apps
date: '2013-09-02T09:02+11:00'
originalUrl: http://blog.bguiz.com/post/60018947047/long-lived-models-in-single-page-apps
permalink: /post/60018947047/long-lived-models-in-single-page-apps/
tags: [javascript, memory, memory leak, MVC, single page app, backbonejs, backbone relational, identity map, blog]
---

<p>In single page applications (SPAs), when the users navigates from one &#8220;page&#8221; to another, what the browser really does is stay to on the same page, and use Javascript to re-render most of the DOM. No further HTTP requests are made by the browser to obtain a new HTML page, instead Javascript (usually  the SPA framework) loads more data in the form of JSON, and more Javascript (usually the templating engine or the SPA framework) re-renders this as new DOM, replacing the old DOM. More Javascript - the SPA framework&#8217;s routing component - will also update the URL, using hash fragments, or the history API.</p>

<p>All this used to be done purely using the browser, and it would load a new HTML page, with a new HTTP request and response per navigation. Why use Javascript to do all this instead; after all, is it not more work?</p>

<ul><li>No &#8220;flash&#8221; in between page navigations</li>
<li>Reduce bandwidth of HTTP protocol overhead</li>
<li>Most importantly: Not all of the DOM changes between each &#8220;page&#8221;, so we only need to update the parts that need to change</li>
</ul><p>Yes, doing so is indeed more work - but most of it is cookie cutter stuff, and is taken care of by your SPA framework of choice. However, one area - managing model state - is not as simple to do. Here we shall take a look at the decisions involved in managing long-lived model state; that is, ways to maintain model state when navigating between pages, and keeping them in sync with changes on the server.</p>

<h2>Impact on Models</h2>

<p>Most SPA frameworks are MV∗ frameworks. I have previously mentioned them in my post on <a href="http://bguiz.com/post/57373805814/accessors-vs-dirty-checking-in-javascript-frameworks" target="_blank">Accessors vs Dirty Checking in Javascript Frameworks</a> (check out that section if you have yet to).</p>

<p>One thing that all MV∗ SPA frameworks have in common is that they all need use Models to represent data. Managing the state of these models is one of the problems which MV∗ SPA frameworks have to solve. Implementations of how this is done vary significantly, and they all generally do a good job of it. One area, however, that I have found lacking amongst them, in managing model state, is that they generally do not provide a mechanism to manage long-lived model state baked into the framework - and one needs to roll their own mechanism to accomplish this.</p>

<p>This post will explore this in greater depth; including some strategies used to keep model state on the client in sync with the data backing that model on the server; and also discuss the additional considerations that arise from maintaining this state across page navigation.</p>

<h2>Two Decisions</h2>

<p>When are models fetched?</p>

<ul><li>fetch model once per navigation</li>
<li>fetch model on first navigation only</li>
</ul><p>When are subscription to changes on models reset?</p>

<ul><li>subscriptions reset per navigation</li>
<li>subscriptions on first navigation only</li>
</ul><p>Ultimately these decisions should be made upon expectations that users have towards the user interface, and user expectations of how it should behave. These expectations have changed somewhat in the domain of web applications.</p>

<h3>The lead up to present day SPAs</h3>

<p>When the models views and controllers exist purely server side, as they did in traditional web sites, all the rendering was done server side, and both of these decisions were made for you. Essentially you didn&#8217;t have subscriptions, so the models displayed on the page were only current at the point of time when the page was loaded. Since all the rendering was done server side, the client did not have to care about when the models were fetched either - one could assume that it was done upon each page navigation.</p>

<p>Enter Web 2.0, when the phrase &#8220;AJAX&#8221; was as hot a buzzword as &#8220;cloud&#8221; is presently. Using client side Javascript, one could poll the server to see if any data should be updated, and if so, the relevant section of the DOM would be re-rendered.</p>

<p>One would now be using techniques such as long polling - no web sockets yet - to ask the server to notify the client when there had been changes to a model on the server. Whenever the server &#8220;pushes&#8221; such an incremental change to the client, the client updates its view of that model accordingly. These were the precursors to todays SPA frameworks.</p>

<p>At this stage one still could put off making either of these decisions. Since each navigation completely refreshes the page, model are still re-fetched, and subscriptions would have to be reset upon each navigation anyway.</p>

<p>Presently, we have single page applications, and as the name suggests, the entire app lives in a single page. Each time we navigate from one page to another, one has the freedom to decide whether to re-fetch the models from the server. One also has the freedom to decide whether to reset the subscriptions to changes on these models.</p>

<p>Let us represent the permutations of these decisions using a four-quadrant diagram:</p>

<pre><code>
fetch model once per navigation        |      fetch model once per navigation
subscriptions reset per navigation     |      subscriptions on first navigation only
                                     Q1|Q2
-----------------------------------------------------------------------------------
                                     Q3|Q4
fetch model on first navigation only   |      fetch model on first navigation only
subscriptions reset per navigation     |      subscriptions on first navigation only
</code></pre>

<p>From this it is evident that once we start using a SPA framework, we need to start thinking hard about the implications of long lived model state.</p>

<p>Inherent in this is an overarching theme of considering the memory footprint that each approach would require, and ways in which this can be managed. However in light of keeping this post focused, these will be briefly outlined in the footnotes<sup>1</sup>, and perhaps will be discussed in greater detail in a follow up post.</p>

<h2>Techniques</h2>

<h3>The Ol&#8217; Fashioned</h3>

<p>With reference to the diagram above, <code>Quadrant 1</code> is the easiest to implement. In fact doing this would be effectively no additional effort required above what a traditional web site or a <em>Web 2.0</em> site would do. Upon each page navigation, always request the model displayed by the page again, even if that model is currently in memory. Also, upon each page navigation, always reset the subscriptions to changes in the models. This will ensure that the models displayed on each page are always up to date.</p>

<p>When should this be done? The first, or stop-gap fix, when considering adding long-lived model state to a SPA for the first time. Chances are, that if this is the case, your app will display model state correctly most of the time, but there will be a few edge cases where they are not. Thus removing these edge cases will be the first port of call.</p>

<p>Indeed, discovering that this was occurring in an app I was working on was what prompted me to write this post.</p>

<p>This often happens unintentionally - as was the case for me - when one uses frameworks or libraries that do things behind the scenes that one would not explicitly consider. In my case, I was using BackboneJS with <a href="http://backbonerelational.org" target="_blank">Backbone Relational</a>. When these are used together, BackboneJS makes a REST-ful HTTP request (a <code>GET</code>) to the URL as defined by the <code>url</code> property of the <code>Backbone.Model</code>. Backbone Relational sits on top of this, and intercepts this request, if the model is a <code>Backbone.RelationalModel</code>, as was the case in all of our models. One of the things that Backbone relational does is provide an <a href="http://martinfowler.com/eaaCatalog/identityMap.html" target="_blank">identity map</a>. In a nutshell, it uses an ID-to-object hash to cache instances of subclasses of <code>Backbone.RelationalModel</code>. If a Model with a particular ID had been previously fetched, the cached instance would simply be re-used, rather than doing another <code>HTTP GET</code> for it.</p>

<p>While this is exactly what you want to happen in the default case, when managing long-lived model state, it is imperative to consider the implications when combined with the subscription strategy. Subscriptions here refer to the client, the single page application, listening to (subscribing to), changes in the state of models on the server.</p>

<p>This is best illustrated with a timeline:</p>

<ul><li>Fresh page load on home page</li>
<li>No instances of <code>Food</code> loaded</li>
<li>User navigates to <code>#/food/123</code></li>
<li>The page subscribes to updates on <code>Food</code> with an ID of <code>123</code></li>
<li>This page has a view which needs to display a model of </li>
<li>The Backbone Relational identity map (cache) is queried for <code>Food</code> with ID of <code>123</code>. No results are returned, so a request is is made: <code>HTTP GET /api/v1/food/123</code></li>
<li>A JSON object is returned: <code>{"id":123,"name":"Sandwich"}</code>. Backbone relational stores this is its identity map (cache)</li>
<li>The page renders <code>Sandwich</code> somewhere in the view</li>
<li>The user navigates to <code>#/clothes/456</code></li>
<li>The page resets its subscriptions, including clearing its subscriptions to updates on <code>Food</code> with an ID of <code>123</code></li>
<li>While the user is looking at this clothes page, an external events causes the data backing the model <code>Food</code> with an ID of <code>123</code> to be updated. Its <code>name</code> is now <code>Chicken Sandwich</code></li>
<li>Because the client is no longer subscribed to updates for this model, this delta does not get pushed to it</li>
<li>The user presses the back button, and navigating back to <code>#/food/123</code></li>
<li>The page subscribes to updates on <code>Food</code> with an ID of <code>123</code> (but it is too late now)</li>
<li>The Backbone Relational identity map (cache) is queried for <code>Food</code> with ID of <code>123</code>. The cached result <code>{"id":123,"name":"Sandwich"}</code> is returned.</li>
<li>The page incorrectly renders <code>Sandwich</code> (instead of <code>Chicken Sandwich</code>) somewhere in the view</li>
</ul><p>This serves to point out two things:</p>

<ul><li>Deciding when models are fetched or re-fetched must be thought of <strong>in conjunction with</strong> deciding when subscriptions to updates on these models are subscribed and unsubscribed.</li>
<li>User expectations have changed. In a traditional web site, when the user presses the back button, it is completely OK to display the old and out-of-date data. It is OK for a refresh of the page to display something different compared to before the refresh. Now however, web sites are no more - web apps are where it is at. One of the expectations of a web app is for the data displayed to be &#8220;live&#8221;.</li>
</ul><h3>The In-Betweens</h3>

<p>In the diagram above, <code>Quadrant 2</code> and <code>Quandrant 3</code> are in-betweens, as they are merely half of the way to solving the problem. As just pointed out, it is important for the strategy in managing model fetches, and the strategy in managing model state subscriptions, to be compatible.</p>

<p>While these quadrants represent a combination of strategies that are possible to adopt, in my opinion, they would be strategies in which two architectural decisions that have orthogonal desires being made to work together. As such, I shall leave an exploration of these as an exercise for the reader.</p>

<h3>The Always-On</h3>

<p>In the diagram above, <code>Quadrant 4</code> would be ideal in managing long-lived model state in a SPA.</p>

<p>When the page is first loaded, models are fetched, and subscriptions to those models are initiated. When the user navigates to a different page, the models are maintained, as are the subscriptions to them. If new models exist on this page that have not been loaded prior, then these models are fetched, and subscriptions to those models are initiated. The main point to note is that no matter how many page navigations the user performs, each model will only be fetched once, and subscribed to once.</p>

<p>Ideal? Yes.</p>

<p>Works in the real world? Not quite.</p>

<p>The description above would have set off alarm bells right away. Why yes, given unlimited memory and bandwidth, why not do so? Unfortunately, both are constrained. One cannot indefinitely load more models without clearing out older ones at some stage. Keeping all those subscriptions open also eats into memory, even consume extra bandwidth at the same time.</p>

<p>Thus, the key to managing long-lived model state in SPAs becomes heavily dependent on memory management techniques.</p>

<h2>Wrap Up</h2>

<p>We have looked at the fundamental differences between traditional web sites and present day single page applications; as well as the history of the decisions that we had to make along the way. With single page applications, two key decisions need to be made with regards to keeping model state synchronised between client and server, and we have taken a look at why those decisions need to be congruent.</p>

<p>We then explored the pros and cons of the strategy resultant from a combination of each of these decisions. The final, and possibly ideal strategy for managing long-lived model state, we find to be practically not feasible, because it would lead to memory consumption with a pattern typical of a memory leak - new memory allocated without any being freed.</p>

<p>A subsequent post will explore techniques to reign in memory consumption while maintaining model state.</p>

<hr><p><sup>1</sup> Considerations for keeping memory footprint in line:</p>

<ul><li>How can we keep track track of all models presently being displayed in views?</li>
<li>Are least recently used queuing or garbage collection feasible?</li>
</ul><hr><p>This was originally posted on <a href="http://bguiz.com/post/60018947047/long-lived-models-in-single-page-apps" title="Long-lived Models in Single Page Apps" target="_blank">bguiz.com</a></p>