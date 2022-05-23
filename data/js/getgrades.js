function runFunction(){
	getCurrentGrades("sample");
}

function getCurrentGrades(student) {
	getFile(student,"current");
}

function generateTranscript(student) {
	getFile(student,"transcript");
}

async function getFile(student,mode) {
  let gradesObject = await fetch("/data/grades/"+student+".txt");
  let gradesText = await gradesObject.text();
  splitFile(gradesText,mode);
}

function splitFile(grades,mode){
	console.clear();
	console.log("Current mode: " + mode);
	const semesters = String(grades).split("\n#S\n");
	var semestersCount = semesters.length;
	for(i = 0; i < semestersCount; i++) {
		splitSemester(semesters);
	}
	if (mode == "current) {
		displayCurrentGrades();
	} else {
		writeTranscript();
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
	if (gradeBits.length == 0) {
		grade = "-";
	} else if (gradeBits.length == 1) {
			grade = gradeBits[0];
	} else {
			var gradeSum = 0;
			for (let i = 0; i < gradeBits.length; i++) {
				gradeSum += parseFloat(gradeBits[i]);
			}
			grade = (gradeSum / gradeBits.length).toFixed(1);
	}
	console.log("Grade: " + grade);
	return grade;
}

function displayCurrentGrades() {
	document.getElementById("test").innerHTML = "";
	let last = semestersCount-1;
	for(i = 0; i < window['semester'+last].length; i++){
		document.getElementById("test").innerHTML += window['S'+last+'C'+i].name + ": " + window['S'+last+'C'+i].grade + "<br>";
	}
}

function writeTranscript() {
}