from flask import Flask, jsonify
from csh_map.ldap import get_occupants

app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"

@app.route("/get/<roomNumber>")
def get(roomNumber):
    return jsonify(get_occupants(app, roomNumber))
