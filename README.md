# lazyload
use IntersectionObserver Api to implement lazyload, IntersectionObserver only support chrome,
if not support intersectionObserver,please use [IntersectionObserver polyfill](https://github.com/w3c/IntersectionObserver/tree/master/polyfill)


## option
```js
let options = {
  root: null,
  rootMargin: '0% 0%',
  threshold: 0,
  selector: '[data-src]'
}
```

## Usage
```js
  import Lazyload from 'lazyload'
  Lazyload({
    selector: '[data-src]'
  })
  
```

## example
please see /demo/lazyloadDemo.html
