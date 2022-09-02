---
title: 'On Developer Advocacy'
date: '2022-09-01T22:23:00+08:00'
tags: [devrel]
socialImage: /images/posts/on-developer-advocacy-banner.png
metaDesc: >
  Developer advocacy: Why, where, what, and how!
---

Why is it needed?
Where does it fit in?
What does it do?
How do you know if it is delivering?
Let's answer all of those questions!

A quick note on terminology:
Dev Relations, Dev Advocacy, Dev Evangelism -
These are several terms that refer to similar concepts.
There are differences between them,
but in this article we'll stick with Dev Advocacy.

## What and why dev advocacy

Who needs a Developer Advocate, and what exactly do they do anyway?

**Who needs developer advocacy**:
Any technology that is a *platform* may benefit from developer advocacy,
whereas any technology that is a *product* probably will not.
Why?
Because products need people to use them, they are its end users;
they do not need developers.
Platforms, on the other hand, do not typically have end users, at least not directly;
instead, *developers are its direct users*,
and those developers make use of the capabilities of the platform to build their products,
which in turn gets used by its end users.

<!-- TODO diagram the above -->

Cloud services and websites hosted on them perhaps
provide a great example to illustrate the above.
AWS is the *platform*,
and the website hosted on it is most likely a *product*..

**What developer advocacy accomplishes**:

Your organisation has created a technology platform,
and its goal is for it to be used.
Another organisation has a technology product,
and it needs to decide which technology platform to build it on.

Sounds like a great match right?
Supply meets demand, job done... not so fast!
There is an inherent asymmetry in this relationship.
Your organisation likely has one platform.
However the other organisation, the one building the product,
it usually has multiple technology platforms to choose from.

This is where developer advocacy comes into play,
and where its value becomes apparent.
Developers are engineers at heart, and as such,
they will choose the best platform for the job...
Correction: They will choose the best *perceived* platform for the job.
Developer advocates are there primarily to influence said perception.

Now when choosing anything,
whether its groceries in a supermarket or technology platforms,
3 things matter the most:
Availability, awareness, and appeal.
Developer advocates deal in all 3, with a strong focus on awareness and appeal.

- *Availability*: Does the platform have reasonable uptime, and have the expected functionality?
- *Awareness*: Do developers know of the existence of the platform?
- *Appeal*: Do developers want to choose the platform over other comparable platforms?

Let's use the example of cloud service providers to illustrate:
- Availability: What are the uptime SLAs for each of the cloud services that your product will use? Are there automated backups available for data loss?
- Awareness: Have you heard about AWS? Which developer hasn't? Have you heard about OVHCloud? Perhaps not until now.
- Appeal: Can you easily do the things that you need to do? For example, if your product needs to run a PostgreSQL database, AWS can host a managed instance of that for you. However, on GCP, you'll need to DIY your database instance on a general purpose server.

Side note, regarding B2C, B2B, and B2B2C.
I've come across points made around whether
developer advocacy is more important or less important
based on whether the type of business model used by the organisation.
IMHO, this is much less relevant than the product vs platform distinction.

## Where dev advocacy fits in

Where does developer advocacy fit into an organisation?
An organisation is made up of people,
and people report into teams of based on similar and complementary skillsets.
So which team does developer advocacy fit into?

There does not seem to be any consistent position within an organisation,
and I've found that this really varies from one to another.
Developer advocacy is intrinsically a very cross cutting function of an organisation,
because it has to do multiple things,
and thus is it very hard to silo into a single position.
If the organisation has a strictly hierarchical structure,
this will become apparent very quickly;
whereas if the organisation has a more informal structure,
or even a non-hierarchical formal structure such as matrix or network type structure,
this distinction becomes a bit less important.

Perhaps the better question here is this:
What teams within the organisation are *supported* by the developer advocacy team?

