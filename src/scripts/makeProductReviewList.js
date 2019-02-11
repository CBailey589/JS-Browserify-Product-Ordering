// WAS REVIEWLIST.JS
import getReviewDataJSON from "./getReviewDataJSON"

function makeProductReviewList() {
    return getReviewDataJSON()
        .then((parsedReviews) => {
            let newestReviewsByProduct = parsedReviews.sort(function (a, b) {
                return b.id - a.id
            }).sort(function
                (a, b) {
                return b.prodId - a.prodId
            })
            // console.log({newestReviewsByProduct})
            let i = 1;
            let threeNewestReviewsByProd = []
            let reviewsForGivenProduct = {};

            newestReviewsByProduct.forEach((review, index) => {

                if (index > 0) {
                    if (review.prodId !== newestReviewsByProduct[index - 1].prodId) {
                        threeNewestReviewsByProd.push(reviewsForGivenProduct)
                        i = 0
                        reviewsForGivenProduct = {}
                    }
                    if(i < 3){
                        i++
                        reviewsForGivenProduct[`${i}`] = review
                    }
                } else {
                    reviewsForGivenProduct[`${i}`] = review
                }
            });
            threeNewestReviewsByProd.push(reviewsForGivenProduct)
            // console.log({threeNewestReviewsByProd})
            return threeNewestReviewsByProd
        })
}

export default makeProductReviewList