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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _makeNavBar.default)();
(0, _makeProductReviewList.default)();

},{"./makeNavBar":3,"./makeProductReviewList":4}],3:[function(require,module,exports){
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
    let newestReviews = parsedReviews.sort(function (a, b) {
      return b.id - a.id;
    }).sort(function (a, b) {
      return b.prodId - a.prodId;
    });
    console.log(newestReviews);
    return newestReviews;
  });
}

var _default = makeProductReviewList;
exports.default = _default;

},{"./getReviewDataJSON":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2dldFJldmlld0RhdGFKU09OLmpzIiwiLi4vc2NyaXB0cy9tYWluLmpzIiwiLi4vc2NyaXB0cy9tYWtlTmF2QmFyLmpzIiwiLi4vc2NyaXB0cy9tYWtlUHJvZHVjdFJldmlld0xpc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FDQUE7QUFDQSxTQUFTLGlCQUFULEdBQTZCO0FBQ3pCLFNBQU8sS0FBSyxDQUFDLCtCQUFELENBQUwsQ0FDTixJQURNLENBQ0QsUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFULEVBRFgsQ0FBUDtBQUVIOztlQUVjLGlCOzs7Ozs7QUNOZjs7QUFDQTs7OztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUNKQTtBQUNBLFNBQVMsVUFBVCxHQUFzQjtBQUNsQixFQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLFNBQXZCLEVBQWtDLFNBQWxDLEdBQThDOzs7Ozs7OztLQUE5QztBQVNIOztlQUVjLFU7Ozs7Ozs7Ozs7O0FDWmY7Ozs7QUFEQTtBQUdBLFNBQVMscUJBQVQsR0FBaUM7QUFDN0IsU0FBTyxrQ0FDRixJQURFLENBQ0ksYUFBRCxJQUFtQjtBQUNyQixRQUFJLGFBQWEsR0FBRyxhQUFhLENBQUMsSUFBZCxDQUFtQixVQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCO0FBQ25ELGFBQU8sQ0FBQyxDQUFDLEVBQUYsR0FBTyxDQUFDLENBQUMsRUFBaEI7QUFDSCxLQUZtQixFQUVqQixJQUZpQixDQUVaLFVBQ1AsQ0FETyxFQUNKLENBREksRUFDRDtBQUNILGFBQU8sQ0FBQyxDQUFDLE1BQUYsR0FBVyxDQUFDLENBQUMsTUFBcEI7QUFDSCxLQUxtQixDQUFwQjtBQU1BLElBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxhQUFaO0FBQ0EsV0FBTyxhQUFQO0FBQ0gsR0FWRSxDQUFQO0FBV0g7O2VBRWMscUIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvLyBXQVMgUkVWSUVXREFUQS5KU1xyXG5mdW5jdGlvbiBnZXRSZXZpZXdEYXRhSlNPTigpIHtcclxuICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9yZXZpZXdzXCIpXHJcbiAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGdldFJldmlld0RhdGFKU09OIiwiaW1wb3J0IG1ha2VOYXZCYXIgZnJvbSBcIi4vbWFrZU5hdkJhclwiXHJcbmltcG9ydCBtYWtlUHJvZHVjdFJldmlld0xpc3QgZnJvbSBcIi4vbWFrZVByb2R1Y3RSZXZpZXdMaXN0XCJcclxuXHJcbm1ha2VOYXZCYXIoKVxyXG5tYWtlUHJvZHVjdFJldmlld0xpc3QoKSIsIi8vIFdBUyBOQVYuSlNcclxuZnVuY3Rpb24gbWFrZU5hdkJhcigpIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmF2QmFyXCIpLmlubmVySFRNTCA9YFxyXG4gICAgPGgxIGlkPVwibmF2SGVhZGVyXCI+QkVFVFNZPC9oMT5cclxuICAgIDxoMyBpZD1cIm5hdlNsb2dhblwiPkdldC4gWW91ci4gQmVlcy4gSGVyZS48L2gzPlxyXG4gICAgPGRpdiBpZD1cIm5hdkxpbmtzPlxyXG4gICAgICAgIDxhIGhyZWY9XCJcIiBjbGFzcz1cIm5hdkxpbmtcIj5DYXRlZ29yaWVzPC9hPlxyXG4gICAgICAgIDxhIGhyZWY9XCJcIiBjbGFzcz1cIm5hdkxpbmtcIj5PcmRlcnM8L2E+XHJcbiAgICAgICAgPGEgaHJlZj1cIlwiIGNsYXNzPVwibmF2TGlua1wiPkxvZyBPdXQ8L2E+XHJcbiAgICA8L2Rpdj5cclxuICAgIGBcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbWFrZU5hdkJhciIsIi8vIFdBUyBSRVZJRVdMSVNULkpTXHJcbmltcG9ydCBnZXRSZXZpZXdEYXRhSlNPTiBmcm9tIFwiLi9nZXRSZXZpZXdEYXRhSlNPTlwiXHJcblxyXG5mdW5jdGlvbiBtYWtlUHJvZHVjdFJldmlld0xpc3QoKSB7XHJcbiAgICByZXR1cm4gZ2V0UmV2aWV3RGF0YUpTT04oKVxyXG4gICAgICAgIC50aGVuKChwYXJzZWRSZXZpZXdzKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBuZXdlc3RSZXZpZXdzID0gcGFyc2VkUmV2aWV3cy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYi5pZCAtIGEuaWRcclxuICAgICAgICAgICAgfSkuc29ydChmdW5jdGlvblxyXG4gICAgICAgICAgICAoYSwgYikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGIucHJvZElkIC0gYS5wcm9kSWRcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29uc29sZS5sb2cobmV3ZXN0UmV2aWV3cylcclxuICAgICAgICAgICAgcmV0dXJuIG5ld2VzdFJldmlld3NcclxuICAgICAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBtYWtlUHJvZHVjdFJldmlld0xpc3QiXX0=
