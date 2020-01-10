---
comments: true
title: Building data mining models
date: '2010-04-09T07:10+11:00'
originalUrl: http://brendangraetz.wordpress.com/2010/04/09/building-data-mining-models/
permalink: /2010/04/09/building-data-mining-models/
tags: [coursework, data mining, learn]
---

<p>In order to build the models used in data mining, one will need a set of data for training the learning algorithm, and then another set to evaluate the model built by the learning algorithm. Some basic evaluation methods and metrics are explored. Additionally, advanced techniques such as boosting and bagging may be applied to improve accuracy.</p>
<h3>Training data vs. Test data sets</h3>
<p>The concepts of having (at least) two different sets of data is fundamental to building models used in data mining. We need one set of data to use for to train the model &#8211; and we call this the training data set. We also need another set of data to evaluate a model, so that we may compare it to other models that have been built, in order to determine which is better suited for the particular analytic task.</p>
<p>However, these two data sets are only conceptually separate – physically, they may overlap. In a large data set, one may do a clean split such that there is a training set and a test set and there is no overlap, however, in a smaller data set, doing this would mean that there are too few in either the training or the test set to train or evaluate any meaningful model. Therefore, advanced techniques such as cross validation and bootstrapping are used to obtain the training and test sets.</p>
<h3>Cross validation</h3>
<p>Cross validation is done in a number of &#8220;folds&#8221;, and is referred to as n-fold cross validation. This diagram shows 4-fold cross validation:<br />
<img src="https://brendangraetz.files.wordpress.com/2010/04/cross_validation_4fold.png?w=584" alt="" /><br />
The data is divided into n equal sized partitions (each row represents a partition), and each partition is split into test data and training data. When training this is no different than merely allocating a certain percentage of the data to be training data and the remaining data as test data; as is the case with the split data set that is commonly used in larger data sets. However, the significance is of this complex divisioning is that during evaluation, the accuracy of each partition is evaluated separately from the rest, and the final performance is the average of the performance in all partitions.</p>
<p>Bootstrapping is different from the split (AKA the partition) and cross validation, because the same data item may be sampled more than once – this is called sampling with replacement. A data set with n instances is sampled n times (with replacement) to form a training data set. Any instances that are not in the training data set form the test data set.</p>
<h3>Model evaluation measurements</h3>
<p>In evaluating a model, the simplest performance metric is to simply count the number of correct predictions out of the total number of instance. However, not only are there other performance metrics available, but to complicate things, there are also situations where this metric is not applicable, such as when the possible values are not discrete (i.e. they are real or numeric). To complicate things even further, there are situations where one may choose to discretise a numeric value, or do the inverse and convert a nominal (discrete) value to a numeric one. Thus other performance metric are needed too.</p>
<h4>Confusion matrix</h4>
<p>A confusion matrix is used to determine accuracy in a classification problem where the output is nominal. True positives and true negative are the correct predictions; false positives and false negatives are the incorrect predictions. Accuracy is (TP + TN) / (TP + TN +FP + FN).<br />
<img src="https://brendangraetz.files.wordpress.com/2010/04/confusion_matrix_2value.png?w=584" alt="" /><br />
Determining which are TP, TN, FP &amp; FN is fairly straight forward when there are only two nominal values to be considered, as in the case of a &#8220;yes&#8221; or &#8220;no&#8221; value. When there are three or more possible nominal values, it becomes trickier, as one needs to consider the TP, FP, TN &amp; FN for each nominal value separately.</p>
<h4>Other classification metrics</h4>
<ul>
<li>Accuracy is (TP + TN) / (TP + TN +FP + FN)</li>
<li>Sensitivity is (TP) / (TP + FP)</li>
<li>Specificity is (TN) / (TN + FN)</li>
</ul>
<h4>Root Mean Squared Error</h4>
<p>RMSE is used to determine accuracy in estimation and prediction problems where the output is numerical.<br />
<img src="https://brendangraetz.files.wordpress.com/2010/04/rms_error_formula.png?w=584" alt="" /><br />
This is done by summing the squares of each of the error for each individual item, dividing this by the number of items, and then taking the square root of that. The effect of squaring means that outliers will have a markedly large effect on the calculated error, and additionally, the error will always be positive.</p>
<h3>Improving accuracy</h3>
<p>Ensemble methods are used to aggregate multiple models to create a composite model with improved accuracy. Bagging (AKA bootstrap aggregating) and boosting do this by aggregating models that are generated by the same learning algorithm, over different training/ test data set pairs.</p>
<p>Bagging replicates training sets by sampling with replacement from training instances. Boosting uses all instances, but it weights them &#8211; giving harder to classify instances higher weights, and are therefore chosen more frequently to be added to the training or test data. The resulting classifiers are then combined by voting to create a composite classifier. In bagging all classifiers have the same votes, whereas in boosting the vote is variable and based on each individual classifier&#8217;s accuracy</p>
<p>An explanation of the <a title="Bootstrap aggregation (bagging) algorithm" href="http://www.comp.leeds.ac.uk/richardh/astro/index.html#par:Boosting-and-bagging:" target="_blank">bagging algorithm</a>.</p>
