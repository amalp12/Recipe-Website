

from typing import Text
from flask import Flask, render_template, request, redirect
import flask
#from requests import request
from flask_sqlalchemy import SQLAlchemy
import requests
from py_edamam import Edamam

# Bash
# export FLASK_APP=application.py
# flask run
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///data.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(app)

SERVER_URL = 'http://127.0.0.1:5000/'
APP_ID = '10a11e73';
APP_KEY = '0bb2267f6d318266de72f6b604eb58bc' ;


edamam = Edamam(recipes_appid=APP_ID, recipes_appkey=APP_KEY)



class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique = True, nullable = False)
    page_link = db.Column(db.String(10000), unique = True, nullable = False)
    rating = db.Column(db.Integer)
    cost = db.Column(db.String(10), nullable = False)
    time = db.Column(db.Integer) # in minutes

    def __repr__(self):
        return  f"{self.name} - {self.page_link}"


@app.route("/", methods = ["POST"])
def search():
    if request.method == 'POST':
        
        text = request.form['search-textbox']
        
        return redirect(flask.url_for('search_page',  text = text))
    
        
        

# get requsts
@app.route('/recipes')
def get_recipes():
    recipes = Recipe.query.all()
    output =   []
    for recipe in recipes:
        recipe_data = {"name": recipe.name, "page_link": recipe.page_link , "rating": recipe.rating , "cost": recipe.cost, "time": recipe.time}
        output.append(recipe_data)
    return {"recipes":output}

@app.route('/' , methods = ['GET','POST' ])
def index():

    return render_template("index.html")

@app.route('/search/<text>', methods = ["POST", "GET"])
def search_page(text):
    data = get_recipes()
    data["recipes"] = [x for x in data["recipes"] if not x['name'].lower().count(text.lower()) ==0]
    return render_template("search-page.html" , dbdata = data, text = text)
"""

@app.route('/<param>')
def go_to(param):
    return render_template(f'{param}.html')

@app.route('/')
def get_recipe(id):
    recipe = Recipe.query.get_or_404(id)
    return {"name": recipe.name, "description": recipe.page_link , "rating": recipe.rating , "cost": recipe.cost, "time": recipe.time}
"""      
@app.route('/recipes', methods = ['POST'])
def add_recipe():
    recipe = Recipe(name = request.json['name'], description = request.json['description'], rating= request.json['rating'], cost = request.json['cost'] , time = request.json['time'])

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

@app.route('/payasam')
def payasam():
    return render_template("payasam.html")

@app.route('/sambar')
def sambar():
    return render_template("sambar.html")
if __name__ == 'main':
    app.run(debug=True)