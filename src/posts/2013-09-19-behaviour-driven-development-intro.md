---
comments: true
title: Behaviour-Driven Development
date: '2013-09-19T12:30+11:00'
originalUrl: http://blog.bguiz.com/post/61588582500/behaviour-driven-development-intro
permalink: /post/61588582500/behaviour-driven-development-intro/
tags: [test-driven development, behaviour-driven development, testing, mocking]
---

<h2>Approach</h2>

<p>Test-driven development (TDD) and behaviour-driven development (BDD) have very little to do with tests. Sure, you write tests when doing BDD, but then again you do so when doing conventional development as well. (If you are not, consider it!)</p>

<p>The difference is not about whether you write tests, but rather <em>when</em> and <em>how</em> you write them, within the software development process.</p>

<p>In BDD, you are simply writing the specifications for your software in the form of tests. You specify that my program should do <strong>X</strong>, without having written <strong>X</strong> at all. You write a test case to test for this, run it, and obviously it will fail, as you have yet to write <strong>X</strong>.</p>

<p>If writing in a compiled language, you would have had to write out stubs for <strong>X</strong>; if you are writing in an interpreted languages, this is not enforced, but you may do so anyway. Thus by writing your specifications in code, you have begun to think about them programmatically; the API of the program, modules/ packages, and classes would have begun to formulate.</p>

<p>After writing the specification in the format of the test, we then attempt to implement that particular specification, in order to make the test pass. We then refactor the code, to make the code cleaner, make the API more idiomatic, etc., or any improvement to it, so long as we do not break the test that we have just got to pass.</p>

<h3>Mocking</h3>

<p>Sometimes when writing a test for behaviour <strong>X</strong>, we realise that it would rely on another behaviour <strong>Y</strong> in order to work. Turns out that <strong>Y</strong> is complex enough to warrant a BDD cycle of its own. Mocking is useful in this sort of situation.</p>

<p>Without mocking, one would comment out the test for behaviour <strong>X</strong>, or annotate it with <code>@Ignore</code> (or equivalent), so that this is no longer tested; before proceeding to write the test for behaviour <strong>Y</strong>, implement behaviour <strong>Y</strong>, and perform a refactor. Only once all this is done, can we continue work on behaviour <strong>X</strong> again.</p>

<p>Using mocking, we use a library that integrates with the language or test framework. This library provides us with several functions that can be used to quickly mock up an object or function for immediate use. This allows us to skip having to test or implement behaviour <strong>Y</strong> before continuing with behaviour <strong>X</strong>.</p>

<h3>Phases of BDD</h3>

<p>BDD is done in cycles, where each cycle has a number of phases. One cycle is done per behaviour that we wish to define.</p>

<p>The phases are:</p>

<ul><li>Write the test: should&#8230; when&#8230; given&#8230;</li>
<li>Implement the behaviour</li>
<li>Refactor the code</li>
</ul><p>Take note of when the tests are written in each cycle: <strong>First</strong>. The tests specify behaviours that have not yet been implemented. It is only subsequently that this is done. This is important because it signifies a different mindset in the approach toward writing software, when compared to the conventional manner.</p>

<p>When writing the tests, write them like you would specify user stories. Given-When-Then (GWT) is one way to approach this, and is appropriate for the majority of them.</p>

<p>Implementing the behaviour is the same as it is with conventional software development methodologies, with one key exception: You will likely already have created stubs for the objects and functions, by the time you get to this stage.</p>

<p>This is one of the <em>key differences</em> between BDD and conventional development - that we would have already reasoned about the structure and interface of the code before actually writing any of it. Worth noting also is that we would be wearing our testing hat while reasoning about this.</p>

<p>(Refactoring: Self-explanatory)</p>

<h3>TDD vs BDD</h3>

<p>Test-driven development and behaviour-driven development are very similar. Superficially, it seems like we have simply replaced the word &#8220;test&#8221; with &#8220;behaviour&#8221;. However, there are a few key differences around:</p>

<ul><li>Language: What words should be used, how descriptive names should be</li>
<li>Focus on end-user expectations: &#8220;As a [X], I want [Y], so that [Z]&#8221;</li>
</ul><p>Dan North <a href="http://dannorth.net/introducing-bdd" target="_blank">explains BDD in more detail</a>, and highlights more differences. In the bigger picture however, they both share the same fundamental philosophy, and that is the approach of treating tests as specifications first and foremost, as therefore writing tests prior to implementation.</p>

<h2>Tools Used</h2>

<p>The tools we would use for BDD are largely the same tools we would use for unit testing. All we need in order to get up and running with BDD is the ability to execute unit tests on your project. From then on, the difference lies not in the tool chain, but rather in the approach, which we have covered above.</p>

<p>There are indeed some optional tools that we can use to aid or enhance the process and experience of behaviour-driven development. We can swap the regular unit testing framework out for another which provides BDD syntax or makes it easier to write BDD tests. We can also add a mocking library to mock behaviours that have yet to be implemented. For example, if developing a Javascript app, instead of using <a href="http://qunitjs.com/" target="_blank">QUnit</a>, use <a href="http://pivotal.github.io/jasmine/" target="_blank">Jasmine</a> as the testing framework; and use <a href="http://sinonjs.org/" target="_blank">SinonJS</a> for mocking.</p>

<h2>Credit</h2>

<p><a href="https://twitter.com/wakaleo" target="_blank">John Smart</a> conducted a short session on TDD/ BDD, and has inspired this post.</p>

<h2>Conclusion</h2>

<p>When writing software the conventional way, I implement the required functionality, and then write the tests for them afterward. While writing these tests, I sometimes &#8220;overshoot&#8221; by writing some extra tests for new functionality, because writing the original tests happens to makes me think more about the functionality while I have my testing hat on: What if this happens, and what if that happens? Sometimes these tests work right away, and at other times they do not, and I go back to fix or implement them.</p>

<p>Now I realise that I have been doing BDD or TDD, in short bursts here and there, on many occasions myself, without realising it at the time. Surprising, considering is quite a different approach toward software development; and now I think, one worth exploring proper.</p>

<p>IMHO, the <em>key advantage</em> is that with the BDD approach, we reason about the structure and interface of the code we write <em>while we have our testing hats on</em> - and this could be what is needed to write code that is more robust and less error-prone.</p>