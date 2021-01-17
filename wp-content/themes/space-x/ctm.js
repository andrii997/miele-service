/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 73);
/******/ })
/************************************************************************/
/******/ ({

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ctm = _interopRequireDefault(__webpack_require__(2));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Плавная прокрутка по якорю
var _default = _ctm["default"].anchorScroll = function (smooth, offset) {
  var anchors = document.querySelectorAll("[href*='#']");
  smooth = smooth || 1;
  offset = offset || 0;

  _.each(anchors, function (a) {
    a.dataset.anchorScrollOffset = offset;

    if (a.dataset.ctmAnchorScrollListened === undefined) {
      a.dataset.ctmAnchorScrollListened = "true";
      a.addEventListener('click', function (e) {
        var ID = this.href.split('#')[1],
            tElem = document.getElementById(ID);

        if (tElem) {
          e.preventDefault();

          var _offset = Number(this.dataset.anchorScrollOffset),
              wY = window.pageYOffset,
              tE = wY + tElem.getBoundingClientRect().top,
              tY = tE - _offset,
              step = (wY - tY) / smooth;

          step = wY < tE ? Math.abs(step) : 0 - step;
          location.hash = ID;
          scrollAnimate(step, tY, wY, smooth);
        }
      });
    }
  });
};

exports["default"] = _default;

function scrollAnimate(step, tY, wY, smooth) {
  var cycle = 1;
  requestAnimationFrame(function animate() {
    window.scrollTo(window.pageXOffset, wY + step * cycle);
    if (cycle !== smooth) requestAnimationFrame(animate);
    cycle++;
  });
}

/***/ }),

/***/ 18:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ctm = _interopRequireDefault(__webpack_require__(2));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Запоминает введённые данные и вставляет их при загрузке страницы
var _default = _ctm["default"].inputSaver = function () {
  var names = document.querySelectorAll("[name='field-name']"),
      phones = document.querySelectorAll("[name='field-phone']"),
      messages = document.querySelectorAll("[name='field-message']");
  setValueAndSaveInput(names, "input-saver-name");
  setValueAndSaveInput(phones, "input-saver-phones");
  setValueAndSaveInput(messages, "input-saver-message");
};

exports["default"] = _default;

function setValueAndSaveInput(inputs, storageKey) {
  var storageValue = window.localStorage.getItem(storageKey);

  _.each(inputs, function (input) {
    if (storageValue && !input.value || input.value === undefined) input.value = storageValue;
    input.addEventListener("keyup", function () {
      window.localStorage.setItem(storageKey, this.value);
    });
  });
}

/***/ }),

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ctm = _interopRequireDefault(__webpack_require__(2));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Липкий блок внутри родителя
var _default = _ctm["default"].stickyBox = function () {
  var boxes = document.querySelectorAll(".fk-js-sticky-box");

  _.each(boxes, function (box) {
    if (box.dataset.ctmStickyBoxListened === undefined) {
      box.dataset.ctmStickyBoxListened = "true";
      var additionalOffset = 0;
      if (box.dataset.additionalElem !== undefined && box.dataset.additionalElem !== "") additionalOffset = document.querySelector(box.dataset.additionalElem).clientHeight;
      listener(box, additionalOffset);
    }
  });
}; //
// Функции
//


exports["default"] = _default;

