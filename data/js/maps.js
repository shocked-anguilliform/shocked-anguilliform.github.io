function initializeMap(fileName) {
	getLocationFile(fileName);
}

async function getLocationFile(fileName) {
  let locationsObject = await fetch("/data/mapData/" + fileName + ".txt");
  let locationsText = await locationsObject.text();
  splitLocationFile(locationsText);
}

function splitLocationFile(locationsFile) {
	const locations = String(locationsFile).split("\n");
	for(i = 0; i < locations.length; i++) {
		appendEntries(locations);
	}
}

function appendEntries(locations) {
entry = document.getElementById($.trim(locations[1]));
console.log(entry);
}