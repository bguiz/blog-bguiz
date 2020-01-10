---
title: PostgreSql Many-to-Many with Non-relational SQL
date: '2017-02-26T21:20+11:00'
tags: [sql, postgres, relational]
socialImage: /images/posts/postgres-many2many-sql-non-relational.png
---

Many to many relationships are usually quite expensive in relational databases.
For example, when you do a select in a purely relational database,
you need to do *two* joins.
When reading (`select`) from a database,
joins are often the most expensive operation.
Sure the cost of these can be mitigated through various optimisations,
such as composite keys, indices on composite keys, SQL hints, et cetera;
but are these really the only way?
In a pure *relational database* system,
that might be the extent of the surface area to be explored.

However, PostgreSql supports some additional complex data types as well,
akin to those found in a *document database* system
(which overlaps with, and most times referred to as, "NoSql" database systems).
The ones that are of particular interest are `Array`, `JSONB` array, `JSONB` object, and `hstore`.
These complex data types can be utilised creatively to avoid multiple joins,
or even supplanting joins altogether.

The objective here is to explore:

* Whether each of these complex types opens up a new means of storing, retrieving, and updating.
  many-to-many relationships in a database
* Whether they can support the range of operations required.
* How performant they are in supporting each of the required operations.

## Summary of approaches

* Junction table
  * Pure relational approach, where a `subject_student` table is created to store the relationships.
  * This is the "classic" approach
