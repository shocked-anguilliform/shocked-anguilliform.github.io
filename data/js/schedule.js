console.log("hee-hee hoo-hoo");

/*DEBUG*/
{
function debug (state) {
	if (state == "on") {
		let debugDiv = document.createElement("div");
		debugDiv.id = "debug"
		document.body.insertBefore(debugDiv, document.body.firstElementChild);
		debugDiv.appendChild(document.createElement("div"));
		debugDiv.appendChild(document.createElement("div"));
		debugDiv.appendChild(document.createElement("div"));
		debugDiv.appendChild(document.createElement("div"));
		debugDiv.appendChild(document.createElement("div"));
		window[debug] = setInterval(updateDebug, 100);
		return "Debug operational";
	} else if (document.getElementById("debug")) {
		clearInterval(window[debug]);
		document.getElementById("debug").remove();
		return "Debug stopped";
	}
}

function updateDebug() {
	let debugDiv = document.getElementById("debug");
	let shareBox = debugDiv.firstElementChild;
	shareBox.innerHTML = "<b>P1S1's shared blocks: " + window["share1S1"].toString() + "</b>";
	shareBox.innerHTML += "<b><br>P1S2's shared blocks: " + window["share1S2"].toString() + "</b>";
	shareBox.innerHTML += "<b><br>P2S1's shared blocks: " + window["share2S1"].toString() + "</b>";
	shareBox.innerHTML += "<b><br>P2S2's shared blocks: " + window["share2S2"].toString() + "</b>";
	let box1 = debugDiv.children[1];
	let box2 = debugDiv.children[2];
	let box3 = debugDiv.children[3];
	let box4 = debugDiv.children[4];
	let p1s1c = document.getElementById("ddP1S1").children[2].children
	box1.innerHTML = "<b>P1S1 obstructions:</b>"
	for (i = 1; i < p1s1c.length; i++) {box1.innerHTML += "<br><b>" + p1s1c[i].getAttribute("obstructions") + "</b>&nbsp;&nbsp; " + p1s1c[i].innerHTML;}
	box1.innerHTML = box1.innerHTML.replace(/null/g, "-");
	let p1s2c = document.getElementById("ddP1S2").children[2].children
	box2.innerHTML = "<b>P1S2 obstructions:</b>"
	for (i = 1; i < p1s2c.length; i++) {box2.innerHTML += "<br><b>" + p1s2c[i].getAttribute("obstructions") + "</b>&nbsp;&nbsp; " + p1s2c[i].innerHTML;}
	box2.innerHTML = box2.innerHTML.replace(/null/g, "-");
	let p2s1c = document.getElementById("ddP2S1").children[2].children
	box3.innerHTML = "<b>P2S1 obstructions:</b>"
	for (i = 1; i < p2s1c.length; i++) {box3.innerHTML += "<br><b>" + p2s1c[i].getAttribute("obstructions") + "</b>&nbsp;&nbsp; " + p2s1c[i].innerHTML;}
	box3.innerHTML = box3.innerHTML.replace(/null/g, "-");
	let p2s2c = document.getElementById("ddP2S2").children[2].children
	box4.innerHTML = "<b>P2S2 obstructions:</b>"
	for (i = 1; i < p2s2c.length; i++) {box4.innerHTML += "<br><b>" + p2s2c[i].getAttribute("obstructions") + "</b>&nbsp;&nbsp; " + p2s2c[i].innerHTML;}
	box4.innerHTML = box4.innerHTML.replace(/null/g, "-");
}
/*END DEBUG*/
}

