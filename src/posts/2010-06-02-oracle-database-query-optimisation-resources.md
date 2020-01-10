---
comments: true
title: Oracle database query optimisation resources
date: '2010-06-02T03:12+11:00'
originalUrl: http://brendangraetz.wordpress.com/2010/06/02/oracle-database-query-optimisation-resources/
permalink: /2010/06/02/oracle-database-query-optimisation-resources/
tags: [algorithm, database, optimisation, oracle, sql]
---

<p>Here are the resources I find most useful for Oracle SQL query optimisartion, ordered from basic to advanced.</p>
<p>Guide to understanding the <a href="http://www.akadia.com/services/ora_interpreting_explain_plan.html">basics of indexing and the various merges</a> in line with their effects on execution plans</p>
<p>How-to manual from Oracle themselves on <a href="http://download.oracle.com/docs/cd/B10500_01/server.920/a96533/autotrac.htm">how to use autotrace in SQLPlus</a></p>
<p>The most complete reference on <a href="http://psoug.org/reference/hints.html">Oracle hints</a> I&#8217;ve come across</p>
<p>A collection of specific, and advanced, <a href="http://www.orafaq.com/tuningguide/">query tuning techniques</a></p>
<p>Also, here is the 1979 seminal paper from P. Selinger of IBM, which forms the roots of access plan optimisation in most current day databases; and addresses the basic concepts that need to be taken into account when optimising queries.<br />
<a href="http://doi.acm.org/10.1145/582095.582099﻿">Access path selection in a relational database management system</a></p>
<hr />
<b>EDIT</b></p>
<p>This one here does not have anything to do directly with query optimisation, but I found that attempting to optimise queries without first understanding the algorithms behind them is a fool&#8217;s errand. So here is a great post on <a href="http://www.necessaryandsufficient.net/2010/02/join-algorithms-illustrated/">the basic algorithms behind nested loop join, merge join and hash join</a> (code in C#).</p>
