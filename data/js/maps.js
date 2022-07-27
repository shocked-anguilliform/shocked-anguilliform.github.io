function initializeMap(fileName) {
	mapBoxes = document.querySelectorAll(".mapContainer");
	console.log(mapBoxes);
	mapBoxes.forEach(box => {
		box.addEventListener("mousemove", getCursorPosition(event));
		console.log(box);
	});
	document.body.addEventListener("mousemove", getCursorPosition(event));
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
			entryA.addEventListener("mouseover", hoverOn(event));
		}
	}
}

function hoverOn(event) {
	d3.select(this).raise();
	d3.select(this.parentNode).raise();
	let cursorX = event.clientX;
	let cursorY = event.clientY;
	let titleBox = document.getElementById("titlePopUp");
	titleBox.innerHTML = this.children[0].id;
	titleBox.style.left = cursorX;
	titleBox.style.top = cursorY;
	titleBox.style.display = "block";
}

function getCursorPosition(event) {
	window.xCursorPosition = event.clientX;
	window.yCursorPosition = event.clientY;
	console.log("ping");
}