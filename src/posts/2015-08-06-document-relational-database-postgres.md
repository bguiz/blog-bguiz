---
title: PostgreSql now both a relational and document database
date: '2015-08-06T19:56+11:00'
comments: true
tags: [database, postgres, document, relational]
---

Postgres 9.3 added support for new data types, JSON and JSONB; the latter of which is very similar to BSON used in MongoDb.

However, I was very disappointed because while it was possible to Create/Read/Update/Delete entire JSON objects, it was not possible to Create/Update/Delete individual keys within the JSON object - it was all or nothing, which I was not too happy about; even pestering PostgreSql's developers intermittently about.
[Many](http://stackoverflow.com/a/31845491/194982)
[others](http://stackoverflow.com/a/31845496/194982)
wanted to be able to do this as well.

![postgres mailing list on JSONB create/update/delete](https://pbs.twimg.com/media/CLr6ov4UAAAB2fx.png:large)

The half-baked solution at the time
was to use HSTORE instead of JSON/ JSONB,
HSTORE was essentially a hashmap, which,
unlike JSON, only supported a single level of hierarchy,
so using it was rather limiting.

Postgres 9.4 didn't make any progress on this, but it looks like Postgres 9.5,
still in alpha, has added
[support for per-key Create/Update/Delete operations](https://wiki.postgresql.org/wiki/What%27s_new_in_PostgreSQL_9.5#JSONB-modifying_operators_and_functions).

The implications of this are **profound**,
as I believe that this makes PostgreSql the first database to properly support
both **relational** (table based) and **document** database paradigms.

Ever needed to do a *join* on two documents in MongoDb?
You probably had to work around this by doing the join logic client side,
and send more than one database query.
Ever needed to store *unstructured data* in MySql?
You probably had to use a text field or a blob,
and write custom scripts to serialise/deserialise.

Well, soon we should be
[able to do both at the same time](https://www.youtube.com/watch?v=OawrlVoQqSs)
easily!

