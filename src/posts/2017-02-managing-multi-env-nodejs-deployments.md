---
title: Managing NodeJs Deployments in Multiple Environments
date: '2017-01-29T12:48+11:00'
tags: [nodejs, devops, config]
socialImage: /images/posts/erun.png
---

After managing an extremely large scale NodeJs deployment last year.
I learnt a great deal about production deployments with a focus on scalability.
The retrospective summary of these learning points are in a presentation given last year:
[Top 7 Things Learnt Deploying NodeJs Servers at Scale](http://blog.bguiz.com/presentations/nodejs-servers-at-scale/).

Production deployments are about a whole lot more than *scalability* though,
and we'll examine another aspect of them here:
Managing multiple deployment environments.

## What are deployment environments anyway?

To get to a *production deployment*,
you will need intermediate deployments,
and to get to those *intermediate deployments*,
you will need a *local deployment*.

Deployment environments are different computers where
a project can run.
Facilitating that, however, is *tricky business*!

### Local deployment environment

A local deployment is the one that a developer runs on their own computer,
while writing code, debugging it, et cetera.
A project would normally only need *one* of these.

Some typical names: `localhost`, `127007`.

### Intermediate deployment environments

Intermediate deployments are those that are not customer facing,
but are also not running on any developer's machines.
Usually these are run on CI/ CD servers (or provisioned by them).
A project would normally have *several* of these.

Some typical names: `dev`, `staging`, `pentest`, `loadtest`.

### Production deployment environment

A production deployment is one that is customer facing,
so an actual customer of your business is going to hit this service,
meaning that any downtime could mean that your business loses money.
Therefore the acceptable downtime is zero -
or, *practically*, as close to zero as you can possibly manage.
A project would normally have *one* of these.

Some typical names: `live`, `production`.

### `NODE_ENV`

The categorisation above *does not* imply
the value of the `NODE_ENV` environment variable.
Though the similar name might make it seem so,
they are indeed *different concepts*.
The value of `NODE_ENV` determines the optimisation level under which
the `node` binary executes the code.
Additionally, many NodeJs libraries also do their own optimisations
based on the value of `NODE_ENV`.

Here are example profiles of an `express` server running
without `production`, then with `production`:

![Flame graph of express with NODE_ENV set to anything else, and production](https://dt-cdn.net/wp-content/uploads/2015/07/localhost_3000_burst1_html-600x288.png)

Read the full article for a more in-depth explanation:
[The drastic effects of omitting NODE_ENV in your Express.js applications](https://www.dynatrace.com/blog/the-drastic-effects-of-omitting-node_env-in-your-express-js-applications/).

Therefore in the example above, we would want to have the
`live` deployment run with `NODE_ENV=production` (no surprises here).
Also, we might want the `pentest` and `loadtest` deployments
run with `NODE_ENV=production` as well,
because we want those performance optimisations in place,
even though they fall into the category of intermediate deployments.
Thus, we quickly see the value of keeping
the concepts of what *production* means separate:
When thinking about our deployment environments,
versus when thinking about what the value of `NODE_ENV` should be.

## Task runner

When you have a NodeJs project,
more often than not, you will have several tasks that you do often enough,
and the standard practice for these is to standardise them -
especially important in a collaborative development scenarios
such as open source, and in-house development teams.

`npm`, the de facto package manager for NodeJs projects,
provides a handy way to do this via `npm run someTask`,
where `someTask` is specified within `package.json`,
in the `scripts` section.

This is quite handy for simple tasks -
where there are no environment variables involved,
and where the task is always the same no matter which deployment it is being run on.
However, when a project approaches a certain level of complexity,
some of its tasks will need to vary based on the deployment environment,
and they will need to make use of environment variables.
This is where `cross-env` and `better-npm-run` come in.
They are NodeJs libraries that are designed to augment `npm run`
allowing you to overcome those two initial hurdles.

## Additional hurdles

As a project becomes even more complex,
you might encounter some extra hurdles
related to deployment in different environments.

### Variable substitution

* You might need to substitute the value of an environment variable into another one
* You might need to substitute the value of an environment variable into the command

### Different configuration files

* You might need to load different sets of configuration files based on the deployment environment

### Different tasks

* You might need to run a completely different command for a particular task based on the environment
  * For example `localhost` might need to run a server via `nodemon`, whereas the other environments might need to run the server via `node` directly

### Sub-environments

* You might need to define environments hierarchically rather than as a flat list
* You might have ad-hoc environments that are spun up, created dynamically by CI/ CD

## Introducing `erun`

The name is a contraction of *environment runner*.

`erun` is an implementation that implements all of the
requirements listed above -
and was created to scratch the proverbial itch,
after running into all of these scenarios.

Head over to the [erun project page](https://github.com/bguiz/erun)
to check out sample usage.
