const pagesDiv = document.getElementById("pages");
let book
let currentPage
const flipDuration = 1400;

(async () => {
    let JSONfile = await fetch("/data/json/bookpages.json")
    let JSONtext = await JSONfile.text()
    book = JSON.parse(JSONtext)
    populatePages()
})()

function getPage(pageNumber) {
    if (book.contentPages.includes(pageNumber)) {
        page = book.pages.find(page => page.number === pageNumber)
    } else {
        page = {
            number: pageNumber,
            content: ""
        }
    }
    return page
}

function populatePages() {
    let n = book.contentPages[0]
    currentPage = n-(~n&1) //number of first page with content, or odd page immediately preceding
    let firstPage
    let secondPage
    firstPage = getPage(currentPage)
    secondPage = getPage(currentPage + 1)
    pagesDiv.querySelector("#leftStaticPage .pageContent").innerHTML = firstPage.content
    pagesDiv.querySelector("#leftStaticPage .pageNumber").innerHTML = firstPage.number
    pagesDiv.querySelector("#rightStaticPage .pageContent").innerHTML = secondPage.content
    pagesDiv.querySelector("#rightStaticPage .pageNumber").innerHTML = secondPage.number
    console.log(firstPage)
    console.log(secondPage)
}

function turnPage(direction) {
    if ((currentPage < 3 && direction == "fromLeft") || (currentPage > book.maxPage - 2 && direction == "fromRight")) return
    let leftFace = document.createElement("div")
    let rightFace = document.createElement("div")
    leftFace.classList.add("page", "dynamicPage", "leftFace", direction)
    rightFace.classList.add("page", "dynamicPage", "rightFace", direction)
    let leftContent = leftFace.appendChild(document.createElement("div"))
    let leftNumber = leftFace.appendChild(document.createElement("div"))
    let rightContent = rightFace.appendChild(document.createElement("div"))
    let rightNumber = rightFace.appendChild(document.createElement("div"))
    leftContent.classList.add("pageContent")
    leftNumber.classList.add("pageNumber")
    rightContent.classList.add("pageContent")
    leftContent.innerHTML = "text"
    rightContent.innerHTML = "text"
    pages.appendChild(leftFace)
    pages.appendChild(rightFace)
    setTimeout(() => {
        leftFace.parentElement.removeChild(leftFace)
        rightFace.parentElement.removeChild(rightFace)
    }, flipDuration)
}