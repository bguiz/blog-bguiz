---
title: SVG 9-slice scaling
date: '2015-01-22T21:02+11:00'
comments: true
tags: [svg, scaling]
---

[SVGs](http://en.wikipedia.org/wiki/Scalable_Vector_Graphics) are a thing.

[9-slice scaling](http://en.wikipedia.org/wiki/Scalable_Vector_Graphics) is a thing.

Put the two together, and ...

Turns out that 9-slice scaling isn't so easy to do in SVGs,
because SVGs use a coordinate system where it is not possible to
specify dimensions in terms of both percentages and fixed values.
That is exactly what you need though, for 9-slice scaling!

Fortunately, the SVG specification includes an escape hatch of sorts,
`<foreignObject />` which allows you to embed something other than an SVG within itself.
We can use this to put in a HTML fragment,
which of course can make use of CSS properties to
specify dimensions in terms of both percentages and fixed values!
Once we have got the right positions and size using HTML/ CSS,
we can then place an SVG within it.

That sounds extremely inefficient, doesn't it?
Turns out there is a neat little trick in play here,
enabled by `<symbol />`, `<use /`> and `xlink`.
In the outer SVG, you can define a `<symbol />`,
which contains the full graphic, in a `<g />`, which needs to be sliced.
Subsequently define nine `<symbol />`s each of which have a `viewBox`
to restrict their display to a particular *slice* of the full graphic.
Within the symbol, we have a `<use /`> with an `xlink` to reference the original graphic.
This is actually a big deal, because what happens behind the scenes,
to make all this work, is that the SVG is only rendered once,
and is thus quite efficient,
because each of the nine slices do not need to re-render the original graphic.
This is not the first time which we will make use of this,
because when we use `<foreignObject />`, which contain inner `<svg />`s,
we have `<use /`> with an `xlink` once again,
but this time referencing the sliced graphic `<symbol />`s instead.

It is quite amazing that the reference still works despite going
`SVG --> HTML --> SVG`.
Thank you to whoever ensured that this was part of the SVG specification.
When I did that for the first time, I held my breath,
half expecting it not to work at all!

## Enough rambling, show me the sauce!

I have posted the working SVG [on this gist](https://gist.github.com/bguiz/e3a6d0561f90735d1459).

[![svg-9slice-scaling.svg](https://gist.githack.com/bguiz/e3a6d0561f90735d1459/raw/2564816ff0930478264426e7e2826b3d84149675/svg-9slice-scaling.svg)](https://gist.githack.com/bguiz/e3a6d0561f90735d1459/raw/2564816ff0930478264426e7e2826b3d84149675/svg-9slice-scaling.svg)

Click the link and open it in a new tab/ window,
then resize the window to see what I mean.

## ... and then Internet Explorer happened

- Chrome ... check!
- Firefox ... check!
- IE ... meh.

A key part in the way this technique works is `<foreignObject />`.
Unfortunately, Internet Explorer does not support this so that goes out the window.
If anyone has figured out how to make 9 slice scaling work in IE,
I would be most interested!
