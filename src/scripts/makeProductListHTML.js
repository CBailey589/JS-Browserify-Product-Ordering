import makeProductObjectList from "./makeProductObjectList"

function makeProductListHTML() {
    return makeProductObjectList()
        .then((productArrayWithReviews => {
            let productHTML = productArrayWithReviews.map((product) => {
                let x = `
            <div id="${product.id}" class="productObj">
                <img src="./images/bumbleBee.png" class="productImg">
                <h3 class="productHeader">${product.prodName}</h3>
                <div class="productDescription">${product.prodDesc}</div>
                <h3 class="productPrice">${product.prodPrice}</h3>
                <div class="productReviews">
                `
                if (Object.keys(product).length > 5) {
                    let reviewString = `
                    <h3 class="reviewHeader">Recent Reviews</h3>
                    <h4 class="reviewHeader">Most Recent:</h4>
                    <div class="productReview">${product.review1}</div>
                    `
                    x = x.concat(" ", reviewString)
                }

                if (Object.keys(product).length > 6) {
                    let reviewString = `
                    <h4 class="reviewHeader">Second Most Recent: </h4>
                    <div class="productReview">${product.review2}</div>
                    `
                    x = x.concat(" ", reviewString)
                }

                if (Object.keys(product).length > 7) {
                    let reviewString = `
                    <h4 class="reviewHeader">Third Most Recent</h4>
                    <div class="productReview">${product.review3}</div>
                    `
                    x = x.concat(" ", reviewString)
                }

                let restOfHTML = `
                </div>
                <button id="startNewReview${product.id}" class="visible">Write A New Product Review!</button>
                <section id="newReview${product.id}" class="hidden">
                    <fieldset class="">
                        <label for="newReviewText--${product.id}">Write Your New Review Here!</label>
                        <textarea name="newReviewText--${product.id}" id="newReviewText${product.id}" cols="30" rows="10"></textarea>
                    </fieldset>
                    <button id="saveNewReview${product.id}" class="">SUBMIT REVIEW</button>
                </section>
            </div>
                `
                x = x.concat(" ", restOfHTML)
                return x
            })

            // console.log(productHTML)
            return productHTML.join("")
        }))

}

export default makeProductListHTML