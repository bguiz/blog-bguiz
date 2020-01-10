---
comments: true
title: A couple of command line commands for developers
date: '2010-06-14T04:32+11:00'
originalUrl: http://brendangraetz.wordpress.com/2010/06/14/command-line-commands-for-developers/
permalink: /2010/06/14/command-line-commands-for-developers/
tags: [cli, diff, linux, regex, svn]
---

<p>Picked up a couple of handy command line tricks at work this week, and frankly I wish I had done so much earlier. I thought, what better way to commit them to permanent memory than to post it here, so here they are.</p>
<h3>Subversion diff ignoring whitespace</h3>
<pre class="brush: bash; title: ; notranslate" title="">
svn diff --diff-cmd /usr/bin/diff -x -bBw -r9999 &gt; r9999.diff
</pre>
<p>Compares the local copy with a particular revision; and uses the local diff command instead of the one built into the Subversion client.</p>
<p>The `-x` flags that the following option (in this case `-bBw`) is for the local diff command, instead of the Subversion command.</p>
<h3>Find files containing a particular string recursively in a directory</h3>
<pre class="brush: bash; title: ; notranslate" title="">
find . -name \*.java -exec grep -n &quot;searchstringregex&quot; {} /dev/null \;
</pre>
<p>Lists all files within the current directory (recursively) which match a file glob pattern, and contain at least one line that matches a regular expression. Special characters in the file glob need to be escaped (e.g. `\*.java`), and the regex should be quoted.</p>
<p>The purpose of including `/dev/null` is to give the `grep` command more than one input file (per iteration), to force grep to output not just the matching string, but also the file name. This would be redundant if we are lookign at just one file, however it is quite useful, and necessary, here since we are grep&#8217;ping many files at once.</p>
<pre class="brush: bash; title: ; notranslate" title="">
find . -name \*.java -exec grep -c &quot;searchstringregex&quot; {} /dev/null \; | grep -v :0$
</pre>
<p>A very slight variation on the previous command, this time with the number of occurrences of the regex in each file (`-c`) instead of the contents of each matching line. The output is filtered by piping it through another `grep` to remove items with a count of zero.</p>
