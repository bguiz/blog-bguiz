---
comments: true
title: How to Write a BroccoliJs Plugin
date: '2014-06-16T08:02+11:00'
originalUrl: http://blog.bguiz.com/post/88894802099/broccolijs-plugin-how-to-write
permalink: /post/88894802099/broccolijs-plugin-how-to-write/
tags: [broccolijs, nodejs, javascript, tutorial, blog]
---

<p>Recently, I released <a href="https://github.com/bguiz/broccoli-sprite" target="_blank">broccoli-sprite</a>.
I was just a week into using BroccoliJs for the first time,
and writing a plugin for a build system that I had barely used
was understandably tricky.</p>

<p>While writing it, I googled quite a bit for how to write a BroccoliJs plugin,
but there really has not been much written about it.
I would like to make it easier for others doing the same thing,
so here is a quick overview of the process of creating a BroccoliJs plugin.</p>

<h2>Basics</h2>

<p>What is <a href="https://github.com/broccolijs/broccoli" target="_blank">BroccoliJs</a>?
Think [GruntJs], but different.
Different how?
Well in a number of ways. Its creator, Jo Liss,
[explains its philosophy in her post on its release].</p>

<p>tl;dr= Plugins can chain their output to one another,
and the built-in watch only rebuilds what has changed rather than the whole lot.</p>

<p>There is one more thing to it:
If you are building an app using <a href="https://github.com/stefanpenner/ember-cli" target="_blank">ember-cli</a>,
you will <em>need</em> to use BroccoliJs.</p>

<h2>Sold! Now Time to Write a BroccoliJs Plugin</h2>

<p>The first thing to take a look at is the
<a href="https://github.com/broccolijs/broccoli#plugin-api-specification" target="_blank">plugin API specification</a>.
Looks very straight forward:
There are just two things that you need to implement:
<code>tree.read()</code>and <code>tree.cleanup()</code>.
The former, however, does not really do much that is useful, on its own at least.</p>

<h2>Getting started</h2>

<p>All BroccoliJs plugins are NodeJs modules that should be installed
inside a project</p>

<pre><code>cd my-project/
npm install --save-dev broccoli-my-plugin
</code></pre>

<p>… and thus the first step is to create an <code>npm</code> package:</p>

<pre><code>mkdir broccoli-my-plugin #replace `my-plugin` with the name you would like
cd broccoli-my-plugin/
#if you plan to use version control (which is a good idea), do it now, e.g.
#git init &amp;&amp; git flow init
npm init #this creates `package.json`
#be sure to specifiy one of the keywords as `broccoli-plugin`
</code></pre>

<p>Now you will need to edit <code>index.js</code>, which exports your plugin:</p>

<pre><code>var BroccoliMyPlugin = function BroccoliMyPlugin() {};
modules.exports = BroccoliMyPlugin;
</code></pre>

<h3>Extending an Existing BroccoliJs Plugin</h3>

<p>BroccoliJs has several plugins, that are designed to be extended.
The one that we will look at here is
<a href="https://github.com/broccolijs/broccoli-writer" target="_blank">broccoli-writer</a>.</p>

<p>Install it:</p>

<pre><code>npm install broccoli-writer
</code></pre>

<p>Edit <code>index.js</code>:</p>

<pre><code>var brocWriter = require('broccoli-writer');

var BroccoliMyPlugin = function BroccoliMyPlugin() {
  if (!(this instanceof BroccoliMyPlugin)) {
    return new BroccoliMyPlugin();
  }
};
BroccoliMyPlugin.prototype = Object.create(brocWriter.prototype);
BroccoliMyPlugin.prototype.constructor = BroccoliMyPlugin;
BroccoliMyPlugin.prototype.description = 'my-plugin';
modules.exports = BroccoliMyPlugin;
</code></pre>

<p>Here we have simply extended the function exported by broccoli-writer
using prototypical inheritance.
At the moment it does not do anything at all,
and we will add that next.</p>

<h3>Adding functionality</h3>

<p>Firstly, we should make the plugin able to accept some input parameters.
All BroccoliJs plugins <em>must</em> accept an input tree as its first argument.
Any subsequent parameters are completely up to you as the plugin developer.
A common pattern, however, seems to be to accept just one parameter,
and <code>options</code> hash, which is what we will do here.</p>

<pre><code>var brocWriter = require('broccoli-writer');

var BroccoliMyPlugin = function BroccoliMyPlugin(inTree, options) {
  if (!(this instanceof BroccoliMyPlugin)) {
    return new BroccoliMyPlugin(inTree, options);
  }
  this.inTree = inTree;
  this.options = options || {};
};
BroccoliMyPlugin.prototype = Object.create(brocWriter.prototype);
BroccoliMyPlugin.prototype.constructor = BroccoliMyPlugin;
BroccoliMyPlugin.prototype.description = 'my-plugin';
modules.exports = BroccoliMyPlugin;
</code></pre>

