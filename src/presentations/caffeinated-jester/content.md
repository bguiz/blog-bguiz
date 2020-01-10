![](img/qr-code-caffeinated-jester-presentation.png)

[Brendan Graetz](http://bguiz.com)

[@bguiz](https://twitter.com/bguiz)

=SLIDE=

# The Caffeinated Jester

## Migrating from Mocha to Jest

[Brendan Graetz](http://bguiz.com)

[@bguiz](https://twitter.com/bguiz)

=SLIDE=

[![](/images/posts/caffeinated-jester.jpeg)](http://blog.bguiz.com/2017/caffeinated-jester/)

=SLIDE=

# Things

- Library vs framework
- Automated tools
- Gotchas
- Mocks
- Time warps
- Watch
- Config in files
- Snapshots
- Resources
- Is Jest worth it?

=SLIDE=

# Library vs framework

- Mocha: Library
  - Import `chai` for assertions
  - Import `sinon` & `lolex` for mocks, and time manipulation
  - Import `istanbul` for code coverage
- Jest: Framework
  - "Batteries included"

=SLIDE=

# Automated tools

- Automated: Jest Codemods
- Semi-automated:  `sed`

=SLIDE=

## Automated

```bash
yarn global add jest-codemods
```

- Converts the test runner parts only
  - Jest uses Jasmine under the hood

=SLIDE=

## Semi-automated

- Use `sed` or some other regex replacement tool
- [Gist](https://gist.github.com/bguiz/0f19d0e56f32ee32ddec557022104585)
- Requires a manual step to "clean up" after

=SLIDE=

# Gotchas

- Serial vs parallel
- File level sandbox
- `done(err)`
- `stdout`/ `stderr` truncation
- `null` or `undefined` assertions

=SLIDE=

## Serial vs parallel

- Mocha default: Serial
- Jest default : Parallel

=SLIDE=

## File level sandbox (1)

- In mocha, side effects from one test can run over into another
- In Jest, there is a file-level sandbox
  - All in-memory effects are undone
  - But not any persisted effects (e.g. DB)

=SLIDE=

## File level sandbox (2)

- Can also be problematic
- Extra steps to ensure that unwanted stuff is cleared
- After *each file*
- e.g. Drain database connection pool

=SLIDE=

## File level sandbox (3)

```javascript
afterAll((done) => {
	require('./path/to/server.js')._testTearDown((err) => {
		if (err) {
			console.error('tearDownApis fail', err);
		}
		// done(); //NOTE normally would be `done()` here
	});
	done();
});
```

- *not* necessary for it to *complete* prior to advancing to the next test file
- `done()` *before* the teardown is complete: ↓ the total run time of suite

=SLIDE=

## File level sandbox (4)

- Jest configuration per test *file*
- `beforeAll()` & `afterAll()` will execute
- ∴ define a test-specific teardown if necessary

```javascript
if (typeof process.env.TEST_TYPE === 'string') {
  server._testTearDown = () => { /* test-specific tear down */ }
}
server.on('exit', () => { /* regular tear down */ });
```

```
{
  "setupTestFrameworkScriptFile": "./jest-per-file.js"
}
```

=SLIDE=

## `done(err)`

- 1st parameter is set on the `done()` callback ⇒
  - Mocha: Test fails
  - Jest: Test passes (same as Jasmine)

=SLIDE=

## `stdout`/ `stderr` truncation

- Jest proxies all *test* output and *application* output
- H/W, the per-test output from Jest is *truncated* by string length
- Minimise output!

=SLIDE=

## `null` or `undefined` assertions

- How to assert that something is `null` or `undefined`?
- The `chai` way:
  - ```javascript
    expect(result).not.to.exist();
    ```
- Jest has no obvious equivalent, closest option is:
  - ```javascript
    expect(result).not.toEqual(expect.anything());
    ```

=SLIDE=

# Mocks

- Basic mocks
- Mocking Chained APIs
- Spies
- Module level mocks

=SLIDE=

## Basic mocks (1)

```javascript
myModule.foo = jest.fn().mockImplementation(myTestImpl);
```

- Defining a mock function

=SLIDE=

## Basic mocks (2)

```javascript
expect(myModule.foo.calls[0]).toEqual(['bar', 123]);
```

- Asserting invocation of a mock function

=SLIDE=

## Mocking Chained APIs

- E.g. `express` response
- ```
  res.status(200).json({ foo: 'bar' });
  ```
- *Not* the same as the "builder pattern"
- Achieve this by splitting `.fn()` from `.mockImplementation(myTestImpl)`
- [Detailed explainer](http://blog.bguiz.com/2017/mocking-chained-apis-jest)

=SLIDE=

## Spies

- Jest spies are limited
  - Cannot access `.mock.calls` array as you can with mocks
- Use mocks instead of spies, for the moment

=SLIDE=

## Module level mocks (1)

- Jest allows you to mock entire modules
  - Not limited to individual functions
- In practice, this does not work so well

=SLIDE=

## Module level mocks (2)

- Easier option: Manually create a module level mock
- In a `beforeAll()`, `require()` the original
- ```
  mockMyModule = Object.assign({}, originalMyModule, {
    myFunc: jest.fn().mockImplementation(() => {}),
  });
  ```
- Works because Jest *hoists* mocks prior to first `require()`

=SLIDE=

# Time warps

- Time manipulation basics
- `Date`
- Macro & micro tasks

=SLIDE=

## Time manipulation basics

- Application uses the system time as input
  - This is a rather common occurrence in tests
  - ∴ tests need to *fake* the time in order to get *repeatable* tests
- In JS, also involves the event loop queue
  - This complicates things

=SLIDE=

## `Date`

- Jest does *not* provide a means to mock `Date`
- In mocha, the default approach would be to use `lolex` from `sinon`
- H/W `lolex` doesn't play well with Jest
  - Use `mockdate` instead

=SLIDE=

## Macro & micro tasks (1)

- Set up:
  - Use `jest.useFakeTimers();`
- Macro tasks:
  - `setImmediate()`, `setTimeout()`, `setInterval()`
  - Use `jest.runTimersToTime(ms)`
- Micro tasks:
  - `new Promise()`, `process.nextTick()`
  - Use `jest.runAllTicks();`

=SLIDE=

## Macro & micro tasks (2)

- In `lolex`, when you do `clock.tick(ms);`
  - `Date` gets advanced
  - Micro tasks get executed
  - Macro tasks (up to that `ms`) get executed
- In Jest
  - Control exactly which ones you wish to execute

=SLIDE=

# Watch

- Filter to changes in `git diff`
- Filter to a regex
- With coverage

=SLIDE=

## Filter to changes in `git diff`

- Run `jest --watch`
- This is the (very handy) default behaviour
- Rerun: Save either a test or application file

=SLIDE=

## Filter to a regex

- While in `--watch` mode, hit `p` (for pattern)
- Type a regular expression to match a test file name
- Only these test files will run

=SLIDE=

## With coverage

- Run `jest --watch --coverage`
- Generates code coverage reports via `istanbul`
- Out of the box - no config necessary!

=SLIDE=

# Configuring Jest

- CLI config
- File based config

=SLIDE=

## CLI config

- Use CLI flags such as `--watch`
- Once you figure out the right flags,
  put them in `package.json` as a run script

=SLIDE=

## File based config

- Use the `--config` CLI flag
- Create a JSON file within the project
- Can be quite powerful for running:
  - Tests in different environments
  - Different sub-sets of tests

=SLIDE=

# Snapshots

- Basic snapshots
- Robust Snapshots
- DRY vs DAMP
- Write your own snapshot serialiser
- Test driven Development
- Pitfall

=SLIDE=

## Basic snapshots (1)

- Mechanism in which the test runner
  - creates expectations from results
  - serialises them
  - assembles into collection + save to disk

=SLIDE=

## Basic snapshots (2)

- When a test is run for which a snapshot already exists:
  - When update flagged, overwrite expectations with actual
  - Otherwise, diff actual against expectations

=SLIDE=

## Basic snapshots (3)

- `expect(result).toMatchSnapshot();`
- When running `foo.test.js`
- Snapshots saved into `__snapshots__/foo.test.js.snap`
- In `--watch` mode, hit `u` to update filtered set of snapshots
- In a regular test mode, use `--update` to update all snapshots

=SLIDE=

## Robust Snapshots

- Don't use a result object *directly* in a snapshot
- Instead transform the result object with a *filtered* set of properties
- Also, add any additional meta-data to the result object
  - "What would I want to `console.log()` here when debugging?"

=SLIDE=

## DRY vs DAMP

- General software engineering principle: DRY
- "Don't repeat yourself" is valid in application code
- H/W in test code, DAMP is considered best practice
  - Test cases: Fully self-descriptive
- Snapshots provide a means to remove some of the repetition in test cases
  - DRY -> DAMP -> DRY!!

=SLIDE=

## Pitfall

- Can be liberating not to have to write assertions by hand
- ∵ you are not writing them, it is easy to ignore
- Need to take extra care to *inspect* the snapshots by hand

=SLIDE=

## Write your own snapshot serialiser

- You only need to [implement 2 functions](https://github.com/bguiz/jest-object/blob/develop/serialise-js-object.js)
  - Unless you're doing something very fancy, it is straightforward

```json
"snapshotSerializers": [
  "jest-object/serialise-js-object.js"
]
```

=SLIDE=

## TDD (1)

- Use `expect(result).toMatchSnapshot()`
- Use `--watch` CLI flag
- 1st run: Generate incorrect snapshots
- 2nd and subsequent runs:
	- Either: Hand edit the snapshots to the *real* expected result
	- Or: Change impl. such that *actual* matches *expected*, then hit `u`

=SLIDE=

## TDD (2)

- This is not "pure" test-driven development
- But it is pretty close
- Also: Closest I have ever gotten to it myself!

=SLIDE=

## TDD (3)

- Snapshots are especially useful in *parametric* tests
- e.g. Hitting the same API endpoint repeatedly
  - Vary the input each iteration
	- Vary the (fake) time each iteration
- 1st: Write the test with a loop, but only one iteration
- Next: Make more iterations

=SLIDE=

## TDD (4)

Re-emphasis:

- Inspect generated snapshots with a fine-toothed comb
- Consider writing (parts of) snapshots by hand

=SLIDE=

# Resources

- [Official docs](https://facebook.github.io/jest/docs/getting-started.html)
- [Cheat sheet](https://dmitriiabramov.github.io/jest-cheatsheet/index.html)
- [Self promo](http://blog.bguiz.com/tags/jest)

=SLIDE=

#  Is Jest worth it?

- Starting new projects
  - YES!
- Existing simple projects
  - YES!
- Existing complex projects
  - Maybe

=SLIDE=

# Fin

- Migrating from Mocha to Jest is pretty *difficult*
- Jest's "batteries included" approach saves a lot of time
- Snapshots combine with `--watch` are a killer combo

=SLIDE=

# Questions?

![](img/qr-code-caffeinated-jester-presentation.png)

[Brendan Graetz](http://bguiz.com)

[@bguiz](https://twitter.com/bguiz)

=SLIDE=

[![](/images/posts/caffeinated-jester.jpeg)](http://blog.bguiz.com/2017/caffeinated-jester/)
