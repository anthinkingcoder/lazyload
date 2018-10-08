let options = {
  root: null,
  rootMargin: '0% 0%',
  threshold: 0,
  selector: '[data-src]'
}

/*
  @private
 */
let _element
/*
  @private
 */
let _intersectionObserver

let isLoad = function (element) {
  return element.hasAttribute('src');
};


const handler = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.intersectionRatio > options.threshold) {
      const element = entry.target
      if (!isLoad(element)) {
        const url = element.getAttribute('data-src')
        element.setAttribute('src', url)
        element.onload = () => {
          observer.unobserve(element)
        }
      }

    }
  })
}
const init = () => {
  _intersectionObserver = new IntersectionObserver(handler, {
    rootMargin: options.rootMargin,
    threshold: options.threshold
  })
  _element = Array.from(document.querySelectorAll(options.selector))
  _element.forEach(ele => {
    _intersectionObserver.observe(ele)
  })
}

const lazyload = (setting = options) => {
  if (setting !== options) {
    options = {
      ...options,
      ...setting
    }
  }

  if (!window.IntersectionObserver) {
    throw Error(`Your browser does not support IntersectionObserver!`)
  }
  init()
}

module.exports = lazyload

