---
title: 'Use Prototypes to Plan Production Software with AI'
date: '2026-08-23T17:46:00+08:00'
tags: [devrel, ai]
socialImage: /images/posts/prototypes-plans-production-software-ai--banner.png
metaDesc: >
  Eight hours of planning, or fifteen minutes? Depends what you're building: Production-grade or prototype-grade.
---

In June, I gave a talk[^abcsg-2026-06-talk]
at [Agentic Builders Collective Singapore](https://www.agenticbuilders.sg/)
about a planning workflow for building software with generative AI.
In a nutshell, it combines the grill-with-docs agent skill by [Matt Pocock](https://www.linkedin.com/in/mapocock/)
with the shaping approach from [Ryan Singer](https://www.linkedin.com/in/feltpresence/),
and runs them in a highly customised way.
The result is a PRD[^prd] plus an implementation plan.
Feed those into an AI harness (OpenCode, Pi, Codex, Claude Code, …) and you get production-grade software.

> [![The Hard Parts: Building with Gen AI](https://i.ytimg.com/vi/VPjUgp1YFtg/mqdefault.jpg)](https://www.youtube.com/watch?v=VPjUgp1YFtg&list=PLjyCRcs63y804L55-eIJtrNxMBFbbroL8)
>
> [The Hard Parts: Building with Gen AI](https://www.youtube.com/watch?v=VPjUgp1YFtg&list=PLjyCRcs63y804L55-eIJtrNxMBFbbroL8)

The people who tried it came back with the same verdict:
The planning took too long.

Three hours at best.
One person reported over eight.

## My first fix was wrong

The obvious response was to optimise.
Fewer questions.
Tighter interviews.
Same rigour.

I attempted to tune the planning skill, while still aiming for production-grade specs.
It didn't yield much improvement.
After several iterations of failing to bring the time down, I finally understood why.

The hours spent planning **were not** a waste after all.

If you are genuinely planning production-grade software,
the kind a team will maintain for months or years,
then an intense interrogation of the requirements **is** the correct amount of work.
When humans build over months, mistakes in the plan get discovered and fixed along the way.
When an AI harness builds the entire thing in mere minutes, those opportunities simply don't surface.
The plan is the *only* place that errors get caught.
Of course it takes a while… it needs to!

My aha moment was the realisation that the problem was never about efficiency.
The problem was a mismatch of grades.

## Match the plan to the grade

Here is the distinction I was missing:

Production-grade software deserves **production-grade planning**.
Three to eight hours of it, if that's what it takes.

Prototype-grade software deserves **prototype-grade planning**.
Fifteen minutes of it is more than enough.

Most of us don't actually need production-grade software right off the bat.
What we need, at that point, is to **know what to build**.
That is a different problem, which needs a completely different tool.

The right tool is an old one: Prototyping.

## An old idea with new economics

Prototyping[^software-prototyping] fell out of fashion because it used to be expensive:
Even throwaway software took days or weeks.
If you were going to spend that much, you may as well plan carefully and build it properly once.

Generative AI changed the economics. *Radically*.
A prototype now takes under an hour to plan and build, for a single developer paired with an AI harness.
When the experiment is that close to free, it makes *much less sense* to skip the prototype.
It is now a more valuable use of your time to build a prototype,
and use that to make a *more informed* plan for the software that you intend to ship to users.

If you are familiar with agile methodologies, think of it this way:
A prototype is a spike[^software-spike].
Except instead of spiking one risky feature, you spike the entire system.
You learn the true shape and specs of the thing you wanted to build,
not what you assumed it would be when you wrote the plan.

Order of operations:

1. Write five bullet points about what you want to build in a `REQS.md` file (requirements).
2. Run the [`prototype-plan` agent skill](https://github.com/bguiz/build-agent-skills/tree/main/skills/prototype-1-plan).
3. Spend around fifteen minutes answering interview questions.
4. It produces `PRD.md` (product requirements document) and `IMPL.md` (implementation plan).
5. Build the prototype.

The key point here is that you *intentionally* spend very little time planning up front.
The idea is to build a working prototype ASAP.
This **is not** something you will ship to your users.
The prototype *reveals* to you what should go into the plan for the production-grade version of your software.
Using a prototype, you do this hands-on with a real, working application.
Without a prototype you would have had to imagine the intended application, which is a lot harder.

## Skills to run in an AI harness

This entire process is now made easy and repeatable, using a few agent skills.

First, use the [`prototype-plan` agent skill](https://github.com/bguiz/build-agent-skills/tree/main/skills/prototype-1-plan)
to plan a prototype-grade version of your software.

(Next, build a working prototype using `PRD.md` and `IMPL.md`, and learn from it.)

Finally, use the [`build-plan-product` agent skill](https://github.com/bguiz/build-agent-skills/tree/main/skills/build-1-plan-product),
then the [`build-plan-specs` agent skill](https://github.com/bguiz/build-agent-skills/tree/main/skills/build-2-plan-specs)
to plan the production-grade version of your software.

## What prototypes cannot tell you

An honest caveat, before you take this too far:
A prototype will **not** surface your scaling limits, your security model, your compliance obligations,
or the migration path from the system it replaces.
Those problems don't show up in prototypes, and no fifteen-minute interview will find them.

That is why the two grades are **distinct**.
The prototype tells you *what* to build.
Now planning can start from evidence instead of imagination or guesswork.
You know where the sharp edges are (because you've already cut yourself on them).

Prototype to learn.
Then plan and build for production.
In that order.

[^abcsg-2026-06-talk]: There wasn't a recording of the live talk, but here was a pre-recorded version of it. [The Hard Parts: Building with Gen AI](https://www.youtube.com/watch?v=VPjUgp1YFtg&list=PLjyCRcs63y804L55-eIJtrNxMBFbbroL8)

[^prd]: Product requirements document. It defines the purpose, features, functionality, and other requirements of a particular product.

[^software-prototyping]: Creating incomplete versions of the software program being developed. See:[Software prototyping (Wikipedia)](https://en.wikipedia.org/wiki/Software_prototyping)

[^software-spike]: A product development method that uses the simplest possible program to explore potential solutions, used to determine how much work will be required to solve or work around a software issue. See: [Spike (software development)](https://en.wikipedia.org/wiki/Spike_%28software_development%29)
