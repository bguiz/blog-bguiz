---
title: Use UNIX tools
date: '2017-01-26T21:07+11:00'
tags: [bash, unix]
socialImage: /images/posts/por-que-no-los-dos-page000009.png
---

It has been a while since my last post...
So I thought I might combat the inertia with a fun project:

Presenting:
[video2flipbook](https://github.com/bguiz/video2flipbook)

What it does:
Downloads a video, splits it up into frames, and assembles those frames back into printable pages -
which you can then print, cut, and finally glue -
and *voila* a flip book of your favourite video!

Best of all, it does all of that using just one
[simple shell script](https://github.com/bguiz/video2flipbook/blob/develop/video2flipbook.sh).

## Not my idea

I cannot lay claim to the ingenuity behind this idea:
[This one](https://www.reddit.com/r/videos/comments/5pvu1m/i_wrote_a_program_to_turn_an_animated_gif_into_a)
comes right out of the hive mind of Reddit.

I quickly found that the author of that post had his
[code on github](https://github.com/stupotmcdoodlepip/Print-A-Gif),
which I promptly checked out,
and I discovered that he had the binary executable of
[ImageMagick](https://github.com/stupotmcdoodlepip/Print-A-Gif/blob/master/Print-A-Gif/Print-A-Gif/bin/Release/magick.exe)
included within his project.

## Reinventing the wheel?

![Reinventing the wheel](https://c1.staticflickr.com/7/6011/5964727769_0a003f9edc_b.jpg)

Why rewrite something that already exists?
If there are tools out there that already get the job done reasonably well,
then just use them.
If one strings a bunch of them different tools together,
one can create novel ideas with very little effort.

In fact, this is articulated in the
[UNIX philosophy](https://ia802701.us.archive.org/12/items/bstj57-6-1899/bstj57-6-1899_text.pdf)

> (i) Make each program do one thing well. To do a new job,
> build afresh rather than complicate old programs by adding new "features."
>
> (ii) Expect the output of every program to become the input to
> another, as yet unknown, program. Don't clutter output
> with extraneous information. Avoid stringently columnar or
> binary input formats. Don't insist on interactive input.
>
> (iii) Design and build software, even operating systems, to be
> tried early, ideally within weeks. Don't hesitate to throw
> away the clumsy parts and rebuild them.
>
> (iv) Use tools in preference to unskilled help to lighten a
> programming task, even if you have to detour to build the
> tools and expect to throw some of them out after you've
> finished using them.

(Douglas McIlroy, Bell Labs, 1978)

## Prescription

Write small independent programs,
designed such that each of them can receive input from the others' output.

If there already is a small independent program which
does this already, then better yet,
the task at hand becomes much simpler:
Take the outputs of each of these programs and feed them as inputs into the next one.
