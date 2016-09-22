import os
IP=os.environ.get('MAP_IP', '0.0.0.0')
PORT=os.environ.get('MAP_PORT', '8080')
LDAP_URL=os.environ.get('MAP_LDAP_URL', 'ldaps://ldap.csh.rit.edu:636')
LDAP_BIND_DN=os.environ.get('MAP_LDAP_BIND_DN', '')
LDAP_BIND_PW=os.environ.get('MAP_LDAP_BIND_PW', '')
LDAP_USER_OU=os.environ.get('MAP_LDAP_USER_OU', 'ou=Users,dc=csh,dc=rit,dc=edu')

