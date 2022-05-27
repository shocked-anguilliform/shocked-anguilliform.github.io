function runFunction(){
	getCurrentGrades("sample");
}

function getCurrentGrades(student) {
	getGradeFile(student,"current");
}

function getGradesBySemester(student,semester) {
	getGradeFile(student,"semester",semester);
}

function generateTranscript(student) {
	getGradeFile(student,"transcript");
}

async function getGradeFile(student,mode,semester) {
  let gradesObject = await fetch("/data/grades/"+student+".txt");
  let gradesText = await gradesObject.text();
  splitGradeFile(gradesText,mode,semester);
}

function splitGradeFile(grades,mode,semester){
	const semesters = String(grades).split("\n#S\n");
	var semestersCount = semesters.length;
	for(i = 0; i < semestersCount; i++) {
		splitSemester(semesters);
	}
	if (mode == "current") {
		displaySemesterGrades(semestersCount-1);
	}
	if (mode == "transcript") {
		writeTranscript(semestersCount);
	}
	if (mode == "semester") {
		if (semester < semestersCount && semester >= 0) {
			displaySemesterGrades(semester);
		} else {
			console.log("Error: No such semester");
		}
	}	
}

function splitSemester(semesters){
	window['semester'+i] = semesters[i].split("\n");
	let classes = window['semester'+i].length;
	for(j = 0; j < classes; j++) {
		splitClass(i);
	}
}

function splitClass(semesterNumber) {
	let semester = window['semester'+semesterNumber]
	window['S'+semesterNumber+'C'+j] = semester[j].split("|");
	window['S'+semesterNumber+'C'+j].name = $.trim(window['S'+semesterNumber+'C'+j][0]);
	window['S'+semesterNumber+'C'+j].shift();
	window['S'+semesterNumber+'C'+j].grade = getGrade (window['S'+semesterNumber+'C'+j]);
	window['S'+semesterNumber+'C'+j].oldGrade = getOldGrade (window['S'+semesterNumber+'C'+j]);
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
	return grade;
}

function getOldGrade(gradeBits) {
	var grade;
	if (gradeBits.length < 2) {
		grade = "-";
	} else {
		var gradeSum = 0;
		for (let i = 0; i < gradeBits.length-1; i++) {
			gradeSum += parseFloat(gradeBits[i]);
		}
		grade = (gradeSum / (gradeBits.length-1)).toFixed(1);
	}
	return grade;
}

function displaySemesterGrades(semester) {
	var change;
	for(i = 0; i < window['semester'+semester].length; i++){
		change = "";
		if (window['S'+semester+'C'+i].oldGrade != "-") {
			if (window['S'+semester+'C'+i].oldGrade < window['S'+semester+'C'+i].grade) {
				change = ' <span class="up">⯅</span> ';
			}
			if (window['S'+semester+'C'+i].oldGrade > window['S'+semester+'C'+i].grade) {
				change = ' <span class="down">⯆</span>';
			}
		}
		var names = document.getElementById("nameBox");
		var scores = document.getElementById("scoreBox");
		names.innerHTML += "\n<span class='className'>" + window['S'+semester+'C'+i].name + ": </span><br>";
		scores.innerHTML += "\n" + window['S'+semester+'C'+i].grade + change + "<br>";
	}
	console.log(names.offsetWidth);
	console.log(scores.offsetWidth);
	var comboWidth = names.offsetWidth + scores.offsetWidth;
	var widthExpression =  "max(min(20rem, 80%), " + comboWidth + "px)"
	console.log(widthExpression);
	$("#GBBjs").css("min-width", widthExpression);
}

function writeTranscript(semesters) {
	console.log("not set up yet :(");
}