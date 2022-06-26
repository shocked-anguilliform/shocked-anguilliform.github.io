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

function appendEntries(locations) {;
	if (locations[i]) {
		const chunks = locations[i].split("|");
		if (chunks[0].charAt(0) == "-") {
			console.log($.trim(chunks[0]).replace("-", ""));
			document.getElementById($.trim(chunks[0]).substring(1)).style.display = "none";
		} else {
			const chunks = locations[i].split("|");
			entry = document.getElementById($.trim(chunks[0]));
			let clickReaction = 'window.location.href = "/locations?item=' + entry.id + ';';
			console.log(clickReaction);
			/*entry.onclick = function() {window.location.href = "/locations?item=" + entry.id;}*/
			entry.onmouseover = function() {mouseOverReaction(entry);}
			console.log(entry.id);
		}
	} else {
			console.log("error: no such element");
	}
	
}

/*function clickReaction(id) {
	window.location.href = "/locations?item=" + id + "";
}*/

function mouseOverReaction(element) {
	element.style.stroke = "blue!important";
}