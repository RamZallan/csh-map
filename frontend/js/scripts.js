/* regexBldg gets building name from ID
           Ex:  nrh-3-3071  => nrh
                fish-3-3050 => fish
        */
var regexBldg = /([(a-zA-Z)])\w+/g;
/* regexNum gets room # from ID
   Ex:  nrh-3-3071  => 3071
        fish-3-3050 => 3050
*/
var regexNum = /([^(a-zA-Z)-])\w+/g;

function nrhOrFish(id) {
    /*
    Uses regex, checks if id starts with nrh or fish, or something else
    Example IDs:  nrh-3-3071  => isNrh
                  fish-3-3050 => isFish
                  sol-3-3011  => Neither
    */
    var bldg = id.match(regexBldg);
    var num = id.match(regexNum);
    if (bldg == "nrh") {
        outputResidents(num.toString());
    } else if (bldg == "fish") {
        outputResidents("F%20" + num.toString);
    } else {
        console.log("Neither NRH nor Fish");
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




function getResidents(room, callback) {
    url = "https://map.csh.rit.edu/api/get/" + room;
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.onreadystatechange = function () {
        //console.log("GET State: " + request.readyState + " - Status: " + request.status);
        if (request.readyState == 4 && request.status == 200) {
            callback(request);
        }
    }
    request.send(null);
}

function outputResidents(roomNum) {
    getResidents(roomNum, function (data) {
        var parsed_data = JSON.parse(data.responseText);
        if (pased_data[1]) {
            console.log(parsed_data[0] + '\n' + parsed_data[1]);
        } else if (parsed_data[0]) {
            console.log(parsed_data[0]);
        } else {
            console.log('No residents.');
        }
    });
}