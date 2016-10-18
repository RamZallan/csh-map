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

function getResidents(room, callback) {
    /*
    Takes in room (NRH 3071 => "3071", Fish 3050 => "F%203050"),
    makes API call, and uses callback when called to get data.
    */
    $.ajax({
        type: 'GET',
        url: "get/" + room,
        dataType: 'json'
    }).success(callback);
}

function updateResidents(roomNum) {
    /*
    Uses getResidents() w/ room # formatted for API call
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
            updateModalBody("Jordan Rodgers<br>Liam Middlebrook<br>Marc Billow<br>James Forcier<br>Steven Mirabito");
            break;
        case "3021":
            $modalTitle.css('textTransform', 'capitalize');
            updateModalTitle("Project Room");
            updateModalBody("Zach Hart");
            break;
        case "3017":
            $modalTitle.css('textTransform', 'capitalize');
            updateModalTitle("Research Room");
            updateModalBody("Trevor Sherrard<br>Spencer Kulbacki<br>Marc Billow<br>Drew Gottlieb<br>Colin O'Neill<br>Maxime Bourgeois");
            break;
        case "3012":
            $modalTitle.css('textTransform', 'capitalize');
            updateModalTitle("Luser Center");
            updateModalBody("No residents.");
            break;
        case "3032":
            $modalTitle.css('textTransform', 'capitalize');
            updateModalTitle("Eboard Closet");
            updateModalBody("Andrew Closet");
            break;
        case "3028":
            $modalTitle.css('textTransform', 'capitalize');
            updateModalTitle("Janitorial Closet");
            updateModalBody("Mike");
            break;
        case "3008":
            $modalTitle.css('textTransform', 'capitalize');
            updateModalTitle("Social Closet");
            updateModalBody("Rose Hacker");
            break;
        case "3120":
            $modalTitle.css('textTransform', 'capitalize');
            updateModalTitle("SS Networking");
            updateModalBody("ssn@csh.rit.edu");
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
            updateModalBody("Marc Billow");
            break;
        case "3078":
            $modalTitle.css('textTransform', 'capitalize');
            updateModalTitle("Library");
            updateModalBody("Braden Bowdish");
            break;
        case "F%203961":
        case "3961":
        case "3960":
        case "3962":
            $modalTitle.css('textTransform', 'capitalize');
            updateModalTitle("Staircase");
            updateModalBody("No residents.");
            break;
        case "F%203023":
        case "F%203018":
        case "3047":
        case "3025":
        case "3075":
        case "3087":
        case "3115":
        case "3121":
            $modalTitle.css('textTransform', 'capitalize');
            updateModalTitle("Restroom");
        default:
            getResidents(roomNum, function(data) {
                if (data[1]) {
                    updateModalBody(data[0] + '<br>' + data[1]);
                } else if (data[0]) {
                    updateModalBody(data[0]);
                } else {
                    updateModalBody('No residents.');
                }
            });
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
        updateResidents('F%20' + num);
    } else {
        console.log("ERROR: Room of id" + id + " is neither in NRH nor Fish");
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