function selectClass (mode, targetValue, targetID, doubleClass, day, others) {
	let group = document.getElementById("period" + targetID);
	let primaryDropdown = event.target.parentNode.parentNode;
	primaryDropdown.firstElementChild.value = targetValue;
	primaryDropdown.firstElementChild.title = targetValue;
	primaryDropdown.classList.add("selectExempt");
	primaryDropdown.setAttribute("pointer", group.id);
	for (i = 0; i < others.length; i++) {
		let secondaryDropdown = document.getElementById("ddP" + others[i]);
		secondaryDropdown.firstElementChild.value = targetValue;
		secondaryDropdown.firstElementChild.title = targetValue;
		secondaryDropdown.classList.add("selectExempt");
		secondaryDropdown.setAttribute("pointer", group.id);
	}
	group.style.opacity = "1";
	group.style.visibility = "visible";
	switch (mode) {
		case "half":
			Array.from(group.children).forEach((child) => {
				child.classList.add("halfYear");
				child.classList.remove("twoPeriodA", "twoPeriodB");
				if (doubleClass) {
					child.classList.add("twoPeriod" + day);
				}
			});
			break;
		case "full":
			Array.from(group.children).forEach((child) => {
				child.classList.remove("halfYear", "twoPeriodA", "twoPeriodB");
				if (doubleClass) {
					child.classList.add("twoPeriod" + day);
				}
			});	
			break;
	}
	
	let selector = ".requires" + targetID;
	others.forEach((other) => {selector = selector + ", .requires" + other});
	document.querySelectorAll(selector).forEach ((course) => {
		if (!course.parentNode.parentNode.classList.contains("selectExempt")) {
			course.classList.add("forbidden");
			/*console.log("blocked " + course.innerHTML + " under " + course.parentNode.parentNode.id);*/
			course.setAttribute("obstructions", parseInt(course.getAttribute("obstructions")) + 1);
		}
	});
	document.querySelectorAll(".selectExempt").forEach((exempt) => {exempt.classList.remove("selectExempt")});
	/*v code to set text fields in calendar v*/
	let idPlusName = targetValue.split(" - ", 2);
	let courseID = idPlusName[0];
	let courseName = idPlusName[1];
	let timeText = getPeriodStart(parseInt(targetID.charAt(0))) + " - " + getPeriodEnd(parseInt(targetID.charAt(0)) + doubleClass);
	courseNameSpaces = (courseName.match(/ /g) || []).length;
	let blockType = doubleClass + (parseInt(day, 36) - 10) * 2;
	let maxLines = undefined;
	switch (blockType) {
		case 0:
			maxLines = (mode == "full" ? 1 : 2);
			break;
		case 1:
			maxLines = 4;
			break;
		case 2:
			maxLines = 2;
			break;
		case 3:
			maxLines = 7;
			break;
	}
	timeText = (maxLines > 2 ? splitByWord(timeText, 2).join(" ") : splitByWord(timeText, 1).join(" "));
	bodyText = (courseNameSpaces < maxLines ? courseName : splitByWord(courseName, maxLines).join(" "));
	Array.from(group.querySelectorAll(".markerTextField")).forEach((field) => {
		field.firstElementChild.children[1].innerHTML = timeText;
		field.firstElementChild.children[2].innerHTML = bodyText;
		field.firstElementChild.children[0].innerHTML = courseID;
		field.firstElementChild.children[1].title = timeText.replace(/&nbsp;/g, " ");
		field.firstElementChild.children[2].title = bodyText.replace(/&nbsp;/g, " ");
		field.firstElementChild.children[0].title = courseID;
		field.firstElementChild.title = bodyText.replace(/&nbsp;/g, " ");
		if (mode == "half"/* && (blockType == 0 || blockType == 2)*/) {
			if (blockType == 0) {
				field.firstElementChild.children[1].style.fontSize = "0.6rem";
				field.firstElementChild.children[0].style.fontSize = "0.6rem";
				field.firstElementChild.children[0].style.top = "calc(100% - 0.5rem)";
			} else {
				
				field.firstElementChild.children[1].style.fontSize = "0.8rem";
				field.firstElementChild.children[0].style.fontSize = "0.8rem";
				field.firstElementChild.children[0].style.top = "calc(100% - 0.8em)";
			}
			field.firstElementChild.children[2].style.fontSize = "0.8rem";
		} else {
			field.firstElementChild.children[1].style.fontSize = "0.8rem";
			field.firstElementChild.children[2].style.fontSize = "1rem";
			field.firstElementChild.children[0].style.top = "calc(100% - 0.8rem)";
		}
	});
}

function splitByWord(string, splits) { /*Based on code from Göran Andersson on Stack Exchange. Bless*/
	let output = [];
	for (i = 0; i < splits; i++) {
		if (i !== splits - 1) {
			let middle = Math.floor(string.length / (splits - i));
			let before = string.lastIndexOf(' ', middle);
			let after = string.indexOf(' ', middle + 1);

			middle = (before == -1 || (after != -1 && middle - before >= after - middle) ? after : before);
			output.push(string.substr(0, middle).replace(/ /g, "&nbsp;"));
			string = string.substr(middle + 1);
		} else {
			output.push(string.replace(/ /g, "&nbsp;"));
		}
	}
	return output.filter(x => x);
}

