from flask import render_template, redirect, url_for, Blueprint

views = Blueprint(__name__, "views")

@views.route("/")
def main():
    return render_template("index.html")


@views.route("/calculate")
def calculate():
    return render_template("main.html")