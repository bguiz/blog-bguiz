---
title: 'Hedera: Blockchain or Not?'
date: '2024-06-06T14:14:00+08:00'
tags: [web3, blockchain, dag, dlt]
socialImage: /images/posts/blockchain-dag-banner.jpeg
metaDesc: >
  Understanding Hedera’s Unique Consensus Mechanism.
---

In the ever-evolving landscape of distributed ledger technology (DLT), the classification of networks like Hedera often sparks debate. The consensus mechanism is a core feature, and underpins a DLT’s decentralisation and immutability properties, which are core features in web3 philosophy. The choice of data structures and algorithms used for consensus profoundly impacts the network's traits. Thus it is essential to understand where Hedera fits, and what impact this has on the network.

ℹ️ If you are already familiar with the implementation of various DLTs types, feel free to jump ahead to the section on **When Blocks are Produced Matters**.

## Key Terms

To navigate this discussion on Hedera and blockchain vs. DAG, it is  crucial to define a few key terms.

Distributed ledger technology (DLT) refers to systems where transactions are immutable, meaning they cannot be deleted or modified. These transactions are append-only, modifying the network state **solely** through the addition of new transactions that have been verified using cryptographic signatures. Importantly, consensus among network participants is required before transactions are accepted and added to the ledger.

In a blockchain consensus model, transactions are bundled into **proposed** blocks, which then **compete** to be the next block added to the network. The consensus mechanism ensures all its transactions are valid, and determines which block gets added **atomically**. This process results in a data structure resembling a [singly linked list](https://en.wikipedia.org/wiki/Linked_list#Singly_linked_list) of blocks, with transactions often organised in [Merkle trees](https://en.wikipedia.org/wiki/Merkle_tree) within blocks.

Conversely, in a directed acyclic graph (DAG) consensus model, transactions are submitted individually rather than grouped into blocks. The consensus mechanism primarily focuses on fair transaction ordering, adding each transaction to the network independently. Here, the data structure is a [directed acyclic graph](https://en.wikipedia.org/wiki/Directed_acyclic_graph) where each node represents a transaction.

## Hedera’s Distinct Consensus Approach

Hedera distinguishes itself by using a DAG-based consensus mechanism instead of a traditional blockchain technology approach. This means client applications do not propose and send blocks of transactions to the network. Instead, they propose and send individual transactions [^hashgraph-transaction-events]. Hedera’s consensus mechanism, known as Hashgraph, forms a DAG.

After achieving consensus, however, this changes radically. At this point, transactions have already been ordered by consensus timestamp, which is based on claimed submission timestamp and the order witnessed by consensus nodes. These transactions are then grouped approximately every two seconds into **record files**. The record files are serialised sequentially, based on the consensus timestamps of their transactions. They are equivalent to blocks in a traditional blockchain. As each record file follows exactly one previous record file, and these record files are collections of transactions, the resulting series forms a structure *similar to* a singly linked list, effectively making Hedera a blockchain.

## Rationale for blockchain and DAG data structures

To better understand Hedera, consider the data structures involved in blockchain vs. DAG systems. During the consensus process, transactions exist within the Hashgraph (a DAG). After consensus is reached, transactions are stored in a blockchain-like sequence of record files.

The most mainstream DLTs (such as Bitcoin and Ethereum) traditionally use blockchain technology for consensus due to the lengthy process of propagating information across the network and achieving agreement among nodes. By grouping many transactions into a block, networks need to achieve consensus **less frequently** while maintaining a higher transaction throughput. This represents a classic software engineering tradeoff: Optimise for [higher throughput at the cost of increased latency](https://stackoverflow.com/a/39187441/194982).

Hashgraph minimises the need for extensive data propagation even when dealing with individual transactions. It does so by utilising clever rules about which transactions each consensus node has witnessed and employing techniques akin to how rumours spread in a group. Learn more about how [**gossip about gossip**](https://docs.hedera.com/hedera/core-concepts/hashgraph-consensus-algorithms/gossip-about-gossip) and [**virtual voting**](https://docs.hedera.com/hedera/core-concepts/hashgraph-consensus-algorithms/virtual-voting) are used to achieve fair transaction ordering.

## When Blocks are Produced Matters

In a blockchain, consensus nodes collect multiple transactions into a proposed block, then submit it to the network. Network nodes validate these proposed blocks and determine which one is added next, typically through mechanisms like [Proof-of-Work](https://en.wikipedia.org/wiki/Proof_of_work) or [Proof-of-Stake](https://en.wikipedia.org/wiki/Proof_of_stake). Let us call this **pre-consensus** block production.

In contrast, as seen in Hedera, consensus nodes collect individual transactions. The network validates these transactions and determines their order using gossip about gossip and virtual voting. These transactions are subsequently grouped into blocks. Let us call this **post-consensus** block production.

## Why Does This Matter?

DAG-based networks generally offer better throughput and lower latency compared to blockchain-based networks. They also consume less energy, as the computational resources required to propose and validate blocks are significantly reduced. Especially when you consider that validating multiple proposed blocks necessitates redundant/ repeat validations of the same transactions.

Moreover, DAGs mitigate issues like front-running and MEV attacks, whose fundamental vector is exploiting the duration between block proposals and block acceptance to gain financial advantage.

However, DAGs are less well understood and harder to explain, given the dominance of blockchain-based networks like Bitcoin and Ethereum.

Additionally, the presence of blocks makes it possible to add EVM compatibility [^hedera-hscs-block-in-rpc-and-solidity]. However this simultaneously complicates the path to EVM equivalence. This has been experienced by Hedera, which uses the Hyperledger Besu EVM implementation in [Hedera Smart Contract Service](https://hedera.com/smart-contract) (HSCS).

## Conclusion

The distinction between **when** blocks are produced is crucial: A standard blockchain uses pre-consensus block production. This article also introduces the concept of post-consensus block production.

Hedera uses a DAG based consensus mechanism (the Hashgraph), and also has post-consensus block production (record files). Thus, Hedera can be seen as **both** - it is not a blockchain and is a blockchain simultaneously.

We welcome your thoughts and comments! Drop them as replies to [this tweet thread](#TODO_link), or [this LinkedIn post](#TODO_link)

----

[^hashgraph-transaction-events]: In the Hashgraph DAG, each node is an event, grouping one or more transactions for performance optimization. Importantly, these **events are not blocks** because client applications propose individual transactions, not events - their grouping is done for performance optimisation reasons.

[^hedera-hscs-block-in-rpc-and-solidity]: In HSCS, the JSON-RPC values for blocks, and the Solidity code referencing `block` related variables, map to record files, making the relationship between blocks and record files explicit.
