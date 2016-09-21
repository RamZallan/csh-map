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

function setupModal(bldg, num, residents) {
    /*
    Gets the display modal ready with correct resident
    values, awaiting `display: block`.
    */
    $modalTitle.text(bldg + " " + num);
    $modalBody.text(residents);
    console.log(residents);
}

function getResidents(room, callback) {
    /*
    Takes in room (NRH 3071 => "3071", Fish 3050 => "F%203050"),
    makes API call, and uses callback when called to get data.
    */
    var url = "https://map.csh.rit.edu/api/get/" + room,
        request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.onreadystatechange = function () {
        // Uncomment line below when debugging, to check that API calls are working.
        // console.log("GET State: " + request.readyState + " - Status: " + request.status);
        if (request.readyState === 4 && request.status === 200) {
            callback(request);
        }
    };
    request.send(null);
}

function outputResidents(roomNum) {
    /*
    Uses getResidents() w/ room # formatted for API call
    to get and parse the given data. If room has 2 residents,
    2 are returned, with comma; if room has 1 resident, only
    one is returned; returns if room has no residents.
    */
    getResidents(roomNum, function (data) {
        console.log(data);
        var parsed_data = JSON.parse(data.responseText);
        if (parsed_data[1]) {
            return (parsed_data[0] + '\n' + parsed_data[1]);
        } else if (parsed_data[0]) {
            return parsed_data[0];

        } else {
            return 'No residents.';
        }
    });
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
        setupModal(bldg, num, outputResidents(num));
    } else if (bldg === "fish") {
        $modalTitle.css('textTransform', 'capitalize');
        setupModal(bldg, num, outputResidents('F%20' + num));
    } else {
        console.log("ERROR: Room of id" + id + " is neither in NRH nor Fish");
    }

}

$('.room').click(function () {
    /*
    Uses jQuery click function,
    gets ID of clicked element
    and calls nrhOrFish w/ ID.
    */
    nrhOrFish(this.id);
});