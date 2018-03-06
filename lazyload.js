(function () {
    var subjects;
    var lazyLoad = function () {
        subjects = subjects || getSubjects();
        subjects.forEach(function (subject) {
            var dataSrc = subject.getAttribute('data-src');
            if (!isLoad(subject)) {
                var rect = getElementTop(subject);
                var screenHeight = window.innerHeight;
                if ((rect.top >= 0 && screenHeight - rect.top >= 0) || (rect.bottom >= 0 && rect.bottom - screenHeight <= 0)) {
                    subject.setAttribute('src', dataSrc);
                }
            }
        });
    };

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
    lazyLoad = debounce(lazyLoad, 200);
    document.addEventListener('scroll', lazyLoad);
    lazyLoad();
})();