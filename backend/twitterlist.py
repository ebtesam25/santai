#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Dec 27 02:57:35 2020

@author: lumberjackel
"""

import tweepy
import time
from nltk.corpus import stopwords  
from nltk.tokenize import word_tokenize 
import nltk
from textblob import TextBlob
from collections import Counter
import re
consumer_key = ''
consumer_secret = ''

access_token = ''
access_token_secret = ''

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)

api = tweepy.API(auth)
usertweets = api.user_timeline('@mllycrr',count=100)
stop_words = set(stopwords.words('english'))
textwords = []

for tweet in usertweets:
    t = tweet.text.lower()
    
    word_tokens = word_tokenize(t)
    pos_tagged_sent = nltk.pos_tag(nltk.tokenize.word_tokenize(t))

    nouns = [tag[0] for tag in pos_tagged_sent if tag[1]=='NN']
    filtered_sentence = []  
  
    for w in nouns:  
        if w not in stop_words and w.isalpha():  
            textwords.append(w)

counter_obj = Counter(textwords)
#print(counter_obj)
top = counter_obj.most_common()
topwords = []
for t in top:
    if t[0][0].isalpha() and t[0] != 'rt' and t[0] != 'https' and len(t[0]) > 2:
        topwords.append(t)
#print(topwords)
t10 = []
top10 = topwords[:10]
for i in top10:
    t10.append(i[0])
print(t10)
#print(list(counter_obj.keys()))