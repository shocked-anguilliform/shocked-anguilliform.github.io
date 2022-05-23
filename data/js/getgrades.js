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
		splitSemester(i);
	}
	document.getElementById("test").innerHTML = semesters;
}

function splitSemester(number){
	console.log("split semester " + number);
}