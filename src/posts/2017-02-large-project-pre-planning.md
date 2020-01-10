---
title: Large project pre-planning
date: '2017-02-09T22:58+11:00'
tags: [api, architecture, estimate, agile]
socialImage: /images/posts/large-pre-project-planning.png
---

At the moment,
I am in the midst of planning for an extremely large project -
it is really four projects rolled into one.
This has actually been quite an interesting and refreshing experience.
The exercise of planning for more than one project at once
forces you to think about what all the *common things* are up front,
rather than upon completing each project.
Especially useful for tasks involving
using new tools/ services/ libraries/ frameworks,
or anything that requires a proper investigation or spike prior to implementation.

The planning is still in mid swing,
and so far, IMHO, going rather well.
The strategy that I have used follows next.

## Always be planning

Personally, I have always held the opinion that
while working one project,
especially when that runs for a long time -
such as multiple months -
that you should keep in mind anything that you would do differently each time.

Otherwise it could end up like this:

![Keep calm and plan ahea](/images/posts/keep-calm-and-plan-ahea.png)

Indeed!

Keep whatever is next in the pipeline at the back of your head.

## Use a no-brainer tool

While I truly believe in that,
I have always only half done it,
or done it properly for a short while,
before fizzling out.
My plan to plan ahead of time was failing despite best intentions.

The cognitive dissonance was staggering,
and I struggled to figure out exactly what was going wrong each time.
Then I realised that the answer had been under my nose all this while:
The *cognitive* part!

The tools that I had been using:

- JIRA
- Pen and notebook
- Pen and sticky notes
- Text files on my hard disk(s)
- Text files with some sort of cloud sync (git, Dropbox etc)

None of these worked, either in isolation,
or when used together in various combinations.
The problem was that there was too much of a barrier
between light-bulb moment, and
storing those ideas somewhere.

![Lightbulb -> Hurdle -> Brain](/images/posts/lightbulb-hurdle-brain.png)

The hurdle was too large.
The solution was to use just one tool.
This tool should simply get out of your way by being ridiculously easy to to use,
that there would be no excuses to avoid capturing any idea.
Remove the friction/ barriers,
and ideas stand a better chance of getting to where they need to be.

![Y U NO make me think?](/images/posts/y-u-no-make-me-think.png)

Prior to commencing a project,
there will be lots of ideas that need to be taken down in quick bursts,
and they will be endlessly shuffled and edited.
That is a *high flux* scenario,
and I found Trello ideal for this.

## Script the export

Trello didn't get in the way when I was machine gunning
idea after idea (keyboard shortcuts for the win!),
and it had a user interface which simply allowed you to drag
stuff around anywhere you felt like it to rearrange and reorganise.

So, no dramas there ... but management uses *Excel*.

![Yay not yay](http://gif-finder.com/wp-content/uploads/2015/10/Sarah-Hyland-Yay.gif)

(Nitpick: *My* management is happy to use Trello as well,
but they still need to use Excel to communicate with the rest of management.)

So, scrap all of the above, and plan project in Excel instead right?

Wrong, because *I am devloper*. This fella knows what I'm talking about:

[![https://pbs.twimg.com/profile_images/477397164453527552/uh2w1u1o.jpeg](https://pbs.twimg.com/profile_images/477397164453527552/uh2w1u1o.jpeg)](https://twitter.com/iamdevloper)

Instead, I wrote a script that converts Trello's exported JSON
into an Excel spreadsheet:

[trello2charts](https://github.com/bguiz/trello2charts)

It is heavily customised to the particular way in which I like to use Trello,
which is to use the following entities to achieve a three-level hierarchy:
Lists -> Cards -> Checklist Items

Feel free to use it too, if this approach is compatible with yours.

This script enabled me to use a much better tool for the job,
and export to the required format whenever necessary.

## Validation

Management's response to Excel spreadsheet:

![Skeletor approves!](/images/posts/skeletor-approves.png)

## In summary

1. Always be planning for whatever is *next*
2. Use a tool that you *actually* want to use
3. *Automate* export to required formats
4. ...
5. Skeletor approves!
