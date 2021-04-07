---
title: 'Metrics Tracking for Software Teams'
date: '2021-04-04T11:19:00+08:00'
tags: [team, software]
socialImage: /images/posts/metrics-tracking-software-teams--vernier-calipers-laptop-code.jpeg
description: >
  Locus of control, quantitative vs qualitative, and antagonist functions.
---

There are a number of ways in which Software teams get measured on their productivity, output, and deliverables. These come from a wide variety of schools of thought - ranging from management consulting or MBA type thinking (see OKRs, OGSMs, et cetera) through to Agile or Project Management type thinking (see Sprint Burndowns, et cetera). I’ve worked in various teams that have implemented these in various forms. I hope to bring out some of the key things that I’ve learned along the way; with an opinion or two along the way!

These approaches all assume that what gets measured gets worked on… Ideally!

When you actually put theory into practice, you almost immediately have to grapple with many decisions - both macro-level and micro-level.

This post focuses on the macro-level decisions. In particular, we’ll explore **locus of control**, **quantitative vs qualitative**, and **antagonist functions**. I believe that these have an outsized influence/ impact upon decisions regarding metrics tracking for software teams.

## Locus of Control

![Locus of Control - What if I told you it was a false choice all along?](/images/posts/metrics-tracking-software-teams--locus-of-control.jpeg)

When designing a metric for yourself or for your team, it is critical to be aware of how much control you/ your team have over it.

- Is it primarily determined by whether or not your team is able to perform specific actions, within a particular deadline?
- Otherwise, is it primarily determined by whether or not others within the organisation? Perhaps even others who are outside your organisation?
- In the latter case, how much influence does  your team have?

In practice these two alternatives are usually not binary, more of a  a sliding scale.

### Suggestions regarding Locus of Control

Identify which metrics fall into which category, and ensure a balanced spread between them. To simplify decision making, I drop each metric into one of three buckets: `80%-20%`, `50%-50%`, and `20%-80%`.

At a more abstract level, another thing that you can do is to make decisions about which metrics are good to take on, and which ones aren’t. In most cases there will be a need to have metrics of both varieties: Ones that are primarily within the locus of your control, and ones that aren’t. Keep track of how many of each you have so as to be aware of the mix you are setting yourself up for. The higher the **proportion** of metrics that are out of the locus of your control, the more **challenging** it will be to attain them.

Related to this: Seniority. When it comes to individual metrics, those with less experience should have a lower proportion of metrics that are out of their locus of control; and the opposite for those who are more experienced.

> Sidebar: If you are working in a software engineering team, reflect upon how much harder the work of someone in sales or management is. These types of roles intrinsically default to being measured on things that are out of their locus of control. The ability to even choose metrics that are not would seem like a luxury to them.

## Quantity vs Quality

![Quantity vs Quality](/images/posts/metrics-tracking-software-teams--quantitative-qualitative.jpeg)

Metrics lend themselves well to quantitative items. Qualitative items are notoriously hard to measure or track! This is because metrics need to be able to definitively reduce items into a numeric value…

When these items are subjective by nature:

- What is the methodology that should be used?
- How sure can one be that said methodologies are consistent and equitable?

This complicates the metrics, as not everything can easily be reduced to a number. When we try to do this anyway, in some cases, we have to accept that it is hard to be objective.

