---
title: Functional Javascript for Social Good (and Fun)!
date: '2014-09-04T21:36+11:00'
updated: 2014-09-13 11:59
comments: true
tags: [javascript, microfinance, tutorial, beginner]
---

This post will take you through, in about fifteen minutes,
a beginner's crash course in Javascript,
and apply it to a very worthwhile cause.
You might even make some money by doing it!

## The Objective

[Kiva](http://kiva.org) is an organisation that enables anyone to participate as
[microcredit](http://en.wikipedia.org/wiki/Microcredit) lenders.

You could get started with Kiva by using their search function;
alternatively, you could also get started by using Kiva's API
plus some Javascript.

The objective is to be able to perform a query on Kiva's data
to select one or more of Kiva's partners,
to make micro-credit loans to.
By making loans to these organisations,
you are helping to improve the lives of some of the most poor people in the world,
and therefore doing some social good.

You might ask, why it is important to be selective of the partner organisations that you make loans to.
These loans come with a high risk -
primarily because the borrowers do not have to put up any collateral as security for the loans;
because they quite often do not have much by way of collateral to begin with!
This means that if they default on their repayments,
there is no recourse, and the loaned amount needs to be written off as a loss.
The good thing is that some of Kiva's partners have a better track record than others
when it comes to managing micro-credit loans effectively.
As a lender, it is in your best interest to pick the more reputable partner organisations.

## Getting started

Fire up [Chrome](https://www.google.com/chrome/browser/).
(If you do not use Chrome, you can still work through this, but the instructions could be slightly different - YMMV)
Next, open developer tools - hit `Ctrl+Shift+C`.
You should see a new pane open up, with various sub-panes.

The pane we are most interested in for this exercise, is "Console".
The console gives you access to a REPL (Read-Evaluate-Print-Loop).
Many web developers use this to find out why the web sites that they build are misbehaving.
We, however, will not be building any websites,
and will simply be using this to execute Javascript code.

## Loading data

Visit [http://api.kivaws.org/v1/partners.json](http://api.kivaws.org/v1/partners.json).

When you visit that URL, Chrome quickly realises that is **not** a web page,
that you are visiting, but actually JSON.
JSON is a text-based data exchange format which is very common on the web,
because it can be read and manipulated easily using Javascript,
which is exactly what we will be doing!

Chrome does not display JSON though, only web pages,
so it puts the JSON into a minimal web page.
Unfortunately, this does not work in our favour,
as we will need to extract the JSON back out from the web page.
So go to the console,
and enter the following two lines of code:



    var txt = document.querySelector('pre').innerHTML;
    var json = JSON.parse(txt);

The first line finds where Chrome has put the JSON into the web page,
and extracts it, putting it into a variable named `txt`.

The second line then takes `txt`, which is presently just a string of text characters,
and parses it as JSON, storing it in another variable,
this time named `json`.

## Objects and Arrays

We have successfully used the Developer Tools Console as a Javascript REPL,
and created a JSON object.

Let us inspect the object to see what it contains.
To do this, simply enter `json` into the console,
and Chrome prints out a summary of the object.



    json;
    > Object {paging: Object, partners: Array[341]}

This means that the `json` object contains two child properties,
`paging`, and `partners`.
We do not care about `paging`, but we do want to inspect `partners`.
To query a property of an object we use dot-notation...
in this case `json` dot `partners`:



    json.partners;
    > Array[341]

This partners array contains information about **all** of the Kiva partners.
This is not very helpful though, as none of us have the time to look through over 300 items.

Let us just look at the very first partner.
To query an element of an array, we use square bracket notation...
in this case `json.partners` open square bracket `0` close square bracket.



    json.partners[0]
    > Object {id: 1, name: "East Africa Beta", status: "closed", rating: "0.0", due_diligence_type: "Full"…}

Note that the index of the first element of the array is zero.
Arrays in most programming languages, Javascript included, start at zero, not one.
Similarly, the last index of the array is its length **minus one**:



    json.partners.length
    > 341
    json.partners[340]
    > Object {id: 417, name: "Emerging Cooking Solutions Zambia ltd", status: "active", rating: "Not Rated", due_diligence_type: "Experimental"…}

In the first command, we use dot notation to query the `length` property of `json.partners`.
In the second command, we use square bracket notation to query the last element of the `json.partners`.

The more astute might have noticed that we were able to use dot notation to query
a property on an array, and perhaps got a little confused.
That is because, in Javascript, all arrays are objects too!
(not all objects are arrays though).

## Functions and Functional Programming

Now it is time to level up to functional programming.
We are not going to be doing the full deal here,
and indeed there are other languages much better than Javascript for functional programming.
Javascript does, however, support parts of the functional programming paradigm that we are interested in,
which are the functions that operate on arrays.

This is, however, available only on modern browsers,
that implement the newest version of the Javascript specification (ES6).
Test that your browser is good enough by entering the following command:



    Array.prototype.filter
    > function filter() { [native code] }

If your output is different, for example, if it is `null` or `undefined`,
then you will need to get [a better browser](https://www.google.com/chrome/browser/),
or make sure you have updated to the latest version.

Once you are done, we shall get cracking with `filter`, `sort`, and `map`.

If you are curious what the `prototype` property is,
you will need to [do some](http://yehudakatz.com/2011/08/12/understanding-prototypes-in-javascript/)
[reading on](http://javascriptweblog.wordpress.com/2010/06/07/understanding-javascript-prototypes/)
[your own](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/prototype) -
it is a more advanced concept, and we will not be covering that concept here.

The only thing that we are concerned with, about prototypes,
is that `Array.prototype` provisions all Javascript arrays with a number of functions,
including `filter`, `sort`, and `map`.

### Filter

The first thing that we want to do is make sure that we find partners that are active.
Inactive partners on Kiva do not have any active fund raisers for you to contribute to.

All arrays have a `filter` property that is made available to them through the `Array` prototype.
This function takes in three parameters - but we only care about the first one.

What happens when `filter` is called is:

- takes the original array, and loops over each of its elements, from first to last
- for each of the elements, it calls the function, with the element as the first parameter
    - in this case, we call the element `partner`
- if the return value is `true`, that element is added to the output array; otherwise it is discarded
- the value of the output array, is therefore, always a subset of the original array



    var outputArray = originalArray.filter(function(element) {
        return true /* or false */ ;
    });

Now let us decide which properties we wish to filter upon,
so let us just inspect the first partner on the full list:



    json.partners[0]
    > Object {id: 1, name: "East Africa Beta", status: "closed", rating: "0.0", due_diligence_type: "Full"…}

In Chrome, if you click on the small triangle next to the output,
the object will expand to show all of its properties.
This one happens to have a property of `status` set to `closed`.
We do not want that, we only want partners whose status is set to `active`.
Without any filters, we have 341 partners.



    json.partners;
    > Array[341]

Next we add a filter so that only active partners are included,
and now we are down to 253 partners:



    json.partners.filter(function(partner) {
        return partner.status === 'active';
    });
    > Array[253]

That list is still too big, so let us narrow it down further.

We inspect the first object by repeating the previous query and adding `[0]` to the end.



    json.partners.filter(function(partner) {
        return partner.status === 'active';
    })[0];
    > Object {id: 9, name: "KREDIT Ltd.", status: "active", rating: "4.5", due_diligence_type: "Full"…}

Expand the object, and we now see a new property,
which was not present on the closed partner we looked at earlier - `profitability`.
Let us add a filter for that too.

Now we wish to return `true` based on satisfying two conditions.
The way to do this is using the [Boolean AND](http://en.wikipedia.org/wiki/Logical_conjunction) operator,
which is represented using `&&` in Javascript.
Here we add a second condition, that a partner's profitability must be at least 0.1%:



    json.partners.filter(function(partner) {
        return partner.status === 'active' &&
            partner.profitability > 0.1;
    });
    > Array[110]

Now let us inspect the first element in the array output above.
There is one more property that we want to filter partners on,
the rating that Kiva assigns to each of them,
we only want partners who are rated more than 3.5 stars out of 5 stars.

Following the steps above, we might be tempted to do the following:



    json.partners.filter(function(partner) {
        return partner.status === 'active' &&
            partner.profitability > 0.1 &&
            partner.rating > 3.5;
    });

However, this can lead to incorrect results, as the JSON returned by Kiva
returns the value of `rating` as a string (text) instead of a number.
Thus, we need to convert it to a number first.
In Javascript, we do this using `parseFloat`:



    json.partners.filter(function(partner) {
        return partner.status === 'active' &&
            partner.profitability > 0.1 &&
            parseFloat(partner.rating, 10) > 3.5;
    });
    > Array[24]

Based on our filters alone, we have narrowed down our total number of partners from 341 to just 24!

[Documentation for Array.prototype.filter()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

### Sort

Once you have grokked `filter`, `sort` should come pretty easily.

What happens when `filter` is called is:

- takes the original array, and loops over each of its elements in an order determined by the sorting algorithm
- as it does so, the algorithm will need to determine for each pair of elements, which comes before the other
- for each pair of elements, it calls the function, with a pair of elements as its first and second parameter
    - in this case, we call the elements `p1` and `p2`
- if the return value is less than zero `p1` is sorted closer toward the first element of the array than `p2`
- the output array always contains the same elements as the input array, but usually in a different order



    var outputArray = inputArray.sort() {function(element1, element2) {
        return 0 /* or any other number computed by comparing element1 to element2 */ ;
    }};

Applying this to our Kiva dataset, we do:



    json.partners.filter(function(partner) {
        return partner.status === 'active' && partner.profitability > 0.1 && parseFloat(partner.rating, 10) > 3.5;
    }).sort(function(p1, p2) {
        return p2.profitability - p1.profitability;
    });
    > Array[24]

By subtracting the profitability of the second partner from the first partner another,
we always get a negative number when the first partner's profitability is higher,
therefore sorting the array in decreasing order of profitability.

[Documentation for Array.prototype.sort()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

### Filter again

Now that we have sorted the partners in decreasing order of profitability,
we can perform another filter, because we are only interested in the top ten amongst them.

The only thing that is different this time around,
is that we now ignore the first parameter in the function,
and only care about the second parameter that is passed in.
The second parameter is the index of the element within the array.
Since the array is already sorted by profitability,
to get the top ten, we simply have to select the partners whose indices are zero through nine:



    json.partners.filter(function(partner) {
        return partner.status === 'active' && partner.profitability > 0.1 && parseFloat(partner.rating, 10) > 3.5;
    }).sort(function(p1, p2) {
        return p2.profitability - p1.profitability;
    }).filter(function(partner, idx) {
        return idx < 10;
    });
    > Array[10]

In fact, this was the motivation for sorting the array in the previous step.
I was a little sneaky by leaving that out until now,
but it is a lot easier to explain now!

### Map

Now we have narrowed it down to just ten partners,
and we can inspect the output array in Chrome -
it is almost ready to use!

However, there is just one last step.
Let us make it a little bit easier to use the output.
Reading that data within the context of a JSON object has a high geek factor,
but it is not really that useful, is it?

Now that we have a filtered list,
why not go to the web page for each of these partners?

Go to the [main Kiva site](http://kiva.org),
and browse to any partner's page,
then look at the URL in the address bar.

e.g. `http://www.kiva.org/partners/99`

Eyeballing this URL, an educated guess would be that the URL for a partner is
"http://www.kiva.org/partners/" followed by the partner's ID.

To confirm this, open the first element from the output of the "Filter Again" step above,
and copy the its `id` attribute, and paste it into the address bar,
replacing the existing ID that was there.
The new partner page loads, and the partner name, and all the other information matches.
Success!

Now let us use this information to construct the URLs for each of the Kiva partners.

After grokking `filter` and `sort`, `map` should come pretty easily.

- takes the original array, and loops over each of its elements, from first to last
- for each of the elements, it calls the function, with the element as the first parameter
    - in this case, we call the element `partner`
- whatever the value the function returns will be added to the output array
- the value of the output array, is therefore, always a transformation of the input array



    var outputArray = inputArray.sort() {function(element) {
        return element /* or any thing you compute from element */ ;
    }};

Applying this to our Kiva dataset, we do:



    json.partners.filter(function(partner) {
        return partner.status === 'active' && partner.profitability > 0.1 && parseFloat(partner.rating, 10) > 3.5;
    }).sort(function(p1, p2) {
        return p2.profitability - p1.profitability;
    }).filter(function(partner, idx) {
        return idx < 10;
    }).map(function(partner) {
        return 'http://www.kiva.org/partners/'+partner.id;
    });
    > Array[10]

If you click on the triangle next to the output array,
Chrome expands it, and since it recognises the strings as URLs,
it turns them int links, making it easy for you to click on them.

[Documentation for Array.prototype.map()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

## Mixing it up

Let us say that you have a different set of criteria:

- We do not care about the profitability of a partner
- We require a higher Kiva rating of the partner, and require Kiva to have done a full due diligence check on them
- We want to sort them in order of their default rate

We can then use the same structure as we had earlier,
but modify the criteria within the first filter function,
and the sort function.



    json.partners.filter(function(partner) {
        return partner.status === 'active' &&
            partner.due_diligence_type === "Full" &&
            parseFloat(partner.rating, 10) > 4.0;
    }).sort(function(p1, p2) {
        return p1.default_rate - p2.default_rate;
    }).filter(function(partner, idx) {
        return idx < 10;
    }).map(function(partner) {
        return 'http://www.kiva.org/partners/'+partner.id;
    });

The second filter function is not really necessary any more,
as the total number of partners that match the more stringent criteria is now less than ten anyway.

We keep the map function as it is, because we are still extracting the URL.

Now we a have a completely different set of Kiva partners than we did using the
previous selection method.

Write down your own criteria in selecting partners,
and then write some Javascript code to run it.

If you are having trouble, leave a comment below this post.
Alternatively, if you have written some code for selecting a Kiva partner that you would like to show others,
leave a comment too!

## Now, donate!

It is all fine and dandy to learn some new Javascript tricks,
but up until now it is merely an academic exercise.

If you wish to make some real world impact,
and do some social good,
open up each of the partner URLs that you now have in your output,
and browse the loan recipients that are with this partner.

While I think it makes to write code to select the Kiva partners you prefer,
I do not think it makes sense to do the same when selecting individuals or groups to make micro-credit loans to.
My rationale is simple:
It makes the most sense to select Kiva partners based on quantitative metrics,
which code is good at analysing and comparing;
and it makes the most sense to select Kiva partners based on qualitative metrics,
which is better done by a human brain than through code.

For example, when I looked through all of the potential recipients of micro-credit loans
through each of the Kiva partners that I had selected,
I was not selecting them based on easily quantifiable metrics such as
their gender,their age, or even how close they were to reachign their funding target.

Instead I selected them based on their story;
what they were planning to do with their loan if they received it.
I was looking out specifically for those who had an entrepreneurial spark of some sort,
such as the a guy who wanted to purchase an amplifier for his live music performances.
I was also looking out for personal qualities that indicate they were likely to succeed in their endeavour,
such as the girl who had  already started one business and was looking to start a second one.

## Q & A

**Q**: Can't I just use the "Advanced Search" function?

**A**: Why, yes, of course you can - but that would not have been half as fun!

**Q**: I seems counter-intuitive to make API requests in a browser's developer console. Why not just use `curl`/ `wget`/ `NodeJs`/ `Python`, et cetera?

**A**: Sure, you can use all of those. You are an experienced software developer, you can use whatever tool you feel fit! This tutorial was intended for absolute beginners, and thus expressly avoided the need to install any tools. It is safe to assume that almost everyone reading this has access to a web browser!

**Q**: Does it matter what order I perform the `sort`, `filter`, and `map` in?

**A**: Yes and no, but most of the time, yes it does matter. In this example, if you crop filter for the first ten elements, before you perform the sort, you most certainly are **not** going to get the top ten. Similarly, if you map before anything else, the results will be incorrect, because the functions expect provider objects, not strings.

