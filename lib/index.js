(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.library = factory());
}(this, function () { 'use strict';

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  /**
   * async load script
   */

  var loadPromise = null;

  var ApiLoader = function () {
    function ApiLoader() {
      var urlList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      _classCallCheck(this, ApiLoader);

      this.urlList = urlList.map(function (url) {
        if (url.indexOf('http') > -1) {
          return url;
        } else {
          return window.location.protocol + '//' + url;
        }
      });
    }

    _createClass(ApiLoader, [{
      key: 'scriptLoadPromise',
      value: function scriptLoadPromise(url) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.defer = true;
        script.src = url;
        var promise = new Promise(function (resolve) {
          script.onload = function () {
            resolve();
          };
        });
        document.body.appendChild(script);
        return promise;
      }
    }, {
      key: 'buildChainPromise',
      value: function buildChainPromise() {
        var _this = this;

        return this.urlList.reduce(function (promise, url) {
          return promise.then(function () {
            return _this.scriptLoadPromise(url);
          });
        }, Promise.resolve());
      }
    }, {
      key: 'load',
      value: function load() {
        loadPromise = loadPromise || this.buildChainPromise();
        return new Promise(function (resolve) {
          loadPromise.then(function () {
            resolve();
          });
        });
      }
    }]);

    return ApiLoader;
  }();

  return ApiLoader;

}));
//# sourceMappingURL=index.js.map
