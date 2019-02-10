import makeNavBar from "./makeNavBar"
import productListToDom from "./productListToDom"


makeNavBar()
productListToDom()

document.queryselector("#productSection").addEventListener("click", showNewReviewArea)