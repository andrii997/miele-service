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
/******/ 	return __webpack_require__(__webpack_require__.s = 21);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function fk() {}

var _default = {
  fk: fk
};
exports["default"] = _default;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, module) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.9.1
//     http://underscorejs.org
//     (c) 2009-2018 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` (`self`) in the browser, `global`
  // on the server, or `this` in some virtual machines. We use `self`
  // instead of `window` for `WebWorker` support.
  var root = typeof self == 'object' && self.self === self && self ||
            typeof global == 'object' && global.global === global && global ||
            this ||
            {};

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype;
  var SymbolProto = typeof Symbol !== 'undefined' ? Symbol.prototype : null;

  // Create quick reference variables for speed access to core prototypes.
  var push = ArrayProto.push,
      slice = ArrayProto.slice,
      toString = ObjProto.toString,
      hasOwnProperty = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var nativeIsArray = Array.isArray,
      nativeKeys = Object.keys,
      nativeCreate = Object.create;

  // Naked function reference for surrogate-prototype-swapping.
  var Ctor = function(){};

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for their old module API. If we're in
  // the browser, add `_` as a global object.
  // (`nodeType` is checked to ensure that `module`
  // and `exports` are not HTML elements.)
  if (typeof exports != 'undefined' && !exports.nodeType) {
    if (typeof module != 'undefined' && !module.nodeType && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.9.1';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var optimizeCb = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      // The 2-argument case is omitted because we’re not using it.
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  var builtinIteratee;

  // An internal function to generate callbacks that can be applied to each
  // element in a collection, returning the desired result — either `identity`,
  // an arbitrary callback, a property matcher, or a property accessor.
  var cb = function(value, context, argCount) {
    if (_.iteratee !== builtinIteratee) return _.iteratee(value, context);
    if (value == null) return _.identity;
    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
    if (_.isObject(value) && !_.isArray(value)) return _.matcher(value);
    return _.property(value);
  };

  // External wrapper for our callback generator. Users may customize
  // `_.iteratee` if they want additional predicate/iteratee shorthand styles.
  // This abstraction hides the internal-only argCount argument.
  _.iteratee = builtinIteratee = function(value, context) {
    return cb(value, context, Infinity);
  };

  // Some functions take a variable number of arguments, or a few expected
  // arguments at the beginning and then a variable number of values to operate
  // on. This helper accumulates all remaining arguments past the function’s
  // argument length (or an explicit `startIndex`), into an array that becomes
  // the last argument. Similar to ES6’s "rest parameter".
  var restArguments = function(func, startIndex) {
    startIndex = startIndex == null ? func.length - 1 : +startIndex;
    return function() {
      var length = Math.max(arguments.length - startIndex, 0),
          rest = Array(length),
          index = 0;
      for (; index < length; index++) {
        rest[index] = arguments[index + startIndex];
      }
      switch (startIndex) {
        case 0: return func.call(this, rest);
        case 1: return func.call(this, arguments[0], rest);
        case 2: return func.call(this, arguments[0], arguments[1], rest);
      }
      var args = Array(startIndex + 1);
      for (index = 0; index < startIndex; index++) {
        args[index] = arguments[index];
      }
      args[startIndex] = rest;
      return func.apply(this, args);
    };
  };

  // An internal function for creating a new object that inherits from another.
  var baseCreate = function(prototype) {
    if (!_.isObject(prototype)) return {};
    if (nativeCreate) return nativeCreate(prototype);
    Ctor.prototype = prototype;
    var result = new Ctor;
    Ctor.prototype = null;
    return result;
  };

  var shallowProperty = function(key) {
    return function(obj) {
      return obj == null ? void 0 : obj[key];
    };
  };

  var has = function(obj, path) {
    return obj != null && hasOwnProperty.call(obj, path);
  }

  var deepGet = function(obj, path) {
    var length = path.length;
    for (var i = 0; i < length; i++) {
      if (obj == null) return void 0;
      obj = obj[path[i]];
    }
    return length ? obj : void 0;
  };

  // Helper for collection methods to determine whether a collection
  // should be iterated as an array or as an object.
  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  var getLength = shallowProperty('length');
  var isArrayLike = function(collection) {
    var length = getLength(collection);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    iteratee = optimizeCb(iteratee, context);
    var i, length;
    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length);
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  // Create a reducing function iterating left or right.
  var createReduce = function(dir) {
    // Wrap code that reassigns argument variables in a separate function than
    // the one that accesses `arguments.length` to avoid a perf hit. (#1991)
    var reducer = function(obj, iteratee, memo, initial) {
      var keys = !isArrayLike(obj) && _.keys(obj),
          length = (keys || obj).length,
          index = dir > 0 ? 0 : length - 1;
      if (!initial) {
        memo = obj[keys ? keys[index] : index];
        index += dir;
      }
      for (; index >= 0 && index < length; index += dir) {
        var currentKey = keys ? keys[index] : index;
        memo = iteratee(memo, obj[currentKey], currentKey, obj);
      }
      return memo;
    };

    return function(obj, iteratee, memo, context) {
      var initial = arguments.length >= 3;
      return reducer(obj, optimizeCb(iteratee, context, 4), memo, initial);
    };
  };

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = createReduce(1);

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = createReduce(-1);

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var keyFinder = isArrayLike(obj) ? _.findIndex : _.findKey;
    var key = keyFinder(obj, predicate, context);
    if (key !== void 0 && key !== -1) return obj[key];
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    predicate = cb(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(cb(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given item (using `===`).
  // Aliased as `includes` and `include`.
  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
    if (!isArrayLike(obj)) obj = _.values(obj);
    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
    return _.indexOf(obj, item, fromIndex) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = restArguments(function(obj, path, args) {
    var contextPath, func;
    if (_.isFunction(path)) {
      func = path;
    } else if (_.isArray(path)) {
      contextPath = path.slice(0, -1);
      path = path[path.length - 1];
    }
    return _.map(obj, function(context) {
      var method = func;
      if (!method) {
        if (contextPath && contextPath.length) {
          context = deepGet(context, contextPath);
        }
        if (context == null) return void 0;
        method = context[path];
      }
      return method == null ? method : method.apply(context, args);
    });
  });

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matcher(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matcher(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null || typeof iteratee == 'number' && typeof obj[0] != 'object' && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value != null && value > result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(v, index, list) {
        computed = iteratee(v, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = v;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null || typeof iteratee == 'number' && typeof obj[0] != 'object' && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value != null && value < result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(v, index, list) {
        computed = iteratee(v, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = v;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle a collection.
  _.shuffle = function(obj) {
    return _.sample(obj, Infinity);
  };

  // Sample **n** random values from a collection using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (!isArrayLike(obj)) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    var sample = isArrayLike(obj) ? _.clone(obj) : _.values(obj);
    var length = getLength(sample);
    n = Math.max(Math.min(n, length), 0);
    var last = length - 1;
    for (var index = 0; index < n; index++) {
      var rand = _.random(index, last);
      var temp = sample[index];
      sample[index] = sample[rand];
      sample[rand] = temp;
    }
    return sample.slice(0, n);
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    var index = 0;
    iteratee = cb(iteratee, context);
    return _.pluck(_.map(obj, function(value, key, list) {
      return {
        value: value,
        index: index++,
        criteria: iteratee(value, key, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior, partition) {
    return function(obj, iteratee, context) {
      var result = partition ? [[], []] : {};
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (has(result, key)) result[key]++; else result[key] = 1;
  });

  var reStrSymbol = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (_.isString(obj)) {
      // Keep surrogate pair characters together
      return obj.match(reStrSymbol);
    }
    if (isArrayLike(obj)) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = group(function(result, value, pass) {
    result[pass ? 0 : 1].push(value);
  }, true);

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null || array.length < 1) return n == null ? void 0 : [];
    if (n == null || guard) return array[0];
    return _.initial(array, array.length - n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array.
  _.last = function(array, n, guard) {
    if (array == null || array.length < 1) return n == null ? void 0 : [];
    if (n == null || guard) return array[array.length - 1];
    return _.rest(array, Math.max(0, array.length - n));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, Boolean);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, output) {
    output = output || [];
    var idx = output.length;
    for (var i = 0, length = getLength(input); i < length; i++) {
      var value = input[i];
      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
        // Flatten current level of array or arguments object.
        if (shallow) {
          var j = 0, len = value.length;
          while (j < len) output[idx++] = value[j++];
        } else {
          flatten(value, shallow, strict, output);
          idx = output.length;
        }
      } else if (!strict) {
        output[idx++] = value;
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = restArguments(function(array, otherArrays) {
    return _.difference(array, otherArrays);
  });

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // The faster algorithm will not work with an iteratee if the iteratee
  // is not a one-to-one function, so providing an iteratee will disable
  // the faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = cb(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = getLength(array); i < length; i++) {
      var value = array[i],
          computed = iteratee ? iteratee(value, i, array) : value;
      if (isSorted && !iteratee) {
        if (!i || seen !== computed) result.push(value);
        seen = computed;
      } else if (iteratee) {
        if (!_.contains(seen, computed)) {
          seen.push(computed);
          result.push(value);
        }
      } else if (!_.contains(result, value)) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = restArguments(function(arrays) {
    return _.uniq(flatten(arrays, true, true));
  });

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = getLength(array); i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      var j;
      for (j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = restArguments(function(array, rest) {
    rest = flatten(rest, true, true);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  });

  // Complement of _.zip. Unzip accepts an array of arrays and groups
  // each array's elements on shared indices.
  _.unzip = function(array) {
    var length = array && _.max(array, getLength).length || 0;
    var result = Array(length);

    for (var index = 0; index < length; index++) {
      result[index] = _.pluck(array, index);
    }
    return result;
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = restArguments(_.unzip);

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values. Passing by pairs is the reverse of _.pairs.
  _.object = function(list, values) {
    var result = {};
    for (var i = 0, length = getLength(list); i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Generator function to create the findIndex and findLastIndex functions.
  var createPredicateIndexFinder = function(dir) {
    return function(array, predicate, context) {
      predicate = cb(predicate, context);
      var length = getLength(array);
      var index = dir > 0 ? 0 : length - 1;
      for (; index >= 0 && index < length; index += dir) {
        if (predicate(array[index], index, array)) return index;
      }
      return -1;
    };
  };

  // Returns the first index on an array-like that passes a predicate test.
  _.findIndex = createPredicateIndexFinder(1);
  _.findLastIndex = createPredicateIndexFinder(-1);

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = cb(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = getLength(array);
    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Generator function to create the indexOf and lastIndexOf functions.
  var createIndexFinder = function(dir, predicateFind, sortedIndex) {
    return function(array, item, idx) {
      var i = 0, length = getLength(array);
      if (typeof idx == 'number') {
        if (dir > 0) {
          i = idx >= 0 ? idx : Math.max(idx + length, i);
        } else {
          length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
        }
      } else if (sortedIndex && idx && length) {
        idx = sortedIndex(array, item);
        return array[idx] === item ? idx : -1;
      }
      if (item !== item) {
        idx = predicateFind(slice.call(array, i, length), _.isNaN);
        return idx >= 0 ? idx + i : -1;
      }
      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
        if (array[idx] === item) return idx;
      }
      return -1;
    };
  };

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (stop == null) {
      stop = start || 0;
      start = 0;
    }
    if (!step) {
      step = stop < start ? -1 : 1;
    }

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Chunk a single array into multiple arrays, each containing `count` or fewer
  // items.
  _.chunk = function(array, count) {
    if (count == null || count < 1) return [];
    var result = [];
    var i = 0, length = array.length;
    while (i < length) {
      result.push(slice.call(array, i, i += count));
    }
    return result;
  };

  // Function (ahem) Functions
  // ------------------

  // Determines whether to execute a function as a constructor
  // or a normal function with the provided arguments.
  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
    var self = baseCreate(sourceFunc.prototype);
    var result = sourceFunc.apply(self, args);
    if (_.isObject(result)) return result;
    return self;
  };

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = restArguments(function(func, context, args) {
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    var bound = restArguments(function(callArgs) {
      return executeBound(func, bound, context, this, args.concat(callArgs));
    });
    return bound;
  });

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder by default, allowing any combination of arguments to be
  // pre-filled. Set `_.partial.placeholder` for a custom placeholder argument.
  _.partial = restArguments(function(func, boundArgs) {
    var placeholder = _.partial.placeholder;
    var bound = function() {
      var position = 0, length = boundArgs.length;
      var args = Array(length);
      for (var i = 0; i < length; i++) {
        args[i] = boundArgs[i] === placeholder ? arguments[position++] : boundArgs[i];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return executeBound(func, bound, this, this, args);
    };
    return bound;
  });

  _.partial.placeholder = _;

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = restArguments(function(obj, keys) {
    keys = flatten(keys, false, false);
    var index = keys.length;
    if (index < 1) throw new Error('bindAll must be passed function names');
    while (index--) {
      var key = keys[index];
      obj[key] = _.bind(obj[key], obj);
    }
  });

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
      if (!has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = restArguments(function(func, wait, args) {
    return setTimeout(function() {
      return func.apply(null, args);
    }, wait);
  });

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = _.partial(_.delay, _, 1);

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var timeout, context, args, result;
    var previous = 0;
    if (!options) options = {};

    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };

    var throttled = function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };

    throttled.cancel = function() {
      clearTimeout(timeout);
      previous = 0;
      timeout = context = args = null;
    };

    return throttled;
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, result;

    var later = function(context, args) {
      timeout = null;
      if (args) result = func.apply(context, args);
    };

    var debounced = restArguments(function(args) {
      if (timeout) clearTimeout(timeout);
      if (immediate) {
        var callNow = !timeout;
        timeout = setTimeout(later, wait);
        if (callNow) result = func.apply(this, args);
      } else {
        timeout = _.delay(later, wait, this, args);
      }

      return result;
    });

    debounced.cancel = function() {
      clearTimeout(timeout);
      timeout = null;
    };

    return debounced;
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed on and after the Nth call.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed up to (but not including) the Nth call.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      }
      if (times <= 1) func = null;
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  _.restArguments = restArguments;

  // Object Functions
  // ----------------

  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
    'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

  var collectNonEnumProps = function(obj, keys) {
    var nonEnumIdx = nonEnumerableProps.length;
    var constructor = obj.constructor;
    var proto = _.isFunction(constructor) && constructor.prototype || ObjProto;

    // Constructor is a special case.
    var prop = 'constructor';
    if (has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

    while (nonEnumIdx--) {
      prop = nonEnumerableProps[nonEnumIdx];
      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
        keys.push(prop);
      }
    }
  };

  // Retrieve the names of an object's own properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`.
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (has(obj, key)) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve all the property names of an object.
  _.allKeys = function(obj) {
    if (!_.isObject(obj)) return [];
    var keys = [];
    for (var key in obj) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Returns the results of applying the iteratee to each element of the object.
  // In contrast to _.map it returns an object.
  _.mapObject = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = _.keys(obj),
        length = keys.length,
        results = {};
    for (var index = 0; index < length; index++) {
      var currentKey = keys[index];
      results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  // Convert an object into a list of `[key, value]` pairs.
  // The opposite of _.object.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`.
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // An internal function for creating assigner functions.
  var createAssigner = function(keysFunc, defaults) {
    return function(obj) {
      var length = arguments.length;
      if (defaults) obj = Object(obj);
      if (length < 2 || obj == null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;
        for (var i = 0; i < l; i++) {
          var key = keys[i];
          if (!defaults || obj[key] === void 0) obj[key] = source[key];
        }
      }
      return obj;
    };
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = createAssigner(_.allKeys);

  // Assigns a given object with all the own properties in the passed-in object(s).
  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
  _.extendOwn = _.assign = createAssigner(_.keys);

  // Returns the first key on an object that passes a predicate test.
  _.findKey = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = _.keys(obj), key;
    for (var i = 0, length = keys.length; i < length; i++) {
      key = keys[i];
      if (predicate(obj[key], key, obj)) return key;
    }
  };

  // Internal pick helper function to determine if `obj` has key `key`.
  var keyInObj = function(value, key, obj) {
    return key in obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = restArguments(function(obj, keys) {
    var result = {}, iteratee = keys[0];
    if (obj == null) return result;
    if (_.isFunction(iteratee)) {
      if (keys.length > 1) iteratee = optimizeCb(iteratee, keys[1]);
      keys = _.allKeys(obj);
    } else {
      iteratee = keyInObj;
      keys = flatten(keys, false, false);
      obj = Object(obj);
    }
    for (var i = 0, length = keys.length; i < length; i++) {
      var key = keys[i];
      var value = obj[key];
      if (iteratee(value, key, obj)) result[key] = value;
    }
    return result;
  });

  // Return a copy of the object without the blacklisted properties.
  _.omit = restArguments(function(obj, keys) {
    var iteratee = keys[0], context;
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
      if (keys.length > 1) context = keys[1];
    } else {
      keys = _.map(flatten(keys, false, false), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  });

  // Fill in a given object with default properties.
  _.defaults = createAssigner(_.allKeys, true);

  // Creates an object that inherits from the given prototype object.
  // If additional properties are provided then they will be added to the
  // created object.
  _.create = function(prototype, props) {
    var result = baseCreate(prototype);
    if (props) _.extendOwn(result, props);
    return result;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Returns whether an object has a given set of `key:value` pairs.
  _.isMatch = function(object, attrs) {
    var keys = _.keys(attrs), length = keys.length;
    if (object == null) return !length;
    var obj = Object(object);
    for (var i = 0; i < length; i++) {
      var key = keys[i];
      if (attrs[key] !== obj[key] || !(key in obj)) return false;
    }
    return true;
  };


  // Internal recursive comparison function for `isEqual`.
  var eq, deepEq;
  eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // `null` or `undefined` only equal to itself (strict comparison).
    if (a == null || b == null) return false;
    // `NaN`s are equivalent, but non-reflexive.
    if (a !== a) return b !== b;
    // Exhaust primitive checks
    var type = typeof a;
    if (type !== 'function' && type !== 'object' && typeof b != 'object') return false;
    return deepEq(a, b, aStack, bStack);
  };

  // Internal recursive comparison function for `isEqual`.
  deepEq = function(a, b, aStack, bStack) {
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN.
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
      case '[object Symbol]':
        return SymbolProto.valueOf.call(a) === SymbolProto.valueOf.call(b);
    }

    var areArrays = className === '[object Array]';
    if (!areArrays) {
      if (typeof a != 'object' || typeof b != 'object') return false;

      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
                               _.isFunction(bCtor) && bCtor instanceof bCtor)
                          && ('constructor' in a && 'constructor' in b)) {
        return false;
      }
    }
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

    // Initializing stack of traversed objects.
    // It's done here since we only need them for objects and arrays comparison.
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }

    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);

    // Recursively compare objects and arrays.
    if (areArrays) {
      // Compare array lengths to determine if a deep comparison is necessary.
      length = a.length;
      if (length !== b.length) return false;
      // Deep compare the contents, ignoring non-numeric properties.
      while (length--) {
        if (!eq(a[length], b[length], aStack, bStack)) return false;
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      length = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      if (_.keys(b).length !== length) return false;
      while (length--) {
        // Deep compare each member
        key = keys[length];
        if (!(has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return true;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
    return _.keys(obj).length === 0;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError, isMap, isWeakMap, isSet, isWeakSet.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error', 'Symbol', 'Map', 'WeakMap', 'Set', 'WeakSet'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE < 9), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
  // IE 11 (#1621), Safari 8 (#1929), and PhantomJS (#2236).
  var nodelist = root.document && root.document.childNodes;
  if (typeof /./ != 'function' && typeof Int8Array != 'object' && typeof nodelist != 'function') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return !_.isSymbol(obj) && isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`?
  _.isNaN = function(obj) {
    return _.isNumber(obj) && isNaN(obj);
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, path) {
    if (!_.isArray(path)) {
      return has(obj, path);
    }
    var length = path.length;
    for (var i = 0; i < length; i++) {
      var key = path[i];
      if (obj == null || !hasOwnProperty.call(obj, key)) {
        return false;
      }
      obj = obj[key];
    }
    return !!length;
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };

  // Predicate-generating functions. Often useful outside of Underscore.
  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  // Creates a function that, when passed an object, will traverse that object’s
  // properties down the given `path`, specified as an array of keys or indexes.
  _.property = function(path) {
    if (!_.isArray(path)) {
      return shallowProperty(path);
    }
    return function(obj) {
      return deepGet(obj, path);
    };
  };

  // Generates a function for a given object that returns a given property.
  _.propertyOf = function(obj) {
    if (obj == null) {
      return function(){};
    }
    return function(path) {
      return !_.isArray(path) ? obj[path] : deepGet(obj, path);
    };
  };

  // Returns a predicate for checking whether an object has a given set of
  // `key:value` pairs.
  _.matcher = _.matches = function(attrs) {
    attrs = _.extendOwn({}, attrs);
    return function(obj) {
      return _.isMatch(obj, attrs);
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = optimizeCb(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };

  // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped.
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // Traverses the children of `obj` along `path`. If a child is a function, it
  // is invoked with its parent as context. Returns the value of the final
  // child, or `fallback` if any child is undefined.
  _.result = function(obj, path, fallback) {
    if (!_.isArray(path)) path = [path];
    var length = path.length;
    if (!length) {
      return _.isFunction(fallback) ? fallback.call(obj) : fallback;
    }
    for (var i = 0; i < length; i++) {
      var prop = obj == null ? void 0 : obj[path[i]];
      if (prop === void 0) {
        prop = fallback;
        i = length; // Ensure we don't continue iterating.
      }
      obj = _.isFunction(prop) ? prop.call(obj) : prop;
    }
    return obj;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate: /<%([\s\S]+?)%>/g,
    interpolate: /<%=([\s\S]+?)%>/g,
    escape: /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'": "'",
    '\\': '\\',
    '\r': 'r',
    '\n': 'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escapeRegExp = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escapeRegExp, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offset.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    var render;
    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var chainResult = function(instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return chainResult(this, func.apply(_, args));
      };
    });
    return _;
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return chainResult(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return chainResult(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // Provide unwrapping proxy for some methods used in engine operations
  // such as arithmetic and JSON stringification.
  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

  _.prototype.toString = function() {
    return String(this._wrapped);
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() {
      return _;
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }
}());

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), __webpack_require__(22)(module)))

/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fk = _interopRequireDefault(__webpack_require__(0));

var _underscore = _interopRequireDefault(__webpack_require__(1));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _fk["default"].viewer = function (views, empty) {
  if (views === empty) views = document.querySelectorAll(".fk-viewer-init");

  _underscore["default"].each(views, function (view) {
    if (view.dataset.fkViewerInitListened === undefined) {
      view.dataset.fkViewerInitListened = "true";

      var imgs = [],
          imgUrl,
          randomId = _fk["default"].getRandom(10, 99999),
          imageElem = view.dataset.viewerImg || "";

      _underscore["default"].each(view.children, function (img, index) {
        if (imageElem !== "") img = img.querySelector(".".concat(imageElem));
        img.tagName === "DIV" ? imgUrl = img.dataset.bg || img.style.backgroundImage || img.style.background || img.children[0].dataset.src || img.children[0].getAttribute("src") : imgUrl = img.dataset.src || img.getAttribute("src");
        imgs.push(urlFilter(imgUrl));
        img.classList.add("fk-viewer-toggle");
        img.dataset.slideTarget = ++index;
        img.dataset.viewerTarget = randomId;
      });

      _fk["default"].viewer.make(imgs, randomId);
    }
  }); //
  // Функции
  //


  function urlFilter(url) {
    url = url.replace("url(\"", "");
    url = url.replace("\")", "");
    url = url.replace("url(", "");
    url = url.replace(")", "");
    return url;
  }

  window.addEventListener("keydown", function (e) {
    if (e.keyCode === 27) _fk["default"].viewer.toggle();
  });
};

exports["default"] = _default;

/***/ }),
/* 4 */
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fk = _interopRequireDefault(__webpack_require__(0));

var _underscore = _interopRequireDefault(__webpack_require__(1));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _fk["default"].form = function () {};

exports["default"] = _default;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fk = _interopRequireDefault(__webpack_require__(0));

var _underscore = _interopRequireDefault(__webpack_require__(1));

__webpack_require__(13);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//
// Подгружает через ajax svg-иконки по мере надобности и вставляет их целиком в документ
//
// # Первый параметр -- корневая директория fk.
// # Если вторым передать true, то первый будет принят за полный путь к хранилищу иконок.
// # `update = true` обновляет localStorage (всё можно передать через data-* для конкретной иконки).
// # Если передать в функцию только один параметр -- "remove", то она удалит все иконки из localStorage.
var getRootUrl = createUrl();

var _default = _fk["default"].svg.icon = function (dir, newRoot, update, empty) {
  var elems = document.querySelectorAll("*[fk-icon]"),
      url;

  if (newRoot !== empty && newRoot) {
    url = dir;
  } else {
    url = dir === empty ? getRootUrl() + "/fk/assets/img-icon/icon" : getRootUrl() + dir;
  }

  _underscore["default"].each(elems, function (elem) {
    if (elem.dataset.fkSvgIconListened === undefined && _fk["default"].getOffset(elem) < 200) {
      var icon = elem.getAttribute("fk-icon"),
          iconUrl;

      if (elem.dataset.dir === empty) {
        iconUrl = "".concat(url, "/").concat(icon, ".svg");
      } else if (elem.dataset.newRoot === empty) {
        iconUrl = "".concat(getRootUrl()).concat(elem.dataset.dir, "/").concat(icon, ".svg");
        update = true;
      } else {
        iconUrl = "".concat(elem.dataset.dir, "/").concat(icon, ".svg");
        update = true;
      }

      if (elem.dataset.update !== undefined) update = true;

      if (update !== empty || !localStorage.getItem(icon)) {
        _fk["default"].get(iconUrl, function (data) {
          localStorage.setItem(icon, data);
          storageItems(icon);
          iconInsert(elem, data);
        }, function () {
          console.log("Icon \"".concat(icon, "\" is undefined."));
        });
      } else {
        iconInsert(elem, localStorage.getItem(icon));
      }
    }
  });
}; //
// Функции
//


exports["default"] = _default;

function iconInsert(elem, content) {
  elem.innerHTML = "";
  elem.insertAdjacentHTML("beforeend", content);
  elem.dataset.fkSvgIconListened = "true";

  _fk["default"].svg.icon.hover(elem);

  setSizes(elem);

  if (elem.dataset.iconFilter === undefined) {
    if (elem.closest("*[data-icon-filter]")) {
      elem.dataset.iconFilter = elem.closest("*[data-icon-filter]").dataset.iconFilter;

      _fk["default"].svg.icon.filter(elem, elem.dataset.iconFilter);
    }
  }

  if (elem.dataset.iconFilterHover === undefined) {
    if (elem.closest("*[data-icon-filter-hover]")) {
      elem.dataset.iconFilterHover = elem.closest("*[data-icon-filter-hover]").dataset.iconFilterHover;
    }
  }
}

function createUrl() {
  var firstRequest = 0,
      url;
  return function () {
    if (firstRequest === 0) {
      url = document.querySelector("meta[content*='fk/']").getAttribute("content").split("/fk/assets/")[0];
    }

    firstRequest = 1;
    return url;
  };
}

function storageItems(item) {
  var items = localStorage.getItem("fk-icon-items");
  localStorage.setItem("fk-icon-items", "".concat(items, ",").concat(item));
}

function setSizes(elem) {
  var svg = elem.querySelector("svg");

  if (elem.dataset.height || elem.dataset.width || elem.dataset.maxHeight || elem.dataset.maxWidth) {
    elem.dataset.height === undefined ? svg.style.height = "auto" : svg.style.height = elem.dataset.height;
    elem.dataset.width === undefined ? svg.style.width = "auto" : svg.style.width = elem.dataset.width;
    elem.dataset.maxHeight === undefined ? svg.style.maxHeight = "auto" : svg.style.maxHeight = elem.dataset.maxHeight;
    elem.dataset.maxWidth === undefined ? svg.style.maxWidth = "auto" : svg.style.maxWidth = elem.dataset.maxWidth;
  }
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fk = _interopRequireDefault(__webpack_require__(0));

var _underscore = _interopRequireDefault(__webpack_require__(1));

var _initListeners = __webpack_require__(67);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _fk["default"].switcher = function (data) {
  var switchers = document.querySelectorAll(".".concat(data["switchers"]));

  if (!window.cursorX) {
    window.addEventListener("mouseover", function (e) {
      window.cursorX = e.clientX;
      window.cursorY = e.clientY;
    });
  }

  _underscore["default"].each(switchers, function (switcher) {
    if (undefined === switcher.dataset.fkSwitcherListened) {
      switcher.dataset.fkSwitcherListened = "true";

      var ID = _fk["default"].getRandom(0, 1000000);

      var slides = switcher.querySelectorAll(".".concat(data["slides"])),
          duplicates = switcher.querySelectorAll(".".concat(data["duplicates"])),
          next = switcher.querySelectorAll(".".concat(data["next"])),
          prev = switcher.querySelectorAll(".".concat(data["prev"]));
      switcher.setAttribute("id", "fk-switcher-".concat(ID));
      switcher.setAttribute("fk-switcher-id", ID);
      switcher.setAttribute("fk-switcher-type", "".concat(data["type"]));
      switcher.setAttribute("fk-switcher-length", slides.length);
      switcher.setAttribute("fk-switcher-duplicates", duplicates.length);
      switcher.setAttribute("fk-switcher-next", next.length);
      switcher.setAttribute("fk-switcher-prev", prev.length);
      switcher.setAttribute("fk-switcher-next-class", "".concat(data["next"]));
      switcher.setAttribute("fk-switcher-prev-class", "".concat(data["prev"]));
      switcher.setAttribute("fk-switcher-current", "0");
      if (data["duplicates"]) switcher.setAttribute("fk-switcher-duplicates-class", "".concat(data["duplicates"]));
      if (data["col-lg"]) switcher.setAttribute("fk-switcher-col-lg", "".concat(data["col-lg"]));
      if (data["col-sm"]) switcher.setAttribute("fk-switcher-col-sm", "".concat(data["col-sm"]));

      if (data["interval"]) {
        if (!switcher.getAttribute("fk-switcher-interval")) switcher.setAttribute("fk-switcher-interval", data["interval"]);
      }

      _underscore["default"].each(slides, function (e, i) {
        return e.setAttribute("id", "fk-switcher-".concat(ID, "-slide-").concat(++i));
      });

      _underscore["default"].each(duplicates, function (e, i) {
        return e.setAttribute("id", "fk-switcher-".concat(ID, "-duplicate-").concat(++i));
      });

      _underscore["default"].each(next, function (e, i) {
        return e.setAttribute("id", "fk-switcher-".concat(ID, "-next-").concat(++i));
      });

      _underscore["default"].each(prev, function (e, i) {
        return e.setAttribute("id", "fk-switcher-".concat(ID, "-prev-").concat(++i));
      });

      (0, _initListeners.initListeners)(switcher, slides, duplicates, next, prev, data["type"]);
    }
  });
};

exports["default"] = _default;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fk = _interopRequireDefault(__webpack_require__(0));

var _underscore = _interopRequireDefault(__webpack_require__(1));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _fk["default"].navs = function (data) {
  var navs = document.querySelectorAll(".".concat(data["navs"])),
      icon = data["icon"] || "<i class='fk-icon-stroke-right' fk-icon='fill/arrow-down'></i>",
      iconLi = data["icon-li"] || icon,
      iconBurger = data["icon-burger"] || "<div class='fk-icon-md' fk-icon='fill/menu'></div>";
  addCloserNavs(navs, data["navs"]);

  _underscore["default"].each(navs, function (nav) {
    var ID = _fk["default"].getRandom(0, 1000000),
        navID = "fk-navs-".concat(ID);

    if (undefined === nav.dataset.fkNavsListened) {
      nav.dataset.fkNavsListened = "true";
      nav.dataset.fkNavsId = ID;
      nav.setAttribute("id", navID);
      addBurgerIcon(nav, navs, iconBurger);
      var menus = document.querySelectorAll("#".concat(navID, " > li"));

      _underscore["default"].each(menus, function (menu) {
        if (menu.querySelector("ul")) {
          var ul = menu.querySelector("ul");
          menu.classList.add("fk-navs-menu-tree");
          ul.insertAdjacentHTML("beforebegin", icon);
          addHoverActivities(menu, iconLi);

          if (ul.querySelector("ul")) {
            menu.classList.add("fk-navs-menu-extend");
            menu.addEventListener("fk-active", function () {
              ul.style.width = document.querySelector(".fk-container-lg").getBoundingClientRect().width + "px";
            });
          }
        }
      });
    }
  });
};

exports["default"] = _default;

function addHoverActivities(menu, icon) {
  var menuUlChild = menu.querySelector("ul");
  menu.addEventListener("mouseenter", function () {
    menu.classList.add("active");
    menu.dispatchEvent(_fk["default"].hooks.active);
  });
  menuUlChild.addEventListener("mouseenter", function () {
    menuUlChild.dataset.cursorHover = "true";
  });
  menu.addEventListener("mouseleave", function () {
    setTimeout(function () {
      if (menuUlChild.dataset.cursorHover !== "true") {
        menu.classList.remove("active");
        menu.dispatchEvent(_fk["default"].hooks.inactive);
      } else {
        menuUlChild.dataset.cursorHover = "";
      }
    }, 300);
  });
  var li = menu.querySelectorAll("li");

  _underscore["default"].each(li, function (item) {
    if (item.querySelector("ul")) {
      var ul = item.querySelector("ul");
      item.classList.add("fk-navs-li-tree");
      ul.insertAdjacentHTML("beforebegin", icon);
      if (ul.querySelector("ul")) item.classList.add("fk-navs-li-extend");
    }

    item.addEventListener("mouseenter", function () {
      this.classList.add("active");
      this.dispatchEvent(_fk["default"].hooks.active);
    });
    item.addEventListener("mouseleave", function () {
      this.classList.remove("active");
      this.dispatchEvent(_fk["default"].hooks.inactive);
    });
  });
}

function addBurgerIcon(nav, navs, icon) {
  nav.insertAdjacentHTML("afterend", icon);
  var burger = nav.nextElementSibling;

  if (undefined === burger.dataset.fkNavsAddBurgerIconListened) {
    burger.dataset.fkNavsAddBurgerIconListened = "true";
    burger.classList.add("fk-navs-burger");
    burger.setAttribute("id", "fk-navs-burger-".concat(nav.dataset.fkNavsId));
    burger.addEventListener("click", function () {
      nav.classList.toggle("active");
      nav.dispatchEvent(_fk["default"].hooks.action);

      _underscore["default"].each(navs, function (elem) {
        if (elem !== nav) {
          elem.classList.remove("active");
          elem.dispatchEvent(_fk["default"].hooks.inactive);
        }
      });
    });
  }
}

function addCloserNavs(navs, classNavs) {
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".fk-navs-burger") && !e.target.closest(".".concat(classNavs))) _fk["default"].navs.close(navs);
  });
  window.addEventListener("keydown", function (e) {
    if (e.keyCode === 27) _fk["default"].navs.close(navs);
  });
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fk = _interopRequireDefault(__webpack_require__(0));

__webpack_require__(5);

var _underscore = _interopRequireDefault(__webpack_require__(1));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _fk["default"].form.data = function () {
  var dataSession = "<input type=\"hidden\" name=\"page-title\" value=\"".concat(document.querySelector("title").innerHTML, "\">\n             <input type=\"hidden\" name=\"page-url\" value=\"").concat(window.location["href"], "\">\n             <input type=\"hidden\" name=\"secret-key\" value=\"").concat(_fk["default"].getRandom(10, 100000), "\">"),
      forms = document.getElementsByTagName("form");

  _underscore["default"].each(forms, function (form) {
    form.insertAdjacentHTML("beforeend", dataSession);
  });
};

exports["default"] = _default;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fk = _interopRequireDefault(__webpack_require__(0));

__webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _fk["default"].form.answer = function () {
  if (_fk["default"].getParam("fk-form")) {
    var answer = _fk["default"].getParam("fk-form");

    if (answer === "success") _fk["default"].alert.message("<b>Спасибо!</b> <br>Ваше сообщение успешно отправлено.", "success", 4000, true, "fz-md text-center");
    if (answer === "danger") _fk["default"].alert.message("<b>Сообщение не было отправлено.</b> <br>Пожалуйста, свяжитесь с нами по телефону, указанному на сайте.", "danger", 5000, true, "fz-md text-center");

    _fk["default"].getRemove("fk-form");
  }
};

exports["default"] = _default;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fk = _interopRequireDefault(__webpack_require__(0));

var _underscore = _interopRequireDefault(__webpack_require__(1));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _fk["default"].modal.toggle = function (target, empty) {
  var modalWindow = document.getElementById("fk-modal"),
      modals = document.getElementsByClassName("fk-modal"),
      body = document.querySelector("body");

  if (target !== empty) {
    var modalWrap = document.getElementById("fk-modal__wrap"),
        modalTarget = document.getElementById("fk-modal-".concat(target));
    modalWrap.setAttribute("class", modalTarget.dataset["class"]);
    modalWindow.classList.add("active");
    body.style.overflowY = "hidden";

    _underscore["default"].each(modals, function (modal) {
      if (modal === modalTarget) {
        setTimeout(function () {
          modal.classList.add("active");
          modalTarget.dispatchEvent(_fk["default"].hooks.active);
        }, 150);
      } else {
        modal.classList.remove("active");
        modal.dispatchEvent(_fk["default"].hooks.inactive);
      }
    });
  } // Закрываем все окна
  else {
      _underscore["default"].each(modals, function (modal) {
        modal.classList.remove("active");
        modal.dispatchEvent(_fk["default"].hooks.inactive);
      });

      setTimeout(function () {
        modalWindow.classList.remove("active");
        body.style.overflowY = "auto";
      }, 150);
    }
};

exports["default"] = _default;
window.addEventListener("keydown", function (e) {
  if (e.keyCode === 27) _fk["default"].modal.toggle();
});

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fk = _interopRequireDefault(__webpack_require__(0));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//
// Кнопка "Вверх" для мобильных
//
var _default = _fk["default"].toTop = function () {
  if (!document.querySelector("#fk-to-top-anchor")) {
    var body = document.querySelector("body"),
        anchor = "<div id='fk-to-top-anchor'></div>",
        button = "<a class='fk-to-top fk-icon-light-lg fk-icon-sm' fk-icon='fill/arrow-up' href='#fk-to-top-anchor'></a>";

    if (1000 > body.offsetWidth) {
      body.insertAdjacentHTML("afterbegin", anchor);
      body.insertAdjacentHTML("beforeend", button);
      scrollToActive();
    }
  } //
  // Functions
  //


  function scrollToActive() {
    var button = document.querySelector(".fk-to-top");

    if (undefined === button.dataset.fkToTopScrollListened) {
      button.dataset.fkToTopScrollListened = "true";
      window.addEventListener('scroll', function () {
        if (800 < _fk["default"].getOffset()) {
          button.classList.add("active");
          button.dispatchEvent(_fk["default"].hooks.active);
        } else {
          button.classList.remove("active");
          button.dispatchEvent(_fk["default"].hooks.inactive);
        }
      });
    }
  }
};

exports["default"] = _default;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fk = _interopRequireDefault(__webpack_require__(0));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _fk["default"].svg = {};

exports["default"] = _default;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fk = _interopRequireDefault(__webpack_require__(0));

var _underscore = _interopRequireDefault(__webpack_require__(1));

__webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//
// Заменяет цвет на полученный
//
// # Хранит все изменения в массиве и вставляет только результат.
// # fk.svg.icon.filter( div.fk-icon, "#ffffff > dark || #222222 > rgba(0,0,0,1)" );
var _default = _fk["default"].svg.icon.filter = function (iconsDiv, setFilter, back, empty) {
  var svg = iconsDiv.getElementsByTagName("svg"),
      svgHTML = [],
      rules = [];

  _underscore["default"].each(svg, function (elem) {
    return svgHTML.push(elem.innerHTML);
  });

  _underscore["default"].each(setFilter.split(" || "), function (e) {
    rules.push({
      "color": e.split(" > ")[0],
      "to": e.split(" > ")[1]
    });
  });

  _underscore["default"].each(rules, function (rul, index) {
    var color = !(rul["color"].indexOf('#') + 1) && !(rul["color"].indexOf('rgb') + 1) ? _fk["default"].getColor(rul["color"]) : rul["color"],
        colorTo = !(rul["to"].indexOf('#') + 1) && !(rul["to"].indexOf('rgb') + 1) ? _fk["default"].getColor(rul["to"]) : rul["to"];

    _underscore["default"].each(svgHTML, function (svg, index) {
      svgHTML[index] = svg.replace(new RegExp(color, 'g'), colorTo);
    });

    if (index === rules.length - 1) {
      back === empty ? _underscore["default"].each(svg, function (elem, index) {
        return elem.innerHTML = svgHTML[index];
      }) : _underscore["default"].each(svg, function (elem, index) {
        return back = svgHTML[index];
      });
    }
  });

  if (back !== empty) return back;
};

exports["default"] = _default;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fk = _interopRequireDefault(__webpack_require__(0));

__webpack_require__(7);

var _whichNext = __webpack_require__(16);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _fk["default"].switcher.anyway = function (ID, switcher, action) {
  var switcherLength = switcher.getAttribute("fk-switcher-length"),
      currentID = switcher.getAttribute("fk-switcher-current"),
      nextID = (0, _whichNext.whichNext)(switcher, action),
      current = document.getElementById("fk-switcher-".concat(ID, "-slide-").concat(currentID)),
      next = document.getElementById("fk-switcher-".concat(ID, "-slide-").concat(nextID));

  if (current) {
    current.classList.remove("active", "end");
    current.dispatchEvent(_fk["default"].hooks.inactive);
  }

  removeEndActiveForDuplicates();
  removeEndForButtons();
  addEndForButtons();
  next.classList.add("active");

  if (nextID.toString() === "1" || nextID.toString() === switcherLength) {
    next.classList.add("end");
    addEndForDuplicates();
  }

  next.dispatchEvent(_fk["default"].hooks.active);
  addActiveForDuplicates();
  switcher.setAttribute("fk-switcher-current", nextID);
  switcher.dispatchEvent(_fk["default"].hooks.action); //
  // Контроль классов .end и .active для дубликатов
  //

  function removeEndActiveForDuplicates() {
    _.each(document.querySelectorAll("[class*=\"fk-switcher-".concat(ID, "-duplicate\"].end")), function (duplicate) {
      duplicate.classList.remove("end");
    });

    _.each(document.querySelectorAll("[class*=\"fk-switcher-".concat(ID, "-duplicate\"].active")), function (duplicate) {
      duplicate.classList.remove("active");
      duplicate.dispatchEvent(_fk["default"].hooks.inactive);
    });
  }

  function addEndForDuplicates() {
    _.each(document.querySelectorAll(".fk-switcher-".concat(ID, "-duplicate-").concat(nextID)), function (duplicate) {
      duplicate.classList.add("end");
    });
  }

  function addActiveForDuplicates() {
    _.each(document.querySelectorAll(".fk-switcher-".concat(ID, "-duplicate-").concat(nextID)), function (duplicate) {
      duplicate.classList.add("active");
      duplicate.dispatchEvent(_fk["default"].hooks.active);
    });
  } //
  // Контроль класса .end для кнопок
  //


  function removeEndForButtons() {
    var nextButtons = switcher.querySelectorAll(".".concat(switcher.getAttribute("fk-switcher-next-class"))),
        prevButtons = switcher.querySelectorAll(".".concat(switcher.getAttribute("fk-switcher-prev-class")));

    _.each(nextButtons, function (button) {
      return button.classList.remove("end");
    });

    _.each(prevButtons, function (button) {
      return button.classList.remove("end");
    });
  }

  function addEndForButtons() {
    if (nextID.toString() === "1") {
      var buttons = switcher.querySelectorAll(".".concat(switcher.getAttribute("fk-switcher-prev-class")));

      _.each(buttons, function (button) {
        return button.classList.add("end");
      });
    } else if (nextID.toString() === switcherLength) {
      var _buttons = switcher.querySelectorAll(".".concat(switcher.getAttribute("fk-switcher-next-class")));

      _.each(_buttons, function (button) {
        return button.classList.add("end");
      });
    }
  }
};

exports["default"] = _default;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.whichNext = whichNext;

function whichNext(switcher, action) {
  var answer;
  var length = switcher.getAttribute("fk-switcher-length"),
      current = switcher.getAttribute("fk-switcher-current");

  if ("next" === action) {
    current === length || "0" === current ? answer = 1 : answer = ++current;
  } else if ("prev" === action) {
    current === "1" ? answer = length : answer = --current;
  } else {
    answer = action; // предполагаем, что передан номер следующего слайда
  }

  return answer;
}

/***/ }),
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var _fk = _interopRequireDefault(__webpack_require__(0));

var _underscore = _interopRequireDefault(__webpack_require__(1));

__webpack_require__(23);

__webpack_require__(24);

__webpack_require__(25);

__webpack_require__(26);

__webpack_require__(27);

__webpack_require__(28);

__webpack_require__(29);

__webpack_require__(30);

__webpack_require__(31);

__webpack_require__(32);

__webpack_require__(5);

__webpack_require__(9);

__webpack_require__(10);

__webpack_require__(33);

__webpack_require__(34);

__webpack_require__(11);

__webpack_require__(36);

__webpack_require__(12);

__webpack_require__(37);

__webpack_require__(38);

__webpack_require__(3);

__webpack_require__(39);

__webpack_require__(40);

__webpack_require__(44);

__webpack_require__(45);

__webpack_require__(46);

__webpack_require__(47);

__webpack_require__(48);

__webpack_require__(49);

__webpack_require__(50);

__webpack_require__(51);

__webpack_require__(52);

__webpack_require__(53);

__webpack_require__(54);

__webpack_require__(55);

__webpack_require__(56);

__webpack_require__(57);

__webpack_require__(59);

__webpack_require__(61);

__webpack_require__(63);

__webpack_require__(13);

__webpack_require__(6);

__webpack_require__(64);

__webpack_require__(65);

__webpack_require__(14);

__webpack_require__(66);

__webpack_require__(15);

__webpack_require__(69);

__webpack_require__(7);

__webpack_require__(70);

__webpack_require__(8);

__webpack_require__(71);

__webpack_require__(72);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//
// components
//
//
// functions
//
//
// modules
//
// import "./modules/fk-justify-height/index";
// import "./modules/fk-slider/index";
global._ = _underscore["default"];
global.fk = _fk["default"];

_fk["default"].init();
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
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


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fk = _interopRequireDefault(__webpack_require__(0));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _fk["default"].init = function () {
  window.addEventListener('DOMContentLoaded', _fk["default"].ready);
  window.addEventListener('load', _fk["default"].load);
  window.addEventListener('scroll', _fk["default"].scroll);
  window.addEventListener('resize', _fk["default"].resize);
  window.addEventListener('beforeunload', _fk["default"].unload);
};

exports["default"] = _default;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fk = _interopRequireDefault(__webpack_require__(0));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _fk["default"].hooks = {
  action: new CustomEvent("fk-action"),
  active: new CustomEvent("fk-active"),
  inactive: new CustomEvent("fk-inactive"),
  start: new CustomEvent("fk-start"),
  end: new CustomEvent("fk-end")
};

exports["default"] = _default;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fk = _interopRequireDefault(__webpack_require__(0));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _fk["default"].ready = function () {
  fkReadyCallback();

  _fk["default"].modal.init();

  _fk["default"].form.init();

  _fk["default"].svg.icon.filter.listener(); // fk.toTop.init();


  _fk["default"].viewer.init();

  _fk["default"].scroll();
};

exports["default"] = _default;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fk = _interopRequireDefault(__webpack_require__(0));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _fk["default"].load = function () {
  _fk["default"].log();

  _fk["default"].format.init();

  _fk["default"].scroll();
};

exports["default"] = _default;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fk = _interopRequireDefault(__webpack_require__(0));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _fk["default"].scroll = function () {
  _fk["default"].loadMap.init();

  _fk["default"].loadProgressive.init();

  _fk["default"].svg.icon();
};

exports["default"] = _default;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fk = _interopRequireDefault(__webpack_require__(0));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _fk["default"].resize = function () {
  _fk["default"].format.init(); // fk.toTop.init();

};

exports["default"] = _default;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fk = _interopRequireDefault(__webpack_require__(0));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _fk["default"].unload = function () {// func...
};

exports["default"] = _default;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fk = _interopRequireDefault(__webpack_require__(0));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _fk["default"].alert = {};

exports["default"] = _default;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fk = _interopRequireDefault(__webpack_require__(0));

var _underscore = _interopRequireDefault(__webpack_require__(1));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _default = _fk["default"].alert.state = function (text, state, time, icon, addClass, empty) {
  if (text !== empty && _typeof(text) !== "object") {
    if (!document.getElementById("fk-alert-state")) document.querySelector("body").insertAdjacentHTML("beforeend", "<div id='fk-alert-state' class='fk-alert-state'><p><i class='icon-success fk-icon-fz-mg mr-mr' fk-icon=\"fill/success\"></i><i class='icon-danger fk-icon-fz-mg mr-mr' fk-icon=\"fill/danger\"></i><i class='icon-loading fk-icon-fz-mg mr-mr' fk-icon=\"fill/load\"></i><i class='icon-info fk-icon-fz-mg mr-mr' fk-icon=\"fill/info\"></i><span class='fk-alert__content'></span></p></div>");
    var alert = document.getElementById("fk-alert-state");
    icon = icon === empty ? true : icon;

    _underscore["default"].each(alert.getElementsByClassName("active"), function (elem) {
      elem.classList.remove("active");
    });

    if (addClass !== empty) _underscore["default"].each(addClass.split(" "), function (cls) {
      return alert.classList.add(cls);
    });
    if (state !== empty && icon) alert.getElementsByClassName("icon-".concat(state))[0].classList.add("active");
    if (time) setTimeout(function () {
      return _fk["default"].alert.state(alert);
    }, time);
    alert.getElementsByClassName("fk-alert__content")[0].innerHTML = text;
    alert.classList.add("active");

    _fk["default"].svg.icon();
  } else if (_typeof(text) === "object") {
    text.setAttribute("class", "fk-alert-state");

    _underscore["default"].each(text.getElementsByClassName("active"), function (elem) {
      elem.classList.remove("active");
    });
  } else {
    _underscore["default"].each(document.getElementsByClassName("fk-alert-state"), function (alert) {
      alert.setAttribute("class", "fk-alert-state");

      _underscore["default"].each(alert.getElementsByClassName("active"), function (elem) {
        elem.classList.remove("active");
      });
    });
  }
};

exports["default"] = _default;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fk = _interopRequireDefault(__webpack_require__(0));

var _underscore = _interopRequireDefault(__webpack_require__(1));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _default = _fk["default"].alert.message = function (text, message, time, icon, addClass, empty) {
  if (text !== empty && _typeof(text) !== "object") {
    if (!document.getElementById("fk-alert-message")) document.querySelector("body").insertAdjacentHTML("beforeend", "<div id='fk-alert-message' class='fk-alert-message'><p><i class='icon-success fk-icon-fz-mg mr-mr' fk-icon=\"fill/success\"></i><i class='icon-danger fk-icon-fz-mg mr-mr' fk-icon=\"fill/danger\"></i><i class='icon-loading fk-icon-fz-mg mr-mr' fk-icon=\"fill/load\"></i><i class='icon-info fk-icon-fz-mg mr-mr' fk-icon=\"fill/info\"></i><span class='fk-alert__content'></span></p></div>");
    var alert = document.getElementById("fk-alert-message");
    icon = icon === empty ? true : icon;

    _underscore["default"].each(alert.getElementsByClassName("active"), function (elem) {
      elem.classList.remove("active");
    });

    if (addClass !== empty) _underscore["default"].each(addClass.split(" "), function (cls) {
      return alert.classList.add(cls);
    });
    if (message !== empty && icon) alert.getElementsByClassName("icon-".concat(message))[0].classList.add("active");
    if (time) setTimeout(function () {
      return _fk["default"].alert.message(alert);
    }, time);
    alert.getElementsByClassName("fk-alert__content")[0].innerHTML = text;
    alert.classList.add("active");

    _fk["default"].svg.icon();
  } else if (_typeof(text) === "object") {
    text.setAttribute("class", "fk-alert-message");

    _underscore["default"].each(text.getElementsByClassName("active"), function (elem) {
      elem.classList.remove("active");
    });
  } else {
    _underscore["default"].each(document.getElementsByClassName("fk-alert-message"), function (alert) {
      alert.setAttribute("class", "fk-alert-message");

      _underscore["default"].each(alert.getElementsByClassName("active"), function (elem) {
        elem.classList.remove("active");
      });
    });
  }
};

exports["default"] = _default;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fk = _interopRequireDefault(__webpack_require__(0));

__webpack_require__(5);

__webpack_require__(9);

__webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _fk["default"].form.init = function () {
  _fk["default"].form.answer();

  _fk["default"].form.data();
};

exports["default"] = _default;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fk = _interopRequireDefault(__webpack_require__(0));

__webpack_require__(35);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _fk["default"].modal.init = function () {
  _fk["default"].modal();

  _fk["default"].modal.listener();
};

exports["default"] = _default;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fk = _interopRequireDefault(__webpack_require__(0));

var _underscore = _interopRequireDefault(__webpack_require__(1));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _fk["default"].modal = function () {
  if (document.getElementsByClassName("fk-modal")[0]) {
    if (!document.getElementById("fk-modal")) document.querySelector("body").insertAdjacentHTML("beforeend", "<div id='fk-modal'><div id='fk-modal__wrap' data-modal-role='wrap'></div></div>");
    var wrap = document.getElementById("fk-modal__wrap"),
        modals = document.querySelectorAll(".fk-modal");

    _underscore["default"].each(modals, function (elem) {
      if (elem.dataset.modalListened === undefined) {
        elem.dataset.modalListened = "true";
        elem.setAttribute("id", "fk-modal-".concat(elem.dataset.modalTarget));
        if (elem.dataset["class"] === undefined) elem.dataset["class"] = "fk-mask fk-mask_dark fk-mask_md";
        if (!elem.classList.contains("fk-container") && !elem.classList.contains("fk-container-xs") && !elem.classList.contains("fk-container-sm") && !elem.classList.contains("fk-container-lg")) elem.classList.add("fk-container-sm");
        wrap.appendChild(elem);
      }
    }); // Закрытие окна при клике вне самого окно


    document.getElementById("fk-modal").addEventListener("click", function (e) {
      if (e.target.dataset.modalRole === "wrap") _fk["default"].modal.toggle();
    });
  }
};

exports["default"] = _default;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fk = _interopRequireDefault(__webpack_require__(0));

var _underscore = _interopRequireDefault(__webpack_require__(1));

__webpack_require__(11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _fk["default"].modal.listener = function () {
  _underscore["default"].each(document.getElementsByClassName("fk-modal-toggle"), function (elem) {
    if (undefined === elem.dataset.fkModalListenerListened) {
      elem.dataset.fkModalListenerListened = "true";
      elem.addEventListener("click", function () {
        _fk["default"].modal.toggle(elem.dataset.modalTarget);
      });
    }
  });
};

exports["default"] = _default;
window.addEventListener("keydown", function (e) {
  if (e.keyCode === 27) _fk["default"].modal.toggle();
});

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fk = _interopRequireDefault(__webpack_require__(0));

__webpack_require__(12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _fk["default"].toTop.init = function () {
  _fk["default"].toTop();
};

exports["default"] = _default;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fk = _interopRequireDefault(__webpack_require__(0));

var _underscore = _interopRequireDefault(__webpack_require__(1));

__webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _fk["default"].viewer.make = function (images, randomId, empty) {
  if (randomId === empty) randomId = _fk["default"].getRandom(10, 99999);
  var html = "",
      htmlFkViewer = "<div class='fk-viewer fk-viewer-".concat(randomId, "'>"),
      htmlCover = "<div class=\"fk-viewer__cover fk-center-xy\" data-viewer-target=\"".concat(randomId, "\">"),
      htmlThumb = "<div class='fk-viewer__thumbnail'><div class='thumb-wrap'>",
      htmlToggle = "<div class='fk-viewer__toggle fk-viewer-toggle fk-icon-light-lg fk-icon-sm' fk-icon='fill/close' data-viewer-target='".concat(randomId, "'></div>"),
      htmlArrowLeft = "<div class='fk-viewer__arrow-left fk-icon-light-lg fk-icon-sm' fk-icon='fill/arrow-left' data-key-code='37'></div>",
      htmlArrowRight = "<div class='fk-viewer__arrow-right fk-icon-light-lg fk-icon-sm' fk-icon='fill/arrow-right' data-key-code='39'></div>",
      htmlCloseDiv = "</div>";
  html = htmlFkViewer + htmlCover;

  _underscore["default"].each(images, function (img) {
    return html += "<img class='cover fk-load-progressive' data-src='".concat(img, "' alt=\"slide\"/>");
  });

  html += htmlCloseDiv + htmlThumb;

  _underscore["default"].each(images, function (img) {
    return html += "<div class='thumb fk-load-progressive' data-bg='".concat(img, "'></div>");
  });

  html += htmlCloseDiv + htmlCloseDiv;
  html += htmlToggle + htmlArrowLeft + htmlArrowRight + htmlCloseDiv;
  document.querySelector("body").insertAdjacentHTML("beforeend", html);

  _fk["default"].slider("fk-viewer", "thumb", "cover");

  _fk["default"].viewer.listener();
};

exports["default"] = _default;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fk = _interopRequireDefault(__webpack_require__(0));

var _underscore = _interopRequireDefault(__webpack_require__(1));

__webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _fk["default"].viewer.listener = function () {
  _underscore["default"].each(document.querySelectorAll(".fk-viewer-toggle"), function (elem) {
    if (elem.dataset.fkViewerListenerListened === undefined) {
      elem.dataset.fkViewerListenerListened = "true";
      elem.addEventListener("click", function () {
        _fk["default"].viewer.toggle(this);
      });
    }
  }); // Закрытие просмотрщика, при клике на подложку


  _underscore["default"].each(document.querySelectorAll(".fk-viewer__cover"), function (coverArea) {
    coverArea.addEventListener("click", function (e) {
      if (!e.target.classList.contains("cover")) _fk["default"].viewer.toggle();
    });
  }); // Переключение слайдов влево-вправо


  _underscore["default"].each(document.querySelectorAll("[class*='fk-viewer__arrow-']"), function (arrow) {
    if (undefined === arrow.dataset.fkViewerListenerListened) {
      arrow.dataset.fkViewerListenerListened = "true";
      arrow.addEventListener("click", function (e) {
        toggleLeftRight(+this.dataset.keyCode);
      });
    }
  });
}; // Переключение слайдов стрелочками


exports["default"] = _default;
document.addEventListener("keydown", function (e) {
  toggleLeftRight(e.keyCode);
}); //
// Функции
//

function toggleLeftRight(keyCode) {
  if (document.querySelector(".fk-viewer.active")) {
    var activeItem = +document.querySelector(".fk-viewer.active").dataset.activeItem,
        numberItems = +document.querySelector(".fk-viewer.active").dataset.numberItems,
        prev,
        next;
    prev = activeItem === 1 ? numberItems : activeItem - 1;
    next = activeItem === numberItems ? 1 : activeItem + 1;
    if (keyCode === 37) document.querySelector(".fk-viewer.active .thumb[data-item-number='".concat(prev, "']")).click();
    if (keyCode === 39) document.querySelector(".fk-viewer.active .thumb[data-item-number='".concat(next, "']")).click();
  }
}

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fk = _interopRequireDefault(__webpack_require__(0));

__webpack_require__(3);

var _slideToggle = _interopRequireDefault(__webpack_require__(41));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _fk["default"].viewer.toggle = function (toggler, empty) {
  if (toggler !== empty) {
    var slider = document.querySelector(".fk-viewer-".concat(toggler.dataset.viewerTarget)),
        slideNumber = toggler.dataset.slideTarget;
    slider.classList.toggle("active");
    if (slideNumber) (0, _slideToggle["default"])(slider.getAttribute("id"), slideNumber, "thumb", "cover");
  } else {
    _.each(document.querySelectorAll(".fk-viewer.active"), function (elem) {
      elem.classList.remove("active");
    });
  }
};

exports["default"] = _default;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = slideToggle;

var _fk = _interopRequireDefault(__webpack_require__(0));

var _setEnd = _interopRequireDefault(__webpack_require__(42));

var _sliderActiveItem = _interopRequireDefault(__webpack_require__(43));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Переключает слайд на полученный
function slideToggle(slider, number, classControls, classItems) {
  slider = document.getElementById(slider);
  var controls = slider.getElementsByClassName(classControls),
      items = slider.getElementsByClassName(classItems);
  setClass(controls);
  setClass(items, true);
  (0, _sliderActiveItem["default"])(slider, number);

  function setClass(e, onEnd) {
    _.each(e, function (elem, index) {
      if (elem.classList.contains("active")) {
        elem.classList.remove("active");
        elem.classList.remove("end");
        elem.dispatchEvent(_fk["default"].hooks.inactive);
      }

      if (elem.dataset.itemNumber === number.toString()) {
        elem.classList.add("active");
        elem.dispatchEvent(_fk["default"].hooks.active);
      }

      if (onEnd && e.length - 1 === index) (0, _setEnd["default"])(slider, controls, items);
    });
  }
}

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = setEnd;

function setEnd(slider, controls, items) {
  if (items[items.length - 1].classList.contains("active")) {
    items[items.length - 1].classList.add("end");
    controls[controls.length - 1].classList.add("end");
  }

  if (items[0].classList.contains("active")) {
    items[0].classList.add("end");
    controls[0].classList.add("end");
  }
}

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = sliderActiveItem;

// Записывает или возвращает активный слайд
function sliderActiveItem(slider, number, empty) {
  if (typeof slider === "string") slider = document.getElementById(slider);

  if (number === empty) {
    return slider.dataset.activeItem;
  } else {
    slider.dataset.activeItem = number;
  }
}

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fk = _interopRequireDefault(__webpack_require__(0));

__webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _fk["default"].viewer.init = function () {
  _fk["default"].viewer();
};

exports["default"] = _default;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _fk = _interopRequireDefault(__webpack_require__(0));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_fk["default"].get = function (url, success, error) {
  var request = new XMLHttpRequest();
  request.open('GET', url, true);

  request.onload = function () {
    request.status >= 200 && request.status < 400 ? success(request.responseText) : error(request.status);
  };

  request.onerror = function () {
    return error(request.status);
  };

  request.send();
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _fk = _interopRequireDefault(__webpack_require__(0));

var _underscore = _interopRequireDefault(__webpack_require__(1));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//
// Возвращает цвет, установленный в шаблоне по переменной
//
// # Например `fk.getColor("prim")`. Цвет берётся из свойства content у body.
var getColor = currentColors();
getColor();

_fk["default"].getColor = function (color) {
  return getColor(color);
};

function currentColors() {
  var colors = {};
  return function (color, empty) {
    if (color !== empty) {
      return colors[color];
    } else {
      var content = getComputedStyle(document.querySelector("body")).content.replace(/"/g, ""),
          sets = content.split(" || ");

      _underscore["default"].each(sets, function (c) {
        var currentColor = c.split(":");
        colors[currentColor[0]] = currentColor[1];
      });
    }
  };
}

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _fk = _interopRequireDefault(__webpack_require__(0));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//
// Возвращает расстояние до элемента.
//
// # Если передать dom-элемент или его id, то вернёт количество пикселов до него
_fk["default"].getOffset = function (elem, minMax, empty) {
  var offsetWindow = window.pageYOffset !== undefined ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

  if (elem === empty) {
    return offsetWindow;
  } else {
    if (typeof elem === "string") elem = document.getElementById(elem);
    var // offsetElem = elem.getBoundingClientRect().top + offsetWindow,
    distance = elem.getBoundingClientRect().top - document.documentElement.clientHeight; // (offsetElem - (offsetWindow + document.documentElement.clientHeight));

    if (minMax !== empty) {
      if (distance > minMax[0] && distance < minMax[1]) {
        return true;
      } else {
        return false;
      }
    } else {
      return distance;
    }
  }
};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _fk = _interopRequireDefault(__webpack_require__(0));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_fk["default"].getParam = function (param) {
  var params = window.location.search.replace('?', '').split('&').reduce(function (p, e) {
    var a = e.split('=');
    p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
    return p;
  }, {});
  return params[param];
};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _fk = _interopRequireDefault(__webpack_require__(0));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//
// Возвращает массив с позицией элемента в документе.
//
_fk["default"].getPosition = function (elem) {
  if ("string" === typeof elem) elem = document.getElementById(elem); // (1)

  var box = elem.getBoundingClientRect();
  var body = document.body;
  var docEl = document.documentElement; // (2)

  var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft; // (3)

  var clientTop = docEl.clientTop || body.clientTop || 0;
  var clientLeft = docEl.clientLeft || body.clientLeft || 0; // (4)

  var top = box.top + scrollTop - clientTop;
  var left = box.left + scrollLeft - clientLeft;
  return {
    top: top,
    left: left
  };
};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _fk = _interopRequireDefault(__webpack_require__(0));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_fk["default"].getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _fk = _interopRequireDefault(__webpack_require__(0));

var _underscore = _interopRequireDefault(__webpack_require__(1));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_fk["default"].getRemove = function (param) {
  var newState = "",
      params = window.location["href"].replace("".concat(window.location["origin"], "/"), "").split("?")[1],
      clearParams = _underscore["default"].reject(params.split("&"), function (p) {
    if (p.indexOf("".concat(param, "=")) + 1) return true;
  });

  _underscore["default"].each(clearParams, function (p) {
    newState = "".concat(newState).concat(p, "&");
  });

  history.replaceState(null, null, "?".concat(newState));
};

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _fk = _interopRequireDefault(__webpack_require__(0));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_fk["default"].getStyle = function (elem, property) {
  if (typeof elem === "string") elem = document.querySelector(".".concat(elem));
  var answer = "",
      styles = window.getComputedStyle(elem),
      value = styles.getPropertyValue(property);
  "0px" === value || "0" === value || "0%" === value ? answer = false : answer = value;
  return answer;
};

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fk = _interopRequireDefault(__webpack_require__(0));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _fk["default"].log = function (text, empty) {
  if (text === empty) text = "Forker JS was loaded!";
  console.log(text);
};

exports["default"] = _default;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fk = _interopRequireDefault(__webpack_require__(0));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _fk["default"].replaceNode = function (elem, newElem) {
  if (typeof elem === "string") elem = document.getElementById(elem);
  typeof newElem === "string" ? elem.insertAdjacentHTML("afterend", newElem) : elem.insertAdjacentElement("afterend", newElem);
  elem.remove();
};

exports["default"] = _default;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fk = _interopRequireDefault(__webpack_require__(0));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _fk["default"].toRgb = function (hex) {
  var m = hex.slice(1).match(/.{2}/g);
  m[0] = parseInt(m[0], 16);
  m[1] = parseInt(m[1], 16);
  m[2] = parseInt(m[2], 16);
  return "rgb(".concat(m[0], ",").concat(m[1], ",").concat(m[2], ")");
};

exports["default"] = _default;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fk = _interopRequireDefault(__webpack_require__(0));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _fk["default"].wrapNode = function (wrapStart, wrapEnd, elem) {
  if (typeof elem === "string") elem = document.getElementById(elem);
  var html = wrapStart + elem.outerHTML + wrapEnd;
  elem.insertAdjacentHTML("afterend", html);
  elem.remove();
};

exports["default"] = _default;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fk = _interopRequireDefault(__webpack_require__(0));

__webpack_require__(58);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _fk["default"].format.init = function () {
  _fk["default"].format();
};

exports["default"] = _default;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fk = _interopRequireDefault(__webpack_require__(0));

var _underscore = _interopRequireDefault(__webpack_require__(1));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//
//  Врезает по параметрам родительского окна изображение класса .fk-format
//
//  div.fk-format(data-bg-position="contain")
//    img(src="/img.jpg")
var _default = _fk["default"].format = function (elems, empty) {
  if (elems === empty) elems = "fk-format";
  var imgs = document.querySelectorAll(".".concat(elems, " > img"));

  _underscore["default"].each(imgs, function (img) {
    img.getAttribute("src") ? setSize(img.parentElement, img) : listenerLoadImg(img.parentElement, img);
  }); //
  // Функции
  //


  function setSize(elem, img) {
    var elemWidth = elem.clientWidth,
        elemHeight = elem.clientHeight,
        elemBgPosition = elem.dataset.bgPosition;
    var imgWidth = img.clientWidth,
        imgHeight = img.clientHeight;
    var tempWidth, tempHeight; // background-position: contain;

    if (elemBgPosition === "contain") {
      tempWidth = elemWidth;
      tempHeight = tempWidth > imgWidth ? imgHeight * (tempWidth / imgWidth) : imgHeight / (imgWidth / tempWidth);

      if (tempHeight > elemHeight) {
        var tH = tempHeight;
        tempHeight = elemHeight;
        tempWidth = tempWidth / (tH / tempHeight);
      }
    } // background-position: cover;
    else {
        tempWidth = elemWidth;
        tempHeight = tempWidth > imgWidth ? imgHeight * (tempWidth / imgWidth) : imgHeight / (imgWidth / tempWidth);

        if (tempHeight < elemHeight) {
          var _tH = tempHeight;
          tempHeight = elemHeight;
          tempWidth = tempWidth * (tempHeight / _tH);
        }
      }

    var left = (elemWidth - tempWidth) / 2,
        top = (elemHeight - tempHeight) / 2; // Проверка на правильность вычислений

    if (!Number.isNaN(tempHeight) && !Number.isNaN(tempWidth)) {
      img.setAttribute("width", tempWidth);
      img.setAttribute("height", tempHeight);
      img.style.top = top + "px";
      img.style.left = left + "px";
      img.dispatchEvent(_fk["default"].hooks.action);
    } else {
      setSize(elem, img);
    }
  } // Ожидает загрузки изображения, после чего запускает рассчёт размеров


  function listenerLoadImg(elem, img) {
    var tempElem = elem,
        tempImg = img;

    (function () {
      var interval = setInterval(function () {
        var imgSrc = tempImg.getAttribute("src");

        if (imgSrc !== null && imgSrc !== empty && imgSrc !== "") {
          setSize(tempElem, tempImg);
          clearInterval(interval);
        }
      }, 50);
    })();
  }
};

exports["default"] = _default;

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fk = _interopRequireDefault(__webpack_require__(0));

__webpack_require__(60);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _fk["default"].loadMap.init = function () {
  _fk["default"].loadMap();
};

exports["default"] = _default;

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fk = _interopRequireDefault(__webpack_require__(0));

var _underscore = _interopRequireDefault(__webpack_require__(1));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//
//  Ленивая подгрузка карты
//
//  # div.fk-load-map(data-map="<iframe>...</iframe>")
var _default = _fk["default"].loadMap = function (items, empty) {
  if (items === empty) items = "fk-load-map";
  items = document.querySelectorAll(".".concat(items));

  _underscore["default"].each(items, function (item) {
    if (item.dataset.fkLoadMapListened === undefined && _fk["default"].getOffset(item) < 50) {
      item.dataset.fkLoadMapListened = "true";
      item.dispatchEvent(_fk["default"].hooks.action);
      var newMap = item.dataset.map;

      _fk["default"].replaceNode(item, newMap); // console.log( `Insert: ${fk.getOffset(item)}` );

    }
  });
};

exports["default"] = _default;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fk = _interopRequireDefault(__webpack_require__(0));

__webpack_require__(62);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _fk["default"].loadProgressive.init = function () {
  _fk["default"].loadProgressive();
};

exports["default"] = _default;

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fk = _interopRequireDefault(__webpack_require__(0));

var _underscore = _interopRequireDefault(__webpack_require__(1));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//
//  Ленивая загрузка картинок и фонов
//
//  # div.fk-load-progressive(data-bg="/img.jpg")
//  # img.fk-load-progressive(data-src="/img.jpg")
var _default = _fk["default"].loadProgressive = function (items, empty) {
  if (items === empty) items = "fk-load-progressive";
  items = document.getElementsByClassName(items);

  _underscore["default"].each(items, function (item) {
    if (item.dataset.fkLoadProgressiveListened === undefined && _fk["default"].getOffset(item) < 5) {
      item.dataset.fkLoadProgressiveListened = "true";
      var dataSrc = item.dataset.src,
          dataBg = item.dataset.bg;
      dataSrc !== empty && dataSrc !== false && dataSrc !== "" ? item.setAttribute("src", pathFilter(item, dataSrc)) : item.style.backgroundImage = "url('".concat(pathFilter(item, dataBg), "')");
      item.dispatchEvent(_fk["default"].hooks.action);
    }
  });
};

exports["default"] = _default;

function pathFilter(item, url) {
  if (isWebP() && (!item.dataset.webp || item.dataset.webp !== "false")) {
    url = url.split(".");
    url.splice(-1, 1);
    url = url.join(".");
    return "".concat(url, ".webp");
  } else {
    return url;
  }
}

function isWebP() {
  if (!localStorage.getItem("fk-is-webp")) {
    var webP = new Image();
    webP.src = 'data:image/webp;base64,UklGRi4AAABXRUJQVlA4TCEAAAAvAUAAEB8wAiMwAgSSNtse/cXjxyCCmrYNWPwmHRH9jwMA';

    webP.onload = webP.onerror = function () {
      if (webP.height === 2) {
        localStorage.setItem("fk-is-webp", "supported");
        return true;
      } else {
        localStorage.setItem("fk-is-webp", "no-supported");
        return false;
      }
    };
  } else {
    var answer;
    return answer = localStorage.getItem("fk-is-webp") === "supported" ? true : false;
  }
}

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fk = _interopRequireDefault(__webpack_require__(0));

var _underscore = _interopRequireDefault(__webpack_require__(1));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//
// Крепит переданные элементы к верху/низу страницы, когда к нему доскроллили
//
// # fk.sticky( "fk-btn", "top", 30, false, "fk-btn-box" )
// (последний аргумент это id, внутри которого отслеживаем прокрутку)
var _default = _fk["default"].sticky = function (elems, position, offset, stretch, space, empty) {
  elems = document.getElementsByClassName(elems);
  position = position || "top";
  offset = offset || 0;
  stretch = stretch === empty ? true : stretch;
  space = space !== empty ? document.getElementById(space) : window;

  _underscore["default"].each(elems, function (elem) {
    if (elem.dataset.fkStickyListened === undefined) {
      elem.dataset.fkStickyListened = "true";
      elemListener(elem, position, offset, stretch, space);
    }
  }); // Отслеживает элемент


  function elemListener(elem, position, offset, stretch, space) {
    var replacer = createReplacer(elem),
        replacerHeight = "".concat(elem.clientHeight, "px"); // Если крепим сверху

    if (position === "top") {
      space.addEventListener('scroll', function () {
        if (replacer.getBoundingClientRect().top <= offset) {
          elem.style.position = "fixed";
          elem.style.top = "".concat(offset, "px");
          replacer.style.height = replacerHeight;
          elem.dispatchEvent(_fk["default"].hooks.active);

          if (stretch) {
            elem.style.left = "0";
            elem.style.right = "0";
          }
        } else {
          elem.style.position = "relative";
          elem.style.top = "auto";
          replacer.style.height = "0";
          elem.dispatchEvent(_fk["default"].hooks.inactive);

          if (stretch) {
            elem.style.left = "auto";
            elem.style.right = "auto";
          }
        }
      });
    } // Если крепим снизу
    else if (position === "bottom") {
        var topOffset = document.documentElement.clientHeight - elem.clientHeight - offset;
        space.addEventListener('scroll', function () {
          if (replacer.getBoundingClientRect().top <= topOffset) {
            elem.style.position = "fixed";
            elem.style.bottom = "".concat(offset, "px");
            replacer.style.height = replacerHeight;
            elem.dispatchEvent(_fk["default"].hooks.active);

            if (stretch) {
              elem.style.left = "0";
              elem.style.right = "0";
            }
          } else {
            elem.style.position = "relative";
            elem.style.bottom = "auto";
            replacer.style.height = "0";
            elem.dispatchEvent(_fk["default"].hooks.inactive);

            if (stretch) {
              elem.style.left = "auto";
              elem.style.right = "auto";
            }
          }
        });
      }
  } // Создаёт заглушку перед элементом


  function createReplacer(elem) {
    var replacer = document.createElement('div');
    replacer.style.height = "0";
    elem.parentElement.insertBefore(replacer, elem);
    return replacer;
  }
};

exports["default"] = _default;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fk = _interopRequireDefault(__webpack_require__(0));

__webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _fk["default"].svg.icon.hover = function (icon) {
  if (typeof icon === "string") icon = document.getElementById(icon);

  if (icon.dataset.fkSvgIconFilterHoverListened === undefined) {
    icon.dataset.fkSvgIconFilterHoverListened = "true";
    icon.addEventListener("mouseenter", function (e) {
      if (this.dataset.iconFilterHover !== undefined) {
        var filterHover = this.dataset.iconFilterHover,
            svgWithFilter = this.querySelector("[data-icon-filter-hover='".concat(filterHover, "']"));
        this.querySelector("svg").style.opacity = "0";

        if (svgWithFilter !== null) {
          svgWithFilter.style.opacity = "1";
        } else {
          this.insertAdjacentElement("beforeend", this.querySelector("svg").cloneNode(true));
          var newSvg = this.lastElementChild;
          newSvg.innerHTML = _fk["default"].svg.icon.filter(this, filterHover, true);
          newSvg.style.opacity = "1";
          newSvg.dataset.iconFilterHover = filterHover;
        }
      }
    });
    icon.addEventListener("mouseleave", function (e) {
      if (this.dataset.iconFilterHover !== undefined) {
        var filterHover = this.dataset.iconFilterHover,
            svgWithFilter = this.querySelector("[data-icon-filter-hover='".concat(filterHover, "']"));
        this.querySelector("svg").style.opacity = "1";
        svgWithFilter.style.opacity = "0";
      }
    });
  }
};

exports["default"] = _default;

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fk = _interopRequireDefault(__webpack_require__(0));

var _underscore = _interopRequireDefault(__webpack_require__(1));

__webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _fk["default"].svg.icon.remove = function () {
  var items = localStorage.getItem("fk-icon-items").split(",");

  _underscore["default"].each(items, function (item) {
    localStorage.removeItem(item);
  });

  localStorage.removeItem("fk-icon-items");
};

exports["default"] = _default;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fk = _interopRequireDefault(__webpack_require__(0));

var _underscore = _interopRequireDefault(__webpack_require__(1));

__webpack_require__(14);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _fk["default"].svg.icon.filter.listener = function () {
  _underscore["default"].each(document.querySelectorAll("*[data-icon-filter]"), function (elem) {
    if (elem.dataset.fkSvgIconFilterListened === undefined) {
      elem.dataset.fkSvgIconFilterListened = "true";
      elem.addEventListener("fk-action", function () {
        _fk["default"].svg.icon.filter(this, this.dataset.iconFilter);
      });
    }
  });
};

exports["default"] = _default;

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initListeners = initListeners;

var _fk = _interopRequireDefault(__webpack_require__(0));

var _underscore = _interopRequireDefault(__webpack_require__(1));

var _sorting = __webpack_require__(68);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function initListeners(switcher, slides, duplicates, next, prev, type) {
  var ID = switcher.getAttribute("fk-switcher-id");
  listenerForButtons(next, type, ID, switcher, "next");
  listenerForButtons(prev, type, ID, switcher, "prev"); // Если дубликатов больше, чем слайдов, то разбиваем их на группы

  if (duplicates.length && slides.length !== duplicates.length) {
    var parents = [duplicates[0].parentElement];

    _underscore["default"].each(duplicates, function (duplicate, index) {
      var duplicateParent = duplicate.parentElement;

      _underscore["default"].each(parents, function (elem) {
        if (duplicateParent !== elem) parents.push(duplicate.parentElement);
      }); // Продолжаем, когда массив родителей собран


      if (index === duplicates.length - 1) {
        _underscore["default"].each(parents, function (parent) {
          var dupls = parent.querySelectorAll(".".concat(switcher.getAttribute("fk-switcher-duplicates-class")));
          listenerForDuplicates(dupls, type, ID, switcher);
        });
      }
    }); // Если нет, то отправляем, что приняли

  } else {
    listenerForDuplicates(duplicates, type, ID, switcher);
  } // Интервал, если он есть


  if (switcher.getAttribute("fk-switcher-interval")) {
    switcher.setAttribute("fk-switcher-interval-click", "0");
    switcher.addEventListener("fk-action", function () {
      setTimeout(function () {
        var intervalClick = switcher.getAttribute("fk-switcher-interval-click"); // Деактивирует лишние срабатывания интервала, которые сделал пользователь, переключая слайдер кнопками

        if ("0" === intervalClick) {
          (0, _sorting.sorting)(type, ID, switcher, "next");
        } else {
          intervalClick--;
          0 >= intervalClick ? switcher.setAttribute("fk-switcher-interval-click", "0") : switcher.setAttribute("fk-switcher-interval-click", intervalClick);
        }
      }, switcher.getAttribute("fk-switcher-interval"));
    });
  } // Init


  (0, _sorting.sorting)(type, ID, switcher, "next");
} // Слушатель для кнопок


function listenerForButtons(buttons, type, ID, switcher, action) {
  _underscore["default"].each(buttons, function (button) {
    if (undefined === button.dataset.listenerForButtonsListened) {
      button.dataset.listenerForButtonsListened = "true";
      button.addEventListener("click", function () {
        (0, _sorting.sorting)(type, ID, switcher, action);
        plusIntervalClick(switcher);
      });
    }
  });
} // Слушатель для дубликатов


function listenerForDuplicates(duplicates, type, ID, switcher) {
  _underscore["default"].each(duplicates, function (duplicate, index) {
    if (undefined === duplicate.dataset.listenerForDuplicatesListened) {
      duplicate.dataset.listenerForDuplicatesListened = "true";
      var forSlide = ++index;
      duplicate.classList.add("fk-switcher-".concat(ID, "-duplicate-").concat(forSlide));
      duplicate.addEventListener("click", function () {
        (0, _sorting.sorting)(type, ID, switcher, forSlide);
        plusIntervalClick(switcher);
      });
    }
  });
} //
// functions
//


function plusIntervalClick(switcher) {
  var intervalClick = switcher.getAttribute("fk-switcher-interval-click");
  switcher.setAttribute("fk-switcher-interval-click", ++intervalClick);
}

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sorting = sorting;

var _fk = _interopRequireDefault(__webpack_require__(0));

__webpack_require__(15);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function sorting(type, ID, switcher, action) {
  if ("swipe" === type) {
    _fk["default"].switcher.swipe(ID, switcher, action);
  } else if ("anyway" === type) {
    _fk["default"].switcher.anyway(ID, switcher, action);
  } else {
    _fk["default"].switcher.anyway(ID, switcher, action);
  }
}

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fk = _interopRequireDefault(__webpack_require__(0));

__webpack_require__(7);

var _whichNext = __webpack_require__(16);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _fk["default"].switcher.swipe = function (ID, switcher, action) {
  var currentID = switcher.getAttribute("fk-switcher-current"),
      nextID = (0, _whichNext.whichNext)(switcher, action);

  if ("0" === currentID) {
    slidesWrap(ID, switcher);
  }

  toggleSlide(switcher, nextID, switcher.dataset.fkSwitcherSwipeStep);
};

exports["default"] = _default;

function toggleSlide(switcher, nextID, step) {
  var wrapper = document.getElementById("fk-switcher-".concat(switcher.getAttribute("fk-switcher-id"), "-wrapper"));

  if (!switcher.getAttribute("fk-switcher-extreme-id")) {
    var containerWidth = wrapper.parentElement.getBoundingClientRect().width,
        screenCapacity = Math.floor(containerWidth / step),
        switcherLength = Number(switcher.getAttribute("fk-switcher-length")),
        extremeID = 0 > switcherLength - screenCapacity ? 1 : switcherLength - screenCapacity + 1;
    switcher.setAttribute("fk-switcher-extreme-id", extremeID);
  }

  if (nextID > switcher.getAttribute("fk-switcher-extreme-id")) nextID = 1;
  var point = step * nextID - step;
  setTranslate(wrapper, "translateX", "-".concat(point, "px"));
  setActiveClasses(switcher, wrapper, nextID);
  switcher.setAttribute("fk-switcher-current", nextID);
  switcher.dispatchEvent(_fk["default"].hooks.action);

  function setActiveClasses(switcher, wrapper, nextID) {
    var screenCapacity = Math.floor(wrapper.parentElement.getBoundingClientRect().width / step),
        switcherLength = Number(switcher.getAttribute("fk-switcher-length")),
        screenActive = Math.ceil(nextID / screenCapacity),
        buttonsNext = switcher.querySelectorAll(".".concat(switcher.getAttribute("fk-switcher-next-class"))),
        buttonsPrev = switcher.querySelectorAll(".".concat(switcher.getAttribute("fk-switcher-prev-class")));
    switcher.dataset.screensNumber = Math.round(switcherLength / screenCapacity);
    switcher.dataset.screenActive = screenActive;

    if (nextID === 1) {
      action(buttonsPrev, "add");
      action(buttonsNext, "remove");
    } else if (nextID === switcherLength) {
      action(buttonsNext, "add");
      action(buttonsPrev, "remove");
    } else {
      action(buttonsPrev, "remove");
      action(buttonsNext, "remove");
    }

    function action(buttons, action) {
      if ("add" === action) {
        _.each(buttons, function (button) {
          button.classList.add("end");
          button.dispatchEvent(_fk["default"].hooks.active);
        });
      } else if ("remove" === action) {
        _.each(buttons, function (button) {
          button.classList.remove("end");
          button.dispatchEvent(_fk["default"].hooks.inactive);
        });
      }
    }
  }
}

function slidesWrap(ID, switcher) {
  var slides = document.querySelectorAll("[id*=fk-switcher-".concat(ID, "-slide]")),
      wrapper = document.createElement('div'),
      parent = slides[0].parentElement,
      contentWidth = 0;

  if (switcher.getAttribute("fk-switcher-col-lg")) {
    setColumn(parent, slides, switcher.getAttribute("fk-switcher-col-lg"), switcher.getAttribute("fk-switcher-col-sm"));
  }

  var indent = getIndent(slides[0]);
  wrapper.setAttribute("id", "fk-switcher-".concat(ID, "-wrapper"));

  _.each(slides, function (slide, index) {
    contentWidth += slide.getBoundingClientRect().width;
    slide.remove();
    wrapper.insertAdjacentElement("beforeend", slide);

    if (index === slides.length - 1) {
      parent.insertAdjacentElement("beforeend", wrapper);
      addCSS(wrapper, contentWidth + indent * index);
      initMark(switcher, slide.getBoundingClientRect().width, indent);
      swiper(switcher, wrapper);
    }
  });

  function setColumn(viewPort, slides, colLg, colSm) {
    var calcResult = false;

    if (768 < window.innerWidth && colLg) {
      calcResult = calcWidth(viewPort, colLg);
    } else if (768 > window.innerWidth && colSm) {
      calcResult = calcWidth(viewPort, colSm);
    }

    if (calcResult) {
      _.each(slides, function (slide, index) {
        slide.style.width = "".concat(calcResult.width, "px");
        if (index !== slides.length - 1) slide.style.marginRight = "".concat(calcResult.mr, "px");
      });
    }

    function calcWidth(parentWrapper, col) {
      var answer = {};
      answer.width = parentWrapper.getBoundingClientRect().width / col - 20;
      answer.mr = 20;
      return answer;
    }
  }

  function getIndent(slide) {
    var answer = "",
        mr = _fk["default"].getStyle(slide, "margin-right"),
        pr = _fk["default"].getStyle(slide, "padding-right");

    if (mr) {
      answer = mr.split("px")[0];
    } else if (pr) {
      answer = pr.split("px")[0];
    } else {
      answer = 0;
    }

    return answer;
  }
}

function initMark(switcher, contentWidth, indent) {
  switcher.dataset.fkSwitcherSwipeStep = Number(contentWidth) + Number(indent);
}

function addCSS(wrapper, contentWidth) {
  wrapper.classList.add("fk-switcher__wrapper");
  wrapper.style.width = "".concat(contentWidth, "px");
  wrapper.style.top = "0px";
  wrapper.style.left = "0px";
  setTranslate(wrapper, "translateX", "0px");
  wrapper.parentElement.style.overflow = "hidden";

  _.each(wrapper.children, function (item) {
    item.style.display = "inline-block";
    item.style.userSelect = "none";
    item.style.WebkitUserSelect = "none";
    item.style.OUserSelect = "none";
    item.style.MozUserSelect = "none";
    item.style.MsUserSelect = "none";
    item.style.WebkitTouchCallout = "none";
  });
} //
// Перемотка по свайпу
//


function swiper(switcher, wrapper) {
  switcher.onmousedown = function () {
    var transition = _fk["default"].getStyle(wrapper, "transition");

    wrapper.style.transition = "0.1s";
    wrapper.parentElement.style.cursor = "move";
    wrapper.parentElement.cursorStart = window.cursorX;
    wrapper.parentElement.wrapperStart = calcWrapperStartPosition(wrapper);

    function interval() {
      var cursorStart = wrapper.parentElement.cursorStart,
          cursorCurr = event.clientX,
          different = cursorCurr - cursorStart;
      setPosition(wrapper, different, wrapper.parentElement.wrapperStart);
    }

    document.addEventListener('mousemove', interval);
    document.addEventListener('touchmove', interval); // Завершаем

    document.onmouseup = function () {
      toggleNext(switcher, wrapper);
      wrapper.style.transition = transition;
      wrapper.parentElement.style.cursor = "default";
      removeInterval();
      document.onmouseup = null;
    };

    switcher.addEventListener("click", removeInterval);

    function removeInterval() {
      document.removeEventListener('mousemove', interval);
      document.removeEventListener('touchmove', interval);
    }
  };

  function setPosition(wrapper, different, wrapperStart) {
    var newPosition = wrapperStart + different;
    setTranslate(wrapper, "translateX", "".concat(newPosition, "px"));
    switcher.setAttribute("fk-switcher-interval-click", switcher.getAttribute("fk-switcher-interval-click"));
  }

  function calcWrapperStartPosition(wrapper) {
    var position = getTranslate(wrapper) || "0px";
    return Number(position.split("px")[0]);
  }
}

function setTranslate(elem, property, value) {
  elem.style.MozTransform = "translateX(".concat(value, ")");
  elem.style.WebkitTransform = "translateX(".concat(value, ")");
  elem.style.OTransform = "translateX(".concat(value, ")");
  elem.style.MsTransform = "translateX(".concat(value, ")");
  elem.style.transform = "translateX(".concat(value, ")");
  elem.dataset.styleTranslate = "".concat(value);
}

function getTranslate(elem) {
  var textValue = elem.dataset.styleTranslate;

  if (textValue) {
    return textValue;
  } else {
    return false;
  }
}

function toggleNext(switcher, wrapper) {
  var next = 1,
      step = switcher.dataset.fkSwitcherSwipeStep,
      length = switcher.getAttribute("fk-switcher-length"),
      wrapperWidth = wrapper.offsetWidth;
  var textPosition = getTranslate(wrapper) || "0px",
      position = Number(textPosition.split("px")[0]);

  if (0 < position) {
    next = 1;
  } else if (0 < wrapperWidth + position) {
    next = length - Math.round((wrapperWidth + position) / step) + 1;
  } else {
    next = length;
  }

  toggleSlide(switcher, next, step);
  plusIntervalClick(switcher);
}

function plusIntervalClick(switcher) {
  var intervalClick = switcher.getAttribute("fk-switcher-interval-click");
  switcher.setAttribute("fk-switcher-interval-click", ++intervalClick);
}

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fk = _interopRequireDefault(__webpack_require__(0));

__webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _fk["default"].switcher.init = function () {
  _fk["default"].switcher({
    "type": "anyway",
    // swipe / anyway
    "switchers": "fk-switcher",
    "slides": "fk-switcher__slide",
    "duplicates": "fk-switcher__duplicate",
    "next": "fk-switcher__next",
    "prev": "fk-switcher__prev"
  });
};

exports["default"] = _default;

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fk = _interopRequireDefault(__webpack_require__(0));

var _underscore = _interopRequireDefault(__webpack_require__(1));

__webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _fk["default"].navs.close = function (navs) {
  if ("string" === typeof navs) navs = document.querySelectorAll(navs);

  if (navs && navs.classList) {
    navs.classList.remove("active");
    navs.dispatchEvent(_fk["default"].hooks.action);
    navs.dispatchEvent(_fk["default"].hooks.inactive);
  } else {
    _underscore["default"].each(navs, function (nav) {
      nav.classList.remove("active");
      nav.dispatchEvent(_fk["default"].hooks.action);
      nav.dispatchEvent(_fk["default"].hooks.inactive);
    });
  }
};

exports["default"] = _default;

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fk = _interopRequireDefault(__webpack_require__(0));

__webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _fk["default"].navs.init = function () {
  _fk["default"].navs({
    "navs": "fk-navs"
  });
};

exports["default"] = _default;

/***/ })
/******/ ]);