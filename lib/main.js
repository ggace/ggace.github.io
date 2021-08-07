"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/*
	This pen cleverly utilizes SVG filters to create a "Morphing Text" effect. Essentially, it layers 2 text elements on top of each other, and blurs them depending on which text element should be more visible. Once the blurring is applied, both texts are fed through a threshold filter together, which produces the "gooey" effect. Check the CSS - Comment the #container rule's filter out to see how the blurring works!
*/
var container = document.getElementById('container');
var content = document.getElementById('content');
var header = document.getElementById('header');
var containerHeight = 100;
var contentHeight = 0;
var elts = {
  text1: document.getElementById("text1"),
  text2: document.getElementById("text2")
}; // The strings to morph between. You can change these to anything you want!

var texts = []; // Controls the speed of morphing.

var morphTime = 1;
var cooldownTime = 0.25;
var textIndex = texts.length - 1;
var time = new Date();
var morph = 0;
var cooldown = cooldownTime;
var imgs = ["판교.png", "네이버.png", "kakao사옥.jpeg", "ncsoft.png", "nexon.png", "판교it.jpg"];
var objHeight = 0;
var imgObj = undefined;
var plus = 3;
var bgcolors = [0, 0, 0];
var colors = [255, 255, 255];
var text1Width = 100;
var text2Width = 100;
var headers = ["about", "map", "why", "picture", "character", "todo list", "else", "more ideas"];
var aboutHeight = 0;
var mapHeight = 0;
var whyHeight = 0;
var pictrueHeight = 0;
var characterHeight = 0;
var todoListHeight = 0;
var elseHeight = 0;
var moreIdeasHeight = 0;

var Img = /*#__PURE__*/function (_React$Component) {
  _inherits(Img, _React$Component);

  var _super = _createSuper(Img);

  function Img() {
    _classCallCheck(this, Img);

    return _super.apply(this, arguments);
  }

  _createClass(Img, [{
    key: "render",
    value: function render() {
      var divStyle = {
        "width": "100%",
        "height": "100%",
        "justifyContent": "center",
        "alignItems": "center",
        "display": "flex"
      };
      var imgStyle = {
        "height": "0%"
      };
      return /*#__PURE__*/React.createElement("div", {
        style: divStyle
      }, /*#__PURE__*/React.createElement("img", {
        src: this.props.src,
        style: imgStyle
      }));
    }
  }]);

  return Img;
}(React.Component);

function doCooldown() {
  morph = 0;
  elts.text2.style.filter = "";
  elts.text2.style.opacity = "100%";
  elts.text1.style.filter = "";
  elts.text1.style.opacity = "0%";
} // A lot of the magic happens here, this is what applies the blur filter to the text.


