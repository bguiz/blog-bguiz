---
comments: true
title: Methods for comparing data mining models
date: '2010-04-10T07:00+11:00'
originalUrl: http://brendangraetz.wordpress.com/2010/04/10/methods-for-comparing-data-mining-models/
permalink: /2010/04/10/methods-for-comparing-data-mining-models/
tags: [coursework, data mining, learn]
---

<p>How do we compare the relative performance of several data mining models? Previously, we discussed some <a title="Builign data mining models" href="/2010/04/09/building-data-mining-models/" target="_blank">basic model evaluation methods and metrics</a>. Now we delve into more of them: ROC curves, Kappa statistic, mean square error, relative squared error, mean absolute error, and relative absolute error are the various metrics used, discussed below.</p>
<h3><span style="font-size:medium;">ROC curves</span></h3>
<p>Receiver Operating Characteristics curves plot the true positives against the false positives, thereby characterising the trade-off between hits and false alarms.</p>
<div><img src="/Users/Brendan/AppData/Local/Temp/EverNoteTempDir/26061-41266560a7882771.png" border="0" alt="" width="100%" /></div>
<div>The area under the curve represents the accuracy of the model &#8211; the larger the area, the more accurate the model. If the area is less than half, random guesses will outperform the model.</div>
<h3><span style="font-size:medium;">Kappa statistic</span></h3>
<div>The kappa statistic is an index that compares correct classifications against chance classifications. It can be thought of as a chance-corrected measurement of agreement. Possible values range from -1 for complete disagreement, to 1 for perfect agreement.</div>
<div><img src="/Users/Brendan/AppData/Local/Temp/EverNoteTempDir/26061-41266560ac444444.png" border="0" alt="" width="100%" /></div>
<div>Kappa is (TP + TN &#8211; Ctp &#8211; Ctn) / Total</div>
<div>In this case Kappa = (80 + 40 &#8211; 60 &#8211; 20) / 135 = 72.7%</div>
<h3><span style="font-size:medium;">Mean Square Error</span></h3>
<div><img src="/Users/Brendan/AppData/Local/Temp/EverNoteTempDir/26061-41266560b0cfd586.png" border="0" alt="" width="100%" /></div>
<div>MSE is used to evaluate model with numeric (not nominal) values. This is the most commonly used measure (including the root mean squared error, RMSE). The direction of the error does not matter, because the square of any number is always positive. However, the effect of squaring also tends to exaggerate the effects of the outliers.</div>
<h3><span style="font-size:medium;">Mean absolute error</span></h3>
<div><img src="/Users/Brendan/AppData/Local/Temp/EverNoteTempDir/26061-41266560b0efb11d.png" border="0" alt="" width="100%" /></div>
<div>MAE takes the absolute value of each error (making all negative errors positive). So the direction of the error does not matter, as in MSE, however, the outliers&#8217; effects are not as exaggerated.</div>
<h3><span style="font-size:medium;">Relative Square Error</span></h3>
<div>Sometimes it is necessary to know the relative rather than the absolute error value. When the MSE or the MAE is 500, is huge if your average instance has a value of 1000. If your average instance has a value of 1 million &#8211; then 500 is very small error. Thus to objectively compare the error rates of two numeric models, one needs to consider the size of the error relative to the average value of the instances.</div>
<div><img src="/Users/Brendan/AppData/Local/Temp/EverNoteTempDir/26061-41266560b1aa4994.png" border="0" alt="" width="100%" /></div>
<div>
<h3><span style="font-size:medium;"><br />
</span></h3>
</div>
<div>
<h3><img src="/Users/Brendan/AppData/Local/Temp/EverNoteTempDir/26061-41266560b17e4b18.png" border="0" alt="" width="100%" /></h3>
</div>
<div>
<h3><span style="font-size:medium;">Correlation</span></h3>
</div>
<div>The Coefficient of Correlation measure the linear relationship between attributes, and the value range from -1 for perfect opposite correlation to 1 for prefect correlation &#8211; where 0 indicates no correlation.</div>
<div><img src="/Users/Brendan/AppData/Local/Temp/EverNoteTempDir/26061-41266560b52c5f93.png" border="0" alt="" width="100%" /></div>
<p>To use correlation in evaluating a model, one computes the correlation coefficient of the test data set and the predictions of the model. The model with the correlation coefficient that is closest to +1 is deemed the best predictor.</p>
<h3><span style="font-size:medium;">Deciding which performance metric to use</span></h3>
<p>The performance metric is decided on a case-by-case basis, according to the needs of the problem domain. One should consider what the costs of each type of error are and therefore which ones we are trying to minimise. In addition, some types of metrics are applicable only to numeric problems, and others to nominal problems.</p>
<p>It is important to note that when mining data, it is important to use several learning algorithms and produce several models, then evaluate each of them. This lends itself to a reiterative process, where after evaluation, one may:</p>
<ul>
<li>Select a different algorithm</li>
<li>Use different parameters for the algorithm</li>
<li>Alter the pre-processing used</li>
<li>Collect new data or different data</li>
<li>Redefine the problem entirely</li>
</ul>
