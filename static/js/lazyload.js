!function (t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.Lazyload = e() : t.Lazyload = e()
}(window, function () {
    return function (t) {
        var e = {};
        function n(r) {
            if (e[r]) return e[r].exports;
            var o = e[r] = {i: r, l: !1, exports: {}};
            return t[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports
        }

        return n.m = t, n.c = e, n.d = function (t, e, r) {
            n.o(t, e) || Object.defineProperty(t, e, {configurable: !1, enumerable: !0, get: r})
        }, n.r = function (t) {
            Object.defineProperty(t, "__esModule", {value: !0})
        }, n.n = function (t) {
            var e = t && t.__esModule ? function () {
                return t.default
            } : function () {
                return t
            };
            return n.d(e, "a", e), e
        }, n.o = function (t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }, n.p = "/static/js", n(n.s = 1)
    }([function (t, e) {
        var n = {NORMAL: 0, THROTTLE: 1, DEBOUNCE: 2}, r = {CONTENT_SEE: 0, TOP_SEE: 1, BOTTOM_SEE: 2}, o = void 0,
            u = function (t) {
                var e = t[0];
                (o = o || a()).forEach(function (t) {
                    var n = t.getAttribute("data-src");
                    !f(t) && function (t, e) {
                        var n = c(e), o = window.innerHeight;
                        if ((t === r.TOP_SEE || t === r.CONTENT_SEE) && n.top >= 0 && o - n.top >= 0) return !0;
                        if ((t === r.BOTTOM_SEE || t === r.CONTENT_SEE) && n.bottom >= 0 && n.bottom - o <= 0) return !0;
                        if (t === r.CONTENT_SEE && n.top < 0 && n.bottom > 0) return !0;
                        return !1
                    }(e, t) && t.setAttribute("src", n)
                })
            };
        var i = function (t, e) {
            var n = void 0;
            return function () {
                for (var r = arguments.length, o = Array(r), u = 0; u < r; u++) o[u] = arguments[u];
                n && (clearTimeout(n), n = null), n = setTimeout(function () {
                    t.call(this, o)
                }, e)
            }
        }, c = function (t) {
            var e = t.getBoundingClientRect();
            return {top: e.top, bottom: e.bottom}
        }, f = function (t) {
            return t.hasAttribute("src")
        }, a = function () {
            var t = document.querySelectorAll("img");
            return Array.prototype.slice.call(t).filter(function (t) {
                return t.getAttribute("data-src")
            })
        }, E = i(u, 200);
        document.addEventListener("scroll", E);
        var l = {
            setMode: function (t, e, o) {
                document.removeEventListener("scroll", E), E = n.NORMAL === t ? u : n.THROTTLE === t ? function (t, e) {
                    var n = void 0;
                    return function () {
                        if (!n) {
                            n = e;
                            for (var r = arguments.length, o = Array(r), u = 0; u < r; u++) o[u] = arguments[u];
                            t.call(this, o), setTimeout(function () {
                                n = null
                            }, e)
                        }
                    }
                }(u, e) : i(u, e), r.BOTTOM_SEE !== o && r.CONTENT_SEE !== o && r.TOP_SEE !== o && (o = r.CONTENT_SEE), E = E.bind(this, o, 1), document.addEventListener("scroll", E), E()
            }, LAZY_MODE: n, SEE_MODE: r
        };
        t.exports = l
    }, function (t, e, n) {
        t.exports = n(0)
    }])
});