import os
import requests
from flask import Flask, jsonify, render_template, redirect, url_for, session
from csh_map.ldap import ldap_init, get_occupants
from flask_pyoidc.flask_pyoidc import OIDCAuthentication

app = Flask(__name__)

if os.path.exists(os.path.join(os.getcwd(), "config.py")):
    app.config.from_pyfile(os.path.join(os.getcwd(), "config.py"))
else:
    app.config.from_pyfile(os.path.join(os.getcwd(), "config.env.py"))

# Disable SSL certificate verification warning
requests.packages.urllib3.disable_warnings()

ldap_init(app)
auth = OIDCAuthentication(app,
                          issuer=app.config['OIDC_ISSUER'],
                          client_registration_info=app.config['OIDC_CLIENT_CONFIG'])


@app.route('/<path:path>')
def static_proxy(path):
    # send_static_file will guess the correct MIME type
    return app.send_static_file(path)


@app.route("/")
@auth.oidc_auth
def index():
    return render_template('index.html',
                           username=session['userinfo'].get('preferred_username', ''),
                           display_name=session['userinfo'].get('name', 'CSH Member'))


@app.route("/get/<roomNumber>")
@auth.oidc_auth
def get(roomNumber):
    return jsonify(get_occupants(app, roomNumber))


@app.route('/logout')
@auth.oidc_logout
def logout():
    return redirect(url_for('index'), 302)
