---
comments: true
title: SASS in 5 minutes
date: '2013-06-17T09:15+11:00'
originalUrl: http://blog.bguiz.com/post/53149110199/sass-in-5-minutes
permalink: /post/53149110199/sass-in-5-minutes/
tags: [html5, css, sass, blog]
---

<p><a href="http://sass-lang.com/" title="SASS" target="_blank">SASS - syntactially awesome stylesheets</a> - is a meta-language that compiles to <a href="https://en.wikipedia.org/wiki/Cascading_Style_Sheets" title="CSS" target="_blank">CSS</a>, that has gained much popularity of late. Having learnt it recently, I thought to put together some material that would cover the breadth of the topic so as to codify my own knowledge of it. After all, <a href="http://ideas.time.com/2011/11/30/the-protege-effect/" title="The Protégé Effect" target="_blank">"while we teach, we learn."</a></p>
<p>This is a brief overview, and assumes prior knowledge of CSS - don&#8217;t expect a deep dive!</p>
<h2 id="scss-vs-sass">SCSS vs SASS</h2>
<p>Valid CSS is valid SCSS, but invalid SASS.</p>
<p>To get SASS from SCSS, you simply discard curly braces and semi-colons (<code>{};</code>), relying on whitespace indentation instead, the same way blocks are implicit in python/ coffeescript. Another difference is that for mixins, instead of using <code>@include</code>, and <code>@mixin</code>, you use <code>+</code> and <code>=</code> instead.</p>
<p>I have chosen to write all the examples below in SASS over SCSS for the sake of brevity, and you can easily obtain SCSS by applying the reverse of the instructions above.</p>
<h2 id="import">Import</h2>
<p><code>//app.sass</code></p>
<pre><code>@import "nav.sass"
@import "_heading.sass"
</code></pre>
<p>If a SASS file&#8217;s name is prefixed with an underscore <code>_</code>, it is considered a partial, and will not be compiled into a CSS file. In this example, we will have an <code>app.css</code> and a <code>nav.css</code>, but not have a <code>heading.css</code>.</p>
<h2 id="nest">Nest</h2>
<p><code>//app.sass</code></p>
<pre><code>.a
  width: 100%
  .b
    color: #fa0
  &amp;.c
    color: #0e7
  .d &amp;
    color: #333
</code></pre>
<p><code>//app.css</code></p>
<pre><code>.a {
  width: 100%;
}
.a .b {
  color: #fa0;
}
.a.c {
  color: #0e7;
}
.d .a {
  color: #333
}
</code></pre>
<p>When nesting selectors, the nested selector has an implicit parent selector, and a space prefixed. If you wish to get rid of the space, or for the parent selector to appear after the nested selected, as with the cases of <code>.c</code> and <code>.d</code> respectively, you have to explicitly specify the parent selector using the <code>&amp;</code> symbol.</p>
<p>SASS makes it easy to do nested selectors, but remember that its output is still CSS. Stick to a maximum of 3 levels of nested selectors.</p>
<p><code>//app.sass</code></p>
<pre><code>.a
  font
    family: Arial, sans-serif
    size: 18pt
</code></pre>
<p><code>//app.css</code></p>
<pre><code>.a {
  font-family: Arial, sans-serif;
  font-size: 18pt;
}
</code></pre>
<p>Properties can also be nested, where they have matching namespaces - i.e. hyphen (<code>-</code>) separated property names.</p>
<h2 id="variables">Variables</h2>
<p><code>//app.sass</code></p>
<pre><code>@import "_sety.sass"
$x: 1.5em
$y: bottom !default
.a
  font-height: $x
  padding-#{$y}: $x + 1.0em
</code></pre>
<p><code>//_sety.sass</code></p>
<pre><code>$y: top
</code></pre>
<p><code>//app.css</code></p>
<pre><code>.a {
  font-height: 1.5em
  padding-top: 2.5em
}
</code></pre>
<p><code>$x</code> will always be set to <code>1.5em</code>, whereas <code>$y</code> will be set to <code>bottom</code>, only if it hasn&#8217;t already been set, perhaps in an imported file.</p>
<p>RHS values may use the variable name directly when referencing it, e.g. <code>$x</code>; whereas LHS values - usually property names and selectors - must escape the variable Ruby-style, e.g. <code>#{$x}</code>.</p>
<h2 id="mixin-extend">Mixin, Extend</h2>
<p><code>//app.sass</code></p>
<pre><code>=boxsz($type: border-box)
  -moz-box-sizing: $type
  -webkit-box-sizing: $type
  box-sizing: $type

