// WAS REVIEWDATA.JS
function getReviewDataJSON() {
    return fetch("http://localhost:8088/reviews")
    .then(response => response.json())
}

export default getReviewDataJSON