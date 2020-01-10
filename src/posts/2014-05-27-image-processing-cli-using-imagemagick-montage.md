---
comments: true
title: Creating images quickly using montage from imagemagick
date: '2014-05-27T07:01+11:00'
originalUrl: http://blog.bguiz.com/post/86931632540/image-processing-cli-using-imagemagick-montage
permalink: /post/86931632540/image-processing-cli-using-imagemagick-montage/
tags: [imagemagick, gimpfu, gimp, montage, cli, image, image manipulation]
---

<p>I was looking for a way to combine images together programmatically, and spent some time dabbling around in <a href="http://www.gimp.org/docs/python/" target="_blank"><code>gimpfu</code> python land</a> without getting very far at all.</p>

<p>Who would have thought just placing one image next to another could get so hairy?</p>

<p><img src="https://31.media.tumblr.com/2c27307056c3243b3f4ba3ce20cc547b/tumblr_inline_n66mmnEQas1rer3hy.png" alt="This image was created using a single command line"/></p>

<p>What if I said that it was possible to create the above image from three images using a single command line? Read on!</p>

<p>I had one of those &#8220;Aha!&#8221; moments of discovery when I chanced upon this article: <a href="http://www.imagemagick.org/Usage/montage/" target="_blank">Imagemagick montage usage</a>.</p>

<p><code>montage -geometry 200X200+2+1 foo.png bar.png foobar.png</code></p>

<p>No script involved, just a single command line; and that resizes both <code>foo.png</code> and <code>bar.png</code> to 200 by 200 pixels, adds some default spacing between them (two pixels horizontal, one pixel vertical), and saves the output to <code>foobar.png</code>.</p>

<p>If you want the background to be transparent, and to add a drop shadow, like I did, it is as simple as:</p>

<p><code>montage -shadow -background None -geometry 200X200+2+1 foo.png bar.png foobar.png</code></p>

<p>You can even force the images to "tile" in a single horizontal row, like so:</p>

<p><code>montage -shadow -background None -tile x1 -geometry 200x150+5+5 foo.png bar.png foobar.png</code></p>

<p>... or a single vertical row, like so:</p>

<p><code>montage -shadow -background None -tile 1x -geometry 200x150+5+5 foo.png bar.png foobar.png</code></p>

<p>That is all that I needed for what I was doing, but this article explores quite a few other nifty things that the <code>montage</code> tool does - check out the polaroid filter:</p>

<p><img src="http://www.imagemagick.org/Usage/montage/polaroid_overlap.jpg" alt="Imagemagick montage with polaroid filter"/></p>
