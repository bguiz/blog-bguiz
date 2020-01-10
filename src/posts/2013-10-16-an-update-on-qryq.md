---
comments: true
title: An update on qryq
date: '2013-10-16T06:01+11:00'
originalUrl: http://blog.bguiz.com/post/64190534126/an-update-on-qryq
permalink: /post/64190534126/an-update-on-qryq/
tags: [qryq, nodejs, javascript, update, publish, blog]
---

<p>Some important changes to <a href="https://github.com/bguiz/qryq" target="_blank">qryq</a> since its <a href="http://bguiz.com/post/54620002947/qryq" target="_blank">first announcement</a>:</p>

<ul><li>Picked <a href="http://opensource.org/licenses/GPL-3.0" target="_blank">GPL v3</a> as the licence</li>
<li>Fully extracted as its own project</li>
<li>Inline referencing + property drilldown of the results of other <code>qry</code>s</li>
<li>Specifying <code>depends</code> for each <code>qry</code> is now optional, and will be inferred when not present</li>
<li>Unit tested using <a href="https://github.com/caolan/nodeunit" target="_blank"><code>nodeunit</code></a></li>
</ul><p>Qryq has also just been <a href="https://npmjs.org/package/qryq" title="qryq on node package manager" target="_blank">published as a node module</a>. You can now get it using:</p>

<p><code>npm install qryq</code></p>

<p><a href="https://github.com/bguiz/qryq/issues" target="_blank">Pull requests and suggestions</a> are most welcome.</p>

<p>Happy coding!</p>