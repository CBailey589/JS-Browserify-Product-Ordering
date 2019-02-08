(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _nav = _interopRequireDefault(require("./nav"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Y from "./productList"
(0, _nav.default)();

},{"./nav":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL25hdi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7QUFDQTtBQUVBOzs7Ozs7Ozs7O0FDSEEsU0FBUyxVQUFULEdBQXNCO0FBQ2xCLEVBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsU0FBdkIsRUFBa0MsU0FBbEMsR0FBOEM7Ozs7Ozs7O0tBQTlDO0FBU0g7O2VBRWMsVSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBtYWtlTmF2QmFyIGZyb20gXCIuL25hdlwiXHJcbi8vIGltcG9ydCBZIGZyb20gXCIuL3Byb2R1Y3RMaXN0XCJcclxuXHJcbm1ha2VOYXZCYXIoKSIsImZ1bmN0aW9uIG1ha2VOYXZCYXIoKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25hdkJhclwiKS5pbm5lckhUTUwgPWBcclxuICAgIDxoMSBpZD1cIm5hdkhlYWRlclwiPkJFRVRTWTwvaDE+XHJcbiAgICA8aDMgaWQ9XCJuYXZTbG9nYW5cIj5HZXQuIFlvdXIuIEJlZXMuIEhlcmUuPC9oMz5cclxuICAgIDxkaXYgaWQ9XCJuYXZMaW5rcz5cclxuICAgICAgICA8YSBocmVmPVwiXCIgY2xhc3M9XCJuYXZMaW5rXCI+Q2F0ZWdvcmllczwvYT5cclxuICAgICAgICA8YSBocmVmPVwiXCIgY2xhc3M9XCJuYXZMaW5rXCI+T3JkZXJzPC9hPlxyXG4gICAgICAgIDxhIGhyZWY9XCJcIiBjbGFzcz1cIm5hdkxpbmtcIj5Mb2cgT3V0PC9hPlxyXG4gICAgPC9kaXY+XHJcbiAgICBgXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG1ha2VOYXZCYXIiXX0=
