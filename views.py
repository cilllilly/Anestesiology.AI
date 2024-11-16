from flask import render_template, redirect, url_for, Blueprint, request
import os, pathlib, textwrap
import google.generativeai as gemini
from IPython.display import display
from IPython.display import Markdown

views = Blueprint(__name__, "views")
geminiAPI = os.environ.get['GEMINI_API']
print(geminiAPI)
gemini.configure(api_key= geminiAPI)
model = gemini.GenerativeModel("models/gemini-1.5-flash")

def to_markdown(text):
  text = text.replace('•', '  *')
  return Markdown(textwrap.indent(text, '> ', predicate=lambda _: True))

@views.route("/")
def main():
    #list of gemini models models/gemini-1.5-flash
    for m in gemini.list_models():
        if 'generateContent' in m.supported_generation_methods:
            print(m.name)
    return render_template("index.html")


@views.route("/calculate", methods = ["POST", "GET"])
def calculate():
    response = model.generate_content("How are you today?")
    #print(to_markdown(response.text))
    print(response.resolve())
    if request.method == "POST":
        data = request.get_json()
        print(data)
    return render_template("main.html")