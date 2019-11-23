#!/usr/bin/python
from postgre_functions import (Testconnect, basic_query,rider_query)
from flask_sqlalchemy import SQLAlchemy
from jpy_apiv2 import (runme,arrival_call)
import pandas as pd
import json 
import os
from flask import (
    Flask,
    render_template,
    jsonify
)
app = Flask(__name__)
from flask_sqlalchemy import SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('postgresql://localhost/cta', '')
# app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '')
db = SQLAlchemy(app)

def myrun():
    data = basic_query()
    push = [lis[0] for lis in data]
    return push

def ridership():    
    data = rider_query()
    values = data    
    push = dict(values)
    return push 

@app.route("/")
def index():
    'Render basic crap'
    return render_template("index.html", data = myrun())
@app.route('/station_Api/<stationID>')
def station_click(stationID):
    xx = arrival_call(stationID)    
    return jsonify(xx)

@app.route('/ridership')
def ride_data():
    all_results=rider_query()
    return jsonify(all_results)

if __name__ == '__main__':
    app.run(debug=True)
    
    