---
title: My First Rust Program - A Web Server Using Nickel.rs and rust-postgres
date: '2014-08-02T10:59+11:00'
comments: true
tags: [rust, postgres, nickelrs, experiments]
---

[Rust](http://www.rust-lang.org/) is a new programming language,
from Mozilla, which appeared on my radar recently.

I wanted to get my feet wet by writing a basic HTTP server that could read and write data from a database,
and here is my first attempt:
[nickel-postgres](https://github.com/bguiz/rust-scratch/blob/0c843ac52b4de3ae83e44ca20df74923df2611d1/nickel-postgres/src/main.rs "Newbie code alert!")

There are many things that I would like to improve about it -
(see the numerous `//TODO` comments) -
but I thought I would share my rookie attempt!

Many thanks to [Steve Fackler](https://github.com/sfackler),
author of [rust-postgres](https://github.com/sfackler/rust-postgres),
for giving me a couple of pointers in the right direction.

----

<blockquote class="twitter-tweet" lang="en"><p>Excited to see people building stuff upon nickel.rs and blog about it. <a href="http://t.co/PDN5spSKH5">http://t.co/PDN5spSKH5</a> <a href="https://twitter.com/hashtag/rustlang?src=hash">#rustlang</a> <a href="https://twitter.com/hashtag/Rust?src=hash">#Rust</a></p>&mdash; Christoph Burgdorf (@cburgdorf) <a href="https://twitter.com/cburgdorf/statuses/496005695771525121">August 3, 2014</a></blockquote>
