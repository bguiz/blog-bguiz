---
title: Mocking Chained APIs in Jest
date: '2017-03-31T00:02+11:00'
tags: [javascript, jest, test, mock]
socialImage: /images/posts/mocking-chained-apis-jest.jpeg
---

`jest` is a test runner that has all batteries included.
Previously I have been using `mocha`, which is only a test runner.
`mocha`, on the other hand, has assertions, mocking,
and all the other bells and whistles, all baked in.
With `mocha`, you would need to `require()` these in,
from other modules - my go to ones were `chai` and `sinon`.
Further to this, `jest` adds snapshot testing,
which is something I have not previously done in `mocha` -
that is perhaps something for a another article.

Suffice to say that `jest` testing covers a huge surface area.
Here we will focus on just one aspect of it - mocking.
In particular, mocking chained APIs.

## Chained API

A large part of the code that I am presently writing,
and therefore also testing,
happens to be `express` middleware/ end points.
For this asserting the API response is crucial,
and a typical usage of it looks like this:

```js
res.status(200).json({ foo: 'bar' });
```

A chained API is one which returns the original object,
rather than the result of the operation,
from each function call.
While this might be counter intuitive
(why not just return the result?)
it does result in a rather easy way to invoke multiple
function on the same, possibly mutable, object.
From an implementor's point of view,
it is a very quick way to sort of create a
[DSL](https://en.wikipedia.org/wiki/Domain-specific_language).

## Split mock definition from mock implementation

An object which exposes a chained API is
great for both its implementor,
and its consumer...
but not so great for someone who wishes to mock it for testing purposes.

In `jest`,
[`jest.fn(implementation)`](https://facebook.github.io/jest/docs/jest-object.html#jestfnimplementation)
allows one to create a mock function with an custom implementation.
Mocking a chained API using this alone is an impossible venture.
Dig a little deeper into the docs, however,
and you will find that you can do
[`jest.fn().mockImplementation(implementation)`](https://facebook.github.io/jest/docs/mock-function-api.html#mockfnmockimplementationfn).
You might notice that that in itself adheres to my prior definition of a chained API,
as `.fn()` returns a mock function,
and it is missing any implementation,
so it simply defaults to a no-op function.
Subsequently we call `.mockImplementation(ourOwnImpl)`.
This time it contains our own implementation,
which supersedes the previous no-op implementation,
since `jest` mock functions are mutable.
In fact, if we were to subsequently do so again,
`.mockImplementation(ourSecondImpl)`,
our second implementation would supersede our previous one.

Now, in a neat-o little trick,
we are going to use a chained API to test another chained API:

```js
let res;
let resSet;
let resStatus;
let resJson;

function setUpExpressMocks () {
		resJson = jest.fn();
		resStatus = jest.fn();
		resSet = jest.fn();
		res = {
				set: resSet,
				status: resStatus,
				json: resJson,
		};
		resJson.mockImplementation(() => res);
		resStatus.mockImplementation(() => res);
		resSet.mockImplementation(() => res);
}
```

In order to do so however,
without incurring a lot of test code bloat,
we will not use `jest`'s chained API as a chained API,
but rather break it up,
and store the intermediate result in a variable.
In between part one and part two,
we create the return object,
that is to be returned by all mock the mocked functions,
in order to have them all be part of a chained *and* mocked API.

## In a `jest` Testing

```js
describe('[test an express res]' => () {

	// define setUpExpressMocks and the variables it uses over here

	beforeAll(setUpExpressMocks);

	it('should test res with default mocks', () => {
		// Do assertions right away
		// expect() ...
	});

	it('should test res with .json() override', (done) => {
		resJson.mockImplementation((json) => {
			// Do assertions within overridden mock implementation
			// expect() ...
			return res; // don't break the API chain
		});
	});
});

```

## Well designed APIs

Kudos to the `jest` team for designing the APIs in this manner.
I do not know if it was by accident, or by intent,
but being able to split the creation of a mock function
from setting its implementation
was a major win when it came to mocking chained APIs.
