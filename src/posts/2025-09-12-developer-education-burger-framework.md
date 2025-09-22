---
title: 'The Tutorial Burger, a Framework for Developer Tutorials'
date: '2025-09-12T17:20:00+08:00'
tags: [devrel, education, tutorial]
socialImage: /images/posts/tutorial-burger-a1.webp
metaDesc: >
  Learn why developer education is the cornerstone of Developer Relations.
  Discover the burger framework for scalable onboarding, content iteration, and long-term developer success.
---

## Introduction

In Developer Relations (DevRel), education is critical.
It is the foundation for developers to adopt your tech platform.

Marketing builds awareness, and community fosters belonging.
But developer education (DevEd) drives usage, mastery, and advocacy.

What is the first encounter, for most developers, with your tech?
It likely won't be a conference talk or a hackathon workshop.
Instead it will likely be the tutorials.
The things you find when googling "how to do X using Y".
These materials define the speed of adoption and how developers perceive your brand.

Missing or low quality education creates friction, confusion, and churn.
On the other hand, strong education does the opposite.
It builds trust, accelerates time-to-value, and fosters long-term confidence.

This article explores:
- Why developer education is central to DevRel
- The burger framework for developer tutorials
- Mix and match - what works, and what doesn’t
- Iteration and selectivity
- Developer education roadmap

![](/images/posts/tutorial-burger-a1.webp)
    
Note that a written article alone is not a tutorial.
That is a common misconception.
A good tutorial for developers consists of much more!
(We will get to this in the burger framework.)

## 1. Why developer education powers DevRel

Developer education is a vital function that DevRel teams perform.
A thriving community means little if onboarding is confusing or tutorials are vague.


![](/images/posts/tutorial-burger-b1.webp)

Why it matters:

- Education drives retention.
  The sooner developers reach their first success, the more likely they stay.
  To do that, they need to be able to find the tutorials they are looking for.
- Clarity builds confidence.
  Consistent, organised material signals that developers are supported.
- Foundational.
  Developer education is the base upon which many other DevRel initiatives build on.
    

## 2. The Burger Framework for developer education

Think of a burger.
It is layered.
It is structured - just like great educational material should be.


![](/images/posts/tutorial-burger-c1.webp)

Layers of the burger:

- Patty: The code repo, which is the core content.
    - The rest of the materials are surrounding/ supporting this.
    - Example: A github repo containing a concise code example.
- Bottom Bun: The written article, which is the essential support.
    - Guides the developer on how to use/ understand the code repo.
    - Example: A page, published on the documentation site, which includes multiple steps and explanations.
- Sauce: Friction reduction, which are developer experience enhancements.
    - Ensures that the developer does not get stuck/ frustrated.
    - Example: Discovery, bug fixes + feature additions to the code repo, and updates to the written article.
      These are geared to make it faster or easier for a developer to complete the tutorial.
- Top Bun: The video demo, which are polished assets.
    - Shows the developer how to follow along with the code repo and the written tutorial.
For visual and auditory learners.
    - Example: A video uploaded to Youtube.
      Primarily made from a recording with screen + voice + optionally camera, walking through the steps in the written tutorial and using the code repo.
- Box: The social media posts, which provide packaging and marketing.
    - Ensures the right developers actually see this tutorial.
    - Example: Twitter posts, LinkedIn posts, et cetera, which link to the code repo, written article, or video demo as their CTAs.
      Alternatively, could take the form of youtube shorts/ tiktoks which have those CTAs.

Developer education should be layered logically, and intentionally designed.

(Note, for those who have worked with me in the past: I previously referred to this as the tutorial stack.
The burger framework builds on that concept.)

## 3. Mix and match - what works, and what doesn’t

You can put together the layers of the burger in different ways, and some of them work, while others simply don't.
For example, if you have the patty and the bottom bun, you've got yourself an open sandwich.
It's not a burger, but it's still something good enough!
What about just the top bun in a box?
No thank you!

Let's apply this to tech tutorials, and we can see what to do, and what to avoid.

