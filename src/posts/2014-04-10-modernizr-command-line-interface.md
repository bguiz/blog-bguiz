---
comments: true
title: Modernizr Command Line Interface
date: '2014-04-10T07:01+11:00'
originalUrl: http://blog.bguiz.com/post/82223943673/modernizr-command-line-interface
permalink: /post/82223943673/modernizr-command-line-interface/
tags: [modernizr, nodejs, cli, blog]
---

<p>Modernizr is an an excellent library used for client-side feature detection.</p>

<p><img src="http://modernizr.com/i/img/logo-x12.png" alt="Modernizr"/></p>

<p>The full set of features detected can be obtained using its <a href="http://modernizr.com/downloads/modernizr-latest.js" target="_blank">development version</a>,
however, including this entire file is not ideal in production -
why make users download all the extra code for feature detection tests that will not ever be used?</p>

<p>Thankfully, Modernizr has a nifty <a href="http://modernizr.com/download/" target="_blank">download feature</a>,
which lets you fill in a form to select which tests you want,
and then it generates a customised file for you to download.</p>

<h2>How about a CLI?</h2>

<p><img src="http://modernizr.com/i/img/logo-x12.png" alt="Modernizr" title="Modernizr"/> +
<img src="http://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Blank-extended-keyboard.svg/300px-Blank-extended-keyboard.svg.png" alt="Command Line" title="COmmand Line"/> =&#160;?</p>

<p>That is great, however, what if you want to use Modernizr to generate
custom files on the command line?</p>

<p>I came across <a href="https://github.com/Modernizr/Modernizr/issues/287" target="_blank">this closed ticket</a> raised against Modernizr,
and that helped somewhat, as I found a way to generate custom files on the command line,
but the command I had to issue was extremely convoluted.</p>

<p>Seeking an easier way, <a href="https://gist.github.com/bguiz/9926259" target="_blank">I came up with this</a>,
which was a huge improvement in usability.</p>

<p>Now it is even easier:</p>

<pre><code>    npm install -g modernizr-cli
    modernizr custom.json
</code></pre>

<p>(Where <code>custom.json</code> should conform to <a href="https://github.com/Modernizr/Modernizr/blob/master/lib/config-all.json" target="_blank">this format</a>)</p>

<p>Check it out:
<a href="https://github.com/bguiz/modernizr-cli" target="_blank">modernizr-cli on github</a> |
<a href="https://www.npmjs.org/package/modernizr-cli" target="_blank">modernizr-cli on npm</a></p>