- *Commercial*: Pre-sales engineering; integrations; support.
- *Marketing*: Content; events; partnerships
- *Engineering*: Education; tools & libraries; product influence

## What productive dev advocacy looks like

Productivity is notoriously hard to pin down and measure,
for a couple of reasons:
(1) Not everything is quantitative (and therefore easy to measure),
many things are qualitative, and these are important too; and
(2) not everything is within the locus of your control,
as actions performed have varying degrees of influence on their intended outcome.
I've written about this in much more detail previously in
[*Metrics Tracking for Software Teams*](https://blog.bguiz.com/2021/metrics-tracking-software-teams/).

Caveats notwithstanding, what gets measured gets improved,
so it is still very much worthwhile to analyse productivity through the lens of metrics.
Specific to developer advocacy, two metrics matter the most:
Developer *ease*, and developer *activity*.

> "\[Find\] ways of _doing more with less_ to the end that
> all people everywhere can have more and more"
>
 > - [Buckminster Fuller](https://en.wikipedia.org/wiki/Buckminster_Fuller#Recovery)

### Developer ease

How long does it take to get to "Hello World"?

Now, the phrase "hello world" is most commonly used in the context of programming languages.
However, this means something *very different* in the context of *platforms*
compared to programming languages.

For example, for a programming language,
getting to "Hello World" usually involves the following:

- Install the compiler/ interpreter/ VM
- Type a handful of lines of code in a file
- (In some cases) Run the compiler
- Execute the binary *or* run the interpreter/ VM

In the case of a platform however, there is far more to it than that!
Typically, it involves:
- Installing a suite of tools; not just a single one
- Interacting with external services; not exclusively `localhost`
- A set of examples for the platform; not a single one
- These examples, while concise, are also varied
  and are based on real world use cases for the platform;
  certainly far more complex than printing text onto the screen
- Education around background and context surrounding the platform;
  it is about more than just the code in the examples

The big picture here is that the equivalent of "Hello World" in platforms
are specific to the industry/ type of technology that the platform is in,
and have to be about most developers are trying to do.
The challenge then is to reduce each of these things
into an [SSCCE](http://sscce.org/) -
a short, self-contained, correct, code example.

How to judge how good are your SSCCEs?
The main thing is speed:
How *fast* developers can *become productive* on your platform,
by following along with these examples.
The faster the better, and crucially,
the more likely developers are going to *stick to your platform*.

### Developer activity

How many developers are using your platform?

This is somewhat easier to measure and track,
because it lends itself naturally to
[quantitative measurements](https://blog.bguiz.com/2021/metrics-tracking-software-teams/#heading-quantity-vs-quality),
unlike developer ease, which is primarily qualitative.
However, it has its own different challenges, because of the
[locus of control](https://blog.bguiz.com/2021/metrics-tracking-software-teams/#heading-locus-of-control) limitation,
essentially because you'll only be able to influence it indirectly,
rather than directly,
and therefore there's be some degree of disconnect between
your actions and the resulting outcomes.

There are many possible things to choose from here that could be measured,
however the most important ones are:
- Number of active developers,
- number of projects, and
- number of integrations between projects.

**Number of active developers**

How many developers are using your platform,
on a weekly or monthly basis?

This is vital - if your platform is losing developers,
then the other two metrics will soon follow suit,
less product and less integrations between them.

If a developer starts to use your platform,
and then stops after a week/ a month,
then that developer is no longer active,
and no longer counts in this metric.

**Number of products**

The objective of attracting developers to use your platform,
is for them to build their products on your platform.

Usually a developer does not go straight from discovering
a new platform and jump right into building their product on it.
It involves a lot more research,
and first hands experimentation with the platform,
for example, building demos or proof-of-concept projects,
before they will commit to building their product on it.

Note that this metric is cumulative by nature,
so instead of measuring the total,
instead measure the increase per unit time.

**Number of integrations between products**

How many products are getting integrated with other products on your platform,
or with other products off your platform?
This relates to the [network effect](https://en.wikipedia.org/wiki/Network_effect),
except that here we're discussing the number of products on the platform,
and not the number of users of those products.

Having a number of products built on your platform
that *exist in isolation* is a good thing,
and having the same number of products
that *interact with or use each other* is an even better thing.

This goes towards thinking about your platform as the infrastructure for an ecosystem,
and how having a vibrant ecosystem on the platform is attractive to developers,
and can even be a point of differentiation.
In certain industries or technology types,
there can be key projects that deploy their product across multiple platforms,
and attracting these projects onto your platform will be a key factor here.

Note that this metric is cumulative by nature,
so instead of measuring the total,
instead measure the increase per unit time.

### Levers of control and influence

What do you have at your disposal to influence developer ease,
and influence developer activity?

There are some things that your can do to *control* the outcome,
and these are usually when it is within your locus of control.
There are other things that you can do to *influence* the outcome,
and these are usually when you have indirect influence.

Here it is important to do a couple of things:
- Define the measurement technique
- Conduct experiments and analyse their results

**Measurement technique**

When defining the measurement technique,
the main idea is that the measurement is repeatable.
Ideally, you should be able to query the numbers required through
a database query or an API call.
If possible, back-test the measurements, so that you know the
trends going into it.

For metrics that are non cumulative
(e.g. number of active developers),
the objective should be an increase in the absolute number.
For metrics that are cumulative, on the other hand,
the objective should be an increase in the rate of increase -
in other words, is it accelerating or decelerating?
Track these numbers using multiple time windows
(e.g. weekly and monthly)
in order to be able to see short term and long term trends,
and also use statistical treatments such as moving averages
to reduce volatility from uncertainty.

A crucial part of measurement techniques would be to
ensure that you stick to them over the long term.
Chopping and changing the specifics of how something is measured
is not going to enable the proper analysis of results of experiments;
which segues into the next part.

**Experiment and analyse**

Once you have your metrics defined,
the next thing to do is figure out ways to increase their values.
For things that are within your locus of control,
the relationship is direct, and it is usually some variant of:
"Do more of *X* and get more of *Y*".

However, oftentimes the relationship is not direct
and it becomes necessary to experiment.
Through these experiments,
discover which actions are the most effective
in obtaining the intended outcome.

To create an experiment, first *generate hypotheses*.
Ask *why* something has this particular result,
and then answer your own question.
If the question has a single answer,
ask *why* that happens yet again.
Keep doing this until you get to multiple answers.
Once you have multiple possible explanations as to *why*,
you have the hypothesis for the experiment.

Example of hypotheses generation:

- Question 1: Why is the number of active developers on our platform decreasing?
- Answer to Q1: Because they are using this other platform instead.
- Question 2: Why are they using the other platform?
- Answer to Q2: There are grants available for developing on the other platform
- Another answer to Q2: There is a technical compatibility problem on our platform

Now we have 2 possible answers to the second question -
and at this point, we don't know whether either of them is even correct -
at this point the answers really are speculation.
But they could be true, and they do trace back up to something we care about (the metrics),
and therefore it would be important to find out.
These answers are the hypotheses that we have to test in our experiments.

The action item in the experiments would be to
do the thing that the platform is currently not doing,
or fix the thing that is currently not working on the platform -
whatever it is that the hypothesis was.
Then look at the before and after effect of that on the metrics,
which you're already measuring by now.

It'll be hard to pinpoint a direct cause and effect of a particular experiment,
because, depending on the nature of the platform.
It may not be possible to create a proper experimental environment
where all other things are equal and there is only one variable.
Therefore the experiment may need to be repeated,
and some qualitative judgement may be necessary.

## Wrap

Developer advocacy is multi-purpose tool
for an organisation that wishes to drive
the adoption and growth of its technology platform.
It does so by accomplishing a myriad number of
tasks both internally among different teams,
and externally among developers.
