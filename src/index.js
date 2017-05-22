import loadjs from 'loadjs'

var Link2 = {
  installed: false,
  loaded: {},
  version: '__VERSION__',
  install (Vue, options = {}) {
    if (Link2.installed) return
    Link2.installed = true
  },
  load (href, opts = {parent: document.head}) {
    return Link2.loaded[href] ? Promise.resolve(href)
    : new Promise(function (resolve, reject) {
      loadjs([href], {
        success: function () {
          var l = document.createElement('link')
          l.href = href
          l.crossOrigin = opts.crossorigin
          opts.parent.appendChild(l)
          Link2.loaded[href] = 1
          resolve(href)
        },
        error: function () {
          reject(new Error(href))
        }
      })
    })
  }
}

export default Link2

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Link2)
}
