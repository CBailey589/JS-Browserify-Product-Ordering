import makeProductObjectList from "./makeProductObjectList"

function makeProductListHTML() {
    return makeProductObjectList()
        .then((productArrayWithReviews => {
            let productHTML = productArrayWithReviews.map((product) => {
                return `
            <div id="${product.id}" class="productObj">
                <img src="./images/bumbleBee.png" class="productImg">
                <h3 class="productHeader">${product.prodName}</h3>
                <div class="productDescription">${product.prodDesc}</div>
                <h3 class="productPrice">${product.prodPrice}</h3>
                <div class="productReviews">
                    <h3 class="reviewHeader">Recent Reviews</h3>
                    <h4 class="reviewHeader">Most Recent:</h4>
                    <div class="productReview">${product.review1}</div>
                    <h4 class="reviewHeader">Second Most Recent: </h4>
                    <div class="productReview">${product.review2}</div>
                    <h4 class="reviewHeader">Third Most Recent</h4>
                    <div class="productReview">${product.review3}</div>
                </div>
            </div>
            `
            }).join("")
            console.log(productHTML)
            return productHTML
        }))

}

export default makeProductListHTML