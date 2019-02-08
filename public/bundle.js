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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import makeProductReviewList from "./makeProductReviewList"
// import makeProductObjectList from "./makeProductObjectList"
// import makeProductListHTML from "./makeProductListHTML"
(0, _makeNavBar.default)(); // makeProductReviewList()
// makeProductObjectList()
// makeProductListHTML()

(0, _productListToDom.default)();

},{"./makeNavBar":4,"./productListToDom":8}],4:[function(require,module,exports){
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
    <div id="navLinks>
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
            `;
    }).join("");
    console.log(productHTML);
    return productHTML;
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
    let x = parsedProducts.map(product => {
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
    });
    console.log(productArrayWithReviews);
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
    });
    console.log({
      newestReviewsByProduct
    });
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
    threeNewestReviewsByProd.push(reviewsForGivenProduct);
    console.log({
      threeNewestReviewsByProd
    });
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

},{"./makeProductListHTML":5}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2dldFByb2R1Y3REYXRhSlNPTi5qcyIsIi4uL3NjcmlwdHMvZ2V0UmV2aWV3RGF0YUpTT04uanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL21ha2VOYXZCYXIuanMiLCIuLi9zY3JpcHRzL21ha2VQcm9kdWN0TGlzdEhUTUwuanMiLCIuLi9zY3JpcHRzL21ha2VQcm9kdWN0T2JqZWN0TGlzdC5qcyIsIi4uL3NjcmlwdHMvbWFrZVByb2R1Y3RSZXZpZXdMaXN0LmpzIiwiLi4vc2NyaXB0cy9wcm9kdWN0TGlzdFRvRG9tLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQ0FBO0FBQ0EsU0FBUyxrQkFBVCxHQUE4QjtBQUMxQixTQUFPLEtBQUssQ0FBQyxnQ0FBRCxDQUFMLENBQ0YsSUFERSxDQUNHLFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBVCxFQURmLENBQVA7QUFFSDs7ZUFFYyxrQjs7Ozs7Ozs7Ozs7QUNOZjtBQUNBLFNBQVMsaUJBQVQsR0FBNkI7QUFDekIsU0FBTyxLQUFLLENBQUMsK0JBQUQsQ0FBTCxDQUNOLElBRE0sQ0FDRCxRQUFRLElBQUksUUFBUSxDQUFDLElBQVQsRUFEWCxDQUFQO0FBRUg7O2VBRWMsaUI7Ozs7OztBQ05mOztBQUlBOzs7O0FBSEE7QUFDQTtBQUNBO0FBSUEsMkIsQ0FDQTtBQUNBO0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7QUNYQTtBQUNBLFNBQVMsVUFBVCxHQUFzQjtBQUNsQixFQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLFNBQXZCLEVBQWtDLFNBQWxDLEdBQThDOzs7Ozs7OztLQUE5QztBQVNIOztlQUVjLFU7Ozs7Ozs7Ozs7O0FDYmY7Ozs7QUFFQSxTQUFTLG1CQUFULEdBQStCO0FBQzNCLFNBQU8sc0NBQ0YsSUFERSxDQUNJLHVCQUF1QixJQUFJO0FBQzlCLFFBQUksV0FBVyxHQUFHLHVC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QXdCLENBQUMsSUFBekIsQ0FBOEIsc0JBQTlCO0FBQ0EsSUFBQSxPQUFPLENBQUMsR0FBUixDQUFZO0FBQUMsTUFBQTtBQUFELEtBQVo7QUFDQSxXQUFPLHdCQUFQO0FBQ0gsR0FoQ0UsQ0FBUDtBQWlDSDs7ZUFFYyxxQjs7Ozs7Ozs7Ozs7QUN2Q2Y7Ozs7QUFFQSxTQUFTLGdCQUFULEdBQTRCO0FBQ3hCLFNBQU8sb0NBQ0YsSUFERSxDQUNJLFdBQUQsSUFBaUI7QUFDbkIsSUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixpQkFBdkIsRUFBMEMsU0FBMUMsR0FBc0QsV0FBdEQ7QUFDSCxHQUhFLENBQVA7QUFJSDs7ZUFFYyxnQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vIFdBUyBQUk9EVUNUREFUQS5KU1xyXG5mdW5jdGlvbiBnZXRQcm9kdWN0RGF0YUpTT04oKSB7XHJcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvcHJvZHVjdHNcIilcclxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGdldFByb2R1Y3REYXRhSlNPTiIsIi8vIFdBUyBSRVZJRVdEQVRBLkpTXHJcbmZ1bmN0aW9uIGdldFJldmlld0RhdGFKU09OKCkge1xyXG4gICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L3Jldmlld3NcIilcclxuICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZ2V0UmV2aWV3RGF0YUpTT04iLCJpbXBvcnQgbWFrZU5hdkJhciBmcm9tIFwiLi9tYWtlTmF2QmFyXCJcclxuLy8gaW1wb3J0IG1ha2VQcm9kdWN0UmV2aWV3TGlzdCBmcm9tIFwiLi9tYWtlUHJvZHVjdFJldmlld0xpc3RcIlxyXG4vLyBpbXBvcnQgbWFrZVByb2R1Y3RPYmplY3RMaXN0IGZyb20gXCIuL21ha2VQcm9kdWN0T2JqZWN0TGlzdFwiXHJcbi8vIGltcG9ydCBtYWtlUHJvZHVjdExpc3RIVE1MIGZyb20gXCIuL21ha2VQcm9kdWN0TGlzdEhUTUxcIlxyXG5pbXBvcnQgcHJvZHVjdExpc3RUb0RvbSBmcm9tIFwiLi9wcm9kdWN0TGlzdFRvRG9tXCJcclxuXHJcblxyXG5tYWtlTmF2QmFyKClcclxuLy8gbWFrZVByb2R1Y3RSZXZpZXdMaXN0KClcclxuLy8gbWFrZVByb2R1Y3RPYmplY3RMaXN0KClcclxuLy8gbWFrZVByb2R1Y3RMaXN0SFRNTCgpXHJcbnByb2R1Y3RMaXN0VG9Eb20oKSIsIi8vIFdBUyBOQVYuSlNcclxuZnVuY3Rpb24gbWFrZU5hdkJhcigpIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmF2QmFyXCIpLmlubmVySFRNTCA9YFxyXG4gICAgPGgxIGlkPVwibmF2SGVhZGVyXCI+QkVFVFNZPC9oMT5cclxuICAgIDxoMyBpZD1cIm5hdlNsb2dhblwiPkdldC4gWW91ci4gQmVlcy4gSGVyZS48L2gzPlxyXG4gICAgPGRpdiBpZD1cIm5hdkxpbmtzPlxyXG4gICAgICAgIDxhIGhyZWY9XCJcIiBjbGFzcz1cIm5hdkxpbmtcIj5DYXRlZ29yaWVzPC9hPlxyXG4gICAgICAgIDxhIGhyZWY9XCJcIiBjbGFzcz1cIm5hdkxpbmtcIj5PcmRlcnM8L2E+XHJcbiAgICAgICAgPGEgaHJlZj1cIlwiIGNsYXNzPVwibmF2TGlua1wiPkxvZyBPdXQ8L2E+XHJcbiAgICA8L2Rpdj5cclxuICAgIGBcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbWFrZU5hdkJhciIsImltcG9ydCBtYWtlUHJvZHVjdE9iamVjdExpc3QgZnJvbSBcIi4vbWFrZVByb2R1Y3RPYmplY3RMaXN0XCJcclxuXHJcbmZ1bmN0aW9uIG1ha2VQcm9kdWN0TGlzdEhUTUwoKSB7XHJcbiAgICByZXR1cm4gbWFrZVByb2R1Y3RPYmplY3RMaXN0KClcclxuICAgICAgICAudGhlbigocHJvZHVjdEFycmF5V2l0aFJldmlld3MgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcHJvZHVjdEhUTUwgPSBwcm9kdWN0QXJyYXlXaXRoUmV2aWV3cy5tYXAoKHByb2R1Y3QpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgIDxkaXYgaWQ9XCIke3Byb2R1Y3QuaWR9IGNsYXNzPVwicHJvZHVjdE9ialwiPlxyXG4gICAgICAgICAgICAgICAgPGltZyBzcmM9XCIuLi9zcmMvaW1hZ2VzL2J1bWJsZUJlZS5wbmdcIiBjbGFzcz1cInByb2R1Y3RJbWdcIj5cclxuICAgICAgICAgICAgICAgIDxoMyBjbGFzcz1cInByb2R1Y3RIZWFkZXJcIj4ke3Byb2R1Y3QucHJvZE5hbWV9PC9oMz5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9kdWN0RGVzY3JpcHRpb25cIj4ke3Byb2R1Y3QucHJvZERlc2N9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XCJwcm9kdWN0UHJpY2VcIj4ke3Byb2R1Y3QucHJvZFByaWNlfTwvaDM+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZHVjdFJldmlld3NcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XCJyZXZpZXdIZWFkZXJcIj5Qcm9kdWN0IFJldmlld3M8L2gzPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9kdWN0UmV2aWV3XCI+TW9zdCBSZWNlbnQgUmV2aWV3OiAke3Byb2R1Y3QucmV2aWV3MX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZHVjdFJldmlld1wiPlNlY29uZCBNb3N0IFJlY2VudCBSZXZpZXc6ICR7cHJvZHVjdC5yZXZpZXcyfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9kdWN0UmV2aWV3XCI+VGhpcmQgTW9zdCBSZWNlbnQgUmV2aWV3OiAke3Byb2R1Y3QucmV2aWV3M308L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYFxyXG4gICAgICAgICAgICB9KS5qb2luKFwiXCIpXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHByb2R1Y3RIVE1MKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvZHVjdEhUTUxcclxuICAgICAgICB9KSlcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG1ha2VQcm9kdWN0TGlzdEhUTUwiLCIvLyBVU0VEIFRPIEJFIFBST0RVQ1QuSlNcclxuaW1wb3J0IG1ha2VQcm9kdWN0UmV2aWV3TGlzdCBmcm9tIFwiLi9tYWtlUHJvZHVjdFJldmlld0xpc3RcIlxyXG5pbXBvcnQgZ2V0UHJvZHVjdERhdGFKU09OIGZyb20gXCIuL2dldFByb2R1Y3REYXRhSlNPTlwiXHJcblxyXG5mdW5jdGlvbiBtYWtlUHJvZHVjdE9iamVjdExpc3QoKSB7XHJcbiAgICBsZXQgcHJvZHVjdFJldmlld0xpc3QgPSBbXVxyXG4gICAgbGV0IHByb2R1Y3RBcnJheVdpdGhSZXZpZXdzID0gW107XHJcbiAgICByZXR1cm4gbWFrZVByb2R1Y3RSZXZpZXdMaXN0KClcclxuICAgICAgICAudGhlbigodGhyZWVOZXdlc3RSZXZpZXdzQnlQcm9kKSA9PiB7XHJcbiAgICAgICAgICAgIHByb2R1Y3RSZXZpZXdMaXN0ID0gdGhyZWVOZXdlc3RSZXZpZXdzQnlQcm9kXHJcbiAgICAgICAgICAgIHJldHVybiBnZXRQcm9kdWN0RGF0YUpTT04oKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oKHBhcnNlZFByb2R1Y3RzKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB4ID0gcGFyc2VkUHJvZHVjdHMubWFwKChwcm9kdWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmV2aWV3c0ZvckN1cnJlbnRQcm9kdWN0ID0gcHJvZHVjdFJldmlld0xpc3QuZmlsdGVyKChyZXZpZXcpID0+IHBhcnNlSW50KHJldmlld1tcIjFcIl1bXCJwcm9kSWRcIl0pID09PSBwcm9kdWN0LmlkKVxyXG4gICAgICAgICAgICAgICAgbGV0IHByb2R1Y3RPYmogPSB7fTtcclxuICAgICAgICAgICAgICAgIHByb2R1Y3RPYmouaWQgPSBwcm9kdWN0LmlkXHJcbiAgICAgICAgICAgICAgICBwcm9kdWN0T2JqLnByb2ROYW1lID0gcHJvZHVjdC5wcm9kTmFtZVxyXG4gICAgICAgICAgICAgICAgcHJvZHVjdE9iai5wcm9kRGVzYyA9IHByb2R1Y3QucHJvZERlc2NcclxuICAgICAgICAgICAgICAgIHByb2R1Y3RPYmoucHJvZFByaWNlID0gcHJvZHVjdC5wcm9kUHJpY2VcclxuICAgICAgICAgICAgICAgIHByb2R1Y3RPYmoucHJvZEltZyA9IHByb2R1Y3QucHJvZEltZ1xyXG4gICAgICAgICAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXZpZXdzRm9yQ3VycmVudFByb2R1Y3RbMF1bXCIxXCJdW1wicmV2aWV3VGV4dFwiXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3RPYmoucmV2aWV3MSA9IHJldmlld3NGb3JDdXJyZW50UHJvZHVjdFswXVtcIjFcIl1bXCJyZXZpZXdUZXh0XCJdXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2F0Y2goZXJyb3IpIHt9XHJcbiAgICAgICAgICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJldmlld3NGb3JDdXJyZW50UHJvZHVjdFswXVtcIjJcIl1bXCJyZXZpZXdUZXh0XCJdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdE9iai5yZXZpZXcyID0gcmV2aWV3c0ZvckN1cnJlbnRQcm9kdWN0WzBdW1wiMlwiXVtcInJldmlld1RleHRcIl1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYXRjaChlcnJvcikge31cclxuICAgICAgICAgICAgICAgIHRyeXtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmV2aWV3c0ZvckN1cnJlbnRQcm9kdWN0WzBdW1wiM1wiXVtcInJldmlld1RleHRcIl0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0T2JqLnJldmlldzMgPSByZXZpZXdzRm9yQ3VycmVudFByb2R1Y3RbMF1bXCIzXCJdW1wicmV2aWV3VGV4dFwiXVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhdGNoKGVycm9yKSB7fVxyXG4gICAgICAgICAgICAgICAgcHJvZHVjdEFycmF5V2l0aFJldmlld3MucHVzaChwcm9kdWN0T2JqKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhwcm9kdWN0QXJyYXlXaXRoUmV2aWV3cylcclxuICAgICAgICAgICAgcmV0dXJuIHByb2R1Y3RBcnJheVdpdGhSZXZpZXdzXHJcbiAgICAgICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbWFrZVByb2R1Y3RPYmplY3RMaXN0IiwiLy8gV0FTIFJFVklFV0xJU1QuSlNcclxuaW1wb3J0IGdldFJldmlld0RhdGFKU09OIGZyb20gXCIuL2dldFJldmlld0RhdGFKU09OXCJcclxuXHJcbmZ1bmN0aW9uIG1ha2VQcm9kdWN0UmV2aWV3TGlzdCgpIHtcclxuICAgIHJldHVybiBnZXRSZXZpZXdEYXRhSlNPTigpXHJcbiAgICAgICAgLnRoZW4oKHBhcnNlZFJldmlld3MpID0+IHtcclxuICAgICAgICAgICAgbGV0IG5ld2VzdFJldmlld3NCeVByb2R1Y3QgPSBwYXJzZWRSZXZpZXdzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBiLmlkIC0gYS5pZFxyXG4gICAgICAgICAgICB9KS5zb3J0KGZ1bmN0aW9uXHJcbiAgICAgICAgICAgICAgICAoYSwgYikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGIucHJvZElkIC0gYS5wcm9kSWRcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29uc29sZS5sb2coe25ld2VzdFJldmlld3NCeVByb2R1Y3R9KVxyXG4gICAgICAgICAgICBsZXQgaSA9IDE7XHJcbiAgICAgICAgICAgIGxldCB0aHJlZU5ld2VzdFJldmlld3NCeVByb2QgPSBbXVxyXG4gICAgICAgICAgICBsZXQgcmV2aWV3c0ZvckdpdmVuUHJvZHVjdCA9IHt9O1xyXG5cclxuICAgICAgICAgICAgbmV3ZXN0UmV2aWV3c0J5UHJvZHVjdC5mb3JFYWNoKChyZXZpZXcsIGluZGV4KSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXZpZXcucHJvZElkICE9PSBuZXdlc3RSZXZpZXdzQnlQcm9kdWN0W2luZGV4IC0gMV0ucHJvZElkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocmVlTmV3ZXN0UmV2aWV3c0J5UHJvZC5wdXNoKHJldmlld3NGb3JHaXZlblByb2R1Y3QpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgPSAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldmlld3NGb3JHaXZlblByb2R1Y3QgPSB7fVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZihpIDwgMyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGkrK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXZpZXdzRm9yR2l2ZW5Qcm9kdWN0W2Ake2l9YF0gPSByZXZpZXdcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldmlld3NGb3JHaXZlblByb2R1Y3RbYCR7aX1gXSA9IHJldmlld1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhyZWVOZXdlc3RSZXZpZXdzQnlQcm9kLnB1c2gocmV2aWV3c0ZvckdpdmVuUHJvZHVjdClcclxuICAgICAgICAgICAgY29uc29sZS5sb2coe3RocmVlTmV3ZXN0UmV2aWV3c0J5UHJvZH0pXHJcbiAgICAgICAgICAgIHJldHVybiB0aHJlZU5ld2VzdFJldmlld3NCeVByb2RcclxuICAgICAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBtYWtlUHJvZHVjdFJldmlld0xpc3QiLCJpbXBvcnQgbWFrZVByb2R1Y3RMaXN0SFRNTCBmcm9tIFwiLi9tYWtlUHJvZHVjdExpc3RIVE1MXCJcclxuXHJcbmZ1bmN0aW9uIHByb2R1Y3RMaXN0VG9Eb20oKSB7XHJcbiAgICByZXR1cm4gbWFrZVByb2R1Y3RMaXN0SFRNTCgpXHJcbiAgICAgICAgLnRoZW4oKHByb2R1Y3RIVE1MKSA9PiB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZHVjdFNlY3Rpb25cIikuaW5uZXJIVE1MID0gcHJvZHVjdEhUTUxcclxuICAgICAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwcm9kdWN0TGlzdFRvRG9tIl19
