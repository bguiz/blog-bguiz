---
title: 'Hedera: Blockchain or Not?'
date: '2024-06-06T14:14:00+08:00'
tags: [web3, blockchain, dag, dlt]
socialImage: /images/posts/hedera-blockchain-or-not-meme-two-buttons-dag-blockchain-hedera-banner.png
metaDesc: >
  Understanding Hedera’s unique consensus mechanism,
  and whether it is a blockchain or not.
---

**Understanding Hedera’s Unique Consensus Mechanism**

Hedera often sparks debate about how it should be classified.
Which type of distributed ledger technology (DLT):
Is it a blockchain or not?
The consensus mechanism grounds a DLTs' decentralization and
immutability properties.
These are core features in web3 philosophy.
The data structures and algorithms used for consensus influence the
network’s traits.
Thus it is vital to understand where Hedera fits,
and what impact this has on the network.

ℹ️ Already familiar with the implementation of various DLT types? Jump ahead to the section on
[**When Blocks are Produced Matters**](#heading-when-blocks-are-produced-matters).

## Key Terms

To navigate this discussion on Hedera and blockchain vs. DAG,
it is crucial to define a few key terms.

**DLT** refers to systems which deal with transactions.
In DLTs, transactions are immutable and shared amongst multiple parties.
This means that no one party can alter or delete data,
and still maintain provable integrity.
These transactions are append-only.
They alter the network state **exclusively** by adding new transactions.
These transactions must be verified using cryptographic signatures.
Importantly, consensus among network participants is needed.
Consensus is required **before** transactions can be added to the ledger.

In a **blockchain consensus model**,
transactions are bundled into **proposed blocks**.
These blocks then compete to be the next block added to the network.
The consensus mechanism ensures that all its transactions are valid.
It also determines which block gets added **atomically**.
The result of this process is a data structure resembling a
[singly linked list](https://en.wikipedia.org/wiki/Linked_list#Singly_linked_list)
of blocks.
In these blocks, transactions are often organized in
[Merkle trees](https://en.wikipedia.org/wiki/Merkle_tree).

Conversely, in a directed acyclic graph (DAG) consensus model,
transactions are not grouped.
They are submitted individually without being grouped into blocks.
The consensus mechanism primarily focuses on fair transaction ordering.
It adds each transaction to the network independently.
The result of this process is a
[DAG](https://en.wikipedia.org/wiki/Directed_acyclic_graph)
data structure, in which each node represents a transaction.

## Hedera’s Distinct Consensus Approach

Hedera uses a DAG consensus mechanism, not a traditional blockchain.
This means that client nodes do not propose and
send blocks of transactions to the network.
Instead, they propose and send individual transactions [^hashgraph-transaction-events].
Hedera’s consensus mechanism, known as Hashgraph, forms a DAG.

After achieving consensus, however, this completely changes.
At this point, transactions are ordered by consensus timestamp.
Consensus timestamp is based on their claimed submission timestamp,
and the order witnessed by consensus nodes.
These transactions are then grouped approximately every two seconds
into **record files**.
Transaction timestamps are used to serialize record files, in sequence.
These record files are equivalent to blocks in a traditional blockchain.
Each record file is a collection of transactions.
Each one follows exactly one previous record file.
The resulting sequence forms a structure *similar to* a singly linked list.
This effectively makes Hedera a blockchain.

## Rationale for blockchain and DAG data structures

![](/images/posts/hedera-blockchain-or-not-diagram-banner.jpeg)

Consider the data structures in blockchain and DAG systems
to better understand Hedera.
During the consensus process, transactions exist within the Hashgraph (a DAG).
After consensus is reached, transactions are stored in record files.
This sequence of record files produced is like a blockchain.

The most mainstream DLTs (such as Bitcoin and Ethereum)
use blockchain for consensus.
DLTs need to propagate information across the network
and achieve agreement among nodes.
This is a lengthy and tedious process.
Grouping many transactions into a block allows networks to
achieve consensus **less frequently**.
They can do so while maintaining a higher transaction throughput.
This represents a classic software engineering tradeoff:
Optimize for
[higher throughput at the cost of increased latency](https://stackoverflow.com/a/39187441/194982).

Hashgraph deals with individual transactions.
Yet it minimizes the need for extensive data propagation.
It does so by employing clever techniques
(gossip about gossip and virtual voting).
Nodes need to determine which transactions other nodes have witnessed.
These techniques enable nodes to reduce the round trip messages
needed to do so.
Thereby it achieves fair transaction ordering with a lower latency.
This is the secret sauce that distinguishes Hashgraph from standard DAGs.
Learn more about using
[**gossip about gossip**](https://docs.hedera.com/hedera/core-concepts/hashgraph-consensus-algorithms/gossip-about-gossip) and
[**virtual voting**](https://docs.hedera.com/hedera/core-concepts/hashgraph-consensus-algorithms/virtual-voting)
for fair transaction ordering [^hashgraph-transaction-events].

## When Blocks are Produced Matters

In a blockchain, network nodes collect multiple transactions
into a proposed block.
They then submit this block.
Consensus nodes validate these proposed blocks.
They then determine which one is added next; typically using
[Proof-of-Work](https://en.wikipedia.org/wiki/Proof_of_work) or
[Proof-of-Stake](https://en.wikipedia.org/wiki/Proof_of_stake).
Let us call this **pre-consensus** block production.

In contrast, as seen in Hedera,
consensus nodes collect individual transactions [^hashgraph-transaction-events].
The consensus nodes validate these transactions.
They then determine their fair order using
gossip about gossip and virtual voting.
Only then are these transactions grouped into blocks.
Let us call this **post-consensus** block production.

## Why Does This Matter?

DAG networks generally offer better throughput and lower latency
compared to blockchain-based networks.
Significantly less computational resources are required to
propose and validate blocks.
This means they also consume less energy.
Validating multiple proposed blocks necessitates
redundant validations of the same transactions.
Avoiding this further compounds the performance and energy savings.

Moreover, by avoiding pre-consensus block production,
Hashgraph avoids certain attack vectors.
Specifically, front-running and MEV attacks.
These exploit the gap between block proposals and block acceptance.
Attackers cannot gain the same financial advantage
when blocks are produced post-consensus.

Finally, the presence of blocks makes it possible to add EVM compatibility.
Hedera uses the Hyperledger Besu EVM implementation under the hood.
This makes
[Hedera Smart Contract Service](https://hedera.com/smart-contract)
(HSCS) [^hedera-hscs-block-in-rpc-and-solidity] possible.

However, DAGs are less well understood and harder to explain.
This is due to the dominance of blockchains like Bitcoin and Ethereum.

## Conclusion

The distinction between **when** blocks are produced is crucial.
A standard blockchain uses pre-consensus block production.
This article also introduces the concept of post-consensus block production.

Hedera uses Hashgraph, a DAG consensus mechanism.
It also has post-consensus block production (record files).
Thus, Hedera can be seen as **both** -
it is not a blockchain, and it is a blockchain, at the same time.

We welcome your thoughts and comments!
Drop them as replies to
[this tweet thread](#TODO_link),
or [this LinkedIn post](#TODO_link).

----

Thanks to [Richard Bair](https://twitter.com/richardbair),
[Jasper Potts](https://twitter.com/jasperpotts),
[Nana Essilfie-Conduah](https://twitter.com/nconduah),
and [Devin Saxon](https://twitter.com/dsax10)
for providing excellent feedback and suggestions for this article.

[^hashgraph-transaction-events]: In the Hashgraph DAG,
each node is actually an event.
An event groups one or more transactions for performance optimization.
Importantly, client applications propose individual transactions, not events.
Therefore **events are not blocks**.

[^hedera-hscs-block-in-rpc-and-solidity]: In HSCS,
there are JSON-RPC values for blocks.
Also, in Solidity, there is code for block-related variables.
Both of these map to record files.
This makes the relationship between blocks and record files explicit.