function listener(box, additionalOffset) {
  var parent = box.parentElement;
  additionalOffset = additionalOffset || 0;
  parent.style.position = "relative";
  var padding = {
    top: Number(getComputedStyle(parent).paddingTop.replace("px", "")),
    bottom: Number(getComputedStyle(parent).paddingBottom.replace("px", ""))
  },
      boxPoints = {
    inFixed: padding.top + additionalOffset,
    inAbsolute: parent.clientHeight - box.clientHeight - padding.bottom - additionalOffset
  },
      boxParameters = {
    absolute: {
      width: box.getBoundingClientRect().width,
      left: box.getBoundingClientRect().x
    },
    stat: {
      position: getComputedStyle(box).position,
      top: getComputedStyle(box).top,
      width: getComputedStyle(box).width,
      left: getComputedStyle(box).left
    }
  };
  window.addEventListener('scroll', function () {
    var scroll = parent.getBoundingClientRect().top;

    if (scroll < 0) {
      box.style.position = "fixed";
      box.style.top = "".concat(boxPoints.inFixed, "px");
      box.style.width = "".concat(boxParameters.absolute.width, "px");
      box.style.left = "".concat(boxParameters.absolute.left, "px");

      if (scroll <= Number("-".concat(boxPoints.inAbsolute))) {
        box.style.position = "absolute";
        box.style.top = "".concat(boxPoints.inAbsolute, "px");
        box.style.left = boxParameters.stat.left;
      }
    } else {
      box.style.position = boxParameters.stat.position;
      box.style.top = boxParameters.stat.top;
      box.style.width = boxParameters.stat.width;
      box.style.left = boxParameters.stat.left;
    }
  });
}

/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function ctm() {}

var _default = {
  ctm: ctm
};
exports["default"] = _default;

/***/ }),

/***/ 20:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ctm = _interopRequireDefault(__webpack_require__(2));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _ctm["default"].sxForm = function () {
  var forms = document.querySelectorAll("form");

  _.each(forms, function (form) {
    // Мета-данные
    if (!form.querySelector("[name='sx-form-page-url']")) form.insertAdjacentHTML("beforeend", "<input type='hidden' name='sx-form-page-url' value='".concat(window.location.href, "'>"));
    if (!form.querySelector("[name='sx-form-page-title']")) form.insertAdjacentHTML("beforeend", "<input type='hidden' name='sx-form-page-title' value='".concat(document.querySelector("title").innerHTML, "'>"));
    form.addEventListener("mouseenter", function () {
      if (!form.querySelector("[name='sx-form-value-key']")) {
        form.insertAdjacentHTML("beforeend", "<input type='hidden' name='sx-form-value-key' value='OMNmjVWdM9TgwqrqxU4h'>");
      }
    }); // Обработка .sx-form

    if (form.classList.contains("sx-form")) {
      if (form.dataset.ctmSxFormListened === undefined) {
        form.dataset.ctmSxFormListened = "true"; // Событие submit

        form.addEventListener("submit", function (e) {
          e.preventDefault();
          var submit = form.querySelector("[type='submit']") || form.querySelector("button");

          _ctm["default"].sxXhr({
            url: "/wp-admin/admin-ajax.php",
            method: "post",
            form: form,
            beforeSend: function beforeSend() {
              submit.innerHTML = "Отправка...";
              submit.classList.add("fk-btn-default");
              submit.style.opacity = "0.7";
              submit.style.pointerEvents = "none";
              submit.style.cursor = "progress";
              console.log("Запрос: отправка");
            },
            success: function success(data) {
              // Добавлена
              if (data.indexOf('success') + 1) {
                submit.innerHTML = "✔ Успешно отправлено.";
                submit.classList.add("fk-btn-default");
                submit.style.opacity = "1";
                submit.style.pointerEvents = "none";
                submit.style.cursor = "default";
                setTimeout(function () {
                  window.location.href = "/";
                }, 4000);
                console.log("Запрос: Успех"); // Не добавлена
              } else {
                alert("Что-то пошло не так. Пожалуйста, свяжитесь с нами по телефону, указанному на сайте.");
                submit.innerHTML = "× Ошибка.";
                console.log("Запрос: с ошибкой");
              }
            },
            error: function error(data) {
              alert("Что-то пошло не так. Пожалуйста, свяжитесь с нами по телефону, указанному на сайте.");
              submit.innerHTML = "× Ошибка.";
              console.log("Запрос: не удалось");
            }
          });
        });
      }
    }
  });
};

exports["default"] = _default;

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 73:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var _ctm = _interopRequireDefault(__webpack_require__(2));

__webpack_require__(74);

__webpack_require__(75);

__webpack_require__(76);

__webpack_require__(77);

__webpack_require__(78);

__webpack_require__(79);

