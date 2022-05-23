function runFunction(){
	getCurrentGrades("sample");
}

async function getCurrentGrades(student) {
  let gradesObject = await fetch("/data/grades/"+student+".txt");
  let gradesText = await gradesObject.text();
  populateCurrentGrades(gradesText);
}

function populateCurrentGrades(grades){
	const semesters = String(grades).split("#S");
	var semestersCount = semesters.length;
	for(i = 0; i < semestersCount; i++) {
		splitSemester(semesters);
	}
	document.getElementById("test").innerHTML = semesters;
}

function splitSemester(semesters){
	window['semester'+i] = semesters[i].split("\n");
	
	console.log("Split semester " + i);
	console.log("Length: " + window['semester'+i].length);
	for(j = 0; j < window['semester'+i].length; i++) {
		splitClass(i);
	}
}

function splitClass(SN) {
	window['S'+SN+'C'+j] = window['semester'+SN].split(" | ");
	console.log("Split semester " + i + ", class" + j);
	console.log("Result (S" + SN + "C" + j + "):" + window['S'+SN+'C'+j]);
}