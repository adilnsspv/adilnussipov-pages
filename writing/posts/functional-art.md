---
title: "Functional Art"
description: "As I dive more into data visualization, I started to read more of design and data visualization books. I think I could not have had a better introduction to the field than this."
date: 2021-03-01
---

_The Functional Art: An Introduction to Information Graphics and Visualization_ , by Alberto Cairo

As I dive more into data visualization, I started to read more of design and data visualization books. I do not remember how exactly I stumbled on _Functional Art_ by Alberto Cairo. May be it was from the blog of [Jane Zhang](https://janezhang.ca/posts/) \- a cool data designer, whose work I love. Or may be I just googled “[best DataViz Books](https://www.google.com/search?q=best+dataviz+books&oq=best+da&aqs=chrome.0.69i59j69i57j35i39j0i20i263j0l4j46j0.1097j0j1&sourceid=chrome&ie=UTF-8)” and two books by Cairo appeared in top 4 results: one is _Functional Art_ and other is _Truthful Art_. May be I heard about him from excellent [Policy Viz](https://policyviz.com/podcast/) podcast — I do not know. But I decided to go for it and I think I could not have had a better introduction to the field than this.

I liked it a lot. The book is easy to understand, written in a simple language, all concepts explained well. Cairo is an experienced journalist, and you can feel it in the way he explains things. The book is full of visualization examples from his own portfolio, that he explains step-by-step, from sketch and how data looked in the excel, to first draft and final publication in a newspaper article — this is amazing for someone like me, who is only starting to create own design process and workflow. And it is the part of the book I liked the most as well — I made notes, I copied his technique, I paid attention on how he structures storyboard, how consistently he uses fonts and how he highlight important points — some of these things are not even in the text, I learned them just by looking at his graphs.

Cairo also spends a considerable part of the book on how our brain perceives and knows objects we see and how it can be applied to data visualization — and this is part I struggled with. I did not understand some parts and I felt like these chapters do not have as much of actionable insights as other chapters — or, and most likely, I am just too dumb for this.

That being said, I still think that _Functional Art_ is great. It is on point. There is a ton of experience behind sentences. All things discussed can be applied immediately in your own practice. Below, the summary of notes that I took on some of most interesting parts and pieces (for me).

## Why do we need visualization

According to Cairo, the fist and main goal of any visualization is help us to better understand the world around us. Visualization is a tool, a technology, an extension for our eyes and brain, that help them to perceive things better, things that are beyond limits of our perception.

In that sense, visualization is a **functional art** — type of art, that has specific function, goal and utility. According to Cairo, in functional art, the beauty is achieved not by subjective free self-expression of artists, but by “careful and restrained tinkering of the engineer.”

> “The fact that an information graphic is designed to help us complete certain intellectual tasks is what distinguishes it from fine art. Rather than serving as a means for the artist to express her inner world and feelings, an infographic or visualization strives for objectivity, precision, and functionality, as well as beauty.”

I like the idea of art having a function. However, I do not agree fully agree with Cairo’s definition of functional art. I do not fully agree with his specification that functional beauty is achieved only via “restrained tinkering” — logic-based and rules-constrained set of actions necessary to achieve the outcomes. Although I do relate to his way of conceptualizing of an art that is constrained by rules, logic and hierarchy — this is the experience I have when I code to create data visualizations - but I also think that his definition minimizes “art” part, and leaves creativity (and self-expression) out the equation. As I do the main part of any visualizations in code, I understand that you have to follow rules and logic to achieve things, but I also know that there is a lot of space for creative freedom and self-expression that provide equally satisfying sense of fulfillment as painting, writing or composing. Coding is a writing process in a many ways, may be a bit more ordered and logic-bounded — but this is a topic for another post.

However, this narrow definition works for Cairo, as he considers visualization to be a form of information design, which is an itself a part of information architecture. My understanding of information architecture is a broad process of organizing and making sense of data — turning data into information, information into insight, and insight into wisdom. Information design is a process within information architecture (among other processes) — process of preparing and/or designing information, so people can use and interact with it smoothly and effectively. Visualization of information is a type of information design, but using visual tools. For someone, who is totally new to the field, I like Cairo’s organization of these concepts and how they nicely nest into each other.

If I do data visualization, now I can call myself information designer, or, more specifically, data designer, right? But I cannot call myself data architect as this word is already taken by a different role.

## Visualization Wheel

One of the main actionable insights for data designer that Cairo provides is visualization wheel — a compass, that helps you navigate the way you want to present your data. It is, in essence, a set of binomial choices that data designer has to make, depending on what kind of goal the designer has for the visualization: whether the designer wants to make a complex and deeper visualization, or more easily digestible and shallower.

The upper part of the wheel represents choices in favor of deeper and complex graphics. The lower part — choices in favor of user experience and easy understanding.

  * **Abstraction vs Figuration** — do you want to show things as close to reality as possible or keep things abstract? Figuration helps your audience to easily understand what you are showing, while abstraction helps you to visualize more complex arguments;
  * **Functionality vs Decoration** — do you focus on showing colorful and beautiful things, or do you focus on communicating message, that is, focusing on function? Decoration helps you to attract attention, but if emphasized too much, can distort the message. Functionality helps you to communicate your argument, but may fail to attract any readers if left to bare skillet.
  * **Density vs Lightness** — do you want to show multiple (interrelated) information elements at once or focus on one-two? If you have complex argument to visualize, you may prefer density — but it may fireback as being to dense to understand; lightness helps your reader to see and understand what’s the main message — but you may risk simplifying something complex and cause misunderstandings;
  * **Multidimensionality vs Unidimensionality** — similar to previous choice, whether you focus on showing several layers and forms to present complexity, or just few or one to keeps things simple;
  * **Originality vs Familiarity** — do you want to be original and innovate to visualize data, or you do use your old friends - bar charts, line charts and scatterplots?
  * **Novelty vs Redundancy** — do you want to use different forms to present single argument (redundant graph) or you want to use single form to present several arguments (novel graph)?



In making these choices, Cairo advises designers to keep the needs of the audience in the mind: do your visual forms do a good job to tell the story you want to tell and does your audience have necessary background about your story and about how to read and understand your visualization forms?

My choice is to find a balance. I believe that simplifying a complex argument and investing into design — in things like balance of colors, good fonts and text hierarchy — matter as much as presenting complexity.

In contrast, according to Cairo, a famous data visualization expert Edward Tufte will argue against me. He believes, that less is more. He has introduced a very interesting concept of data-ink ratio: a measurement of the amount of ink used to visualize data. For Tufte, a good graph is a graph that consists only of **data-ink elements** — elements that are so crucial to your chart that if you remove them, will destroy the integrity of your visualization.

## Finding a balance: structure first, eye candy later.

In finding a balance between functional minimalism and beautiful design, Cairo advises to remember two basic goals of visualization: designers should be able to present information, readers should be able to explore the information. Cairo’s solution is to go for depth: data designer should use space provided to present as much as possible depth within reasonable limits. Once this done, we can go and improve the design and make the chart look prettier. To make sure that I present his idea correctly, here is a direct quote:

> “…always take advantage of the space you have available to seek depth within reasonable limits. After that, and only after that, worry about how to make the presentation prettier.”

I have identified a set of 10 principles that Cairo presents as being his personal rules of thumb in finding balance between the two. I called them _Cairo’s principles_ and here they are:

  1. Think of your visualization project with a focus on where it fits on Density-Lightness and Multidimensionality-Unidimensionality axes on the visualization wheel;
  2. Move the position of your graphic at least 10% toward multidimensionality and density;
  3. Organize in layers: first, summaries, averages, highlights of data — these act as introduction for the readers for more complex data that follows after — the second layer;
  4. In the second layer, include as much information as possible in provided space — but not everything;
  5. Structure of the chart should follow logic: either make it linear or provide navigation on how to read your chart;
  6. First think about structure, and design later.
  7. Do not assume your readers are stupid;
  8. Experimentation with visual forms is necessity — by experimenting, we increase visual vocabulary of readers;
  9. The less common the visual form you choose, the more redundancy you should include. If you display data in totally novel way, include explainer for readers to understand how to read your chart;
  10. Beautiful design and emotions matter — but make sure to trigger them by right things without loosing important details.



In general, Cairo’s approach aligns more with Tufte. He prioritizes functionality, although he does keep a special space for beautiful design. There should be meaning first, and then you may want to make it simple and satisfying for eyes.

## Cairo’s creative methodology

  1. Define the focus of the graphic: your main argument and how it will be useful for readers and what they should be able to do with it;
  2. Research: gather as much information as possible;
  3. Choose visual form: what forms and shapes are best for telling your story?
  4. Complete the research: make sketches and storyboards;
  5. Finish the graphs using software tools.
