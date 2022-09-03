function reveal(source) {
	let parent = source.parentNode;
	if (parent.style.display == "none") {
		sectionToggle(parent.previousElementSibling, parent.id);
	}
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

function elemLink(targetId) {
	reveal(document.getElementById(targetId));
}

function sectionToggle(source, targetId) {
	console.log(source);
	let target = document.getElementById(targetId);
	if (target.style.display == "none") {
		source.children[1].innerHTML = "⯆";
		target.style.display = "block";
	} else {
		source.children[1].innerHTML = "⯅";
		target.style.display = "none";
	}
}

async function getListItems(list) {
	let listObject = await fetch("/data/reference/" + list + ".txt");
	let listText = await listObject.text();
	addEntries(listText);
}

function addEntries(entryFile){
	const entries = String(entryFile).split("\n");
	let entriesCount = entries.length;
	window["subsection"] = document.createElement('div');
	console.log(window["subsection"]);
	document.getElementById("entryBox").appendChild(window["subsection"]);
	for (i = 0; i < entriesCount; i++) {
		splitEntry(entries);
	}
	checkInitial();
}

function splitEntry(entries){
	const entry = entries[i].split("|");
	let name = $.trim(entry[0]);
	if (!name) {
		return;
	}
	switch (name.charAt(0)) {
		case "-":
			break;
		case "#":
			name = name.slice(1);
			sectionId = name.split(" ").join("");
			console.log("section " + sectionId +" reached");
			content = '</div>\n<div class="entryHeader" id="' + sectionId + '" onclick="sectionToggle(this, \'' + sectionId + 'Drop\')">\n<span>' + name + '</span>\n<span>⯅</span>\n<div>' + name + ' <span>⯆</span></div>\n</div>\n'
			document.getElementById("entryBox").innerHTML += content;
			window["subsection"] = document.createElement('div');
			window["subsection"].id = sectionId + "Drop";
			window["subsection"].style.display = "none";
			console.log(window["subsection"]);
			document.getElementById("entryBox").appendChild(window["subsection"]);
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
			while (article.includes("@")) {
				console.log(article);
				let firstStart = article.indexOf("@");
				if article.includes("]") {
					let firstClose = article.indexOf("]");
				} else {
					break;
				}
				let preLink = article.slice(0, firstStart - 1);
				console.log(preLink);
				let linkSec = article.slice(firstStart, firstClose);
				console.log(linkSec);
				let postLink = article.slice(firstClose);
				console.log(postLink);
				article = preLink + postLink;
			}
			content = '<div class="entryContainer"' + idHTML + ' onclick="reveal(this)">\n<div class="entry">\n<div>' + name + '</div>\n</div>\n<div class="tooltip">\n<img src="/data/images/ReferenceList/' + picture + '" alt="' + name + '">\n\<div class="innerUp">\n' + article + '\n</div>\n</div>\n</div>\n'
			window["subsection"].innerHTML += content;
	}
}

function checkInitial() {
	const urlParams = new URLSearchParams(window.location.search);
	const querryID = urlParams.get('item');
	let source = document.getElementById(querryID)
	if (source) {
		reveal(source);
		centered = $("#" + querryID).offset().top - window.innerHeight / 2;
		console.log(centered);
		$('html, body').animate({
			scrollTop: centered,
			easing: 'ease-in-out'
		}, centered);
	}
}