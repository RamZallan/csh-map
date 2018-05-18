import ldap
from ldap.ldapobject import ReconnectLDAPObject


"""
Inititalizes a connection to the LDAP server
"""
def ldap_init(app):
    app.config['LDAP_CONN'] = ReconnectLDAPObject(app.config['LDAP_URL'])
    app.config['LDAP_CONN'].simple_bind_s(
        app.config['LDAP_BIND_DN'],
        app.config['LDAP_BIND_PW'])


"""
Queries the LDAP server to return a dictionary of
CSHers on floor.
:returns: dictionary where each room number (key)
corresponds to a list of people living in the room.
"""
def get_onfloors(app):
    if app.config['LDAP_CONN'] is None:
        ldap_init(app)

    ldap_results = app.config['LDAP_CONN'].search_s(
        app.config['LDAP_USER_OU'],
        ldap.SCOPE_SUBTREE,
        "(&(objectClass=houseMember)" +
        "(memberof=cn=current_student,cn=groups,cn=account,dc=csh,dc=rit,dc=edu" +
        "(roomNumber=*))",
        ['cn', 'roomNumber'])
    onfloors = {}
    for onfloor in ldap_results:
        cn = onfloor[1]['cn'][0].decode('utf-8')
        roomNumber = onfloor[1]['roomNumber'][0].decode('utf-8')
        if roomNumber in onfloors:
            onfloors[roomNumber] += [cn]
        else:
            onfloors[roomNumber] = [cn]
    return onfloors


def _get_cn_from_dns(app, dns):
    cns = []
    for dn in dns:
        dn = dn.split(',')[0]
        cns += app.config['LDAP_CONN'].search_s(
            app.config['LDAP_USER_OU'],
            ldap.SCOPE_SUBTREE,
            "(%s)" % dn,
            ['cn'])
    return [cn.decode('utf-8') for cn in cns[0][1]['cn']]


"""
Queries the LDAP server to return a dictinary of e-board
members.
:returns: dictionary of e-board directors
"""
def get_eboard(app):
    if app.config['LDAP_CONN'] is None:
        ldap_init(app)

    ldap_results = app.config['LDAP_CONN'].search_s(
        "cn=committees,cn=groups,dc=csh,dc=rit,dc=edu",
        ldap.SCOPE_SUBTREE,
        "(objectClass=Committee)", ['cn', 'head'])
    eboard = {}
    for director in ldap_results:
        cn = director[1]['cn'][0].decode('utf-8')
        head_dns = [dn.decode('utf-8') for dn in director[1]['head']]
        eboard[cn] = _get_cn_from_dns(app, head_dns)
    return eboard


"""
Queries the LDAP server to return a dictionary of group members,
like RTP's and 3DA's
:returns: dictionary of groups and members, where the key is 
the name of the group ("rtp", "3da") and the value is a list
of members in that group.
"""
def get_groups(app):
    if app.config['LDAP_CONN'] is None:
        ldap_init(app)

    groups = {}

    rtp_results = app.config['LDAP_CONN'].search_s(
        "cn=groups,cn=account,dc=csh,dc=rit,dc=edu",
        ldap.SCOPE_SUBTREE,
        "(cn=active_rtp)")[0][1]['member']
    groups['rtp'] = [_get_cn_from_dns(app, [rtp.decode('utf-8')])[0]
        for rtp in rtp_results]

    threedeeayy_results = app.config['LDAP_CONN'].search_s(
        "cn=groups,cn=account,dc=csh,dc=rit,dc=edu",
        ldap.SCOPE_SUBTREE,
        "(cn=3da)")[0][1]['member']
    groups['3da'] = [_get_cn_from_dns(app, [admin.decode('utf-8')])[0]
        for admin in threedeeayy_results]

    return groups
