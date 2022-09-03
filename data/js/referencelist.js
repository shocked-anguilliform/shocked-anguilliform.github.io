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
	document.getElementById("entryBox").innerHTML += "<div>\n";
	for(i = 0; i < entriesCount; i++) {
		splitEntry(entries);
	}
	document.getElementById("entryBox").innerHTML += "</div>";
	checkInitial();
}

function splitEntry(entries){
	const entry = entries[i].split("|");
	let name = $.trim(entry[0]);
	if (!name) {
		return;
	}
	switch(name.charAt(0)) {
		case "-":
			break;
		case "#":
			name = name.slice(1);
			sectionId = name.split(" ").join("");
			console.log("section " + sectionId +" reached");
			content = '</div>\n<div class="entryHeader" id="' + sectionId + '">\n<span>' + name + '</span>\n<span>⯆</span>\n<div>' + name + '</div>\n</div>\n<div id="' + sectionId + 'Drop">\n'
			document.getElementById("entryBox").innerHTML += content;
			break;
		default:
			let picture = $.trim(entry[1]);
			if (!picture || picture.charAt(0) == "-") {
				picture = "noPicture.jpg";
			}
				if (entry[3]) {
				id = $.trim(entry[3]);
				idHTML = ' id="' + id + '"';
			} else {
				idHTML = "";
			}
			var article = $.trim(entry[2]);
			if (!article || article.charAt(0) == "-") {
				article = "???";
			}
			content = '<div class="entryContainer"' + idHTML + ' onclick="reveal(this)">\n<div class="entry">\n<div>' + name + '</div>\n</div>\n<div class="tooltip">\n<img src="/data/images/ReferenceList/' + picture + '" alt="' + name + '">\n\<div class="innerUp">\n' + article + '\n</div>\n</div>\n</div>\n'
			document.getElementById("entryBox").innerHTML += content;
	}
}

function checkInitial() {
	const urlParams = new URLSearchParams(window.location.search);
	const querryID = urlParams.get('item');
	let source = document.getElementById(querryID)
	if (source) {
		reveal(source);
	}
}