function clear(targetID) {
	/*event.target.parentNode.parentNode.firstElementChild.value = "";
	event.target.parentNode.parentNode.firstElementChild.title = event.target.parentNode.parentNode.firstElementChild.placeholder;*/
	let clearList = window["share" + targetID];
	clearList.push(targetID);
	clearList.forEach((potentialClear) => {
		if (!document.getElementById("ddP" + potentialClear).firstElementChild.value) {
			clearList.splice(clearList.indexOf(potentialClear), 1);
		}
	});
	clearList.forEach((shareID) => {
		let dropdown = document.getElementById("ddP" + shareID);
		dropdown.classList.add("clearExempt");
	});
	clearList.forEach((shareID) => {
		window["share" + shareID] = [];
		let dropdown = document.getElementById("ddP" + shareID);
		/*console.log(dropdown);*/
		dropdown.firstElementChild.value = "";
		dropdown.firstElementChild.title = dropdown.firstElementChild.placeholder;
		dropdown.setAttribute("pointer", "none");
		document.getElementById("period" + shareID).style.transition = "0.05s cubic-bezier(0.15, 0.4, 0.25, 0.4)";
		document.getElementById("period" + shareID).style.opacity = "0";
		document.getElementById("period" + shareID).style.visibility = "hidden";
	setTimeout(() => {document.getElementById("period" + shareID).style.transition = "0.2s cubic-bezier(0.15, 0.6, 0.6, 1)";}, 50);
		/*code to remove forbidden and reduce obstruction*/
		document.querySelectorAll(".requires" + shareID).forEach((course) => {
			if (!course.parentNode.parentNode.classList.contains("clearExempt") && !course.classList.contains("cleared")) {
				/*console.log("clearing course listed under " + course.parentNode.parentNode.id);*/
				let currentObstructions = parseInt(course.getAttribute("obstructions"));
				if (currentObstructions > 0) {
					course.setAttribute("obstructions", currentObstructions - 1);
					/*console.log("removed obstruction from " + course.innerHTML);*/
				}
				if (parseInt(course.getAttribute("obstructions")) == 0) {course.classList.remove("forbidden");}
				/*if (parseInt(course.getAttribute("obstructions")) == 0) {console.log("unblocked " + course.innerHTML + " under " + course.parentNode.parentNode.id);}*/
				course.classList.add("cleared");
			}
			/*if (course.parentNode.parentNode.classList.contains("clearExempt")) {
				console.log("avoided clearing course listed under " + course.parentNode.parentNode.id)
			}*/
		});
	});
	document.querySelectorAll(".clearExempt").forEach((exempt) => {exempt.classList.remove("clearExempt")});
	document.querySelectorAll(".cleared").forEach((exempt) => {exempt.classList.remove("cleared")});
}

async function getClasses(courses) {
	let coursesObject = await fetch("/data/reference/" + courses + ".txt");
	let coursesText = await coursesObject.text();
	initializeDropdown();
	createMarkers();
	addOptions(coursesText);
}

function initializeDropdown() {
	let allDropdowns = document.querySelectorAll(".dropdown");
	allDropdowns.forEach((dropdown) => {
		dropdown.addEventListener('click', event => {
			if($(event.target).is("input")) {
				event.target.parentNode.classList.toggle('down');
			}
		});
		dropdown.firstElementChild.addEventListener('blur', event => {
			event.target.parentNode.classList.remove('down');
		});
	});
	for (i = 1; i < 11; i++) {
		for (j = 1; j < 3; j++) {
			window["share" + i + "S" + j] = [];
		}
	}
	let strokeText = "stroke-width: 4.5;";
	document.querySelectorAll(".dropdown input").forEach((dropdown) => {
		dropdown.addEventListener("mouseover", () => {
			let pointer = event.target.parentNode.getAttribute("pointer");
			if (pointer !== "none"/* && (document.querySelectorAll(".dropdown.down").length == 0 || event.target.parentNode.classList.contains("down"))*/) {
				document.getElementById(pointer).style.stroke = "rgb(166, 63, 206)";
				document.getElementById(pointer).style.cssText += strokeText;
			}
		});
		dropdown.addEventListener("mouseout", () => {
			let pointer = event.target.parentNode.getAttribute("pointer");
			if (pointer !== "none") {
				document.getElementById(pointer).style.stroke = "#777";
				document.getElementById(pointer).style.cssText = document.getElementById(pointer).style.cssText.replace(strokeText, "");
			}
		});
	});
}

