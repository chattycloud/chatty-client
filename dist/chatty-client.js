/*!
 * ChattyClient v1.2.0
 * Build at 2023.3.20
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.io = {}));
})(this, (function (exports) { 'use strict';

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  function _regeneratorRuntime() {
    _regeneratorRuntime = function () {
      return exports;
    };
    var exports = {},
      Op = Object.prototype,
      hasOwn = Op.hasOwnProperty,
      defineProperty = Object.defineProperty || function (obj, key, desc) {
        obj[key] = desc.value;
      },
      $Symbol = "function" == typeof Symbol ? Symbol : {},
      iteratorSymbol = $Symbol.iterator || "@@iterator",
      asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
      toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    function define(obj, key, value) {
      return Object.defineProperty(obj, key, {
        value: value,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }), obj[key];
    }
    try {
      define({}, "");
    } catch (err) {
      define = function (obj, key, value) {
        return obj[key] = value;
      };
    }
    function wrap(innerFn, outerFn, self, tryLocsList) {
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
        generator = Object.create(protoGenerator.prototype),
        context = new Context(tryLocsList || []);
      return defineProperty(generator, "_invoke", {
        value: makeInvokeMethod(innerFn, self, context)
      }), generator;
    }
    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }
    exports.wrap = wrap;
    var ContinueSentinel = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function () {
      return this;
    });
    var getProto = Object.getPrototypeOf,
      NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        define(prototype, method, function (arg) {
          return this._invoke(method, arg);
        });
      });
    }
    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);
        if ("throw" !== record.type) {
          var result = record.arg,
            value = result.value;
          return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          }) : PromiseImpl.resolve(value).then(function (unwrapped) {
            result.value = unwrapped, resolve(result);
          }, function (error) {
            return invoke("throw", error, resolve, reject);
          });
        }
        reject(record.arg);
      }
      var previousPromise;
      defineProperty(this, "_invoke", {
        value: function (method, arg) {
          function callInvokeWithMethodAndArg() {
            return new PromiseImpl(function (resolve, reject) {
              invoke(method, arg, resolve, reject);
            });
          }
          return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
        }
      });
    }
    function makeInvokeMethod(innerFn, self, context) {
      var state = "suspendedStart";
      return function (method, arg) {
        if ("executing" === state) throw new Error("Generator is already running");
        if ("completed" === state) {
          if ("throw" === method) throw arg;
          return doneResult();
        }
        for (context.method = method, context.arg = arg;;) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }
          if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
            if ("suspendedStart" === state) throw state = "completed", context.arg;
            context.dispatchException(context.arg);
          } else "return" === context.method && context.abrupt("return", context.arg);
          state = "executing";
          var record = tryCatch(innerFn, self, context);
          if ("normal" === record.type) {
            if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
            return {
              value: record.arg,
              done: context.done
            };
          }
          "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
        }
      };
    }
    function maybeInvokeDelegate(delegate, context) {
      var methodName = context.method,
        method = delegate.iterator[methodName];
      if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
      var record = tryCatch(method, delegate.iterator, context.arg);
      if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
      var info = record.arg;
      return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
    }
    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };
      1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
    }
    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal", delete record.arg, entry.completion = record;
    }
    function Context(tryLocsList) {
      this.tryEntries = [{
        tryLoc: "root"
      }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
    }
    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) return iteratorMethod.call(iterable);
        if ("function" == typeof iterable.next) return iterable;
        if (!isNaN(iterable.length)) {
          var i = -1,
            next = function next() {
              for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
              return next.value = undefined, next.done = !0, next;
            };
          return next.next = next;
        }
      }
      return {
        next: doneResult
      };
    }
    function doneResult() {
      return {
        value: undefined,
        done: !0
      };
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
      value: GeneratorFunctionPrototype,
      configurable: !0
    }), defineProperty(GeneratorFunctionPrototype, "constructor", {
      value: GeneratorFunction,
      configurable: !0
    }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
      var ctor = "function" == typeof genFun && genFun.constructor;
      return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
    }, exports.mark = function (genFun) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
    }, exports.awrap = function (arg) {
      return {
        __await: arg
      };
    }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
      return this;
    }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      void 0 === PromiseImpl && (PromiseImpl = Promise);
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
      return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
      return this;
    }), define(Gp, "toString", function () {
      return "[object Generator]";
    }), exports.keys = function (val) {
      var object = Object(val),
        keys = [];
      for (var key in object) keys.push(key);
      return keys.reverse(), function next() {
        for (; keys.length;) {
          var key = keys.pop();
          if (key in object) return next.value = key, next.done = !1, next;
        }
        return next.done = !0, next;
      };
    }, exports.values = values, Context.prototype = {
      constructor: Context,
      reset: function (skipTempReset) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
      },
      stop: function () {
        this.done = !0;
        var rootRecord = this.tryEntries[0].completion;
        if ("throw" === rootRecord.type) throw rootRecord.arg;
        return this.rval;
      },
      dispatchException: function (exception) {
        if (this.done) throw exception;
        var context = this;
        function handle(loc, caught) {
          return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
        }
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i],
            record = entry.completion;
          if ("root" === entry.tryLoc) return handle("end");
          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc"),
              hasFinally = hasOwn.call(entry, "finallyLoc");
            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            } else {
              if (!hasFinally) throw new Error("try statement without catch or finally");
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
            }
          }
        }
      },
      abrupt: function (type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }
        finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
        var record = finallyEntry ? finallyEntry.completion : {};
        return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
      },
      complete: function (record, afterLoc) {
        if ("throw" === record.type) throw record.arg;
        return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
      },
      finish: function (finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
        }
      },
      catch: function (tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if ("throw" === record.type) {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function (iterable, resultName, nextLoc) {
        return this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
      }
    }, exports;
  }
  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }
    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }
  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
        args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);
        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }
        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }
        _next(undefined);
      });
    };
  }
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
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
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
    _extends = Object.assign ? Object.assign.bind() : function (target) {
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
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }
  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
  }
  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }
  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct.bind();
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }
    return _construct.apply(null, arguments);
  }
  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }
  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;
    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;
      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }
      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);
        _cache.set(Class, Wrapper);
      }
      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }
      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };
    return _wrapNativeSuper(Class);
  }
  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }
  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }
    return _assertThisInitialized(self);
  }
  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
        result;
      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn(this, result);
    };
  }
  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }
    return object;
  }
  function _get() {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get.bind();
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);
        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);
        if (desc.get) {
          return desc.get.call(arguments.length < 3 ? target : receiver);
        }
        return desc.value;
      };
    }
    return _get.apply(this, arguments);
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;
        var F = function () {};
        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true,
      didErr = false,
      err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }

  /**
   *
    ___          _       _____
   | _ ) __ _ __(_)__ __|_   _|  _ _ __  ___ ___
   | _ \/ _` (_-< / _|___|| || || | '_ \/ -_|_-<
   |___/\__,_/__/_\__|    |_| \_, | .__/\___/__/
                              |__/|_|

   */
  var eAppState;
  (function (eAppState) {
    eAppState["ACTIVE"] = "ACTIVE";
    eAppState["DEACTIVE"] = "DEACTIVE";
  })(eAppState || (eAppState = {}));
  var eAppPricing;
  (function (eAppPricing) {
    eAppPricing["FREE"] = "FREE";
    eAppPricing["PRODUCTION"] = "PRODUCTION";
    eAppPricing["ADVANCED"] = "ADVANCED";
    eAppPricing["ENTERPRISE"] = "ENTERPRISE";
  })(eAppPricing || (eAppPricing = {}));
  var eSubscriptionPlan;
  (function (eSubscriptionPlan) {
    eSubscriptionPlan["PRODUCTION"] = "PRODUCTION";
    eSubscriptionPlan["ADVANCED"] = "ADVANCED";
    eSubscriptionPlan["ENTERPRISE"] = "ENTERPRISE";
  })(eSubscriptionPlan || (eSubscriptionPlan = {}));
  var eAppUserRole;
  (function (eAppUserRole) {
    eAppUserRole["OWNER"] = "OWNER";
    eAppUserRole["DEVELOPER"] = "DEVELOPER";
    eAppUserRole["MANAGER"] = "MANAGER";
  })(eAppUserRole || (eAppUserRole = {}));
  var eMemberPermission;
  (function (eMemberPermission) {
    eMemberPermission["SUPER"] = "SUPER";
    eMemberPermission["WRITE"] = "WRITE";
    eMemberPermission["READ"] = "READ";
  })(eMemberPermission || (eMemberPermission = {}));
  var eMessageType;
  (function (eMessageType) {
    eMessageType["TEXT"] = "TEXT";
    eMessageType["FILE"] = "FILE";
    eMessageType["JSON"] = "JSON";
  })(eMessageType || (eMessageType = {}));
  var eMessageBy;
  (function (eMessageBy) {
    eMessageBy["USER"] = "USER";
    eMessageBy["ADMIN"] = "ADMIN";
    eMessageBy["SYSTEM"] = "SYSTEM";
  })(eMessageBy || (eMessageBy = {}));
  var SupportedImageFormat = ["image/png", "image/jpg", "image/jpeg", "image/gif", "image/webp"];
  var SupportedVideoFormat = ["video/mp4", "video/webm"];
  var SupportedUploadSize = 20000000;
  var eChattyNotification;
  (function (eChattyNotification) {
    eChattyNotification["CHATTY_USER_MESSAGE"] = "CHATTY_USER_MESSAGE";
    eChattyNotification["CHATTY_ADMIN_MESSAGE"] = "CHATTY_ADMIN_MESSAGE";
    eChattyNotification["CHATTY_SYSTEM_MESSAGE"] = "CHATTY_SYSTEM_MESSAGE";
  })(eChattyNotification || (eChattyNotification = {}));
  /**
   *
    ___             _      _____
    | __|_ _____ _ _| |_ __|_   _|  _ _ __  ___ ___
    | _|\ V / -_) ' \  _|___|| || || | '_ \/ -_|_-<
    |___|\_/\___|_||_\__|    |_| \_, | .__/\___/__/
                                |__/|_|

    */
  var eChattyEvent;
  (function (eChattyEvent) {
    eChattyEvent["CONNECT"] = "connection";
    eChattyEvent["CONNECT_DONE"] = "connect_done";
    eChattyEvent["CONNECT_FAIL"] = "connect_fail";
    eChattyEvent["DISCONNECT"] = "disconnect";
    eChattyEvent["DISCONNECT_DONE"] = "disconnect_done";
    eChattyEvent["DISCONNECT_FAIL"] = "disconnect_fail";
    eChattyEvent["REFRESH_CHAT"] = "refresh_chat";
    eChattyEvent["REFRESH_CHAT_DONE"] = "refresh_chat_done";
    eChattyEvent["REFRESH_CHAT_FAIL"] = "refresh_chat_fail";
    eChattyEvent["RECEIVE_MESSAGE"] = "receive_message";
    eChattyEvent["FETCH_MESSAGES"] = "fetch_messages";
    eChattyEvent["FETCH_MESSAGES_DONE"] = "fetch_messages_done";
    eChattyEvent["FETCH_MESSAGES_FAIL"] = "fetch_messages_fail";
    eChattyEvent["UPDATE_MESSAGES"] = "update_message";
    eChattyEvent["FETCH_CHATS"] = "fetch_chats";
    eChattyEvent["FETCH_CHATS_DONE"] = "fetch_chats_done";
    eChattyEvent["FETCH_CHATS_FAIL"] = "fetch_chats_fail";
    eChattyEvent["SEND_MESSAGE"] = "send_message";
    eChattyEvent["SEND_MESSAGE_DONE"] = "send_message_done";
    eChattyEvent["SEND_MESSAGE_FAIL"] = "send_message_fail";
    eChattyEvent["SEND_MESSAGE_RETRY"] = "send_message_retry";
    eChattyEvent["DELETE_MESSAGE"] = "delete_message";
    eChattyEvent["DELETE_MESSAGE_DONE"] = "delete_message_done";
    eChattyEvent["DELETE_MESSAGE_FAIL"] = "delete_message_fail";
    eChattyEvent["MARK_AS_READ"] = "mark_as_read";
    eChattyEvent["MARK_AS_READ_DONE"] = "mark_as_read_done";
    eChattyEvent["MARK_AS_READ_FAIL"] = "mark_as_read_fail";
    eChattyEvent["MARK_AS_READ_BYPASS"] = "mark_as_read_bypass";
    eChattyEvent["INVITE_MEMBERS"] = "invite_members";
    eChattyEvent["INVITE_MEMBERS_DONE"] = "invite_members_done";
    eChattyEvent["INVITE_MEMBERS_FAIL"] = "invite_members_fail";
    eChattyEvent["EXCLUDE_MEMBERS"] = "exclude_members";
    eChattyEvent["EXCLUDE_MEMBERS_DONE"] = "exclude_members_done";
    eChattyEvent["EXCLUDE_MEMBERS_FAIL"] = "exclude_members_fail";
    eChattyEvent["JOIN_CHAT"] = "join_chat";
    eChattyEvent["JOIN_CHAT_DONE"] = "join_chat_done";
    eChattyEvent["JOIN_CHAT_FAIL"] = "join_chat_fail";
    eChattyEvent["LEAVE_CHAT"] = "leave_chat";
    eChattyEvent["LEAVE_CHAT_DONE"] = "leave_chat_done";
    eChattyEvent["LEAVE_CHAT_FAIL"] = "leave_chat_fail";
  })(eChattyEvent || (eChattyEvent = {}));

  var type = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get eAppState () { return eAppState; },
    get eAppPricing () { return eAppPricing; },
    get eSubscriptionPlan () { return eSubscriptionPlan; },
    get eAppUserRole () { return eAppUserRole; },
    get eMemberPermission () { return eMemberPermission; },
    get eMessageType () { return eMessageType; },
    get eMessageBy () { return eMessageBy; },
    SupportedImageFormat: SupportedImageFormat,
    SupportedVideoFormat: SupportedVideoFormat,
    SupportedUploadSize: SupportedUploadSize,
    get eChattyNotification () { return eChattyNotification; },
    get eChattyEvent () { return eChattyEvent; }
  });

  function getDefaultExportFromCjs (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  var axiosExports$1 = {};
  var axios$3 = {
    get exports(){ return axiosExports$1; },
    set exports(v){ axiosExports$1 = v; },
  };

  var axiosExports = {};
  var axios$2 = {
    get exports(){ return axiosExports; },
    set exports(v){ axiosExports = v; },
  };

  var bind$2 = function bind(fn, thisArg) {
    return function wrap() {
      var args = new Array(arguments.length);
      for (var i = 0; i < args.length; i++) {
        args[i] = arguments[i];
      }
      return fn.apply(thisArg, args);
    };
  };

  var bind$1 = bind$2;

  // utils is a library of generic helper functions non-specific to axios

  var toString$1 = Object.prototype.toString;

  // eslint-disable-next-line func-names
  var kindOf = function (cache) {
    // eslint-disable-next-line func-names
    return function (thing) {
      var str = toString$1.call(thing);
      return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
    };
  }(Object.create(null));
  function kindOfTest(type) {
    type = type.toLowerCase();
    return function isKindOf(thing) {
      return kindOf(thing) === type;
    };
  }

  /**
   * Determine if a value is an Array
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an Array, otherwise false
   */
  function isArray(val) {
    return Array.isArray(val);
  }

  /**
   * Determine if a value is undefined
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if the value is undefined, otherwise false
   */
  function isUndefined(val) {
    return typeof val === 'undefined';
  }

  /**
   * Determine if a value is a Buffer
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Buffer, otherwise false
   */
  function isBuffer(val) {
    return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
  }

  /**
   * Determine if a value is an ArrayBuffer
   *
   * @function
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an ArrayBuffer, otherwise false
   */
  var isArrayBuffer = kindOfTest('ArrayBuffer');

  /**
   * Determine if a value is a view on an ArrayBuffer
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
   */
  function isArrayBufferView(val) {
    var result;
    if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
      result = ArrayBuffer.isView(val);
    } else {
      result = val && val.buffer && isArrayBuffer(val.buffer);
    }
    return result;
  }

  /**
   * Determine if a value is a String
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a String, otherwise false
   */
  function isString(val) {
    return typeof val === 'string';
  }

  /**
   * Determine if a value is a Number
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Number, otherwise false
   */
  function isNumber(val) {
    return typeof val === 'number';
  }

  /**
   * Determine if a value is an Object
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an Object, otherwise false
   */
  function isObject(val) {
    return val !== null && _typeof(val) === 'object';
  }

  /**
   * Determine if a value is a plain Object
   *
   * @param {Object} val The value to test
   * @return {boolean} True if value is a plain Object, otherwise false
   */
  function isPlainObject(val) {
    if (kindOf(val) !== 'object') {
      return false;
    }
    var prototype = Object.getPrototypeOf(val);
    return prototype === null || prototype === Object.prototype;
  }

  /**
   * Determine if a value is a Date
   *
   * @function
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Date, otherwise false
   */
  var isDate = kindOfTest('Date');

  /**
   * Determine if a value is a File
   *
   * @function
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a File, otherwise false
   */
  var isFile = kindOfTest('File');

  /**
   * Determine if a value is a Blob
   *
   * @function
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Blob, otherwise false
   */
  var isBlob = kindOfTest('Blob');

  /**
   * Determine if a value is a FileList
   *
   * @function
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a File, otherwise false
   */
  var isFileList = kindOfTest('FileList');

  /**
   * Determine if a value is a Function
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Function, otherwise false
   */
  function isFunction(val) {
    return toString$1.call(val) === '[object Function]';
  }

  /**
   * Determine if a value is a Stream
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Stream, otherwise false
   */
  function isStream(val) {
    return isObject(val) && isFunction(val.pipe);
  }

  /**
   * Determine if a value is a FormData
   *
   * @param {Object} thing The value to test
   * @returns {boolean} True if value is an FormData, otherwise false
   */
  function isFormData(thing) {
    var pattern = '[object FormData]';
    return thing && (typeof FormData === 'function' && thing instanceof FormData || toString$1.call(thing) === pattern || isFunction(thing.toString) && thing.toString() === pattern);
  }

  /**
   * Determine if a value is a URLSearchParams object
   * @function
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a URLSearchParams object, otherwise false
   */
  var isURLSearchParams = kindOfTest('URLSearchParams');

  /**
   * Trim excess whitespace off the beginning and end of a string
   *
   * @param {String} str The String to trim
   * @returns {String} The String freed of excess whitespace
   */
  function trim(str) {
    return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
  }

  /**
   * Determine if we're running in a standard browser environment
   *
   * This allows axios to run in a web worker, and react-native.
   * Both environments support XMLHttpRequest, but not fully standard globals.
   *
   * web workers:
   *  typeof window -> undefined
   *  typeof document -> undefined
   *
   * react-native:
   *  navigator.product -> 'ReactNative'
   * nativescript
   *  navigator.product -> 'NativeScript' or 'NS'
   */
  function isStandardBrowserEnv() {
    if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' || navigator.product === 'NativeScript' || navigator.product === 'NS')) {
      return false;
    }
    return typeof window !== 'undefined' && typeof document !== 'undefined';
  }

  /**
   * Iterate over an Array or an Object invoking a function for each item.
   *
   * If `obj` is an Array callback will be called passing
   * the value, index, and complete array for each item.
   *
   * If 'obj' is an Object callback will be called passing
   * the value, key, and complete object for each property.
   *
   * @param {Object|Array} obj The object to iterate
   * @param {Function} fn The callback to invoke for each item
   */
  function forEach(obj, fn) {
    // Don't bother if no value provided
    if (obj === null || typeof obj === 'undefined') {
      return;
    }

    // Force an array if not already something iterable
    if (_typeof(obj) !== 'object') {
      /*eslint no-param-reassign:0*/
      obj = [obj];
    }
    if (isArray(obj)) {
      // Iterate over array values
      for (var i = 0, l = obj.length; i < l; i++) {
        fn.call(null, obj[i], i, obj);
      }
    } else {
      // Iterate over object keys
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          fn.call(null, obj[key], key, obj);
        }
      }
    }
  }

  /**
   * Accepts varargs expecting each argument to be an object, then
   * immutably merges the properties of each object and returns result.
   *
   * When multiple objects contain the same key the later object in
   * the arguments list will take precedence.
   *
   * Example:
   *
   * ```js
   * var result = merge({foo: 123}, {foo: 456});
   * console.log(result.foo); // outputs 456
   * ```
   *
   * @param {Object} obj1 Object to merge
   * @returns {Object} Result of all merge properties
   */
  function merge( /* obj1, obj2, obj3, ... */
  ) {
    var result = {};
    function assignValue(val, key) {
      if (isPlainObject(result[key]) && isPlainObject(val)) {
        result[key] = merge(result[key], val);
      } else if (isPlainObject(val)) {
        result[key] = merge({}, val);
      } else if (isArray(val)) {
        result[key] = val.slice();
      } else {
        result[key] = val;
      }
    }
    for (var i = 0, l = arguments.length; i < l; i++) {
      forEach(arguments[i], assignValue);
    }
    return result;
  }

  /**
   * Extends object a by mutably adding to it the properties of object b.
   *
   * @param {Object} a The object to be extended
   * @param {Object} b The object to copy properties from
   * @param {Object} thisArg The object to bind function to
   * @return {Object} The resulting value of object a
   */
  function extend(a, b, thisArg) {
    forEach(b, function assignValue(val, key) {
      if (thisArg && typeof val === 'function') {
        a[key] = bind$1(val, thisArg);
      } else {
        a[key] = val;
      }
    });
    return a;
  }

  /**
   * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
   *
   * @param {string} content with BOM
   * @return {string} content value without BOM
   */
  function stripBOM(content) {
    if (content.charCodeAt(0) === 0xFEFF) {
      content = content.slice(1);
    }
    return content;
  }

  /**
   * Inherit the prototype methods from one constructor into another
   * @param {function} constructor
   * @param {function} superConstructor
   * @param {object} [props]
   * @param {object} [descriptors]
   */

  function inherits(constructor, superConstructor, props, descriptors) {
    constructor.prototype = Object.create(superConstructor.prototype, descriptors);
    constructor.prototype.constructor = constructor;
    props && _extends(constructor.prototype, props);
  }

  /**
   * Resolve object with deep prototype chain to a flat object
   * @param {Object} sourceObj source object
   * @param {Object} [destObj]
   * @param {Function} [filter]
   * @returns {Object}
   */

  function toFlatObject(sourceObj, destObj, filter) {
    var props;
    var i;
    var prop;
    var merged = {};
    destObj = destObj || {};
    do {
      props = Object.getOwnPropertyNames(sourceObj);
      i = props.length;
      while (i-- > 0) {
        prop = props[i];
        if (!merged[prop]) {
          destObj[prop] = sourceObj[prop];
          merged[prop] = true;
        }
      }
      sourceObj = Object.getPrototypeOf(sourceObj);
    } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);
    return destObj;
  }

  /*
   * determines whether a string ends with the characters of a specified string
   * @param {String} str
   * @param {String} searchString
   * @param {Number} [position= 0]
   * @returns {boolean}
   */
  function endsWith(str, searchString, position) {
    str = String(str);
    if (position === undefined || position > str.length) {
      position = str.length;
    }
    position -= searchString.length;
    var lastIndex = str.indexOf(searchString, position);
    return lastIndex !== -1 && lastIndex === position;
  }

  /**
   * Returns new array from array like object
   * @param {*} [thing]
   * @returns {Array}
   */
  function toArray(thing) {
    if (!thing) return null;
    var i = thing.length;
    if (isUndefined(i)) return null;
    var arr = new Array(i);
    while (i-- > 0) {
      arr[i] = thing[i];
    }
    return arr;
  }

  // eslint-disable-next-line func-names
  var isTypedArray = function (TypedArray) {
    // eslint-disable-next-line func-names
    return function (thing) {
      return TypedArray && thing instanceof TypedArray;
    };
  }(typeof Uint8Array !== 'undefined' && Object.getPrototypeOf(Uint8Array));
  var utils$9 = {
    isArray: isArray,
    isArrayBuffer: isArrayBuffer,
    isBuffer: isBuffer,
    isFormData: isFormData,
    isArrayBufferView: isArrayBufferView,
    isString: isString,
    isNumber: isNumber,
    isObject: isObject,
    isPlainObject: isPlainObject,
    isUndefined: isUndefined,
    isDate: isDate,
    isFile: isFile,
    isBlob: isBlob,
    isFunction: isFunction,
    isStream: isStream,
    isURLSearchParams: isURLSearchParams,
    isStandardBrowserEnv: isStandardBrowserEnv,
    forEach: forEach,
    merge: merge,
    extend: extend,
    trim: trim,
    stripBOM: stripBOM,
    inherits: inherits,
    toFlatObject: toFlatObject,
    kindOf: kindOf,
    kindOfTest: kindOfTest,
    endsWith: endsWith,
    toArray: toArray,
    isTypedArray: isTypedArray,
    isFileList: isFileList
  };

  var utils$8 = utils$9;
  function encode$2(val) {
    return encodeURIComponent(val).replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
  }

  /**
   * Build a URL by appending params to the end
   *
   * @param {string} url The base of the url (e.g., http://www.google.com)
   * @param {object} [params] The params to be appended
   * @returns {string} The formatted url
   */
  var buildURL$1 = function buildURL(url, params, paramsSerializer) {
    /*eslint no-param-reassign:0*/
    if (!params) {
      return url;
    }
    var serializedParams;
    if (paramsSerializer) {
      serializedParams = paramsSerializer(params);
    } else if (utils$8.isURLSearchParams(params)) {
      serializedParams = params.toString();
    } else {
      var parts = [];
      utils$8.forEach(params, function serialize(val, key) {
        if (val === null || typeof val === 'undefined') {
          return;
        }
        if (utils$8.isArray(val)) {
          key = key + '[]';
        } else {
          val = [val];
        }
        utils$8.forEach(val, function parseValue(v) {
          if (utils$8.isDate(v)) {
            v = v.toISOString();
          } else if (utils$8.isObject(v)) {
            v = JSON.stringify(v);
          }
          parts.push(encode$2(key) + '=' + encode$2(v));
        });
      });
      serializedParams = parts.join('&');
    }
    if (serializedParams) {
      var hashmarkIndex = url.indexOf('#');
      if (hashmarkIndex !== -1) {
        url = url.slice(0, hashmarkIndex);
      }
      url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
    }
    return url;
  };

  var utils$7 = utils$9;
  function InterceptorManager$1() {
    this.handlers = [];
  }

  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  InterceptorManager$1.prototype.use = function use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled: fulfilled,
      rejected: rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null
    });
    return this.handlers.length - 1;
  };

  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   */
  InterceptorManager$1.prototype.eject = function eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  };

  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   */
  InterceptorManager$1.prototype.forEach = function forEach(fn) {
    utils$7.forEach(this.handlers, function forEachHandler(h) {
      if (h !== null) {
        fn(h);
      }
    });
  };
  var InterceptorManager_1 = InterceptorManager$1;

  var utils$6 = utils$9;
  var normalizeHeaderName$1 = function normalizeHeaderName(headers, normalizedName) {
    utils$6.forEach(headers, function processHeader(value, name) {
      if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
        headers[normalizedName] = value;
        delete headers[name];
      }
    });
  };

  var AxiosError_1;
  var hasRequiredAxiosError;
  function requireAxiosError() {
    if (hasRequiredAxiosError) return AxiosError_1;
    hasRequiredAxiosError = 1;
    var utils = utils$9;

    /**
     * Create an Error with the specified message, config, error code, request and response.
     *
     * @param {string} message The error message.
     * @param {string} [code] The error code (for example, 'ECONNABORTED').
     * @param {Object} [config] The config.
     * @param {Object} [request] The request.
     * @param {Object} [response] The response.
     * @returns {Error} The created error.
     */
    function AxiosError(message, code, config, request, response) {
      Error.call(this);
      this.message = message;
      this.name = 'AxiosError';
      code && (this.code = code);
      config && (this.config = config);
      request && (this.request = request);
      response && (this.response = response);
    }
    utils.inherits(AxiosError, Error, {
      toJSON: function toJSON() {
        return {
          // Standard
          message: this.message,
          name: this.name,
          // Microsoft
          description: this.description,
          number: this.number,
          // Mozilla
          fileName: this.fileName,
          lineNumber: this.lineNumber,
          columnNumber: this.columnNumber,
          stack: this.stack,
          // Axios
          config: this.config,
          code: this.code,
          status: this.response && this.response.status ? this.response.status : null
        };
      }
    });
    var prototype = AxiosError.prototype;
    var descriptors = {};
    ['ERR_BAD_OPTION_VALUE', 'ERR_BAD_OPTION', 'ECONNABORTED', 'ETIMEDOUT', 'ERR_NETWORK', 'ERR_FR_TOO_MANY_REDIRECTS', 'ERR_DEPRECATED', 'ERR_BAD_RESPONSE', 'ERR_BAD_REQUEST', 'ERR_CANCELED'
    // eslint-disable-next-line func-names
    ].forEach(function (code) {
      descriptors[code] = {
        value: code
      };
    });
    Object.defineProperties(AxiosError, descriptors);
    Object.defineProperty(prototype, 'isAxiosError', {
      value: true
    });

    // eslint-disable-next-line func-names
    AxiosError.from = function (error, code, config, request, response, customProps) {
      var axiosError = Object.create(prototype);
      utils.toFlatObject(error, axiosError, function filter(obj) {
        return obj !== Error.prototype;
      });
      AxiosError.call(axiosError, error.message, code, config, request, response);
      axiosError.name = error.name;
      customProps && _extends(axiosError, customProps);
      return axiosError;
    };
    AxiosError_1 = AxiosError;
    return AxiosError_1;
  }

  var transitional = {
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false
  };

  var toFormData_1;
  var hasRequiredToFormData;
  function requireToFormData() {
    if (hasRequiredToFormData) return toFormData_1;
    hasRequiredToFormData = 1;
    var utils = utils$9;

    /**
     * Convert a data object to FormData
     * @param {Object} obj
     * @param {?Object} [formData]
     * @returns {Object}
     **/

    function toFormData(obj, formData) {
      // eslint-disable-next-line no-param-reassign
      formData = formData || new FormData();
      var stack = [];
      function convertValue(value) {
        if (value === null) return '';
        if (utils.isDate(value)) {
          return value.toISOString();
        }
        if (utils.isArrayBuffer(value) || utils.isTypedArray(value)) {
          return typeof Blob === 'function' ? new Blob([value]) : Buffer.from(value);
        }
        return value;
      }
      function build(data, parentKey) {
        if (utils.isPlainObject(data) || utils.isArray(data)) {
          if (stack.indexOf(data) !== -1) {
            throw Error('Circular reference detected in ' + parentKey);
          }
          stack.push(data);
          utils.forEach(data, function each(value, key) {
            if (utils.isUndefined(value)) return;
            var fullKey = parentKey ? parentKey + '.' + key : key;
            var arr;
            if (value && !parentKey && _typeof(value) === 'object') {
              if (utils.endsWith(key, '{}')) {
                // eslint-disable-next-line no-param-reassign
                value = JSON.stringify(value);
              } else if (utils.endsWith(key, '[]') && (arr = utils.toArray(value))) {
                // eslint-disable-next-line func-names
                arr.forEach(function (el) {
                  !utils.isUndefined(el) && formData.append(fullKey, convertValue(el));
                });
                return;
              }
            }
            build(value, fullKey);
          });
          stack.pop();
        } else {
          formData.append(parentKey, convertValue(data));
        }
      }
      build(obj);
      return formData;
    }
    toFormData_1 = toFormData;
    return toFormData_1;
  }

  var settle;
  var hasRequiredSettle;
  function requireSettle() {
    if (hasRequiredSettle) return settle;
    hasRequiredSettle = 1;
    var AxiosError = requireAxiosError();

    /**
     * Resolve or reject a Promise based on response status.
     *
     * @param {Function} resolve A function that resolves the promise.
     * @param {Function} reject A function that rejects the promise.
     * @param {object} response The response.
     */
    settle = function settle(resolve, reject, response) {
      var validateStatus = response.config.validateStatus;
      if (!response.status || !validateStatus || validateStatus(response.status)) {
        resolve(response);
      } else {
        reject(new AxiosError('Request failed with status code ' + response.status, [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4], response.config, response.request, response));
      }
    };
    return settle;
  }

  var cookies;
  var hasRequiredCookies;
  function requireCookies() {
    if (hasRequiredCookies) return cookies;
    hasRequiredCookies = 1;
    var utils = utils$9;
    cookies = utils.isStandardBrowserEnv() ?
    // Standard browser envs support document.cookie
    function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));
          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }
          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }
          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }
          if (secure === true) {
            cookie.push('secure');
          }
          document.cookie = cookie.join('; ');
        },
        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return match ? decodeURIComponent(match[3]) : null;
        },
        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    }() :
    // Non standard browser env (web workers, react-native) lack needed support.
    function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() {
          return null;
        },
        remove: function remove() {}
      };
    }();
    return cookies;
  }

  /**
   * Determines whether the specified URL is absolute
   *
   * @param {string} url The URL to test
   * @returns {boolean} True if the specified URL is absolute, otherwise false
   */
  var isAbsoluteURL$1 = function isAbsoluteURL(url) {
    // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
    // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
    // by any combination of letters, digits, plus, period, or hyphen.
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
  };

  /**
   * Creates a new URL by combining the specified URLs
   *
   * @param {string} baseURL The base URL
   * @param {string} relativeURL The relative URL
   * @returns {string} The combined URL
   */
  var combineURLs$1 = function combineURLs(baseURL, relativeURL) {
    return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
  };

  var isAbsoluteURL = isAbsoluteURL$1;
  var combineURLs = combineURLs$1;

  /**
   * Creates a new URL by combining the baseURL with the requestedURL,
   * only when the requestedURL is not already an absolute URL.
   * If the requestURL is absolute, this function returns the requestedURL untouched.
   *
   * @param {string} baseURL The base URL
   * @param {string} requestedURL Absolute or relative URL to combine
   * @returns {string} The combined full path
   */
  var buildFullPath$1 = function buildFullPath(baseURL, requestedURL) {
    if (baseURL && !isAbsoluteURL(requestedURL)) {
      return combineURLs(baseURL, requestedURL);
    }
    return requestedURL;
  };

  var parseHeaders;
  var hasRequiredParseHeaders;
  function requireParseHeaders() {
    if (hasRequiredParseHeaders) return parseHeaders;
    hasRequiredParseHeaders = 1;
    var utils = utils$9;

    // Headers whose duplicates are ignored by node
    // c.f. https://nodejs.org/api/http.html#http_message_headers
    var ignoreDuplicateOf = ['age', 'authorization', 'content-length', 'content-type', 'etag', 'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since', 'last-modified', 'location', 'max-forwards', 'proxy-authorization', 'referer', 'retry-after', 'user-agent'];

    /**
     * Parse headers into an object
     *
     * ```
     * Date: Wed, 27 Aug 2014 08:58:49 GMT
     * Content-Type: application/json
     * Connection: keep-alive
     * Transfer-Encoding: chunked
     * ```
     *
     * @param {String} headers Headers needing to be parsed
     * @returns {Object} Headers parsed into an object
     */
    parseHeaders = function parseHeaders(headers) {
      var parsed = {};
      var key;
      var val;
      var i;
      if (!headers) {
        return parsed;
      }
      utils.forEach(headers.split('\n'), function parser(line) {
        i = line.indexOf(':');
        key = utils.trim(line.substr(0, i)).toLowerCase();
        val = utils.trim(line.substr(i + 1));
        if (key) {
          if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
            return;
          }
          if (key === 'set-cookie') {
            parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
          } else {
            parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
          }
        }
      });
      return parsed;
    };
    return parseHeaders;
  }

  var isURLSameOrigin;
  var hasRequiredIsURLSameOrigin;
  function requireIsURLSameOrigin() {
    if (hasRequiredIsURLSameOrigin) return isURLSameOrigin;
    hasRequiredIsURLSameOrigin = 1;
    var utils = utils$9;
    isURLSameOrigin = utils.isStandardBrowserEnv() ?
    // Standard browser envs have full support of the APIs needed to test
    // whether the request URL is of the same origin as current location.
    function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
      * Parse a URL to discover it's components
      *
      * @param {String} url The URL to be parsed
      * @returns {Object}
      */
      function resolveURL(url) {
        var href = url;
        if (msie) {
          // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }
        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: urlParsingNode.pathname.charAt(0) === '/' ? urlParsingNode.pathname : '/' + urlParsingNode.pathname
        };
      }
      originURL = resolveURL(window.location.href);

      /**
      * Determine if a URL shares the same origin as the current location
      *
      * @param {String} requestURL The URL to test
      * @returns {boolean} True if URL shares the same origin, otherwise false
      */
      return function isURLSameOrigin(requestURL) {
        var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
        return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
      };
    }() :
    // Non standard browser envs (web workers, react-native) lack needed support.
    function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    }();
    return isURLSameOrigin;
  }

  var CanceledError_1;
  var hasRequiredCanceledError;
  function requireCanceledError() {
    if (hasRequiredCanceledError) return CanceledError_1;
    hasRequiredCanceledError = 1;
    var AxiosError = requireAxiosError();
    var utils = utils$9;

    /**
     * A `CanceledError` is an object that is thrown when an operation is canceled.
     *
     * @class
     * @param {string=} message The message.
     */
    function CanceledError(message) {
      // eslint-disable-next-line no-eq-null,eqeqeq
      AxiosError.call(this, message == null ? 'canceled' : message, AxiosError.ERR_CANCELED);
      this.name = 'CanceledError';
    }
    utils.inherits(CanceledError, AxiosError, {
      __CANCEL__: true
    });
    CanceledError_1 = CanceledError;
    return CanceledError_1;
  }

  var parseProtocol;
  var hasRequiredParseProtocol;
  function requireParseProtocol() {
    if (hasRequiredParseProtocol) return parseProtocol;
    hasRequiredParseProtocol = 1;
    parseProtocol = function parseProtocol(url) {
      var match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
      return match && match[1] || '';
    };
    return parseProtocol;
  }

  var xhr;
  var hasRequiredXhr;
  function requireXhr() {
    if (hasRequiredXhr) return xhr;
    hasRequiredXhr = 1;
    var utils = utils$9;
    var settle = requireSettle();
    var cookies = requireCookies();
    var buildURL = buildURL$1;
    var buildFullPath = buildFullPath$1;
    var parseHeaders = requireParseHeaders();
    var isURLSameOrigin = requireIsURLSameOrigin();
    var transitionalDefaults = transitional;
    var AxiosError = requireAxiosError();
    var CanceledError = requireCanceledError();
    var parseProtocol = requireParseProtocol();
    xhr = function xhrAdapter(config) {
      return new Promise(function dispatchXhrRequest(resolve, reject) {
        var requestData = config.data;
        var requestHeaders = config.headers;
        var responseType = config.responseType;
        var onCanceled;
        function done() {
          if (config.cancelToken) {
            config.cancelToken.unsubscribe(onCanceled);
          }
          if (config.signal) {
            config.signal.removeEventListener('abort', onCanceled);
          }
        }
        if (utils.isFormData(requestData) && utils.isStandardBrowserEnv()) {
          delete requestHeaders['Content-Type']; // Let the browser set it
        }

        var request = new XMLHttpRequest();

        // HTTP basic authentication
        if (config.auth) {
          var username = config.auth.username || '';
          var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
          requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
        }
        var fullPath = buildFullPath(config.baseURL, config.url);
        request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

        // Set the request timeout in MS
        request.timeout = config.timeout;
        function onloadend() {
          if (!request) {
            return;
          }
          // Prepare the response
          var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
          var responseData = !responseType || responseType === 'text' || responseType === 'json' ? request.responseText : request.response;
          var response = {
            data: responseData,
            status: request.status,
            statusText: request.statusText,
            headers: responseHeaders,
            config: config,
            request: request
          };
          settle(function _resolve(value) {
            resolve(value);
            done();
          }, function _reject(err) {
            reject(err);
            done();
          }, response);

          // Clean up request
          request = null;
        }
        if ('onloadend' in request) {
          // Use onloadend if available
          request.onloadend = onloadend;
        } else {
          // Listen for ready state to emulate onloadend
          request.onreadystatechange = function handleLoad() {
            if (!request || request.readyState !== 4) {
              return;
            }

            // The request errored out and we didn't get a response, this will be
            // handled by onerror instead
            // With one exception: request that using file: protocol, most browsers
            // will return status as 0 even though it's a successful request
            if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
              return;
            }
            // readystate handler is calling before onerror or ontimeout handlers,
            // so we should call onloadend on the next 'tick'
            setTimeout(onloadend);
          };
        }

        // Handle browser request cancellation (as opposed to a manual cancellation)
        request.onabort = function handleAbort() {
          if (!request) {
            return;
          }
          reject(new AxiosError('Request aborted', AxiosError.ECONNABORTED, config, request));

          // Clean up request
          request = null;
        };

        // Handle low level network errors
        request.onerror = function handleError() {
          // Real errors are hidden from us by the browser
          // onerror should only fire if it's a network error
          reject(new AxiosError('Network Error', AxiosError.ERR_NETWORK, config, request, request));

          // Clean up request
          request = null;
        };

        // Handle timeout
        request.ontimeout = function handleTimeout() {
          var timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
          var transitional = config.transitional || transitionalDefaults;
          if (config.timeoutErrorMessage) {
            timeoutErrorMessage = config.timeoutErrorMessage;
          }
          reject(new AxiosError(timeoutErrorMessage, transitional.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED, config, request));

          // Clean up request
          request = null;
        };

        // Add xsrf header
        // This is only done if running in a standard browser environment.
        // Specifically not if we're in a web worker, or react-native.
        if (utils.isStandardBrowserEnv()) {
          // Add xsrf header
          var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : undefined;
          if (xsrfValue) {
            requestHeaders[config.xsrfHeaderName] = xsrfValue;
          }
        }

        // Add headers to the request
        if ('setRequestHeader' in request) {
          utils.forEach(requestHeaders, function setRequestHeader(val, key) {
            if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
              // Remove Content-Type if data is undefined
              delete requestHeaders[key];
            } else {
              // Otherwise add header to the request
              request.setRequestHeader(key, val);
            }
          });
        }

        // Add withCredentials to request if needed
        if (!utils.isUndefined(config.withCredentials)) {
          request.withCredentials = !!config.withCredentials;
        }

        // Add responseType to request if needed
        if (responseType && responseType !== 'json') {
          request.responseType = config.responseType;
        }

        // Handle progress if needed
        if (typeof config.onDownloadProgress === 'function') {
          request.addEventListener('progress', config.onDownloadProgress);
        }

        // Not all browsers support upload events
        if (typeof config.onUploadProgress === 'function' && request.upload) {
          request.upload.addEventListener('progress', config.onUploadProgress);
        }
        if (config.cancelToken || config.signal) {
          // Handle cancellation
          // eslint-disable-next-line func-names
          onCanceled = function onCanceled(cancel) {
            if (!request) {
              return;
            }
            reject(!cancel || cancel && cancel.type ? new CanceledError() : cancel);
            request.abort();
            request = null;
          };
          config.cancelToken && config.cancelToken.subscribe(onCanceled);
          if (config.signal) {
            config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
          }
        }
        if (!requestData) {
          requestData = null;
        }
        var protocol = parseProtocol(fullPath);
        if (protocol && ['http', 'https', 'file'].indexOf(protocol) === -1) {
          reject(new AxiosError('Unsupported protocol ' + protocol + ':', AxiosError.ERR_BAD_REQUEST, config));
          return;
        }

        // Send the request
        request.send(requestData);
      });
    };
    return xhr;
  }

  var _null;
  var hasRequired_null;
  function require_null() {
    if (hasRequired_null) return _null;
    hasRequired_null = 1;
    // eslint-disable-next-line strict
    _null = null;
    return _null;
  }

  var utils$5 = utils$9;
  var normalizeHeaderName = normalizeHeaderName$1;
  var AxiosError$1 = requireAxiosError();
  var transitionalDefaults = transitional;
  var toFormData = requireToFormData();
  var DEFAULT_CONTENT_TYPE = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };
  function setContentTypeIfUnset(headers, value) {
    if (!utils$5.isUndefined(headers) && utils$5.isUndefined(headers['Content-Type'])) {
      headers['Content-Type'] = value;
    }
  }
  function getDefaultAdapter() {
    var adapter;
    if (typeof XMLHttpRequest !== 'undefined') {
      // For browsers use XHR adapter
      adapter = requireXhr();
    } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
      // For node use HTTP adapter
      adapter = requireXhr();
    }
    return adapter;
  }
  function stringifySafely(rawValue, parser, encoder) {
    if (utils$5.isString(rawValue)) {
      try {
        (parser || JSON.parse)(rawValue);
        return utils$5.trim(rawValue);
      } catch (e) {
        if (e.name !== 'SyntaxError') {
          throw e;
        }
      }
    }
    return (encoder || JSON.stringify)(rawValue);
  }
  var defaults$3 = {
    transitional: transitionalDefaults,
    adapter: getDefaultAdapter(),
    transformRequest: [function transformRequest(data, headers) {
      normalizeHeaderName(headers, 'Accept');
      normalizeHeaderName(headers, 'Content-Type');
      if (utils$5.isFormData(data) || utils$5.isArrayBuffer(data) || utils$5.isBuffer(data) || utils$5.isStream(data) || utils$5.isFile(data) || utils$5.isBlob(data)) {
        return data;
      }
      if (utils$5.isArrayBufferView(data)) {
        return data.buffer;
      }
      if (utils$5.isURLSearchParams(data)) {
        setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
        return data.toString();
      }
      var isObjectPayload = utils$5.isObject(data);
      var contentType = headers && headers['Content-Type'];
      var isFileList;
      if ((isFileList = utils$5.isFileList(data)) || isObjectPayload && contentType === 'multipart/form-data') {
        var _FormData = this.env && this.env.FormData;
        return toFormData(isFileList ? {
          'files[]': data
        } : data, _FormData && new _FormData());
      } else if (isObjectPayload || contentType === 'application/json') {
        setContentTypeIfUnset(headers, 'application/json');
        return stringifySafely(data);
      }
      return data;
    }],
    transformResponse: [function transformResponse(data) {
      var transitional = this.transitional || defaults$3.transitional;
      var silentJSONParsing = transitional && transitional.silentJSONParsing;
      var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
      var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';
      if (strictJSONParsing || forcedJSONParsing && utils$5.isString(data) && data.length) {
        try {
          return JSON.parse(data);
        } catch (e) {
          if (strictJSONParsing) {
            if (e.name === 'SyntaxError') {
              throw AxiosError$1.from(e, AxiosError$1.ERR_BAD_RESPONSE, this, null, this.response);
            }
            throw e;
          }
        }
      }
      return data;
    }],
    /**
     * A timeout in milliseconds to abort a request. If set to 0 (default) a
     * timeout is not created.
     */
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {
      FormData: require_null()
    },
    validateStatus: function validateStatus(status) {
      return status >= 200 && status < 300;
    },
    headers: {
      common: {
        'Accept': 'application/json, text/plain, */*'
      }
    }
  };
  utils$5.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
    defaults$3.headers[method] = {};
  });
  utils$5.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
    defaults$3.headers[method] = utils$5.merge(DEFAULT_CONTENT_TYPE);
  });
  var defaults_1 = defaults$3;

  var utils$4 = utils$9;
  var defaults$2 = defaults_1;

  /**
   * Transform the data for a request or a response
   *
   * @param {Object|String} data The data to be transformed
   * @param {Array} headers The headers for the request or response
   * @param {Array|Function} fns A single function or Array of functions
   * @returns {*} The resulting transformed data
   */
  var transformData$1 = function transformData(data, headers, fns) {
    var context = this || defaults$2;
    /*eslint no-param-reassign:0*/
    utils$4.forEach(fns, function transform(fn) {
      data = fn.call(context, data, headers);
    });
    return data;
  };

  var isCancel$1;
  var hasRequiredIsCancel;
  function requireIsCancel() {
    if (hasRequiredIsCancel) return isCancel$1;
    hasRequiredIsCancel = 1;
    isCancel$1 = function isCancel(value) {
      return !!(value && value.__CANCEL__);
    };
    return isCancel$1;
  }

  var utils$3 = utils$9;
  var transformData = transformData$1;
  var isCancel = requireIsCancel();
  var defaults$1 = defaults_1;
  var CanceledError = requireCanceledError();

  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  function throwIfCancellationRequested(config) {
    if (config.cancelToken) {
      config.cancelToken.throwIfRequested();
    }
    if (config.signal && config.signal.aborted) {
      throw new CanceledError();
    }
  }

  /**
   * Dispatch a request to the server using the configured adapter.
   *
   * @param {object} config The config that is to be used for the request
   * @returns {Promise} The Promise to be fulfilled
   */
  var dispatchRequest$1 = function dispatchRequest(config) {
    throwIfCancellationRequested(config);

    // Ensure headers exist
    config.headers = config.headers || {};

    // Transform request data
    config.data = transformData.call(config, config.data, config.headers, config.transformRequest);

    // Flatten headers
    config.headers = utils$3.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers);
    utils$3.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function cleanHeaderConfig(method) {
      delete config.headers[method];
    });
    var adapter = config.adapter || defaults$1.adapter;
    return adapter(config).then(function onAdapterResolution(response) {
      throwIfCancellationRequested(config);

      // Transform response data
      response.data = transformData.call(config, response.data, response.headers, config.transformResponse);
      return response;
    }, function onAdapterRejection(reason) {
      if (!isCancel(reason)) {
        throwIfCancellationRequested(config);

        // Transform response data
        if (reason && reason.response) {
          reason.response.data = transformData.call(config, reason.response.data, reason.response.headers, config.transformResponse);
        }
      }
      return Promise.reject(reason);
    });
  };

  var utils$2 = utils$9;

  /**
   * Config-specific merge-function which creates a new config-object
   * by merging two configuration objects together.
   *
   * @param {Object} config1
   * @param {Object} config2
   * @returns {Object} New object resulting from merging config2 to config1
   */
  var mergeConfig$2 = function mergeConfig(config1, config2) {
    // eslint-disable-next-line no-param-reassign
    config2 = config2 || {};
    var config = {};
    function getMergedValue(target, source) {
      if (utils$2.isPlainObject(target) && utils$2.isPlainObject(source)) {
        return utils$2.merge(target, source);
      } else if (utils$2.isPlainObject(source)) {
        return utils$2.merge({}, source);
      } else if (utils$2.isArray(source)) {
        return source.slice();
      }
      return source;
    }

    // eslint-disable-next-line consistent-return
    function mergeDeepProperties(prop) {
      if (!utils$2.isUndefined(config2[prop])) {
        return getMergedValue(config1[prop], config2[prop]);
      } else if (!utils$2.isUndefined(config1[prop])) {
        return getMergedValue(undefined, config1[prop]);
      }
    }

    // eslint-disable-next-line consistent-return
    function valueFromConfig2(prop) {
      if (!utils$2.isUndefined(config2[prop])) {
        return getMergedValue(undefined, config2[prop]);
      }
    }

    // eslint-disable-next-line consistent-return
    function defaultToConfig2(prop) {
      if (!utils$2.isUndefined(config2[prop])) {
        return getMergedValue(undefined, config2[prop]);
      } else if (!utils$2.isUndefined(config1[prop])) {
        return getMergedValue(undefined, config1[prop]);
      }
    }

    // eslint-disable-next-line consistent-return
    function mergeDirectKeys(prop) {
      if (prop in config2) {
        return getMergedValue(config1[prop], config2[prop]);
      } else if (prop in config1) {
        return getMergedValue(undefined, config1[prop]);
      }
    }
    var mergeMap = {
      'url': valueFromConfig2,
      'method': valueFromConfig2,
      'data': valueFromConfig2,
      'baseURL': defaultToConfig2,
      'transformRequest': defaultToConfig2,
      'transformResponse': defaultToConfig2,
      'paramsSerializer': defaultToConfig2,
      'timeout': defaultToConfig2,
      'timeoutMessage': defaultToConfig2,
      'withCredentials': defaultToConfig2,
      'adapter': defaultToConfig2,
      'responseType': defaultToConfig2,
      'xsrfCookieName': defaultToConfig2,
      'xsrfHeaderName': defaultToConfig2,
      'onUploadProgress': defaultToConfig2,
      'onDownloadProgress': defaultToConfig2,
      'decompress': defaultToConfig2,
      'maxContentLength': defaultToConfig2,
      'maxBodyLength': defaultToConfig2,
      'beforeRedirect': defaultToConfig2,
      'transport': defaultToConfig2,
      'httpAgent': defaultToConfig2,
      'httpsAgent': defaultToConfig2,
      'cancelToken': defaultToConfig2,
      'socketPath': defaultToConfig2,
      'responseEncoding': defaultToConfig2,
      'validateStatus': mergeDirectKeys
    };
    utils$2.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
      var merge = mergeMap[prop] || mergeDeepProperties;
      var configValue = merge(prop);
      utils$2.isUndefined(configValue) && merge !== mergeDirectKeys || (config[prop] = configValue);
    });
    return config;
  };

  var data;
  var hasRequiredData;
  function requireData() {
    if (hasRequiredData) return data;
    hasRequiredData = 1;
    data = {
      "version": "0.27.2"
    };
    return data;
  }

  var VERSION = requireData().version;
  var AxiosError = requireAxiosError();
  var validators$1 = {};

  // eslint-disable-next-line func-names
  ['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function (type, i) {
    validators$1[type] = function validator(thing) {
      return _typeof(thing) === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
    };
  });
  var deprecatedWarnings = {};

  /**
   * Transitional option validator
   * @param {function|boolean?} validator - set to false if the transitional option has been removed
   * @param {string?} version - deprecated version / removed since version
   * @param {string?} message - some message with additional info
   * @returns {function}
   */
  validators$1.transitional = function transitional(validator, version, message) {
    function formatMessage(opt, desc) {
      return '[Axios v' + VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
    }

    // eslint-disable-next-line func-names
    return function (value, opt, opts) {
      if (validator === false) {
        throw new AxiosError(formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')), AxiosError.ERR_DEPRECATED);
      }
      if (version && !deprecatedWarnings[opt]) {
        deprecatedWarnings[opt] = true;
        // eslint-disable-next-line no-console
        console.warn(formatMessage(opt, ' has been deprecated since v' + version + ' and will be removed in the near future'));
      }
      return validator ? validator(value, opt, opts) : true;
    };
  };

  /**
   * Assert object's properties type
   * @param {object} options
   * @param {object} schema
   * @param {boolean?} allowUnknown
   */

  function assertOptions(options, schema, allowUnknown) {
    if (_typeof(options) !== 'object') {
      throw new AxiosError('options must be an object', AxiosError.ERR_BAD_OPTION_VALUE);
    }
    var keys = Object.keys(options);
    var i = keys.length;
    while (i-- > 0) {
      var opt = keys[i];
      var validator = schema[opt];
      if (validator) {
        var value = options[opt];
        var result = value === undefined || validator(value, opt, options);
        if (result !== true) {
          throw new AxiosError('option ' + opt + ' must be ' + result, AxiosError.ERR_BAD_OPTION_VALUE);
        }
        continue;
      }
      if (allowUnknown !== true) {
        throw new AxiosError('Unknown option ' + opt, AxiosError.ERR_BAD_OPTION);
      }
    }
  }
  var validator$1 = {
    assertOptions: assertOptions,
    validators: validators$1
  };

  var utils$1 = utils$9;
  var buildURL = buildURL$1;
  var InterceptorManager = InterceptorManager_1;
  var dispatchRequest = dispatchRequest$1;
  var mergeConfig$1 = mergeConfig$2;
  var buildFullPath = buildFullPath$1;
  var validator = validator$1;
  var validators = validator.validators;
  /**
   * Create a new instance of Axios
   *
   * @param {Object} instanceConfig The default config for the instance
   */
  function Axios$1(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager()
    };
  }

  /**
   * Dispatch a request
   *
   * @param {Object} config The config specific for this request (merged with this.defaults)
   */
  Axios$1.prototype.request = function request(configOrUrl, config) {
    /*eslint no-param-reassign:0*/
    // Allow for axios('example/url'[, config]) a la fetch API
    if (typeof configOrUrl === 'string') {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }
    config = mergeConfig$1(this.defaults, config);

    // Set config.method
    if (config.method) {
      config.method = config.method.toLowerCase();
    } else if (this.defaults.method) {
      config.method = this.defaults.method.toLowerCase();
    } else {
      config.method = 'get';
    }
    var transitional = config.transitional;
    if (transitional !== undefined) {
      validator.assertOptions(transitional, {
        silentJSONParsing: validators.transitional(validators["boolean"]),
        forcedJSONParsing: validators.transitional(validators["boolean"]),
        clarifyTimeoutError: validators.transitional(validators["boolean"])
      }, false);
    }

    // filter out skipped interceptors
    var requestInterceptorChain = [];
    var synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
        return;
      }
      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
      requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
    });
    var responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });
    var promise;
    if (!synchronousRequestInterceptors) {
      var chain = [dispatchRequest, undefined];
      Array.prototype.unshift.apply(chain, requestInterceptorChain);
      chain = chain.concat(responseInterceptorChain);
      promise = Promise.resolve(config);
      while (chain.length) {
        promise = promise.then(chain.shift(), chain.shift());
      }
      return promise;
    }
    var newConfig = config;
    while (requestInterceptorChain.length) {
      var onFulfilled = requestInterceptorChain.shift();
      var onRejected = requestInterceptorChain.shift();
      try {
        newConfig = onFulfilled(newConfig);
      } catch (error) {
        onRejected(error);
        break;
      }
    }
    try {
      promise = dispatchRequest(newConfig);
    } catch (error) {
      return Promise.reject(error);
    }
    while (responseInterceptorChain.length) {
      promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
    }
    return promise;
  };
  Axios$1.prototype.getUri = function getUri(config) {
    config = mergeConfig$1(this.defaults, config);
    var fullPath = buildFullPath(config.baseURL, config.url);
    return buildURL(fullPath, config.params, config.paramsSerializer);
  };

  // Provide aliases for supported request methods
  utils$1.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
    /*eslint func-names:0*/
    Axios$1.prototype[method] = function (url, config) {
      return this.request(mergeConfig$1(config || {}, {
        method: method,
        url: url,
        data: (config || {}).data
      }));
    };
  });
  utils$1.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
    /*eslint func-names:0*/

    function generateHTTPMethod(isForm) {
      return function httpMethod(url, data, config) {
        return this.request(mergeConfig$1(config || {}, {
          method: method,
          headers: isForm ? {
            'Content-Type': 'multipart/form-data'
          } : {},
          url: url,
          data: data
        }));
      };
    }
    Axios$1.prototype[method] = generateHTTPMethod();
    Axios$1.prototype[method + 'Form'] = generateHTTPMethod(true);
  });
  var Axios_1 = Axios$1;

  var CancelToken_1;
  var hasRequiredCancelToken;
  function requireCancelToken() {
    if (hasRequiredCancelToken) return CancelToken_1;
    hasRequiredCancelToken = 1;
    var CanceledError = requireCanceledError();

    /**
     * A `CancelToken` is an object that can be used to request cancellation of an operation.
     *
     * @class
     * @param {Function} executor The executor function.
     */
    function CancelToken(executor) {
      if (typeof executor !== 'function') {
        throw new TypeError('executor must be a function.');
      }
      var resolvePromise;
      this.promise = new Promise(function promiseExecutor(resolve) {
        resolvePromise = resolve;
      });
      var token = this;

      // eslint-disable-next-line func-names
      this.promise.then(function (cancel) {
        if (!token._listeners) return;
        var i;
        var l = token._listeners.length;
        for (i = 0; i < l; i++) {
          token._listeners[i](cancel);
        }
        token._listeners = null;
      });

      // eslint-disable-next-line func-names
      this.promise.then = function (onfulfilled) {
        var _resolve;
        // eslint-disable-next-line func-names
        var promise = new Promise(function (resolve) {
          token.subscribe(resolve);
          _resolve = resolve;
        }).then(onfulfilled);
        promise.cancel = function reject() {
          token.unsubscribe(_resolve);
        };
        return promise;
      };
      executor(function cancel(message) {
        if (token.reason) {
          // Cancellation has already been requested
          return;
        }
        token.reason = new CanceledError(message);
        resolvePromise(token.reason);
      });
    }

    /**
     * Throws a `CanceledError` if cancellation has been requested.
     */
    CancelToken.prototype.throwIfRequested = function throwIfRequested() {
      if (this.reason) {
        throw this.reason;
      }
    };

    /**
     * Subscribe to the cancel signal
     */

    CancelToken.prototype.subscribe = function subscribe(listener) {
      if (this.reason) {
        listener(this.reason);
        return;
      }
      if (this._listeners) {
        this._listeners.push(listener);
      } else {
        this._listeners = [listener];
      }
    };

    /**
     * Unsubscribe from the cancel signal
     */

    CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
      if (!this._listeners) {
        return;
      }
      var index = this._listeners.indexOf(listener);
      if (index !== -1) {
        this._listeners.splice(index, 1);
      }
    };

    /**
     * Returns an object that contains a new `CancelToken` and a function that, when called,
     * cancels the `CancelToken`.
     */
    CancelToken.source = function source() {
      var cancel;
      var token = new CancelToken(function executor(c) {
        cancel = c;
      });
      return {
        token: token,
        cancel: cancel
      };
    };
    CancelToken_1 = CancelToken;
    return CancelToken_1;
  }

  var spread;
  var hasRequiredSpread;
  function requireSpread() {
    if (hasRequiredSpread) return spread;
    hasRequiredSpread = 1;

    /**
     * Syntactic sugar for invoking a function and expanding an array for arguments.
     *
     * Common use case would be to use `Function.prototype.apply`.
     *
     *  ```js
     *  function f(x, y, z) {}
     *  var args = [1, 2, 3];
     *  f.apply(null, args);
     *  ```
     *
     * With `spread` this example can be re-written.
     *
     *  ```js
     *  spread(function(x, y, z) {})([1, 2, 3]);
     *  ```
     *
     * @param {Function} callback
     * @returns {Function}
     */
    spread = function spread(callback) {
      return function wrap(arr) {
        return callback.apply(null, arr);
      };
    };
    return spread;
  }

  var isAxiosError;
  var hasRequiredIsAxiosError;
  function requireIsAxiosError() {
    if (hasRequiredIsAxiosError) return isAxiosError;
    hasRequiredIsAxiosError = 1;
    var utils = utils$9;

    /**
     * Determines whether the payload is an error thrown by Axios
     *
     * @param {*} payload The value to test
     * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
     */
    isAxiosError = function isAxiosError(payload) {
      return utils.isObject(payload) && payload.isAxiosError === true;
    };
    return isAxiosError;
  }

  var utils = utils$9;
  var bind = bind$2;
  var Axios = Axios_1;
  var mergeConfig = mergeConfig$2;
  var defaults = defaults_1;

  /**
   * Create an instance of Axios
   *
   * @param {Object} defaultConfig The default config for the instance
   * @return {Axios} A new instance of Axios
   */
  function createInstance(defaultConfig) {
    var context = new Axios(defaultConfig);
    var instance = bind(Axios.prototype.request, context);

    // Copy axios.prototype to instance
    utils.extend(instance, Axios.prototype, context);

    // Copy context to instance
    utils.extend(instance, context);

    // Factory for creating new instances
    instance.create = function create(instanceConfig) {
      return createInstance(mergeConfig(defaultConfig, instanceConfig));
    };
    return instance;
  }

  // Create the default instance to be exported
  var axios$1 = createInstance(defaults);

  // Expose Axios class to allow class inheritance
  axios$1.Axios = Axios;

  // Expose Cancel & CancelToken
  axios$1.CanceledError = requireCanceledError();
  axios$1.CancelToken = requireCancelToken();
  axios$1.isCancel = requireIsCancel();
  axios$1.VERSION = requireData().version;
  axios$1.toFormData = requireToFormData();

  // Expose AxiosError class
  axios$1.AxiosError = requireAxiosError();

  // alias for CanceledError for backward compatibility
  axios$1.Cancel = axios$1.CanceledError;

  // Expose all/spread
  axios$1.all = function all(promises) {
    return Promise.all(promises);
  };
  axios$1.spread = requireSpread();

  // Expose isAxiosError
  axios$1.isAxiosError = requireIsAxiosError();
  axios$2.exports = axios$1;

  // Allow use of default import syntax in TypeScript
  axiosExports["default"] = axios$1;

  (function (module) {
    module.exports = axiosExports;
  })(axios$3);
  var axios = /*@__PURE__*/getDefaultExportFromCjs(axiosExports$1);

  var PACKET_TYPES = Object.create(null); // no Map = no polyfill
  PACKET_TYPES["open"] = "0";
  PACKET_TYPES["close"] = "1";
  PACKET_TYPES["ping"] = "2";
  PACKET_TYPES["pong"] = "3";
  PACKET_TYPES["message"] = "4";
  PACKET_TYPES["upgrade"] = "5";
  PACKET_TYPES["noop"] = "6";
  var PACKET_TYPES_REVERSE = Object.create(null);
  Object.keys(PACKET_TYPES).forEach(function (key) {
    PACKET_TYPES_REVERSE[PACKET_TYPES[key]] = key;
  });
  var ERROR_PACKET = {
    type: "error",
    data: "parser error"
  };

  var withNativeBlob$1 = typeof Blob === "function" || typeof Blob !== "undefined" && Object.prototype.toString.call(Blob) === "[object BlobConstructor]";
  var withNativeArrayBuffer$2 = typeof ArrayBuffer === "function";
  // ArrayBuffer.isView method is not defined in IE10
  var isView$1 = function isView(obj) {
    return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj && obj.buffer instanceof ArrayBuffer;
  };
  var encodePacket = function encodePacket(_ref, supportsBinary, callback) {
    var type = _ref.type,
      data = _ref.data;
    if (withNativeBlob$1 && data instanceof Blob) {
      if (supportsBinary) {
        return callback(data);
      } else {
        return encodeBlobAsBase64(data, callback);
      }
    } else if (withNativeArrayBuffer$2 && (data instanceof ArrayBuffer || isView$1(data))) {
      if (supportsBinary) {
        return callback(data);
      } else {
        return encodeBlobAsBase64(new Blob([data]), callback);
      }
    }
    // plain string
    return callback(PACKET_TYPES[type] + (data || ""));
  };
  var encodeBlobAsBase64 = function encodeBlobAsBase64(data, callback) {
    var fileReader = new FileReader();
    fileReader.onload = function () {
      var content = fileReader.result.split(",")[1];
      callback("b" + (content || ""));
    };
    return fileReader.readAsDataURL(data);
  };

  // imported from https://github.com/socketio/base64-arraybuffer
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  // Use a lookup table to find the index.
  var lookup$1 = typeof Uint8Array === 'undefined' ? [] : new Uint8Array(256);
  for (var i$1 = 0; i$1 < chars.length; i$1++) {
    lookup$1[chars.charCodeAt(i$1)] = i$1;
  }
  var decode$1 = function decode(base64) {
    var bufferLength = base64.length * 0.75,
      len = base64.length,
      i,
      p = 0,
      encoded1,
      encoded2,
      encoded3,
      encoded4;
    if (base64[base64.length - 1] === '=') {
      bufferLength--;
      if (base64[base64.length - 2] === '=') {
        bufferLength--;
      }
    }
    var arraybuffer = new ArrayBuffer(bufferLength),
      bytes = new Uint8Array(arraybuffer);
    for (i = 0; i < len; i += 4) {
      encoded1 = lookup$1[base64.charCodeAt(i)];
      encoded2 = lookup$1[base64.charCodeAt(i + 1)];
      encoded3 = lookup$1[base64.charCodeAt(i + 2)];
      encoded4 = lookup$1[base64.charCodeAt(i + 3)];
      bytes[p++] = encoded1 << 2 | encoded2 >> 4;
      bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
      bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
    }
    return arraybuffer;
  };

  var withNativeArrayBuffer$1 = typeof ArrayBuffer === "function";
  var decodePacket = function decodePacket(encodedPacket, binaryType) {
    if (typeof encodedPacket !== "string") {
      return {
        type: "message",
        data: mapBinary(encodedPacket, binaryType)
      };
    }
    var type = encodedPacket.charAt(0);
    if (type === "b") {
      return {
        type: "message",
        data: decodeBase64Packet(encodedPacket.substring(1), binaryType)
      };
    }
    var packetType = PACKET_TYPES_REVERSE[type];
    if (!packetType) {
      return ERROR_PACKET;
    }
    return encodedPacket.length > 1 ? {
      type: PACKET_TYPES_REVERSE[type],
      data: encodedPacket.substring(1)
    } : {
      type: PACKET_TYPES_REVERSE[type]
    };
  };
  var decodeBase64Packet = function decodeBase64Packet(data, binaryType) {
    if (withNativeArrayBuffer$1) {
      var decoded = decode$1(data);
      return mapBinary(decoded, binaryType);
    } else {
      return {
        base64: true,
        data: data
      }; // fallback for old browsers
    }
  };

  var mapBinary = function mapBinary(data, binaryType) {
    switch (binaryType) {
      case "blob":
        return data instanceof ArrayBuffer ? new Blob([data]) : data;
      case "arraybuffer":
      default:
        return data;
      // assuming the data is already an ArrayBuffer
    }
  };

  var SEPARATOR = String.fromCharCode(30); // see https://en.wikipedia.org/wiki/Delimiter#ASCII_delimited_text
  var encodePayload = function encodePayload(packets, callback) {
    // some packets may be added to the array while encoding, so the initial length must be saved
    var length = packets.length;
    var encodedPackets = new Array(length);
    var count = 0;
    packets.forEach(function (packet, i) {
      // force base64 encoding for binary packets
      encodePacket(packet, false, function (encodedPacket) {
        encodedPackets[i] = encodedPacket;
        if (++count === length) {
          callback(encodedPackets.join(SEPARATOR));
        }
      });
    });
  };
  var decodePayload = function decodePayload(encodedPayload, binaryType) {
    var encodedPackets = encodedPayload.split(SEPARATOR);
    var packets = [];
    for (var i = 0; i < encodedPackets.length; i++) {
      var decodedPacket = decodePacket(encodedPackets[i], binaryType);
      packets.push(decodedPacket);
      if (decodedPacket.type === "error") {
        break;
      }
    }
    return packets;
  };
  var protocol$1 = 4;

  /**
   * Initialize a new `Emitter`.
   *
   * @api public
   */

  function Emitter(obj) {
    if (obj) return mixin(obj);
  }

  /**
   * Mixin the emitter properties.
   *
   * @param {Object} obj
   * @return {Object}
   * @api private
   */

  function mixin(obj) {
    for (var key in Emitter.prototype) {
      obj[key] = Emitter.prototype[key];
    }
    return obj;
  }

  /**
   * Listen on the given `event` with `fn`.
   *
   * @param {String} event
   * @param {Function} fn
   * @return {Emitter}
   * @api public
   */

  Emitter.prototype.on = Emitter.prototype.addEventListener = function (event, fn) {
    this._callbacks = this._callbacks || {};
    (this._callbacks['$' + event] = this._callbacks['$' + event] || []).push(fn);
    return this;
  };

  /**
   * Adds an `event` listener that will be invoked a single
   * time then automatically removed.
   *
   * @param {String} event
   * @param {Function} fn
   * @return {Emitter}
   * @api public
   */

  Emitter.prototype.once = function (event, fn) {
    function on() {
      this.off(event, on);
      fn.apply(this, arguments);
    }
    on.fn = fn;
    this.on(event, on);
    return this;
  };

  /**
   * Remove the given callback for `event` or all
   * registered callbacks.
   *
   * @param {String} event
   * @param {Function} fn
   * @return {Emitter}
   * @api public
   */

  Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function (event, fn) {
    this._callbacks = this._callbacks || {};

    // all
    if (0 == arguments.length) {
      this._callbacks = {};
      return this;
    }

    // specific event
    var callbacks = this._callbacks['$' + event];
    if (!callbacks) return this;

    // remove all handlers
    if (1 == arguments.length) {
      delete this._callbacks['$' + event];
      return this;
    }

    // remove specific handler
    var cb;
    for (var i = 0; i < callbacks.length; i++) {
      cb = callbacks[i];
      if (cb === fn || cb.fn === fn) {
        callbacks.splice(i, 1);
        break;
      }
    }

    // Remove event specific arrays for event types that no
    // one is subscribed for to avoid memory leak.
    if (callbacks.length === 0) {
      delete this._callbacks['$' + event];
    }
    return this;
  };

  /**
   * Emit `event` with the given args.
   *
   * @param {String} event
   * @param {Mixed} ...
   * @return {Emitter}
   */

  Emitter.prototype.emit = function (event) {
    this._callbacks = this._callbacks || {};
    var args = new Array(arguments.length - 1),
      callbacks = this._callbacks['$' + event];
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
    if (callbacks) {
      callbacks = callbacks.slice(0);
      for (var i = 0, len = callbacks.length; i < len; ++i) {
        callbacks[i].apply(this, args);
      }
    }
    return this;
  };

  // alias used for reserved events (protected method)
  Emitter.prototype.emitReserved = Emitter.prototype.emit;

  /**
   * Return array of callbacks for `event`.
   *
   * @param {String} event
   * @return {Array}
   * @api public
   */

  Emitter.prototype.listeners = function (event) {
    this._callbacks = this._callbacks || {};
    return this._callbacks['$' + event] || [];
  };

  /**
   * Check if this emitter has `event` handlers.
   *
   * @param {String} event
   * @return {Boolean}
   * @api public
   */

  Emitter.prototype.hasListeners = function (event) {
    return !!this.listeners(event).length;
  };

  var globalThisShim = function () {
    if (typeof self !== "undefined") {
      return self;
    } else if (typeof window !== "undefined") {
      return window;
    } else {
      return Function("return this")();
    }
  }();

  function pick(obj) {
    for (var _len = arguments.length, attr = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      attr[_key - 1] = arguments[_key];
    }
    return attr.reduce(function (acc, k) {
      if (obj.hasOwnProperty(k)) {
        acc[k] = obj[k];
      }
      return acc;
    }, {});
  }
  // Keep a reference to the real timeout functions so they can be used when overridden
  var NATIVE_SET_TIMEOUT = globalThisShim.setTimeout;
  var NATIVE_CLEAR_TIMEOUT = globalThisShim.clearTimeout;
  function installTimerFunctions(obj, opts) {
    if (opts.useNativeTimers) {
      obj.setTimeoutFn = NATIVE_SET_TIMEOUT.bind(globalThisShim);
      obj.clearTimeoutFn = NATIVE_CLEAR_TIMEOUT.bind(globalThisShim);
    } else {
      obj.setTimeoutFn = globalThisShim.setTimeout.bind(globalThisShim);
      obj.clearTimeoutFn = globalThisShim.clearTimeout.bind(globalThisShim);
    }
  }
  // base64 encoded buffers are about 33% bigger (https://en.wikipedia.org/wiki/Base64)
  var BASE64_OVERHEAD = 1.33;
  // we could also have used `new Blob([obj]).size`, but it isn't supported in IE9
  function byteLength(obj) {
    if (typeof obj === "string") {
      return utf8Length(obj);
    }
    // arraybuffer or blob
    return Math.ceil((obj.byteLength || obj.size) * BASE64_OVERHEAD);
  }
  function utf8Length(str) {
    var c = 0,
      length = 0;
    for (var i = 0, l = str.length; i < l; i++) {
      c = str.charCodeAt(i);
      if (c < 0x80) {
        length += 1;
      } else if (c < 0x800) {
        length += 2;
      } else if (c < 0xd800 || c >= 0xe000) {
        length += 3;
      } else {
        i++;
        length += 4;
      }
    }
    return length;
  }

  var TransportError = /*#__PURE__*/function (_Error) {
    _inherits(TransportError, _Error);
    var _super = _createSuper(TransportError);
    function TransportError(reason, description, context) {
      var _this;
      _classCallCheck(this, TransportError);
      _this = _super.call(this, reason);
      _this.description = description;
      _this.context = context;
      _this.type = "TransportError";
      return _this;
    }
    return _createClass(TransportError);
  }( /*#__PURE__*/_wrapNativeSuper(Error));
  var Transport = /*#__PURE__*/function (_Emitter) {
    _inherits(Transport, _Emitter);
    var _super2 = _createSuper(Transport);
    /**
     * Transport abstract constructor.
     *
     * @param {Object} opts - options
     * @protected
     */
    function Transport(opts) {
      var _this2;
      _classCallCheck(this, Transport);
      _this2 = _super2.call(this);
      _this2.writable = false;
      installTimerFunctions(_assertThisInitialized(_this2), opts);
      _this2.opts = opts;
      _this2.query = opts.query;
      _this2.socket = opts.socket;
      return _this2;
    }
    /**
     * Emits an error.
     *
     * @param {String} reason
     * @param description
     * @param context - the error context
     * @return {Transport} for chaining
     * @protected
     */
    _createClass(Transport, [{
      key: "onError",
      value: function onError(reason, description, context) {
        _get(_getPrototypeOf(Transport.prototype), "emitReserved", this).call(this, "error", new TransportError(reason, description, context));
        return this;
      }
      /**
       * Opens the transport.
       */
    }, {
      key: "open",
      value: function open() {
        this.readyState = "opening";
        this.doOpen();
        return this;
      }
      /**
       * Closes the transport.
       */
    }, {
      key: "close",
      value: function close() {
        if (this.readyState === "opening" || this.readyState === "open") {
          this.doClose();
          this.onClose();
        }
        return this;
      }
      /**
       * Sends multiple packets.
       *
       * @param {Array} packets
       */
    }, {
      key: "send",
      value: function send(packets) {
        if (this.readyState === "open") {
          this.write(packets);
        }
      }
      /**
       * Called upon open
       *
       * @protected
       */
    }, {
      key: "onOpen",
      value: function onOpen() {
        this.readyState = "open";
        this.writable = true;
        _get(_getPrototypeOf(Transport.prototype), "emitReserved", this).call(this, "open");
      }
      /**
       * Called with data.
       *
       * @param {String} data
       * @protected
       */
    }, {
      key: "onData",
      value: function onData(data) {
        var packet = decodePacket(data, this.socket.binaryType);
        this.onPacket(packet);
      }
      /**
       * Called with a decoded packet.
       *
       * @protected
       */
    }, {
      key: "onPacket",
      value: function onPacket(packet) {
        _get(_getPrototypeOf(Transport.prototype), "emitReserved", this).call(this, "packet", packet);
      }
      /**
       * Called upon close.
       *
       * @protected
       */
    }, {
      key: "onClose",
      value: function onClose(details) {
        this.readyState = "closed";
        _get(_getPrototypeOf(Transport.prototype), "emitReserved", this).call(this, "close", details);
      }
      /**
       * Pauses the transport, in order not to lose packets during an upgrade.
       *
       * @param onPause
       */
    }, {
      key: "pause",
      value: function pause(onPause) {}
    }]);
    return Transport;
  }(Emitter);

  // imported from https://github.com/unshiftio/yeast

  var alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split(''),
    length = 64,
    map = {};
  var seed = 0,
    i = 0,
    prev;
  /**
   * Return a string representing the specified number.
   *
   * @param {Number} num The number to convert.
   * @returns {String} The string representation of the number.
   * @api public
   */
  function encode$1(num) {
    var encoded = '';
    do {
      encoded = alphabet[num % length] + encoded;
      num = Math.floor(num / length);
    } while (num > 0);
    return encoded;
  }
  /**
   * Yeast: A tiny growing id generator.
   *
   * @returns {String} A unique id.
   * @api public
   */
  function yeast() {
    var now = encode$1(+new Date());
    if (now !== prev) return seed = 0, prev = now;
    return now + '.' + encode$1(seed++);
  }
  //
  // Map each character to its index.
  //
  for (; i < length; i++) map[alphabet[i]] = i;

  // imported from https://github.com/galkn/querystring
  /**
   * Compiles a querystring
   * Returns string representation of the object
   *
   * @param {Object}
   * @api private
   */
  function encode(obj) {
    var str = '';
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        if (str.length) str += '&';
        str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
      }
    }
    return str;
  }
  /**
   * Parses a simple querystring into an object
   *
   * @param {String} qs
   * @api private
   */
  function decode(qs) {
    var qry = {};
    var pairs = qs.split('&');
    for (var i = 0, l = pairs.length; i < l; i++) {
      var pair = pairs[i].split('=');
      qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }
    return qry;
  }

  // imported from https://github.com/component/has-cors
  var value = false;
  try {
    value = typeof XMLHttpRequest !== 'undefined' && 'withCredentials' in new XMLHttpRequest();
  } catch (err) {
    // if XMLHttp support is disabled in IE then it will throw
    // when trying to create
  }
  var hasCORS = value;

  // browser shim for xmlhttprequest module
  function XHR(opts) {
    var xdomain = opts.xdomain;
    // XMLHttpRequest can be disabled on IE
    try {
      if ("undefined" !== typeof XMLHttpRequest && (!xdomain || hasCORS)) {
        return new XMLHttpRequest();
      }
    } catch (e) {}
    if (!xdomain) {
      try {
        return new globalThisShim[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
      } catch (e) {}
    }
  }

  function empty() {}
  var hasXHR2 = function () {
    var xhr = new XHR({
      xdomain: false
    });
    return null != xhr.responseType;
  }();
  var Polling = /*#__PURE__*/function (_Transport) {
    _inherits(Polling, _Transport);
    var _super = _createSuper(Polling);
    /**
     * XHR Polling constructor.
     *
     * @param {Object} opts
     * @package
     */
    function Polling(opts) {
      var _this;
      _classCallCheck(this, Polling);
      _this = _super.call(this, opts);
      _this.polling = false;
      if (typeof location !== "undefined") {
        var isSSL = "https:" === location.protocol;
        var port = location.port;
        // some user agents have empty `location.port`
        if (!port) {
          port = isSSL ? "443" : "80";
        }
        _this.xd = typeof location !== "undefined" && opts.hostname !== location.hostname || port !== opts.port;
        _this.xs = opts.secure !== isSSL;
      }
      /**
       * XHR supports binary
       */
      var forceBase64 = opts && opts.forceBase64;
      _this.supportsBinary = hasXHR2 && !forceBase64;
      return _this;
    }
    _createClass(Polling, [{
      key: "name",
      get: function get() {
        return "polling";
      }
      /**
       * Opens the socket (triggers polling). We write a PING message to determine
       * when the transport is open.
       *
       * @protected
       */
    }, {
      key: "doOpen",
      value: function doOpen() {
        this.poll();
      }
      /**
       * Pauses polling.
       *
       * @param {Function} onPause - callback upon buffers are flushed and transport is paused
       * @package
       */
    }, {
      key: "pause",
      value: function pause(onPause) {
        var _this2 = this;
        this.readyState = "pausing";
        var pause = function pause() {
          _this2.readyState = "paused";
          onPause();
        };
        if (this.polling || !this.writable) {
          var total = 0;
          if (this.polling) {
            total++;
            this.once("pollComplete", function () {
              --total || pause();
            });
          }
          if (!this.writable) {
            total++;
            this.once("drain", function () {
              --total || pause();
            });
          }
        } else {
          pause();
        }
      }
      /**
       * Starts polling cycle.
       *
       * @private
       */
    }, {
      key: "poll",
      value: function poll() {
        this.polling = true;
        this.doPoll();
        this.emitReserved("poll");
      }
      /**
       * Overloads onData to detect payloads.
       *
       * @protected
       */
    }, {
      key: "onData",
      value: function onData(data) {
        var _this3 = this;
        var callback = function callback(packet) {
          // if its the first message we consider the transport open
          if ("opening" === _this3.readyState && packet.type === "open") {
            _this3.onOpen();
          }
          // if its a close packet, we close the ongoing requests
          if ("close" === packet.type) {
            _this3.onClose({
              description: "transport closed by the server"
            });
            return false;
          }
          // otherwise bypass onData and handle the message
          _this3.onPacket(packet);
        };
        // decode payload
        decodePayload(data, this.socket.binaryType).forEach(callback);
        // if an event did not trigger closing
        if ("closed" !== this.readyState) {
          // if we got data we're not polling
          this.polling = false;
          this.emitReserved("pollComplete");
          if ("open" === this.readyState) {
            this.poll();
          }
        }
      }
      /**
       * For polling, send a close packet.
       *
       * @protected
       */
    }, {
      key: "doClose",
      value: function doClose() {
        var _this4 = this;
        var close = function close() {
          _this4.write([{
            type: "close"
          }]);
        };
        if ("open" === this.readyState) {
          close();
        } else {
          // in case we're trying to close while
          // handshaking is in progress (GH-164)
          this.once("open", close);
        }
      }
      /**
       * Writes a packets payload.
       *
       * @param {Array} packets - data packets
       * @protected
       */
    }, {
      key: "write",
      value: function write(packets) {
        var _this5 = this;
        this.writable = false;
        encodePayload(packets, function (data) {
          _this5.doWrite(data, function () {
            _this5.writable = true;
            _this5.emitReserved("drain");
          });
        });
      }
      /**
       * Generates uri for connection.
       *
       * @private
       */
    }, {
      key: "uri",
      value: function uri() {
        var query = this.query || {};
        var schema = this.opts.secure ? "https" : "http";
        var port = "";
        // cache busting is forced
        if (false !== this.opts.timestampRequests) {
          query[this.opts.timestampParam] = yeast();
        }
        if (!this.supportsBinary && !query.sid) {
          query.b64 = 1;
        }
        // avoid port if default for schema
        if (this.opts.port && ("https" === schema && Number(this.opts.port) !== 443 || "http" === schema && Number(this.opts.port) !== 80)) {
          port = ":" + this.opts.port;
        }
        var encodedQuery = encode(query);
        var ipv6 = this.opts.hostname.indexOf(":") !== -1;
        return schema + "://" + (ipv6 ? "[" + this.opts.hostname + "]" : this.opts.hostname) + port + this.opts.path + (encodedQuery.length ? "?" + encodedQuery : "");
      }
      /**
       * Creates a request.
       *
       * @param {String} method
       * @private
       */
    }, {
      key: "request",
      value: function request() {
        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        _extends(opts, {
          xd: this.xd,
          xs: this.xs
        }, this.opts);
        return new Request(this.uri(), opts);
      }
      /**
       * Sends data.
       *
       * @param {String} data to send.
       * @param {Function} called upon flush.
       * @private
       */
    }, {
      key: "doWrite",
      value: function doWrite(data, fn) {
        var _this6 = this;
        var req = this.request({
          method: "POST",
          data: data
        });
        req.on("success", fn);
        req.on("error", function (xhrStatus, context) {
          _this6.onError("xhr post error", xhrStatus, context);
        });
      }
      /**
       * Starts a poll cycle.
       *
       * @private
       */
    }, {
      key: "doPoll",
      value: function doPoll() {
        var _this7 = this;
        var req = this.request();
        req.on("data", this.onData.bind(this));
        req.on("error", function (xhrStatus, context) {
          _this7.onError("xhr poll error", xhrStatus, context);
        });
        this.pollXhr = req;
      }
    }]);
    return Polling;
  }(Transport);
  var Request = /*#__PURE__*/function (_Emitter) {
    _inherits(Request, _Emitter);
    var _super2 = _createSuper(Request);
    /**
     * Request constructor
     *
     * @param {Object} options
     * @package
     */
    function Request(uri, opts) {
      var _this8;
      _classCallCheck(this, Request);
      _this8 = _super2.call(this);
      installTimerFunctions(_assertThisInitialized(_this8), opts);
      _this8.opts = opts;
      _this8.method = opts.method || "GET";
      _this8.uri = uri;
      _this8.async = false !== opts.async;
      _this8.data = undefined !== opts.data ? opts.data : null;
      _this8.create();
      return _this8;
    }
    /**
     * Creates the XHR object and sends the request.
     *
     * @private
     */
    _createClass(Request, [{
      key: "create",
      value: function create() {
        var _this9 = this;
        var opts = pick(this.opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
        opts.xdomain = !!this.opts.xd;
        opts.xscheme = !!this.opts.xs;
        var xhr = this.xhr = new XHR(opts);
        try {
          xhr.open(this.method, this.uri, this.async);
          try {
            if (this.opts.extraHeaders) {
              xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
              for (var i in this.opts.extraHeaders) {
                if (this.opts.extraHeaders.hasOwnProperty(i)) {
                  xhr.setRequestHeader(i, this.opts.extraHeaders[i]);
                }
              }
            }
          } catch (e) {}
          if ("POST" === this.method) {
            try {
              xhr.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
            } catch (e) {}
          }
          try {
            xhr.setRequestHeader("Accept", "*/*");
          } catch (e) {}
          // ie6 check
          if ("withCredentials" in xhr) {
            xhr.withCredentials = this.opts.withCredentials;
          }
          if (this.opts.requestTimeout) {
            xhr.timeout = this.opts.requestTimeout;
          }
          xhr.onreadystatechange = function () {
            if (4 !== xhr.readyState) return;
            if (200 === xhr.status || 1223 === xhr.status) {
              _this9.onLoad();
            } else {
              // make sure the `error` event handler that's user-set
              // does not throw in the same tick and gets caught here
              _this9.setTimeoutFn(function () {
                _this9.onError(typeof xhr.status === "number" ? xhr.status : 0);
              }, 0);
            }
          };
          xhr.send(this.data);
        } catch (e) {
          // Need to defer since .create() is called directly from the constructor
          // and thus the 'error' event can only be only bound *after* this exception
          // occurs.  Therefore, also, we cannot throw here at all.
          this.setTimeoutFn(function () {
            _this9.onError(e);
          }, 0);
          return;
        }
        if (typeof document !== "undefined") {
          this.index = Request.requestsCount++;
          Request.requests[this.index] = this;
        }
      }
      /**
       * Called upon error.
       *
       * @private
       */
    }, {
      key: "onError",
      value: function onError(err) {
        this.emitReserved("error", err, this.xhr);
        this.cleanup(true);
      }
      /**
       * Cleans up house.
       *
       * @private
       */
    }, {
      key: "cleanup",
      value: function cleanup(fromError) {
        if ("undefined" === typeof this.xhr || null === this.xhr) {
          return;
        }
        this.xhr.onreadystatechange = empty;
        if (fromError) {
          try {
            this.xhr.abort();
          } catch (e) {}
        }
        if (typeof document !== "undefined") {
          delete Request.requests[this.index];
        }
        this.xhr = null;
      }
      /**
       * Called upon load.
       *
       * @private
       */
    }, {
      key: "onLoad",
      value: function onLoad() {
        var data = this.xhr.responseText;
        if (data !== null) {
          this.emitReserved("data", data);
          this.emitReserved("success");
          this.cleanup();
        }
      }
      /**
       * Aborts the request.
       *
       * @package
       */
    }, {
      key: "abort",
      value: function abort() {
        this.cleanup();
      }
    }]);
    return Request;
  }(Emitter);
  Request.requestsCount = 0;
  Request.requests = {};
  /**
   * Aborts pending requests when unloading the window. This is needed to prevent
   * memory leaks (e.g. when using IE) and to ensure that no spurious error is
   * emitted.
   */
  if (typeof document !== "undefined") {
    // @ts-ignore
    if (typeof attachEvent === "function") {
      // @ts-ignore
      attachEvent("onunload", unloadHandler);
    } else if (typeof addEventListener === "function") {
      var terminationEvent = "onpagehide" in globalThisShim ? "pagehide" : "unload";
      addEventListener(terminationEvent, unloadHandler, false);
    }
  }
  function unloadHandler() {
    for (var i in Request.requests) {
      if (Request.requests.hasOwnProperty(i)) {
        Request.requests[i].abort();
      }
    }
  }

  var nextTick = function () {
    var isPromiseAvailable = typeof Promise === "function" && typeof Promise.resolve === "function";
    if (isPromiseAvailable) {
      return function (cb) {
        return Promise.resolve().then(cb);
      };
    } else {
      return function (cb, setTimeoutFn) {
        return setTimeoutFn(cb, 0);
      };
    }
  }();
  var WebSocket = globalThisShim.WebSocket || globalThisShim.MozWebSocket;
  var usingBrowserWebSocket = true;
  var defaultBinaryType = "arraybuffer";

  // detect ReactNative environment
  var isReactNative = typeof navigator !== "undefined" && typeof navigator.product === "string" && navigator.product.toLowerCase() === "reactnative";
  var WS = /*#__PURE__*/function (_Transport) {
    _inherits(WS, _Transport);
    var _super = _createSuper(WS);
    /**
     * WebSocket transport constructor.
     *
     * @param {Object} opts - connection options
     * @protected
     */
    function WS(opts) {
      var _this;
      _classCallCheck(this, WS);
      _this = _super.call(this, opts);
      _this.supportsBinary = !opts.forceBase64;
      return _this;
    }
    _createClass(WS, [{
      key: "name",
      get: function get() {
        return "websocket";
      }
    }, {
      key: "doOpen",
      value: function doOpen() {
        if (!this.check()) {
          // let probe timeout
          return;
        }
        var uri = this.uri();
        var protocols = this.opts.protocols;
        // React Native only supports the 'headers' option, and will print a warning if anything else is passed
        var opts = isReactNative ? {} : pick(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
        if (this.opts.extraHeaders) {
          opts.headers = this.opts.extraHeaders;
        }
        try {
          this.ws = usingBrowserWebSocket && !isReactNative ? protocols ? new WebSocket(uri, protocols) : new WebSocket(uri) : new WebSocket(uri, protocols, opts);
        } catch (err) {
          return this.emitReserved("error", err);
        }
        this.ws.binaryType = this.socket.binaryType || defaultBinaryType;
        this.addEventListeners();
      }
      /**
       * Adds event listeners to the socket
       *
       * @private
       */
    }, {
      key: "addEventListeners",
      value: function addEventListeners() {
        var _this2 = this;
        this.ws.onopen = function () {
          if (_this2.opts.autoUnref) {
            _this2.ws._socket.unref();
          }
          _this2.onOpen();
        };
        this.ws.onclose = function (closeEvent) {
          return _this2.onClose({
            description: "websocket connection closed",
            context: closeEvent
          });
        };
        this.ws.onmessage = function (ev) {
          return _this2.onData(ev.data);
        };
        this.ws.onerror = function (e) {
          return _this2.onError("websocket error", e);
        };
      }
    }, {
      key: "write",
      value: function write(packets) {
        var _this3 = this;
        this.writable = false;
        // encodePacket efficient as it uses WS framing
        // no need for encodePayload
        var _loop = function _loop() {
          var packet = packets[i];
          var lastPacket = i === packets.length - 1;
          encodePacket(packet, _this3.supportsBinary, function (data) {
            // always create a new object (GH-437)
            var opts = {};
            // Sometimes the websocket has already been closed but the browser didn't
            // have a chance of informing us about it yet, in that case send will
            // throw an error
            try {
              if (usingBrowserWebSocket) {
                // TypeError is thrown when passing the second argument on Safari
                _this3.ws.send(data);
              }
            } catch (e) {}
            if (lastPacket) {
              // fake drain
              // defer to next tick to allow Socket to clear writeBuffer
              nextTick(function () {
                _this3.writable = true;
                _this3.emitReserved("drain");
              }, _this3.setTimeoutFn);
            }
          });
        };
        for (var i = 0; i < packets.length; i++) {
          _loop();
        }
      }
    }, {
      key: "doClose",
      value: function doClose() {
        if (typeof this.ws !== "undefined") {
          this.ws.close();
          this.ws = null;
        }
      }
      /**
       * Generates uri for connection.
       *
       * @private
       */
    }, {
      key: "uri",
      value: function uri() {
        var query = this.query || {};
        var schema = this.opts.secure ? "wss" : "ws";
        var port = "";
        // avoid port if default for schema
        if (this.opts.port && ("wss" === schema && Number(this.opts.port) !== 443 || "ws" === schema && Number(this.opts.port) !== 80)) {
          port = ":" + this.opts.port;
        }
        // append timestamp to URI
        if (this.opts.timestampRequests) {
          query[this.opts.timestampParam] = yeast();
        }
        // communicate binary support capabilities
        if (!this.supportsBinary) {
          query.b64 = 1;
        }
        var encodedQuery = encode(query);
        var ipv6 = this.opts.hostname.indexOf(":") !== -1;
        return schema + "://" + (ipv6 ? "[" + this.opts.hostname + "]" : this.opts.hostname) + port + this.opts.path + (encodedQuery.length ? "?" + encodedQuery : "");
      }
      /**
       * Feature detection for WebSocket.
       *
       * @return {Boolean} whether this transport is available.
       * @private
       */
    }, {
      key: "check",
      value: function check() {
        return !!WebSocket;
      }
    }]);
    return WS;
  }(Transport);

  var transports = {
    websocket: WS,
    polling: Polling
  };

  // imported from https://github.com/galkn/parseuri
  /**
   * Parses a URI
   *
   * Note: we could also have used the built-in URL object, but it isn't supported on all platforms.
   *
   * See:
   * - https://developer.mozilla.org/en-US/docs/Web/API/URL
   * - https://caniuse.com/url
   * - https://www.rfc-editor.org/rfc/rfc3986#appendix-B
   *
   * History of the parse() method:
   * - first commit: https://github.com/socketio/socket.io-client/commit/4ee1d5d94b3906a9c052b459f1a818b15f38f91c
   * - export into its own module: https://github.com/socketio/engine.io-client/commit/de2c561e4564efeb78f1bdb1ba39ef81b2822cb3
   * - reimport: https://github.com/socketio/engine.io-client/commit/df32277c3f6d622eec5ed09f493cae3f3391d242
   *
   * @author Steven Levithan <stevenlevithan.com> (MIT license)
   * @api private
   */
  var re = /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
  var parts = ['source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'];
  function parse(str) {
    var src = str,
      b = str.indexOf('['),
      e = str.indexOf(']');
    if (b != -1 && e != -1) {
      str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
    }
    var m = re.exec(str || ''),
      uri = {},
      i = 14;
    while (i--) {
      uri[parts[i]] = m[i] || '';
    }
    if (b != -1 && e != -1) {
      uri.source = src;
      uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
      uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
      uri.ipv6uri = true;
    }
    uri.pathNames = pathNames(uri, uri['path']);
    uri.queryKey = queryKey(uri, uri['query']);
    return uri;
  }
  function pathNames(obj, path) {
    var regx = /\/{2,9}/g,
      names = path.replace(regx, "/").split("/");
    if (path.slice(0, 1) == '/' || path.length === 0) {
      names.splice(0, 1);
    }
    if (path.slice(-1) == '/') {
      names.splice(names.length - 1, 1);
    }
    return names;
  }
  function queryKey(uri, query) {
    var data = {};
    query.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function ($0, $1, $2) {
      if ($1) {
        data[$1] = $2;
      }
    });
    return data;
  }

  var Socket$1 = /*#__PURE__*/function (_Emitter) {
    _inherits(Socket, _Emitter);
    var _super = _createSuper(Socket);
    /**
     * Socket constructor.
     *
     * @param {String|Object} uri - uri or options
     * @param {Object} opts - options
     */
    function Socket(uri) {
      var _this;
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      _classCallCheck(this, Socket);
      _this = _super.call(this);
      _this.writeBuffer = [];
      if (uri && "object" === _typeof(uri)) {
        opts = uri;
        uri = null;
      }
      if (uri) {
        uri = parse(uri);
        opts.hostname = uri.host;
        opts.secure = uri.protocol === "https" || uri.protocol === "wss";
        opts.port = uri.port;
        if (uri.query) opts.query = uri.query;
      } else if (opts.host) {
        opts.hostname = parse(opts.host).host;
      }
      installTimerFunctions(_assertThisInitialized(_this), opts);
      _this.secure = null != opts.secure ? opts.secure : typeof location !== "undefined" && "https:" === location.protocol;
      if (opts.hostname && !opts.port) {
        // if no port is specified manually, use the protocol default
        opts.port = _this.secure ? "443" : "80";
      }
      _this.hostname = opts.hostname || (typeof location !== "undefined" ? location.hostname : "localhost");
      _this.port = opts.port || (typeof location !== "undefined" && location.port ? location.port : _this.secure ? "443" : "80");
      _this.transports = opts.transports || ["polling", "websocket"];
      _this.writeBuffer = [];
      _this.prevBufferLen = 0;
      _this.opts = _extends({
        path: "/engine.io",
        agent: false,
        withCredentials: false,
        upgrade: true,
        timestampParam: "t",
        rememberUpgrade: false,
        addTrailingSlash: true,
        rejectUnauthorized: true,
        perMessageDeflate: {
          threshold: 1024
        },
        transportOptions: {},
        closeOnBeforeunload: true
      }, opts);
      _this.opts.path = _this.opts.path.replace(/\/$/, "") + (_this.opts.addTrailingSlash ? "/" : "");
      if (typeof _this.opts.query === "string") {
        _this.opts.query = decode(_this.opts.query);
      }
      // set on handshake
      _this.id = null;
      _this.upgrades = null;
      _this.pingInterval = null;
      _this.pingTimeout = null;
      // set on heartbeat
      _this.pingTimeoutTimer = null;
      if (typeof addEventListener === "function") {
        if (_this.opts.closeOnBeforeunload) {
          // Firefox closes the connection when the "beforeunload" event is emitted but not Chrome. This event listener
          // ensures every browser behaves the same (no "disconnect" event at the Socket.IO level when the page is
          // closed/reloaded)
          _this.beforeunloadEventListener = function () {
            if (_this.transport) {
              // silently close the transport
              _this.transport.removeAllListeners();
              _this.transport.close();
            }
          };
          addEventListener("beforeunload", _this.beforeunloadEventListener, false);
        }
        if (_this.hostname !== "localhost") {
          _this.offlineEventListener = function () {
            _this.onClose("transport close", {
              description: "network connection lost"
            });
          };
          addEventListener("offline", _this.offlineEventListener, false);
        }
      }
      _this.open();
      return _this;
    }
    /**
     * Creates transport of the given type.
     *
     * @param {String} name - transport name
     * @return {Transport}
     * @private
     */
    _createClass(Socket, [{
      key: "createTransport",
      value: function createTransport(name) {
        var query = _extends({}, this.opts.query);
        // append engine.io protocol identifier
        query.EIO = protocol$1;
        // transport name
        query.transport = name;
        // session id if we already have one
        if (this.id) query.sid = this.id;
        var opts = _extends({}, this.opts.transportOptions[name], this.opts, {
          query: query,
          socket: this,
          hostname: this.hostname,
          secure: this.secure,
          port: this.port
        });
        return new transports[name](opts);
      }
      /**
       * Initializes transport to use and starts probe.
       *
       * @private
       */
    }, {
      key: "open",
      value: function open() {
        var _this2 = this;
        var transport;
        if (this.opts.rememberUpgrade && Socket.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1) {
          transport = "websocket";
        } else if (0 === this.transports.length) {
          // Emit error on next tick so it can be listened to
          this.setTimeoutFn(function () {
            _this2.emitReserved("error", "No transports available");
          }, 0);
          return;
        } else {
          transport = this.transports[0];
        }
        this.readyState = "opening";
        // Retry with the next transport if the transport is disabled (jsonp: false)
        try {
          transport = this.createTransport(transport);
        } catch (e) {
          this.transports.shift();
          this.open();
          return;
        }
        transport.open();
        this.setTransport(transport);
      }
      /**
       * Sets the current transport. Disables the existing one (if any).
       *
       * @private
       */
    }, {
      key: "setTransport",
      value: function setTransport(transport) {
        var _this3 = this;
        if (this.transport) {
          this.transport.removeAllListeners();
        }
        // set up transport
        this.transport = transport;
        // set up transport listeners
        transport.on("drain", this.onDrain.bind(this)).on("packet", this.onPacket.bind(this)).on("error", this.onError.bind(this)).on("close", function (reason) {
          return _this3.onClose("transport close", reason);
        });
      }
      /**
       * Probes a transport.
       *
       * @param {String} name - transport name
       * @private
       */
    }, {
      key: "probe",
      value: function probe(name) {
        var _this4 = this;
        var transport = this.createTransport(name);
        var failed = false;
        Socket.priorWebsocketSuccess = false;
        var onTransportOpen = function onTransportOpen() {
          if (failed) return;
          transport.send([{
            type: "ping",
            data: "probe"
          }]);
          transport.once("packet", function (msg) {
            if (failed) return;
            if ("pong" === msg.type && "probe" === msg.data) {
              _this4.upgrading = true;
              _this4.emitReserved("upgrading", transport);
              if (!transport) return;
              Socket.priorWebsocketSuccess = "websocket" === transport.name;
              _this4.transport.pause(function () {
                if (failed) return;
                if ("closed" === _this4.readyState) return;
                cleanup();
                _this4.setTransport(transport);
                transport.send([{
                  type: "upgrade"
                }]);
                _this4.emitReserved("upgrade", transport);
                transport = null;
                _this4.upgrading = false;
                _this4.flush();
              });
            } else {
              var err = new Error("probe error");
              // @ts-ignore
              err.transport = transport.name;
              _this4.emitReserved("upgradeError", err);
            }
          });
        };
        function freezeTransport() {
          if (failed) return;
          // Any callback called by transport should be ignored since now
          failed = true;
          cleanup();
          transport.close();
          transport = null;
        }
        // Handle any error that happens while probing
        var onerror = function onerror(err) {
          var error = new Error("probe error: " + err);
          // @ts-ignore
          error.transport = transport.name;
          freezeTransport();
          _this4.emitReserved("upgradeError", error);
        };
        function onTransportClose() {
          onerror("transport closed");
        }
        // When the socket is closed while we're probing
        function onclose() {
          onerror("socket closed");
        }
        // When the socket is upgraded while we're probing
        function onupgrade(to) {
          if (transport && to.name !== transport.name) {
            freezeTransport();
          }
        }
        // Remove all listeners on the transport and on self
        var cleanup = function cleanup() {
          transport.removeListener("open", onTransportOpen);
          transport.removeListener("error", onerror);
          transport.removeListener("close", onTransportClose);
          _this4.off("close", onclose);
          _this4.off("upgrading", onupgrade);
        };
        transport.once("open", onTransportOpen);
        transport.once("error", onerror);
        transport.once("close", onTransportClose);
        this.once("close", onclose);
        this.once("upgrading", onupgrade);
        transport.open();
      }
      /**
       * Called when connection is deemed open.
       *
       * @private
       */
    }, {
      key: "onOpen",
      value: function onOpen() {
        this.readyState = "open";
        Socket.priorWebsocketSuccess = "websocket" === this.transport.name;
        this.emitReserved("open");
        this.flush();
        // we check for `readyState` in case an `open`
        // listener already closed the socket
        if ("open" === this.readyState && this.opts.upgrade) {
          var i = 0;
          var l = this.upgrades.length;
          for (; i < l; i++) {
            this.probe(this.upgrades[i]);
          }
        }
      }
      /**
       * Handles a packet.
       *
       * @private
       */
    }, {
      key: "onPacket",
      value: function onPacket(packet) {
        if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
          this.emitReserved("packet", packet);
          // Socket is live - any packet counts
          this.emitReserved("heartbeat");
          switch (packet.type) {
            case "open":
              this.onHandshake(JSON.parse(packet.data));
              break;
            case "ping":
              this.resetPingTimeout();
              this.sendPacket("pong");
              this.emitReserved("ping");
              this.emitReserved("pong");
              break;
            case "error":
              var err = new Error("server error");
              // @ts-ignore
              err.code = packet.data;
              this.onError(err);
              break;
            case "message":
              this.emitReserved("data", packet.data);
              this.emitReserved("message", packet.data);
              break;
          }
        }
      }
      /**
       * Called upon handshake completion.
       *
       * @param {Object} data - handshake obj
       * @private
       */
    }, {
      key: "onHandshake",
      value: function onHandshake(data) {
        this.emitReserved("handshake", data);
        this.id = data.sid;
        this.transport.query.sid = data.sid;
        this.upgrades = this.filterUpgrades(data.upgrades);
        this.pingInterval = data.pingInterval;
        this.pingTimeout = data.pingTimeout;
        this.maxPayload = data.maxPayload;
        this.onOpen();
        // In case open handler closes socket
        if ("closed" === this.readyState) return;
        this.resetPingTimeout();
      }
      /**
       * Sets and resets ping timeout timer based on server pings.
       *
       * @private
       */
    }, {
      key: "resetPingTimeout",
      value: function resetPingTimeout() {
        var _this5 = this;
        this.clearTimeoutFn(this.pingTimeoutTimer);
        this.pingTimeoutTimer = this.setTimeoutFn(function () {
          _this5.onClose("ping timeout");
        }, this.pingInterval + this.pingTimeout);
        if (this.opts.autoUnref) {
          this.pingTimeoutTimer.unref();
        }
      }
      /**
       * Called on `drain` event
       *
       * @private
       */
    }, {
      key: "onDrain",
      value: function onDrain() {
        this.writeBuffer.splice(0, this.prevBufferLen);
        // setting prevBufferLen = 0 is very important
        // for example, when upgrading, upgrade packet is sent over,
        // and a nonzero prevBufferLen could cause problems on `drain`
        this.prevBufferLen = 0;
        if (0 === this.writeBuffer.length) {
          this.emitReserved("drain");
        } else {
          this.flush();
        }
      }
      /**
       * Flush write buffers.
       *
       * @private
       */
    }, {
      key: "flush",
      value: function flush() {
        if ("closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
          var packets = this.getWritablePackets();
          this.transport.send(packets);
          // keep track of current length of writeBuffer
          // splice writeBuffer and callbackBuffer on `drain`
          this.prevBufferLen = packets.length;
          this.emitReserved("flush");
        }
      }
      /**
       * Ensure the encoded size of the writeBuffer is below the maxPayload value sent by the server (only for HTTP
       * long-polling)
       *
       * @private
       */
    }, {
      key: "getWritablePackets",
      value: function getWritablePackets() {
        var shouldCheckPayloadSize = this.maxPayload && this.transport.name === "polling" && this.writeBuffer.length > 1;
        if (!shouldCheckPayloadSize) {
          return this.writeBuffer;
        }
        var payloadSize = 1; // first packet type
        for (var i = 0; i < this.writeBuffer.length; i++) {
          var data = this.writeBuffer[i].data;
          if (data) {
            payloadSize += byteLength(data);
          }
          if (i > 0 && payloadSize > this.maxPayload) {
            return this.writeBuffer.slice(0, i);
          }
          payloadSize += 2; // separator + packet type
        }

        return this.writeBuffer;
      }
      /**
       * Sends a message.
       *
       * @param {String} msg - message.
       * @param {Object} options.
       * @param {Function} callback function.
       * @return {Socket} for chaining.
       */
    }, {
      key: "write",
      value: function write(msg, options, fn) {
        this.sendPacket("message", msg, options, fn);
        return this;
      }
    }, {
      key: "send",
      value: function send(msg, options, fn) {
        this.sendPacket("message", msg, options, fn);
        return this;
      }
      /**
       * Sends a packet.
       *
       * @param {String} type: packet type.
       * @param {String} data.
       * @param {Object} options.
       * @param {Function} fn - callback function.
       * @private
       */
    }, {
      key: "sendPacket",
      value: function sendPacket(type, data, options, fn) {
        if ("function" === typeof data) {
          fn = data;
          data = undefined;
        }
        if ("function" === typeof options) {
          fn = options;
          options = null;
        }
        if ("closing" === this.readyState || "closed" === this.readyState) {
          return;
        }
        options = options || {};
        options.compress = false !== options.compress;
        var packet = {
          type: type,
          data: data,
          options: options
        };
        this.emitReserved("packetCreate", packet);
        this.writeBuffer.push(packet);
        if (fn) this.once("flush", fn);
        this.flush();
      }
      /**
       * Closes the connection.
       */
    }, {
      key: "close",
      value: function close() {
        var _this6 = this;
        var close = function close() {
          _this6.onClose("forced close");
          _this6.transport.close();
        };
        var cleanupAndClose = function cleanupAndClose() {
          _this6.off("upgrade", cleanupAndClose);
          _this6.off("upgradeError", cleanupAndClose);
          close();
        };
        var waitForUpgrade = function waitForUpgrade() {
          // wait for upgrade to finish since we can't send packets while pausing a transport
          _this6.once("upgrade", cleanupAndClose);
          _this6.once("upgradeError", cleanupAndClose);
        };
        if ("opening" === this.readyState || "open" === this.readyState) {
          this.readyState = "closing";
          if (this.writeBuffer.length) {
            this.once("drain", function () {
              if (_this6.upgrading) {
                waitForUpgrade();
              } else {
                close();
              }
            });
          } else if (this.upgrading) {
            waitForUpgrade();
          } else {
            close();
          }
        }
        return this;
      }
      /**
       * Called upon transport error
       *
       * @private
       */
    }, {
      key: "onError",
      value: function onError(err) {
        Socket.priorWebsocketSuccess = false;
        this.emitReserved("error", err);
        this.onClose("transport error", err);
      }
      /**
       * Called upon transport close.
       *
       * @private
       */
    }, {
      key: "onClose",
      value: function onClose(reason, description) {
        if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
          // clear timers
          this.clearTimeoutFn(this.pingTimeoutTimer);
          // stop event from firing again for transport
          this.transport.removeAllListeners("close");
          // ensure transport won't stay open
          this.transport.close();
          // ignore further transport communication
          this.transport.removeAllListeners();
          if (typeof removeEventListener === "function") {
            removeEventListener("beforeunload", this.beforeunloadEventListener, false);
            removeEventListener("offline", this.offlineEventListener, false);
          }
          // set ready state
          this.readyState = "closed";
          // clear session id
          this.id = null;
          // emit close event
          this.emitReserved("close", reason, description);
          // clean buffers after, so users can still
          // grab the buffers on `close` event
          this.writeBuffer = [];
          this.prevBufferLen = 0;
        }
      }
      /**
       * Filters upgrades, returning only those matching client transports.
       *
       * @param {Array} upgrades - server upgrades
       * @private
       */
    }, {
      key: "filterUpgrades",
      value: function filterUpgrades(upgrades) {
        var filteredUpgrades = [];
        var i = 0;
        var j = upgrades.length;
        for (; i < j; i++) {
          if (~this.transports.indexOf(upgrades[i])) filteredUpgrades.push(upgrades[i]);
        }
        return filteredUpgrades;
      }
    }]);
    return Socket;
  }(Emitter);
  Socket$1.protocol = protocol$1;

  Socket$1.protocol;

  /**
   * URL parser.
   *
   * @param uri - url
   * @param path - the request path of the connection
   * @param loc - An object meant to mimic window.location.
   *        Defaults to window.location.
   * @public
   */
  function url(uri) {
    var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    var loc = arguments.length > 2 ? arguments[2] : undefined;
    var obj = uri;
    // default to window.location
    loc = loc || typeof location !== "undefined" && location;
    if (null == uri) uri = loc.protocol + "//" + loc.host;
    // relative path support
    if (typeof uri === "string") {
      if ("/" === uri.charAt(0)) {
        if ("/" === uri.charAt(1)) {
          uri = loc.protocol + uri;
        } else {
          uri = loc.host + uri;
        }
      }
      if (!/^(https?|wss?):\/\//.test(uri)) {
        if ("undefined" !== typeof loc) {
          uri = loc.protocol + "//" + uri;
        } else {
          uri = "https://" + uri;
        }
      }
      // parse
      obj = parse(uri);
    }
    // make sure we treat `localhost:80` and `localhost` equally
    if (!obj.port) {
      if (/^(http|ws)$/.test(obj.protocol)) {
        obj.port = "80";
      } else if (/^(http|ws)s$/.test(obj.protocol)) {
        obj.port = "443";
      }
    }
    obj.path = obj.path || "/";
    var ipv6 = obj.host.indexOf(":") !== -1;
    var host = ipv6 ? "[" + obj.host + "]" : obj.host;
    // define unique id
    obj.id = obj.protocol + "://" + host + ":" + obj.port + path;
    // define href
    obj.href = obj.protocol + "://" + host + (loc && loc.port === obj.port ? "" : ":" + obj.port);
    return obj;
  }

  var withNativeArrayBuffer = typeof ArrayBuffer === "function";
  var isView = function isView(obj) {
    return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj.buffer instanceof ArrayBuffer;
  };
  var toString = Object.prototype.toString;
  var withNativeBlob = typeof Blob === "function" || typeof Blob !== "undefined" && toString.call(Blob) === "[object BlobConstructor]";
  var withNativeFile = typeof File === "function" || typeof File !== "undefined" && toString.call(File) === "[object FileConstructor]";
  /**
   * Returns true if obj is a Buffer, an ArrayBuffer, a Blob or a File.
   *
   * @private
   */
  function isBinary(obj) {
    return withNativeArrayBuffer && (obj instanceof ArrayBuffer || isView(obj)) || withNativeBlob && obj instanceof Blob || withNativeFile && obj instanceof File;
  }
  function hasBinary(obj, toJSON) {
    if (!obj || _typeof(obj) !== "object") {
      return false;
    }
    if (Array.isArray(obj)) {
      for (var i = 0, l = obj.length; i < l; i++) {
        if (hasBinary(obj[i])) {
          return true;
        }
      }
      return false;
    }
    if (isBinary(obj)) {
      return true;
    }
    if (obj.toJSON && typeof obj.toJSON === "function" && arguments.length === 1) {
      return hasBinary(obj.toJSON(), true);
    }
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
        return true;
      }
    }
    return false;
  }

  /**
   * Replaces every Buffer | ArrayBuffer | Blob | File in packet with a numbered placeholder.
   *
   * @param {Object} packet - socket.io event packet
   * @return {Object} with deconstructed packet and list of buffers
   * @public
   */
  function deconstructPacket(packet) {
    var buffers = [];
    var packetData = packet.data;
    var pack = packet;
    pack.data = _deconstructPacket(packetData, buffers);
    pack.attachments = buffers.length; // number of binary 'attachments'
    return {
      packet: pack,
      buffers: buffers
    };
  }
  function _deconstructPacket(data, buffers) {
    if (!data) return data;
    if (isBinary(data)) {
      var placeholder = {
        _placeholder: true,
        num: buffers.length
      };
      buffers.push(data);
      return placeholder;
    } else if (Array.isArray(data)) {
      var newData = new Array(data.length);
      for (var i = 0; i < data.length; i++) {
        newData[i] = _deconstructPacket(data[i], buffers);
      }
      return newData;
    } else if (_typeof(data) === "object" && !(data instanceof Date)) {
      var _newData = {};
      for (var key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          _newData[key] = _deconstructPacket(data[key], buffers);
        }
      }
      return _newData;
    }
    return data;
  }
  /**
   * Reconstructs a binary packet from its placeholder packet and buffers
   *
   * @param {Object} packet - event packet with placeholders
   * @param {Array} buffers - binary buffers to put in placeholder positions
   * @return {Object} reconstructed packet
   * @public
   */
  function reconstructPacket(packet, buffers) {
    packet.data = _reconstructPacket(packet.data, buffers);
    delete packet.attachments; // no longer useful
    return packet;
  }
  function _reconstructPacket(data, buffers) {
    if (!data) return data;
    if (data && data._placeholder === true) {
      var isIndexValid = typeof data.num === "number" && data.num >= 0 && data.num < buffers.length;
      if (isIndexValid) {
        return buffers[data.num]; // appropriate buffer (should be natural order anyway)
      } else {
        throw new Error("illegal attachments");
      }
    } else if (Array.isArray(data)) {
      for (var i = 0; i < data.length; i++) {
        data[i] = _reconstructPacket(data[i], buffers);
      }
    } else if (_typeof(data) === "object") {
      for (var key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          data[key] = _reconstructPacket(data[key], buffers);
        }
      }
    }
    return data;
  }

  /**
   * Protocol version.
   *
   * @public
   */
  var protocol = 5;
  var PacketType;
  (function (PacketType) {
    PacketType[PacketType["CONNECT"] = 0] = "CONNECT";
    PacketType[PacketType["DISCONNECT"] = 1] = "DISCONNECT";
    PacketType[PacketType["EVENT"] = 2] = "EVENT";
    PacketType[PacketType["ACK"] = 3] = "ACK";
    PacketType[PacketType["CONNECT_ERROR"] = 4] = "CONNECT_ERROR";
    PacketType[PacketType["BINARY_EVENT"] = 5] = "BINARY_EVENT";
    PacketType[PacketType["BINARY_ACK"] = 6] = "BINARY_ACK";
  })(PacketType || (PacketType = {}));
  /**
   * A socket.io Encoder instance
   */
  var Encoder = /*#__PURE__*/function () {
    /**
     * Encoder constructor
     *
     * @param {function} replacer - custom replacer to pass down to JSON.parse
     */
    function Encoder(replacer) {
      _classCallCheck(this, Encoder);
      this.replacer = replacer;
    }
    /**
     * Encode a packet as a single string if non-binary, or as a
     * buffer sequence, depending on packet type.
     *
     * @param {Object} obj - packet object
     */
    _createClass(Encoder, [{
      key: "encode",
      value: function encode(obj) {
        if (obj.type === PacketType.EVENT || obj.type === PacketType.ACK) {
          if (hasBinary(obj)) {
            return this.encodeAsBinary({
              type: obj.type === PacketType.EVENT ? PacketType.BINARY_EVENT : PacketType.BINARY_ACK,
              nsp: obj.nsp,
              data: obj.data,
              id: obj.id
            });
          }
        }
        return [this.encodeAsString(obj)];
      }
      /**
       * Encode packet as string.
       */
    }, {
      key: "encodeAsString",
      value: function encodeAsString(obj) {
        // first is type
        var str = "" + obj.type;
        // attachments if we have them
        if (obj.type === PacketType.BINARY_EVENT || obj.type === PacketType.BINARY_ACK) {
          str += obj.attachments + "-";
        }
        // if we have a namespace other than `/`
        // we append it followed by a comma `,`
        if (obj.nsp && "/" !== obj.nsp) {
          str += obj.nsp + ",";
        }
        // immediately followed by the id
        if (null != obj.id) {
          str += obj.id;
        }
        // json data
        if (null != obj.data) {
          str += JSON.stringify(obj.data, this.replacer);
        }
        return str;
      }
      /**
       * Encode packet as 'buffer sequence' by removing blobs, and
       * deconstructing packet into object with placeholders and
       * a list of buffers.
       */
    }, {
      key: "encodeAsBinary",
      value: function encodeAsBinary(obj) {
        var deconstruction = deconstructPacket(obj);
        var pack = this.encodeAsString(deconstruction.packet);
        var buffers = deconstruction.buffers;
        buffers.unshift(pack); // add packet info to beginning of data list
        return buffers; // write all the buffers
      }
    }]);
    return Encoder;
  }();
  /**
   * A socket.io Decoder instance
   *
   * @return {Object} decoder
   */
  var Decoder = /*#__PURE__*/function (_Emitter) {
    _inherits(Decoder, _Emitter);
    var _super = _createSuper(Decoder);
    /**
     * Decoder constructor
     *
     * @param {function} reviver - custom reviver to pass down to JSON.stringify
     */
    function Decoder(reviver) {
      var _this;
      _classCallCheck(this, Decoder);
      _this = _super.call(this);
      _this.reviver = reviver;
      return _this;
    }
    /**
     * Decodes an encoded packet string into packet JSON.
     *
     * @param {String} obj - encoded packet
     */
    _createClass(Decoder, [{
      key: "add",
      value: function add(obj) {
        var packet;
        if (typeof obj === "string") {
          if (this.reconstructor) {
            throw new Error("got plaintext data when reconstructing a packet");
          }
          packet = this.decodeString(obj);
          var isBinaryEvent = packet.type === PacketType.BINARY_EVENT;
          if (isBinaryEvent || packet.type === PacketType.BINARY_ACK) {
            packet.type = isBinaryEvent ? PacketType.EVENT : PacketType.ACK;
            // binary packet's json
            this.reconstructor = new BinaryReconstructor(packet);
            // no attachments, labeled binary but no binary data to follow
            if (packet.attachments === 0) {
              _get(_getPrototypeOf(Decoder.prototype), "emitReserved", this).call(this, "decoded", packet);
            }
          } else {
            // non-binary full packet
            _get(_getPrototypeOf(Decoder.prototype), "emitReserved", this).call(this, "decoded", packet);
          }
        } else if (isBinary(obj) || obj.base64) {
          // raw binary data
          if (!this.reconstructor) {
            throw new Error("got binary data when not reconstructing a packet");
          } else {
            packet = this.reconstructor.takeBinaryData(obj);
            if (packet) {
              // received final buffer
              this.reconstructor = null;
              _get(_getPrototypeOf(Decoder.prototype), "emitReserved", this).call(this, "decoded", packet);
            }
          }
        } else {
          throw new Error("Unknown type: " + obj);
        }
      }
      /**
       * Decode a packet String (JSON data)
       *
       * @param {String} str
       * @return {Object} packet
       */
    }, {
      key: "decodeString",
      value: function decodeString(str) {
        var i = 0;
        // look up type
        var p = {
          type: Number(str.charAt(0))
        };
        if (PacketType[p.type] === undefined) {
          throw new Error("unknown packet type " + p.type);
        }
        // look up attachments if type binary
        if (p.type === PacketType.BINARY_EVENT || p.type === PacketType.BINARY_ACK) {
          var start = i + 1;
          while (str.charAt(++i) !== "-" && i != str.length) {}
          var buf = str.substring(start, i);
          if (buf != Number(buf) || str.charAt(i) !== "-") {
            throw new Error("Illegal attachments");
          }
          p.attachments = Number(buf);
        }
        // look up namespace (if any)
        if ("/" === str.charAt(i + 1)) {
          var _start = i + 1;
          while (++i) {
            var c = str.charAt(i);
            if ("," === c) break;
            if (i === str.length) break;
          }
          p.nsp = str.substring(_start, i);
        } else {
          p.nsp = "/";
        }
        // look up id
        var next = str.charAt(i + 1);
        if ("" !== next && Number(next) == next) {
          var _start2 = i + 1;
          while (++i) {
            var _c = str.charAt(i);
            if (null == _c || Number(_c) != _c) {
              --i;
              break;
            }
            if (i === str.length) break;
          }
          p.id = Number(str.substring(_start2, i + 1));
        }
        // look up json data
        if (str.charAt(++i)) {
          var payload = this.tryParse(str.substr(i));
          if (Decoder.isPayloadValid(p.type, payload)) {
            p.data = payload;
          } else {
            throw new Error("invalid payload");
          }
        }
        return p;
      }
    }, {
      key: "tryParse",
      value: function tryParse(str) {
        try {
          return JSON.parse(str, this.reviver);
        } catch (e) {
          return false;
        }
      }
    }, {
      key: "destroy",
      value:
      /**
       * Deallocates a parser's resources
       */
      function destroy() {
        if (this.reconstructor) {
          this.reconstructor.finishedReconstruction();
          this.reconstructor = null;
        }
      }
    }], [{
      key: "isPayloadValid",
      value: function isPayloadValid(type, payload) {
        switch (type) {
          case PacketType.CONNECT:
            return _typeof(payload) === "object";
          case PacketType.DISCONNECT:
            return payload === undefined;
          case PacketType.CONNECT_ERROR:
            return typeof payload === "string" || _typeof(payload) === "object";
          case PacketType.EVENT:
          case PacketType.BINARY_EVENT:
            return Array.isArray(payload) && payload.length > 0;
          case PacketType.ACK:
          case PacketType.BINARY_ACK:
            return Array.isArray(payload);
        }
      }
    }]);
    return Decoder;
  }(Emitter);
  /**
   * A manager of a binary event's 'buffer sequence'. Should
   * be constructed whenever a packet of type BINARY_EVENT is
   * decoded.
   *
   * @param {Object} packet
   * @return {BinaryReconstructor} initialized reconstructor
   */
  var BinaryReconstructor = /*#__PURE__*/function () {
    function BinaryReconstructor(packet) {
      _classCallCheck(this, BinaryReconstructor);
      this.packet = packet;
      this.buffers = [];
      this.reconPack = packet;
    }
    /**
     * Method to be called when binary data received from connection
     * after a BINARY_EVENT packet.
     *
     * @param {Buffer | ArrayBuffer} binData - the raw binary data received
     * @return {null | Object} returns null if more binary data is expected or
     *   a reconstructed packet object if all buffers have been received.
     */
    _createClass(BinaryReconstructor, [{
      key: "takeBinaryData",
      value: function takeBinaryData(binData) {
        this.buffers.push(binData);
        if (this.buffers.length === this.reconPack.attachments) {
          // done with buffer list
          var packet = reconstructPacket(this.reconPack, this.buffers);
          this.finishedReconstruction();
          return packet;
        }
        return null;
      }
      /**
       * Cleans up binary packet reconstruction variables.
       */
    }, {
      key: "finishedReconstruction",
      value: function finishedReconstruction() {
        this.reconPack = null;
        this.buffers = [];
      }
    }]);
    return BinaryReconstructor;
  }();

  var parser = /*#__PURE__*/Object.freeze({
    __proto__: null,
    protocol: protocol,
    get PacketType () { return PacketType; },
    Encoder: Encoder,
    Decoder: Decoder
  });

  function on(obj, ev, fn) {
    obj.on(ev, fn);
    return function subDestroy() {
      obj.off(ev, fn);
    };
  }

  /**
   * Internal events.
   * These events can't be emitted by the user.
   */
  var RESERVED_EVENTS = Object.freeze({
    connect: 1,
    connect_error: 1,
    disconnect: 1,
    disconnecting: 1,
    // EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener
    newListener: 1,
    removeListener: 1
  });
  /**
   * A Socket is the fundamental class for interacting with the server.
   *
   * A Socket belongs to a certain Namespace (by default /) and uses an underlying {@link Manager} to communicate.
   *
   * @example
   * const socket = io();
   *
   * socket.on("connect", () => {
   *   console.log("connected");
   * });
   *
   * // send an event to the server
   * socket.emit("foo", "bar");
   *
   * socket.on("foobar", () => {
   *   // an event was received from the server
   * });
   *
   * // upon disconnection
   * socket.on("disconnect", (reason) => {
   *   console.log(`disconnected due to ${reason}`);
   * });
   */
  var Socket = /*#__PURE__*/function (_Emitter) {
    _inherits(Socket, _Emitter);
    var _super = _createSuper(Socket);
    /**
     * `Socket` constructor.
     */
    function Socket(io, nsp, opts) {
      var _this;
      _classCallCheck(this, Socket);
      _this = _super.call(this);
      /**
       * Whether the socket is currently connected to the server.
       *
       * @example
       * const socket = io();
       *
       * socket.on("connect", () => {
       *   console.log(socket.connected); // true
       * });
       *
       * socket.on("disconnect", () => {
       *   console.log(socket.connected); // false
       * });
       */
      _this.connected = false;
      /**
       * Whether the connection state was recovered after a temporary disconnection. In that case, any missed packets will
       * be transmitted by the server.
       */
      _this.recovered = false;
      /**
       * Buffer for packets received before the CONNECT packet
       */
      _this.receiveBuffer = [];
      /**
       * Buffer for packets that will be sent once the socket is connected
       */
      _this.sendBuffer = [];
      /**
       * The queue of packets to be sent with retry in case of failure.
       *
       * Packets are sent one by one, each waiting for the server acknowledgement, in order to guarantee the delivery order.
       * @private
       */
      _this._queue = [];
      /**
       * A sequence to generate the ID of the {@link QueuedPacket}.
       * @private
       */
      _this._queueSeq = 0;
      _this.ids = 0;
      _this.acks = {};
      _this.flags = {};
      _this.io = io;
      _this.nsp = nsp;
      if (opts && opts.auth) {
        _this.auth = opts.auth;
      }
      _this._opts = _extends({}, opts);
      if (_this.io._autoConnect) _this.open();
      return _this;
    }
    /**
     * Whether the socket is currently disconnected
     *
     * @example
     * const socket = io();
     *
     * socket.on("connect", () => {
     *   console.log(socket.disconnected); // false
     * });
     *
     * socket.on("disconnect", () => {
     *   console.log(socket.disconnected); // true
     * });
     */
    _createClass(Socket, [{
      key: "disconnected",
      get: function get() {
        return !this.connected;
      }
      /**
       * Subscribe to open, close and packet events
       *
       * @private
       */
    }, {
      key: "subEvents",
      value: function subEvents() {
        if (this.subs) return;
        var io = this.io;
        this.subs = [on(io, "open", this.onopen.bind(this)), on(io, "packet", this.onpacket.bind(this)), on(io, "error", this.onerror.bind(this)), on(io, "close", this.onclose.bind(this))];
      }
      /**
       * Whether the Socket will try to reconnect when its Manager connects or reconnects.
       *
       * @example
       * const socket = io();
       *
       * console.log(socket.active); // true
       *
       * socket.on("disconnect", (reason) => {
       *   if (reason === "io server disconnect") {
       *     // the disconnection was initiated by the server, you need to manually reconnect
       *     console.log(socket.active); // false
       *   }
       *   // else the socket will automatically try to reconnect
       *   console.log(socket.active); // true
       * });
       */
    }, {
      key: "active",
      get: function get() {
        return !!this.subs;
      }
      /**
       * "Opens" the socket.
       *
       * @example
       * const socket = io({
       *   autoConnect: false
       * });
       *
       * socket.connect();
       */
    }, {
      key: "connect",
      value: function connect() {
        if (this.connected) return this;
        this.subEvents();
        if (!this.io["_reconnecting"]) this.io.open(); // ensure open
        if ("open" === this.io._readyState) this.onopen();
        return this;
      }
      /**
       * Alias for {@link connect()}.
       */
    }, {
      key: "open",
      value: function open() {
        return this.connect();
      }
      /**
       * Sends a `message` event.
       *
       * This method mimics the WebSocket.send() method.
       *
       * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send
       *
       * @example
       * socket.send("hello");
       *
       * // this is equivalent to
       * socket.emit("message", "hello");
       *
       * @return self
       */
    }, {
      key: "send",
      value: function send() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        args.unshift("message");
        this.emit.apply(this, args);
        return this;
      }
      /**
       * Override `emit`.
       * If the event is in `events`, it's emitted normally.
       *
       * @example
       * socket.emit("hello", "world");
       *
       * // all serializable datastructures are supported (no need to call JSON.stringify)
       * socket.emit("hello", 1, "2", { 3: ["4"], 5: Uint8Array.from([6]) });
       *
       * // with an acknowledgement from the server
       * socket.emit("hello", "world", (val) => {
       *   // ...
       * });
       *
       * @return self
       */
    }, {
      key: "emit",
      value: function emit(ev) {
        if (RESERVED_EVENTS.hasOwnProperty(ev)) {
          throw new Error('"' + ev.toString() + '" is a reserved event name');
        }
        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }
        args.unshift(ev);
        if (this._opts.retries && !this.flags.fromQueue && !this.flags["volatile"]) {
          this._addToQueue(args);
          return this;
        }
        var packet = {
          type: PacketType.EVENT,
          data: args
        };
        packet.options = {};
        packet.options.compress = this.flags.compress !== false;
        // event ack callback
        if ("function" === typeof args[args.length - 1]) {
          var id = this.ids++;
          var ack = args.pop();
          this._registerAckCallback(id, ack);
          packet.id = id;
        }
        var isTransportWritable = this.io.engine && this.io.engine.transport && this.io.engine.transport.writable;
        var discardPacket = this.flags["volatile"] && (!isTransportWritable || !this.connected);
        if (discardPacket) ; else if (this.connected) {
          this.notifyOutgoingListeners(packet);
          this.packet(packet);
        } else {
          this.sendBuffer.push(packet);
        }
        this.flags = {};
        return this;
      }
      /**
       * @private
       */
    }, {
      key: "_registerAckCallback",
      value: function _registerAckCallback(id, ack) {
        var _this2 = this;
        var _a;
        var timeout = (_a = this.flags.timeout) !== null && _a !== void 0 ? _a : this._opts.ackTimeout;
        if (timeout === undefined) {
          this.acks[id] = ack;
          return;
        }
        // @ts-ignore
        var timer = this.io.setTimeoutFn(function () {
          delete _this2.acks[id];
          for (var i = 0; i < _this2.sendBuffer.length; i++) {
            if (_this2.sendBuffer[i].id === id) {
              _this2.sendBuffer.splice(i, 1);
            }
          }
          ack.call(_this2, new Error("operation has timed out"));
        }, timeout);
        this.acks[id] = function () {
          // @ts-ignore
          _this2.io.clearTimeoutFn(timer);
          for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }
          ack.apply(_this2, [null].concat(args));
        };
      }
      /**
       * Emits an event and waits for an acknowledgement
       *
       * @example
       * // without timeout
       * const response = await socket.emitWithAck("hello", "world");
       *
       * // with a specific timeout
       * try {
       *   const response = await socket.timeout(1000).emitWithAck("hello", "world");
       * } catch (err) {
       *   // the server did not acknowledge the event in the given delay
       * }
       *
       * @return a Promise that will be fulfilled when the server acknowledges the event
       */
    }, {
      key: "emitWithAck",
      value: function emitWithAck(ev) {
        var _this3 = this;
        for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
          args[_key4 - 1] = arguments[_key4];
        }
        // the timeout flag is optional
        var withErr = this.flags.timeout !== undefined || this._opts.ackTimeout !== undefined;
        return new Promise(function (resolve, reject) {
          args.push(function (arg1, arg2) {
            if (withErr) {
              return arg1 ? reject(arg1) : resolve(arg2);
            } else {
              return resolve(arg1);
            }
          });
          _this3.emit.apply(_this3, [ev].concat(args));
        });
      }
      /**
       * Add the packet to the queue.
       * @param args
       * @private
       */
    }, {
      key: "_addToQueue",
      value: function _addToQueue(args) {
        var _this4 = this;
        var ack;
        if (typeof args[args.length - 1] === "function") {
          ack = args.pop();
        }
        var packet = {
          id: this._queueSeq++,
          tryCount: 0,
          pending: false,
          args: args,
          flags: _extends({
            fromQueue: true
          }, this.flags)
        };
        args.push(function (err) {
          if (packet !== _this4._queue[0]) {
            // the packet has already been acknowledged
            return;
          }
          var hasError = err !== null;
          if (hasError) {
            if (packet.tryCount > _this4._opts.retries) {
              _this4._queue.shift();
              if (ack) {
                ack(err);
              }
            }
          } else {
            _this4._queue.shift();
            if (ack) {
              for (var _len5 = arguments.length, responseArgs = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
                responseArgs[_key5 - 1] = arguments[_key5];
              }
              ack.apply(void 0, [null].concat(responseArgs));
            }
          }
          packet.pending = false;
          return _this4._drainQueue();
        });
        this._queue.push(packet);
        this._drainQueue();
      }
      /**
       * Send the first packet of the queue, and wait for an acknowledgement from the server.
       * @param force - whether to resend a packet that has not been acknowledged yet
       *
       * @private
       */
    }, {
      key: "_drainQueue",
      value: function _drainQueue() {
        var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        if (!this.connected || this._queue.length === 0) {
          return;
        }
        var packet = this._queue[0];
        if (packet.pending && !force) {
          return;
        }
        packet.pending = true;
        packet.tryCount++;
        this.flags = packet.flags;
        this.emit.apply(this, packet.args);
      }
      /**
       * Sends a packet.
       *
       * @param packet
       * @private
       */
    }, {
      key: "packet",
      value: function packet(_packet) {
        _packet.nsp = this.nsp;
        this.io._packet(_packet);
      }
      /**
       * Called upon engine `open`.
       *
       * @private
       */
    }, {
      key: "onopen",
      value: function onopen() {
        var _this5 = this;
        if (typeof this.auth == "function") {
          this.auth(function (data) {
            _this5._sendConnectPacket(data);
          });
        } else {
          this._sendConnectPacket(this.auth);
        }
      }
      /**
       * Sends a CONNECT packet to initiate the Socket.IO session.
       *
       * @param data
       * @private
       */
    }, {
      key: "_sendConnectPacket",
      value: function _sendConnectPacket(data) {
        this.packet({
          type: PacketType.CONNECT,
          data: this._pid ? _extends({
            pid: this._pid,
            offset: this._lastOffset
          }, data) : data
        });
      }
      /**
       * Called upon engine or manager `error`.
       *
       * @param err
       * @private
       */
    }, {
      key: "onerror",
      value: function onerror(err) {
        if (!this.connected) {
          this.emitReserved("connect_error", err);
        }
      }
      /**
       * Called upon engine `close`.
       *
       * @param reason
       * @param description
       * @private
       */
    }, {
      key: "onclose",
      value: function onclose(reason, description) {
        this.connected = false;
        delete this.id;
        this.emitReserved("disconnect", reason, description);
      }
      /**
       * Called with socket packet.
       *
       * @param packet
       * @private
       */
    }, {
      key: "onpacket",
      value: function onpacket(packet) {
        var sameNamespace = packet.nsp === this.nsp;
        if (!sameNamespace) return;
        switch (packet.type) {
          case PacketType.CONNECT:
            if (packet.data && packet.data.sid) {
              this.onconnect(packet.data.sid, packet.data.pid);
            } else {
              this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
            }
            break;
          case PacketType.EVENT:
          case PacketType.BINARY_EVENT:
            this.onevent(packet);
            break;
          case PacketType.ACK:
          case PacketType.BINARY_ACK:
            this.onack(packet);
            break;
          case PacketType.DISCONNECT:
            this.ondisconnect();
            break;
          case PacketType.CONNECT_ERROR:
            this.destroy();
            var err = new Error(packet.data.message);
            // @ts-ignore
            err.data = packet.data.data;
            this.emitReserved("connect_error", err);
            break;
        }
      }
      /**
       * Called upon a server event.
       *
       * @param packet
       * @private
       */
    }, {
      key: "onevent",
      value: function onevent(packet) {
        var args = packet.data || [];
        if (null != packet.id) {
          args.push(this.ack(packet.id));
        }
        if (this.connected) {
          this.emitEvent(args);
        } else {
          this.receiveBuffer.push(Object.freeze(args));
        }
      }
    }, {
      key: "emitEvent",
      value: function emitEvent(args) {
        if (this._anyListeners && this._anyListeners.length) {
          var listeners = this._anyListeners.slice();
          var _iterator = _createForOfIteratorHelper(listeners),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var listener = _step.value;
              listener.apply(this, args);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }
        _get(_getPrototypeOf(Socket.prototype), "emit", this).apply(this, args);
        if (this._pid && args.length && typeof args[args.length - 1] === "string") {
          this._lastOffset = args[args.length - 1];
        }
      }
      /**
       * Produces an ack callback to emit with an event.
       *
       * @private
       */
    }, {
      key: "ack",
      value: function ack(id) {
        var self = this;
        var sent = false;
        return function () {
          // prevent double callbacks
          if (sent) return;
          sent = true;
          for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
            args[_key6] = arguments[_key6];
          }
          self.packet({
            type: PacketType.ACK,
            id: id,
            data: args
          });
        };
      }
      /**
       * Called upon a server acknowlegement.
       *
       * @param packet
       * @private
       */
    }, {
      key: "onack",
      value: function onack(packet) {
        var ack = this.acks[packet.id];
        if ("function" === typeof ack) {
          ack.apply(this, packet.data);
          delete this.acks[packet.id];
        }
      }
      /**
       * Called upon server connect.
       *
       * @private
       */
    }, {
      key: "onconnect",
      value: function onconnect(id, pid) {
        this.id = id;
        this.recovered = pid && this._pid === pid;
        this._pid = pid; // defined only if connection state recovery is enabled
        this.connected = true;
        this.emitBuffered();
        this.emitReserved("connect");
        this._drainQueue(true);
      }
      /**
       * Emit buffered events (received and emitted).
       *
       * @private
       */
    }, {
      key: "emitBuffered",
      value: function emitBuffered() {
        var _this6 = this;
        this.receiveBuffer.forEach(function (args) {
          return _this6.emitEvent(args);
        });
        this.receiveBuffer = [];
        this.sendBuffer.forEach(function (packet) {
          _this6.notifyOutgoingListeners(packet);
          _this6.packet(packet);
        });
        this.sendBuffer = [];
      }
      /**
       * Called upon server disconnect.
       *
       * @private
       */
    }, {
      key: "ondisconnect",
      value: function ondisconnect() {
        this.destroy();
        this.onclose("io server disconnect");
      }
      /**
       * Called upon forced client/server side disconnections,
       * this method ensures the manager stops tracking us and
       * that reconnections don't get triggered for this.
       *
       * @private
       */
    }, {
      key: "destroy",
      value: function destroy() {
        if (this.subs) {
          // clean subscriptions to avoid reconnections
          this.subs.forEach(function (subDestroy) {
            return subDestroy();
          });
          this.subs = undefined;
        }
        this.io["_destroy"](this);
      }
      /**
       * Disconnects the socket manually. In that case, the socket will not try to reconnect.
       *
       * If this is the last active Socket instance of the {@link Manager}, the low-level connection will be closed.
       *
       * @example
       * const socket = io();
       *
       * socket.on("disconnect", (reason) => {
       *   // console.log(reason); prints "io client disconnect"
       * });
       *
       * socket.disconnect();
       *
       * @return self
       */
    }, {
      key: "disconnect",
      value: function disconnect() {
        if (this.connected) {
          this.packet({
            type: PacketType.DISCONNECT
          });
        }
        // remove socket from pool
        this.destroy();
        if (this.connected) {
          // fire events
          this.onclose("io client disconnect");
        }
        return this;
      }
      /**
       * Alias for {@link disconnect()}.
       *
       * @return self
       */
    }, {
      key: "close",
      value: function close() {
        return this.disconnect();
      }
      /**
       * Sets the compress flag.
       *
       * @example
       * socket.compress(false).emit("hello");
       *
       * @param compress - if `true`, compresses the sending data
       * @return self
       */
    }, {
      key: "compress",
      value: function compress(_compress) {
        this.flags.compress = _compress;
        return this;
      }
      /**
       * Sets a modifier for a subsequent event emission that the event message will be dropped when this socket is not
       * ready to send messages.
       *
       * @example
       * socket.volatile.emit("hello"); // the server may or may not receive it
       *
       * @returns self
       */
    }, {
      key: "volatile",
      get: function get() {
        this.flags["volatile"] = true;
        return this;
      }
      /**
       * Sets a modifier for a subsequent event emission that the callback will be called with an error when the
       * given number of milliseconds have elapsed without an acknowledgement from the server:
       *
       * @example
       * socket.timeout(5000).emit("my-event", (err) => {
       *   if (err) {
       *     // the server did not acknowledge the event in the given delay
       *   }
       * });
       *
       * @returns self
       */
    }, {
      key: "timeout",
      value: function timeout(_timeout) {
        this.flags.timeout = _timeout;
        return this;
      }
      /**
       * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
       * callback.
       *
       * @example
       * socket.onAny((event, ...args) => {
       *   console.log(`got ${event}`);
       * });
       *
       * @param listener
       */
    }, {
      key: "onAny",
      value: function onAny(listener) {
        this._anyListeners = this._anyListeners || [];
        this._anyListeners.push(listener);
        return this;
      }
      /**
       * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
       * callback. The listener is added to the beginning of the listeners array.
       *
       * @example
       * socket.prependAny((event, ...args) => {
       *   console.log(`got event ${event}`);
       * });
       *
       * @param listener
       */
    }, {
      key: "prependAny",
      value: function prependAny(listener) {
        this._anyListeners = this._anyListeners || [];
        this._anyListeners.unshift(listener);
        return this;
      }
      /**
       * Removes the listener that will be fired when any event is emitted.
       *
       * @example
       * const catchAllListener = (event, ...args) => {
       *   console.log(`got event ${event}`);
       * }
       *
       * socket.onAny(catchAllListener);
       *
       * // remove a specific listener
       * socket.offAny(catchAllListener);
       *
       * // or remove all listeners
       * socket.offAny();
       *
       * @param listener
       */
    }, {
      key: "offAny",
      value: function offAny(listener) {
        if (!this._anyListeners) {
          return this;
        }
        if (listener) {
          var listeners = this._anyListeners;
          for (var i = 0; i < listeners.length; i++) {
            if (listener === listeners[i]) {
              listeners.splice(i, 1);
              return this;
            }
          }
        } else {
          this._anyListeners = [];
        }
        return this;
      }
      /**
       * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
       * e.g. to remove listeners.
       */
    }, {
      key: "listenersAny",
      value: function listenersAny() {
        return this._anyListeners || [];
      }
      /**
       * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
       * callback.
       *
       * Note: acknowledgements sent to the server are not included.
       *
       * @example
       * socket.onAnyOutgoing((event, ...args) => {
       *   console.log(`sent event ${event}`);
       * });
       *
       * @param listener
       */
    }, {
      key: "onAnyOutgoing",
      value: function onAnyOutgoing(listener) {
        this._anyOutgoingListeners = this._anyOutgoingListeners || [];
        this._anyOutgoingListeners.push(listener);
        return this;
      }
      /**
       * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
       * callback. The listener is added to the beginning of the listeners array.
       *
       * Note: acknowledgements sent to the server are not included.
       *
       * @example
       * socket.prependAnyOutgoing((event, ...args) => {
       *   console.log(`sent event ${event}`);
       * });
       *
       * @param listener
       */
    }, {
      key: "prependAnyOutgoing",
      value: function prependAnyOutgoing(listener) {
        this._anyOutgoingListeners = this._anyOutgoingListeners || [];
        this._anyOutgoingListeners.unshift(listener);
        return this;
      }
      /**
       * Removes the listener that will be fired when any event is emitted.
       *
       * @example
       * const catchAllListener = (event, ...args) => {
       *   console.log(`sent event ${event}`);
       * }
       *
       * socket.onAnyOutgoing(catchAllListener);
       *
       * // remove a specific listener
       * socket.offAnyOutgoing(catchAllListener);
       *
       * // or remove all listeners
       * socket.offAnyOutgoing();
       *
       * @param [listener] - the catch-all listener (optional)
       */
    }, {
      key: "offAnyOutgoing",
      value: function offAnyOutgoing(listener) {
        if (!this._anyOutgoingListeners) {
          return this;
        }
        if (listener) {
          var listeners = this._anyOutgoingListeners;
          for (var i = 0; i < listeners.length; i++) {
            if (listener === listeners[i]) {
              listeners.splice(i, 1);
              return this;
            }
          }
        } else {
          this._anyOutgoingListeners = [];
        }
        return this;
      }
      /**
       * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
       * e.g. to remove listeners.
       */
    }, {
      key: "listenersAnyOutgoing",
      value: function listenersAnyOutgoing() {
        return this._anyOutgoingListeners || [];
      }
      /**
       * Notify the listeners for each packet sent
       *
       * @param packet
       *
       * @private
       */
    }, {
      key: "notifyOutgoingListeners",
      value: function notifyOutgoingListeners(packet) {
        if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
          var listeners = this._anyOutgoingListeners.slice();
          var _iterator2 = _createForOfIteratorHelper(listeners),
            _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var listener = _step2.value;
              listener.apply(this, packet.data);
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
      }
    }]);
    return Socket;
  }(Emitter);

  /**
   * Initialize backoff timer with `opts`.
   *
   * - `min` initial timeout in milliseconds [100]
   * - `max` max timeout [10000]
   * - `jitter` [0]
   * - `factor` [2]
   *
   * @param {Object} opts
   * @api public
   */
  function Backoff(opts) {
    opts = opts || {};
    this.ms = opts.min || 100;
    this.max = opts.max || 10000;
    this.factor = opts.factor || 2;
    this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
    this.attempts = 0;
  }
  /**
   * Return the backoff duration.
   *
   * @return {Number}
   * @api public
   */
  Backoff.prototype.duration = function () {
    var ms = this.ms * Math.pow(this.factor, this.attempts++);
    if (this.jitter) {
      var rand = Math.random();
      var deviation = Math.floor(rand * this.jitter * ms);
      ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation;
    }
    return Math.min(ms, this.max) | 0;
  };
  /**
   * Reset the number of attempts.
   *
   * @api public
   */
  Backoff.prototype.reset = function () {
    this.attempts = 0;
  };
  /**
   * Set the minimum duration
   *
   * @api public
   */
  Backoff.prototype.setMin = function (min) {
    this.ms = min;
  };
  /**
   * Set the maximum duration
   *
   * @api public
   */
  Backoff.prototype.setMax = function (max) {
    this.max = max;
  };
  /**
   * Set the jitter
   *
   * @api public
   */
  Backoff.prototype.setJitter = function (jitter) {
    this.jitter = jitter;
  };

  var Manager = /*#__PURE__*/function (_Emitter) {
    _inherits(Manager, _Emitter);
    var _super = _createSuper(Manager);
    function Manager(uri, opts) {
      var _this;
      _classCallCheck(this, Manager);
      var _a;
      _this = _super.call(this);
      _this.nsps = {};
      _this.subs = [];
      if (uri && "object" === _typeof(uri)) {
        opts = uri;
        uri = undefined;
      }
      opts = opts || {};
      opts.path = opts.path || "/socket.io";
      _this.opts = opts;
      installTimerFunctions(_assertThisInitialized(_this), opts);
      _this.reconnection(opts.reconnection !== false);
      _this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
      _this.reconnectionDelay(opts.reconnectionDelay || 1000);
      _this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
      _this.randomizationFactor((_a = opts.randomizationFactor) !== null && _a !== void 0 ? _a : 0.5);
      _this.backoff = new Backoff({
        min: _this.reconnectionDelay(),
        max: _this.reconnectionDelayMax(),
        jitter: _this.randomizationFactor()
      });
      _this.timeout(null == opts.timeout ? 20000 : opts.timeout);
      _this._readyState = "closed";
      _this.uri = uri;
      var _parser = opts.parser || parser;
      _this.encoder = new _parser.Encoder();
      _this.decoder = new _parser.Decoder();
      _this._autoConnect = opts.autoConnect !== false;
      if (_this._autoConnect) _this.open();
      return _this;
    }
    _createClass(Manager, [{
      key: "reconnection",
      value: function reconnection(v) {
        if (!arguments.length) return this._reconnection;
        this._reconnection = !!v;
        return this;
      }
    }, {
      key: "reconnectionAttempts",
      value: function reconnectionAttempts(v) {
        if (v === undefined) return this._reconnectionAttempts;
        this._reconnectionAttempts = v;
        return this;
      }
    }, {
      key: "reconnectionDelay",
      value: function reconnectionDelay(v) {
        var _a;
        if (v === undefined) return this._reconnectionDelay;
        this._reconnectionDelay = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMin(v);
        return this;
      }
    }, {
      key: "randomizationFactor",
      value: function randomizationFactor(v) {
        var _a;
        if (v === undefined) return this._randomizationFactor;
        this._randomizationFactor = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setJitter(v);
        return this;
      }
    }, {
      key: "reconnectionDelayMax",
      value: function reconnectionDelayMax(v) {
        var _a;
        if (v === undefined) return this._reconnectionDelayMax;
        this._reconnectionDelayMax = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMax(v);
        return this;
      }
    }, {
      key: "timeout",
      value: function timeout(v) {
        if (!arguments.length) return this._timeout;
        this._timeout = v;
        return this;
      }
      /**
       * Starts trying to reconnect if reconnection is enabled and we have not
       * started reconnecting yet
       *
       * @private
       */
    }, {
      key: "maybeReconnectOnOpen",
      value: function maybeReconnectOnOpen() {
        // Only try to reconnect if it's the first time we're connecting
        if (!this._reconnecting && this._reconnection && this.backoff.attempts === 0) {
          // keeps reconnection from firing twice for the same reconnection loop
          this.reconnect();
        }
      }
      /**
       * Sets the current transport `socket`.
       *
       * @param {Function} fn - optional, callback
       * @return self
       * @public
       */
    }, {
      key: "open",
      value: function open(fn) {
        var _this2 = this;
        if (~this._readyState.indexOf("open")) return this;
        this.engine = new Socket$1(this.uri, this.opts);
        var socket = this.engine;
        var self = this;
        this._readyState = "opening";
        this.skipReconnect = false;
        // emit `open`
        var openSubDestroy = on(socket, "open", function () {
          self.onopen();
          fn && fn();
        });
        // emit `error`
        var errorSub = on(socket, "error", function (err) {
          self.cleanup();
          self._readyState = "closed";
          _this2.emitReserved("error", err);
          if (fn) {
            fn(err);
          } else {
            // Only do this if there is no fn to handle the error
            self.maybeReconnectOnOpen();
          }
        });
        if (false !== this._timeout) {
          var timeout = this._timeout;
          if (timeout === 0) {
            openSubDestroy(); // prevents a race condition with the 'open' event
          }
          // set timer
          var timer = this.setTimeoutFn(function () {
            openSubDestroy();
            socket.close();
            // @ts-ignore
            socket.emit("error", new Error("timeout"));
          }, timeout);
          if (this.opts.autoUnref) {
            timer.unref();
          }
          this.subs.push(function subDestroy() {
            clearTimeout(timer);
          });
        }
        this.subs.push(openSubDestroy);
        this.subs.push(errorSub);
        return this;
      }
      /**
       * Alias for open()
       *
       * @return self
       * @public
       */
    }, {
      key: "connect",
      value: function connect(fn) {
        return this.open(fn);
      }
      /**
       * Called upon transport open.
       *
       * @private
       */
    }, {
      key: "onopen",
      value: function onopen() {
        // clear old subs
        this.cleanup();
        // mark as open
        this._readyState = "open";
        this.emitReserved("open");
        // add new subs
        var socket = this.engine;
        this.subs.push(on(socket, "ping", this.onping.bind(this)), on(socket, "data", this.ondata.bind(this)), on(socket, "error", this.onerror.bind(this)), on(socket, "close", this.onclose.bind(this)), on(this.decoder, "decoded", this.ondecoded.bind(this)));
      }
      /**
       * Called upon a ping.
       *
       * @private
       */
    }, {
      key: "onping",
      value: function onping() {
        this.emitReserved("ping");
      }
      /**
       * Called with data.
       *
       * @private
       */
    }, {
      key: "ondata",
      value: function ondata(data) {
        try {
          this.decoder.add(data);
        } catch (e) {
          this.onclose("parse error", e);
        }
      }
      /**
       * Called when parser fully decodes a packet.
       *
       * @private
       */
    }, {
      key: "ondecoded",
      value: function ondecoded(packet) {
        var _this3 = this;
        // the nextTick call prevents an exception in a user-provided event listener from triggering a disconnection due to a "parse error"
        nextTick(function () {
          _this3.emitReserved("packet", packet);
        }, this.setTimeoutFn);
      }
      /**
       * Called upon socket error.
       *
       * @private
       */
    }, {
      key: "onerror",
      value: function onerror(err) {
        this.emitReserved("error", err);
      }
      /**
       * Creates a new socket for the given `nsp`.
       *
       * @return {Socket}
       * @public
       */
    }, {
      key: "socket",
      value: function socket(nsp, opts) {
        var socket = this.nsps[nsp];
        if (!socket) {
          socket = new Socket(this, nsp, opts);
          this.nsps[nsp] = socket;
        } else if (this._autoConnect && !socket.active) {
          socket.connect();
        }
        return socket;
      }
      /**
       * Called upon a socket close.
       *
       * @param socket
       * @private
       */
    }, {
      key: "_destroy",
      value: function _destroy(socket) {
        var nsps = Object.keys(this.nsps);
        for (var _i = 0, _nsps = nsps; _i < _nsps.length; _i++) {
          var nsp = _nsps[_i];
          var _socket = this.nsps[nsp];
          if (_socket.active) {
            return;
          }
        }
        this._close();
      }
      /**
       * Writes a packet.
       *
       * @param packet
       * @private
       */
    }, {
      key: "_packet",
      value: function _packet(packet) {
        var encodedPackets = this.encoder.encode(packet);
        for (var i = 0; i < encodedPackets.length; i++) {
          this.engine.write(encodedPackets[i], packet.options);
        }
      }
      /**
       * Clean up transport subscriptions and packet buffer.
       *
       * @private
       */
    }, {
      key: "cleanup",
      value: function cleanup() {
        this.subs.forEach(function (subDestroy) {
          return subDestroy();
        });
        this.subs.length = 0;
        this.decoder.destroy();
      }
      /**
       * Close the current socket.
       *
       * @private
       */
    }, {
      key: "_close",
      value: function _close() {
        this.skipReconnect = true;
        this._reconnecting = false;
        this.onclose("forced close");
        if (this.engine) this.engine.close();
      }
      /**
       * Alias for close()
       *
       * @private
       */
    }, {
      key: "disconnect",
      value: function disconnect() {
        return this._close();
      }
      /**
       * Called upon engine close.
       *
       * @private
       */
    }, {
      key: "onclose",
      value: function onclose(reason, description) {
        this.cleanup();
        this.backoff.reset();
        this._readyState = "closed";
        this.emitReserved("close", reason, description);
        if (this._reconnection && !this.skipReconnect) {
          this.reconnect();
        }
      }
      /**
       * Attempt a reconnection.
       *
       * @private
       */
    }, {
      key: "reconnect",
      value: function reconnect() {
        var _this4 = this;
        if (this._reconnecting || this.skipReconnect) return this;
        var self = this;
        if (this.backoff.attempts >= this._reconnectionAttempts) {
          this.backoff.reset();
          this.emitReserved("reconnect_failed");
          this._reconnecting = false;
        } else {
          var delay = this.backoff.duration();
          this._reconnecting = true;
          var timer = this.setTimeoutFn(function () {
            if (self.skipReconnect) return;
            _this4.emitReserved("reconnect_attempt", self.backoff.attempts);
            // check again for the case socket closed in above events
            if (self.skipReconnect) return;
            self.open(function (err) {
              if (err) {
                self._reconnecting = false;
                self.reconnect();
                _this4.emitReserved("reconnect_error", err);
              } else {
                self.onreconnect();
              }
            });
          }, delay);
          if (this.opts.autoUnref) {
            timer.unref();
          }
          this.subs.push(function subDestroy() {
            clearTimeout(timer);
          });
        }
      }
      /**
       * Called upon successful reconnect.
       *
       * @private
       */
    }, {
      key: "onreconnect",
      value: function onreconnect() {
        var attempt = this.backoff.attempts;
        this._reconnecting = false;
        this.backoff.reset();
        this.emitReserved("reconnect", attempt);
      }
    }]);
    return Manager;
  }(Emitter);

  /**
   * Managers cache.
   */
  var cache = {};
  function lookup(uri, opts) {
    if (_typeof(uri) === "object") {
      opts = uri;
      uri = undefined;
    }
    opts = opts || {};
    var parsed = url(uri, opts.path || "/socket.io");
    var source = parsed.source;
    var id = parsed.id;
    var path = parsed.path;
    var sameNamespace = cache[id] && path in cache[id]["nsps"];
    var newConnection = opts.forceNew || opts["force new connection"] || false === opts.multiplex || sameNamespace;
    var io;
    if (newConnection) {
      io = new Manager(source, opts);
    } else {
      if (!cache[id]) {
        cache[id] = new Manager(source, opts);
      }
      io = cache[id];
    }
    if (parsed.query && !opts.query) {
      opts.query = parsed.queryKey;
    }
    return io.socket(parsed.path, opts);
  }
  // so that "lookup" can be used both as a function (e.g. `io(...)`) and as a
  // namespace (e.g. `io.connect(...)`), for backward compatibility
  _extends(lookup, {
    Manager: Manager,
    Socket: Socket,
    io: lookup,
    connect: lookup
  });

  var browser = (typeof self === "undefined" ? "undefined" : _typeof(self)) == 'object' ? self.FormData : window.FormData;

  var Chat = /*#__PURE__*/function () {
    function Chat(payload) {
      _classCallCheck(this, Chat);
      this.chatlist = payload.chatlist;
      this.onChatConnect = payload.onChatConnect;
      this.onChatRefresh = payload.onChatRefresh;
      this.onChatLeave = payload.onChatLeave;
      this.onMessageSend = payload.onMessageSend;
      this.onMessagesFetch = payload.onMessagesFetch;
      this.onMessageReceive = payload.onMessageReceive;
      this.onMessagesUpdate = payload.onMessagesUpdate;
    }
    /**
     *
     * @param payload
     *
     */
    _createClass(Chat, [{
      key: "connect",
      value: function connect(payload) {
        var _a, _b, _c, _d;
        if (payload["with"]) {
          if (typeof payload["with"] === "string") {
            payload["with"] = [payload["with"]];
          }
          payload["with"] = payload["with"].filter(function (MemberId) {
            return MemberId && MemberId !== "undefined" && MemberId !== "null";
          });
          payload["with"].push((_a = Chatty.member) === null || _a === void 0 ? void 0 : _a.id);
          // Remove duplicated elements
          payload["with"] = payload["with"].filter(function (value, index, self) {
            return self.indexOf(value) === index;
          });
          if (payload["with"].length < 2) {
            console.warn(":: ChattyChat connect error - chat member count should not be less than 2");
            return;
          }
        }
        if (payload.distinctKey && typeof payload.distinctKey !== "string") {
          console.warn(":: ChattyChat connect error - distinctKey must be string. Use static method Chatty.generateDistinctKey() to generate distinctKey");
          return;
        }
        // payload checker
        Object.keys(payload).forEach(function (key) {
          return !payload[key] && delete payload[key];
        });
        this.socket = lookup("wss://devsocket.chatty-cloud.com" + "/chat.".concat((_b = Chatty.app) === null || _b === void 0 ? void 0 : _b.name), {
          // transports: ["polling", "websocket"],
          transports: ["websocket"],
          query: {
            MemberId: ((_c = Chatty.member) === null || _c === void 0 ? void 0 : _c.id) || "",
            AppId: ((_d = Chatty.app) === null || _d === void 0 ? void 0 : _d.id) || "",
            at: payload.at || "",
            "with": payload["with"] || "",
            distinctKey: payload.distinctKey || "",
            group: payload.group || "",
            name: payload.name || "",
            image: payload.image || "",
            data: payload.data && JSON.stringify(payload.data) || ""
          },
          auth: {
            apikey: Chatty.apiKey || ""
          },
          forceNew: true
          // withCredentials: true, // cors "*" 일때는 이값을 설정하면안된다.
        });

        this.addListener();
      }
    }, {
      key: "disconnect",
      value: function disconnect() {
        var _a;
        (_a = this.socket) === null || _a === void 0 ? void 0 : _a.disconnect();
        this.removeListener();
        console.debug(":: ChattyChat disconnected");
      }
    }, {
      key: "fetchMessages",
      value: function fetchMessages(payload) {
        var _a;
        (_a = this.socket) === null || _a === void 0 ? void 0 : _a.emit(eChattyEvent.FETCH_MESSAGES, {
          refresh: payload.refresh
        });
      }
    }, {
      key: "sendMessage",
      value: function sendMessage(data) {
        var _a;
        (_a = this.socket) === null || _a === void 0 ? void 0 : _a.emit(eChattyEvent.SEND_MESSAGE, _objectSpread2(_objectSpread2({}, data), {}, {
          retry: 5
        }));
      }
    }, {
      key: "deleteMessage",
      value: function deleteMessage(id) {
        var _a;
        (_a = this.socket) === null || _a === void 0 ? void 0 : _a.emit(eChattyEvent.DELETE_MESSAGE, {
          id: id
        });
      }
    }, {
      key: "refreshChat",
      value: function refreshChat(ChatId) {
        var _a;
        // chat 화면의 정보 및 참여멤버정보등이 바뀔때 호출이되어야 함
        (_a = this.socket) === null || _a === void 0 ? void 0 : _a.emit(eChattyEvent.REFRESH_CHAT, {
          ChatId: ChatId
        });
      }
    }, {
      key: "leaveChat",
      value: function leaveChat(ChatId) {
        var _a;
        (_a = this.socket) === null || _a === void 0 ? void 0 : _a.emit(eChattyEvent.LEAVE_CHAT, {
          ChatId: ChatId
        });
      }
    }, {
      key: "inviteMembers",
      value: function inviteMembers(MemberIds) {
        var _a;
        (_a = this.socket) === null || _a === void 0 ? void 0 : _a.emit(eChattyEvent.INVITE_MEMBERS, {
          MemberIds: MemberIds
        });
      }
    }, {
      key: "excludeMembers",
      value: function excludeMembers(MemberIds) {
        var _a;
        (_a = this.socket) === null || _a === void 0 ? void 0 : _a.emit(eChattyEvent.EXCLUDE_MEMBERS, {
          MemberIds: MemberIds
        });
      }
    }, {
      key: "markAsRead",
      value: function markAsRead() {
        var _a;
        (_a = this.socket) === null || _a === void 0 ? void 0 : _a.emit(eChattyEvent.MARK_AS_READ);
      }
      /**
       *
       * @param text {string} message don't be trimeed before sending as it's a frontend logic.
       * @returns
       */
    }, {
      key: "sendTextMessage",
      value: function sendTextMessage(text) {
        var _a;
        if (!text) {
          console.warn(":: ChattyChat sendTextMessage error - text is empty");
          return;
        }
        if (!this.id) {
          console.warn(":: ChattyChat sendTextMessage error - Chat not connected yet");
          return;
        }
        var message = {
          id: "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
              v = c == "x" ? r : r & 0x3 | 0x8;
            return v.toString(16);
          }),
          createdAt: new Date(),
          text: text,
          type: eMessageType.TEXT,
          by: eMessageBy.USER,
          SenderId: (_a = Chatty.member) === null || _a === void 0 ? void 0 : _a.id
        };
        this.sendMessage(message);
        // return temporary message object before inserting to database
        delete message["SenderId"];
        return _objectSpread2(_objectSpread2({}, message), {}, {
          Sender: Chatty.member
        });
      }
    }, {
      key: "sendFileMessage",
      value: function sendFileMessage(files) {
        var _this = this;
        var _a;
        if (!files) {
          console.warn(":: ChattyChat sendFileMessage function param error: files are undefined");
          return;
        }
        if (files.length > 4) {
          console.warn(":: ChattyChat sendFileMessage function param error: number of files can not be over 4");
          return;
        }
        if (!this.id) {
          console.warn(":: ChattyChat sendTextMessage error - Chat not connected yet");
          return;
        }
        var message = {
          id: "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
              v = c == "x" ? r : r & 0x3 | 0x8;
            return v.toString(16);
          }),
          createdAt: new Date(),
          files: files,
          text: "File Message",
          type: eMessageType.FILE,
          by: eMessageBy.USER,
          SenderId: (_a = Chatty.member) === null || _a === void 0 ? void 0 : _a.id
        };
        this.uploadFiles(files).then(function (files) {
          console.debug(":: ChattyChat uploadFiles success", files);
          _this.sendMessage(_objectSpread2(_objectSpread2({}, message), {}, {
            files: files
          }));
        })["catch"](function (err) {
          console.warn(":: ChattyChat uploadFiles error", err.message);
        });
        // return temporary message object with SenderId before inserting to database
        delete message["SenderId"];
        return _objectSpread2(_objectSpread2({}, message), {}, {
          Sender: Chatty.member
        });
      }
    }, {
      key: "uploadFiles",
      value: function uploadFiles(files) {
        return new Promise( /*#__PURE__*/function () {
          var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(resolve, reject) {
            var result;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.prev = 0;
                  if (!Chatty.axiosInstance) {
                    reject(":: ChattyClient is not initailized");
                  }
                  if (!validateFiles(files, Chatty.app)) {
                    reject(":: ChattyClient uploadFiles - File validations are failed");
                  }
                  _context2.next = 5;
                  return Promise.all(files.map( /*#__PURE__*/function () {
                    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(file) {
                      var _a, _b, _c, form, uploadUrl, uploaded, baseurl;
                      return _regeneratorRuntime().wrap(function _callee$(_context) {
                        while (1) switch (_context.prev = _context.next) {
                          case 0:
                            form = new browser();
                            form.append("file", file);
                            _context.next = 4;
                            return (_a = Chatty.axiosInstance) === null || _a === void 0 ? void 0 : _a.get("/uploadurl");
                          case 4:
                            uploadUrl = _context.sent;
                            if (!(uploadUrl === null || uploadUrl === void 0 ? void 0 : uploadUrl.data)) {
                              reject(":: ChattyClient uploadFiles - Getting uploadUrl failed");
                            }
                            _context.next = 8;
                            return axios.post(uploadUrl === null || uploadUrl === void 0 ? void 0 : uploadUrl.data, form, {
                              headers: {
                                "Content-Type": "multipart/form-data",
                                Accept: "application/json"
                              }
                            });
                          case 8:
                            uploaded = _context.sent;
                            if (!((_b = uploaded === null || uploaded === void 0 ? void 0 : uploaded.data) === null || _b === void 0 ? void 0 : _b.result)) {
                              _context.next = 14;
                              break;
                            }
                            baseurl = uploaded.data.result.variants[0].split(uploaded.data.result.id)[0];
                            return _context.abrupt("return", {
                              uri: baseurl + uploaded.data.result.id + "/" + ((_c = Chatty.app) === null || _c === void 0 ? void 0 : _c.thumbnailSize)
                            });
                          case 14:
                            return _context.abrupt("return", {
                              uri: ""
                            });
                          case 15:
                          case "end":
                            return _context.stop();
                        }
                      }, _callee);
                    }));
                    return function (_x3) {
                      return _ref2.apply(this, arguments);
                    };
                  }()));
                case 5:
                  result = _context2.sent;
                  resolve(result);
                  _context2.next = 13;
                  break;
                case 9:
                  _context2.prev = 9;
                  _context2.t0 = _context2["catch"](0);
                  console.warn(":: ChattyClient uploadFiles error %O", _context2.t0);
                  reject(_context2.t0.message);
                case 13:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, null, [[0, 9]]);
          }));
          return function (_x, _x2) {
            return _ref.apply(this, arguments);
          };
        }());
      }
      /**
       * @deprecated can't be used by user. It's used as BY ADMIN or BY SYSTEM
       * @param json
       * @returns
       */
    }, {
      key: "sendJsonMessage",
      value: function sendJsonMessage(json) {
        var _a;
        if (!json) {
          console.warn(":: ChattyChat sendJsonMessage function param error: json param undefined");
          return;
        }
        var message = {
          id: "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
              v = c == "x" ? r : r & 0x3 | 0x8;
            return v.toString(16);
          }),
          createdAt: new Date(),
          json: json,
          text: "Json Message",
          type: eMessageType.JSON,
          by: eMessageBy.USER,
          SenderId: (_a = Chatty.member) === null || _a === void 0 ? void 0 : _a.id
        };
        return _objectSpread2(_objectSpread2({}, message), {}, {
          Sender: Chatty.member
        });
      }
    }, {
      key: "addListener",
      value: function addListener() {
        var _this2 = this;
        if (!this.socket) {
          console.warn(":: ChattyChat socket is not connected");
          return;
        }
        this.socket.on(eChattyEvent.CONNECT_DONE, function (data) {
          var _a;
          console.debug(":: ChattyChat CONNECT_DONE", data);
          _this2.id = (_a = data.chat) === null || _a === void 0 ? void 0 : _a.id; // 연결된 ChatId를 Chat instance에 저장 > 필요한 경우 다시 enable
          _this2.onChatConnect && _this2.onChatConnect(data);
          _this2.fetchMessages({
            refresh: true
          });
        });
        this.socket.on(eChattyEvent.CONNECT_FAIL, function (error) {
          console.warn(":: ChattyChat CONNECT_FAIL", error.message);
          _this2.onChatConnect && _this2.onChatConnect({
            error: error
          });
        });
        this.socket.on(eChattyEvent.FETCH_MESSAGES_DONE, function (data) {
          console.debug(":: ChattyChat FETCH_MESSAGES_DONE", data);
          _this2.onMessagesFetch && _this2.onMessagesFetch(data);
          _this2.markAsRead();
        });
        this.socket.on(eChattyEvent.FETCH_MESSAGES_FAIL, function (error) {
          console.warn(":: ChattyChat FETCH_MESSAGES_FAIL", error.message);
          _this2.onMessagesFetch && _this2.onMessagesFetch({
            error: error
          });
        });
        this.socket.on(eChattyEvent.SEND_MESSAGE_DONE, function (data) {
          console.debug(":: ChattyChat SEND_MESSAGE_DONE", data);
          _this2.onMessageSend && _this2.onMessageSend(data);
          // 내가 메시지를 보낸게 성공하면 ChatList 에서 REFRESH_CHAT 해야한다.
          if (_this2.chatlist && _this2.id) {
            _this2.chatlist.refreshChat(_this2.id);
          }
        });
        this.socket.on(eChattyEvent.SEND_MESSAGE_FAIL, function (error) {
          console.warn(":: ChattyChat SEND_MESSAGE_FAIL", error.message);
          _this2.onMessageSend && _this2.onMessageSend({
            error: error
          });
        });
        this.socket.on(eChattyEvent.SEND_MESSAGE_RETRY, function (data) {
          var _a;
          console.debug(":: ChattyChat SEND_MESSAGE_RETRY", data);
          (_a = _this2.socket) === null || _a === void 0 ? void 0 : _a.emit(eChattyEvent.SEND_MESSAGE, data);
        });
        this.socket.on(eChattyEvent.RECEIVE_MESSAGE, function (data) {
          console.debug(":: ChattyChat RECEIVE_MESSAGE", data);
          _this2.onMessageReceive && _this2.onMessageReceive(data);
          _this2.markAsRead();
        });
        this.socket.on(eChattyEvent.MARK_AS_READ_DONE, function (data) {
          console.debug(":: ChattyChat MARK_AS_READ_DONE", data);
          // ChatList 로부터 왔다면 REFRESH_CHAT 해야한다
          if (_this2.chatlist && _this2.id) {
            _this2.chatlist.refreshChat(_this2.id);
          }
        });
        this.socket.on(eChattyEvent.MARK_AS_READ_FAIL, function (error) {
          console.warn(":: ChattyChat MARK_AS_READ_FAIL", error.message);
        });
        this.socket.on(eChattyEvent.MARK_AS_READ_BYPASS, function () {
          // MARK_AS_READ_DONE의 응답으로  data가 MARK_AS_READ_BYPASS 인경우가 있다.
          // member 가 SUPER인경우에 해당되며 MARK_AS_READ 요청에대해 서버가 bypass로 동작한다
          console.debug(":: ChattyChat MARK_AS_READ_BYPASS");
        });
        /**
         * UPDATE_MESSAGES 는 Server로부터 Emit
         *
         * 1. MARK_AS_READ 는 아래의 경우 발생 > 상대방의 Message Bubble에서 readReceipt를 변경하기 위해서
         * - RECEIVE_MESSAGE 를 받은 후
         * - FETCH_MESSAGES_DONE 을 받은후
         *
         * 2. Server에서 DELETE_MESSAGE가 성공적으로 이루어진후 > Chat Message의 삭제내용을 업데이트
         */
        this.socket.on(eChattyEvent.UPDATE_MESSAGES, function (data) {
          console.debug(":: ChattyChat UPDATE_MESSAGES", data);
          _this2.onMessagesUpdate && _this2.onMessagesUpdate(data);
        });
        this.socket.on(eChattyEvent.REFRESH_CHAT_DONE, function (data) {
          console.debug(":: ChattyChat REFRESH_CHAT_DONE", data);
          _this2.onChatRefresh && _this2.onChatRefresh(data);
        });
        this.socket.on(eChattyEvent.REFRESH_CHAT_FAIL, function (error) {
          console.warn(":: ChattyChat REFRESH_CHAT_FAIL", error.message);
          _this2.onChatRefresh && _this2.onChatRefresh({
            error: error
          });
        });
        this.socket.on(eChattyEvent.LEAVE_CHAT_DONE, function (data) {
          console.debug(":: ChattyChat LEAVE_CHAT_DONE", data);
          _this2.onChatLeave && _this2.onChatLeave(data);
        });
        this.socket.on(eChattyEvent.LEAVE_CHAT_FAIL, function (error) {
          console.warn(":: ChattyChat LEAVE_CHAT_FAIL", error.message);
          _this2.onChatLeave && _this2.onChatLeave({
            error: error
          });
        });
        this.socket.on(eChattyEvent.DELETE_MESSAGE_FAIL, function (error) {
          console.warn(":: ChattyChat DELETE_MESSAGE_FAIL", error.message);
          _this2.onMessagesUpdate && _this2.onMessagesUpdate({
            error: error
          });
        });
      }
    }, {
      key: "removeListener",
      value: function removeListener() {
        if (!this.socket) {
          console.warn(":: ChattyChat socket is not connected");
          return;
        }
        this.socket.off(eChattyEvent.CONNECT_DONE);
        this.socket.off(eChattyEvent.CONNECT_FAIL);
        this.socket.off(eChattyEvent.FETCH_MESSAGES_DONE);
        this.socket.off(eChattyEvent.FETCH_MESSAGES_FAIL);
        this.socket.off(eChattyEvent.SEND_MESSAGE_DONE);
        this.socket.off(eChattyEvent.SEND_MESSAGE_FAIL);
        this.socket.off(eChattyEvent.SEND_MESSAGE_RETRY);
        this.socket.off(eChattyEvent.RECEIVE_MESSAGE);
        this.socket.off(eChattyEvent.MARK_AS_READ_DONE);
        this.socket.off(eChattyEvent.MARK_AS_READ_FAIL);
        this.socket.off(eChattyEvent.MARK_AS_READ_BYPASS);
        this.socket.off(eChattyEvent.UPDATE_MESSAGES);
        this.socket.off(eChattyEvent.REFRESH_CHAT_DONE);
        this.socket.off(eChattyEvent.REFRESH_CHAT_FAIL);
        this.socket.off(eChattyEvent.LEAVE_CHAT_DONE);
        this.socket.off(eChattyEvent.LEAVE_CHAT_FAIL);
        this.socket.off(eChattyEvent.DELETE_MESSAGE_FAIL);
        this.socket = undefined;
        this.chatlist = undefined;
        this.id = undefined;
      }
    }]);
    return Chat;
  }();
  function validateFiles(files, app) {
    if (!app) {
      console.warn(":: ChattyClient App is undefined");
      return false;
    }
    if (!files.length) {
      console.warn(":: ChattyClient File param is empty");
      return false;
    }
    files.map(function (file) {
      if (!file.type) {
        console.warn(":: ChattyClient File type is not defined");
        return false;
      }
      if (file.type.split("/")[0] === "image" && !app.enableImageUpload) {
        console.warn(":: ChattyClient Image upload is not enabled");
        return false;
      }
      if (file.type.split("/")[0] === "video" && !app.enableVideoUpload) {
        console.warn(":: ChattyClient Video upload is not enabled");
        return false;
      }
      if (file.type.split("/")[0] === "image" && !SupportedImageFormat.includes(file.type)) {
        console.warn(":: ChattyClient Image format '".concat(file.type, "' is not supported"));
        return false;
      }
      if (file.type.split("/")[0] === "video" && !SupportedVideoFormat.includes(file.type)) {
        console.warn(":: ChattyClient Video format '".concat(file.type, "' is not supported"));
        return false;
      }
    });
    return true;
  }

  var ChatList = /*#__PURE__*/function () {
    function ChatList(payload) {
      _classCallCheck(this, ChatList);
      this.filter = payload.filter;
      this.onChatListConnect = payload.onChatListConnect;
      this.onChatsFetch = payload.onChatsFetch;
      this.onChatRefresh = payload.onChatRefresh;
      this.onChatLeave = payload.onChatLeave;
    }
    _createClass(ChatList, [{
      key: "connect",
      value: function connect() {
        var _a, _b, _c;
        this.socket = lookup("wss://devsocket.chatty-cloud.com" + "/chatlist.".concat((_a = Chatty.app) === null || _a === void 0 ? void 0 : _a.name), {
          // transports: ["polling", "websocket"],
          transports: ["websocket"],
          query: {
            MemberId: ((_b = Chatty.member) === null || _b === void 0 ? void 0 : _b.id) || "",
            AppId: ((_c = Chatty.app) === null || _c === void 0 ? void 0 : _c.id) || "",
            filter: this.filter && JSON.stringify(this.filter) || ""
          },
          auth: {
            apikey: Chatty.apiKey || ""
          },
          forceNew: true
        });
        this.addListener();
      }
    }, {
      key: "disconnect",
      value: function disconnect() {
        var _a;
        (_a = this.socket) === null || _a === void 0 ? void 0 : _a.disconnect();
        this.removeListener();
        console.debug(":: ChatList disconnected");
      }
    }, {
      key: "fetchChats",
      value: function fetchChats(payload) {
        var _a;
        (_a = this.socket) === null || _a === void 0 ? void 0 : _a.emit(eChattyEvent.FETCH_CHATS, payload);
      }
    }, {
      key: "refreshChat",
      value: function refreshChat(ChatId) {
        var _a;
        (_a = this.socket) === null || _a === void 0 ? void 0 : _a.emit(eChattyEvent.REFRESH_CHAT, {
          ChatId: ChatId
        });
      }
    }, {
      key: "leaveChat",
      value: function leaveChat(ChatId) {
        var _a;
        (_a = this.socket) === null || _a === void 0 ? void 0 : _a.emit(eChattyEvent.LEAVE_CHAT, {
          ChatId: ChatId
        });
      }
    }, {
      key: "addListener",
      value: function addListener() {
        var _this = this;
        if (!this.socket) {
          console.warn(":: ChatList socket is not connected");
          return;
        }
        this.socket.on(eChattyEvent.CONNECT_DONE, function (data) {
          console.debug(":: ChatList CONNECT_DONE", data);
          _this.onChatListConnect && _this.onChatListConnect(data);
          // this.fetchChats({ refresh: true }); // server에서 connect와 동시에 fetch가 이루어짐
        });

        this.socket.on(eChattyEvent.CONNECT_FAIL, function (error) {
          console.warn(":: ChatList CONNECT_FAIL", error.message);
          _this.onChatListConnect && _this.onChatListConnect({
            error: error
          });
        });
        this.socket.on(eChattyEvent.FETCH_CHATS_DONE, function (data) {
          console.debug(":: ChatList FETCH_CHATS_DONE", data);
          _this.onChatsFetch && _this.onChatsFetch(data);
        });
        this.socket.on(eChattyEvent.FETCH_CHATS_FAIL, function (error) {
          console.warn(":: ChatList FETCH_CHATS_FAIL", error.message);
          _this.onChatsFetch && _this.onChatsFetch({
            error: error
          });
        });
        this.socket.on(eChattyEvent.REFRESH_CHAT_DONE, function (data) {
          console.debug(":: ChatList REFRESH_CHAT_DONE", data);
          _this.onChatRefresh && _this.onChatRefresh(data);
        });
        this.socket.on(eChattyEvent.REFRESH_CHAT_FAIL, function (error) {
          console.warn(":: ChatList REFRESH_CHAT_FAIL", error.message);
          _this.onChatRefresh && _this.onChatRefresh({
            error: error
          });
        });
        this.socket.on(eChattyEvent.LEAVE_CHAT_DONE, function (data) {
          console.debug(":: ChatList LEAVE_CHAT_DONE", data);
          _this.onChatLeave && _this.onChatLeave(data);
        });
        this.socket.on(eChattyEvent.LEAVE_CHAT_FAIL, function (error) {
          console.warn(":: ChatList LEAVE_CHAT_FAIL", error.message);
          _this.onChatLeave && _this.onChatLeave({
            error: error
          });
        });
      }
    }, {
      key: "removeListener",
      value: function removeListener() {
        if (!this.socket) {
          console.warn(":: ChatList socket is not connected");
          return;
        }
        this.socket.off(eChattyEvent.CONNECT_DONE);
        this.socket.off(eChattyEvent.CONNECT_FAIL);
        this.socket.off(eChattyEvent.FETCH_CHATS_DONE);
        this.socket.off(eChattyEvent.FETCH_CHATS_FAIL);
        this.socket.off(eChattyEvent.REFRESH_CHAT_DONE);
        this.socket.off(eChattyEvent.REFRESH_CHAT_FAIL);
        this.socket.off(eChattyEvent.LEAVE_CHAT_DONE);
        this.socket.off(eChattyEvent.LEAVE_CHAT_FAIL);
        this.socket = undefined;
      }
    }]);
    return ChatList;
  }();

  var Chatty = /*#__PURE__*/function () {
    function Chatty() {
      _classCallCheck(this, Chatty);
    }
    _createClass(Chatty, null, [{
      key: "init",
      value:
      /**
       * @description static method init is for initialize chatty client. it will initialize apiKey and chat member
       * @param {iInitPayload} payload
       */
      function () {
        var _init = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(payload) {
          var _a, missedCount, deviceInfo;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                missedCount = undefined;
                this.apiKey = payload.apiKey;
                this.axiosInstance = configAxios(this.apiKey);
                deviceInfo = {
                  platform: navigator.platform,
                  language: navigator.language,
                  product: navigator.product,
                  userAgent: navigator.userAgent,
                  sdkVersion: "1.2.0"
                };
                _context.next = 7;
                return this.getApp();
              case 7:
                this.app = _context.sent;
                _context.next = 10;
                return this.upsertMember(_objectSpread2(_objectSpread2({}, payload.member), {}, {
                  device: deviceInfo,
                  AppId: (_a = this.app) === null || _a === void 0 ? void 0 : _a.id
                }));
              case 10:
                this.member = _context.sent;
                if (!(this.app && this.member)) {
                  _context.next = 18;
                  break;
                }
                console.info(":: ChattyClient init success");
                console.info(":: ChattyClient [App]", this.app);
                console.info(":: ChattyClient [Member]", this.member);
                _context.next = 17;
                return this.getMissedCount();
              case 17:
                missedCount = _context.sent;
              case 18:
                return _context.abrupt("return", missedCount);
              case 21:
                _context.prev = 21;
                _context.t0 = _context["catch"](0);
                console.warn(":: ChattyClient init fail", _context.t0.message);
              case 24:
              case "end":
                return _context.stop();
            }
          }, _callee, this, [[0, 21]]);
        }));
        function init(_x) {
          return _init.apply(this, arguments);
        }
        return init;
      }()
      /**
       * @description static method exit is for terminating chatty client. it will destroy Chatty static members
       * @param {iExitPayload} payload
       */
    }, {
      key: "exit",
      value: function () {
        var _exit = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(payload) {
          var _a;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                if (!this.member) {
                  _context2.next = 9;
                  break;
                }
                if (!payload.deleteMember) {
                  _context2.next = 7;
                  break;
                }
                _context2.next = 5;
                return this.deleteMember(this.member.id);
              case 5:
                _context2.next = 9;
                break;
              case 7:
                _context2.next = 9;
                return this.upsertMember(_objectSpread2(_objectSpread2({}, this.member), {}, {
                  deviceToken: "",
                  AppId: (_a = this.app) === null || _a === void 0 ? void 0 : _a.id
                }));
              case 9:
                this.apiKey = undefined;
                this.app = undefined;
                this.member = undefined;
                this.axiosInstance = undefined;
                console.debug(":: ChattyClient exit success");
                _context2.next = 19;
                break;
              case 16:
                _context2.prev = 16;
                _context2.t0 = _context2["catch"](0);
                console.warn(":: ChattyClient exit fail ", _context2.t0.message);
              case 19:
              case "end":
                return _context2.stop();
            }
          }, _callee2, this, [[0, 16]]);
        }));
        function exit(_x2) {
          return _exit.apply(this, arguments);
        }
        return exit;
      }()
      /**
       *
      ____ _____  ____  _____
      / __ `/ __ \/ __ \/ ___/
      / /_/ / /_/ / /_/ (__  )
      \__,_/ .___/ .___/____/
        /_/   /_/
          */
    }, {
      key: "getApp",
      value: function () {
        var _getApp = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
          return _regeneratorRuntime().wrap(function _callee3$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                if (this.axiosInstance) {
                  _context3.next = 3;
                  break;
                }
                console.warn(":: ChattyClient was not initailized");
                return _context3.abrupt("return");
              case 3:
                _context3.next = 5;
                return this.axiosInstance.get("/apps").then(function (res) {
                  return Promise.resolve(res.data);
                })["catch"](function (message) {
                  return Promise.reject({
                    message: "getApp error - " + message
                  });
                });
              case 5:
                return _context3.abrupt("return", _context3.sent);
              case 6:
              case "end":
                return _context3.stop();
            }
          }, _callee3, this);
        }));
        function getApp() {
          return _getApp.apply(this, arguments);
        }
        return getApp;
      }()
      /**
       *
            __          __
      _____/ /_  ____ _/ /______
      / ___/ __ \/ __ `/ __/ ___/
      / /__/ / / / /_/ / /_(__  )
      \___/_/ /_/\__,_/\__/____/
                                
       */
      /**
       * @description Create new chat
       * @param {iCreateChatPayload} payload
       * @returns {Promise<iChat>}
       */
    }, {
      key: "createChat",
      value: function () {
        var _createChat = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(payload) {
          var _this = this;
          var _a, _b, _c, adminMessage;
          return _regeneratorRuntime().wrap(function _callee4$(_context4) {
            while (1) switch (_context4.prev = _context4.next) {
              case 0:
                if (!(!this.axiosInstance || !this.app)) {
                  _context4.next = 3;
                  break;
                }
                console.warn(":: ChattyClient was not initailized");
                return _context4.abrupt("return");
              case 3:
                if (!(payload.Members && payload.Members.length > this.app.chatCapacity)) {
                  _context4.next = 6;
                  break;
                }
                console.warn(":: ChattyClient createChat error - Maximum chat member count exceeded");
                return _context4.abrupt("return");
              case 6:
                adminMessage = payload.adminMessage;
                delete payload["adminMessage"];
                _context4.next = 10;
                return this.axiosInstance.post("/chats", _objectSpread2(_objectSpread2({}, payload), {}, {
                  image: payload.image ? {
                    uri: payload.image
                  } : undefined,
                  Members: (_a = payload.Members) === null || _a === void 0 ? void 0 : _a.map(function (MemberId) {
                    var _a;
                    return {
                      MemberId: MemberId,
                      AppId: (_a = _this.app) === null || _a === void 0 ? void 0 : _a.id
                    };
                  }),
                  Messages: adminMessage ? [_objectSpread2(_objectSpread2({}, adminMessage), {}, {
                    AppId: (_b = this.app) === null || _b === void 0 ? void 0 : _b.id,
                    type: adminMessage.json ? eMessageType.JSON : eMessageType.TEXT,
                    by: eMessageBy.ADMIN
                  })] : undefined,
                  AppId: (_c = this.app) === null || _c === void 0 ? void 0 : _c.id
                })).then(function (res) {
                  return Promise.resolve(res.data);
                })["catch"](function (message) {
                  return Promise.reject({
                    message: ":: ChattyClient createChat error - " + message
                  });
                });
              case 10:
                return _context4.abrupt("return", _context4.sent);
              case 11:
              case "end":
                return _context4.stop();
            }
          }, _callee4, this);
        }));
        function createChat(_x3) {
          return _createChat.apply(this, arguments);
        }
        return createChat;
      }()
      /**
       * @description Update existing chat
       * @param {iUpdateChatPayload} payload
       * @returns {Promise<iChat>}
       */
    }, {
      key: "updateChat",
      value: function () {
        var _updateChat = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(payload) {
          var _this2 = this;
          var _a, _b, _c, adminMessage;
          return _regeneratorRuntime().wrap(function _callee5$(_context5) {
            while (1) switch (_context5.prev = _context5.next) {
              case 0:
                if (!(!this.axiosInstance || !this.app)) {
                  _context5.next = 3;
                  break;
                }
                console.warn(":: ChattyClient was not initailized");
                return _context5.abrupt("return");
              case 3:
                if (!(payload.Members && payload.Members.length > this.app.chatCapacity)) {
                  _context5.next = 6;
                  break;
                }
                console.warn(":: ChattyClient updateChat error - Maximum chat member count exceeded");
                return _context5.abrupt("return");
              case 6:
                adminMessage = payload.adminMessage;
                delete payload["adminMessage"];
                _context5.next = 10;
                return this.axiosInstance.put("/chats", _objectSpread2(_objectSpread2({}, payload), {}, {
                  image: payload.image ? {
                    uri: payload.image
                  } : undefined,
                  Members: (_a = payload.Members) === null || _a === void 0 ? void 0 : _a.map(function (MemberId) {
                    var _a;
                    return {
                      MemberId: MemberId,
                      AppId: (_a = _this2.app) === null || _a === void 0 ? void 0 : _a.id
                    };
                  }),
                  Messages: adminMessage ? [_objectSpread2(_objectSpread2({}, adminMessage), {}, {
                    AppId: (_b = this.app) === null || _b === void 0 ? void 0 : _b.id,
                    type: adminMessage.json ? eMessageType.JSON : eMessageType.TEXT,
                    by: eMessageBy.ADMIN
                  })] : undefined,
                  AppId: (_c = this.app) === null || _c === void 0 ? void 0 : _c.id
                })).then(function (res) {
                  return Promise.resolve(res.data);
                })["catch"](function (message) {
                  return Promise.reject({
                    message: ":: ChattyClient updateChat error - " + message
                  });
                });
              case 10:
                return _context5.abrupt("return", _context5.sent);
              case 11:
              case "end":
                return _context5.stop();
            }
          }, _callee5, this);
        }));
        function updateChat(_x4) {
          return _updateChat.apply(this, arguments);
        }
        return updateChat;
      }()
      /**
       *
       ____ ___  ___  ______________ _____ ____  _____
      / __ `__ \/ _ \/ ___/ ___/ __ `/ __ `/ _ \/ ___/
      / / / / / /  __(__  |__  ) /_/ / /_/ /  __(__  )
      /_/ /_/ /_/\___/____/____/\__,_/\__, /\___/____/
                                   /____/
          */
      /**
       * @description Create Admin Message. Used only when being aware of a chat's distinctKey not a chat's id. furthermore, if there is no matched chat, create new chat with the distinctKey,
       * @param {iCreateAdminMessagePayload} payload
       * @returns {Promise<iChat>}
       */
    }, {
      key: "createAdminMessage",
      value: function () {
        var _createAdminMessage = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(payload) {
          var _this3 = this;
          var _a, _b, _c, adminMessage;
          return _regeneratorRuntime().wrap(function _callee6$(_context6) {
            while (1) switch (_context6.prev = _context6.next) {
              case 0:
                if (!(!this.axiosInstance || !this.app)) {
                  _context6.next = 3;
                  break;
                }
                console.warn(":: ChattyClient was not initailized");
                return _context6.abrupt("return");
              case 3:
                if (!(payload.Members && payload.Members.length > this.app.chatCapacity)) {
                  _context6.next = 6;
                  break;
                }
                console.warn(":: ChattyClient createAdminMessage error - Maximum chat member count exceeded");
                return _context6.abrupt("return");
              case 6:
                adminMessage = payload.adminMessage;
                delete payload["adminMessage"];
                _context6.next = 10;
                return this.axiosInstance.post("/messages", _objectSpread2(_objectSpread2({}, payload), {}, {
                  image: payload.image ? {
                    uri: payload.image
                  } : undefined,
                  Members: (_a = payload.Members) === null || _a === void 0 ? void 0 : _a.map(function (MemberId) {
                    var _a;
                    return {
                      MemberId: MemberId,
                      AppId: (_a = _this3.app) === null || _a === void 0 ? void 0 : _a.id
                    };
                  }),
                  Messages: adminMessage ? [_objectSpread2(_objectSpread2({}, adminMessage), {}, {
                    AppId: (_b = this.app) === null || _b === void 0 ? void 0 : _b.id,
                    type: adminMessage.json ? eMessageType.JSON : eMessageType.TEXT,
                    by: eMessageBy.ADMIN
                  })] : undefined,
                  AppId: (_c = this.app) === null || _c === void 0 ? void 0 : _c.id
                })).then(function (res) {
                  return Promise.resolve(res.data);
                })["catch"](function (message) {
                  return Promise.reject({
                    message: ":: ChattyClient createAdminMessage error - " + message
                  });
                });
              case 10:
                return _context6.abrupt("return", _context6.sent);
              case 11:
              case "end":
                return _context6.stop();
            }
          }, _callee6, this);
        }));
        function createAdminMessage(_x5) {
          return _createAdminMessage.apply(this, arguments);
        }
        return createAdminMessage;
      }()
      /**
       *
                                 __
       ____ ___  ___  ____ ___  / /_  ___  __________
      / __ `__ \/ _ \/ __ `__ \/ __ \/ _ \/ ___/ ___/
      / / / / / /  __/ / / / / / /_/ /  __/ /  (__  )
      /_/ /_/ /_/\___/_/ /_/ /_/_.___/\___/_/  /____/
                                                                                          
       */
      /**
       * @description Get members with filters
       * @param {iMembersFilter} filter - member filters
       * @returns {Promise<Array<iMember>>}
       */
    }, {
      key: "getMembers",
      value: function () {
        var _getMembers = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(filter) {
          return _regeneratorRuntime().wrap(function _callee7$(_context7) {
            while (1) switch (_context7.prev = _context7.next) {
              case 0:
                if (!(!this.axiosInstance || !this.app)) {
                  _context7.next = 3;
                  break;
                }
                console.warn(":: ChattyClient was not initailized");
                return _context7.abrupt("return");
              case 3:
                _context7.next = 5;
                return this.axiosInstance.get("/members", {
                  params: {
                    AppId: this.app.id,
                    group: filter.group,
                    ChatId: filter.ChatId
                  }
                }).then(function (res) {
                  return Promise.resolve(res.data);
                })["catch"](function (message) {
                  return Promise.reject({
                    message: ":: ChattyClient getMembers error - " + message
                  });
                });
              case 5:
                return _context7.abrupt("return", _context7.sent);
              case 6:
              case "end":
                return _context7.stop();
            }
          }, _callee7, this);
        }));
        function getMembers(_x6) {
          return _getMembers.apply(this, arguments);
        }
        return getMembers;
      }()
    }, {
      key: "upsertMember",
      value: function () {
        var _upsertMember = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(member) {
          return _regeneratorRuntime().wrap(function _callee8$(_context8) {
            while (1) switch (_context8.prev = _context8.next) {
              case 0:
                if (this.axiosInstance) {
                  _context8.next = 3;
                  break;
                }
                console.warn(":: ChattyClient was not initailized");
                return _context8.abrupt("return");
              case 3:
                _context8.next = 5;
                return this.axiosInstance.put("/members", member).then(function (res) {
                  return Promise.resolve(res.data);
                })["catch"](function (message) {
                  return Promise.reject({
                    message: "Chatty.upsertMember error - " + message
                  });
                });
              case 5:
                return _context8.abrupt("return", _context8.sent);
              case 6:
              case "end":
                return _context8.stop();
            }
          }, _callee8, this);
        }));
        function upsertMember(_x7) {
          return _upsertMember.apply(this, arguments);
        }
        return upsertMember;
      }()
    }, {
      key: "deleteMember",
      value: function () {
        var _deleteMember = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(id) {
          return _regeneratorRuntime().wrap(function _callee9$(_context9) {
            while (1) switch (_context9.prev = _context9.next) {
              case 0:
                if (!(!this.axiosInstance || !this.app)) {
                  _context9.next = 3;
                  break;
                }
                console.warn(":: ChattyClient was not initailized");
                return _context9.abrupt("return");
              case 3:
                _context9.next = 5;
                return this.axiosInstance["delete"]("/members/".concat(id), {
                  params: {
                    AppId: this.app.id
                  }
                }).then(function (res) {
                  return Promise.resolve(res.data);
                })["catch"](function (message) {
                  return Promise.reject({
                    message: "Chatty.deleteMember error - " + message
                  });
                });
              case 5:
                return _context9.abrupt("return", _context9.sent);
              case 6:
              case "end":
                return _context9.stop();
            }
          }, _callee9, this);
        }));
        function deleteMember(_x8) {
          return _deleteMember.apply(this, arguments);
        }
        return deleteMember;
      }()
      /**
       *
            __
      ___  / /______
      / _ \/ __/ ___/
      /  __/ /_/ /__
      \___/\__/\___/
                    
       */
      /**
       * @description non-socket api for getting distinctKey. this distinctKey is used for making the chat unique
       * @param payload {...payload: string[]} - dynamic parameters of string, best option is id of chat memmbers
       * @returns {string} - return md5 hashed value
       */
    }, {
      key: "generateDistinctKey",
      value: function generateDistinctKey() {
        for (var _len = arguments.length, payload = new Array(_len), _key = 0; _key < _len; _key++) {
          payload[_key] = arguments[_key];
        }
        if (!payload || !payload.length) {
          console.warn(":: ChattyClient generateDistinctKey error - param data is undefined");
          return;
        }
        if (!this.app) {
          console.warn(":: ChattyClient generateDistinctKey error - Chatty was not initialized");
          return;
        }
        // add AppId to hash elements
        payload.push(this.app.id);
        var inputValue = payload.sort().toString();
        if (inputValue.length >= 255) {
          console.warn(":: ChattyClient generateDistinctKey error - md5 input string is too long");
          return;
        }
        var MD5 = function MD5(d) {
          var result = M(V(Y(X(d), 8 * d.length)));
          return result.toLowerCase();
        };
        function M(d) {
          for (var _, m = "0123456789ABCDEF", f = "", r = 0; r < d.length; r++) _ = d.charCodeAt(r), f += m.charAt(_ >>> 4 & 15) + m.charAt(15 & _);
          return f;
        }
        function X(d) {
          for (var _ = Array(d.length >> 2), m = 0; m < _.length; m++) _[m] = 0;
          for (m = 0; m < 8 * d.length; m += 8) _[m >> 5] |= (255 & d.charCodeAt(m / 8)) << m % 32;
          return _;
        }
        function V(d) {
          for (var _ = "", m = 0; m < 32 * d.length; m += 8) _ += String.fromCharCode(d[m >> 5] >>> m % 32 & 255);
          return _;
        }
        function Y(d, _) {
          d[_ >> 5] |= 128 << _ % 32, d[14 + (_ + 64 >>> 9 << 4)] = _;
          for (var m = 1732584193, f = -271733879, r = -1732584194, i = 271733878, n = 0; n < d.length; n += 16) {
            var h = m,
              t = f,
              g = r,
              e = i;
            f = md5_ii(f = md5_ii(f = md5_ii(f = md5_ii(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_ff(f = md5_ff(f = md5_ff(f = md5_ff(f, r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 0], 7, -680876936), f, r, d[n + 1], 12, -389564586), m, f, d[n + 2], 17, 606105819), i, m, d[n + 3], 22, -1044525330), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 4], 7, -176418897), f, r, d[n + 5], 12, 1200080426), m, f, d[n + 6], 17, -1473231341), i, m, d[n + 7], 22, -45705983), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 8], 7, 1770035416), f, r, d[n + 9], 12, -1958414417), m, f, d[n + 10], 17, -42063), i, m, d[n + 11], 22, -1990404162), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 12], 7, 1804603682), f, r, d[n + 13], 12, -40341101), m, f, d[n + 14], 17, -1502002290), i, m, d[n + 15], 22, 1236535329), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 1], 5, -165796510), f, r, d[n + 6], 9, -1069501632), m, f, d[n + 11], 14, 643717713), i, m, d[n + 0], 20, -373897302), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 5], 5, -701558691), f, r, d[n + 10], 9, 38016083), m, f, d[n + 15], 14, -660478335), i, m, d[n + 4], 20, -405537848), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 9], 5, 568446438), f, r, d[n + 14], 9, -1019803690), m, f, d[n + 3], 14, -187363961), i, m, d[n + 8], 20, 1163531501), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 13], 5, -1444681467), f, r, d[n + 2], 9, -51403784), m, f, d[n + 7], 14, 1735328473), i, m, d[n + 12], 20, -1926607734), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 5], 4, -378558), f, r, d[n + 8], 11, -2022574463), m, f, d[n + 11], 16, 1839030562), i, m, d[n + 14], 23, -35309556), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 1], 4, -1530992060), f, r, d[n + 4], 11, 1272893353), m, f, d[n + 7], 16, -155497632), i, m, d[n + 10], 23, -1094730640), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 13], 4, 681279174), f, r, d[n + 0], 11, -358537222), m, f, d[n + 3], 16, -722521979), i, m, d[n + 6], 23, 76029189), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 9], 4, -640364487), f, r, d[n + 12], 11, -421815835), m, f, d[n + 15], 16, 530742520), i, m, d[n + 2], 23, -995338651), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 0], 6, -198630844), f, r, d[n + 7], 10, 1126891415), m, f, d[n + 14], 15, -1416354905), i, m, d[n + 5], 21, -57434055), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 12], 6, 1700485571), f, r, d[n + 3], 10, -1894986606), m, f, d[n + 10], 15, -1051523), i, m, d[n + 1], 21, -2054922799), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 8], 6, 1873313359), f, r, d[n + 15], 10, -30611744), m, f, d[n + 6], 15, -1560198380), i, m, d[n + 13], 21, 1309151649), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 4], 6, -145523070), f, r, d[n + 11], 10, -1120210379), m, f, d[n + 2], 15, 718787259), i, m, d[n + 9], 21, -343485551), m = safe_add(m, h), f = safe_add(f, t), r = safe_add(r, g), i = safe_add(i, e);
          }
          return Array(m, f, r, i);
        }
        function md5_cmn(d, _, m, f, r, i) {
          return safe_add(bit_rol(safe_add(safe_add(_, d), safe_add(f, i)), r), m);
        }
        function md5_ff(d, _, m, f, r, i, n) {
          return md5_cmn(_ & m | ~_ & f, d, _, r, i, n);
        }
        function md5_gg(d, _, m, f, r, i, n) {
          return md5_cmn(_ & f | m & ~f, d, _, r, i, n);
        }
        function md5_hh(d, _, m, f, r, i, n) {
          return md5_cmn(_ ^ m ^ f, d, _, r, i, n);
        }
        function md5_ii(d, _, m, f, r, i, n) {
          return md5_cmn(m ^ (_ | ~f), d, _, r, i, n);
        }
        function safe_add(d, _) {
          var m = (65535 & d) + (65535 & _);
          return (d >> 16) + (_ >> 16) + (m >> 16) << 16 | 65535 & m;
        }
        function bit_rol(d, _) {
          return d << _ | d >>> 32 - _;
        }
        return MD5(inputValue);
      }
      /**
       * @description non-socket api for getting missed count. commonly used for show badge count on chat button
       * @returns {Promise<iMissedCount>}
       */
    }, {
      key: "getMissedCount",
      value: function () {
        var _getMissedCount = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
          return _regeneratorRuntime().wrap(function _callee10$(_context10) {
            while (1) switch (_context10.prev = _context10.next) {
              case 0:
                if (!(!this.axiosInstance || !this.member)) {
                  _context10.next = 3;
                  break;
                }
                console.warn(":: ChattyClient was not initailized (at getMissedCount)");
                return _context10.abrupt("return");
              case 3:
                _context10.next = 5;
                return this.axiosInstance.get("/missed-count", {
                  params: {
                    MemberId: this.member.id
                  }
                }).then(function (res) {
                  return Promise.resolve(res.data);
                })["catch"](function (errorMessage) {
                  return Promise.reject({
                    message: ":: ChattyClient getMissedCount error - " + errorMessage
                  });
                });
              case 5:
                return _context10.abrupt("return", _context10.sent);
              case 6:
              case "end":
                return _context10.stop();
            }
          }, _callee10, this);
        }));
        function getMissedCount() {
          return _getMissedCount.apply(this, arguments);
        }
        return getMissedCount;
      }()
    }]);
    return Chatty;
  }();
  function configAxios(ApiKey) {
    var axiosInstance = axios.create();
    axiosInstance.defaults.baseURL = "https://devapi.chatty-cloud.com";
    axiosInstance.defaults.headers.common["ApiKey"] = ApiKey || "";
    axiosInstance.defaults.headers.common["Content-Type"] = "application/json";
    axiosInstance.interceptors.request.use(function (request) {
      return request;
    }, function (error) {
      // console.warn(`:: ChattyClient Error %O`, error);
      return Promise.reject(error.message);
    });
    axiosInstance.interceptors.response.use(function (response) {
      return response;
    }, function (error) {
      if (error.response) {
        if (!error.response.data) {
          // console.warn(':: ChattyClient Error - ', error.response._response);
          return Promise.reject(error.response._response);
        }
        return Promise.reject(error.response.data.message);
      } else if (error.request) {
        // console.warn(':: ChattyClient Error - Please check network state');
        return Promise.reject("Please check network state");
      } else {
        // console.warn(`:: ChattyClient Error `, error.message);
        return Promise.reject(error.message);
      }
    });
    return axiosInstance;
  }

  exports.ChattyChat = Chat;
  exports.ChattyList = ChatList;
  exports.ChattyTypes = type;
  exports["default"] = Chatty;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=chatty-client.js.map
