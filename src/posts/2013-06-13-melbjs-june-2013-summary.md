---
comments: true
title: MelbJS June 2013 Summary
date: '2013-06-13T01:01+11:00'
originalUrl: http://blog.bguiz.com/post/52839657187/melbjs-june-2013-summary
permalink: /post/52839657187/melbjs-june-2013-summary/
tags: [html5, javascript, emberjs, angularjs, css, bem, melbjs, blog]
---

<p>MelbJS held an event this evening, and the turnout was amazing in spite of the dreary weather. If I recall right it was the biggest turnout for this event to date.</p>
<p>Must have been the impressive line up of speakers. There were &#8220;full presentations&#8221; by <a href="https://twitter.com/neilj" target="_blank">Neil Jenkins</a>, <a href="https://twitter.com/jamesarosen" target="_blank">James A Rosen</a>, and <a href="https://twitter.com/ryanseddon" target="_blank">Ryan Seddon</a>, and a couple of &#8220;lightning talks&#8221; by <a href="https://twitter.com/theRealDevgeeks" target="_blank">Tommy-Carlos Williams</a> and <a href="https://twitter.com/markbrown4" target="_blank">Mark Brown</a>.</p>
<h2>Some highlights from the talks</h2>
<!--more-->
<h3>Optimising Javascript</h3>
<p>Neil Jenkins on hacks for speed</p>
<ul><li>seek to reduce bandwidth consumption as the number one priority</li>
<li>javascript is fast enough for all tasks apart large data processing jobs</li>
<li>minification + concatenation</li>
<li>modular selective loading of assets</li>
<li>only initial ones upfront, and preload subsequent modules if predicted the user is about to need them</li>
<li>parallel loading of assets</li>
<li>cache everything</li>
<li>do away with a RESTful API <sup><a href="#bguiz-melbjs-20130612-footnote-0" target="_blank">(0)</a></sup></li>
<li>transmit only deltas when loading lists of data, using a sequence number</li>
</ul><p>I have previously written a review of some rather <a href="http://bguiz.com/post/51592484955/financial-times-html5-development" target="_blank">advanced optimisation strategies employed by the developers of the Financial Times app</a>, and I think these should be a stepping stone to them - these are the basics upon which the advanced strategies can be built on top of. (Note that there is some overlap, of course.)</p>
<h3>Ember and Angular in production</h3>
<p>The other interesting thing to see was that there was a talk both about EmberJs and AngularJs on the same night. Further to that, both of them were about rather large mature applications that have had to face scalability problems, and have had to solve them.</p>
<p>Some interesting points made by James was that EmberJs is very hard to use because the core framework was (and still is) in a state of flux; however, at the same time, they saw the need to keep the framework up to date. Ultimately they were unable to do so completely, and are in a state of limbo, employing some trickery to allow existing parts of the app to remain written in the old way, but newer parts to use the new way for the newer version of the framework.</p>
<p>Another thing worth noting is their deployment process, which is essentially to upload every single asset except for the index.html file, and make sure all of them can be hit successfully, before uploading that final piece of the puzzle. Because all of the files that have changed have different names <sup><a href="#bguiz-melbjs-20130612-footnote-1" target="_blank">(1)</a></sup>, this allows the old index.html to continue operating, business as usual, linking to the old set of assets. I found this quite an interesting deployment technique, as only a Javascript signle-page application could apply this.</p>
<p>Ryan Seddon started with a spiel on why he chose to use AngularJs. He started out by prototyping in BackboneJs, EmberJs, and AngularJs. He discarded BackboneJs because he had to write a lot of boilerplate code to accomplish rather simple tasks. He discarded EmberJs because the framework was in a state of flux. He decided to go with AngularJs because he was able to become productive in it rather quickly, and its emphasis on testing. I related to this, because it mirrors my own experience with these frameworks, when I was evaluating them December last year. I really liked the ideas behind EmberJs, but I simply couldn&#8217;t get them to work, because all the stuff written about it online was for the older versions of EmberJs, and mostly included breaking changes.<sup><a href="#bguiz-melbjs-20130612-footnote-2" target="_blank">(2)</a></sup></p>
<p>He then went on to elaborate on various tips and tricks he used in production for AngularJs. The same as what is mentioned as the &#8220;Performance&#8221; section in the Brian Ford&#8217;s article <a href="http://briantford.com/blog/huuuuuge-angular-apps.html" target="_blank">on Huge Angular Apps</a>; and to add to that some things to avoid (HTML5 form validation), some things to use (template caching, dumb ng-repeats, ng-includes to clean up views).</p>
<h3>CSS Block, Element, Modifier</h3>
<p>While nothing to do with AngularJs, he mentioned his use of BEM (Block, Element, Modifier), for his CSS. This is a technique I had not come across myself before, and a quick look at it reveals enough for me to revisit my <a href="http://bguiz.com/post/51592484955/financial-times-html5-development" target="_blank">critique of the CSS selectors in the Financial Times app</a>.</p>
<p>More on CSS BEM: <br/><a href="http://coding.smashingmagazine.com/2012/04/16/a-new-front-end-methodology-bem/" target="_blank">Smashing&#8217;s in depth look at the technique</a> <br/><a href="http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/" target="_blank">A quick overview of the technique</a></p>
<p><a id="bguiz-melbjs-20130612-footnote-0"></a>(0) Blasphemy, you say? Indeed, doing away with a RESTful API is going against the grain of the current mantra, but he does make a good point, and provide a good alternative solution. Too much to discuss here - probably warrants another post in itself.</p>
<p><a id="bguiz-melbjs-20130612-footnote-1"></a>(1) File names are suffixed with the first several characters of their MD5 hash. Noteworthy is that both <a href="http://www.zendesk.com/" target="_blank">Zendesk</a> and <a href="https://www.fastmail.fm/" target="_blank">Fastmail</a> use this technique.</p>
<p><a id="bguiz-melbjs-20130612-footnote-2"></a>(2) Since this, EmberJs has released 1.0.0 release candidates, and have been assured that apart from EmberData, the rest of its API is stable; I intend to give it another shot soon.</p>
<hr><p>Video recordings of the talk:</p>
<ul><li><a href="http://vimeo.com/68351277" title="D3 is Cool - Mark Brown - MelbJS" target="_blank">D3 is Cool - Mark Brown</a></li>
<li><a href="http://vimeo.com%C3%B768302295" title="Ember in Production - James Rosen - MelbJS" target="_blank">Ember in Production - James Rosen</a></li>
<li><a href="http://vimeo.com/68290618" title="PhoneGap Doesn't Suck, You Suck - Tommy Williams - MelbJS" target="_blank">PhoneGap Doesn&#8217;t Suck, *You* Suck - Tommy Williams</a></li>
<li><a href="http://vimeo.com/68290612" title="Angularing It Up - Ryan Seddon - MelbJS" target="_blank">Angularing It Up - Ryan Seddon</a></li>
<li><a href="http://vimeo.com/68276455" title="Tips, Tricks and Hacks in the Pursuit of Speed - Neil Jenkins - MelbJS" target="_blank">Tips, Tricks and Hacks in the Pursuit of Speed - Neil Jenkins</a></li>
</ul><div id="ap_listener_added"></div>