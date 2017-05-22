/*!
 * vue-link2 v1.0.1 
 * (c) 2017 Willy
 * Released under the MIT License.
 */
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var loadjs = _interopDefault(require('loadjs'));

var Link2 = {
  installed: false,
  loaded: {},
  version: '1.0.1',
  install: function install (Vue, options) {
    if ( options === void 0 ) options = {};

    if (Link2.installed) { return }
    Link2.installed = true;
  },
  load: function load (href, opts) {
    if ( opts === void 0 ) opts = {parent: document.head};

    return Link2.loaded[href] ? Promise.resolve(href)
    : new Promise(function (resolve, reject) {
      loadjs([href], {
        success: function () {
          var l = document.createElement('link');
          l.href = href;
          l.crossOrigin = opts.crossorigin;
          opts.parent.appendChild(l);
          Link2.loaded[href] = 1;
          resolve(href);
        },
        error: function () {
          reject(new Error(href));
        }
      });
    })
  }
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Link2);
}

module.exports = Link2;
