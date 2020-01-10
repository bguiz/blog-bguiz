---
comments: true
title: A basic jQuery examination
date: '2013-10-11T01:12+11:00'
originalUrl: http://blog.bguiz.com/post/63644475765/a-basic-jquery-examination
permalink: /post/63644475765/a-basic-jquery-examination/
tags: [javascript, jquery, html5, iinet, blog]
---

<p>An email I sent to iiNet earlier this evening. It bounced: <code>Sorry, no mailbox here by that name. (#5.1.1)</code>&#160;; so posting it here instead!</p>

<hr><p>Hi there,</p>

<p>Thought I would give you a heads up on a bug I found on your site.</p>

<p>My BoB2 modem stopped working earlier this evening - it appears to
have done a factory reset of itself without me asking it to.</p>

<p>That led me to get redirected to
<a href="https://toolbox.iinet.net.au/cgi-bin/playpen/boblogin.cgi" target="_blank">https://toolbox.iinet.net.au/cgi-bin/playpen/boblogin.cgi</a> when I
visited any page. I submitted the login form, as requested by the
page, and absolutely nothing happened - no network activity.</p>

<p>Thus I began to investigate, while waiting on the line for tech support.</p>

<p>You will find below part of the HTML markup, and part of the main
Javascript file that was loaded.</p>

<p>HTML:</p>

<pre><code>&lt;div&gt;
    &lt;p id="username_prompt"&gt;
        Username: &lt;input type="text" name="username" id="boblogin_username" maxlength="50" size="30"&gt;
    &lt;/p&gt;
    &lt;p id="password_prompt"&gt;
        Password: &lt;input type="password" name="password" id="boblogin_password" maxlength="50" size="30"&gt;
    &lt;/p&gt;
    &lt;div id="boblogin_result"&gt;&lt;/div&gt;
    &lt;p&gt;
        &lt;input type="button" id="login_button" class="toolbox_button" value="configure"&gt;
        &lt;br&gt;&lt;br&gt;&lt;span id="loading_image" style="display: none;"&gt;&lt;img id="loading_image" src="https://toolbox.iinet.net.au/images/Throbber.gif"&gt;&lt;/span&gt;
    &lt;/p&gt;
    &lt;p&gt;
        &lt;a href="https://toolbox.iinet.net.au/cgi-bin/playpen/9pointidcheck.cgi" target="__blank"&gt;Forgot login details?&lt;/a&gt;
    &lt;/p&gt;
&lt;/div&gt;
</code></pre>

<p>Javascript:</p>

<pre><code>init = function() {
    $('login_button').onclick = function() { checkLogin(); };
};
</code></pre>

<p>Quickly spotted the bug - if I run:</p>

<pre><code>$('login_button')
[]
</code></pre>

<p>If I run instead:</p>

<pre><code>$('#login_button')
[&lt;input type="button" id="login_button" class="toolbox_button"
value="configure"&gt;]
</code></pre>

<p>It thus appears that $ is jQuery, and you have simply omitted the # in
the selector. This is required whenever selecting based on id
attributes.</p>

<p>That was the main bug, which prevented this page from working.</p>

<p>Further to that, I would suggest a few more improvements.</p>

<p>Again, the same function:</p>

<pre><code>init = function() {
    $('login_button').onclick = function() { checkLogin(); };
};
</code></pre>

<p>Firstly, wrapping checkLogin in a function is extraneous, you could do instead:</p>

<pre><code>$('#login_button').onclick = checkLogin;
</code></pre>

<p>&#8230; as checkLogin is itself a function.</p>

<p>In idiomatic jQuery:</p>

<pre><code>$('#login_button').click(checkLogin);
</code></pre>

<p>Secondly init is declared without using var, and thus pollutes the
global scope. This is bad practice, and the init function is not the
only offender here - all of the functions in this file do the same. On
a relatively simple page like this, it makes little difference, but
should it get more complex, this can cause weird side effects.
Consider not only using var, but also placing these functions within a
scope. A rather nice explanation:
<a href="http://stackoverflow.com/a/13352212/194982" target="_blank">http://stackoverflow.com/a/13352212/194982</a></p>

<p>Finally, this init function is invoked from the HTML markup using:</p>

<pre><code>&lt;script type="text/javascript"&gt;
    init();
&lt;/script&gt;
</code></pre>

<p>One cannot guarantee that the contents of this script tag will be run
after the DOM is rendered. If it so happens that this runs before the
DOM is rendered, the selector will return an empty set, and the click
handler will not be set on the intended button.</p>

<p>Consider instead using:</p>

<pre><code>$(document).ready(init);
</code></pre>

<p>&#8230; within the Javascript file. The additional benefit of this is that
we do not need any in line scripts defined in the markup.</p>

<p>Cheers,
Brendan</p>