<p>We add the <code>inTree</code> and <code>options</code> parameters to the constructor function,
and then save them in the instance.
If you wish to specify default options,
or other instance variables,
this is where you would parse and set them.</p>

<p>Next we can implement the main functionality,
the part where we specify the thing that this plugin does.
Since this plugins extends the <code>broccoli-writer</code> plugin,
we do this by specifying a <code>write</code>function:</p>

<pre><code>BroccoliMyPlugin.prototype.write = function(readTree, destDir) {
  var self = this;
  return readTree(this.inTree).then(function (srcDir) {
    /* use srcDir and information from self.options to figure out which files to read from */
    /* use destDir and information from self.options to figure outwhich files to write to */
    /* synchronously read input files, do some processing, and write output files */
  });
};
</code></pre>

<p><code>readTree</code> is passed in as the first variable to the <code>write function,
and this is a function that returns a promise that you should return.
Call</code>then()`on the promise, and do the processing in the callback function.
Here you do whatever it is the plugin needs to do;
but you have to do it synchronously - no callbacks allowed.</p>

<h3>Asynchronous Plugins</h3>

<p>Most of the time however, we want to do things asynchronously -
after all, that is the NodeJs way!
See Mixu&#8217;s article on <a href="http://book.mixu.net/node/ch7.html" target="_blank">control flow in NodeJs</a>
for an excellent introduction to asynchronous code in NodeJs.
We need to get a little more advance than this however,
and use promises instead of callbacks.
Not to worry though, promises are actually much more straight forward to use
than callbacks!
In fact, we have already used the one returned by the <code>readTree</code> function previously.</p>

<p>We shall use promises implemented in the RSVP library,
as that appears to be the most popular choice amongst Broccoli plugins;
although you are free to use any other promise library.</p>

<p>Install RSVP:</p>

<pre><code>npm install --save rsvp
</code></pre>

<p>Include RSVP:</p>

<pre><code>var rsvp= require('rsvp');
</code></pre>

<p>Modify the <code>readTree</code> callback to create a promise an return it.</p>

<pre><code>return readTree(this.inTree).then(function (srcDir) {
  /* use srcDir and information from self.options to figure out which files to read from */
  /* use destDir and information from self.options to figure outwhich files to write to */
  var promise = new rsvp.Promise(function(resolvePromise, rejectPromise) {
    /* asynchronously read input files, do some processing, and write output files,
       for example, here we have `someAsyncFunc` that does this` */
    someAsyncFunc(function(err, asyncData) {
      if (err) {
        rejectPromise(err);
      }
      else {
        resolvePromise(asyncData);
      }
    });
  });
  return promise;
});
</code></pre>

<p>Here, since we return a promise, BroccoliJs knows to wait until it is
either resolved or rejected.
For the more astute, you will notice that here we actually have
a promise within a promise, as <code>readTree</code> itself returns a promise.
We could possibly refactor this to chain the promises instead of nesting them,
but I shall leave that as an exercise for the reader!</p>

<h2>Fin</h2>

<p>Now we have a functional BroccoliJs plugin, and it is ready to be published:</p>

<pre><code>npm publish
</code></pre>

<p>… and now anyone can <code>npm install</code> it!</p>

<h2>Going further</h2>

<p>Besides <a href="https://github.com/broccolijs/broccoli-writer" target="_blank">broccoli-writer</a>,
there is also <a href="https://github.com/broccolijs/broccoli-filter" target="_blank">broccoli-filter</a>,
and <a href="https://github.com/rjackson/broccoli-caching-writer" target="_blank">broccoli-caching-writer</a>,
which I have not covered here.</p>

<p>Depending on what your plugin does, you might want to extend these instead.
One great way to learn more about writing BroccoliJs plugins is to
<a href="https://www.npmjs.org/search?q=broccoli-plugin" target="_blank">search for existing ones</a>,
and examine the source code for each one.
Most of them are fairly simple, only containing a single <code>index.js</code> file,
which means that you will likely find what you are looking for rather quickly.
In fact, that is precisely what I did to get up to speed,
when writing <a href="https://github.com/bguiz/broccoli-sprite" target="_blank">brocoli-sprite</a>.</p>

<p><a href="https://github.com/bguiz/broccoli-sprite" target="_blank"><img src="https://nodei.co/npm/broccoli-sprite.png?compact=true" alt="NPM"/></a></p>

<p>Good luck with yours!</p>