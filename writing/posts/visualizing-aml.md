---
title: "Visualizing AML Risk"
description: "Financial Action Task Force (FATF) is an intergovernmental body that creates international rules on anti-money laundering.  We will look at data on compliance levels of 172 countries with FATF Recommendations."
date: 2021-02-20
---

One of the main functions of international organizations (IOs) is monitoring how countries follow international rules. But if they see that countries are not following them, there is not much what IOs can do about it. IOs cannot come and punish states for not following international law in the same way as the government can punish citizens if they do not abide by domestic laws. As their arsenal for enforcing international compliance is limited, they do what is left to do: point fingers, shame and blame.

Financial Action Task Force (FATF) is an intergovernmental body that creates international rules on anti-money laundering (AML) and counter financing of terrorism (CFT) and monitors compliance. 

FATF monitors compliance with its 40 recommendations on AML/CFT not only across members, but non-member governments as well. And even though FATF can do as much as name and shame non-complaint governments, its shaming game has real, although indirect consequences for national economies.

In this post, we will look at data on compliance levels of 172 countries with FATF Recommendations on fighting money laundering.

## About the data

FATF Recommendations consists of 40 standards across 11 policy areas that essentially all countries around the world are encouraged to incorporate into their national regulations. FATF marks countries as complaint or not-complaint across these recommendations. Basel Institute on Governance, building on FATF’s compliance assessment mythology, [built its global AML index](https://baselgovernance.org/basel-aml-index) that measures money laundering risks across countries.

Unfortunately, Basel Institute does not share the dataset behind the index for free. It only publishes the overall index for the years from 2012 to 2020, and all other details behind the index are paywalled under Expert Edition Index. But, this is enough for today's purposes.

_You can find codes for graphs below[here](https://github.com/adilnsspv/visualizing-io/blob/main/visualizing_AML.Rmd)._

### How AML Risk is calculated

Basel Institute’s AML index consists of 16 indicators across 5 main domains: quality of AML/CFT framework, corruption risk, financial transparency, public transparency and accountability, and legal and political risk. FATF’s compliance monitoring efforts - called mutual evaluations reports — makes up 35% of all data used to create this index — largest input among all other sources used. If you want to get all information on 16 details, you can find them [here](https://baselgovernance.org/basel-aml-index/methodology-and-data).

To compose so-called The Basel AML Index, the authors weighted above-mentioned indicators in the following way:

  * Indicators measuring quality of AML/CFT framework make up 65% of the index;
  * Indicators measuring corruption risk make up 10%;
  * Indicators measuring financial transparency make up 10%;
  * Indicators measuring public transparency and accountability make up 5%;
  * Indicators measuring legal and political risk make up 10%.



The resulted The Basel AML Index ranges from 0 to 10, 10 indicating the highest risk level in a country, and 0 indicating no risk.

### How I manipulated the data

I downloaded available spreadsheets from [here](https://baselgovernance.org/sites/default/files/amlData/public_basel_aml_index_rankings_2012-2020_1.xls). Each sheet represented scores for different year, so I combined them together into one dataset, resulting in dataset with 173 countries, each observed across at minimum one year and at maximum of 8 years, with AML index ranging from 1 (lowest in the dataset) to 8 (highest in the dataset). 

Index does not have full data for all countries for each of 8 years. The reason is that FATF evaluates countries in rounds, and so-far only 4 rounds took place. So for example, if Kazakhstan was evaluated in 2012, the index will have a score for it for 2012, but since Kazakhstan’s next evaluation was only in 2016 (the third round of evaluations), the data for years 2013-2015 will be missing in the index, and only score for 2016 is given. To address this, I filled missing years for all countries from up to bottom. For example, for Kazakhstan, I gave the country the same score for years of 2013-2015 that it received in 2012, since the country was not re-evaluated until 2016 and until 2016 it kept its evaluation score from 2012.

## Iran and FATF

Let’s start by looking at which countries are labeled as possessing the highest money laundering risk. Two things jump out right away.

First, Iran continuously scores the highest among all 173 countries, taking the first position in each year between 2012 and 2020 except for 2013. Iran has a long relationship with FATF. Since 2007, FATF continues to call special attention of the global banking community to Iran’s deficiencies in complying with AML and CFT rules. Iran's inability or unwillingness to address these issues resulted in several blacklistings of the country by FATF. Situation got a little better after 2016, but no significant improvements were made, as the government failed to gather necessary political support for introducing new AML and CFT laws. The issue was heavily politicized, too. FATF’s blacklisting was partially used as negotiations tool by the US in Iran nuclear deal talks.

What this means for Iran is that the country is plugged off from the global banking network: FATF labels the country a high risks and requires all members and non-members to apply additional due diligence requirements when dealing with Iranian banks and financial service providers. For global banks, having business with a high risk country is risky and costly, so they just shut down any ties with it - a phenomenon called “de-risking,” which I will explore in different post. In sum, Iran’s bank does not have or have few banking relationships with global banks so face significant difficulties doing business internationally as they meet a lot of checks and delays — all of this hurts the country’s economy.

FATF called all countries to apply counter-measures against Iran. Although these counter-measures are only recommendations, they are pretty harming for any economy, see the examples provided by FATF in its [explanatory note to Recommendation 19](http://www.fatf-gafi.org/media/fatf/documents/recommendations/pdfs/FATF%20Recommendations%202012.pdf#page=82).

To know more about Iran’s situation with AML/CFT laws and FATF, I recommend these articles:

  * _[Iran revives contentious anti-money laundering legislation | Business and Economy News | Al Jazeera](https://www.aljazeera.com/news/2020/12/14/contentious-fatf-legislation-revived-in-iran)_
  *  _[FATF blacklists Iran, but does it matter? - Atlantic Council](https://www.atlanticcouncil.org/blogs/iransource/fatf-blacklists-iran-but-does-it-matter/)_
  *  _[Global watchdog places Iran on terrorism financing blacklist | Reuters](https://www.reuters.com/article/us-iran-fatf-idUSKBN20F1Z6)_
  *  _[Rouhani urges anti-money laundering compliance to curb Iran isolation | Reuters](https://www.reuters.com/article/uk-iran-economy-fatf-idUKKBN1ZQ1BH)_



## Gap between developing and developed countries

The second thing that stroke me the most about the first graph — there is not a single developed country or a country from the West on the top 10 lists in any year. There is not much of variation from year to year and list of top 10 highest risk countries seems more like a reshuffling of the same old batch. Most of these countries are labeled as “failed states” and there is little surprise that they do little on curbing money laundering and terrorism financing, considering regulatory qualities of their governments - another topic that I will discover in later posts.

This led me into thinking if there is systematic gap between developing and developed countries on money laundering risks. As such, I averaged risk scores for each year by world regions (I used World Bank’s classification) and plotted how they evolved from 2012 to 2020. Results are in the graph below.

I paid attention to three things. First, most of scores on average cluster around 4-7 points on 10-points scale. Second - yes, there is a systematic gap. Although I am not sure why World Bank joins Central Asia and Europe into one group, but there is on average at least one-point score difference between tandem of Europe and North America and the rest of the world. In other words, Europe and North America is considered on average 120% less risky than the rest of the world - and take into the consideration the skewing effect of Central Asian countries that probably make Europe’s average score look lower than it actually is.

Third, from 2019 and 2020, most of the regions lowered their average risk scores. With exceptions of Middle East & North Africa, all other regions have shown downward trend in the last year.

## European Union and money laundering

It is one thing to look at total scores of countries in each year, but looking at change over time may give us a different picture. I examined which countries experienced the highest increase in risk scores over the years. In order to account for the variation within the period of 2012-2020, I looked at two separate four-years periods: 2012 - 2016, and 2016 - 2020. Results are below.

Graph above shows top 15 countries that experienced dramatic percentage increase in risk scores over two four-year periods. First surprise is Norway, whose risk score increased by over 200% from 2012 to 2016. In its [report](http://www.fatf-gafi.org/countries/n-r/norway/documents/mer-norway-2014.html), FATF essentially says that Norway paid little attention to tacking money laundering, although it has good institutional foundations. Members of the European Union are highlighted in red.

Second, I was surprised to see European Union’s members (highlighted in red) such as France, Sweden, Slovenia and Hungary among the top 10 countries. As a results of Sweden's investigations in 2019 illustrated, Sweden’s [largest bank SEB](https://www.ft.com/content/6566b354-216f-11ea-b8a1-584213ee7b2b) was involved in money-laundering operations in the Baltics region, along with Denmark’s Danske Bank, which became famous as a part of [the largest money-laundering scandals of 2019](https://www.ft.com/content/4bb9e0ac-df70-11e9-9743-db5a370481bc). It is not surprising then that the EU proposed [a new European authority](https://www.ft.com/content/d810c676-fb34-11e9-98fd-4d6c20050229) to monitor and punish members that fail to comply with AML efforts.

On the other hand, EU members (highlighted in red, again) are also one of the top countries that seriously decreased their risks level over time, as shown in the graph below. Austria, Spain, Estonia, Greece and Croatia are among top 10 best performing countries in both periods. Notably, pair of Greece and Macedonia are doing excellent job in pushing down their money laundering risks for 8 straight years - the only ones the dataset that consistently score among top 10 for both periods.

## Best and worst performers

Finally, below are two last plots that bring different insights to our attention. Graph below plot the same data for 2012-2016 and 2016-2020, but shows the best and worst performers for one period on the same graph. Firstly, note how Norway from being one of worst performing countries in 2016, ended among top 15 best performing ones in 2020. 

The fate of Yemen, Haiti and Jordan, in contrast, was the opposite. These three performed as one of the bests in 2012-2016, with Haiti performing better than Macedonia and Austria. In 2016-2020, however, Jordan ended up in the top 3 worst performing countries, Haiti - top 10, and Yemen - top 15.
