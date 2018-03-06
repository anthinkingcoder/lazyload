(function () {
    var subjects;
    var LAZY_MODE = {
        'NORMAL': 0,
        'THROTTLE': 1,
        'DEBOUNCE': 2
    };
    var SEE_MODE = {
        'CONTENT_SEE': 0, //内容可见
        'TOP_SEE': 1, //顶部可见
        'BOTTOM_SEE': 2//底部可见
    };
    var load = function (seeMode) {
        subjects = subjects || getSubjects();
        subjects.forEach(function (subject) {
            var dataSrc = subject.getAttribute('data-src');
            if (!isLoad(subject) && isSee(seeMode, subject)) {
                subject.setAttribute('src', dataSrc);
            }
        });
    };

    function isSee(seeMode, element) {
        var rect = getElementTop(element);
        var screenHeight = window.innerHeight;
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
    var throttle = function (fn, delay) {
        var timer;
        return function () {
            if (!timer) {
                timer = delay;
                fn.apply(this, arguments);
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
    var debounce = function (fn, delay) {
        var timerId;
        return function () {
            if (timerId) {
                clearTimeout(timerId);
                timerId = null;
            }
            timerId = setTimeout(function () {
                fn.apply(this, arguments);
            }, delay);

        }
    };

    var getElementTop = function (element) {
        var rect = element.getBoundingClientRect();
        return {
            top: rect.top,
            bottom: rect.bottom
        };
    };
    var isLoad = function (element) {
        return !!element.getAttribute('src');
    };
    var getSubjects = function () {
        var imgs = document.querySelectorAll('img');
        var subjects = Array.prototype.slice.call(imgs);
        return subjects.filter(function (subject) {
            return subject.getAttribute('data-src');
        });
    };


    //默认去抖延迟加载
    var handler = debounce(load, 200);
    document.addEventListener('scroll', handler);
    handler();

    var lazyLoad = {
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
            handler = handler.bind(this, seeMode);
            document.addEventListener('scroll', handler);
            handler(SEE_MODE.CONTENT_SEE);
        },
        LAZY_MODE: LAZY_MODE,
        SEE_MODE: SEE_MODE
    };


    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = lazyLoad;
    } else if (typeof window !== 'undefined') {
        window.lazyLoad = lazyLoad;
        console.info(window.lazyLoad);
    }

})();