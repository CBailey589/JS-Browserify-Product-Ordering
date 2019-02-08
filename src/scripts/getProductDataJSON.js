// WAS PRODUCTDATA.JS
function getProductDataJSON() {
    return fetch("http://localhost:8088/products")
        .then(response => response.json())
}

export default getProductDataJSON