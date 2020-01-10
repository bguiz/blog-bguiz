---
comments: true
title: Digest Cycles in Single Page Apps
date: '2013-09-06T09:02+11:00'
originalUrl: http://blog.bguiz.com/post/60397801810/digest-cycles-in-single-page-apps
permalink: /post/60397801810/digest-cycles-in-single-page-apps/
tags: [javascript, game loop, digest cycle, dirty checking, emberjs, angularjs, backbonejs, single page app, optimisation, blog]
---

<p>We will be taking a very concise look into digest cycles, and their use in Javascript single page applications.</p>

<p><em><a href="http://bguiz.github.io/preso-digest-cycles/" title="Digest Cycles in Single Page Apps" target="_blank">Accompanying Slides</a></em></p>

<p><img src="http://docs.angularjs.org/img/guide/concepts-runtime.png" alt="AngularJS digest cycle diagram"/></p>

<p>This is a diagram from the official AngularJS documentation that explains what a digest cycle is. If this goes over the top of your head, don&#8217;t worry, it did for me too. It is more complicated than it needs to be.</p>

<p>A digest cycle is, simply put, code that runs at an interval. This interval may be sometimes simply as fast as possible after the previous one, and sometimes the interval is set.</p>

<p>They are typically used to aggregate expensive tasks such that they do not have to run multiple times when there is no need to do so. For example, DOM rendering.</p>

<p>While we are here to talk about digest cycles in the context of Javascript SPAs, a discussion of this will not be complete without talking about where the idea for this originated from.</p>

<p>The Game Loop is a term familiar to most games developers. When writing a game, one would typically set the interval of the game loop, such that each cycle runs as soon as possible after the previous one completes. As such a variable frame rate is inevitable, and techniques such as linear interpolation of time elapsed is used to calculate the rendered position of a moving object, for example.</p>

<p><em>An <a href="http://www.koonsolo.com/news/dewitters-gameloop/" target="_blank">introduction</a>, and an <a href="http://www.gameprogblog.com/generic-game-loop/" target="_blank">in-depth explanation</a>.</em></p>

<p>In single page apps, digest cycles are also used. Their intent here is quite different, because maxing out frames per second is not usually a goal for web apps. When using dirty checking to observe for model state changes, SPAs have taken two different approaches - <a href="http://bguiz.com/post/57373805814/accessors-vs-dirty-checking-in-javascript-frameworks" title="Accessors vs. Dirty-checking" target="_blank">dirty checking and accessors</a>, which you can read about on my blog. In fact this presentation is a derivative work of that post.</p>

<p><em><a href="https://github.com/angular/angular.js/blob/v1.0.x/src/ng/rootScope.js#L364" target="_blank">AngularJS&#8217; $digest</a>, <a href="https://github.com/emberjs/ember.js/blob/1-0-beta/packages/ember-metal/lib/run_loop.js#L216" target="_blank">EmberJS&#8217; Ember.run+runLoop</a></em></p>

<p>When using dirty checking, as AngularJS does, a digest cycle is necessary. When using the alternative to dirty checking - accessors - as BackboneJS and EmberJS do, a digest cycle is <em>not necessary</em>. In fact, BackboneJS does not have one, but EmberJS does.</p>

<p>So why are digest cycles important in SPA frameworks? As mentioned earlier, it is where you would put your code that dirty checks your models for differences to previous state. Secondly - and this is why EmberJS uses it despite using accessors - is that it improves efficiency.</p>

<p>Each change on each model sets off a DOM update, and thus a re-render, and a reflow. The latter two are expensive operations. Instead of doing this once per model change, we instead aggregate the changes until the point where the digest cycle executes - updating a purely in-memory buffer with the new DOM with all the changes. When the it is time for the digest cycle to execute, this buffer replaces the relevant parts of the DOM; which then re-renders and reflows just once per digest cycle.</p>

<p>Changes listeners that are triggered are aggregated in a similar manner, and all of them are fired at once during the digest cycle.</p>

<p><code></code></p>

<pre>
App.Person = Ember.Object.extend({
    bmi: function() {
        var height = this.get('height');
        return this.get('weight') / height / height;
    }.property('weight', 'height')
});
</pre>



<p>Here is an example of a <a href="https://github.com/emberjs/ember.js/blob/1-0-beta/packages/ember-runtime/lib/ext/function.js#L64" title="Computed properties allow you to treat a function like a property" target="_blank">computed property</a> in an EmberJS app. What this says is &#8220;whenever the <code>weight</code> or <code>height</code> properties of a <code>Person</code> model change, its <code>bmi</code> property could change too.&#8221;</p>

<p>Computed properties rely on the framework maintaining a directed acyclic graph (per model class) between properties, and needs to traverse them (per model instance). These traversals can be expensive, so we defer them to - you guessed it - the digest cycle.</p>

<p>Now that we know more about digest cycles - what is the main takeaway from it? The number one thing to avoid, is doing too much in each digest cycle. Once the time taken to perform the work needed in each digest cycle approaches or exceeds the duration of the interval between each one, the app will become noticeably laggy.</p>

<p>Here I have linked <a href="http://stackoverflow.com/a/9693933/194982" target="_blank">Misko Hevery&#8217;s Stackoverflow post on dirty checking</a>, where he works out some numbers for what these thresholds are. If you are developing a SPA, especially one that is intended to run on a mobile device, you should check out his numbers. I have discussed <a href="http://bguiz.com/post/57373805814/accessors-vs-dirty-checking-in-javascript-frameworks#performance" target="_blank">performance metrics</a> in a previous post.</p>

<p><code></code></p>

<pre>
var socket = io.connect();
return {
  on: function (eventName, callback) {
    socket.on(eventName, _.throttle(function () {
      var args = arguments;
      $rootScope.$apply(function () {
        callback.apply(socket, args);
      });
    }, 500));  // limit to once every 500ms
  } // ...
};
</pre>



<p>This snippet by Brian Ford is from his post on building huge AngularJS apps. To avoid executing this expensive function every digest cycle, he wraps it using <a href="http://underscorejs.org/#throttle" target="_blank">underscore&#8217;s throttle function</a>, thereby ensuring that it only runs twice per second instead.</p>

<p>To round up:</p>

<ul><li>Digest cycles are quite similar to the Game Loop programming pattern</li>
<li>They are used in SPAs to execute code at a set interval</li>
<li>They are where dirty checking is done</li>
<li>They are where DOM updates, listeners, and other expensive tasks are aggregated for performance gains</li>
<li>Measure &amp; curb the execution time of the work done in each digest cycle</li>
</ul><hr><p>These are my speaker notes rehashed as a blog post. The original talk was at <a href="http://www.webdirections.org/events/wdyk-melbourne" target="_blank">Web Directions WDYK</a>. Here are the <a href="http://bguiz.github.io/preso-digest-cycles/" title="Digest Cycles in Single Page Apps" target="_blank">accompanying slides</a> for it.</p>