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
	document.getElementById("variableImage").firstElementChild.outerHTML = parts.picture;
	document.getElementById("variableName").innerHTML = parts.name;
	document.getElementById("variableText").innerHTML = parts.text;
}

function revealFromClick() {
	console.log("shit balls");
	reveal(this);
}

function hidePopup() {
	document.getElementById("popup").style.display = "none";
	document.getElementById("blackout").style.display = "none";
}

function elemLink(target) {
	reveal(target);
	centered = $(target).offset().top - window.innerHeight / 2;
	$('html, body').animate({
			scrollTop: centered,
			easing: 'ease-in-out'
		}, centered);
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

var multiPicture = false;

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
			var pictures = formatPicture($.trim(entry[1]))
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
				if (article.includes("]")) {
					var firstClose = article.indexOf("]");
				} else {
					break;
				}
				let preLink = article.slice(0, firstStart);
				console.log(preLink);
				let linkChunk = article.slice(firstStart + 1, firstClose);
				let linkParts = linkChunk.split("[");
				console.log(linkChunk);
				let postLink = article.slice(firstClose + 1);
				console.log(postLink);
				article = preLink + "<a onclick='elemLink(" + linkParts[0] + ");'>" + linkParts[1] + "</a>" + postLink;
			}
			/*--------------------------------------------------------------------------------------*/
			let entryElem = document.createElement('div');
			entryElem.className = "entryContainer";
			entryElem.id = id;
			entryElem.addEventListener("onclick", revealFromClick);
			entreElem.onclick = function() {alert('shit balls');};
			entryElem.appendChild(document.createElement('div'));
			entryElem.children[0].className = "entry";
			entryElem.children[0].appendChild(document.createElement('div'));
			entryElem.children[0].children[0].innerHTML = name;
			let tooltip = document.createElement('div');
			tooltip.className = "tooltip";
			tooltip.appendChild(document.createElement('img'));
			if (multiPicture == true) {
				var displayPic = pictures[0].slice(0, pictures[0].indexOf("["));
				console.log(pictures[0]);
			} else {
				var displayPic = pictures[0];
			}
			tooltip.children[0].setAttribute("src", "/data/images/ReferenceList/" + displayPic);
			tooltip.children[0].setAttribute("alt", name);
			tooltip.appendChild(document.createElement('div'));
			tooltip.children[1].className = "innerUp";
			tooltip.children[1].innerHTML = article;
			entryElem.appendChild(tooltip);
			let infoBox = document.createElement('div');
			infoBox.className = "hidden";
			infoBox.appendChild(document.createElement('div'));
			infoBox.innerHTML = multiPicture;
			if (multiPicture = true) {
				for (j = 0; j < pictures.length; j++) {
					let bonusPic = document.createElement('div');
					bonusPic.innerHTML = $.trim(pictures[j].split("[")[0]) + " | " + $.trim(pictures[j].split("[")[1]);
					infoBox.appendChild(bonusPic);
				}
			}
			entryElem.appendChild(infoBox);
			window["subsection"].appendChild(entryElem);
			
			/*--------------------------------------------------------------------------------------*/
			/*content = '<div class="entryContainer"' + idHTML + ' onclick="reveal(this)">\n<div class="entry">\n<div>' + name + '</div>\n</div>\n<div class="tooltip">\n<img src="/data/images/ReferenceList/' + picture + '" alt="' + name + '">\n\<div class="innerUp">\n' + article + '\n</div>\n</div>\n</div>\n'
			window["subsection"].innerHTML += content;*/
	}
}

function formatPicture(pictureRaw) {
	multiPicture = false;
	console.log(pictureRaw);
	const pictures = [];
	let pictureParts = pictureRaw.split(",");
	if (!pictureRaw || pictureRaw.charAt(0) == "-") {
		pictures.push("noPicture.jpg");
	} else if (pictureParts.length > 1) {
		multiPicture = true;
		for (j = 0; j < pictureParts.length; j++) {
			let currentPic = $.trim(pictureParts[j]);
			console.log(currentPic);
			if (currentPic.includes("[") && currentPic.includes("]")) {
				currentPic = currentPic.slice(0, currentPic.indexOf("]"));
			} else {
			currentPic = currentPic + "[picture " + j;
			}
			pictures.push(currentPic);
		}
	} else if (pictureRaw.includes("[")) {
		pictures.push(pictureRaw.slice(0, pictureRaw.indexOf("[")));
	} else {
		pictures.push(pictureRaw);
	}
	console.log(pictures);
	console.log("multi picture: " + multiPicture);
	return pictures;
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
