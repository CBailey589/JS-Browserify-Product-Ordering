// // USED TO BE PRODUCT.JS
// import makeProductReviewList from "./makeProductReviewList"
// import getProductDataJSON from "./getProductDataJSON"

// function makeProductObjectList() {
//     let productReviewList = [];
//     let productObj = {};
//     return makeProductReviewList()
//     .then((newestReviews) => {
//          productReviewList = newestReviews
//          return getProductDataJSON()
//     })
//     .then((parsedProducts) => {
//         const productArrayWithReviews = parsedProducts.map((product) => {
//             let reviewsForCurrentProduct = productReviewList.filter((review) => {
//                 return parseInt(review.prodId) = product.id
//             })
//             productObj.prodName = product.prodName
//             productObj.predDesc = product.prodDesc
//             productObj.prodPrice = product.prodPrice
//             productObj.prodImg = product.prodImg
//             productObj.review1 = reviewsForCurrentProduct[0].reviewText
//             productObj.review2 = reviewsForCurrentProduct[1].reviewText
//             productObj.review3 = reviewsForCurrentProduct[2].reviewText

//             productArrayWithReviews.push(productObj)
//             console.log(reviewsForCurrentProduct)
//             console.log(productObj)
//             return productArrayWithReviews
//         })
//     })
// }

// export default makeProductObjectList