function createMarkers() {
		let ns = "http://www.w3.org/2000/svg";
		for (i = 1; i < 7; i++) {
			createPeriodMarker("20%", 1, "S1", 0, true, "#6398");
			createPeriodMarker("10%", 1, "S2", 10, true, "#6398");
		}
		for (i = 7; i < 11; i++) {
			createPeriodMarker("20%", 1.5, "S1", 20, false, "#6398");
			createPeriodMarker("10%", 1.5, "S2", 30, false, "#6398");
		}
		let tempMarker = document.createElementNS(ns, "rect");
		tempMarker.id = "tempMarker";
		tempMarker.setAttribute("rx", "15");
		let clone = document.createElementNS(ns, "use");
		clone.setAttribute("href", "#tempMarker");
		clone.setAttribute("x", "40%");
		let clone2 = document.createElementNS(ns, "use");
		clone2.setAttribute("href", "#tempMarker");
		clone2.setAttribute("x", "80%");
		clone2.id = "tempMarkerSecondClone"
		let markerContainer = document.getElementById("markers");
		markerContainer.appendChild(tempMarker);
		markerContainer.appendChild(clone);
		markerContainer.appendChild(clone2);
}

function createPeriodMarker (width, heightFactor, semester, offset, secondClone, color) {
	let markerContainer = document.getElementById("markers");
	let ns = "http://www.w3.org/2000/svg";
	let id = "period" + i + semester;
	let start = getPeriodStartValue(i);
	let masterGroup = document.createElementNS(ns, "g");
	masterGroup.id = id;
	masterGroup.setAttribute("class", "masterMark");
	let master = document.createElementNS(ns, "rect");
	let alien = document.createElementNS(ns, "foreignObject");
	let alien2 = document.createElementNS(ns, "foreignObject");
	let alien3 = undefined;
	let template = [master, alien, alien2];
	if (secondClone) {
		alien3 = document.createElementNS(ns, "foreignObject");
		template.push(alien3);
	}
	master.setAttribute("rx", "15");
	template.forEach((section) => {
		section.setAttribute("x", "calc(" + offset + "% + 0.075rem)");
		section.setAttribute("y", start + "%");
		section.setAttribute("height", 100 / 9 * heightFactor + "%");
		section.setAttribute("width", "calc(" + width + " - 0.15rem)");
		masterGroup.appendChild(section);
	});
	template.slice(1).forEach((copy) => {
		copy.setAttribute("class", "markerTextField");
		let contents = document.createElement("div");
		contents.setAttribute("class", "markerTextContents");
		let idDiv = document.createElement("div");
		idDiv.setAttribute("class", "markerID");
		contents.appendChild(idDiv);
		let titleDiv = document.createElement("div");
		titleDiv.setAttribute("class", "markerTitle");
		contents.appendChild(titleDiv);
		let bodyDiv = document.createElement("div");
		bodyDiv.setAttribute("class", "markerBody");
		contents.appendChild(bodyDiv);
		copy.appendChild(contents);
	});
	let clone = document.createElementNS(ns, "use");
	clone.setAttribute("href", "#" + id);
	clone.setAttribute("x", "40%");
	alien2.setAttribute("x", 40 + offset + "%");
	markerContainer.appendChild(clone);
	if (secondClone) {
		let clone2 = document.createElementNS(ns, "use");
		clone2.setAttribute("href", "#" + id);
		clone2.setAttribute("x", "80%");
		alien3.setAttribute("x", 80 + offset + "%");
		markerContainer.appendChild(clone2);
	}
	markerContainer.appendChild(masterGroup);
}

function getPeriodStartValue(period) {
	switch (period) {
		case 1:
			return (100 / 9) * (0/6);
			break;
		case 2:
			return (100 / 9) * (8/6);
			break;
		case 3:
			return (100 / 9) * (16/6);
			break;
		case 4:
			return (100 / 9) * (32/6);
			break;
		case 5:
			return (100 / 9) * (40/6);
			break;
		case 6:
			return (100 / 9) * (48/6);
			break;
		case 7:
			return (100 / 9) * (2/6);
			break;
		case 8:
			return (100 / 9) * (13/6);
			break;
		case 9:
			return (100 / 9) * (32/6);
			break;
		case 10:
			return (100 / 9) * (43/6);
			break;
	}
}

