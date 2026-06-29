---
title: "Visualizing Data Governance in Trade Agreements"
description: "The Trade Agreements Provisions on Electronic-Commerce and Data (TAPED) provides comprehensive data on international trade agreements with the focus on digital trade. To this date, it is the only known dataset that specifically codes trade agreements based on their data-related provisions."
date: 2021-05-25
---

Getting back to dataviz! This week, I decided to look at a dataset that I have known about for long time and always wanted to explore. Not only its about digital trade, but it is also about data governance - a very exciting topic for me. I explore what it means to "govern" data via trade agreements, who are champions of data-related agreements, how global data powers set their policy agenda and what is a data governance dilemma.

## About data

The Trade Agreements Provisions on Electronic-Commerce and Data (TAPED) provides comprehensive data on international trade agreements with the focus on digital trade, containing e-commerce, data flows and data protection-related variables. To this date, it is the only known dataset that specifically codes trade agreements based on their data-related provisions. I focus only on 96 unique trade agreements that contain chapters and provisions related to data governance.

For each data-related provision in a trade agreement, TAPED differentiates between three levels of _bindingness_ of those provisions on signatory parties. Bindingness is an extent to which parties that enter into an agreement can enforce each other's commitments in the case of a breach. In general, we differentiate between soft and hard commitments, where the former illustrates lack or insignificant level of enforcement, while the latter describes the presence of strong enforcement mechanisms activated in the case of non-compliance by one of parties.

These levels of bindingness in the dataset:  
* 0: no data-related provisions;  
* 1 - 2: a data-related provision has mixed bindingness (soft + hard);  
* 3: a trade agreements contains data-related provisions with hard bindingness.

## General trends

Over the last 20 years, the number of international trade agreements that contain provisions related to data governance have increased significantly. The graph below shows that trade agreements containing provisions on data flows and data protection from one agreement in 2000 to 85 agreements containing data protection provisions in 2018 and 75 agreements containing free flows provisions in 2020.

Closer Economic Partnership agreement between New Zealand and Singapore signed in 2000 was the very first agreement containing clauses on free cross-border data flows. The same year, Jordan and the United States signed free trade agreement that was the fist to contain explicit provision on data protection.

The highest number of agreements with data protection provisions was signed between 2012 and 2014, when 9 new trade agreements were signed between 2012 and 2013 and other 9 were signed between 2013 and 2014. The same years were transformative for agreements containing free data flows provisions, with 7 and 8 new agreements signed between 2012-2013 and 2013-2014. Between 2017 and 2018, 8 new agreements were signed containing both data protections and data flows provisions.

Another interesting trend is a data localization, where governments requests companies to locally store all data related to their citizens. For digital trade, data localization is a harmful practice that endengers international data flows of multinational companies. As such, more and more trade agreements include provisions that prohibit it. Prohibition of data localization in digital trade agreements started only in 2014 with one additional protocol to Pacific Alliance agreement between Columbia, Peru, Mexico and Chile and jumped to 14 agreements in 2020.

In terms of worldwide champions of data-related trade agreements, there is little surprise. As shown in the graph below, EU has leading position with 20 trade agreements, followed by United States, Singapore and Australia - all leaders of digital economy. Interestingly, Chile - [a leading digital economy innovator in South America](https://www.oecd-ilibrary.org/sites/4c7db951-en/index.html?itemId=/content/component/4c7db951-en), - Columbia and Peru provide a strong representation for their region in the top 10, signing more data-related agreements than Canada, South Korea and Japan.

## Global Data Policy Agenda

Data provisions can be broadly divided into two groups: provisions related to data protection and provisions related to data flows. Within each group, there are several sub-groups of more specific provisions.

Graph 3 below shows the number of agreements signed for each specific subgroup of data provisions among the previously mentioned top 10 champions. Squares in blue represent specific provisions related to data protection, squares in red — provisions related to data flows. Without getting into specifics, just note from the graph 3 that there are more data protection provisions than data flows, both in number of specific provisions and total number of agreements for each of two groups.

## Data Powers

EU, the United States and China are data powers that shape the debate and agenda for global data governance. Their different approaches to governing data cause a current stagnation in the debate on creation of global rules for data governance. United States advocates for free data flows and more market self-regulation, as this absence of government regulation have enabled their tech industry to become the global leader. EU and China both advocate for data protection rules, but for different reasons: for EU, it is a matter of personal data privacy and national sovereignty, while for China it is a matter of national security and social control.

The type of provisions they sign and commit to represent their different approaches. Graph 4 below shows number of trade agreements for each specific data provision type, signed by three actors from 2000 to 2020. Bars shows the number of agreements per each data provision. Red circles above bars shows the average level of bindingness for a data provision across trade agreements that have this provision, on the scale from 1 to 3. For example, the United States signed 3 trade agreements with data provisions that excludes (protects) information held by signatory parties to an agreements from free data flows requirement. Average level of bindingness of this provision across these 3 agreements is 3, which means in each of these trade agreements, the United States and other parties to agreements, can legally enforce this provision in the case of non-compliance.

China tends to have very few trade agreements with data provisions, but when it does, it keeps higher levels of bindingness (which is also explained by low number of signed agreements). United States is the only one among three that prohibits data localization and does so with strong enforcement mechanisms. On average, United States prefers softer commitments for data protection provisions than on data flows provisions. EU is a clear champion of data protection among the three. Notably, EU signs more trade agreements with provisions that refer to international standards on data protection, such as OECD's _Guidelines on Data Flows_ , Council of Europe’s _Convention 108_ and EU’s own _GDPR_.

## Global Data Governance Dilemma: Data protection vs Data Flows

Finding balance between data protection and free data flows is one of the key challenges for global policy-making on data governance. In its core, it refers to older debate on innovation versus regulation, where, on the one side, more regulation inhibits innovations, but on the other hand, less regulation may create unfair and unfriendly environment that reduces fair competition.

Figure 5 represents this dilemma within the top 10 champions mentioned above. Blue circles represent provisions related to data protection in any form. Red circles represent provisions that enable free flows of data. Size of circles as well as corresponding numbers indicate the number of trade agreements signed by each country containing data protection or data flows provisions. X-axis shows to what extent these provisions are binding: soft non-binding commitments score below 2 points, mixed commitments (soft + hard) score between 2 and 2.5, and hard legally enforceable commitments score higher than 2.5.

As the figure illustrates, there is a large gap in the enforcement levels between data protection and data flows provisions. Countries make sure that free cross-border data flows are enforced, but they care less about data protection. It is even more dramatic, considering the fact that on average, these top 10 countries sign more agreements with data protection related provisions than agreements with free data flows provisions.
