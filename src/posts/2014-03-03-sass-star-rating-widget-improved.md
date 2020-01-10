---
comments: true
title: "New & Improved: Star rating widget with SASS"
date: '2014-03-03T08:03+11:00'
originalUrl: http://blog.bguiz.com/post/78358336289/sass-star-rating-widget-improved
permalink: /post/78358336289/sass-star-rating-widget-improved/
tags: [sass, css, blog, html5]
---

<p>I came across this interesting write up on a <a href="http://hugogiraudel.com/2014/02/24/star-rating-system-with-sass/" target="_blank">star rating system with SASS</a>.</p>

<p>I happened to be creating something with a star rating system myself, so I decided to incorporate this. Unfortunately, I found it to be a bit clunky, requiring classes to be set in two places - once on the <code>&lt;ul&gt;</code> and once on the <code>&lt;li&gt;</code> - in the case of a half star.</p>

<p>While this was possible to do in an AngularJs <code>directive</code> or an EmberJs <code>Component</code>, the code for it proved to be a little unwieldy for my liking. I wanted to simply set one class, on the <code>&lt;ul&gt;</code>, and not have to do anything else.</p>

<p>So I came up with some <a href="http://codepen.io/bguiz/pen/dtbFv" target="_blank">improvements of my own</a>. <a href="https://gist.github.com/bguiz/9245614" target="_blank">And in gist form</a>.</p>

<p><a href="http://codepen.io/bguiz/pen/dtbFv" target="_blank"><img src="https://31.media.tumblr.com/4ce4e3ac9eff340e03168f0845409546/tumblr_inline_n1sgilq6yZ1rer3hy.png" alt="SASS star rating widget improved"/></a></p>

<hr><p>EDIT: Just noticed that my comment has been marked as spam - please fix!</p>

<p><img src="https://31.media.tumblr.com/1827287bd70fe6da9498b2fcea627446/tumblr_inline_n1sg5jBOdN1rer3hy.png" alt="my comment marked as spam - oh noes"/></p>
