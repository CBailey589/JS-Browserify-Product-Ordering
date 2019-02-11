import makeNavBar from "./makeNavBar"
import productListToDom from "./productListToDom"
import submitNewReview from "./submitNewReview"


makeNavBar()
productListToDom()

document.querySelector("#productSection").addEventListener("click", () => {
    if (event.target.id.startsWith("startNewReview")) {
        let id = event.target.id.replace("startNewReview", "")
        document.querySelector(`#newReview${id}`).classList.toggle("hidden")
    }
    if (event.target.id.startsWith("saveNewReview")) {
        let prodId = event.target.id.replace("saveNewReview", "")
        return(submitNewReview(prodId))
        .then(() => {
            return productListToDom()
        })
    }
})

// document.querySelector("#productSection").addEventListener("click", () => {
// })