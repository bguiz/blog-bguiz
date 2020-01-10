---
comments: true
title: On leading '.' in UNIX file systems
date: '2013-03-16T01:30+11:00'
originalUrl: http://blog.bguiz.com/post/45419440319/on-leading-in-unix-file-systems
permalink: /post/45419440319/on-leading-in-unix-file-systems/
tags: [unix, bash]
---

<p><a class="tumblr_blog" href="http://slashnull.tumblr.com/post/45268381268/cjbrowne-kr-studios-why-do-some-files-have-a" target="_blank">slashnull</a>:</p>
<blockquote>
<p><span>The story of this is fascinating, actually. Most Unix filesystems/shells represent the current directory as “.”, kind of like the self pointer in an class instance. ls, in it’s verbose form, or ls -la, does display the root directory (.) and the parent directory (..), but the short and practical form, or ls, doesn’t because the current directory is kind of implicit since, y’know, you’re inside it; displaying . would be kind of like starting enumerating what’s in a room by saying “the room”; this hack was implemented by simply ignoring whatever starts with a “.”, because that would usually be either the current or the parent dir. And then people started to think that this bug in the ls utility was actually a feature and started to lead file names by the dot for files they didn’t want displayed by straight ls, mostly config files and buffers for text editors and other people who do destructive file writes.</span></p>
<p>The Epic of Unix is filled with those little bugs which became hacks which became idioms which became features which became explicit or implicit standards, growing organically because they “just worked”(TM).</p>
</blockquote>