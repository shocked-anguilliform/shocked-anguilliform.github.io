// let leftPageFlipTimeout = null
// let rightPageFlipTimeout = null
// function flipLeft(){
//     let rightPage = document.querySelector("#rightFlippedPage")
//     let leftPage = document.querySelector("#leftFlippedPage")
//     rightPage.style.transform = "rotateY(90deg)"
//     leftPage.style.transition = "0.5s ease-out"
//     rightPage.style.transition = "0.5s ease-in"
//     if(rightPageFlipTimeout){
//         clearTimeout(rightPageFlipTimeout);
//     }
//     leftPageFlipTimeout = setTimeout(() => {
//         rightPage.style.transform = "rotateY(90deg)"
//         leftPage.style.transform = "rotateY(180deg)"
//     }, 500)
//     console.log(rightPage)
// }
// function flipRight(){
//     let rightPage = document.querySelector("#rightFlippedPage")
//     let leftPage = document.querySelector("#leftFlippedPage")
//     leftPage.style.transform = "rotateY(90deg)"
//     leftPage.style.transition = "0.5s ease-in"
//     rightPage.style.transition = "0.5s ease-out"
//     if(leftPageFlipTimeout){
//         clearTimeout(leftPageFlipTimeout);
//     }
//     rightPageFlipTimeout = setTimeout(() => {	
//         leftPage.style.transform = "rotateY(90deg)"
//         rightPage.style.transform = "rotateY(180deg)"
//     }, 500)
//     console.log(rightPage)
// }
// console.log(test)
function spin (x) {
    test.style.transform = `rotateY(${x}deg) translateX(-50%)`
    if (x <= 0) {
        setTimeout(() => {spin (180)}, 250)
    } else {
        setTimeout(() => {spin (x - 1)}, 10)
    }
}
function spin2 (x) {
    test2.style.transform = `rotateY(${x}deg) translateX(50%)`
    if (x <= 180) {
        setTimeout(() => {spin2 (360)}, 250)
    } else {
        setTimeout(() => {spin2 (x - 1)}, 10)
    }
}

let test = document.getElementById("test")
let test2 = document.getElementById("test2")
spin(180)
spin2(360)

const pages = document.getElementById("pages")

function turnPage(direction) {
    switch (direction) {
        case "toLeft":
            direction = "fromRight"
            break
        case "toRight":
            direction = "fromLeft"
            break
    }
    let leftFace = document.createElement("div")
    let rightFace = document.createElement("div")
    leftFace.classList.add("page", "dynamicPage", "leftFace", direction)
    rightFace.classList.add("page", "dynamicPage", "rightFace", direction)
    let leftContent = leftFace.appendChild(document.createElement("div"))
    let rightContent = rightFace.appendChild(document.createElement("div"))
    leftContent.classList.add("pageContent")
    rightContent.classList.add("pageContent")
    leftContent.innerHTML = "text"
    rightContent.innerHTML = "text"
    pages.appendChild(leftFace)
    pages.appendChild(rightFace)
    setTimeout(() => {
        leftFace.parentElement.removeChild(leftFace)
        rightFace.parentElement.removeChild(rightFace)
    }, 1400)
}

function turnBackward() {
    let div = document.createElement("div")
    div.classList.add("page", "dynamicPage")
    div.style.transform = "translateX(-50%)"
    let content = div.appendChild(document.createElement("div"))
    content.classList.add("pageContent")
    content.innerHTML = "text"
    pages.appendChild(div)
}