---
title: 'Account Abstraction at the Protocol Level'
date: '2023-10-23T20:22:00+08:00'
tags: [web3, account-abstraction]
socialImage: /images/posts/account-abstraction-protocol-level-account-private-key-relationship.png
metaDesc: >
  Update private key + delegate authorisation + multisig + separate payer <- When accounts natively support all of these, this enables account abstraction at a protocol level.
---


## What is account abstraction?

In a nutshell, account abstraction is the ability to *separate* private keys from an account.

In Ethereum, the accounts model is such that accounts operated by users
(Externally Owned Account, or EOA)
start off as a private key (ECDSA secp256k1),
and this is used to generate a public key,
and this in turn is used to generate an address.
The *account* is made up of all of these: Private key, public key, and address.
Almost all other EVM-compatible networks have followed suit,
and EOAs work the same way across multiple networks.

![](/images/posts/account-abstraction-protocol-level-account-private-key-relationship.png "Accounts' relationship to private keys: EOA-style account vs protocol level AA-style account")

While this approach works well for the intended use cases of EOAs,
they get in the way of (perhaps even prevent)
any use cases enabled by separating private keys from their accounts.

## What is *protocol level* account abstraction?

Let's say that the accounts model does *not* need to work
in the way that EOAs do in Ethereum, and we could start afresh...
In other words, design a new accounts system.
What could that look like?
What traits/ behaviours would accounts ideally have,
in order to enable account abstraction?

Here are four traits that I propose as necessary:

- (1) An account should be able to update its own private key.
- (2) An account should be able to delegate the ability to operate on its behalf
	- to another account, and/or
	- to a smart contract.
- (3) An account should enable m-of-n multisig, where authorisation can be provided
	- by a private key signature, and/or
	- by invocation of a specified smart contract.
- (4) Authorising (signing) a transaction and paying for a transaction should be performed
	- by the same account in both cases, or
	- by different accounts

![](/images/posts/account-abstraction-protocol-level-4-traits.png "4 traits of accounts with protocol level account abstraction")

If accounts in a network have the ability to do all four of the above,
that would mean that this network supports account abstraction
at a **protocol level**.

## Does account abstraction equal smart wallets?

In short: No.

![](/images/posts/account-abstraction-protocol-smart-wallet-is-not-aa.png "Smart Wallet is not equal to Account Abstraction")

Smart wallets are an implementation enabled by account abstraction.
In my opinion account abstraction is a lower-level concept -
it is not an application, but rather the underlying protocol.

Stated in another way:
When the term "smart wallets" is used interchangeably with "account abstraction",
an application built using a protocol is being conflated with the protocol.
(This would incorrectly imply that the protocol is single purpose.)

## What does account abstraction achieve?

For typical end users, web3 technology is too hard to use.
The user experience of interacting with web3 applications (DApps)
requires far more tech savvy to navigate than web2 applications.

Users of web3 unfortunately often get tripped up
during one of the very *first steps* in using any application:
Creating an account, and logging into an account.
There have been many attempts to solve this in various web3 applications,
but so far none of them have gotten close to the simplicity
of the humble username-password combination,
plus the ability to reset passwords when you forget them.

Some web3 applications have a "solution" for this:
Let users continue using usernames and passwords,
amounting to a faux account.
In this case, the web3 application will manage the account (private keys included)
on its own web2 server, which has custody of the *real* account.
While this approach technically works,
it misses the whole point of web3 technology and philosophy.
In this scenario, that user may as well use a web2 application instead.

Remember: Not your keys, not your crypto.

(It is presently 2023, a whole 14 years since Bitcoin's inception...
yet the above still needs to be said.)

![](/images/posts/account-abstraction-protocol-level-picard-facepalm-custodial-wallet.png "2009: Not your keys, not your crypto ... 2023: Uses custodial walet")

So how can you solve this problem?
Is there a *true* web3 way to get the equivalent user experience of web2 accounts?
One that does not involve *ceding custody* of keys to any (centralised) entity?

Account abstraction, as it turns out, is a great way to achieve that!
One of the use cases for account abstraction is
the ability to recover your account in a decentralised manner.

