---
title: Migrating from Tumblr and Wordpress to Docpad - Static Site Generation
date: '2014-07-08T23:30+11:00'
comments: true
tags: [blog, tumblr, wordpress, docpad, static site generation, markdown]
---

I currently write my blog using [tumblr](http://tumblr.com),
and previously I blogged using [wordpress](http://wordpress.org).
While both of these are great platforms,
they share common pitfalls, when it comes to giving you control over your writing.

I wanted to be able to have a copy of all the assets that comprise my blog,
in its entirety, on my hard disk, and be able to modify and publish them as I pleased.
I also wanted to be able to include fancier things in my pages -
like embed a Github gist, or create my own d3 visualisation,
or, well why not take it to an extreme,
create an AngularJs app running within one of my posts;
and I wanted to be able to do all of these things without having to log into
some website hosted in a far away country,
and wait for all those bytes to fly across several oceans and back each time.

Flexibility and control - that is key.

### Enter Static Site Generators

For a blog, the contents are almost static.
The server only needs to send a different response for a page,
when that page has been modified by the author.
The exception to this are comments,
but with the advent of [disqus](http://disqus.com),
that is no longer even a consideration.

A content management system, including both tumblr and wordpress,
builds each page upon demand, which can be an expensive operation,
as it involves database queries, assemlby of templates, et cetera.
Quite often, when a CMS driven site receives a lot of concurrent visitors,
its response times start to lag noticeably.
To work around this, it has become common practice to cache the results of
each dynamically generated page, using tools like
[memcached](http://memcached.org/).

Static site generation is all about taking caching to the next level.
The author of the site knows exactly when the previous cache needs to be invalidated -
when they write a new post or update an existing one.
Why not, at that point of time, generate the cache contents,
and upload them directly to the server?
Well, that is exactly what static site generators do;
the static files are the cache

### What about collaboration?

One of the big advantages of a CMS is that it enables collaboration.
If everyone just logs into the same website,
be it `wordpress.org` or `tumblr.com`,
and made their edits on the site,
then there is only one copy of the site,
and therefore it is easy to manage collaboration on the contents of the site.

Indeed that is a very direct and simple solution that addresses collaboration.
We do, however, have a more sophisticated solution,
that is already readily available:
[distributed version control systems](http://en.wikipedia.org/wiki/Distributed_revision_control).
Tools such as [git](http://git-scm.com/) and
[mercurial](http://mercurial.selenic.com/)
have solved the distributed collaboration problem in a rather elegant way.
All collaborators get to keep a copy of the site that they are contributing to
on their own computers, and thus get the benefits that come along with that.
When they are done writing a post,
they simply have to *push* their latest contributions to the *master* copy.
There are built in mechanisms to resolve any conflicts,
for example, if two collaborators edit the same file.

### Docpad

After reviewing the top few [in this humungous list](http://staticsitegenerators.net/),
I have decided that [Docpad](https://github.com/bevry/docpad)
suits my needs the best, and I should be able to hit the ground running.
I will give it a go, and the best part is, if I do not like it,
my data is not stuck on some server somewhere -
it will all be on my computer,
and easily moved to a different static site generator.

In the next post, I will be tackling that very problem:
With hosted CMSs, like tumblr and wordpress,
getting your data out can be a little tricky;
as can be transforming it such that it can be used in a static site generator.
