function initializeMap(fileName) {
	body.addEventListener("onmousemove", getCursorPosition(event));
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
			let entryA = document.getElementById($.trim(chunks[0])).parentNode;
			entryA.addEventListener("mouseover", hoverOn);
		}
	}
}

function hoverOn() {
	d3.select(this).raise();
	d3.select(this.parentNode).raise();
	let titlePopUp = document.getElementById(titlePopUp);
	titlePopUp.innerHTML = this.id;
	titlePopUp.style.left = xCursorPosition;
	titlePopUp.style.top = yCursorPosition;
	titlePopUp.style.display = block;
}

function getCursorPosition(event) {
  var xCursorPosition = event.clientX;
  var yCursorPosition = event.clientY;
}