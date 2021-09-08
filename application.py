
import re
from typing import Text
from flask import Flask, render_template, request
import flask
#from requests import request
from flask_sqlalchemy import SQLAlchemy
import requests
# Bash
# export FLASK_APP=application.py
# flask run
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///data.db"
db = SQLAlchemy(app)

class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique = True, nullable = False)
    page_link = db.Column(db.String(10000), unique = True, nullable = False)
    rating = db.Column(db.Integer)
    cost = db.Column(db.Integer)
    time = db.Column(db.Integer) # in minutes

    def __repr__(self):
        return  f"{self.name} - {self.page_link}"


@app.route("/", methods = ["POST"])
def search():
    if flask.request.method == 'POST':
        text = request.form['text']
        print(text)
        
# get requsts
@app.route('/recipes')
def get_recipes():
    recipes = Recipe.query.all()
    output =   []
    for recipe in recipes:
        recipe_data = {"name": recipe.name, "description": recipe.page_link , "rating": recipe.rating , "cost": recipe.cost, "time": recipe.time}
        output.apend(recipe_data)
    return {"recipes":output}

@app.route('/recipes/<id>')
def get_recipe(id):
    recipe = Recipe.query.get_or_404(id)
    return {"name": recipe.name, "description": recipe.page_link , "rating": recipe.rating , "cost": recipe.cost, "time": recipe.time}
       
@app.route('/recipes', methods = ['POST'])
def add_recipe():
    recipe = Recipe(name = request.json['name'],description = request.json['description'], rating= request.json['rating'], cost = request.json['cost'] , time = request.json['time'])


@app.route('/')
def index():
    return render_template("index.html")

@app.route('/classics')
def classics():
    return render_template("classics.html")


@app.route('/desserts')
def desserts():
    return render_template("desserts.html")

@app.route('/lunch')
def lunch():
    return render_template("lunch.html")

@app.route('/trending')
def trending():
    return render_template("trending.html")