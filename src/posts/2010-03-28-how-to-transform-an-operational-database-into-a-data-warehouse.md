---
comments: true
title: How to transform an operational database into a data warehouse
date: '2010-03-28T02:22+11:00'
originalUrl: http://brendangraetz.wordpress.com/2010/03/28/how-to-transform-an-operational-database-into-a-data-warehouse/
permalink: /2010/03/28/how-to-transform-an-operational-database-into-a-data-warehouse/
tags: [coursework, database, learn]
---

<h2>The transformation process</h2>
<p>An operational database is transformed into a data warehouse through  the following process:</p>
<p>Identify the facts &#8211; What are the facts that need to be obtained; the  wanted results from the queries</p>
<p>Identify the dimensions &#8211; What are the dimensions (criteria) along  which the facts should be filtered</p>
<p>Draw a star schema &#8211; Design a new database which consists of a  central fact table which has a many-to-one relationship with each of the  dimension tables</p>
<p>Identify the dimensions&#8217; attributes &#8211; Each dimension should have more  than one possible value; what are the characteristics (attributes) that  make them different</p>
<p>SQL &#8211; Write the structured query language that will perform the  actual transformation planned for above</p>
<h2>Operational DB vs. Data warehouse</h2>
<p>The operational database is the traditional relational database, with tables related to each other by use of foreign keys, and usually normalised until redundant data is minimised. This is useful when one wants to record &#8220;live&#8221; information such as transactions or logs. However, when one wants to mine the data for analytical purposes &#8211; for example, which time window of the day are the most sales made &#8211; and you want to do this over an extremely large data set &#8211; how should this be done? It is possible to construct a somewhat complex query to get the answer, but in cases such as these, the way in which the data warehouse is structured is optimised to obtain such information. However, before that is done, the operational data first needs to be transformed and put into a data warehouse.</p>
<h2>Transformation SQL</h2>
<p>I will not go into detail about the planning steps here, and instead will get right into the steps necessary to achieve the transformation.</p>
<h3>1. Create the dimension tables</h3>
<p>There are 3 ways to create dimension tables:</p>
<p>i) Copy a table wholesale from the operational database. This can be done for some tables, which fit the bill of the dimension tables &#8211; they usually have the same name as the identified dimension, plus the attributes identified for the dimension are the columns in this table in the operational database.</p>
<p>ii) Create tables from scratch, manually inserting values. This is done for dimensions which do not exist in the operational database at all. For example a time of day dimension for data that should be sliced according to morning, afternoon or night. In most operational databases, the tables will not have columns that have this information about a time/ date value (at least in normalised ones).</p>
<pre class="brush: sql; title: ; notranslate" title="">Create Table periodDim --create a period dimension table
(period_id Number,
period_desc Varchar(20));
Insert Into periodDim Values (1, 'Summer');
Insert Into periodDim Values (2, 'Autumn');
Insert Into periodDim Values (3, 'Winter');
Insert Into periodDim Values (4, 'Spring');</pre>
<p>iii) Extract values from a operational database table using `Select Distinct`. This is done when the data exists in some form in the operational data, however, cannot be used as-is, and must be extracted in a special manner. This occurs in the converse situation as in (ii), where data could have been potentially further normalised, however values were used directly.</p>
<pre class="brush: sql; title: ; notranslate" title="">Create Table source_dim
As (Select Distinct
Dense_Rank() Over (Order By o.order_source) As source_id,
o.order_source As source_desc
From op_db.order o);</pre>
<p>Note that here the `Dense_Rank() Over`, which is normally used for OLAP purposes, is used here to perform the simple function of assigning unique primary keys for this dimension table. Why `Dense_Rank` instead of `Rank`? You could really use either without issue, just that `Dense_Rank` will give running numbers without gaps, whereas, `Rank` would result in gaps, as a result of being used together with `Distinct`.</p>
<h3>2. Create a temporary fact table</h3>
<p>There are two main steps to this: First create the actual table by joining the necessary tables from the operational database. Secondly, create the links from the fact table to the dimension tables.</p>
<p>i) The first step is a simple join. Select all the attributes that are needed to obtain the attributes in the fact table. This would include the values that are needed to determine how it relates to each dimension, plus any of the &#8220;fact&#8221; attributes, which are usually aggregate values. &#8220;Aggregate&#8221; used here refers to a single figure that represents are larger set of figures: sum, count, average, minimum, maximum, etc.</p>
<p>ii) The next step is to add columns for the primary keys of the dimension tables. For example, the temp table may already have a &#8220;purchase date&#8221; column, and your dimension table has four entries, one for each season of the year. There are two ways to do this:</p>
<pre class="brush: sql; title: ; notranslate" title="">--manually insert the period IDs
Update temp Set period_id=1 --summer
Where (to_char(order_date, 'MON') In ('DEC', 'JAN', 'FEB'));
Update temp Set period_id=2 --autumn
Where (to_char(order_date, 'MON') In ('MAR', 'APR', 'MAY'));
Update temp Set period_id=3 --winter
Where (to_char(order_date, 'MON') In ('JUN', 'JUL', 'AUG'));
Update temp Set period_id=4 --spring
Where (to_char(order_date, 'MON') In ('SEP', 'OCT', 'NOV'));
</pre>
<pre class="brush: sql; title: ; notranslate" title="">--automatically parse period IDs
Update temp t
Set t.period_id=(
Select pd.period_id
From periodDim pd
Where ((to_date(to_char(t.order_date, 'MMDD'), 'MMDD') &amp;lt;= pd.end_date) And
(to_date(to_char(t.order_date, 'MMDD'), 'MMDD') &amp;gt;= pd.start_date)
);</pre>
<p>Note that the latter involves an additional step where the &#8220;start_date&#8221; and &#8220;end_date&#8221; columns are defined for the period dimension table. In this case, since there are a finite number of seasons (four), there is a choice &#8211; either method will work fine. However, when there is a theoretically infinite number of possible entries in a dimension table, or if there is a finite but unmanageably large number of such entries, then the latter method is the only practical way to do this.</p>
<p>Also, note that I have converted a date type to a string, and then back again to a date type &#8211; this has been done on purpose to scrub the date values such that only their month and day values are used. Otherwise, you would be comparing apples to oranges.</p>
<h3>3. Create the fact table from the template</h3>
<p>This is the easiest step of them all (including the planning steps), because if everything has been done right up until now, then this is trivial. However, if something has not quite gone right in the previous steps, this is probably where you will notice and then have to backtrack. We just copy the fact table, but instead of select all columns, we select only the relevant ones (identified in the star schema). These should be the primary keys of the dimension tables, plus the aggregate values that are the facts being presented by the fact table.</p>
<pre class="brush: sql; title: ; notranslate" title="">Create Table fact
As (
Select Count(t.cust_id) As num_cust, --aggregate values
Count(t.order_id) As num_order,
Sum(t.item_price * t.order_qty) As order_cost,
t.source_id, t.period_id, t.locationi_d -- the PK's of the dimension table
From temp t
Group By t.source_id, t.period_id, t.location_id -- group by ALL of the non-aggregate values
);</pre>
<h2>A note on PKs and FKs</h2>
<p>Primary keys and foreign keys are necessary in operational database because, in addition to them being normalised, they need to support all four types of operations (Create, Read, Update and Delete). Whereas, in a data warehouse, that is not the case &#8211; after creation, a data warehouse should only be used for Read operations.</p>
