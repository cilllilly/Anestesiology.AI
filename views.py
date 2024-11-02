from flask import render_template, redirect, url_for, Blueprint, request

views = Blueprint(__name__, "views")

@views.route("/")
def main():
    return render_template("index.html")


@views.route("/calculate", methods = ["POST", "GET"])
def calculate():
    if request.method == "POST":
        data = request.get_json()
        print(data)
    return render_template("main.html")