import ldap
from ldap.ldapobject import ReconnectLDAPObject

def ldap_init(app):
    app.config['LDAP_CONN'] = ReconnectLDAPObject(app.config['LDAP_URL'])
    app.config['LDAP_CONN'].simple_bind_s(
        app.config['LDAP_BIND_DN'],
        app.config['LDAP_BIND_PW'])


def get_occupants(app, roomNumber):
    if app.config['LDAP_CONN'] is None:
        ldap_init(app)

    ldap_results = app.config['LDAP_CONN'].search_s(
        app.config['LDAP_USER_OU'],
        ldap.SCOPE_SUBTREE,
        "(roomNumber=%s)" % roomNumber,
        ['cn'])

    residents = [r[1]['cn'][0].decode('utf-8') for r in ldap_results]
    return residents