> Sidebar: Software is precise and logical, when it is executed. This leads to a common misconception that the act of creating software is also precise and logical. Consequently, this leads to another **common misconception** that software engineering is easy to quantify or measure. While software itself may ultimately have those traits (up for debate), software engineering has many aspects to it that are more art than science. Think about programming languages’ linguistics, design patterns, test strategies, et cetera; these are all highly subjective areas, and therefore hard to put a number on. Case in point: [negative lines of code metrics](https://www.folklore.org/StoryView.py?story=Negative_2000_Lines_Of_Code.txt). This is something that many software engineers go through in their careers, almost as a **right of passage**.

Designing metrics for items that are inherently qualitative is a tricky balancing act. If what gets measured gets worked on, poor design has adverse side effects: When you measure the wrong things, the **wrong things get worked on**. Look out for this, and avoid it.

For example, there will always exist a temptation to spend less time on a small number of important tasks, in order to be able to spend more time on a large number of less important tasks. When rewards are tied to metrics, there will be optimisation efforts to maximise those metrics. That is **usually** a good thing; however when metrics are not **properly weighted** by importance, it results in a system of perverse incentives… something to avoid!

### Suggestions regarding Quantity vs Quality

Various items are either quantitative or qualitative by nature. This cannot be changed. What can be changed is the approach on these things are measured.

- **Quantitative**: Easier. Find the number that most accurately indicates the value or importance of that thing, and simply use that number.
- **Qualitative**: More difficult.
  - Recognise that there is inherently not going to be a single number that indicates the value of that thing.
  - Analyse the possible ways to estimate the quality of this particular thing. **Estimate**, not **measure**.

Here are some specific suggestions for creating metrics to estimate qualitative items.

#### Tiered metrics

Drawing inspiration from Agile methodologies, think of sprint planning with the product team. In particular think of task estimation, which usually involves poker cards, Fibonacci numbers, or T-shirt sizes. What all of these methods have in common are essentially categorising a particular task into buckets of how hard it is to complete - time commitment, risk of complications, et cetera - through a group consensus estimation.

One approach to creating metrics for software engineering tasks would be, for example:

- Number of “L” and “XL” tasks completed
- Number of “XS”, “S”, and “M” tasks completed.

The above essentially plugs into the T-shirt sizes based task estimation that this hypothetical team is already doing as part of sprint planning, and then creates two separate metrics where the larger or more complex tasks get measured separately from the smaller or less complex tasks. This results in a two-tiered metric, with the intended effect of ensuring that the team is still incentivised to complete the more difficult tasks over the easier ones.

#### Weighted sum metrics

This is a slightly more complex metric design than the tired system described above, but draws upon the same principle. The concept is the same, where tasks are categorised into buckets based on complexity. The difference is that this time each task is multiplied by a weight, prior to being added to the metric value; essentially a weighted sum.

For example:

- “XS”, “S”, “M”, “L”, and “XL” are assigned 1, 2, 3, 5, and 7 points respectively.
- When the team completes 3 “XS” tasks, 2 “M” tasks, and 1 “XL” task respectively, the weighted sum metric works out to be `(3*1)+(2*3)+(1*7)` which yields a value of 15

This approach has some pros and cons over the tiered approach.

- Con: More complex to calculate, and harder to explain.
- Pro: Enables a more fine-grained calibration.
- Con: Requires that the definition of each category be defined up front.
- Pro: Easier to fit into frameworks that limit the total number of metrics (e.g. in OKRs, where you’re limited to a maximum of 5 “KRs” per “O”).

#### In the context of metrics cycles

Whichever approach you choose, there are some important things to consider. It is unlikely for a team to get this approach correct on the first iteration. So share your team’s approach with other teams facing the same challenge with metrics design. The discussion may yield a common approach between multiple teams; or alternatively it might yield a divergent approach between multiple teams.

Either way, you can use the opportunity at the end of each metrics measurement cycle (e.g. quarterly), as an opportunity for a retrospective - not only on the results themselves, but also design of the metrics themselves. If some teams chose divergent approaches, that lends itself well to retrospective hypotheses testing, or A/B testing, too!

## Antagonist Functions

![Antagonist Functions - I'm gonna poke hole in your work. Me too, me too.](/images/posts/metrics-tracking-software-teams--antagonist-functions.jpeg)

This dimension does not apply to a single team, but rather to the interplay between multiple teams within the same organisation. Specifically the interplay between teams who are “supposed to” head in opposite directions from each other.

> Sidebar: I have chosen the term “antagonist functions” to describe the above, as it conveys the most vivid imagery. The intent here is not to portray these teams or the term in a negative light, as will come clear soon.

For example, a product team may have metrics around the delivery of certain product features, whereas a security or QA team may have metrics around the spotting bugs in that same product.

This leads to a tension, where it would appear that one team’s success depends upon the other team’s failure. And that appearance might actually get nudged into becoming a reality if the metrics are not designed carefully to **avoid this zero-sum game** situation from playing out.

That being said, some level of this type of tension is natural, and in fact is a sign of a healthy organisation with different teams playing their part. The complete absence of this natural tension may even be indicative that something is wrong - for example, that there are too many yes-men present, or that there is some level of metric-gaming or metric-avoidance in play. In any case, when these tensions are present, remember that they are indeed **natural and expected**; and they aren’t something that should be avoided when thinking about metrics.

### Suggestions regarding Antagonist Functions

Here are some specific ideas/ suggestions around the approach towards metrics involving antagonist functions.

#### Cross-function embedding

This one has less to do with metrics than it has to do with team structures. The idea is that instead of having separate teams that have separate or divergent goals, have team members with those separate or divergent goals be part of the same team.

For example the QA team could **embed** a test engineer within product teams. The underlying idea here is the human factor, when people work in the same team, they talk to each other more often, and (mostly) work out their differences more proactively.

The chief caveat here is that you are shifting the tensions related to antagonist functions from being inter-team to being intra-team. This means that the person who is the “embedded” one needs to be fairly senior or experienced, lest these tensions be solved by means of a “rollover” - in other words, the creation of a yes-man.

Other caveats are around resourcing constraints: Larger organisations have the luxury of larger headcounts and therefore the ability to do this, whereas in smaller organisations, usually the number of people is simply insufficient  to be able to spread across the number of different teams that are present, and therefore this is not a feasible solution.

#### Cross-function metrics

Let’s say the starting point is that we have a product team and a QA team with a metric each like so:

- **product team**: Develop 5 new features in product ABC
- **QA team**: Find 5 bugs in product ABC

One can immediately spot the tension that will erupt between these two teams when stated like this. In practice, the teams often think about their metrics in silos, and then these get assembled together at the organisation level at the beginning of a metric cycle. This is usually done in great haste, and hardly anyone spots these tensions.

To avoid that, perhaps teams such as QA, security, et cetera who know that they have a high likelihood of creating antagonist metrics, should preemptively speak with the other teams that are likely to be affected. The intent is to create some cross-function metrics.

Continuing with the above example, the metrics could be rewritten as such:

- **product team**: Develop or fix 10 new features or bugs in product ABC
- **QA team**: Find plus suggest fixes for 5 bugs in product ABC

Rewriting those metrics is probably the easy part, the hard part is in identifying where these opposing metrics exist during the design phase.

> Sidebar: The above example metrics are, quite frankly, bad examples. I struggled to come up with better examples without getting too specific - will update if/ when inspiration strikes!

The other aspect to cross-function metric design that needs to be highlighted is that it relies on the ability for the two “opposing” teams to identify common ground. After all, both of these functions are working towards the same goals for the organisation, and therefore there should be some by definition. The act of designing and implementing metrics should not be taken as licence to forget or lose sight of that common ground. If this happens, the pursuit of attaining metrics by one team can end up as an obstruction or blocker in the view of the other team; and vice-versa. Instead, all the more this common ground needs to be kept top-of-mind.

> Sidebar: Managed to write the above without using the word “synergy” even once. 😅😂

## General suggestions

Above, we’ve covered locus of control, quantitative vs qualitative, and antagonist functions - the three dimensions affecting metrics, that I consider to have the most far-reaching impact for software teams; and the ones to consider first during metric design.

Apart from those, here’s a laundry list of the other aspects of metrics, that I consider to be relevant once getting those first three dimensions done properly. Note also that this list is more general - and not specific to the challenges faced by software teams.

- **Proportion of metrics-related work** - Allocate the percentage of work that goes towards metrics improvements - not all work being done is going to be focused on moving the needle. There will always be unanticipated work that is still important, and therefore needs to be done without moving the needle.
- **Upfront actions planning** - List the actions that would need to be taken to accomplish each metric. If they are ambiguous or don’t seem right, maybe the metric needs to be rethought.
- **Metric malleability or flexibility** - Define, upfront, exactly how each metric is going to be measured; what’s in, and what’s out.
- **Metric continuity** - Metrics should not drastically change from one metric cycle to the next (e.g. one quarter to the next). Perhaps you tweak a metric here and there, or replace a metric here and there. Ideally, most metrics should stay the same, so that progression can be compared across multiple cycles. Exceptions to this apply when the organisation is implementing metrics for the first time, if the organisation has a change in its mission/ vision/ purpose, or when teams or functions are restructured.
- **Quantum effect** - The act of observation changes the things being observed. This can be a good thing or a bad thing. So make sure that you are measuring the right thing, and the act of measurement or the design of the metric does not create any (unintended) systems of perverse incentives.

## Conclusion

What gets measured gets improved. But this does *not always* come true. Implementing metrics within a team does not automatically mean that the team will improve, the work still needs to be put in. The work still needs to be aligned with the metrics, which in turn need to be aligned with goals.

Of course, all this means that the **design of the metrics is crucial** to the success of a team, and consequently the organisation that it belongs to. This post articulates 3 key dimensions for metrics that are the most challenging for software teams, and details a few example solutions on how to tackle these. When considering these, please do employ your **gut feel and common sense** - it is quite likely that you will need to filter out some of this in your particular situation.

In considering these, think longer term than the duration of the metrics measurement cycle. For example, if the cycle is quarterly, think about how the metrics might pan out across the year (or four cycles); with the intent of keeping sights set on **long-term aspects** of the organisation, such as vision/ mission/ purpose.

Thanks 🙏 to [Luis Fontes](http://thesecurityvault.com) for being a sounding board, and his illuminating discussions on this topic; which triggered/ led me to write about this!
