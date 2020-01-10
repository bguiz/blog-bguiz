---
comments: true
title: Accessors vs Dirty-checking in Javascript Frameworks
date: '2013-08-05T09:16+11:00'
originalUrl: http://blog.bguiz.com/post/57373805814/accessors-vs-dirty-checking-in-javascript-frameworks
permalink: /post/57373805814/accessors-vs-dirty-checking-in-javascript-frameworks/
tags: [javascript, angularjs, emberjs, backbonejs, dirty checking, accessors, comparison, single page app, melbjs, blog]
---

<p>One of the many ways in which EmberJS, AngularJS, and BackboneJS differ is in how they treat their models. AngularJS uses dirty checking on Plain Old Javascript Objects (POJSO); whereas EmberJS and BackboneJS both use accessors (getters and setters) on wrapped objects.</p>
<p>We will be exploring the ways in which these two approaches differ, and the implications these differences have when it comes to choosing which Javascript framework we we should write our single page apps in.</p>
<h2 id="the-basics">The Basics</h2>
<p>Models are one of the fundamental tenets of an <a href="http://geekswithblogs.net/dlussier/archive/2009/11/21/136454.aspx" title="MVC, MVP, MVVM side by side." target="_blank">MV* architecture</a>. They are the basic building blocks where information about various object states get stored and retrieved form. Most Javascript frameworks for front end user interfaces used to build single page applications (SPAs) use MV* architectures, and a feature that most of them have in common is the ability for the View to update the Model, and for the Model to update the View.</p>
<p><img alt="MVC, MVP, MVVM side by side." src="http://gwb.blob.core.windows.net/dlussier/WindowsLiveWriter/MVVMComparedToMVCandMVP_EFCB/image_thumb_1.png" title="MVC, MVP, MVVM side by side"/></p>
<p>For this to happen, there needs to be to be a means to &#8220;listen&#8221; for these changes, and then trigger some code to respond to that change. Depending on which flavour of MV* architecture the framework uses, these may use a Controller, ViewModel, or Presenter as a conduit. Leaving the middleman out, we have:</p>
<ul><li>When a change occurs in an input field in a form, the object modelling that form should be updated.
<ul><li>a change in the <em>View</em> <code>--&gt;</code> response triggered in the <em>Model</em></li>
</ul></li>
<li>When a change occurs in the object modelling that form (perhaps as a result of a sync via AJAX), the corresponding fields in the form should be updated.
<ul><li>a change in the <em>Model</em> <code>--&gt;</code> response triggered in the <em>View</em></li>
</ul></li>
</ul><p>With MV* frameworks like <a href="http://emberjs.com/guides/object-model/bindings/" title="Two-way data binding in EmberJS" target="_blank">EmberJS</a> and <a href="http://docs.angularjs.org/guide/dev_guide.templates.databinding" title="Two-way data binding in AngularJS" target="_blank">AngularJS</a>, you get this out of the box - you only need to declaratively specify which models are linked to which views - and they call this &#8220;Two-way Data Binding&#8221;.</p>
<p>With other MV* frameworks like BackboneJS, you get this too, but a significant amount of manual &#8220;wiring&#8221; is required - you have to set up the listeners in both directions yourself.</p>
<p>In order for this to work under the hood, the framework will need a way to &#8220;observe&#8221; for changes of Models. This post will explore two methods that Javascript MV* frameworks use to listen for changes on Models.</p>
<p>Note that we will not be exploring how Javascript MV* frameworks listen for changes in Views in this post, as essentially. They are for the most part <a href="https://developer.mozilla.org/en-US/docs/Web/API/EventTarget.addEventListener" title="EventTarget.addEventListener" target="_blank">wrappers around <em>EventTarget.addEventListener</em></a>, and are thus not quite as interesting.</p>
<h3 id="listeners-and-digest-cycles">Listeners and Digest Cycles</h3>
<p>Implementations of listeners and of digest cycles are separate, but closely related. When a listener on any change gets fired, the code that it triggers is by default run immediately.</p>
<p>However, for a number of reasons, performance being the main one, the framework may instead queue these listeners. This framework would also perform <em>digest cycles</em>, which are, simply put, code that runs at a set time interval. In each of these <em>digest cycles</em>, the triggers of the listeners in the queue are all run at once.</p>
<h2 id="using-pojso">Using POJSO</h2>
<p>Using Plain Old Javascript Objects makes for code that has very simple syntax, and thus is easier to write. With dirty checking, no special syntax is required - simply change the properties of an object, and it &#8220;magically&#8221; triggers the required listeners.</p>
<p>(Behind the scenes, the framework runs a digest cycle, and during each one, it performs a dirty check, which is a deep comparison on all the Models that are presently displayed within the View. If a difference is detected, and a listener is attached to that difference, it is triggered.)</p>
<p>Using accessors, on the other hand, implies two additional things, which add to, and thus complicate the syntax.</p>
<p>Firstly, you would need to make all of your objects within the <code>Model</code> wrapper classes provided by the framework, e.g.:</p>
<pre><code>var Book = Backbone.Model.extend({ /* ... */ });

