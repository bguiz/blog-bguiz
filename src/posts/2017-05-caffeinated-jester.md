---
title: The Caffeinated Jester
date: '2017-05-04T22:47+11:00'
tags: [javascript, jest, test, mock]
socialImage: /images/posts/caffeinated-jester.jpeg
---

## The Caffeinated Jester

Having previously tested a NodeJs API server using `mocha` + `chai` + `sinon`,
I have migrated a very large numbers of tests over to Jest recently.
There were several hard-won lessons along the way,
which requires one to change the way one approaches writing tests,
and even thinking about tests.

Jest is the new kid on the block,
with other Javascript test frameworks being around for much longer.
The value proposition of Jest is very strong though,
and it is worth considering.
This post will highlight several contrasting concepts learnt as part of this process.

It is worth noting that Jest, presently,
is predominantly used to test in-browser Javascript,
in particular web applications written using ReactJs -
as both Jest and ReactJs are developed by the same company.
While it is engineered to work very well when testing ReactJs,
it is worth noting that it is, in its own right,
a very versatile framework.
This post explores this "general" use case for Jest,
in the context where a NodeJs API server is the test target.

### Library vs framework

Jest is not a testing library, but a framework.
It is an all in one.
Let's compare "test stacks":

My previous stack:

- Test Runner: [`mocha`](https://github.com/mochajs/mocha)
- Assertions: [`chai`](https://github.com/chaijs/chai)
- Mocks: [`sinon`](https://github.com/sinonjs/sinon)
- Time: [`lolex`](https://github.com/sinonjs/lolex) (via sinon)

My new testing stack:

- Test Runner: [`jest`](https://github.com/facebook/jest)
- Assertions: [`jest`](https://github.com/facebook/jest)
- Mocks: [`jest`](https://github.com/facebook/jest)
- Time: [`jest`](https://github.com/facebook/jest)

Jest wears many hats at the same time.

### Asynchronous tests

What does `done()` do?

In `jasmine`, unlike in mocha, `done()` only signifies that a test is done.
In `mocha`, if the first argument is defined, the test fails, e.g. `done(err)`.
Jest uses `jasmine` as the test runner under the hood by default, the test will pass.
Solution: Split `done(err)` into an `expect(...)` followed by `done()`.

Jest also allows you to write tests as `async` functions,
however `async` functions can only `await` on `Promise`s.
My code base makes use of error-first callbacks as its primary asynchronous Javascript mechanism,
so I have not explored this much;
but worth pointing out for those of you who are writing tests for `Promise`s.

### Mocks

In `mocha` and `jasmine`, it is common to use `sinon` for spies, stubs, and mocks.
For best results in Jest, use the built in `jest.fn()` and `jest.fn().mockImplementation()`.
This is actually a boon for
[mocking objects with chained APIs](http://blog.bguiz.com/2017/mocking-chained-apis-jest),
which I have written about previously.

### Time

In `mocha` & `jasmine`, it is common to use `lolex` (via `sinon`) to fake timers.
In Jest, this doesn't play well. Use a combination of `mockdate` (for `Date`),
and Jest's built in `jest.runTimersToTime(ms);` (for `setTimeout` and pals)
`jest.runAllTicks();` (for `Promise`s, as well as `nextTick` and pals).

This might seem like a lot of redundant code for time related events,
at least compared to the `clock.tick(ms)` syntax common in `sinon`.
Most of the time it is.
However, in some cases you can actually split them up,
and do assertions in between.
Don't expect to do this very often though -
I have thus far only needed to do this twice.

### Watch

In `mocha` & `jasmine`, it is common to use `describe.only()`, `it.only()` and pals to narrow down which tests get run.
In Jest, invoke the test script using the `--watch` CLI flag,
and after the process has started,
hit `p` (for pattern) on the keyboard,
and type a regular expression to filter by test file name.

Take note that Jest persists the filter,
so when you kill the test process, and restart it,
the previous filter is still intact
(only for `--watch` mode).
To clear the filter,
hit `a` (for all) on the keyboard.

### Multiple test scenarios

In larger projects,
you may have different sets of tests
which you wish to run in different scenarios,
e.g. complete set of tests vs smoke tests.
 In these scenarios,
 you would conceivably wish to not just choose which test files to run,
 but also change several other options.
 In this case,
 it might be easier to configure multiple test commands in `package.json`,
 e.g. `test` and `test-smoke`,
 then put the config for each of them in JSON files,
 and point to them using the `--config` CLI flag.

For example, given the following folder structure:

```
/foo
--/__snapshots__
----/foo-api.unit.jest.js.snap
----/foo-api.ntgr.jest.js.snap
--/foo-api.js
--/foo-api.mock.jest.js
--/foo-api.unit.jest.js
--/foo-api.ntgr.jest.js
--/foo-api.smok.jest.js
```

You can create a file named `jest-config-unit.json`

```
{
  "testMatch": [
    "**/*.unit.jest.js"
  ],
  "collectCoverageFrom": [
    "**/*.js",
    "!**/*.jest.js",
    "!**/node_modules/**"
  ]
}
```

(and create additional files, with modified matchers for integration tests and smoke tests)

... then run only the unit tests using the following command,
which you would place in the `scripts` section of `package.json`.

```
jest --config ./jest-config-unit.json
```

(and run additional commands, pointing to their respective files, for integration tests and smoke tests)

### Sand boxing

In `mocha` & `jasmine`,
any side effects introduced from a test will carry over from one test to the next.

In Jest, you don't have to clean up anything that
is in memory in the `node` process
because that is completely sandboxed;
but you still need to clean up anything that is external to this,
e.g. file system, database, etc.
Better yet, where possible,
mock these externals so that it truly stays all in memory.

### DRY and DAMP

In mocha/ jasmine,
 you would write your tests such that they were DAMP
(opposite of DRY: do not repeat yourself).
The repetition is considered good in this case,
because it enables the tests to be
self-contained description of the features being tested.

In Jest, you can write your test code in a DRY manner,
while still maintaining the descriptiveness,
by making use of *snapshots*
to capture the variations and differences between each test.

This is especially useful when you are testing variations
of calling the same code multiple times in a sequence,
and other scenarios where there are iterations.

The main *caveat* of this approach is resultant from the fact that
you are not crafting the assertions by hand
(the contents of each snapshot),
and instead, it is all automatically generated for you.
This requires greater discipline on the part of you as a developer
to *read through the snapshots* in nitpick-level detail,
and verify that you are indeed asserting
what you should be asserting.

Used properly, snapshots can be an enormous boon to testing,
allowing one to write and update tests quickly,
making iterations faster.

One more tip regarding snapshots:
Don't `expect(result).toMatchSnapshot(...)` directly.
Instead transform the result object to strip out the parts of it that aren't important to test,
and add additional bits of meta data about the test -
think, "what would I want to `console.log(...)` here?" -
and then do the snapshots on *that* object.

### All the docs

Jest has rather good documentation -
every one of its exposed APIs are documented somewhere on its website.
That being said, Jest is a test runner,
and assertions library,
a mocks library,
and a time library,
all rolled into one.
Therefore, the surface area of its API is huge.
This is problematic for documentation,
because it can be quite hard to find things -
things that you know should be in there somewhere,
but are just not sure where to look.

This [handy reference](https://dmitriiabramov.github.io/jest-cheatsheet/index.html)
deep links to all of the Jest API & CLI in one page,
and I have found this tremendously useful.
