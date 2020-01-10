---
title: Cheatsheet for NodeJs Open Source Project Stewardship
date: '2015-03-31T20:05+11:00'
comments: true
tags: [oss, software, steward, maintainer, lint, test, coverage, nodejs, github, travis, coveralls, cheatsheet]
---

This cheat sheet assembles all of the instructions from
[NodeJs Open Source Project Stewardship](../nodejs)
in one convenient place.

In the terminal:

```bash
npm install --save-dev jshint jshint-stylish jasmine-node istanbul coveralls yuidocjs yuidoc-lucid-theme autodocs
touch .gitignore .npmignore .jshintrc .jshintignore .travis.yml .coveralls.yml yuidoc.json
chmod u+x publish-docs.sh
mkdir test
```

**package.json**

```javascript
{
  "scripts": {
    "lint": "./node_modules/jshint/bin/jshint --verbose --reporter ./node_modules/jshint-stylish .",
    "test": "node ./node_modules/jasmine-node/bin/jasmine-node test",
    "cover": "node ./node_modules/istanbul/lib/cli cover ./node_modules/jasmine-node/bin/jasmine-node test",
    "coveralls": "cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js",
    "generatesdocs": "node ./node_modules/yuidocjs/lib/cli .",
    "autodocs": "node ./node_modules/autodocs"
  }
}
```

**README.md**

```markdown
[![NPM](https://nodei.co/npm/MODULE_NAME.png)](https://github.com/GITHUB_NAME/MODULE_NAME/)

[![Build Status](https://travis-ci.org/GITHUB_NAME/MODULE_NAME.svg?branch=master)](https://travis-ci.org/GITHUB_NAME/MODULE_NAME)
[![Coverage Status](https://coveralls.io/repos/GITHUB_NAME/MODULE_NAME/badge.svg?branch=master)](https://coveralls.io/r/GITHUB_NAME/MODULE_NAME?branch=master)

...

## Contributing

This repository uses the
[**git flow** ](http://nvie.com/posts/a-successful-git-branching-model/)
branching strategy.
If you wish to contribute, please branch from the **develop** branch -
pull requests will only be requested if they request merging into the develop branch.
```

**.gitignore**

```text
/node_modules
/coverage
/documentation
/.coveralls.yml
```

**.npmignore**

```text
/node_modules
/coverage
/documentation
/.travis.yml
/.coveralls.yml
/test
```

**.jshintrc**

Use this [file](https://github.com/jshint/jshint/blob/master/examples/.jshintrc)
and change `"node"` to `true`.

**.jshintignore**

```text
/node_modules
/coverage
/documentation
/test
```

**yuidoc.json**

```json
{
  "options": {
    "exclude": "coverage,documentation,node_modules,test",
    "paths": "**/*.js",
    "tabtospace": 2,
    "outdir": "documentation",
    "themedir" : "node_modules/yuidoc-lucid-theme",
    "helpers" : [ "node_modules/yuidoc-lucid-theme/helpers/helpers.js" ]
  }
}
```

**.travis.yml**

```yaml
language: node_js
node_js:
- '0.10'
- '0.11'
- '0.12'
- iojs
- iojs-v1.0.4
script:
- npm run lint
- npm run cover
after_success:
- npm run autodocs
- npm run coveralls
env:
  global:
  - secure: YOUR_ENCRYPTED_GITHUB_ACCESS_TOKEN
```

**.coveralls.yml**

```text
repo_token: COVERALLS_REPO_TOKEN
```

Then:

- Write the tests in the `tests` folder
- For each of the commands `lint`, `test`, `cover`:
   - Run them and inspect the expected output and the exit codes,
   - For both the pass and fail scenarios
- Commit and push
  - Inspect Travis build output
  - Inspect Coveralls report
- Publicise!

## Fin