__webpack_require__(80);

__webpack_require__(17);

__webpack_require__(81);

__webpack_require__(18);

__webpack_require__(82);

__webpack_require__(19);

__webpack_require__(83);

__webpack_require__(20);

__webpack_require__(84);

__webpack_require__(85);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//
// modules
//
//
// pages
//
// import "./pages/..";
global.ctm = _ctm["default"];

_ctm["default"].init();
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),

/***/ 74:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ctm = _interopRequireDefault(__webpack_require__(2));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _ctm["default"].init = function () {
  window.addEventListener('DOMContentLoaded', _ctm["default"].ready);
  window.addEventListener('load', _ctm["default"].load);
  window.addEventListener('scroll', _ctm["default"].scroll);
  window.addEventListener('resize', _ctm["default"].resize);
  window.addEventListener('beforeunload', _ctm["default"].unload);
};

exports["default"] = _default;

/***/ }),

/***/ 75:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ctm = _interopRequireDefault(__webpack_require__(2));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _ctm["default"].ready = function () {
  _ctm["default"].scroll();

  _ctm["default"].stickyBox.init();

  _ctm["default"].inputSaver.init();

  _ctm["default"].anchorScroll.init();

  _ctm["default"].sxForm.init();
};

exports["default"] = _default;

/***/ }),

/***/ 76:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ctm = _interopRequireDefault(__webpack_require__(2));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _ctm["default"].load = function () {
  _ctm["default"].log();
};

exports["default"] = _default;

/***/ }),

/***/ 77:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ctm = _interopRequireDefault(__webpack_require__(2));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _ctm["default"].scroll = function () {// func...
};

exports["default"] = _default;

/***/ }),

/***/ 78:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ctm = _interopRequireDefault(__webpack_require__(2));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _ctm["default"].resize = function () {// func...
};

exports["default"] = _default;

/***/ }),

/***/ 79:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ctm = _interopRequireDefault(__webpack_require__(2));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _ctm["default"].unload = function () {// func...
};

exports["default"] = _default;

/***/ }),

/***/ 80:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ctm = _interopRequireDefault(__webpack_require__(2));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _ctm["default"].log = function (text, empty) {
  if (text === empty) text = "Custom JS is load!";
  console.log(text);
};

exports["default"] = _default;

/***/ }),

/***/ 81:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ctm = _interopRequireDefault(__webpack_require__(2));

__webpack_require__(17);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _ctm["default"].anchorScroll.init = function () {
  _ctm["default"].anchorScroll(20, 70);
};

exports["default"] = _default;

/***/ }),

/***/ 82:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ctm = _interopRequireDefault(__webpack_require__(2));

__webpack_require__(18);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _ctm["default"].inputSaver.init = function () {
  _ctm["default"].inputSaver();
};

exports["default"] = _default;

/***/ }),

/***/ 83:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ctm = _interopRequireDefault(__webpack_require__(2));

__webpack_require__(19);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _ctm["default"].stickyBox.init = function () {
  _ctm["default"].stickyBox();
};

exports["default"] = _default;

/***/ }),

/***/ 84:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ctm = _interopRequireDefault(__webpack_require__(2));

__webpack_require__(20);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _ctm["default"].sxForm.init = function () {
  _ctm["default"].sxForm();
};

exports["default"] = _default;

/***/ }),

/***/ 85:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ctm = _interopRequireDefault(__webpack_require__(2));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _ctm["default"].sxXhr = function (_ref) {
  var url = _ref.url,
      method = _ref.method,
      form = _ref.form,
      beforeSend = _ref.beforeSend,
      success = _ref.success,
      error = _ref.error;
  var request = new XMLHttpRequest(),
      formData = new FormData(form);
  beforeSend(request);
  request.open(method, url);

  request.onload = function () {
    request.status >= 200 && request.status < 400 ? success(request.responseText) : error(request.status);
  };

  request.onerror = function () {
    error(request.status);
  };

  request.send(formData);
}; // JSON пока не поддерживает


exports["default"] = _default;

/***/ })

/******/ });