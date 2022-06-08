---
title: 'Takeaways - Dogfood Your Web3 Ecosystem'
date: '2022-06-08T06:22:00+08:00'
tags: [ux, web3]
socialImage: /images/posts/dogfood-your-web3-ecosystem-banner.jpeg
metaDesc: >
  The main takeaways from the the activities
---

During, and after, the activities day, we collected a lot of feedback.
While one intended outcome was to get everyone with some hands-on experience
within the ecosystem that they were helping to build or support;
another **very important** intended outcome was for us to learn
about what works, what does not, and what can be **improved**.

![](/images/posts/dogfood-your-web3-ecosystem--user-realisation.png)
> What I’ve started realising is that if we define everyday user as non-advanced crypto user,
> we limit it to like 99.9 percent of the society 😄
> - [Natalia Baránková](https://www.linkedin.com/in/natybarankova/)

By and far, the biggest takeaway from the dogfooding experience was that
the technology needs to be adapted to serve everybody,
not just the tech savvy power users.

The body of this post details the various ways in which this central theme surfaced,
from DApps, gamification, networks, infrastructure, and skills.

## Network-related

The most common complaint during the day - virtually every single participant had an issue with this - was Internet issues. This was of course nothing to do with the activities or the ecosystem... but nonetheless was a huge challenge for almost all participants. This was because we were all connected to the hotel's WiFi, and it simply couldn't handle the bandwidth needed.

We mitigated this by getting those with local SIMs to start their own WiFi hotspots, and then have the other group members tether to it. We had partial success with this, because there weren't enough to go around for everyone.

There were also security concerns from connecting to a network - better to use a network which you control!

The main takeaway from this is that relying on the default network at the venue isn't the best plan. In the next iteration we should bring our own router(s) and set up our own network capable of supporting the number of devices anticipated.

## Skills-related

When planning how to split the teams, we needed to make guesses about who knew their way around the tools and the ecosystem already, and who would need to pick up some skills on the spot. Turns out that only **around one in five** in the organisation already had the required skill levels. We expected a larger proportion, since by definition, every participant works in the blockchain industry. If we extrapolate  this to a global user base, the proportion is going to be even lower. This shows that a move to Everyday DeFi is a logical step to mass adoption, as most users will not be crypto native.

Some specific skill gaps that we identified included:
- Unable to check transaction status using block explorer
- Not planning ahead - need to retain a small amount of RBTC to pay for gas fees in anticipated transactions
- Configuring a custom network in a wallet was challenging

On the flip side, there were a few who were really advanced, and were able to identify and perform the easter egg tasks with uncanny ability. Something else that we predicted, and were happy about, was that one or two people from each group, with the higher skill levels, completed their tasks quite easily, and then proceeded to help the rest of the group complete their tasks.

## Gamification-related

The gamification elements of the activities day also brought out some interesting outcomes.

There was a leader board projected onto the main screen, and this helped to foster a competitive environment. Of course, this led to some heckling about the methodology and fairness etc, but what's a competition without some of that, eh?

The competitive atmosphere also made it more compelling. Most of the other sessions consisted of presentations, and people would leave immediately when the break started, and dawdle in slowly after the break was over. In this session, however, most seemed glued to their seats, leaving later after the break started, and returning earlier as well. We felt that this was genuine enthusiasm taking hold!

There were several instances of **rage-quits** observed during the day as well. Some gave up because of the Internet issues. Some gave up because a DApp didn't behave "as it was supposed to". Some gave up because they made genuine errors. The experts (the ones who were running and evaluating the groups) were sometimes able to cajole those who gave up to get back into the game. In other cases, the frustration levels were so high that they refused. The good thing is that the latter group was less than a handful of people - most were successful!

My personal reflection of the above is that even though today’s web3 ecosystem **is too technical**, or otherwise hard to use, some **perseverance, paired with help** from someone who’s experienced, is able to get them over the line. This was possible (and encouraged) in the way that this activities day was structured. However, this is likely out of reach for the average user, representing a **significant barrier to entry**.

## Infrastructure-related

The core technology of the RSK blockchain network had solid, dependable performance.
However, there were failures - in the eyes of the users - in the technical infrastructure surrounding/ supporting the usage of the network. There were also failures occurring in the applications/ services within the ecosystem, which also felt like - in the eyes of the users - infrastructure failures.

The most commonly encountered issue- by a huge margin - was the rate limits imposed by the RSK public nodes. Since most of us were on the same network, the public node would have rate limited the entire group as if it were one user; based on the traffic originating from a single IP address. Rate limiting is a valid technique used by devops/ security to protect infrastructure against denial-of-service attack vectors. So this is a hard balancing act. Some proposed ideas around this that require investigation were: Another means of detecting unique users for the purposes of rate limiting? A decentralised form of public RPC nodes?

There were several other very valuable comments too:
- Need an easier way to configure web wallets to add the RSK network.
- In the block explorer, a brand new account shows as "Not Found"; so provide steps to validate or verify that the account is operable
- Transactions on the blockchain are slow, a lot of time was spent waiting while thinking that something had maybe failed; the biggest frustration here was that DApps were much slower than using web2 apps

## DApp-related

The DApp related complaints were:
- The liquidity available on RSK Swap for the RBTC/RIF pair was too low to be viable
- The DApp for Sovryn would glitch with the drop down menu when selecting tokens; some swapped RBTC to SOV instead of RBTC to RIF in one of the exercises
- Too little priority given to user experience in DApps

Better handling of errors within DApps was the most commonly complained about UX issue. If an RPC request failed, in many cases, a DApp would just stall, neither displaying an error nor moving onto the next stage. In other cases, the DApp would show a cryptic error message, such as `Invalid RPC Response ""` (which is gibberish, and confusing to the average user). The main takeaways here are that DApps need to handle errors more robustly; when errors occur, surface the technical reason in an understandable + helpful manner to the end user, such as `RPC server has rate limited you. Consider switching to another RPC server [LINK].`

Participants also had miscellaneous other suggestions related to the DApps:
- Publish troubleshooting guides for usage of DApps within the ecosystem
  - e.g. How to manually reset account TX nonce in wallet
  - e.g. How to clear cache of a web wallet
- Integrate RNS into more wallets, in order to avoid the need to copy `0x...` addresses
- rLogin be integrated into more DApps within the ecosystem
- Provide an easy way to split a transfer into a group of accounts

## Wrap up

![](/images/posts/dogfood-your-web3-ecosystem--user-quadrants-transition.png)
> One small step for usability, one giant leap for adoption.

We believe that the experiences we had during this activities day are largely mirrored across the broader web3 ecosystem. The clear call to action is that in order to move the industry to mass adoption, focus is required on improving the user experience. Mass adoption will not be driven by the crypto native and tech savvy individuals. Instead, mass adoption will be driven by its usage in everyday use cases such as purchases, remittances, lending, and borrowing. Therefore, the goal is to take these lessons learned, and apply them. This will be a journey of taking web3 from being accessible to the few, to being accessible by the many.

## Fin

A big thanks to **everyone** who participated. Of course, major props to those who helped with the planning the activities and running the event on the day: [Mike Mendes](https://www.linkedin.com/in/michaelmendes7), [Bernardo Codesido](https://www.linkedin.com/in/bernardocodesido), [Filipe Moura](https://www.linkedin.com/in/filipemoura), [Maxi del Hoyo](https://www.linkedin.com/in/0xmdh), [Diego Masini](https://www.linkedin.com/in/diegomasini), and [Lionel Modi](https://www.linkedin.com/in/hlmodi/). Thanks to the partners in the RSK ecosystem whose DApps were part of the activities: [Money on Chain](https://rif.moneyonchain.com/), [Tropykus](https://app.tropykus.com/?lang=en), [Kripton Market](https://marketplace.kriptonmarket.com/), and [Sovryn](https://live.sovryn.app/).  And finally, to [Daniel Fogg](https://www.linkedin.com/in/danielfogg), for seeding the  idea around dogfooding.

----

This post is (non-chronologically) the final one in a series of posts.
Be sure to check out the others!

- [Dogfood Your Web3 Ecosystem](/2022/dogfood-your-web3-ecosystem/) - The thinking behind it, and preparation for it
- [Try it yourself!](/2022/dogfood-your-web3-ecosystem-diy/) - A list of all activities, (almost) no spoilers
- *Coming soon* Demos - How the activities were completed and evaluated, spoilers aplenty
- *This post* [Takeaways](/2022/dogfood-your-web3-ecosystem-takeaways/) - What we learnt from the entire process
