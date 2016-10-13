# Flask config
DEBUG = False
IP = '127.0.0.1'
PORT = '8080'
SERVER_NAME = 'localhost:8080'
SECRET_KEY = 'thisisntverysecure'

# LDAP config
LDAP_URL = 'ldaps://ldap.csh.rit.edu:636'
LDAP_BIND_DN = 'cn=map,ou=Apps,dc=csh,dc=rit,dc=edu'
LDAP_BIND_PW = 'lolno'
LDAP_USER_OU = 'ou=Users,dc=csh,dc=rit,dc=edu'

# OpenID Connect SSO config
OIDC_ISSUER = 'https://sso.csh.rit.edu/auth/realms/csh'
OIDC_CLIENT_CONFIG = {
    'client_id': 'map',
    'client_secret': 'lolno',
    'post_logout_redirect_uris': ['http://localhost:8080/logout']
}
