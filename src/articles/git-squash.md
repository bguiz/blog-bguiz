---
title: Squashing Multiple Git Commits
date: '2014-08-08T20:47+11:00'
comments: true
tags: [git, github, commandline]
---

## Using `rebase`

    git rebase -i HEAD~5

If you want to squash the last five commits.

Edit the file such that one of them is `pick`, and the remiander are `squash` -
or whatever combination you are after -
and then save the commit message.

## Alternative, using `reset --soft`

    git reset --soft HEAD~5
    git commit -a

`git reset` sets you back to a particular revision,
in this case 5 commits ago,
and it also rolls back the file state to what they were back then.
However, when run with the `--soft` option,
it sets you back to the specified revision,
**without** rolling back the file contents -
they remain as they are presently on disk.

All you need to do now is to commit these changes,
which are the aggregeate of all the changes since the revsion we just rolled back to,
and commit them in a single coommit.

## How about previously `push`ed commits?

If you have been working locally, then all is good!

If you have previously pushed this branch to a remote, then,
when you do your next push:

    git push --force origin master

The `--force` option is necessary, because you are telling git to overwrite the existing commits that are there.

This is *not* encouraged, because if someone else has pulled from the same branch,
they will not be able to commit either.

However, if you are working in a scenario
where you have forked a repository,
and you needed to push your commits to a remoted **on your forked respository**,
for the purposes of creating a pull request,
then you can assume that no one is going to be also working on that feature branch
of your repository, and this would be a reasonable thing to do.
