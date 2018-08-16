import csh_ldap


"""
Returns a list of Common Names (i.e. "Ram Zallan") of members in a given group
"""
def _ldap_get_group_members(app, group):
    return [member.cn for member in app.config['LDAP_CONN'].get_group(group).get_members()]


"""
Inititalizes a connection to the LDAP server using csh_ldap
"""
def ldap_init(app):
    app.config['LDAP_CONN'] = csh_ldap.CSHLDAP(app.config['LDAP_BIND_DN'], app.config['LDAP_BIND_PW'], ro=True)



"""
Queries the LDAP server to return a dictionary of
CSHers on floor.
:returns: dictionary where each room number (key)
corresponds to a list of CNs of people living in the room.
"""
def get_onfloors(app):
    if app.config['LDAP_CONN'] is None:
        ldap_init(app)

    members = [member for member in app.config['LDAP_CONN'].get_group("current_student").get_members()]

    parsed = dict()

    for member in members:
        if member.roomNumber:
            if member.roomNumber in parsed:
                # one roommate already listed
                parsed[member.roomNumber].append(member.cn)
            else:
                parsed[member.roomNumber] = [member.cn]

    return parsed


"""
Constructs a dictionary of form
{ "Director Tilte": "Common Name of Director", ... }
i.e. { "Chairman": "Dan Giaime", "Evaluations": "Devin Matte", ... }
"""
def _ldap_construct_eboard_dictionary(app):
    return {
        "Chairman": _ldap_get_group_members(app, "eboard-chairman"),
        "Evaluations":_ldap_get_group_members(app, "eboard-evaluations"),
        "Financial": _ldap_get_group_members(app, "eboard-financial"),
        "History": _ldap_get_group_members(app, "eboard-history"),
        "Improvements": _ldap_get_group_members(app, "eboard-imps"),
        "Opcomm": _ldap_get_group_members(app, "eboard-opcomm"),
        "R&D": _ldap_get_group_members(app, "eboard-research"),
        "Social": _ldap_get_group_members(app, "eboard-social"),
        "Secretary": _ldap_get_group_members(app, "eboard-secretary")
    }


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

    groups['rtp'] = _ldap_get_group_members(app, "active_rtp")

    groups['3da'] = _ldap_get_group_members(app, "3da")

    groups['eboard'] = _ldap_construct_eboard_dictionary(app)

    return groups