---
comments: true
title: BackboneJs Grouped Collection Techniques - Four Approaches
date: '2013-10-22T08:02+11:00'
originalUrl: http://blog.bguiz.com/post/64709566830/backbonejs-grouped-collection-techniques-four
permalink: /post/64709566830/backbonejs-grouped-collection-techniques-four/
tags: [javascript, backbonejs, blog]
---

<p>We start off with a standard Backbone model. Owing to my creative streak, I have decided to give it
the exciting name of <code>Foo</code>.</p>

<pre><code>var Foo = Backbone.Model.extend({
    /* some code here */
});
</code></pre>

<p>The next thing that we do is to define a collection of <code>Foo</code> models.</p>

<pre><code>Foo.Collection =  Backbone.Collection.extend({
    model: Foo,
    /* some code here */
});
</code></pre>

<p>This is important to do because we will be:</p>

<ul><li>fetching multiple <code>Foo</code>s in a single HTTP request</li>
<li>displaying mutliple <code>Foo</code>s in a single Backbone view</li>
</ul><h2>Spanner in the works</h2>

<p>Next we add an additional requirement to the above.
We are no longer satisified with displaying <code>Foo</code>s in a flat list in the views.
We want them to be grouped according to a particular attribute, <code>bar</code> that every <code>Foo</code> has.</p>

<p>There are several ways to do this:</p>

<pre><code>//alternative #1
Foo.Collection =  Backbone.Collection.extend({
    model: Foo,
    initialize: function(initialModels, options) {
        this.listenTo(this, 'add remove sync', this._regroup);
        this._groupedData = [];
    },
    _regroup: function() {
        //TODO parse collection and group by bar
    },
    getGroupedModels: function() {
        return this._groupedData;
    }
});
</code></pre>

<p>In alternative #1, the collection listens to any changes on itself.
As soon as one occurs, the regroup function is run.
The view that wishes to display the grouped collection of <code>Foo</code>s calls <code>getGroupedModels</code>, and the grouping is always up to date.</p>

<pre><code>//alternative #2
Foo.Collection =  Backbone.Collection.extend({
    model: Foo,
    initialize: function(initialModels, options) {
        this._groupedData = [];
    },
    _regroup: function() {
        //TODO parse collection and group by bar
    },
    getGroupedModels: function() {
        this._regroup();
        return this._groupedData;
    }
});
</code></pre>

<p>In alternative #2, the collection does <em>not</em> listen to changes on itself.
Instead, only when the view calls <code>getGroupedModels</code>, does it run the regroup function.
Thus the grouping is not always up to date, and is recomputed just in time for when it is needed.</p>

<pre><code>//alternative #3
Foo.Collection =  Backbone.Collection.extend({
    model: Foo,
    initialize: function(initialModels, options) {
        this.listenTo(this, 'add remove sync', this._flagForRegroup);
        this._groupedData = [];
        this._needsRegroup = true;
    },
    _flagForRegroup: function() {
        this._needsRegroup = true;
    },
    _regroup: function() {
        this._needsRegroup = false;
        //TODO parse collection and group by bar
    },
    getGroupedModels: function() {
        if (this._needsRegroup) {
            this._regroup();
        }
        return this._groupedData();
    }
});
</code></pre>

<p>In alternative #3, the collection listens to changes on itself once more, same as in alternative #1.
This time, however, the response to the change event is different:
Instead of running the regroup function, as we did in alternative #1, we simply toggle a flag that indicates that a regroup needs to be done.
When the view calls <code>getGroupedModels</code>, the regroup function is run only if the flag has been set,
and of course, the flag is reset.
Thus regroup is not run every time the collection is updated,
and instead only when the collection is accessed, <em>and</em> is known to be out of date.
This is done to ensure maximum laziness in computing the regroup.</p>

<pre><code>//alternative #4
Foo.GroupedCollection = Backbone.Collection.extend({
    initialize(models, options) {
        this._origCollection = options.origCollection;
        this.listenTo(this._origCollection, 'add remove sync', this._regroup);
    },
    _regroup: function() {
        //parse this._origCollection and group by bar
    }
});
</code></pre>

<p>In alternative #4, the view requires a Backbone collection - a simple Javascript array will not suffice.
So we leave <code>Foo.Collection</code> alone, and define another collection alongside it.
We&#8217;ll call this one <code>Foo.GroupedCollection</code>.
(My creativity strikes once again!)
<code>Foo.GroupedCollection</code> expects to be passed a <code>Foo.Collection</code> in its options when initialized.
The grouped collection listens for changes on the regular collection;
whenever the regular collection changes, it runs the regroup function, keeping itself up to date.</p>

<h2>Source</h2>

<p><a href="https://gist.github.com/bguiz/7021513" target="_blank">Github Gist with all the above code</a></p>

<h2>Conclusion</h2>

<p>Alternative #4 is the only option when the view displaying the grouped collection is expecting a Backbone collection.
Otherwise, any of alternatives #1 through #3 will do the job:</p>

<ul><li>Alternative #3 is the most efficient, but the code is slightly more complex.</li>
<li>Alternative #1 and #2 are equivalent,
with #1 optimal when the collection gets modified rarely, or it gets read frequently; because it is updated upon each modification.</li>
<li>Alternative #2 is optimal when the collection gets modified frequently, or it gets read rarely; because it is updated upon each read.</li>
</ul>