---
title: "Visualizing International Organizations"
date: 2021-02-15
---

In the next series of posts that I titled _Visualizing IO_ , I will visualize datasets about international organizations (IOs). I do this with the aim to practice and getter better at data visualization with R’s ggplot. I do not attempt to duplicate already created charts, but just focus on my own imaginative interpretation of available data. I focus on IOs because, for one — I researched them during my study years and find them interesting, and for two — because I am already familiar with most of released datasets about them.

## About this week’s dataset

This week I am visualizing [_TRANSACCESS_](https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/DDE1HE) dataset by Thomas Sommerer, Jonas Tallberg and Theresa Squatrito, released in 2015.

The dataset provides measures for transnational design of IOs, from 1950 to 2010. Authors capture transnational design by looking how much of institutional access IOs provide to transnational actors (TNAs) — a collective term for non-governmental organizations, civil society and advocacy organizations, private actors, policy networks, epistemic communities and other non-state actors. Importantly, by “access” authors do not imply the actual fact of participation of these actors in policy processes of IOs. As they collect data from IO legal and policy documents and other text data, access should be understood as institutional (written) mechanisms in IOs that give TNAs an opportunity to participate in and/or observe processes in these IOs.

The dataset collected provides access estimates both for IO level and within-IO level, meaning bodies within organization, such committees, organs, assemblies, parliaments, courts, secretariats and etc. However, in my visualizations below, I use different version of dataset: I use [replication data](https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/HQ7ZCL) they used for writing an [article](https://www.cambridge.org/core/journals/international-organization/article/abs/explaining-the-transnational-design-of-international-organizations/08ADD657322FCF78E26B32E905772DAA) based on their collected data. I used this version for two reasons: one — it provides a ready IO-level data, while a main dataset requires aggregation from IO body level to IO level; two — I am already familiar with this dataset as I used for [my master’s thesis](https://politikon.iapss.org/index.php/politikon/article/view/24). The paper itself contains good graphs and I do not attempt to replicate them, rather — try to come up with my own simple visualizations.

Last point before jumping to dataviz part: I joined this dataset with [_Measuring International Authority_](https://garymarks.web.unc.edu/data/international-authority/) dataset by Liesbet Hooghe and her colleagues, to get data on delegation (explained below) and fields of policy that IOs’ mandates cover.

## International organizations became more open

First thing first, I looked back in time. Simple line graph below shows that IOs have increased, widened and deepened their institutional mechanisms for access provision (red line) over time. Dramatic jump occurs in 1991 — the end of the Cold War, potentially, played some role in this.

For a comparison, I plotted delegation levels (blue line) that IOs have been granted over the years. Delegation is the authority granted by member-states to supranational bodies within organizations to take autonomous decision. A simpler way to think about is this: measure of delegation in this plot shows how many and what kind things international secretariats (managers) can and cannot do without approval of member-states. IOs have been increasing their delegation, too, although in a more moderate form. My thesis was an attempt to study whether there is any relationship between these two. Lines represent average estimates for access and delegation in each year from 1950 to 2010.

Two different lines are plotted by joining two variables — access and delegation — into one via `pivot_longer()` function and coloring the plot by this new joined variable in `ggplot`. **You can see all codes**[**here**](https://github.com/adilnsspv/visualizing-io/blob/main/visualizeIO_1.Rmd)**.**

International organizations increased their access provision to transnational actors over time. Data by Hooghe et al (2017) and Tallberg and Sommerer (2017).

## ICC and OAS take the lead

Secondly, I looked at access levels at IOs themselves as represented in the (lollipop) graph below. Interestingly, in 2010 International Criminal Court (ICC) and Organization of American States (OAS) were the most open towards TNAs. In regard to ICC, authors explain that that is because TNAs perform compliance monitoring functions for the organization, and all bodies within ICC are able to recruit expertise-based TNAs for help. In case of OAS, it keeps open its hearing on human rights to all public. These two are followed by Council of Europe (COE).

In 2010, the most open international organizations were International Criminal Court and Organization for American States. Data by Hooghe et al (2017) and Tallberg and Sommerer (2017).

Least open IOs in 2010 were The North Atlantic Treaty Organization (NATO), the Bank for International Settlements (BIS), and Arab Maghreb Union (AMU). If estimates for NATO and BIS are not surprising, as one is collective security agreement, and second is international banking regulator, the case of AMU is less clear and needs to be investigated more.

## Human Rights IOs are More Open Towards Transnational Actors

In the previous graph, all three top-open IOs have a strong human rights orientation. To see if this a coincidence or not, I decided to plot access levels by fields of policy that IOs focus on. I got data on policy fields from Hooghe et al’s dataset. The way this data is coded is that each IO has two levels of policy fields they operate in: core — that is policy issues that are written in their founding documents, and flank — all other secondary issues, that IO becomes involved in over time. However, each IO may have two or more core fields, for example, United Nations’ core fields are security, justice and development. As such, when looking at the graph below, it is important to remember that same IOs may be represented in two or more fields at the same time.

Graph below supports a view that IOs with human rights focus more provide access than other IOs. This is not surprising as a significant amount of NGOs and civil society groups advocate for human rights issues use these IOs as an arena for advancing human rights agenda. Surprisingly, however, security-focused IOs perform better than the majority of other issues-focused IOs — it is interesting to see, to what extent multiplicity of core policy fields in IOs account for this.

When grouping international organizations by issue areas, organizations that work on human rights, predictably more open toward transnational actors than organizations working in other fields. Data by Hooghe et al (2017) and Tallberg and Sommerer (2017).

Transnational actors are least represented in finance and energy-focused IOs. And if in the case of energy it is somewhat expected as it is only one expertise-based IO, the case of finance & banking field is illustrative of the ills of global economy. It is incredible how international finance & banking decision-making forums remain to be exclusive clubs, with a low amount of representation and accountability toward civil society groups and NGOs.
