/* regexBldg gets building name from ID
           Ex:  nrh-3-3071  => nrh
                fish-3-3050 => fish
   regexNum gets room # from ID
           Ex:  nrh-3-3071  => 3071
           fish-3-3050 => 3050
*/

var regexBldg = /([(a-zA-Z)])\w+/g,
    regexNum = /([^(a-zA-Z)\-])\w+/g;

// Used for convenience, but not neccesary
var $modalTitle = $('#map-modal .modal-title'),
    $modalBody = $("#map-modal .modal-body");

function updateModalTitle(title) {
    /*
    Gets the display modal ready with correct
    values, awaiting `display: block`.
    */
    $modalTitle.text(title);
}

function updateModalBody(html) {
    $modalBody.html("<p>" + html + "</p>");
}

function updateResidents(roomNum) {
    /*
    Uses onfloors w/ room # formatted for dictionary key
    to get and parse the given data. If room has 2 residents,
    2 are returned, with comma; if room has 1 resident, only
    one is returned; returns if room has no residents.
    */
    switch (roomNum) {
        case "3058":
            $modalTitle.css('textTransform', 'capitalize');
            updateModalTitle("Lounge");
            updateModalBody("No residents.");
            break;
        case "3098":
            $modalTitle.css('textTransform', 'capitalize');
            updateModalTitle("User Center");
            updateModalBody("No residents.");
            break;
        case "3034":
        case "3048":
            $modalTitle.css('textTransform', 'capitalize');
            updateModalTitle("Server Room");
            var rtps = groups['rtp'];
            var rtpHTML = "";
            for (var i = 0; i < rtps.length; i++) {
              rtpHTML += rtps[i];
              if (i < rtps.length - 1) {
                rtpHTML += "<br>"
              }
            }
            updateModalBody(rtpHTML);
            break;
        case "3021":
            $modalTitle.css('textTransform', 'capitalize');
            updateModalTitle("Project Room");
            updateModalBody(groups['eboard']['Improvements']);
            break;
        case "3017":
            $modalTitle.css('textTransform', 'capitalize');
            updateModalTitle("Research Room");
            var threedeeayys = groups['3da'];
            var threedeeayyHTML = "";
            for (var i = 0; i < threedeeayys.length; i++) {
              threedeeayyHTML += threedeeayys[i];
              if (i < threedeeayys.length - 1) {
                threedeeayyHTML += "<br>"
              }
            }
            updateModalBody(threedeeayyHTML);
            break;
        case "3012":
            $modalTitle.css('textTransform', 'capitalize');
            updateModalTitle("Luser Center");
            updateModalBody("No residents.");
            break;
        case "3032":
            $modalTitle.css('textTransform', 'capitalize');
            updateModalTitle("Eboard Closet");
            updateModalBody(groups['eboard']['Financial']);
            break;
        case "3028":
            $modalTitle.css('textTransform', 'capitalize');
            updateModalTitle("Janitorial Closet");
            updateModalBody("Mike");
            break;
        case "3008":
            $modalTitle.css('textTransform', 'capitalize');
            updateModalTitle("Social Closet");
            let social = groups['eboard']['Social'];
            if (social[1]) {
                // dual directorship
                updateModalBody(social[0] + '<br>' + social[1]);
            } else {
                updateModalBody(social[0]);
            }
            break;
        case "3120":
            $modalTitle.css('textTransform', 'capitalize');
            updateModalTitle("SS Networking");
            updateModalBody("<del>ssn@csh.rit.edu</del>");
            break;
        case "3124":
            $modalTitle.css('textTransform', 'capitalize');
            updateModalTitle("Software Room");
            updateModalBody("No residents.");
            break;
        case "3950":
            $modalTitle.css('textTransform', 'capitalize');
            updateModalTitle("Elevator");
            updateModalBody("No residents.");
            break;
        case "3080":
            $modalTitle.css('textTransform', 'capitalize');
            updateModalTitle("Trash Room");
            updateModalBody("Ram Zallan");
            break;
        case "3078":
            $modalTitle.css('textTransform', 'capitalize');
            updateModalTitle("Library");
            updateModalBody(groups['eboard']['History']);
            break;
        case "3082":
            $modalTitle.css('textTransform', 'capitalize');
            updateModalTitle("Kitchen");
            updateModalBody("Dyllon Chowdhury");
            break;
        case "F%203961":
        case "3961":
        case "3960":
        case "3962":
            $modalTitle.css('textTransform', 'capitalize');
            updateModalTitle("Staircase");
            updateModalBody("No residents.");
            break;
        case "F 3023":
        case "F 3018":
        case "3047":
        case "3025":
        case "3075":
        case "3087":
        case "3115":
        case "3121":
            $modalTitle.css('textTransform', 'capitalize');
            updateModalTitle("Restroom");
        default:
            residents = onfloors[roomNum];
            if (typeof(residents) == 'undefined') {
              updateModalBody('No residents.');
            } else if (residents[1]) {
              updateModalBody(residents[0] + '<br>' + residents[1]);
            } else {
              updateModalBody(residents[0]);
            }
            break;
    }
}

function nrhOrFish(id) {
    /*
    Uses regex, checks if id starts with nrh or fish, or something else
    Example IDs:  nrh-3-3071  => isNrh
                  fish-3-3050 => isFish
                  sol-3-3011  => Neither
    */
    var bldg = id.match(regexBldg).toString(),
        num = id.match(regexNum).toString();
    if (bldg === "nrh") {
        $modalTitle.css('textTransform', 'uppercase');
        updateModalBody("Loading...");
        updateModalTitle(bldg + " " + num);
        updateResidents(num);
    } else if (bldg === "fish") {
        $modalTitle.css('textTransform', 'capitalize');
        updateModalBody("Loading...");
        updateModalTitle(bldg + " " + num);
        updateResidents('F ' + num);
    } else {
        console.log("ERROR: Room of id " + id + " is neither in NRH nor Fish");
    }
}

$('.room').click(function() {
    /*
    Uses jQuery click function,
    gets ID of clicked element
    and calls nrhOrFish w/ ID.
    */
    nrhOrFish(this.id);
});


$('#search-button').click(function(e) {
    e.preventDefault();
    query = $('#search').val().replace(/\s+/g, '-').toLowerCase();
    var bldg = query.match(regexBldg),
        num = query.match(regexNum);
        id = ('#' + bldg + "-3-" + num).toString();  // Concatenates the bldg name and room num to a searcheable ID
    if ((bldg == "nrh" || bldg == "fish") && ($(id).length)) {  // Checks if the building is NRH/Fish, and if the room exists on the map
        nrhOrFish(query);
        $('#map-modal').modal('show');
    }
    else {
        $('#search').attr('data-content', 'Room not found.\nExample searches: NRH 3071, Fish 3049').popover('show').popover('disable');
    }
});
