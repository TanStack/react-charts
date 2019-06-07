(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded chunks
/******/ 	// "0" means "already loaded"
/******/ 	var installedChunks = {
/******/ 		0: 0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// uncaught error handler for webpack runtime
/******/ 	__webpack_require__.oe = function(err) {
/******/ 		process.nextTick(function() {
/******/ 			throw err; // catch this error by using import().catch()
/******/ 		});
/******/ 	};
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 40);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Box; });
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_resizable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(39);
/* harmony import */ var react_resizable__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_resizable__WEBPACK_IMPORTED_MODULE_2__);



function Box(_ref) {
  var children = _ref.children,
      _ref$width = _ref.width,
      width = _ref$width === void 0 ? 500 : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? 300 : _ref$height,
      _ref$resizable = _ref.resizable,
      resizable = _ref$resizable === void 0 ? true : _ref$resizable,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? {} : _ref$style,
      className = _ref.className;
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, resizable ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_resizable__WEBPACK_IMPORTED_MODULE_2__["ResizableBox"], {
    width: width,
    height: height
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    style: _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, style, {
      width: '100%',
      height: '100%'
    }),
    className: className
  }, children)) : react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    style: _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({
      width: "".concat(width, "px"),
      height: "".concat(height, "px")
    }, style),
    className: className
  }, children));
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray2 = __webpack_require__(5);

var _typeof = __webpack_require__(13);

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopDefault(ex) {
  return ex && _typeof(ex) === 'object' && 'default' in ex ? ex['default'] : ex;
}

var React = _interopDefault(__webpack_require__(0));

var PropTypes = _interopDefault(__webpack_require__(24));

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var ChartContext = React.createContext();
var Utils = {
  getStatus: getStatus,
  getStatusStyle: getStatusStyle,
  buildStyleGetters: buildStyleGetters,
  getMultiAnchor: getMultiAnchor,
  getClosestPoint: getClosestPoint,
  normalizeGetter: normalizeGetter,
  isValidPoint: isValidPoint,
  getAxisByAxisID: getAxisByAxisID,
  getAxisIndexByAxisID: getAxisIndexByAxisID,
  sumObjBy: sumObjBy,
  translateX: translateX,
  translateY: translateY,
  translate: translate,
  identity: identity,
  shallowDiff: shallowDiff
};

function getStatus(item, focused) {
  var status = {
    focused: false,
    otherFocused: false
  };

  if (!focused) {
    return status;
  } // If the item is a datum


  if (typeof item.primary !== 'undefined') {
    var length = focused.group.length;

    for (var i = 0; i < length; i++) {
      if (focused.group[i].seriesID === item.series.id && focused.group[i].index === item.index) {
        status.focused = true;
        break;
      }
    }

    status.otherFocused = !status.focused; // For series
  } else if (focused.series) {
    status.focused = focused.series.id === item.id;
    status.otherFocused = !status.focused;
  }

  return status;
}

function getStatusStyle(item, status, decorator, defaults) {
  if (item.series) {
    defaults = _objectSpread({}, defaults, item.series.style);
  }

  return materializeStyles(decorator(_objectSpread({}, item, status)), defaults);
}

function buildStyleGetters(series, defaults) {
  series.getStatusStyle = function (focused, decorator) {
    var status = getStatus(series, focused);
    series.style = getStatusStyle(series, status, decorator, defaults);
    return series.style;
  }; // We also need to decorate each datum in the same fashion


  series.datums.forEach(function (datum) {
    datum.getStatusStyle = function (focused, decorator) {
      var status = getStatus(datum, focused);
      datum.style = getStatusStyle(datum, status, decorator, defaults);
      return datum.style;
    };
  });
}

function getMultiAnchor(_ref) {
  var anchor = _ref.anchor,
      points = _ref.points,
      gridWidth = _ref.gridWidth,
      gridHeight = _ref.gridHeight;

  var invalid = function invalid() {
    throw new Error("".concat(JSON.stringify(anchor), " is not a valid tooltip anchor option. You should use a single anchor option or 2 non-conflicting anchor options."));
  };

  var x;
  var y;
  var xMin = points[0].anchor.x;
  var xMax = points[0].anchor.x;
  var yMin = points[0].anchor.y;
  var yMax = points[0].anchor.y;
  points.forEach(function (point) {
    xMin = Math.min(point.anchor.x, xMin);
    xMax = Math.max(point.anchor.x, xMax);
    yMin = Math.min(point.anchor.y, yMin);
    yMax = Math.max(point.anchor.y, yMax);
  });

  if (anchor.length > 2) {
    return invalid();
  }

  anchor = anchor.sort(function (a) {
    return a.includes('center') || a.includes('Center') ? 1 : -1;
  });

  for (var i = 0; i < anchor.length; i++) {
    var anchorPart = anchor[i]; // Horizontal Positioning

    if (['left', 'right', 'gridLeft', 'gridRight'].includes(anchorPart)) {
      if (typeof x !== 'undefined') {
        invalid();
      }

      if (anchorPart === 'left') {
        x = xMin;
      } else if (anchorPart === 'right') {
        x = xMax;
      } else if (anchorPart === 'gridLeft') {
        x = 0;
      } else if (anchorPart === 'gridRight') {
        x = gridWidth;
      } else {
        invalid();
      }
    } // Vertical Positioning


    if (['top', 'bottom', 'gridTop', 'gridBottom'].includes(anchorPart)) {
      if (typeof y !== 'undefined') {
        invalid();
      }

      if (anchorPart === 'top') {
        y = yMin;
      } else if (anchorPart === 'bottom') {
        y = yMax;
      } else if (anchorPart === 'gridTop') {
        y = 0;
      } else if (anchorPart === 'gridBottom') {
        y = gridHeight;
      } else {
        invalid();
      }
    } // Center Positioning


    if (['center', 'gridCenter'].includes(anchorPart)) {
      if (anchorPart === 'center') {
        if (typeof y === 'undefined') {
          y = (yMin + yMax) / 2;
        }

        if (typeof x === 'undefined') {
          x = (xMin + xMax) / 2;
        }
      } else if (anchorPart === 'gridCenter') {
        if (typeof y === 'undefined') {
          y = gridHeight / 2;
        }

        if (typeof x === 'undefined') {
          x = gridWidth / 2;
        }
      } else {
        invalid();
      }
    } // Auto center the remainder if there is only one anchorPart listed


    if (anchor.length === 1) {
      if (anchor[0].includes('grid')) {
        anchor.push('gridCenter');
      } else {
        anchor.push('center');
      }
    }
  }

  return {
    x: x,
    y: y
  };
}

function getClosestPoint(position, datums) {
  if (!datums || !position || !datums.length) {
    return;
  }

  var closestDistance = Infinity;
  var closestDatum = datums[0];
  datums.forEach(function (datum) {
    datum.boundingPoints.forEach(function (pointerPoint) {
      var distance = Math.sqrt(Math.pow(pointerPoint.x - position.x, 2) + Math.pow(pointerPoint.y - position.y, 2));

      if (distance < closestDistance) {
        closestDistance = distance;
        closestDatum = datum;
      }
    });
  });
  return closestDatum;
}

function normalizeColor(style, defaults) {
  return _objectSpread({}, style, {
    stroke: style.stroke || style.color || defaults.stroke || defaults.color,
    fill: style.fill || style.color || defaults.fill || defaults.color
  });
}

var elementTypes = ['area', 'line', 'rectangle', 'circle'];

function materializeStyles() {
  var style = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var defaults = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  style = normalizeColor(style, defaults);

  for (var i = 0; i < elementTypes.length; i++) {
    var type = elementTypes[i];
    style[type] = style[type] ? materializeStyles(style[type], defaults) : {};
  }

  return style;
}

function normalizeGetter(getter) {
  if (typeof getter === 'function') {
    return getter;
  }

  return function (d) {
    return get(d, getter);
  };
}

function get(obj, path, def) {
  if (typeof obj === 'function') {
    try {
      return obj();
    } catch (e) {
      return path;
    }
  }

  if (!path) {
    return obj;
  }

  var pathObj = makePathArray(path);
  var val;

  try {
    val = pathObj.reduce(function (current, pathPart) {
      return current[pathPart];
    }, obj);
  } catch (e) {// do nothing
  }

  return typeof val !== 'undefined' ? val : def;
}

function makePathArray(obj) {
  return flattenDeep(obj).join('.').replace('[', '.').replace(']', '').split('.');
}

function flattenDeep(arr) {
  var newArr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (!Array.isArray(arr)) {
    newArr.push(arr);
  } else {
    for (var i = 0; i < arr.length; i++) {
      flattenDeep(arr[i], newArr);
    }
  }

  return newArr;
}

function isValidPoint(d) {
  if (d === null) {
    return false;
  }

  if (typeof d === 'undefined') {
    return false;
  }

  if (typeof d === 'string' && d === 'null') {
    return false;
  }

  return true;
}

function getAxisByAxisID(axes, AxisID) {
  return axes.find(function (d) {
    return d.id === AxisID;
  }) || axes[0];
}

function getAxisIndexByAxisID(axes, AxisID) {
  var index = axes.findIndex(function (d) {
    return d.id === AxisID;
  });
  return index > -1 ? index : 0;
}

function sumObjBy(obj, str) {
  return Object.keys(obj).map(function (key) {
    return obj[key];
  }).reduce(function (prev, curr) {
    return prev + curr[str] || 0;
  }, 0);
}

function translateX(x) {
  return "translate3d(".concat(Math.round(x), "px, 0, 0)");
}

function translateY(y) {
  return "translate3d(0, ".concat(Math.round(y), "px, 0)");
}

function translate(x, y) {
  return "translate3d(".concat(Math.round(x), "px, ").concat(Math.round(y), "px, 0)");
}

function identity(d) {
  return d;
}

function shallowDiff(a, b) {
  var aKeys = Object.keys(a);
  var bKeys = Object.keys(b);

  if (aKeys.length !== bKeys.length) {
    return true;
  }

  return Object.keys(a).some(function (key) {
    if (a[key] !== b[key]) {
      return true;
    }
  });
}

var running = false;
var scheduled = null;
var subscribers = [];

var schedule = function schedule(cb) {
  var instance = setTimeout(cb, 20);
  return function () {
    clearTimeout(instance);
  };
};

var tick = function tick() {
  subscribers.forEach(function (s) {
    return s();
  });

  if (running) {
    if (scheduled) {
      return;
    }

    scheduled = schedule(function () {
      scheduled = false;
      tick();
    });
  }
};

var onTick = function onTick(fn) {
  subscribers.push(fn);

  if (!running) {
    running = true;
    scheduled = schedule(function () {
      scheduled = false;
      tick();
    });
  }

  return function () {
    subscribers = subscribers.filter(function (d) {
      return d !== fn;
    });

    if (!subscribers.length) {
      running = false;

      if (scheduled) {
        scheduled();
      }
    }
  };
};

function onResize(element, fn) {
  var hash;

  var getHash = function getHash(element) {
    var dims = element.getBoundingClientRect();
    return [dims.width, dims.height].join('');
  };

  var unsubscribe = onTick(function () {
    var newHash = getHash(element);

    if (newHash !== hash) {
      hash = newHash;
      fn();
    }
  });
  return unsubscribe;
}

function useHyperResponsive(ref) {
  var _React$useState = React.useState({
    width: 0,
    height: 0
  }),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      _React$useState2$ = _React$useState2[0],
      width = _React$useState2$.width,
      height = _React$useState2$.height,
      setState = _React$useState2[1];

  var resize = React.useRef();

  resize.current = function () {
    if (!ref.current) {
      return;
    }

    var computed = window.getComputedStyle(ref.current.parentElement);
    var paddingTop = computed.paddingTop,
        paddingBottom = computed.paddingBottom,
        paddingLeft = computed.paddingLeft,
        paddingRight = computed.paddingRight,
        boxSizing = computed.boxSizing,
        borderTopWidth = computed.borderTopWidth,
        borderLeftWidth = computed.borderLeftWidth,
        borderRightWidth = computed.borderRightWidth,
        borderBottomWidth = computed.borderBottomWidth;
    var newWidth = computed.width,
        newHeight = computed.height;
    newWidth = parseInt(newWidth);
    newHeight = parseInt(newHeight);

    if (boxSizing === 'border-box') {
      newWidth -= parseInt(paddingLeft);
      newWidth -= parseInt(paddingRight);
      newHeight -= parseInt(paddingTop);
      newHeight -= parseInt(paddingBottom);
      newWidth -= parseInt(borderLeftWidth);
      newWidth -= parseInt(borderRightWidth);
      newHeight -= parseInt(borderTopWidth);
      newHeight -= parseInt(borderBottomWidth);
    }

    if (newWidth !== width || newHeight !== height) {
      setState(function () {
        return {
          width: newWidth,
          height: newHeight
        };
      });
    }
  };

  React.useEffect(function () {
    var stopListening = onResize(ref.current.parentElement, resize.current);
    return function () {
      stopListening();
    };
  }, [ref]);
  return [{
    width: width,
    height: height
  }];
}

function useLatestRef(latest) {
  var ref = React.useRef();
  ref.current = latest;
  return ref;
}

function useLatest(obj) {
  var when = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var ref = React.useRef();

  if (when) {
    ref.current = obj;
  }

  return ref.current;
}

function usePrevious(val) {
  var ref = React.useRef();
  React.useEffect(function () {
    ref.current = val;
  }, [val]);
  return ref.current;
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
  return module = {
    exports: {}
  }, fn(module, module.exports), module.exports;
}

var performanceNow = createCommonjsModule(function (module) {
  // Generated by CoffeeScript 1.12.2
  (function () {
    var getNanoSeconds, hrtime, loadTime, moduleLoadTime, nodeLoadTime, upTime;

    if (typeof performance !== "undefined" && performance !== null && performance.now) {
      module.exports = function () {
        return performance.now();
      };
    } else if (typeof process !== "undefined" && process !== null && process.hrtime) {
      module.exports = function () {
        return (getNanoSeconds() - nodeLoadTime) / 1e6;
      };

      hrtime = process.hrtime;

      getNanoSeconds = function getNanoSeconds() {
        var hr;
        hr = hrtime();
        return hr[0] * 1e9 + hr[1];
      };

      moduleLoadTime = getNanoSeconds();
      upTime = process.uptime() * 1e9;
      nodeLoadTime = moduleLoadTime - upTime;
    } else if (Date.now) {
      module.exports = function () {
        return Date.now() - loadTime;
      };

      loadTime = Date.now();
    } else {
      module.exports = function () {
        return new Date().getTime() - loadTime;
      };

      loadTime = new Date().getTime();
    }
  }).call(commonjsGlobal);
});
var root = typeof window === 'undefined' ? commonjsGlobal : window,
    vendors = ['moz', 'webkit'],
    suffix = 'AnimationFrame',
    raf = root['request' + suffix],
    caf = root['cancel' + suffix] || root['cancelRequest' + suffix];

for (var i = 0; !raf && i < vendors.length; i++) {
  raf = root[vendors[i] + 'Request' + suffix];
  caf = root[vendors[i] + 'Cancel' + suffix] || root[vendors[i] + 'CancelRequest' + suffix];
} // Some versions of FF have rAF but not cAF


if (!raf || !caf) {
  var last = 0,
      id = 0,
      queue = [],
      frameDuration = 1000 / 60;

  raf = function raf(callback) {
    if (queue.length === 0) {
      var _now = performanceNow(),
          next = Math.max(0, frameDuration - (_now - last));

      last = next + _now;
      setTimeout(function () {
        var cp = queue.slice(0); // Clear queue here to prevent
        // callbacks from appending listeners
        // to the current frame's queue

        queue.length = 0;

        for (var i = 0; i < cp.length; i++) {
          if (!cp[i].cancelled) {
            try {
              cp[i].callback(last);
            } catch (e) {
              setTimeout(function () {
                throw e;
              }, 0);
            }
          }
        }
      }, Math.round(next));
    }

    queue.push({
      handle: ++id,
      callback: callback,
      cancelled: false
    });
    return id;
  };

  caf = function caf(handle) {
    for (var i = 0; i < queue.length; i++) {
      if (queue[i].handle === handle) {
        queue[i].cancelled = true;
      }
    }
  };
}

var raf_1 = function raf_1(fn) {
  // Wrap in a new function to prevent
  // `cancel` potentially being assigned
  // to the native rAF function
  return raf.call(root, fn);
};

var cancel = function cancel() {
  caf.apply(root, arguments);
};

var polyfill = function polyfill(object) {
  if (!object) {
    object = root;
  }

  object.requestAnimationFrame = raf;
  object.cancelAnimationFrame = caf;
};

raf_1.cancel = cancel;
raf_1.polyfill = polyfill;
var defaultStyle = {
  strokeWidth: 0,
  fill: '#333',
  opacity: 1,
  rx: 0,
  ry: 0
};

var Rectangle =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Rectangle, _React$Component);

  function Rectangle() {
    _classCallCheck(this, Rectangle);

    return _possibleConstructorReturn(this, _getPrototypeOf(Rectangle).apply(this, arguments));
  }

  _createClass(Rectangle, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          style = _this$props.style,
          opacity = _this$props.opacity,
          x1 = _this$props.x1,
          y1 = _this$props.y1,
          x2 = _this$props.x2,
          y2 = _this$props.y2,
          rest = _objectWithoutProperties(_this$props, ["style", "opacity", "x1", "y1", "x2", "y2"]);

      var resolvedStyle = _objectSpread({}, defaultStyle, style);

      var xStart = Math.min(x1, x2);
      var yStart = Math.min(y1, y2);
      var xEnd = Math.max(x1, x2);
      var yEnd = Math.max(y1, y2);
      var height = Math.max(yEnd - yStart, 0);
      var width = Math.max(xEnd - xStart, 0);
      return React.createElement("rect", _extends({}, rest, {
        x: xStart,
        y: yStart,
        width: width,
        height: height,
        style: resolvedStyle
      }));
    }
  }]);

  return Rectangle;
}(React.Component);

_defineProperty(Rectangle, "defaultProps", {
  opacity: 1
});

function constant(x) {
  return function () {
    return x;
  };
}

function x(d) {
  return d[0];
}

function y(d) {
  return d[1];
}

function RedBlackTree() {
  this._ = null; // root node
}

function RedBlackNode(node) {
  node.U = // parent node
  node.C = // color - true for red, false for black
  node.L = // left node
  node.R = // right node
  node.P = // previous node
  node.N = null; // next node
}

RedBlackTree.prototype = {
  constructor: RedBlackTree,
  insert: function insert(after, node) {
    var parent, grandpa, uncle;

    if (after) {
      node.P = after;
      node.N = after.N;
      if (after.N) after.N.P = node;
      after.N = node;

      if (after.R) {
        after = after.R;

        while (after.L) {
          after = after.L;
        }

        after.L = node;
      } else {
        after.R = node;
      }

      parent = after;
    } else if (this._) {
      after = RedBlackFirst(this._);
      node.P = null;
      node.N = after;
      after.P = after.L = node;
      parent = after;
    } else {
      node.P = node.N = null;
      this._ = node;
      parent = null;
    }

    node.L = node.R = null;
    node.U = parent;
    node.C = true;
    after = node;

    while (parent && parent.C) {
      grandpa = parent.U;

      if (parent === grandpa.L) {
        uncle = grandpa.R;

        if (uncle && uncle.C) {
          parent.C = uncle.C = false;
          grandpa.C = true;
          after = grandpa;
        } else {
          if (after === parent.R) {
            RedBlackRotateLeft(this, parent);
            after = parent;
            parent = after.U;
          }

          parent.C = false;
          grandpa.C = true;
          RedBlackRotateRight(this, grandpa);
        }
      } else {
        uncle = grandpa.L;

        if (uncle && uncle.C) {
          parent.C = uncle.C = false;
          grandpa.C = true;
          after = grandpa;
        } else {
          if (after === parent.L) {
            RedBlackRotateRight(this, parent);
            after = parent;
            parent = after.U;
          }

          parent.C = false;
          grandpa.C = true;
          RedBlackRotateLeft(this, grandpa);
        }
      }

      parent = after.U;
    }

    this._.C = false;
  },
  remove: function remove(node) {
    if (node.N) node.N.P = node.P;
    if (node.P) node.P.N = node.N;
    node.N = node.P = null;
    var parent = node.U,
        sibling,
        left = node.L,
        right = node.R,
        next,
        red;
    if (!left) next = right;else if (!right) next = left;else next = RedBlackFirst(right);

    if (parent) {
      if (parent.L === node) parent.L = next;else parent.R = next;
    } else {
      this._ = next;
    }

    if (left && right) {
      red = next.C;
      next.C = node.C;
      next.L = left;
      left.U = next;

      if (next !== right) {
        parent = next.U;
        next.U = node.U;
        node = next.R;
        parent.L = node;
        next.R = right;
        right.U = next;
      } else {
        next.U = parent;
        parent = next;
        node = next.R;
      }
    } else {
      red = node.C;
      node = next;
    }

    if (node) node.U = parent;
    if (red) return;

    if (node && node.C) {
      node.C = false;
      return;
    }

    do {
      if (node === this._) break;

      if (node === parent.L) {
        sibling = parent.R;

        if (sibling.C) {
          sibling.C = false;
          parent.C = true;
          RedBlackRotateLeft(this, parent);
          sibling = parent.R;
        }

        if (sibling.L && sibling.L.C || sibling.R && sibling.R.C) {
          if (!sibling.R || !sibling.R.C) {
            sibling.L.C = false;
            sibling.C = true;
            RedBlackRotateRight(this, sibling);
            sibling = parent.R;
          }

          sibling.C = parent.C;
          parent.C = sibling.R.C = false;
          RedBlackRotateLeft(this, parent);
          node = this._;
          break;
        }
      } else {
        sibling = parent.L;

        if (sibling.C) {
          sibling.C = false;
          parent.C = true;
          RedBlackRotateRight(this, parent);
          sibling = parent.L;
        }

        if (sibling.L && sibling.L.C || sibling.R && sibling.R.C) {
          if (!sibling.L || !sibling.L.C) {
            sibling.R.C = false;
            sibling.C = true;
            RedBlackRotateLeft(this, sibling);
            sibling = parent.L;
          }

          sibling.C = parent.C;
          parent.C = sibling.L.C = false;
          RedBlackRotateRight(this, parent);
          node = this._;
          break;
        }
      }

      sibling.C = true;
      node = parent;
      parent = parent.U;
    } while (!node.C);

    if (node) node.C = false;
  }
};

function RedBlackRotateLeft(tree, node) {
  var p = node,
      q = node.R,
      parent = p.U;

  if (parent) {
    if (parent.L === p) parent.L = q;else parent.R = q;
  } else {
    tree._ = q;
  }

  q.U = parent;
  p.U = q;
  p.R = q.L;
  if (p.R) p.R.U = p;
  q.L = p;
}

function RedBlackRotateRight(tree, node) {
  var p = node,
      q = node.L,
      parent = p.U;

  if (parent) {
    if (parent.L === p) parent.L = q;else parent.R = q;
  } else {
    tree._ = q;
  }

  q.U = parent;
  p.U = q;
  p.L = q.R;
  if (p.L) p.L.U = p;
  q.R = p;
}

function RedBlackFirst(node) {
  while (node.L) {
    node = node.L;
  }

  return node;
}

function createEdge(left, right, v0, v1) {
  var edge = [null, null],
      index = edges.push(edge) - 1;
  edge.left = left;
  edge.right = right;
  if (v0) setEdgeEnd(edge, left, right, v0);
  if (v1) setEdgeEnd(edge, right, left, v1);
  cells[left.index].halfedges.push(index);
  cells[right.index].halfedges.push(index);
  return edge;
}

function createBorderEdge(left, v0, v1) {
  var edge = [v0, v1];
  edge.left = left;
  return edge;
}

function setEdgeEnd(edge, left, right, vertex) {
  if (!edge[0] && !edge[1]) {
    edge[0] = vertex;
    edge.left = left;
    edge.right = right;
  } else if (edge.left === right) {
    edge[1] = vertex;
  } else {
    edge[0] = vertex;
  }
} // Liang–Barsky line clipping.


function clipEdge(edge, x0, y0, x1, y1) {
  var a = edge[0],
      b = edge[1],
      ax = a[0],
      ay = a[1],
      bx = b[0],
      by = b[1],
      t0 = 0,
      t1 = 1,
      dx = bx - ax,
      dy = by - ay,
      r;
  r = x0 - ax;
  if (!dx && r > 0) return;
  r /= dx;

  if (dx < 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  } else if (dx > 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  }

  r = x1 - ax;
  if (!dx && r < 0) return;
  r /= dx;

  if (dx < 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  } else if (dx > 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  }

  r = y0 - ay;
  if (!dy && r > 0) return;
  r /= dy;

  if (dy < 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  } else if (dy > 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  }

  r = y1 - ay;
  if (!dy && r < 0) return;
  r /= dy;

  if (dy < 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  } else if (dy > 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  }

  if (!(t0 > 0) && !(t1 < 1)) return true; // TODO Better check?

  if (t0 > 0) edge[0] = [ax + t0 * dx, ay + t0 * dy];
  if (t1 < 1) edge[1] = [ax + t1 * dx, ay + t1 * dy];
  return true;
}

function connectEdge(edge, x0, y0, x1, y1) {
  var v1 = edge[1];
  if (v1) return true;
  var v0 = edge[0],
      left = edge.left,
      right = edge.right,
      lx = left[0],
      ly = left[1],
      rx = right[0],
      ry = right[1],
      fx = (lx + rx) / 2,
      fy = (ly + ry) / 2,
      fm,
      fb;

  if (ry === ly) {
    if (fx < x0 || fx >= x1) return;

    if (lx > rx) {
      if (!v0) v0 = [fx, y0];else if (v0[1] >= y1) return;
      v1 = [fx, y1];
    } else {
      if (!v0) v0 = [fx, y1];else if (v0[1] < y0) return;
      v1 = [fx, y0];
    }
  } else {
    fm = (lx - rx) / (ry - ly);
    fb = fy - fm * fx;

    if (fm < -1 || fm > 1) {
      if (lx > rx) {
        if (!v0) v0 = [(y0 - fb) / fm, y0];else if (v0[1] >= y1) return;
        v1 = [(y1 - fb) / fm, y1];
      } else {
        if (!v0) v0 = [(y1 - fb) / fm, y1];else if (v0[1] < y0) return;
        v1 = [(y0 - fb) / fm, y0];
      }
    } else {
      if (ly < ry) {
        if (!v0) v0 = [x0, fm * x0 + fb];else if (v0[0] >= x1) return;
        v1 = [x1, fm * x1 + fb];
      } else {
        if (!v0) v0 = [x1, fm * x1 + fb];else if (v0[0] < x0) return;
        v1 = [x0, fm * x0 + fb];
      }
    }
  }

  edge[0] = v0;
  edge[1] = v1;
  return true;
}

function clipEdges(x0, y0, x1, y1) {
  var i = edges.length,
      edge;

  while (i--) {
    if (!connectEdge(edge = edges[i], x0, y0, x1, y1) || !clipEdge(edge, x0, y0, x1, y1) || !(Math.abs(edge[0][0] - edge[1][0]) > epsilon || Math.abs(edge[0][1] - edge[1][1]) > epsilon)) {
      delete edges[i];
    }
  }
}

function createCell(site) {
  return cells[site.index] = {
    site: site,
    halfedges: []
  };
}

function cellHalfedgeAngle(cell, edge) {
  var site = cell.site,
      va = edge.left,
      vb = edge.right;
  if (site === vb) vb = va, va = site;
  if (vb) return Math.atan2(vb[1] - va[1], vb[0] - va[0]);
  if (site === va) va = edge[1], vb = edge[0];else va = edge[0], vb = edge[1];
  return Math.atan2(va[0] - vb[0], vb[1] - va[1]);
}

function cellHalfedgeStart(cell, edge) {
  return edge[+(edge.left !== cell.site)];
}

function cellHalfedgeEnd(cell, edge) {
  return edge[+(edge.left === cell.site)];
}

function sortCellHalfedges() {
  for (var i = 0, n = cells.length, cell, halfedges, j, m; i < n; ++i) {
    if ((cell = cells[i]) && (m = (halfedges = cell.halfedges).length)) {
      var index = new Array(m),
          array = new Array(m);

      for (j = 0; j < m; ++j) {
        index[j] = j, array[j] = cellHalfedgeAngle(cell, edges[halfedges[j]]);
      }

      index.sort(function (i, j) {
        return array[j] - array[i];
      });

      for (j = 0; j < m; ++j) {
        array[j] = halfedges[index[j]];
      }

      for (j = 0; j < m; ++j) {
        halfedges[j] = array[j];
      }
    }
  }
}

function clipCells(x0, y0, x1, y1) {
  var nCells = cells.length,
      iCell,
      cell,
      site,
      iHalfedge,
      halfedges,
      nHalfedges,
      start,
      startX,
      startY,
      end,
      endX,
      endY,
      cover = true;

  for (iCell = 0; iCell < nCells; ++iCell) {
    if (cell = cells[iCell]) {
      site = cell.site;
      halfedges = cell.halfedges;
      iHalfedge = halfedges.length; // Remove any dangling clipped edges.

      while (iHalfedge--) {
        if (!edges[halfedges[iHalfedge]]) {
          halfedges.splice(iHalfedge, 1);
        }
      } // Insert any border edges as necessary.


      iHalfedge = 0, nHalfedges = halfedges.length;

      while (iHalfedge < nHalfedges) {
        end = cellHalfedgeEnd(cell, edges[halfedges[iHalfedge]]), endX = end[0], endY = end[1];
        start = cellHalfedgeStart(cell, edges[halfedges[++iHalfedge % nHalfedges]]), startX = start[0], startY = start[1];

        if (Math.abs(endX - startX) > epsilon || Math.abs(endY - startY) > epsilon) {
          halfedges.splice(iHalfedge, 0, edges.push(createBorderEdge(site, end, Math.abs(endX - x0) < epsilon && y1 - endY > epsilon ? [x0, Math.abs(startX - x0) < epsilon ? startY : y1] : Math.abs(endY - y1) < epsilon && x1 - endX > epsilon ? [Math.abs(startY - y1) < epsilon ? startX : x1, y1] : Math.abs(endX - x1) < epsilon && endY - y0 > epsilon ? [x1, Math.abs(startX - x1) < epsilon ? startY : y0] : Math.abs(endY - y0) < epsilon && endX - x0 > epsilon ? [Math.abs(startY - y0) < epsilon ? startX : x0, y0] : null)) - 1);
          ++nHalfedges;
        }
      }

      if (nHalfedges) cover = false;
    }
  } // If there weren’t any edges, have the closest site cover the extent.
  // It doesn’t matter which corner of the extent we measure!


  if (cover) {
    var dx,
        dy,
        d2,
        dc = Infinity;

    for (iCell = 0, cover = null; iCell < nCells; ++iCell) {
      if (cell = cells[iCell]) {
        site = cell.site;
        dx = site[0] - x0;
        dy = site[1] - y0;
        d2 = dx * dx + dy * dy;
        if (d2 < dc) dc = d2, cover = cell;
      }
    }

    if (cover) {
      var v00 = [x0, y0],
          v01 = [x0, y1],
          v11 = [x1, y1],
          v10 = [x1, y0];
      cover.halfedges.push(edges.push(createBorderEdge(site = cover.site, v00, v01)) - 1, edges.push(createBorderEdge(site, v01, v11)) - 1, edges.push(createBorderEdge(site, v11, v10)) - 1, edges.push(createBorderEdge(site, v10, v00)) - 1);
    }
  } // Lastly delete any cells with no edges; these were entirely clipped.


  for (iCell = 0; iCell < nCells; ++iCell) {
    if (cell = cells[iCell]) {
      if (!cell.halfedges.length) {
        delete cells[iCell];
      }
    }
  }
}

var circlePool = [];
var firstCircle;

function Circle() {
  RedBlackNode(this);
  this.x = this.y = this.arc = this.site = this.cy = null;
}

function attachCircle(arc) {
  var lArc = arc.P,
      rArc = arc.N;
  if (!lArc || !rArc) return;
  var lSite = lArc.site,
      cSite = arc.site,
      rSite = rArc.site;
  if (lSite === rSite) return;
  var bx = cSite[0],
      by = cSite[1],
      ax = lSite[0] - bx,
      ay = lSite[1] - by,
      cx = rSite[0] - bx,
      cy = rSite[1] - by;
  var d = 2 * (ax * cy - ay * cx);
  if (d >= -epsilon2) return;
  var ha = ax * ax + ay * ay,
      hc = cx * cx + cy * cy,
      x = (cy * ha - ay * hc) / d,
      y = (ax * hc - cx * ha) / d;
  var circle = circlePool.pop() || new Circle();
  circle.arc = arc;
  circle.site = cSite;
  circle.x = x + bx;
  circle.y = (circle.cy = y + by) + Math.sqrt(x * x + y * y); // y bottom

  arc.circle = circle;
  var before = null,
      node = circles._;

  while (node) {
    if (circle.y < node.y || circle.y === node.y && circle.x <= node.x) {
      if (node.L) node = node.L;else {
        before = node.P;
        break;
      }
    } else {
      if (node.R) node = node.R;else {
        before = node;
        break;
      }
    }
  }

  circles.insert(before, circle);
  if (!before) firstCircle = circle;
}

function detachCircle(arc) {
  var circle = arc.circle;

  if (circle) {
    if (!circle.P) firstCircle = circle.N;
    circles.remove(circle);
    circlePool.push(circle);
    RedBlackNode(circle);
    arc.circle = null;
  }
}

var beachPool = [];

function Beach() {
  RedBlackNode(this);
  this.edge = this.site = this.circle = null;
}

function createBeach(site) {
  var beach = beachPool.pop() || new Beach();
  beach.site = site;
  return beach;
}

function detachBeach(beach) {
  detachCircle(beach);
  beaches.remove(beach);
  beachPool.push(beach);
  RedBlackNode(beach);
}

function removeBeach(beach) {
  var circle = beach.circle,
      x = circle.x,
      y = circle.cy,
      vertex = [x, y],
      previous = beach.P,
      next = beach.N,
      disappearing = [beach];
  detachBeach(beach);
  var lArc = previous;

  while (lArc.circle && Math.abs(x - lArc.circle.x) < epsilon && Math.abs(y - lArc.circle.cy) < epsilon) {
    previous = lArc.P;
    disappearing.unshift(lArc);
    detachBeach(lArc);
    lArc = previous;
  }

  disappearing.unshift(lArc);
  detachCircle(lArc);
  var rArc = next;

  while (rArc.circle && Math.abs(x - rArc.circle.x) < epsilon && Math.abs(y - rArc.circle.cy) < epsilon) {
    next = rArc.N;
    disappearing.push(rArc);
    detachBeach(rArc);
    rArc = next;
  }

  disappearing.push(rArc);
  detachCircle(rArc);
  var nArcs = disappearing.length,
      iArc;

  for (iArc = 1; iArc < nArcs; ++iArc) {
    rArc = disappearing[iArc];
    lArc = disappearing[iArc - 1];
    setEdgeEnd(rArc.edge, lArc.site, rArc.site, vertex);
  }

  lArc = disappearing[0];
  rArc = disappearing[nArcs - 1];
  rArc.edge = createEdge(lArc.site, rArc.site, null, vertex);
  attachCircle(lArc);
  attachCircle(rArc);
}

function addBeach(site) {
  var x = site[0],
      directrix = site[1],
      lArc,
      rArc,
      dxl,
      dxr,
      node = beaches._;

  while (node) {
    dxl = leftBreakPoint(node, directrix) - x;
    if (dxl > epsilon) node = node.L;else {
      dxr = x - rightBreakPoint(node, directrix);

      if (dxr > epsilon) {
        if (!node.R) {
          lArc = node;
          break;
        }

        node = node.R;
      } else {
        if (dxl > -epsilon) {
          lArc = node.P;
          rArc = node;
        } else if (dxr > -epsilon) {
          lArc = node;
          rArc = node.N;
        } else {
          lArc = rArc = node;
        }

        break;
      }
    }
  }

  createCell(site);
  var newArc = createBeach(site);
  beaches.insert(lArc, newArc);
  if (!lArc && !rArc) return;

  if (lArc === rArc) {
    detachCircle(lArc);
    rArc = createBeach(lArc.site);
    beaches.insert(newArc, rArc);
    newArc.edge = rArc.edge = createEdge(lArc.site, newArc.site);
    attachCircle(lArc);
    attachCircle(rArc);
    return;
  }

  if (!rArc) {
    // && lArc
    newArc.edge = createEdge(lArc.site, newArc.site);
    return;
  } // else lArc !== rArc


  detachCircle(lArc);
  detachCircle(rArc);
  var lSite = lArc.site,
      ax = lSite[0],
      ay = lSite[1],
      bx = site[0] - ax,
      by = site[1] - ay,
      rSite = rArc.site,
      cx = rSite[0] - ax,
      cy = rSite[1] - ay,
      d = 2 * (bx * cy - by * cx),
      hb = bx * bx + by * by,
      hc = cx * cx + cy * cy,
      vertex = [(cy * hb - by * hc) / d + ax, (bx * hc - cx * hb) / d + ay];
  setEdgeEnd(rArc.edge, lSite, rSite, vertex);
  newArc.edge = createEdge(lSite, site, null, vertex);
  rArc.edge = createEdge(site, rSite, null, vertex);
  attachCircle(lArc);
  attachCircle(rArc);
}

function leftBreakPoint(arc, directrix) {
  var site = arc.site,
      rfocx = site[0],
      rfocy = site[1],
      pby2 = rfocy - directrix;
  if (!pby2) return rfocx;
  var lArc = arc.P;
  if (!lArc) return -Infinity;
  site = lArc.site;
  var lfocx = site[0],
      lfocy = site[1],
      plby2 = lfocy - directrix;
  if (!plby2) return lfocx;
  var hl = lfocx - rfocx,
      aby2 = 1 / pby2 - 1 / plby2,
      b = hl / plby2;
  if (aby2) return (-b + Math.sqrt(b * b - 2 * aby2 * (hl * hl / (-2 * plby2) - lfocy + plby2 / 2 + rfocy - pby2 / 2))) / aby2 + rfocx;
  return (rfocx + lfocx) / 2;
}

function rightBreakPoint(arc, directrix) {
  var rArc = arc.N;
  if (rArc) return leftBreakPoint(rArc, directrix);
  var site = arc.site;
  return site[1] === directrix ? site[0] : Infinity;
}

var epsilon = 1e-6;
var epsilon2 = 1e-12;
var beaches;
var cells;
var circles;
var edges;

function triangleArea(a, b, c) {
  return (a[0] - c[0]) * (b[1] - a[1]) - (a[0] - b[0]) * (c[1] - a[1]);
}

function lexicographic(a, b) {
  return b[1] - a[1] || b[0] - a[0];
}

function Diagram(sites, extent) {
  var site = sites.sort(lexicographic).pop(),
      x,
      y,
      circle;
  edges = [];
  cells = new Array(sites.length);
  beaches = new RedBlackTree();
  circles = new RedBlackTree();

  while (true) {
    circle = firstCircle;

    if (site && (!circle || site[1] < circle.y || site[1] === circle.y && site[0] < circle.x)) {
      if (site[0] !== x || site[1] !== y) {
        addBeach(site);
        x = site[0], y = site[1];
      }

      site = sites.pop();
    } else if (circle) {
      removeBeach(circle.arc);
    } else {
      break;
    }
  }

  sortCellHalfedges();

  if (extent) {
    var x0 = +extent[0][0],
        y0 = +extent[0][1],
        x1 = +extent[1][0],
        y1 = +extent[1][1];
    clipEdges(x0, y0, x1, y1);
    clipCells(x0, y0, x1, y1);
  }

  this.edges = edges;
  this.cells = cells;
  beaches = circles = edges = cells = null;
}

Diagram.prototype = {
  constructor: Diagram,
  polygons: function polygons() {
    var edges = this.edges;
    return this.cells.map(function (cell) {
      var polygon = cell.halfedges.map(function (i) {
        return cellHalfedgeStart(cell, edges[i]);
      });
      polygon.data = cell.site.data;
      return polygon;
    });
  },
  triangles: function triangles() {
    var triangles = [],
        edges = this.edges;
    this.cells.forEach(function (cell, i) {
      if (!(m = (halfedges = cell.halfedges).length)) return;
      var site = cell.site,
          halfedges,
          j = -1,
          m,
          s0,
          e1 = edges[halfedges[m - 1]],
          s1 = e1.left === site ? e1.right : e1.left;

      while (++j < m) {
        s0 = s1;
        e1 = edges[halfedges[j]];
        s1 = e1.left === site ? e1.right : e1.left;

        if (s0 && s1 && i < s0.index && i < s1.index && triangleArea(site, s0, s1) < 0) {
          triangles.push([site.data, s0.data, s1.data]);
        }
      }
    });
    return triangles;
  },
  links: function links() {
    return this.edges.filter(function (edge) {
      return edge.right;
    }).map(function (edge) {
      return {
        source: edge.left.data,
        target: edge.right.data
      };
    });
  },
  find: function find(x, y, radius) {
    var that = this,
        i0,
        i1 = that._found || 0,
        n = that.cells.length,
        cell; // Use the previously-found cell, or start with an arbitrary one.

    while (!(cell = that.cells[i1])) {
      if (++i1 >= n) return null;
    }

    var dx = x - cell.site[0],
        dy = y - cell.site[1],
        d2 = dx * dx + dy * dy; // Traverse the half-edges to find a closer cell, if any.

    do {
      cell = that.cells[i0 = i1], i1 = null;
      cell.halfedges.forEach(function (e) {
        var edge = that.edges[e],
            v = edge.left;
        if ((v === cell.site || !v) && !(v = edge.right)) return;
        var vx = x - v[0],
            vy = y - v[1],
            v2 = vx * vx + vy * vy;
        if (v2 < d2) d2 = v2, i1 = v.index;
      });
    } while (i1 !== null);

    that._found = i0;
    return radius == null || d2 <= radius * radius ? cell.site : null;
  }
};

function voronoi() {
  var x$1 = x,
      y$1 = y,
      extent = null;

  function voronoi(data) {
    return new Diagram(data.map(function (d, i) {
      var s = [Math.round(x$1(d, i, data) / epsilon) * epsilon, Math.round(y$1(d, i, data) / epsilon) * epsilon];
      s.index = i;
      s.data = d;
      return s;
    }), extent);
  }

  voronoi.polygons = function (data) {
    return voronoi(data).polygons();
  };

  voronoi.links = function (data) {
    return voronoi(data).links();
  };

  voronoi.triangles = function (data) {
    return voronoi(data).triangles();
  };

  voronoi.x = function (_) {
    return arguments.length ? (x$1 = typeof _ === "function" ? _ : constant(+_), voronoi) : x$1;
  };

  voronoi.y = function (_) {
    return arguments.length ? (y$1 = typeof _ === "function" ? _ : constant(+_), voronoi) : y$1;
  };

  voronoi.extent = function (_) {
    return arguments.length ? (extent = _ == null ? null : [[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]], voronoi) : extent && [[extent[0][0], extent[0][1]], [extent[1][0], extent[1][1]]];
  };

  voronoi.size = function (_) {
    return arguments.length ? (extent = _ == null ? null : [[0, 0], [+_[0], +_[1]]], voronoi) : extent && [extent[1][0] - extent[0][0], extent[1][1] - extent[0][1]];
  };

  return voronoi;
}

var pi = Math.PI,
    tau = 2 * pi,
    epsilon$1 = 1e-6,
    tauEpsilon = tau - epsilon$1;

function Path() {
  this._x0 = this._y0 = // start of current subpath
  this._x1 = this._y1 = null; // end of current subpath

  this._ = "";
}

function path() {
  return new Path();
}

Path.prototype = path.prototype = {
  constructor: Path,
  moveTo: function moveTo(x, y) {
    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y);
  },
  closePath: function closePath() {
    if (this._x1 !== null) {
      this._x1 = this._x0, this._y1 = this._y0;
      this._ += "Z";
    }
  },
  lineTo: function lineTo(x, y) {
    this._ += "L" + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  quadraticCurveTo: function quadraticCurveTo(x1, y1, x, y) {
    this._ += "Q" + +x1 + "," + +y1 + "," + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  bezierCurveTo: function bezierCurveTo(x1, y1, x2, y2, x, y) {
    this._ += "C" + +x1 + "," + +y1 + "," + +x2 + "," + +y2 + "," + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  arcTo: function arcTo(x1, y1, x2, y2, r) {
    x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;
    var x0 = this._x1,
        y0 = this._y1,
        x21 = x2 - x1,
        y21 = y2 - y1,
        x01 = x0 - x1,
        y01 = y0 - y1,
        l01_2 = x01 * x01 + y01 * y01; // Is the radius negative? Error.

    if (r < 0) throw new Error("negative radius: " + r); // Is this path empty? Move to (x1,y1).

    if (this._x1 === null) {
      this._ += "M" + (this._x1 = x1) + "," + (this._y1 = y1);
    } // Or, is (x1,y1) coincident with (x0,y0)? Do nothing.
    else if (!(l01_2 > epsilon$1)) ; // Or, are (x0,y0), (x1,y1) and (x2,y2) collinear?
      // Equivalently, is (x1,y1) coincident with (x2,y2)?
      // Or, is the radius zero? Line to (x1,y1).
      else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon$1) || !r) {
          this._ += "L" + (this._x1 = x1) + "," + (this._y1 = y1);
        } // Otherwise, draw an arc!
        else {
            var x20 = x2 - x0,
                y20 = y2 - y0,
                l21_2 = x21 * x21 + y21 * y21,
                l20_2 = x20 * x20 + y20 * y20,
                l21 = Math.sqrt(l21_2),
                l01 = Math.sqrt(l01_2),
                l = r * Math.tan((pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2),
                t01 = l / l01,
                t21 = l / l21; // If the start tangent is not coincident with (x0,y0), line to.

            if (Math.abs(t01 - 1) > epsilon$1) {
              this._ += "L" + (x1 + t01 * x01) + "," + (y1 + t01 * y01);
            }

            this._ += "A" + r + "," + r + ",0,0," + +(y01 * x20 > x01 * y20) + "," + (this._x1 = x1 + t21 * x21) + "," + (this._y1 = y1 + t21 * y21);
          }
  },
  arc: function arc(x, y, r, a0, a1, ccw) {
    x = +x, y = +y, r = +r;
    var dx = r * Math.cos(a0),
        dy = r * Math.sin(a0),
        x0 = x + dx,
        y0 = y + dy,
        cw = 1 ^ ccw,
        da = ccw ? a0 - a1 : a1 - a0; // Is the radius negative? Error.

    if (r < 0) throw new Error("negative radius: " + r); // Is this path empty? Move to (x0,y0).

    if (this._x1 === null) {
      this._ += "M" + x0 + "," + y0;
    } // Or, is (x0,y0) not coincident with the previous point? Line to (x0,y0).
    else if (Math.abs(this._x1 - x0) > epsilon$1 || Math.abs(this._y1 - y0) > epsilon$1) {
        this._ += "L" + x0 + "," + y0;
      } // Is this arc empty? We’re done.


    if (!r) return; // Does the angle go the wrong way? Flip the direction.

    if (da < 0) da = da % tau + tau; // Is this a complete circle? Draw two arcs to complete the circle.

    if (da > tauEpsilon) {
      this._ += "A" + r + "," + r + ",0,1," + cw + "," + (x - dx) + "," + (y - dy) + "A" + r + "," + r + ",0,1," + cw + "," + (this._x1 = x0) + "," + (this._y1 = y0);
    } // Is this arc non-empty? Draw an arc!
    else if (da > epsilon$1) {
        this._ += "A" + r + "," + r + ",0," + +(da >= pi) + "," + cw + "," + (this._x1 = x + r * Math.cos(a1)) + "," + (this._y1 = y + r * Math.sin(a1));
      }
  },
  rect: function rect(x, y, w, h) {
    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y) + "h" + +w + "v" + +h + "h" + -w + "Z";
  },
  toString: function toString() {
    return this._;
  }
};

function constant$1(x) {
  return function constant() {
    return x;
  };
}

var epsilon$2 = 1e-12;
var pi$1 = Math.PI;

function Linear(context) {
  this._context = context;
}

Linear.prototype = {
  areaStart: function areaStart() {
    this._line = 0;
  },
  areaEnd: function areaEnd() {
    this._line = NaN;
  },
  lineStart: function lineStart() {
    this._point = 0;
  },
  lineEnd: function lineEnd() {
    if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function point(x, y) {
    x = +x, y = +y;

    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
        break;

      case 1:
        this._point = 2;
      // proceed

      default:
        this._context.lineTo(x, y);

        break;
    }
  }
};

function curveLinear(context) {
  return new Linear(context);
}

function x$1(p) {
  return p[0];
}

function y$1(p) {
  return p[1];
}

function line() {
  var x = x$1,
      y = y$1,
      defined = constant$1(true),
      context = null,
      curve = curveLinear,
      output = null;

  function line(data) {
    var i,
        n = data.length,
        d,
        defined0 = false,
        buffer;
    if (context == null) output = curve(buffer = path());

    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
        if (defined0 = !defined0) output.lineStart();else output.lineEnd();
      }

      if (defined0) output.point(+x(d, i, data), +y(d, i, data));
    }

    if (buffer) return output = null, buffer + "" || null;
  }

  line.x = function (_) {
    return arguments.length ? (x = typeof _ === "function" ? _ : constant$1(+_), line) : x;
  };

  line.y = function (_) {
    return arguments.length ? (y = typeof _ === "function" ? _ : constant$1(+_), line) : y;
  };

  line.defined = function (_) {
    return arguments.length ? (defined = typeof _ === "function" ? _ : constant$1(!!_), line) : defined;
  };

  line.curve = function (_) {
    return arguments.length ? (curve = _, context != null && (output = curve(context)), line) : curve;
  };

  line.context = function (_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line) : context;
  };

  return line;
}

function area() {
  var x0 = x$1,
      x1 = null,
      y0 = constant$1(0),
      y1 = y$1,
      defined = constant$1(true),
      context = null,
      curve = curveLinear,
      output = null;

  function area(data) {
    var i,
        j,
        k,
        n = data.length,
        d,
        defined0 = false,
        buffer,
        x0z = new Array(n),
        y0z = new Array(n);
    if (context == null) output = curve(buffer = path());

    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
        if (defined0 = !defined0) {
          j = i;
          output.areaStart();
          output.lineStart();
        } else {
          output.lineEnd();
          output.lineStart();

          for (k = i - 1; k >= j; --k) {
            output.point(x0z[k], y0z[k]);
          }

          output.lineEnd();
          output.areaEnd();
        }
      }

      if (defined0) {
        x0z[i] = +x0(d, i, data), y0z[i] = +y0(d, i, data);
        output.point(x1 ? +x1(d, i, data) : x0z[i], y1 ? +y1(d, i, data) : y0z[i]);
      }
    }

    if (buffer) return output = null, buffer + "" || null;
  }

  function arealine() {
    return line().defined(defined).curve(curve).context(context);
  }

  area.x = function (_) {
    return arguments.length ? (x0 = typeof _ === "function" ? _ : constant$1(+_), x1 = null, area) : x0;
  };

  area.x0 = function (_) {
    return arguments.length ? (x0 = typeof _ === "function" ? _ : constant$1(+_), area) : x0;
  };

  area.x1 = function (_) {
    return arguments.length ? (x1 = _ == null ? null : typeof _ === "function" ? _ : constant$1(+_), area) : x1;
  };

  area.y = function (_) {
    return arguments.length ? (y0 = typeof _ === "function" ? _ : constant$1(+_), y1 = null, area) : y0;
  };

  area.y0 = function (_) {
    return arguments.length ? (y0 = typeof _ === "function" ? _ : constant$1(+_), area) : y0;
  };

  area.y1 = function (_) {
    return arguments.length ? (y1 = _ == null ? null : typeof _ === "function" ? _ : constant$1(+_), area) : y1;
  };

  area.lineX0 = area.lineY0 = function () {
    return arealine().x(x0).y(y0);
  };

  area.lineY1 = function () {
    return arealine().x(x0).y(y1);
  };

  area.lineX1 = function () {
    return arealine().x(x1).y(y0);
  };

  area.defined = function (_) {
    return arguments.length ? (defined = typeof _ === "function" ? _ : constant$1(!!_), area) : defined;
  };

  area.curve = function (_) {
    return arguments.length ? (curve = _, context != null && (output = curve(context)), area) : curve;
  };

  area.context = function (_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), area) : context;
  };

  return area;
}

function noop() {}

function _point(that, x, y) {
  that._context.bezierCurveTo((2 * that._x0 + that._x1) / 3, (2 * that._y0 + that._y1) / 3, (that._x0 + 2 * that._x1) / 3, (that._y0 + 2 * that._y1) / 3, (that._x0 + 4 * that._x1 + x) / 6, (that._y0 + 4 * that._y1 + y) / 6);
}

function Basis(context) {
  this._context = context;
}

Basis.prototype = {
  areaStart: function areaStart() {
    this._line = 0;
  },
  areaEnd: function areaEnd() {
    this._line = NaN;
  },
  lineStart: function lineStart() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN;
    this._point = 0;
  },
  lineEnd: function lineEnd() {
    switch (this._point) {
      case 3:
        _point(this, this._x1, this._y1);

      // proceed

      case 2:
        this._context.lineTo(this._x1, this._y1);

        break;
    }

    if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function point(x, y) {
    x = +x, y = +y;

    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
        break;

      case 1:
        this._point = 2;
        break;

      case 2:
        this._point = 3;

        this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);

      // proceed

      default:
        _point(this, x, y);

        break;
    }

    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  }
};

function curveBasis(context) {
  return new Basis(context);
}

function BasisClosed(context) {
  this._context = context;
}

BasisClosed.prototype = {
  areaStart: noop,
  areaEnd: noop,
  lineStart: function lineStart() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN;
    this._point = 0;
  },
  lineEnd: function lineEnd() {
    switch (this._point) {
      case 1:
        {
          this._context.moveTo(this._x2, this._y2);

          this._context.closePath();

          break;
        }

      case 2:
        {
          this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3);

          this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3);

          this._context.closePath();

          break;
        }

      case 3:
        {
          this.point(this._x2, this._y2);
          this.point(this._x3, this._y3);
          this.point(this._x4, this._y4);
          break;
        }
    }
  },
  point: function point(x, y) {
    x = +x, y = +y;

    switch (this._point) {
      case 0:
        this._point = 1;
        this._x2 = x, this._y2 = y;
        break;

      case 1:
        this._point = 2;
        this._x3 = x, this._y3 = y;
        break;

      case 2:
        this._point = 3;
        this._x4 = x, this._y4 = y;

        this._context.moveTo((this._x0 + 4 * this._x1 + x) / 6, (this._y0 + 4 * this._y1 + y) / 6);

        break;

      default:
        _point(this, x, y);

        break;
    }

    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  }
};

function curveBasisClosed(context) {
  return new BasisClosed(context);
}

function BasisOpen(context) {
  this._context = context;
}

BasisOpen.prototype = {
  areaStart: function areaStart() {
    this._line = 0;
  },
  areaEnd: function areaEnd() {
    this._line = NaN;
  },
  lineStart: function lineStart() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN;
    this._point = 0;
  },
  lineEnd: function lineEnd() {
    if (this._line || this._line !== 0 && this._point === 3) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function point(x, y) {
    x = +x, y = +y;

    switch (this._point) {
      case 0:
        this._point = 1;
        break;

      case 1:
        this._point = 2;
        break;

      case 2:
        this._point = 3;
        var x0 = (this._x0 + 4 * this._x1 + x) / 6,
            y0 = (this._y0 + 4 * this._y1 + y) / 6;
        this._line ? this._context.lineTo(x0, y0) : this._context.moveTo(x0, y0);
        break;

      case 3:
        this._point = 4;
      // proceed

      default:
        _point(this, x, y);

        break;
    }

    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  }
};

function curveBasisOpen(context) {
  return new BasisOpen(context);
}

function Bundle(context, beta) {
  this._basis = new Basis(context);
  this._beta = beta;
}

Bundle.prototype = {
  lineStart: function lineStart() {
    this._x = [];
    this._y = [];

    this._basis.lineStart();
  },
  lineEnd: function lineEnd() {
    var x = this._x,
        y = this._y,
        j = x.length - 1;

    if (j > 0) {
      var x0 = x[0],
          y0 = y[0],
          dx = x[j] - x0,
          dy = y[j] - y0,
          i = -1,
          t;

      while (++i <= j) {
        t = i / j;

        this._basis.point(this._beta * x[i] + (1 - this._beta) * (x0 + t * dx), this._beta * y[i] + (1 - this._beta) * (y0 + t * dy));
      }
    }

    this._x = this._y = null;

    this._basis.lineEnd();
  },
  point: function point(x, y) {
    this._x.push(+x);

    this._y.push(+y);
  }
};

var curveBundle = function custom(beta) {
  function bundle(context) {
    return beta === 1 ? new Basis(context) : new Bundle(context, beta);
  }

  bundle.beta = function (beta) {
    return custom(+beta);
  };

  return bundle;
}(0.85);

function point$1(that, x, y) {
  that._context.bezierCurveTo(that._x1 + that._k * (that._x2 - that._x0), that._y1 + that._k * (that._y2 - that._y0), that._x2 + that._k * (that._x1 - x), that._y2 + that._k * (that._y1 - y), that._x2, that._y2);
}

function Cardinal(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}

Cardinal.prototype = {
  areaStart: function areaStart() {
    this._line = 0;
  },
  areaEnd: function areaEnd() {
    this._line = NaN;
  },
  lineStart: function lineStart() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
    this._point = 0;
  },
  lineEnd: function lineEnd() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x2, this._y2);

        break;

      case 3:
        point$1(this, this._x1, this._y1);
        break;
    }

    if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function point(x, y) {
    x = +x, y = +y;

    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
        break;

      case 1:
        this._point = 2;
        this._x1 = x, this._y1 = y;
        break;

      case 2:
        this._point = 3;
      // proceed

      default:
        point$1(this, x, y);
        break;
    }

    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var curveCardinal = function custom(tension) {
  function cardinal(context) {
    return new Cardinal(context, tension);
  }

  cardinal.tension = function (tension) {
    return custom(+tension);
  };

  return cardinal;
}(0);

function CardinalClosed(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}

CardinalClosed.prototype = {
  areaStart: noop,
  areaEnd: noop,
  lineStart: function lineStart() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
    this._point = 0;
  },
  lineEnd: function lineEnd() {
    switch (this._point) {
      case 1:
        {
          this._context.moveTo(this._x3, this._y3);

          this._context.closePath();

          break;
        }

      case 2:
        {
          this._context.lineTo(this._x3, this._y3);

          this._context.closePath();

          break;
        }

      case 3:
        {
          this.point(this._x3, this._y3);
          this.point(this._x4, this._y4);
          this.point(this._x5, this._y5);
          break;
        }
    }
  },
  point: function point(x, y) {
    x = +x, y = +y;

    switch (this._point) {
      case 0:
        this._point = 1;
        this._x3 = x, this._y3 = y;
        break;

      case 1:
        this._point = 2;

        this._context.moveTo(this._x4 = x, this._y4 = y);

        break;

      case 2:
        this._point = 3;
        this._x5 = x, this._y5 = y;
        break;

      default:
        point$1(this, x, y);
        break;
    }

    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var curveCardinalClosed = function custom(tension) {
  function cardinal(context) {
    return new CardinalClosed(context, tension);
  }

  cardinal.tension = function (tension) {
    return custom(+tension);
  };

  return cardinal;
}(0);

function CardinalOpen(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}

CardinalOpen.prototype = {
  areaStart: function areaStart() {
    this._line = 0;
  },
  areaEnd: function areaEnd() {
    this._line = NaN;
  },
  lineStart: function lineStart() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
    this._point = 0;
  },
  lineEnd: function lineEnd() {
    if (this._line || this._line !== 0 && this._point === 3) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function point(x, y) {
    x = +x, y = +y;

    switch (this._point) {
      case 0:
        this._point = 1;
        break;

      case 1:
        this._point = 2;
        break;

      case 2:
        this._point = 3;
        this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
        break;

      case 3:
        this._point = 4;
      // proceed

      default:
        point$1(this, x, y);
        break;
    }

    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var curveCardinalOpen = function custom(tension) {
  function cardinal(context) {
    return new CardinalOpen(context, tension);
  }

  cardinal.tension = function (tension) {
    return custom(+tension);
  };

  return cardinal;
}(0);

function point$2(that, x, y) {
  var x1 = that._x1,
      y1 = that._y1,
      x2 = that._x2,
      y2 = that._y2;

  if (that._l01_a > epsilon$2) {
    var a = 2 * that._l01_2a + 3 * that._l01_a * that._l12_a + that._l12_2a,
        n = 3 * that._l01_a * (that._l01_a + that._l12_a);
    x1 = (x1 * a - that._x0 * that._l12_2a + that._x2 * that._l01_2a) / n;
    y1 = (y1 * a - that._y0 * that._l12_2a + that._y2 * that._l01_2a) / n;
  }

  if (that._l23_a > epsilon$2) {
    var b = 2 * that._l23_2a + 3 * that._l23_a * that._l12_a + that._l12_2a,
        m = 3 * that._l23_a * (that._l23_a + that._l12_a);
    x2 = (x2 * b + that._x1 * that._l23_2a - x * that._l12_2a) / m;
    y2 = (y2 * b + that._y1 * that._l23_2a - y * that._l12_2a) / m;
  }

  that._context.bezierCurveTo(x1, y1, x2, y2, that._x2, that._y2);
}

function CatmullRom(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}

CatmullRom.prototype = {
  areaStart: function areaStart() {
    this._line = 0;
  },
  areaEnd: function areaEnd() {
    this._line = NaN;
  },
  lineStart: function lineStart() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
    this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  },
  lineEnd: function lineEnd() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x2, this._y2);

        break;

      case 3:
        this.point(this._x2, this._y2);
        break;
    }

    if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function point(x, y) {
    x = +x, y = +y;

    if (this._point) {
      var x23 = this._x2 - x,
          y23 = this._y2 - y;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }

    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
        break;

      case 1:
        this._point = 2;
        break;

      case 2:
        this._point = 3;
      // proceed

      default:
        point$2(this, x, y);
        break;
    }

    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var curveCatmullRom = function custom(alpha) {
  function catmullRom(context) {
    return alpha ? new CatmullRom(context, alpha) : new Cardinal(context, 0);
  }

  catmullRom.alpha = function (alpha) {
    return custom(+alpha);
  };

  return catmullRom;
}(0.5);

function CatmullRomClosed(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}

CatmullRomClosed.prototype = {
  areaStart: noop,
  areaEnd: noop,
  lineStart: function lineStart() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
    this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  },
  lineEnd: function lineEnd() {
    switch (this._point) {
      case 1:
        {
          this._context.moveTo(this._x3, this._y3);

          this._context.closePath();

          break;
        }

      case 2:
        {
          this._context.lineTo(this._x3, this._y3);

          this._context.closePath();

          break;
        }

      case 3:
        {
          this.point(this._x3, this._y3);
          this.point(this._x4, this._y4);
          this.point(this._x5, this._y5);
          break;
        }
    }
  },
  point: function point(x, y) {
    x = +x, y = +y;

    if (this._point) {
      var x23 = this._x2 - x,
          y23 = this._y2 - y;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }

    switch (this._point) {
      case 0:
        this._point = 1;
        this._x3 = x, this._y3 = y;
        break;

      case 1:
        this._point = 2;

        this._context.moveTo(this._x4 = x, this._y4 = y);

        break;

      case 2:
        this._point = 3;
        this._x5 = x, this._y5 = y;
        break;

      default:
        point$2(this, x, y);
        break;
    }

    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var curveCatmullRomClosed = function custom(alpha) {
  function catmullRom(context) {
    return alpha ? new CatmullRomClosed(context, alpha) : new CardinalClosed(context, 0);
  }

  catmullRom.alpha = function (alpha) {
    return custom(+alpha);
  };

  return catmullRom;
}(0.5);

function CatmullRomOpen(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}

CatmullRomOpen.prototype = {
  areaStart: function areaStart() {
    this._line = 0;
  },
  areaEnd: function areaEnd() {
    this._line = NaN;
  },
  lineStart: function lineStart() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
    this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  },
  lineEnd: function lineEnd() {
    if (this._line || this._line !== 0 && this._point === 3) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function point(x, y) {
    x = +x, y = +y;

    if (this._point) {
      var x23 = this._x2 - x,
          y23 = this._y2 - y;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }

    switch (this._point) {
      case 0:
        this._point = 1;
        break;

      case 1:
        this._point = 2;
        break;

      case 2:
        this._point = 3;
        this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
        break;

      case 3:
        this._point = 4;
      // proceed

      default:
        point$2(this, x, y);
        break;
    }

    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var curveCatmullRomOpen = function custom(alpha) {
  function catmullRom(context) {
    return alpha ? new CatmullRomOpen(context, alpha) : new CardinalOpen(context, 0);
  }

  catmullRom.alpha = function (alpha) {
    return custom(+alpha);
  };

  return catmullRom;
}(0.5);

function LinearClosed(context) {
  this._context = context;
}

LinearClosed.prototype = {
  areaStart: noop,
  areaEnd: noop,
  lineStart: function lineStart() {
    this._point = 0;
  },
  lineEnd: function lineEnd() {
    if (this._point) this._context.closePath();
  },
  point: function point(x, y) {
    x = +x, y = +y;
    if (this._point) this._context.lineTo(x, y);else this._point = 1, this._context.moveTo(x, y);
  }
};

function curveLinearClosed(context) {
  return new LinearClosed(context);
}

function sign(x) {
  return x < 0 ? -1 : 1;
} // Calculate the slopes of the tangents (Hermite-type interpolation) based on
// the following paper: Steffen, M. 1990. A Simple Method for Monotonic
// Interpolation in One Dimension. Astronomy and Astrophysics, Vol. 239, NO.
// NOV(II), P. 443, 1990.


function slope3(that, x2, y2) {
  var h0 = that._x1 - that._x0,
      h1 = x2 - that._x1,
      s0 = (that._y1 - that._y0) / (h0 || h1 < 0 && -0),
      s1 = (y2 - that._y1) / (h1 || h0 < 0 && -0),
      p = (s0 * h1 + s1 * h0) / (h0 + h1);
  return (sign(s0) + sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p)) || 0;
} // Calculate a one-sided slope.


function slope2(that, t) {
  var h = that._x1 - that._x0;
  return h ? (3 * (that._y1 - that._y0) / h - t) / 2 : t;
} // According to https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Representations
// "you can express cubic Hermite interpolation in terms of cubic Bézier curves
// with respect to the four values p0, p0 + m0 / 3, p1 - m1 / 3, p1".


function point$3(that, t0, t1) {
  var x0 = that._x0,
      y0 = that._y0,
      x1 = that._x1,
      y1 = that._y1,
      dx = (x1 - x0) / 3;

  that._context.bezierCurveTo(x0 + dx, y0 + dx * t0, x1 - dx, y1 - dx * t1, x1, y1);
}

function MonotoneX(context) {
  this._context = context;
}

MonotoneX.prototype = {
  areaStart: function areaStart() {
    this._line = 0;
  },
  areaEnd: function areaEnd() {
    this._line = NaN;
  },
  lineStart: function lineStart() {
    this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN;
    this._point = 0;
  },
  lineEnd: function lineEnd() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x1, this._y1);

        break;

      case 3:
        point$3(this, this._t0, slope2(this, this._t0));
        break;
    }

    if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function point(x, y) {
    var t1 = NaN;
    x = +x, y = +y;
    if (x === this._x1 && y === this._y1) return; // Ignore coincident points.

    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
        break;

      case 1:
        this._point = 2;
        break;

      case 2:
        this._point = 3;
        point$3(this, slope2(this, t1 = slope3(this, x, y)), t1);
        break;

      default:
        point$3(this, this._t0, t1 = slope3(this, x, y));
        break;
    }

    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
    this._t0 = t1;
  }
};

function MonotoneY(context) {
  this._context = new ReflectContext(context);
}

(MonotoneY.prototype = Object.create(MonotoneX.prototype)).point = function (x, y) {
  MonotoneX.prototype.point.call(this, y, x);
};

function ReflectContext(context) {
  this._context = context;
}

ReflectContext.prototype = {
  moveTo: function moveTo(x, y) {
    this._context.moveTo(y, x);
  },
  closePath: function closePath() {
    this._context.closePath();
  },
  lineTo: function lineTo(x, y) {
    this._context.lineTo(y, x);
  },
  bezierCurveTo: function bezierCurveTo(x1, y1, x2, y2, x, y) {
    this._context.bezierCurveTo(y1, x1, y2, x2, y, x);
  }
};

function monotoneX(context) {
  return new MonotoneX(context);
}

function monotoneY(context) {
  return new MonotoneY(context);
}

function Natural(context) {
  this._context = context;
}

Natural.prototype = {
  areaStart: function areaStart() {
    this._line = 0;
  },
  areaEnd: function areaEnd() {
    this._line = NaN;
  },
  lineStart: function lineStart() {
    this._x = [];
    this._y = [];
  },
  lineEnd: function lineEnd() {
    var x = this._x,
        y = this._y,
        n = x.length;

    if (n) {
      this._line ? this._context.lineTo(x[0], y[0]) : this._context.moveTo(x[0], y[0]);

      if (n === 2) {
        this._context.lineTo(x[1], y[1]);
      } else {
        var px = controlPoints(x),
            py = controlPoints(y);

        for (var i0 = 0, i1 = 1; i1 < n; ++i0, ++i1) {
          this._context.bezierCurveTo(px[0][i0], py[0][i0], px[1][i0], py[1][i0], x[i1], y[i1]);
        }
      }
    }

    if (this._line || this._line !== 0 && n === 1) this._context.closePath();
    this._line = 1 - this._line;
    this._x = this._y = null;
  },
  point: function point(x, y) {
    this._x.push(+x);

    this._y.push(+y);
  }
}; // See https://www.particleincell.com/2012/bezier-splines/ for derivation.

function controlPoints(x) {
  var i,
      n = x.length - 1,
      m,
      a = new Array(n),
      b = new Array(n),
      r = new Array(n);
  a[0] = 0, b[0] = 2, r[0] = x[0] + 2 * x[1];

  for (i = 1; i < n - 1; ++i) {
    a[i] = 1, b[i] = 4, r[i] = 4 * x[i] + 2 * x[i + 1];
  }

  a[n - 1] = 2, b[n - 1] = 7, r[n - 1] = 8 * x[n - 1] + x[n];

  for (i = 1; i < n; ++i) {
    m = a[i] / b[i - 1], b[i] -= m, r[i] -= m * r[i - 1];
  }

  a[n - 1] = r[n - 1] / b[n - 1];

  for (i = n - 2; i >= 0; --i) {
    a[i] = (r[i] - a[i + 1]) / b[i];
  }

  b[n - 1] = (x[n] + a[n - 1]) / 2;

  for (i = 0; i < n - 1; ++i) {
    b[i] = 2 * x[i + 1] - a[i + 1];
  }

  return [a, b];
}

function curveNatural(context) {
  return new Natural(context);
}

function Step(context, t) {
  this._context = context;
  this._t = t;
}

Step.prototype = {
  areaStart: function areaStart() {
    this._line = 0;
  },
  areaEnd: function areaEnd() {
    this._line = NaN;
  },
  lineStart: function lineStart() {
    this._x = this._y = NaN;
    this._point = 0;
  },
  lineEnd: function lineEnd() {
    if (0 < this._t && this._t < 1 && this._point === 2) this._context.lineTo(this._x, this._y);
    if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
    if (this._line >= 0) this._t = 1 - this._t, this._line = 1 - this._line;
  },
  point: function point(x, y) {
    x = +x, y = +y;

    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
        break;

      case 1:
        this._point = 2;
      // proceed

      default:
        {
          if (this._t <= 0) {
            this._context.lineTo(this._x, y);

            this._context.lineTo(x, y);
          } else {
            var x1 = this._x * (1 - this._t) + x * this._t;

            this._context.lineTo(x1, this._y);

            this._context.lineTo(x1, y);
          }

          break;
        }
    }

    this._x = x, this._y = y;
  }
};

function curveStep(context) {
  return new Step(context, 0.5);
}

function stepBefore(context) {
  return new Step(context, 0);
}

function stepAfter(context) {
  return new Step(context, 1);
}

var defaultStyle$1 = {
  strokeWidth: 2,
  stroke: '#6b6b6b',
  fill: 'transparent',
  opacity: 1
};

function Path$1(_ref) {
  var style = _ref.style,
      rest = _objectWithoutProperties(_ref, ["style"]);

  var resolvedStyle = _objectSpread({}, defaultStyle$1, style);

  return React.createElement("path", _extends({}, rest, {
    style: resolvedStyle
  }));
}

var lineFn = line();

var VoronoiElement = function VoronoiElement(_ref) {
  var children = _ref.children,
      rest = _objectWithoutProperties(_ref, ["children"]);

  return React.createElement("g", _extends({
    className: "Voronoi"
  }, rest), children);
};

function Voronoi() {
  var _React$useContext = React.useContext(ChartContext),
      _React$useContext2 = _slicedToArray(_React$useContext, 2),
      _React$useContext2$ = _React$useContext2[0],
      stackData = _React$useContext2$.stackData,
      primaryAxes = _React$useContext2$.primaryAxes,
      secondaryAxes = _React$useContext2$.secondaryAxes,
      showVoronoi = _React$useContext2$.showVoronoi,
      width = _React$useContext2$.width,
      height = _React$useContext2$.height,
      setChartState = _React$useContext2[1];

  var onHover = React.useCallback(function (datum) {
    return setChartState(function (state) {
      return _objectSpread({}, state, {
        focused: datum
      });
    });
  }, [setChartState]);
  return React.useMemo(function () {
    // Don't render until we have all dependencies
    if (!stackData || !primaryAxes.length || !secondaryAxes.length || !width || !height) {
      return null;
    }

    var primaryVertical = primaryAxes.find(function (d) {
      return d.vertical;
    });
    var xScales = primaryVertical ? secondaryAxes : primaryAxes;
    var yScales = primaryVertical ? primaryAxes : secondaryAxes;
    var extent = [[xScales[0].scale.range()[0], yScales[0].scale.range()[1]], [xScales[0].scale.range()[1], yScales[0].scale.range()[0]]]; // if (type === 'pie') {
    //   const primaryAxis = primaryAxes[0]
    //   return (
    //     <VoronoiElement
    //       style={{
    //         transform: Utils.translate(primaryAxis.width /
    //           2, primaryAxis.height / 2)
    //       }}
    //     >
    //       {stackData.map(series => (
    //         <React.Fragment key={series.index}>
    //           {series.datums.map((datum, i) => {
    //             const arc = makeArc()
    //               .startAngle(datum.arcData.startAngle)
    //               .endAngle(datum.arcData.endAngle)
    //               .padAngle(0)
    //               .padRadius(0)
    //               .innerRadius(
    //                 !series.index
    //                   ? 0
    //                   : datum.arcData.innerRadius -
    //                       datum.arcData.seriesPaddingRadius / 2
    //               )
    //               .outerRadius(
    //                 series.index === stackData.length - 1
    //                   ? Math.max(primaryAxis.width, primaryAxis.height)
    //                   : datum.arcData.outerRadius +
    //                       datum.arcData.seriesPaddingRadius / 2
    //               )
    //               .cornerRadius(0)
    //             return (
    //               <Path
    //                 key={i}
    //                 d={arc()}
    //                 className='action-voronoi'
    //                 onMouseEnter={() => onHover([datum])}
    //                 style={{
    //                   fill: 'rgba(0,0,0,.2)',
    //                   stroke: 'rgba(255,255,255,.5)',
    //                   opacity: showVoronoi ? 1 : 0
    //                 }}
    //               />
    //             )
    //           })}
    //         </React.Fragment>
    //       ))}
    //     </VoronoiElement>
    //   )
    // }

    var vor;
    var polygons = null;
    var voronoiData = [];
    stackData.forEach(function (series) {
      series.datums.filter(function (d) {
        return d.defined;
      }).forEach(function (datum) {
        datum.boundingPoints.forEach(function (boundingPoint) {
          if (typeof datum.x !== 'number' || typeof datum.y !== 'number' || Number.isNaN(datum.y) || Number.isNaN(datum.x)) {
            return;
          }

          voronoiData.push({
            x: boundingPoint.x,
            y: boundingPoint.y,
            datum: datum
          });
        });
      });
    });
    vor = voronoi().x(function (d) {
      return d.x;
    }).y(function (d) {
      return d.y;
    }).extent(extent)(voronoiData);
    polygons = vor.polygons();
    return React.createElement(VoronoiElement, null, polygons.map(function (points, i) {
      var path = lineFn(points);
      return React.createElement(Path$1, {
        key: i,
        d: path,
        className: "action-voronoi",
        onMouseEnter: function onMouseEnter(e) {
          return onHover(points.data.datum);
        },
        onMouseLeave: function onMouseLeave(e) {
          return onHover(null);
        },
        style: {
          fill: 'rgba(0,0,0,.2)',
          stroke: 'rgba(255,255,255,.5)',
          opacity: showVoronoi ? 1 : 0
        }
      });
    }));
  }, [height, onHover, primaryAxes, secondaryAxes, showVoronoi, stackData, width]);
}

var defaultStyle$2 = {
  strokeWidth: 1,
  fill: 'transparent',
  opacity: 1
};

var Line =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Line, _React$Component);

  function Line() {
    _classCallCheck(this, Line);

    return _possibleConstructorReturn(this, _getPrototypeOf(Line).apply(this, arguments));
  }

  _createClass(Line, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          style = _this$props.style,
          rest = _objectWithoutProperties(_this$props, ["style"]);

      var resolvedStyle = _objectSpread({}, defaultStyle$2, style);

      return React.createElement("line", _extends({}, rest, {
        style: resolvedStyle
      }));
    }
  }]);

  return Line;
}(React.Component);

var defaultStyle$3 = {
  fontFamily: 'Helvetica',
  fontSize: 10,
  opacity: 1
};

var Text =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Text, _React$Component);

  function Text() {
    _classCallCheck(this, Text);

    return _possibleConstructorReturn(this, _getPrototypeOf(Text).apply(this, arguments));
  }

  _createClass(Text, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          style = _this$props.style,
          opacity = _this$props.opacity,
          rest = _objectWithoutProperties(_this$props, ["style", "opacity"]);

      var resolvedStyle = _objectSpread({}, defaultStyle$3, style);

      return React.createElement("text", _extends({}, rest, {
        style: resolvedStyle
      }));
    }
  }]);

  return Text;
}(React.Component);

_defineProperty(Text, "defaultProps", {
  opacity: 1
});

var Group = React.forwardRef(function Group(props, ref) {
  return React.createElement("g", _extends({}, props, {
    ref: ref
  }));
});
var positionTop = 'top';
var positionRight = 'right';
var positionBottom = 'bottom';
var positionLeft = 'left';
var groupModeSingle = 'single';
var groupModeSeries = 'series';
var groupModePrimary = 'primary';
var groupModeSecondary = 'secondary';
var alignAuto = 'auto';
var alignRight = 'right';
var alignTopRight = 'topRight';
var alignBottomRight = 'bottomRight';
var alignLeft = 'left';
var alignTopLeft = 'topLeft';
var alignBottomLeft = 'bottomLeft';
var alignTop = 'top';
var alignBottom = 'bottom';
var axisTypeOrdinal = 'ordinal';
var axisTypeTime = 'time';
var axisTypeUtc = 'utc';
var axisTypeLinear = 'linear';
var axisTypeLog = 'log';
var anchorPointer = 'pointer';
var anchorClosest = 'closest';
var anchorCenter = 'center';
var anchorTop = 'top';
var anchorBottom = 'bottom';
var anchorLeft = 'left';
var anchorRight = 'right';
var anchorGridTop = 'gridTop';
var anchorGridBottom = 'gridBottom';
var anchorGridLeft = 'gridLeft';
var anchorGridRight = 'gridRight';
var defaultStyles = {
  line: {
    strokeWidth: '1',
    fill: 'transparent'
  },
  tick: {
    fontSize: 10,
    fontFamily: 'sans-serif'
  }
};
var fontSize = 10;

var identity$1 = function identity(d) {
  return d;
};

var radiansToDegrees = function radiansToDegrees(r) {
  return r * (180 / Math.PI);
};

function AxisLinear(_ref) {
  var id = _ref.id,
      type = _ref.type,
      position = _ref.position,
      tickSizeInner = _ref.tickSizeInner,
      tickSizeOuter = _ref.tickSizeOuter,
      show = _ref.show,
      showGrid = _ref.showGrid,
      showTicks = _ref.showTicks,
      styles = _ref.styles,
      maxLabelRotation = _ref.maxLabelRotation,
      tickPadding = _ref.tickPadding;

  var _React$useState = React.useState(0),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      rotation = _React$useState2[0],
      setRotation = _React$useState2[1];

  var _React$useContext = React.useContext(ChartContext),
      _React$useContext2 = _slicedToArray(_React$useContext, 2),
      _React$useContext2$ = _React$useContext2[0],
      primaryAxes = _React$useContext2$.primaryAxes,
      secondaryAxes = _React$useContext2$.secondaryAxes,
      gridWidth = _React$useContext2$.gridWidth,
      gridHeight = _React$useContext2$.gridHeight,
      dark = _React$useContext2$.dark,
      axisDimensions = _React$useContext2$.axisDimensions,
      setChartState = _React$useContext2[1];

  var axis = [].concat(_toConsumableArray(primaryAxes), _toConsumableArray(secondaryAxes)).find(function (d) {
    return d.id === id;
  });
  var elRef = React.useRef();
  var rendersRef = React.useRef(0);
  var visibleLabelStepRef = React.useRef();
  rendersRef.current++;
  React.useEffect(function () {
    raf_1(function () {
      rendersRef.current = 0;
    });
  }, []); // Measure after if needed

  React.useLayoutEffect(function () {
    if (rendersRef.current > 10) {
      return;
    }

    if (!elRef.current) {
      if (axisDimensions[position] && axisDimensions[position][id]) {
        // If the entire axis is hidden, then we need to remove the axis dimensions
        setChartState(function (state) {
          var newAxes = state.axisDimensions[position] || {};
          delete newAxes[id];
          return _objectSpread({}, state, {
            axisDimensions: _objectSpread({}, state.axisDimensions, _defineProperty({}, position, newAxes))
          });
        });
      }

      return;
    }

    var isHorizontal = position === positionTop || position === positionBottom;
    var labelDims = Array.apply(void 0, _toConsumableArray(elRef.current.querySelectorAll('.tick text'))).map(function (el) {
      var rect = el.getBoundingClientRect();
      return {
        width: rect.width,
        height: rect.height
      };
    });
    var smallestTickGap = 100000; // This is just a ridiculously large tick spacing that would never happen (hopefully)
    // If the axis is horizontal, we need to determine any necessary rotation and tick skipping

    if (isHorizontal) {
      var tickDims = Array.apply(void 0, _toConsumableArray(elRef.current.querySelectorAll('.tick'))).map(function (el) {
        return el.getBoundingClientRect();
      }); // Determine the smallest gap in ticks on the axis

      tickDims.reduce(function (prev, current) {
        if (prev) {
          var gap = current.left - prev.left;
          smallestTickGap = gap < smallestTickGap ? gap : smallestTickGap;
        }

        return current;
      }, false); // Determine the largest label on the axis

      var largestLabel = labelDims.reduce(function (prev, current) {
        current._overflow = current.width - smallestTickGap;

        if (current._overflow > 0 && current._overflow > prev._overflow) {
          return current;
        }

        return prev;
      }, _objectSpread({}, labelDims[0], {
        _overflow: 0
      })); // Determine axis rotation before we measure

      var newRotation = Math.min(Math.max(Math.abs(radiansToDegrees(Math.acos(smallestTickGap / (largestLabel.width + fontSize)))), 0), maxLabelRotation);
      newRotation = Number.isNaN(newRotation) ? 0 : Math.round(newRotation);

      if (Math.abs(rotation - newRotation) > 15 || rotation !== 0 && newRotation === 0 || rotation !== maxLabelRotation && newRotation === maxLabelRotation) {
        setRotation(function () {
          return axis.position === 'top' ? -newRotation : newRotation;
        });
      }
    }

    var newVisibleLabelStep = Math.ceil(fontSize / smallestTickGap);

    if (visibleLabelStepRef.current !== newVisibleLabelStep) {
      visibleLabelStepRef.current = newVisibleLabelStep;
    }

    if (!labelDims.length) {
      return;
    }

    var width = 0;
    var height = 0;
    var top = 0;
    var bottom = 0;
    var left = 0;
    var right = 0;

    if (isHorizontal) {
      // Add width overflow from the first and last ticks
      var leftWidth = identity$1(labelDims[0].width);
      var rightWidth = identity$1(labelDims[labelDims.length - 1].width);

      if (rotation) {
        right = Math.ceil(fontSize / 2);
        left = Math.abs(Math.ceil(Math.cos(rotation) * leftWidth)) - axis.barSize / 2;
      } else {
        left = Math.ceil(leftWidth / 2);
        right = Math.ceil(rightWidth / 2);
      }

      height = Math.max(tickSizeInner, tickSizeOuter) + // Add tick size
      tickPadding + // Add tick padding
      // Add the height of the largest label
      Math.max.apply(Math, _toConsumableArray(labelDims.map(function (d) {
        return Math.ceil(identity$1(d.height));
      })));
    } else {
      // Add height overflow from the first and last ticks
      top = Math.ceil(identity$1(labelDims[0].height) / 2);
      bottom = Math.ceil(identity$1(labelDims[labelDims.length - 1].height) / 2);
      width = Math.max(tickSizeInner, tickSizeOuter) + // Add tick size
      tickPadding + // Add tick padding
      // Add the width of the largest label
      Math.max.apply(Math, _toConsumableArray(labelDims.map(function (d) {
        return Math.ceil(identity$1(d.width));
      })));
    }

    var newDimensions = {
      width: width,
      height: height,
      top: top,
      bottom: bottom,
      left: left,
      right: right
    };
    setChartState(function (state) {
      return _objectSpread({}, state, {
        axisDimensions: _objectSpread({}, state.axisDimensions, _defineProperty({}, position, _objectSpread({}, state.axisDimensions[position] || {}, _defineProperty({}, id, newDimensions))))
      });
    });
  }, [axis, axisDimensions, id, maxLabelRotation, position, rotation, setChartState, tickPadding, tickSizeInner, tickSizeOuter]);
  return React.useMemo(function () {
    // Not ready? Render null
    if (!axis || !show) {
      return null;
    }

    var scale = axis.scale,
        scaleMax = axis.max,
        transform = axis.transform,
        vertical = axis.vertical,
        format = axis.format,
        ticks = axis.ticks,
        _axis$range = _slicedToArray(axis.range, 2),
        range0 = _axis$range[0],
        range1 = _axis$range[1],
        directionMultiplier = axis.directionMultiplier,
        tickOffset = axis.tickOffset,
        gridOffset = axis.gridOffset,
        spacing = axis.spacing;

    var axisPath;

    if (vertical) {
      if (position === positionLeft) {
        axisPath = "\n        M ".concat(-tickSizeOuter, ", ").concat(range0, "\n        H 0\n        V ").concat(range1, "\n        H ").concat(-tickSizeOuter, "\n      ");
      } else {
        axisPath = "\n        M ".concat(tickSizeOuter, ", ").concat(range0, "\n        H 0\n        V ").concat(range1, "\n        H ").concat(tickSizeOuter, "\n      ");
      }
    } else if (position === positionBottom) {
      axisPath = "\n        M 0, ".concat(tickSizeOuter, "\n        V 0\n        H ").concat(range1, "\n        V ").concat(tickSizeOuter, "\n      ");
    } else {
      axisPath = "\n        M 0, ".concat(-tickSizeOuter, "\n        V 0\n        H ").concat(range1, "\n        V ").concat(-tickSizeOuter, "\n              ");
    }

    var showGridLine;

    if (typeof showGrid === 'boolean') {
      showGridLine = showGrid;
    } else if (type === axisTypeOrdinal) {
      showGridLine = false;
    } else {
      showGridLine = true;
    } // Combine default styles with style props


    var axisStyles = _objectSpread({}, defaultStyles, styles);

    return React.createElement(Group, {
      className: "Axis",
      style: {
        pointerEvents: 'none',
        transform: position === positionRight ? Utils.translateX(gridWidth) : position === positionBottom ? Utils.translateY(gridHeight) : undefined
      }
    }, React.createElement(Path$1, {
      className: "domain",
      d: axisPath,
      style: _objectSpread({
        stroke: dark ? 'rgba(255,255,255, .1)' : 'rgba(0,0,0, .1)'
      }, axisStyles.line)
    }), React.createElement(Group, {
      className: "ticks",
      ref: elRef,
      style: {}
    }, ticks.map(function (tick, i) {
      return React.createElement(Group, {
        key: [String(tick), i].join('_'),
        className: "tick",
        style: {
          transform: transform(scale(tick) || 0)
        }
      }, showTicks ? React.createElement(Line, {
        x1: vertical ? 0 : tickOffset,
        x2: vertical ? directionMultiplier * tickSizeInner : tickOffset,
        y1: vertical ? tickOffset : 0,
        y2: vertical ? tickOffset : directionMultiplier * tickSizeInner,
        style: _objectSpread({
          stroke: dark ? 'rgba(255,255,255, .1)' : 'rgba(0,0,0, .1)',
          strokeWidth: 1
        }, axisStyles.line)
      }) : null, showGridLine && React.createElement(Line, {
        x1: vertical ? 0 : gridOffset,
        x2: vertical ? scaleMax : gridOffset,
        y1: vertical ? gridOffset : 0,
        y2: vertical ? gridOffset : scaleMax,
        style: _objectSpread({
          stroke: dark ? 'rgba(255,255,255, .1)' : 'rgba(0,0,0, .1)',
          strokeWidth: 1
        }, axisStyles.line)
      }), showTicks ? React.createElement(Text, {
        style: _objectSpread({
          fill: dark ? 'white' : 'black'
        }, axisStyles.tick, {
          transform: "".concat(Utils.translate(vertical ? directionMultiplier * spacing : tickOffset, vertical ? tickOffset : directionMultiplier * spacing), " rotate(").concat(-rotation, "deg)")
        }),
        dominantBaseline: rotation ? 'central' : position === positionBottom ? 'hanging' : position === positionTop ? 'alphabetic' : 'central',
        textAnchor: rotation ? 'end' : position === positionRight ? 'start' : position === positionLeft ? 'end' : 'middle'
      }, String(format(tick, i))) : null);
    })));
  }, [axis, dark, gridHeight, gridWidth, position, rotation, show, showGrid, showTicks, styles, tickSizeInner, tickSizeOuter, type]);
}

var Axis =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Axis, _React$Component);

  function Axis() {
    _classCallCheck(this, Axis);

    return _possibleConstructorReturn(this, _getPrototypeOf(Axis).apply(this, arguments));
  }

  _createClass(Axis, [{
    key: "render",
    value: function render() {
      var type = this.props.type; // if (type === 'pie') {
      //   return <AxisPie {...this.props} />
      // }

      return React.createElement(AxisLinear, this.props);
    }
  }]);

  return Axis;
}(React.Component);

var triangleSize = 7;

var getBackgroundColor = function getBackgroundColor(dark) {
  return dark ? 'rgba(255,255,255,.9)' : 'rgba(0, 26, 39, 0.9)';
};

function Tooltip() {
  var _React$useContext = React.useContext(ChartContext),
      _React$useContext2 = _slicedToArray(_React$useContext, 1),
      chartState = _React$useContext2[0];

  var primaryAxes = chartState.primaryAxes,
      secondaryAxes = chartState.secondaryAxes,
      gridX = chartState.gridX,
      gridY = chartState.gridY,
      gridWidth = chartState.gridWidth,
      gridHeight = chartState.gridHeight,
      dark = chartState.dark,
      focused = chartState.focused,
      latestFocused = chartState.latestFocused,
      getDatumStyle = chartState.getDatumStyle,
      tooltip = chartState.tooltip;
  var elRef = React.useRef();
  var tooltipElRef = React.useRef();
  var previousShowRef = React.useRef();

  var _ref = tooltip || {},
      align = _ref.align,
      alignPriority = _ref.alignPriority,
      padding = _ref.padding,
      tooltipArrowPadding = _ref.tooltipArrowPadding,
      arrowPosition = _ref.arrowPosition,
      render = _ref.render,
      anchor = _ref.anchor,
      show = _ref.show;

  React.useEffect(function () {
    previousShowRef.current = show;
  }, [show]);

  if (!tooltip) {
    return null;
  }

  var resolvedFocused = focused || latestFocused;
  var alignX = 0;
  var alignY = -50;
  var triangleStyles = {};
  var resolvedAlign = align || 'auto';
  var backgroundColor = getBackgroundColor(dark);
  var resolvedArrowPosition = arrowPosition;

  if (resolvedAlign === 'auto' && elRef.current) {
    var container = elRef.current;
    var gridDims = container.getBoundingClientRect();
    var tooltipDims = tooltipElRef.current.getBoundingClientRect();
    var space = {
      left: Infinity,
      top: Infinity,
      right: Infinity,
      bottom: Infinity
    };

    while (container !== document.body) {
      container = container.parentElement;

      var _window$getComputedSt = window.getComputedStyle(container),
          overflowX = _window$getComputedSt.overflowX,
          overflowY = _window$getComputedSt.overflowY;

      if (container === document.body || [overflowX, overflowY].find(function (d) {
        return ['auto', 'hidden'].includes(d);
      })) {
        var containerDims = container.getBoundingClientRect();
        var left = gridDims.left - containerDims.left + anchor.x;
        var top = gridDims.top - containerDims.top + anchor.y;
        var right = containerDims.width - left;
        var bottom = containerDims.height - top;
        space.left = Math.min(space.left, left);
        space.top = Math.min(space.top, top);
        space.right = Math.min(space.right, right);
        space.bottom = Math.min(space.bottom, bottom);
      }
    }

    resolvedAlign = null;
    alignPriority.forEach(function (priority) {
      if (resolvedAlign) {
        return;
      }

      if (priority === 'left') {
        if (space.left - tooltipArrowPadding - padding - anchor.horizontalPadding > tooltipDims.width && space.top > tooltipDims.height / 2 && space.bottom > tooltipDims.height / 2) {
          resolvedAlign = priority;
        }
      } else if (priority === 'right') {
        if (space.right - tooltipArrowPadding - padding - anchor.horizontalPadding > tooltipDims.width && space.top > tooltipDims.height / 2 && space.bottom > tooltipDims.height / 2) {
          resolvedAlign = priority;
        }
      } else if (priority === 'top') {
        if (space.top - tooltipArrowPadding - padding - anchor.verticalPadding > tooltipDims.height && space.left > tooltipDims.width / 2 && space.right > tooltipDims.width / 2) {
          resolvedAlign = priority;
        }
      } else if (priority === 'bottom') {
        if (space.bottom - tooltipArrowPadding - padding - anchor.verticalPadding > tooltipDims.height && space.left > tooltipDims.width / 2 && space.right > tooltipDims.width / 2) {
          resolvedAlign = priority;
        }
      } else if (priority === 'topLeft') {
        if (space.top - tooltipArrowPadding > tooltipDims.height && space.left - tooltipArrowPadding > tooltipDims.width) {
          resolvedAlign = priority;
        }
      } else if (priority === 'topRight') {
        if (space.top - tooltipArrowPadding > tooltipDims.height && space.right - tooltipArrowPadding > tooltipDims.width) {
          resolvedAlign = priority;
        }
      } else if (priority === 'bottomLeft') {
        if (space.bottom - tooltipArrowPadding > tooltipDims.height && space.left - tooltipArrowPadding > tooltipDims.width) {
          resolvedAlign = priority;
        }
      } else if (priority === 'bottomRight') {
        if (space.bottom - tooltipArrowPadding > tooltipDims.height && space.right - tooltipArrowPadding > tooltipDims.width) {
          resolvedAlign = priority;
        }
      }
    });
  }

  if (resolvedAlign === 'top') {
    alignX = -50;
    alignY = -100;
  } else if (resolvedAlign === 'topRight') {
    alignX = 0;
    alignY = -100;
  } else if (resolvedAlign === 'right') {
    alignX = 0;
    alignY = -50;
  } else if (resolvedAlign === 'bottomRight') {
    alignX = 0;
    alignY = 0;
  } else if (resolvedAlign === 'bottom') {
    alignX = -50;
    alignY = 0;
  } else if (resolvedAlign === 'bottomLeft') {
    alignX = -100;
    alignY = 0;
  } else if (resolvedAlign === 'left') {
    alignX = -100;
    alignY = -50;
  } else if (resolvedAlign === 'topLeft') {
    alignX = -100;
    alignY = -100;
  } else if (resolvedAlign === 'center') {
    alignX = -50;
    alignY = -50;
  }

  if (!resolvedArrowPosition) {
    if (resolvedAlign === 'left') {
      resolvedArrowPosition = 'right';
    } else if (resolvedAlign === 'right') {
      resolvedArrowPosition = 'left';
    } else if (resolvedAlign === 'top') {
      resolvedArrowPosition = 'bottom';
    } else if (resolvedAlign === 'bottom') {
      resolvedArrowPosition = 'top';
    } else if (resolvedAlign === 'topRight') {
      resolvedArrowPosition = 'bottomLeft';
    } else if (resolvedAlign === 'bottomRight') {
      resolvedArrowPosition = 'topLeft';
    } else if (resolvedAlign === 'topLeft') {
      resolvedArrowPosition = 'bottomRight';
    } else if (resolvedAlign === 'bottomLeft') {
      resolvedArrowPosition = 'topRight';
    }
  }

  if (resolvedArrowPosition === 'bottom') {
    triangleStyles = {
      top: '100%',
      left: '50%',
      transform: 'translate3d(-50%, 0%, 0)',
      borderLeft: "".concat(triangleSize * 0.8, "px solid transparent"),
      borderRight: "".concat(triangleSize * 0.8, "px solid transparent"),
      borderTop: "".concat(triangleSize, "px solid ").concat(backgroundColor)
    };
  } else if (resolvedArrowPosition === 'top') {
    triangleStyles = {
      top: '0%',
      left: '50%',
      transform: 'translate3d(-50%, -100%, 0)',
      borderLeft: "".concat(triangleSize * 0.8, "px solid transparent"),
      borderRight: "".concat(triangleSize * 0.8, "px solid transparent"),
      borderBottom: "".concat(triangleSize, "px solid ").concat(backgroundColor)
    };
  } else if (resolvedArrowPosition === 'right') {
    triangleStyles = {
      top: '50%',
      left: '100%',
      transform: 'translate3d(0%, -50%, 0)',
      borderTop: "".concat(triangleSize * 0.8, "px solid transparent"),
      borderBottom: "".concat(triangleSize * 0.8, "px solid transparent"),
      borderLeft: "".concat(triangleSize, "px solid ").concat(backgroundColor)
    };
  } else if (resolvedArrowPosition === 'left') {
    triangleStyles = {
      top: '50%',
      left: '0%',
      transform: 'translate3d(-100%, -50%, 0)',
      borderTop: "".concat(triangleSize * 0.8, "px solid transparent"),
      borderBottom: "".concat(triangleSize * 0.8, "px solid transparent"),
      borderRight: "".concat(triangleSize, "px solid ").concat(backgroundColor)
    };
  } else if (resolvedArrowPosition === 'topRight') {
    triangleStyles = {
      top: '0%',
      left: '100%',
      transform: 'translate3d(-50%, -50%, 0) rotate(-45deg)',
      borderTop: "".concat(triangleSize * 0.8, "px solid transparent"),
      borderBottom: "".concat(triangleSize * 0.8, "px solid transparent"),
      borderLeft: "".concat(triangleSize * 2, "px solid ").concat(backgroundColor)
    };
  } else if (resolvedArrowPosition === 'bottomRight') {
    triangleStyles = {
      top: '100%',
      left: '100%',
      transform: 'translate3d(-50%, -50%, 0) rotate(45deg)',
      borderTop: "".concat(triangleSize * 0.8, "px solid transparent"),
      borderBottom: "".concat(triangleSize * 0.8, "px solid transparent"),
      borderLeft: "".concat(triangleSize * 2, "px solid ").concat(backgroundColor)
    };
  } else if (resolvedArrowPosition === 'topLeft') {
    triangleStyles = {
      top: '0%',
      left: '0%',
      transform: 'translate3d(-50%, -50%, 0) rotate(45deg)',
      borderTop: "".concat(triangleSize * 0.8, "px solid transparent"),
      borderBottom: "".concat(triangleSize * 0.8, "px solid transparent"),
      borderRight: "".concat(triangleSize * 2, "px solid ").concat(backgroundColor)
    };
  } else if (resolvedArrowPosition === 'bottomLeft') {
    triangleStyles = {
      top: '100%',
      left: '0%',
      transform: 'translate3d(-50%, -50%, 0) rotate(-45deg)',
      borderTop: "".concat(triangleSize * 0.8, "px solid transparent"),
      borderBottom: "".concat(triangleSize * 0.8, "px solid transparent"),
      borderRight: "".concat(triangleSize * 2, "px solid ").concat(backgroundColor)
    };
  } else {
    triangleStyles = {
      opacity: 0
    };
  }

  var primaryAxis = Utils.getAxisByAxisID(primaryAxes, resolvedFocused ? resolvedFocused.series.primaryAxisID : null);
  var secondaryAxis = Utils.getAxisByAxisID(secondaryAxes, resolvedFocused ? resolvedFocused.series.secondaryAxisID : null);
  var resolvedHorizontalPadding = padding + anchor.horizontalPadding;
  var resolvedVerticalPadding = padding + anchor.verticalPadding;

  var renderProps = _objectSpread({}, chartState, {
    datum: resolvedFocused,
    getStyle: function getStyle(datum) {
      return datum.getStatusStyle(resolvedFocused, getDatumStyle);
    },
    primaryAxis: primaryAxis,
    secondaryAxis: secondaryAxis
  });

  var renderedChildren = render(renderProps);
  var animateCoords;

  if (previousShowRef.current === show) {
    animateCoords = true;
  }

  return React.createElement("div", {
    className: "tooltip-wrap",
    style: {
      pointerEvents: 'none',
      position: 'absolute',
      left: "".concat(gridX, "px"),
      top: "".concat(gridY, "px"),
      width: "".concat(gridWidth, "px"),
      height: "".concat(gridHeight, "px"),
      opacity: show ? 1 : 0,
      transition: 'all .3s ease'
    },
    ref: function ref(el) {
      elRef.current = el;
    }
  }, React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      top: 0,
      transform: Utils.translate(anchor.x, anchor.y),
      transition: animateCoords ? 'all .2s ease' : 'opacity .2s ease'
    }
  }, React.createElement("div", {
    style: {
      transform: "translate3d(".concat(alignX, "%, ").concat(alignY, "%, 0)"),
      padding: "".concat(tooltipArrowPadding + resolvedVerticalPadding, "px ").concat(tooltipArrowPadding + resolvedHorizontalPadding, "px"),
      width: 'auto',
      transition: 'all .2s ease'
    }
  }, React.createElement("div", {
    ref: function ref(el) {
      tooltipElRef.current = el;
    },
    style: {
      fontSize: '12px',
      padding: '5px',
      background: getBackgroundColor(dark),
      color: dark ? 'black' : 'white',
      borderRadius: '3px',
      position: 'relative'
    }
  }, React.createElement("div", {
    style: _objectSpread({
      position: 'absolute',
      width: 0,
      height: 0
    }, triangleStyles, {
      transition: animateCoords ? 'all .2s ease' : 'none'
    })
  }), renderedChildren))));
}

var getLineBackgroundColor = function getLineBackgroundColor(dark) {
  return dark ? 'rgba(255,255,255,.3)' : 'rgba(0, 26, 39, 0.3)';
};

var getBackgroundColor$1 = function getBackgroundColor(dark) {
  return dark ? 'rgba(255,255,255,.9)' : 'rgba(0, 26, 39, 0.9)';
};

function Cursor(_ref) {
  var primary = _ref.primary;

  var _React$useContext = React.useContext(ChartContext),
      _React$useContext2 = _slicedToArray(_React$useContext, 1),
      _React$useContext2$ = _React$useContext2[0],
      primaryCursor = _React$useContext2$.primaryCursor,
      secondaryCursor = _React$useContext2$.secondaryCursor,
      focused = _React$useContext2$.focused,
      latestFocused = _React$useContext2$.latestFocused,
      gridX = _React$useContext2$.gridX,
      gridY = _React$useContext2$.gridY,
      dark = _React$useContext2$.dark;

  var resolvedFocused = focused || latestFocused;
  var cursor = primary ? primaryCursor : secondaryCursor;

  var _ref2 = cursor || {},
      showLine = _ref2.showLine,
      showLabel = _ref2.showLabel,
      resolvedValue = _ref2.resolvedValue,
      snap = _ref2.snap,
      render = _ref2.render,
      axis = _ref2.axis,
      siblingAxis = _ref2.siblingAxis,
      resolvedShow = _ref2.resolvedShow;

  var latestValue = useLatest(resolvedValue, typeof resolvedValue !== 'undefined');
  var previousShowRef = React.useRef();
  React.useEffect(function () {
    previousShowRef.current = resolvedShow;
  }, [resolvedShow]);

  if (!cursor) {
    return null;
  } // Should we animate?


  var animated = snap || axis.type === 'ordinal'; // Get the sibling range

  var siblingRange = siblingAxis.scale.range();
  var x;
  var y;
  var x1;
  var x2;
  var y1;
  var y2;
  var alignPctX;
  var alignPctY; // Vertical alignment

  if (axis.vertical) {
    y = axis.scale(latestValue);
    x1 = siblingRange[0];
    x2 = siblingRange[1];
    y1 = y - 1;
    y2 = y + axis.cursorSize + 1;

    if (axis.position === 'left') {
      alignPctX = -100;
      alignPctY = -50;
    } else {
      alignPctX = 0;
      alignPctY = -50;
    }
  } else {
    x = axis.scale(latestValue);
    x1 = x - 1;
    x2 = x + axis.cursorSize + 1;
    y1 = siblingRange[0];
    y2 = siblingRange[1];

    if (axis.position === 'top') {
      alignPctX = -500;
      alignPctY = -100;
    } else {
      alignPctX = -50;
      alignPctY = 0;
    }
  }

  var renderProps = _objectSpread({}, cursor);

  renderProps.formattedValue = String(axis.vertical ? typeof latestValue !== 'undefined' ? axis.format(axis.stacked && !primary && resolvedFocused ? resolvedFocused.totalValue : latestValue) : '' : typeof latestValue !== 'undefined' ? axis.format(axis.stacked && !primary && resolvedFocused ? resolvedFocused.totalValue : latestValue) : '');
  var lineStartX = Math.min(x1, x2);
  var lineStartY = Math.min(y1, y2);
  var lineEndX = Math.max(x1, x2);
  var lineEndY = Math.max(y1, y2);
  var bubbleX = axis.vertical && axis.RTL ? lineEndX : x1 + (!axis.vertical ? (x2 - x1) / 2 : 0) + (!axis.vertical ? 1 : 0);
  var bubbleY = !axis.vertical && axis.RTL ? lineStartY : y1 + (axis.vertical ? (y2 - y1) / 2 : 0) + (axis.vertical ? 1 : 0);
  var lineHeight = Math.max(lineEndY - lineStartY, 0);
  var lineWidth = Math.max(lineEndX - lineStartX, 0);
  var animateCoords;

  if (previousShowRef.current === resolvedShow) {
    animateCoords = true;
  }

  var renderedChildren = render(renderProps);
  return React.createElement("div", {
    style: {
      pointerEvents: 'none',
      position: 'absolute',
      top: 0,
      left: 0,
      transform: Utils.translate(gridX, gridY),
      opacity: resolvedShow ? 1 : 0,
      transition: 'all .3s ease'
    },
    className: "Cursor"
  }, showLine ? React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      transform: Utils.translate(lineStartX, lineStartY),
      width: "".concat(lineWidth, "px"),
      height: "".concat(lineHeight, "px"),
      background: getLineBackgroundColor(dark),
      transition: animated && animateCoords ? 'all .2s ease' : 'opacity .2s ease'
    }
  }) : null, showLabel ? React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      transform: Utils.translate(bubbleX, bubbleY),
      transition: animated && animateCoords ? 'all .2s ease' : 'opacity .2s ease'
    }
  }, React.createElement("div", {
    style: {
      padding: '5px',
      fontSize: '10px',
      background: getBackgroundColor$1(dark),
      color: getBackgroundColor$1(!dark),
      borderRadius: '3px',
      position: 'relative',
      transform: "translate3d(".concat(alignPctX, "%, ").concat(alignPctY, "%, 0)"),
      whiteSpace: 'nowrap'
    }
  }, renderedChildren)) : null);
}

function Brush() {
  var _React$useContext = React.useContext(ChartContext),
      _React$useContext2 = _slicedToArray(_React$useContext, 1),
      _React$useContext2$ = _React$useContext2[0],
      pointer = _React$useContext2$.pointer,
      brush = _React$useContext2$.brush,
      gridX = _React$useContext2$.gridX,
      gridY = _React$useContext2$.gridY,
      gridHeight = _React$useContext2$.gridHeight,
      dark = _React$useContext2$.dark;

  if (!brush) {
    return null;
  }

  return React.createElement("div", {
    className: "Brush",
    style: {
      pointerEvents: 'none',
      position: 'absolute',
      left: 0,
      top: 0,
      transform: Utils.translate(gridX, gridY),
      opacity: pointer.dragging ? Math.abs(pointer.sourceX - pointer.x) < 20 ? 0.5 : 1 : 0
    }
  }, React.createElement("div", {
    style: _objectSpread({
      position: 'absolute',
      transform: Utils.translate(Math.min(pointer.x, pointer.sourceX), 0),
      width: "".concat(Math.abs(pointer.x - pointer.sourceX), "px"),
      height: "".concat(gridHeight, "px"),
      background: dark ? 'rgba(255,255,255,.3)' : 'rgba(0, 26, 39, 0.3)'
    }, brush.style)
  }));
}

Brush.defaultProps = {
  onSelect: function onSelect() {}
};
var ChartInner = React.forwardRef(function ChartInner(_ref, ref) {
  var className = _ref.className,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? {} : _ref$style,
      rest = _objectWithoutProperties(_ref, ["className", "style"]);

  var _React$useContext = React.useContext(ChartContext),
      _React$useContext2 = _slicedToArray(_React$useContext, 1),
      chartState = _React$useContext2[0];

  var _React$useContext3 = React.useContext(ChartContext),
      _React$useContext4 = _slicedToArray(_React$useContext3, 2),
      _React$useContext4$ = _React$useContext4[0],
      width = _React$useContext4$.width,
      height = _React$useContext4$.height,
      offset = _React$useContext4$.offset,
      gridX = _React$useContext4$.gridX,
      gridY = _React$useContext4$.gridY,
      stackData = _React$useContext4$.stackData,
      primaryAxes = _React$useContext4$.primaryAxes,
      secondaryAxes = _React$useContext4$.secondaryAxes,
      renderSVG = _React$useContext4$.renderSVG,
      onClick = _React$useContext4$.onClick,
      seriesOptions = _React$useContext4$.seriesOptions,
      getSeriesOrder = _React$useContext4$.getSeriesOrder,
      focused = _React$useContext4$.focused,
      setChartState = _React$useContext4[1];

  var svgRef = React.useRef();
  React.useLayoutEffect(function () {
    if (!svgRef.current) {
      return;
    }

    var current = svgRef.current.getBoundingClientRect();

    if (current.left !== offset.left || current.top !== offset.top) {
      setChartState(function (state) {
        return _objectSpread({}, state, {
          offset: {
            left: current.left,
            top: current.top
          }
        });
      });
    }
  });

  var _onMouseLeave = function onMouseLeave(e) {
    setChartState(function (state) {
      return _objectSpread({}, state, {
        focused: null
      });
    });
    setChartState(function (state) {
      return _objectSpread({}, state, {
        pointer: _objectSpread({}, state.pointer, {
          active: false
        })
      });
    });
  };

  var rafRef = React.useRef();

  var _onMouseMove = function onMouseMove(e) {
    if (rafRef.current) {
      raf_1.cancel(rafRef.current);
    }

    rafRef.current = raf_1(function () {
      rafRef.current = null;
      var clientX = e.clientX,
          clientY = e.clientY;
      setChartState(function (state) {
        var x = clientX - offset.left - gridX;
        var y = clientY - offset.top - gridY;

        var pointer = _objectSpread({}, state.pointer, {
          active: true,
          x: x,
          y: y,
          dragging: state.pointer && state.pointer.down
        });

        return _objectSpread({}, state, {
          pointer: pointer
        });
      });
    });
  };

  var onMouseUp = function onMouseUp() {
    document.removeEventListener('mouseup', onMouseUp);
    document.removeEventListener('mousemove', _onMouseMove);
    setChartState(function (state) {
      return _objectSpread({}, state, {
        pointer: _objectSpread({}, state.pointer, {
          down: false,
          dragging: false,
          released: {
            x: state.pointer.x,
            y: state.pointer.y
          }
        })
      });
    });
  };

  var _onMouseDown = function onMouseDown() {
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousemove', _onMouseMove);
    setChartState(function (state) {
      return _objectSpread({}, state, {
        pointer: _objectSpread({}, state.pointer, {
          sourceX: state.pointer.x,
          sourceY: state.pointer.y,
          down: true
        })
      });
    });
  }; // Reverse the stack order for proper z-indexing


  var reversedStackData = _toConsumableArray(stackData).reverse();

  var orderedStackData = getSeriesOrder(reversedStackData);
  var focusedSeriesIndex = focused ? orderedStackData.findIndex(function (series) {
    return series.id === focused.series.id;
  }) : -1; // Bring focused series to the front

  var focusOrderedStackData = focused ? [].concat(_toConsumableArray(orderedStackData.slice(0, focusedSeriesIndex)), _toConsumableArray(orderedStackData.slice(focusedSeriesIndex + 1)), [orderedStackData[focusedSeriesIndex]]) : orderedStackData;
  var stacks = focusOrderedStackData.map(function (stack) {
    return React.createElement(stack.Component, _extends({
      key: stack.id
    }, seriesOptions[stack.index], {
      series: stack,
      stackData: stackData
    }));
  });
  return React.createElement("div", _extends({
    ref: ref
  }, rest, {
    className: "ReactChart ".concat(className || ''),
    style: _objectSpread({
      width: width,
      height: height,
      position: 'relative'
    }, style)
  }), React.createElement("svg", {
    ref: svgRef,
    style: {
      width: width,
      height: height,
      overflow: 'hidden'
    },
    onMouseEnter: function onMouseEnter(e) {
      return e.persist() || _onMouseMove(e);
    },
    onMouseMove: function onMouseMove(e) {
      return e.persist() || _onMouseMove(e);
    },
    onMouseLeave: function onMouseLeave(e) {
      return e.persist() || _onMouseLeave(e);
    },
    onMouseDown: function onMouseDown(e) {
      return e.persist() || _onMouseDown(e);
    },
    onClick: onClick
  }, React.createElement("g", {
    style: {
      transform: Utils.translate(gridX, gridY)
    }
  }, React.createElement(Rectangle // To ensure the pointer always has something to hit
  , {
    x1: -gridX,
    x2: width - gridX,
    y1: -gridY,
    y2: height - gridY,
    style: {
      opacity: 0
    }
  }), React.createElement(Voronoi, null), React.createElement("g", {
    className: "axes"
  }, [].concat(_toConsumableArray(primaryAxes), _toConsumableArray(secondaryAxes)).map(function (axis) {
    return React.createElement(Axis, _extends({
      key: axis.id
    }, axis));
  })), React.createElement("g", {
    className: "Series",
    style: {
      pointerEvents: 'none'
    }
  }, stacks)), renderSVG ? renderSVG({
    chartState: chartState,
    setChartState: setChartState
  }) : null), React.createElement(Cursor, {
    primary: true
  }), React.createElement(Cursor, null), React.createElement(Brush, null), React.createElement(Tooltip, null));
});

var calculateMaterializeData = function calculateMaterializeData(_ref) {
  var data = _ref.data,
      getSeries = _ref.getSeries,
      getSeriesID = _ref.getSeriesID,
      getLabel = _ref.getLabel,
      getPrimaryAxisID = _ref.getPrimaryAxisID,
      getSecondaryAxisID = _ref.getSecondaryAxisID,
      getDatums = _ref.getDatums,
      getPrimary = _ref.getPrimary,
      getSecondary = _ref.getSecondary,
      getR = _ref.getR;
  return React.useMemo(function () {
    // getSeries
    var originalData = getSeries(data);
    var materializedData = []; // First access the data, and provide it to the context

    for (var seriesIndex = 0; seriesIndex < originalData.length; seriesIndex++) {
      var originalSeries = originalData[seriesIndex];
      var seriesID = getSeriesID(originalSeries, seriesIndex, data);
      var seriesLabel = getLabel(originalSeries, seriesIndex, data);
      var primaryAxisID = getPrimaryAxisID(originalSeries, seriesIndex, data);
      var secondaryAxisID = getSecondaryAxisID(originalSeries, seriesIndex, data);
      var originalDatums = getDatums(originalSeries, seriesIndex, data);
      var datums = [];

      for (var datumIndex = 0; datumIndex < originalDatums.length; datumIndex++) {
        var originalDatum = originalDatums[datumIndex];
        datums[datumIndex] = {
          originalSeries: originalSeries,
          seriesIndex: seriesIndex,
          seriesID: seriesID,
          seriesLabel: seriesLabel,
          index: datumIndex,
          originalDatum: originalDatum,
          primary: getPrimary(originalDatum, datumIndex, originalSeries, seriesIndex, data),
          secondary: getSecondary(originalDatum, datumIndex, originalSeries, seriesIndex, data),
          r: getR(originalDatum, datumIndex, originalSeries, seriesIndex, data)
        };
      }

      materializedData[seriesIndex] = {
        originalSeries: originalSeries,
        index: seriesIndex,
        id: seriesID,
        label: seriesLabel,
        primaryAxisID: primaryAxisID,
        secondaryAxisID: secondaryAxisID,
        datums: datums
      };
    }

    return materializedData;
  }, [data, getDatums, getLabel, getPrimary, getPrimaryAxisID, getR, getSecondary, getSecondaryAxisID, getSeries, getSeriesID]);
};

var Curves = {
  basisClosed: curveBasisClosed,
  basisOpen: curveBasisOpen,
  basis: curveBasis,
  bundle: curveBundle,
  cardinalClosed: curveCardinalClosed,
  cardinalOpen: curveCardinalOpen,
  cardinal: curveCardinal,
  catmullRomClosed: curveCatmullRomClosed,
  catmullRomOpen: curveCatmullRomOpen,
  catmullRom: curveCatmullRom,
  linearClosed: curveLinearClosed,
  linear: curveLinear,
  monotoneX: monotoneX,
  monotoneY: monotoneY,
  natural: curveNatural,
  step: curveStep,
  stepAfter: stepAfter,
  stepBefore: stepBefore
};

function usePropsMemo(fn) {
  var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var watchRef = React.useRef({
    style: {},
    props: {}
  });
  var valueRef = React.useRef();

  var _obj$style = obj.style,
      style = _obj$style === void 0 ? {} : _obj$style,
      props = _objectWithoutProperties(obj, ["style"]);

  if (Utils.shallowDiff(watchRef.current.style, style) || Utils.shallowDiff(watchRef.current.props, props)) {
    watchRef.current = obj;
    valueRef.current = fn();
  }

  return valueRef.current;
}

function useSeriesStyle(series) {
  var _React$useContext = React.useContext(ChartContext),
      _React$useContext2 = _slicedToArray(_React$useContext, 1),
      _React$useContext2$ = _React$useContext2[0],
      focused = _React$useContext2$.focused,
      getSeriesStyle = _React$useContext2$.getSeriesStyle;

  return series.getStatusStyle(focused, getSeriesStyle);
}

function useDatumStyle(datum) {
  var _React$useContext = React.useContext(ChartContext),
      _React$useContext2 = _slicedToArray(_React$useContext, 1),
      _React$useContext2$ = _React$useContext2[0],
      focused = _React$useContext2$.focused,
      getDatumStyle = _React$useContext2$.getDatumStyle;

  return datum.getStatusStyle(focused, getDatumStyle);
}

var defaultStyle$4 = {
  r: 2,
  strokeWidth: '1',
  stroke: '#000000',
  fill: '#000000',
  opacity: 1
};

function Circle$1(_ref) {
  var x = _ref.x,
      y = _ref.y,
      r = _ref.r,
      style = _ref.style,
      rest = _objectWithoutProperties(_ref, ["x", "y", "r", "style"]);

  var resolvedStyle = _objectSpread({}, defaultStyle$4, style);

  return React.createElement("circle", _extends({}, rest, {
    cx: x || 0,
    cy: y || 0,
    r: 1,
    style: resolvedStyle
  }));
}

var pathDefaultStyle = {
  strokeWidth: 2
};
var circleDefaultStyle = {
  r: 2
};

function Line$1(_ref) {
  var series = _ref.series,
      showPoints = _ref.showPoints,
      curve = _ref.curve;
  var lineFn = React.useMemo(function () {
    return line().x(function (d) {
      return d.x;
    }).y(function (d) {
      return d.y;
    }).defined(function (d) {
      return d.defined;
    }).curve(Curves[curve] || curve);
  }, [curve]);
  var path = React.useMemo(function () {
    return lineFn(series.datums);
  }, [lineFn, series.datums]);
  var style = useSeriesStyle(series);
  var pathProps = {
    d: path,
    style: _objectSpread({}, pathDefaultStyle, style, style.line, {
      fill: 'none'
    })
  };
  var renderedPath = usePropsMemo(function () {
    return React.createElement(Path$1, pathProps);
  }, pathProps);
  return React.useMemo(function () {
    return React.createElement("g", null, renderedPath, showPoints && series.datums.map(function (datum, i) {
      return React.createElement(Point, {
        key: i,
        datum: datum,
        style: style
      });
    }));
  }, [renderedPath, series.datums, showPoints, style]);
}

Line$1.defaultProps = {
  curve: 'monotoneX'
};

Line$1.plotDatum = function (datum, _ref2) {
  var primaryAxis = _ref2.primaryAxis,
      secondaryAxis = _ref2.secondaryAxis,
      xAxis = _ref2.xAxis,
      yAxis = _ref2.yAxis;
  datum.primaryCoord = primaryAxis.scale(datum.primary);
  datum.secondaryCoord = secondaryAxis.scale(datum.secondary);
  datum.x = xAxis.scale(datum.xValue);
  datum.y = yAxis.scale(datum.yValue);
  datum.defined = Utils.isValidPoint(datum.xValue) && Utils.isValidPoint(datum.yValue);
  datum.base = primaryAxis.vertical ? xAxis.scale(datum.baseValue) : yAxis.scale(datum.baseValue); // Adjust non-bar elements for ordinal scales

  if (xAxis.type === 'ordinal') {
    datum.x += xAxis.tickOffset;
  }

  if (yAxis.type === 'ordinal') {
    datum.y += yAxis.tickOffset;
  } // Set the default anchor point


  datum.anchor = {
    x: datum.x,
    y: datum.y // Set the pointer points (used in voronoi)

  };
  datum.boundingPoints = [datum.anchor];
};

Line$1.buildStyles = function (series, _ref3) {
  var defaultColors = _ref3.defaultColors;
  var defaults = {
    // Pass some sane defaults
    color: defaultColors[series.index % (defaultColors.length - 1)]
  };
  Utils.buildStyleGetters(series, defaults);
};

function Point(_ref4) {
  var datum = _ref4.datum,
      style = _ref4.style;
  var dataStyle = useDatumStyle(datum);
  var circleProps = {
    x: datum ? datum.x : undefined,
    y: datum ? datum.y : undefined,
    style: _objectSpread({}, circleDefaultStyle, style, style.circle, dataStyle, dataStyle.circle)
  };
  return usePropsMemo(function () {
    if (!datum.defined) {
      return null;
    }

    return React.createElement(Circle$1, circleProps);
  }, circleProps);
}

var circleDefaultStyle$1 = {
  r: 2
};

function Bubble(_ref) {
  var series = _ref.series;
  var style = useSeriesStyle(series);
  return React.createElement("g", null, series.datums.map(function (datum, i) {
    return React.createElement(Point$1, {
      key: i,
      datum: datum,
      style: style
    });
  }));
}

Bubble.plotDatum = function (datum, _ref2) {
  var primaryAxis = _ref2.primaryAxis,
      secondaryAxis = _ref2.secondaryAxis,
      xAxis = _ref2.xAxis,
      yAxis = _ref2.yAxis;
  datum.primaryCoord = primaryAxis.scale(datum.primary);
  datum.secondaryCoord = secondaryAxis.scale(datum.secondary);
  datum.x = xAxis.scale(datum.xValue);
  datum.y = yAxis.scale(datum.yValue);
  datum.defined = Utils.isValidPoint(datum.xValue) && Utils.isValidPoint(datum.yValue);
  datum.base = primaryAxis.vertical ? xAxis.scale(datum.baseValue) : yAxis.scale(datum.baseValue); // Adjust non-bar elements for ordinal scales

  if (xAxis.type === 'ordinal') {
    datum.x += xAxis.tickOffset;
  }

  if (yAxis.type === 'ordinal') {
    datum.y += yAxis.tickOffset;
  } // Set the default anchor point


  datum.anchor = {
    x: datum.x,
    y: datum.y,
    verticalPadding: datum.r,
    horizontalPadding: datum.r // Set the pointer points (used in voronoi)

  };
  datum.boundingPoints = [datum.anchor];
};

Bubble.buildStyles = function (series, _ref3) {
  var defaultColors = _ref3.defaultColors;
  var defaults = {
    // Pass some sane defaults
    color: defaultColors[series.index % (defaultColors.length - 1)]
  };
  Utils.buildStyleGetters(series, defaults);
};

function Point$1(_ref4) {
  var datum = _ref4.datum,
      style = _ref4.style;
  var dataStyle = useDatumStyle(datum);
  var circleProps = {
    x: datum ? datum.x : undefined,
    y: datum ? datum.y : undefined,
    style: _objectSpread({}, circleDefaultStyle$1, style, style.circle, dataStyle, dataStyle.circle, typeof datum.r !== 'undefined' ? {
      r: datum.r
    } : {})
  };
  return usePropsMemo(function () {
    if (!datum.defined) {
      return null;
    }

    return React.createElement(Circle$1, circleProps);
  }, circleProps);
}

var defaultAreaStyle = {
  strokeWidth: 0
};
var lineDefaultStyle = {
  strokeWidth: 3
};

function Area(_ref) {
  var series = _ref.series,
      showOrphans = _ref.showOrphans,
      curve = _ref.curve;
  var areaFn = React.useMemo(function () {
    return area().x(function (d) {
      return d.x;
    }).y0(function (d) {
      return d.base;
    }).y1(function (d) {
      return d.y;
    }).defined(function (d) {
      return d.defined;
    }).curve(Curves[curve] || curve);
  }, [curve]);
  var lineFn = React.useMemo(function () {
    return line().x(function (d) {
      return d.x;
    }).y(function (d) {
      return d.y;
    }).defined(function (d) {
      return d.defined;
    }).curve(Curves[curve] || curve);
  }, [curve]);
  var areaPath = React.useMemo(function () {
    return areaFn(series.datums);
  }, [areaFn, series.datums]);
  var linePath = React.useMemo(function () {
    return lineFn(series.datums);
  }, [lineFn, series.datums]);
  var style = useSeriesStyle(series);
  var areaPathProps = {
    d: areaPath,
    style: _objectSpread({}, defaultAreaStyle, style, style.line)
  };
  var renderedAreaPath = usePropsMemo(function () {
    return React.createElement(Path$1, areaPathProps);
  }, areaPathProps);
  var linePathProps = {
    d: linePath,
    style: _objectSpread({}, defaultAreaStyle, style, style.line, {
      fill: 'none'
    })
  };
  var renderedLinePath = usePropsMemo(function () {
    return React.createElement(Path$1, linePathProps);
  }, linePathProps);
  return React.createElement("g", null, renderedAreaPath, renderedLinePath, showOrphans && series.datums.map(function (datum, index, all) {
    return React.createElement(OrphanLine, {
      key: index,
      datum: datum,
      style: style,
      all: all,
      index: index
    });
  }));
}

Area.defaultProps = {
  showOrphans: true,
  curve: 'linear'
};

Area.plotDatum = function (datum, _ref2) {
  var primaryAxis = _ref2.primaryAxis,
      secondaryAxis = _ref2.secondaryAxis,
      xAxis = _ref2.xAxis,
      yAxis = _ref2.yAxis; // Turn clamping on for secondaryAxis

  secondaryAxis.scale.clamp(true);
  datum.primaryCoord = primaryAxis.scale(datum.primary);
  datum.secondaryCoord = secondaryAxis.scale(datum.secondary);
  datum.x = xAxis.scale(datum.xValue);
  datum.y = yAxis.scale(datum.yValue);
  datum.defined = Utils.isValidPoint(datum.xValue) && Utils.isValidPoint(datum.yValue);
  datum.base = primaryAxis.vertical ? xAxis.scale(datum.baseValue) : yAxis.scale(datum.baseValue); // Turn clamping back off for secondaryAxis

  secondaryAxis.scale.clamp(false); // Adjust non-bar elements for ordinal scales

  if (xAxis.type === 'ordinal') {
    datum.x += xAxis.tickOffset;
  }

  if (yAxis.type === 'ordinal') {
    datum.y += yAxis.tickOffset;
  } // Set the default anchor point


  datum.anchor = {
    x: datum.x,
    y: datum.y // Set the pointer points (used in voronoi)

  };
  datum.boundingPoints = [datum.anchor, {
    x: primaryAxis.vertical ? primaryAxis.position === 'left' ? datum.base - 1 : datum.base : datum.anchor.x,
    y: !primaryAxis.vertical ? primaryAxis.position === 'bottom' ? datum.base - 1 : datum.base : datum.anchor.y
  }];
};

Area.buildStyles = function (series, _ref3) {
  var defaultColors = _ref3.defaultColors;
  var defaults = {
    // Pass some sane defaults
    color: defaultColors[series.index % (defaultColors.length - 1)]
  };
  Utils.buildStyleGetters(series, defaults);
};

var OrphanLine = function OrphanLine(_ref4) {
  var datum = _ref4.datum,
      style = _ref4.style,
      all = _ref4.all,
      index = _ref4.index;
  var prev = all[index - 1] || {
    defined: false
  };
  var next = all[index + 1] || {
    defined: false
  };
  var dataStyle = useDatumStyle(datum);
  var lineProps = {
    x1: !datum || Number.isNaN(datum.x) ? null : datum.x,
    y1: !datum || Number.isNaN(datum.base) ? null : datum.base,
    x2: !datum || Number.isNaN(datum.x) ? null : datum.x,
    y2: !datum || Number.isNaN(datum.y) ? null : datum.y,
    style: _objectSpread({}, lineDefaultStyle, style, style.line, dataStyle, dataStyle.line)
  };
  return usePropsMemo(function () {
    if (!datum.defined || prev.defined || next.defined) {
      return null;
    }

    return React.createElement(Line, lineProps);
  }, lineProps);
};

function Bar(_ref) {
  var series = _ref.series;

  var _React$useContext = React.useContext(ChartContext),
      _React$useContext2 = _slicedToArray(_React$useContext, 1),
      primaryAxes = _React$useContext2[0].primaryAxes;

  var style = useSeriesStyle(series);

  var _ref2 = series.primaryAxisID ? primaryAxes.find(function (d) {
    return d.id === series.primaryAxisID;
  }) : primaryAxes[0],
      barOffset = _ref2.barOffset;

  return React.createElement("g", {
    className: "series bar"
  }, series.datums.map(function (datum, i) {
    return React.createElement(BarPiece, _extends({
      key: i
    }, {
      datum: datum,
      barOffset: barOffset,
      style: style
    }));
  }));
}

Bar.plotDatum = function (datum, _ref3) {
  var xAxis = _ref3.xAxis,
      yAxis = _ref3.yAxis,
      primaryAxis = _ref3.primaryAxis,
      secondaryAxis = _ref3.secondaryAxis; // Turn clamping on for secondaryAxis

  secondaryAxis.scale.clamp(true);
  datum.primaryCoord = primaryAxis.scale(datum.primary);
  datum.secondaryCoord = secondaryAxis.scale(datum.secondary);
  datum.x = xAxis.scale(datum.xValue);
  datum.y = yAxis.scale(datum.yValue);
  datum.defined = Utils.isValidPoint(datum.xValue) && Utils.isValidPoint(datum.yValue);
  datum.base = secondaryAxis.scale(datum.baseValue);
  datum.size = primaryAxis.barSize; // Turn clamping back off for secondaryAxis

  secondaryAxis.scale.clamp(false);

  if (!secondaryAxis.stacked) {
    datum.size = primaryAxis.seriesBarSize; // Use the seriesTypeIndex here in case we have mixed types.

    var seriesBandScaleOffset = primaryAxis.seriesBandScale(datum.seriesTypeIndex);

    if (secondaryAxis.vertical) {
      datum.x += seriesBandScaleOffset;
    } else {
      datum.y += seriesBandScaleOffset;
    }
  } // Set the default anchor point


  datum.anchor = {
    x: datum.x,
    y: datum.y,
    horizontalPadding: secondaryAxis.vertical ? datum.size / 2 : 0,
    verticalPadding: secondaryAxis.vertical ? 0 : datum.size / 2 // Adjust the anchor point for bars

  };

  if (!primaryAxis.vertical) {
    datum.anchor.x += primaryAxis.type !== 'ordinal' ? 0 : datum.size / 2;
  } else {
    datum.anchor.y += primaryAxis.type !== 'ordinal' ? 0 : datum.size / 2;
  } // Set the pointer points (used in voronoi)


  datum.boundingPoints = [// End of bar
  datum.anchor, // Start of bar
  {
    x: primaryAxis.vertical ? primaryAxis.position === 'left' ? datum.base + 1 : datum.base : datum.anchor.x,
    y: !primaryAxis.vertical ? primaryAxis.position === 'bottom' ? datum.base - 1 : datum.base : datum.anchor.y
  }];
};

Bar.buildStyles = function (series, _ref4) {
  var defaultColors = _ref4.defaultColors;
  var defaults = {
    // Pass some sane defaults
    color: defaultColors[series.index % (defaultColors.length - 1)]
  };
  Utils.buildStyleGetters(series, defaults);
};

function BarPiece(_ref5) {
  var datum = _ref5.datum,
      barOffset = _ref5.barOffset,
      style = _ref5.style;

  var _React$useContext3 = React.useContext(ChartContext),
      _React$useContext4 = _slicedToArray(_React$useContext3, 1),
      primaryAxes = _React$useContext4[0].primaryAxes;

  var x = datum ? datum.x : 0;
  var y = datum ? datum.y : 0;
  var base = datum ? datum.base : 0;
  var size = datum ? datum.size : 0;
  var x1;
  var y1;
  var x2;
  var y2;

  if (primaryAxes.find(function (d) {
    return d.vertical;
  })) {
    x1 = base;
    x2 = x;
    y1 = y + barOffset;
    y2 = y1 + size;
  } else {
    x1 = x + barOffset;
    x2 = x1 + size;
    y1 = y;
    y2 = base;
  }

  var dataStyle = useDatumStyle(datum);
  var rectangleProps = {
    style: _objectSpread({}, style, style.rectangle, dataStyle, dataStyle.rectangle),
    x1: Number.isNaN(x1) ? null : x1,
    y1: Number.isNaN(y1) ? null : y1,
    x2: Number.isNaN(x2) ? null : x2,
    y2: Number.isNaN(y2) ? null : y2
  };
  return usePropsMemo(function () {
    return React.createElement(Rectangle, rectangleProps);
  }, rectangleProps);
}

var seriesTypes = {
  line: Line$1,
  bubble: Bubble,
  area: Area,
  bar: Bar // pie: Pie

};
var defaultSeries = {
  type: 'line',
  showPoints: true,
  showOrphans: true,
  curve: 'monotoneX'
};
var seriesPropType = PropTypes.oneOfType([PropTypes.shape({
  type: PropTypes.string,
  showPoints: PropTypes.bool,
  showOrphans: PropTypes.bool,
  curve: PropTypes.oneOf(Object.keys(Curves))
}), PropTypes.func]);

var calculateSeriesOptions = function calculateSeriesOptions(_ref) {
  var materializedData = _ref.materializedData,
      series = _ref.series;
  return React.useMemo(function () {
    return materializedData.map(function (s, seriesIndex) {
      var _defaultSeries = _objectSpread({}, defaultSeries, typeof series === 'function' ? series(s, seriesIndex) : series),
          type = _defaultSeries.type,
          rest = _objectWithoutProperties(_defaultSeries, ["type"]);

      var renderer = seriesTypes[type];

      if (!renderer) {
        throw new Error("Could not find a registered series type for ".concat(type));
      }

      return _objectSpread({}, rest, {
        type: type,
        renderer: renderer
      });
    });
  }, [materializedData, series]);
};

var calculateSeriesTypes = function calculateSeriesTypes(_ref) {
  var materializedData = _ref.materializedData,
      seriesOptions = _ref.seriesOptions;
  return React.useMemo(function () {
    return materializedData.map(function (series, i) {
      series.Component = seriesOptions[i].renderer;
      return series;
    }).map(function (series, i, all) {
      var seriesTypeIndex = all.filter(function (d, j) {
        return j < i && d.Component === series.Component;
      }).length;
      return _objectSpread({}, series, {
        seriesTypeIndex: seriesTypeIndex,
        datums: series.datums.map(function (datum) {
          return _objectSpread({}, datum, {
            seriesTypeIndex: seriesTypeIndex
          });
        })
      });
    });
  }, [materializedData, seriesOptions]);
};

var calculateDimensions = function calculateDimensions(_ref) {
  var width = _ref.width,
      height = _ref.height,
      axisDimensions = _ref.axisDimensions,
      padding = _ref.padding,
      offset = _ref.offset;
  offset = React.useMemo(function () {
    return {
      left: offset.left || 0,
      top: offset.top || 0
    };
  }, [offset]);

  var _React$useMemo = React.useMemo(function () {
    // Left
    var axesLeftWidth = axisDimensions.left && Utils.sumObjBy(axisDimensions.left, 'width') || 0;
    var axesLeftTop = axisDimensions.left && Utils.sumObjBy(axisDimensions.left, 'top') || 0;
    var axesLeftBottom = axisDimensions.left && Utils.sumObjBy(axisDimensions.left, 'bottom') || 0; // Right

    var axesRightWidth = axisDimensions.right && Utils.sumObjBy(axisDimensions.right, 'width') || 0;
    var axesRightTop = axisDimensions.right && Utils.sumObjBy(axisDimensions.right, 'top') || 0;
    var axesRightBottom = axisDimensions.right && Utils.sumObjBy(axisDimensions.right, 'bottom') || 0; // Top

    var axesTopHeight = axisDimensions.top && Utils.sumObjBy(axisDimensions.top, 'height') || 0;
    var axesTopLeft = axisDimensions.top && Utils.sumObjBy(axisDimensions.top, 'left') || 0;
    var axesTopRight = axisDimensions.top && Utils.sumObjBy(axisDimensions.top, 'right') || 0; // Bottom

    var axesBottomHeight = axisDimensions.bottom && Utils.sumObjBy(axisDimensions.bottom, 'height') || 0;
    var axesBottomLeft = axisDimensions.bottom && Utils.sumObjBy(axisDimensions.bottom, 'left') || 0;
    var axesBottomRight = axisDimensions.bottom && Utils.sumObjBy(axisDimensions.bottom, 'right') || 0;
    var paddingLeft = padding.left || 0;
    var paddingRight = padding.right || 0;
    var paddingTop = padding.top || 0;
    var paddingBottom = padding.bottom || 0;
    var gridX = paddingLeft + Math.max(axesLeftWidth, axesTopLeft, axesBottomLeft);
    var gridY = paddingTop + Math.max(axesTopHeight, axesLeftTop, axesRightTop);
    var gridWidth = width - paddingLeft - paddingRight - Math.max(axesLeftWidth, axesTopLeft, axesBottomLeft) - Math.max(axesRightWidth, axesTopRight, axesBottomRight);
    var gridHeight = height - paddingTop - paddingBottom - Math.max(axesTopHeight, axesLeftTop, axesRightTop) - Math.max(axesBottomHeight, axesLeftBottom, axesRightBottom);
    return {
      gridX: gridX,
      gridY: gridY,
      gridWidth: gridWidth,
      gridHeight: gridHeight
    };
  }, [width, height, axisDimensions, padding]),
      gridX = _React$useMemo.gridX,
      gridY = _React$useMemo.gridY,
      gridWidth = _React$useMemo.gridWidth,
      gridHeight = _React$useMemo.gridHeight;

  return {
    offset: offset,
    gridX: gridX,
    gridY: gridY,
    gridWidth: gridWidth,
    gridHeight: gridHeight
  };
};

function ascending(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

function bisector(compare) {
  if (compare.length === 1) compare = ascendingComparator(compare);
  return {
    left: function left(a, x, lo, hi) {
      if (lo == null) lo = 0;
      if (hi == null) hi = a.length;

      while (lo < hi) {
        var mid = lo + hi >>> 1;
        if (compare(a[mid], x) < 0) lo = mid + 1;else hi = mid;
      }

      return lo;
    },
    right: function right(a, x, lo, hi) {
      if (lo == null) lo = 0;
      if (hi == null) hi = a.length;

      while (lo < hi) {
        var mid = lo + hi >>> 1;
        if (compare(a[mid], x) > 0) hi = mid;else lo = mid + 1;
      }

      return lo;
    }
  };
}

function ascendingComparator(f) {
  return function (d, x) {
    return ascending(f(d), x);
  };
}

var ascendingBisect = bisector(ascending);
var bisectRight = ascendingBisect.right;

function sequence(start, stop, step) {
  start = +start, stop = +stop, step = (n = arguments.length) < 2 ? (stop = start, start = 0, 1) : n < 3 ? 1 : +step;
  var i = -1,
      n = Math.max(0, Math.ceil((stop - start) / step)) | 0,
      range = new Array(n);

  while (++i < n) {
    range[i] = start + i * step;
  }

  return range;
}

var e10 = Math.sqrt(50),
    e5 = Math.sqrt(10),
    e2 = Math.sqrt(2);

function ticks(start, stop, count) {
  var reverse,
      i = -1,
      n,
      ticks,
      step;
  stop = +stop, start = +start, count = +count;
  if (start === stop && count > 0) return [start];
  if (reverse = stop < start) n = start, start = stop, stop = n;
  if ((step = tickIncrement(start, stop, count)) === 0 || !isFinite(step)) return [];

  if (step > 0) {
    start = Math.ceil(start / step);
    stop = Math.floor(stop / step);
    ticks = new Array(n = Math.ceil(stop - start + 1));

    while (++i < n) {
      ticks[i] = (start + i) * step;
    }
  } else {
    start = Math.floor(start * step);
    stop = Math.ceil(stop * step);
    ticks = new Array(n = Math.ceil(start - stop + 1));

    while (++i < n) {
      ticks[i] = (start - i) / step;
    }
  }

  if (reverse) ticks.reverse();
  return ticks;
}

function tickIncrement(start, stop, count) {
  var step = (stop - start) / Math.max(0, count),
      power = Math.floor(Math.log(step) / Math.LN10),
      error = step / Math.pow(10, power);
  return power >= 0 ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power) : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
}

function tickStep(start, stop, count) {
  var step0 = Math.abs(stop - start) / Math.max(0, count),
      step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)),
      error = step0 / step1;
  if (error >= e10) step1 *= 10;else if (error >= e5) step1 *= 5;else if (error >= e2) step1 *= 2;
  return stop < start ? -step1 : step1;
}

function initRange(domain, range) {
  switch (arguments.length) {
    case 0:
      break;

    case 1:
      this.range(domain);
      break;

    default:
      this.range(range).domain(domain);
      break;
  }

  return this;
}

var implicit = Symbol("implicit");

function ordinal() {
  var index = new Map(),
      domain = [],
      range = [],
      unknown = implicit;

  function scale(d) {
    var key = d + "",
        i = index.get(key);

    if (!i) {
      if (unknown !== implicit) return unknown;
      index.set(key, i = domain.push(d));
    }

    return range[(i - 1) % range.length];
  }

  scale.domain = function (_) {
    if (!arguments.length) return domain.slice();
    domain = [], index = new Map();
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var value = _step.value;
        var key = value + "";
        if (index.has(key)) continue;
        index.set(key, domain.push(value));
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return scale;
  };

  scale.range = function (_) {
    return arguments.length ? (range = Array.from(_), scale) : range.slice();
  };

  scale.unknown = function (_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  scale.copy = function () {
    return ordinal(domain, range).unknown(unknown);
  };

  initRange.apply(scale, arguments);
  return scale;
}

function band() {
  var scale = ordinal().unknown(undefined),
      domain = scale.domain,
      ordinalRange = scale.range,
      r0 = 0,
      r1 = 1,
      step,
      bandwidth,
      round = false,
      paddingInner = 0,
      paddingOuter = 0,
      align = 0.5;
  delete scale.unknown;

  function rescale() {
    var n = domain().length,
        reverse = r1 < r0,
        start = reverse ? r1 : r0,
        stop = reverse ? r0 : r1;
    step = (stop - start) / Math.max(1, n - paddingInner + paddingOuter * 2);
    if (round) step = Math.floor(step);
    start += (stop - start - step * (n - paddingInner)) * align;
    bandwidth = step * (1 - paddingInner);
    if (round) start = Math.round(start), bandwidth = Math.round(bandwidth);
    var values = sequence(n).map(function (i) {
      return start + step * i;
    });
    return ordinalRange(reverse ? values.reverse() : values);
  }

  scale.domain = function (_) {
    return arguments.length ? (domain(_), rescale()) : domain();
  };

  scale.range = function (_) {
    var _ref6, _ref7;

    return arguments.length ? ((_ref6 = _, _ref7 = _slicedToArray2(_ref6, 2), r0 = _ref7[0], r1 = _ref7[1], _ref6), r0 = +r0, r1 = +r1, rescale()) : [r0, r1];
  };

  scale.rangeRound = function (_) {
    var _ref8, _ref9;

    return (_ref8 = _, _ref9 = _slicedToArray2(_ref8, 2), r0 = _ref9[0], r1 = _ref9[1], _ref8), r0 = +r0, r1 = +r1, round = true, rescale();
  };

  scale.bandwidth = function () {
    return bandwidth;
  };

  scale.step = function () {
    return step;
  };

  scale.round = function (_) {
    return arguments.length ? (round = !!_, rescale()) : round;
  };

  scale.padding = function (_) {
    return arguments.length ? (paddingInner = Math.min(1, paddingOuter = +_), rescale()) : paddingInner;
  };

  scale.paddingInner = function (_) {
    return arguments.length ? (paddingInner = Math.min(1, _), rescale()) : paddingInner;
  };

  scale.paddingOuter = function (_) {
    return arguments.length ? (paddingOuter = +_, rescale()) : paddingOuter;
  };

  scale.align = function (_) {
    return arguments.length ? (align = Math.max(0, Math.min(1, _)), rescale()) : align;
  };

  scale.copy = function () {
    return band(domain(), [r0, r1]).round(round).paddingInner(paddingInner).paddingOuter(paddingOuter).align(align);
  };

  return initRange.apply(rescale(), arguments);
}

function define(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}

function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);

  for (var key in definition) {
    prototype[key] = definition[key];
  }

  return prototype;
}

function Color() {}

var _darker = 0.7;

var _brighter = 1 / _darker;

var reI = "\\s*([+-]?\\d+)\\s*",
    reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
    reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
    reHex3 = /^#([0-9a-f]{3})$/,
    reHex6 = /^#([0-9a-f]{6})$/,
    reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$"),
    reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$"),
    reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$"),
    reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$"),
    reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$"),
    reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");
var named = {
  aliceblue: 0xf0f8ff,
  antiquewhite: 0xfaebd7,
  aqua: 0x00ffff,
  aquamarine: 0x7fffd4,
  azure: 0xf0ffff,
  beige: 0xf5f5dc,
  bisque: 0xffe4c4,
  black: 0x000000,
  blanchedalmond: 0xffebcd,
  blue: 0x0000ff,
  blueviolet: 0x8a2be2,
  brown: 0xa52a2a,
  burlywood: 0xdeb887,
  cadetblue: 0x5f9ea0,
  chartreuse: 0x7fff00,
  chocolate: 0xd2691e,
  coral: 0xff7f50,
  cornflowerblue: 0x6495ed,
  cornsilk: 0xfff8dc,
  crimson: 0xdc143c,
  cyan: 0x00ffff,
  darkblue: 0x00008b,
  darkcyan: 0x008b8b,
  darkgoldenrod: 0xb8860b,
  darkgray: 0xa9a9a9,
  darkgreen: 0x006400,
  darkgrey: 0xa9a9a9,
  darkkhaki: 0xbdb76b,
  darkmagenta: 0x8b008b,
  darkolivegreen: 0x556b2f,
  darkorange: 0xff8c00,
  darkorchid: 0x9932cc,
  darkred: 0x8b0000,
  darksalmon: 0xe9967a,
  darkseagreen: 0x8fbc8f,
  darkslateblue: 0x483d8b,
  darkslategray: 0x2f4f4f,
  darkslategrey: 0x2f4f4f,
  darkturquoise: 0x00ced1,
  darkviolet: 0x9400d3,
  deeppink: 0xff1493,
  deepskyblue: 0x00bfff,
  dimgray: 0x696969,
  dimgrey: 0x696969,
  dodgerblue: 0x1e90ff,
  firebrick: 0xb22222,
  floralwhite: 0xfffaf0,
  forestgreen: 0x228b22,
  fuchsia: 0xff00ff,
  gainsboro: 0xdcdcdc,
  ghostwhite: 0xf8f8ff,
  gold: 0xffd700,
  goldenrod: 0xdaa520,
  gray: 0x808080,
  green: 0x008000,
  greenyellow: 0xadff2f,
  grey: 0x808080,
  honeydew: 0xf0fff0,
  hotpink: 0xff69b4,
  indianred: 0xcd5c5c,
  indigo: 0x4b0082,
  ivory: 0xfffff0,
  khaki: 0xf0e68c,
  lavender: 0xe6e6fa,
  lavenderblush: 0xfff0f5,
  lawngreen: 0x7cfc00,
  lemonchiffon: 0xfffacd,
  lightblue: 0xadd8e6,
  lightcoral: 0xf08080,
  lightcyan: 0xe0ffff,
  lightgoldenrodyellow: 0xfafad2,
  lightgray: 0xd3d3d3,
  lightgreen: 0x90ee90,
  lightgrey: 0xd3d3d3,
  lightpink: 0xffb6c1,
  lightsalmon: 0xffa07a,
  lightseagreen: 0x20b2aa,
  lightskyblue: 0x87cefa,
  lightslategray: 0x778899,
  lightslategrey: 0x778899,
  lightsteelblue: 0xb0c4de,
  lightyellow: 0xffffe0,
  lime: 0x00ff00,
  limegreen: 0x32cd32,
  linen: 0xfaf0e6,
  magenta: 0xff00ff,
  maroon: 0x800000,
  mediumaquamarine: 0x66cdaa,
  mediumblue: 0x0000cd,
  mediumorchid: 0xba55d3,
  mediumpurple: 0x9370db,
  mediumseagreen: 0x3cb371,
  mediumslateblue: 0x7b68ee,
  mediumspringgreen: 0x00fa9a,
  mediumturquoise: 0x48d1cc,
  mediumvioletred: 0xc71585,
  midnightblue: 0x191970,
  mintcream: 0xf5fffa,
  mistyrose: 0xffe4e1,
  moccasin: 0xffe4b5,
  navajowhite: 0xffdead,
  navy: 0x000080,
  oldlace: 0xfdf5e6,
  olive: 0x808000,
  olivedrab: 0x6b8e23,
  orange: 0xffa500,
  orangered: 0xff4500,
  orchid: 0xda70d6,
  palegoldenrod: 0xeee8aa,
  palegreen: 0x98fb98,
  paleturquoise: 0xafeeee,
  palevioletred: 0xdb7093,
  papayawhip: 0xffefd5,
  peachpuff: 0xffdab9,
  peru: 0xcd853f,
  pink: 0xffc0cb,
  plum: 0xdda0dd,
  powderblue: 0xb0e0e6,
  purple: 0x800080,
  rebeccapurple: 0x663399,
  red: 0xff0000,
  rosybrown: 0xbc8f8f,
  royalblue: 0x4169e1,
  saddlebrown: 0x8b4513,
  salmon: 0xfa8072,
  sandybrown: 0xf4a460,
  seagreen: 0x2e8b57,
  seashell: 0xfff5ee,
  sienna: 0xa0522d,
  silver: 0xc0c0c0,
  skyblue: 0x87ceeb,
  slateblue: 0x6a5acd,
  slategray: 0x708090,
  slategrey: 0x708090,
  snow: 0xfffafa,
  springgreen: 0x00ff7f,
  steelblue: 0x4682b4,
  tan: 0xd2b48c,
  teal: 0x008080,
  thistle: 0xd8bfd8,
  tomato: 0xff6347,
  turquoise: 0x40e0d0,
  violet: 0xee82ee,
  wheat: 0xf5deb3,
  white: 0xffffff,
  whitesmoke: 0xf5f5f5,
  yellow: 0xffff00,
  yellowgreen: 0x9acd32
};
define(Color, color, {
  displayable: function displayable() {
    return this.rgb().displayable();
  },
  hex: function hex() {
    return this.rgb().hex();
  },
  toString: function toString() {
    return this.rgb() + "";
  }
});

function color(format) {
  var m;
  format = (format + "").trim().toLowerCase();
  return (m = reHex3.exec(format)) ? (m = parseInt(m[1], 16), new Rgb(m >> 8 & 0xf | m >> 4 & 0x0f0, m >> 4 & 0xf | m & 0xf0, (m & 0xf) << 4 | m & 0xf, 1) // #f00
  ) : (m = reHex6.exec(format)) ? rgbn(parseInt(m[1], 16)) // #ff0000
  : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
  : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
  : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
  : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
  : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
  : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
  : named.hasOwnProperty(format) ? rgbn(named[format]) : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
}

function rgbn(n) {
  return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
}

function rgba(r, g, b, a) {
  if (a <= 0) r = g = b = NaN;
  return new Rgb(r, g, b, a);
}

function rgbConvert(o) {
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Rgb();
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}

function rgb(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}

function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}

define(Rgb, rgb, extend(Color, {
  brighter: function brighter(k) {
    k = k == null ? _brighter : Math.pow(_brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker: function darker(k) {
    k = k == null ? _darker : Math.pow(_darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb: function rgb() {
    return this;
  },
  displayable: function displayable() {
    return 0 <= this.r && this.r <= 255 && 0 <= this.g && this.g <= 255 && 0 <= this.b && this.b <= 255 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: function hex() {
    return "#" + _hex(this.r) + _hex(this.g) + _hex(this.b);
  },
  toString: function toString() {
    var a = this.opacity;
    a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (a === 1 ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (a === 1 ? ")" : ", " + a + ")");
  }
}));

function _hex(value) {
  value = Math.max(0, Math.min(255, Math.round(value) || 0));
  return (value < 16 ? "0" : "") + value.toString(16);
}

function hsla(h, s, l, a) {
  if (a <= 0) h = s = l = NaN;else if (l <= 0 || l >= 1) h = s = NaN;else if (s <= 0) h = NaN;
  return new Hsl(h, s, l, a);
}

function hslConvert(o) {
  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Hsl();
  if (o instanceof Hsl) return o;
  o = o.rgb();
  var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      h = NaN,
      s = max - min,
      l = (max + min) / 2;

  if (s) {
    if (r === max) h = (g - b) / s + (g < b) * 6;else if (g === max) h = (b - r) / s + 2;else h = (r - g) / s + 4;
    s /= l < 0.5 ? max + min : 2 - max - min;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }

  return new Hsl(h, s, l, o.opacity);
}

function hsl(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}

function Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

define(Hsl, hsl, extend(Color, {
  brighter: function brighter(k) {
    k = k == null ? _brighter : Math.pow(_brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function darker(k) {
    k = k == null ? _darker : Math.pow(_darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function rgb() {
    var h = this.h % 360 + (this.h < 0) * 360,
        s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
        l = this.l,
        m2 = l + (l < 0.5 ? l : 1 - l) * s,
        m1 = 2 * l - m2;
    return new Rgb(hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2), hsl2rgb(h, m1, m2), hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity);
  },
  displayable: function displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  }
}));
/* From FvD 13.37, CSS Color Module Level 3 */

function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}

var deg2rad = Math.PI / 180;
var rad2deg = 180 / Math.PI; // https://beta.observablehq.com/@mbostock/lab-and-rgb

var K = 18,
    Xn = 0.96422,
    Yn = 1,
    Zn = 0.82521,
    t0 = 4 / 29,
    t1 = 6 / 29,
    t2 = 3 * t1 * t1,
    t3 = t1 * t1 * t1;

function labConvert(o) {
  if (o instanceof Lab) return new Lab(o.l, o.a, o.b, o.opacity);

  if (o instanceof Hcl) {
    if (isNaN(o.h)) return new Lab(o.l, 0, 0, o.opacity);
    var h = o.h * deg2rad;
    return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
  }

  if (!(o instanceof Rgb)) o = rgbConvert(o);
  var r = rgb2lrgb(o.r),
      g = rgb2lrgb(o.g),
      b = rgb2lrgb(o.b),
      y = xyz2lab((0.2225045 * r + 0.7168786 * g + 0.0606169 * b) / Yn),
      x,
      z;
  if (r === g && g === b) x = z = y;else {
    x = xyz2lab((0.4360747 * r + 0.3850649 * g + 0.1430804 * b) / Xn);
    z = xyz2lab((0.0139322 * r + 0.0971045 * g + 0.7141733 * b) / Zn);
  }
  return new Lab(116 * y - 16, 500 * (x - y), 200 * (y - z), o.opacity);
}

function lab(l, a, b, opacity) {
  return arguments.length === 1 ? labConvert(l) : new Lab(l, a, b, opacity == null ? 1 : opacity);
}

function Lab(l, a, b, opacity) {
  this.l = +l;
  this.a = +a;
  this.b = +b;
  this.opacity = +opacity;
}

define(Lab, lab, extend(Color, {
  brighter: function brighter(k) {
    return new Lab(this.l + K * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  darker: function darker(k) {
    return new Lab(this.l - K * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  rgb: function rgb() {
    var y = (this.l + 16) / 116,
        x = isNaN(this.a) ? y : y + this.a / 500,
        z = isNaN(this.b) ? y : y - this.b / 200;
    x = Xn * lab2xyz(x);
    y = Yn * lab2xyz(y);
    z = Zn * lab2xyz(z);
    return new Rgb(lrgb2rgb(3.1338561 * x - 1.6168667 * y - 0.4906146 * z), lrgb2rgb(-0.9787684 * x + 1.9161415 * y + 0.0334540 * z), lrgb2rgb(0.0719453 * x - 0.2289914 * y + 1.4052427 * z), this.opacity);
  }
}));

function xyz2lab(t) {
  return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
}

function lab2xyz(t) {
  return t > t1 ? t * t * t : t2 * (t - t0);
}

function lrgb2rgb(x) {
  return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
}

function rgb2lrgb(x) {
  return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
}

function hclConvert(o) {
  if (o instanceof Hcl) return new Hcl(o.h, o.c, o.l, o.opacity);
  if (!(o instanceof Lab)) o = labConvert(o);
  if (o.a === 0 && o.b === 0) return new Hcl(NaN, 0, o.l, o.opacity);
  var h = Math.atan2(o.b, o.a) * rad2deg;
  return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
}

function hcl(h, c, l, opacity) {
  return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
}

function Hcl(h, c, l, opacity) {
  this.h = +h;
  this.c = +c;
  this.l = +l;
  this.opacity = +opacity;
}

define(Hcl, hcl, extend(Color, {
  brighter: function brighter(k) {
    return new Hcl(this.h, this.c, this.l + K * (k == null ? 1 : k), this.opacity);
  },
  darker: function darker(k) {
    return new Hcl(this.h, this.c, this.l - K * (k == null ? 1 : k), this.opacity);
  },
  rgb: function rgb() {
    return labConvert(this).rgb();
  }
}));
var A = -0.14861,
    B = +1.78277,
    C = -0.29227,
    D = -0.90649,
    E = +1.97294,
    ED = E * D,
    EB = E * B,
    BC_DA = B * C - D * A;

function cubehelixConvert(o) {
  if (o instanceof Cubehelix) return new Cubehelix(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Rgb)) o = rgbConvert(o);
  var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB),
      bl = b - l,
      k = (E * (g - l) - C * bl) / D,
      s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)),
      // NaN if l=0 or l=1
  h = s ? Math.atan2(k, bl) * rad2deg - 120 : NaN;
  return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
}

function cubehelix(h, s, l, opacity) {
  return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l, opacity == null ? 1 : opacity);
}

function Cubehelix(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

define(Cubehelix, cubehelix, extend(Color, {
  brighter: function brighter(k) {
    k = k == null ? _brighter : Math.pow(_brighter, k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function darker(k) {
    k = k == null ? _darker : Math.pow(_darker, k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function rgb() {
    var h = isNaN(this.h) ? 0 : (this.h + 120) * deg2rad,
        l = +this.l,
        a = isNaN(this.s) ? 0 : this.s * l * (1 - l),
        cosh = Math.cos(h),
        sinh = Math.sin(h);
    return new Rgb(255 * (l + a * (A * cosh + B * sinh)), 255 * (l + a * (C * cosh + D * sinh)), 255 * (l + a * (E * cosh)), this.opacity);
  }
}));

function constant$2(x) {
  return function () {
    return x;
  };
}

function linear(a, d) {
  return function (t) {
    return a + t * d;
  };
}

function exponential(a, b, y) {
  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function (t) {
    return Math.pow(a + t * b, y);
  };
}

function gamma(y) {
  return (y = +y) === 1 ? nogamma : function (a, b) {
    return b - a ? exponential(a, b, y) : constant$2(isNaN(a) ? b : a);
  };
}

function nogamma(a, b) {
  var d = b - a;
  return d ? linear(a, d) : constant$2(isNaN(a) ? b : a);
}

var rgb$1 = function rgbGamma(y) {
  var color = gamma(y);

  function rgb$1(start, end) {
    var r = color((start = rgb(start)).r, (end = rgb(end)).r),
        g = color(start.g, end.g),
        b = color(start.b, end.b),
        opacity = nogamma(start.opacity, end.opacity);
    return function (t) {
      start.r = r(t);
      start.g = g(t);
      start.b = b(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }

  rgb$1.gamma = rgbGamma;
  return rgb$1;
}(1);

function array(a, b) {
  var nb = b ? b.length : 0,
      na = a ? Math.min(nb, a.length) : 0,
      x = new Array(na),
      c = new Array(nb),
      i;

  for (i = 0; i < na; ++i) {
    x[i] = interpolateValue(a[i], b[i]);
  }

  for (; i < nb; ++i) {
    c[i] = b[i];
  }

  return function (t) {
    for (i = 0; i < na; ++i) {
      c[i] = x[i](t);
    }

    return c;
  };
}

function date(a, b) {
  var d = new Date();
  return a = +a, b -= a, function (t) {
    return d.setTime(a + b * t), d;
  };
}

function interpolateNumber(a, b) {
  return a = +a, b -= a, function (t) {
    return a + b * t;
  };
}

function object(a, b) {
  var i = {},
      c = {},
      k;
  if (a === null || _typeof(a) !== "object") a = {};
  if (b === null || _typeof(b) !== "object") b = {};

  for (k in b) {
    if (k in a) {
      i[k] = interpolateValue(a[k], b[k]);
    } else {
      c[k] = b[k];
    }
  }

  return function (t) {
    for (k in i) {
      c[k] = i[k](t);
    }

    return c;
  };
}

var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
    reB = new RegExp(reA.source, "g");

function zero(b) {
  return function () {
    return b;
  };
}

function one(b) {
  return function (t) {
    return b(t) + "";
  };
}

function string(a, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0,
      // scan index for next number in b
  am,
      // current match in a
  bm,
      // current match in b
  bs,
      // string preceding current number in b, if any
  i = -1,
      // index in s
  s = [],
      // string constants and placeholders
  q = []; // number interpolators
  // Coerce inputs to strings.

  a = a + "", b = b + ""; // Interpolate pairs of numbers in a & b.

  while ((am = reA.exec(a)) && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) {
      // a string precedes the next number in b
      bs = b.slice(bi, bs);
      if (s[i]) s[i] += bs; // coalesce with previous string
      else s[++i] = bs;
    }

    if ((am = am[0]) === (bm = bm[0])) {
      // numbers in a & b match
      if (s[i]) s[i] += bm; // coalesce with previous string
      else s[++i] = bm;
    } else {
      // interpolate non-matching numbers
      s[++i] = null;
      q.push({
        i: i,
        x: interpolateNumber(am, bm)
      });
    }

    bi = reB.lastIndex;
  } // Add remains of b.


  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i]) s[i] += bs; // coalesce with previous string
    else s[++i] = bs;
  } // Special optimization for only a single match.
  // Otherwise, interpolate each of the numbers and rejoin the string.


  return s.length < 2 ? q[0] ? one(q[0].x) : zero(b) : (b = q.length, function (t) {
    for (var i = 0, o; i < b; ++i) {
      s[(o = q[i]).i] = o.x(t);
    }

    return s.join("");
  });
}

function interpolateValue(a, b) {
  var t = _typeof(b),
      c;

  return b == null || t === "boolean" ? constant$2(b) : (t === "number" ? interpolateNumber : t === "string" ? (c = color(b)) ? (b = c, rgb$1) : string : b instanceof color ? rgb$1 : b instanceof Date ? date : Array.isArray(b) ? array : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object : interpolateNumber)(a, b);
}

function interpolateRound(a, b) {
  return a = +a, b -= a, function (t) {
    return Math.round(a + b * t);
  };
}

var degrees = 180 / Math.PI;
var rho = Math.SQRT2;

function constant$3(x) {
  return function () {
    return x;
  };
}

function number(x) {
  return +x;
}

var unit = [0, 1];

function identity$2(x) {
  return x;
}

function normalize(a, b) {
  return (b -= a = +a) ? function (x) {
    return (x - a) / b;
  } : constant$3(isNaN(b) ? NaN : 0.5);
}

function clamper(domain) {
  var a = domain[0],
      b = domain[domain.length - 1],
      t;
  if (a > b) t = a, a = b, b = t;
  return function (x) {
    return Math.max(a, Math.min(b, x));
  };
} // normalize(a, b)(x) takes a domain value x in [a,b] and returns the corresponding parameter t in [0,1].
// interpolate(a, b)(t) takes a parameter t in [0,1] and returns the corresponding range value x in [a,b].


function bimap(domain, range, interpolate) {
  var d0 = domain[0],
      d1 = domain[1],
      r0 = range[0],
      r1 = range[1];
  if (d1 < d0) d0 = normalize(d1, d0), r0 = interpolate(r1, r0);else d0 = normalize(d0, d1), r0 = interpolate(r0, r1);
  return function (x) {
    return r0(d0(x));
  };
}

function polymap(domain, range, interpolate) {
  var j = Math.min(domain.length, range.length) - 1,
      d = new Array(j),
      r = new Array(j),
      i = -1; // Reverse descending domains.

  if (domain[j] < domain[0]) {
    domain = domain.slice().reverse();
    range = range.slice().reverse();
  }

  while (++i < j) {
    d[i] = normalize(domain[i], domain[i + 1]);
    r[i] = interpolate(range[i], range[i + 1]);
  }

  return function (x) {
    var i = bisectRight(domain, x, 1, j) - 1;
    return r[i](d[i](x));
  };
}

function copy(source, target) {
  return target.domain(source.domain()).range(source.range()).interpolate(source.interpolate()).clamp(source.clamp()).unknown(source.unknown());
}

function transformer() {
  var domain = unit,
      range = unit,
      interpolate = interpolateValue,
      transform,
      untransform,
      unknown,
      clamp = identity$2,
      piecewise,
      output,
      input;

  function rescale() {
    piecewise = Math.min(domain.length, range.length) > 2 ? polymap : bimap;
    output = input = null;
    return scale;
  }

  function scale(x) {
    return isNaN(x = +x) ? unknown : (output || (output = piecewise(domain.map(transform), range, interpolate)))(transform(clamp(x)));
  }

  scale.invert = function (y) {
    return clamp(untransform((input || (input = piecewise(range, domain.map(transform), interpolateNumber)))(y)));
  };

  scale.domain = function (_) {
    return arguments.length ? (domain = Array.from(_, number), clamp === identity$2 || (clamp = clamper(domain)), rescale()) : domain.slice();
  };

  scale.range = function (_) {
    return arguments.length ? (range = Array.from(_), rescale()) : range.slice();
  };

  scale.rangeRound = function (_) {
    return range = Array.from(_), interpolate = interpolateRound, rescale();
  };

  scale.clamp = function (_) {
    return arguments.length ? (clamp = _ ? clamper(domain) : identity$2, scale) : clamp !== identity$2;
  };

  scale.interpolate = function (_) {
    return arguments.length ? (interpolate = _, rescale()) : interpolate;
  };

  scale.unknown = function (_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  return function (t, u) {
    transform = t, untransform = u;
    return rescale();
  };
}

function continuous(transform, untransform) {
  return transformer()(transform, untransform);
} // Computes the decimal coefficient and exponent of the specified number x with
// significant digits p, where x is positive and p is in [1, 21] or undefined.
// For example, formatDecimal(1.23) returns ["123", 0].


function formatDecimal(x, p) {
  if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null; // NaN, ±Infinity

  var i,
      coefficient = x.slice(0, i); // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
  // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).

  return [coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient, +x.slice(i + 1)];
}

function exponent(x) {
  return x = formatDecimal(Math.abs(x)), x ? x[1] : NaN;
}

function formatGroup(grouping, thousands) {
  return function (value, width) {
    var i = value.length,
        t = [],
        j = 0,
        g = grouping[0],
        length = 0;

    while (i > 0 && g > 0) {
      if (length + g + 1 > width) g = Math.max(1, width - length);
      t.push(value.substring(i -= g, i + g));
      if ((length += g + 1) > width) break;
      g = grouping[j = (j + 1) % grouping.length];
    }

    return t.reverse().join(thousands);
  };
}

function formatNumerals(numerals) {
  return function (value) {
    return value.replace(/[0-9]/g, function (i) {
      return numerals[+i];
    });
  };
} // [[fill]align][sign][symbol][0][width][,][.precision][~][type]


var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;

function formatSpecifier(specifier) {
  return new FormatSpecifier(specifier);
}

formatSpecifier.prototype = FormatSpecifier.prototype; // instanceof

function FormatSpecifier(specifier) {
  if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);
  var match;
  this.fill = match[1] || " ";
  this.align = match[2] || ">";
  this.sign = match[3] || "-";
  this.symbol = match[4] || "";
  this.zero = !!match[5];
  this.width = match[6] && +match[6];
  this.comma = !!match[7];
  this.precision = match[8] && +match[8].slice(1);
  this.trim = !!match[9];
  this.type = match[10] || "";
}

FormatSpecifier.prototype.toString = function () {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width == null ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision == null ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
}; // Trims insignificant zeros, e.g., replaces 1.2000k with 1.2k.


function formatTrim(s) {
  out: for (var n = s.length, i = 1, i0 = -1, i1; i < n; ++i) {
    switch (s[i]) {
      case ".":
        i0 = i1 = i;
        break;

      case "0":
        if (i0 === 0) i0 = i;
        i1 = i;
        break;

      default:
        if (i0 > 0) {
          if (!+s[i]) break out;
          i0 = 0;
        }

        break;
    }
  }

  return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
}

var prefixExponent;

function formatPrefixAuto(x, p) {
  var d = formatDecimal(x, p);
  if (!d) return x + "";
  var coefficient = d[0],
      exponent = d[1],
      i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1,
      n = coefficient.length;
  return i === n ? coefficient : i > n ? coefficient + new Array(i - n + 1).join("0") : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i) : "0." + new Array(1 - i).join("0") + formatDecimal(x, Math.max(0, p + i - 1))[0]; // less than 1y!
}

function formatRounded(x, p) {
  var d = formatDecimal(x, p);
  if (!d) return x + "";
  var coefficient = d[0],
      exponent = d[1];
  return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1) : coefficient + new Array(exponent - coefficient.length + 2).join("0");
}

var formatTypes = {
  "%": function _(x, p) {
    return (x * 100).toFixed(p);
  },
  "b": function b(x) {
    return Math.round(x).toString(2);
  },
  "c": function c(x) {
    return x + "";
  },
  "d": function d(x) {
    return Math.round(x).toString(10);
  },
  "e": function e(x, p) {
    return x.toExponential(p);
  },
  "f": function f(x, p) {
    return x.toFixed(p);
  },
  "g": function g(x, p) {
    return x.toPrecision(p);
  },
  "o": function o(x) {
    return Math.round(x).toString(8);
  },
  "p": function p(x, _p) {
    return formatRounded(x * 100, _p);
  },
  "r": formatRounded,
  "s": formatPrefixAuto,
  "X": function X(x) {
    return Math.round(x).toString(16).toUpperCase();
  },
  "x": function x(_x) {
    return Math.round(_x).toString(16);
  }
};

function identity$3(x) {
  return x;
}

var prefixes = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];

function formatLocale(locale) {
  var group = locale.grouping && locale.thousands ? formatGroup(locale.grouping, locale.thousands) : identity$3,
      currency = locale.currency,
      decimal = locale.decimal,
      numerals = locale.numerals ? formatNumerals(locale.numerals) : identity$3,
      percent = locale.percent || "%";

  function newFormat(specifier) {
    specifier = formatSpecifier(specifier);
    var fill = specifier.fill,
        align = specifier.align,
        sign = specifier.sign,
        symbol = specifier.symbol,
        zero = specifier.zero,
        width = specifier.width,
        comma = specifier.comma,
        precision = specifier.precision,
        trim = specifier.trim,
        type = specifier.type; // The "n" type is an alias for ",g".

    if (type === "n") comma = true, type = "g"; // The "" type, and any invalid type, is an alias for ".12~g".
    else if (!formatTypes[type]) precision == null && (precision = 12), trim = true, type = "g"; // If zero fill is specified, padding goes after sign and before digits.

    if (zero || fill === "0" && align === "=") zero = true, fill = "0", align = "="; // Compute the prefix and suffix.
    // For SI-prefix, the suffix is lazily computed.

    var prefix = symbol === "$" ? currency[0] : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "",
        suffix = symbol === "$" ? currency[1] : /[%p]/.test(type) ? percent : ""; // What format function should we use?
    // Is this an integer type?
    // Can this type generate exponential notation?

    var formatType = formatTypes[type],
        maybeSuffix = /[defgprs%]/.test(type); // Set the default precision if not specified,
    // or clamp the specified precision to the supported range.
    // For significant precision, it must be in [1, 21].
    // For fixed precision, it must be in [0, 20].

    precision = precision == null ? 6 : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision)) : Math.max(0, Math.min(20, precision));

    function format(value) {
      var valuePrefix = prefix,
          valueSuffix = suffix,
          i,
          n,
          c;

      if (type === "c") {
        valueSuffix = formatType(value) + valueSuffix;
        value = "";
      } else {
        value = +value; // Perform the initial formatting.

        var valueNegative = value < 0;
        value = formatType(Math.abs(value), precision); // Trim insignificant zeros.

        if (trim) value = formatTrim(value); // If a negative value rounds to zero during formatting, treat as positive.

        if (valueNegative && +value === 0) valueNegative = false; // Compute the prefix and suffix.

        valuePrefix = (valueNegative ? sign === "(" ? sign : "-" : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
        valueSuffix = (type === "s" ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : ""); // Break the formatted value into the integer “value” part that can be
        // grouped, and fractional or exponential “suffix” part that is not.

        if (maybeSuffix) {
          i = -1, n = value.length;

          while (++i < n) {
            if (c = value.charCodeAt(i), 48 > c || c > 57) {
              valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
              value = value.slice(0, i);
              break;
            }
          }
        }
      } // If the fill character is not "0", grouping is applied before padding.


      if (comma && !zero) value = group(value, Infinity); // Compute the padding.

      var length = valuePrefix.length + value.length + valueSuffix.length,
          padding = length < width ? new Array(width - length + 1).join(fill) : ""; // If the fill character is "0", grouping is applied after padding.

      if (comma && zero) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = ""; // Reconstruct the final output based on the desired alignment.

      switch (align) {
        case "<":
          value = valuePrefix + value + valueSuffix + padding;
          break;

        case "=":
          value = valuePrefix + padding + value + valueSuffix;
          break;

        case "^":
          value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length);
          break;

        default:
          value = padding + valuePrefix + value + valueSuffix;
          break;
      }

      return numerals(value);
    }

    format.toString = function () {
      return specifier + "";
    };

    return format;
  }

  function formatPrefix(specifier, value) {
    var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)),
        e = Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3,
        k = Math.pow(10, -e),
        prefix = prefixes[8 + e / 3];
    return function (value) {
      return f(k * value) + prefix;
    };
  }

  return {
    format: newFormat,
    formatPrefix: formatPrefix
  };
}

var locale;
var format;
var formatPrefix;
defaultLocale({
  decimal: ".",
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});

function defaultLocale(definition) {
  locale = formatLocale(definition);
  format = locale.format;
  formatPrefix = locale.formatPrefix;
  return locale;
}

function precisionFixed(step) {
  return Math.max(0, -exponent(Math.abs(step)));
}

function precisionPrefix(step, value) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3 - exponent(Math.abs(step)));
}

function precisionRound(step, max) {
  step = Math.abs(step), max = Math.abs(max) - step;
  return Math.max(0, exponent(max) - exponent(step)) + 1;
}

function tickFormat(start, stop, count, specifier) {
  var step = tickStep(start, stop, count),
      precision;
  specifier = formatSpecifier(specifier == null ? ",f" : specifier);

  switch (specifier.type) {
    case "s":
      {
        var value = Math.max(Math.abs(start), Math.abs(stop));
        if (specifier.precision == null && !isNaN(precision = precisionPrefix(step, value))) specifier.precision = precision;
        return formatPrefix(specifier, value);
      }

    case "":
    case "e":
    case "g":
    case "p":
    case "r":
      {
        if (specifier.precision == null && !isNaN(precision = precisionRound(step, Math.max(Math.abs(start), Math.abs(stop))))) specifier.precision = precision - (specifier.type === "e");
        break;
      }

    case "f":
    case "%":
      {
        if (specifier.precision == null && !isNaN(precision = precisionFixed(step))) specifier.precision = precision - (specifier.type === "%") * 2;
        break;
      }
  }

  return format(specifier);
}

function linearish(scale) {
  var domain = scale.domain;

  scale.ticks = function (count) {
    var d = domain();
    return ticks(d[0], d[d.length - 1], count == null ? 10 : count);
  };

  scale.tickFormat = function (count, specifier) {
    var d = domain();
    return tickFormat(d[0], d[d.length - 1], count == null ? 10 : count, specifier);
  };

  scale.nice = function (count) {
    if (count == null) count = 10;
    var d = domain(),
        i0 = 0,
        i1 = d.length - 1,
        start = d[i0],
        stop = d[i1],
        step;

    if (stop < start) {
      step = start, start = stop, stop = step;
      step = i0, i0 = i1, i1 = step;
    }

    step = tickIncrement(start, stop, count);

    if (step > 0) {
      start = Math.floor(start / step) * step;
      stop = Math.ceil(stop / step) * step;
      step = tickIncrement(start, stop, count);
    } else if (step < 0) {
      start = Math.ceil(start * step) / step;
      stop = Math.floor(stop * step) / step;
      step = tickIncrement(start, stop, count);
    }

    if (step > 0) {
      d[i0] = Math.floor(start / step) * step;
      d[i1] = Math.ceil(stop / step) * step;
      domain(d);
    } else if (step < 0) {
      d[i0] = Math.ceil(start * step) / step;
      d[i1] = Math.floor(stop * step) / step;
      domain(d);
    }

    return scale;
  };

  return scale;
}

function linear$1() {
  var scale = continuous(identity$2, identity$2);

  scale.copy = function () {
    return copy(scale, linear$1());
  };

  initRange.apply(scale, arguments);
  return linearish(scale);
}

function nice(domain, interval) {
  domain = domain.slice();
  var i0 = 0,
      i1 = domain.length - 1,
      x0 = domain[i0],
      x1 = domain[i1],
      t;

  if (x1 < x0) {
    t = i0, i0 = i1, i1 = t;
    t = x0, x0 = x1, x1 = t;
  }

  domain[i0] = interval.floor(x0);
  domain[i1] = interval.ceil(x1);
  return domain;
}

function transformLog(x) {
  return Math.log(x);
}

function transformExp(x) {
  return Math.exp(x);
}

function transformLogn(x) {
  return -Math.log(-x);
}

function transformExpn(x) {
  return -Math.exp(-x);
}

function pow10(x) {
  return isFinite(x) ? +("1e" + x) : x < 0 ? 0 : x;
}

function powp(base) {
  return base === 10 ? pow10 : base === Math.E ? Math.exp : function (x) {
    return Math.pow(base, x);
  };
}

function logp(base) {
  return base === Math.E ? Math.log : base === 10 && Math.log10 || base === 2 && Math.log2 || (base = Math.log(base), function (x) {
    return Math.log(x) / base;
  });
}

function reflect(f) {
  return function (x) {
    return -f(-x);
  };
}

function loggish(transform) {
  var scale = transform(transformLog, transformExp),
      domain = scale.domain,
      base = 10,
      logs,
      pows;

  function rescale() {
    logs = logp(base), pows = powp(base);

    if (domain()[0] < 0) {
      logs = reflect(logs), pows = reflect(pows);
      transform(transformLogn, transformExpn);
    } else {
      transform(transformLog, transformExp);
    }

    return scale;
  }

  scale.base = function (_) {
    return arguments.length ? (base = +_, rescale()) : base;
  };

  scale.domain = function (_) {
    return arguments.length ? (domain(_), rescale()) : domain();
  };

  scale.ticks = function (count) {
    var d = domain(),
        u = d[0],
        v = d[d.length - 1],
        r;
    if (r = v < u) i = u, u = v, v = i;
    var i = logs(u),
        j = logs(v),
        p,
        k,
        t,
        n = count == null ? 10 : +count,
        z = [];

    if (!(base % 1) && j - i < n) {
      i = Math.round(i) - 1, j = Math.round(j) + 1;
      if (u > 0) for (; i < j; ++i) {
        for (k = 1, p = pows(i); k < base; ++k) {
          t = p * k;
          if (t < u) continue;
          if (t > v) break;
          z.push(t);
        }
      } else for (; i < j; ++i) {
        for (k = base - 1, p = pows(i); k >= 1; --k) {
          t = p * k;
          if (t < u) continue;
          if (t > v) break;
          z.push(t);
        }
      }
    } else {
      z = ticks(i, j, Math.min(j - i, n)).map(pows);
    }

    return r ? z.reverse() : z;
  };

  scale.tickFormat = function (count, specifier) {
    if (specifier == null) specifier = base === 10 ? ".0e" : ",";
    if (typeof specifier !== "function") specifier = format(specifier);
    if (count === Infinity) return specifier;
    if (count == null) count = 10;
    var k = Math.max(1, base * count / scale.ticks().length); // TODO fast estimate?

    return function (d) {
      var i = d / pows(Math.round(logs(d)));
      if (i * base < base - 0.5) i *= base;
      return i <= k ? specifier(d) : "";
    };
  };

  scale.nice = function () {
    return domain(nice(domain(), {
      floor: function floor(x) {
        return pows(Math.floor(logs(x)));
      },
      ceil: function ceil(x) {
        return pows(Math.ceil(logs(x)));
      }
    }));
  };

  return scale;
}

function log() {
  var scale = loggish(transformer()).domain([1, 10]);

  scale.copy = function () {
    return copy(scale, log()).base(scale.base());
  };

  initRange.apply(scale, arguments);
  return scale;
}

var t0$1 = new Date(),
    t1$1 = new Date();

function newInterval(floori, offseti, count, field) {
  function interval(date) {
    return floori(date = new Date(+date)), date;
  }

  interval.floor = interval;

  interval.ceil = function (date) {
    return floori(date = new Date(date - 1)), offseti(date, 1), floori(date), date;
  };

  interval.round = function (date) {
    var d0 = interval(date),
        d1 = interval.ceil(date);
    return date - d0 < d1 - date ? d0 : d1;
  };

  interval.offset = function (date, step) {
    return offseti(date = new Date(+date), step == null ? 1 : Math.floor(step)), date;
  };

  interval.range = function (start, stop, step) {
    var range = [],
        previous;
    start = interval.ceil(start);
    step = step == null ? 1 : Math.floor(step);
    if (!(start < stop) || !(step > 0)) return range; // also handles Invalid Date

    do {
      range.push(previous = new Date(+start)), offseti(start, step), floori(start);
    } while (previous < start && start < stop);

    return range;
  };

  interval.filter = function (test) {
    return newInterval(function (date) {
      if (date >= date) while (floori(date), !test(date)) {
        date.setTime(date - 1);
      }
    }, function (date, step) {
      if (date >= date) {
        if (step < 0) while (++step <= 0) {
          while (offseti(date, -1), !test(date)) {} // eslint-disable-line no-empty

        } else while (--step >= 0) {
          while (offseti(date, +1), !test(date)) {} // eslint-disable-line no-empty

        }
      }
    });
  };

  if (count) {
    interval.count = function (start, end) {
      t0$1.setTime(+start), t1$1.setTime(+end);
      floori(t0$1), floori(t1$1);
      return Math.floor(count(t0$1, t1$1));
    };

    interval.every = function (step) {
      step = Math.floor(step);
      return !isFinite(step) || !(step > 0) ? null : !(step > 1) ? interval : interval.filter(field ? function (d) {
        return field(d) % step === 0;
      } : function (d) {
        return interval.count(0, d) % step === 0;
      });
    };
  }

  return interval;
}

var millisecond = newInterval(function () {// noop
}, function (date, step) {
  date.setTime(+date + step);
}, function (start, end) {
  return end - start;
}); // An optimized implementation for this simple case.

millisecond.every = function (k) {
  k = Math.floor(k);
  if (!isFinite(k) || !(k > 0)) return null;
  if (!(k > 1)) return millisecond;
  return newInterval(function (date) {
    date.setTime(Math.floor(date / k) * k);
  }, function (date, step) {
    date.setTime(+date + step * k);
  }, function (start, end) {
    return (end - start) / k;
  });
};

var durationSecond = 1e3;
var durationMinute = 6e4;
var durationHour = 36e5;
var durationDay = 864e5;
var durationWeek = 6048e5;
var second = newInterval(function (date) {
  date.setTime(Math.floor(date / durationSecond) * durationSecond);
}, function (date, step) {
  date.setTime(+date + step * durationSecond);
}, function (start, end) {
  return (end - start) / durationSecond;
}, function (date) {
  return date.getUTCSeconds();
});
var minute = newInterval(function (date) {
  date.setTime(Math.floor(date / durationMinute) * durationMinute);
}, function (date, step) {
  date.setTime(+date + step * durationMinute);
}, function (start, end) {
  return (end - start) / durationMinute;
}, function (date) {
  return date.getMinutes();
});
var hour = newInterval(function (date) {
  var offset = date.getTimezoneOffset() * durationMinute % durationHour;
  if (offset < 0) offset += durationHour;
  date.setTime(Math.floor((+date - offset) / durationHour) * durationHour + offset);
}, function (date, step) {
  date.setTime(+date + step * durationHour);
}, function (start, end) {
  return (end - start) / durationHour;
}, function (date) {
  return date.getHours();
});
var day = newInterval(function (date) {
  date.setHours(0, 0, 0, 0);
}, function (date, step) {
  date.setDate(date.getDate() + step);
}, function (start, end) {
  return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationDay;
}, function (date) {
  return date.getDate() - 1;
});

function weekday(i) {
  return newInterval(function (date) {
    date.setDate(date.getDate() - (date.getDay() + 7 - i) % 7);
    date.setHours(0, 0, 0, 0);
  }, function (date, step) {
    date.setDate(date.getDate() + step * 7);
  }, function (start, end) {
    return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationWeek;
  });
}

var sunday = weekday(0);
var monday = weekday(1);
var tuesday = weekday(2);
var wednesday = weekday(3);
var thursday = weekday(4);
var friday = weekday(5);
var saturday = weekday(6);
var month = newInterval(function (date) {
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
}, function (date, step) {
  date.setMonth(date.getMonth() + step);
}, function (start, end) {
  return end.getMonth() - start.getMonth() + (end.getFullYear() - start.getFullYear()) * 12;
}, function (date) {
  return date.getMonth();
});
var year = newInterval(function (date) {
  date.setMonth(0, 1);
  date.setHours(0, 0, 0, 0);
}, function (date, step) {
  date.setFullYear(date.getFullYear() + step);
}, function (start, end) {
  return end.getFullYear() - start.getFullYear();
}, function (date) {
  return date.getFullYear();
}); // An optimized implementation for this simple case.

year.every = function (k) {
  return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : newInterval(function (date) {
    date.setFullYear(Math.floor(date.getFullYear() / k) * k);
    date.setMonth(0, 1);
    date.setHours(0, 0, 0, 0);
  }, function (date, step) {
    date.setFullYear(date.getFullYear() + step * k);
  });
};

var utcMinute = newInterval(function (date) {
  date.setUTCSeconds(0, 0);
}, function (date, step) {
  date.setTime(+date + step * durationMinute);
}, function (start, end) {
  return (end - start) / durationMinute;
}, function (date) {
  return date.getUTCMinutes();
});
var utcHour = newInterval(function (date) {
  date.setUTCMinutes(0, 0, 0);
}, function (date, step) {
  date.setTime(+date + step * durationHour);
}, function (start, end) {
  return (end - start) / durationHour;
}, function (date) {
  return date.getUTCHours();
});
var utcDay = newInterval(function (date) {
  date.setUTCHours(0, 0, 0, 0);
}, function (date, step) {
  date.setUTCDate(date.getUTCDate() + step);
}, function (start, end) {
  return (end - start) / durationDay;
}, function (date) {
  return date.getUTCDate() - 1;
});

function utcWeekday(i) {
  return newInterval(function (date) {
    date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 7 - i) % 7);
    date.setUTCHours(0, 0, 0, 0);
  }, function (date, step) {
    date.setUTCDate(date.getUTCDate() + step * 7);
  }, function (start, end) {
    return (end - start) / durationWeek;
  });
}

var utcSunday = utcWeekday(0);
var utcMonday = utcWeekday(1);
var utcTuesday = utcWeekday(2);
var utcWednesday = utcWeekday(3);
var utcThursday = utcWeekday(4);
var utcFriday = utcWeekday(5);
var utcSaturday = utcWeekday(6);
var utcMonth = newInterval(function (date) {
  date.setUTCDate(1);
  date.setUTCHours(0, 0, 0, 0);
}, function (date, step) {
  date.setUTCMonth(date.getUTCMonth() + step);
}, function (start, end) {
  return end.getUTCMonth() - start.getUTCMonth() + (end.getUTCFullYear() - start.getUTCFullYear()) * 12;
}, function (date) {
  return date.getUTCMonth();
});
var utcYear = newInterval(function (date) {
  date.setUTCMonth(0, 1);
  date.setUTCHours(0, 0, 0, 0);
}, function (date, step) {
  date.setUTCFullYear(date.getUTCFullYear() + step);
}, function (start, end) {
  return end.getUTCFullYear() - start.getUTCFullYear();
}, function (date) {
  return date.getUTCFullYear();
}); // An optimized implementation for this simple case.

utcYear.every = function (k) {
  return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : newInterval(function (date) {
    date.setUTCFullYear(Math.floor(date.getUTCFullYear() / k) * k);
    date.setUTCMonth(0, 1);
    date.setUTCHours(0, 0, 0, 0);
  }, function (date, step) {
    date.setUTCFullYear(date.getUTCFullYear() + step * k);
  });
};

function localDate(d) {
  if (0 <= d.y && d.y < 100) {
    var date = new Date(-1, d.m, d.d, d.H, d.M, d.S, d.L);
    date.setFullYear(d.y);
    return date;
  }

  return new Date(d.y, d.m, d.d, d.H, d.M, d.S, d.L);
}

function utcDate(d) {
  if (0 <= d.y && d.y < 100) {
    var date = new Date(Date.UTC(-1, d.m, d.d, d.H, d.M, d.S, d.L));
    date.setUTCFullYear(d.y);
    return date;
  }

  return new Date(Date.UTC(d.y, d.m, d.d, d.H, d.M, d.S, d.L));
}

function newYear(y) {
  return {
    y: y,
    m: 0,
    d: 1,
    H: 0,
    M: 0,
    S: 0,
    L: 0
  };
}

function formatLocale$1(locale) {
  var locale_dateTime = locale.dateTime,
      locale_date = locale.date,
      locale_time = locale.time,
      locale_periods = locale.periods,
      locale_weekdays = locale.days,
      locale_shortWeekdays = locale.shortDays,
      locale_months = locale.months,
      locale_shortMonths = locale.shortMonths;
  var periodRe = formatRe(locale_periods),
      periodLookup = formatLookup(locale_periods),
      weekdayRe = formatRe(locale_weekdays),
      weekdayLookup = formatLookup(locale_weekdays),
      shortWeekdayRe = formatRe(locale_shortWeekdays),
      shortWeekdayLookup = formatLookup(locale_shortWeekdays),
      monthRe = formatRe(locale_months),
      monthLookup = formatLookup(locale_months),
      shortMonthRe = formatRe(locale_shortMonths),
      shortMonthLookup = formatLookup(locale_shortMonths);
  var formats = {
    "a": formatShortWeekday,
    "A": formatWeekday,
    "b": formatShortMonth,
    "B": formatMonth,
    "c": null,
    "d": formatDayOfMonth,
    "e": formatDayOfMonth,
    "f": formatMicroseconds,
    "H": formatHour24,
    "I": formatHour12,
    "j": formatDayOfYear,
    "L": formatMilliseconds,
    "m": formatMonthNumber,
    "M": formatMinutes,
    "p": formatPeriod,
    "Q": formatUnixTimestamp,
    "s": formatUnixTimestampSeconds,
    "S": formatSeconds,
    "u": formatWeekdayNumberMonday,
    "U": formatWeekNumberSunday,
    "V": formatWeekNumberISO,
    "w": formatWeekdayNumberSunday,
    "W": formatWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatYear,
    "Y": formatFullYear,
    "Z": formatZone,
    "%": formatLiteralPercent
  };
  var utcFormats = {
    "a": formatUTCShortWeekday,
    "A": formatUTCWeekday,
    "b": formatUTCShortMonth,
    "B": formatUTCMonth,
    "c": null,
    "d": formatUTCDayOfMonth,
    "e": formatUTCDayOfMonth,
    "f": formatUTCMicroseconds,
    "H": formatUTCHour24,
    "I": formatUTCHour12,
    "j": formatUTCDayOfYear,
    "L": formatUTCMilliseconds,
    "m": formatUTCMonthNumber,
    "M": formatUTCMinutes,
    "p": formatUTCPeriod,
    "Q": formatUnixTimestamp,
    "s": formatUnixTimestampSeconds,
    "S": formatUTCSeconds,
    "u": formatUTCWeekdayNumberMonday,
    "U": formatUTCWeekNumberSunday,
    "V": formatUTCWeekNumberISO,
    "w": formatUTCWeekdayNumberSunday,
    "W": formatUTCWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatUTCYear,
    "Y": formatUTCFullYear,
    "Z": formatUTCZone,
    "%": formatLiteralPercent
  };
  var parses = {
    "a": parseShortWeekday,
    "A": parseWeekday,
    "b": parseShortMonth,
    "B": parseMonth,
    "c": parseLocaleDateTime,
    "d": parseDayOfMonth,
    "e": parseDayOfMonth,
    "f": parseMicroseconds,
    "H": parseHour24,
    "I": parseHour24,
    "j": parseDayOfYear,
    "L": parseMilliseconds,
    "m": parseMonthNumber,
    "M": parseMinutes,
    "p": parsePeriod,
    "Q": parseUnixTimestamp,
    "s": parseUnixTimestampSeconds,
    "S": parseSeconds,
    "u": parseWeekdayNumberMonday,
    "U": parseWeekNumberSunday,
    "V": parseWeekNumberISO,
    "w": parseWeekdayNumberSunday,
    "W": parseWeekNumberMonday,
    "x": parseLocaleDate,
    "X": parseLocaleTime,
    "y": parseYear,
    "Y": parseFullYear,
    "Z": parseZone,
    "%": parseLiteralPercent
  }; // These recursive directive definitions must be deferred.

  formats.x = newFormat(locale_date, formats);
  formats.X = newFormat(locale_time, formats);
  formats.c = newFormat(locale_dateTime, formats);
  utcFormats.x = newFormat(locale_date, utcFormats);
  utcFormats.X = newFormat(locale_time, utcFormats);
  utcFormats.c = newFormat(locale_dateTime, utcFormats);

  function newFormat(specifier, formats) {
    return function (date) {
      var string = [],
          i = -1,
          j = 0,
          n = specifier.length,
          c,
          pad,
          format;
      if (!(date instanceof Date)) date = new Date(+date);

      while (++i < n) {
        if (specifier.charCodeAt(i) === 37) {
          string.push(specifier.slice(j, i));
          if ((pad = pads[c = specifier.charAt(++i)]) != null) c = specifier.charAt(++i);else pad = c === "e" ? " " : "0";
          if (format = formats[c]) c = format(date, pad);
          string.push(c);
          j = i + 1;
        }
      }

      string.push(specifier.slice(j, i));
      return string.join("");
    };
  }

  function newParse(specifier, newDate) {
    return function (string) {
      var d = newYear(1900),
          i = parseSpecifier(d, specifier, string += "", 0),
          week,
          day$1;
      if (i != string.length) return null; // If a UNIX timestamp is specified, return it.

      if ("Q" in d) return new Date(d.Q); // The am-pm flag is 0 for AM, and 1 for PM.

      if ("p" in d) d.H = d.H % 12 + d.p * 12; // Convert day-of-week and week-of-year to day-of-year.

      if ("V" in d) {
        if (d.V < 1 || d.V > 53) return null;
        if (!("w" in d)) d.w = 1;

        if ("Z" in d) {
          week = utcDate(newYear(d.y)), day$1 = week.getUTCDay();
          week = day$1 > 4 || day$1 === 0 ? utcMonday.ceil(week) : utcMonday(week);
          week = utcDay.offset(week, (d.V - 1) * 7);
          d.y = week.getUTCFullYear();
          d.m = week.getUTCMonth();
          d.d = week.getUTCDate() + (d.w + 6) % 7;
        } else {
          week = newDate(newYear(d.y)), day$1 = week.getDay();
          week = day$1 > 4 || day$1 === 0 ? monday.ceil(week) : monday(week);
          week = day.offset(week, (d.V - 1) * 7);
          d.y = week.getFullYear();
          d.m = week.getMonth();
          d.d = week.getDate() + (d.w + 6) % 7;
        }
      } else if ("W" in d || "U" in d) {
        if (!("w" in d)) d.w = "u" in d ? d.u % 7 : "W" in d ? 1 : 0;
        day$1 = "Z" in d ? utcDate(newYear(d.y)).getUTCDay() : newDate(newYear(d.y)).getDay();
        d.m = 0;
        d.d = "W" in d ? (d.w + 6) % 7 + d.W * 7 - (day$1 + 5) % 7 : d.w + d.U * 7 - (day$1 + 6) % 7;
      } // If a time zone is specified, all fields are interpreted as UTC and then
      // offset according to the specified time zone.


      if ("Z" in d) {
        d.H += d.Z / 100 | 0;
        d.M += d.Z % 100;
        return utcDate(d);
      } // Otherwise, all fields are in local time.


      return newDate(d);
    };
  }

  function parseSpecifier(d, specifier, string, j) {
    var i = 0,
        n = specifier.length,
        m = string.length,
        c,
        parse;

    while (i < n) {
      if (j >= m) return -1;
      c = specifier.charCodeAt(i++);

      if (c === 37) {
        c = specifier.charAt(i++);
        parse = parses[c in pads ? specifier.charAt(i++) : c];
        if (!parse || (j = parse(d, string, j)) < 0) return -1;
      } else if (c != string.charCodeAt(j++)) {
        return -1;
      }
    }

    return j;
  }

  function parsePeriod(d, string, i) {
    var n = periodRe.exec(string.slice(i));
    return n ? (d.p = periodLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }

  function parseShortWeekday(d, string, i) {
    var n = shortWeekdayRe.exec(string.slice(i));
    return n ? (d.w = shortWeekdayLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }

  function parseWeekday(d, string, i) {
    var n = weekdayRe.exec(string.slice(i));
    return n ? (d.w = weekdayLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }

  function parseShortMonth(d, string, i) {
    var n = shortMonthRe.exec(string.slice(i));
    return n ? (d.m = shortMonthLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }

  function parseMonth(d, string, i) {
    var n = monthRe.exec(string.slice(i));
    return n ? (d.m = monthLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }

  function parseLocaleDateTime(d, string, i) {
    return parseSpecifier(d, locale_dateTime, string, i);
  }

  function parseLocaleDate(d, string, i) {
    return parseSpecifier(d, locale_date, string, i);
  }

  function parseLocaleTime(d, string, i) {
    return parseSpecifier(d, locale_time, string, i);
  }

  function formatShortWeekday(d) {
    return locale_shortWeekdays[d.getDay()];
  }

  function formatWeekday(d) {
    return locale_weekdays[d.getDay()];
  }

  function formatShortMonth(d) {
    return locale_shortMonths[d.getMonth()];
  }

  function formatMonth(d) {
    return locale_months[d.getMonth()];
  }

  function formatPeriod(d) {
    return locale_periods[+(d.getHours() >= 12)];
  }

  function formatUTCShortWeekday(d) {
    return locale_shortWeekdays[d.getUTCDay()];
  }

  function formatUTCWeekday(d) {
    return locale_weekdays[d.getUTCDay()];
  }

  function formatUTCShortMonth(d) {
    return locale_shortMonths[d.getUTCMonth()];
  }

  function formatUTCMonth(d) {
    return locale_months[d.getUTCMonth()];
  }

  function formatUTCPeriod(d) {
    return locale_periods[+(d.getUTCHours() >= 12)];
  }

  return {
    format: function format(specifier) {
      var f = newFormat(specifier += "", formats);

      f.toString = function () {
        return specifier;
      };

      return f;
    },
    parse: function parse(specifier) {
      var p = newParse(specifier += "", localDate);

      p.toString = function () {
        return specifier;
      };

      return p;
    },
    utcFormat: function utcFormat(specifier) {
      var f = newFormat(specifier += "", utcFormats);

      f.toString = function () {
        return specifier;
      };

      return f;
    },
    utcParse: function utcParse(specifier) {
      var p = newParse(specifier, utcDate);

      p.toString = function () {
        return specifier;
      };

      return p;
    }
  };
}

var pads = {
  "-": "",
  "_": " ",
  "0": "0"
},
    numberRe = /^\s*\d+/,
    // note: ignores next directive
percentRe = /^%/,
    requoteRe = /[\\^$*+?|[\]().{}]/g;

function pad(value, fill, width) {
  var sign = value < 0 ? "-" : "",
      string = (sign ? -value : value) + "",
      length = string.length;
  return sign + (length < width ? new Array(width - length + 1).join(fill) + string : string);
}

function requote(s) {
  return s.replace(requoteRe, "\\$&");
}

function formatRe(names) {
  return new RegExp("^(?:" + names.map(requote).join("|") + ")", "i");
}

function formatLookup(names) {
  var map = {},
      i = -1,
      n = names.length;

  while (++i < n) {
    map[names[i].toLowerCase()] = i;
  }

  return map;
}

function parseWeekdayNumberSunday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.w = +n[0], i + n[0].length) : -1;
}

function parseWeekdayNumberMonday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.u = +n[0], i + n[0].length) : -1;
}

function parseWeekNumberSunday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.U = +n[0], i + n[0].length) : -1;
}

function parseWeekNumberISO(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.V = +n[0], i + n[0].length) : -1;
}

function parseWeekNumberMonday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.W = +n[0], i + n[0].length) : -1;
}

function parseFullYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 4));
  return n ? (d.y = +n[0], i + n[0].length) : -1;
}

function parseYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.y = +n[0] + (+n[0] > 68 ? 1900 : 2000), i + n[0].length) : -1;
}

function parseZone(d, string, i) {
  var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(string.slice(i, i + 6));
  return n ? (d.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), i + n[0].length) : -1;
}

function parseMonthNumber(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.m = n[0] - 1, i + n[0].length) : -1;
}

function parseDayOfMonth(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.d = +n[0], i + n[0].length) : -1;
}

function parseDayOfYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 3));
  return n ? (d.m = 0, d.d = +n[0], i + n[0].length) : -1;
}

function parseHour24(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.H = +n[0], i + n[0].length) : -1;
}

function parseMinutes(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.M = +n[0], i + n[0].length) : -1;
}

function parseSeconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.S = +n[0], i + n[0].length) : -1;
}

function parseMilliseconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 3));
  return n ? (d.L = +n[0], i + n[0].length) : -1;
}

function parseMicroseconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 6));
  return n ? (d.L = Math.floor(n[0] / 1000), i + n[0].length) : -1;
}

function parseLiteralPercent(d, string, i) {
  var n = percentRe.exec(string.slice(i, i + 1));
  return n ? i + n[0].length : -1;
}

function parseUnixTimestamp(d, string, i) {
  var n = numberRe.exec(string.slice(i));
  return n ? (d.Q = +n[0], i + n[0].length) : -1;
}

function parseUnixTimestampSeconds(d, string, i) {
  var n = numberRe.exec(string.slice(i));
  return n ? (d.Q = +n[0] * 1000, i + n[0].length) : -1;
}

function formatDayOfMonth(d, p) {
  return pad(d.getDate(), p, 2);
}

function formatHour24(d, p) {
  return pad(d.getHours(), p, 2);
}

function formatHour12(d, p) {
  return pad(d.getHours() % 12 || 12, p, 2);
}

function formatDayOfYear(d, p) {
  return pad(1 + day.count(year(d), d), p, 3);
}

function formatMilliseconds(d, p) {
  return pad(d.getMilliseconds(), p, 3);
}

function formatMicroseconds(d, p) {
  return formatMilliseconds(d, p) + "000";
}

function formatMonthNumber(d, p) {
  return pad(d.getMonth() + 1, p, 2);
}

function formatMinutes(d, p) {
  return pad(d.getMinutes(), p, 2);
}

function formatSeconds(d, p) {
  return pad(d.getSeconds(), p, 2);
}

function formatWeekdayNumberMonday(d) {
  var day = d.getDay();
  return day === 0 ? 7 : day;
}

function formatWeekNumberSunday(d, p) {
  return pad(sunday.count(year(d), d), p, 2);
}

function formatWeekNumberISO(d, p) {
  var day = d.getDay();
  d = day >= 4 || day === 0 ? thursday(d) : thursday.ceil(d);
  return pad(thursday.count(year(d), d) + (year(d).getDay() === 4), p, 2);
}

function formatWeekdayNumberSunday(d) {
  return d.getDay();
}

function formatWeekNumberMonday(d, p) {
  return pad(monday.count(year(d), d), p, 2);
}

function formatYear(d, p) {
  return pad(d.getFullYear() % 100, p, 2);
}

function formatFullYear(d, p) {
  return pad(d.getFullYear() % 10000, p, 4);
}

function formatZone(d) {
  var z = d.getTimezoneOffset();
  return (z > 0 ? "-" : (z *= -1, "+")) + pad(z / 60 | 0, "0", 2) + pad(z % 60, "0", 2);
}

function formatUTCDayOfMonth(d, p) {
  return pad(d.getUTCDate(), p, 2);
}

function formatUTCHour24(d, p) {
  return pad(d.getUTCHours(), p, 2);
}

function formatUTCHour12(d, p) {
  return pad(d.getUTCHours() % 12 || 12, p, 2);
}

function formatUTCDayOfYear(d, p) {
  return pad(1 + utcDay.count(utcYear(d), d), p, 3);
}

function formatUTCMilliseconds(d, p) {
  return pad(d.getUTCMilliseconds(), p, 3);
}

function formatUTCMicroseconds(d, p) {
  return formatUTCMilliseconds(d, p) + "000";
}

function formatUTCMonthNumber(d, p) {
  return pad(d.getUTCMonth() + 1, p, 2);
}

function formatUTCMinutes(d, p) {
  return pad(d.getUTCMinutes(), p, 2);
}

function formatUTCSeconds(d, p) {
  return pad(d.getUTCSeconds(), p, 2);
}

function formatUTCWeekdayNumberMonday(d) {
  var dow = d.getUTCDay();
  return dow === 0 ? 7 : dow;
}

function formatUTCWeekNumberSunday(d, p) {
  return pad(utcSunday.count(utcYear(d), d), p, 2);
}

function formatUTCWeekNumberISO(d, p) {
  var day = d.getUTCDay();
  d = day >= 4 || day === 0 ? utcThursday(d) : utcThursday.ceil(d);
  return pad(utcThursday.count(utcYear(d), d) + (utcYear(d).getUTCDay() === 4), p, 2);
}

function formatUTCWeekdayNumberSunday(d) {
  return d.getUTCDay();
}

function formatUTCWeekNumberMonday(d, p) {
  return pad(utcMonday.count(utcYear(d), d), p, 2);
}

function formatUTCYear(d, p) {
  return pad(d.getUTCFullYear() % 100, p, 2);
}

function formatUTCFullYear(d, p) {
  return pad(d.getUTCFullYear() % 10000, p, 4);
}

function formatUTCZone() {
  return "+0000";
}

function formatLiteralPercent() {
  return "%";
}

function formatUnixTimestamp(d) {
  return +d;
}

function formatUnixTimestampSeconds(d) {
  return Math.floor(+d / 1000);
}

var locale$1;
var timeFormat;
var timeParse;
var utcFormat;
var utcParse;
defaultLocale$1({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});

function defaultLocale$1(definition) {
  locale$1 = formatLocale$1(definition);
  timeFormat = locale$1.format;
  timeParse = locale$1.parse;
  utcFormat = locale$1.utcFormat;
  utcParse = locale$1.utcParse;
  return locale$1;
}

var isoSpecifier = "%Y-%m-%dT%H:%M:%S.%LZ";

function formatIsoNative(date) {
  return date.toISOString();
}

var formatIso = Date.prototype.toISOString ? formatIsoNative : utcFormat(isoSpecifier);

function parseIsoNative(string) {
  var date = new Date(string);
  return isNaN(date) ? null : date;
}

var parseIso = +new Date("2000-01-01T00:00:00.000Z") ? parseIsoNative : utcParse(isoSpecifier);
var durationSecond$1 = 1000,
    durationMinute$1 = durationSecond$1 * 60,
    durationHour$1 = durationMinute$1 * 60,
    durationDay$1 = durationHour$1 * 24,
    durationWeek$1 = durationDay$1 * 7,
    durationMonth = durationDay$1 * 30,
    durationYear = durationDay$1 * 365;

function date$1(t) {
  return new Date(t);
}

function number$1(t) {
  return t instanceof Date ? +t : +new Date(+t);
}

function calendar(year, month, week, day, hour, minute, second, millisecond, format) {
  var scale = continuous(identity$2, identity$2),
      invert = scale.invert,
      domain = scale.domain;
  var formatMillisecond = format(".%L"),
      formatSecond = format(":%S"),
      formatMinute = format("%I:%M"),
      formatHour = format("%I %p"),
      formatDay = format("%a %d"),
      formatWeek = format("%b %d"),
      formatMonth = format("%B"),
      formatYear = format("%Y");
  var tickIntervals = [[second, 1, durationSecond$1], [second, 5, 5 * durationSecond$1], [second, 15, 15 * durationSecond$1], [second, 30, 30 * durationSecond$1], [minute, 1, durationMinute$1], [minute, 5, 5 * durationMinute$1], [minute, 15, 15 * durationMinute$1], [minute, 30, 30 * durationMinute$1], [hour, 1, durationHour$1], [hour, 3, 3 * durationHour$1], [hour, 6, 6 * durationHour$1], [hour, 12, 12 * durationHour$1], [day, 1, durationDay$1], [day, 2, 2 * durationDay$1], [week, 1, durationWeek$1], [month, 1, durationMonth], [month, 3, 3 * durationMonth], [year, 1, durationYear]];

  function tickFormat(date) {
    return (second(date) < date ? formatMillisecond : minute(date) < date ? formatSecond : hour(date) < date ? formatMinute : day(date) < date ? formatHour : month(date) < date ? week(date) < date ? formatDay : formatWeek : year(date) < date ? formatMonth : formatYear)(date);
  }

  function tickInterval(interval, start, stop, step) {
    if (interval == null) interval = 10; // If a desired tick count is specified, pick a reasonable tick interval
    // based on the extent of the domain and a rough estimate of tick size.
    // Otherwise, assume interval is already a time interval and use it.

    if (typeof interval === "number") {
      var target = Math.abs(stop - start) / interval,
          i = bisector(function (i) {
        return i[2];
      }).right(tickIntervals, target);

      if (i === tickIntervals.length) {
        step = tickStep(start / durationYear, stop / durationYear, interval);
        interval = year;
      } else if (i) {
        i = tickIntervals[target / tickIntervals[i - 1][2] < tickIntervals[i][2] / target ? i - 1 : i];
        step = i[1];
        interval = i[0];
      } else {
        step = Math.max(tickStep(start, stop, interval), 1);
        interval = millisecond;
      }
    }

    return step == null ? interval : interval.every(step);
  }

  scale.invert = function (y) {
    return new Date(invert(y));
  };

  scale.domain = function (_) {
    return arguments.length ? domain(Array.from(_, number$1)) : domain().map(date$1);
  };

  scale.ticks = function (interval, step) {
    var d = domain(),
        t0 = d[0],
        t1 = d[d.length - 1],
        r = t1 < t0,
        t;
    if (r) t = t0, t0 = t1, t1 = t;
    t = tickInterval(interval, t0, t1, step);
    t = t ? t.range(t0, t1 + 1) : []; // inclusive stop

    return r ? t.reverse() : t;
  };

  scale.tickFormat = function (count, specifier) {
    return specifier == null ? tickFormat : format(specifier);
  };

  scale.nice = function (interval, step) {
    var d = domain();
    return (interval = tickInterval(interval, d[0], d[d.length - 1], step)) ? domain(nice(d, interval)) : scale;
  };

  scale.copy = function () {
    return copy(scale, calendar(year, month, week, day, hour, minute, second, millisecond, format));
  };

  return scale;
}

function scaleTime() {
  return initRange.apply(calendar(year, month, sunday, day, hour, minute, second, millisecond, timeFormat).domain([new Date(2000, 0, 1), new Date(2000, 0, 2)]), arguments);
}

function scaleUtc() {
  return initRange.apply(calendar(utcYear, utcMonth, utcSunday, utcDay, utcHour, utcMinute, second, millisecond, utcFormat).domain([Date.UTC(2000, 0, 1), Date.UTC(2000, 0, 2)]), arguments);
}

var _scales;

var scales = (_scales = {}, _defineProperty(_scales, axisTypeLinear, linear$1), _defineProperty(_scales, axisTypeLog, log), _defineProperty(_scales, axisTypeTime, scaleTime), _defineProperty(_scales, axisTypeUtc, scaleUtc), _defineProperty(_scales, axisTypeOrdinal, band), _scales);

var detectVertical = function detectVertical(d) {
  return [positionLeft, positionRight].indexOf(d) > -1;
};

var detectRTL = function detectRTL(d) {
  return [positionTop, positionRight].indexOf(d) > -1;
};

function buildAxisLinear(_ref) {
  var _scale, _scale2;

  var _ref$axis = _ref.axis,
      primary = _ref$axis.primary,
      type = _ref$axis.type,
      invert = _ref$axis.invert,
      position = _ref$axis.position,
      primaryAxisID = _ref$axis.primaryAxisID,
      _ref$axis$min = _ref$axis.min,
      userMin = _ref$axis$min === void 0 ? undefined : _ref$axis$min,
      _ref$axis$max = _ref$axis.max,
      userMax = _ref$axis$max === void 0 ? undefined : _ref$axis$max,
      _ref$axis$hardMin = _ref$axis.hardMin,
      hardMin = _ref$axis$hardMin === void 0 ? undefined : _ref$axis$hardMin,
      _ref$axis$hardMax = _ref$axis.hardMax,
      hardMax = _ref$axis$hardMax === void 0 ? undefined : _ref$axis$hardMax,
      _ref$axis$base = _ref$axis.base,
      base = _ref$axis$base === void 0 ? undefined : _ref$axis$base,
      _ref$axis$tickArgumen = _ref$axis.tickArguments,
      tickArguments = _ref$axis$tickArgumen === void 0 ? [] : _ref$axis$tickArgumen,
      _ref$axis$tickValues = _ref$axis.tickValues,
      tickValues = _ref$axis$tickValues === void 0 ? null : _ref$axis$tickValues,
      _ref$axis$tickFormat = _ref$axis.tickFormat,
      tickFormat = _ref$axis$tickFormat === void 0 ? null : _ref$axis$tickFormat,
      _ref$axis$tickSizeInn = _ref$axis.tickSizeInner,
      tickSizeInner = _ref$axis$tickSizeInn === void 0 ? 6 : _ref$axis$tickSizeInn,
      _ref$axis$tickSizeOut = _ref$axis.tickSizeOuter,
      tickSizeOuter = _ref$axis$tickSizeOut === void 0 ? 6 : _ref$axis$tickSizeOut,
      _ref$axis$tickPadding = _ref$axis.tickPadding,
      tickPadding = _ref$axis$tickPadding === void 0 ? 3 : _ref$axis$tickPadding,
      _ref$axis$maxLabelRot = _ref$axis.maxLabelRotation,
      maxLabelRotation = _ref$axis$maxLabelRot === void 0 ? 50 : _ref$axis$maxLabelRot,
      _ref$axis$innerPaddin = _ref$axis.innerPadding,
      innerPadding = _ref$axis$innerPaddin === void 0 ? 0.2 : _ref$axis$innerPaddin,
      _ref$axis$outerPaddin = _ref$axis.outerPadding,
      outerPadding = _ref$axis$outerPaddin === void 0 ? 0.1 : _ref$axis$outerPaddin,
      _ref$axis$showGrid = _ref$axis.showGrid,
      showGrid = _ref$axis$showGrid === void 0 ? null : _ref$axis$showGrid,
      _ref$axis$showTicks = _ref$axis.showTicks,
      showTicks = _ref$axis$showTicks === void 0 ? true : _ref$axis$showTicks,
      _ref$axis$show = _ref$axis.show,
      show = _ref$axis$show === void 0 ? true : _ref$axis$show,
      _ref$axis$stacked = _ref$axis.stacked,
      stacked = _ref$axis$stacked === void 0 ? false : _ref$axis$stacked,
      userID = _ref$axis.id,
      primaryAxes = _ref.primaryAxes,
      materializedData = _ref.materializedData,
      gridHeight = _ref.gridHeight,
      gridWidth = _ref.gridWidth;

  if (!position) {
    throw new Error("Chart axes must have a valid 'position' property");
  } // Detect some settings


  var valueKey = primary ? 'primary' : 'secondary';
  var groupKey = !primary && 'primary';
  var AxisIDKey = "".concat(valueKey, "AxisID");
  var vertical = detectVertical(position);
  var RTL = detectRTL(position); // Right to left OR top to bottom

  var id = userID || "".concat(position, "_").concat(type); // TODO: Any sorting needs to happen here, else the min/max's might not line up correctly
  // First we need to find unique values, min/max values and negative/positive totals

  var uniqueVals = [];
  var min;
  var max;
  var negativeTotalByKey = {};
  var positiveTotalByKey = {};
  var domain; // Loop through each series

  for (var seriesIndex = 0; seriesIndex < materializedData.length; seriesIndex++) {
    if (materializedData[seriesIndex][AxisIDKey] && materializedData[seriesIndex][AxisIDKey] !== id) {
      continue;
    } // Loop through each datum


    for (var datumIndex = 0; datumIndex < materializedData[seriesIndex].datums.length; datumIndex++) {
      var datum = materializedData[seriesIndex].datums[datumIndex];
      var value = void 0;
      var key = groupKey ? datum[groupKey] : datumIndex; // For ordinal scales, unique the values

      if (type === axisTypeOrdinal) {
        if (uniqueVals.indexOf() === -1) {
          uniqueVals.push(materializedData[seriesIndex].datums[datumIndex][valueKey]);
        }
      } else if (type === axisTypeTime || type === axisTypeUtc) {
        value = +datum[valueKey];
      } else {
        value = datum[valueKey];
      } // Add to stack total


      if (stacked) {
        if (value > 0) {
          positiveTotalByKey[key] = typeof positiveTotalByKey[key] !== 'undefined' ? positiveTotalByKey[key] + value : value;
        } else {
          negativeTotalByKey[key] = typeof negativeTotalByKey[key] !== 'undefined' ? negativeTotalByKey[key] + value : value;
        }
      } else {
        // Find min/max
        min = typeof min !== 'undefined' ? Math.min(min, value) : value;
        max = typeof max !== 'undefined' ? Math.max(max, value) : value;
      }
    }
  }

  if (type === axisTypeOrdinal) {
    domain = uniqueVals;
  } else if (stacked) {
    domain = [Math.min.apply(Math, [0].concat(_toConsumableArray(Object.values(negativeTotalByKey)))), Math.max.apply(Math, [0].concat(_toConsumableArray(Object.values(positiveTotalByKey))))];
  } else {
    domain = [min, max];
  } // Now we need to figure out the range


  var range = vertical ? [gridHeight, 0] // If the axis is inverted, swap the range, too
  : [0, gridWidth];

  if (!primary) {
    var primaryAxis = primaryAxes.find(function (d) {
      return d.id === primaryAxisID;
    }) || primaryAxes[0]; // Secondary axes are usually dependent on primary axes for orientation, so if the
    // primaryAxis is in RTL mode, we need to reverse the range on this secondary axis
    // to match the origin of the primary axis

    if (primaryAxis.RTL) {
      range = _toConsumableArray(range).reverse();
    }
  } // Give the scale a home


  var scale; // If this is an ordinal or other primary axis, it needs to be able to display bars.

  var bandScale;
  var barSize = 0;
  var cursorSize = 0;
  var stepSize = 0;

  var seriesBandScale = function seriesBandScale(d) {
    return d;
  };

  var seriesBarSize = 1;

  if (type === axisTypeOrdinal || primary) {
    // Calculate a band axis that is similar and pass down the bandwidth
    // just in case.
    bandScale = band().domain(materializedData.reduce(function (prev, current) {
      return current.datums.length > prev.length ? current.datums : prev;
    }, []).map(function (d) {
      return d.primary;
    })).rangeRound(range, 0.1).padding(0);
    bandScale.paddingOuter(outerPadding).paddingInner(innerPadding);
    barSize = bandScale.bandwidth();

    if (type === axisTypeOrdinal) {
      cursorSize = barSize;
    } // barSize = bandScale.bandwidth()


    stepSize = bandScale.step(); // Create a seriesBandScale in case this axis isn't stacked

    seriesBandScale = band().paddingInner(innerPadding / 2).domain(materializedData.filter(function (d) {
      return d.Component === Bar;
    }).map(function (d, i) {
      return i;
    })).rangeRound([0, barSize]);
    seriesBarSize = seriesBandScale.bandwidth();
  }

  if (type === axisTypeOrdinal) {
    // If it's ordinal, just assign the bandScale we made
    scale = bandScale;
  } else {
    // Otherwise, create a new scale of the appropriate type
    scale = scales[type]();
  } // Set base, min, and max


  if (typeof base === 'number') {
    domain[0] = Math.min(domain[0], base);
    domain[1] = Math.max(domain[1], base);
  }

  if (typeof defaultMin === 'number') {
    domain[0] = Math.min(domain[0], userMin);
  }

  if (typeof defaultMax === 'number') {
    domain[1] = Math.max(domain[1], userMax);
  } // Set the domain


  scale.domain(domain); // If we're not using an ordinal scale, round the ticks to "nice" values

  if (type !== axisTypeOrdinal) {
    scale.nice();
  } // If hard min and max are set, override any "nice" rounding values


  if (typeof hardMin === 'number') {
    scale.domain([hardMin, scale.domain()[1]]);
  }

  if (typeof hardMax === 'number') {
    scale.domain([scale.domain()[0], hardMax]);
  } // Invert if necessary


  if (invert) {
    scale.domain(_toConsumableArray(scale.domain()).reverse());
  } // Now set the range


  scale.range(range); // Pass down the axis config (including the scale itself) for posterity

  var axis = {
    id: id,
    primary: primary,
    type: type,
    invert: invert,
    position: position,
    primaryAxisID: primaryAxisID,
    hardMin: hardMin,
    hardMax: hardMax,
    base: base,
    tickArguments: tickArguments,
    tickValues: tickValues,
    tickFormat: tickFormat,
    tickSizeInner: tickSizeInner,
    tickSizeOuter: tickSizeOuter,
    tickPadding: tickPadding,
    maxLabelRotation: maxLabelRotation,
    innerPadding: innerPadding,
    outerPadding: outerPadding,
    showGrid: showGrid,
    showTicks: showTicks,
    show: show,
    stacked: stacked,
    scale: scale,
    uniqueVals: uniqueVals,
    vertical: vertical,
    RTL: RTL,
    barSize: barSize,
    cursorSize: cursorSize,
    stepSize: stepSize,
    seriesBandScale: seriesBandScale,
    seriesBarSize: seriesBarSize,
    domain: domain,
    range: range,
    max: position === positionBottom ? -gridHeight : position === positionLeft ? gridWidth : position === positionTop ? gridHeight : -gridWidth,
    directionMultiplier: position === positionTop || position === positionLeft ? -1 : 1,
    transform: !vertical ? Utils.translateX : Utils.translateY,
    ticks: !tickValues ? scale.ticks ? (_scale = scale).ticks.apply(_scale, _toConsumableArray(tickArguments)) : scale.domain() : tickValues,
    format: !tickFormat ? scale.tickFormat ? (_scale2 = scale).tickFormat.apply(_scale2, _toConsumableArray(tickArguments)) : Utils.identity : tickFormat,
    spacing: Math.max(tickSizeInner, 0) + tickPadding
  };

  if (type === axisTypeOrdinal) {
    axis.gridOffset = -(axis.stepSize * innerPadding) / 2;
    axis.tickOffset = axis.barSize / 2;
    axis.barOffset = 0;
  } else {
    axis.tickOffset = 0;
    axis.barOffset = -axis.barSize / 2;
  }

  return axis;
} // import buildAxisPie from './buildAxis.pie'


function buildAxis(config) {
  // if (config.type === 'pie') {
  // return buildAxisPie(config)
  // }
  return buildAxisLinear(config);
}

var axisShape = PropTypes.shape({
  primary: PropTypes.bool,
  type: PropTypes.oneOf([axisTypeOrdinal, axisTypeTime, axisTypeUtc, axisTypeLinear, axisTypeLog]).isRequired,
  invert: PropTypes.bool,
  position: PropTypes.oneOf([positionTop, positionRight, positionBottom, positionLeft]),
  primaryAxisID: PropTypes.any,
  min: PropTypes.any,
  max: PropTypes.any,
  hardMin: PropTypes.any,
  hardMax: PropTypes.any,
  base: PropTypes.any,
  tickArguments: PropTypes.any,
  tickValues: PropTypes.any,
  tickFormat: PropTypes.func,
  tickSizeInner: PropTypes.number,
  tickSizeOuter: PropTypes.number,
  tickPadding: PropTypes.number,
  maxLabelRotation: PropTypes.number,
  innerPadding: PropTypes.number,
  outerPadding: PropTypes.number,
  showGrid: PropTypes.bool,
  showTicks: PropTypes.bool,
  show: PropTypes.bool,
  stacked: PropTypes.bool,
  id: PropTypes.any
});

var calculateAxes = function calculateAxes(_ref) {
  var axes = _ref.axes,
      materializedData = _ref.materializedData,
      gridHeight = _ref.gridHeight,
      gridWidth = _ref.gridWidth; // Detect axes changes and build axes

  var prePrimaryAxes = axes.filter(function (d) {
    return d.primary;
  });
  var preSecondaryAxes = axes.filter(function (d) {
    return !d.primary;
  });
  var primaryAxesHashes = JSON.stringify(prePrimaryAxes);
  var secondaryAxesHashes = JSON.stringify(preSecondaryAxes); // Calculate primary axes

  var primaryAxes = React.useMemo(function () {
    return prePrimaryAxes.map(function (axis, i) {
      return buildAxis({
        axis: axis,
        materializedData: materializedData,
        gridWidth: gridWidth,
        gridHeight: gridHeight
      });
    });
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [primaryAxesHashes, materializedData, gridHeight, gridWidth]); // Calculate secondary axes

  var secondaryAxes = React.useMemo(function () {
    return preSecondaryAxes.map(function (axis, i) {
      return buildAxis({
        axis: axis,
        primaryAxes: primaryAxes,
        materializedData: materializedData,
        gridWidth: gridWidth,
        gridHeight: gridHeight
      });
    });
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [secondaryAxesHashes, materializedData, gridHeight, gridWidth]); // Make sure we're mapping x and y to the correct axes

  var xKey = primaryAxes.find(function (d) {
    return d.vertical;
  }) ? 'secondary' : 'primary';
  var yKey = primaryAxes.find(function (d) {
    return d.vertical;
  }) ? 'primary' : 'secondary';
  var xAxes = primaryAxes.find(function (d) {
    return d.vertical;
  }) ? secondaryAxes : primaryAxes;
  var yAxes = primaryAxes.find(function (d) {
    return d.vertical;
  }) ? primaryAxes : secondaryAxes;
  return {
    primaryAxes: primaryAxes,
    secondaryAxes: secondaryAxes,
    xKey: xKey,
    yKey: yKey,
    xAxes: xAxes,
    yAxes: yAxes
  };
};

var defaultColors = ['#4ab5eb', '#fc6868', '#DECF3F', '#60BD68', '#FAA43A', '#c63b89', '#1aaabe', '#734fe9', '#1828bd', '#cd82ad'];

var calculateStackData = function calculateStackData(_ref) {
  var materializedData = _ref.materializedData,
      primaryAxes = _ref.primaryAxes,
      secondaryAxes = _ref.secondaryAxes,
      yAxes = _ref.yAxes,
      yKey = _ref.yKey,
      xAxes = _ref.xAxes,
      xKey = _ref.xKey,
      groupMode = _ref.groupMode; // Make stackData

  return React.useMemo(function () {
    // We need materializedData and both axes to continue
    if (!primaryAxes.length || !secondaryAxes.length) {
      throw new Error('A primary and secondary axis is required!');
    } // If the axes are ready, let's decorate the materializedData for visual plotting
    // "totals" are kept per secondaryAxis and used for bases if secondaryAxis stacking is enabled


    var scaleTotals = secondaryAxes.map(function () {
      return {};
    });
    materializedData.forEach(function (series) {
      var axisIndex = Utils.getAxisIndexByAxisID(secondaryAxes, series.secondaryAxisID);
      series.datums.forEach(function (datum) {
        scaleTotals[axisIndex][datum.primary] = {
          negative: 0,
          positive: 0
        };
      });
    }); // Determine the correct primary and secondary values for each axis
    // Also calculate bases and totals if either axis is stacked

    var stackData = materializedData.map(function (series) {
      var primaryAxisIndex = Utils.getAxisIndexByAxisID(primaryAxes, series.primaryAxisID);
      var primaryAxis = primaryAxes[primaryAxisIndex];
      var secondaryAxisIndex = Utils.getAxisIndexByAxisID(secondaryAxes, series.secondaryAxisID);
      var secondaryAxis = secondaryAxes[secondaryAxisIndex];
      return _objectSpread({}, series, {
        datums: series.datums.map(function (d) {
          var datum = _objectSpread({}, d, {
            xValue: d[xKey],
            yValue: d[yKey],
            baseValue: 0
          });

          if (secondaryAxis.stacked) {
            var start = scaleTotals[secondaryAxisIndex][d.primary]; // Stack the x or y values (according to axis positioning)

            if (primaryAxis.vertical) {
              // Is this a valid point?
              var validPoint = Utils.isValidPoint(datum.xValue); // Should we use positive or negative base?

              var totalKey = datum.xValue >= 0 ? 'positive' : 'negative'; // Assign the base

              datum.baseValue = start[totalKey]; // Add the value for a total

              datum.totalValue = datum.baseValue + (validPoint ? datum.xValue : 0); // Update the totals

              scaleTotals[secondaryAxisIndex][d.primary][totalKey] = datum.totalValue; // Make the total the new value

              datum.xValue = validPoint ? datum.totalValue : null;
            } else {
              // Is this a valid point?
              var _validPoint = Utils.isValidPoint(datum.yValue); // Should we use positive or negative base?


              var _totalKey = datum.yValue >= 0 ? 'positive' : 'negative'; // Assign the base


              datum.baseValue = start[_totalKey]; // Add the value to the base

              datum.totalValue = datum.baseValue + (_validPoint ? datum.yValue : 0); // Update the totals

              scaleTotals[secondaryAxisIndex][d.primary][_totalKey] = datum.totalValue; // Make the total the new value

              datum.yValue = _validPoint ? datum.totalValue : null;
            }
          }

          return datum;
        })
      });
    });
    stackData.forEach(function (series) {
      series.datums.forEach(function (datum) {
        datum.series = series;
      });
    }); // Use the plotDatum method on each series

    stackData.forEach(function (series, i) {
      if (!series.Component.plotDatum) {
        throw new Error("Could not find a [SeriesType].plotDatum() static method for the series Component above (index: ".concat(i, ")"));
      }

      var primaryAxisIndex = Utils.getAxisIndexByAxisID(primaryAxes, series.primaryAxisID);
      var secondaryAxisIndex = Utils.getAxisIndexByAxisID(secondaryAxes, series.secondaryAxisID);
      var primaryAxis = primaryAxes[primaryAxisIndex];
      var secondaryAxis = secondaryAxes[secondaryAxisIndex];
      var xAxisIndex = Utils.getAxisIndexByAxisID(xAxes, series["".concat(xKey, "AxisID")]);
      var yAxisIndex = Utils.getAxisIndexByAxisID(yAxes, series["".concat(yKey, "AxisID")]);
      var xAxis = xAxes[xAxisIndex];
      var yAxis = yAxes[yAxisIndex];
      series.datums = series.datums.map(function (d) {
        // Data for cartesian charts
        var result = series.Component.plotDatum(d, {
          primaryAxis: primaryAxis,
          secondaryAxis: secondaryAxis,
          xAxis: xAxis,
          yAxis: yAxis
        });
        return result || d;
      });
    }); // Do any data grouping ahead of time using

    if ([groupModeSingle, groupModeSeries].includes(groupMode)) {
      for (var seriesIndex = 0; seriesIndex < stackData.length; seriesIndex++) {
        var series = stackData[seriesIndex];

        for (var datumIndex = 0; datumIndex < series.datums.length; datumIndex++) {
          var datum = series.datums[datumIndex];
          datum.group = groupMode === groupModeSeries ? datum.series.datums : [datum];
        }
      }
    } else if ([groupModePrimary, groupModeSecondary].includes(groupMode)) {
      var datumsByGrouping = {};

      for (var _seriesIndex = 0; _seriesIndex < stackData.length; _seriesIndex++) {
        var _series = stackData[_seriesIndex];

        for (var _datumIndex = 0; _datumIndex < _series.datums.length; _datumIndex++) {
          var _datum = _series.datums[_datumIndex];

          if (!_datum.defined) {
            continue;
          }

          var axisKey = String(groupMode === groupModePrimary ? _datum.primary : _datum.secondary);
          datumsByGrouping[axisKey] = datumsByGrouping[axisKey] || [];
          datumsByGrouping[axisKey].push(_datum);
        }
      }

      for (var _seriesIndex2 = 0; _seriesIndex2 < stackData.length; _seriesIndex2++) {
        var _series2 = stackData[_seriesIndex2];

        for (var _datumIndex2 = 0; _datumIndex2 < _series2.datums.length; _datumIndex2++) {
          var _datum2 = _series2.datums[_datumIndex2];

          var _axisKey = String(groupMode === groupModePrimary ? _datum2.primary : _datum2.secondary);

          _datum2.group = datumsByGrouping[_axisKey];
        }
      }
    } // Not we need to precalculate all of the possible status styles by
    // calling the seemingly 'live' getSeriesStyle, and getDatumStyle callbacks ;)


    stackData = stackData.map(function (series, i) {
      if (!series.Component.buildStyles) {
        throw new Error("Could not find a SeriesType.buildStyles() static method for the series Component above (index: ".concat(i, ")"));
      }

      var result = series.Component.buildStyles(series, {
        defaultColors: defaultColors
      });
      return result || series;
    });
    return stackData;
  }, [primaryAxes, secondaryAxes, materializedData, groupMode, xKey, yKey, xAxes, yAxes]);
};

var showCount = 10;

function TooltipRenderer(props) {
  var datum = props.datum,
      groupMode = props.groupMode,
      primaryAxis = props.primaryAxis,
      secondaryAxis = props.secondaryAxis,
      formatSecondary = props.formatSecondary,
      formatTertiary = props.formatTertiary,
      getStyle = props.getStyle,
      dark = props.dark;

  if (!datum) {
    return null;
  }

  var resolvedFormatSecondary = formatSecondary || function (val) {
    return Math.floor(val) < val ? secondaryAxis.format(Math.round(val * 100) / 100) : secondaryAxis.format(val);
  };

  var resolvedFormatTertiary = formatTertiary || function (val) {
    return Math.floor(val) < val ? Math.round(val * 100) / 100 : val;
  };

  var sortedGroupDatums = _toConsumableArray(datum.group).sort(function (a, b) {
    if (!primaryAxis.stacked && groupMode === groupModeSeries || groupMode === groupModeSecondary) {
      if (a.primaryCoord > b.primaryCoord) {
        return -1;
      } else if (a.primaryCoord < b.primaryCoord) {
        return 1;
      }
    } else if (!secondaryAxis.stacked) {
      if (a.secondaryCoord > b.secondaryCoord) {
        return -1;
      } else if (a.secondaryCoord < b.secondaryCoord) {
        return 1;
      }
    }

    return a.seriesIndex > b.seriesIndex ? 1 : -1;
  });

  if (groupMode === groupModePrimary) {
    sortedGroupDatums.reverse();
  }

  if (secondaryAxis.invert) {
    sortedGroupDatums.reverse();
  }

  var resolvedShowCount = showCount;
  var length = sortedGroupDatums.length; // Get the focused series' index

  var activeIndex = sortedGroupDatums.findIndex(function (d) {
    return d === datum;
  }); // Get the start by going back half of the showCount

  var start = activeIndex > -1 ? activeIndex - resolvedShowCount / 2 : 0; // Make sure it's at least 0

  start = Math.max(start, 0); // Use the start and add the showCount to get the end

  var end = activeIndex > -1 ? start + resolvedShowCount : length; // Don't let the end go passed the length

  end = Math.min(end, length); // Double check we aren't clipping the start

  start = Math.max(end - resolvedShowCount, 0); // Slice the datums by start and end

  var visibleSortedGroupDatums = sortedGroupDatums.slice(start, end); // Detect if we have previous items

  var hasPrevious = start > 0; // Or next items

  var hasNext = end < length;
  return React.createElement("div", null, React.createElement("div", {
    style: {
      marginBottom: '3px',
      textAlign: 'center'
    }
  }, groupMode === groupModeSeries ? React.createElement("strong", null, datum.seriesLabel) : groupMode === groupModeSecondary ? React.createElement("strong", null, secondaryAxis.format(datum.secondary)) : React.createElement("strong", null, primaryAxis.format(datum.primary))), React.createElement("table", {
    style: {
      whiteSpace: 'nowrap'
    }
  }, React.createElement("tbody", null, hasPrevious ? React.createElement("tr", {
    style: {
      opacity: 0.8
    }
  }, React.createElement("td", null), React.createElement("td", null, "..."), React.createElement("td", null)) : null, visibleSortedGroupDatums.map(function (sortedDatum, i) {
    var active = sortedDatum === datum;
    return React.createElement("tr", {
      key: i,
      style: {
        opacity: active ? 1 : 0.8,
        fontWeight: active && 'bold'
      }
    }, React.createElement("td", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '5px'
      }
    }, React.createElement("svg", {
      width: "16",
      height: "16"
    }, React.createElement("circle", {
      cx: "8",
      cy: "8",
      r: "7",
      style: _objectSpread({}, getStyle(sortedDatum), {
        stroke: dark ? 'black' : 'white',
        strokeWidth: active ? 2 : 1
      })
    }))), groupMode === groupModeSeries ? React.createElement(React.Fragment, null, React.createElement("td", null, primaryAxis.format(sortedDatum.primary), ": \xA0"), React.createElement("td", {
      style: {
        textAlign: 'right'
      }
    }, resolvedFormatSecondary(sortedDatum.secondary), sortedDatum.r ? " (".concat(resolvedFormatTertiary(sortedDatum.r), ")") : null)) : groupMode === groupModeSecondary ? React.createElement(React.Fragment, null, React.createElement("td", null, sortedDatum.seriesLabel, ": \xA0"), React.createElement("td", {
      style: {
        textAlign: 'right'
      }
    }, primaryAxis.format(sortedDatum.primary), sortedDatum.r ? " (".concat(resolvedFormatTertiary(sortedDatum.r), ")") : null)) : React.createElement(React.Fragment, null, React.createElement("td", null, sortedDatum.seriesLabel, ": \xA0"), React.createElement("td", {
      style: {
        textAlign: 'right'
      }
    }, resolvedFormatSecondary(sortedDatum.secondary), sortedDatum.r ? " (".concat(resolvedFormatTertiary(sortedDatum.r), ")") : null)));
  }), hasNext ? React.createElement("tr", {
    style: {
      opacity: 0.8
    }
  }, React.createElement("td", null), React.createElement("td", null, "..."), React.createElement("td", null)) : null, secondaryAxis && secondaryAxis.stacked && datum.group.length > 1 ? React.createElement("tr", null, React.createElement("td", {
    style: {
      paddingTop: '5px'
    }
  }, React.createElement("div", {
    style: {
      width: '12px',
      height: '12px',
      backgroundColor: dark ? 'rgba(0, 26, 39, 0.3)' : 'rgba(255,255,255,.2)',
      borderRadius: '50px'
    }
  })), React.createElement("td", {
    style: {
      paddingTop: '5px'
    }
  }, "Total: \xA0"), React.createElement("td", {
    style: {
      paddingTop: '5px'
    }
  }, resolvedFormatSecondary(_toConsumableArray(datum.group).reverse()[0].totalValue))) : null)));
}

var alignPropType = PropTypes.oneOf([alignAuto, alignRight, alignTopRight, alignBottomRight, alignLeft, alignTopLeft, alignBottomLeft, alignTop, alignBottom]);
var tooltipShape = PropTypes.oneOfType([PropTypes.oneOf([true]), PropTypes.shape({
  align: alignPropType,
  alignPriority: PropTypes.arrayOf(alignPropType),
  padding: PropTypes.number,
  tooltipArrowPadding: PropTypes.number,
  anchor: PropTypes.oneOf([anchorPointer, anchorClosest, anchorCenter, anchorTop, anchorBottom, anchorLeft, anchorRight, anchorGridTop, anchorGridBottom, anchorGridLeft, anchorGridRight]),
  render: PropTypes.func.required,
  onChange: PropTypes.func
})]);

var calculateTooltip = function calculateTooltip(_ref) {
  var focused = _ref.focused,
      tooltip = _ref.tooltip,
      pointer = _ref.pointer,
      gridWidth = _ref.gridWidth,
      gridHeight = _ref.gridHeight;
  return React.useMemo(function () {
    if (!tooltip) {
      return null;
    } // Default tooltip props
    // eslint-disable-next-line react-hooks/exhaustive-deps


    tooltip = _objectSpread({
      align: alignAuto,
      alignPriority: [alignRight, alignTopRight, alignBottomRight, alignLeft, alignTopLeft, alignBottomLeft, alignTop, alignBottom],
      padding: 5,
      tooltipArrowPadding: 7,
      anchor: 'closest',
      render: TooltipRenderer,
      onChange: function onChange() {}
    }, tooltip);
    var anchor = {};
    var show = true; // If there is a focused datum, default the focus to its x and y

    if (focused) {
      anchor = focused.anchor;
    } else {
      show = false;
    }

    if (tooltip.anchor === 'pointer') {
      // Support pointer-bound focus
      anchor = pointer;
    } else if (tooltip.anchor === 'closest') ;else if (focused) {
      // Support manual definition of focus point using relative multiFocus strategy
      var multiFocus = Array.isArray(tooltip.anchor) ? _toConsumableArray(tooltip.anchor) : [tooltip.anchor];
      anchor = Utils.getMultiAnchor({
        anchor: multiFocus,
        points: focused.group,
        gridWidth: gridWidth,
        gridHeight: gridHeight
      });
    }

    anchor = anchor ? _objectSpread({
      horizontalPadding: anchor.horizontalPadding || 0,
      verticalPadding: anchor.verticalPadding || 0
    }, anchor) : anchor;
    return _objectSpread({}, tooltip, {
      anchor: anchor,
      show: show
    });
  }, [focused, gridHeight, gridWidth, pointer, tooltip]);
};

var cursorShape = PropTypes.oneOfType([PropTypes.oneOf([true]), PropTypes.shape({
  render: PropTypes.func,
  snap: PropTypes.bool,
  showLine: PropTypes.bool,
  showLabel: PropTypes.bool,
  axisID: PropTypes.any,
  onChange: PropTypes.func
})]);
var defaultCursorProps = {
  render: function render(_ref) {
    var formattedValue = _ref.formattedValue;
    return React.createElement("span", null, formattedValue);
  },
  snap: true,
  showLine: true,
  showLabel: true,
  axisID: undefined,
  onChange: function onChange() {}
};

var calculateCursors = function calculateCursors(_ref2) {
  var primaryCursor = _ref2.primaryCursor,
      secondaryCursor = _ref2.secondaryCursor,
      primaryAxes = _ref2.primaryAxes,
      secondaryAxes = _ref2.secondaryAxes,
      focused = _ref2.focused,
      pointer = _ref2.pointer,
      gridWidth = _ref2.gridWidth,
      gridHeight = _ref2.gridHeight,
      stackData = _ref2.stackData;
  return [primaryCursor, secondaryCursor].map(function (cursor, i) {
    var cursorValue = cursor && cursor.value;
    return React.useMemo(function () {
      if (!cursor) {
        return;
      }

      var primary = i === 0; // eslint-disable-next-line react-hooks/exhaustive-deps

      cursor = _objectSpread({}, defaultCursorProps, cursor, {
        primary: primary
      });
      var value;
      var show = false; // Determine the axis to use

      var axis = Utils.getAxisByAxisID(primary ? primaryAxes : secondaryAxes, cursor.axisID || focused ? focused.series[primary ? 'primaryAxisID' : 'secondaryAxisID'] : undefined);
      var siblingAxis = primary ? secondaryAxes[0] : primaryAxes[0]; // Resolve the invert function

      var invert = axis.scale.invert || function (d) {
        return d;
      }; // If the pointer is active, try to show


      if (pointer.active) {
        // Default to cursor x and y
        var x = pointer.x;
        var y = pointer.y; // If the cursor isn't in the grid, don't display

        if (x < -1 || x > gridWidth + 1 || y < -1 || y > gridHeight + 1) {
          show = false;
        } else {
          show = true;
        } // Implement snapping


        if (axis.type === 'ordinal' || cursor.snap) {
          if (!focused) {
            show = false;
          } else {
            if (axis.vertical) {
              value = focused.yValue;
            } else {
              value = focused.xValue;
            }
          }
        } else if (axis.vertical) {
          value = invert(y);
        } else {
          value = invert(x);
        }
      } else {
        show = false;
      }

      var resolvedShow = show;
      var resolvedValue = value;

      if (typeof cursor.value !== 'undefined' && cursor.value !== null) {
        resolvedValue = cursor.value;

        if (typeof cursor.show !== 'undefined') {
          resolvedShow = cursor.show;
        } else {
          resolvedShow = true;
        }

        if (typeof axis.scale(resolvedValue) === 'undefined') {
          resolvedShow = false;
        }
      }

      return _objectSpread({}, cursor, {
        axis: axis,
        siblingAxis: siblingAxis,
        show: show,
        value: value,
        resolvedShow: resolvedShow,
        resolvedValue: resolvedValue
      });
    }, [stackData, pointer, cursorValue]);
  });
};

function Chart(_ref) {
  var data = _ref.data,
      groupMode = _ref.groupMode,
      showVoronoi = _ref.showVoronoi,
      dark = _ref.dark,
      series = _ref.series,
      axes = _ref.axes,
      primaryCursor = _ref.primaryCursor,
      secondaryCursor = _ref.secondaryCursor,
      tooltip = _ref.tooltip,
      brush = _ref.brush,
      renderSVG = _ref.renderSVG,
      getSeries = _ref.getSeries,
      getDatums = _ref.getDatums,
      getLabel = _ref.getLabel,
      getSeriesID = _ref.getSeriesID,
      getPrimary = _ref.getPrimary,
      getSecondary = _ref.getSecondary,
      getR = _ref.getR,
      getPrimaryAxisID = _ref.getPrimaryAxisID,
      getSecondaryAxisID = _ref.getSecondaryAxisID,
      getSeriesStyle = _ref.getSeriesStyle,
      getDatumStyle = _ref.getDatumStyle,
      onClick = _ref.onClick,
      onFocus = _ref.onFocus,
      onHover = _ref.onHover,
      getSeriesOrder = _ref.getSeriesOrder,
      rest = _objectWithoutProperties(_ref, ["data", "groupMode", "showVoronoi", "dark", "series", "axes", "primaryCursor", "secondaryCursor", "tooltip", "brush", "renderSVG", "getSeries", "getDatums", "getLabel", "getSeriesID", "getPrimary", "getSecondary", "getR", "getPrimaryAxisID", "getSecondaryAxisID", "getSeriesStyle", "getDatumStyle", "onClick", "onFocus", "onHover", "getSeriesOrder"]);

  var _React$useState = React.useState({
    focused: null,
    axisDimensions: {},
    padding: {},
    offset: {},
    pointer: {}
  }),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      _React$useState2$ = _React$useState2[0],
      focused = _React$useState2$.focused,
      axisDimensions = _React$useState2$.axisDimensions,
      offsetState = _React$useState2$.offset,
      padding = _React$useState2$.padding,
      pointer = _React$useState2$.pointer,
      setChartState = _React$useState2[1];

  var onClickRef = useLatestRef(onClick);
  var onFocusRef = useLatestRef(onFocus);
  var onHoverRef = useLatestRef(onHover);
  var responsiveElRef = React.useRef();

  var _useHyperResponsive = useHyperResponsive(responsiveElRef),
      _useHyperResponsive2 = _slicedToArray(_useHyperResponsive, 1),
      _useHyperResponsive2$ = _useHyperResponsive2[0],
      width = _useHyperResponsive2$.width,
      height = _useHyperResponsive2$.height;

  getSeries = React.useCallback(Utils.normalizeGetter(getSeries), getSeries);
  getSeriesID = React.useCallback(Utils.normalizeGetter(getSeriesID), getSeriesID);
  getLabel = React.useCallback(Utils.normalizeGetter(getLabel), getLabel);
  getPrimaryAxisID = React.useCallback(Utils.normalizeGetter(getPrimaryAxisID), getPrimaryAxisID);
  getSecondaryAxisID = React.useCallback(Utils.normalizeGetter(getSecondaryAxisID), getSecondaryAxisID);
  getDatums = React.useCallback(Utils.normalizeGetter(getDatums), getDatums);
  getPrimary = React.useCallback(Utils.normalizeGetter(getPrimary), getPrimary);
  getSecondary = React.useCallback(Utils.normalizeGetter(getSecondary), getSecondary);
  getR = React.useCallback(Utils.normalizeGetter(getR), getR);
  var materializedData = calculateMaterializeData({
    data: data,
    getSeries: getSeries,
    getSeriesID: getSeriesID,
    getLabel: getLabel,
    getPrimaryAxisID: getPrimaryAxisID,
    getSecondaryAxisID: getSecondaryAxisID,
    getDatums: getDatums,
    getPrimary: getPrimary,
    getSecondary: getSecondary,
    getR: getR
  });
  var seriesOptions = calculateSeriesOptions({
    materializedData: materializedData,
    series: series
  });
  materializedData = calculateSeriesTypes({
    materializedData: materializedData,
    seriesOptions: seriesOptions
  });

  var _calculateDimensions = calculateDimensions({
    width: width,
    height: height,
    axisDimensions: axisDimensions,
    padding: padding,
    offset: offsetState
  }),
      offset = _calculateDimensions.offset,
      gridX = _calculateDimensions.gridX,
      gridY = _calculateDimensions.gridY,
      gridWidth = _calculateDimensions.gridWidth,
      gridHeight = _calculateDimensions.gridHeight;

  var _calculateAxes = calculateAxes({
    axes: axes,
    materializedData: materializedData,
    gridHeight: gridHeight,
    gridWidth: gridWidth
  }),
      primaryAxes = _calculateAxes.primaryAxes,
      secondaryAxes = _calculateAxes.secondaryAxes,
      xKey = _calculateAxes.xKey,
      yKey = _calculateAxes.yKey,
      xAxes = _calculateAxes.xAxes,
      yAxes = _calculateAxes.yAxes;

  var stackData = calculateStackData({
    materializedData: materializedData,
    primaryAxes: primaryAxes,
    secondaryAxes: secondaryAxes,
    yAxes: yAxes,
    yKey: yKey,
    xAxes: xAxes,
    xKey: xKey,
    groupMode: groupMode
  });
  pointer = React.useMemo(function () {
    return _objectSpread({}, pointer, {
      axisValues: [].concat(_toConsumableArray(primaryAxes), _toConsumableArray(secondaryAxes)).map(function (axis) {
        return {
          axis: axis,
          value: axis.scale.invert ? axis.scale.invert(pointer[axis.vertical ? 'y' : 'x']) : null
        };
      })
    });
  }, [pointer, primaryAxes, secondaryAxes]);
  focused = React.useMemo(function () {
    // Get the closest focus datum out of the datum group
    return focused ? Utils.getClosestPoint(pointer, focused.group) : null;
  }, [focused, pointer]); // keep the previous focused value around for animations

  var latestFocus = useLatest(focused, focused); // Calculate Tooltip

  tooltip = calculateTooltip({
    focused: focused,
    tooltip: tooltip,
    pointer: pointer,
    gridWidth: gridWidth,
    gridHeight: gridHeight
  }) // Cursors
  ;

  var _calculateCursors = calculateCursors({
    primaryCursor: primaryCursor,
    secondaryCursor: secondaryCursor,
    primaryAxes: primaryAxes,
    secondaryAxes: secondaryAxes,
    focused: focused,
    pointer: pointer,
    gridWidth: gridWidth,
    gridHeight: gridHeight,
    stackData: stackData
  });

  var _calculateCursors2 = _slicedToArray(_calculateCursors, 2);

  primaryCursor = _calculateCursors2[0];
  secondaryCursor = _calculateCursors2[1];
  React.useEffect(function () {
    if (onFocusRef.current) {
      onFocusRef.current(focused);
    }
  }, [onFocusRef, focused]);
  React.useEffect(function () {
    if (onHoverRef.current) {
      onHoverRef.current(pointer);
    }
  }, [onHoverRef, pointer]);
  var previousDragging = usePrevious(pointer.dragging);
  React.useEffect(function () {
    if (brush && previousDragging && !pointer.dragging) {
      console.log(pointer);

      if (Math.abs(pointer.sourceX - pointer.x) < 20) {
        return;
      }

      brush.onSelect({
        pointer: pointer.released,
        start: primaryAxes[0].scale.invert(pointer.sourceX),
        end: primaryAxes[0].scale.invert(pointer.x)
      });
    }
  }, [brush, pointer, pointer.released, pointer.sourceX, pointer.x, previousDragging, primaryAxes]); // Decorate the chartState with computed values (or ones we just
  // want to pass down through context)

  var chartState = React.useMemo(function () {
    return {
      focused: focused,
      latestFocus: latestFocus,
      pointer: pointer,
      tooltip: tooltip,
      axisDimensions: axisDimensions,
      offset: offset,
      padding: padding,
      width: width,
      height: height,
      brush: brush,
      groupMode: groupMode,
      showVoronoi: showVoronoi,
      materializedData: materializedData,
      stackData: stackData,
      primaryAxes: primaryAxes,
      secondaryAxes: secondaryAxes,
      primaryCursor: primaryCursor,
      secondaryCursor: secondaryCursor,
      gridX: gridX,
      gridY: gridY,
      gridWidth: gridWidth,
      gridHeight: gridHeight,
      dark: dark,
      renderSVG: renderSVG,
      xKey: xKey,
      yKey: yKey,
      xAxes: xAxes,
      yAxes: yAxes,
      onClickRef: onClickRef,
      getSeriesStyle: getSeriesStyle,
      getDatumStyle: getDatumStyle,
      seriesOptions: seriesOptions,
      getSeriesOrder: getSeriesOrder
    };
  }, [axisDimensions, brush, dark, focused, getDatumStyle, getSeriesOrder, getSeriesStyle, gridHeight, gridWidth, gridX, gridY, groupMode, height, latestFocus, materializedData, offset, onClickRef, padding, pointer, primaryAxes, primaryCursor, renderSVG, secondaryAxes, secondaryCursor, seriesOptions, showVoronoi, stackData, tooltip, width, xAxes, xKey, yAxes, yKey]);
  var chartStateContextValue = React.useMemo(function () {
    return [chartState, setChartState];
  }, [chartState]);
  return React.createElement(ChartContext.Provider, {
    value: chartStateContextValue
  }, React.createElement(ChartInner, _extends({
    ref: responsiveElRef
  }, rest, {
    onClick: function onClick(e) {
      if (onClickRef.current) {
        onClickRef.current(focused);
      }
    }
  })));
}

Chart.propTypes = {
  data: PropTypes.any.isRequired,
  groupMode: PropTypes.oneOf([groupModeSingle, groupModeSeries, groupModePrimary, groupModeSecondary]).isRequired,
  showVoronoi: PropTypes.bool,
  dark: PropTypes.bool,
  series: seriesPropType,
  axes: PropTypes.arrayOf(axisShape),
  primaryCursor: cursorShape,
  secondaryCursor: cursorShape,
  tooltip: tooltipShape,
  renderSVG: PropTypes.func,
  getSeries: PropTypes.func.isRequired,
  getDatums: PropTypes.func.isRequired,
  getLabel: PropTypes.func.isRequired,
  getSeriesID: PropTypes.func.isRequired,
  getPrimary: PropTypes.func.isRequired,
  getSecondary: PropTypes.func.isRequired,
  getR: PropTypes.func.isRequired,
  getPrimaryAxisID: PropTypes.func.isRequired,
  getSecondaryAxisID: PropTypes.func.isRequired,
  getSeriesOrder: PropTypes.func.isRequired,
  getSeriesStyle: PropTypes.func,
  getDatumStyle: PropTypes.func,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onHover: PropTypes.func
};
Chart.defaultProps = {
  getSeries: function getSeries(d) {
    return d;
  },
  getDatums: function getDatums(d) {
    return Array.isArray(d) ? d : d.datums || d.data;
  },
  getLabel: function getLabel(d, i) {
    return d.label || "Series ".concat(i + 1);
  },
  getSeriesID: function getSeriesID(d, i) {
    return i;
  },
  getPrimary: function getPrimary(d) {
    return Array.isArray(d) ? d[0] : d.primary || d.x;
  },
  getSecondary: function getSecondary(d) {
    return Array.isArray(d) ? d[1] : d.secondary || d.y;
  },
  getR: function getR(d) {
    return Array.isArray(d) ? d[2] : d.radius || d.r;
  },
  getPrimaryAxisID: function getPrimaryAxisID(s) {
    return s.primaryAxisID;
  },
  getSecondaryAxisID: function getSecondaryAxisID(s) {
    return s.secondaryAxisID;
  },
  getSeriesStyle: function getSeriesStyle() {
    return {};
  },
  getDatumStyle: function getDatumStyle() {
    return {};
  },
  getSeriesOrder: function getSeriesOrder(d) {
    return d;
  },
  onHover: function onHover() {},
  groupMode: groupModePrimary,
  showVoronoi: false
};
exports.Chart = Chart;

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return useBox; });
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);




 //

var options = {
  elementType: ['line', 'area', 'bar', 'bubble'],
  primaryAxisType: ['linear', 'time', 'log', 'ordinal'],
  secondaryAxisType: ['linear', 'time', 'log', 'ordinal'],
  primaryAxisPosition: ['top', 'left', 'right', 'bottom'],
  secondaryAxisPosition: ['top', 'left', 'right', 'bottom'],
  secondaryAxisStack: [true, false],
  primaryAxisShow: [true, false],
  secondaryAxisShow: [true, false],
  groupMode: ['single', 'series', 'primary', 'secondary'],
  tooltipAnchor: ['closest', 'top', 'bottom', 'left', 'right', 'center', 'gridTop', 'gridBottom', 'gridLeft', 'gridRight', 'gridCenter', 'pointer'],
  tooltipAlign: ['auto', 'top', 'bottom', 'left', 'right', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight', 'center'],
  snapCursor: [true, false]
};
var optionKeys = Object.keys(options);
function useBox(_ref) {
  var series = _ref.series,
      useR = _ref.useR,
      _ref$show = _ref.show,
      show = _ref$show === void 0 ? [] : _ref$show,
      _ref$count = _ref.count,
      count = _ref$count === void 0 ? 1 : _ref$count,
      _ref$resizable = _ref.resizable,
      resizable = _ref$resizable === void 0 ? true : _ref$resizable,
      _ref$canRandomize = _ref.canRandomize,
      canRandomize = _ref$canRandomize === void 0 ? true : _ref$canRandomize,
      _ref$dataType = _ref.dataType,
      dataType = _ref$dataType === void 0 ? 'time' : _ref$dataType,
      _ref$elementType = _ref.elementType,
      elementType = _ref$elementType === void 0 ? 'line' : _ref$elementType,
      _ref$primaryAxisType = _ref.primaryAxisType,
      primaryAxisType = _ref$primaryAxisType === void 0 ? 'time' : _ref$primaryAxisType,
      _ref$secondaryAxisTyp = _ref.secondaryAxisType,
      secondaryAxisType = _ref$secondaryAxisTyp === void 0 ? 'linear' : _ref$secondaryAxisTyp,
      _ref$primaryAxisPosit = _ref.primaryAxisPosition,
      primaryAxisPosition = _ref$primaryAxisPosit === void 0 ? 'bottom' : _ref$primaryAxisPosit,
      _ref$secondaryAxisPos = _ref.secondaryAxisPosition,
      secondaryAxisPosition = _ref$secondaryAxisPos === void 0 ? 'left' : _ref$secondaryAxisPos,
      _ref$primaryAxisStack = _ref.primaryAxisStack,
      primaryAxisStack = _ref$primaryAxisStack === void 0 ? false : _ref$primaryAxisStack,
      _ref$secondaryAxisSta = _ref.secondaryAxisStack,
      secondaryAxisStack = _ref$secondaryAxisSta === void 0 ? true : _ref$secondaryAxisSta,
      _ref$primaryAxisShow = _ref.primaryAxisShow,
      primaryAxisShow = _ref$primaryAxisShow === void 0 ? true : _ref$primaryAxisShow,
      _ref$secondaryAxisSho = _ref.secondaryAxisShow,
      secondaryAxisShow = _ref$secondaryAxisSho === void 0 ? true : _ref$secondaryAxisSho,
      _ref$tooltipAnchor = _ref.tooltipAnchor,
      tooltipAnchor = _ref$tooltipAnchor === void 0 ? 'closest' : _ref$tooltipAnchor,
      _ref$tooltipAlign = _ref.tooltipAlign,
      tooltipAlign = _ref$tooltipAlign === void 0 ? 'auto' : _ref$tooltipAlign,
      _ref$groupMode = _ref.groupMode,
      groupMode = _ref$groupMode === void 0 ? 'primary' : _ref$groupMode,
      _ref$snapCursor = _ref.snapCursor,
      snapCursor = _ref$snapCursor === void 0 ? true : _ref$snapCursor,
      _ref$datums = _ref.datums,
      datums = _ref$datums === void 0 ? 10 : _ref$datums;

  var _React$useState = react__WEBPACK_IMPORTED_MODULE_4___default.a.useState({
    count: count,
    resizable: resizable,
    canRandomize: canRandomize,
    dataType: dataType,
    elementType: elementType,
    primaryAxisType: primaryAxisType,
    secondaryAxisType: secondaryAxisType,
    primaryAxisPosition: primaryAxisPosition,
    secondaryAxisPosition: secondaryAxisPosition,
    primaryAxisStack: primaryAxisStack,
    secondaryAxisStack: secondaryAxisStack,
    primaryAxisShow: primaryAxisShow,
    secondaryAxisShow: secondaryAxisShow,
    tooltipAnchor: tooltipAnchor,
    tooltipAlign: tooltipAlign,
    groupMode: groupMode,
    snapCursor: snapCursor,
    datums: datums,
    data: makeDataFrom(dataType, series, useR, datums)
  }),
      _React$useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3___default()(_React$useState, 2),
      state = _React$useState2[0],
      setState = _React$useState2[1];

  react__WEBPACK_IMPORTED_MODULE_4___default.a.useEffect(function () {
    setState(function (old) {
      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_2___default()({}, old, {
        data: makeDataFrom(dataType, series, useR, datums)
      });
    });
  }, [count, dataType, datums, series, useR]);

  var randomizeData = function randomizeData() {
    return setState(function (old) {
      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_2___default()({}, old, {
        data: makeDataFrom(dataType, series, useR, datums)
      });
    });
  };

  var Options = optionKeys.filter(function (option) {
    return show.indexOf(option) > -1;
  }).map(function (option) {
    return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", {
      key: option
    }, option, ": \xA0", react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("select", {
      value: state[option],
      onChange: function onChange(_ref2) {
        var value = _ref2.target.value;
        return setState(function (old) {
          return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_2___default()({}, old, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()({}, option, typeof options[option][0] === 'boolean' ? value === 'true' : value));
        });
      }
    }, options[option].map(function (d) {
      return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("option", {
        value: d,
        key: d.toString()
      }, d.toString());
    })), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("br", null));
  });
  return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_2___default()({}, state, {
    randomizeData: randomizeData,
    Options: Options
  });
}

function makeDataFrom(dataType, series, useR, datums) {
  return _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(new Array(series || Math.max(Math.round(Math.random() * 5), 1))).map(function (d, i) {
    return makeSeries(i, dataType, useR, datums);
  });
}

function makeSeries(i, dataType, useR, datums) {
  var start = 0;
  var startDate = new Date();
  startDate.setMinutes(0);
  startDate.setSeconds(0);
  startDate.setMilliseconds(0); // const length = 5 + Math.round(Math.random() * 15)

  var length = datums;
  var min = 0;
  var max = 100;
  var rMin = 2;
  var rMax = 20;
  var nullChance = 0;
  return {
    label: "Series ".concat(i + 1),
    datums: _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(new Array(length)).map(function (_, i) {
      var x = start + i;

      if (dataType === 'ordinal') {
        x = "Ordinal Group ".concat(x);
      }

      if (dataType === 'time') {
        x = new Date(startDate.getTime() + 60 * 1000 * 30 * i);
      }

      var distribution = 1.1;
      var y = Math.random() < nullChance ? null : min + Math.round(Math.random() * (max - min));
      var r = !useR ? undefined : rMax - Math.floor(Math.log(Math.random() * (Math.pow(distribution, rMax) - rMin) + rMin) / Math.log(distribution));
      return {
        x: x,
        y: y,
        r: r
      };
    })
  };
}

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/objectSpread");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/slicedToArray");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/taggedTemplateLiteral");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("styled-components");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("@reach/router");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(23);

var requireById = function requireById(id) {
  if (!(0, _utils.isWebpack)() && typeof id === 'string') {
    return __webpack_require__(44)("" + id);
  }

  return __webpack_require__('' + id);
};

exports["default"] = requireById;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/extends");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/defineProperty");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/toConsumableArray");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/typeof");

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

var _typeof = __webpack_require__(13);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setHasBabelPlugin = exports.ReportChunks = exports.MODULE_IDS = exports.CHUNK_NAMES = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _requireUniversalModule = __webpack_require__(43);

Object.defineProperty(exports, 'CHUNK_NAMES', {
  enumerable: true,
  get: function get() {
    return _requireUniversalModule.CHUNK_NAMES;
  }
});
Object.defineProperty(exports, 'MODULE_IDS', {
  enumerable: true,
  get: function get() {
    return _requireUniversalModule.MODULE_IDS;
  }
});

var _reportChunks = __webpack_require__(45);

Object.defineProperty(exports, 'ReportChunks', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_reportChunks)["default"];
  }
});
exports["default"] = universal;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(24);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _hoistNonReactStatics = __webpack_require__(31);

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

var _vm = __webpack_require__(46);

var _requireUniversalModule2 = _interopRequireDefault(_requireUniversalModule);

var _utils = __webpack_require__(23);

var _helpers = __webpack_require__(47);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (_typeof(call) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + _typeof(superClass));
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function _objectWithoutProperties(obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
}

var hasBabelPlugin = false;

var isHMR = function isHMR() {
  return (// $FlowIgnore
    module.hot && (false)
  );
};

var setHasBabelPlugin = exports.setHasBabelPlugin = function setHasBabelPlugin() {
  hasBabelPlugin = true;
};

function universal(asyncModule) {
  var _class, _temp;

  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var userRender = opts.render,
      _opts$loading = opts.loading,
      Loading = _opts$loading === undefined ? _utils.DefaultLoading : _opts$loading,
      _opts$error = opts.error,
      Err = _opts$error === undefined ? _utils.DefaultError : _opts$error,
      _opts$minDelay = opts.minDelay,
      minDelay = _opts$minDelay === undefined ? 0 : _opts$minDelay,
      _opts$alwaysDelay = opts.alwaysDelay,
      alwaysDelay = _opts$alwaysDelay === undefined ? false : _opts$alwaysDelay,
      _opts$testBabelPlugin = opts.testBabelPlugin,
      testBabelPlugin = _opts$testBabelPlugin === undefined ? false : _opts$testBabelPlugin,
      _opts$loadingTransiti = opts.loadingTransition,
      loadingTransition = _opts$loadingTransiti === undefined ? true : _opts$loadingTransiti,
      options = _objectWithoutProperties(opts, ['render', 'loading', 'error', 'minDelay', 'alwaysDelay', 'testBabelPlugin', 'loadingTransition']);

  var renderFunc = userRender || (0, _utils.createDefaultRender)(Loading, Err);
  var isDynamic = hasBabelPlugin || testBabelPlugin;
  options.isDynamic = isDynamic;
  options.usesBabelPlugin = hasBabelPlugin;
  options.modCache = {};
  options.promCache = {};
  return _temp = _class = function (_React$Component) {
    _inherits(UniversalComponent, _React$Component);

    _createClass(UniversalComponent, [{
      key: 'requireAsyncInner',
      value: function requireAsyncInner(requireAsync, props, state, context, isMount) {
        var _this2 = this;

        if (!state.mod && loadingTransition) {
          this.update({
            mod: null,
            props: props
          }); // display `loading` during componentWillReceiveProps
        }

        var time = new Date();
        requireAsync(props, context).then(function (mod) {
          var state = {
            mod: mod,
            props: props,
            context: context
          };
          var timeLapsed = new Date() - time;

          if (timeLapsed < minDelay) {
            var extraDelay = minDelay - timeLapsed;
            return setTimeout(function () {
              return _this2.update(state, isMount);
            }, extraDelay);
          }

          _this2.update(state, isMount);
        })["catch"](function (error) {
          return _this2.update({
            error: error,
            props: props,
            context: context
          });
        });
      }
    }, {
      key: 'handleBefore',
      value: function handleBefore(isMount, isSync) {
        var isServer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        if (this.props.onBefore) {
          var onBefore = this.props.onBefore;
          var info = {
            isMount: isMount,
            isSync: isSync,
            isServer: isServer
          };
          onBefore(info);
        }
      }
    }, {
      key: 'handleAfter',
      value: function handleAfter(state, isMount, isSync, isServer) {
        var mod = state.mod,
            error = state.error;

        if (mod && !error) {
          (0, _hoistNonReactStatics2["default"])(UniversalComponent, mod, {
            preload: true,
            preloadWeak: true
          });

          if (this.props.onAfter) {
            var onAfter = this.props.onAfter;
            var info = {
              isMount: isMount,
              isSync: isSync,
              isServer: isServer
            };
            onAfter(info, mod);
          }
        } else if (error && this.props.onError) {
          this.props.onError(error);
        }

        this.setState(state);
      } // $FlowFixMe

    }, {
      key: 'init',
      value: function init(props, context) {
        var _req = (0, _requireUniversalModule2["default"])(asyncModule, options, props),
            addModule = _req.addModule,
            requireSync = _req.requireSync,
            requireAsync = _req.requireAsync,
            asyncOnly = _req.asyncOnly;

        var mod = void 0;

        try {
          mod = requireSync(props, context);
        } catch (error) {
          return (0, _helpers.__update)(props, {
            error: error,
            props: props,
            context: context
          }, this._initialized);
        }

        this._asyncOnly = asyncOnly;
        var chunkName = addModule(props); // record the module for SSR flushing :)

        if (context.report) {
          context.report(chunkName);
        }

        if (mod || _utils.isServer) {
          this.handleBefore(true, true, _utils.isServer);
          return (0, _helpers.__update)(props, {
            asyncOnly: asyncOnly,
            props: props,
            mod: mod,
            context: context
          }, this._initialized, true, true, _utils.isServer);
        }

        this.handleBefore(true, false);
        this.requireAsyncInner(requireAsync, props, {
          props: props,
          asyncOnly: asyncOnly,
          mod: mod,
          context: context
        }, context, true);
        return {
          mod: mod,
          asyncOnly: asyncOnly,
          context: context,
          props: props
        };
      }
    }], [{
      key: 'preload',

      /* eslint-enable react/sort-comp */
      value: function preload(props) {
        var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        props = props || {};

        var _req2 = (0, _requireUniversalModule2["default"])(asyncModule, options, props),
            requireAsync = _req2.requireAsync,
            requireSync = _req2.requireSync;

        var mod = void 0;

        try {
          mod = requireSync(props, context);
        } catch (error) {
          return Promise.reject(error);
        }

        return Promise.resolve().then(function () {
          if (mod) return mod;
          return requireAsync(props, context);
        }).then(function (mod) {
          (0, _hoistNonReactStatics2["default"])(UniversalComponent, mod, {
            preload: true,
            preloadWeak: true
          });
          return mod;
        });
      }
      /* eslint-disable react/sort-comp */

    }, {
      key: 'preloadWeak',
      value: function preloadWeak(props) {
        var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        props = props || {};

        var _req3 = (0, _requireUniversalModule2["default"])(asyncModule, options, props),
            requireSync = _req3.requireSync;

        var mod = requireSync(props, context);

        if (mod) {
          (0, _hoistNonReactStatics2["default"])(UniversalComponent, mod, {
            preload: true,
            preloadWeak: true
          });
        }

        return mod;
      }
    }]);

    function UniversalComponent(props, context) {
      _classCallCheck(this, UniversalComponent);

      var _this = _possibleConstructorReturn(this, (UniversalComponent.__proto__ || Object.getPrototypeOf(UniversalComponent)).call(this, props, context));

      _this.update = function (state) {
        var isMount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var isSync = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var isServer = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
        if (!_this._initialized) return;
        if (!state.error) state.error = null;

        _this.handleAfter(state, isMount, isSync, isServer);
      };

      _this.state = _this.init(_this.props, _this.context); // $FlowFixMe

      _this.state.error = null;
      return _this;
    }

    _createClass(UniversalComponent, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        this._initialized = true;
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        var _this3 = this;

        if (isDynamic || this._asyncOnly) {
          var _req4 = (0, _requireUniversalModule2["default"])(asyncModule, options, this.props, prevProps),
              requireSync = _req4.requireSync,
              requireAsync = _req4.requireAsync,
              shouldUpdate = _req4.shouldUpdate;

          if (shouldUpdate(this.props, prevProps)) {
            var mod = void 0;

            try {
              mod = requireSync(this.props, this.context);
            } catch (error) {
              return this.update({
                error: error
              });
            }

            this.handleBefore(false, !!mod);

            if (!mod) {
              return this.requireAsyncInner(requireAsync, this.props, {
                mod: mod
              });
            }

            var state = {
              mod: mod
            };

            if (alwaysDelay) {
              if (loadingTransition) this.update({
                mod: null
              }); // display `loading` during componentWillReceiveProps

              setTimeout(function () {
                return _this3.update(state, false, true);
              }, minDelay);
              return;
            }

            this.update(state, false, true);
          }
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this._initialized = false;
      }
    }, {
      key: 'render',
      value: function render() {
        var _props = this.props,
            isLoading = _props.isLoading,
            userError = _props.error,
            props = _objectWithoutProperties(_props, ['isLoading', 'error']);

        var _state = this.state,
            mod = _state.mod,
            error = _state.error;
        return renderFunc(props, mod, isLoading, userError || error);
      }
    }], [{
      key: 'getDerivedStateFromProps',
      value: function getDerivedStateFromProps(nextProps, currentState) {
        var _req5 = (0, _requireUniversalModule2["default"])(asyncModule, options, nextProps, currentState.props),
            requireSync = _req5.requireSync,
            shouldUpdate = _req5.shouldUpdate;

        if (isHMR() && shouldUpdate(currentState.props, nextProps)) {
          var mod = requireSync(nextProps, currentState.context);
          return _extends({}, currentState, {
            mod: mod
          });
        }

        return null;
      }
    }]);

    return UniversalComponent;
  }(_react2["default"].Component), _class.contextTypes = {
    store: _propTypes2["default"].object,
    report: _propTypes2["default"].func
  }, _temp;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(22)(module)))

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/classCallCheck");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/createClass");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/possibleConstructorReturn");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/getPrototypeOf");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/inherits");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("react-json-tree");

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: external "@babel/runtime/helpers/taggedTemplateLiteral"
var taggedTemplateLiteral_ = __webpack_require__(6);
var taggedTemplateLiteral_default = /*#__PURE__*/__webpack_require__.n(taggedTemplateLiteral_);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(0);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(7);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);

// EXTERNAL MODULE: external "@reach/router"
var router_ = __webpack_require__(8);

// EXTERNAL MODULE: external "react-static"
var external_react_static_ = __webpack_require__(36);

// EXTERNAL MODULE: external "react-resizable/css/styles.css"
var styles_css_ = __webpack_require__(55);

// EXTERNAL MODULE: /Users/tannerlinsley/GitHub/react-charts/www/src/logo.png
var logo = __webpack_require__(37);
var logo_default = /*#__PURE__*/__webpack_require__.n(logo);

// CONCATENATED MODULE: /Users/tannerlinsley/GitHub/react-charts/www/src/containers/Home.js


function _templateObject3() {
  var data = taggedTemplateLiteral_default()(["\n  flex: 1 1 150px;\n  border: 2px solid rgba(0, 0, 0, 0.1);\n  background: ", ";\n  color: white;\n  border-radius: 5px;\n  padding: 2vh 2vw;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  margin: 1rem;\n  font-weight: bold;\n  font-size: 1.5rem;\n  cursor: pointer;\n  transition: 0.1s ease-out;\n  white-space: nowrap;\n\n  :hover {\n    transform: translate(3px, -5px);\n    box-shadow: -6px 10px 40px rgba(0, 0, 0, 0.2);\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = taggedTemplateLiteral_default()(["\n  display: flex;\n  flex-align: stretch;\n  justify-content: stretch;\n  flex-wrap: wrap;\n  width: 1000px;\n  max-width: 95%;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = taggedTemplateLiteral_default()(["\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n  align-items: center;\n  justify-content: center;\n  padding: 5vw;\n  text-align: center;\n\n  .backgrounds {\n    overflow: hidden;\n    pointer-events: none;\n    position: absolute;\n    z-index: -1;\n    left: 0;\n    top: 0;\n    width: 100%;\n    height: 100%;\n\n    .background1,\n    .background2 {\n      position: absolute;\n      left: 0;\n      top: 0;\n      width: 100%;\n      height: 100%;\n    }\n\n    .background1 {\n      transform: scale(3) rotate(50deg);\n      transform-origin: top left;\n      background: linear-gradient(to bottom, rgba(0, 120, 150, 0.05), transparent 15px);\n    }\n\n    .background2 {\n      transform: scale(3) rotate(-25deg);\n      transform-origin: top right;\n      background: linear-gradient(to bottom, rgba(0, 120, 150, 0.05), transparent 15px);\n    }\n  }\n\n  img {\n    width: 800px;\n  }\n\n  h1 {\n    position: absolute;\n    opacity: 0;\n    pointer-events: none;\n  }\n\n  h2 {\n    width: 400px;\n    max-width: 100%;\n    color: rgba(0, 0, 0, 0.8);\n  }\n\n  p {\n    max-width: 750px;\n  }\n\n  .github {\n    margin-top: 2rem;\n    width: 150px;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}



 //


var Styles = external_styled_components_default()('div')(_templateObject());
var Cards = external_styled_components_default()('div')(_templateObject2());
var Card = external_styled_components_default()(router_["Link"])(_templateObject3(), function (props) {
  return props.background;
});
/* harmony default export */ var Home = (function () {
  return external_react_default.a.createElement(Styles, null, external_react_default.a.createElement("div", {
    className: "backgrounds"
  }, external_react_default.a.createElement("div", {
    className: "background1"
  }), external_react_default.a.createElement("div", {
    className: "background2"
  })), external_react_default.a.createElement("img", {
    src: logo_default.a,
    alt: ""
  }), external_react_default.a.createElement("h1", null, "React Charts"), external_react_default.a.createElement("h2", null, "Simple, immersive & interactive charts for React"), external_react_default.a.createElement(Cards, null, external_react_default.a.createElement(Card, {
    to: "/examples/line",
    background: "#efbb3c"
  }, "Examples")), external_react_default.a.createElement("div", {
    className: "github"
  }, external_react_default.a.createElement("a", {
    href: "https://github.com/react-tools/react-charts"
  }, external_react_default.a.createElement("img", {
    src: "https://img.shields.io/github/stars/react-tools/react-charts.svg?style=social&label=Star",
    alt: "Github Stars"
  }))));
});
// EXTERNAL MODULE: /Users/tannerlinsley/GitHub/react-charts/www/src/components/Sidebar.js + 1 modules
var Sidebar = __webpack_require__(25);

// CONCATENATED MODULE: /Users/tannerlinsley/GitHub/react-charts/www/src/containers/Examples.js

 //


var sidebarItems = [{
  title: 'Line Chart',
  path: 'line',
  component: __webpack_require__(56)["default"]
}, {
  title: 'Bubble Chart',
  path: 'bubble',
  component: __webpack_require__(57)["default"]
}, {
  title: 'Area Chart',
  path: 'area',
  component: __webpack_require__(58)["default"]
}, {
  title: 'Bar Chart',
  path: 'bar',
  component: __webpack_require__(59)["default"]
}, {
  title: 'Column Chart',
  path: 'column',
  component: __webpack_require__(60)["default"]
}, {
  title: 'Axis Options',
  path: 'axis-options',
  component: __webpack_require__(61)["default"]
}, {
  title: 'Custom Styles',
  path: 'custom-styles',
  component: __webpack_require__(62)["default"]
}, {
  title: 'Custom Tooltip',
  path: 'custom-tooltip',
  component: __webpack_require__(63)["default"]
}, {
  title: 'Cursors',
  path: 'cursors',
  component: __webpack_require__(64)["default"]
}, {
  title: 'Synced Cursors',
  path: 'synced-cursors',
  component: __webpack_require__(65)["default"]
}, {
  title: 'Brushing',
  path: 'brushing',
  component: __webpack_require__(66)["default"]
}, {
  title: 'Custom Cursors',
  path: 'custom-cursors',
  component: __webpack_require__(67)["default"]
}, {
  title: 'Interaction Modes',
  path: 'interaction-modes',
  component: __webpack_require__(68)["default"]
}, {
  title: 'Tooltip Options',
  path: 'tooltip-options',
  component: __webpack_require__(69)["default"]
}, {
  title: 'Dynamic Parent',
  path: 'dynamic-parent',
  component: __webpack_require__(70)["default"]
}, {
  title: 'Sparklines',
  path: 'sparkline',
  component: __webpack_require__(71)["default"]
}, {
  title: 'Mixed Types',
  path: 'mixed-element-types',
  component: __webpack_require__(72)["default"]
}, {
  title: 'Multiple Axes',
  path: 'multiple-axes',
  component: __webpack_require__(73)["default"]
}, // { title: 'Doughnut Chart', path: 'doughnut', component: require('containers/DoughnutChart') /.default* },
{
  title: 'Dark Mode',
  path: 'dark',
  component: __webpack_require__(74)["default"]
}, {
  title: 'Stress Test',
  path: 'stress-test',
  component: __webpack_require__(77)["default"]
}];
/* harmony default export */ var Examples = (function () {
  return external_react_default.a.createElement(Sidebar["a" /* default */], {
    items: sidebarItems
  }, external_react_default.a.createElement(router_["Router"], null, sidebarItems.map(function (d) {
    return external_react_default.a.createElement(d.component, {
      key: d.path,
      path: d.path
    });
  })));
});
// EXTERNAL MODULE: /Users/tannerlinsley/GitHub/react-charts/www/src/styles.css
var styles = __webpack_require__(75);

// CONCATENATED MODULE: /Users/tannerlinsley/GitHub/react-charts/www/src/App.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return App; });


function App_templateObject2() {
  var data = taggedTemplateLiteral_default()(["\n  min-height: 100vh;\n"]);

  App_templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function App_templateObject() {
  var data = taggedTemplateLiteral_default()(["\n  @import url('https://fonts.googleapis.com/css?family=Roboto+Mono');\n\n  body {\n    font-family: 'Roboto', sans-serif;\n    font-weight: normal;\n    font-size: 16px;\n    margin: 0;\n    padding: 0;\n    line-height: 1.5;\n    overflow-x: hidden;\n  }\n  * {\n    box-sizing: border-box;\n    -webkit-overflow-scrolling: touch;\n  }\n  #root {\n    min-height: 100vh;\n  }\n\n  a {\n    text-decoration: none;\n    color: #108db8;\n  }\n\n  img {\n    max-width: 100%;\n  }\n\n  .react-resizable {\n    max-width: 100%;\n  }\n\n  .react-resizable-handle {\n    bottom: -10px;\n    right: -10px;\n  }\n\n  pre, code {\n    font-family: 'Roboto Mono', monospace;\n    user-select: text;\n  }\n\n  pre {\n    font-size: 13px;\n    border-radius: 5px;\n  }\n}\n"]);

  App_templateObject = function _templateObject() {
    return data;
  };

  return data;
}




 //





Object(external_react_static_["addPrefetchExcludes"])(['examples/']);
var GlobalStyles = Object(external_styled_components_["createGlobalStyle"])(App_templateObject());
var AppStyles = external_styled_components_default()('div')(App_templateObject2());
function App() {
  return external_react_default.a.createElement(AppStyles, null, external_react_default.a.createElement(GlobalStyles, null), external_react_default.a.createElement(router_["Router"], null, external_react_default.a.createElement(Home, {
    path: "/"
  }), external_react_default.a.createElement(Examples, {
    path: "examples/*"
  })));
}

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = function (module) {
  if (!module.webpackPolyfill) {
    module.deprecate = function () {};

    module.paths = []; // module.parent = undefined by default

    if (!module.children) module.children = [];
    Object.defineProperty(module, "loaded", {
      enumerable: true,
      get: function get() {
        return module.l;
      }
    });
    Object.defineProperty(module, "id", {
      enumerable: true,
      get: function get() {
        return module.i;
      }
    });
    module.webpackPolyfill = 1;
  }

  return module;
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof2 = __webpack_require__(13);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cacheProm = exports.loadFromPromiseCache = exports.cacheExport = exports.loadFromCache = exports.callForString = exports.createDefaultRender = exports.createElement = exports.findExport = exports.resolveExport = exports.tryRequire = exports.DefaultError = exports.DefaultLoading = exports.babelInterop = exports.isWebpack = exports.isServer = exports.isTest = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
};

var _react = __webpack_require__(0);

var React = _interopRequireWildcard(_react);

var _requireById = __webpack_require__(9);

var _requireById2 = _interopRequireDefault(_requireById);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};

    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }

    newObj["default"] = obj;
    return newObj;
  }
}

var isTest = exports.isTest = "production" === 'test';
var isServer = exports.isServer = !(typeof window !== 'undefined' && window.document && window.document.createElement);

var isWebpack = exports.isWebpack = function isWebpack() {
  return typeof __webpack_require__ !== 'undefined';
};

var babelInterop = exports.babelInterop = function babelInterop(mod) {
  return mod && (typeof mod === 'undefined' ? 'undefined' : _typeof(mod)) === 'object' && mod.__esModule ? mod["default"] : mod;
};

var DefaultLoading = exports.DefaultLoading = function DefaultLoading() {
  return React.createElement('div', null, 'Loading...');
};

var DefaultError = exports.DefaultError = function DefaultError(_ref) {
  var error = _ref.error;
  return React.createElement('div', null, 'Error: ', error && error.message);
};

var tryRequire = exports.tryRequire = function tryRequire(id) {
  try {
    return (0, _requireById2["default"])(id);
  } catch (err) {
    // warn if there was an error while requiring the chunk during development
    // this can sometimes lead the server to render the loading component.
    if (false) {}
  }

  return null;
};

var resolveExport = exports.resolveExport = function resolveExport(mod, key, onLoad, chunkName, props, context, modCache) {
  var isSync = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
  var exp = findExport(mod, key);

  if (onLoad && mod) {
    var _isServer = typeof window === 'undefined';

    var info = {
      isServer: _isServer,
      isSync: isSync
    };
    onLoad(mod, info, props, context);
  }

  if (chunkName && exp) cacheExport(exp, chunkName, props, modCache);
  return exp;
};

var findExport = exports.findExport = function findExport(mod, key) {
  if (typeof key === 'function') {
    return key(mod);
  } else if (key === null) {
    return mod;
  }

  return mod && (typeof mod === 'undefined' ? 'undefined' : _typeof(mod)) === 'object' && key ? mod[key] : babelInterop(mod);
};

var createElement = exports.createElement = function createElement(Component, props) {
  return React.isValidElement(Component) ? React.cloneElement(Component, props) : React.createElement(Component, props);
};

var createDefaultRender = exports.createDefaultRender = function createDefaultRender(Loading, Err) {
  return function (props, mod, isLoading, error) {
    if (isLoading) {
      return createElement(Loading, props);
    } else if (error) {
      return createElement(Err, _extends({}, props, {
        error: error
      }));
    } else if (mod) {
      // primary usage (for async import loading + errors):
      return createElement(mod, props);
    }

    return createElement(Loading, props);
  };
};

var callForString = exports.callForString = function callForString(strFun, props) {
  return typeof strFun === 'function' ? strFun(props) : strFun;
};

var loadFromCache = exports.loadFromCache = function loadFromCache(chunkName, props, modCache) {
  return !isServer && modCache[callForString(chunkName, props)];
};

var cacheExport = exports.cacheExport = function cacheExport(exp, chunkName, props, modCache) {
  return modCache[callForString(chunkName, props)] = exp;
};

var loadFromPromiseCache = exports.loadFromPromiseCache = function loadFromPromiseCache(chunkName, props, promisecache) {
  return promisecache[callForString(chunkName, props)];
};

var cacheProm = exports.cacheProm = function cacheProm(pr, chunkName, props, promisecache) {
  return promisecache[callForString(chunkName, props)] = pr;
};

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: external "@babel/runtime/helpers/classCallCheck"
var classCallCheck_ = __webpack_require__(15);
var classCallCheck_default = /*#__PURE__*/__webpack_require__.n(classCallCheck_);

// EXTERNAL MODULE: external "@babel/runtime/helpers/createClass"
var createClass_ = __webpack_require__(16);
var createClass_default = /*#__PURE__*/__webpack_require__.n(createClass_);

// EXTERNAL MODULE: external "@babel/runtime/helpers/possibleConstructorReturn"
var possibleConstructorReturn_ = __webpack_require__(17);
var possibleConstructorReturn_default = /*#__PURE__*/__webpack_require__.n(possibleConstructorReturn_);

// EXTERNAL MODULE: external "@babel/runtime/helpers/getPrototypeOf"
var getPrototypeOf_ = __webpack_require__(18);
var getPrototypeOf_default = /*#__PURE__*/__webpack_require__.n(getPrototypeOf_);

// EXTERNAL MODULE: external "@babel/runtime/helpers/assertThisInitialized"
var assertThisInitialized_ = __webpack_require__(27);
var assertThisInitialized_default = /*#__PURE__*/__webpack_require__.n(assertThisInitialized_);

// EXTERNAL MODULE: external "@babel/runtime/helpers/inherits"
var inherits_ = __webpack_require__(19);
var inherits_default = /*#__PURE__*/__webpack_require__.n(inherits_);

// EXTERNAL MODULE: external "@babel/runtime/helpers/defineProperty"
var defineProperty_ = __webpack_require__(11);
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty_);

// EXTERNAL MODULE: external "@babel/runtime/helpers/taggedTemplateLiteral"
var taggedTemplateLiteral_ = __webpack_require__(6);
var taggedTemplateLiteral_default = /*#__PURE__*/__webpack_require__.n(taggedTemplateLiteral_);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(0);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(7);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);

// EXTERNAL MODULE: external "@reach/router"
var router_ = __webpack_require__(8);

// EXTERNAL MODULE: external "react-click-outside"
var external_react_click_outside_ = __webpack_require__(38);
var external_react_click_outside_default = /*#__PURE__*/__webpack_require__.n(external_react_click_outside_);

// CONCATENATED MODULE: /Users/tannerlinsley/GitHub/react-charts/www/src/components/ClickOutside.js






 //

var ClickOutside_ClickOutside =
/*#__PURE__*/
function (_PureComponent) {
  inherits_default()(ClickOutside, _PureComponent);

  function ClickOutside() {
    classCallCheck_default()(this, ClickOutside);

    return possibleConstructorReturn_default()(this, getPrototypeOf_default()(ClickOutside).apply(this, arguments));
  }

  createClass_default()(ClickOutside, [{
    key: "handleClickOutside",
    value: function handleClickOutside() {
      if (this.props.onClickOutside) {
        this.props.onClickOutside();
      }
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.children;
    }
  }]);

  return ClickOutside;
}(external_react_["PureComponent"]);

/* harmony default export */ var components_ClickOutside = (external_react_click_outside_default()(ClickOutside_ClickOutside));
// CONCATENATED MODULE: /Users/tannerlinsley/GitHub/react-charts/www/src/components/Sidebar.js









function _templateObject3() {
  var data = taggedTemplateLiteral_default()(["\n          transform: translateX(100%) rotate(180deg);\n        "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = taggedTemplateLiteral_default()(["\n          box-shadow: 0 0 40px rgba(0, 0, 0, 0.3);\n          transform: translateX(0%);\n        "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = taggedTemplateLiteral_default()(["\n  position: relative;\n  width: 100%;\n  max-width: 100%;\n  padding-left: 300px;\n  margin: 0 auto;\n\n  @media screen and (max-width: ", "px) {\n    padding-left: 0px;\n  }\n\n  .sidebar {\n    z-index: 1;\n    position: fixed;\n    display: flex;\n    flex-direction: column;\n    top: 0;\n    left: 0;\n    height: 100%;\n    width: 300px;\n    max-width: calc(100% - 45px);\n    border-right: 1px solid rgba(0, 0, 0, 0.1);\n    -webkit-overflow-scrolling: touch;\n    background: ", ";\n\n    @media screen and (max-width: ", "px) {\n      transform: translateX(-100%);\n      ", ";\n    }\n\n    .toggle {\n      appearance: none;\n      position: absolute;\n      top: 5px;\n      right: -6px;\n      transform: translateX(100%);\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      width: 32px;\n      height: 32px;\n      background: ", ";\n      border: 1px solid rgba(0, 0, 0, 0.1);\n      color: #555;\n      font-size: 1.2rem;\n      border-radius: 3px;\n      cursor: pointer;\n      opacity: 0;\n      pointer-events: none;\n      transition: all 0.2s ease-out;\n      transform-origin: center;\n      outline: none;\n\n      @media screen and (max-width: ", "px) {\n        opacity: 1;\n        pointer-events: all;\n      }\n\n      ", ";\n    }\n\n    .header {\n      flex: 0 0 auto;\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      padding: 0.5rem 0.7rem;\n      border-bottom: 3px solid rgba(0, 0, 0, 0.1);\n\n      .link {\n        font-weight: bold;\n      }\n\n      .version {\n        font-size: 0.9rem;\n        font-weight: bold;\n        opacity: 0.3;\n      }\n    }\n\n    .scroll {\n      flex: 1 1 auto;\n      overflow-y: auto;\n      padding-bottom: 5rem;\n    }\n\n    .list {\n      margin: 0;\n      padding: 0;\n      list-style-type: none;\n      .list {\n        padding-left: 1rem;\n      }\n    }\n\n    .item {\n      border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n\n      .title,\n      a {\n        display: block;\n        padding: 0.5rem 0.7rem;\n      }\n\n      a {\n        color: rgba(0, 0, 0, 0.8);\n\n        &.active {\n          font-weight: bold;\n        }\n      }\n\n      .title {\n        font-size: 0.8rem;\n        text-transform: uppercase;\n        font-weight: bold;\n        color: rgba(0, 0, 0, 0.5);\n      }\n    }\n  }\n\n  .content {\n    position: relative;\n    z-index: 0;\n    padding: 1rem 2.5rem;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}



 //


var breakpoint = 800;
var sidebarBackground = '#f7f7f7';
var SidebarStyles = external_styled_components_default()('div')(_templateObject(), breakpoint, sidebarBackground, breakpoint, function (props) {
  return props.isOpen && Object(external_styled_components_["css"])(_templateObject2());
}, sidebarBackground, breakpoint, function (props) {
  return !props.isOpen && Object(external_styled_components_["css"])(_templateObject3());
});

var Sidebar_Menu = function Menu(_ref) {
  var items = _ref.items;
  return external_react_default.a.createElement("div", {
    className: "list"
  }, items.map(function (_ref2) {
    var title = _ref2.title,
        path = _ref2.path;
    return external_react_default.a.createElement("div", {
      key: path,
      className: "item"
    }, external_react_default.a.createElement(router_["Link"], {
      to: "./".concat(path)
    }, title));
  }));
};

var Sidebar_Sidebar =
/*#__PURE__*/
function (_React$Component) {
  inherits_default()(Sidebar, _React$Component);

  function Sidebar() {
    var _getPrototypeOf2;

    var _this;

    classCallCheck_default()(this, Sidebar);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = possibleConstructorReturn_default()(this, (_getPrototypeOf2 = getPrototypeOf_default()(Sidebar)).call.apply(_getPrototypeOf2, [this].concat(args)));

    defineProperty_default()(assertThisInitialized_default()(_this), "state", {
      isOpen: false
    });

    defineProperty_default()(assertThisInitialized_default()(_this), "toggle", function (isOpen) {
      return _this.setState({
        isOpen: isOpen
      });
    });

    return _this;
  }

  createClass_default()(Sidebar, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          children = _this$props.children,
          items = _this$props.items;
      var isOpen = this.state.isOpen;
      return external_react_default.a.createElement(SidebarStyles, {
        className: "sidebar",
        isOpen: isOpen
      }, external_react_default.a.createElement(components_ClickOutside, {
        onClickOutside: isOpen ? function () {
          _this2.setState({
            isOpen: false
          });
        } : undefined
      }, external_react_default.a.createElement("div", {
        className: "sidebar"
      }, external_react_default.a.createElement("button", {
        className: "toggle",
        onClick: function onClick() {
          _this2.toggle(!isOpen);
        }
      }, "\u21E4"), external_react_default.a.createElement("div", {
        className: "header"
      }, external_react_default.a.createElement("span", {
        className: "link"
      }, external_react_default.a.createElement("a", {
        href: "https://github.com/react-tools/react-charts"
      }, "React Charts")), external_react_default.a.createElement("div", {
        className: "version"
      })), external_react_default.a.createElement("div", {
        className: "scroll"
      }, external_react_default.a.createElement(Sidebar_Menu, {
        items: items
      })))), external_react_default.a.createElement("div", {
        className: "content"
      }, children));
    }
  }]);

  return Sidebar;
}(external_react_default.a.Component);

/* harmony default export */ var components_Sidebar = __webpack_exports__["a"] = (Sidebar_Sidebar);

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("react-dom");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/assertThisInitialized");

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// Imports
// Plugins
var plugins = [{
  location: "../node_modules/react-static-plugin-styled-components",
  plugins: [],
  hooks: {}
}, {
  location: "..",
  plugins: [],
  hooks: {}
}]; // Export em!

/* harmony default export */ __webpack_exports__["default"] = (plugins);

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("/Users/tannerlinsley/GitHub/react-charts/www/node_modules/react-static/lib/browser");

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "notFoundTemplate", function() { return notFoundTemplate; });
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(33);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_plugin_universal_import_universalImport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(34);
/* harmony import */ var babel_plugin_universal_import_universalImport__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_plugin_universal_import_universalImport__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Users_tannerlinsley_GitHub_react_charts_www_node_modules_react_universal_component_dist_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(14);
/* harmony import */ var _Users_tannerlinsley_GitHub_react_charts_www_node_modules_react_universal_component_dist_index_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Users_tannerlinsley_GitHub_react_charts_www_node_modules_react_universal_component_dist_index_js__WEBPACK_IMPORTED_MODULE_3__);




Object(_Users_tannerlinsley_GitHub_react_charts_www_node_modules_react_universal_component_dist_index_js__WEBPACK_IMPORTED_MODULE_3__["setHasBabelPlugin"])();
var universalOptions = {
  loading: function loading() {
    return null;
  },
  error: function error(props) {
    console.error(props.error);
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", null, "An error occurred loading this page's template. More information is available in the console.");
  },
  ignoreBabelRename: true
};
var t_0 = _Users_tannerlinsley_GitHub_react_charts_www_node_modules_react_universal_component_dist_index_js__WEBPACK_IMPORTED_MODULE_3___default()(babel_plugin_universal_import_universalImport__WEBPACK_IMPORTED_MODULE_1___default()({
  id: "../node_modules/react-static/lib/browser/components/Default404",
  load: function load() {
    return Promise.all([Promise.resolve(/* import() */).then(__webpack_require__.t.bind(null, 32, 7))]).then(function (proms) {
      return proms[0];
    });
  },
  path: function path() {
    return path__WEBPACK_IMPORTED_MODULE_0___default.a.join(__dirname, '../node_modules/react-static/lib/browser/components/Default404');
  },
  resolve: function resolve() {
    return /*require.resolve*/(32);
  },
  chunkName: function chunkName() {
    return "node_modules/react-static/lib/browser/components/Default404";
  }
}), universalOptions);
t_0.template = '../node_modules/react-static/lib/browser/components/Default404'; // Template Map

/* harmony default export */ __webpack_exports__["default"] = ({
  '../node_modules/react-static/lib/browser/components/Default404': t_0 // Not Found Template

});
var notFoundTemplate = "../node_modules/react-static/lib/browser/components/Default404";
/* WEBPACK VAR INJECTION */}.call(this, "/"))

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = require("hoist-non-react-statics");

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = require("/Users/tannerlinsley/GitHub/react-charts/www/node_modules/react-static/lib/browser/components/Default404");

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = require("babel-plugin-universal-import/universalImport");

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = require("react-hot-loader");

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("react-static");

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABLAAAAERCAYAAABrWV4jAADS1UlEQVR42uzBAQEAAACAkP6v7ggCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIDZsWMbBmEggKJnA3t7DVbwEizAThdihCK6FEmK6D3pF7Z8lbsDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgK/KLLfiiJ/KiJItavaYRi3m3I5e55oZ/gUAAAD4eyV6TrHuy6j3KTLrUbm9aa2O+7bN19sxlxZbn5IZNddYnl0Lqjdmylhq7edMAAAP9u4mNI4yDgP4kzTQLxCtFxEEPw6CeBFBi4jUU8WDiEhvoqCNIh5EvfRQ3KqgXjxZofVQEJqdnbZJMxM3SduwrWC96KH1Y3fS1PQbFC9SWmyyu3+f/Q8v7kINYkl2t31+8PDOTmZ3JteH931HRERERG4aceyllRdTNyqUWnGsAuW/CuVTAUNeWC1RVrX+5gXVHqyxFOusjNWt7/7rteH3RERERERERET6tbjymVPt9syvQVy7D6W5pzGSvYbi7HsYqe5AsfqZJ6p9hGJtO8e3Uapt4bkncGD2fnx1Yj2oQ8EGUbEh8D5adnj9ZYE+u6qCIVyHjeNu5ilL8Iql2MZ8zs/7+DllDjFHmUkm4vndNoHtPN7C40dsGuvRpnUPFVkiIiIiIiIi0j9YLHXMkNr1/ToWUZtYTH3IzDBnENWuIJ4zHDxvGL/YmeSSYfSs8bomitmfHM+x5DrG7+xEVB1m6fV4KLQCn93FssxH2ID2ssKqMHMqsFHcaRPYbCk+YMaYXyzBZfsaZkeYmaXj1ySePyzFNxx3cHwSbfy+0F5ZIiIiIiIiItLre1wFY/O3I8reZAF1HMXsKsbOeUHl4/5fjX/LS6qRWoNj3ePHHkN8ynBg3sL3PPFpy0ut6neIap/y+mew9+Qd1y3QzAZuqSWCeWk12HF+ChssxYvMbuakJbhmh/NCyscpZoJJ0GTqzCKvW/CM52N+jknQ8LJrmjnCHPLvXbEU48yz7UsLNRtLRERERERERHr1TYKDCMfR7DCi2knsY1F18IL5GGVNFk+LLKcWmNbYYJqeKMQ/h9TD9Rzz60uzhv3z+cytMSbi74zwPlH2MfZmj6Fj9o8N+J5ZnJV1CxRXnbOtEmy0CXxiKX5k8sLpMFNmEo8XVT6Oo8GxydhSCSVX+J6fm0SYmdXg+VHe82Egp43eRURERERERKRneHEVxLUHUcxGsT+fOYUoY7ysYrIGR/v/8SWFdf+tyNNEPNe6TyizLjNllLKXEZ/fgHYVG7oZZmQtte+Ub7o+gRcsQcpc9cLqEMIMq0b7TCrGbjThN5m6z8ya8XO/WYo32p8RIiIiIiIiIiI9U14Va88xF5FcCoVTmGVly5OsgbzQYrzMypcZsjzj5xOIsndQnLunfZaYF1l9zmdcFTDUsUwwwbCl+NbCflZlhIKpngdNxpYhncsPp5CXZim+aL3NUCWWiIiIiIiIiHRXoaO8ehVR7S+fCcUlf6G4WrGEvbTy2V6+xNBTzE4jynb4mw+D2FZ5+nG54C4vhZyVcZul2GoJfvDS6AiTMgnqHcsCVyqp32/Rn2HGP8etZ1SJJSIiIiIiIiLd2/MqiKqvo3QqzHy6xliX0wx7ZoUN4Hl8GiPVbYh/vqv/lhV2FkCtEssSvMQct6m8uArlUVge2OXU/Tkq/lyjVsZq7YklIiIiIiIiIivO3/IHKmXP+4wrllcsiBZ4bD2UJsNnyupeZI0yxewnRNW3EB9f2zEjC71ZZFkBg+3Fj6XYZAnK/+w5xYxjYYnZVt0tsfJn3AnkzPR2QhERERERERFZCWEfqXjuURZEv2P07BLlVQ8VWRFHLiv0si3KjmFvdXPHckhjemi5YMesq0nc2yqCmCteCk0gFFcNxno0dUs5TvvzvovwfzEQEREREREREVk2Ye+oyvwalkJHkW/Y7uVV7ydr5EVWZjh4wfLj2peITj2AoFDp9rJCX2rXXvJYiq3MGV8qOAkLb/5jrA+yaFM+XmY2aj8sEREREREREVleZgMeUCl7n8vywuymBmN9k7DZe3hrYTE7j2h2GEGhMOhFXbf3uirjIUtwwEuraYS3Ci4y1mdZzPfpQsVirNV+WCJ/s3cuIXJUURj+RzMjJuhCwWwEHwGNKNGAj4XRjYpZGNCo4Ep0oRKfm6iLbBpRFDcuIsjgRoLpqkwmM+mpmc705DErleiIRJl0VQ8zMSYYH/GR+IhMP65nzuVg2SRkpro6q/+Dn7pVXX3vre3POf8lhBBCCCGEENI9+qd69Romd4h+w65vnYal59Pi10RRFCRNvQ9F3a/IakCkLZC7jjhZcxBh7ab0917IrCvRMtg4wotuBD/60/y8CdT9nCudv6FrRZhXWbVXJ2uX0NTrhN5vpoFFCCGEEEIIIYSQ7pDOhwribfCtg/XsRlPSsIB1vd9RE804hIkaWv655mrNq7Elz7qYj1XXsf+mEwjjTRlOKsyn6moYq1yEnWr2VETdPVmwJaprlpa1JI6JxtVs8qr4Z7qHKHtYvP53r45nXBlXs5WQEEIIIYQQQggh+TM56c2GILkPQfw3ds6qgZXJMNL2vVk1jLSFb+ioN7Dkd513+Jh/Hp3QrCpt9dM2xWpdja3umFk+H0v2opVlYRJg++FrYHSppdD1oxc2HsXjLsKsO5BqvetWlZWZUeNwut5+UUXkn5+U6zFXEkkVmLUA2qmHGfO3mrrehK5RYKA7IYQQQgghhBBC8mVg4GIYYfyxGEtZg9t9JVXpuIyTMzKuiN5AMX4axeqjCA4/gjB5QvS83L8t7wzJet+I/hEjyxteO+esaqohyr0yy0Leda0wjmUfG9ImXjdOGXQVrHAjeE/k3N6uVF21dD5rBdwDb1pVRN6smvTr41k3igddCbfLOze6Mdwguk3u18s7r4o+UcNrT0ZzrQSrwpqVOa5lFRYhhBBCCCGEEELyo+CNG4TJrQjiXzB4ZOnVVz7fSqut5L6MYrJO2/POx7ZDV8n/7kFQ3Szrj8l/f9fw+OFjWrXl541zrspKGvp9u2WNUNsk38TAdF9epxSm859chNWiA1rhNOZNnryrrVSjao55RfhJNChrPSPPb3Gf4lIsAhdhuegVPVFwPJOJ1RSZcfYSLO8LrMIihBBCCCGEEEJIVuxEPiNICv7UvrixtOwrDWY38+oDtBtXzumpfyZbsx39rRivgTezPtM5dx+3qqymqJ6fkaXzzGtLoxhZarpti6+z0xi1Kq3TvKsID7sRfOdb89DKuWWwoRqT8T5YEPwXcn1NtPqcQfJiri3s8X8qiBx62vb9R5ZKLDXo/PdOLhhiDHQnhBBCCCGEEEJI51j208D0FQiTr8QwWlr7oDe6Gigd96f8FZw3p6Zc77nNKtejz/X3yWVnNYui75cjrD2EICmKTsm+fHZVMTYjy+UiM8XUuKvWNAMs1VKYOe9qBFvUYJrIvWWwofOVzbjSucuuhI0LrYrtbYxqWInOUwml77bt/zldIxKVFr93M9V0j6O4nwYWIYQQQgghhBBC8jt9sHj4ATVyfNh6c0mZUtLyJ9c5bK9dD2+K9WXYR4/uRcwsHacZSO5EGH8IaW9Uo2xwzqVPOMxB3hQb1pbCv2TeF2D0T/UuKe+qjMtdhI+0la/sjRy5b+XRLqjVTaPwYeuRzjskz9af1bRyuGhh3FEF2Qi2u/2ZWgnr7oDu8d109RcIIYQQQgghhBBCMplGRhC/k6F9sKmB6D4z6+VUnlZPx/sq+LZDpAmm18p6/bLWnxrCvmNGjaxc2gr9N8+LOea/J0y2ouwuOZ+JZW15Oi5jleZd5X/KYF2roCxHK8Je0QakaDOtOsJNoVevJayVtX9eah6WnnS4T8cHZY7LWIVFCCGEEEIIIYSQ7Fi7X+WHFQiSgxZqvnjjp1qHz486hKHqlRA0/ypvk619zh21e7Vd0WdkWQVV59VY9k1hzcGbeSUU51ZaO6Hupd00AvSZi7BOlPiKJTSs7a5DtdQM2gOruvpa9KSs25duW8y7uik9n6z3vn2TaFGVZPrt3mg7I+O7aWARQgghhBBCCCEkO5Y9FcysRRif1kDz4qLbB/8Lbg/jLZan1dVqsfZKqLC2UfbwpZhN1lZYt0D5DtWAzKNVXmHyOYozN8MMP9FZThp8zI3gV59JhXkzejIrQssMI28e4bToLVfCygzGVfYqLDPmZP0lBrq3rGJMxq/DWhsdTyMkhBBCCCGEEEJIZgOr9hS8AeQWawBppZZvHTyJwXiNtdpdkFMTbR0Lnw+qBdnHKc3Hsr2FHbcVNnUeX4l1NB3uPj1Q6LOxK2GTmlYT/gS+HPKumqK6GkYTel9xY7gL8FgoO7qMc7jIri7CuGVhZcjBGmAOFiGEEEIIIYQQQnLIv6puVaNGq68WZfy0NEBdWw6TsbS5dCFPT1QZQfwve3cXImUVhwH8P36s46obIipiXbgK0UVQKFjQh3QVXZhfKdkXzror0Td9WBTVTUFgFxVktpSxuTuzq5u7zuzsjtu6mFQEBintzr67ZpsoBEWapG7OvPP05xwODlPW+47SzsLzg8OZFdd5Xy8f/uc5yzRwyuhE2NWcxrK9WLbc/az+exukCJLyCroE6BY3eYUrWO5GwQLs5NJppOQ5c1ywuGD9f4TX7ffpszyDntA3ErobGAf1feaIAhhgEREREREREVE5/VeHMVVDmkMa0kD3fNjjg7pvFTfNNR5ciOXeJZF9UeLeGbHdWAUzRXWF5e4RDbGkfRS1+v8ju0c3CySClGxDpgbougpl7UnbdYW0AL3mz/qQkqXFwdV4TC9hh7gy92W6zqBboHs+cA9W2nw+hw5Zzh4sIiIiIiIiIir/+GCbt1Di2Z80oAkRYHl5aTsG3S/o765wtw+O6zRZ8ffHB5ZLwjtoQizznEMXyw2wJtkdi1sGc9KpId9HA+ezLzz/FToEyFQBndHcVTky2GsnsHS9iX6JltxwOC7cxBSSUm1uFLThWj7EewG2O6uOARYRERERERERhecCn7aRW12BuwmmApac2+krb0R/f66IAiZVRCjnJsuajsyQhPe2ed69J1yIVSgnvKptHoS+J+TTwfyXj3wISD3OPrsSYx2TzW17hY5oWeFVSVH7MFKysnjqarxLz4u/H0nZjl5xwVQhcJG7fbc3XCDHInciIiIiIiIiCq4fNsBqGb7fTCklhoPdQJgo6b8CIkX9VxWg5LZC7a3S5z6hNwqa9wsa0kXsjkUmvBqG7MriQKwRkLU+JJa7KFsKp5++V0OsqSgzxMqhS3fbd5VESmpFVdqkkuvdQkoeRSZUD5a9SdG+X7OIxQCLiIiIiIiIiMIfIWz1XpLPTsB1WwUqNtcgyJS+J7xt7gifWZWkv+hIYWL4Bol7fSbESnim4D1UeNWcRW/9x4CsB6bUwZ9XD0gMeWnAb4+vxtjeWbYLqyMavO+qR4CU+fktU9Re0nVVcQFWWu7S5x+D7fzKhyxy/xppmcabCImIiIiIiIiovBsIE9l3xR6xKwS+gTChS48QSkv2iUthGCIVWVTvSt4zP8/QIOt92fMjZPdxSDybCxpe7W/YacOryTH4M+oBqUOhJqY/15kQ6/cta/Bn+ywgbUKsQH1Xup9GlzxUUphecdw0mD7vIl2n0BMywMqYfRQ9soA9WERERERERERUZoDlxaXD3EDoBwywfGkdtkcJW7xVAfqvKuxI4dCTui7o1JkLsQr/Fl5lXHgVceFVTD/X2RBrpn6eprs04NymNcjtuebyIVan+EWdUCNIye0lU04VyU1MoV9mIilHsT9kgNVt9l/QJTcywCIiIiIiIiKiYEr7quJDfdJxMugNhKZHyha+Z89pd9ZSN4E1IUrrnVbvHn2XU/YYpDlO6LvwarErbN9VdGxw0t/DK7cXqnWfZUOssY1rkW+dA3TbEAudl4Ics9vw6iDSstjd8gddoio+wNJdnz0NdxNhMlCRe94Eekn5A11yh7iwjoiIiIiIiIjoP7mJqbaBmRrgHNYJrMABlilB33McGmT9Ks1HaydMgOWe002fxQduloT3nfZiIRK35e5LmrPutkEc2NRYcmwwpqvuH1chqvtsG2Ll1qxDoWW+DbE6TYiVQ0qAXhPkxJGWmrC3DFbMTYT7pBGfu0AuQIDVKT5S4rq/VjHAIiIiIiIiIqLgXC9U07F5Eve+1w6sEAGW/r32Uej+gwY9CyZMgOUAETeNNb3NW6gBXo9OYuF6fTfZfcyXpgF88eB2QNYBVXXwq0vCq8utKl1zdEkD/LvXA59cB3SLj+4okIkASXnHTjOV9l1VfoDlQixTON8XMsBK6t5jPscYYBERERERERFR+ACrfeRaDaKGtZA9VIBlAq/E0Lc6gTW7aKJrQllqe7FkftORGTc1DzRL50lU7TyKb9a/VzDhVXUd/OkBwyu3puiaGzMhFm7Z6KNxCdAt57Ev+mppWfsEC7Bs8LZPXkafK6MPdITQN3tGV1KeYgcWEREREREREQXXbyeQpG1giQZSo6ECLO2MskcOvUPSpDf7udv+JqD72gaq3OcNOw43Zh/4AJDVPmo2F/xoyPDKrYiueSbEyuO2h4HX7txxqU9qRVQmGIhEXOiEpDyGjA2nQgVYtvh9KwMsIiIiIiKiv9i7n9C4qiiO479p/lQxG9uFUBAEXalUunCpZqGI4EoNFS1V+l7apK4UFOlCg4LiQl0IoiCKaDPTWNsm0z9UYwOCglhBhTIvprXaUKtduKmCJDNzvMzlkoubvJdiZh58P3C4p5AGsv1xznkA8pszH2BNLtymanbJrQQWmcBa7hx9r2WnNPX1tSHAKmUwo5E+3999o2n7rOkJs41pqzWYRgfbC1T885uSVmcSS6MXTekOyTNN9KtkogmsJ/1Rdh9OFQqw6npR4Sg8AAAAAABA7gCrNn+HqtllfXq+WIA1fdG9jZM6bQNlDLBMExvMle+Tbe3rRhumMbPBtNkeSKMw6iprKGnapj1mGzv/fq6sIZaFCaxp7bBjhQKsttVd+QDrVYWVRKkiAAAAAACAfBNY2VZVsz/WEmC5/3vM39IqV4BlGu5f6dP7TMmiaczabvLK+pJ2jvCq6FTWsmnU/DRW8pZpZDCEWGUJcqIVwu12tFiA1Sm/QvjGyk0tAiwAAAAAAJB7Auvs7ao2fl/bBFZ2Qu+eLtUElmkiDq92urrSmbxSsmTa5cOr/6XSZVfuHTf3HnF1gxzTSJ+fBCtJgDWjh62+xgCrrteZwAIAAAAAAOt3A8t9sc+9szq+sLEsAZZp90AUXu0zJWEqasmVrUM1fUi21/Xpd6ZkW3yLqyQTWI9cRYD1GgEWAAAAAAAoHmB9fOZWTWa/reWIu3vnNLXY80fcTVYJk1emvUOm9D3THvNrfcmyK1vHavlprHFz/SXXPxRPh5XgBtbjBW9gtaIbWK8QYAEAAAAAgPwm5nxYUlu4WdXsFx36NX+AVctcgLVorv9KU5eHejfACit6qvg+ucXVKdN4tNaXWBeq7ae+9oTVwufl5LiLVfavEL4cvkJIgAUAAAAAAFYXjq9Xsy2azDIduuCDqXwTWE0dvuDe+R/0YWOz5Jht6O17V7seMCXnzIdXLVdNV9blWupMgfkg6yPTU5sVfyGxR5hUiQKs3XZC5t7CAZZ7XwgBlgAAAAAAAFY1NeUDrP0/Xq9q9r0OLxZZIWx2Vg5r2c+dACz8vp4QAqCRvii8etaU/mMaC1NXLVfWExVWGH2w9q1p9M5eWyk0qRIdcX/aPotuW+UNsE66qusZhXVEAAAAAACAVYWVvw/OX6Nq9o27aVUgwJpv6uB5c/1lVRs3hQCrB6eutpiS/f+5d9V2ZT1WzU75gO1P16fx32OyirrITJUwNWXTmrAvZO5t5Qiw/M/VFQKsVI7NqV8AAAAAAACrmohW1GrZnKYLBFiTWUufnHN944rrt3Y/wApf8ou/Mjh6vyk5YxqPQyLr4Wr7gG23+UreMe3cvPK3DferS+Kj6zajN9cUYB3r9I8SYAEAAAAAgPzMKlGAddBNYPlgqpq1c4RYLR1YMPcu6cBP93Y7wDINhyml8JXBl0xJoZXB3lopTMNK4WnXD0ueuYDOpEo3AiyFfkbv26zMvc3cAdZRhVXCBwmwAAAAAADA2gKsava2/A2sdr4Aa76l2rz5EKvxWDji3p1bV/HKYHqXKfnSNBZWBpfCymCpKhyZ9yHWX6Z0n2lkUPF9r3UUH123GR2xz+UDrHquG1hNO955/3Z1DwEWAADAv+yda4hUZRzG/0fXW3QBUTSwD2JUhmFphF3MBcsQ3FjX9UrQsjM7bhsVVqBR0EaaXyIsyIjS/JA6juttxnU1NzfwS0FFCbY7hvcLJKmllbQ7O/+ec97z4nDW2jPbjuOuzw8e3neO4+Cci+e8z/wvhBBCCOlZHawNrW/J1uNXzCmM3SjraZvXufClKxFY6hSnSHtkOLQcumhMn+qsH3mlfVhZY8DFbJfCvXj9UG7UmbsfrqWBpS0yVJPyjTWwIA1lYDVhTMlZ3SkTWMSdEEIIIYQQQggh+VHfUiIAptXz1sCCQhlYXrrhjtMq8fRKG9Hl6hoaVzbqqlIl8oNKra0d1V6wlMHidym8oBJdplI1tEv6ZAFR9Q2slIzQpBzWPXkaWOb9R3WHjKKBRQghhBBCCCGEkPxo0RIBMKPmeemAmw4p5iEjsNIZv3PherEUyMByTatgEXOV6sdUIlsgNeZVJBB11a/Uab6bjcaK7MfrJ4PdFwtVH8saTrpTxmtSftGmPA2sL7zxe03JTWIjugghhBBCCCGEEELyjMCailpWf5jOgulQnQihDFIIMab3S+LgYJuS2PvGVX3AuIpOhj5ViVw2UUnRQKH2fqmAQVdrI7M+VImN61ITrJexNas0JaWalL90V0gDy9TIyvgph02uEUYDixBCCCGEEEIIIflhOwcmjo2FIXVathxVjCENrHTGTzs8LImfR/ZeIXcbTVQaNK6mQmv9Ole2SHvGGlc3kDqNeVWjvoF3Cq9fwzgqGLHW6wbWDnnGM69SprtgiOgrY2A1e39nneR2NSSEEEIIIYQQQgjJq4h74uDNSB08gIiq/AyszUdU4m3nZOPBB8zn6MCem1biuMYVNODKtiXDVGqeVoluUon8qVKnKrGciKvidxgsfqfCxX5EVvQA9By2DQ8aWSri9FINrDf8dEAonIHlGV1fevPlNvqKBhYhhBBCCCGEEELCU++bRaqOxNONsu2kMabibdluDSzUyvJqZsXT0KEKW1OrB6bVgK7RVlWjVaprVCL7oE5jXNXYtLkMpBRk5Jt5tdbc+xav66DhufvZmFnqSJ7kmk2alLW6V6x5lQ1hYBmTazeUkhoWcCeEENJ/4Y8zhOcwIYTXHyGFIVh0Pd62Gl0F/RpYIQws263QRG0ttSmJ4U0rGCoYJQeVxRNVIu9AP9kUOTNG2mlc/aey/j7y91lMTWfG6DJorORg93uYqKxgvSpNyT5tzquAe6c2emOHpmQGDSxCCCH9jXr8GDh37tyBXHyQPozDc5gQ3kMI6QOoI7ZuVTz9sm9GZUMaWFmoU7afxLz1s+46Ef67aVV9i0q0wk8TPKdSq0ZRGlc9SytsN/uu1nYsPAGtUolNChqJ9niE6kDYKKM1KW1eCmFKOkJ3IGzyxvOakntoYBFCCOlviw7+gn7d4thj1BPVmywF5wY4h/lcRkgRcK893kMI+T+F3De0lnmmFNICMXaG7kS4/ZQ77peWlpJgJ0JjkpSWuJIAKrH7VKKvQ9/5houNHGKqYC8VejdzWyMr8rtKdINKbIZK/WABYWpl6ccyyE8fnAJd1Ka8IrAyuscbWzUlIwSosgNhkXH6onhDJ4RcT4uO0lLzXGOZP3/+lDlz5sxzDQEuQoqGY49Nb0Yz2M/0j7nTj8/hu3AOP1tWVjaC5zAh19a4qqysnI7rr4xGFiH5GFjxQ+NhRJ1HYXabRqgh5HUidDa2HZNE21hjYLW4RsgAldggE90TrG0VWQQ1QBcC0VZ+UXKMNKB6Q4F9alIyzTz6FV6/gPmdXaOycNxgaF21A2GjqO7My8Dq8Au471L7OfU0sEjPfkW3vxTbB+9YLDbIFcOuCSHFWvRjwfEgtBrqhHZz8VGc4+LeC0Su/nzh/llFRcXt5eXl4/DeezGfBD2K4/WEu2iEpmL7w9D9/ntGms+zdP08cx70j3N49uzZE7AP3sb+OA+dwL4ZI4CRWYQU/vrDtmm4/j7HqLj+1vAeQkgYVG0nwuESRyfCrfl0IsT7Nh92x/Y71rc+JSDxXmKYgEAnwWkq0XdVIm0qMbXdBK3Bwo6CBVcWyhhFjZFlorLOQGtwfGapxG7rEpU1GWZWwjzAaFJW5NWB0BpY+7zxfQE0sEihHwxoaBFCCmaQ5IBF/uNYbKyDLi1YsEAXLVqkmDdw8XHtsJFWQXPJNamwIJyF4/Giby7uxeuDGI9DZ6FLUAbb1BXm7tiO8TfoGPQj1Ixtn0BLMS93o5Nmzpw5JJh+558XTl9cOOO7PYLv9hH0K76fPYdbXbOPBhYhhbv+8H9HCa6/me49A/rbvYcsXLhQse0DAcw8IKQbclP+EHm1VZJnXEOqI4yBNQSdCEdjvLvhiN66Kb0kUNvKLcj+KrQPumxMq1rNTRGkaVUMI8umF1ZnTXphnd3+tZ/SOdmLwAqg24c0aLOTT/RVVlPQHsx3SK3taKjK/5CLgGMf7HGjjEGr8IC6AuPK6124ma+A3sR8Gf7Nr2BeBy2ApuOBeyK2jamqqhoqXXHchwU8JNAwJf+wdyZAVhR3GO+3K/cCcomAsKh4xJjLqKkcpalURRPRXUXBAxaX9e0uaBRLV/YAEQxSmopXTASFxMQkXJ4slxJQvKIR2KMQWFg0KipHiRJjhH3HfPl6prvoGhflervvsf+v6quemZ2dN9OvZ3r697r/LRIdcnygUKMji8+iC+l59B7d4DC/mjdpAMD0KQFYKZf7bLeNw07M+x+wXihjupT+iIb+TmzDUC+PGDHCN/cH9w3b386/+/vyf/z/pS3k2mqg1p3c72cjR47sphzZ4YXp3nDmst9wpudqkMfr9K+Zy3tNupHX3F8Alkh05O8//b56OcX7bzGTpIFW4HLM3H8PSR0iEh3sTITzN92l7EyE874cyD2b7jpnI/rQg+neep8FW5Jq6U6oeY2PQ6l+UGOiXqfiZwhIdhCQODMJRuMGnKQ/tIqk4BjpZ898J7FQr6xd9GJuuwE/LPyWAU+d8Jyqx0oNo9rHsfAYpllAdeSrZyBcbNJF6qcSwL11K1ADsDqzolwzevRo+2KfcTYVvPb/6I/pRvp5+mF6vO4VwevtHr5+6ZUlEokONvC32+jXvXDoarrJAVdx4ySfqboh8rQ0PlJel2XZddYJA5n3t9Ev0p/yO7D1hG0Ueub7ienUOGGcbMYJZ/8m+93qY9ljG1D5Bf06t1dx+N03wjG40iUWmHsuBQUFXXjOV/Ocl9Extwzb6zbX1iAASyQ68vcf308LeO+t5D0GF1yZ+88z99/vpQ4RiQ50JkLbC2t+wwh/SOC8TbAzEWbTPQmr+tED6K5cVwsaoZ7U+23G+bNqvAemLUftVQ8SfBS+48OqrOvtDHienUkws4BV0b7lbLp9FOhCH1sM9KL7GPeme9A5UaADnR06Bp0hQCtBxwK4aKFjCa+xaCfX/4Krrrgbjw3ajaUKWGZmFlxEV2uQZZ3VbAB37rcVz6iTBWC1PsBiYNbO+kXfVJJ77Qv71zjppge6v7t+kMdMGje3zaPDv5SH4dbnGtLRM/iycBn3y1H7JLMtiUSi/crG2nN/Ldc9PvUQNDrJ54xt9NtGB2hPAFbLzpTH/D6Jnsr8buRz333+exZWuXXGYdozx4oZJ3kuLszaxvOYqXsEu3Vua/X+Dc+cyIZyb57jOJ7jP2mEynCchnHclGEBWCLREapD9A+qvLeK3ftPp+E6RACWSHRYMxE2fJu9r3ZHCLH6zGlIDDLQSs0z0OqJLT60Ond2Le65azleKnoU28+uhKcKPKiRQNZYIOIHZE//3lYRYxdYZUeBnsXAoNLAA+kBJUBfbuse5f4WSo1xzPVu/N/jivW+wf/Y/+/N9XZR+xmhz01Le3Q8cDSAkNmmB92Zo4CCfGDaj4HHckEoBSw1XkwvihiQ1c6kkVjQY0u9TIjVWQBWegAsVpyrWIHayhO0Z23Xv2rbIeyPZrbjQI8XdvhXcuO42QZeq4Va9lirec2VXB/s5ocMLRSJRPuTBt8E4IV8frwaavTHjaEtAKvF6i+73Id5rIe/f8D8tgDJhTEejRTb7dUFC9C4vIvndj/PcUDo3FtSEeezB+m6j+e13gI3rsOtL7UFYIlER1YWHPNeupH3Va17/9EuuIIALJHoSMTBWlDT57i5G+tzn92qe2HFfGBFcxk/IrSaPv0feDE6Gx+dW4WkuhZQI+hrApDT0cCPjOltVRS4UxTIHQucTGsApQrNNQ2n8+iL6Xz6Mvpy+grzN5rL3Gb+lm/2zTPbrw6O1b8YOInHHkx3Lbafm/69smysrCydRs0w0BL4yycWAFfymiefBzx6GvBEO2BxCGhVZ8exsj2S1Z1nSQD3tARYcRpHkS3cioeHfWhz/T2uT2Be9FSUvJyLRCJHEafRUUqvMTDcNvoTxtAWgNUiioTgVZ4Orm5jWXEZTk8rtJKT9hwckLWZ5WBkK8TGiph8GsJzuJt+z9R/zYIrAVgi0ZGXBtgmFt8GPhP2e/8JwBKJDldgT4TGpR2U1ZPvzFbLPoaasyl2wawa/Oau531o9eE5GlqN9uGMhVZelyi8bsXwOtOEMZkDrpj2LwVOHQf00nDmKgOehtJXAh3HAhdMBir+APz278CMhcDclcBzbwCv1AJvrgNW069yefm/gPkvAI8sAu6bC0yaCeRNBfpcbyDWUPqS4LidioLPHOgPr8wUkOUhmxCrexHQ3Z6rhVk6LQSGDgdu/Tnw4PeAvx0PLFQelijgBR9mXecz0vVT2k95ccoxSpRWPbCOYntOo9OzLxJcrmPPiqFO40LKpEgkz0fFGea68fmwxAlqjTC4EoDV8sNwNEzRQ8JtUHYXGqVbfWPKgQ0SPyMvL69rS/T6dY/Nc3h81KhR/jnYMuzmlQAskSg1dYieVEj3+nfrkPD9JwBLJDoc6cpuDaf+bQYojLtv1dSZ96zCa2MeSW4/q8LzVAGghhkYUxQAqxy6I+FVdjSDZuAr0sP5gt5QQzRAGmng0qXcdiNw0++A2dWELmuBxq3Atk+AvTEctGIJYMdu4J0PgZfrgD8vASY8DHz3FtNb66IgLweX8jzG6R5gFmSlvyN0RzpHwyw6R2+P0iXG3HY24WZhXgLTzgNmnhHDo+p85WrB8Gy/7EGGcLUiwLLdmNEWzGv1hx3aGDZmeaqexlgglkjUNuVCbPvLORsg/w7FCIS2AKxWGzL4E+bpehvwOAXDBFMyvNAOO+XyS7yGM1zQlOI8i/CzF5jP3uvmlQAskSi1dQgndPgO76PPDLxqcusQAVgi0aEKvBHAWFdhaAVEBq6uOvP0uooStaHir4/fN/4D+NDqMs8HLVlFSPYqQbIroVX7KNc1tMgwd9DD3sYCfZmqS+lf0FyvfARY8hqw5QPgv3vwtfI8IJl0HWwD/VX6ogl4dxuw4k3gzseAU8YbkJWnIVAwfLFLBsFAC7OOoTvRPYqA3vtgVlKVeFDF+M85hclbloxfrjZXjb/kzVvPUeyFpVyxLPoG5CEtAKulGhcxG4+Ay3P0zIwCsUQieT4yPZ7PhHWm8RGnIQCr9eCVmTHvE2fIe4JGhjihbc79fV5HvguxUpxvc5w8gwAskahlnlu8h75Jf8R12OeVACyR6JChFStLDa7Cqq86U9VV/ErVVixUdeXbTnyrCmrrFFQ9NwF7/WDeJYj3K4GXlYFgxS53iurhemaYYH4Ar0bfDcxfATS8p8FS85AqYeGU5xj7lwdnPwO5ErRHh9UUB97+EHj2ZeD6B0wcsaFAhyIgtxTIiYauJYPcns4h8DxDr4/xNpUWo9f6SVCNtyO3ZsIuVVu+PKumvELVTTw3DFJ1GQ3KqjywBWCl3HHaM/nwtB7mIRBLJGrzwz/60RtMIyIhAKtV4VUF7Tk9GbxM/cHEKU/F7rWmKu9YBucKwBKJWg1g7eBzSwCWSHTIca30UK1wz5aaibmEViUEVtWECTvU+omIbJkM1TCJgKEcal15rPvr5YnN19ygAQSSJ2QSSLHnWRT0DOpfAvSJmgDrw4CSe4Phgbs/D9OnUG+qIyxvv8cPen29vg4omwGoK+k8oAvP/YRSoIMztDDD7PWMMi3EsodKPZapePe6cq/LholQW+6A2jgJLHu7WQZXqPrKm9WaytPDgUhZdgVmCcBKtRN0Ug9NYTpHAruLRAKw9IxtArBaXGEA82sTR+poidXYZOPh8NrGuD2xBGCJRAKwBGCJ2rqChr+2qzemdFP15ZcQXP2Rva3eVbqnVeNkHyRwm4YJcTqWU1OezKkjxKqvwLLp44N4V/0zrdeVHspWDAwqNYHZ84Gx9wOv1BEWfQFHDlRCy8p+rqs9TcDqjUD5TDvLYTAjYl9aFWUUREz20GkUCXUt7n3yBqj1FTiZZUvVsJzRLGtQhFksg37K9e30ApbNkaq+7DjlyPYeFJAlACtFTjiBgafta1hIfDaRqA0DLBlC2MIB2x34UqYbf0xD8OqogVhxZ4bCiLYALJHo6AFYvH+2C8ASiQ5MkSCOUKjRVT/pNIKBKoKBGqZQmw20qvehVcKAqyQN6yE1TAkc7plThrgq9uFJMieDhgzmjmVaSF8MfL8MWPhKKLaV5/SEamV5zZzL3jiwcg1w0e36GuiCIHaXhXOR9P8eEgODdNfQQlz90s1Qb1Xi1LVB+YrQpswRZk1IEKBqiBWUzXWV4PYGltfpHN56VjhOm8TKEoCVIseZP/bX8eHy0i4SCcASgNViimib7+E65mOo59VR5Zhp2O5lORlmy54ALJFIemAJwBK1KYXBFdc7EgpcQBDwJ3qn2nw71CY6gFZJHxowpT0a1hELsDRoeKsc+SvLseP8ccEwwgFpPIww4swueMo4E0/qGuDeecD7O0OwiGaadnJjZ1nt+BSYVW16Xw0DhowFcorTH2LRyf5Rv9ysu60Iam2ZX/b61kwwZS1kt0wSZhGwBj2z6so/Y2+tpwizhqs15d3dmG56BkPpkXWYAMu+3Aq8sm6yL+7Mq0ESD0skavMAS4YQtmzD70Lm3R42/FIKr+x3RSeM48YJs91LNcQy5WSbbuwqihOJtBOAJRIJwBKAJWob4ModKlg75Vg2+kfRK3w49fYdYHyrELSaYKDV/t1TA6x6ek0l1t50kwOw0hhe9SgGckuCQOhnlwGragEvDK6Q/nIDwVutbQDypwDql0DfKF2S1hDL+z97Zx5kRXWF8X4oYAgYoijLEEFwwQSrTIhSxrgliAzEcSYBBSRhHGZDxQVkeDOAUDHkDyvEFNEsmiqXJFUuAS1RspQmgQpJiTgLAw5FMDEm0VBB0dQQmXmv++Q73fek7rQjM/C638Y5VV/d7rf0cvt233t/fe65g03gfKeSnnuwHjA0SWPh1Tegj3JngCoPM0xzysNc/TLc3sTfvexPNtC6suRDIEtNPbAinPrcTNX+Ix1KqKZ2wgMs9cDK0tTzku8GunRBFLFcqNsobbxtfU8vdDQ5ZfFn9tDybpnsI466xpzrrxheSRlUgKWmpgBLAZZacRpDK3v2tj3LRwFaLeFOPjr7QZDsXY0S1yotnlb9FmDDePaWaU/SExuWBmBiWBV5A/MUXo0C0Bm6KIBXdz5A9Je3SEziWxWk2TGy3n6H6N7HOMA7tJBnVcxbiOWeEaSpYTfTumdu94ejTrKHD/ZPHpTmeFm+V9afg0kGsNwBj6y1TmvjeXaMLNwP6imTfYCVMh2N7rhl7yfmN+VpM3SlC3lzuTbe1dTUA0sBVlbiXj3MLw8iBkaegCiJc8j74LrPdC5d6L/QIeg/0BH5HX7Dv5Xfeea43IiBGpnystouLwqw1NQUYGkdolY8JsGsxToaTwe4WoqO/m4TEFsCsndLXKtjlAAGAIcGHzw0bVpOH5xs4mCdkXfwyoCchVAF0UPPmVhXltdVoZvEyGLrShE9/VseHskycbGq8nD4YHBtDly7iMq2LvM9sM7m8iTl6xiFMu6aMu35Q2H3Qa3JN/04We2rJvacdVMbWlkAWJ40vOfPn8+N/F6F78LL4e/7/C68zsfMsgL8ulAqYpjVbfLmafXCUlNTDywFWLFYQp6ryLcFlvdTOipAJC8kUHdITK190LO4xuuQLsT+rkc6Dd9dyi8sKioqZmC5Ap8thr6Hz36J9G0BWliPGrBJ7MXDOKarxSNNAZaamgIsrUPUCt/WhsDV3oZh6MzfCu+UXQyuuEOP9YzAVRhgjTVxsC7d2kD/KGVQcrMBE/miKhOsfQF0I9Evfk/k2l5XHhWNeVDa8sZ6cacBVzjvCfV5N0OhdyanN9OupfXkAFwBQNGpzVyuMlWDJ2WcvbF8mNXcwCDrW86eFWf18FAkBQ4xASzPWt4GPQ49yY3lsPD5E7Z6+95OQwr/5kloMx830h3QG5AnQMvq+LhRdHyko4JOxRXagFdTU4ClACue/GZIgnzbL/kdldcVP8MNwDkE/Rz7uxEq6e/1EJiE/05CmahjmGVt04sQtHUZz7PnJE84VYClpqYAS+sQtcI1AVdibSvmAgjsBLgKOvCtIXAVkYYAOAzibSPdsfw2hiQBmEjkCbwaX288kSqJfrODxBj0FK3ZQwpf3kM0hq/LDQKx8ij+VXCNNq2/zfe+Gh+CVxGCLM8CWW84zcllDHfte0dnLIwcYAncIWxvRg7O4WPwxvokOhTjcBzToUbzljxtGutRvMH3rO39UBsRamo6hFABVjyzDiKvvs3P2oi8aF2WBcMehT77UdebxZDKFn8mnmHh32Nb5dB2iZkVBXAT2Aa52O61CrDU1BRgKcBSK1wLD4dqa5yKDvuzmM3NgKukxLhyIYpD5wA8MID42YY7AkAyAIBiSB4MGxwn8ArLf2gLAZ4iN3tY5K79RBfcSeTMIZqYHxDLPT24Rmks3/fkXeS81s/4V8c/tDAFeTxzoa+W5A6nrWG2/eDX+FiRzkIoAIs1M186Q2b2qs0SlDcCiJU2jY83kU/jtRGvpqYASwFWtIHbkecXIs8ORvXMhsRDqhnbvCYcb8sGVP0Z3iiAi9ftlyhmCKKHOiIqiPWBKTfPl5aWDpbyqABLTU0BltYhaoVjZHW425tGwrvkO+ikdyLGVVbAlYCGc19tSCMOVveqTUvTR5xFnh8Ha0SO4dWYOqTfgOYRvbQzBHZOCDPDIyGZodCpheYasFeVBwHcq+jdyTXunF/f3Y2hfemxzaGZL6MHWTLLZgB3dzWy5+BGp6Xpoh73FDkJrVwj9cAqM9sdJJ0CTrMh2V+4Ysex3c3HGMHbcRcSGLZQG/FqagqwFGBlbnZ+IL8eicj7KoU8l4Drj+NaniH7sOuKTI6ZtxMCRHMYvmUy9FECzPOxm9lvWVcpwFJTU4CldYha4RhRT2+R1mQFPEra/VkFdzfFDa5EEjA7NbINIOCv99DUV1fTgVl+HCzPPTOH8Oq0GqIBSJ2vET277cSEVzbEEtvaSuR8PdDo2pxCLA8Ai8vJ32pvhffVPVATnRbApW4oHTvIajGzFr6+hj87CDU4O9cOkVhy7NV4oleuUXlgIf1KHjRuE/Jm3TrPSo4rkuFbfQ9yDeR7TBsSamoKsBRgZW61tbUDDWD5AtQZgfdVWuAV0nWynylTpgyMY/KNUF3zJezzXwKxjhVc4f92DMc/QbcDZI2UcqMAS01NAZbWIWr5bdyxFg+R1pUl6IT/2O+U7wMEYADQHFvnX2IKpXy1JYPZDAEAhgNmYb0Nx/L9d8tqW8ipIW8Ye2L5oqxqUDXR2BosX0f06BYiL4Nhg8U4nHDzdiJnNtHHkVefqMmVl5znDeflauqoXrzb2ZXcNqhlRdcQLk/7ofZGknJmYJMXJ4S14sT9Dvqi7Y2lAMvywMoRwIqzY4FjW2MaAV4Ggd3TZhsd/EZfG/JqagqwFGBF432FPHo4Au+rtAwbR/rNECSLzcTbmJfRSb3C6qx29xVbEUqZmRGl/n0BmnfTTTedaueTxsBSU1OApXWIWl5bT6+rFdei872bARIPhZJg1fFAK2vo1d5V4rXCwKwN6f0jWlbMmrlj+SgHRk7VGhpcTwZeuVn3vjpvMdJSotU/ITqSUngVjvvlQQ9sJHJmEE2oy5UHlutfrwF15DqL7nJgV77ScM3JPEtgS/KPDmAWlzGJ4WbKHhTbEMMUbzso18n3oeU97jmihAKs4gFY0nGROCU4vhePswEvSpuOUScaIpfJ9gstULI2fjTPspVvOguhAqx+Pp8vQh79O5MYUgK+zDP+B7bnlSxnC2LhXK6Huj9i6LorM+TifAVcvY/1nyKdLnkiL2HEayzfAJY+V7NiCc2rSCxRRAArwdI2g1p+GVkBphG0HfBqFTrdR8TrihWLd0qzgQa7mwJvqz0r+fPXsf8H8F2ps3PZCCdkNGjRHPasYWUNYA0w8GpCfTBscNpKon8ezD288rx+KssQ671Oour1RE6ZBHXP9qyRLsoHX7c09l3q2IbZAQGQrkK5uw9puw9n9/+/7HlBmfTlxRAfK/DG6ljJ65uctlVny5Bdvu8UYBUPwLI7STjG63CMbgZDVFzr7X615eWVcwsHGrbFn/WmPmOIFb8ljpYX/c03+f2Jmn/9ybdCzC8+TpOOyhRgAYIpwDp67Kv1tvdVJjPFcl2GazY0Fy8Y7DKN41hi6goSYGVSf3ijOd+38P39SD8f9h5myXo+Aqy4ng+Sh1r/aP0TZZ0UfzmLH2AV27URafu0GOJdSTyenU2j0dl+hj1TAJXi8LryZBgihgQG3lb7VvPn76FDvxFa4A9bDBs9ddKWLUsGBwCr5jMAFAc5YDjSdNY8r0by/hZClUQ7OmyAlH1o5bqQxyvH8B8jL0sQa9/fiUYvCWZpLKnLNsRKB+Wj6kDXmNpJDmzLBpSfsHU0ng6QVY7y9xh0gMujBF83ECsVuVdWsz9skRBPzsDa5HS7nCvAKh6AJcdTWVl5Co7xpQy8sOzGxHfz4a2RXdFjdUBU+WW9+S8aCzeK+LrFuY9ibGxJ2eC0kPNL9t1Hp3qQOecS3O+vRTWEUO6tY1WxlSfxjALcG4d82m/ytzvDWWLfwfWaIpOJ5LC+ETD3ENc3Epgd5yixufZCq/DbcxzLwvdWIQIsiUHJqdZDPSwRen4m4tqHbD/f6t9M1dd5H09ZsfMr4nOy65ALMwVYeE4+aB9v3HVIvtbv9j2kQCvXJt5WMnwJM6WhQ91sOtasVOTDqBhetfveVhKH6DVoHe+711hc8AoTzxRyKBGktwwlp7qFnLr4AZbopGqicby/mUSPvJCboO0CrsImx9F5hOhQp9FhosNdR/Payk5Q9+e3B15Yo2uITqnGcjYBVh1xOeHyEpQbU9ZRpnoNoP5Kw/mAS0mUx1cg4xHYJJ6CqYhBrgulAMuwnDwMiFVvDylUgFUcAMv2lMJx3mEaESw3g7f8T9mNp1yBhI86VwxLGYFjPReaCk3ja4P0BjSC5mP5q1AptnFlRUXFZKQl0NA+9pMoVGjVn05heXn5cOTNWPzufOgSzjOks6AK5NVcrM+DyrE8HbqcPSbw3ae5Q7dkCaB875Yokg5Y4mh5yLF6GEJAn4OuRt7MxG9nc57xUCoObI3PL+a30Nxhh07rcz95ZLhHzszUAwvpRkftQ/emAVjVuObH+0wm/N/u5K2zPaFy7fXLAdhxD7QsWLDALw84vpexfguXqV470WIFA7D6PofS0tLBZWVlY7CNyfx8kLoImsfPV2gGdAmewRPDz4Yw9C3EMt6XN508Qzlv+fnIdQvy6MtIZ5o6Zy7X25xXsBkcYw15eTHX3fjPp7j95oQtDESL2ARkhOtz5N0kbuNAZaYOL0c+XsYwCTpLylP4WsVUh1zAkztkArDw/w2F9qLrKMCw5H/snQuwVVUZx/dlDMaorEwtJinUxOltNZWV5ZgPtNCwpEAhhMsVLUx8cLlcJdRIpTENUcD3CJEalmaNjlKglY8GL1yQeAiaOCmoPETuhXvO2fvr/7m/b+ZreeBez36cvXHvmf/sw+Gevfdae+31+O3/+hbSdDjS9llevIPrAK4T+D7x/YKO5zAdXMbludi3W1hebHXY7CAeMabgCnkZg3aNB+THCq4ghgE8VYvdVzjXXzFwH/WWKYIkq7ORWygUYOnnMb8l7xwFWEGy7iudOjiE6AdXEL26jYi3ip8SuIJccLWzRLRhE9Hf24nmPUR03Xyi824gGnY10elXEp0xneiiWUQ33kN010Kip1YSvfQaUcm3oCl5FxZDtQkzibzvcuywtFxYQVguxvHne2z5cWqg6mWt/aK+3tMTT2MnIspqx5vPxKpLQkdWW6xQN4BKeC7U7fgrT2HykqZ3FQAr/wDLDii4UZSVrmp1YZVlELBo6tQQcqbZeGqH1O38susA1/RjaCb0ELQM2iSOBl/uD6kUxknslWehf0B3Qhcgj47TgYqFC5KHDXkBLqxq5QAdp0ORzhN5IAldC92Pf/9L8mEz1LWbPNN8K0NdkndroL/xypTQ5dIB+yTU2z1vDjtZes/demMAA1Ckewp0r6yW9gLUqVPAnDyrSJ6+gQHERuyfhu7ihRWg07F9nge5WR2w8oINMQCsBV6xOW1PuEfe/AmgJw731WoGRnrcrLw04cEZyvmfcX1nMuyO4BrJIMCqPvCXOnYodA27nrme5PpyD21RF/Qy1Abdje9bGOIMHz78A26e5qEN2l37Q0QNDJ1ktcpG6GquG6AnOH+xfwXaZfPJyrY/0A7oOegxaD50JerXUdgfOWLEiL57O8jSdt550TAUugV5tQT712w+alnGZ863/0AP4PNkvhf2BV4SzyS/GIsKsHBvMw+wFGI78G5/fHcU90+lPngQ+7VyfzpkzOH2GXwp59ul7ljMZZzrBYZbUP9qjt4CZKXtvNKtbdIwDJ474QaJe8pgBSrx4FxcXTsAre7xlrV8N1x9zQEJvKfdNxCESoNdNAKwLhFA4UNBovDqQ2OxHwX9kGhxm8CflOCV77ilXt5M9NCTRJNvIhpwHpF3GnSC6BTo+yz5fjB0HDQIGkr0lYlEV9xB9MQzROVKehCrfZ3k6ZlE/VKZShhAfgg4G6/UssPaXWPE4Kg6zGo5Wlbh3GRAVpkV55RCXXETz8ft3sqpvdWJVQCsXAMsm1YdjC63g9FaOvMMiNJcidAOEsx0yKOhKwQgbNeAwJCdqkJWbqcY167xWPR32mlaBc2BhjpuAbmO7AIXdyolO6vESfVLgXsbIE6rppv3nA+cHyw3z6rmG8s9hoDRV+Q8E6BP2WvJCwR0B4ri0hvOg2Dp/Lt5VzXf3PzC33Geufm1FffoYXZH8hvXhPOrQZ8njlGE887DeWdBN0FzWPoZ/3cz/uYGCa69BarJtSlpfA6/n22PX+1ztf+T382FBjvpyH3bI27H7RHiElqHwoUZa38aIkxZygXAsm0BQ2guo9Ct0It8T/l8LPy+2/rB1g3mOp/G/1/FjiO3fsq6U9UCcHGYTEFa7oOeVehq61CkUevRHrXbLPcYAki2QY/xFFV2vtaz/VGgwH1MXEuLvCTT+lY1x/3s1MOz+XdIz/kWfOux8Xk/bjugFfhs25Y9ljX9O3znc37h+1Hs3LJlrLs04XetUjffuLs2BPuZOMfvse80EJJ6qMC0Ic/wNMKqeQV1k5esO3Ccb2hZjfs+M0Cy5Uyg1S8ESu90+plaht9W/xR7zZP1An5H47uPu2W8mFqYJryCC4ohEweVxr4rxlUFS4gjFK4m2AY4tqx5rtd28bfsZZipXD2+4eSFlQggyNBUArn3gg4+O4RDU28jKlXSmzpoXVcbtxDNf5johFYBUyeHsaXej/R/AiDvMMCa/thzrKl+EO8/Ni50PR2Kz30AjbxhArqGAMQtTd6JZY87+77QhfXRJqJ9kp5KOFqAZhPU2KTlhgFWz6fVOvCorflzeFauQznexDCWA76LG8uP0aWoEOseQKz36DNSAKz8AizXJYVrfUQawkoEgLWawYh2dNJ6y4ipGO/ljpa81e5AOiwI0E5/SfYVyDcKRL6jClRm6f3UgYTc22XYT+YpiVl0yLh5pIG3edoFv40VGGc7T5quwM0vke/KyTc370oi3wRoVhj4MndieSqD67zIw1ttvucC/tZg7+af75Y1qz2VNZtfXHZtfnFnn6cRuPmVgPPn0ZEjRyqE3KPswKMGBZLGmoXr5ONcZfNkLwne3mrq4iCC++p5drZksP1p2JM7Ia8AywU1/LwKtA9QRwhIcdqjbuoHWzdoO6TlnyE3NJcHxRl0YzVUAf77yUqUM6ClnC63/dHy2137I4DFUdU8q0h96ubb3dBgvV+adym7ED+IdKyEM0zr2x6L/55/h98/bl3vCsDx/d/5byBT5tw2qXq7LS5024dagn+fYfuNe0oTt4s9aEP02urahvA0Znadxz3F2pYldrLhWseKy2q72z+1+c6qoY9l+6d63PXQTWEfy6n7ii3+TV1OBl4FvCoaA6eYwFUZUseVj+/me8ubv6mn1+lRta24ZgHW2M8DUryBfbIA60CGICND19Dy9QqW0psyWMb+kX8RnXwpkXcS9AMANVzTwHPCa+vTQxi0D8SA62vs2jqKpxUmD7DsNMsXNhJ97gKc+0e4/sRdWL6AzTLKx3Fabmp5VtypfCjLn/Ham6/lRQcAZzXYOwdl92NyLPp8XOzv85ZMfbdCrL0fYGnnNjrAyvig6d4IgyYFWM/xVCptwJMMeqqfAULG4LxPKkgwroWSTUtEBRZM4Fy2A7YB/57K8bXq30moDjZwnV/ANU7jt7H22vHZHSz4ml8xKnCgWKAwS6zy89RJoOUmi/WBxu6RfNxgBwcx518gqtj84rItZe93GpBb8ysukK1T1yRdO6FyN4ojreUa1SXXOSXnAMuFiL3Ny4RSxJUH/w/uFcvDJwOw0AZ9RJ9FDcDP06f5Xsh9sHVEEFM7VDH1wjboGm2DtI2sc/tjwdVAXN8kjnXG128BuB2IJ9T+kFOf+tr+CKj5M3RCmgBQywlPBcU1/BPXY+rbHmuXuMkftFPzOZYnT/mXchFomiOUM71XrFm2jLnPlKYJf/eU1M2dChOrSeFiRPm1tB/6PEp/cbQkQwBWfP0vcRk+inuVTv8Usk56DlEAzeU4Z7b8FW6sODfydLVBjnl1KgbduxRexTb4Xn2JulP+imlRg6KDKzcJOoVw3IEAFKsTDeTeC2LHELuvLrudqBwkD3xsgHUOxj59PjumwmmBA84OY3H1amQA5Ex33EMa+G8ZdB06LnRgnTeD6LXXk0+Le/w597MLiwO68/WksAJh4xakfaACrEirdLogq33yF9hVyGVeVtHU2HFBfBBr0jx+XnR1wsKBtVcArFul0+HXArCkE/Yid1YTWqrdfav1Re58Yk9VBgmUsHyFCwZkPAMNq2cnocrA4Six8m/V6+R8ct0+KSvQ+2Tu3evQNH7mbDqyEq9HBqVDGAAacOmnkYcW/ml+8f3kODEc582WtZgA1l9s7KWMKtCBMMPjvQxgfYanZkaYPliR33ZCXyneuicHsNR1fOqppx5s2tHB0Hp1WOhANbF6AVIgwzGOoKPtc512vtpzctxDdlvhGl+Sa4wwgE+sPtUXAzdrrDh14qQEsJ6ssfxVpPw9IgBL4VWnfN8VU9vkS2xLhaVPQIc4z5ELsJYgTXloQ3Ta3pioAMstN5xHMm24FAFiR+2flk0Z74CuYwBZuLHi3tTJsaz5GxgkvwbYpPAquutqRYtMf2peixhXZ0kcH2eqoGyxAKymdwFOPCSB3MuJgJAPaOyrEURL14r7KiV49eKrROdeFwKn3qN5iqDCKAVWPY/h1bcR4Ovs0ME1foYGoddzpTcVcv1/4b4aT+SdAYjVlMYKhKvIO+sALTfxuBcdN9SySScANC3m2FgyDbciigqxAm8tL3gw6Xo7tbEAWLkHWHOlofOjOLCgQ7STliBMuJDfOsu9iTBIiBVk6bXM4k5cPUEMBwDHddwOvWFigAQ2nzKisjoJJP8Wa3wszbs6wyutB36jnV3NR9lTyqqwzIB1oca60M5zjACrXACs9N1ISNc4fV5rLGM6YHqQXyIUA5XEAdZaBR/4/BPjDKyk+AyV9XmQRSFG1XGQqgta/JrjHkoMK+0LOdCq7qo4g/xncI3H2HoxBwDrb+Ky/jQ7r+S7XQnkVZcCWZSvr2o6CoBVNRzHydDzCmz1+axnH8u8LFzOK0l7tiwWW4RNB95LmvsDYK0W2FSKGHy6YhwoJWgmXCj97CqHrDiTYUEEAMUc8s5NDmBp7KvWm4m6Ugh6rsdeB9AzaAq7lULwdECTC656Dq/eAwg3QODVhBuINm+PMg0yugvr+gUcwysEWL0Tc2GVBWwuJG98n9gAlgVJ1hH17Iw+AFkTALJe4ucKzkOJjxXt2cIxicEY9heqg5LdYAXAyi/AYjdTDDGwlnNw87gbRj0WO074rRZ3iFnWhl5n+XZqIa/ex04Kufw0pnM0mBgjl0JbTOfJtx2oDCrQ6xNwsh46Up+Zek2B0UD3DAIUlOp1ZiS/Ailrq9lpZyFW4cDK1eYOfubrgDZK8HaGKZonxXSRRAHWSgmY/VMNNl4nwO1DJRNn64IUnVgNJmD9OGiDtj+oQ4MMtz+qspl2u40BhK1Pswqw5HcPcJB1dmJJvd2VVPmSsrWGA/Br/hQAy8kHHMtCbFaW+ljqHuf4rQXEiropRCJqALy6V+JTldk9FWnltOWh6wrHfBo6MUlwZVciZEkcrObEViLkKW4HQN73iB5dahxSCbuUXtpMNORynPc7HICdr8PEi4oArybOJtr6hjlXyps615avk5hio8ThNiYJlQRs3lkNfCYGstonDuQA7Fh1MwRPbTE8Yysn836nt2Ly8epmLABW/oK463Q/XnEmCsDCb7mz+jgHrIwzvdq48jQN5OUi6aSRtWJnSBXTEX4BOibBjrALHw7TzrBO04j+tjv9AZiUwXU8/STtzpU9H5+fgayUNx+qZC2/9LmTKWeDrHOtAFj5Ali6tDrS9W8z+KEap3JvZhdmMThJFGBV9KUN2r1p2Hch7+v+3OjUOBbDpKQhpuYlT01CXv7BOH79nLU/gQEPPKX925q+DAKswDjuFuAaL5Y8F2AYf95oecfxF3OeFADrre5Zdj7qgjUKsTOY5pKuYihB3vct2oka4/dAGrS9RaYNUoRpTgFUEmcIu01u8Fa17K+nswP65ACWTiMcOxRyVp6LSf0Y/AwlOr6V6JWtCrCShVfbO4nOn8krDIZB2veJCq/YuTUodJC93lE/eGXzbsdOoqZriLzTeKXEJOBVAFVCB1bj9CQBVjVgK8/ZubxaIeBuHFMKS+JwXO2taD1YIVYBsHIDsLTRUvjxgnE1UY1vAxfaJfnjuj5eSYs7ejKwrrAy3jEqSUd4G+7/SRYsJFReNVDuVrmHXW7nKU+DCFnpcRFWWeqraUzzeQBIOJydFXIdpYy717qkjtrIzjVNRwGw8tfmcMwqqEOdkxGmDz48fvz4PsX0wUQBlmqntPMOdKw7xNL9KZrmBN1ECl9XSN3RCVFO1WVeovTXvMugA0vL3Bpog60zElBg+ni32vr2nQ6wTP/rWK4LTP+LMu441BW17+dVvIu24u1uGnx6WeuXeeW0KEHbZaW1sriuNkFn2vOkM73JrkQ45utQJZGVCA9jZ9eJRLP+mOxqffaYt/8ljHnVv4kBVO3waj/89mMCr35+G4Ox+sIrN50LFrHDLAyQv08CAAuS4P4TrGsvpWdNY2MdCT3mrZtC2IvjscYYcwgOj6Du/MzdYt1fBcDKB8DSGCm8tDU36OrcidC5uSuuwaR28tC49uPAoaaT50OUA5XkjeWr0Nc1TQlPP7rRdoZzKt+42KbZdKYEc/vj/G2mAx7kaNDVhuv/sNY3BcDKx2amrJ5tpoD5Eerhy/TYxfTBRAFWoO085Ge0TnhWQExSLosGqJe0Pxe78dtyqMA4W39n68isASwtf6yE89s6vlo1P97pAMu4Dw/SBV4UXuVAFRO24e7QiSX3tdi6d4bonpflx9TBKHGvfAZYGJDz5za4Qb7kxtfiLV2A1XQEXDYbsY93JUIOet7rLHweTtS2Jh33FZ/H43OOZGdS7fCKp+V9FOJpg1fcyY6n2uFVEKjihVgI5h46pEbEPo1QnXgCNX+k7isXYKXixlrSvB/cWHN4VU5MAaw9LhYDrBUtoZurveUUdWEVACsXAKuBJZ34a9GQ19rx9MU2zbCmJWpa9fcaU8MJKh3k9G3uenZIJQ2x2O0lZc4MqHIpXd56J8rlV90ylaCLrTfHvLLlLYeDrj8wmNZyUQCszG8NFkBHWEijogNZ3MchxbSQVABW1mFNSZ7lW5N8ESD1jS4e8op1cudR+ixJGzRMn6WsASxVSqvakcCyM+wz9A4GWDZ+7NUm/EaQp3IOlXDP+L7OK1569IzyNKhLg51SiMujThC/xlXRZJXBSQ947VMPdAfr9QFYjQdBy8kbFz2Qu4VAA/h4Q4iGTSPakmDcKD3mjl1EP7s+nDp4xDm1w6sPAeQd1Bge56r5RB1dep5awJX7XXwAa2eJ6OIbOUi95PXoOCGWjzIhnxuP1fKS9rNn3Vh4di6CArgfo0CsUujman7CW3r++xViFQAr0wBLO5263O/zsgpcqcbOnu5P0mNHhTEK1nRAx4p7AGxUMZ+DuKcTilX7QQYkcZcFPZ4Gucd5noq58xh0k1+sIMHB129t2UjYwTZdXHOS3tw510ju/YQCYOUn/pUOajm+TIT4VzpteQNPgfW0Hi62CAAr37JQEzpO055wHbpA8zOx9gdKof0pS5/ocXanaN5lDWClBEx8gXmd2B9VAKwwvTJ19s3VH3X2Qox900o1xVjefbMQxQ7opwXA6slGUvDbL+qLAfA/2X3Fg+CanFe8X3MpA7A7vRcn7Oup64rkBtQNYI3vA1CxSAJ2l2IDWAPPCacPzvg9kW+CkMe5BQbo/KM9jLfVF+d+39jarvnAJriZxoTw6pq7iTpL0eFVB8Dapi2a9ugQy/7+roXhFMdDYo+D5Yfuq8ZO6Iv1AFhVnYnLJo7Ac9ThraoZYvlQGBy+fVKj9Gh68TNYAKxsAiy7Mh6ucUoE9xXpsv4Sh2FA1LTqb5FvZ+EzKRyLq8F2pyEaC777d5W4OgoMRKSj1Go7CQm5OFojvA0MnHyqOHll1U3eRpI+Q7p897eSDqiLc53O58U58jyYLdtnUdNXA8DKfB7sbQCLV/biuDu4fzUDLHnuH+WFNAoH1v/YuxZoK6oyfI4lpmkaPUQzNSi11SpL09XDsqzUZYFoJWmZl8t9oEY+eFwgLZYWkS7N0PIRiZqRYYQRES0sMrDwgRcQ5FlLAkHwAQgi3DPn7L5vzf6X/5q43ZnZe84dLnPW+tec+5g9e/bs2fvf3/7+7881gFWLWpZjgr2/6VqfMsMQ7IvV/BC4zNM6EUmM+SeQc3yzsOiLyD1mDWDl1MTHW8/MvD0NwEJ9mxIm2ynDhPU+nmW4Akuq/2q2G/sfLdrnAxcfVfw6iQ7As/1sAV4lZ19dwPAjHGnVxItmavCsIvNj9GQpU7NLuhPAsiysad4ALFovyT54rjFzn9SgTjbsq51gSY26XYTbk7Gv9rPgVR9qZg0JGU0Tf2vMrkp68ErOWf+CFZQHQ2rGPP7GL4i1aBXKvhA2GHVv8glgBTakdCMyHZ7QrQBWNKnBojHn453a4cDE6iittiys1ePeIkB1TwGwOFn0JABLMYE+zt0jx0V7YJ2Av7g6yHTsFCtsnXUMKj5o0hLmyDL5THmUtOe06N+UKGrFY0jcdpR9SpbCsHAwT2JWOgnjSNJG4rTrttBtJe0lFv0//szzpSyPwrE/8+5gSZtpDQv/TndN2lYcTmUVayIS75uZdJtuswQA1gz73u1U9aso07+reQApO2gsT45RU3+jyfV32f52bS6cb/fw1ZNtNknXTLD3s7xCzyRXAFZN+q1mUugxgubwXsXxRSrMiqvvP6P55whcZ0XCuVvfO+eW2PMPLTr/eASyJCx7lvZt9mIAq6rHUj0vdZG9MFBstIOj7aD7VENDw2FkgfNZROcQubbvOUTK0tbVfMJzVLKDRs3ASjBmH4pzFwtr1mVsYL9lOdovlSQt1qTPR33UIGE7VhRT+69M4FSAVwnS+yvtq1lgXyVeMNv0/4HNpDaVbJI8gFeiaaQArNuhp+QnhJBg0OEEP74BQ5kr1goQlJ2o+fK1vG6ofdWbzKEU4NX+PL+/MXc8ZMzuwB28eu5FYy4YT6H1EFj7yAhjNr7spy30NT7RhvIHMeOjzzDCig0pXYm+cVS3A1jyHpqSZAL9Kmx3adnYxMLuBKBhxoYDD5J3nWUXDKz8AFisA6yXpL32EG5WVWmDR4pj4yEM4T7NInJ1DFRq762whbBfUiAc1obvzdxhhQM3nL/Dz1Ngy8V5VUBQ1UNIXGbCsNK/jDFl6iDFCAOrieOHc2URIE7Rq7BVBCVh9+P7jXy++H4ZnT0cv4njUPu769mesAXMhCdl4bsX8NEuSlbHECd3CVX9URrtoRhtG0QXY3guPOrFmU/Qz8g1GRaAPv3pOMwBtqkCsJj9US8Mo/WN1Dv9+ynvZlzT16ahniznh7lwwN0ZgOc7MFcEuNTtUS4WJN0OYMniuibjgIwBuh/rPq5E0Ds8jkWSFGOiflcy1NScGIPVLaCeLN71/e+irAHsEdgDlBKwc/XlDPeCXYzvLfjdcNj3qPGF4zxuetkxRTNpa66MVgLLGEtPkbDcvQnAkj4o7aw3njQgKPfbyTxUsf7EFD1/dsLA643/WxFzDnENg6wp3yXVXALZBZZzaRIG1sknn7y/BWs/y76KOriwDcVfqsLa8fMk61d9DeV/kaG/NK4j8HMDE3Tg+4NsY56j3pmAFiM7qQC9P2eWZ/Xsis2OWAtmyYTW3rYdC9402lcVMq+w2J5fWjL6rRq8yhmAdZ0FLAJYzTl88LhLQ/bVJQBwXn4lGwBLs5h+MycMV+w3NGldLeDVABtgzC9mGtNRTQleqXM2vGTM1yeE4NWJ30JIY1PIlJq3yC+ARR2ssXeEYvMnXKaYZ87WEfaHpoX43lsArJy8k6KJdXlpyRiGAoq+XCIWFjIS8r2cogHrAsDqdgCrzGtrx2vgwIHHEpxQO0c1x8XyJhEp57Uc2VcDXdKSa4q0WmQ/iuOVOH4U935YjD7Qh3pesLvJmmIfkHI97IRXYWdlqIXFYwNsj2LuenHE9lFA4dNwkO6lM8esifj9u5MAbHSGcO4HcM1h3NmDGQ/9q6qo9BdlEcaBck8lsOlReDigqbZlmWtgD6Ndf00H1farqbC/4/tzMC5qFZDljbn2yzgLVj5nOaIOP7Hg5WMEexkOos0CwI/DFsN2CoiVMnvbFpiUK9eKY/z/J2Ar8fxaegIDC/dyhUMGwqoKd2otUqLnAsBieXqh/qp9Z35rx4CbCb7AxsPuYD3Yp3HcIcCWhMZ5DAFbxbktSxZWjIW9zD9V1EmPe6tgv4FdZc/vK5ttcT7Dhg1jwpf32UX+DNhrrvqZcp7VRbxGgxw5B7B0O7P+GtTbSUAO9jzZ97DtvLY8Cw3+WatFswJHx1rdnxobGw+xm14reW9dzCHLpI4Oc8hmlpV0DpF5B8Y6DNQgbAKZixEuYzZMwKS/oX+dF8c35UeYjkzWgTImsw3kuXUCfNeURiI3LEeyjCLMPHH4oCnbhfKo0sprLJsKlgS8Ws7zRm8oLRzxoRI/y8b1ys8tlsoKwBpuAawqrOZF/4rgzdhJCMXryAbAqiqNqStuI3uKYubJQJyDACwdgCMZTPfOMiaouYNXz78M4O7G8P6PQ33KuMZRLeHPtz7I/xUAzv3eeZg4jTpYFK73CmBZRt58U4L+mwOAlW04YdvE0qprQ1ZV/HeTTMqAIYgAp9eXnhzZT8CxHhJC6AJgnSsZ9ThZsHw5+jaWK0bASu4lcn9no05LNOPEw0L5Vy6LSKkn642y5jg6dMIo4vf5+P6VAQMGHLInHTDdZvyuARu1wPkEGU2K1l3xEJIwzfeiW+8MMm06FwTWYemI7Hjrne41sNvx/wMYRtcVCCptxev8vzZj32P2Jpav9SEcQ+Lu0PXxKDp8p0fRct33noXdwl1U2DEiBBzp9wcT+CWjDfaQgK4CwHrQwtqA8t6fhDnARADUY4I47dvI0tRmf3c4yjqIYCVsRYrwiZoCl2dyEUfjNTHm8jqxjP9rzzloL/aKyzS7IPkB2iTtYqiiFi9nFQLu3QdgyTgrDBcLBI+kjh/en3d2Ua/esNNwzliygDWYIOV72Ag4L+NsuJLN9e8yNuh20RsnBO/JtibbhHOWp/lHnuuZbHthgsk75aAt90dpM1435wBWlSZ9EN+fIeOG7GnU/QvcyOO8Y+UGPsP5nwA6N1YssLSTc6I8P9moxP8PiQH0lAnEdDWHINTwTfh+GsGXFAymGs3WbxLnVjUv8BjbWE/WJaXe6F0p/ZsazT6b+6K+gWw4R439JtrfVfbPW/nclF8f6LBR+/uNfP8L8CrNRxqeINaittlkUXHRmyTjIJkhTPuP81tVtrNyngAsUzLl8Htzsym1GoJXNGcR96NbQ1bQPTM1YyobBtbzYDudNCJkOL2jJVld+w4NmVfjJr8eNhg4gFebthjTeJOAV6+HVL53aMhIa8Lftr3qDujptpw5P9TtOgJMsjd608DaHWqiNc0xJfTbPAFYmsXYPu4wgFAL8H4mCyUUHTuGID415mLFwCrv4wysz+Xgnkjr7k/ghPeimTGOTpJQ0M/zoX1FsEntrAUpAQQRYJ1AjYKoU8BjVw4Y6yO7vxKWR7F7UrZd9cIsS2IbnsFJDs5wnNTOPxV2lV444HqyqPqWXjToZ6GdJWmruCw/7RTh+seSjeUIlga2vz5KEFj6mSem2oe17pCHRauEv9wA65uCKTmAYQR60eUhtPfqLBgXXKSg7KWyq5sy3G1qT3R1XRZDaUS9OabbZ72ZwGIBYHULgMUFvgbcVzM8nSBFZ8/ejmOwPdbxXWRnidabY/30gv+GDENMNTtluAqHrAigQiOgAvsO7IQ9nZ9m/uH/Rucfzv9kAzkmqRF/aQ03IuTdyjGARd9Ht/NQAkYJnt+hBFsZtolz/y3hhp411GQO6Yc2fR7XcAGwbvE1FqeQHpglPlZKn+YptrdscItvGqeu4qdFnt3pDLtVEg67ld7V4/R3+H8FQ9dF/+qZsUeAQfUs2BpJwpRqsMAuqv/MsvLJ8NCZCJsGWQAL1ugGYL2JAu7NIagy+9FswCtdZvsqq7c1mKF68et5AP73nbaec58QUAnlpgSvNm81puXHod7V+0LmlW1PG9r4FWPOaEN44QsClPm5/yeWhmW/Adc5pMkzgDXk99G+kh8Q6879raj7lwheIckCwKiE7+ia7/KcmzTrch8Xcb+Sac0p3k2h3iyNO2vW+fgSjoNIcba0/KWwDo/aEJpN9DfuIKUFFtjeirUzy0GTq6KEQy+U8mW3Nu2OsgayUO4lSviz4rKQIMBmi/UK8opTQyYGbJeEFonDxHsgzT/qUNN8aXJp54pZi3DNRQKaOoS/bOLiXMr3xL66yUPGvZpySJnR5yx9Pc2G1Asyfo+AqiWVjW56ShBLC0Lvsve2kAB23HYTpkNnRkdbPddnXBhYvM/o4jOp8dweAmBNd9D9E/B0BZ9LsbveLQCW7tdzceynx5zOQBk9HshYEVkkfw22wxXEUmPUI7yG1CvDpATHc8wW5pdkPKM/FGWi6fv2rfVJdg2u+SeHTTuRSdhN9rrUN6cAVqCy1k3kXBJtFzUf9eKxs3FUxnhqj7H/0a9CGx4n5fiYQ9APTmQfcQGwuFEnfl495hD+r/QrSgCkeHZVBb6NVEmVUn1kbNGsbpR7sxaF5xqAfUGeTZHcwyVMacmY07HQ3YnFcRL9qwDnhSGHi9v6a8ZIfgGsxgFgYZFxI2GEJrW9hUygwWFY3tz2DNlXtszZj+Na54GBhLr3SgDgMGvfgTjy3H8uSldPAa9e2GbM5RND8KpfKwThWY9GJRLfakE2tE37ajnXTwjl4jVKwL7Fl5B7hwWwpuYVwCIwrEIJp9lECQGsFiOEkBbY8MPZfN+FebkPAljatsNeItPDxVCG/i7H6PctsFfJFOoiY4mvzEa0/i7aEBL2hvI+xbqnBIcCJRp+iS7bp7aH7CxrfSmHrI3tDNfKSMxdHKx/WqHr9QQzIxoL5YwBgLI4qhQhdRA7lWdrqBMhIJ1j+0jmwVWOmS41eLBMADZ+ki7IxOkXh1YADXF446bg1lkkaVYn6sPSjz0uUPvwnh0ALD7P3+3LGZC09pgshtIyT2VMIThQAFgOAJY7ePVHjuv6nU7Rt8scP1Qdv6rGz4qjDtY6Zh7LOoxQ2tbOP1thPySrLDqvso2yzrbMDUSGTwlQ4sBeu0L7OnkCsHQYMUFC/TzgB8WaiwREpUWArI+hzGsIgvhkQHO+dAWwcLytm7LGHop2kRDVSkot1P5Spo/3LuKnDuN6gAlqdL8rEnuk+ki4HxfGowaXllErpy0ZgLXyWh4XlNbdfKBebOeYgXUOzAOA1WjD+C4OGVGPLc9ewH3GvBA4OrqFIXTJGFhvtwyshxdIubRk4NVL260GF+rQtzUsN6pF9VYRigeINf9pd1BPX3/lOoB3V6Dsi3BslWt7ArCapuQWwNLA8OLRX+a7B+A4CVMygEYdj6uhTddb3tN9LYRQG8qru8mup46Bj+4++sioxxAg3W6eMsEFDnoCo7OK72d5WjfJQdspEDFVsuV8h/voduUOH2wWHUX9t1hUdf+LmQc1IJNGoJphj44On4Tt0CkfxDIl9MdRa2od7EMsV0BB10UXdNsOV+GElc6ySwnAFxHq/Q/sAYK5DONknbJIl+8KYKHeBYD1+lzzmANLUTROFnBhVYSI1B3AqggDk++bvMe+xL5lfnQMhdNMojOymHf0GCuSAPjMg30qGm7OYz015nDfExwYjqL1eYN+d3MEYAUqicOVETZ22QcgEh2jcwhglWn1GjsIUvPZOQBYAewc32O13rRlUgM+x2JDwyeA1T7mSgtGxQKwrJB0FWwQgl4/Eh0thiflG8BqOZPAlQBYTgLuR7WGYEofACDPPJs9gDX9L7jemcYci+u+IWGdqU1Fra67ZqBMxWyKCx69vMOY4beHZbwH1z9QgVdRVlovYaU95RfAWo+QxC+MNXiWaIOhngGsIfflGsCSsNzHR/bBe7cGgFSSMMLAhgY/V1rWdrSUt08zsERQsf5W1WCBR+uw4rQ7uDPnMjnyPMWGeVpEx5PWx4KM/2Aoo5Sb4Y6uaDv9R5yXlJmNWOdrM1psliUzIB2YLBcOCVJOD9C7j2nai4sQ7aw6hg9OcVjQKGYYzsVHPcf9fIWBUohY0p/Lu6xSokdBq7U25fxg/PyeLMfHAsDKZDG00AOANZfMywLAqiuAVZVxgOF+voEhKYvMOg1oO4Ac/N5Sj0UtGbhaILve849cU4WrpdU7rEiyGl1uTgAszf67R/cb34AkP/kEsNznkDqHEIo/c3WWG5iF3lUW4Unto8dZAKsmws9dWJXHkLU1ulEvivMNYA35XAhaNBscAwcAy4IoFxhz6lXGPLsxewDrobm43lkCYCWr6wmXhcypNoBQr+2OV1f5+xaIsY++i+BVeO2DNHgVsYPRrm9uDEGmvy70C2C9CO2tC69D2QMByHnLRFixDKy7X+8reCfynGyhvW0O3tVkDKxlY3l8sbSk7YPyrvYUBlZhX64q7YFxesJ0dGTOgamwvFShjAPrMFnrOn/XIYVyIJmNdBv6B7HcFw4+Q87wrP6d0lmVNN73S7kOAJboN63VdUlhFctCvEffawbMtZ9bZ/c1cXx5XVxLMh1OIWiFxVDfPbU9rQ4AVqUAsJwW129DmyxxALBkPJktfafQOakLgKUz8c7JaiwXwIMhbHrOcdg4Ge+XtZL/+YdgGv25lBlnd/M8nj9s2LAD5JnkAcDS7D8mZZGNtiyeZwFg/c/cPNNRxP1JZsiW/un7ebGdi5BBDx8t5gwQaoIAWDHT9FdxjoQyXbT3AFiNnxcAy5mBRcFyAjVnjIBg+WYRLM8OwPr9IyGIdExLcgDrXa0hK+pU1HXdJqkryu8CNNq205hrJgl4BXCqU/Aq+xDCbQhhHDI+zKZ4vG8Aa8jk3ANY8mlvewiaVgIi12IBWEvH8rgVQPUp4U0WAFYPsZoSbp8m7cSjB0fgOnEEUqa4fphOm3YO68BAOYahY+J8pXQ6mSr9SPd6+989zSgz4h9SiulWXAE/3cZMcqCyXVYdQgc3435OlLIz6mcn8Xpg6QjAu5ZAHv7eIFo20XuMOq4FgJXLT7Qtl3sAsKazvALAqhuAVYUJmNyoy/YNYClh9I1a0D1l9s9JXt67/M8/UdbtLSmf9W573iImxMgRgFWjWZ/sxizf+4KBpa7hLiWhZS/u1Ky5YtzO56csC2OAUdclYmAtsovnFQxlGvXtvYiBdTas5iWEkCwgZsU7c5Qxm17MEMCC8fOnx3C9c405spni6cnq/Mam8LxSf2Meadfl/68JYLT9NWPG3a3Aq+YuQCP87fAW3yLuqj5ggrVO4D2QUeZbA+t+3VdyC2AtG9cL792jCRlYBLD4zr5UWtp2YsHA6jFWU2DRUoqxiiPmaWf0Yck+mHIh3FZHHYSyEjf9dcowNAFAXmEYZo7T3pc7sxRliM5ZYodPsxwcMmiVlTbY97WejEMmyeuzcp516Ceu9xOCd3hnLtLZzaJZJHUdihDCvWeu4XjKDILSlmlYQJYhMlXKLnbeMwewtDD6ajApjpT3NuNF8wN60ewT6Ozh8w/brjnluN8hiTrIJM4RgCW6ZltxPFXKLgCsutX/agdGpCRc4ff7pF/pTIHFGJ6/LIQEsK5KoIFFEw0sfp+sWV05B7C+SPDKC4DV1zKwTh8OfSbFavL9qeksfN8MGU6HNiev99FkYZ1vzNW3GvOvDcZU/k9dt+8y5vp78f9nG/NugFKHWPBqvxhtwrDKTwrTyyOAteUVYxp+EIJ4x13qWwPrAd1XcvueLh51PN63TdC0SqOBtQHHY3qQBlbHvg5eWWdhC9rnNNE28hQ+83608wvixKQAgbahrI+L81ZnB6YZ39M4MIEI7QMIaMiB41kWcXcx7URp4+/+y965wFhRnXH8LrVSlYoWUfHZ+kBqolHRWkusbWpriRoXtEZFROC6LLpYMXUfUBEbE6Ui1kR8xRhT2qY+qFIJbX3UqhWDIuxDQFmg6wNBoepSMbL3cfr/Z84Xv9yylTvn3Lmz7Jnky8w+5syZM49zzm/+3/fRev3/3qXsnCy2CMCKqcB6gc+lXAOHL/HPaCVYXPUV6nBCEvDRuq3UlN6DO/tiGwBWn1l0RswD0BauLoT9vj0TBlj6vfRohYGQ7nOm2/uEVohZ3787xEpLe/9T01vbMZujAIeYAGst3fRSArCKyhXtbywvKLCSeedJf89kCDYpgqp/bLdewtErS1wJawLMSlsQ97amS+gOiCxnuwqwogn0mplUdqzPtM48VFyTUg6waq37oDvAOrI+css7GZnxNmwU2FI5gLUZKq8TbBa+A+viAZt9Ce7GIRD7NGOa7jPmT4ir9eoaY975IHLR24Zg7Z3vWeXV+VBUoa0GC7zaFVVafQSYJs815pPtfgHWhx8bc9FslD8G7pveANYOC7AWphdg6WyhzQ027lxZ2UKhlOT6jUzn7H1DFsI+bwU16H2fQaV9pJFWZbC9z1VZEwsx3AdfZhDkBCGQrvvxqLcKDBtLxXOTQ5s6nYN2N6tkuUr51MDBqmT+c82y5gBeOlEP14DZTyY0aajppW2/dAkuhH1GgTWI8VA8uBA+FVwIkwFY2iWP7/AYCmAX9+cC1rFc1yXhCfvMKgOsGlGOVrT/cY+1qV3+u+i2nSKAJWOIObboATznALASqb9cvw6H9zatIP2hHUe+CLtcxjml93V4r1drEeC0vOV0gKhtcDUqwzWJcbCwprqjreVaNdFO3SJxjQA9xpnMFHF5KzoBrENYzjgYoE37hsoDLKq8jm6Ijjn0KhO77ntlbb1rYedF26dcZ0ztjcaMmYX4WjyvC40Zgv8blC0PFB05JQoWf9cj9Hz0GwOrC+c/qilSeB1R7xtgLUktwBL11fLZewMav4L4V3Tb3dVntJghaF47i9tPfvHmDQCrjxrPuQh1gEjnR3oELdqt7BfsvAk04qhy6MYnZYkihdewksbjiHIC9VjtGJh8fpIDMNa/t8E3v8rX1tYyw+LJqNePYJfAJuLnqVhPo+IMdim2L0A5P8b26bCjOAHvbTLBtlJBiCfEVKzl7EB9OQNex5l4SR3osolyumN+NS2oTF71Um4SsLEUNAaA1fcXXld5bxHE430Qgrj3EYAl7wJrY3XfWGHYeRyevc2OsRdfZSwnKTfptu9Nvc3nwCbYOBH/dxYVU1Sl8F3L/gfbdViPw/+Mwe/Owfb30B8MR5+13/+DZEoxcxaTYWAdV+39HhXjKQFYOv7aBF1uAFgVX7Rb6jwHl16xoqjyFchaAbsBNqK3kAFBlVWNLITLWoZA1bGmzPT8tJx1PVyd6ZhxUDTRTlfcEIMbihZtZ6dagFW0ZuLZJAAeqqAmRG59S1cJrPEPr6TMl9ujmFtfn8xMgDHBG2xP7HtwHQAc7ECCsIkWaF1sbXz094FZtd8u2DekLLhVPvuahU+27j4A1uq3UfY1rKuNtTUJ5s2F8HmTmTYwjQBLoDCesWsImLX6qjxX3+ZbJJMhXX0DwOpTlpcBm6Rml7T8Mon2HFj1QQvJcjG/ft9WTdcHHH+JDEBT6X5SOuhRCwfQnARQGYX1Q7zfsf0v2HYZHNNwL4jxZ7a5hpzvYEKxFOtHmN2Kkw5CrZ1db/ztClhVAJZMmhhHSin+8jHcB7nve5xIqnITWwLASuni/h58XgCWgyrwn4TJIXV6MgDLTjR3wE6Vcit9rzBrGT+a4PlxAViteI8eKP1CtcAV71XYSFyDLOp0L+xZ2FrYNkmy8SX9Tx62iUCO7xLYXPYxnPTr81Ify37Avi0uwML+G9F+qQFYti26Gf9K2jgArMTVs99BHT7V95SDFaQMnhuNoQpgCziukoQ/pdA3vOuTWDiZlaW1aQEmugKwijCzy8HcCbFam+dqMJYegMVzlO3JqHS9uA8WneDHoKtgkyK10nPLKwewZLnrUaqbGFDdh/IIZVgQRhfBoQBCw6wNwc9fieNSOSUCYGdCJbVxqz9FmpSxci3hWhQDbD9RoPkAWFO5XmYydYNTB7AEBre2DAeA6oqSJjTlygDMBesWTDtXx78KACv1VrQd5w6cq4CrD+kaIWl+fX7x4WBcYvvgGM/JAC7m18drtfoqCdMgTwO4uPFIxo8fv4/ce5VyFdQqK8ZuoNsBjv0abDsHSjwH1Kd0kqCtKNv8m5gFnbK/7NeF9WO8NnSzVEHvL6uSAktDtBsdAq+K0uVFHUw+AKwAsDwE514SMyGEfj7adZDpTFiSAFjbOBFPCmDx/c33tiPAeoPPbxL3CetdAq5qqIJFHWZZd6lP+D5m/0FD/Zz6H3tNNuFvi3GcFoGLXOzHms9cAFaKFFiSQOBdJoGQtg4AqyrZlR/S19DRigpkFeyzIff1m7B7rAJ+aOk9Fd75lb7gAptWNo+zLoSwxl0DWDS6M3XM4HYPYmmdbwHWHulyH5Tt7K0WWOSd4QeVTIwRRai0+IVSxRQXf/Dm7c3GHPdz6z4o8a9SZMxyeFhd5JI474/+3Ad1Ga+0RW6Pe+N4+2R91T1ngWYH7o2D0gSw+AwJcMKzucgmTMjBimUqJAmXOzJrWoZogBWCuKcaXOUkm40FMYaDevx8ku4cKzEYJ4yIGbxYD2aX0Y0Q2wthjydhcix73LfYdjEmnT3WBXIZB7IVaOcaXR5jKjDVO+wZ2Oc8Nk3VPcc62XXBWrEXKyjLcz+alsHLZIRqJdh8xg5hbAdsu8QgeV0DrJiDzfkxM1EJeOH2w7rsALBCEHcPAOtxneAgJph4m1kqBehnwlJJgCUAYRPfbUkBLF5XjkscAdYqZk2sNMAq6X/2vDBanoB1l/Q/NN3/5OP2PzCBWqJg+Tfa63d4X50C+yF+/o+jAittAGs93UH7KsBCm27uowBLn8cIOQ/Pc4Wiur9lXCW/b6XikB8j+Wzp90RwL6zUIhPatsbDqPKgG6HE2CnDemyg6A0IBj9C1CMpBFgPWpexnBcA8i0b8+nuhcbki+I25199df+TDKpOhRTBWdoAlg0qf0W03aHigflsg0eeQ/nnQunlE+Blc9altAsqsqNSA7B0LLnWpjlWeaVcB8sAWOtv4r536PhXQYGVWisKbLDn2A1bBBtbmgWlgvLrIxgcPmY8j6IarFbNcA5xlDw6CP0KxtLyOZkQpZhsW7eK11hXqbMMjLTiw+PXwx5rRTXoYhKAlaqtigkqsDTAeiyO0kXqbScyjboOAWAFBZYHgPVbh1gqMsHuxnU5LQCsRAHWOsZtSghgidv6Yp1FNW0KLNa1pI3Ps+6BovKV+9x3/2P0xxitYGEGZfYfjIGFtfxfn1Zg2WvZxoD8QYHl2Ie4x3LN2ntEXUuvVhDAK14SNCoK6cWAdYO8h3Q7B5Dlc9EPWGvzvZjwluemRGuFKoT7rKNKpHkpAk4fkBaIpYEEQMUiC7B2OIEPcZv79tQIqlw/35jPPvcHbnQ5HetNlDlxvGQfTJ8R5LEdbl2AentUXxUUFLz9DzjGOWhzbxkIrRKvjuuPAbNOTAPAYtB29TxOpyoSboDlxqajQRnZEsHlFTecpWF1AFjyldCjuQ/4ZP8dhAqw2fxCKZ2dTIASCEh7kvoiWnDJlFgtc6h3j0qffLC0uc/JmY0v8heYdu+Tr9zFhBR+PTLZo+njJgWwOLCXfcRlNQYwzYtbCyX8cr0CwAoAy1Mw4NtFGRjHtdW6XXG/C4MLYSIAS2DQm1QzSbkJwc6FGmClSYGl24CxENG+C1S8SmnnJPufnAAonrse/+wmAItx7/YKAKs6fYhuc9wf8+y1rBTEEssLoJWPkqLGg/0avzshgKzKq7C+iwnvp+VlIxRrjDKedc4i0PprZnnTYIFYaQBYABV7A1K8aF0Ie7wArKNZ1lhjamcZs/kjfwArb8vo/syYKfPoOscYU+mCVtIGh06xgdUbjFm3UYCTX4i3De3QcGekQjvGK8Aq4J6QmGij5H5Jh/KquYFZPi2EEqBcjvVYGL2Qse52M4Dl0hlJEFKuv8z0/+nflW7vdBAWZ/DD8xP5uT5/WhJtzEx37Ii1S1k/MgIsrjv55UyAiCeXDbbtdbCPSiYO+Wqp/Rxgn7MLofwvs1VJ/Jg4EwaJeYP1GdLeAWAFgOWyqAyd1zjEZhN1ILevD0HckwNY2P9N7J80wHrcO8DyD68uhXWJ4jcN/Y8+/m4EsJ7huCEArOr1ITwfWTMmqv5YmBSgxfF04PetDJXAbJ66bUKf4DMbIZeVCOa+YXY0AS5vwixB3QsWYi3OtDfvLxCLmc+qDLCGAVKsQswjfy6E+1MZNSGy1k4/AEvvf+8TUVypQ3Ccr2XTB6/2Qb0OhWVGG7PopVLXP38KrK5Nxgxu8BwDTAMs2uTzxeW0mgHbRXlFeAWQHA9erRD1FZ7F1hnnaGVXUGDBoDCycRg+cjFK4G053boDcxiQSYaTkyU4LAdACbaxuBYU+jnAWqcBluugmAHhOYgSxZMeuKff/AMs3TbMvEWXCxeAhXt1C5WDAWCFGFg+ARZVfWyfmO/CokowcHd/b9PdFGAN2IkCq5AWgKXLQfk3y4RaqcZN6qzvAyzW6ekAsKr/vuM1VSrvO9X4qyehsW1BlI1WlSVus3PRVx8p9Qzxsbym628ZlaEKa1WsyTOtoFL3/yPTMfPwaAKNBwSgrHoAa+LxABVbALLcg7iLDYAxeDnd557yAHA0vPozystcBJtozAF1ojpKD7zi9oipkVvfzQ8b83nOfwwwacel7ZHSbd/JvkFeMVqzfbN10X2SqaEleIPWaHiF+HO3AVy5KK9EfcX1Y0pl2d8BlkAZ2nSm3Mf6dNipcY3petFhn0K3MKZc1wPYuF9uGBuCGVTk3KsAsMayPv0cYK1lFiEBWK4DYrTlEgnGr101AsDKZDjRZAr6uABLBfIdHmJgBQWW5/Y8jRMOh3TsPZLVlH1XcCPc/RRYaQVYLEPFW3xAK1CkfgFgBYCVaoDlP2lBAz8289pKKIUkM4rTFMhiVuir9X1Cy4TFgwqrtXGuzXqWp2tgTCVWHjGxqAZpz7zRfJoGZdUBWNkztcuYJ5BjIc5PjfkVIE5PXkCUG7x6ehnKvAx2BV300gevBqANj786Ou/sHcZs3abPwX8Q+wcW4Vg/MebYeqmHT4BViNxKs7O/uGdMTWKuuzQunS1D8cz8PvMWAra3O8Kr1TO53gIF5Eid0TAArAhgMUuI7zqi3FoBP66yeE6aOHmSDjjhAcyl0k79GGCtIQyIC7DYlqK8YhB+C68Kaf7qnXQMLLmv+SWSLpsOAIvrDVTMBYAVAJbH9hS42iWTOYf3yTuwY0Mg96DAigGwXNvy7p3FAAoAKwCs/gCw9LnZPnIUrs9LrKdWwycNsuT4/LgpHhfBzdxX6v7lM4ZBPbUqgliNPXEm0hZ85TJrWUbzh5n2pstYdJIuhVTSiEsYQMUlDIaONSFM0RvMOYyA6WJjvt9szPtbBeQ4wKtXLby6nHGvLDBKAbzSbpPD6yN49bNbjNm4RZ+Df4DVvd2YCXNwvDHGHF6ROGC5KLD/pPt15spE412taDkD0Pd1Al9xAYz1zEmWwrdu5PaM6GRMDZ+1ALAswFIBn0ePHj1w5MiRX+XgJa6xDOVr/2zMbGracraMe7QKK8FJ8JXY7rcAy7Z9G13bZGDrEED0PgWvaCYArP+R9x9DSBAXYAlw1GnLA8AKAMtHEOBp06YNRHss0y6ZMZMMFNjnBAVWAFhxAJZD/9PIsjW8CgArAKz+BrC0wsme6yBcoxaeJ8dnOh5cwol0JBvnB7BJrFvoI3xNrNsaL8Ik2NWVqQjryaz5JVVZ3J6TeXf6XqL4qrBbk3YHowKr2ca/KojrmBfbI2vMMIKxC4x5/nWhLwQwbvDqm/XVhVelKie67h0BgDSYP59tzJTfaGAn5+sfYLV2sj0iV8pB2QoCrOx/2TsXICmqKwzPVpSHImIC8VEq8jBYRqMGK1YlGCsKKBaYNYIiL3HZBTTRRBF2FxCIZUlZvkrREmIUH9FSg9HESowmGiHIQ1AWBATUoKVBYwRRYJednZmb/6++pzyZ2lG37+3Z2d3bVae6Z1hud98+3X3vN+f85xn6StIAS/xei7XjvthFWIz0wYxAqBhmK4HONWjzxdQK3GdK+yoArP8DWMOlXc8TyJFYXNPvJAprJwZmp0j7RRzAjOvIEVjWt1ZzICuDiZipmJdju2BEXkghRL9GIu790MZ2R4C1FfvuFSKwggZW0uLcDjpY86XNkCoSAFZCAEuLV5+NfmjA2shkOQCsALA6KsCSY9E+Ar85Cce6CFavQFaGVkSNrDT72o4Vb+F1CBDLZdE3HIHTtuslmiruxJqWJghDW9xeion66SlZzJNJaWNpEEGAtYiggsDCO+TpNzUSMr9hMdMIBcC0DF49v/oLeNXHM7wqy/9cwFJiSueqR1UU+XQUId2oSIvqriXGfLpXzjM5eMVl0TPsW8KzhGBeZZMFm2tNamKPpAAWfVzBJALiAbgX/kCtOZvyl+Z95nSPbZnN9fupTbUnahgdAFayAEsGKRy0UO9ETyBjGrWwuL5T76NIGlijYB1VA4vRb1IJsptjWtx7djCb9h2CHsOyJayBdQwBlGMK4bsAYccFgBUisDwCLBqfhzfBRxWYiB3VuWzo0KEHh8lJAFgJASw5V45DDkJ7r9g+bCyR908uAKwAsEphyRdNZwVjHPODsD287qrybKYYUVlS9duOPR/C8XQK6YQui0y037qqM9L/nreC0E2wuBNsiS7J2QqFO1Ov10xj+zryi6lOCQAsrg8AoHiOWkcCsLxaz6oIPH3r56yYJxAmHrySyKsyn+Cqwpr63JyJMP2hVTyOCKR15t9fHFVDHD7XmJdfj4Ta5RzsZiIA65PPjBl2PfZ9iTFHSPVB75axwv4fwnor3TQ/C64CfVunzyJCairuqw94L2A7doSjGCOvbMXCLNq7UIomcBUAlgPAcgBAjhFMnJhLdbUTpf0ilR2+gC/sDgqwMta3nuUAVPolxqT3Fj2Z8XFcsCa5LjgmQ/+QEs08Zhq3xdSvevlt0HIlArAEumx0BFgf8j4JACsArASe56Mdn+cU7uX6cxb9CAArAKyEAFaZwBKc/xT7XMx5fv9kPb1/sgFgBYBVStFYXHDsLNqxAPaB+Ld9dmeLoJXF9gViPRCidX2lEm6o6YtJ8ZtW1D0NMw6WhTWlNs0yiBYhyHoptb72TB39xf36B1iTewJObDapKaoCoUc7QFUjfHqpBjFfE15d6hdeaXDVtdKYvmj3eBijmPrAuD0AMO8E2pVcR5/74/tjeB6XExrBRkTaU0NmGfPYC8b8d3cz55AgwFpWx6ivCKJ1r0oKYGWtNloD/OQMjwCrLF88nb4O/3+BEVc0al05RjZG8Gt9jY3iqpmuwVkAWA4Ay003hcfoojuRUzDlVu1TRQBY5/G4XdMgYWmuZZtmr1k6/zsx/Z1eixX4P/rvCrXP7UJt6b9vsAOwR1o6gJABK6vhcVAtAqGugxpVuUYPqPbD3odtgq2DrcI+VxAmwd6AbeUxYN0okw39/wE6RIMh20oAS/tbL7RRJ9AlJhzYifVAmYgEgBUAlucJnVQizDo+y68PfdvuAVam2ABLv6fGjh3bHee/Tp4BPsAV2hNQpfWCdsA2w+rw3Flt3z9rsd6A9RZbuKAen/PfP9J2mu0HgBUAVmtrY8m5q77og2t4HaMYYY3iuyIHgXVSlTwzMO6LY7TZ4V3hC2K9VjMQE+V/W3HoRscJd06isaxodT0m8rel1l/XR++XUWD+KhBOOgm224KKbCIg5CiCn5HGjJ1vzG6VXldseCXgqhvF1gGlDuPniwjXYOdbG27h1AXKRti/GRZFXJ3yK2NqFhrz5xXGfLRLwyVa8vBqf1O0/1Q5KjFOTlALTCpT0iaN9gKwCK60ztWaGQMAa++CNdDndUSiM7yqE9H2mptkd7LvALAcAJbbL6Cj0bavKKyPMED7jhxvwn0s4dT1MSdsOZj8Ost1m7Nx48Zx8LBQX9cWDgCnox3Xa5+DNamSy40US+fAEN9NxPH9hD5B+IMiAt05WOb+WfWQMImTNw7qqYNCUX78v1/DnoK9LYNsVVY908oAqxvaWOkIsOivZwWAFQCWz4mN8s9XBU64ausBUhwS0kNCBJZngKUjBn/mSQKgSdKa7PlsxPPlAUZ3YV9DYCdC5uBwrA+FdeL+YV1h37TPoePxt2fi8xhsz4I9ynOE7W/m/ZMLACsArFIDWRMnTuyCazkUdg+MvmtUimHej4DejOM+SSs8J0TsuixM6ZPJ8PqZ52DC/Jk7xBKbEYlOvzHTQHia323HZPxaRHwdpkEW9+8BYJVbvaPkABYFxrtz+0KKsSsYUwherfoCXvXxCK8Iehhx1aXCAinAq6GIoJoLfa7fQE/q9ieMqb7PmKl3GFMxH3aTMZU3R5/nPWjMo89FYvTbdxjTkM47fsIrk+wifbTmTRz7eNhlxvRKLH2Qlot8Yir9Y6ZE7pmWP3jLxF+VztXRAEtzCX/p4/D1KN2vTqKu3OGVTUNckJ/+GwCWC8ByP07sZymO00VAVU8qb9ZpagkDrP42oiXOAEaie3YRvGH9cVsxdbz7cA7TZFDTwr7rSv90vO5Zdd33Yvth2LmcKHi4xsfS9+lPrLTIa2wHnDlfACtmtaznpHpnnCpv2C9tfABYQcTdaSnsn3c5VpeVdw/t/JAaEgCWZ4Al9ymfAb9z1GzLWRAjz9c/XoSFVXk9XOMj0NRg2BzYSok2kf0GgBUAVgksZewLWr7vskiT1craoSCsezRh4UrkSwnRwvvCVcNHOq9u+nBMnD+NINaMtIcIkiiNitEobPPN2fzuVaRaTUptmtdNT8oJBgjUWlaBUFIIJ10XAYqKHC0xGHL0lAgYTbrFmD0NAn0KwKvRvqsNEvTYFMCfRlFU0+815iXAqB07o4gmHkoTjmNfI46v3pjP94pFnxuamouIEq2r5Bfpq3QWwO1+RoUx7ZFgL2mAlYn00Sp/q/3na98f9E/9gFk142j4dDV8eQsLF1hx9Sb6uvi9j7RB3jOAWHfzGHTEZABYrgDLPQqL1fx8RWExJx/WN8kJuhw3f1VlpE6MAUxGVTy6gmHYeMl/H9vfYzXFUjc5Thz3qeiDni3pOxmsoo3TYJ+g7+ICrKwaBC7nL9jN6TZwf1zTf3ndtMngS/9d/uBHXedLYcvsfZGjuQKsmJXeHok56cqqSdB8NaksCwArACxvz3Is6lmec5yUPF6q+iY8HvW8KAsA66t9JEmAFTMde6vc/y4/mtk0wPL8feW/f2hf9v4ZOHDggc35OX+QQfsjCMj0/gPACgCrlJ6H9F99DtJH6K8arNdw7CQVDH2Jvusf5rCeEKKwPFQmpFlNrMGYQH+c2jbHR+U0bWkYI0oYqcLPqyD0XoHUwoM1LCDIkmMptGgAYQHWfVbAPQNLDmAdVmXF0EdF4EgDIFn+KpFXHuCVBju9Cc/GR1FXlbcas3KjMfWNJs4ix0ygVNRF+mndNqvDhfM5crKKTkvMMhZwvgwdrAO1flphaIV/z48O3DyrNyDVHPjuNkArAUxZ8W1Plub9gX2ptEEFrzoIwOLgogQBlrxoJPVkuY7GcQQaNyY5INIaGjFTujIqdeHi9jCBjQEQJjlASz0AfJTXQQMyqZzjOjllW3m/2I/Rx1xkgEXjgPA2iQSjxdEX0uAlAKwAsHz2K/zrOGrOOeraZe19to9i7tJ+KUac6ZQagVkBYJVuBJadZKdsdNN+mUw7wKt/MFrX5/tH//givqYkCxrkmAPACgCr1Bbtu/KF+Ar6baSVZ9hHn1F+nPUUhfU3+NABIe3cB8QyEolVPQgT6feo56OFqN3NTvYZXUKQtaE2isiqq/kFJu2H68PhsbDSGmHClwu4X9UZgGI5AYUIuCdqx9oorEuRmrfzcyFCycAr/v8DK9GW3Sc1vp58ERFV9fkwima31eeMXtOc9a3c4RWhW/VCRl8xFZLnWgzLWIH/7QBYRxbSwRKfy48EhH+eBrsVQOldAVfwW6+AV1JuGaWIfdGqm4NXIQLLAWD5T8ebCHPVo5AB7rucSMlgK8kJDF/I+FUpjo5Ozg7g5rEd6DN1ll9hsW4zxr6I2W+3OaQayeD3ZWpZWf/plJCPlvHacAOD/7HYZ2sALD1ovsZBN0yOY115eXkPabdYETpBA6tjpBEycso+E9OuhTmwvl/3cQnpfZ0Ku4Dv2UIwKwCs0o3AQhtXOzxHJdp7K6Oni/j+GcTJfwBYAWC1lXcCrm1zUVln8Lxhu63vGA9FCrjeA3/6oYDkVFi8QazvYmK9WkSpYU1ce7KMSpNitAkn7FsxiZ+bWj97QCHtoQL6V70Bej4AmCgOwGLVv8OrIqH0h6EnJctfVvoTbC9TFQYZeUUR9otuMGbDO0mm/iUr3E6T9ErqiHXDOR5aFaOfnCoR7sX+Bmn/ob83q8X2/jVdAZSGAVo9Bl/djVRBSYE1BE3+oC4tSrO1UY+fpDZUj2kOXoUIrNIAWBwM6WgmxygsnSY1Rw2KyhIcjM+PCWIkGmahbrcj+KbBUwrn/fu4A1+pLggI8SOZPBRj0soQ9VYCWDr1cgQsF1NUvslC4r0Ucpd2i3n9Je0qAKx2m0bIvh3vISVcFx0Y5Dbp9h8xjGv/T+s7r2C7Ft+dXMjf2TcBYJUEwCqj2X67PU4kq4yNaNQSlPdPkaoen8X7IQCsALDaYlSWvr62/07nOBCmKna6jfvR1sygg+VT2F2EotdO64kJ9ZMpTt43zjTYVrpYXixrq7VFcAD7YfoiYNZiwoMv0gtV9bW1eHAYinBHDyToGg0BmGgEoEgaYAlYslDpEoizX2XMlveMWVbHCCm/8OqgSrQ/JUoZvOZuoysFSrRVm1kk+opaXYNnRdUc+8boJ8dKhBZyXpYiF1o8r0uzcGht7Qnwv2mAqSsAcXOIFLS+P0Oqawq48pcyyIird+Zyuy61adYP8qsNBoBVWgBLD4iwvyo7wXaqYmUHBtsY2q/TBhKqojghpuZL2l6bV1mNqCPk7usJoBr4Nragz+gbUqXsWYIwGawUCXqMbyWApfvu5DiDZj1wLgUdLJ6/RPCFFMJ2dX+zb3ujj95BH/mKwnpaw+QSiDCbI6XiubbbuwhmsB5L38pPnxNfDymErQ6wpN+eivnDk4CXDQQ40m9Femb9OERgBYDVlhct+q7uxSvp15J27phGuIRtBojlcZHJPWERolBu5MTdpk6lE5jEZ5mqSD0hTOBlMs+orOXQyZqGiJST89O6Fi+O1PsBJH5p08NUBcKErcwaK+gNmw1x9SuxPYbphX7gVRfAln5sa1gk1P7pnrYIrvJE7mELlkTn1F9SB4tjVtgfhv12mnRzKn/ZPPNIwKmR8LmHYP8hSGU0FCIEJYU2I6mCvsy2l0b0oUQgPp5ai+PA0pwOXEghLC2AxbZVFNYaiYrwoIVVk9QkncesdCkaJfUxRoRBI2xwBwNYvTgJEYAVU3vkWv2rensHWFp3jZMnB/FhAadrKA6coN/pyeIo2J049yGwb38ZzAoAq92kES4qlFodUyvwMvHVVn52ncUIRvXszrKaLD7rsvFb8Td34LuzJcVQazBJVFYAWH4AVkz//DvOO1b0pf1/9+r3TwBYAWAFgNXyqCz5gD48l/4pfenww/VGFt0JaYRJQSwu62rLAbLeAlzSaVTG96RepRdSJ8tGZdUwKmsJrAIphn30IbKynPnGVIFXOZgpGsQ6pNKmDQJkHTHZH7zqT3h1noVXexW8MmppY6mDFL2n+H3nCqYOqnMWK0Ilwk5XcPtPKS7b5/U44bXqEQCkC+DLm6nHRt8mTLKAVtIEc979XNp+ey63dwKeXa3vOQ1rQwSWO8AqQhTWVEctLP0y28zBubSfRD/zZYljjZuKJBEGN+pBdnsHWDjnYxghFyNCI8u19Y9Rur/aIsBySMF5wqH8e0ZNgEYkNdDj+ck153NowoQJBusGwjfYQgrio0/6fQXMKgsphG1q0c/xc2GNBSbbcUDLv7TeUDHPif4ozy31rE8rf6BlxI/47xbeNdL3YdNw358UUghLA2BRU4oVZSUCK6Z2Za3uswCwAsAKAOt/7J0JkBTVGcdn8MJSlCCXsB5Zo6JVHph4lCapGEtjQQxovBCQ2xsVdS8UUUsjxjMxKS88I0a8YhS8gRxGRdkLWCBivJUUihcgODs9L/8/877KZ9euLP1ez84M3VVf9ezC9vHm6+73fv3//i9aW6pqhqMQX0Z8ZmTs97ASsX8CsOJYjLrZLaythErqMRhZs+QvghdQBMN3rpdaVRZKubD//1Q01MxItdQOH/5M3b7Z1Lj5hsqaLaR8sMBBcNV9gj/Pqz0UvFLKq5Jc5LiXf2hMxfk4r1ON2UWr1AoYO+R9sNb0m/DBoBeqbkstrn29T4OFSICkBKY231pjglaiNGyFypBwlj/PA5w9uC1gvLkDrFgVWP4VTTtin40OCpNwB2GSflMah9oAx3t/RNNi6ZAvRee0whm0RW/3dCEHtwQXNNqPArAkL3HcR8vxbyYAS3ecL9AGxA5y+9mEAbLtGBWKa0VJw/0y+Jk5YD0wJqJtD2qjw5kWtUoCsErq+SOQ4EUXT8Mw6Geu8L4rSqZCwiuusf9ZarCe+47jbWWIKsvm2ArEQ4hhWHomAKvwAEvOD3/bjeAlwrUfIERld5bsPwFYCcAqU4CVjrt/KN+7gliX6XtDRM/Eo1OSp8ni39z92yWFNecCJK3g4B+qKKsoqY5r0J+zoCyTbsqbvu+2HPtdWmfGPXfJR6v7TPiagCLX01195V5W6Oh5JWWD1bcb88Wa8oBXX6415syb8kb0e2jfq8JGrne+lHAtDPir5wGEvj/V7NFcZ+hrlVZlsbFEU17RhbWxqqvPUs01k+nxJtcUywY39wFEqSmwZB9SEy8DdA8qrEUsW4rhHNIMu90ztCFsxJKEKws8Y1uaoTsRBVRg7R7RIydQhp/HbaYAi8dxWFsDmSjtSA83DTJjKCWbru5BWUSGn8U/SJVdfYqYy+sA53ckQXY4X5MSwpJTYZ0RVtN6KAv/rd5PAeAVlzRnQ5SBVUfPRfJdoIeacesttMkQfR9OSggLB7DYN6L5viiwIubhpAht5mzingCsBGAV8hz1M71Az4xKxMcR2pTl5tK2v07JOSRLTItRCpH66n1o8E5VFBVZBFgxq1dM2qqyBhBoLZtsbnmiyuRgzk0wEfQQWFFCEEvg1fY0bC9DeLW+1ZhpM3Bex+WN77t03ncT7CCfx5o77rowgIIvs3d9fgKBdFzgSl8TvEZaJvP3TwL6DgyXDCZvwEtPgaUfkqNHj+6OfTd7VGGdpwcLMTx0B9LEN6IJpXQuP0Eb71sI6bO0gaihuL8ClokKPFgq6oyIJRxnFtCDZGv7PZ8ccXY1GSwucAFYvD6UgkCpFN0ALz3JfOadbIezRGL769hm4fYKwywZ4Nt2WodoxL/divUJLNNNFFgl63XXrNvYIbIKulaHcs33kg7Bq+n2HCKBOOSaqLK+sfd6xs8kHxMFVmFLCHmehOURSwgD26e6odDPH+TRwckshAnAinnRuZHGMR6gf18ASLs1cuIlPPMjvdy0MTwBWIVYqBQBelHeWKOgLFlGZRT9g8TDKkaIZXZtwOdFtdmnr53YalJjcgZwIrdVZ8IrB+XVdgKvji0veMXVnX/Fef0SJvc4x24TOrW9c1tg3SPf5nOunJhDOazpjVzaqiGWPLXgypa/LptCpeLSVFPdGA2rMNtncrMqcYCl1UfY97nsGIRVTRFL9Jr0jEFx+PxgH08JkHHweXl+5MiR28UJsaQsS8q72KlFXMGfCzXb5NChQ7sTUEQwcWe0snPDss0CvB1Ma7iHfT6oc9JVgeVojH6d9sFyLM260xcQUO21Lbb/9w5CtkAptAgpwuqss/RkDEWgwMrav5udAKwI5a7uEItQ6Cp9X/F139Ilq5wdFvucoeBV1vH4ZQbVu/S9KzFx7xQT99kCsCKCl38KWOJ2Y1YBynf9Gz3jcQKwShpg8SUI72N3FdMzROcF843AFOs6nY8xtqnA5WdcABaV8gnAKtRCgKUH34sm94Ha5DcYsH9Kbx+qslj2x/Is33BgRwKHZsSCGrP4PJpyjzG5PiUKr1g2WFmGyisuM1/CeQ0xZiucZy9tcN95EfTleoz595hzTeq1WoPZLU2Pet/wyub9EutzxVLbxtorUC7YW4ErQuBk8FAGAEvvhwN9qkMc397npHxDFDtiDh1DZ2ZCWJ0TsZTwXv3mNa4pjNGu+9CQGJ1QeWt1cdwQS4GzrXGez0UEfln7ff4X57BXnCbkcrzYPktOZnC/Oq9cFViOHb0fY7vrHcuzAnV9TNF5F+EaSet8xfZ+L2W1VKBs4jFleW62vT/Hdg+R/CkCBZZRAOtlHpPD4Et5fJXnc4gQKHwf9wCxBGzeJ/BF8kPaMwqolmNWapfX7T0q5wFetdrnwxoc/+E6nzsRYHFd8gqsiMcwXR+Dw+zBXp/TGraF4NW0cDluArA6H2CxHyIAK6qvnwvAYpvJPc/ji83tcVz34bxEEW1Yuq1f2MblmcmXm5whWXIq4pjlpARgFXoJe/c0Tj4QA/gZiG82eP0sgseQJ3+htF1X1lcbGHCbE+ZeYlb+dLwhGAn6FSOkYnTAsJ3wqqaM4FUO8ehczjiIGG1MP23a3rnBPCHAWjXwbDP8BQCslhqzR73klwdwxSC4euty/vwl4NXtmN1wgFYvbrhmkqWsAJaW5NPcuT1vqSjqFxgL7+C5oyTwRHyd3hZfJ0eYcJOGCTxeX8dp4dVBduBiCApUx/h8nUcxT7N/t3RSoimH/MM+PXBQxzkAbTOH+9PfU2cBLD2TlvK4y3gqzboq3A4byb10W/+P5TUa5jqqVZ7QOekZYC2JCrDsoOUdzkwX4djSYehazhCLCjoP+RAuPxVPqSUcsIQH5GxfhsxypV5cbPgss12GzeB5fVJxgO2uEoWO6zGLsbvN5z/qaywBWAUFWNLmvP6namVgRAXmXOaQ3I99q35tuXgfmv9zfxpeJQCr8+9rnFk0ogLLqPvBfFoCyHYj9FOcnyHclnou7sYSPvudykyqArKeZD9X32ONJ/GAnAv2c7DyeQuigGWsBycm7p21UFGiL+Sm2mMweH8cypPWDbMHLnQHWQIYBhA4tNSaax+50LQSjBBM7FSsSquNzjZY+vAqp477m6wx987GeQ3Nw6v+xQOvGMGO4w0BVjZ1ppn2YB3zCPlULfnlUCpoZxZEruPzF1Af3p1qrj7sW6DXJGS9jAGW7iD0xjEsFijkojLBNhnj4jBz1wN33TGPODCTzsKjHGTrB3wE9diGt3MhcDQM8bEauGt1ANvo7BghloaTdVZCr+BkJL+Dag2xIpqRp2VAyx9UW41CvKtK9RhGwrWE0LUNCQY04PWhasH6ERnkhPOI7SOh3/qq9t8b25opPj+Szy4m83q2L9/3FuxjYVSApcz8T+7AADbN0Ko+3Wbi8VVui9x3mC9op5f0QNdDBGoQzHgWbXkir6+IebErVbqEzNym+BmGrysXvzkCBCpfwy8UkhLCggEs7cN4GvNG36cizkb4B/2Mjvr80UBCtdMgKbXX/YMEYBUNmB+gDccjKjI5Q+9PrPdr1yjPECrBxCIj4oQQ0p84FNESAvfyOWfHEsvFY8qlb6rPSz87se17ZP8RymS5XoX4UUpmqk2WTljo7bMAF7X6GeBqEGDW0xjUc3AviqxWRDbKrIVboHywIu9/ZZ6++VxDGGG6w99oyxIoGRR4tQ3LBssFXuXywWXNemNumpn3vNpyrCivxLi9KCLHY+lJ6DnePDWtDmD1UtO/sQp5tYnQqokgVjyuLjMCrhB3pprrDg2pFBOiXv4AKzxIv8hxkK47S6+xXWJSYYknwgoZ/HhQFzRI+4cl41pZoIO/V9BKKwv2wvbuUOah4cFZxnaoctjneL2/OMoIeV48V4eZ9LJqAHIty/x0/ug2aq+dJPTxqenKH+O2w23V2QBL/y2n41cQJuNR1fIh4mrEwI19/3wDS6NXehLh/7/nYbClDeY/QOzps0xUT6XPt9/aAyuiCmMej00DVB36WtQLzwtxCweoLFeTYyvX5xFNy+UeI+3tIXIyCYDkHduT7UqYhTgQ0UvljvbM6sG8JdCnKgrrN2UiAUJ1z6BN4HB1W2XsiYl74QEWtrE/4lMNHxwg1n1ou77h/cg94LueP+28CDgQ27wTkQnDhARgFc89jepbqnB1DkXxwaLCTrbd3jNEAWDdpzuAuYc2fIXKqE29hrldtd/jsa2V6rvMyXFqn0qlBJxJG4Nw31Tn/HdFW30v3h9Vny6I2Gd4E9vtb/sMCcDq9LJCgiw9yxpBVmPNo4BZ61haSI8sDv6hVMlyjch1RH3VF2oZmm+n3qgyLedNMARYQf8S8LzqMp7rPLzqxc9HlbbnVS50zB+sNKbqtjy86onz631G0cEriaCC69GmeRxyaf4U5FOV6VXf4RkFswwALLNh0oI3EY01HyJuTtXX/jClFl4Dic9VqQIs9xnr6NUkg3QPio5Rsv2YlEU3a3NtR3WBgJonEEdFOWaWC9LwmzDA5kK7nU09wJR2igv2YT/f1yWXHvxwXsXnU+mhEOGwxHONy0zE2o23lXsJoSfAO0kPBn2oWsT7ggM8DjDof4E4g42D4/6VVfGdjbgR8SJipahWPAy2tB/cbb5L7PRMZKoEM+sIJu4ZO3Zstw7cm/tSsYX4E+LdESNGGA4qcY+rKOOSBw0ubgy/XfcIiTICshREXYVoQsxFzCaURjxlf67nzK/yN8qoPeP52KRU6G+isNDX/mZUQtilmEoI+V3wmSHPWBc4Ke1oS2X7RvxOt8ff/4IG/7zv8jvls1jnYwKwikpZKue/VOeQg5J8Gtu1I0pRPC9G23vZCkz6w+008AXeplzDel+0jhAA1IF8y6gXBqvts2yQTD4UMff3paWEA7yS+yzXzzCfEg+sYputkPBKL411R2DwPx2xasPgfxnUK821RmYupLLluwDWXtb/asTci8xnR+YVTUF/XZ5XxLEVwE4PRGqYMdfc/394lS0xeBUo1RWXVxcbc0RNHl5VAFx1n1CU8EryI9iZ38Eo88nBF5oTn78S+VRt9my/jDAnucnPAK+AVnaSgqaahcjnagDVyrDiKvG52jwBlviVyJsZpcIKHAcSnD1oW8/npN/sViLec1RhMXJWZi6dha8RLyOuRQyS0iMqSfhdc004ws4AYjD+z6WI5xCfK7gQdKCjlcH/FZh1mi5xiMEHa0YYIDiUXcrPiwgREcPR0TuMAJRQS9qJAwX+TIBGpZUFM9MRi0WBJBAvfFy+FVieDPF7sQMb9sJyzTuumQcyuBefNAHB4ZkC5e98DbYIxbCP/XyDnZBX17M6/xxVGA2IKmzzGCqqOMMn4lir8JmK9V8Qy3WO2fvRPN6PyhhghQ16X9Wzj3qOrL0GAravgFjuLxxyT1QDpowLeN1ImdBX2NcR4bKWpITQD8By6Fdc40HdHYiq2X7Xb1n11Fg+X4YMGbLL4MGDv6efP4gdCSLsLMCn4//eiljAfpq6nwb6O00AVryLAwRtwnn4Kpf/B31f8fnnLIND/hzBvh5iBHPVQvh3BSBxbWdk/vOm2D7oiUf4UkGe55vQf8gyVN80SzUz1tdTyYXYmzkeVkBZ1dW2LN/HuR3EawTxgLwAc7AdyMk1qHw8uyQzAxcjyGLoZUHNfgBXVwMKLEFZYR4KtEzOAwOZvbANVVZlQ97/6ncPTzQBPZYIJLqVgAKLQGdnqpKGQ4E10ZjF72jzc0SuNMCVVl19udaY+5/FOY3IG7ZXnmVM1/HK86o4I6D/GHKnNXWOmfYAAVad+UFDVRhcBdazLQv1INVWDEKrrxCzkKOnp1om9UjpZV4CrnwCLHYuShBgaRVWBTvaPtQ6DIIZ2X5cpsU+p45nCDBQnaWVOJf32IGihBzRaDvPn1ppuoCHKHAhYzu86xAnaYjlGfaN0D4krsohKflTEOorW4a2jOonrP9l18sQKwgFpROmO1C6rWIBWP4NyU/hfnQ7uoYMoEQtw22Hg7+X9nLN83BZBf3ktNosJkXQQ57UknJtysuCLxCr+VlyUkIBk3V23zND32c5Lrp0+HALdNS93HvovGRkQxH+t1xMME1gxCRdOpgALL8Ay6Gs9XDEOrkmXaG/qIEVhFqLe/NHLGtCNODzK1i/gVhiy7RX6+ePGFfr508CsHwv/lW8GmA5PkMkb9bbZ8gatqvu+4X8JdfbkuebN0Etr9Vjj6hnUmvEF12BHJ8q4/4E60WIF1k9gPXDWD9OAGf7YG/z/CT3cU5Stp11fFGwni+QkvLBkpqxUEDWxT0JAwAKZiFWExIQZhFqEWJp4/dugFddWbq1sMY8f/3ZhuWDuT6EEiUSXRBbW5g17Bpj5iwwZn1r8YOsXAhcZfHz/CXGjLwO53IcYpQxu9HvqjSUcDlGv7z5/6yrpwJKTTE9mqrMtg1iyI6ca6rNqwOXX24VgrUt+P11qabqQ8K+b8nMgrEBrJJTYIUfyDiOyaKy8aDCmjNx4sRtfJ8Xj1V8gbCPWXw7xn36GpBpmKAVBrpzw99ruOBQ0pWRTjhiqD5Hn1PsE7x5nGJfn6+0UZvtJG2lAZjDYNahhNC9HQXGSL55Pgcet7SPCj349D/QokIu7tkwsb/L9T3Fw/WpFWph0KfbUE+jfkPouMp1STMscD1H2keu+0KEa75GnCb/wfD3mwCsTgVY+ntIY1tPe5xcIOjA84dR8OeP3Fex7wRg+Z2453bHlyASQTvPkLb6gIFWHRGQd/BlT1o81liJoP0qPfdNJc+16rXd3Nd571pdQVVcUj5YKssVFmSF/IEACA4HtJoGoFW/Qfny1uWGQCsNgEBV1u4N1RmYtwf95leZ5WPz/lfZXUukfFDDna78fEJ+pr4pdxuz9D16SmmQxSgOxVW4vPGdFcbc+DCO/RTE8fmSwZ0mlAa80mWEu3A9yrSMQOngq1OD1KKqTAV8sGjInhaPtqba9wGuHkIMTzXU9UrpRaCVSeSeSQnhRlVYyx1hR1ad10l6+zGUEg6gQkqrxryEHgy3H4EnwCC+CJ+j/U/UHSGParULtFrNZxs5tFPhAZb7YKKSCjydbyUWUorThtm130XKuJB3Qz0r14J2Q+dYePChz7V8lzB4uS48gCqTyCnz7ZcJ6fV1mgCs/7F3LVBWVFe2Hr92wkcdEVEBHVRGh5lRgmOcmZAoQeUzgsvRyNdP281XmCGKSNAomhiQmayE4CcmBPzwsTH8GlDACP5gqUGiRr5CIigTWCsRh293v1dn9ubds3JWTSPvPd6rV4+uWmuvW13dXXXvuafuPXfXOed6lsBK5khg/c4SWCf4EaWPEs1Rm39iD6yS2JxiZD7tl+PMH4T9qKQk181apwxD56cx/6J6oIZlmxboI5iVw0inn/FmX6W2a2F9ebKQU+h0EFl9kTT7ZyCytjKEi7u8ddwM76yNE2TUirH+/i7l6fxXbUuMwFK0H5ZOdu71BoaLTJsvsvEPQu+moOcTy5COYz9z+2ciM6pF/m4s6tsLuEPk/OGa56p0kEij7qx0kvl9Hcemylc9LN6uB+WCjRMZOrgHWIgwwWHebyd0ChKv1NU4MXtMYGXapjx6TOji4mXu+FKItlnj2Lg3ax+UGg4OGjSI5bvM35Fv7yHcu5XZDa4ugu0PP4Qw9/CsXswthHuXoizrXD6PRYVe0FD2JnnsXruLVBiw4yvqcEtD+mJs86/QO4l9rl/xTzLyagv69ELb5pjACsEDK7dcjC9AD4s6R8cElvZJae6uagnQkKA7OB9irjWtUyY6zx0LaXNpdEYIBKpfwGdo8vZ3aJ/G3lcl75Xldi5kaY/37j7Pe+++Aae8N/4X7Uhmbfqu/HLmd0S8Cl+8oeJ7FSKtQEqcXi7SAqB3U+NS8AJiXVH3i0a4HFI9AZBaU+eIvL9N5GBNPcQS4AdwIofv7mvvbQ+GN24CqfbkApEL/8PVcQDqPBwyr2QbIk9Y+Y0AJM/3kfcq1bJS/NNBXDXl724FbvKZu+vZafd87m2cuKDzhnGj2rw9/lJDUJndBKviwSUmsHJdcHZgEssTXHAmzeKxr71/gRJF/6czHkuOVFAPLLdbV6885ySyich7UudKgHjxI0hgBcOz7i5BfavRLbBR//NUNwodlsyFE575WibeIIVK7s3Fh21vQyKxuHMW86MYT6y6k4S82s4wHdvWmMDKwAMrPAIr+GGssyaS5lgUZR2LCaxo5cEC8dna7kQYNinpcnxerP2ShS19GfUhSGKVGOo0RB9lv5i8OtlyDtDLhaRB4Gi/+aFzvI8m9nvn8ZtelxF9RLr3T/lHE7lXAkNdWSHCpO6nlqMEmkWZxHJEVlvUvROJrEFA7/T10T8RWbBGZMdukbpUfZ5S+UHwSAG79oosXysy/il6hwF9gP4gsXDebhjrHGmvN78JCKvmIKtaAi2gE2W8fhvbAPw7MFD2nzFKdnR/pPadMVUy6XvVS4OkFQmrNKEa57aKk7jnJW/NpDzsHFTrvrhWs10hkFgPGFKhtlQWY07OB4Hr7bxSoFwSD+F5UQ4pSoFsiCqBZfVNd9cqFRKrhu+G8xy7Rg3xEHPrjdZdFIkwiWGXyPmiBph01pLXzSCDmbqrls3hVkJIEm6u3Qp0Me94IiawdKyPjgeWJf5d2283G1REcY5OETGBFZnD6vNkyCDsjyA17pm/zTJMOWFs3q9zx2zTf6kSG3N9N29M0cbFOw+epEnfgSbBxO+y1JshazyRea1q5alLRB78hsiQfiKXDnLkSqVDhUhT551FlAFR9cbi+bkghzoC3mCgL4A2dRoj8r0ZIsveEtmyU+R/D5Fkyt/hAwcOp4mylW+L/PA5kSvucTm6rgcGphO0dxjOOkZ5h8GU37zCp4eVpHcZdITgt4H+cugrw2XHVZNkTeUMmf7gUhk6fZ20nfVhrbdkt3jzPn637wxp6fFYPfMUrypmw2MCK7/toocGsPMEvbC0fT69f/T+haqzhj9q8sqIf/FKGrfsvex/uwthAWXEhLrPRTGkyO4wxbqFSmDlvrCdimdGnTTV3S5TQEWYRqjKCnrenl+xQw4jVE+dDRinW9vFRwMlsRpDFj/Ud8zmZok4dCcu3c5+rRKSlryKCayQPbByDyX8fkSJf7ujJeHHBFZ0bG2046toxwH8XIw55GXKL8s+TZidFP8B93jf2V2l8gEhyY+Jbsydz48gsfdVAzl+4zyy9q+4oI0sSbwvv/bEX+bVyXJPhFgEPH82Eox3FRnTU+QaJhkPemfd6Uuiog4lkYoUiWWJrLNR378BadSC1wYC/dJoDBJp0KPpJOpL3xBZ+zuRT5BU/U9fiHx+gGGH9Xtr8Rp/t+9g+m8/3SPy9ibIDaTY9BdFbn9M5Py7mJTdEWf98axyXBtGjyvWLapeVymgTohGFc7L6hafpFUSfb/nsvHy7sDp8syEBTLqx2/KebM+AFm1Vbz5H6dRtS3pvbhDyuZtOui9uPnytGUgscdVHEJYkF2sUKeH87Dzi5I0C60xW+DFxmhu9QuDJ6qLtFqzGPsIdb/CGjyF1tkhQ4Y059bOeH5UiBffkCz7gTdMvgs/agSWGrFG3x40pEBthL6wpowX0n5ggH0Hi7CT1BToXJhf0HXsWdbQjW+rr8wHpmEtxhMmFWWiX3eZw/lshhNpm1S/YgIrBA+s/H5o+m8+I0J5Kzn/qKzeBPa5uqViAquoR5D8fC7kPGo6h/wix7kzYVNzoB8Wm7GszkGiBrW/nKyXMIdqnLi9AR0i6S8hsqzp5bKk0UFZ1hikVdOULG4isgTn1Z7IMuAlYClQVSbyZGeRCd1FbkTYWOvbUmkSa4RIo2FKgNQ6AsSPXFghS+aZOmdoGqeSoBkC3AT8mws1HACia6TI1RNE+k8RGfukyJTnRJ6oEpm5MI2n5otMfV5k3FMig6eK9JgocsldzjupD+HuORiEmSPPzgVOo6wiSVz5QJ3ruzQ5mRghLI+cMVJ+/61HZOXwWTL50ZVy9dPrxZu7BWTV9jRh9cJWKZu7WdrO2STnpuG3xs9N+Pu5WwdqLrY4SXtMYBUomXtH4NM8eWElUX5L7x/CgqMXsMOQNDURWKTVBRZji+jpZj0JwlrIchtkGmWoR7GJl6QhWYgB3O3H7lgV6i6EuevbrdxF0nxhrY0KSYryf9QDshgLGGPAn0ly0S0IjoShW2x/cPHR0OcsTawPnV0AiOuPSJKvWj+Uf+ZOqvURcjGBVRoEVvA+mPseZv+aHV2TxdAzDa/WnVmBbsAX6ukTE1iR8sLqxHC8kPKo+UDKjT8PnYDncsLoQYLjGLCXcxPaFbWPrEklc50u/5xrnJi8aljkVUIecgTWYjAtJKmqgSWeD4gsTgCNgSZA0zShpWTWcmAB/m7mReLf22On7935kngVe6UpSaw08eE8eWpdKZFDI6BVhciZlY5gomcUylPKXbjhLS63U1+gF3AN0N2hB9DThQPe6P52EHAH7uPuxXu2AU6ttAnwI0Zc2T4a6vpumPiNK/ZJk4rV8FC7Z9oPVr7szYaHVdXHvverHb43f5s0mrdF2oOsOhtoA5wGNJuzGYQVMG+LjzKZDiPc/JjqW5z3Kg4hLKAR/H2TdyDnSdEZAfMLvZC02+Rzdyo8e44ugtTTh27RxTAKaKzQaMHz/4ifx7COx/MkCMF76B7gQGAR64fkdVVjvvL9Aec3uoXNQMpK35HQPbBy9yr4GrCadSDUewTwQw61ohzUAF0Def6ThhfZ965IJNY3jXdkTYFlkXTk7CQdGxp67g7KwOqsI4w3oD8skVUDJItJXAFi8nUtAS4Pjl8xgXX8EEI8MxwCK3e5DsJzdhfhQ5Ovcx2erQTpKDf/XMkxKiawInUkTD7F/uwbyDqMOUQ3valU3c2H3cX8fbSHNURRPRGLGFqYDHhd7WUkA+sak1cNkMDScxBXUxA+SPIqiXMfpQRgCK1m+LmZD4+slLyO66u8p3kP8YZ3QZL3cSBDVgJfkAxJo0Lo3YPSeGVFEI2BZqhrC6B1ZToJ/DkuT1VH4EK0pZMDz3mNvyNZxb8lEdYSKKuI+I6N5b7rC8B5zwHsM+AVYLw0veNr7w+Z2tzjsfTTEd6indIOpNUFszelzgJZ1RJoQrLqmNhUBwKL54t4iziMsPgEllu0qldBKgvUOfIqFSUCy05YzDVCg8wYC6kcoLuYHEbZLYQJMREImRnIJJxsgyVqChjK5Jv+TTriShO1Pwvj9tJiGwb2uZDLN1CvV1U+xrhP5Vk+fnCBCtlQ/3/FHX6sNxNgCZlUhtBd9t61BFYYpIDJdfFXeP59wG62T70XTTv8Quoanqe6tpM7c9LTznr4RYAUZ12GcFtyQ2IlCyAPLkA1THdkbIR/aUjhmSSydYy0id6DelvIsVLnCeOZsI5jgb5bLIlieKzxQ4jR11QW0M0TNoIMCtUDiwtkG0afQ50/BJlztupLoWSLOv69y7FT6PnZ6lpKSX7ukIrn/4vxDLuaIdcaXp+D3HaRwNJ25onAWpej/ql384oSJ7CCG6jcDYi1SwugJ4eNJ1I/7ZN82QpmZ+iFQB3GPW0P1wNW//1Cj7vGRk05Yq1LTF410IPeV1qCoKp2BFYdIMfFYi+FkEOR5WU4b3WXva94o8tAkFwJPACsS3v3jBTxNMSwQnNl+YDECAU+kHKyd30xkteTwFoQWfen+wwLicBx3TMf9Ggzd9ORRggJpGcVIBkg6S34hOWHXtWuv04rRkxgFZnAegtGhqAUXM8YbgLWn/vqfSOYd2Ay2sf6sp45QRcmJCussR3mIg3tuAtYT5kbY8EPGvgkFHk9ADHwA0gRlqhwoRG6GDzABRC38rfyjUjC/oTmxeJCn4tYrbfJAWLlk4tskoTKxRA764HBxmOumRJY+l7gPGsdY7JUElhhG192hzvI8BLU4zElsggNpc1Cnn4GupZUmRL4+U/Az4CLo2aA1mO47+S4YjwdjExyloeP+1kdW0fCOE4+W39/BMdIYChk9joXUJShJtsOjgPH6aeMxkqFjpUmP9pqjJV3oi6nBt6tRNjjoyWDcpzjtV3brQdWSIv8xXh21vO2CT3eonWmnhTYGzBBb0D0+xu6mM7j/ENYXVO93sZwrmuvvba5Hb8xXnzTeM5lJTfdlIUhunn2wFoPmZyI/r0aAoEVtl06GNintqnVk6ANl4F+EEmTyN/aQMttqod826ZsE57RG3gW2B2wvwJzYwbvQGY2anDcPYKfq1Fe71myLY7uacD5r1Z4bUBKbUMpKJOAZICkLD9aHgG6p4mw678iHhXJklmDWoEcuQ7kyHRgh3gaYlip4WtJYRkTTAWClXGlDe/cBvwY13qIV97S9hn7ULyuTZePXl7m8aja3gE5r7aDkMqcwJqzOeXN38Fwws+9OR91Tt+nKjbMi7P4V4+LVW6xdAA4kgUOucmkBuht7xsxL6yLge3OSDjg6nskSxwEfLrqWy+ssENmSGw4w6cK9fgj+00XamrwHWuh9SWGhJKRlkjg9feASZqkPdSQwdy91Uj0DaVOUz+1PWibyoZIZSgfXxcAlK8JgViN63dwW2q7QDU7YA7UL9qsQ6Y6ZnYoWsd7F+N9sn2r7w7q9V2S3Gx7ffJEe79M31IBUJ5W19SDcy2uj8PvOwcJiqguQOilwPxUwH7zDh5Px1JB/bLyYOm8J6qZrPyGG244Ld72+/g6q/1iyOyrgMkktIGkvr+WWNZ+ymY8qEd/9T4bcc/H8btr6DVo51mi2DnDuLjMcY4/SFkBH9CbKeQcWPMoax1Ds4COoxsK5YFlj65duzYN6F5/55WyL6B3+Zh/iN8AY9G2dvYdMLt1fp35DJ2+HsxQZjWUm3svfg9cnE8PLNyXxF5O+uf+b5klsE6iXH5XoG0vUP6BedXPdg4xuqYfguYxMoIfqQsxh7Af7Ecvk+NrDPAK87AZ+7RQ4+4m3HMaSVvK1epePGc20EOqvMYu/1UXkFD7Zbl6VmVGYDnCa4dUex3s/cS7uTFIkMBEwusV7UCYVKJcBRxByKGSKURdTGTlFUnrbUVZ4/wgri1DH9wO0uqcYP+wz4R9pwOCCEpHPM3Z8pq36NM0gTVvs58BiZVicnee4+/7xQRWJHKKXAh05Zd+lJdlCiyuLqOrLs+5y0cEF1rWGO4IXG7bmGVb9bwrQinO0vuHTCw0ChhCf4vJexjwS37hpMFgPKdYfhnUEFDDugbYBSxjwk/IqWefPn1Or2+hGGGjsJEllBhWgfZMRPkS8JmGSGQqG5OYfY/z6ngE6GYXqEGC0Xxx7mL0JiNQN7Eo+SqNQJs0tdikoHpqoo7dKQN+0XW6UpeFPK1xfQjY7u7zGHAdF35hkqR5DqPgIuQJ4CO2LROZGO8g4oDzppiDe42gLsTeVrnpbHB8IhHs9PZeLuiATcB+wDf9kO1YeciFuL7EHItAb7y7berzDovK/EcPjFzmeB2TSNZyTA1zTIK8z+ezc60zSZhw6lw/Ucm6kGjiZgPMkQgczna8xP8qGfEO8CPgOvXss3ofeG4L/N0/Al0oixzk1plzXB7kllDZ4N6dMBfmrH/43wtOIkLC5jO0YZ+zgK1AjepAFjbKfmAjMBMopwddmLZXUAd79epVRh3khz6UT6PcAPxZbYYcx93Dzu5YAUwmOccPlsG6xHMnjpjAOkpg3SzVmsD9+ASWy5GVlFeOnr/KXFomJNEQIpIQ7yqQIlbRlOCq6AZC5WmUe0iuEJorC0hKTEDliqTLN+ZkOoxy/QSYBlzpyKlAXxD17BAo5trczTO8Rbu4+2AK55kQWP5RLNxFb6xxfwkhjHciPAmOREOoUzGJBU7O9ZFI5eXlLZ3RdxPDCjC5/xfK2SgXc8JH+QbKdcCrQDVDSpxhcT/K22BUXM1tkrVdpWgUqHxY1lP/DtxFEhgJPOpIv2rgFeBNJ5vVblH6AvAj5qlAeQMJXhpkwWTD9lm2Didrwmx73cnzWiaHBSY5eS508nsN5VrK1i3eZgE/xfkPgGEw1v8V/9/W6nGQJC0VXQsSl7j2z8zdBUxzIRVLgNeBt5iImDJC++eS8HKkyrdJgCEM4qxjyT/+kpxtvxx7vIKcW5PI4XsNjEIfTEF/PIPzF4Flbnxcx/7iOfWZ/cX+BB4AbqWHC71f6nsGr8V91nDtkmPNz8wfRr2B/lRw90I39y5CuQo/69z8GvAyddGNH/fhd7eQjLAEvyWuCjX/xF6foc8hNp/fVcC9wOPo/+dRLqWN4rDCzamznY58B+WNjug9o5i2mxJZ9ekNP3AzLQFD72kDOO/YWSir2D7Ufw0T/bON+PnXKJe7Nv4EuN/lFe0GMqu9kmUxcRUf/+8gkaEhhCCh7gMZpeSVD8hx4Aux6uj548Gk8PawYWkkSlgGvLIuAeHyCADWY6gNL6yNiaysiatayM7IsGI9cDeun5dBX9R/VEl6sJgHEmrBTlHvqswIrC1Jb/FnPH/C00NiAqvYC9XcEX2D3db1JGhrQvssk8W+iBw1djXMLdv7l/giNnE83WcICGWTyd9ncl99fi6IoswtcZqB7idU1/6PvbOJjaqKAvCpATSwIAaikJiwUhOMCxcag1tXyoIYdSWmcaZ/mBgXbFjJ2gUad2pYCLHQQqHQH36KqSRqXJAGTKAZWgoRiIYEFRONodNez3nv3fTyYtP7hnE6bb8vObmPYabh3b68N3w5PxHnsYRFTXwvuHA/Yn8eEwdjqP9e2vvtdxXeD4rcK5frM94+z7+52PM59vnj7w+2NsPzx4LfZXM+Q2LuY01wP2op+nvL3r/GztOOi+wbfa5gvgmE+zOBVY0UWDPJekZjQD7w2Vyx4swLlAdf37VJZcv7Klu+0winF96ntHDBHlf3073q8q+NpmWC7evDfffSyo4lllGXWvDuKzsSMdUz4aQ7QmAdzgSWZWAdrgyIF1fchABq/rJsUYtkCz8XlEa1LOf9seMiX8IQCgvvJ9daui9F/gOYv764xhbvPsn1C812v+T5s/KEeyhllskzpEWD+y40eALh57JaZdT5LJuqGj2BcDATWUOyXRQ3KqtqyQKzEsMwE8jJznUqYN7SOJOTMtNMLQwi3YvpQPZZjNje2RTIfIngfNIqOgPr0OUXVEzdlaNTVkYYP4nw+M+2XpQDl9aJsZdJhAB1pMWHPfDzEf79Ct6bR+bbG74g1edas9fCWOnXmL3G9dW81y73SuDZDEvlmcp9F+C/JhAekw01TSA8lWRf3XHDsjXIwKoZE1kWkmESRoXMmypkzqWlhZ0a75m0qa5wkeX3YGaux1XpvJO2t520PpZvyC4Pi8uE07HJJ1RETRWaRGjv67tuwuum9E1toZE7AAAAAAAAANTWwP2kPKdxx50qKLDOJplYl/XnrA+E2EOTZWTlRdY7KmnGgqmFVYsVWi5YnetzVR5Xqdeme7K27uLKCDOmPpt4VIXU95ZRFS+wKlU5cs3KCf+UI5Pb0p83ukoAAAAAAAAAAGLwJX9uUF5VIfWPG/ICK3IC4UhyfNrEVVCSWDd86dvcn7seV3GzWwXO7aBkbtqkzsorFyzdSxvfl5+cZ7/qRH4SYaVb+m8lYipqEqH1yuq5aj2wNK6+kfXUQmABAAAAAAAAQEGBdVJ2puWAaW+ryAmEVXcu+cyXuabwdSc/LU8l1jMqbr5KpU5nkpWUiSy3PMOfX4fPPhvWPXgxP1FQAuotsCyySYQf61TBQgJL3+uk74Z9pg2BBQAAAAAAAAC1lRCekD3urJdT0QJrxn2TCKyPfPZVUYFVvNl7XmSVdmhcTDOS2vy0wuXWGyvMurqtscv2INwTW+V/JRFY6b4furpb+m86k1dZuAVixtakb1Z3ZQ89sAAAAAAAAAAgGpNNXnyojPokE1izFhECa8bWrGdWKZNhDRApXtqEjd7bN6rU+TSVV53LqTfWbHpO7S6Ncr+Tjq1hnyu/341gTmCNt1pPK8uq8nJqgZi1SPtmje/zQkyDaRMAAAAAAAAAsLDAEn88IAfciBdTkQJrMFuHZLsXWNIwfNlc++pAZL2uwufSXG+s0vTSb9TeZce/6/l8aOebK6dsLD5rqqfyWlI+2DNRRGDNZFlbB8XjEFgAAAAAAAAAUERgnZRhdy5r4D4QIbBOmLhKjv92w/JyILAazoPTCls3qfD5Ii0n7PASa3bplgyWL+i5bJOMUNgtmsD6uvKSZlL9Jb2TTrojBNbhymwivPpv2fEQAgsAAAAAAAAAovETA90FWa3S6gcvsDRcRFSz8sHf9LNPL57ACrOxQpFVflcl0C8mgXw209KZMuhLBkv7dd2Yb9K+6AKrd+pZFVN/yJGpGIHloyonbtn6rXj2ahYZAAAAAAAAAEBUA/djskEl1E9upKDAOpOsU+60bI4RWI3Pxmp/XiXQqJPOZi8pDCRbpx3fc9K2K7bXVeMzsK5s0YyqX+XodadrNVpg9ZvAGv9Ret2aVGA5BBYAAAAAAAAARAqsYXlKBVbFnS0msLL3XzIBlpUkNoOQCLOVTGKtVRm0LxVYHU06pbAcThkc03glJ+SaA9/E/eCVzSqkrknfDadrvMA6ftOE15j0XljPJEL4l727aY2rCgM4/kQmbRCapknaqq11IV0o1EWhiiCi4Adwo+BbiEkmbXDnB5C0iq50V3wBqYLOpBMySe5oTJvWkYpvVKs2aGYyaZKmQRCVpiAUbWYez7m5B8Ms5N5pa+6F/w8OZwiXMMnyz3POBQAAAAAgFC1KKghYd6sni3oiUsC6FkxsfaXjsiVOAcu9qbD+SKFZvwWRaNWsajzilQ1qaQ0mr7LrjwzaJUbsAtb7Mx2SKZ2X/FLEgOU//7Nk5neKlVMCFgAAAAAACB2w7tWC/KKTEQPWKbMXZEonZHPcApaz/t4olfQBld6zNmK5yaeNj1cH3efDIY4MxiNgjS60SXbmOxmNGLDyF+0+K9npOwlYAAAAAAAgFH1bmv29IPvVkz8iB6zT/u65y+DdXidmRwqf3+5POvkTT+mNuherZuNVMHV12aznQhwZjE/Ayl3YakLU2cYC1kxFsnMELAAAAAAAEDFgjckD6skV/62C4xEC1qf+BFZejHgGrPojhf3N7rOdeNqIe7HcZe3BFNicWQ9LQOWRlMSZu3T9g0qrZMtfy+glAhYAAAAAAPjfJrDudwHLhqlIAcuTkSQELMdFLEul71mV3hWVQ8EkVs/NjlirZtXW4lXPFyrde+vvu0pEwHq3tMUEqS8bC1hlAhYAAAAAAGgsYJm10lDAKkguSQGrftLJTkCZVbFRyU1H3aR4te5Ng315la4O913q77uK/RHCY9+3Sab0bUNHCIdMwMr9tIeABQAAAAAAGg9Y0Y8QDictYNVPPdlJKJXez/241Nar2hJMYjXdmHhVa+mravuAavMhG6/eVHliU/1l7YkKWJlypwlS0yZIRQ9YmVJJRhZvJ2ABAAAAAIBoAcuTA2ZdjjyBddoPWJ5qiEvcY3ovlpvG0j0D27SjdyS4E6umrTfiOGGPVlvTNZVuVXnyqvnZKyEua09AwJrfad8mGDlg+RNb5R/kw/PbxMrlCFgAAAAAAOC/aVFS/j4u96knv0Z+C+Epfz+pOdkkhgtZSaP96+7Fuqv7HZV+VUlXtf36Ila1w8awp67prhf1XNfRYQkUB4+1SBK54DRS2S1DpWUZWbBBKnzAGlu2z38jxYUWcXdqAQAAAAAAhApYBdmrnizpiQYC1ric0YLcmtSApSpN6v4P5+QO9eQTPfxocB9WWrWz5zri1TP6l/k9bw1OqOTmfpdcZUCcYjGV2IA1NHuPCVIrMjxvjwRWQwes8WV7B9YZUW0iYAEAAAAAgFA0J36Q0AnZrZ7M6slIAWs1eP5HzUtH0gKW+77u2KN+LPt0bPO0fiaqH0lVX30wOPqXVt0eLWJVO/vN/rT+KQf19ZcnVYYvrLaPLumu4xUbcF4Sp6ipRAasXPkhyZavmigXLmANlWr+pNaYH7AmxLEhCwAAAAAAIFTAKkinejKtUxED1qS/L9sA5n5f0v52ywSrx9STi2sTZc2rWmiq6YRo7Y39WmvvWotYO3pCxiv/2KBe2fqCHnltysYrvW2opDsyM3/b4HNLftEGnaMyWEz9G7G0KVEBK1N+3I9Sx2dVsqEmsGr+c6OXzOfyewQsAAAAAADwD3vnG1pVHcbx514dbomSlpr5p5kgVFJBVoRQUi+yN1G9Mi1KKAUr/xFBVrAiJDSCsBdNJFTa7tmcc/fcbW46t3yTBSsryHvOplOXSUlq2TTdvfc8/c5zfz92SNNzbtftBt8PPHgmd+f+fnv54Xm+T2hM95GfYcU2HeCOaAJLh77/wc10h5FC/6fRSS3vlrJNf2p5l1HlcXKUelal7ud9Mpdzc55jpmX5TiyzmTD27/Lq7C0r+a0NnUwNR3hawuGJtWlf3HA84WTI6uF8J5LTQNvSN5HZxldVFafSJmYElrrLKxLgbrmellN89XJz8jkJce/5YEheQWABAAAAAAAAAAAgRP5TQOTYRmCpZy+EwMpxi2whHPQ7mIzAKvX7/kNeVamzM7dpeRW8dzKuqkwkVrZ6DmfnLR6SWPHLJVZuki+vFvHpW1fx6xu/EHk1M5HmG0VeORwPZEGJzEn+rJ7TX1Ft711G6IjIKk3kfFI+CWdj/vxuNpTAMl1asrXQXaOlHTYQAgAAAAAAAAAAIKLAStJm3YXk6eKrlvnMbpFYLxmBxUSxUh0ZDGR+TWKbaiTDq0XLq8vuZyTWGLnj4Gez+dKCIYnljb6CvJqxmtd8uF/kVaWSV+O0vIpdWehktQTqV6OFC8lQ3V1WsgLLkHB2SBdZSIElOVmWK+OUVOMsITM6CQAAAAAAAAAAABBpjNCmd3lPoLsqjMBKUo73yfP75l0ixUp5ZLCJHuQUdXOnf+4QI5PJmKpykViXts3iC08sYablsp3QG2W2DT7Lp6ev4rVaXs1S4mqskVdXz4UazI/VuReormdlUGKV3Hid2RiYdMaR5R6kxn4jsPja5WYl8D2RPk+16Ufy7+uCwAIAAAAAAAAAAEA0ueN3UckoXUpV8toCS4/bZfXYYUOwq6ukRgarqYw03EIvsk2/aemWCSfq5O/BRmJd/LySB55cwp4vsaa+nGNa5J2dspLN2OBsJa4qgvLq2jVIDX1MDUeZLHcL1RyfQCYwnTlOpYIZ+Wtw7lYi6oycObTAcrK081i+2yxxeIa+H0YIAQAAAAAAAAAAEFFg2fQop+gvbokY5N4uMusQN9MELY3ipTIyaGQat9FEtulTybtqFyE1aEYgI1VTRV5iJSq9c8+8kGNayucmr+B1Gzpzvry6XYmr8kjyylQ6IyN2JhfLcu8noYQ6lbr0ORLpxVTfy2T1yGhgWIGlO80OUGvvGDIdXQAAAAAAAAAAAABhYJMLtYsq2aYT3BZRYLWKwBpQ9ZARYiM9EqlqdKDr6mG26RvpFGvWofM2ccGVLPd4N2V5x3g+8/xSXr9+P1NjH9+mJM3YWicQ2B65siKEkif859Oy6c9QzyPcjRUMcE9voqaf/DOG20Aon3Gzci/L3U4GxgZCAAAAAAAAAAAARM3A6qJyTtHXvCeSwJIRPN2FtdYIsZLIuqqnCk7R22zTAHfos5p7FV6eZ1OGOyYyt9DJX+sXPk1W/6bpSs6M9zuSLCcjnVeFlyfdWGrcTo/o1VL9jzODXVAjIn6MPGv/Zay6YzftEoGVDX0nVdKBVee8MdR9BYEFAAAAAAAAAACAQjYR2rSFO8gILC90kHuHCKxk8J0jtWFQbxmczzbtFxnXqvOuQtwnhKzL6PysI5nkvfPzd+XYlET6Y2o8zjEJKncGVfF/rKGRQsvtVbUoGKY+7GOFZjNioneBOtsF2SYYXmDlqK43f6eE+xjyrwAAAAAAAAAAABAZJooZ+cM2Lee2KJsIpbL6d05xI80dzjFCGRfsDoS0p+hmVe+xTee1aPKK0HUldxRR1ynP33IT3UmK7urqMtLEE847Imoa+ooisWSc0GRHiRhzt5LVOzsolYYpRypGVVX576lzNgbHB6MFuDt9tPPQVPJh5F8BAAAAAAAAAACg0BysFponI3etehNh1DHCJL1p3jec2wXl5xQtVvUddxSz60q/J0UsQixFbaqmGUnnf6/kUxmsnmVkuRepsT8vsSwteQotS48U1vUw2SdZPR9T719B9V9WBEXWdR0r7GKRkSKfLOeQjA+qM0UJqJezW84uUiDAHQAAAAAAAAAAAAVhNgdyK42XDqO9WtxEkTx7RfAc9Df+GcFzXcSVeW8wpD1FjRLQ3qHFW3G6riTwXbYy7pHnzapuIIXIsyBBiVXnPkWWe0rG/0T0uLnidGOlMyLGdh71/28f1aUfpyBV1ykfy4wrWu6r1HCU1b8yFhg+/8rNifSqdVab8HYEuAMAAAAAAAAAAKDQIHeBm+kj3hclyF1LoxSxHiV8Tb9zdNGkFVPcdHUFznkfp2irqgE5b7OcY7BIXVeeyKt2/XMzrSMhIK+CmFwnI2Zq3AfIcn4g+6SWPa7kRRWhBikh2Vj+80XZ6qe+6zKZVsVxOUuxsq+2H56svu97GR+MMB4p994hI5W/q7Peg/wrAAAAAAAAwN/s3U1oXFUUB/AThAbRTZFCxU+66EJdVNQqSqEoFcWl+LGQIuJCXIhKUTeF4NdaEClxo7TNvJdnPjp5k4nGwYpgQVy1kvjeTKj9iKRSNFJRY2bmXc/8uRcuAWFmchtG+P/g8GbamTcv2z/nnEtEFKYLqyyP2dAG44E9dSvN4/VZ/e4u29E13G9o5Razb1wIr/d/QGtU6zcEV3O2AyxU15Xr4KqJwW/oaKKobrrKEBy5gCbJb5IoryBsiuve2N2mq621jkXquHf+u74/Ikl9j3iwt8qFWX3Ad504e9eGV22toqfADSFePt8JwxhgEREREREREVGYPVhTcoMpyxl7suB6DwFW4QU/Ey540vtuw7276bLSgAi1MbTS0T0brMXouKohuELY5I86htx3hVHKWblfoPu9Xuh8OmnH7qqNYYnzD7HYfeInBDouAApQLXQ46b0RLsX5qoZkn8pn+T48w4ZgDc+koVQXnVlD2Hvlgq+k/oTE2VpvJw+iCq22fbbXRYDjg0REREREREQUaIxwRt7bOEbY60J3vX7k39MPqDpjeCh97XdZgR9qVeUOvc8hrVNahbeg3e25KgIFVwXGD+fEPfuY/s4O99z4O/pbfg5YvB5nV+TEMkKggCOFhQ2V2hjVs6OFWlWtF+R44+b/7K7SQAtdUSiDK/7N79gaX3pIn3tZps733EGGz+N7+UWJf9wtCvcnIiIiIiIiIuqXPyJnynI3xufseF7PI3ipDYJSmercS7pkKrJdv7NX6xWtst7vMpbD18SNNLbCBlfePWt43r+13hDL7wbb9BhelO/DHimcyJd7u6RCBVl5C5UsGSnrb0yeM/p+SX9rVMazp2WsvgsL2buRLGyTqP68lLJfZBonKnrhVY+nD+p4I08fJCIiIiIiIqLQY4RgUjluTtrF6P3tkTJuj5TWmNbLWo8joJqVPVr36utHTEWe1etb+n+faH2vdQW7tL5yS+Fxryauacjgyo5IVsSNDJ7W948KBDtFEaENquPY4o0S5SWES5NhRwr9sT0XOCF8SlcMQq0oOydxnur1HRlbPKgB036JF+/S6+0yefY2KS3cKaXFA/p8r+nnapI0EIL1E17hO1jenv8lUWO/7Uhj9xURERERERERBe/COmBmZA0je/3tmSrwvc8RRrmOrDUbaF3W+lXrT3Rr1exnsJTdG+kL322FcqEYgrJZPNfHet3pL5CXkIwZwoieE2evYmeVPaXQ3y0VOMxqohMqzhFm4ffKP7tA6w+J8kt6vYCKsxUETu5zca7VV+cVAqzO7yCscwy7r4iIiIiIiIgo8GmENsQ6ZruTmv13P+G763hdtV1VX9iaE/+0wyZCq1SawUOrjaFaagOzVJa1DnYxMhiGH2Il+V6Jsm+wFytZsjum8nboIMs/uRBV0tdx3WD5+9R5LIBHTV0wdlF7YT/bz7Pg78DCet35pa8fFPd3ExERERERERGF1FmwLgpjfjOyakf5mgHCo5YXaOkVoVXbBVZXuVr4rXkbpKUSmVnZ3cXIYFj+SYDJwvUS5e93AiMEWXFWaDVxRRgUvuy923pt2qDqH0HhdWuTI40FAjJ0X9WPiMWTB4mIiIiIiIgoOIzRadldWG+bL10AhbDJ/K/KhWZVMXZR+5KpyHP+6YsYGdxCCHT8E/mS7GGJslMY35vAbqyWLbM1lYe617pd+l6Xowu3SscITx4kIiIiIiIioqu60B3Xa82MfI1RQjcKOPjl9mi5Je1u/9aoOSG3eOFVkJHBIKcUHj19nUTZYSllqzhFcLyBQMgbKxz0amHx+3jdSJw9xfCKiIiIiIiIiLZ2oXtF7sHi9XnvVMLBrcIGbQU6rqr4t/nOiYd+ONfpvJIBgG4sP+iJ8/u0prWwcB0jf95phQNabRSet/6BOCMjXNxORERERERERFvYiTUjTyIYmhvYEKvQwk4tjDxq6fsfTCovYqeX13UlgyhJrkHg40T5M1rfYbn69EWD3VI4UTArBjC8akq6YhC8VRvD4rrLiIiIiIiIiIi2gj9iZ1J5ycziJMHBCLFSKdwJhrjO2z1XM1LXelOfdae/mB5/y0AzQzixzxk7s11Dq0MSZUtSXsapgVJyC9gHIMhCqJa1pHLJ6DN9K0ljB0cHiYiI6F/27ubFrTKK4/gx4ksX0i4UwZei/0B3XSiu3LgSpV0pLgV1qxtfEKKCuBJ0ISiibkwyd6ozuZmZkmJnEIvUlYLI3EznRdpS0UUXXfjSiT2e/HguPATELIaZifP9wOFJcnMnme2Pc04AAAD2hLs1LPHSnlMn1hlznXuy2F2fOVT1zLOOq01fsFd9ye7LO8hGZVNE3VgrrhBI2uv3W6d6zdrVVh1k1XunFCLtTZi1rbO8Mgqylq0Y3GsjK4RXAAAAAABgP4RYXTvhpf2m5eilSh1QuzAiOEx1o/5VQZ09+94X7KU4j+adY9rhNb0UBmlHVq3YODpa9B61Zl/8rNHCtOw9dWUNhrswYjhUeDW76TZ/2eMzZ2xu6wjhFQAAAAAA2I8h1jEv7bT3zdWNVaaOrBQw7WCn1XaqG75oebfV71F979oz8fzw+PL5NC449RRgjQdDrc27rV09b53qnAKr+dSVNbOWAqbVbZ071pmlv7OtisBMy9pb1TXrDF4efTfCKwAAAAAAsK940xoKsuqgqGsves82vJ+CpUWFS0PtyEpL1RU+/ecuK9VQIVh9b5n2bX2lUqAV13+I8x2ft4dH3yXvuNK4YJz2P6QgS4vRs//v063brbX6uLWqTzReOLvuCpfmLroV6/WOquuqFGhN1KGl96Sl8bp38Led2ky/ijjweP2MFRcessDCdgAAAAAAsC+55eN56sa6J+oV79mPXtaBUwqfelFdq3dWbdcBlc54rtL1FH71073L6XFp16K+i3ov6on43COWSaFVQ8HVQaAgq7g5zoZJNl7YGTxr7Wo2akNhVfeyQieNGs5upIBqoBHAFGr9NVbXdU2L4td8NKao++cvje77I671o8vrpD47fRc9BgAAAAAA2M8jhfmCdF+yu3zBTnjPPkidUlfjufvZrJazyl/vWz0y+KsCq559lvZaPeLn7I7xLjB1f8VpB1nTGxrdG9defcBmVk/G+a61q7NRW1F/2pcXFUipyitRv7j1VHqs17pRo+uFdmtdjeDqfNTb1qoetfwXEptpPxcAAAAAAMA0UJikIEvEe3anl3bcF+0p79rr8fh9hVKlzUf1ok5FteK1j+J8I/264ZN+2o75XNZllY8Ifmi3eGGMq42LIEmB0krUuOLbQ1ZUD9rnq49Zp3rB2tVbUR9HKLUQ50rUNxF0nbfO4OuoOetoHPFNa689Hc+PW7Fx2DIKsZp0XQEAAAAAgGkOsiJkmqRra5KRP70vhVZuRrfPJJrNhkKmFc/CrEy+t6r46VZbunCbFZcO6fzXYMpv0t8sCsJDAAAAAAAw/fIRv6wza9JxRAVWjAfubGeWwqc4J++cSgGXgjBGBQEAAAAAwAGg8b9mCqjGSwvY6a7aNWnxugKqNHZYl16LawRWAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP5hDw4EAAAAAID8XxtBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVpDw4JAAAAAAT9f+0KGwAAAAAAAAAAAAAAAAAAAAAAAAAAAADALx+BYR22hmdTAAAAAElFTkSuQmCC"

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = require("react-click-outside");

/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = require("react-resizable");

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(41);
__webpack_require__(42);
module.exports = __webpack_require__(48);


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
/* eslint-disable import/no-dynamic-require */

var plugins = __webpack_require__(28)["default"];

var _require = __webpack_require__(29),
    registerPlugins = _require.registerPlugins;

registerPlugins(plugins);

if (typeof document !== 'undefined' && module && module.hot) {
  module.hot.accept("/Users/tannerlinsley/GitHub/react-charts/www/artifacts/react-static-browser-plugins.js", function () {
    registerPlugins(__webpack_require__(28)["default"]);
  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(22)(module)))

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
/* eslint-disable import/no-dynamic-require */

var _require = __webpack_require__(29),
    registerTemplates = _require.registerTemplates;

var _require2 = __webpack_require__(30),
    templates = _require2["default"],
    notFoundTemplate = _require2.notFoundTemplate;

registerTemplates(templates, notFoundTemplate);

if (typeof document !== 'undefined' && module && module.hot) {
  module.hot.accept("/Users/tannerlinsley/GitHub/react-charts/www/artifacts/react-static-templates.js", function () {
    var _require3 = __webpack_require__(30),
        templates = _require3["default"],
        notFoundTemplate = _require3.notFoundTemplate;

    registerTemplates(templates, notFoundTemplate);
  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(22)(module)))

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearChunks = exports.flushModuleIds = exports.flushChunkNames = exports.MODULE_IDS = exports.CHUNK_NAMES = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

exports["default"] = requireUniversalModule;

var _utils = __webpack_require__(23);

var CHUNK_NAMES = exports.CHUNK_NAMES = new Set();
var MODULE_IDS = exports.MODULE_IDS = new Set();

function requireUniversalModule(universalConfig, options, props, prevProps) {
  var key = options.key,
      _options$timeout = options.timeout,
      timeout = _options$timeout === undefined ? 15000 : _options$timeout,
      onLoad = options.onLoad,
      onError = options.onError,
      isDynamic = options.isDynamic,
      modCache = options.modCache,
      promCache = options.promCache,
      usesBabelPlugin = options.usesBabelPlugin;
  var config = getConfig(isDynamic, universalConfig, options, props);
  var chunkName = config.chunkName,
      path = config.path,
      resolve = config.resolve,
      load = config.load;
  var asyncOnly = !path && !resolve || typeof chunkName === 'function';

  var requireSync = function requireSync(props, context) {
    var exp = (0, _utils.loadFromCache)(chunkName, props, modCache);

    if (!exp) {
      var mod = void 0;

      if (!(0, _utils.isWebpack)() && path) {
        var modulePath = (0, _utils.callForString)(path, props) || '';
        mod = (0, _utils.tryRequire)(modulePath);
      } else if ((0, _utils.isWebpack)() && resolve) {
        var weakId = (0, _utils.callForString)(resolve, props);

        if (__webpack_require__.m[weakId]) {
          mod = (0, _utils.tryRequire)(weakId);
        }
      }

      if (mod) {
        exp = (0, _utils.resolveExport)(mod, key, onLoad, chunkName, props, context, modCache, true);
      }
    }

    return exp;
  };

  var requireAsync = function requireAsync(props, context) {
    var exp = (0, _utils.loadFromCache)(chunkName, props, modCache);
    if (exp) return Promise.resolve(exp);
    var cachedPromise = (0, _utils.loadFromPromiseCache)(chunkName, props, promCache);
    if (cachedPromise) return cachedPromise;
    var prom = new Promise(function (res, rej) {
      var reject = function reject(error) {
        error = error || new Error('timeout exceeded');
        clearTimeout(timer);

        if (onError) {
          var _isServer = typeof window === 'undefined';

          var info = {
            isServer: _isServer
          };
          onError(error, info);
        }

        rej(error);
      }; // const timer = timeout && setTimeout(reject, timeout)


      var timer = timeout && setTimeout(reject, timeout);

      var resolve = function resolve(mod) {
        clearTimeout(timer);
        var exp = (0, _utils.resolveExport)(mod, key, onLoad, chunkName, props, context, modCache);
        if (exp) return res(exp);
        reject(new Error('export not found'));
      };

      var request = load(props, {
        resolve: resolve,
        reject: reject
      }); // if load doesn't return a promise, it must call resolveImport
      // itself. Most common is the promise implementation below.

      if (!request || typeof request.then !== 'function') return;
      request.then(resolve)["catch"](reject);
    });
    (0, _utils.cacheProm)(prom, chunkName, props, promCache);
    return prom;
  };

  var addModule = function addModule(props) {
    if (_utils.isServer || _utils.isTest) {
      if (chunkName) {
        var name = (0, _utils.callForString)(chunkName, props);

        if (usesBabelPlugin) {
          // if ignoreBabelRename is true, don't apply regex
          var shouldKeepName = options && !!options.ignoreBabelRename;

          if (!shouldKeepName) {
            name = name.replace(/\//g, '-');
          }
        }

        if (name) CHUNK_NAMES.add(name);
        if (!_utils.isTest) return name; // makes tests way smaller to run both kinds
      }

      if ((0, _utils.isWebpack)()) {
        var weakId = (0, _utils.callForString)(resolve, props);
        if (weakId) MODULE_IDS.add(weakId);
        return weakId;
      }

      if (!(0, _utils.isWebpack)()) {
        var modulePath = (0, _utils.callForString)(path, props);
        if (modulePath) MODULE_IDS.add(modulePath);
        return modulePath;
      }
    }
  };

  var shouldUpdate = function shouldUpdate(next, prev) {
    var cacheKey = (0, _utils.callForString)(chunkName, next);
    var config = getConfig(isDynamic, universalConfig, options, prev);
    var prevCacheKey = (0, _utils.callForString)(config.chunkName, prev);
    return cacheKey !== prevCacheKey;
  };

  return {
    requireSync: requireSync,
    requireAsync: requireAsync,
    addModule: addModule,
    shouldUpdate: shouldUpdate,
    asyncOnly: asyncOnly
  };
}

var flushChunkNames = exports.flushChunkNames = function flushChunkNames() {
  var chunks = Array.from(CHUNK_NAMES);
  CHUNK_NAMES.clear();
  return chunks;
};

var flushModuleIds = exports.flushModuleIds = function flushModuleIds() {
  var ids = Array.from(MODULE_IDS);
  MODULE_IDS.clear();
  return ids;
};

var clearChunks = exports.clearChunks = function clearChunks() {
  CHUNK_NAMES.clear();
  MODULE_IDS.clear();
};

var getConfig = function getConfig(isDynamic, universalConfig, options, props) {
  if (isDynamic) {
    var resultingConfig = typeof universalConfig === 'function' ? universalConfig(props) : universalConfig;

    if (options) {
      resultingConfig = _extends({}, resultingConfig, options);
    }

    return resultingConfig;
  }

  var load = typeof universalConfig === 'function' ? universalConfig : // $FlowIssue
  function () {
    return universalConfig;
  };
  return {
    file: 'default',
    id: options.id || 'default',
    chunkName: options.chunkName || 'default',
    resolve: options.resolve || '',
    path: options.path || '',
    load: load,
    ignoreBabelRename: true
  };
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	".": 9,
	"./": 9,
	"./index": 9,
	"./index.js": 9
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 44;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = __webpack_require__(13);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(24);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (_typeof(call) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + _typeof(superClass));
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var ReportChunks = function (_React$Component) {
  _inherits(ReportChunks, _React$Component);

  function ReportChunks() {
    _classCallCheck(this, ReportChunks);

    return _possibleConstructorReturn(this, (ReportChunks.__proto__ || Object.getPrototypeOf(ReportChunks)).apply(this, arguments));
  }

  _createClass(ReportChunks, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        report: this.props.report
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2["default"].Children.only(this.props.children);
    }
  }]);

  return ReportChunks;
}(_react2["default"].Component);

ReportChunks.propTypes = {
  report: _propTypes2["default"].func.isRequired
};
ReportChunks.childContextTypes = {
  report: _propTypes2["default"].func.isRequired
};
exports["default"] = ReportChunks;

/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = require("vm");

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__handleAfter = exports.__update = undefined;

var _hoistNonReactStatics = __webpack_require__(31);

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

var _index = __webpack_require__(14);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

var __update = exports.__update = function __update(props, state, isInitialized) {
  var isMount = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var isSync = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var isServer = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
  if (!isInitialized) return state;

  if (!state.error) {
    state.error = null;
  }

  return __handleAfter(props, state, isMount, isSync, isServer);
};
/* eslint class-methods-use-this: ["error", { "exceptMethods": ["__handleAfter"] }] */


var __handleAfter = exports.__handleAfter = function __handleAfter(props, state, isMount, isSync, isServer) {
  var mod = state.mod,
      error = state.error;

  if (mod && !error) {
    (0, _hoistNonReactStatics2["default"])(_index2["default"], mod, {
      preload: true,
      preloadWeak: true
    });

    if (props.onAfter) {
      var onAfter = props.onAfter;
      var info = {
        isMount: isMount,
        isSync: isSync,
        isServer: isServer
      };
      onAfter(info, mod);
    }
  } else if (error && props.onError) {
    props.onError(error);
  }

  return state;
};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(49);

var _interopRequireDefault = __webpack_require__(50);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(__webpack_require__(10));

var _objectWithoutProperties2 = _interopRequireDefault(__webpack_require__(51));

var React = _interopRequireWildcard(__webpack_require__(0));

var _useStaticInfo = __webpack_require__(52);
/* eslint-disable import/no-dynamic-require */


var OriginalSuspense = React.Suspense;

function Suspense(_ref) {
  var key = _ref.key,
      children = _ref.children,
      rest = (0, _objectWithoutProperties2["default"])(_ref, ["key", "children"]);
  return typeof document !== 'undefined' ? React.createElement(OriginalSuspense, (0, _extends2["default"])({
    key: key
  }, rest), children) : React.createElement(React.Fragment, {
    key: key
  }, children);
} // Override the suspense module to be our own


React.Suspense = Suspense;
React["default"].Suspense = Suspense;

var App = __webpack_require__(53)["default"];

var _default = function _default(staticInfo) {
  return function (props) {
    return React.createElement(_useStaticInfo.staticInfoContext.Provider, {
      value: staticInfo
    }, React.createElement(App, props));
  };
};

exports["default"] = _default;

/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/interopRequireWildcard");

/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/interopRequireDefault");

/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/objectWithoutProperties");

/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = require("/Users/tannerlinsley/GitHub/react-charts/www/node_modules/react-static/lib/browser/hooks/useStaticInfo");

/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(26);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(35);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(21);
// import 'stop-runaway-react-effects/hijack'


 // Your top level component

 // Export your top level component as JSX (for static rendering)

/* harmony default export */ __webpack_exports__["default"] = (_App__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"]); // Render your app

if (typeof document !== 'undefined') {
  var target = document.getElementById('root');
  var renderMethod = target.hasChildNodes() ? react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.hydrate : react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render;

  var render = function render(Comp) {
    renderMethod(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__["AppContainer"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Comp, null)), target);
  }; // Render!


  render(_App__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"]); // // Hot Module Replacement

  if (module && module.hot) {
    module.hot.accept('./App', function () {
      render(_App__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"]);
    });
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(54)(module)))

/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = function (originalModule) {
  if (!originalModule.webpackPolyfill) {
    var module = Object.create(originalModule); // module.parent = undefined by default

    if (!module.children) module.children = [];
    Object.defineProperty(module, "loaded", {
      enumerable: true,
      get: function get() {
        return module.l;
      }
    });
    Object.defineProperty(module, "id", {
      enumerable: true,
      get: function get() {
        return module.i;
      }
    });
    Object.defineProperty(module, "exports", {
      enumerable: true
    });
    module.webpackPolyfill = 1;
  }

  return module;
};

/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = require("react-resizable/css/styles.css");

/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var hooks_useChartConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var components_Box__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony import */ var _dist__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2);
/* harmony import */ var _dist__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_dist__WEBPACK_IMPORTED_MODULE_3__);
 //




/* harmony default export */ __webpack_exports__["default"] = (function () {
  var _useChartConfig = Object(hooks_useChartConfig__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({
    series: 10
  }),
      data = _useChartConfig.data,
      randomizeData = _useChartConfig.randomizeData;

  var series = react__WEBPACK_IMPORTED_MODULE_0___default.a.useMemo(function () {
    return {
      showPoints: false
    };
  }, []);
  var axes = react__WEBPACK_IMPORTED_MODULE_0___default.a.useMemo(function () {
    return [{
      primary: true,
      type: 'time',
      position: 'bottom'
    }, {
      type: 'linear',
      position: 'left'
    }];
  }, []);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    onClick: randomizeData
  }, "Randomize Data"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_Box__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_dist__WEBPACK_IMPORTED_MODULE_3__["Chart"], {
    data: data,
    series: series,
    axes: axes,
    tooltip: true
  })));
});

/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var hooks_useChartConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var components_Box__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony import */ var _dist__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2);
/* harmony import */ var _dist__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_dist__WEBPACK_IMPORTED_MODULE_3__);
 //




/* harmony default export */ __webpack_exports__["default"] = (function () {
  var _useChartConfig = Object(hooks_useChartConfig__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({
    series: 10,
    useR: true
  }),
      data = _useChartConfig.data,
      randomizeData = _useChartConfig.randomizeData;

  var series = react__WEBPACK_IMPORTED_MODULE_0___default.a.useMemo(function () {
    return {
      type: 'bubble',
      showPoints: false
    };
  }, []);
  var axes = react__WEBPACK_IMPORTED_MODULE_0___default.a.useMemo(function () {
    return [{
      primary: true,
      type: 'time',
      position: 'bottom'
    }, {
      type: 'linear',
      position: 'left'
    }];
  }, []);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    onClick: randomizeData
  }, "Randomize Data"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_Box__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_dist__WEBPACK_IMPORTED_MODULE_3__["Chart"], {
    data: data,
    series: series,
    axes: axes,
    tooltip: true
  })));
});

/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var hooks_useChartConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var components_Box__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony import */ var _dist__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2);
/* harmony import */ var _dist__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_dist__WEBPACK_IMPORTED_MODULE_3__);
 //




/* harmony default export */ __webpack_exports__["default"] = (function () {
  var _useChartConfig = Object(hooks_useChartConfig__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({
    series: 10
  }),
      data = _useChartConfig.data,
      randomizeData = _useChartConfig.randomizeData;

  var series = react__WEBPACK_IMPORTED_MODULE_0___default.a.useMemo(function () {
    return {
      type: 'area'
    };
  }, []);
  var axes = react__WEBPACK_IMPORTED_MODULE_0___default.a.useMemo(function () {
    return [{
      primary: true,
      position: 'bottom',
      type: 'time'
    }, {
      position: 'left',
      type: 'linear',
      stacked: true
    }];
  }, []);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    onClick: randomizeData
  }, "Randomize Data"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_Box__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_dist__WEBPACK_IMPORTED_MODULE_3__["Chart"], {
    data: data,
    series: series,
    axes: axes,
    tooltip: true
  })));
});

/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var hooks_useChartConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var components_Box__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony import */ var _dist__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2);
/* harmony import */ var _dist__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_dist__WEBPACK_IMPORTED_MODULE_3__);
 //




/* harmony default export */ __webpack_exports__["default"] = (function () {
  var _useChartConfig = Object(hooks_useChartConfig__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({
    series: 10,
    dataType: 'ordinal'
  }),
      data = _useChartConfig.data,
      randomizeData = _useChartConfig.randomizeData;

  var series = react__WEBPACK_IMPORTED_MODULE_0___default.a.useMemo(function () {
    return {
      type: 'bar'
    };
  }, []);
  var axes = react__WEBPACK_IMPORTED_MODULE_0___default.a.useMemo(function () {
    return [{
      primary: true,
      type: 'ordinal',
      position: 'left'
    }, {
      position: 'bottom',
      type: 'linear',
      stacked: true
    }];
  }, []);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    onClick: randomizeData
  }, "Randomize Data"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_Box__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_dist__WEBPACK_IMPORTED_MODULE_3__["Chart"], {
    data: data,
    series: series,
    axes: axes,
    tooltip: true
  })));
});

/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var hooks_useChartConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var components_Box__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony import */ var _dist__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2);
/* harmony import */ var _dist__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_dist__WEBPACK_IMPORTED_MODULE_3__);
 //




/* harmony default export */ __webpack_exports__["default"] = (function () {
  var _useChartConfig = Object(hooks_useChartConfig__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({
    series: 10,
    dataType: 'ordinal'
  }),
      data = _useChartConfig.data,
      randomizeData = _useChartConfig.randomizeData;

  var series = react__WEBPACK_IMPORTED_MODULE_0___default.a.useMemo(function () {
    return {
      type: 'bar'
    };
  }, []);
  var axes = react__WEBPACK_IMPORTED_MODULE_0___default.a.useMemo(function () {
    return [{
      primary: true,
      type: 'ordinal',
      position: 'bottom'
    }, {
      position: 'left',
      type: 'linear',
      stacked: true
    }];
  }, []);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    onClick: randomizeData
  }, "Randomize Data"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_Box__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_dist__WEBPACK_IMPORTED_MODULE_3__["Chart"], {
    data: data,
    series: series,
    axes: axes,
    tooltip: true
  })));
});

/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var hooks_useChartConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var components_Box__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony import */ var _dist__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2);
/* harmony import */ var _dist__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_dist__WEBPACK_IMPORTED_MODULE_3__);
 //




/* harmony default export */ __webpack_exports__["default"] = (function () {
  var _useChartConfig = Object(hooks_useChartConfig__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({
    series: 10,
    show: ['primaryAxisShow', 'secondaryAxisShow']
  }),
      data = _useChartConfig.data,
      primaryAxisShow = _useChartConfig.primaryAxisShow,
      secondaryAxisShow = _useChartConfig.secondaryAxisShow,
      randomizeData = _useChartConfig.randomizeData,
      Options = _useChartConfig.Options;

  var axes = react__WEBPACK_IMPORTED_MODULE_0___default.a.useMemo(function () {
    return [{
      primary: true,
      position: 'bottom',
      type: 'time',
      show: primaryAxisShow
    }, {
      position: 'left',
      type: 'linear',
      show: secondaryAxisShow
    }];
  }, [primaryAxisShow, secondaryAxisShow]);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, Options, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    onClick: randomizeData
  }, "Randomize Data"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_Box__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_dist__WEBPACK_IMPORTED_MODULE_3__["Chart"], {
    data: data,
    axes: axes,
    tooltip: true
  })));
});

/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CustomStyles; });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var hooks_useChartConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var components_Box__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1);
/* harmony import */ var _dist__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2);
/* harmony import */ var _dist__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_dist__WEBPACK_IMPORTED_MODULE_4__);

 //




var defs = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("defs", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("linearGradient", {
  id: "0",
  x1: "0",
  x2: "0",
  y1: "1",
  y2: "0"
}, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("stop", {
  offset: "0%",
  stopColor: "#17EAD9"
}), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("stop", {
  offset: "100%",
  stopColor: "#6078EA"
})), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("linearGradient", {
  id: "1",
  x1: "0",
  x2: "0",
  y1: "1",
  y2: "0"
}, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("stop", {
  offset: "0%",
  stopColor: "#FCE38A"
}), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("stop", {
  offset: "100%",
  stopColor: "#F38181"
})), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("linearGradient", {
  id: "2",
  x1: "0",
  x2: "0",
  y1: "1",
  y2: "0"
}, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("stop", {
  offset: "0%",
  stopColor: "#42E695"
}), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("stop", {
  offset: "100%",
  stopColor: "#3BB2B8"
})), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("linearGradient", {
  id: "3",
  x1: "0",
  x2: "0",
  y1: "1",
  y2: "0"
}, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("stop", {
  offset: "0%",
  stopColor: "#F4Ea0A"
}), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("stop", {
  offset: "100%",
  stopColor: "#df4081"
})));
function CustomStyles() {
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_1___default.a.useState({
    activeSeriesIndex: -1,
    activeDatumIndex: -1
  }),
      _React$useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_React$useState, 2),
      _React$useState2$ = _React$useState2[0],
      activeSeriesIndex = _React$useState2$.activeSeriesIndex,
      activeDatumIndex = _React$useState2$.activeDatumIndex,
      setState = _React$useState2[1];

  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, JSON.stringify({
    activeSeriesIndex: activeSeriesIndex,
    activeDatumIndex: activeDatumIndex
  }, null, 2), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(MyChart, {
    elementType: "line",
    setState: setState,
    activeDatumIndex: activeDatumIndex,
    activeSeriesIndex: activeSeriesIndex
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(MyChart, {
    elementType: "area",
    setState: setState,
    activeDatumIndex: activeDatumIndex,
    activeSeriesIndex: activeSeriesIndex
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(MyChart, {
    elementType: "bar",
    setState: setState,
    activeDatumIndex: activeDatumIndex,
    activeSeriesIndex: activeSeriesIndex
  }));
}

function MyChart(_ref) {
  var elementType = _ref.elementType,
      activeDatumIndex = _ref.activeDatumIndex,
      activeSeriesIndex = _ref.activeSeriesIndex,
      setState = _ref.setState;

  var _useChartConfig = Object(hooks_useChartConfig__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])({
    series: 4,
    height: 200,
    interaction: 'axis',
    dataType: 'ordinal',
    show: ['elementType', 'interaction']
  }),
      data = _useChartConfig.data,
      interaction = _useChartConfig.interaction,
      randomizeData = _useChartConfig.randomizeData;

  var series = react__WEBPACK_IMPORTED_MODULE_1___default.a.useMemo(function () {
    return {
      type: elementType
    };
  }, [elementType]);
  var axes = react__WEBPACK_IMPORTED_MODULE_1___default.a.useMemo(function () {
    return [{
      primary: true,
      type: 'ordinal',
      position: 'bottom'
    }, {
      type: 'linear',
      position: 'left',
      stacked: true
    }];
  }, []);
  var getSeriesStyle = react__WEBPACK_IMPORTED_MODULE_1___default.a.useCallback(function (series) {
    return {
      color: "url(#".concat(series.index % 4, ")"),
      opacity: activeSeriesIndex > -1 ? series.index === activeSeriesIndex ? 1 : 0.3 : 1
    };
  }, [activeSeriesIndex]);
  var getDatumStyle = react__WEBPACK_IMPORTED_MODULE_1___default.a.useCallback(function (datum) {
    return {
      r: activeDatumIndex === datum.index && activeSeriesIndex === datum.seriesIndex ? 7 : activeDatumIndex === datum.index ? 5 : datum.series.index === activeSeriesIndex ? 3 : datum.otherHovered ? 2 : 2
    };
  }, [activeDatumIndex, activeSeriesIndex]);
  var onFocus = react__WEBPACK_IMPORTED_MODULE_1___default.a.useCallback(function (focused) {
    return setState({
      activeSeriesIndex: focused ? focused.series.id : -1,
      activeDatumIndex: focused ? focused.index : -1
    });
  }, [setState]);
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
    onClick: randomizeData
  }, "Randomize Data"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(components_Box__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_dist__WEBPACK_IMPORTED_MODULE_4__["Chart"], {
    data: data,
    interaction: interaction,
    series: series,
    axes: axes,
    getSeriesStyle: getSeriesStyle,
    getDatumStyle: getDatumStyle,
    onFocus: onFocus,
    renderSVG: function renderSVG() {
      return defs;
    },
    tooltip: true
  })));
}

/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var hooks_useChartConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var components_Box__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony import */ var _dist__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2);
/* harmony import */ var _dist__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_dist__WEBPACK_IMPORTED_MODULE_3__);
 //




/* harmony default export */ __webpack_exports__["default"] = (function () {
  var _useChartConfig = Object(hooks_useChartConfig__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({
    series: 10,
    dataType: 'ordinal'
  }),
      data = _useChartConfig.data,
      randomizeData = _useChartConfig.randomizeData;

  var series = react__WEBPACK_IMPORTED_MODULE_0___default.a.useMemo(function () {
    return {
      type: 'bar'
    };
  }, []);
  var axes = react__WEBPACK_IMPORTED_MODULE_0___default.a.useMemo(function () {
    return [{
      primary: true,
      position: 'bottom',
      type: 'ordinal'
    }, {
      position: 'left',
      type: 'linear',
      stacked: true
    }];
  }, []);
  var tooltip = react__WEBPACK_IMPORTED_MODULE_0___default.a.useMemo(function () {
    return {
      render: function render(_ref) {
        var datum = _ref.datum,
            primaryAxis = _ref.primaryAxis,
            getStyle = _ref.getStyle;
        return datum ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          style: {
            color: 'white',
            pointerEvents: 'none'
          }
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
          style: {
            display: 'block',
            textAlign: 'center'
          }
        }, primaryAxis.format(datum.primary)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          style: {
            width: '300px',
            height: '200px',
            display: 'flex'
          }
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_dist__WEBPACK_IMPORTED_MODULE_3__["Chart"], {
          data: datum.group,
          dark: true,
          series: {
            type: 'bar'
          },
          getSeries: function getSeries(data) {
            return [{
              datums: data.map(function (d) {
                return {
                  x: d.seriesLabel,
                  y: d.secondary,
                  color: getStyle(d).fill
                };
              })
            }];
          },
          axes: [{
            type: 'ordinal',
            primary: true,
            position: 'bottom'
          }, {
            type: 'linear',
            stacked: true,
            position: 'left'
          }],
          getDatumStyle: function getDatumStyle(datum) {
            return {
              color: datum.originalDatum.color
            };
          },
          primaryCursor: {
            value: datum.seriesLabel
          }
        }))) : null;
      }
    };
  }, []);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    onClick: randomizeData
  }, "Randomize Data"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_Box__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_dist__WEBPACK_IMPORTED_MODULE_3__["Chart"], {
    data: data,
    series: series,
    axes: axes,
    primaryCursor: true,
    tooltip: tooltip
  })));
});

/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var hooks_useChartConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var components_Box__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony import */ var _dist__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2);
/* harmony import */ var _dist__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_dist__WEBPACK_IMPORTED_MODULE_3__);
 //




/* harmony default export */ __webpack_exports__["default"] = (function () {
  var _useChartConfig = Object(hooks_useChartConfig__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({
    series: 10
  }),
      data = _useChartConfig.data,
      randomizeData = _useChartConfig.randomizeData;

  var series = react__WEBPACK_IMPORTED_MODULE_0___default.a.useMemo(function () {
    return {
      showPoints: false
    };
  }, []);
  var axes = react__WEBPACK_IMPORTED_MODULE_0___default.a.useMemo(function () {
    return [{
      primary: true,
      type: 'time',
      position: 'bottom'
    }, {
      type: 'linear',
      position: 'left'
    }];
  }, []);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    onClick: randomizeData
  }, "Randomize Data"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_Box__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_dist__WEBPACK_IMPORTED_MODULE_3__["Chart"], {
    data: data,
    series: series,
    axes: axes,
    tooltip: true,
    primaryCursor: true,
    secondaryCursor: true
  })));
});

/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SyncedCursors; });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var hooks_useChartConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3);
/* harmony import */ var components_Box__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1);
/* harmony import */ var _dist__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2);
/* harmony import */ var _dist__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_dist__WEBPACK_IMPORTED_MODULE_5__);


 //




function SyncedCursors() {
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_2___default.a.useState({
    primaryCursorValue: null,
    secondaryCursorValue: null
  }),
      _React$useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_React$useState, 2),
      _React$useState2$ = _React$useState2[0],
      primaryCursorValue = _React$useState2$.primaryCursorValue,
      secondaryCursorValue = _React$useState2$.secondaryCursorValue,
      setState = _React$useState2[1];

  var axes = react__WEBPACK_IMPORTED_MODULE_2___default.a.useMemo(function () {
    return [{
      primary: true,
      position: 'bottom',
      type: 'time'
    }, {
      position: 'left',
      type: 'linear'
    }];
  }, []);
  var primaryCursor = react__WEBPACK_IMPORTED_MODULE_2___default.a.useMemo(function () {
    return {
      value: primaryCursorValue
    };
  }, [primaryCursorValue]);
  var secondaryCursor = react__WEBPACK_IMPORTED_MODULE_2___default.a.useMemo(function () {
    return {
      value: secondaryCursorValue
    };
  }, [secondaryCursorValue]);
  var onFocus = react__WEBPACK_IMPORTED_MODULE_2___default.a.useCallback(function (datum) {
    setState({
      primaryCursorValue: datum ? datum.primary : null,
      secondaryCursorValue: datum ? datum.secondary : null
    });
  }, []);
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("pre", null, JSON.stringify({
    primaryCursorValue: primaryCursorValue,
    secondaryCursorValue: secondaryCursorValue
  }, null, 2)), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(components_Box__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
    width: 500,
    height: 250
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(ChartWithData, {
    axes: axes,
    onFocus: onFocus,
    primaryCursor: primaryCursor,
    secondaryCursor: secondaryCursor,
    tooltip: true
  })), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(components_Box__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
    width: 600,
    height: 200
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(ChartWithData, {
    axes: axes,
    onFocus: onFocus,
    primaryCursor: primaryCursor,
    secondaryCursor: secondaryCursor,
    tooltip: true
  })), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(components_Box__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
    width: 700,
    height: 150
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(ChartWithData, {
    axes: axes,
    onFocus: onFocus,
    primaryCursor: primaryCursor,
    secondaryCursor: secondaryCursor,
    tooltip: true
  })));
}

function ChartWithData(props) {
  var _useChartConfig = Object(hooks_useChartConfig__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])({
    series: 10
  }),
      data = _useChartConfig.data;

  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_dist__WEBPACK_IMPORTED_MODULE_5__["Chart"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
    data: data
  }, props));
}

/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var hooks_useChartConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var components_Box__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1);
/* harmony import */ var _dist__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2);
/* harmony import */ var _dist__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_dist__WEBPACK_IMPORTED_MODULE_4__);

 //




/* harmony default export */ __webpack_exports__["default"] = (function () {
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_1___default.a.useState({
    min: null,
    max: null
  }),
      _React$useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_React$useState, 2),
      _React$useState2$ = _React$useState2[0],
      min = _React$useState2$.min,
      max = _React$useState2$.max,
      setState = _React$useState2[1];

  var _useChartConfig = Object(hooks_useChartConfig__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])({
    series: 10
  }),
      data = _useChartConfig.data,
      randomizeData = _useChartConfig.randomizeData;

  var axes = react__WEBPACK_IMPORTED_MODULE_1___default.a.useMemo(function () {
    return [{
      primary: true,
      type: 'time',
      position: 'bottom',
      hardMin: min,
      hardMax: max
    }, {
      type: 'linear',
      position: 'left'
    }];
  }, [max, min]);
  var brush = react__WEBPACK_IMPORTED_MODULE_1___default.a.useMemo(function () {
    return {
      onSelect: function onSelect(brushData) {
        setState({
          min: Math.min(brushData.start, brushData.end),
          max: Math.max(brushData.start, brushData.end)
        });
      }
    };
  }, []);
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
    onClick: randomizeData
  }, "Randomize Data"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
    onClick: function onClick() {
      return setState({
        min: null,
        max: null
      });
    }
  }, "Reset Zoom"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(components_Box__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_dist__WEBPACK_IMPORTED_MODULE_4__["Chart"], {
    data: data,
    axes: axes,
    primaryCursor: true,
    tooltip: true,
    brush: brush
  })));
});

/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var hooks_useChartConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var components_Box__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony import */ var _dist__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2);
/* harmony import */ var _dist__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_dist__WEBPACK_IMPORTED_MODULE_3__);
 //




/* harmony default export */ __webpack_exports__["default"] = (function () {
  var _useChartConfig = Object(hooks_useChartConfig__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({
    series: 10
  }),
      data = _useChartConfig.data,
      randomizeData = _useChartConfig.randomizeData;

  var series = react__WEBPACK_IMPORTED_MODULE_0___default.a.useMemo(function () {
    return {
      type: 'area'
    };
  }, []);
  var axes = react__WEBPACK_IMPORTED_MODULE_0___default.a.useMemo(function () {
    return [{
      primary: true,
      position: 'bottom',
      type: 'time'
    }, {
      position: 'left',
      type: 'linear',
      stacked: true
    }];
  }, []);
  var primaryCursor = react__WEBPACK_IMPORTED_MODULE_0___default.a.useMemo(function () {
    return {
      render: function render(props) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          style: {
            fontSize: '1rem'
          }
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          role: "img",
          "aria-label": "icon"
        }, "\uD83D\uDD51"), ' ', (props.formattedValue || '').toString());
      }
    };
  }, []);
  var secondaryCursor = react__WEBPACK_IMPORTED_MODULE_0___default.a.useMemo(function () {
    return {
      render: function render(props) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          style: {
            fontSize: '1rem'
          }
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          role: "img",
          "aria-label": "icon"
        }, "\uD83D\uDC4D"), ' ', (props.formattedValue || '').toString());
      }
    };
  }, []);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    onClick: randomizeData
  }, "Randomize Data"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_Box__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_dist__WEBPACK_IMPORTED_MODULE_3__["Chart"], {
    data: data,
    series: series,
    axes: axes,
    primaryCursor: primaryCursor,
    secondaryCursor: secondaryCursor
  })));
});

/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_json_tree__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var react_json_tree__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_json_tree__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var hooks_useChartConfig__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3);
/* harmony import */ var components_Box__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1);
/* harmony import */ var _dist__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2);
/* harmony import */ var _dist__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_dist__WEBPACK_IMPORTED_MODULE_6__);



 //




/* harmony default export */ __webpack_exports__["default"] = (function () {
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_2___default.a.useState({
    clicked: null,
    focused: null,
    hovered: null
  }),
      _React$useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_React$useState, 2),
      _React$useState2$ = _React$useState2[0],
      clicked = _React$useState2$.clicked,
      focused = _React$useState2$.focused,
      hovered = _React$useState2$.hovered,
      setState = _React$useState2[1];

  var _useChartConfig = Object(hooks_useChartConfig__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])({
    series: 10,
    show: ['elementType', 'groupMode']
  }),
      data = _useChartConfig.data,
      groupMode = _useChartConfig.groupMode,
      elementType = _useChartConfig.elementType,
      randomizeData = _useChartConfig.randomizeData,
      Options = _useChartConfig.Options;

  var axes = react__WEBPACK_IMPORTED_MODULE_2___default.a.useMemo(function () {
    return [{
      primary: true,
      position: 'bottom',
      type: 'time'
    }, {
      position: 'left',
      type: 'linear'
    }];
  }, []);
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, Options, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("button", {
    onClick: randomizeData
  }, "Randomize Data"), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(components_Box__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_dist__WEBPACK_IMPORTED_MODULE_6__["Chart"], {
    data: data,
    groupMode: groupMode,
    type: elementType,
    axes: axes,
    primaryCursor: true,
    secondaryCursor: true,
    tooltip: true,
    onClick: function onClick(datum) {
      return setState(function (old) {
        return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, old, {
          clicked: datum
        });
      });
    },
    onFocus: function onFocus(datum) {
      return setState(function (old) {
        return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, old, {
          focused: datum
        });
      });
    },
    onHover: function onHover(pointer) {
      return setState(function (old) {
        return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, old, {
          hovered: pointer
        });
      });
    }
  })), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", null, "Hovered:"), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_json_tree__WEBPACK_IMPORTED_MODULE_3___default.a, {
    hideRoot: true,
    data: hovered
  }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", null, "Focused:"), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_json_tree__WEBPACK_IMPORTED_MODULE_3___default.a, {
    hideRoot: true,
    data: focused
  }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", null, "Clicked:"), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_json_tree__WEBPACK_IMPORTED_MODULE_3___default.a, {
    hideRoot: true,
    data: clicked
  }));
});

/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var hooks_useChartConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var components_Box__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony import */ var _dist__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2);
/* harmony import */ var _dist__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_dist__WEBPACK_IMPORTED_MODULE_3__);
 //




/* harmony default export */ __webpack_exports__["default"] = (function () {
  var _useChartConfig = Object(hooks_useChartConfig__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({
    series: 10,
    show: ['tooltipAlign', 'tooltipAnchor']
  }),
      data = _useChartConfig.data,
      tooltipAlign = _useChartConfig.tooltipAlign,
      tooltipAnchor = _useChartConfig.tooltipAnchor,
      randomizeData = _useChartConfig.randomizeData,
      Options = _useChartConfig.Options;

  var axes = react__WEBPACK_IMPORTED_MODULE_0___default.a.useMemo(function () {
    return [{
      primary: true,
      position: 'bottom',
      type: 'time'
    }, {
      position: 'left',
      type: 'linear'
    }];
  }, []);
  var tooltip = react__WEBPACK_IMPORTED_MODULE_0___default.a.useMemo(function () {
    return {
      align: tooltipAlign,
      anchor: tooltipAnchor
    };
  }, [tooltipAlign, tooltipAnchor]);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, Options, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    onClick: randomizeData
  }, "Randomize Data"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_Box__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_dist__WEBPACK_IMPORTED_MODULE_3__["Chart"], {
    data: data,
    axes: axes,
    primaryCursor: true,
    secondaryCursor: true,
    tooltip: tooltip
  })));
});

/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var components_Box__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _dist__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var _dist__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_dist__WEBPACK_IMPORTED_MODULE_2__);
 //



/* harmony default export */ __webpack_exports__["default"] = (function () {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_Box__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], {
    resizable: false
  }, function (_ref) {
    var data = _ref.data;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        padding: '12px',
        border: '2px solid black',
        height: '400px'
      }
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      style: {
        flex: '0 0 auto',
        padding: '10px',
        border: '1px solid red'
      }
    }, "Header"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      style: {
        flex: 2,
        border: '5px solid blue',
        maxHeight: '400px',
        margin: '10px'
      }
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_dist__WEBPACK_IMPORTED_MODULE_2__["Chart"], {
      data: data,
      axes: [{
        primary: true,
        position: 'bottom',
        type: 'time'
      }, {
        position: 'left',
        type: 'linear'
      }],
      primaryCursor: true,
      secondaryCursor: true,
      tooltip: true
    })));
  });
});

/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var components_Sidebar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(25);
/* harmony import */ var components_Box__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony import */ var _dist__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2);
/* harmony import */ var _dist__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_dist__WEBPACK_IMPORTED_MODULE_3__);
 //




/* harmony default export */ __webpack_exports__["default"] = (function () {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_Box__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], {
    width: 500,
    height: 100
  }, function (_ref) {
    var data = _ref.data;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_dist__WEBPACK_IMPORTED_MODULE_3__["Chart"], {
      data: data,
      axes: [{
        primary: true,
        position: 'bottom',
        type: 'time',
        show: false
      }, {
        position: 'left',
        type: 'linear',
        show: false
      }],
      primaryCursor: true,
      secondaryCursor: true,
      tooltip: true
    });
  });
});

/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var components_Box__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _dist__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var _dist__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_dist__WEBPACK_IMPORTED_MODULE_2__);
 //



/* harmony default export */ __webpack_exports__["default"] = (function () {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_Box__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], {
    dataType: "ordinal"
  }, function (_ref) {
    var data = _ref.data;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_dist__WEBPACK_IMPORTED_MODULE_2__["Chart"], {
      data: data,
      series: function series(s, i) {
        return {
          type: i % 2 ? 'bar' : 'line'
        };
      },
      axes: [{
        primary: true,
        position: 'bottom',
        type: 'ordinal'
      }, {
        position: 'left',
        type: 'linear',
        min: 0
      }],
      primaryCursor: true,
      secondaryCursor: true,
      tooltip: true
    });
  });
});

/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var components_Box__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony import */ var _dist__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2);
/* harmony import */ var _dist__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_dist__WEBPACK_IMPORTED_MODULE_3__);

 //



/* harmony default export */ __webpack_exports__["default"] = (function () {
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(components_Box__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], {
    dataType: "time"
  }, function (_ref) {
    var data = _ref.data;
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_dist__WEBPACK_IMPORTED_MODULE_3__["Chart"], {
      data: data,
      getSeries: function getSeries(data) {
        return data.map(function (d, i) {
          return i % 2 === 0 ? _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, d, {
            secondaryAxisID: 'First Metric'
          }) : _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, d, {
            datums: d.datums.map(function (f) {
              return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, f, {
                y: f.y * 5
              });
            }),
            secondaryAxisID: 'Second Metric'
          });
        });
      },
      axes: [{
        primary: true,
        type: 'time',
        position: 'bottom'
      }, {
        type: 'linear',
        id: 'First Metric',
        min: 0,
        position: 'left'
      }, {
        type: 'linear',
        id: 'Second Metric',
        min: 0,
        position: 'right'
      }],
      primaryCursor: true,
      secondaryCursor: true,
      tooltip: true
    });
  });
});

/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var components_Box__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _dist__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var _dist__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_dist__WEBPACK_IMPORTED_MODULE_2__);
 //



/* harmony default export */ __webpack_exports__["default"] = (function () {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_Box__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], {
    style: {
      background: 'rgba(0, 27, 45, 0.9)',
      padding: '.5rem',
      borderRadius: '5px'
    }
  }, function (_ref) {
    var data = _ref.data;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_dist__WEBPACK_IMPORTED_MODULE_2__["Chart"], {
      data: data,
      dark: true,
      axes: [{
        primary: true,
        position: 'bottom',
        type: 'time'
      }, {
        position: 'left',
        type: 'linear'
      }],
      primaryCursor: true,
      secondaryCursor: true,
      tooltip: true
    });
  });
});

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(76)(false);
// Module
exports.push([module.i, "/* add css styles here (optional) */\n\n.lagRadar {\n  position: fixed;\n  bottom: 0.5rem;\n  right: 0.5rem;\n}\n", ""]);



/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader

module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return '@media ' + item[2] + '{' + content + '}';
      } else {
        return content;
      }
    }).join('');
  }; // import a list of modules into the list


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (i = 0; i < modules.length; i++) {
      var item = modules[i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = '(' + item[2] + ') and (' + mediaQuery + ')';
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || '';
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;
  return '/*# ' + data + ' */';
}

/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "@babel/runtime/helpers/extends"
var extends_ = __webpack_require__(10);
var extends_default = /*#__PURE__*/__webpack_require__.n(extends_);

// EXTERNAL MODULE: external "@babel/runtime/helpers/toConsumableArray"
var toConsumableArray_ = __webpack_require__(12);
var toConsumableArray_default = /*#__PURE__*/__webpack_require__.n(toConsumableArray_);

// EXTERNAL MODULE: external "@babel/runtime/helpers/objectSpread"
var objectSpread_ = __webpack_require__(4);
var objectSpread_default = /*#__PURE__*/__webpack_require__.n(objectSpread_);

// EXTERNAL MODULE: external "@babel/runtime/helpers/slicedToArray"
var slicedToArray_ = __webpack_require__(5);
var slicedToArray_default = /*#__PURE__*/__webpack_require__.n(slicedToArray_);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(0);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: /Users/tannerlinsley/GitHub/react-charts/www/src/hooks/useChartConfig.js
var useChartConfig = __webpack_require__(3);

// EXTERNAL MODULE: /Users/tannerlinsley/GitHub/react-charts/www/src/components/Box.js
var Box = __webpack_require__(1);

// EXTERNAL MODULE: /Users/tannerlinsley/GitHub/react-charts/dist/index.js
var dist = __webpack_require__(2);

// CONCATENATED MODULE: /Users/tannerlinsley/GitHub/react-charts/www/src/lag-radar.js
/**
 * lagRadar
 * Licence: ISC copyright: @mobz 2018
 */
function lagRadar() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _config$frames = config.frames,
      frames = _config$frames === void 0 ? 50 : _config$frames,
      _config$speed = config.speed,
      speed = _config$speed === void 0 ? 0.0017 : _config$speed,
      _config$size = config.size,
      size = _config$size === void 0 ? 300 : _config$size,
      _config$inset = config.inset,
      inset = _config$inset === void 0 ? 3 : _config$inset,
      _config$parent = config.parent,
      parent = _config$parent === void 0 ? document.body : _config$parent;
  var svgns = 'http://www.w3.org/2000/svg';
  var styles = document.createTextNode("\n    .lagRadar-sweep > * {\n      shape-rendering: crispEdges;\n    }\n    .lagRadar-face {\n      fill: transparent;\n    }\n    .lagRadar-hand {\n      stroke-width: 4px;\n      stroke-linecap: round;\n    }\n  ");

  function $svg(tag) {
    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var el = document.createElementNS(svgns, tag);
    Object.keys(props).forEach(function (prop) {
      return el.setAttribute(prop, props[prop]);
    });
    children.forEach(function (child) {
      return el.appendChild(child);
    });
    return el;
  }

  var PI2 = Math.PI * 2;
  var middle = size / 2;
  var radius = middle - inset;
  var $hand = $svg('path', {
    "class": 'lagRadar-hand'
  });
  var $arcs = new Array(frames).fill('path').map(function (t) {
    return $svg(t);
  });
  var $root = $svg('svg', {
    "class": 'lagRadar',
    height: size,
    width: size
  }, [$svg('style', {
    type: 'text/css'
  }, [styles]), $svg('g', {
    "class": 'lagRadar-sweep'
  }, $arcs), $hand, $svg('circle', {
    "class": 'lagRadar-face',
    cx: middle,
    cy: middle,
    r: radius
  })]);
  parent.appendChild($root);
  var frame;
  var framePtr = 0;
  var last = {
    rotation: 0,
    now: Date.now(),
    tx: middle + radius,
    ty: middle
  };

  var calcHue = function () {
    var max_hue = 120;
    var max_ms = 1000;
    var log_f = 10;
    var mult = max_hue / Math.log(max_ms / log_f);
    return function (ms_delta) {
      return max_hue - Math.max(0, Math.min(mult * Math.log(ms_delta / log_f), max_hue));
    };
  }();

  function animate() {
    var now = Date.now();
    var rdelta = Math.min(PI2 - speed, speed * (now - last.now));
    var rotation = (last.rotation + rdelta) % PI2;
    var tx = middle + radius * Math.cos(rotation);
    var ty = middle + radius * Math.sin(rotation);
    var bigArc = rdelta < Math.PI ? '0' : '1';
    var path = "M".concat(tx, " ").concat(ty, "A").concat(radius, " ").concat(radius, " 0 ").concat(bigArc, " 0 ").concat(last.tx, " ").concat(last.ty, "L").concat(middle, " ").concat(middle);
    var hue = calcHue(rdelta / speed);
    $arcs[framePtr % frames].setAttribute('d', path);
    $arcs[framePtr % frames].setAttribute('fill', "hsl(".concat(hue, ", 80%, 40%)"));
    $hand.setAttribute('d', "M".concat(middle, " ").concat(middle, "L").concat(tx, " ").concat(ty));
    $hand.setAttribute('stroke', "hsl(".concat(hue, ", 80%, 60%)"));

    for (var i = 0; i < frames; i++) {
      $arcs[(frames + framePtr - i) % frames].style.fillOpacity = 1 - i / frames;
    }

    framePtr++;
    last = {
      now: now,
      rotation: rotation,
      tx: tx,
      ty: ty
    };
    frame = window.requestAnimationFrame(animate);
  }

  animate();
  return function destroy() {
    if (frame) {
      window.cancelAnimationFrame(frame);
    }

    $root.remove();
  };
}
// CONCATENATED MODULE: /Users/tannerlinsley/GitHub/react-charts/www/src/containers/StressTest.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return StressTest; });




 //





function StressTest() {
  var _React$useState = external_react_default.a.useState({
    primaryCursorValue: null,
    secondaryCursorValue: null,
    activeSeriesIndex: -1,
    chartCount: 10,
    seriesCount: 10,
    datumCount: 20
  }),
      _React$useState2 = slicedToArray_default()(_React$useState, 2),
      _React$useState2$ = _React$useState2[0],
      chartCount = _React$useState2$.chartCount,
      seriesCount = _React$useState2$.seriesCount,
      datumCount = _React$useState2$.datumCount,
      primaryCursorValue = _React$useState2$.primaryCursorValue,
      secondaryCursorValue = _React$useState2$.secondaryCursorValue,
      activeSeriesIndex = _React$useState2$.activeSeriesIndex,
      setState = _React$useState2[1];

  external_react_default.a.useEffect(function () {
    return lagRadar({
      frames: 60,
      // number of frames to draw, more = worse performance
      speed: 0.0017,
      // how fast the sweep moves (rads per ms)
      size: 300,
      // outer frame px
      inset: 3,
      // circle inset px
      parent: document.body // DOM node to attach to

    });
  }, []);

  var _useChartConfig = Object(useChartConfig["a" /* default */])({
    series: seriesCount,
    datums: datumCount
  }),
      data = _useChartConfig.data,
      randomizeData = _useChartConfig.randomizeData;

  var onFocus = external_react_default.a.useCallback(function (datum) {
    setState(function (old) {
      return objectSpread_default()({}, old, {
        primaryCursorValue: datum ? datum.primary : null,
        secondaryCursorValue: datum ? datum.secondary : null,
        activeSeriesIndex: datum ? datum.series.id : -1
      });
    });
  }, []);
  var axes = external_react_default.a.useMemo(function () {
    return [{
      primary: true,
      position: 'bottom',
      type: 'time'
    }, {
      position: 'left',
      type: 'linear'
    }];
  }, []);
  var series = external_react_default.a.useMemo(function () {
    return {
      showPoints: false
    };
  }, []);
  var primaryCursor = external_react_default.a.useMemo(function () {
    return {
      value: primaryCursorValue
    };
  }, [primaryCursorValue]);
  var secondaryCursor = external_react_default.a.useMemo(function () {
    return {
      value: secondaryCursorValue
    };
  }, [secondaryCursorValue]);
  var getSeriesStyle = external_react_default.a.useCallback(function (series) {
    return {
      opacity: activeSeriesIndex > -1 ? series.id === activeSeriesIndex ? 1 : 0.1 : 1
    };
  }, [activeSeriesIndex]);
  return external_react_default.a.createElement("div", null, external_react_default.a.createElement("h3", null, chartCount, " Charts * 10 Series * 20 Datums (", chartCount * seriesCount * datumCount, " data elements) w/ Synced Cursors & Series Highlighting"), external_react_default.a.createElement("label", null, "Chart Count:", ' ', external_react_default.a.createElement("input", {
    type: "number",
    min: "1",
    value: chartCount,
    onChange: function onChange(e) {
      return e.persist() || setState(function (old) {
        return objectSpread_default()({}, old, {
          chartCount: parseInt(e.target.value)
        });
      });
    }
  })), external_react_default.a.createElement("br", null), external_react_default.a.createElement("label", null, "Series Count:", ' ', external_react_default.a.createElement("input", {
    type: "number",
    min: "1",
    value: seriesCount,
    onChange: function onChange(e) {
      return e.persist() || setState(function (old) {
        return objectSpread_default()({}, old, {
          seriesCount: parseInt(e.target.value)
        });
      });
    }
  })), external_react_default.a.createElement("br", null), external_react_default.a.createElement("label", null, "DatumCount Count:", ' ', external_react_default.a.createElement("input", {
    type: "number",
    min: "1",
    value: datumCount,
    onChange: function onChange(e) {
      return e.persist() || setState(function (old) {
        return objectSpread_default()({}, old, {
          datumCount: parseInt(e.target.value)
        });
      });
    }
  })), external_react_default.a.createElement("br", null), external_react_default.a.createElement("br", null), external_react_default.a.createElement("button", {
    onClick: randomizeData
  }, "Randomize Data"), external_react_default.a.createElement("br", null), external_react_default.a.createElement("br", null), toConsumableArray_default()(new Array(chartCount)).map(function (d, i) {
    return external_react_default.a.createElement(Box["a" /* default */], {
      key: i,
      height: 100,
      canRandomize: false
    }, external_react_default.a.createElement(dist["Chart"], extends_default()({
      data: data,
      tooltip: true
    }, {
      axes: axes,
      series: series,
      primaryCursor: primaryCursor,
      secondaryCursor: secondaryCursor,
      getSeriesStyle: getSeriesStyle,
      onFocus: onFocus
    })));
  }));
}

/***/ })
/******/ ]);
});