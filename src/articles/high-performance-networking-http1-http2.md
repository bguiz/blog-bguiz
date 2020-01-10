---
title: High Performance Networking HTTP1 HTTP2
date: '2014-08-08T20:47+11:00'
comments: true
tags: [git, github, commandline]
---

## [Chapter 11: HTTP/1](http://chimera.labs.oreilly.com/books/1230000000545/ch11.html)

All HTTP 1.0 should be upgraded to HTTP 1.1

Summary of recommendations made in another book by Steve Souders:

- Reduce DNS lookups
- Make fewer HTTP requests
- Use a Content Delivery Network
- Add an Expires header and configure ETags
- Gzip assets
- Avoid HTTP redirects

More concisely: "eliminate and reduce unnecessary network latency, and minimize the amount of transferred bytes."

More things:

- Add support for `keepalive`, and reduce the number of required HTTP handshakes
  between server and a single client
- Add support for HTTP pipelining so that requests are dispatched ASAP,
  and queueing happens on server instead
- Browser to use multiple TCP connections with the same server
- SHard resources across multiple hosts (or subdomains) for further increase parallelism
- Measure, and minimise size of HTTP headers
- Concatenation and spriting
- Resource inlining

## [Chapter 12: HTTP/2](http://chimera.labs.oreilly.com/books/1230000000545/ch12.html)

HTTP/1 does **not** modify the core semantics of HTTP/1 in any way:

- still have the same verbs (`GET`, `POST`, etc.)
- still have headers

Aims to increase speed, and reduce latency, compared to HTTP/1:

- Compress headers automatically
- New flow control, error handling, and upgrade mechanisms
- Allows multiple concurrent connections between the same client and server
- Able to specify request priorities at the protocol level
  - Take for example, gmail, which had to write this logic in client-side Javascript
- Binary message framing
- Longer lived connections, allowing better use of network capacity

### Binary framing

![Binary framing](http://orm-chimera-prod.s3.amazonaws.com/1230000000545/images/hpbn_1201.png)

Wrap HTTP/1 text value in a binary frame,
and standardise format for all variables
such as white spaces and termination sequences
When the binary frame is unwrapped,
it may be treated identically to a HTTP/1 text value.

### Streams, Messages, and Frames

![](http://orm-chimera-prod.s3.amazonaws.com/1230000000545/images/hpbn_1202.png)

Each connection consists of multiple streams;
each stream consists of multiple frames;
multiple frames make up a single request-response pair.

?? Does each frame contain an additional HTTP/2 level header to identify
which stream it belong to, and its sequence number?

### Request and Response Multiplexing

![](http://orm-chimera-prod.s3.amazonaws.com/1230000000545/images/hpbn_1203.png)

In summary: Many different streams, messages, and frames all share the same
TCP connection, and can be sent in any order;
with the recipient inspecting them to reassemble them correctly.

### Stream prioritisation

![](http://orm-chimera-prod.s3.amazonaws.com/1230000000545/images/hpbn_1210.png)

Streams may assign both weights and dependencies on other streams.
The sender and the receiver use these to build a prioritisation tree,
and use  this to determine and optimised
order and bandwidth allocation in transmitting each of the streams.

### One Connection per Origin

Self-explanatory: Since there is no need to make multiple connections
to a single server any more,
multiple connections are explicitly disallowed.

This optimises for numerous "bursty" connections,
instead of small numbers of large "bulky" connections.
This is important to remember,
because it means that many of the HTTP/1 optimisation techniques such as spriting
or concatenation may no longer result in performance gains.

### Flow control

Great, protocol-level way of fending of DoS'es!
But not so much DDoS'es.
Maybe.

### Server Push

Reduces the need to use long polling where it was necessary in HTTP/1;
and also reduces the need for more simple use cases of websockets

