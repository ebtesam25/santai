#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sat Dec 26 22:55:36 2020

@author: lumberjackel
"""


import re
import praw
from collections import Counter

reddit = praw.Reddit(
    user_agent="top subs (by u/landsharkxx)",
    client_id="",
    client_secret="",
    username="",
    password="!"
)
def getTopSubByComment(user):
    
    red = reddit.redditor(user)
    subs = {}
    for comment in red.comments.new():
        co = comment
        sub = str(co.subreddit)
        try:
            subs[sub] += 1
        except:
            subs[sub] = 1
    sort = sorted(subs, key = subs.get, reverse = True)
    sorted_dictc = {}
    
    for w in sort:
        sorted_dictc[w] = subs[w]

    return sorted_dictc
comments = getTopSubByComment('landsharkxx')
        
def getTopSubByUpvoted(user):
    
    red = reddit.redditor(user)
    subs = {}
    for comment in red.upvoted():
        co = comment
        sub = str(co.subreddit)
        try:
            subs[sub] += 1
        except:
            subs[sub] = 1
    sort = sorted(subs, key = subs.get, reverse = True)
    sorted_dictc = {}
    
    for w in sort:
        sorted_dictc[w] = subs[w]

    return sorted_dictc
upduts = getTopSubByUpvoted('landsharkxx')

def getTopSubByPost(user):
    
    red = reddit.redditor(user)
    subs = {}
    for comment in red.submissions.new():
        co = comment
        sub = str(co.subreddit)
        try:
            subs[sub] += 1
        except:
            subs[sub] = 1
    sort = sorted(subs, key = subs.get, reverse = True)
    sorted_dictc = {}
    
    for w in sort:
        sorted_dictc[w] = subs[w]

    return sorted_dictc
post = getTopSubByPost('landsharkxx')
c = comments
for z in upduts:
    try:
        c[z] += upduts[z]
    except:
        c[z] = upduts[z]
for w in post:
    try:
        c[w] += post[w]
    except:
        c[w] = post[w]
sort2 = sorted(c, key = c.get, reverse = True)
sorted_dict2 = {}
for r in sort2:
    sorted_dict2[r] = c[r]
print(list(sorted_dict2.keys())[:10])
    