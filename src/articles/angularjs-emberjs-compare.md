---
title: AngularJs vs EmberJs - A Comparison
date: '2014-11-08T11:03+11:00'
comments: true
tags: [angularjs, emberjs, javascript]
---

So you want to build a single page web application (SPA),
and you want to pick a framework to do it with.
There are plethora of them out there -
[TodoMVC](http://todomvc.com/) lists 15 "pure Javascript" implementations,
and a total of over 60 MV\* frameworks.
How do you confidently pick from them all?

Most would start by reading blog posts and various reviews online,
but that only gets you so far,
as the majority of them are written by someone who belongs to
one camp or the other,
and quite often roots very strongly for their chosen framework.
It was quite hard to find any objective opinions.

## The Book

Faced with this task myself,
I began to collect opinions from both sides,
and filter out the vitriol.
More importantly, I tried out and built prototype applications with them.
In light of time, I only did this for two frameworks:
AngularJs and EmberJs.

I have assembled what I have learned into a short 50 page book,
which you can
[read online](http://angularjs-emberjs-compare.bguiz.com/),
or [read as an ebook](https://leanpub.com/angularjs-emberjs-compare/).

![AngularJs vs EmberJs on Leanpub](https://s3.amazonaws.com/titlepages.leanpub.com/angularjs-emberjs-compare/large?1415362544)

## Do you actually need a SPA?

The first thing you will need to do is decide whether you really need an MVC framework.
This boils down to two questions:

- Do you want "single page", or do you want "application"?
- Do you want a presentation layer, or do you want the full structure of models, views, and controllers?

If what you are building can be more accurately described as an app
than a website, then sure, a SPA framework such as AngularJs or EmberJs is apt.
Otherwise, it is probably overkill.
For example while you can use AngularJs/EmberJs to create a blog,
you are probably better off with a simpler framework or library.

If you wish for Javascript to mostly just do the presentation logic -
views and templating -
you are probably better off with a framework like Famo.us or ReactJs,
as they focus on that exclusively.

## Which SPA is best?

Looking online on this topic, most posts fit one of these two categories:

- Framework X is the best framework because it has these features
- Framework Y is the lousiest framework because it has these problems

The latter type is even even less helpful when they focus on edge cases,
which you are bound to run into in *any* framework.

Reading these articles might give you some perspective on each framework,
but what is lacking is detailed a side-by-side comparison of the parts of each framework.
This is precisely what [my book](https://leanpub.com/angularjs-emberjs-compare/ "AngularJs vs EmberJs - a comparison") does.

However, in this post, we will skip that,
and get into the guts of how to make that decision right away.
The implied premise of this is that there is **no best framework**,
but there most certainly *is* a **best framework for your particular app**.

Here are some questions you may want to mull over when picking a framework.

### 1. What do you like or dislike about the syntax?

Most of the time, you will be writing code.
Therefore **syntax matters** a lot.
Examine the sample code for a router, a model, a view, a controller, and a component.
Can you see yourself writing in this style,
and do you have a preference for one style over the other?

I feel that it is important to familiarise yourself with what the code looks like
before picking a framework, not only because you will be writing it,
but also because it gives you a glimpse into higher order functionality
from the get go.

For example, you might look at AngularJs' router definition syntax and
compare it to EmberJs' router definition syntax;
and infer that in AngularJs all routes are flat,
whereas in EmberJs routes can be hierarchical.
Some further research might indicate that hierarchical routes are indeed possible
in AngularJs, but a 3rd party library, `ui-router` is necessary.

Another example might be that you compare AngularJs' component definition syntax,
using directives with `restrict`, `transclude`, and isolate `scope`,
to EmberJs' component definition syntax using `Ember.Component`.

For each of these examples,
you can think about it in the context of the app that you plan to build.
Perhaps you already know whether your app will need hierarchical routes.
Perhaps you already know whether a standard component will do,
or if you need a higher degree of flexibility when defining components.

All these sorts of things can, and will cross your mind,
simply by familiarising yourself with the syntax when writing
code using each framework.

### 2. What kind of learning curve do you want?

- If you prefer an easy learning curve up front, and do not mind a steep learning curve later on, then AngularJs
- If you prefer a steep learning curve up front, then EmberJs

This, of course, does not apply to every one.
If you have prior experience with Ruby on Rails,
then the learning curve for EmberJs is likely to not be as steep up front.
If you have prior experience with Java,
then concepts such as dependency injection in AngularJs are going to be familiar.

This is true, not just because of familiarity or similarity in code,
but also because of the history and philosophy of the authors,
and what they were inspired by when they created the frameworks.

One other thing that you should do,
is to check out the **documentation** for each of the projects.
Survey them for their quality:
How easy it is to find information about something,
and how complete the documentation is.
My opinion is that both of them have rather solid documentation -
at least they do now -
but many others have complained about their shortcomings,
so make up your own mind when you take a look.

### 3. What else do you need to learn or use to become proficient?

In addition to the framework itself,
you will also need to learn how to use other libraries or tools,
in order to develop your app.
You do not **necessarily need to** use any of these,
as both frameworks can be used in their own right.
However, in practice, when developing a serious app,
this is what most developers use.
It is, therefore, a good idea to know what these are ahead of time,
before jumping into one or the other.

With AngularJs, you will most likely need to learn:

- `ui-router` (an alternative, more power router)
- `gulp` or `grunt` (build tools)

With EmberJs, you will most likely need to learn:

- `ember-cli` (a command line utility used to scaffold and build EmberJs apps)
- `broccoli` (a build tool)
- `jQuery`
- `ember-data` (for models and persistence, distributed separately from the main EmberJs)

It is evident that for EmberJs,
there is much more to learn to use in addition to the framework itself.
With `ember-cli` however, the flip side of learning one additional tool,
is that it makes app development a lot more productive,
by allowing you to scaffold part of the app quickly.
Therefore there are pros and cons to weigh for each.

### 3. How complex is your app?

- Creating simple apps is easier to do with AngularJs than it is to do with EmberJs.
- Conversely, creating complex apps is easier to do with EmberJs than it is to do with AngularJs.

This stems from something that occurs under the hood in each framework,
that you most likely will not encounter when beginning with either framework.

Both frameworks are able to update their views
when their models change, and update their models when their views change.
This is two-way binding.
However, both of them use different means to listen for changes on models.
Until `Object.observe()` lands in the next version of ECMAScript,
it is not possible to listen for changes on Javascript objects.

Ember solves this by requiring all models to be wrapped in `Ember.Object`,
and use accessors (`get` and `set`) to view and manipulate those properties,
attaching the event listeners to the accessor methods.
AngularJs allows you to use regular Javascript objects as models,
but it keeps a copy of every model,
and checks for differences at a regular interval (within its digest cycle)
between the model, and the previous copy of it.

EmberJs' approach results in more verbose syntax when manipulating models,
but performance does not take a hit as models become more numerous or complex.
AngularJs' approach has nicer syntax when manipulating models,
but **performance takes a hit** as models become more numerous and complex.

The problem with AngularJs described above is mitigable,
however, it is not easy to do so correctly,
as it requires some very in-depth understanding of how the internals of AngularJs work.
Thus, when picking a framework, it would be pertinent to lay out the
wire frames for each of the screens in the app,
and estimate the size and complexity of the models required to be displayed on each screen.
If your models exceed 2000 pieces of information
(this is only rough number, from Misko Hevery),
your choices are:

- Either choose EmberJs, or
- become familiar with advanced dirty-checking avoidance techniques in AngularJs.

I have previously written in detail about
[accessors vs dirty checking](http://blog.bguiz.com/post/57373805814/accessors-vs-dirty-checking-in-javascript-frameworks/).

### 4. Do you agree with the philosophy of the framework?

This is quite a fundamental question,
and yet, largely a matter of personal preference.

AngularJs is an extremely flexible, and unopinionated framework.
Take, for example, that it provides six different ways to define a service on a module
(one of which is confusingly named "Service").
This, and many other instances of an abundance of choice,
means that there are **many different ways to accomplish the same task**,
and thus developers tend to go about doing things in different ways.

EmberJs, on the other hand, is a stark contrast to this,
in that it is extremely opinionated.
In most things, EmberJs explicitly defines **the one correct way to do something**,
and everything else that you try simply will not work properly.
A great example of this is the naming conventions imposed by the framework -
if you name your controllers something other than what is expected,
the controller is simply ignored!
While this is a major stumbling block when first starting out with EmberJs,
it also ensures that most developers stick to doing things in the one prescribed way.

This boils down to the level of abstraction.
Those who prefer AngularJs tend to be those who prefer a lower-level framework,
as it affords them more flexibility, and is closer to the metal.
Those who prefer EmberJs tend to be those who prefer a higher-level framework,
as they prefer the consistency and ease of collaboration that comes with a lack of flexibility.

### 5. Do you like where the framework is heading?

Both AngularJs and EmberJs are in their 1.x versions.
Their authors have recently released their vision for their 2.0 versions.

In summary, EmberJs looks like it is going to be quite stable in its transition
from 1.x to 2.0, with very few breaking changes.
AngularJs, on the other hand looks like it is going to be a complete rewrite,
and the transition going from 1.x to 2.0 is going to be a painful one for most developers,
with many breaking changes.

## Round up

So which should you pick?
Answer the questions above, and you will know which on you prefer.
If you are still undecided, select one or two screens from your app,
and develop them using both frameworks,
keeping these questions in mind,
and then decide!
