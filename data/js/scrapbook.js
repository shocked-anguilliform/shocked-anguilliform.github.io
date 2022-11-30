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
    let n = location.hash ? parseInt(location.hash.replace('#', '')) : book.contentPages[0]
    console.log(n)
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
    rightNumber.classList.add("pageNumber")
    if (direction == "fromRight") {
        leftContent.innerHTML = getPage(++currentPage).content
        leftNumber.innerHTML = currentPage
        rightContent.innerHTML = getPage(++currentPage).content
        rightNumber.innerHTML = currentPage
        pagesDiv.querySelector("#rightStaticPage .pageContent").innerHTML = getPage(currentPage + 1).content
        pagesDiv.querySelector("#rightStaticPage .pageNumber").innerHTML = getPage(currentPage + 1).number
        let oldPage = currentPage
        setTimeout(() => {
            pagesDiv.querySelector("#leftStaticPage .pageContent").innerHTML = getPage(oldPage).content
            pagesDiv.querySelector("#leftStaticPage .pageNumber").innerHTML = getPage(oldPage).number
        }, flipDuration)
    } else {
        rightNumber.innerHTML = currentPage
        rightContent.innerHTML = getPage(currentPage--).content
        leftNumber.innerHTML = currentPage
        leftContent.innerHTML = getPage(currentPage--).content
        pagesDiv.querySelector("#leftStaticPage .pageContent").innerHTML = getPage(currentPage).content
        pagesDiv.querySelector("#leftStaticPage .pageNumber").innerHTML = getPage(currentPage).number
        let oldPage = currentPage + 1
        setTimeout(() => {
            pagesDiv.querySelector("#rightStaticPage .pageContent").innerHTML = getPage(oldPage).content
            pagesDiv.querySelector("#rightStaticPage .pageNumber").innerHTML = getPage(oldPage).number
        }, flipDuration)
    }
    pagesDiv.appendChild(leftFace)
    pagesDiv.appendChild(rightFace)
    setTimeout(() => {
        leftFace.parentElement.removeChild(leftFace)
        rightFace.parentElement.removeChild(rightFace)
    }, flipDuration)
    location.hash = currentPage;
}