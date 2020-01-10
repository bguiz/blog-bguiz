---
comments: true
title: Introducing qryq server
date: '2013-12-13T08:01+11:00'
originalUrl: http://blog.bguiz.com/post/69868424539/introducing-qryq-server
permalink: /post/69868424539/introducing-qryq-server/
tags: [javascript, nodejs, qryq, expressjs, scaffold, blog]
---

<p>I have given <a href="http://bguiz.github.io/qryq/" target="_blank">talks on qryq a few times now</a>, and,
quite often I have been asked, about how to actually begin using <code>qryq</code>.</p>

<p><code>qryq</code> is a general purpose library, and it can be used in a number of different ways.
The most common, or default, use for it is to expose a single API endpoint on a server,
where any number of APIs can be invoked in a query queue specified by the client.
Thus I have created a template server that does just this,
and have (creatively) decided to name it <code>qryq-server</code>.</p>

<p>This project is most useful as a scaffold or template,
where you simply make a copy of it,
and in most cases merely need to add more methods to the <code>api</code> object.</p>

<ul><li>Check out <a href="https://github.com/bguiz/qryq-server" target="_blank"><code>qryq-server</code> on github</a></li>
<li>Check out <a href="https://npmjs.org/package/qryq-server" target="_blank"><code>qryq-server</code> on npm</a></li>
</ul>