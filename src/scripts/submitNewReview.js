function submitNewReview(prodId) {
    let reviewObj = {};
    reviewObj.prodId = prodId
    reviewObj.reviewText = document.querySelector(`#newReviewText${prodId}`).value

    return fetch("http://localhost:8088/reviews", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reviewObj)
    })
}

export default submitNewReview