# Flask config
DEBUG = True
IP = '127.0.0.1'
PORT = '6969'
SERVER_NAME = 'localhost:6969'
SECRET_KEY = ''

# LDAP config
LDAP_URL = 'ldaps://stone.csh.rit.edu'
LDAP_BIND_DN = 'krbprincipalname=map/os-router-nrh.csh.rit.edu@CSH.RIT.EDU,cn=services,cn=accounts,dc=csh,dc=rit,dc=edu'
LDAP_BIND_PW = ''

# OpenID Connect SSO config
OIDC_ISSUER = 'https://sso.csh.rit.edu/auth/realms/csh'
OIDC_CLIENT_CONFIG = {
    'client_id': 'map',
    'client_secret': '',
    'post_logout_redirect_uris': ['localhost:6969/logout']
}

PLUG_SUPPORT = False
