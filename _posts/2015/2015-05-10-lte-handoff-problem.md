---
layout:     post
title:      'High Speed Rail and the LTE Handoff problem'
author: Edison Orellana
date:       2015-05-10
summary:   GIS Method for Solving the LTE handoff problem of high speed rail 
categories: code, gis
thumbnail: code
tags:
  - spatial analysis
  - school work
excerpt: "GIS Method for solving the LTE handoff problem for High Speed Rail"
---

## Intro

The following is an article version of a paper I completed for a spatial analysis class early in my undergraduate career.

## Abstract
China has the worlds longest high speed rail (HSR) network in the world. With over 9,900
miles of track, it has more high speed rail than the rest of the world, combined. While these
advancements in speed and efficiency of Chinas transportation network are certainly helping
to lessen the friction of distance for travelers, it creates new and somewhat unexpected
problems in the realm of telecommunications. Staying interconnected is more of a challenge
for Long Term Evolution (LTE) networks because of the LTE hand­off problem.
This paper will serve to explain the details of what the LTE hand­off problem is
and GIS methods for solving it.

### What is the LTE hand-off problem?

![LTE hand-off problem](https://i.imgur.com/EthstcL.png "lte handoff-problem")


Long Term Evolution (LTE) is a telecommunication standard for high speed mobile data
networks. It is the standard which many phones in the United States and other developed
countries currently use for their mobile data connections since it provides high speed and low
latency communications. Although we've made excellent advancements in terms of mobile
data networks, it is not without flaws. When there are a lot of devices all using the same tower
and then quickly switching to another tower (as is the case on a high speed train) the tower
can become saturated with connection requests which results in an interrupted connection.
There are a number of reasons of why devices on high speed trains would need to have
uninterrupted data connections beyond the needs of users' devices there are also reasons like automation and
efficiency.
OHare airport in Chicago has a fully automated rail system that delivers travelers all throughout
the airport. The trains make scheduled stops at each station to pick up passengers and
move them somewhere else, all without an operator. In order for this technology to function,
OHare needs to employ many different technologies all working in tandem toward the same
goal, an uninterrupted data connection is necessary for these technologies to work. They
need to know where their trains are, how fast they are going, whether or not they made an
emergency stop, why they made an emergency stop, how long they've been stopped for, etc.
Failure to answer any of these questions means time and money lost and travelers stranded
in the wrong part of the airport.
There are currently no completely autonomous high speed rail trains, but this will certainly not
be the case for long. Human operators have always been a liability, but now that we have the
technology to replace them with computers that do not get tired and do not make mistakes, it
only makes sense that in the coming years, we are going to need computers with constant
data connections to quickly, efficiently, and safely deliver people and cargo.
Hong Kong has the best subway system in the world with a 99.9% on time rate because of
their investment in automation technology.

### How can this problem be solved?

![How can this problem be solved?](https://i.imgur.com/r41XnX7.png "diagram")



	*t: the time required for a mobile device to successfully complete a hand-off (i.e. switch from one tower to the next consecutive tower)
	*$$\alpha$$: alpha, the calculated overlap distance between two consecutive tower ranges.
	*D: the range of a tower
	*i: the calculated distance between two consecutive towers.
	*v: not pictured, but v is the speed of the train

In a very simplified version of this problem, we are looking to calculate alpha, the minimum
distance required to successfully complete a hand­off for a typical device. From the
information we have, we can calculate this relation to be:

$$ \alpha \geq t x v$$

In words, the minimum required overlap distance must be greater than or equal to the
hand­off time, t, multiplied by the velocity, v, of the train.
From this value we can no go on to get i, which is useful for us since it tells us how far apart
we need to place the towers.

$$ i = 2D - \alpha$$

Now that weve calculated a general relationship between all of our necessary variables and
the variables we are trying to solve for, we can plug in our real world values and calculate the
interval distance i.

| t | 20ms |
| v | 434.5 km/hr  |
| D | 35km |
| $$\alpha$$  | 2.415m  |
| i | 70km  |

Using this answer we can visualize what our track must look like. The following map is a map
of Taiwan that serves as an example to visualize what the application of the previous analysis
would look like.

![track](https://i.imgur.com/hZfoXaf.png "track")

This is quite a simplified solution to the hand­off problem, the problem as it exists now is much
more complex. Examples of just a few things that complicate the hand­off problem:

Control Towers: Not all cell phone towers are created equal.
Some towers are called control towers that
connect to other towers called user towers.
User towers are the towers that connect to
peoples devices. Control towers typically
have a longer range, but a decreased ability
to manage many different connections at
once. This is what the user towers are for
they have a shorter range, but are better
able to handle many different connections
simultaneously.

Variable train speeds:
When the trains leave from the stations, they
dont start off at 270mph, they have to work
their way up to that speed. Since our
previous equations were dependent on the
variable v, this means that the variable i
changes along the track instead of being a
constant for the entirety of the length of the
track.

Tower upgrade agenda:
When towers are built or replaced, they are
not usually all replaced at once, they are
staggered. This means that when one tower
is upgraded, it might have better capabilities
than its neighbors in the form of more
power, different operating frequencies, or
longer ranges. This means that there is a
planning aspect involved in the problem.

Doppler effect: Cell phone towers use EM waves to transmit
data. When the train is moving at a high
speed, it perceives a different a higher or
lower frequency than what is actually being
transmitted since there is relative motion
between the train and the waves. Whether
or not the frequency is higher or lower
depends on whether the train is coming or
going. 

Line of sigh: Sometimes there is just no clear path
between the train and the tower, so there
are geographic restrictions on where towers
can be placed.

Elevation: Beamforming is an interesting technology
that uses the properties of waves and their
interaction with each other to selectively
interfere destructively or constructively to
give the user a better signal. In essence, the
tower knows where the devices are and
can point a higher strength signal at the
users device.

Weather: Weather patterns and climate have an effect
on the effectiveness of signals.

Elliptic tower range: Oftentimes the range of the towers is not
actually circular. The towers can be elliptical,
triangular, or even hexagonal. This mean
that it is possible to orient the tower, to point
it in a specific direction to maximize the
covered area.

All of the above complications add the real meat to the problem and introduce many new
problems that also need to be considered. These complications also introduce something
which we'll call the buffer function b(). The buffer function is a function whose parameters are
the above complications the value of the buffer function tells how much to add or subtract
from the value to adequately accommodate for the LTE hand­off.


$$ \alpha + b() = t x v $$

In our further analysis, we will consider the buffer function. The main factor that affects the
ease of hand­off is user load on the tower, meaning the more users there are using the tower,
the longer it will take for two towers to successfully complete a hand­off, so we will consider
this additional factor.

The following map shows HSR density for the year 2012 in mainland China. This
transportation network will be the focus of our analysis. The hotter areas on the map
represent locations where a high speed trains are most often present and colder areas
represent where there are usually less trains. For our analysis we seek to recreate a map like
this using city and town level population point data and the spatial autocorrelation indicator,
local Morans I. This will be necessary so that we can use that data as a parameter to the
buffer function so that we can redo our analysis with this consideration.

![Density map](https://i.imgur.com/aNINWIo.png "density map")

To employ local Morans I in our analysis we will consider the area surrounding the HSR
network that is within ~50km of a rail line. We can then subdivide this area with a granularity
appropriate for our applications, in this case, 24 square kilometer regions. Using the city and
town level population data, and the outlined methodology, we will execute local Morans I for
this data.

Now that we have an appropriate way to gauge HSR network congestion, we can use this
data to estimate the value for the buffer function which now takes the form:

$$ b(N) $$

Where N is some number that is proportional to the value of local Morans I. After this analysis
is employed for all the sections of the track, we arrive at the following result:

![final map](https://i.imgur.com/Jf1fxPE.png "final map")

The above map shows the proposed cell phone tower locations that ensure optimal data
connection fidelity. To be clear, the change that was made from our original test map of
Taiwan, is that we applied the buffer function b(N) to our equation $$\alpha + b() = t  v$$. The range
of b(N) is approximately plus or minus 0.608m, but sometimes much lower or higher than this value since
the relationship between the two variables (local Morans I and ) is a functional one, i.e.
every unique input has a unique output.

At first glance it isnt entirely apparent that anything has changed, but there is under closer inspection. The
relatively small scale of the values we are working at range from very small (20ms and
submeter  values) which makes the changes difficult to see from far out, so lets zoom in on
two representative areas that contrast well with each other.

![close up section](https://i.imgur.com/5xaPhfX.png "close up")


![more close up](https://i.imgur.com/yAqG8UY.png "more close up")

The first map shows that the sparsely populated northeasterly region of the track does not
require long  value since the load is relatively low. The heavily populated Hong Kong and
eastern coastal region however, has very long overlap lengths since hand­off would require
more time to complete.

In conclusion, high speed rail is an exciting and newly improved addition to transportation
technology allowing the movement of people and cargo at speeds never before attainable
using conventional engines. HSR is nearly twice as fast as the fastest conventional diesel
engine trains today and they are only going to get faster. While the improvement is
undoubtedly good, we are faced with the new problem of LTE hand­offs. Thankfully, the
problem is not an unsolvable one, and as we have seen from our analysis, it is possible to
plan for the future of high speed rail data connection technologies by investing in careful
planning using statistical GIS planning methods.


### Sources

Berman, Merrick L. "CDC_2010_chinamap ­ WorldMap." CDC_2010_chinamap ­ WorldMap.
Harvard University, 2011. Web. 12 May 2015.

Berman, Merrick L. "Ch_train_kernel." Ch_train_kernel ­ WorldMap. Harvard University, 2011.
Web. 12 May 2015.

Berman, Merrick L. "CH_HSRail_2011 ­ WorldMap." CH_HSRail_2011 ­ WorldMap. Harvard
University, 2011. Web. 12 May 2015.

"Populated Places in the Peoples' Republic of China." Populated Places in the Peoples'
Republic of China. Conservation Biology Institute, 7 Jan. 2011. Web. 12 May 2015.

Skinner, G. W. "China DCW GIS Data." China DCW GIS Data. Harvard University, 12 June
2012. Web. 12 May 2015.

Fang, X., W. Luo, and M. Cheng. "Beamforming and Positioning­assisted Handover Scheme
for Long­term Evolution System in High­speed Railway." IET Communications 6.15 (2012):
2335­340. Web.

Luo, Wantuan, Ruiqiang Zhang, and Xuming Fang. "A CoMP Soft Handover Scheme for LTE
Systems in High Speed Railway." EURASIP Journal on Wireless Communications and
Networking 2012.1 (2012): 196. Web.

Pan, Meng­Shiuan. "An Enhanced Handover Scheme for Mobile Relays in LTE­A High­Speed
Rail Networks." IEEE Transactions on Vehicular Technology 64.2 (2015): n. pag. Web. 12
May 2015.

Song, Hao, Xuming Fang, and Li Yan. "Handover Scheme for 5G C/U Plane Split
Heterogeneous Network in High­Speed Railway." IEEE Transactions on Vehicular
Technology (2014): 1. Web. 12 May 2015.