<!-- image -->
For each row in the table: A mini clean, branded infographic of a burger stack with a different subset of layers.
No need for labels, since it is so small.
Helps readers reinforce the metaphor.
The goal is to help them visualise different combos that make sense and do not.
The images should be vector-style, minimal, not playful cartoonish.
lean to a sleek tech aesthetic.  
Alt text: (copy from the text of each table row)
<!-- /image -->

|   |   |   |
|---|---|---|
|Combination|Outcome|Takeaway|
|Patty alone|❌ Too raw|Core docs without setup support frustrate devs.|
|Patty + bottom bun|❌ Still weak|Quick start lacks surrounding guidance.|
|Patty + bottom bun + box|✅ Viable|Solid minimum. Works as a starting point.|
|Patty + bottom bun + sauces|✅ Strong|Reduces churn with an intentional DX.|
|Patty + bottom bun + top bun|❌ Misguided|Polished videos without good DX miss the point.|
|Full burger|⭐ Excellent|Highest effort, and highest quality education possible.|

How to choose the right burger stack for each asset?

## 4. When to use the full burger

Not every piece of education deserves full polish.
Selectivity optimises the use of DevRel resources.

![](/images/posts/tutorial-burger-e1.webp)

Use the full burger for:

- Hello world experiences
- Getting started guides
- Any other high traffic or high priority items

Keep lightweight for:

- Niche or specific topics
- Experimental topics

When keeping lightweight, I recommend the open sandwich.
It's the minimum that makes sense.
Anything less, and the impact is too low, may as well skip it.

For higher priorities, I recommend the full burger.
You likely won't have the resources to do this for all of your tutorials, so choose wisely.
In this case wisely means being selective, plus being consistent about the rationale.

This allows the team to scale.
The trick is to intentionally spread between quantity and quality.

## 5. Iteration and selectivity

You won't be able to build the entire tutorial all at once.
Instead build it layer by layer.
This is my suggested order:

- Patty (code repo): This is the first, and most important, thing in any tutorial.
  Get it right, and iterate till you feel like this is near-perfect before proceeding.
- Bottom bun (written article): This could even be as minimal as listing the steps in the README of the repo.
  Use that as a starting point, sure.
  Ideally, you should have this in the documentation portal (AKA the docs).
- Condiments (developer experience): Run DX audits to spot friction points.
  For starters, you can do micro DX audits of yourself using the repo.
  This will suffice in most cases.
  However, for high visibility/ priority tutorials, consider asking colleagues, and even community members.
- Top bun (video demo): This is the most time and resource intensive aspect of tutorial creation.
  You may combine this with self DX audits (see above) to get two-for-one.
- Box (social media): Ensure that your developer community knows about the new tutorial.
  For higher priority tutorials, combine with DevRel in public.
  This way, they hear about it before the tutorial is even complete.

![](/images/posts/tutorial-burger-f1.webp)

## 6. Building a long-term developer education strategy

Great developer education is functional.
It provides a critical stepping stone for developers building on your tech platform.
Thus, for each tutorial, ask yourself the following questions:

- Are we reducing the time to first aha?
  (Utility)
- Does this resource increase developer confidence?
  Developer success rate?
  (Impact)
- What is the effort proportional to its priority and visibility?
  (Strategy)

![](/images/posts/tutorial-burger-g1.webp)

When a tech platform has a great set of tutorials, it creates compounding value.

- Directly, for its developer community: More satisfaction.
- Indirectly, for the DevRel team: Easier onboarding, less support, more scale.
    
## Tutorials are the foundation of DevRel

Tutorials are a tech platform's main vehicle for developer education.
They determine adoption, retention, and trust.
Using the burger framework helps DevRel teams achieve this for the tech platform.

If you are sold on this framework, and want to implement it, I suggest this next step:

- Audit your developer education materials.
- Which of them are tutorials, but are missing components?
- Which of them should be open sandwiches, and which ones should be full burgers?
    
I plan to publish a video on this soon, so [subscribe](https://www.youtube.com/@devRelRel?sub_confirmation=1)!

## Credits

Thanks to [Owanate Amachree](https://www.linkedin.com/in/theowanateamachree/) and
[Michiel Mulders](https://www.linkedin.com/in/michielmulders/)
for their inputs and help with proofreading this article!
