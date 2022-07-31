function initialize() {
	getLocationFile();
}

function getLocationFile() {
  let locationsText = document.getElementById("div2").innerHTML;
  document.getElementById("div2").style.display = "none";
  getLocationFile2(locationsText);
}

function getLocationFile2(locationsText) {
  let locationsText2 = document.getElementById("div3").innerHTML;
  document.getElementById("div3").style.display = "none";
  splitLocationFiles(locationsText,locationsText2);
}

function splitLocationFiles(locationsFile,locationsFile2) {
	const locations = String(locationsFile).split("\n");
	const locations2 = String(locationsFile2).split("\n");
	for(i = 0; i < locations.length; i++) {
		appendEntries(locations,locations2);
	}
}

function appendEntries(locations,locations2) {;
	let div = document.getElementById("div");
	div.innerHTML += locations[i];
	let locationName = locations2[i].split("|")[0];
	div.innerHTML += " | " + locationName + " <br>\n";
}
