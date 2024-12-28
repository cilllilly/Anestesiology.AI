from flask import render_template, redirect, url_for, Blueprint, request, jsonify
import os, pathlib, textwrap, json, re
import google.generativeai as gemini
from IPython.display import display
from IPython.display import Markdown
from dotenv import load_dotenv
load_dotenv()

views = Blueprint(__name__, "views")
geminiAPI = os.getenv('GEMINI_API')
print(geminiAPI)
gemini.configure(api_key= geminiAPI)
model = gemini.GenerativeModel("models/gemini-1.5-flash")
anesthesiaCalc = {"MinDose": None, "MaxDose": None}


@views.route("/")
def main():
    #list of gemini models models/gemini-1.5-flash
    for m in gemini.list_models():
        if 'generateContent' in m.supported_generation_methods:
            print(m.name)
    return render_template("index.html")


@views.route("/calculate", methods = ["POST", "GET"])
def calculate():
    
    
    
    return render_template("main.html")

#calculate anesthesia amount. 
@views.route("/submit", methods = ["POST", "GET"])
def submit():
    global anesthesiaCalc
    if request.method == "POST":
        data = request.get_json()
        print(data)
        weight = round(int(data["weight"]) / 2.2)
        print(weight)
        response = model.generate_content(f"How long is the surgery for {data['opperation']}? Only give us the approximate time in minutes.")
        surgeryTime = response.text
        times = re.findall(r'\d+', surgeryTime)
        times = list(map(int, times))
        print(surgeryTime)
        print(times)
        minDose = (weight * 2) * (times[0]/5)
        maxDose = (weight * 2) * (times[1]/5)
        print(minDose, "-", maxDose, "mg")
        anesthesiaCalc = {"MinDose": minDose, "MaxDose": maxDose}
        print(anesthesiaCalc)
        return jsonify({"data": anesthesiaCalc})
    return jsonify({"data": anesthesiaCalc})

@views.route("/getData", methods = ["GET"])
def getData():
    global anesthesiaCalc
    calculations = anesthesiaCalc
    print(anesthesiaCalc)
    if calculations["MinDose"] != None and calculations["MaxDose"] != None:
        print("test")
        return jsonify({"data": calculations})
    return jsonify({"data": None})

#(lbs/2.2 * 2.0mg) * (time(mins)/5)