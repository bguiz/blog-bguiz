---
comments: true
title: A BroccoliJs plugin for creating CSS image sprites
date: '2014-06-14T11:46+11:00'
originalUrl: http://blog.bguiz.com/post/88719320815/broccoli-sprite-released
permalink: /post/88719320815/broccoli-sprite-released/
tags: [broccolijs, nodejs, javascript, release, blog, css, sprite, broccoli sprite, ember cli]
---

<p><a href="https://github.com/bguiz/broccoli-sprite" target="_blank"><img src="https://nodei.co/npm/broccoli-sprite.png?compact=true" alt="NPM"/></a></p>

<p>After much frustration attempting to get <a href="https://github.com/g13013/broccoli-compass" target="_blank"><code>broccoli-compass</code></a> to work,
including asking a <a href="http://stackoverflow.com/q/24074351/194982" target="_blank">question on Stackoverflow</a>,
and getting no responses despite offering a bounty on it,
I decided to bite the bullet and write my own
<a href="https://github.com/broccolijs/broccoli" target="_blank">BroccoliJs</a> plugin.</p>

<p>It was a little tough, because I am completely new to BroccoliJs,
having used GruntJs up until now.
In order to build an app using
<a href="https://github.com/stefanpenner/ember-cli" target="_blank">ember-cli</a>,
however, switching to BroccoliJs was a necessity.</p>

<p>So I present <a href="https://github.com/bguiz/broccoli-sprite" target="_blank">broccoli-sprite</a>,
hot off the presses.</p>

<p>To install it:</p>

<pre><code>npm install broccoli-sprite
</code></pre>

<p>To use it:</p>

<pre><code>var broccoliSprite = require('broccoli-sprite');
var spritesTree = broccoliSprite('public', {
  src: [
    'public/images/sprites/*.png'
  ],
  spritePath: 'assets/sprites.png',
  stylesheetPath: 'assets/sprites.css',
  stylesheet: 'css',
  stylesheetOptions: {
    prefix: 'sprite-',
  },
});
</code></pre>

<p>More detailed instructions in the
<a href="https://github.com/bguiz/broccoli-sprite#a-broccoli-plugin-for-sprite-generation" target="_blank">README</a>.</p>