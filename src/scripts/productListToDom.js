import makeProductListHTML from "./makeProductListHTML"

function productListToDom() {
    return makeProductListHTML()
        .then((productHTML) => {
            document.querySelector("#productSection").innerHTML = productHTML
        })
}

export default productListToDom