import makeProductObjectList from "./makeProductObjectList"

function makeProductListHTML() {
    return makeProductObjectList()
        .then((productArrayWithReviews => {
            let productHTML = productArrayWithReviews.map((product) => {
                return `
            <div id="${product.id} class="productObj">
                <img src="../src/images/bumbleBee.png" class="productImg">
                <h3 class="productHeader">${product.prodName}</h3>
                <div class="productDescription">${product.prodDesc}</div>
                <h3 class="productPrice">${product.prodPrice}</h3>
                <div class="productReviews">
                    <h3 class="reviewHeader">Product Reviews</h3>
                    <div class="productReview">Most Recent Review: ${product.review1}</div>
                    <div class="productReview">Second Most Recent Review: ${product.review2}</div>
                    <div class="productReview">Third Most Recent Review: ${product.review3}</div>
                </div>
            </div>
            `
            }).join("")
            console.log(productHTML)
            return productHTML
        }))

}

export default makeProductListHTML