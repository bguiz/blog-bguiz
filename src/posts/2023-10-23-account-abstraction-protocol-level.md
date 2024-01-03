---
title: 'Account Abstraction at the Protocol Level'
date: '2023-10-23T20:22:00+08:00'
tags: [web3, account-abstraction]
socialImage: /images/posts/account-abstraction-protocol-level-account-private-key-relationship.png
metaDesc: >
  Update cryptographic keys + delegate authorisation + multisig + separate payer ← When accounts natively support all of these, this enables account abstraction at a protocol level.
---

## What is account abstraction?

In a nutshell, account abstraction is the ability to *separate* cryptographic keys from an account.

In Ethereum, the account model is such that accounts operated by users
(Externally Owned Account, or EOA)
start off as a private key (ECDSA secp256k1),
which is used to generate a public key,
and this in turn is used to generate an address.
The *account* is thus inseparabale from its private key, public key, and address.
Almost all other EVM-compatible networks have followed Ethereum,
and EOAs work the same way across multiple networks.

While the EOA approach has worked well for its intended use cases,
new and interesting use cases are made possible when cryptographic keys
are separated from their accounts.
Account Abstraction uses an alternative account model where this is possible.

![](/images/posts/account-abstraction-protocol-level-account-private-key-relationship.png "Accounts' relationship to cryptographic keys: EOA-style account vs protocol level AA-style account")

## What is *protocol-level* account abstraction?

Let's say that the account model does *not* need to work
in the way that EOAs do in Ethereum, and we could start afresh...
In other words, design a new account model.
What would that look like?
What traits/ behaviours should accounts ideally have
in order to enable account abstraction?

Here are four necessary properties:

- (1) An account should be able to update its own cryptographic keys.
- (2) An account should be able to delegate the ability to operate on its behalf
	- to another account, and/or
	- to a smart contract.
