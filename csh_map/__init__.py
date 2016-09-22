from flask import Flask, jsonify, render_template
from csh_map.ldap import get_occupants

app = Flask(__name__)

@app.route('/<path:path>')
def static_proxy(path):
    # send_static_file will guess the correct MIME type
        return app.send_static_file(path)

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/get/<roomNumber>")
def get(roomNumber):
    return jsonify(get_occupants(app, roomNumber))
