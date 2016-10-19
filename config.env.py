import os

# Flask config
DEBUG=False
IP=os.environ.get('MAP_IP', '0.0.0.0')
PORT=os.environ.get('MAP_PORT', '8080')
SERVER_NAME = os.environ.get('MAP_SERVER_NAME', 'map.csh.rit.edu:443')
SECRET_KEY = os.environ.get('MAP_SECRET_KEY', 'thisisntverysecure')

# LDAP config
LDAP_URL=os.environ.get('MAP_LDAP_URL', 'ldaps://ldap.csh.rit.edu:636')
LDAP_BIND_DN=os.environ.get('MAP_LDAP_BIND_DN', 'cn=map,ou=Apps,dc=csh,dc=rit,dc=edu')
LDAP_BIND_PW=os.environ.get('MAP_LDAP_BIND_PW', '')
LDAP_USER_OU=os.environ.get('MAP_LDAP_USER_OU', 'ou=Users,dc=csh,dc=rit,dc=edu')

# OpenID Connect SSO config
OIDC_ISSUER = os.environ.get('MAP_OIDC_ISSUER', 'https://sso.csh.rit.edu/realms/csh')
OIDC_CLIENT_CONFIG = {
    'client_id': os.environ.get('MAP_OIDC_CLIENT_ID', 'map'),
    'client_secret': os.environ.get('MAP_OIDC_CLIENT_SECRET', ''),
    'post_logout_redirect_uris': [os.environ.get('MAP_OIDC_LOGOUT_REDIRECT_URI', 'https://map.csh.rit.edu/logout')]
}