- (3) An account should enable [m-of-n multisig](https://en.bitcoin.it/wiki/Multi-signature),
  where authorisation can be provided
	- by a cryptographic key signature, and/or
	- by invocation of a specified smart contract.
- (4) Authorising (signing) a transaction and paying for a transaction should be performed
	- by the same account in both cases, or
	- by different accounts

![](/images/posts/account-abstraction-protocol-level-4-traits.png "4 traits of accounts with protocol level account abstraction")

If accounts in a network can exhibit all four of the above properties,
that would mean that this network supports account abstraction
at a **protocol level**.

## Does account abstraction equal smart wallets?

In short: No.

![](/images/posts/account-abstraction-protocol-smart-wallet-is-not-aa.png "Smart Wallet is not equal to Account Abstraction")

Smart wallets are wallets that are controlled through smart contracts,
in a non-custodial manner.
They can be implemented using account abstraction, or through other means.
Account abstraction can be thought of as a lower-level concept —
where smarts wallets are the application
and account abstraction is the underlying protocol.

Stated in another way:
When the term "smart wallets" is used interchangeably with "account abstraction,"
an application built using a protocol is being conflated with the protocol.
This would incorrectly imply that the protocol has a single purpose.

## What does account abstraction achieve?

Those who are new to web3 are likely to find DApps (Web3 applications)
too difficult to use.
Interacting with DApps requires users to be far more tech-savvy
than they were with web2 applications.

One of the first steps in using any application is to create an account,
then log in to your account.
Unfortunately most DApp users often get tripped up during these initial steps,
due to the much higher technical complexity compared to
doing the equivalent initial steps in a web2 application.
There have been many attempts to solve this in various web3 applications,
but so far none of them have gotten close to the simplicity
of the humble username-password combination,
plus the ability to reset passwords when you forget them.

Some web3 applications have a "solution" for this:
Let users continue using usernames and passwords,
amounting to a faux account.
<<<<<<< HEAD
In this case, the web3 application will manage the account (cryptographic keys included)
on its own web2 server, which has custody of the *real* account.
While this approach technically works,
it misses the whole point of web3 technology and philosophy.
In this scenario, users may as well use a web2 application instead.
=======
In this case, the web3 application will manage the account (private keys included)
on its own web2 server, which has custody of the *real* account.
While this approach technically works,
it misses the whole point of web3 technology and philosophy.
In this scenario, that user may as well use a web2 application instead.
>>>>>>> docs/preso-dev-rel-2023

Remember: Not your keys, not your crypto.

(It is presently 2023, a whole 14 years since Bitcoin's inception...
yet the above still needs to be said.)

![](/images/posts/account-abstraction-protocol-level-picard-facepalm-custodial-wallet.png "2009: Not your keys, not your crypto ... 2023: Uses custodial walet")

So how can you solve this problem?
Is a true equivalent to the user experience of accounts on web2 possible on web3?
One that does not involve ceding custody of keys to any (centralised) entity?

Account abstraction, as it turns out, is a great way to achieve that!
One of the use cases for account abstraction is
the ability to recover your account in a decentralised manner,
as illustrated in these articles:

- [Ref: Social Recovery Wallets - Vitalik Buterin](https://vitalik.ca/general/2021/01/11/recovery.html)
- [Ref: Decentralised Wallet Recovery - Itmar Lesuisse](https://www.argent.xyz/blog/argent-secure-decentralised-ethereum-wallet-recovery/)

Recovering accounts in this manner solves the first (and major)
hurdle to the adoption of web3 technology.
What else can account abstraction enable?

- Easy to understand transactions: Transferring currency (fungible tokens) without the need to manage a separate currency (native coin) for transaction fees.
- Cheaper transactions: Transferring currency (fungible tokens) with transaction fees subsidised or discounted.
- Cheaper transactions (again): Lower average network transaction fees, by bundling operations of multiple users into a single transaction.
- Programmability/ flexibility: Generally, any task that can be performed by a smart contract.

## Can account abstraction accelerate the adoption of web3 tech?

In short: Yes.

A network with account abstraction enables
developers to create web3 applications that can be understood more easily
by users who have more experience with web2 applications.
Without account abstraction, the upper limit for the number of users of web3 applications
is bound by the number of users with technical savvy.
With account abstraction, on the other hand,
it follows that this limit will be removed, thereby increasing web3 adoption rates.

This could kick off a positive feedback loop,
where this incentivises more companies that currently build web2 applications
to start building web3 applications as well.
Perhaps it might even inspire more web2 companies to switch to a web3-first approach,
and build web3 applications *instead of* web2 applications.

Web2 companies typically choose to adopt web3 technology for a couple of reasons:

- The buzzword factor.
- The desire for web3 traits:
  - The ability to create immutable and transparent public records in a decentralized manner.
  - The ability to remove trust assumptions. For example, no need to trust the entity hosting the databases or web servers.

The buzzword-inspired companies are usually motivated by
generating press attention at worst,
and innovation pilots/ proofs-of-concept at best.
Let's set these aside.

Instead, let's focus only on web2 companies who have truly understood and internalised
the value of web3 principles and want to bring them in-house.
These companies would be willing to build their products based on those fundamentals;
however, they will *not* be willing to do so at all if they cannot turn a profit by doing so.
If these companies think that web3 technology adoption will
place an upper limit on user acquisition, they simply will not make the jump.

Without account abstraction, web3 does indeed have this problem — an adoption barrier.
By lowering the barrier to enjoy and adopt web3, those same companies
that are currently holding back on building their products with web3 technology,
may now reconsider and decide to go through with it.
This will be critical to adoption!

However, this comes with a big caveat.
Whenever there is any new technology introduced,
you can be sure of two things:
(1) It will be used to build more or better software,
perhaps in ways that weren't possible before; and
(2) The attackable surface area will increase,
and this will inevitably lead to exploits as security vulnerabilities are discovered.

When the latter happens, new sets of security best practices would need
to be created and implemented to counter them.
The good news is that unlike when the EVM (and smart contracts in general) first started,
there are now far more players with expertise in web3 technologies
in the security space compared to back then.
They are far more established too.
It is likely that the feedback cycles will be shorter as a result,
and we will see a quicker turnaround from attack vector discovery
through to adoption of security best practices that counter each new vector.

## Is there a concrete example of protocol-level account abstraction in action?

On Ethereum, the preferred approach toward implementing account abstraction
is [EIP-4337](https://eips.ethereum.org/EIPS/eip-4337).
Its abstract reads as follows:

> “An account abstraction proposal which completely avoids the need for consensus-layer protocol changes.
> Instead of adding new protocol features and changing the bottom-layer transaction type,
> this proposal instead introduces a higher-layer pseudo-transaction object called a `UserOperation`.
> Users send `UserOperation` objects into a separate mempool. 
> A special class of actor called bundlers package up a set of these objects
> into a transaction making a `handleOps` call to a special contract,
> and that transaction then gets included in a block.”

Essentially, Ethereum's accounts and transaction model,
at the protocol level, does not support account abstraction,
and therefore, `UserOperation` and special contracts are needed.

Hypothetically, this would **not** be needed if the protocol supports
the four properties in its account model,
as outlined in the "What is *protocol-level* account abstraction?" section earlier.

> - (1) An account should be able to update its own cryptographic keys.
> - (2) An account should be able to delegate the ability to operate on its behalf
> 	- to another account, and/or
> 	- to a smart contract.
> - (3) An account should enable m-of-n multisig, where authorisation can be provided
> 	- by a cryptographic key signature, and/or
> 	- by invocation of a specified smart contract.
> - (4) Authorising (signing) a transaction and paying for a transaction should be performed
> 	- by the same account in both cases, or
> 	- by different accounts

Let's contrast Ethereum's account abstraction approach
with what is available on Hedera.

Hedera simultaneously:

- **Is** EVM-compatible, and
- **does not** follow Ethereum's account model.

This article will not detail exactly how this is possible or how it works.
Instead, please refer to my presentation:
[Understanding Hedera through EVM-related HIPs](https://blog.bguiz.com/presentations/evm-on-hedera/ "Ethereum Virtual Machine on Hedera")
(press `S` to view detailed notes on each slide).

**tl;dr=** Hedera launched with its own account model (in 2019),
and subsequently added EVM equivalence (in 2022). This included:

- Adding support for [ECDSA secp256k1](https://cryptobook.nakov.com/digital-signatures/ecdsa-sign-verify-messages) keys,
  in addition to [EdDSA ED25519](https://cryptobook.nakov.com/digital-signatures/eddsa-and-ed25519) keys.
- Adding [an `EthereumTransaction` transaction type](https://hips.hedera.com/hip/hip-410) which would “wrap” EVM-compatible transactions within the existing transaction model
- Creating [an “account alias” system](https://hips.hedera.com/hip/hip-583) that would map conversions between “native accounts” and EVM addresses.

Hedera has **its own** accounts and transactions protocol,
which exhibits **all four** of the properties listed earlier.

Again, this article does not intend to detail how this is possible or how it works.
Instead, please refer to another presentation:
[Account Abstraction on EVM-compatible networks: Hedera and Ethereum](https://blog.bguiz.com/presentations/evm-account-abstraction-hedera-ethereum/)
(press `S` to view detailed notes on each slide).

**tl;dr=** Check out the following two code demos that illustrate
how to perform protocol-level transactions on an account to transfer fungible tokens,
which is one of the *key uses cases* for smart wallets:

- [`multisig-account`](https://github.com/hedera-dev/hedera-code-snippets/tree/main/multisig-account): How to use native m-of-n multisig with cryptographic keys to authorise transactions.
- [`multisig-sc-account`](https://github.com/hedera-dev/hedera-code-snippets/tree/main/multisig-sc-account): How to use native m-of-n multisig with a mix of cryptographic keys and smart contracts to authorise transactions.

In effect, the primary difference is that the native account and transaction models on Hedera
are designed to allow accounts to be separate from their cryptographic keys.
This breaks the fundamental limitation of the
Externally Owned Account (EOA) concept from Ethereum,
which is that 1-to-1 mapping from cryptographic keys to accounts.

The implication of this is that almost all of the required ingredients
for account abstraction are **already present** in Hedera.

This poses an interesting challenge for Hedera.
While the network has been around much longer,
EVM-compatibility has been in place for only around 2 years now -
as opposed to since inception (by definition) for Ethereum.
And this has a knock-on effect.
In this case, when implementing account abstraction,
should Hedera follow the path trodden by Ethereum (such as EIP-4337)?
Or should Hedera tread its own path that leverages
its fundamentally different account model?

----

Thanks to [Joshia Seam](https://jseam.com/),
[Ying Tong](https://twitter.com/therealyingtong/),
[Emerson Liang](https://www.linkedin.com/in/emersonliangrei/),
[Ed Marquez](https://www.linkedin.com/in/ed-marquez/),
[Nana Essilfie-Conduah](https://www.linkedin.com/in/nconduah/),
[Danno Ferrin](https://www.linkedin.com/in/shemnon/), and
[Doug von Kohorn](https://www.linkedin.com/in/dougvk/)
for reviewing this post.
