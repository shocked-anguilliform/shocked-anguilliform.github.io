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
const chunks = locations[i].split("|");
entry = document.getElementById($.trim(chunks[0]));
entry.onclick = function() {clickReaction(entry.id);}
entry.onmouseover = function() {mouseOverReaction(entry);}
console.log(entry.id);
}

function clickReaction(id) {
	window.location.href = "/locations?item=" + id + "";
}

function mouseOverReaction(element) {
	element.style.stroke = blue!important;
}