function getPeriodStart(period) {
	switch (period) {
		case 1:
			return "8:00 am";
			break;
		case 2:
			return "9:20 am";
			break;
		case 3:
			return "10:40 am";
			break;
		case 4:
			return "1:20 pm";
			break;
		case 5:
			return "2:40 pm";
			break;
		case 6:
			return "4:00 pm";
			break;
		case 7:
			return "8:20 am";
			break;
		case 8:
			return "10:10 am";
			break;
		case 9:
			return "1:20 pm";
			break;
		case 10:
			return "3:10 pm";
			break;
	}
}

function getPeriodEnd(period) {
	switch (period) {
		case 1:
			return "9:00 am";
			break;
		case 2:
			return "10:20 am";
			break;
		case 3:
			return "11:40 am";
			break;
		case 4:
			return "2:20 pm";
			break;
		case 5:
			return "3:40 pm";
			break;
		case 6:
			return "5:00 pm";
			break;
		case 7:
			return "9:50 am";
			break;
		case 8:
			return "11:40 am";
			break;
		case 9:
			return "2:50 pm";
			break;
		case 10:
			return "4:40 pm";
			break;
	}
}

function addOptions(coursesText){
	const courses = String(coursesText).split("\n");
	let coursesCount = courses.length;
	for (i = 1; i < 11; i++) {
		addDeselect("S1");
		addDeselect("S2");
	}
	for (i = 0; i < coursesCount; i++) {
		appendToLists(courses[i]);
	}
}

function addDeselect(semester) {
	let div = document.createElement('div')
	div.innerHTML =  "-";
	div.title = "None";
	let period = i.toString();
	div.addEventListener('mousedown', () => {
		if (event.target.parentNode.parentNode.firstElementChild.value) {
			clear(period + semester);
		}
	});
	document.getElementById("ddP" + i + semester).children[2].appendChild(div);
	div.addEventListener("mouseover", () => {		
		let pointer = event.target.parentNode.parentNode.getAttribute("pointer");
		if (pointer !== "none") {document.getElementById(pointer).style.opacity = "0.5";}
	});
	div.addEventListener("mouseout", () => {		
		let pointer = event.target.parentNode.parentNode.getAttribute("pointer");
		if (pointer !== "none") {document.getElementById(pointer).style.opacity = "1";}
	});
}

function appendToLists(courseString) {
	const course = courseString.split("|");
	let type = undefined
	if (/\d/.test(course[1])) {
		if (/\d/.test(course[2])) {
			type = "F";
		} else if (course[2].includes("@")) {
			type = "H";
		} else {
			type = "1";
		}
	} else if (/\d/.test(course[2])) {
		type = "2";
	} else {
		console.error('invalid course ids: "' + $.trim(course[1]) + '" & "' + $.trim(course[2]) + '"');
		return
	}
	if (type == "H" || type ==  "1") {
		addByPeriod("S1", course);
	}
	if (type == "H" || type ==  "2") {
		addByPeriod("S2", course);
	}
	if (type == "F") {
		addByPeriod("linked", course);
	}
}

function addByPeriod(mode, course) {
	switch (mode) {
		case "S1":
			var courseID = $.trim(course[1]);
			break;
		case "S2":
			var courseID = ($.trim(course[2]) == "@" ? $.trim(course[1]) : $.trim(course[2]));
			break;
	}
	let periods = $.trim(course[7]).split(" ");
	periods.forEach((timeslot) => {
		if (timeslot.includes("+")) {
			let multislot = timeslot.split("+");
			let day	= (multislot[0] < 7 ? "A" : "B");
			if (mode == "linked") {
				addDivFullDouble(course, $.trim(course[1]), $.trim(course[2]), multislot, day);
			} else {
				addDivHalfDouble(course, courseID, multislot, mode, day);
			}
		} else if (mode == "linked") {
			addDivFull(course, $.trim(course[1]), $.trim(course[2]), timeslot);
		} else {
			addDivSimple(course, courseID, timeslot, mode);
		}
	});
}

