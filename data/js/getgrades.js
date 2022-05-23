function runFunction(){
	getCurrentGrades("sample");
}

async function getCurrentGrades(student) {
  let gradesObject = await fetch("/data/grades/"+student+".txt");
  let gradesText = await gradesObject.text();
  populateCurrentGrades(gradesText);
}

function populateCurrentGrades(grades){
	console.clear();
	const semesters = String(grades).split("\n#S\n");
	var semestersCount = semesters.length;
	for(i = 0; i < semestersCount; i++) {
		splitSemester(semesters);
	}
	document.getElementById("test").innerHTML = "";
	let last = semestersCount-1;
	for(i = 0; i < window['semester'+last].length; i++){
		document.getElementById("test").innerHTML += window['S'+last+'C'+i].name + ": " + window['S'+last+'C'+i] + "<br>";
	}
}

function splitSemester(semesters){
	window['semester'+i] = semesters[i].split("\n");
	
	console.log("Split semester " + i);
	let classes = window['semester'+i].length;
	console.log("Length: " + window['semester'+i].length);
	for(j = 0; j < classes; j++) {
		splitClass(i);
	}
}

function splitClass(semesterNumber) {
	let semester = window['semester'+semesterNumber]
	window['S'+semesterNumber+'C'+j] = semester[j].split(" | ");
	window['S'+semesterNumber+'C'+j].name = $.trim(window['S'+semesterNumber+'C'+j][0]);
	window['S'+semesterNumber+'C'+j].shift();
	window['S'+semesterNumber+'C'+j].grade = getGrade (window['S'+semesterNumber+'C'+j]);
	console.log(window['S'+semesterNumber+'C'+j].name + ": " + window['S'+semesterNumber+'C'+j]);
}

function getGrade(gradeBits) {
	var grade;
	if (gradeBits.length ==) 0 {
		grade = "-";
		if (gradeBits.length == 1) {
			grade = gradeBits[0];
			grade = gradeBits.reduce((a, b) => a + b);
		}
	}
	console.log(grade);
	return grade;
}