- [Ref: Social Recovery Wallets - Vitalik Buterin](https://vitalik.ca/general/2021/01/11/recovery.html)
- [Ref: Decentralised Wallet Recovery - Itmar Lesuisse](https://www.argent.xyz/blog/argent-secure-decentralised-ethereum-wallet-recovery/)

Recovering accounts in this manner solves the first (and major)
hurdle to the adoption of web3 technology.
What else can account abstraction bring to the table?

- Transferring currency (fungible tokens) without the need to manage a separate currency (native coin) for transaction fees
- Transferring currency (fungible tokens) with transaction fees subsidised or discounted
- Cheaper network transactions, by bundling operations of multiple users into a single transaction
- More generally: Any task that can be performed by a smart contract

## Can account abstraction accelerate the adoption of web3 tech?

In short: Yes.

In a network with account abstraction enabled,
developers will have the ability to create web3 applications
with a user experience closer to web2 applications.
It follows that web3 applications will (likely) no longer have an upper limit
on the number of users that they can have.

This could kick off a positive feedback loop,
where this incentivises more companies that currently build web2 applications
to start building web3 applications as well.
Perhaps it might even inspire more web2 companies to switch to a web3-first approach,
and build web3 applications *instead of* web2 applications.

Web2 companies typically choose to adopt web3 technology for a couple of reasons:

- The buzzword factor
- The desired for web3 traits (such as immutability and decentralisation)

The buzzword-motivated companies are usually motivated by
generating press attention at worst,
and innovation pilots/ proofs-of-concept at best.
Let's set these aside.

Instead, let's focus only on web2 companies who have truly understood and internalised
the value of web3 principles and want to bring those principles in-house.
These companies would be willing to build their products based on those fundamentals,
however, they will *not* be willing to do so at all if they cannot turn a profit by doing so.
If these companies think that web3 technology adoption will
place an upper limit on user acquisition they simply will not make the jump.

Without account abstraction, web3 does indeed have this problem - an adoption barrier.
Decentralised recovery of accounts, enabled by account abstraction,
would remove one of the biggest friction points for user acquisition (and retention).
Therefore, with the removal of this constraint, those same companies,
that are currently holding back on building their products with web3 technology,
may now reconsider, and decide to go through with it now.
This will be critical to adoption!

This comes with a big caveat though.
Whenever there is any new technology introduced,
you can be sure of two things:
(1) It will be used to build more or better software,
perhaps in ways that weren't possible before; and
(2) The attackable surface area will increase,
and this will inevitably lead to exploits as security vulnerabilities are discovered.

When the latter happens, new sets of security best practices would need
to be created to counter them, and put into practice.
The good news is that unlike when the EVM (and smart contracts in general) first started,
there are now far more players with expertise in web3 technologies
in the security space compared to back then.
They are far more established too.
My prediction here is that the feedback cycles will be shorter as a result,
and we will see a quicker turnaround from attack vector discovery
through to adoption of security best practices that counter each new vector.

## Is there a concrete example of protocol level account abstraction in action?

On Ethereum, the preferred approach toward implementing account abstraction
is [EIP-4337](https://eips.ethereum.org/EIPS/eip-4337).
Its abstract reads as follows:

> An account abstraction proposal which completely avoids the need for consensus-layer protocol changes.
> Instead of adding new protocol features and changing the bottom-layer transaction type,
> this proposal instead introduces a higher-layer pseudo-transaction object called a `UserOperation`.
> Users send `UserOperation` objects into a separate mempool. 
> A special class of actor called bundlers package up a set of these objects
> into a transaction making a `handleOps` call to a special contract,
> and that transaction then gets included in a block.

Essentially, Ethereum's accounts and transaction model,
at the protocol level, does not support account abstraction,
and therefore `UserOperation` and special contracts are needed.

Hypothetically, this would **not** be needed if the protocol supports
the four traits in its accounts model,
as outlined in the "What is *protocol level* account abstraction?" section earlier.

> - (1) An account should be able to update its own private key.
> - (2) An account should be able to delegate the ability to operate on its behalf
> 	- to another account, and/or
> 	- to a smart contract.
> - (3) An account should enable m-of-n multisig, where authorisation can be provided
> 	- by a private key signature, and/or
> 	- by invocation of a specified smart contract.
> - (4) Authorising (signing) a transaction and paying for a transaction should be performed
> 	- by the same account in both cases, or
> 	- by different accounts

Let's contrast Ethereum's account abstraction approach
with what is available on another network, Hedera.

Hedera simultaneously:

- (1) **Is** EVM-compatible, and
- (2) **does not** follow Ethereum's accounts model.

This article will not detail exactly how this is possible or how it works.
Instead, please refer to my presentation:
[Ethereum Virtual Machine on Hedera](https://blog.bguiz.com/presentations/evm-on-hedera/)
(press `S` to view detailed notes on each slide).

**tl;dr=** EVM compatibility was added later on,
on top of the existing accounts model that Hedera launched with.
This included (1) adding support for ECDSA secp256k1 keys
(originally was EdDSA ED25519 keys only), 
(2) adding an `EthereumTransaction` transaction type which would "wrap"
EVM-compatible transactions within the existing transactions model, and
(3) creating an "account alias" system that would map conversions between
"native accounts" and EVM addresses.

Hedera has **its own** accounts and transactions protocol,
which exhibits **all four** of the traits listed above.

Again, this article does not intend to detail how this is possible, or how it works.
Instead, please refer to another presentation:
[Account Abstraction on EVM-compatible networks: Hedera and Ethereum](https://blog.bguiz.com/presentations/evm-account-abstraction-hedera-ethereum/)
(press `S` to view detailed notes on each slide).

**tl;dr=** Check out the following two code demos which illustrate
how to perform protocol-level transactions on an account to transfer fungible tokens,
which is one of the *key uses cases* for smart wallets:
(1) [`multisig-account`](https://github.com/hedera-dev/hedera-code-snippets/tree/main/multisig-account): How to use native m-of-n multisig with cryptographic keys only on an account to authorise transactions, and
(2) [`multisig-sc-account`](https://github.com/hedera-dev/hedera-code-snippets/tree/main/multisig-sc-account): How to use native m-of-n multisig with a mix of cryptographic keys and smart contracts to authorise transactions.

In effect, the primary difference is that Hedera's native accounts and transactions model
is designed to allow accounts to be separate from their cryptographic keys.
This breaks the fundamental limitation of the
Externally Owned Account (EOA) concept from Ethereum,
which is that 1-to-1 mapping of private keys to accounts.

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
its fundamentally different accounts model?
