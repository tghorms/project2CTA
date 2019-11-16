import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)



# from flask import (
#     Flask,
#     render_template,
#     jsonify,
#     request,
#     redirect)

# from flask_sqlalchemy import SQLAlchemy
# from sqlalchemy import create_engine

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################

# The database URI
# app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:Whatthefuck100@localhost:5432/CTA"
app.config["SQLALCHEMY_DATABASE_URI"] = "postgres://postgres:Whatthefuck100@localhost:5432/CTA"

# app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/bellybutton.sqlite"

engine = create_engine("postgresql://postgres:Whatthefuck100@localhost:5432/CTA")

db = SQLAlchemy(app)

# inspector = inspect(db.engine)
# print(inspector.get_table_names())
# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

Stops = Base.classes.stops_table
#################################################
# Flask Routes
#################################################


@app.route("/")
def home():
    """Render Home Page."""
    return render_template("index.html")


@app.route("/stop_data")
def stop_data():
    """Return stop data"""

    sel = [Stops.stop_id, Stops.stop_name, Stops.station_name, Stops.station_descriptive_name, Stops.map_id, Stops.lat, Stops.lon]
    session = Session(engine)
    results = db.session.query(*sel).all()  #.order_by(Nmbr_Events.STATE.desc()).all()
    session.close()
    print(results)
    all_results = []
    for a, b, c, d, e, f, g in results:
        results_dict = {}
        results_dict["stop_id"] = a
        results_dict["stop_name"] = b
        results_dict["station_name"] = c
        results_dict["descriptive_name"] = d
        results_dict["map_id"] = e
        results_dict["lat"] = f
        results_dict["lon"] = g
        all_results.append(results_dict)
    return jsonify(results)


if __name__ == '__main__':
    app.run(debug=True)