* `Array`
  * [`Array` data type](https://www.postgresql.org/docs/9.6/static/arrays.html)
  * [`Array` functions](https://www.postgresql.org/docs/current/static/functions-array.html)
  * Only single-dimensional arrays are considered.
* `JSONB` object and array
  * [`JSON` and `JSONB` data type](https://www.postgresql.org/docs/9.6/static/datatype-json.html)
  * [`JSON` and `JSONB` functions](https://www.postgresql.org/docs/9.6/static/functions-json.html)
  * In PostgreSql, JSON can be represented using either `JSON` or `JSONB` types -
    we will only be considering the latter
  * JSON can represent complex nested documents, and so only a subset of its features are necessary
  * Need to consider both `JSONB` arrays, as well as `JSONB` objects (where only keys are used)
* `hstore`
  * [`hstore` data type and functions](https://www.postgresql.org/docs/9.6/static/hstore.html)
  * `hstore` is a hash map data structure of key-value pairs.
  * The consideration is that we will be using them such that only keys are used,
    in the sense that we only care whether a key has been set,
    and its value does not matter.

By reviewing the descriptions of these data types,
and the big-O notation of the algorithmic complexities of the operations
performed on each of these types,
it is possible to foresee some of the challenges.
In arrays (applying to both `Array` and `JSONB` array),
there would be an anticipated challenge in insertion and removal of
elements by value rather than by index.
In `JSONB` objects, the keys need to be strings,
therefore there could be an additional performance penalty for type conversions per operation.
As a `hstore` is a hash map,
it would appear ideal for the required operations,
based on algorithmic complexity,
however, it would have a higher constant cost overheads for memory,
and processing overheads for hash computation and collision resolution,
and thus might need to get to far larger data sets before
it is able to outperform arrays.

The above are all inferences, of course,
and there are many more that we could possibly make.
Thus there is a need for some some sample implementations
to validate/ invalidate them.

## Implementation

### Entities and Relations

For the purpose of this example, we shall model the following two entities:

* Subject
* Student

Their relationship has many-to-many cardinality:

* each student may study `0..*` subjects, and
* each subject has `0..*` students enrolled in it.

We shall design these entities as generic as possible -
the minimum viable entity in order to demonstrate
many-to-many relationship operations.
Thus each will only have an integer `id` primary key column,
and a string `name` column.
Apart from this each entity may have an additional column
for storing its relationship to the other entity.

### Database initialisation

The following assumes a PostgreSql `v9.6` installation.

First create the database and a role to access it with.
Substitute the names of each to your preference.

```bash
psql
```

```sql
drop database if exists scratch;
drop role if exists scratch;
create role scratch login encrypted password 'scratch' valid until 'infinity';
create database scratch with encoding 'UTF-8' owner='scratch' connection limit=1;

-- list roles
select * from pg_catalog.pg_shadow;

-- list databases
\list

\q
```

Next, enable the `hstore` extension,
which comes bundled in most PostgreSql distributions,
by default.

```bash
sudo su ${USER} -c \n
  "psql -d scratch -c 'create extension if not exists hstore;'"
psql -d scratch -U scratch -W
```

### Junction table approach

Set up junction tables

```sql
-- remove any existing tables
drop table if exists junction_student_subject;
drop table if exists junction_student;
drop table if exists junction_subject;

-- create tables
create table junction_student (
	id serial PRIMARY KEY,
	name text NOT NULL
	);
create table junction_subject (
	id serial PRIMARY KEY,
	name text NOT NULL
	);
create table junction_student_subject (
	student_id int references junction_student(id),
	subject_id int references junction_subject(id),
	constraint id PRIMARY KEY (student_id, subject_id)
	);

-- insert a student and a subject
insert into junction_student (name)
	values ('student');
insert into junction_subject (name)
	values ('subject');
```

Read related entity via junction table

```sql
-- given a student $1, get enrolled subjects
select sub.id as sub_id, sub.name as sub_name
	from junction_student_subject stu_sub
	join junction_subject sub on (stu_sub.subject_id = sub.id)
	where stu_sub.student_id = $1;
```

Create a new many-to-many relationship using junction table

```sql
-- given a student $1 and a subject $2, enrol student in the subject
insert into junction_student_subject (student_id, subject_id)
	values ($1, $2);
```

Delete related entity via function table

```sql
-- given a student $1 and a subject $2, unenrol student in the subject
delete from junction_student_subject
	where student_id = $1 and subject_id = $2;
```

### `JSONB` array approach

Set up `JSONB` array tables

```sql
-- remove any existing tables
drop table if exists jsonbarr_subject;
drop table if exists jsonbarr_student;

-- create tables
create table jsonbarr_student (
	id serial PRIMARY KEY,
	name text NOT NULL,
	subject_ids jsonb DEFAULT '[]'
	);
create table jsonbarr_subject (
	id serial PRIMARY KEY,
	name text NOT NULL,
	student_ids jsonb DEFAULT '[]'
	);

-- insert a student and a subject
insert into jsonbarr_student (name)
	values ('student');
insert into jsonbarr_subject (name)
	values ('subject');
```

Read related entity via `JSONB` array

```sql
-- given a student $1, get enrolled subjects
select sub.id as sub_id, sub.name as sub_name
	from jsonbarr_subject sub
	where sub.student_ids ? '$1';

-- Note that the contains (`?`) operator does not appear to work.
```

Create a new many-to-many relationship using a `JSONB` array

```sql
-- given a student $1 and a subject $2, enrol student in the subject
begin transaction;

update jsonbarr_subject as sub
set student_ids = jsonb_insert(student_ids, '{0}', '$1')
where id = $2;

update jsonbarr_student as stu
set subject_ids = jsonb_insert(subject_ids, '{0}', '$2')
where id =  $1;

end transaction;
```

Delete related entity via `JSONB` array

```sql
-- given a student $1 and a subject $2, unenrol student in the subject
begin transaction;

update jsonbarr_subject as sub
--- set student_ids = ???
where sub.id = $2;

update jsonbarr_student as stu
--- set subject_ids = ???
where stu.id = $1;

end transaction;

-- Note that we did not find a way to delete elements by value from a JSONB array
```

### `JSONB` object approach

Set up `JSONB` object tables

```sql
-- remove any existing tables
drop table if exists jsonbobj_subject;
drop table if exists jsonbobj_student;

-- create tables
create table jsonbobj_student (
	id serial PRIMARY KEY,
	name text NOT NULL,
	subject_ids jsonb DEFAULT '{}'
	);
create table jsonbobj_subject (
	id serial PRIMARY KEY,
	name text NOT NULL,
	student_ids jsonb DEFAULT '{}'
	);

-- insert a student and a subject
insert into jsonbobj_student (name)
values ('student');
insert into jsonbobj_subject (name)
values ('subject');
```

Read related entity via `JSONB` object

```sql
-- given a student $1, get enrolled subjects
select sub.id as sub_id, sub.name as sub_name
from jsonbobj_subject sub
where sub.student_ids ? '$1';
```

Create a new many-to-many relationship using a JSONB object

```sql
-- given a student $1 and a subject $2, enrol student in the subject
begin transaction;

update jsonbobj_subject as sub
set student_ids = jsonb_set(student_ids, '{$1}', 'true')
where id = $2;

update jsonbobj_student as sub
set subject_ids = jsonb_set(subject_ids, '{$2}', 'true')
where id = $1;

end transaction;
```

Delete related entity via `JSONB` object

```sql
-- given a student $1 and a subject $2, unenrol student in the subject
begin transaction;

update jsonbobj_subject as sub
set student_ids = student_ids - '$1'
where id = $2;

update jsonbobj_student as stu
set subject_ids = subject_ids - '$2'
where id = $1;

end transaction;
```

### `Array` approach

Set up `Array` tables

```sql
-- remove existing tables
drop table if exists array_subject;
drop table if exists array_student;

-- create tables
create table array_student (
	id serial PRIMARY KEY,
	name text NOT NULL,
	subject_ids integer[]
	);
create table array_subject (
	id serial PRIMARY KEY,
	name text NOT NULL,
	student_ids integer[]
	);

-- insert a student and a subject
insert into array_student (name)
values ('student');
insert into array_subject (name)
values ('subject');

select * from array_student;
select * from array_subject;
```

Read related entity via `Array`

```sql
-- given a student $1, get enrolled subjects
select sub.id as sub_id, sub.name as sub_name
from array_subject sub
where array_position(sub.student_ids, $1) >= 0;

-- Note that the contains operator `@>` does not appear to work here
-- hence we're testing for existence using `array_position` instead
```

Create a new many-to-many relationship using an `Array`

```sql
-- given a student $1 and a subject $2, enrol student in the subject
begin transaction;

update array_subject as sub
set student_ids = array_append(student_ids, $1)
where id = $2;

update array_student as stu
set subject_ids = array_append(subject_ids, $2)
where id=  $1;

end transaction;
```

Delete related entity via `Array`

```sql
-- given a student $1 and a subject $2, unenrol student in the subject
begin transaction;

update array_subject as sub
set student_ids = array_remove(student_ids, $1)
where id = $2;

update array_student as stu
set subject_ids = array_remove(subject_ids, $2)
where id=  $1;

end transaction;
```

### `hstore` approach

Set up `hstore` tables

```bash
sudo su ${USER} -c "psql -d scratch -c 'create extension if not exists hstore;'"
```

```sql
-- remove existing tables
drop table if exists hstore_student;
drop table if exists hstore_subject;

-- create tables
create table hstore_student (
	id serial PRIMARY KEY,
	name text NOT NULL,
	subject_ids hstore DEFAULT ''
	);
create table hstore_subject (
	id serial PRIMARY KEY,
	name text NOT NULL,
	student_ids hstore DEFAULT ''
	);

-- insert a student and a subject
insert into hstore_student (name)
values ('student');
insert into hstore_subject (name)
values ('subject');

select * from hstore_student;
select * from hstore_subject;
```

Read related entity via `hstore`

```sql
-- given a student $1, get enrolled subjects
select sub.id as sub_id, sub.name as sub_name
from hstore_subject sub
where exist(sub.student_ids, '$1');
```

Create a new many-to-many relationship using an `hstore`

```sql
-- given a student $1 and a subject $2, enrol student in the subject
begin transaction;

update hstore_subject as sub
set student_ids = student_ids || hstore('$1', 't')
where id = $2;

update hstore_student as stu
set subject_ids = subject_ids || hstore('$2', 't')
where id=  $1;

end transaction;
```

Delete related entity via `hstore`

```sql
-- given a student $1 and a subject $2, unenrol student in the subject
begin transaction;

update hstore_subject as sub
set student_ids = delete(student_ids, '$1')
where id = '$2';

update hstore_student as stu
set subject_ids = delete(subject_ids, '$2')
where id = '$1';

end transaction;
```

## Next steps

Expressing and manipulating many-to-many relationships in relational database systems
has always been an *implementation pain point*,
as well as a *performance bottleneck*.
This has been an interesting exercise in exploring
the different ways in which one can apply complex data types
to this problem.
Of the five different approaches considered -
one "classic" junction table approach,
plus four approaches using complex data types -
four of them appear to be feasible.
Only the `JSONB` arrays approach,
which seemed plausible initially,
does not appear to be implementable.
This is a great testament to the power of PostgreSql,
and its ability to span and leverage *both* relational
and non-relational approaches in database management.

We are not done just yet!

Thus far we have merely defined the schema and queries
for specifying many-to-many relationships using various approaches.
The natural next step would be to explore them in more detail.
This includes procedurally generating data sets of different sizes for each of the entities,
including defining relationships linking the different entities together
with various proportions of balanced and imbalanced cardinality.
After that is done, we should consider performance aspects of the various approaches too.
We should explore the performance optimisations
which are feasible and appropriate for each approach;
and also explore how adding referential integrity constraints impact performance.
Performance needs to be measured, of course,
which involves designing and running a benchmark.

Watch this space!
