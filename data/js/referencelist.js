function reveal(source) {
  let children = source.children;
  const parts = {};
  parts.name = children[0].children[0].innerHTML;
  parts.picture = children[1].children[0].outerHTML;
  parts.text = children[1].children[1].innerHTML;
  document.getElementById("popup").style.display = "block";
  document.getElementById("blackout").style.display = "block";
  document.getElementById("variableImage").innerHTML = parts.picture;
  document.getElementById("variableName").innerHTML = parts.name;
  document.getElementById("variableText").innerHTML = parts.text;
}

function hidePopup() {
  document.getElementById("popup").style.display = "none";
  document.getElementById("blackout").style.display = "none";
}

async function getListItems(list) {
  let listObject = await fetch("/data/reference/" + list + ".txt");
  let listText = await listObject.text();
  addEntries(listText);
}

function addEntries(entryFile){
	const entries = String(entryFile).split("\n");
	var entriesCount = entries.length;
	for(i = 0; i < entriesCount; i++) {
		splitEntry(entries);
	}
	checkInitial();
}

function splitEntry(entries){
	const entry = entries[i].split("|");
	if (entry[0].charAt(0) == "-") {
		return;
	}
	let name = $.trim(entry[0]);
	if (!name) {
		return;
	}
	let picture = $.trim(entry[1]);
	if (!picture) {
		picture = "noPicture.jpg";
	}
		if (entry[3]) {
		id = $.trim(entry[3]);
		idHTML = ' id="' + id + '"';
	} else {
		idHTML = "";
	}
	content = writeHTML($.trim(entry[0]), picture, $.trim(entry[2]), idHTML);
	document.getElementById("entryBox").innerHTML += content;
}

function writeHTML(name, picture, article, idHTML) {
	content = '<div class="entryContainer"' + idHTML + ' onclick="reveal(this)">\n<div class="entry">\n<a>' + name + '</a>\n</div>\n<div class="tooltip">\n<img src="/data/images/ReferenceList/' + picture + '" alt="' + name + '">\n\<div class="innerUp">\n' + article + '\n</div>\n</div>\n</div>'
	return content;
}

function checkInitial() {
	const urlParams = new URLSearchParams(window.location.search);
	const querryID = urlParams.get('item');
	let source = document.getElementById("querryID")
	reveal (source);
}