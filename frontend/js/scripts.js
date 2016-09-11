function getResidents(room, callback) {
	url = "https://map.csh.rit.edu/api/get/" + room;
	var request = new XMLHttpRequest();
	request.open("GET", url, true);
	request.onreadystatechange = function () {
		console.log("GET State: " + request.readyState + " - Status: " + request.status);
		if (request.readyState == 4 && request.status == 200) {
			callback(request);
		}
	}
	request.send(null);
}

getResidents("3071", function(data) {
    alert(data);
});