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
	if (locations[i]) {
		const chunks = locations[i].split("|");
		if (chunks[0].charAt(0) == "-") {
			document.getElementById($.trim(chunks[0]).substring(1)).style.display = "none";
		} else {
			const chunks = locations[i].split("|");
			entry = document.getElementById($.trim(chunks[0]));
			if(!entry) {
				console.log("error: no such element");
				return;
			}
			console.log(entry.id);
			console.log(chunks[1]);
			if (chunks[1]) {
				window['Elm' + entry.id] = chunks[1];
				console.log(window[entry.id]);
			} else {
				window['Elm' + entry.id].name = "???";
				console.log('error: nameless entry "' + entry.id + '"');
			}
			let oldOHTML = entry.outerHTML;
			entry.outerHTML = '<a href="/locations?item=' + entry.id + '">\n' + oldOHTML + '\n</a>'
			let entryA = document.getElementById($.trim(chunks[0])).parentNode;
			entryA.addEventListener("mouseover", hoverOn);
			entryA.addEventListener("mouseout", hoverOff);
		}
	}
}

function hoverOn() {
	d3.select(this).raise();
	d3.select(this.parentNode).raise();
	let titleBox = document.getElementById("titlePopUp");
	console.log('Elm' + this.children[0].id);
	titleBox.innerHTML = window['Elm' + this.children[0].id];
	titleBox.style.transition = "visibility 0s, opacity 0s";
	titleBox.style.visibility = "visible";
	titleBox.style.opacity = "1";
}

function hoverOff() {
	let titleBox = document.getElementById("titlePopUp");
	titleBox.style.transition = "visibility 0.2s, opacity 0.2s";
	titleBox.style.visibility = "hidden";
	titleBox.style.opacity = "0";
}

function movePopUp(event) {
	let titleBox = document.getElementById("titlePopUp");
	getCursorPosition(event);
	titleBox.style.left = window.xCursorPosition + "px";
	titleBox.style.top = window.yCursorPosition + "px";
}
	
function getCursorPosition(event) {
	window.xCursorPosition = event.clientX;
	window.yCursorPosition = event.clientY;
}