---
comments: true
title: Designing a ReSTful API
date: '2013-03-25T01:30+11:00'
originalUrl: http://blog.bguiz.com/post/46160521245/designing-a-restful-api
permalink: /post/46160521245/designing-a-restful-api/
tags: [rest, api, architecture, blog]
---

<p>This <a href="http://devo.ps/blog/2013/03/22/designing-a-restful-api-that-doesn-t-suck.html" title="Designing A RESTful API That Doesn't Suck" target="_blank">article from devo.ps</a> has gotten a bit of attention over at <a href="https://news.ycombinator.com/item?id=5422402" title="Hacker NewsDesigning a RESTful API That Doesn't Suck (devo.ps)" target="_blank">hacker news</a>.</p>
<blockquote>
<ul><li>
<p><strong>Design your API for developers first</strong>, </p>
<p>&#8230;</p>
</li>
<li>
<p><strong>Use <a href="http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods" target="_blank">HTTP verbs</a></strong> </p>
<p>&#8230;</p>
</li>
<li>
<p><strong>Use <a href="http://en.wikipedia.org/wiki/List_of_HTTP_status_codes" target="_blank">HTTP status codes</a></strong>,</p>
<p>&#8230;</p>
</li>
<li>
<p><strong>Simple URLs for resources: first a noun for the collection, then the item</strong>. </p>
<p>&#8230;</p>
</li>
<li>
<p><strong>Use verbs for special actions</strong>. </p>
<p>&#8230;</p>
</li>
<li>
<p><strong>Keep errors simple but verbose (and use HTTP codes)</strong>. </p>
<p>&#8230;</p>
</li>
</ul><p>Relying on HTTP status codes and verbs should already help you keep your API calls and responses lean enough. Less crucial, but still useful:</p>
<ul><li><strong>JSON first</strong>, then extend to other formats if needed and if time permits.</li>
<li><strong><a href="http://en.wikipedia.org/wiki/Unix_time" target="_blank">Unix time</a></strong>, or you’ll have a bad time.</li>
<li><strong>Prepend your URLs with the API version</strong>, like <code class="prettyprint"><span class="str">/v1/</span><span class="pln">emails</span><span class="pun">/</span><span class="lit">1234</span></code>.</li>
<li><strong>Lowercase everywhere in URLs</strong>.</li>
</ul></blockquote>
<p>It is a good summary - and I would read with it this <a href="http://kellabyte.com/2011/09/04/clarifying-rest/" title="Clarifying REST" target="_blank">older article on kellabyte.com</a> as it goes into more detail.</p>
<p>(and of course, the original academic <a href="http://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm" title="Representational State Transfer (REST) - Roy Fielding" target="_blank">paper on Representational State Transfer</a>)</p>