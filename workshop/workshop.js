var tf = false;

function initialize() {
}

function myFunction() {
	console.log(tf + 1);
}

function f1() {tf = true;}
function f2() {tf = false;}

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

function writePicture(pictureRaw) {
	console.log("poop");
	const pictures = [];
	if (!pictureRaw || pictureRaw.charAt(0) == "-") {
		pictures.push("noPicture.jpg");
		/*return pictures;*/
	} else {
		let pictureParts = pictureRaw.split(",");
		let picNumber = pictureParts.length;
		console.log(pictureParts.length);
		for (i = 0; i < picNumber; i++) {
			let currentPic = $.trim(pictureParts[i]);
			console.log(currentPic);
		}
	}
	return "noPicture.jpg";
}