function setMorph(fraction) {
  // fraction = Math.cos(fraction * Math.PI) / -2 + .5;
  elts.text2.style.filter = "blur(".concat(Math.min(8 / fraction - 8, 100), "px)");
  elts.text2.style.opacity = "".concat(Math.pow(fraction, 0.4) * 100, "%");
  fraction = 1 - fraction;
  elts.text1.style.filter = "blur(".concat(Math.min(8 / fraction - 8, 100), "px)");
  elts.text1.style.opacity = "".concat(Math.pow(fraction, 0.4) * 100, "%");
  elts.text1.textContent = texts[textIndex % texts.length];
  elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doMorph() {
  morph -= cooldown;
  cooldown = 0;
  var fraction = morph / morphTime;

  if (fraction > 1) {
    cooldown = cooldownTime;
    fraction = 1;
  }

  setMorph(fraction);
}

function arrayToRgb(colorArray) {
  return "#".concat(colorArray[0].toString(16)).concat(colorArray[1].toString(16)).concat(colorArray[2].toString(16));
}

var HeaderComponent = /*#__PURE__*/function (_React$Component2) {
  _inherits(HeaderComponent, _React$Component2);

  var _super2 = _createSuper(HeaderComponent);

  function HeaderComponent(props) {
    var _this;

    _classCallCheck(this, HeaderComponent);

    _this = _super2.call(this, props);
    var height = 0;
    return _this;
  }

  _createClass(HeaderComponent, [{
    key: "render",
    value: function render() {
      var style = {
        "height": "0"
      };
      return /*#__PURE__*/React.createElement("a", {
        id: "eachHeader",
        style: style,
        onLoad: this.onloadFunction.bind(this)
      }, this.props.children);
    }
  }, {
    key: "onloadFunction",
    value: function (_onloadFunction) {
      function onloadFunction() {
        return _onloadFunction.apply(this, arguments);
      }

      onloadFunction.toString = function () {
        return _onloadFunction.toString();
      };

      return onloadFunction;
    }(function () {
      var animation = requestAnimationFrame(onloadFunction);
      this.height++;
      this.style.height = "".concat(height, "%");
      console.log(this.height);

      if (this.height >= 100) {
        cancelAnimationFrame(animation);
        return;
      }
    })
  }]);

  return HeaderComponent;
}(React.Component);

var count = 0;

function setHeader() {
  ReactDOM.render( /*#__PURE__*/React.createElement("div", null, headers.map(function (eachHeader, index) {
    return /*#__PURE__*/React.createElement(HeaderComponent, null, eachHeader);
  })), header);
}

function setConrainer() {
  var display = requestAnimationFrame(setConrainer);
  bgcolors = bgcolors.map(function (bgcolor) {
    return ++bgcolor;
  });
  colors = colors.map(function (color) {
    return --color;
  });
  document.body.style.backgroundColor = arrayToRgb(bgcolors);
  document.body.style.color = arrayToRgb(colors);
  container.style.borderBottom = "1px solid " + arrayToRgb(colors);
  elts.text1.style.width = "".concat(text1Width - 70 / 255, "%");
  elts.text2.style.width = "".concat(text2Width - 70 / 255, "%");
  document.getElementById("temp").style.width = "".concat(text2Width - 70 / 255, "%");
  document.getElementById("header").style.width = "".concat(100 - (text2Width - 70 / 255), "%");
  text1Width -= 70 / 255;
  text2Width -= 70 / 255;
  count++;

  if (count == 255) {
    cancelAnimationFrame(display);
    setHeader();
    return 0;
  }
}

function setHeightContainer() {
  var heightContainer = requestAnimationFrame(setHeightContainer);

  if (containerHeight <= 8) {
    setConrainer();
    cancelAnimationFrame(heightContainer);
    return 0;
  }

  container.style.height = (containerHeight - plus).toString() + "%";
  content.style.height = (contentHeight + plus).toString() + "%";
  containerHeight -= plus;
  contentHeight += plus;
}

function setSizeDown(index) {
  var sizeDown = requestAnimationFrame(setSizeDown);
  var tempObj = document.getElementById("imgs")[index];
  var obj = tempObj.getElementsByTagName("img")[0];

  if (objHeight <= 0) {
    cancelAnimationFrame(sizeDown);
    return 0;
  }

  obj.style.height = (objHeight - 2).toString() + "%";
  objHeight = objHeight - 5;
}

function setSizeUp() {
  var sizeUp = requestAnimationFrame(setSizeUp);

  if (objHeight >= 100) {
    cancelAnimationFrame(sizeUp);
    return 0;
  }

  imgObj.style.height = (objHeight + 2).toString() + "%";
  objHeight = objHeight + 5;
}

function setSize(index, is_up) {
  imgObj = document.querySelectorAll("#imgs img")[index];

  if (is_up) {
    objHeight = 0;
    setSizeUp(index);
  } else {
    objHeight = 100;
    setSizeDown(index);
  }
}

function setImgs() {
  var div = /*#__PURE__*/React.createElement("div", {
    id: "imgs"
  }, imgs.map(function (img, index) {
    return /*#__PURE__*/React.createElement(Img, {
      src: "../sources/".concat(img)
    });
  }));
  ReactDOM.render(div, content);
  setTimeout(function () {
    console.log("");
    setSize(0, true);
  }, 3000);
} // Animation loop, which is called every frame.


function animate() {
  var animateAnimation = requestAnimationFrame(animate);
  var newTime = new Date();
  var shouldIncrementIndex = cooldown > 0;
  var dt = (newTime - time) / 1000;
  time = newTime;
  cooldown -= dt;

  if (cooldown <= 0) {
    if (shouldIncrementIndex) {
      textIndex++;
    }

    if (textIndex % texts.length == texts.length - 1) {
      setTimeout(function () {
        //setImgs()
        setHeightContainer();
      }, 2000);
      cancelAnimationFrame(animateAnimation);
      return 0;
    }

    doMorph();
  } else {
    doCooldown();
  }
}

function begin() {
  var showTexts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  texts = showTexts;
  elts.text1.textContent = "";
  elts.text2.textContent = "";
  textIndex = texts.length - 1;
  time = new Date();
  morph = 0;
  cooldown = cooldownTime;
  elts.text1.style.opacity = "0";
  elts.text2.style.opacity = "0";
  elts.text1.style.filter = "blur(100px)";
  elts.text2.style.filter = "blur(100px)";
  elts.text1.textContent = texts[textIndex % texts.length];
  elts.text2.textContent = texts[(textIndex + 1) % texts.length];
  animate();
} // Start the animation.


begin(["Post Corona-19", "Tour Guide", "Mini Book", "to", "Pangyo-dong,", "Bundang-gu,", "Seongnam-si", "with My Dream,", "Programmer", "Tour Guide to Pangyo-dong"]);