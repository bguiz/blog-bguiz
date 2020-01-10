---
title: Software Engineering by Plumbing
date: '2015-05-27T18:20+11:00'
comments: true
tags: [engineering, open source, rant]
---

When learning how to code for the first time,
it is quite exhilarating.
All that computational power at your fingertips,
just waiting to be harnessed.
If you knew the right sequence of commands,
and how to invoke them, the world was your oyster.
In theory - that is, when using a Turing complete programming language -
you could write a program that does anything.

Quite soon, however, this is followed by a realisation.
The realisation that IRL - in real life -
most of the time when you write software,
you are not really writing any of that interesting stuff.

- Someone else, or another team or company,
has already written that interesting piece of code,
and probably has already done a better job of it than you can on your own.
- The task that you have been given most likely falls into one of the
  two following categories, or at an intersection of the two:
  - Create, read, update, and delete various things
  - Here's a software library that does interesting thing #1,
    and here's another that does interesting thing #2.
    Make the two work together.

It always tends to pan out like such,
simply because as a software engineer,
your job is not not to write code for code's sake,
but rather to write code to solve some business problem,
or create some value for the business.
That translates to most work being focussed on accomplishing
rather ordinary tasks,
by finding the right libraries that perform the necessary tasks,
and simply connecting them together,
such that the assembled aggregate accomplishes the goal.

I liken this to what a plumber does.
In order for the kitchen sink, laundry, and toilets to all work properly,
there are quite a number of interesting bits and bobs that need to be in place.
Valves, faucets, pipes of various diameters and shapes, et cetera.
But these are all pre-made -
when something goes wrong somewhere,
the plumber merely identifies where the problem has occurred,
find the appropriate part,
and replace it accordingly.
The the main tools of the trade are
identifying which parts go with which other parts,
and connecting them together properly.
That's not all too different from what the typical software engineer does day to day.

## Yearning for the alternative

Some software engineers are pretty happy plumbing code together -
that is great for them!

What if you are one who is not though,
what if you are one who yearns for that greater stimulation -
one who who is not fulfilled with connecting a valve to a pipe,
but wants to make the valve themselves?

Here is my list of things to do to satisfy that urge:

- Actively be on the lookout for something that needs solving
- If something has already been solved, take a look at its internal workings,
  and put some thought into whether this can be solved in a different way
- Where you cannot find something original, seek to make the plumbing easier
  - Make the plumbing experience easier/ more accessible in the future
  - If you do not want to make a new valve, find a better way to connect the valve to a pipe
  - This could mean doing things like improving the API, writing a DSL,
    or contributing to the documentation, for an existing project