var myBook = new Book( /* ... */ );

</code></pre>
<p>Secondly, in order to trigger the listeners correctly, you would need to remember to use <code>get</code>s and <code>set</code>s whenever using its properties, e.g.:</p>
<pre><code>myBook.set({title: 'Qryq - Stop RESTing and use queues instead'}); //triggers listeners

myBook.attributes.title = 'Qryq - Stop RESTing and use queues instead'; //does NOT trigger listeners

</code></pre>
<h2 id="computed-properties">Computed properties</h2>
<p>Being able to define a property as being computed from a number of others is a particularly nifty feature of EmbersJS, and made possible because of its use of accessors. <sup>2</sup></p>
<pre><code>App.Person = Ember.Object.extend({

    bmi: function() {

        var height = this.get('height');

        return this.get('weight') / height / height;

    }.property('weight', 'height')

});

</code></pre>
<p>In the above code, we are creating a model which has a property named <code>bmi</code>. This property is <em>bound</em> to the <code>weight</code> and <code>height</code> properties of the object - and we do not need to cache it, or recompute it each time we use it.</p>
<p>Betrand Meyer&#8217;s <a href="http://www.eiffel.com/general/column/2005/Sept_October.html" target="_blank">Uniform Access Principle</a> states that &#8220;all services offered by a module should be available through a uniform notation, which does not betray whether they are implemented through storage or through computation.&#8221; Computed properties, implemented in the manner that EmberJS has, are one way of implementing properties observing this principle. Bertrand goes on to name a number of benefits this yields. The main benefit, in my opinion, is that it gives the developer one less thing to have to manage, and thus have to worry about.</p>
<h2 id="performance">Performance</h2>
<p>Performance is a particularly tricky issue to tackle.</p>
<p>On the surface, it would appear that dirty checking would consume more memory and processor cycles than event listeners. The reason for this is straight forward: There is no need to check for differences in each cycle. When you are doing this at a very high frequency, which happens if you have a large number of objects, responsiveness starts to take a hit.</p>
<p>However, this issue not so straightforward - Misko Hevery, creator of AngularJS, makes some good points on this, in his <a href="http://stackoverflow.com/a/9693933/194982" title="S/O answer on AngularJS data binding - Misko Hevery" target="_blank">S/O answer on AngularJS data binding</a>. Essentially, dirty checking is &#8220;fast enough&#8221; for most user interfaces:</p>
<blockquote>
<div>"So the real question is this: can you do 2000 comparisons in 50&#160;ms even on slow browsers? That means that you have 25&#160;µs per comparison. I believe this is not an issue even on slow browsers these days. There is a caveat: the comparisons need to be simple to fit into 25&#160;µs."</div>
</blockquote>
<p>&#8212; Misko Hevery</p>
<p>Thus we need to ensure that all comparisons are not slower than this threshold. In practice, more complex models with computed properties are an eventuality, and a comparison during a dirty check of such computed properties is likely to exceed this threshold. When enough of these objects are present, the lag during digest cycles (occurring between each render) will bring down the frame rate, and at some point begin to become noticeable to the human eye - so be prepared to cache these more complex model states, and to handle their state changes manually.</p>
<h3 id="digest-cycles-with-accessors">Digest cycles with accessors</h3>
<p>I disagree with Misko, however, on his other points that change coalescence cannot happen using accessors; and that change listeners need to fire immediately using accessors. Indeed, these are features that would be lacking in basic implementations of non-dirty checking based change listeners.</p>
<p>However, do note my earlier point about the implementations of change listeners, and the implementations of digest cycles being <em>separate</em>, but related. When using dirty checking, a digest cycle implementation is compulsory - you have to poll for changes at an interval. When using accessors, a digest cycle is optional; however, digest cycles are certainly not mutually exclusive to dirty checking.</p>
<p>A good real world example of a Javascript framework that combines accessors with digest cycles is EmberJS. EmberJS uses accessors to aggregate change listeners, and trigger them only once per digest cycle. It does not, however, implement change coalescence - and this is genuinely much trickier to achieve using accessors compared to using dirty checking, but it should be possible <sup>3</sup>.</p>
<h3 id="adding-some-metrics">Adding some metrics</h3>
<p>The issue of performance is very much still an open debate. It is likely that using accessors will outperform dirty checking in some apps, but observe a reversal in performance in other apps. Ideally, one should try both out, and see which works better. If you do not have the time to implement your app using multiple frameworks to test this hypothesis for your particular app - and I suspect that this will be the case for most of us - then you could make an educated guess as to which approach will yield the better performance based on answers to the following questions:</p>
<ul><li>Will you be using many computed properties?
<ul><li>If so, will you be willing to cache model states and handle state changes manually?</li>
<li>Threshold: ~25&#160;µs per &#8220;piece of information&#8221;</li>
</ul></li>
<li>Will you have many models bound to views?
<ul><li>If so, will you have many views rendered on the screen at once?</li>
<li>Threshold: ~2000 &#8220;pieces of information&#8221;</li>
</ul></li>
<li>Are you targeting mobile devices for your app?
<ul><li>If so, adjust the thresholds above as appropriate</li>
</ul></li>
</ul><p>Misko does not define what he means by a <em>piece of information</em>. So here is one possible method:</p>
<ul><li>Each Javascript primitive (i.e. a <code>String</code>, a <code>Number</code>, or a <code>Boolean</code>) would count as one <em>piece of information</em>.</li>
<li>For <code>Object</code>s and <code>Array</code>s, one simply counts the total number of primitives contained within, plus one for itself.
<ul><li>This is necessary because not all model states take an equal amount of time to compare; some may even take an order of magnitiude longer than others.</li>
<li>e.g. <code>{name:'Bob', weight:80, height:200, foo:[true, false]}</code> &#8212;&gt; 1&#160;<code>Object</code>, 1&#160;<code>Array</code>, 5 primitives &#8212;&gt; 7&#160;<em>pieces of information</em></li>
</ul></li>
</ul><p>Of course, this metric is only intended to be a rough gauge. Different measures or definitions of what constitutes <em>pieces of information</em>, are valid, as long as the same one is consistently applied to all models. What is more important here, is to anticipate and plan for for future increases in model complexity.</p>
<p>If it is not possible to estimate or anticipate the (future) complexity of your models at this stage, you could treat the point on performance as a case of something where the verdict is still out, and instead base your decision on the other points of difference.</p>
<h2 id="future-proofing">Future proofing</h2>
<p>Future editions of ECMAScript may potentially allow listeners to be set directly on POJSO. This is already in the works with <a href="http://www.w3.org/TR/DOM-Level-2-Events/ecma-script-binding.html" title="Appendix C: ECMAScript Language Binding" target="_blank">w3c&#8217;s object binding proposal</a>, and <a href="http://wiki.ecmascript.org/doku.php?id=harmony:observe" target="_blank">TC39&#8217;s Object.observe</a>/<a href="https://www.youtube.com/watch?v=VO--VXFJnmE" title="JavaScript Object.observe proposal &amp; ChangeSummary library overview" target="_blank">video</a>. In fact Google Chrome has already implemented the latter.</p>
<p>That will remove the necessity for both accessors and dirty checking, as frameworks will most likely be reimplemented to use this to take advantage of native execution over interpreted execution for listening to changes on Models. This will mean that if you have written your app using a Javascript framework that uses dirty checking like AngularJS, your code will not need to change at all. However, if you have written your app using a Javascript framework that uses accessors like EmberJS or BackboneJS, you will need to refactor your code<sup>1</sup> in order to gain the extra performance.</p>
<p>(Of course, it is the other way around for the authors of the Javascript frameworks. A dirty checking framework will need to do a more complex refactor to switch to using listeners on POJSOs instead of dirty checks in each digest cycle, compared to an accessor based framework.)</p>
<h2 id="conclusion">Conclusion</h2>
<p><a href="http://twitter.com/wycats" target="_blank">Yehuda Katz</a> spoke recently about EmberJS at <a href="http://melbjs.com" target="_blank">MelbJS</a> <sup>4</sup>. At the end of his talk, he mentioned that he was on the board of <a href="http://ecmascript.org" target="_blank">ecmascript.org</a>, stating that one of the proposals that he was passionate about and was promoting, was being able to set listeners natively on POJSO objects. (proposal linked above, under the &#8220;Future Proofing&#8221; section).</p>
<p>These are nifty and would allow Javascript frameworks to leverage the best of both worlds with regards to the main points of differentiation between accessors and dirty checking that we have explored in this post.</p>
<p>Unfortunately, ES6 is not coming out for a while yet. The proposal to implement these features has yet to be accepted for inclusion into ES6, so it may take even longer.</p>
<p>Thus I began to think about how the Javascript frameworks that are out there today have tackled this problem - in particular BackboneJS, AngularJS, and EmberJS. How have these issues been addressed here and now?</p>
<p>There has not been much written about this, so I have put this this rather small, and often overlooked, aspect of Javascript frameworks under a magnifying glass.</p>
<p>Picking a Javascript single page application framework is difficult, and hopefully I have given you one more set of considerations to mull over in picking one.</p>
<h2 id="tldr">tl;dr</h2>
<ul><li>Dirty checking
<ul><li>Pros
<ul><li>Easier syntax when using POJSO</li>
<li>Code refactor not required with next ECMAScript</li>
</ul></li>
<li>Cons
<ul><li>Need to set up own cache &amp; listeners</li>
<li>Unsuitable for high frequency callbacks/ large number of models</li>
</ul></li>
</ul></li>
<li>Accessors
<ul><li>Pros
<ul><li>Allows computed properties</li>
<li>Avoid excessive <code>null</code>/<code>undefined</code> checks on models</li>
</ul></li>
<li>Cons
<ul><li>More verbose syntax</li>
</ul></li>
</ul></li>
<li>Performance:&#160;?</li>
</ul><hr><p>Footnotes:</p>
<p><sup>1</sup> Not a very complicated one. Should be accomplishable using some nifty <code>grep</code>s and <code>sed</code>s</p>
<p><sup>2</sup> I do not see any reason why it cannot also be accomplished using dirty checking, however, I have yet to see this combination implemented in a SPA framework.</p>
<p><sup>3</sup> Personal conjecture only here. Again, I have yet to come across an implementation of this in a SPA framework. Someone would have to do it first, before we make a judgment as to whether this is more efficient than dirty checking. <a href="https://github.com/rafaelw/ChangeSummary" target="_blank">Change coalescence over <code>POJSO</code>s based upon <code>Object.observe</code></a> has already been done, so it could just be a matter of time.</p>
<p><sup>4</sup> Shameless plug: I will be speaking about <a href="http://bguiz.com/post/54620002947/qryq" target="_blank">qryq</a> at <a href="http://lanyrd.com/2013/melbjs-august/sckwwz/" title="qryq: Stop RESTing, Start Using Query Queues - A session at MelbJS - Brendan Graetz" target="_blank">the next MelbJS</a></p>
<div id="ap_listener_added"></div>