function addDivSimple(course, courseID, timeslot, semester) {
	let others = [];
	let day	= (timeslot < 7 ? "A" : "B");
	let div = document.createElement('div')
	div.innerHTML =  courseID + " - " + $.trim(course[0]);
	div.title = div.innerHTML;
	div.addEventListener('mousedown', () => {
		clear(timeslot + semester);
		selectClass("half", div.innerHTML, timeslot + semester, false, day, others);
	});
	div.addEventListener('mouseover', () => {
		document.getElementById("tempMarker").setAttribute("class", "");
		document.getElementById("tempMarker").classList.add("P" + timeslot, semester);
		document.getElementById("tempMarkerSecondClone").setAttribute("class", "P" + timeslot);
		let pointer = event.target.parentNode.parentNode.getAttribute("pointer");
		if (pointer !== "none") {document.getElementById(pointer).style.opacity = "0.5";}
	});
	div.addEventListener('mouseout', () => {
		document.getElementById("tempMarker").setAttribute("class", "");
		let pointer = event.target.parentNode.parentNode.getAttribute("pointer");
		if (pointer !== "none") {document.getElementById(pointer).style.opacity = "1";}
	});
	document.getElementById("ddP" + timeslot + semester).children[2].appendChild(div);
}

function addDivHalfDouble(course, courseID, multislot, semester, day) {
	for (j = 0; j < 2; j++) {
		let num = j.toString();
		let others = [multislot[1 - num] + semester];
		let div = document.createElement('div');
		div.innerHTML =  courseID + " - " + $.trim(course[0]);
		div.title = div.innerHTML;
		let shareClasses = others.map(other => "requires" + other);
		div.classList.add(...shareClasses);
		div.setAttribute("obstructions", "0");
		if (others.indexOf(multislot[1] + semester) == -1) {
			others.push(multislot[1] + semester);
		}
		div.addEventListener('mousedown', () => {
			if (!div.classList.contains('forbidden')) {
				clear(multislot[num] + semester);

				selectClass("half", div.innerHTML, multislot[0] + semester, true, day, others);
				let values = [1, 0, 0, 1];
				for (k = 0; k < values.length / 2; k++) {
					if (window["share" + multislot[values[k * 2]] + semester].indexOf(multislot[values[k * 2 + 1]] + semester) == -1) {
						window["share" + multislot[values[k * 2]] + semester].push(multislot[values[k * 2 + 1]] + semester);
					}
				}
			}
		});
		div.addEventListener('mouseover', () => {
			document.getElementById("tempMarker").setAttribute("class", "");
			document.getElementById("tempMarker").classList.add("P" + multislot[0], semester, "doubleHeight");
			if (event.target.classList.contains("forbidden")) {
				document.getElementById("tempMarker").classList.add("markerIllegal");
			}
			document.getElementById("tempMarkerSecondClone").setAttribute("class", "P" + multislot[0]);
			let pointer = event.target.parentNode.parentNode.getAttribute("pointer");
			if (pointer !== "none") {document.getElementById(pointer).style.opacity = "0.5";}
		});
		div.addEventListener('mouseout', () => {
			document.getElementById("tempMarker").setAttribute("class", "");
			let pointer = event.target.parentNode.parentNode.getAttribute("pointer");
			if (pointer !== "none") {document.getElementById(pointer).style.opacity = "1";}
		});
		document.getElementById("ddP" + multislot[j] + semester).children[2].appendChild(div);
	}
}

