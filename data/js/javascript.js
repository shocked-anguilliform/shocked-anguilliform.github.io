function runFunction(){
	testFunction("sample");
}

function testFunction(name){
	let grades = "/data/grades/" + name + ".txt"

fetch (grades)
.then(x => x.text())
.then(y => document.getElementById("test").innerHTML = y);

}