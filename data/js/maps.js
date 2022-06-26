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
			if(!entry) {
				console.log("error: no such element");
				return;
			}
			let oldOHTML = entry.outerHTML;
			entry.outerHTML = '<a href="/locations?item=' + entry.id + '">\n' + oldOHTML + '\n</a>'
			entry.onmouseover = function() {
				console.log("mouse on");
				d3.select(this.parentNode).raise();
				console.log(d3.select(this.parentNode));
				d3.select(this.parentNode.parentNode).raise();
				console.log(d3.select(this.parentNode.parentNode));
			}
			console.log(entry.id);
		}
	}
}