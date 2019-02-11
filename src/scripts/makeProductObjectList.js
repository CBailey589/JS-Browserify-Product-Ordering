// USED TO BE PRODUCT.JS
import makeProductReviewList from "./makeProductReviewList"
import getProductDataJSON from "./getProductDataJSON"

function makeProductObjectList() {
    let productReviewList = []
    let productArrayWithReviews = [];
    return makeProductReviewList()
        .then((threeNewestReviewsByProd) => {
            productReviewList = threeNewestReviewsByProd
            return getProductDataJSON()
        })
        .then((parsedProducts) => {
            parsedProducts.map((product) => {
                let reviewsForCurrentProduct = productReviewList.filter((review) => parseInt(review["1"]["prodId"]) === product.id)
                let productObj = {};
                productObj.id = product.id
                productObj.prodName = product.prodName
                productObj.prodDesc = product.prodDesc
                productObj.prodPrice = product.prodPrice
                productObj.prodImg = product.prodImg
                try{
                    if (reviewsForCurrentProduct[0]["1"]["reviewText"] !== undefined) {
                        productObj.review1 = reviewsForCurrentProduct[0]["1"]["reviewText"]
                    }
                }
                catch(error) {}
                try{
                    if (reviewsForCurrentProduct[0]["2"]["reviewText"] !== undefined) {
                        productObj.review2 = reviewsForCurrentProduct[0]["2"]["reviewText"]
                    }
                }
                catch(error) {}
                try{
                    if (reviewsForCurrentProduct[0]["3"]["reviewText"] !== undefined) {
                        productObj.review3 = reviewsForCurrentProduct[0]["3"]["reviewText"]
                    }
                }
                catch(error) {}
                productArrayWithReviews.push(productObj)
            })
            // console.log(productArrayWithReviews)
            return productArrayWithReviews
        })
}

export default makeProductObjectList