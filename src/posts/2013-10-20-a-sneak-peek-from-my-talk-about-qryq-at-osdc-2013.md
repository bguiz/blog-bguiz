---
comments: true
title: A sneak peek from my talk about qryq at OSDC 2013
date: '2013-10-20T10:36+11:00'
originalUrl: http://blog.bguiz.com/post/64567226287/a-sneak-peek-from-my-talk-about-qryq-at-osdc-2013
permalink: /post/64567226287/a-sneak-peek-from-my-talk-about-qryq-at-osdc-2013/
tags: [javascript, qryq, tech, conference, osdc2013, blog]
---

<p><a href="https://gist.github.com/bguiz/7068093" target="_blank">A comparison of async to qryq when specifying a compound query that is diamond-shaped.</a></p>

<p>Why diamond shaped? The <a href="https://google.com/search?q=diamond+shaped+dependency" target="_blank">diamond dependency problem</a> is a not-so-simple problem to solve, and so I have chosen this as a litmus test for testing and demonstrating compound queries. Call it a <a href="http://sscce.org/" target="_blank">SSCCE</a>.</p>

<p>In the code snippet that I have linked above, the compound query where  each of the queries is dependent upon the others in the shape of a diamond is used to as a point of comparison using a known-to-be-tricky problem.</p>