function addDivFull(course, firstID, secondID, timeslot) {
	for (j = 1; j < 3; j++) {
		let num = j.toString();
		let inverseNum = (3 - j).toString();
		let others = [timeslot + "S" + inverseNum];
		let day	= (timeslot < 7 ? "A" : "B");
		let div = document.createElement('div')
		div.innerHTML =  firstID + "/" + secondID.replace(/\D/g, "") + " - " + $.trim(course[0]);
		div.title = div.innerHTML;
		let shareClasses = others.map(other => "requires" + other);
		div.classList.add(...shareClasses);
		div.setAttribute("obstructions", "0");
		if (others.indexOf(timeslot + "S2") == -1) {
			others.push(timeslot + "S2");
		}
		div.addEventListener('mousedown', () => {
			if (!div.classList.contains('forbidden')) {
				clear(timeslot + "S" + num);
				selectClass("full", div.innerHTML, timeslot + "S1", false, day, others);
				let values = ["S1", "S2", "S2", "S1"];
				for (k = 0; k < values.length / 2; k++) {
					if (window["share" + timeslot + values[k * 2]].indexOf(timeslot + values[k * 2 + 1]) == -1) {
						window["share" + timeslot + values[k * 2]].push(timeslot + values[k * 2 + 1]);
					}
				}
			}
		});
		div.addEventListener('mouseover', () => {
			document.getElementById("tempMarker").setAttribute("class", "");
			document.getElementById("tempMarker").classList.add("P" + timeslot);
			if (event.target.classList.contains("forbidden")) {
				document.getElementById("tempMarker").classList.add("markerIllegal");
			}
			document.getElementById("tempMarkerSecondClone").setAttribute("class", "P" + timeslot);
			let pointer = event.target.parentNode.parentNode.getAttribute("pointer");
			if (pointer !== "none") {document.getElementById(pointer).style.opacity = "0.5";}
		});
		div.addEventListener('mouseout', () => {
			document.getElementById("tempMarker").setAttribute("class", "");
			let pointer = event.target.parentNode.parentNode.getAttribute("pointer");
			if (pointer !== "none") {document.getElementById(pointer).style.opacity = "1";}
		});
		document.getElementById("ddP" + timeslot + "S" + num).children[2].appendChild(div);
	}
}

function flipFlop(number) {
	return number % 2 + 1;
}

function addDivFullDouble(course, firstID, secondID, multislot, day) {
	for (j = 0; j < 4; j++) {
		let value = [0, 0, 1, 1];
		let num = value[j];	/*0, 0, 1, 1*/
		let num2 = flipFlop(j); 		/*1, 2, 1, 2*/
		let others = [];
		for (k = 1; k < 4; k++) {
			others.push(multislot[value[(j + k) % 4]] + "S" + flipFlop(j + k))
		}
		let div = document.createElement('div')
		div.innerHTML =  firstID + "/" + secondID.replace(/\D/g, "") + " - " + $.trim(course[0]);
		div.title = div.innerHTML;
		let shareClasses = others.map(other => "requires" + other);
		div.classList.add(...shareClasses);
		div.setAttribute("obstructions", "0");
		let valuesS = ["S1", "S2", "S2"];
		let valuesM = [1, 1, 0];
		for (k = 0; k < 3; k++) {
			if (others.indexOf(multislot[valuesM[k]] + valuesS[k]) == -1) {
				others.push(multislot[valuesM[k]] + valuesS[k]);
			}
		}
		div.addEventListener('mousedown', () => {
			if (!div.classList.contains('forbidden')) {
				clear(multislot[num] + "S" + num2);
				selectClass("full", div.innerHTML, multislot[0] + "S1", true, day, others);
				let values = [1, 0, 2, 0, 1, 1, 2, 1];
				for (k = 0; k < values.length / 2; k++) {
					for (l = 1; l < 4; l++) {
						if (window["share" + multislot[values[k * 2 + 1]] + "S" + values[k * 2]].indexOf(multislot[values[((k * 2 + 1) + l * 2) % 8]] + "S" + values[((k * 2) + l * 2) % 8]) == -1) {
							window["share" + multislot[values[k * 2 + 1]] + "S" + values[k * 2]].push(multislot[values[((k * 2 + 1) + l * 2) % 8]] + "S" + values[((k * 2) + l * 2) % 8]);
						}
					}
				}
			}
		});
		div.addEventListener('mouseover', () => {
			document.getElementById("tempMarker").setAttribute("class", "");
			document.getElementById("tempMarker").classList.add("P" + multislot[0], "doubleHeight");
			if (event.target.classList.contains("forbidden")) {
				document.getElementById("tempMarker").classList.add("markerIllegal");
			}
			document.getElementById("tempMarkerSecondClone").setAttribute("class", "P" + multislot[0]);
			let pointer = event.target.parentNode.parentNode.getAttribute("pointer");
			if (pointer !== "none") {document.getElementById(pointer).style.opacity = "0.5";}
		});
		div.addEventListener('mouseout', () => {
			document.getElementById("tempMarker").setAttribute("class", "");
			let pointer = event.target.parentNode.parentNode.getAttribute("pointer");
			if (pointer !== "none") {document.getElementById(pointer).style.opacity = "1";}
		});
		document.getElementById("ddP" + multislot[num] + "S" + num2).children[2].appendChild(div);
	}
}