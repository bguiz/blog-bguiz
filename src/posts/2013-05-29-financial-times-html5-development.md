---
comments: true
title: Financial Times' HTML5 development
date: '2013-05-29T08:37+11:00'
originalUrl: http://blog.bguiz.com/post/51592484955/financial-times-html5-development
permalink: /post/51592484955/financial-times-html5-development/
tags: [blog, html5, javascript, css, open source]
---

<p>Read this really interesting articles by an engineer from the <a href="http://coding.smashingmagazine.com/2013/05/23/building-the-new-financial-times-web-app/" target="_blank">Financial Times on developing their new app using HTML5</a>. I have summarised my learning points and added some comments below.</p>
<h3>Avoiding Javascript for rendering tasks</h3>
<p>Use pure HTML and CSS wherever possible, and gracefully degrade to using Javascript using shims only for platforms which do not support this. e.g. Flexbox vs pure CSS for layouts</p>
<h3>Views as a composition of layout elements</h3>
<p>They call this &#8220;modularizing the views&#8221; Conceptually, this is a good principle, but I think that the implementation could be improved:</p>
<h4>Original:</h4>
<div class="gist"><a href="https://gist.github.com/5662028" target="_blank">https://gist.github.com/5662028</a></div>
<h4>Improved:</h4>
<div class="gist"><a href="https://gist.github.com/5662149" target="_blank">https://gist.github.com/5662149</a></div>
<p>This version gets rid of the unnecessary empty CSS selector - clutters the code, and wastes a few CPU cycles during the parse phase - although this is not really a big deal as it would have no effect on rendering and the rendering engine would likely optimise-discard it.</p>
<p>This version also gets rid of the prefix &#8220;apple_&#8221; in front of each class names within the article. The selector &#8220;.x .y&#8221; will match any element of class &#8220;y&#8221; that is a child of any element of class &#8220;x&#8221;. If you wish to match -only- direct children of &#8220;x&#8221;, then use &#8220;.x &gt; .y&#8221; instead.</p>
<h4>Now add semantics:</h4>
<div class="gist"><a href="https://gist.github.com/5662156" target="_blank">https://gist.github.com/5662156</a></div>
<p>This version is about semantic HTML. If we know that that a &#8220;h2&#8221; element that is a child of an element of class &#8220;apple&#8221; will always be a heading, a &#8220;h3&#8221; a sub-heading, then use that.</p>
<p>Make sure to also avoid using &#8220;div&#8221; elements for everything. In this case, I think that &#8220;article&#8221; and &#8220;section&#8221; could be appropriate - after all it is a newspaper app! See <a href="http://diveintohtml5.info/semantics.html#new-elements" target="_blank">Semantic HTML5</a>for the full list. Of course, to render correctly in engines not supporting these elements, new in HTML5, we should also include a CSS reset:</p>
<div class="gist"><a href="https://gist.github.com/5662201" target="_blank">https://gist.github.com/5662201</a></div>
<p>(See the same <a href="http://diveintohtml5.info/semantics.html#new-elements" target="_blank">Semantic HTML5 article</a>linked above for a more comprehensive exploration of this)</p>
<h3>Open source your libraries</h3>
<ul><li><a href="https://github.com/ftlabs/ftellipsis" target="_blank">ftlabs/ftellipsis</a></li>
<li><a href="https://github.com/ftlabs/ftscroller" target="_blank">ftlabs/ftscroller</a></li>
<li><a href="https://github.com/ftlabs/fruitmachine" target="_blank">ftlabs/fruitmachine</a></li>
</ul><p>Their main app is not open source, and fair enough, they are a for-profit organisation. They have, however, open sourced the utility libraries that they have created and used in this app. Good on them for doing so!</p>
<h3>Vector graphics</h3>
<p>What is interesting here is that they have had to use Font Glyphs (storing vector images in TTF&#8217;s and WOFF&#8217;s), in order to be backward compatible with older versions of Android. There&#8217;s one way of getting around platforms lacking SVG support!</p>
<h3>Do not reinvent the wheel</h3>
<p>&#8230; except when you really need to. When they needed a means to provide touch-screen compatible scrolling capabilities to their app, they exhausted the possibilities trying out the existing libraries, before building their own.</p>
<h3>Optimise to acheive native performance</h3>
<p>When scrolling, keep the adjacent pages cached. Discard and replace with the new adjacent pages upon scrolling. This is similar to a technique used in games programming where the map/ level and the textures in the surrounding areas are loaded in anticipation of the player about to enter them in ordert to avoid frequent cut scenes.</p>
<p>Use LocalStorage to cache and store almost the entire app. I found this &#8220;preload&#8221; technique to be quite interesting, not just from a offline app point of view, but from a performance point of view.</p>
<p>"Our approach to offline is to store as little in the AppCache as possible. We use it for &#8230; things that we know will rarely or never need updating. Our JavaScript, CSS and templates live in LocalStorage. This approach gives us complete control over serving and updating the most crucial parts of our application. When the application starts, the bare minimum required to get the app up and running is sent down the wire, embedded in a single HTML page; we call this the preload."</p>
<p>They also <a href="http://labs.ft.com/2012/06/text-re-encoding-for-optimising-storage-capacity-in-the-browser/" target="_blank">cache their images offline</a>in the local database, and compress it using a rather cool technique.</p>
<h3>Fin</h3>
<p>This articles gives a real all round overview of the nuanced trials of making a HTML5 app. Learning points all round!</p>