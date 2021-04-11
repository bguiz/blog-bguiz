---
title: 'Metrics Tracking for Software Teams'
date: '2021-04-04T11:19:00+08:00'
tags: [team, software]
socialImage: /images/posts/metrics-tracking-software-teams--vernier-calipers-laptop-code.jpeg
description: >
  Locus of control, quantitative vs qualitative, and antagonist functions.
---

When it is time to start designing metrics for your team - KPIs, OKRs, OGSMs, Sprint Burndowns et cetera - it can be pretty challenging, with many different decisions to be made. 

These approaches are based on the belief that what gets measured gets worked on.By incorporating metrics and by tracking them, the idea is that output and productivity will increase.

When you actually put theory into practice, you almost immediately have to grapple with many decisions - both macro-level and micro-level.

I’ve worked in teams that have implemented metrics and tracking in various forms - ranging from MBA-type to Project Management schools of thought - and have noticed that there are three particular macro-level decisions that have an outsized influence and impact on software teams:  **Locus of control**, **quantitative vs qualitative**, and **antagonist functions**.
## Locus of Control

How much control does your team have over the outcome of a particular metric?

![Locus of Control - What if I told you it was a false choice all along?](/images/posts/metrics-tracking-software-teams--locus-of-control.jpeg)

- Is the metric primarily determined by whether or not your team is able to perform specific actions, within a particular deadline?
- Otherwise, is the metric primarily determined by whether or not others within the organisation? Perhaps even others who are outside your organisation?
- In the latter case, how much influence does your team have?

In practice these two alternatives are usually not binary, more of  a sliding scale.

### Suggestions regarding Locus of Control

Identify which metrics fall into which category, and ensure a balanced spread between them. To simplify decision making, I drop each metric into one of three buckets: `80%-20%`, `50%-50%`, and `20%-80%`.

At a more abstract level, another thing that you can do is to make decisions about which metrics are good to take on, and which ones aren’t. In most cases there will be a need to have metrics of both varieties: Ones that are primarily within the locus of your control, and ones that aren’t. Keep track of how many of each you have so as to be aware of the mix you are setting yourself up for. The higher the **proportion** of metrics that are out of the locus of your control, the more **challenging** it will be to attain them.

Related to this: Seniority. When it comes to individual metrics, those with less experience should have a lower proportion of metrics that are out of their locus of control; and the opposite for those who are more experienced.

> Sidebar: If you are working in a software engineering team, reflect upon how much harder the work of someone in sales or management is. These types of roles intrinsically default to being measured on things that are out of their locus of control. The ability to even choose metrics that are not would seem like a luxury to them.

## Quantity vs Quality

Quantitative metrics are intrinsically numeric; whereas qualitative metrics are more subjective by nature and thus hard to assign a numeric value to.

![Quantity vs Quality](/images/posts/metrics-tracking-software-teams--quantitative-qualitative.jpeg)

When  items that need to be measured are subjective by nature:

- What is the methodology that should be used?
- How sure can one be that said methodologies are consistent and equitable?

This complicates the metrics, as subjective items cannot  easily be reduced to a number. When we try to do this anyway, in some cases, we have to accept that it is hard to be objective.

