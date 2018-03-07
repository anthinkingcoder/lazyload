const LAZY_MODE = {
    'NORMAL': 0,
    'THROTTLE': 1,
    'DEBOUNCE': 2
};
const SEE_MODE = {
    'CONTENT_SEE': 0, //内容可见
    'TOP_SEE': 1, //顶部可见
    'BOTTOM_SEE': 2//底部可见
};
let subjects;
let load = function (args) {
    let seeMode = args[0];
    subjects = subjects || getSubjects();
    subjects.forEach(function (subject) {
        let dataSrc = subject.getAttribute('data-src');
        if (!isLoad(subject) && isSee(seeMode, subject)) {
            subject.setAttribute('src', dataSrc);
        }
    });
};

function isSee(seeMode, element) {
    let rect = getElementTop(element);
    let screenHeight = window.innerHeight;
    //元素顶部可见
    if (seeMode === SEE_MODE.TOP_SEE || seeMode === SEE_MODE.CONTENT_SEE) {
        if (rect.top >= 0 && screenHeight - rect.top >= 0) {
            return true;
        }
    }

    //元素底部可见
    if (seeMode === SEE_MODE.BOTTOM_SEE || seeMode === SEE_MODE.CONTENT_SEE) {
        if ((rect.bottom >= 0 && rect.bottom - screenHeight <= 0)) {
            return true;
        }
    }

    //元素内容可见
    if (seeMode === SEE_MODE.CONTENT_SEE) {
        if (rect.top < 0 && rect.bottom > 0) {
            return true;
        }
    }
    return false;
}

/**
 * 节流
 */
let throttle = function (fn, delay) {
    let timer;
    return function (...args) {

        if (!timer) {
            timer = delay;
            fn.call(this, args);
            setTimeout(function () {
                timer = null;
            }, delay);
        } else {
        }
    };
};

/**
 * 去抖
 */
let debounce = function (fn, delay) {
    let timerId;
    return function (...args) {
        if (timerId) {
            clearTimeout(timerId);
            timerId = null;
        }
        timerId = setTimeout(function () {
            fn.call(this, args);
        }, delay);

    }
};

let getElementTop = function (element) {
    let rect = element.getBoundingClientRect();
    return {
        top: rect.top,
        bottom: rect.bottom
    };
};
let isLoad = function (element) {
    return element.hasAttribute('src');
};
let getSubjects = function () {
    let imgs = document.querySelectorAll('img');
    let subjects = Array.prototype.slice.call(imgs);
    return subjects.filter(function (subject) {
        return subject.getAttribute('data-src');
    });
};


//默认去抖延迟加载
let handler = debounce(load, 100);
document.addEventListener('scroll', handler);
var layzLoad = {
    setMode: function (lazyMode, delay, seeMode) {
        document.removeEventListener('scroll', handler);
        if (LAZY_MODE.NORMAL === lazyMode) {
            handler = load;
        } else if (LAZY_MODE.THROTTLE === lazyMode) {
            handler = throttle(load, delay);
        } else {
            handler = debounce(load, delay);
        }
        //设置可见区域
        if (SEE_MODE.BOTTOM_SEE !== seeMode && SEE_MODE.CONTENT_SEE !== seeMode && SEE_MODE.TOP_SEE !== seeMode) {
            seeMode = SEE_MODE.CONTENT_SEE;
        }
        handler = handler.bind(this, seeMode, 1);
        document.addEventListener('scroll', handler);
        handler();
    },
    LAZY_MODE: LAZY_MODE,
    SEE_MODE: SEE_MODE
};

module.exports = layzLoad;

