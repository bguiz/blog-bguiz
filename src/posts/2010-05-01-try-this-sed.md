---
comments: true
title: Try this (sed)
date: '2010-05-01T05:04+11:00'
originalUrl: http://brendangraetz.wordpress.com/2010/05/01/try-this-sed/
permalink: /2010/05/01/try-this-sed/
tags: [apple, flash, news, sed]
---

<p>Save Steve Jobs&#8217; <a href="http://www.apple.com/hotnews/thoughts-on-flash/" target="_blank">thoughts on flash</a> to a plain text file.</p>
<pre class="brush: bash; title: ; notranslate" title="">
sed -e 's/Adobe/Apple/g' -e 's/Flash/closed/g' -e 's/third party/proprietary/g' apple.txt
cat apple.txt
</pre>
<p>(substitute file names accordingly)</p>
<p>There is no simpler way to expose hypocrisy than simple text substitution. Enjoy.</p>
<p>(slightly modified version of the suggestion in <a href="http://hooptyrides.blogspot.com/2010/04/searching-and-replacing-jobs-flash.html" target="_blank">this post</a>)</p>