%bord
  border: 2px solid

.a
  @extend bord
  +boxsz
</code></pre>
<p><code>//app.css</code></p>
<pre><code>.a {
  border: 2px solid
  -moz-box-sizing: border-box
  -webkit-box-sizing: border-box
  box-sizing: border-box
}
</code></pre>
<p>Mixins are blocks of reusable code, which can accept parameters.</p>
<p>Mixins should be defined before they are inluded - import order matters.</p>
<p>Here <code>border-box</code> is defined as the default value of the <code>$type</code> parameter.</p>
<p>A <code>%</code> preceding a selector denotes it as a placeholder selector, meaning that it can be referenced by <code>@extend</code> but will not output to the CSS file. If you remove the <code>%</code> symbol, it becomes a regular selector, and will be output to the CSS. Use placeholder selectors to reduce bloat.</p>
<p>Use mixins when there are variations when reused, use extend when there are no variations when reused. Thus, if you find yourself using a mixin without a parameter, you may consider switching to extend.</p>
<h2 id="functions">Functions</h2>
<p><code>//app.sass</code></p>
<pre><code>@function calcwidth($w)
  $fullwidth: 720px
  @if $w &lt;= 72px
    @return 10%
  @else
    @return percentage($w / $fullwidth)

.a
  width: calcwidth($w: 360px)
</code></pre>
<p><code>//app.css</code></p>
<pre><code>.a {
  width: 50%;
}
</code></pre>
<p>Here we define a function <code>calcwidth</code> that takes in a single parameter that has no default value. This function has a single local variable <code>$fullwidth</code>, and makes use of the inbuilt SASS function <code>percentage</code>. This function also uses an <code>@if .. @else</code> conditional block to specify a minimum for its return value.</p>
<p>This function is called from within the <code>.a</code> selector. The parameter has been passed into this function using a more verbose syntax, which is usually used for functions with many parameters.</p>
<h2 id="colour">Colour</h2>
<p><code>//app.sass</code></p>
<pre><code>$mycolour: #fff
.a
  background-color: rgba($mycolour, 0.75)
  color: complement($mycolour)
</code></pre>
<p><code>//app.css</code></p>
<pre><code>.a {
  background-color: rgba(255,255,255,0.75);
}
</code></pre>
<p>SASS identifies where a colour is used in the <code>rgba</code> function, and automatially converts it to the expected format.</p>
<h2 id="iteration">Iteration</h2>
<p><code>//app.sass</code></p>
<pre><code>$dirs: top left

$m: 5px
$y: 0
.a
  @each $dir in $dirs
    margin-#{$dir}: $m
    $m: $m + 10px
  @for $x from 0 through 1
    .for#{$x}
      left: $x * 100px;
  @while $y &lt; 3
    .while#{y}
      left: $y * 100px;
      $y: $y + 2
</code></pre>
<p><code>//app.css</code></p>
<pre><code>.a {
  margin-top: 5px;
  margin-left: 15px;
}
.a .for0 {
  left: 0px;
}
.a .for1 {
  left: 100px;
}
.a .while0 {
  left: 0px;
}
.a .while2 {
  left: 200px;
}
</code></pre>
<p>SASS provides three different means to perform iteration: <code>@each</code>, <code>@for</code>, and <code>@while</code> - in increasing order of verbosity and control afforded.</p>
<h2 id="media-queries">Media Queries</h2>
<p><code>//app.sass</code></p>
<pre><code>=respond-to($mediaProperty, $expectedValue)
  @media ($mediaProperty: $expectedValue)
    @content

.a
  +respond-to(max-width, 520px)
    width: 100%
</code></pre>
<p><code>//app.css</code></p>
<pre><code>.a {
  width: 100%;
}
</code></pre>
<p>This pattern utilises media queries to detect if the current device&#8217;s <code>max-width</code> is <code>520px</code>.</p>
<p>The mixin in this case is passed not only parameters, but also a block. The mixin accesses this block using <code>@content</code>.</p>
<p>This pattern is useful in creating responsive design targeting multiple devices.</p>