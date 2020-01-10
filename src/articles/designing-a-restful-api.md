---
title: Designing a RESTful API
date: '2014-12-14T09:25+11:00'
comments: true
tags: [REST, API, HTTP]
---

## Anatomy of a HTTP request

- HTTP verb
- URL (domain name and path)
- Query parameters (optional)
- Headers (optional)
- Body (optional)

## Resources

ReST stands for *Representational State Transfer*.
While the *R* does not stand for *Resource*, I wish it did,
because designing a good RESTful API is much easier when
when you think about organising around resources first and foremost.

The idea of organising around resources is to identify the objects
which you wish to communicate about between the client and server.
CHances are, you have already though about this at some level
either on your back end server code,
or your front end client code.
You may have defined classes that represent certain objects,
and defined database schemas that represent those same objects.
If you have, you have already modelled your resources.

Once you have identified what your resources are,
you can give each one of them a *base URL*
within your API.
For example, if you have a `Customer` resource,
the `base URL` for it could be `/api/v1/customers`.
An `Address` resource might have a *base URL* of `/api/v1/addresses`.

Once you have your *base URL*,
the next step is to create an *instance URL* for each resource.

- `/api/v1/customers` - refers to all customers
- `/api/v1/customers/:id` - refers to a single customer
  whose ID matches the number at the end of the URL


## Add HTTP verbs

So far, we have identified what resources we have,
and what the *base URL* and *instance URL* for each one should be.

The next key part of RESTful API design is the actions.
This is where HTTP verbs come into the mix.

Typically, the actions that one wishes to perform of any resource falls into
one of four operations:

- *Create* - create a new instance of a resource
- *Read* - access one or more existing instances of a resource
- *Update* - modify an existing instance of a resource
- *Delete* - destroy an existing instance of a resource

A non RESTful way of designing an API could be to
simply append the name of the operation to the *instance URL*.
For example, to delete a `Customer` with an ID of `123`,
the URL could be:

`/api/v1/customers/1/delete` (wrong)

Instead, make use of HTTP verbs in order to do so.
This [list of commonly used HTTP verbs](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods)
is a handy resource.

In the context of RESTful API design, however,
what we are most concerned about is how they map to the four types of operations
which we wish to perform on resources.

- *Create* - `POST` or `PUT`
- *Read* - `GET`
- *Update* - `PATCH` or `PUT`
- *Delete* - `DELETE`

### Delete

Coming back to the example above,
to delete a `Customer` with an ID of `123`,
the HTTP request could be:

`DELETE /api/v1/customers/123` (correct)

instead of using `GET`, the default HTTP verb, with the name of the action in the URL:

`GET /api/v1/customers/1/delete` (wrong)

### Read

The read operation is just as simple as the delete operation:

`GET /api/v1/customers/123`

With read operations, however, it is common place to want to read not just one
instance of a resource in one request, but rather multiple ones.
For this, we issue a `GET` request on the *base URL* instead of the *instance URL*.

`GET /api/v1/customers`

This should receive a response with all of the customers.
If, for example, this is excessive,
as is likely to be the case in a real world application,
simply use query parameters to filter the request.

`GET /api/v1/customers?page=0&perPage=30`

The example above might be what you issue to obtain a list of customers
to display in a paginate form.

### Create

Create and update are slightly more complex than read and delete,
because they each involve two HTTP verbs,
which are used in two different types of situations
when creating or updating resources.

Create operations could use either `POST` or `PUT` HTTP verbs.

When you create a new object in the front end,
you will quite often know all the attributes from the user input.
All, that is, except for the ID of that object.
Since an ID is a key that should be unique among all instances of a particular resource,
the correct place to determine an ID for any resource would be in the database layer,
as it has the facilities to do so,
because it maintains an index of the IDs (or primary keys) of all instances of a resource.

Thus in order to create a new customer, the HTTP request might be

```
POST /api/v1/customers

{
    "name": "Brendan",
    "points": 100
}
```

Let's say, however, that your front end is somehow already privy to the ID
for a resource that is about to be created,
perhaps from a previous request.
In this case, a `PUT` would be appropriate:

```
PUT /api/v1/customers/123

{
    "name": "Brendan",
    "points": 100
}
```

In the default case, however, `POST` is preferred.

### Update

Similar to create, update operations also make use of two different HTTP verbs -
`PATCH` and `PUT`

When the front end wishes to update a resource,
it should already have a copy of that resource,
and thus will know its ID.
However, when updating, it can choose to either:

- update just a select number of properties of that resource, or
- update the entire resource, overwriting the existing copy

To update only select properties, use `PATCH`:

```
PATCH /api/v1/customers/123

{
    "points": -10
}
```

To overwrite all properties, use `PUT`:

```
PUT /api/v1/customers/123

{
    "name": "bguiz",
    "points": 90
}
```

### Recap

- *Create* - `POST` or `PUT`
    - When you wish to create the object,
      but wish to allow the server to decide its ID (primary key), use `POST`
    - When you know the entire object already, including its ID, use `PUT`
- *Read* - `GET`
    - When accessing multiple resources at once, use the *base URL*
      instead of the *instance URL*
    - Use query parameters to restrict or filter multiple resources if necessary
- *Update* - `PATCH` or `PUT`
    - When you wish to submit just the parts of the resource that have changed,
      use `PATCH`
    - When you wish to resubmit the entire resource,
      and have the existing one overwritten, use `PUT`
- *Delete* - `DELETE`

## HATEOAS

What a wonderful acronym, eh?
It stands for *Hypertext as the Engine of Application State*.
It means that each request to a resource,
should provide links to other related resources.
In theory, a front end application should be able to navigate
through all other related resources after being pointed at the first one.

The problem with this,
and with other aspects of RESTful APIs for that matter,
is that there is no standard specifying exactly how this should be done.
In fact, there are many who will have different opinions on which HTTP
verbs are appropriate to use when.

This brings us to the next thing: Standardisation

## Standardisation

One of the main problems with designing a RESTful API,
is that everyone has their own interpretation,
and execution of it.

This is partly due to the inherent complexities,
and often real world application trade off that need to be made,
which have optimisation and speed face off against sticking to the specification.

However, it is *mostly* due to the fact that there is no specification to begin with.
All we really have is an
[academic paper by Roy Fielding](http://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm)
who coined the term, *Representational State Transfer*.
While this laid excellent ground work on a conceptual basis,
it left too much room for interpretation in technical implementation.

![JSON API logo](http://jsonapi.org/images/jsonapi@0.7x.png)

[JSON API](http://jsonapi.org/)
is one of the many different standards that have built upon RESTful API design.
It builds upon two things: Using JSON as the serialization format,
and using a RESTful API.

In doing so, I believe that it has also done a great job of codifying RESTful APIs.
In addition, it also
[includes a solution for side-loading](http://jsonapi.org/format/#document-structure-compound-documents "Compound Documents"),
rather than in line embedding, of related data as part of its specification.
This is a particularly useful feature that is not part of standard RESTful APIs,
but very useful to have in practice.

Thus, if you are designing a RESTful API,
I would strongly recommend starting with JSON API.
