// WAS REVIEWLIST.JS
import getReviewDataJSON from "./getReviewDataJSON"

function makeProductReviewList() {
    return getReviewDataJSON()
        .then((parsedReviews) => {
            let newestReviews = parsedReviews.sort(function (a, b) {
                return b.id - a.id
            }).sort(function
            (a, b) {
                return b.prodId - a.prodId
            })
            console.log(newestReviews)
            return newestReviews
        })
}

export default makeProductReviewList