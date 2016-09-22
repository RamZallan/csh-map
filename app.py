import os
from csh_map import app
from csh_map.ldap import ldap_init

if os.path.exists(os.path.join(os.getcwd(), "config.py")):
    app.config.from_pyfile(os.path.join(os.getcwd(), "config.py"))
else:
    app.config.from_pyfile(os.path.join(os.getcwd(), "config.env.py"))

ldap_init(app)

if __name__ == '__main__':
    app.run(host=app.config['IP'], port=app.config['PORT'])

application = app