> Sidebar: Software is precise and logical, when it is executed. This leads to a common misconception that the act of creating software is also precise and logical. Consequently, this leads to another **common misconception** that software engineering is easy to quantify or measure. While software itself may ultimately have those traits (up for debate), software engineering has many aspects to it that are more art than science. Think about programming languages’ linguistics, design patterns, test strategies, et cetera; these are all highly subjective areas, and therefore hard to put a number on. Case in point: [negative lines of code metrics](https://www.folklore.org/StoryView.py?story=Negative_2000_Lines_Of_Code.txt). This is something that many software engineers go through in their careers, almost as a **right of passage**.

Designing metrics for items that are inherently qualitative is a tricky balancing act. If what gets measured gets worked on, poor design has adverse side effects: When you measure the wrong things, the **wrong things get worked on**. Look out for this, and avoid it.

For example, there will always exist a temptation to spend less time on a small number of important tasks, in order to be able to spend more time on a large number of less important tasks. When rewards are tied to metrics, there will be optimisation efforts to maximise those metrics. That is **usually** a good thing; however when metrics are not **properly weighted** by importance, it results in a system of perverse incentives… something to avoid!

### Suggestions regarding Quantity vs Quality

Various items are either quantitative or qualitative by nature. This cannot be changed. What can be changed is how they are measured.

- **Quantitative**: Easier. Find the number that most accurately indicates the value or importance of that thing, and simply use that number.
- **Qualitative**: More difficult.
  - Recognise that there is inherently not going to be a single number that indicates the value of that thing.
  - Analyse the possible ways to estimate the quality of this particular thing. **Estimate**, not **measure**.

Here are some specific suggestions for creating metrics to estimate qualitative items.

#### Tiered metrics

Think of task estimation done during sprint planning with a product team (from the Agile methodology). This usually involves poker cards, Fibonacci numbers, or T-shirt sizes. These techniques categorise a particular task on how hard it is to complete (time commitment, risk of complications, et cetera). It is **estimation** via group consensus.

For example, a tiered approach to creating metrics for tasks could be:

- Number of “L” and “XL” tasks
- Number of “XS”, “S”, and “M” tasks

The above plugs into the T-shirt size categories that a team is already estimating, and creates two metrics. The more complex tasks get measured **separately** from the less complex tasks. This results in a two-tiered metric. This ensures that the team is still incentivised to complete the more difficult tasks; and not only the easier ones.

#### Weighted sum metrics

This is slightly more complex than the tiered system described above, but draws upon the same principle. Tasks are categorised into buckets based on complexity. The difference is that each task is multiplied by a “weight” prior to being added to the metric value:  Resulting in a weighted sum.

For example:

- “XS”, “S”, “M”, “L”, and “XL” are assigned 1, 2, 3, 5, and 7 points respectively.
- When the team completes 3 “XS” tasks, 2 “M” tasks, and 1 “XL” task respectively, the weighted sum works out to be `(3*1)+(2*3)+(1*7)` which yields a value of 15.

Some pros and cons over the tiered approach:

- Con: More complex to calculate, harder to explain
- Pro: Enables more fine-grained calibration
- Con: Requires upfront definition of categories
- Pro: Easier to fit into frameworks which limit the total number of metrics (for example in OKRs, where it is common practice to have a maximum of 5 “KRs” per “O”).

#### Considerations for metric cycles

It is unlikely for a team to get metric design correct on the first iteration. So share your team’s approach with other teams facing similar challenges. This may yield a common approach between multiple teams; or alternatively it might yield a divergent approach.

Either way, you can use the opportunity at the end of each metrics cycle (e.g. quarterly), as an opportunity for a retrospective - not only on the results, but also the design of the metrics themselves. If some teams choose divergent approaches, that lends itself well to hypothesis testing and A/B testing too!

## Antagonist Functions

Different people within an organisation perform different functions, and some of these functions can antagonise each other, based on the nature of the tasks each of these functions perform.

![Antagonist Functions - I'm gonna poke holes in your work. Me too, me too.](/images/posts/metrics-tracking-software-teams--antagonist-functions.jpeg)

This dimension applies to the interactions between multiple teams within the same organisation. Specifically the between teams who are “supposed to” head in opposite directions from each other.

For example, a product team may have metrics around the delivery of certain product features; whereas a security or QA team may have metrics around the spotting bugs in that same product.


> Sidebar: There is no intent to portray these teams or functions in a negative light..

This leads to a tension, where it would appear that one team’s success depends upon the other team’s failure. And that appearance may get nudged towards reality if the metrics are not designed carefully to **avoid a zero-sum game** situation.

That being said, some level of this tension is natural, and is a sign of a healthy organisation: Different teams playing their part. Somewhat counterintuitively, the complete absence of this may even be indicative that something is wrong - for example, that there are too many yes-men present, or that there is some level of metric-gaming or metric-avoidance in play.
When these tensions are present, remember that they are **natural** and expected; and they aren’t something that should be avoided.

### Suggestions regarding Antagonist Functions

Here are some specific suggestions around the approach towards metrics involving antagonist functions.

#### Cross-function embedding

This has more to do with team structures than metrics. Instead of having separate teams with separate or divergent goals, have those particular team members be in the same team.

For example, the QA team could **embed** a test engineer within product teams. Leverage the human factor: When people work in the same team, they talk to each other more often, and (mostly) work out their differences proactively.

The chief caveat here is that this shifts the tensions related to antagonist functions from being inter-team to being intra-team. This means that the “embedded” person needs to be fairly senior or experienced, lest these tensions be solved by means of a “rollover” - i.e. the creation of a yes-man.

Other caveats are around resourcing constraints: Larger organisations have larger team sizes. Therefore they have the ability to do this. In smaller organisations, usually the team sizes are simply insufficient to be able to feasibly do embedding.

#### Cross-function metrics

Using a hypothetical starting point, where we have a product team and a QA team with one metric each, like so:

- **product team**: Develop 5 new features in product ABC
- **QA team**: Find 5 bugs in product ABC

You can immediately spot the tension that will erupt between these two teams… when stated like this. In practice, the teams often think about their metrics in silos, and then these get assembled together at the organisation level at the beginning of a metric cycle. This is usually done in great haste, and thus tensions like this tend not to be spotted in time.

To avoid that, perhaps teams such as QA, security, et cetera who know that they have a high likelihood of creating “opposing” metrics, can preemptively speak with the other teams, and create some cross-function metrics.

After a discussion, these teams may rewrite their metrics like so:

- **product team**: Develop or fix 10 new features or bugs in product ABC
- **QA team**: Find plus suggest fixes for 5 bugs in product ABC

Rewriting those metrics is easy… the hard part is to identify those metrics during the design phase.

> Sidebar: The above example metrics are, quite frankly, bad examples. I struggled to come up with better examples without getting too specific - will update when inspiration strikes!

The above relies on the ability of the two “opposing” teams to identify **common ground**. After all, both teams are working towards the same organisational goals. The act of designing metrics should not be taken as licence to forget or lose sight of the common ground. Otherwise, one team’s pursuit of metrics can end up as an obstruction or blocker in the view of the other team; and vice-versa. Instead, keep the common ground top of mind.

> Sidebar: Managed to write the above without using the word “synergy” even once. 😅😂

## General suggestions

We’ve covered locus of control, quantitative vs qualitative, and antagonist functions - the three dimensions which I consider to have the most far-reaching impact on software teams; and the ones to **consider first** during metric design.

Here’s a laundry list of the other aspects of metrics, that I consider to also be relevant. Note that this list is not specific to software teams.

- **Proportion of metrics-related work** - Allocate a percentage of work that goes towards metrics improvements - not all work being done is going to be focused on moving the needle. There will always be **unanticipated work** that is still important, and therefore still needs to be done.
- **Upfront actions planning** - List the actions that would need to be taken to accomplish each metric. If they are ambiguous or don’t seem right, rethink the metric.
- **Malleability or flexibility** - Define, upfront, exactly how each metric is going to be measured; what’s in, and what’s out.
- **Continuity** - Metrics should not drastically change from one cycle to the next (e.g. quarterly). It is OK to tweak or replace a metric here and there. Ideally, most metrics should stay the same, so that progression can be compared across multiple cycles.
  - Exceptions to this apply when implementing metrics for the first time, if the organisation shifts its goals, or when teams are restructured.
- **Quantum effect** - The act of observation changes the things being observed. This can be a good or bad thing. So make sure that the act of measurement (and the design of the metric) does not create any unintended incentives.

## Conclusion

What gets measured gets worked on… and hopefully improved. This does *not always* come true though. Implementing metrics within a team does not automatically guarantee an improvement - work still needs to be put in. This work needs to be aligned with the metrics, which in turn need to align with the goals.

Think longer term than the duration of the metrics cycle. For example, if the cycle is quarterly, think about how the metrics might pan out across the year; and keep your  sights set on **long-term aspects** of the organisation.

The **design of the metrics is crucial** to success. This post provides some suggested solutions around 3 of the most challenging aspects of metrics tracking for software teams. Please employ your **gut feel and common sense** - your particular situation is going to be unique, so use what works.
Thanks 🙏 to [Luis Fontes](http://thesecurityvault.com) for being a sounding board, and his illuminating discussions on this topic; which triggered/ led me to write about this!

