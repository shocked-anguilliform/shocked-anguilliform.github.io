function runFunction(){
	getCurrentGrades("sample");
}

async function getCurrentGrades(student) {
  let gradesObject = await fetch("/data/grades/"+student+".txt");
  let gradesText = await gradesObject.text();
  populateCurrentGrades(gradesText);
}

function populateCurrentGrades(grades){
document.getElementById("test").innerHTML = grades;
}