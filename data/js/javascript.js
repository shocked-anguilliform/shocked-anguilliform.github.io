function runFunction(){
	testFunction();
}

function testFunction(){
	let grades = "/data/grades/sample.txt"

fetch (grades)
.then(x => x.text())
.then(y => document.getElementById("test").innerHTML = y);

}