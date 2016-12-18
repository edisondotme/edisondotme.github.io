---
layout:     post
title:      'Estimating Leaf Cover in Costa Rica Forests using k-means Clustering'
author: Edison Orellana
date:       2016-05-10
summary:    Using images I took with a wide angle lens GoPro in Costa Rica, I was able to estimate the relative canopy covers for forests in different parts of Costa Rica. 
categories: code, gis
thumbnail: code
tags:
  - hemispherical photography
  - machine learning 
  - R
excerpt: "Estimating canopy cover from images using k-means clustering"
---

## Summary

This post serves to summarize a project I did for my ESE 389: ENVIRONMENTAL & SUSTAINABLE FIELD EXPEDITION - COSTA RICA class. The class is described on the [website](https://www.earth.illinois.edu/cms/one.aspx?portalId=4186&pageId=107405) as an "8 day trip to Costa Rica over Spring Break with weekly seminars on campus during the regular semester. The course will examine environment and sustainability issues in Costa Rica. Coverage includes: rainforest ecology, land-use issues, sustainable agriculture, developing economies, and geologic features of the landscape (e.g., volcanoes; rivers)." The class culminated in a major project whose requirements necessitated that the project be related to sustainability and Costa Rica. I chose to do an assessment on the canopy cover for the different forests we visited in Costa Rica.

![Costa Rica Forests](https://github.com/edisondotme/canopy-cover/raw/master/plots/map.png "Costa Rica Forests")

# Background

I had recently learned about a technique in my GEOG 479: Programming for GIS class where one can estimate the [leaf area index (LAI)](https://en.wikipedia.org/wiki/Leaf_area_index?oldformat=true) of a forest using images taken from the ground pointing straight up to the sky. The technique uses a camera with a very wide angle [hemispherical](https://en.wikipedia.org/wiki/Hemispherical_photography?oldformat=true) (fish-eye) lens whose field of view extends from horizon to opposite horizon, then processing that image to determine which parts are sky, and which parts are leaf to determine the LAI. I thought the technique was clever so I decided that I wanted to try it out myself for my project. There exists scientifically rigorous software that already exists for this technique such as [hemiview](http://www.delta-t.co.uk/product/hemiview/), but for the sake of scientific exploration and learning, I wanted to whip up a version of my own using one of my most beloved languages, R.

# Process

Canopy cover assessment with hemispherical photography begins using a binarization algorithm, which just just analyzes the images and categorizes pixels as leaf or non-leaf. I had also recently conducted a workshop as part of the student organization I ran ([ugisgroup.org](http://ugisgroup.org)) teaching [k-means clustering](https://en.wikipedia.org/wiki/K-means_clustering?oldformat=true) of spatial points. I applied that workshop to the pixels in the hemispherical image to categorize the pixels into two groups: leaf and sky.

This is a snippet of the relevant code in R:

```R
 km <- kmeans(as.vector(image), centers = 2)
```

The result is something that looks like this:

![Costa Rica Forests](https://github.com/edisondotme/canopy-cover/raw/master/plots/clustered_image.png "k-means clustered forest image")

The above image is the result of running the R built in kmeans clustering algorithm looking for 2 centers (leaf or sky). The algorithm seems to be very good at picking out leaf from non-leaf.

I didn't go into rigorous depth to calculate the LAI from the clustered images, though it is just a couple extra steps. Since I was only interested in comparing the relative canopy covers among the different forests, I opted to just use percent canopy cover instead of LAI.

Below is a simple plot that compares the percent canopy cover for different forests in Costa Rica.

![Graph of percent leaf cover](https://github.com/edisondotme/canopy-cover/raw/master/plots/mainplot.png "percent leaf cover graph")


I also did a presentation on this for my class. [Here is the link](https://docs.google.com/presentation/d/1oULHJWyrmwFsGlJhjWdb8Vo2sWT9wUim4BRLgS-18zw/edit#slide=id.g13d5aff0e2_0_51) to the slides I used during my presentation. There is very little text on my slides because I don't believe in putting text on powerpoint slides, but the pictures help to explain more about my project. 

The code for this project can be found on my Github at [this link](https://github.com/edisondotme/canopy-cover).


