---
title: Publish websites using ReactJs
date: '2016-04-18T21:07+11:00'
tags: [reactjs, static site generation, javascript, nodejs, webpack]
socialImage: /presentations/publish-websites-reactjs/img/publish-websites-reactjs-orly-book-cover.png
---

tl;dr= Use ReactJs to publish static + isomorphic websites

`git push -> travis -> webpack -> reactjs -> gh-pages`

## `reactpub`

React can render both to in-browser DOM -
which is the default use case -
as well as to an in-memory string -
which is usually used in server-side rendering.
Thanks to
[static-site-generator-webpack-plugin](https://github.com/markdalgleish/static-site-generator-webpack-plugin)
doing the heavy lifting,
and a few node modules of my own,
it can also be used to generate static sites.
This is perfect for hosting on Github Pages,
or similar hosts.

<!-- more -->

I have switched from using
[docpad](https://github.com/docpad/docpad)
to this Webpack + ReactJs solution for
[my own blog](http://blog.bguiz.com),
and managed to cut the build times down by an order of magnitude.

... but wait, there's more!
Since ReactJs renders on both client and server,
the static site can (optionally)
let React "take over" in the browser,
and the static webpage
turns into a Javascript app,
where you can navigate between one page and another
without a browser refresh or network request.
exactly like it does in an *isomorphic website*! &lowast;1

This makes for a very snappy experience
for those browsing your website!

## A Talk

I'll be giving a talk about this at the next ReactJs meetup, covering:

- webpack + [markdalgleish/static-site-generator-webpack-plugin](https://github.com/markdalgleish/static-site-generator-webpack-plugin)
- [reactjs/react-router](https://github.com/reactjs/react-router)
- [nfl/react-helmet](https://github.com/nfl/react-helmet)
- [bguiz/find-posts](https://github.com/bguiz/find-posts)
- [bguiz/reactpub](https://github.com/bguiz/reactpub)
- [bguiz/autodocs](https://github.com/bguiz/autodocs)

... link to the slides will be posted here after the talk.

----

## Update

Gave a talk on this at a ReactJs meetup,
and as promised, here are
[the slides for "Publish Websites with ReactJs"](/presentations/publish-websites-reactjs/ "Slides for Publish Websites with ReactJs").

You can find that, along with slides for other talks by me,
at the all new [presentations page](/presentations/ "Presentations by Brendan Graetz").

----

## Footnotes

&lowast;1 Also known as *universal* Javascript
