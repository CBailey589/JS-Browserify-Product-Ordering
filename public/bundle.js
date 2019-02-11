(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// WAS PRODUCTDATA.JS
function getProductDataJSON() {
  return fetch("http://localhost:8088/products").then(response => response.json());
}

var _default = getProductDataJSON;
exports.default = _default;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// WAS REVIEWDATA.JS
function getReviewDataJSON() {
  return fetch("http://localhost:8088/reviews").then(response => response.json());
}

var _default = getReviewDataJSON;
exports.default = _default;

},{}],3:[function(require,module,exports){
"use strict";

var _makeNavBar = _interopRequireDefault(require("./makeNavBar"));

var _productListToDom = _interopRequireDefault(require("./productListToDom"));

var _submitNewReview = _interopRequireDefault(require("./submitNewReview"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _makeNavBar.default)();
(0, _productListToDom.default)();
document.querySelector("#productSection").addEventListener("click", () => {
  if (event.target.id.startsWith("startNewReview")) {
    let id = event.target.id.replace("startNewReview", "");
    document.querySelector(`#newReview${id}`).classList.toggle("hidden");
  }

  if (event.target.id.startsWith("saveNewReview")) {
    let prodId = event.target.id.replace("saveNewReview", "");
    return (0, _submitNewReview.default)(prodId).then(() => {
      return (0, _productListToDom.default)();
    });
  }
}); // document.querySelector("#productSection").addEventListener("click", () => {
// })

},{"./makeNavBar":4,"./productListToDom":8,"./submitNewReview":9}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// WAS NAV.JS
function makeNavBar() {
  document.querySelector("#navBar").innerHTML = `
    <h1 id="navHeader">BEETSY</h1>
    <h3 id="navSlogan">Get. Your. Bees. Here.</h3>
    <div id="navLinks">
        <a href="" class="navLink">Categories</a>
        <a href="" class="navLink">Orders</a>
        <a href="" class="navLink">Log Out</a>
    </div>
    `;
}

var _default = makeNavBar;
exports.default = _default;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _makeProductObjectList = _interopRequireDefault(require("./makeProductObjectList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeProductListHTML() {
  return (0, _makeProductObjectList.default)().then(productArrayWithReviews => {
    let productHTML = productArrayWithReviews.map(product => {
      let x = `
            <div id="${product.id}" class="productObj">
                <img src="./images/bumbleBee.png" class="productImg">
                <h3 class="productHeader">${product.prodName}</h3>
                <div class="productDescription">${product.prodDesc}</div>
                <h3 class="productPrice">${product.prodPrice}</h3>
                <div class="productReviews">
                `;

      if (Object.keys(product).length > 5) {
        let reviewString = `
                    <h3 class="reviewHeader">Recent Reviews</h3>
                    <h4 class="reviewHeader">Most Recent:</h4>
                    <div class="productReview">${product.review1}</div>
                    `;
        x = x.concat(" ", reviewString);
      }

      if (Object.keys(product).length > 6) {
        let reviewString = `
                    <h4 class="reviewHeader">Second Most Recent: </h4>
                    <div class="productReview">${product.review2}</div>
                    `;
        x = x.concat(" ", reviewString);
      }

      if (Object.keys(product).length > 7) {
        let reviewString = `
                    <h4 class="reviewHeader">Third Most Recent</h4>
                    <div class="productReview">${product.review3}</div>
                    `;
        x = x.concat(" ", reviewString);
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
                `;
      x = x.concat(" ", restOfHTML);
      return x;
    }); // console.log(productHTML)

    return productHTML.join("");
  });
}

var _default = makeProductListHTML;
exports.default = _default;

},{"./makeProductObjectList":6}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _makeProductReviewList = _interopRequireDefault(require("./makeProductReviewList"));

var _getProductDataJSON = _interopRequireDefault(require("./getProductDataJSON"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// USED TO BE PRODUCT.JS
function makeProductObjectList() {
  let productReviewList = [];
  let productArrayWithReviews = [];
  return (0, _makeProductReviewList.default)().then(threeNewestReviewsByProd => {
    productReviewList = threeNewestReviewsByProd;
    return (0, _getProductDataJSON.default)();
  }).then(parsedProducts => {
    parsedProducts.map(product => {
      let reviewsForCurrentProduct = productReviewList.filter(review => parseInt(review["1"]["prodId"]) === product.id);
      let productObj = {};
      productObj.id = product.id;
      productObj.prodName = product.prodName;
      productObj.prodDesc = product.prodDesc;
      productObj.prodPrice = product.prodPrice;
      productObj.prodImg = product.prodImg;

      try {
        if (reviewsForCurrentProduct[0]["1"]["reviewText"] !== undefined) {
          productObj.review1 = reviewsForCurrentProduct[0]["1"]["reviewText"];
        }
      } catch (error) {}

      try {
        if (reviewsForCurrentProduct[0]["2"]["reviewText"] !== undefined) {
          productObj.review2 = reviewsForCurrentProduct[0]["2"]["reviewText"];
        }
      } catch (error) {}

      try {
        if (reviewsForCurrentProduct[0]["3"]["reviewText"] !== undefined) {
          productObj.review3 = reviewsForCurrentProduct[0]["3"]["reviewText"];
        }
      } catch (error) {}

      productArrayWithReviews.push(productObj);
    }); // console.log(productArrayWithReviews)

    return productArrayWithReviews;
  });
}

var _default = makeProductObjectList;
exports.default = _default;

},{"./getProductDataJSON":1,"./makeProductReviewList":7}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getReviewDataJSON = _interopRequireDefault(require("./getReviewDataJSON"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// WAS REVIEWLIST.JS
function makeProductReviewList() {
  return (0, _getReviewDataJSON.default)().then(parsedReviews => {
    let newestReviewsByProduct = parsedReviews.sort(function (a, b) {
      return b.id - a.id;
    }).sort(function (a, b) {
      return b.prodId - a.prodId;
    }); // console.log({newestReviewsByProduct})

    let i = 1;
    let threeNewestReviewsByProd = [];
    let reviewsForGivenProduct = {};
    newestReviewsByProduct.forEach((review, index) => {
      if (index > 0) {
        if (review.prodId !== newestReviewsByProduct[index - 1].prodId) {
          threeNewestReviewsByProd.push(reviewsForGivenProduct);
          i = 0;
          reviewsForGivenProduct = {};
        }

        if (i < 3) {
          i++;
          reviewsForGivenProduct[`${i}`] = review;
        }
      } else {
        reviewsForGivenProduct[`${i}`] = review;
      }
    });
    threeNewestReviewsByProd.push(reviewsForGivenProduct); // console.log({threeNewestReviewsByProd})

    return threeNewestReviewsByProd;
  });
}

var _default = makeProductReviewList;
exports.default = _default;

},{"./getReviewDataJSON":2}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _makeProductListHTML = _interopRequireDefault(require("./makeProductListHTML"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function productListToDom() {
  return (0, _makeProductListHTML.default)().then(productHTML => {
    document.querySelector("#productSection").innerHTML = productHTML;
  });
}

var _default = productListToDom;
exports.default = _default;

},{"./makeProductListHTML":5}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function submitNewReview(prodId) {
  let reviewObj = {};
  reviewObj.prodId = prodId;
  reviewObj.reviewText = document.querySelector(`#newReviewText${prodId}`).value;
  return fetch("http://localhost:8088/reviews", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(reviewObj)
  });
}

var _default = submitNewReview;
exports.default = _default;

},{}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2dldFByb2R1Y3REYXRhSlNPTi5qcyIsIi4uL3NjcmlwdHMvZ2V0UmV2aWV3RGF0YUpTT04uanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL21ha2VOYXZCYXIuanMiLCIuLi9zY3JpcHRzL21ha2VQcm9kdWN0TGlzdEhUTUwuanMiLCIuLi9zY3JpcHRzL21ha2VQcm9kdWN0T2JqZWN0TGlzdC5qcyIsIi4uL3NjcmlwdHMvbWFrZVByb2R1Y3RSZXZpZXdMaXN0LmpzIiwiLi4vc2NyaXB0cy9wcm9kdWN0TGlzdFRvRG9tLmpzIiwiLi4vc2NyaXB0cy9zdWJtaXROZXdSZXZpZXcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FDQUE7QUFDQSxTQUFTLGtCQUFULEdBQThCO0FBQzFCLFNBQU8sS0FBSyxDQUFDLGdDQUFELENBQUwsQ0FDRixJQURFLENBQ0csUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFULEVBRGYsQ0FBUDtBQUVIOztlQUVjLGtCOzs7Ozs7Ozs7OztBQ05mO0FBQ0EsU0FBUyxpQkFBVCxHQUE2QjtBQUN6QixTQUFPLEtBQUssQ0FBQywrQkFBRCxDQUFMLENBQ04sSUFETSxDQUNELFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBVCxFQURYLENBQVA7QUFFSDs7ZUFFYyxpQjs7Ozs7O0FDTmY7O0FBQ0E7O0FBQ0E7Ozs7QUFHQTtBQUNBO0FBRUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsaUJBQXZCLEVBQTBDLGdCQUExQyxDQUEyRCxPQUEzRCxFQUFvRSxNQUFNO0FBQ3RFLE1BQUksS0FBSyxDQUFDLE1BQU4sQ0FBYSxFQUFiLENBQWdCLFVBQWhCLENBQTJCLGdCQUEzQixDQUFKLEVBQWtEO0FBQzlDLFFBQUksRUFBRSxHQUFHLEtBQUssQ0FBQyxNQUFOLENBQWEsRUFBYixDQUFnQixPQUFoQixDQUF3QixnQkFBeEIsRUFB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Q0FBQyxTQUFMLENBQWUsU0FBZjtBQUxvQyxHQUFsQyxDQUFaO0FBT0g7O2VBRWMsZSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vIFdBUyBQUk9EVUNUREFUQS5KU1xyXG5mdW5jdGlvbiBnZXRQcm9kdWN0RGF0YUpTT04oKSB7XHJcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvcHJvZHVjdHNcIilcclxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGdldFByb2R1Y3REYXRhSlNPTiIsIi8vIFdBUyBSRVZJRVdEQVRBLkpTXHJcbmZ1bmN0aW9uIGdldFJldmlld0RhdGFKU09OKCkge1xyXG4gICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L3Jldmlld3NcIilcclxuICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZ2V0UmV2aWV3RGF0YUpTT04iLCJpbXBvcnQgbWFrZU5hdkJhciBmcm9tIFwiLi9tYWtlTmF2QmFyXCJcclxuaW1wb3J0IHByb2R1Y3RMaXN0VG9Eb20gZnJvbSBcIi4vcHJvZHVjdExpc3RUb0RvbVwiXHJcbmltcG9ydCBzdWJtaXROZXdSZXZpZXcgZnJvbSBcIi4vc3VibWl0TmV3UmV2aWV3XCJcclxuXHJcblxyXG5tYWtlTmF2QmFyKClcclxucHJvZHVjdExpc3RUb0RvbSgpXHJcblxyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2R1Y3RTZWN0aW9uXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICBpZiAoZXZlbnQudGFyZ2V0LmlkLnN0YXJ0c1dpdGgoXCJzdGFydE5ld1Jldmlld1wiKSkge1xyXG4gICAgICAgIGxldCBpZCA9IGV2ZW50LnRhcmdldC5pZC5yZXBsYWNlKFwic3RhcnROZXdSZXZpZXdcIiwgXCJcIilcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjbmV3UmV2aWV3JHtpZH1gKS5jbGFzc0xpc3QudG9nZ2xlKFwiaGlkZGVuXCIpXHJcbiAgICB9XHJcbiAgICBpZiAoZXZlbnQudGFyZ2V0LmlkLnN0YXJ0c1dpdGgoXCJzYXZlTmV3UmV2aWV3XCIpKSB7XHJcbiAgICAgICAgbGV0IHByb2RJZCA9IGV2ZW50LnRhcmdldC5pZC5yZXBsYWNlKFwic2F2ZU5ld1Jldmlld1wiLCBcIlwiKVxyXG4gICAgICAgIHJldHVybihzdWJtaXROZXdSZXZpZXcocHJvZElkKSlcclxuICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBwcm9kdWN0TGlzdFRvRG9tKClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59KVxyXG5cclxuLy8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9kdWN0U2VjdGlvblwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4vLyB9KSIsIi8vIFdBUyBOQVYuSlNcclxuZnVuY3Rpb24gbWFrZU5hdkJhcigpIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmF2QmFyXCIpLmlubmVySFRNTCA9YFxyXG4gICAgPGgxIGlkPVwibmF2SGVhZGVyXCI+QkVFVFNZPC9oMT5cclxuICAgIDxoMyBpZD1cIm5hdlNsb2dhblwiPkdldC4gWW91ci4gQmVlcy4gSGVyZS48L2gzPlxyXG4gICAgPGRpdiBpZD1cIm5hdkxpbmtzXCI+XHJcbiAgICAgICAgPGEgaHJlZj1cIlwiIGNsYXNzPVwibmF2TGlua1wiPkNhdGVnb3JpZXM8L2E+XHJcbiAgICAgICAgPGEgaHJlZj1cIlwiIGNsYXNzPVwibmF2TGlua1wiPk9yZGVyczwvYT5cclxuICAgICAgICA8YSBocmVmPVwiXCIgY2xhc3M9XCJuYXZMaW5rXCI+TG9nIE91dDwvYT5cclxuICAgIDwvZGl2PlxyXG4gICAgYFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBtYWtlTmF2QmFyIiwiaW1wb3J0IG1ha2VQcm9kdWN0T2JqZWN0TGlzdCBmcm9tIFwiLi9tYWtlUHJvZHVjdE9iamVjdExpc3RcIlxyXG5cclxuZnVuY3Rpb24gbWFrZVByb2R1Y3RMaXN0SFRNTCgpIHtcclxuICAgIHJldHVybiBtYWtlUHJvZHVjdE9iamVjdExpc3QoKVxyXG4gICAgICAgIC50aGVuKChwcm9kdWN0QXJyYXlXaXRoUmV2aWV3cyA9PiB7XHJcbiAgICAgICAgICAgIGxldCBwcm9kdWN0SFRNTCA9IHByb2R1Y3RBcnJheVdpdGhSZXZpZXdzLm1hcCgocHJvZHVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IHggPSBgXHJcbiAgICAgICAgICAgIDxkaXYgaWQ9XCIke3Byb2R1Y3QuaWR9XCIgY2xhc3M9XCJwcm9kdWN0T2JqXCI+XHJcbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi4vaW1hZ2VzL2J1bWJsZUJlZS5wbmdcIiBjbGFzcz1cInByb2R1Y3RJbWdcIj5cclxuICAgICAgICAgICAgICAgIDxoMyBjbGFzcz1cInByb2R1Y3RIZWFkZXJcIj4ke3Byb2R1Y3QucHJvZE5hbWV9PC9oMz5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9kdWN0RGVzY3JpcHRpb25cIj4ke3Byb2R1Y3QucHJvZERlc2N9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XCJwcm9kdWN0UHJpY2VcIj4ke3Byb2R1Y3QucHJvZFByaWNlfTwvaDM+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZHVjdFJldmlld3NcIj5cclxuICAgICAgICAgICAgICAgIGBcclxuICAgICAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhwcm9kdWN0KS5sZW5ndGggPiA1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJldmlld1N0cmluZyA9IGBcclxuICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XCJyZXZpZXdIZWFkZXJcIj5SZWNlbnQgUmV2aWV3czwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzPVwicmV2aWV3SGVhZGVyXCI+TW9zdCBSZWNlbnQ6PC9oND5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZHVjdFJldmlld1wiPiR7cHJvZHVjdC5yZXZpZXcxfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIGBcclxuICAgICAgICAgICAgICAgICAgICB4ID0geC5jb25jYXQoXCIgXCIsIHJldmlld1N0cmluZylcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LmtleXMocHJvZHVjdCkubGVuZ3RoID4gNikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByZXZpZXdTdHJpbmcgPSBgXHJcbiAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzPVwicmV2aWV3SGVhZGVyXCI+U2Vjb25kIE1vc3QgUmVjZW50OiA8L2g0PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9kdWN0UmV2aWV3XCI+JHtwcm9kdWN0LnJldmlldzJ9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgYFxyXG4gICAgICAgICAgICAgICAgICAgIHggPSB4LmNvbmNhdChcIiBcIiwgcmV2aWV3U3RyaW5nKVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhwcm9kdWN0KS5sZW5ndGggPiA3KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJldmlld1N0cmluZyA9IGBcclxuICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3M9XCJyZXZpZXdIZWFkZXJcIj5UaGlyZCBNb3N0IFJlY2VudDwvaDQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2R1Y3RSZXZpZXdcIj4ke3Byb2R1Y3QucmV2aWV3M308L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICBgXHJcbiAgICAgICAgICAgICAgICAgICAgeCA9IHguY29uY2F0KFwiIFwiLCByZXZpZXdTdHJpbmcpXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3RPZkhUTUwgPSBgXHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxidXR0b24gaWQ9XCJzdGFydE5ld1JldmlldyR7cHJvZHVjdC5pZH1cIiBjbGFzcz1cInZpc2libGVcIj5Xcml0ZSBBIE5ldyBQcm9kdWN0IFJldmlldyE8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDxzZWN0aW9uIGlkPVwibmV3UmV2aWV3JHtwcm9kdWN0LmlkfVwiIGNsYXNzPVwiaGlkZGVuXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGZpZWxkc2V0IGNsYXNzPVwiXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJuZXdSZXZpZXdUZXh0LS0ke3Byb2R1Y3QuaWR9XCI+V3JpdGUgWW91ciBOZXcgUmV2aWV3IEhlcmUhPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhIG5hbWU9XCJuZXdSZXZpZXdUZXh0LS0ke3Byb2R1Y3QuaWR9XCIgaWQ9XCJuZXdSZXZpZXdUZXh0JHtwcm9kdWN0LmlkfVwiIGNvbHM9XCIzMFwiIHJvd3M9XCIxMFwiPjwvdGV4dGFyZWE+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9maWVsZHNldD5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGlkPVwic2F2ZU5ld1JldmlldyR7cHJvZHVjdC5pZH1cIiBjbGFzcz1cIlwiPlNVQk1JVCBSRVZJRVc8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICBgXHJcbiAgICAgICAgICAgICAgICB4ID0geC5jb25jYXQoXCIgXCIsIHJlc3RPZkhUTUwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4geFxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocHJvZHVjdEhUTUwpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9kdWN0SFRNTC5qb2luKFwiXCIpXHJcbiAgICAgICAgfSkpXHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBtYWtlUHJvZHVjdExpc3RIVE1MIiwiLy8gVVNFRCBUTyBCRSBQUk9EVUNULkpTXHJcbmltcG9ydCBtYWtlUHJvZHVjdFJldmlld0xpc3QgZnJvbSBcIi4vbWFrZVByb2R1Y3RSZXZpZXdMaXN0XCJcclxuaW1wb3J0IGdldFByb2R1Y3REYXRhSlNPTiBmcm9tIFwiLi9nZXRQcm9kdWN0RGF0YUpTT05cIlxyXG5cclxuZnVuY3Rpb24gbWFrZVByb2R1Y3RPYmplY3RMaXN0KCkge1xyXG4gICAgbGV0IHByb2R1Y3RSZXZpZXdMaXN0ID0gW11cclxuICAgIGxldCBwcm9kdWN0QXJyYXlXaXRoUmV2aWV3cyA9IFtdO1xyXG4gICAgcmV0dXJuIG1ha2VQcm9kdWN0UmV2aWV3TGlzdCgpXHJcbiAgICAgICAgLnRoZW4oKHRocmVlTmV3ZXN0UmV2aWV3c0J5UHJvZCkgPT4ge1xyXG4gICAgICAgICAgICBwcm9kdWN0UmV2aWV3TGlzdCA9IHRocmVlTmV3ZXN0UmV2aWV3c0J5UHJvZFxyXG4gICAgICAgICAgICByZXR1cm4gZ2V0UHJvZHVjdERhdGFKU09OKClcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKChwYXJzZWRQcm9kdWN0cykgPT4ge1xyXG4gICAgICAgICAgICBwYXJzZWRQcm9kdWN0cy5tYXAoKHByb2R1Y3QpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCByZXZpZXdzRm9yQ3VycmVudFByb2R1Y3QgPSBwcm9kdWN0UmV2aWV3TGlzdC5maWx0ZXIoKHJldmlldykgPT4gcGFyc2VJbnQocmV2aWV3W1wiMVwiXVtcInByb2RJZFwiXSkgPT09IHByb2R1Y3QuaWQpXHJcbiAgICAgICAgICAgICAgICBsZXQgcHJvZHVjdE9iaiA9IHt9O1xyXG4gICAgICAgICAgICAgICAgcHJvZHVjdE9iai5pZCA9IHByb2R1Y3QuaWRcclxuICAgICAgICAgICAgICAgIHByb2R1Y3RPYmoucHJvZE5hbWUgPSBwcm9kdWN0LnByb2ROYW1lXHJcbiAgICAgICAgICAgICAgICBwcm9kdWN0T2JqLnByb2REZXNjID0gcHJvZHVjdC5wcm9kRGVzY1xyXG4gICAgICAgICAgICAgICAgcHJvZHVjdE9iai5wcm9kUHJpY2UgPSBwcm9kdWN0LnByb2RQcmljZVxyXG4gICAgICAgICAgICAgICAgcHJvZHVjdE9iai5wcm9kSW1nID0gcHJvZHVjdC5wcm9kSW1nXHJcbiAgICAgICAgICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJldmlld3NGb3JDdXJyZW50UHJvZHVjdFswXVtcIjFcIl1bXCJyZXZpZXdUZXh0XCJdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdE9iai5yZXZpZXcxID0gcmV2aWV3c0ZvckN1cnJlbnRQcm9kdWN0WzBdW1wiMVwiXVtcInJldmlld1RleHRcIl1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYXRjaChlcnJvcikge31cclxuICAgICAgICAgICAgICAgIHRyeXtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmV2aWV3c0ZvckN1cnJlbnRQcm9kdWN0WzBdW1wiMlwiXVtcInJldmlld1RleHRcIl0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0T2JqLnJldmlldzIgPSByZXZpZXdzRm9yQ3VycmVudFByb2R1Y3RbMF1bXCIyXCJdW1wicmV2aWV3VGV4dFwiXVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhdGNoKGVycm9yKSB7fVxyXG4gICAgICAgICAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXZpZXdzRm9yQ3VycmVudFByb2R1Y3RbMF1bXCIzXCJdW1wicmV2aWV3VGV4dFwiXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3RPYmoucmV2aWV3MyA9IHJldmlld3NGb3JDdXJyZW50UHJvZHVjdFswXVtcIjNcIl1bXCJyZXZpZXdUZXh0XCJdXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2F0Y2goZXJyb3IpIHt9XHJcbiAgICAgICAgICAgICAgICBwcm9kdWN0QXJyYXlXaXRoUmV2aWV3cy5wdXNoKHByb2R1Y3RPYmopXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHByb2R1Y3RBcnJheVdpdGhSZXZpZXdzKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvZHVjdEFycmF5V2l0aFJldmlld3NcclxuICAgICAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBtYWtlUHJvZHVjdE9iamVjdExpc3QiLCIvLyBXQVMgUkVWSUVXTElTVC5KU1xyXG5pbXBvcnQgZ2V0UmV2aWV3RGF0YUpTT04gZnJvbSBcIi4vZ2V0UmV2aWV3RGF0YUpTT05cIlxyXG5cclxuZnVuY3Rpb24gbWFrZVByb2R1Y3RSZXZpZXdMaXN0KCkge1xyXG4gICAgcmV0dXJuIGdldFJldmlld0RhdGFKU09OKClcclxuICAgICAgICAudGhlbigocGFyc2VkUmV2aWV3cykgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbmV3ZXN0UmV2aWV3c0J5UHJvZHVjdCA9IHBhcnNlZFJldmlld3Muc29ydChmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGIuaWQgLSBhLmlkXHJcbiAgICAgICAgICAgIH0pLnNvcnQoZnVuY3Rpb25cclxuICAgICAgICAgICAgICAgIChhLCBiKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYi5wcm9kSWQgLSBhLnByb2RJZFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh7bmV3ZXN0UmV2aWV3c0J5UHJvZHVjdH0pXHJcbiAgICAgICAgICAgIGxldCBpID0gMTtcclxuICAgICAgICAgICAgbGV0IHRocmVlTmV3ZXN0UmV2aWV3c0J5UHJvZCA9IFtdXHJcbiAgICAgICAgICAgIGxldCByZXZpZXdzRm9yR2l2ZW5Qcm9kdWN0ID0ge307XHJcblxyXG4gICAgICAgICAgICBuZXdlc3RSZXZpZXdzQnlQcm9kdWN0LmZvckVhY2goKHJldmlldywgaW5kZXgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJldmlldy5wcm9kSWQgIT09IG5ld2VzdFJldmlld3NCeVByb2R1Y3RbaW5kZXggLSAxXS5wcm9kSWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyZWVOZXdlc3RSZXZpZXdzQnlQcm9kLnB1c2gocmV2aWV3c0ZvckdpdmVuUHJvZHVjdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgaSA9IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV2aWV3c0ZvckdpdmVuUHJvZHVjdCA9IHt9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGkgPCAzKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaSsrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldmlld3NGb3JHaXZlblByb2R1Y3RbYCR7aX1gXSA9IHJldmlld1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV2aWV3c0ZvckdpdmVuUHJvZHVjdFtgJHtpfWBdID0gcmV2aWV3XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aHJlZU5ld2VzdFJldmlld3NCeVByb2QucHVzaChyZXZpZXdzRm9yR2l2ZW5Qcm9kdWN0KVxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh7dGhyZWVOZXdlc3RSZXZpZXdzQnlQcm9kfSlcclxuICAgICAgICAgICAgcmV0dXJuIHRocmVlTmV3ZXN0UmV2aWV3c0J5UHJvZFxyXG4gICAgICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG1ha2VQcm9kdWN0UmV2aWV3TGlzdCIsImltcG9ydCBtYWtlUHJvZHVjdExpc3RIVE1MIGZyb20gXCIuL21ha2VQcm9kdWN0TGlzdEhUTUxcIlxyXG5cclxuZnVuY3Rpb24gcHJvZHVjdExpc3RUb0RvbSgpIHtcclxuICAgIHJldHVybiBtYWtlUHJvZHVjdExpc3RIVE1MKClcclxuICAgICAgICAudGhlbigocHJvZHVjdEhUTUwpID0+IHtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9kdWN0U2VjdGlvblwiKS5pbm5lckhUTUwgPSBwcm9kdWN0SFRNTFxyXG4gICAgICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHByb2R1Y3RMaXN0VG9Eb20iLCJmdW5jdGlvbiBzdWJtaXROZXdSZXZpZXcocHJvZElkKSB7XHJcbiAgICBsZXQgcmV2aWV3T2JqID0ge307XHJcbiAgICByZXZpZXdPYmoucHJvZElkID0gcHJvZElkXHJcbiAgICByZXZpZXdPYmoucmV2aWV3VGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNuZXdSZXZpZXdUZXh0JHtwcm9kSWR9YCkudmFsdWVcclxuXHJcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvcmV2aWV3c1wiLCB7XHJcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShyZXZpZXdPYmopXHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBzdWJtaXROZXdSZXZpZXciXX0=
