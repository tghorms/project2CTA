#!/usr/bin/env python
# coding: utf-8

# dependencies
import requests
import json
import pandas as pd
from pandas.io.json import json_normalize
from sqlalchemy import create_engine


def arrival_call(stationID):
    arr_url = "http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx"
    key = "91ba8a537a8d440582dcc8e55fd5f657"
    url = f'{arr_url}?key={key}&mapid={stationID}&outputType=JSON'
    response = requests.get(url).json()
    # another way to look at stops. and seeing whats coming in and out of a station.
    # StationArrivals = json_normalize(response['ctatt'], record_path=['eta'])
    return response


def runme():
    # arr_url = "http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx"
    # fol_url = "httP://lapi.transitchicago.com/api/1.0/ttfollow.aspx"
    loc_url = "http://lapi.transitchicago.com/api/1.0/ttpositions.aspx"
    key = "91ba8a537a8d440582dcc8e55fd5f657"
    # engine = create_engine('postgresql://CTA_TESTUSER:CanDo@localhost:5432/CTA_Project')
    # # Location API
    rt = 'blue'
    url = f'{loc_url}?key={key}&rt={rt}&outputType=JSON'
    response = requests.get(url).json()
    #xx = json_normalize(response['ctatt']['route'], record_path=['train'])
    xx = response
    # print(xx)
    # xx.to_sql('shit', engine)
    return xx


# //API_POC
    # # # Follow Train API
    # url = f'{fol_url}?key={key}&runnumber={xx.rn[0]}&outputType=JSON'
    # response = requests.get(url).json()
    # train_num = xx.rn[0]
    # # the lat and lon position will show the position of the train moving i think based on cta Sensors on the track and stations clocking.
    # # give lat long and heading
    # train_loc = json_normalize(response['ctatt']['position'])
    # # train metrics. where we can see isapp and issch vs isdly
    # train_sched = json_normalize(response['ctatt'], record_path=['eta'])
    # # # Arrivals API
    # url = f'{arr_url}?key={key}&mapid={train_sched.staId[0]}&outputType=JSON'
    # response = requests.get(url).json()
    # stationID = train_sched.staId[0]
    # # another way to look at stops. and seeing whats coming in and out of a station.
    # StationArrivals = json_normalize(response['ctatt'], record_path=['eta'])
 
