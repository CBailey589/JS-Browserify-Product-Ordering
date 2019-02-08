(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
"use strict";

var _makeNavBar = _interopRequireDefault(require("./makeNavBar"));

var _makeProductReviewList = _interopRequireDefault(require("./makeProductReviewList"));

var _makeProductObjectList = _interopRequireDefault(require("./makeProductObjectList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _makeNavBar.default)();
(0, _makeProductReviewList.default)(); // makeProductObjectList()

},{"./makeNavBar":3,"./makeProductObjectList":4,"./makeProductReviewList":5}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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
"use strict";

},{}],5:[function(require,module,exports){
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

},{"./getReviewDataJSON":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2dldFJldmlld0RhdGFKU09OLmpzIiwiLi4vc2NyaXB0cy9tYWluLmpzIiwiLi4vc2NyaXB0cy9tYWtlTmF2QmFyLmpzIiwiLi4vc2NyaXB0cy9tYWtlUHJvZHVjdE9iamVjdExpc3QuanMiLCIuLi9zY3JpcHRzL21ha2VQcm9kdWN0UmV2aWV3TGlzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUNBQTtBQUNBLFNBQVMsaUJBQVQsR0FBNkI7QUFDekIsU0FBTyxLQUFLLENBQUMsK0JBQUQsQ0FBTCxDQUNOLElBRE0sQ0FDRCxRQUFRLElBQUksUUFBUSxDQUFDLElBQVQsRUFEWCxDQUFQO0FBRUg7O2VBRWMsaUI7Ozs7OztBQ05mOztBQUNBOztBQUNBOzs7O0FBR0E7QUFDQSxzQyxDQUNBOzs7Ozs7Ozs7O0FDUEE7QUFDQSxTQUFTLFVBQVQsR0FBc0I7QUFDbEIsRUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixTQUF2QixFQUFrQyxTQUFsQyxHQUE4Qzs7Ozs7Ozs7S0FBOUM7QUFTSDs7ZUFFYyxVOzs7O0FDYmY7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7Ozs7O0FDaENBOzs7O0FBREE7QUFHQSxTQUFTLHFCQUFULEdBQWlDO0FBQzdCLFNBQU8sa0NBQ0YsSUFERSxDQUNJLGFBQUQsSUFBbUI7QUFDckIsUUFBSSxzQkFBc0IsR0FBRyxhQUFhLENBQUMsSUFBZCxDQUFtQixVQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCO0FBQzVELGFBQU8sQ0FBQyxDQUFDLEVBQUYsR0FBTyxDQUFDLENBQUMsRUFBaEI7QUFDSCxLQUY0QixFQUUxQixJQUYwQixDQUVyQixVQUNILENBREcsRUFDQSxDQURBLEVBQ0c7QUFDUCxhQUFPLENBQUMsQ0FBQyxNQUFGLEdBQVcsQ0FBQyxDQUFDLE1BQXBCO0FBQ0gsS0FMNEIsQ0FBN0I7QUFNQSxJQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVk7QUFBQyxNQUFBO0FBQUQsS0FBWjtBQUNBLFFBQUksQ0FBQyxHQUFHLENBQVI7QUFDQSxRQUFJLHdCQUF3QixHQUFHLEVBQS9CO0FBQ0EsUUFBSSxzQkFBc0IsR0FBRyxFQUE3QjtBQUVBLElBQUEsc0JBQXNCLENBQUMsT0FBdkIsQ0FBK0IsQ0FBQyxNQUFELEVBQVMsS0FBVCxLQUFtQjtBQUU5QyxVQUFJLEtBQUssR0FBRyxDQUFaLEVBQWU7QUFDWCxZQUFJLE1BQU0sQ0FBQyxNQUFQLEtBQWtCLHNCQUFzQixDQUFDLEtBQUssR0FBRyxDQUFULENBQXRCLENBQWtDLE1BQXhELEVBQWdFO0FBQzVELFVBQUEsd0JBQXdCLENBQUMsSUFBekIsQ0FBOEIsc0JBQTlCO0FBQ0EsVUFBQSxDQUFDLEdBQUcsQ0FBSjtBQUNBLFVBQUEsc0JBQXNCLEdBQUcsRUFBekI7QUFDSDs7QUFDRCxZQUFHLENBQUMsR0FBRyxDQUFQLEVBQVM7QUFDTCxVQUFBLENBQUM7QUFDRCxVQUFBLHNCQUFzQixDQUFFLEdBQUUsQ0FBRSxFQUFOLENBQXRCLEdBQWlDLE1BQWpDO0FBQ0g7QUFDSixPQVZELE1BVU87QUFDSCxRQUFBLHNCQUFzQixDQUFFLEdBQUUsQ0FBRSxFQUFOLENBQXRCLEdBQWlDLE1BQWpDO0FBQ0g7QUFDSixLQWZEO0FBZ0JBLElBQUEsd0JBQXdCLENBQUMsSUFBekIsQ0FBOEIsc0JBQTlCO0FBQ0EsSUFBQSxPQUFPLENBQUMsR0FBUixDQUFZO0FBQUMsTUFBQTtBQUFELEtBQVo7QUFDQSxXQUFPLHdCQUFQO0FBQ0gsR0FoQ0UsQ0FBUDtBQWlDSDs7ZUFFYyxxQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vIFdBUyBSRVZJRVdEQVRBLkpTXHJcbmZ1bmN0aW9uIGdldFJldmlld0RhdGFKU09OKCkge1xyXG4gICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L3Jldmlld3NcIilcclxuICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZ2V0UmV2aWV3RGF0YUpTT04iLCJpbXBvcnQgbWFrZU5hdkJhciBmcm9tIFwiLi9tYWtlTmF2QmFyXCJcclxuaW1wb3J0IG1ha2VQcm9kdWN0UmV2aWV3TGlzdCBmcm9tIFwiLi9tYWtlUHJvZHVjdFJldmlld0xpc3RcIlxyXG5pbXBvcnQgbWFrZVByb2R1Y3RPYmplY3RMaXN0IGZyb20gXCIuL21ha2VQcm9kdWN0T2JqZWN0TGlzdFwiXHJcblxyXG5cclxubWFrZU5hdkJhcigpXHJcbm1ha2VQcm9kdWN0UmV2aWV3TGlzdCgpXHJcbi8vIG1ha2VQcm9kdWN0T2JqZWN0TGlzdCgpIiwiLy8gV0FTIE5BVi5KU1xyXG5mdW5jdGlvbiBtYWtlTmF2QmFyKCkge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuYXZCYXJcIikuaW5uZXJIVE1MID1gXHJcbiAgICA8aDEgaWQ9XCJuYXZIZWFkZXJcIj5CRUVUU1k8L2gxPlxyXG4gICAgPGgzIGlkPVwibmF2U2xvZ2FuXCI+R2V0LiBZb3VyLiBCZWVzLiBIZXJlLjwvaDM+XHJcbiAgICA8ZGl2IGlkPVwibmF2TGlua3M+XHJcbiAgICAgICAgPGEgaHJlZj1cIlwiIGNsYXNzPVwibmF2TGlua1wiPkNhdGVnb3JpZXM8L2E+XHJcbiAgICAgICAgPGEgaHJlZj1cIlwiIGNsYXNzPVwibmF2TGlua1wiPk9yZGVyczwvYT5cclxuICAgICAgICA8YSBocmVmPVwiXCIgY2xhc3M9XCJuYXZMaW5rXCI+TG9nIE91dDwvYT5cclxuICAgIDwvZGl2PlxyXG4gICAgYFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBtYWtlTmF2QmFyIiwiLy8gLy8gVVNFRCBUTyBCRSBQUk9EVUNULkpTXHJcbi8vIGltcG9ydCBtYWtlUHJvZHVjdFJldmlld0xpc3QgZnJvbSBcIi4vbWFrZVByb2R1Y3RSZXZpZXdMaXN0XCJcclxuLy8gaW1wb3J0IGdldFByb2R1Y3REYXRhSlNPTiBmcm9tIFwiLi9nZXRQcm9kdWN0RGF0YUpTT05cIlxyXG5cclxuLy8gZnVuY3Rpb24gbWFrZVByb2R1Y3RPYmplY3RMaXN0KCkge1xyXG4vLyAgICAgbGV0IHByb2R1Y3RSZXZpZXdMaXN0ID0gW107XHJcbi8vICAgICBsZXQgcHJvZHVjdE9iaiA9IHt9O1xyXG4vLyAgICAgcmV0dXJuIG1ha2VQcm9kdWN0UmV2aWV3TGlzdCgpXHJcbi8vICAgICAudGhlbigobmV3ZXN0UmV2aWV3cykgPT4ge1xyXG4vLyAgICAgICAgICBwcm9kdWN0UmV2aWV3TGlzdCA9IG5ld2VzdFJldmlld3NcclxuLy8gICAgICAgICAgcmV0dXJuIGdldFByb2R1Y3REYXRhSlNPTigpXHJcbi8vICAgICB9KVxyXG4vLyAgICAgLnRoZW4oKHBhcnNlZFByb2R1Y3RzKSA9PiB7XHJcbi8vICAgICAgICAgY29uc3QgcHJvZHVjdEFycmF5V2l0aFJldmlld3MgPSBwYXJzZWRQcm9kdWN0cy5tYXAoKHByb2R1Y3QpID0+IHtcclxuLy8gICAgICAgICAgICAgbGV0IHJldmlld3NGb3JDdXJyZW50UHJvZHVjdCA9IHByb2R1Y3RSZXZpZXdMaXN0LmZpbHRlcigocmV2aWV3KSA9PiB7XHJcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQocmV2aWV3LnByb2RJZCkgPSBwcm9kdWN0LmlkXHJcbi8vICAgICAgICAgICAgIH0pXHJcbi8vICAgICAgICAgICAgIHByb2R1Y3RPYmoucHJvZE5hbWUgPSBwcm9kdWN0LnByb2ROYW1lXHJcbi8vICAgICAgICAgICAgIHByb2R1Y3RPYmoucHJlZERlc2MgPSBwcm9kdWN0LnByb2REZXNjXHJcbi8vICAgICAgICAgICAgIHByb2R1Y3RPYmoucHJvZFByaWNlID0gcHJvZHVjdC5wcm9kUHJpY2VcclxuLy8gICAgICAgICAgICAgcHJvZHVjdE9iai5wcm9kSW1nID0gcHJvZHVjdC5wcm9kSW1nXHJcbi8vICAgICAgICAgICAgIHByb2R1Y3RPYmoucmV2aWV3MSA9IHJldmlld3NGb3JDdXJyZW50UHJvZHVjdFswXS5yZXZpZXdUZXh0XHJcbi8vICAgICAgICAgICAgIHByb2R1Y3RPYmoucmV2aWV3MiA9IHJldmlld3NGb3JDdXJyZW50UHJvZHVjdFsxXS5yZXZpZXdUZXh0XHJcbi8vICAgICAgICAgICAgIHByb2R1Y3RPYmoucmV2aWV3MyA9IHJldmlld3NGb3JDdXJyZW50UHJvZHVjdFsyXS5yZXZpZXdUZXh0XHJcblxyXG4vLyAgICAgICAgICAgICBwcm9kdWN0QXJyYXlXaXRoUmV2aWV3cy5wdXNoKHByb2R1Y3RPYmopXHJcbi8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJldmlld3NGb3JDdXJyZW50UHJvZHVjdClcclxuLy8gICAgICAgICAgICAgY29uc29sZS5sb2cocHJvZHVjdE9iailcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHByb2R1Y3RBcnJheVdpdGhSZXZpZXdzXHJcbi8vICAgICAgICAgfSlcclxuLy8gICAgIH0pXHJcbi8vIH1cclxuXHJcbi8vIGV4cG9ydCBkZWZhdWx0IG1ha2VQcm9kdWN0T2JqZWN0TGlzdCIsIi8vIFdBUyBSRVZJRVdMSVNULkpTXHJcbmltcG9ydCBnZXRSZXZpZXdEYXRhSlNPTiBmcm9tIFwiLi9nZXRSZXZpZXdEYXRhSlNPTlwiXHJcblxyXG5mdW5jdGlvbiBtYWtlUHJvZHVjdFJldmlld0xpc3QoKSB7XHJcbiAgICByZXR1cm4gZ2V0UmV2aWV3RGF0YUpTT04oKVxyXG4gICAgICAgIC50aGVuKChwYXJzZWRSZXZpZXdzKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBuZXdlc3RSZXZpZXdzQnlQcm9kdWN0ID0gcGFyc2VkUmV2aWV3cy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYi5pZCAtIGEuaWRcclxuICAgICAgICAgICAgfSkuc29ydChmdW5jdGlvblxyXG4gICAgICAgICAgICAgICAgKGEsIGIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBiLnByb2RJZCAtIGEucHJvZElkXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHtuZXdlc3RSZXZpZXdzQnlQcm9kdWN0fSlcclxuICAgICAgICAgICAgbGV0IGkgPSAxO1xyXG4gICAgICAgICAgICBsZXQgdGhyZWVOZXdlc3RSZXZpZXdzQnlQcm9kID0gW11cclxuICAgICAgICAgICAgbGV0IHJldmlld3NGb3JHaXZlblByb2R1Y3QgPSB7fTtcclxuXHJcbiAgICAgICAgICAgIG5ld2VzdFJldmlld3NCeVByb2R1Y3QuZm9yRWFjaCgocmV2aWV3LCBpbmRleCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmV2aWV3LnByb2RJZCAhPT0gbmV3ZXN0UmV2aWV3c0J5UHJvZHVjdFtpbmRleCAtIDFdLnByb2RJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJlZU5ld2VzdFJldmlld3NCeVByb2QucHVzaChyZXZpZXdzRm9yR2l2ZW5Qcm9kdWN0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpID0gMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXZpZXdzRm9yR2l2ZW5Qcm9kdWN0ID0ge31cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaSA8IDMpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpKytcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV2aWV3c0ZvckdpdmVuUHJvZHVjdFtgJHtpfWBdID0gcmV2aWV3XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXZpZXdzRm9yR2l2ZW5Qcm9kdWN0W2Ake2l9YF0gPSByZXZpZXdcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRocmVlTmV3ZXN0UmV2aWV3c0J5UHJvZC5wdXNoKHJldmlld3NGb3JHaXZlblByb2R1Y3QpXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHt0aHJlZU5ld2VzdFJldmlld3NCeVByb2R9KVxyXG4gICAgICAgICAgICByZXR1cm4gdGhyZWVOZXdlc3RSZXZpZXdzQnlQcm9kXHJcbiAgICAgICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbWFrZVByb2R1Y3RSZXZpZXdMaXN0Il19
