#!/usr/bin/python
from postgre_functions import (Testconnect, basic_query)
from jpy_apiv2 import runme
import pandas as pd

from flask import (
    Flask,
    render_template,
    jsonify
)

from flask_sqlalchemy import SQLAlchemy

def myrun():
    data = basic_query()
    push = [lis[0] for lis in data]
    return push

app = Flask(__name__)
@app.route("/")
def index():
    'Render basic crap'
    
    # print(data)
    #data = {'username': 'Pang', 'site': 'stackoverflow.com'}
    # return render_template("index.html", data = data)
    return render_template("index.html", data = myrun())


if __name__ == '__main__':
    app.run(debug=True)
    
    