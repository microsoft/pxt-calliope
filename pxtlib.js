var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pxt;
(function (pxt) {
    var analytics;
    (function (analytics) {
        function enable() {
            var ai = window.appInsights;
            if (!ai)
                return;
            pxt.debug('enabling app insights');
            var te = pxt.tickEvent;
            pxt.tickEvent = function (id, data) {
                if (te)
                    te(id, data);
                if (!data)
                    ai.trackEvent(id);
                else {
                    var props = {};
                    var measures = {};
                    for (var k in data)
                        if (typeof data[k] == "string")
                            props[k] = data[k];
                        else
                            measures[k] = data[k];
                    ai.trackEvent(id, props, measures);
                }
            };
            var rexp = pxt.reportException;
            pxt.reportException = function (err, data) {
                if (rexp)
                    rexp(err, data);
                var props = {
                    target: pxt.appTarget.id,
                    version: pxt.appTarget.versions.target
                };
                if (data)
                    pxt.Util.jsonMergeFrom(props, data);
                ai.trackException(err, 'exception', props);
            };
            var re = pxt.reportError;
            pxt.reportError = function (cat, msg, data) {
                if (re)
                    re(cat, msg, data);
                try {
                    throw msg;
                }
                catch (err) {
                    var props = {
                        target: pxt.appTarget.id,
                        version: pxt.appTarget.versions.target,
                        category: cat,
                        message: msg
                    };
                    if (data)
                        pxt.Util.jsonMergeFrom(props, data);
                    ai.trackException(err, 'error', props);
                }
            };
        }
        analytics.enable = enable;
    })(analytics = pxt.analytics || (pxt.analytics = {}));
})(pxt || (pxt = {}));
/// <reference path="../../typings/globals/bluebird/index.d.ts"/>
var ts;
(function (ts) {
    var pxtc;
    (function (pxtc) {
        pxtc.__dummy = 42;
    })(pxtc = ts.pxtc || (ts.pxtc = {}));
})(ts || (ts = {}));
var pxtc = ts.pxtc;
var ts;
(function (ts) {
    var pxtc;
    (function (pxtc) {
        var Util;
        (function (Util) {
            function assert(cond, msg) {
                if (msg === void 0) { msg = "Assertion failed"; }
                if (!cond) {
                    debugger;
                    throw new Error(msg);
                }
            }
            Util.assert = assert;
            function repeatMap(n, fn) {
                n = n || 0;
                var r = [];
                for (var i = 0; i < n; ++i)
                    r.push(fn(i));
                return r;
            }
            Util.repeatMap = repeatMap;
            function listsEqual(a, b) {
                if (!a || !b || a.length !== b.length) {
                    return false;
                }
                for (var i = 0; i < a.length; i++) {
                    if (a[i] !== b[i]) {
                        return false;
                    }
                }
                return true;
            }
            Util.listsEqual = listsEqual;
            function oops(msg) {
                if (msg === void 0) { msg = "OOPS"; }
                debugger;
                throw new Error(msg);
            }
            Util.oops = oops;
            function reversed(arr) {
                arr = arr.slice(0);
                arr.reverse();
                return arr;
            }
            Util.reversed = reversed;
            function flatClone(obj) {
                if (obj == null)
                    return null;
                var r = {};
                Object.keys(obj).forEach(function (k) { r[k] = obj[k]; });
                return r;
            }
            Util.flatClone = flatClone;
            function clone(v) {
                if (v == null)
                    return null;
                return JSON.parse(JSON.stringify(v));
            }
            Util.clone = clone;
            function iterMap(m, f) {
                Object.keys(m).forEach(function (k) { return f(k, m[k]); });
            }
            Util.iterMap = iterMap;
            function mapMap(m, f) {
                var r = {};
                Object.keys(m).forEach(function (k) { return r[k] = f(k, m[k]); });
                return r;
            }
            Util.mapMap = mapMap;
            function mapStringMapAsync(m, f) {
                var r = {};
                return Promise.all(Object.keys(m).map(function (k) { return f(k, m[k]).then(function (v) { return r[k] = v; }); }))
                    .then(function () { return r; });
            }
            Util.mapStringMapAsync = mapStringMapAsync;
            function values(m) {
                return Object.keys(m || {}).map(function (k) { return m[k]; });
            }
            Util.values = values;
            function lookup(m, key) {
                if (m.hasOwnProperty(key))
                    return m[key];
                return null;
            }
            Util.lookup = lookup;
            function pushRange(trg, src) {
                for (var i = 0; i < src.length; ++i)
                    trg.push(src[i]);
            }
            Util.pushRange = pushRange;
            function concat(arrays) {
                var r = [];
                for (var i = 0; i < arrays.length; ++i) {
                    pushRange(r, arrays[i]);
                }
                return r;
            }
            Util.concat = concat;
            function isKV(v) {
                return !!v && typeof v === "object" && !Array.isArray(v);
            }
            function memcpy(trg, trgOff, src, srcOff, len) {
                if (srcOff === void 0)
                    srcOff = 0;
                if (len === void 0)
                    len = src.length - srcOff;
                for (var i = 0; i < len; ++i)
                    trg[trgOff + i] = src[srcOff + i];
            }
            Util.memcpy = memcpy;
            function jsonMergeFrom(trg, src) {
                if (!src)
                    return;
                Object.keys(src).forEach(function (k) {
                    if (isKV(trg[k]) && isKV(src[k]))
                        jsonMergeFrom(trg[k], src[k]);
                    else
                        trg[k] = clone(src[k]);
                });
            }
            Util.jsonMergeFrom = jsonMergeFrom;
            function jsonCopyFrom(trg, src) {
                var v = clone(src);
                for (var _i = 0, _a = Object.keys(src); _i < _a.length; _i++) {
                    var k = _a[_i];
                    trg[k] = v[k];
                }
            }
            Util.jsonCopyFrom = jsonCopyFrom;
            // { a: { b: 1 }, c: 2} => { "a.b": 1, c: 2 }
            function jsonFlatten(v) {
                var res = {};
                var loop = function (pref, v) {
                    if (v !== null && typeof v == "object") {
                        assert(!Array.isArray(v));
                        if (pref)
                            pref += ".";
                        for (var _i = 0, _a = Object.keys(v); _i < _a.length; _i++) {
                            var k = _a[_i];
                            loop(pref + k, v[k]);
                        }
                    }
                    else {
                        res[pref] = v;
                    }
                };
                loop("", v);
                return res;
            }
            Util.jsonFlatten = jsonFlatten;
            function jsonUnFlatten(v) {
                var res = {};
                for (var _i = 0, _a = Object.keys(v); _i < _a.length; _i++) {
                    var k = _a[_i];
                    var ptr = res;
                    var parts = k.split(".");
                    for (var i = 0; i < parts.length; ++i) {
                        var part = parts[i];
                        if (i == parts.length - 1)
                            ptr[part] = v[k];
                        else {
                            if (typeof ptr[part] != "object")
                                ptr[part] = {};
                            ptr = ptr[part];
                        }
                    }
                }
                return res;
            }
            Util.jsonUnFlatten = jsonUnFlatten;
            function strcmp(a, b) {
                if (a == b)
                    return 0;
                if (a < b)
                    return -1;
                else
                    return 1;
            }
            Util.strcmp = strcmp;
            function stringMapEq(a, b) {
                var ak = Object.keys(a);
                var bk = Object.keys(b);
                if (ak.length != bk.length)
                    return false;
                for (var _i = 0, ak_1 = ak; _i < ak_1.length; _i++) {
                    var k = ak_1[_i];
                    if (!b.hasOwnProperty(k))
                        return false;
                    if (a[k] !== b[k])
                        return false;
                }
                return true;
            }
            Util.stringMapEq = stringMapEq;
            function endsWith(str, suffix) {
                if (str.length < suffix.length)
                    return false;
                if (suffix.length == 0)
                    return true;
                return str.slice(-suffix.length) == suffix;
            }
            Util.endsWith = endsWith;
            function startsWith(str, prefix) {
                if (str.length < prefix.length)
                    return false;
                if (prefix.length == 0)
                    return true;
                return str.slice(0, prefix.length) == prefix;
            }
            Util.startsWith = startsWith;
            function replaceAll(str, old, new_) {
                if (!old)
                    return str;
                return str.split(old).join(new_);
            }
            Util.replaceAll = replaceAll;
            function sortObjectFields(o) {
                var keys = Object.keys(o);
                keys.sort(strcmp);
                var r = {};
                keys.forEach(function (k) { return r[k] = o[k]; });
                return r;
            }
            Util.sortObjectFields = sortObjectFields;
            function chopArray(arr, chunkSize) {
                var res = [];
                for (var i = 0; i < arr.length; i += chunkSize)
                    res.push(arr.slice(i, i + chunkSize));
                return res;
            }
            Util.chopArray = chopArray;
            function unique(arr, f) {
                var v = [];
                var r = {};
                arr.forEach(function (e) {
                    var k = f(e);
                    if (!r.hasOwnProperty(k)) {
                        r[k] = null;
                        v.push(e);
                    }
                });
                return v;
            }
            Util.unique = unique;
            function groupBy(arr, f) {
                var r = {};
                arr.forEach(function (e) {
                    var k = f(e);
                    if (!r.hasOwnProperty(k))
                        r[k] = [];
                    r[k].push(e);
                });
                return r;
            }
            Util.groupBy = groupBy;
            function toDictionary(arr, f) {
                var r = {};
                arr.forEach(function (e) { r[f(e)] = e; });
                return r;
            }
            Util.toDictionary = toDictionary;
            function toArray(a) {
                var r = [];
                for (var i = 0; i < a.length; ++i)
                    r.push(a[i]);
                return r;
            }
            Util.toArray = toArray;
            function indexOfMatching(arr, f) {
                for (var i = 0; i < arr.length; ++i)
                    if (f(arr[i]))
                        return i;
                return -1;
            }
            Util.indexOfMatching = indexOfMatching;
            function nextTick(f) {
                Promise._async._schedule(f);
            }
            Util.nextTick = nextTick;
            function memoizeString(createNew) {
                return memoize(function (s) { return s; }, createNew);
            }
            Util.memoizeString = memoizeString;
            function memoize(getId, createNew) {
                var cache = {};
                return function (v) {
                    var id = getId(v);
                    if (cache.hasOwnProperty(id))
                        return cache[id];
                    return (cache[id] = createNew(v));
                };
            }
            Util.memoize = memoize;
            // Returns a function, that, as long as it continues to be invoked, will not
            // be triggered. The function will be called after it stops being called for
            // N milliseconds. If `immediate` is passed, trigger the function on the
            // leading edge, instead of the trailing.
            function debounce(func, wait, immediate) {
                var timeout;
                return function () {
                    var context = this;
                    var args = arguments;
                    var later = function () {
                        timeout = null;
                        if (!immediate)
                            func.apply(context, args);
                    };
                    var callNow = immediate && !timeout;
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                    if (callNow)
                        func.apply(context, args);
                };
            }
            Util.debounce = debounce;
            function randomPermute(arr) {
                for (var i = 0; i < arr.length; ++i) {
                    var j = randomUint32() % arr.length;
                    var tmp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = tmp;
                }
            }
            Util.randomPermute = randomPermute;
            function randomPick(arr) {
                if (arr.length == 0)
                    return null;
                return arr[randomUint32() % arr.length];
            }
            Util.randomPick = randomPick;
            var awesomeAdj;
            function getAwesomeAdj() {
                if (!awesomeAdj)
                    awesomeAdj = (lf("amazing, astonishing, astounding, awe-inspiring, awesome, breathtaking, classic, cool, curious, distinct, exceptional, exclusive, extraordinary, fabulous, fantastic, glorious, great, ") +
                        lf("incredible, magical, marvellous, marvelous, mind-blowing, mind-boggling, miraculous, peculiar, phenomenal, rad, rockin', special, spectacular, startling, stunning, super-cool, ") +
                        lf("superior, supernatural, terrific, unbelievable, unearthly, unique, unprecedented, unusual, weird, wonderful, wondrous")).split(/\s*[,،、]\s*/);
                return randomPick(awesomeAdj);
            }
            Util.getAwesomeAdj = getAwesomeAdj;
            function isoTime(time) {
                var d = new Date(time * 1000);
                return Util.fmt("{0}-{1:f02.0}-{2:f02.0} {3:f02.0}:{4:f02.0}:{5:f02.0}", d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds());
            }
            Util.isoTime = isoTime;
            function timeSince(time) {
                var now = Date.now();
                time *= 1000;
                var diff = (now - time) / 1000;
                if (isNaN(diff))
                    return "";
                if (diff < -30) {
                    diff = -diff;
                    if (diff < 60)
                        return lf("in a few seconds");
                    if (diff < 2 * 60)
                        return lf("in a minute");
                    if (diff < 60 * 60)
                        return lf("in {0} minute{0:s}", Math.floor(diff / 60));
                    if (diff < 2 * 60 * 60)
                        return lf("in an hour");
                    if (diff < 60 * 60 * 24)
                        return lf("in {0} hour{0:s}", Math.floor(diff / 60 / 60));
                    if (diff < 60 * 60 * 24 * 30)
                        return lf("in {0} day{0:s}", Math.floor(diff / 60 / 60 / 24));
                    if (diff < 60 * 60 * 24 * 365)
                        return lf("in {0} month{0:s}", Math.floor(diff / 60 / 60 / 24 / 30));
                    return lf("in {0} year{0:s}", Math.floor(diff / 60 / 60 / 24 / 365));
                }
                else {
                    if (diff < 0)
                        return lf("now");
                    if (diff < 10)
                        return lf("a few seconds ago");
                    if (diff < 60)
                        return lf("{0} second{0:s} ago", Math.floor(diff));
                    if (diff < 2 * 60)
                        return lf("a minute ago");
                    if (diff < 60 * 60)
                        return lf("{0} minute{0:s} ago", Math.floor(diff / 60));
                    if (diff < 2 * 60 * 60)
                        return lf("an hour ago");
                    if (diff < 60 * 60 * 24)
                        return lf("{0} hour{0:s} ago", Math.floor(diff / 60 / 60));
                    if (diff < 60 * 60 * 24 * 30)
                        return lf("{0} day{0:s} ago", Math.floor(diff / 60 / 60 / 24));
                    if (diff < 60 * 60 * 24 * 365)
                        return lf("{0} month{0:s} ago", Math.floor(diff / 60 / 60 / 24 / 30));
                    return lf("{0} year{0:s} ago", Math.floor(diff / 60 / 60 / 24 / 365));
                }
            }
            Util.timeSince = timeSince;
            function unicodeToChar(text) {
                var r = /\\u([\d\w]{4})/gi;
                return text.replace(r, function (match, grp) {
                    return String.fromCharCode(parseInt(grp, 16));
                });
            }
            Util.unicodeToChar = unicodeToChar;
            function escapeForRegex(str) {
                return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
            }
            Util.escapeForRegex = escapeForRegex;
            function stripUrlProtocol(str) {
                return str.replace(/.*?:\/\//g, "");
            }
            Util.stripUrlProtocol = stripUrlProtocol;
            Util.isNodeJS = false;
            function requestAsync(options) {
                return Util.httpRequestCoreAsync(options)
                    .then(function (resp) {
                    if (resp.statusCode != 200 && !options.allowHttpErrors) {
                        var msg = Util.lf("Bad HTTP status code: {0} at {1}; message: {2}", resp.statusCode, options.url, (resp.text || "").slice(0, 500));
                        var err = new Error(msg);
                        err.statusCode = resp.statusCode;
                        return Promise.reject(err);
                    }
                    if (resp.text && /application\/json/.test(resp.headers["content-type"]))
                        resp.json = JSON.parse(resp.text);
                    return resp;
                });
            }
            Util.requestAsync = requestAsync;
            function httpGetTextAsync(url) {
                return requestAsync({ url: url }).then(function (resp) { return resp.text; });
            }
            Util.httpGetTextAsync = httpGetTextAsync;
            function httpGetJsonAsync(url) {
                return requestAsync({ url: url }).then(function (resp) { return resp.json; });
            }
            Util.httpGetJsonAsync = httpGetJsonAsync;
            function httpPostJsonAsync(url, data) {
                return requestAsync({ url: url, data: data || {} }).then(function (resp) { return resp.json; });
            }
            Util.httpPostJsonAsync = httpPostJsonAsync;
            function userError(msg) {
                var e = new Error(msg);
                e.isUserError = true;
                throw e;
            }
            Util.userError = userError;
            // this will take lower 8 bits from each character
            function stringToUint8Array(input) {
                var len = input.length;
                var res = new Uint8Array(len);
                for (var i = 0; i < len; ++i)
                    res[i] = input.charCodeAt(i) & 0xff;
                return res;
            }
            Util.stringToUint8Array = stringToUint8Array;
            function uint8ArrayToString(input) {
                var len = input.length;
                var res = "";
                for (var i = 0; i < len; ++i)
                    res += String.fromCharCode(input[i]);
                return res;
            }
            Util.uint8ArrayToString = uint8ArrayToString;
            function fromUTF8(binstr) {
                if (!binstr)
                    return "";
                // escape function is deprecated
                var escaped = "";
                for (var i = 0; i < binstr.length; ++i) {
                    var k = binstr.charCodeAt(i) & 0xff;
                    if (k == 37 || k > 0x7f) {
                        escaped += "%" + k.toString(16);
                    }
                    else {
                        escaped += binstr.charAt(i);
                    }
                }
                // decodeURIComponent does the actual UTF8 decoding
                return decodeURIComponent(escaped);
            }
            Util.fromUTF8 = fromUTF8;
            function toUTF8(str) {
                var res = "";
                if (!str)
                    return res;
                for (var i = 0; i < str.length; ++i) {
                    var code = str.charCodeAt(i);
                    if (code <= 0x7f)
                        res += str.charAt(i);
                    else if (code <= 0x7ff) {
                        res += String.fromCharCode(0xc0 | (code >> 6), 0x80 | (code & 0x3f));
                    }
                    else {
                        if (0xd800 <= code && code <= 0xdbff) {
                            var next = str.charCodeAt(++i);
                            if (!isNaN(next))
                                code = 0x10000 + ((code - 0xd800) << 10) + (next - 0xdc00);
                        }
                        if (code <= 0xffff)
                            res += String.fromCharCode(0xe0 | (code >> 12), 0x80 | ((code >> 6) & 0x3f), 0x80 | (code & 0x3f));
                        else
                            res += String.fromCharCode(0xf0 | (code >> 18), 0x80 | ((code >> 12) & 0x3f), 0x80 | ((code >> 6) & 0x3f), 0x80 | (code & 0x3f));
                    }
                }
                return res;
            }
            Util.toUTF8 = toUTF8;
            function toHex(bytes) {
                var r = "";
                for (var i = 0; i < bytes.length; ++i)
                    r += ("0" + bytes[i].toString(16)).slice(-2);
                return r;
            }
            Util.toHex = toHex;
            function fromHex(hex) {
                var r = new Uint8Array(hex.length >> 1);
                for (var i = 0; i < hex.length; i += 2)
                    r[i >> 1] = parseInt(hex.slice(i, i + 2), 16);
                return r;
            }
            Util.fromHex = fromHex;
            var PromiseQueue = (function () {
                function PromiseQueue() {
                    this.promises = {};
                }
                PromiseQueue.prototype.enqueue = function (id, f) {
                    var _this = this;
                    return new Promise(function (resolve, reject) {
                        var arr = _this.promises[id];
                        if (!arr) {
                            arr = _this.promises[id] = [];
                        }
                        arr.push(function () {
                            return f()
                                .finally(function () {
                                arr.shift();
                                if (arr.length == 0)
                                    delete _this.promises[id];
                                else
                                    arr[0]();
                            })
                                .then(resolve, reject);
                        });
                        if (arr.length == 1)
                            arr[0]();
                    });
                };
                return PromiseQueue;
            }());
            Util.PromiseQueue = PromiseQueue;
            var PromiseBuffer = (function () {
                function PromiseBuffer() {
                    this.waiting = [];
                    this.available = [];
                }
                PromiseBuffer.prototype.drain = function () {
                    for (var _i = 0, _a = this.waiting; _i < _a.length; _i++) {
                        var f = _a[_i];
                        f(new Error("Promise Buffer Reset"));
                    }
                    this.waiting = [];
                    this.available = [];
                };
                PromiseBuffer.prototype.pushError = function (v) {
                    this.push(v);
                };
                PromiseBuffer.prototype.push = function (v) {
                    var f = this.waiting.shift();
                    if (f)
                        f(v);
                    else
                        this.available.push(v);
                };
                PromiseBuffer.prototype.shiftAsync = function (timeout) {
                    var _this = this;
                    if (timeout === void 0) { timeout = 0; }
                    if (this.available.length > 0) {
                        var v = this.available.shift();
                        if (v instanceof Error)
                            return Promise.reject(v);
                        else
                            return Promise.resolve(v);
                    }
                    else
                        return new Promise(function (resolve, reject) {
                            var f = function (v) {
                                if (v instanceof Error)
                                    reject(v);
                                else
                                    resolve(v);
                            };
                            _this.waiting.push(f);
                            if (timeout > 0) {
                                Promise.delay(timeout)
                                    .then(function () {
                                    var idx = _this.waiting.indexOf(f);
                                    if (idx >= 0) {
                                        _this.waiting.splice(idx, 1);
                                        reject(new Error("Timeout"));
                                    }
                                });
                            }
                        });
                };
                return PromiseBuffer;
            }());
            Util.PromiseBuffer = PromiseBuffer;
            function now() {
                return Date.now();
            }
            Util.now = now;
            function nowSeconds() {
                return Math.round(now() / 1000);
            }
            Util.nowSeconds = nowSeconds;
            function getMime(filename) {
                var m = /\.([a-zA-Z0-9]+)$/.exec(filename);
                if (m)
                    switch (m[1].toLowerCase()) {
                        case "txt": return "text/plain";
                        case "html":
                        case "htm": return "text/html";
                        case "css": return "text/css";
                        case "js": return "application/javascript";
                        case "jpg":
                        case "jpeg": return "image/jpeg";
                        case "png": return "image/png";
                        case "ico": return "image/x-icon";
                        case "manifest": return "text/cache-manifest";
                        case "webmanifest": return "application/manifest+json";
                        case "json": return "application/json";
                        case "svg": return "image/svg+xml";
                        case "eot": return "application/vnd.ms-fontobject";
                        case "ttf": return "font/ttf";
                        case "woff": return "application/font-woff";
                        case "woff2": return "application/font-woff2";
                        case "md": return "text/markdown";
                        case "xml": return "application/xml";
                        default: return "application/octet-stream";
                    }
                else
                    return "application/octet-stream";
            }
            Util.getMime = getMime;
            function randomUint32() {
                var buf = new Uint8Array(4);
                Util.getRandomBuf(buf);
                return new Uint32Array(buf.buffer)[0];
            }
            Util.randomUint32 = randomUint32;
            function guidGen() {
                function f() { return (randomUint32() | 0x10000).toString(16).slice(-4); }
                return f() + f() + "-" + f() + "-4" + f().slice(-3) + "-" + f() + "-" + f() + f() + f();
            }
            Util.guidGen = guidGen;
            var _localizeLang = "en";
            var _localizeStrings = {};
            Util.localizeLive = false;
            /**
             * Returns the current user language, prepended by "live-" if in live mode
             */
            function localeInfo() {
                return "" + (Util.localizeLive ? "live-" : "") + userLanguage();
            }
            Util.localeInfo = localeInfo;
            /**
             * Returns current user language iSO-code. Default is `en`.
             */
            function userLanguage() {
                return _localizeLang;
            }
            Util.userLanguage = userLanguage;
            function userLanguageRtl() {
                return /^ar|iw/i.test(_localizeLang);
            }
            Util.userLanguageRtl = userLanguageRtl;
            function _localize(s) {
                return _localizeStrings[s] || s;
            }
            Util._localize = _localize;
            function downloadLiveTranslationsAsync(lang, filename) {
                return Util.httpGetJsonAsync("https://www.pxt.io/api/translations?lang=" + encodeURIComponent(lang) + "&filename=" + encodeURIComponent(filename));
            }
            Util.downloadLiveTranslationsAsync = downloadLiveTranslationsAsync;
            function updateLocalizationAsync(baseUrl, code, live) {
                // normalize code (keep synched with localized files)
                if (!/^(es|pt|si|sv|zh)/i.test(code))
                    code = code.split("-")[0];
                if (live) {
                    console.log("loading live translations for " + code);
                    return downloadLiveTranslationsAsync(code, "strings.json")
                        .then(function (tr) {
                        _localizeStrings = tr || {};
                        _localizeLang = code;
                        Util.localizeLive = true;
                    }, function (e) {
                        console.error('failed to load localizations');
                    });
                }
                if (_localizeLang != code) {
                    return Util.httpGetJsonAsync(baseUrl + "locales/" + code + "/strings.json")
                        .then(function (tr) {
                        _localizeStrings = tr || {};
                        _localizeLang = code;
                    }, function (e) {
                        console.error('failed to load localizations');
                    });
                }
                //
                return Promise.resolve(undefined);
            }
            Util.updateLocalizationAsync = updateLocalizationAsync;
            function htmlEscape(_input) {
                if (!_input)
                    return _input; // null, undefined, empty string test
                return _input.replace(/([^\w .!?\-$])/g, function (c) { return "&#" + c.charCodeAt(0) + ";"; });
            }
            Util.htmlEscape = htmlEscape;
            function jsStringQuote(s) {
                return s.replace(/[^\w .!?\-$]/g, function (c) {
                    var h = c.charCodeAt(0).toString(16);
                    return "\\u" + "0000".substr(0, 4 - h.length) + h;
                });
            }
            Util.jsStringQuote = jsStringQuote;
            function jsStringLiteral(s) {
                return "\"" + jsStringQuote(s) + "\"";
            }
            Util.jsStringLiteral = jsStringLiteral;
            function fmt_va(f, args) {
                if (args.length == 0)
                    return f;
                return f.replace(/\{([0-9]+)(\:[^\}]+)?\}/g, function (s, n, spec) {
                    var v = args[parseInt(n)];
                    var r = "";
                    var fmtMatch = /^:f(\d*)\.(\d+)/.exec(spec);
                    if (fmtMatch) {
                        var precision = parseInt(fmtMatch[2]);
                        var len = parseInt(fmtMatch[1]) || 0;
                        var fillChar = /^0/.test(fmtMatch[1]) ? "0" : " ";
                        var num = v.toFixed(precision);
                        if (len > 0 && precision > 0)
                            len += precision + 1;
                        if (len > 0) {
                            while (num.length < len) {
                                num = fillChar + num;
                            }
                        }
                        r = num;
                    }
                    else if (spec == ":x") {
                        r = "0x" + v.toString(16);
                    }
                    else if (v === undefined)
                        r = "(undef)";
                    else if (v === null)
                        r = "(null)";
                    else if (v.toString)
                        r = v.toString();
                    else
                        r = v + "";
                    if (spec == ":a") {
                        if (/^\s*[euioah]/.test(r.toLowerCase()))
                            r = "an " + r;
                        else if (/^\s*[bcdfgjklmnpqrstvwxz]/.test(r.toLowerCase()))
                            r = "a " + r;
                    }
                    else if (spec == ":s") {
                        if (v == 1)
                            r = "";
                        else
                            r = "s";
                    }
                    else if (spec == ":q") {
                        r = Util.htmlEscape(r);
                    }
                    else if (spec == ":jq") {
                        r = Util.jsStringQuote(r);
                    }
                    else if (spec == ":uri") {
                        r = encodeURIComponent(r).replace(/'/g, "%27").replace(/"/g, "%22");
                    }
                    else if (spec == ":url") {
                        r = encodeURI(r).replace(/'/g, "%27").replace(/"/g, "%22");
                    }
                    else if (spec == ":%") {
                        r = (v * 100).toFixed(1).toString() + '%';
                    }
                    return r;
                });
            }
            Util.fmt_va = fmt_va;
            function fmt(f) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                return fmt_va(f, args);
            }
            Util.fmt = fmt;
            var locStats = {};
            function dumpLocStats() {
                var r = {};
                Object.keys(locStats).sort(function (a, b) { return locStats[b] - locStats[a]; })
                    .forEach(function (k) { return r[k] = k; });
                console.log('prioritized list of strings:');
                console.log(JSON.stringify(r, null, 2));
            }
            Util.dumpLocStats = dumpLocStats;
            var sForPlural = true;
            function lf_va(format, args) {
                locStats[format] = (locStats[format] || 0) + 1;
                var lfmt = Util._localize(format);
                if (!sForPlural && lfmt != format && /\d:s\}/.test(lfmt)) {
                    lfmt = lfmt.replace(/\{\d+:s\}/g, "");
                }
                lfmt = lfmt.replace(/\{(id|loc):[^\}]+\}/g, '');
                return fmt_va(lfmt, args);
            }
            Util.lf_va = lf_va;
            function lf(format) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                return lf_va(format, args);
            }
            Util.lf = lf;
            /**
             * Similar to lf but the string do not get extracted into the loc file.
             */
            function rlf(format) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                return lf_va(format, args);
            }
            Util.rlf = rlf;
            function capitalize(n) {
                return n ? (n[0].toLocaleUpperCase() + n.slice(1)) : n;
            }
            Util.capitalize = capitalize;
            function range(len) {
                var r = [];
                for (var i = 0; i < len; ++i)
                    r.push(i);
                return r;
            }
            Util.range = range;
            function multipartPostAsync(uri, data, filename, filecontents) {
                if (data === void 0) { data = {}; }
                if (filename === void 0) { filename = null; }
                if (filecontents === void 0) { filecontents = null; }
                var boundry = "--------------------------0461489f461126c5";
                var form = "";
                function add(name, val) {
                    form += boundry + "\r\n";
                    form += "Content-Disposition: form-data; name=\"" + name + "\"\r\n\r\n";
                    form += val + "\r\n";
                }
                function addF(name, val) {
                    form += boundry + "\r\n";
                    form += "Content-Disposition: form-data; name=\"files[" + name + "]\"; filename=\"blah.json\"\r\n";
                    form += "\r\n";
                    form += val + "\r\n";
                }
                Object.keys(data).forEach(function (k) { return add(k, data[k]); });
                if (filename)
                    addF(filename, filecontents);
                form += boundry + "--\r\n";
                return Util.httpRequestCoreAsync({
                    url: uri,
                    method: "POST",
                    headers: {
                        "Content-Type": "multipart/form-data; boundary=" + boundry.slice(2)
                    },
                    data: form
                });
            }
            Util.multipartPostAsync = multipartPostAsync;
            function toDataUri(data, mimetype) {
                // TODO does this only support trusted data?
                // weed out urls
                if (/^https?:/i.test(data))
                    return data;
                // already a data uri?
                if (/^data:/i.test(data))
                    return data;
                // infer mimetype
                if (!mimetype) {
                    if (/^<svg/i.test(data))
                        mimetype = "image/svg+xml";
                }
                // encode
                if (/xml|svg/.test(mimetype))
                    return "data:" + mimetype + "," + encodeURIComponent(data);
                else
                    return "data:" + (mimetype || "image/png") + ";base64," + btoa(toUTF8(data));
            }
            Util.toDataUri = toDataUri;
        })(Util = pxtc.Util || (pxtc.Util = {}));
    })(pxtc = ts.pxtc || (ts.pxtc = {}));
})(ts || (ts = {}));
var ts;
(function (ts) {
    var pxtc;
    (function (pxtc) {
        var BrowserImpl;
        (function (BrowserImpl) {
            pxtc.Util.httpRequestCoreAsync = httpRequestCoreAsync;
            pxtc.Util.sha256 = sha256string;
            pxtc.Util.getRandomBuf = function (buf) {
                if (window.crypto)
                    window.crypto.getRandomValues(buf);
                else {
                    for (var i = 0; i < buf.length; ++i)
                        buf[i] = Math.floor(Math.random() * 255);
                }
            };
            function httpRequestCoreAsync(options) {
                return new Promise(function (resolve, reject) {
                    var client;
                    var resolved = false;
                    var headers = pxtc.Util.clone(options.headers) || {};
                    client = new XMLHttpRequest();
                    client.onreadystatechange = function () {
                        if (resolved)
                            return; // Safari/iOS likes to call this thing more than once
                        if (client.readyState == 4) {
                            resolved = true;
                            var res_1 = {
                                statusCode: client.status,
                                headers: {},
                                buffer: client.responseBody,
                                text: client.responseText,
                            };
                            client.getAllResponseHeaders().split(/\r?\n/).forEach(function (l) {
                                var m = /^\s*([^:]+): (.*)/.exec(l);
                                if (m)
                                    res_1.headers[m[1].toLowerCase()] = m[2];
                            });
                            resolve(res_1);
                        }
                    };
                    var data = options.data;
                    var method = options.method || (data == null ? "GET" : "POST");
                    var buf;
                    if (data == null) {
                        buf = null;
                    }
                    else if (data instanceof Uint8Array) {
                        buf = data;
                    }
                    else if (typeof data == "object") {
                        buf = JSON.stringify(data);
                        headers["content-type"] = "application/json; charset=utf8";
                    }
                    else if (typeof data == "string") {
                        buf = data;
                    }
                    else {
                        pxtc.Util.oops("bad data");
                    }
                    client.open(method, options.url);
                    Object.keys(headers).forEach(function (k) {
                        client.setRequestHeader(k, headers[k]);
                    });
                    if (buf == null)
                        client.send();
                    else
                        client.send(buf);
                });
            }
            var sha256_k = new Uint32Array([
                0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
                0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
                0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
                0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
                0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
                0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
                0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
                0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
            ]);
            function rotr(v, b) {
                return (v >>> b) | (v << (32 - b));
            }
            function sha256round(hs, w) {
                pxtc.Util.assert(hs.length == 8);
                pxtc.Util.assert(w.length == 64);
                for (var i = 16; i < 64; ++i) {
                    var s0 = rotr(w[i - 15], 7) ^ rotr(w[i - 15], 18) ^ (w[i - 15] >>> 3);
                    var s1 = rotr(w[i - 2], 17) ^ rotr(w[i - 2], 19) ^ (w[i - 2] >>> 10);
                    w[i] = (w[i - 16] + s0 + w[i - 7] + s1) | 0;
                }
                var a = hs[0];
                var b = hs[1];
                var c = hs[2];
                var d = hs[3];
                var e = hs[4];
                var f = hs[5];
                var g = hs[6];
                var h = hs[7];
                for (var i = 0; i < 64; ++i) {
                    var s1 = rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25);
                    var ch = (e & f) ^ (~e & g);
                    var temp1 = (h + s1 + ch + sha256_k[i] + w[i]) | 0;
                    var s0 = rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22);
                    var maj = (a & b) ^ (a & c) ^ (b & c);
                    var temp2 = (s0 + maj) | 0;
                    h = g;
                    g = f;
                    f = e;
                    e = (d + temp1) | 0;
                    d = c;
                    c = b;
                    b = a;
                    a = (temp1 + temp2) | 0;
                }
                hs[0] += a;
                hs[1] += b;
                hs[2] += c;
                hs[3] += d;
                hs[4] += e;
                hs[5] += f;
                hs[6] += g;
                hs[7] += h;
            }
            function sha256buffer(buf) {
                var h = new Uint32Array(8);
                h[0] = 0x6a09e667;
                h[1] = 0xbb67ae85;
                h[2] = 0x3c6ef372;
                h[3] = 0xa54ff53a;
                h[4] = 0x510e527f;
                h[5] = 0x9b05688c;
                h[6] = 0x1f83d9ab;
                h[7] = 0x5be0cd19;
                var work = new Uint32Array(64);
                var chunkLen = 16 * 4;
                function addBuf(buf) {
                    var end = buf.length - (chunkLen - 1);
                    for (var i = 0; i < end; i += chunkLen) {
                        for (var j = 0; j < 16; j++) {
                            var off = (j << 2) + i;
                            work[j] = (buf[off] << 24) | (buf[off + 1] << 16) | (buf[off + 2] << 8) | buf[off + 3];
                        }
                        sha256round(h, work);
                    }
                }
                addBuf(buf);
                var padSize = 64 - (buf.length + 9) % 64;
                if (padSize == 64)
                    padSize = 0;
                var endPos = buf.length - (buf.length % chunkLen);
                var padBuf = new Uint8Array((buf.length - endPos) + 1 + padSize + 8);
                var dst = 0;
                while (endPos < buf.length)
                    padBuf[dst++] = buf[endPos++];
                padBuf[dst++] = 0x80;
                while (padSize-- > 0)
                    padBuf[dst++] = 0x00;
                var len = buf.length * 8;
                dst = padBuf.length;
                while (len > 0) {
                    padBuf[--dst] = len & 0xff;
                    len >>= 8;
                }
                addBuf(padBuf);
                var res = "";
                for (var i = 0; i < h.length; ++i)
                    res += ("000000000" + h[i].toString(16)).slice(-8);
                return res.toLowerCase();
            }
            BrowserImpl.sha256buffer = sha256buffer;
            function sha256string(s) {
                return sha256buffer(pxtc.Util.stringToUint8Array(pxtc.Util.toUTF8(s)));
            }
            BrowserImpl.sha256string = sha256string;
        })(BrowserImpl = pxtc.BrowserImpl || (pxtc.BrowserImpl = {}));
    })(pxtc = ts.pxtc || (ts.pxtc = {}));
})(ts || (ts = {}));
/// <reference path="../typings/globals/bluebird/index.d.ts"/>
/// <reference path="../localtypings/pxtpackage.d.ts"/>
/// <reference path="../localtypings/pxtparts.d.ts"/>
/// <reference path="../localtypings/pxtarget.d.ts"/>
/// <reference path="emitter/util.ts"/>
var pxt;
(function (pxt) {
    pxt.U = pxtc.Util;
    pxt.Util = pxtc.Util;
    var lf = pxt.U.lf;
    function setAppTarget(trg) {
        pxt.appTarget = trg;
        // patch-up the target
        var comp = pxt.appTarget.compile;
        if (!comp)
            comp = pxt.appTarget.compile = { isNative: false, hasHex: false };
        if (comp.hasHex && comp.jsRefCounting === undefined)
            comp.jsRefCounting = true;
        if (!comp.hasHex && comp.floatingPoint === undefined)
            comp.floatingPoint = true;
        if (comp.nativeType == "AVR") {
            comp.shortPointers = true;
            comp.flashCodeAlign = 0x10;
        }
        if (!trg.appTheme)
            trg.appTheme = {};
        if (!trg.appTheme.embedUrl)
            trg.appTheme.embedUrl = trg.appTheme.homeUrl;
        var cs = pxt.appTarget.compileService;
        if (cs) {
            if (cs.yottaTarget && !cs.yottaBinary)
                cs.yottaBinary = "pxt-microbit-app-combined.hex";
        }
    }
    pxt.setAppTarget = setAppTarget;
    pxt.options = {};
    // general error reported
    pxt.debug = typeof console !== "undefined" && !!console.debug
        ? function (msg) {
            if (pxt.options.debug)
                console.debug(msg);
        } : function () { };
    pxt.log = typeof console !== "undefined" && !!console.log
        ? function (msg) {
            console.log(msg);
        } : function () { };
    pxt.reportException = function (e, d) {
        if (console) {
            console.error(e);
            if (d) {
                try {
                    // log it as object, so native object inspector can be used
                    console.log(d);
                }
                catch (e) { }
            }
        }
    };
    pxt.reportError = function (cat, msg, data) {
        if (console) {
            console.error(cat + ": " + msg);
            if (data) {
                try {
                    pxt.log(JSON.stringify(data, null, 2));
                }
                catch (e) { }
            }
        }
    };
    /**
     * Track an event.
     */
    pxt.tickEvent = function (id) { };
    var activityEvents = {};
    var tickActivityDebounced = pxt.Util.debounce(function () {
        pxt.tickEvent("activity", activityEvents);
        activityEvents = {};
    }, 10000, false);
    /**
     * Ticks activity events. This event gets aggregated and eventually gets sent.
     */
    function tickActivity() {
        var ids = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            ids[_i - 0] = arguments[_i];
        }
        ids.forEach(function (id) { return activityEvents[id] = (activityEvents[id] || 0) + 1; });
        tickActivityDebounced();
    }
    pxt.tickActivity = tickActivity;
    function localWebConfig() {
        var r = {
            relprefix: "/--",
            workerjs: "/worker.js",
            tdworkerjs: "/tdworker.js",
            monacoworkerjs: "/monacoworker.js",
            pxtVersion: "local",
            pxtRelId: "",
            pxtCdnUrl: "/cdn/",
            targetUrl: "",
            targetVersion: "local",
            targetRelId: "",
            targetCdnUrl: "/sim/",
            targetId: pxt.appTarget ? pxt.appTarget.id : "",
            simUrl: "/sim/simulator.html",
            partsUrl: "/sim/siminstructions.html"
        };
        return r;
    }
    pxt.localWebConfig = localWebConfig;
    function getOnlineCdnUrl() {
        if (!pxt.webConfig)
            return null;
        var m = /^(https:\/\/[^\/]+)/.exec(pxt.webConfig.pxtCdnUrl);
        if (m)
            return m[1];
        else
            return null;
    }
    pxt.getOnlineCdnUrl = getOnlineCdnUrl;
    function setupWebConfig(cfg) {
        if (cfg)
            pxt.webConfig = cfg;
        else if (!pxt.webConfig)
            pxt.webConfig = localWebConfig();
    }
    pxt.setupWebConfig = setupWebConfig;
    function getEmbeddedScript(id) {
        return pxt.U.lookup(pxt.appTarget.bundledpkgs || {}, id);
    }
    pxt.getEmbeddedScript = getEmbeddedScript;
    var Package = (function () {
        function Package(id, _verspec, parent, addedBy) {
            this.id = id;
            this._verspec = _verspec;
            this.parent = parent;
            this.level = -1;
            this.isLoaded = false;
            if (parent) {
                this.level = this.parent.level + 1;
            }
            this.addedBy = [addedBy];
        }
        Package.getConfigAsync = function (id, fullVers) {
            return Promise.resolve().then(function () {
                if (pxt.github.isGithubId(fullVers)) {
                    var repoInfo_1 = pxt.github.parseRepoId(fullVers);
                    return pxt.packagesConfigAsync()
                        .then(function (config) { return pxt.github.repoAsync(repoInfo_1.fullName, config); }) // Make sure repo exists and is whitelisted
                        .then(function (gitRepo) { return gitRepo ? pxt.github.pkgConfigAsync(repoInfo_1.fullName, repoInfo_1.tag) : null; });
                }
                else {
                    // If it's not from GH, assume it's a bundled package
                    // TODO: Add logic for shared packages if we enable that
                    return JSON.parse(pxt.appTarget.bundledpkgs[id][pxt.CONFIG_NAME]);
                }
            });
        };
        Package.prototype.version = function () {
            return this.resolvedVersion || this._verspec;
        };
        Package.prototype.verProtocol = function () {
            var spl = this.version().split(':');
            if (spl.length > 1)
                return spl[0];
            else
                return "";
        };
        Package.prototype.verArgument = function () {
            var p = this.verProtocol();
            if (p)
                return this.version().slice(p.length + 1);
            return this.version();
        };
        Package.prototype.commonDownloadAsync = function () {
            var _this = this;
            var proto = this.verProtocol();
            if (proto == "pub") {
                return pxt.Cloud.downloadScriptFilesAsync(this.verArgument());
            }
            else if (proto == "github") {
                return pxt.packagesConfigAsync()
                    .then(function (config) { return pxt.github.downloadPackageAsync(_this.verArgument(), config); })
                    .then(function (resp) { return resp.files; });
            }
            else if (proto == "embed") {
                var resp = pxt.getEmbeddedScript(this.verArgument());
                return Promise.resolve(resp);
            }
            else
                return Promise.resolve(null);
        };
        Package.prototype.host = function () { return this.parent._host; };
        Package.prototype.readFile = function (fn) {
            return this.host().readFile(this, fn);
        };
        Package.prototype.resolveDep = function (id) {
            if (this.parent.deps.hasOwnProperty(id))
                return this.parent.deps[id];
            return null;
        };
        Package.prototype.saveConfig = function () {
            var cfg = JSON.stringify(this.config, null, 4) || "\n";
            this.host().writeFile(this, pxt.CONFIG_NAME, cfg);
        };
        Package.prototype.resolveVersionAsync = function () {
            var v = this._verspec;
            if (getEmbeddedScript(this.id)) {
                this.resolvedVersion = v = "embed:" + this.id;
            }
            else if (!v || v == "*") {
                pxt.U.userError(lf("version not specified for {0}", v));
            }
            return Promise.resolve(v);
        };
        Package.prototype.downloadAsync = function () {
            var _this = this;
            var kindCfg = "";
            return this.resolveVersionAsync()
                .then(function (verNo) {
                if (!/^embed:/.test(verNo) &&
                    _this.config && _this.config.installedVersion == verNo)
                    return;
                pxt.debug('downloading ' + verNo);
                return _this.host().downloadPackageAsync(_this)
                    .then(function () {
                    var confStr = _this.readFile(pxt.CONFIG_NAME);
                    if (!confStr)
                        pxt.U.userError("package " + _this.id + " is missing " + pxt.CONFIG_NAME);
                    _this.parseConfig(confStr);
                    if (_this.level != 0)
                        _this.config.installedVersion = _this.version();
                    _this.saveConfig();
                })
                    .then(function () {
                    pxt.debug("installed " + _this.id + " /" + verNo);
                });
            });
        };
        Package.prototype.validateConfig = function () {
            if (!this.config.dependencies)
                pxt.U.userError("Missing dependencies in config of: " + this.id);
            if (!Array.isArray(this.config.files))
                pxt.U.userError("Missing files in config of: " + this.id);
            if (typeof this.config.name != "string" || !this.config.name ||
                (this.config.public && !/^[a-z][a-z0-9\-_]+$/i.test(this.config.name)))
                pxt.U.userError("Invalid package name: " + this.config.name);
            if (this.config.targetVersions
                && this.config.targetVersions.target
                && pxt.semver.strcmp(this.config.targetVersions.target, pxt.appTarget.versions.target) > 0)
                pxt.U.userError(lf("Package {0} requires target version {1} (you are running {2})", this.config.name, this.config.targetVersions.target, pxt.appTarget.versions.target));
        };
        Package.prototype.isPackageInUse = function (pkgId, ts) {
            if (ts === void 0) { ts = this.readFile("main.ts"); }
            // Build the RegExp that will determine whether the dependency is in use. Try to use upgrade rules,
            // otherwise fallback to the package's name
            var regex = null;
            var upgrades = pxt.appTarget.compile ? pxt.appTarget.compile.upgrades : undefined;
            if (upgrades) {
                upgrades.filter(function (rule) { return rule.type == "missingPackage"; }).forEach(function (rule) {
                    Object.keys(rule.map).forEach(function (match) {
                        if (rule.map[match] === pkgId) {
                            regex = new RegExp(match, "g");
                        }
                    });
                });
            }
            if (!regex) {
                regex = new RegExp(pkgId + "\\.", "g");
            }
            return regex.test(ts);
        };
        Package.prototype.getMissingPackages = function (config, ts) {
            var upgrades = pxt.appTarget.compile ? pxt.appTarget.compile.upgrades : undefined;
            var missing = {};
            if (ts && upgrades)
                upgrades.filter(function (rule) { return rule.type == "missingPackage"; })
                    .forEach(function (rule) {
                    var _loop_1 = function(match) {
                        var regex = new RegExp(match, 'g');
                        var pkg = rule.map[match];
                        ts.replace(regex, function (m) {
                            if (!config.dependencies[pkg]) {
                                missing[pkg] = "*";
                            }
                            return "";
                        });
                    };
                    for (var match in rule.map) {
                        _loop_1(match);
                    }
                });
            return missing;
        };
        /**
         * For the given package config or ID, looks through all the currently installed packages to find conflicts in
         * Yotta settings
         */
        Package.prototype.findConflictsAsync = function (pkgOrId, version) {
            var _this = this;
            var conflicts = [];
            var pkgCfg;
            return Promise.resolve()
                .then(function () {
                // Get the package config if it's not already provided
                if (typeof pkgOrId === "string") {
                    return Package.getConfigAsync(pkgOrId, version);
                }
                else {
                    return Promise.resolve(pkgOrId);
                }
            })
                .then(function (cfg) {
                pkgCfg = cfg;
                // Iterate through all installed packages and check for conflicting settings
                if (pkgCfg && pkgCfg.yotta) {
                    var yottaCfg_1 = pxt.U.jsonFlatten(pkgCfg.yotta.config);
                    _this.parent.sortedDeps().forEach(function (depPkg) {
                        var depConfig = depPkg.config || JSON.parse(depPkg.readFile(pxt.CONFIG_NAME));
                        var hasYottaSettings = !!depConfig && !!depConfig.yotta && !!depPkg.config.yotta.config;
                        if (hasYottaSettings) {
                            var depYottaCfg = pxt.U.jsonFlatten(depConfig.yotta.config);
                            for (var _i = 0, _a = Object.keys(yottaCfg_1); _i < _a.length; _i++) {
                                var settingName = _a[_i];
                                var depSetting = depYottaCfg[settingName];
                                var isJustDefaults = pkgCfg.yotta.configIsJustDefaults || depConfig.yotta.configIsJustDefaults;
                                if (depYottaCfg.hasOwnProperty(settingName) && depSetting !== yottaCfg_1[settingName] && !isJustDefaults && (!depPkg.parent.config.yotta || !depPkg.parent.config.yotta.ignoreConflicts)) {
                                    var conflict = new pxt.cpp.PkgConflictError(lf("conflict on yotta setting {0} between packages {1} and {2}", settingName, pkgCfg.name, depPkg.id));
                                    conflict.pkg0 = depPkg;
                                    conflict.settingName = settingName;
                                    conflicts.push(conflict);
                                }
                            }
                        }
                    });
                }
                // Also check for conflicts for all the specified package's dependencies (recursively)
                return Object.keys(pkgCfg.dependencies).reduce(function (soFar, pkgDep) {
                    return soFar
                        .then(function () { return _this.findConflictsAsync(pkgDep, pkgCfg.dependencies[pkgDep]); })
                        .then(function (childConflicts) { return conflicts.push.apply(conflicts, childConflicts); });
                }, Promise.resolve());
            })
                .then(function () {
                // For each conflicting package, we need to include their ancestor tree in the list of conflicts
                // For example, if package A depends on package B, and package B is in conflict with package C,
                // then package A is also technically in conflict with C
                var allAncestors = function (p) {
                    var ancestors = [];
                    p.addedBy.forEach(function (a) {
                        if (a.id !== _this.id) {
                            ancestors.push.apply(allAncestors(a));
                            ancestors.push(a);
                        }
                    });
                    return ancestors;
                };
                var additionalConflicts = [];
                conflicts.forEach(function (c) {
                    additionalConflicts.push.apply(additionalConflicts, allAncestors(c.pkg0).map(function (anc) {
                        var confl = new pxt.cpp.PkgConflictError(lf("conflict on yotta setting {0} between packages {1} and {2}", c.settingName, pkgCfg.name, c.pkg0.id));
                        confl.pkg0 = anc;
                        return confl;
                    }));
                });
                conflicts.push.apply(conflicts, additionalConflicts);
                // Remove duplicate conflicts (happens if more than one package had the same ancestor)
                conflicts = conflicts.filter(function (c, index) {
                    for (var i = 0; i < index; ++i) {
                        if (c.pkg0.id === conflicts[i].pkg0.id) {
                            return false;
                        }
                    }
                    return true;
                });
                return conflicts;
            });
        };
        Package.prototype.upgradePackage = function (pkg, val) {
            if (val != "*")
                return pkg;
            var upgrades = pxt.appTarget.compile ? pxt.appTarget.compile.upgrades : undefined;
            var newPackage = pkg;
            if (upgrades) {
                upgrades.filter(function (rule) { return rule.type == "package"; })
                    .forEach(function (rule) {
                    for (var match in rule.map) {
                        if (newPackage == match) {
                            newPackage = rule.map[match];
                        }
                    }
                });
            }
            return newPackage;
        };
        Package.prototype.upgradeAPI = function (fileContents) {
            var upgrades = pxt.appTarget.compile ? pxt.appTarget.compile.upgrades : undefined;
            var updatedContents = fileContents;
            if (upgrades) {
                upgrades.filter(function (rule) { return rule.type == "api"; })
                    .forEach(function (rule) {
                    for (var match in rule.map) {
                        var regex = new RegExp(match, 'g');
                        updatedContents = updatedContents.replace(regex, rule.map[match]);
                    }
                });
            }
            return updatedContents;
        };
        Package.prototype.parseConfig = function (cfgSrc) {
            var cfg = JSON.parse(cfgSrc);
            this.config = cfg;
            var currentConfig = JSON.stringify(this.config);
            for (var dep in this.config.dependencies) {
                var value = this.upgradePackage(dep, this.config.dependencies[dep]);
                if (value != dep) {
                    delete this.config.dependencies[dep];
                    if (value) {
                        this.config.dependencies[value] = "*";
                    }
                }
            }
            if (JSON.stringify(this.config) != currentConfig) {
                this.saveConfig();
            }
            this.validateConfig();
        };
        Package.prototype.loadAsync = function (isInstall) {
            var _this = this;
            if (isInstall === void 0) { isInstall = false; }
            if (this.isLoaded)
                return Promise.resolve();
            var initPromise = Promise.resolve();
            this.isLoaded = true;
            var str = this.readFile(pxt.CONFIG_NAME);
            var mainTs = this.readFile("main.ts");
            if (str == null) {
                if (!isInstall)
                    pxt.U.userError("Package not installed: " + this.id);
            }
            else {
                initPromise = initPromise.then(function () { return _this.parseConfig(str); });
            }
            if (isInstall)
                initPromise = initPromise.then(function () { return _this.downloadAsync(); });
            var loadDepsRecursive = function (dependencies) {
                return pxt.U.mapStringMapAsync(dependencies, function (id, ver) {
                    var mod = _this.resolveDep(id);
                    ver = ver || "*";
                    if (mod) {
                        if (mod._verspec != ver && !/^file:/.test(mod._verspec) && !/^file:/.test(ver))
                            pxt.U.userError("Version spec mismatch on " + id);
                        mod.level = Math.min(mod.level, _this.level + 1);
                        mod.addedBy.push(_this);
                        return Promise.resolve();
                    }
                    else {
                        mod = new Package(id, ver, _this.parent, _this);
                        _this.parent.deps[id] = mod;
                        return mod.loadAsync(isInstall);
                    }
                });
            };
            return initPromise
                .then(function () { return loadDepsRecursive(_this.config.dependencies); })
                .then(function () {
                if (_this.level === 0) {
                    // Check for missing packages. We need to add them 1 by 1 in case they conflict with eachother.
                    var missingPackages_1 = _this.getMissingPackages(JSON.parse(str), mainTs);
                    var didAddPackages_1 = false;
                    var addPackagesPromise = Promise.resolve();
                    Object.keys(missingPackages_1).reduce(function (addPackagesPromise, missing) {
                        return addPackagesPromise
                            .then(function () { return _this.findConflictsAsync(missing, missingPackages_1[missing]); })
                            .then(function (conflicts) {
                            if (conflicts.length) {
                                var conflictNames = conflicts.map(function (c) { return c.pkg0.id; }).join(", ");
                                var settingNames = conflicts.map(function (c) { return c.settingName; }).filter(function (s) { return !!s; }).join(", ");
                                pxt.log("skipping missing package " + missing + " because it conflicts with the following packages: " + conflictNames + " (conflicting settings: " + settingNames + ")");
                                return Promise.resolve(null);
                            }
                            else {
                                pxt.log("adding missing package " + missing);
                                didAddPackages_1 = true;
                                _this.config.dependencies[missing] = "*";
                                var addDependency = {};
                                addDependency[missing] = missingPackages_1[missing];
                                return loadDepsRecursive(addDependency);
                            }
                        });
                    }, Promise.resolve(null))
                        .then(function () {
                        if (didAddPackages_1) {
                            _this.saveConfig();
                            _this.validateConfig();
                        }
                        return Promise.resolve(null);
                    });
                }
                return Promise.resolve(null);
            })
                .then(function () { return null; });
        };
        Package.prototype.getFiles = function () {
            if (this.level == 0)
                return this.config.files.concat(this.config.testFiles || []);
            else
                return this.config.files.slice(0);
        };
        Package.prototype.addSnapshot = function (files, exts) {
            if (exts === void 0) { exts = [""]; }
            var _loop_2 = function(fn) {
                if (exts.some(function (e) { return pxt.U.endsWith(fn, e); })) {
                    files[this_1.id + "/" + fn] = this_1.readFile(fn);
                }
            };
            var this_1 = this;
            for (var _i = 0, _a = this.getFiles(); _i < _a.length; _i++) {
                var fn = _a[_i];
                _loop_2(fn);
            }
            files[this.id + "/" + pxt.CONFIG_NAME] = this.readFile(pxt.CONFIG_NAME);
        };
        /**
         * Returns localized strings qName -> translation
         */
        Package.prototype.packageLocalizationStringsAsync = function (lang) {
            var _this = this;
            var targetId = pxt.appTarget.id;
            var filenames = [this.id + "-jsdoc", this.id];
            var r = {};
            if (pxt.Util.localizeLive && this.id != "this") {
                pxt.log("loading live translations for " + this.id);
                var code_1 = pxt.Util.userLanguage();
                return Promise.all(filenames.map(function (fn) { return pxt.Util.downloadLiveTranslationsAsync(code_1, targetId + "/" + fn + "-strings.json")
                    .then(function (tr) { return pxt.Util.jsonMergeFrom(r, tr); })
                    .catch(function (e) { return pxt.log("error while downloading " + targetId + "/" + fn + "-strings.json"); }); })).then(function () { return r; });
            }
            var files = this.config.files;
            filenames.map(function (name) {
                var fn = "_locales/" + lang.toLowerCase() + "/" + name + "-strings.json";
                if (files.indexOf(fn) > -1)
                    return JSON.parse(_this.readFile(fn));
                if (lang.length > 2) {
                    fn = "_locales/" + lang.substring(0, 2).toLowerCase() + "/" + name + "-strings.json";
                    if (files.indexOf(fn) > -1)
                        return JSON.parse(_this.readFile(fn));
                }
                return undefined;
            }).filter(function (d) { return !!d; }).forEach(function (d) { return pxt.Util.jsonMergeFrom(r, d); });
            return Promise.resolve(r);
        };
        return Package;
    }());
    pxt.Package = Package;
    var MainPackage = (function (_super) {
        __extends(MainPackage, _super);
        function MainPackage(_host) {
            _super.call(this, "this", "file:.", null, null);
            this._host = _host;
            this.deps = {};
            this.parent = this;
            this.addedBy = [this];
            this.level = 0;
            this.deps[this.id] = this;
        }
        MainPackage.prototype.installAllAsync = function () {
            return this.loadAsync(true);
        };
        MainPackage.prototype.sortedDeps = function () {
            var _this = this;
            var visited = {};
            var ids = [];
            var rec = function (p) {
                if (!p || pxt.U.lookup(visited, p.id))
                    return;
                visited[p.id] = true;
                if (p.config && p.config.dependencies) {
                    var deps = Object.keys(p.config.dependencies);
                    deps.sort(function (a, b) { return pxt.U.strcmp(a, b); });
                    deps.forEach(function (id) { return rec(_this.resolveDep(id)); });
                    ids.push(p.id);
                }
            };
            rec(this);
            return ids.map(function (id) { return _this.resolveDep(id); });
        };
        MainPackage.prototype.localizationStringsAsync = function (lang) {
            var loc = {};
            return Promise.all(pxt.Util.values(this.deps).map(function (dep) {
                return dep.packageLocalizationStringsAsync(lang)
                    .then(function (depLoc) {
                    if (depLoc)
                        for (var k in depLoc)
                            if (!loc[k])
                                loc[k] = depLoc[k];
                });
            }))
                .then(function () { return loc; });
        };
        MainPackage.prototype.getTargetOptions = function () {
            var res = pxt.U.clone(pxt.appTarget.compile);
            pxt.U.assert(!!res);
            return res;
        };
        MainPackage.prototype.getCompileOptionsAsync = function (target) {
            var _this = this;
            if (target === void 0) { target = this.getTargetOptions(); }
            var opts = {
                sourceFiles: [],
                fileSystem: {},
                target: target,
                hexinfo: { hex: [] }
            };
            var generateFile = function (fn, cont) {
                if (_this.config.files.indexOf(fn) < 0)
                    pxt.U.userError(lf("please add '{0}' to \"files\" in {1}", fn, pxt.CONFIG_NAME));
                cont = "// Auto-generated. Do not edit.\n" + cont + "\n// Auto-generated. Do not edit. Really.\n";
                if (_this.host().readFile(_this, fn) !== cont) {
                    pxt.debug("updating " + fn + " (size=" + cont.length + ")...");
                    _this.host().writeFile(_this, fn, cont);
                }
            };
            var upgradeFile = function (fn, cont) {
                var updatedCont = _this.upgradeAPI(cont);
                if (updatedCont != cont) {
                    // save file (force write)
                    pxt.debug("updating APIs in " + fn + " (size=" + cont.length + ")...");
                    _this.host().writeFile(_this, fn, updatedCont, true);
                }
                return updatedCont;
            };
            return this.loadAsync()
                .then(function () {
                pxt.debug("building: " + _this.sortedDeps().map(function (p) { return p.config.name; }).join(", "));
                var ext = pxt.cpp.getExtensionInfo(_this);
                if (ext.shimsDTS)
                    generateFile("shims.d.ts", ext.shimsDTS);
                if (ext.enumsDTS)
                    generateFile("enums.d.ts", ext.enumsDTS);
                return (target.isNative
                    ? _this.host().getHexInfoAsync(ext)
                    : Promise.resolve(null))
                    .then(function (inf) {
                    ext = pxt.U.flatClone(ext);
                    delete ext.compileData;
                    delete ext.generatedFiles;
                    delete ext.extensionFiles;
                    opts.extinfo = ext;
                    opts.hexinfo = inf;
                });
            })
                .then(function () { return _this.config.binaryonly || pxt.appTarget.compile.shortPointers || !opts.target.isNative ? null : _this.filesToBePublishedAsync(true); })
                .then(function (files) {
                if (files) {
                    files = pxt.U.mapMap(files, upgradeFile);
                    var headerString_1 = JSON.stringify({
                        name: _this.config.name,
                        comment: _this.config.description,
                        status: "unpublished",
                        scriptId: _this.config.installedVersion,
                        cloudId: pxt.CLOUD_ID + pxt.appTarget.id,
                        editor: target.preferredEditor ? target.preferredEditor : (pxt.U.lookup(files, "main.blocks") ? pxt.BLOCKS_PROJECT_NAME : pxt.JAVASCRIPT_PROJECT_NAME),
                        targetVersions: pxt.appTarget.versions
                    });
                    var programText_1 = JSON.stringify(files);
                    return pxt.lzmaCompressAsync(headerString_1 + programText_1)
                        .then(function (buf) {
                        opts.embedMeta = JSON.stringify({
                            compression: "LZMA",
                            headerSize: headerString_1.length,
                            textSize: programText_1.length,
                            name: _this.config.name,
                            eURL: pxt.appTarget.appTheme.embedUrl,
                            eVER: pxt.appTarget.versions ? pxt.appTarget.versions.target : "",
                            pxtTarget: pxt.appTarget.id,
                        });
                        opts.embedBlob = btoa(pxt.U.uint8ArrayToString(buf));
                    });
                }
                else {
                    return Promise.resolve();
                }
            })
                .then(function () {
                for (var _i = 0, _a = _this.sortedDeps(); _i < _a.length; _i++) {
                    var pkg = _a[_i];
                    for (var _b = 0, _c = pkg.getFiles(); _b < _c.length; _b++) {
                        var f = _c[_b];
                        if (/\.(ts|asm)$/.test(f)) {
                            var sn = f;
                            if (pkg.level > 0)
                                sn = "pxt_modules/" + pkg.id + "/" + f;
                            opts.sourceFiles.push(sn);
                            opts.fileSystem[sn] = pkg.readFile(f);
                        }
                    }
                }
                return opts;
            });
        };
        MainPackage.prototype.buildAsync = function (target) {
            return this.getCompileOptionsAsync(target)
                .then(function (opts) { return pxtc.compile(opts); });
        };
        MainPackage.prototype.serviceAsync = function (op) {
            return this.getCompileOptionsAsync()
                .then(function (opts) {
                pxtc.service.performOperation("reset", {});
                pxtc.service.performOperation("setOpts", { options: opts });
                return pxtc.service.performOperation(op, {});
            });
        };
        MainPackage.prototype.filesToBePublishedAsync = function (allowPrivate) {
            var _this = this;
            if (allowPrivate === void 0) { allowPrivate = false; }
            var files = {};
            return this.loadAsync()
                .then(function () {
                if (!allowPrivate && !_this.config.public)
                    pxt.U.userError('Only packages with "public":true can be published');
                var cfg = pxt.U.clone(_this.config);
                delete cfg.installedVersion;
                pxt.U.iterMap(cfg.dependencies, function (k, v) {
                    if (!v || /^file:/.test(v) || /^workspace:/.test(v)) {
                        cfg.dependencies[k] = "*";
                    }
                });
                files[pxt.CONFIG_NAME] = JSON.stringify(cfg, null, 4);
                for (var _i = 0, _a = _this.getFiles(); _i < _a.length; _i++) {
                    var f = _a[_i];
                    var str = _this.readFile(f);
                    if (str == null)
                        pxt.U.userError("referenced file missing: " + f);
                    files[f] = str;
                }
                return pxt.U.sortObjectFields(files);
            });
        };
        MainPackage.prototype.computePartDefinitions = function (parts) {
            if (!parts || !parts.length)
                return {};
            var res = {};
            this.sortedDeps().forEach(function (d) {
                var pjson = d.readFile("pxtparts.json");
                if (pjson) {
                    try {
                        var p = JSON.parse(pjson);
                        for (var k in p) {
                            if (parts.indexOf(k) >= 0) {
                                var part = res[k] = p[k];
                                if (typeof part.visual.image === "string" && /\.svg$/i.test(part.visual.image)) {
                                    var f = d.readFile(part.visual.image);
                                    if (!f)
                                        pxt.reportError("parts", "invalid part definition", { "error": "missing visual " + part.visual.image });
                                    part.visual.image = "data:image/svg+xml," + encodeURIComponent(f);
                                }
                            }
                        }
                    }
                    catch (e) {
                        pxt.reportError("parts", "invalid pxtparts.json file");
                    }
                }
            });
            return res;
        };
        return MainPackage;
    }(Package));
    pxt.MainPackage = MainPackage;
    var _targetConfig = undefined;
    function targetConfigAsync() {
        return _targetConfig ? Promise.resolve(_targetConfig)
            : pxt.Cloud.privateGetAsync("config/" + pxt.appTarget.id + "/targetconfig")
                .then(function (js) { _targetConfig = js; return _targetConfig; });
    }
    pxt.targetConfigAsync = targetConfigAsync;
    function packagesConfigAsync() {
        return targetConfigAsync().then(function (config) { return config ? config.packages : undefined; });
    }
    pxt.packagesConfigAsync = packagesConfigAsync;
    pxt.CONFIG_NAME = "pxt.json";
    pxt.CLOUD_ID = "pxt/";
    pxt.BLOCKS_PROJECT_NAME = "blocksprj";
    pxt.JAVASCRIPT_PROJECT_NAME = "tsprj";
})(pxt || (pxt = {}));
/// <reference path="main.ts"/>
var pxt;
(function (pxt) {
    var blocks;
    (function (blocks) {
        function parameterNames(fn) {
            // collect blockly parameter name mapping
            var instance = (fn.kind == pxtc.SymbolKind.Method || fn.kind == pxtc.SymbolKind.Property) && !fn.attributes.defaultInstance;
            var attrNames = {};
            if (instance)
                attrNames["this"] = { name: "this", type: fn.namespace };
            if (fn.parameters)
                fn.parameters.forEach(function (pr) { return attrNames[pr.name] = {
                    name: pr.name,
                    type: pr.type,
                    shadowValue: pr.defaults ? pr.defaults[0] : undefined
                }; });
            if (fn.attributes.block) {
                Object.keys(attrNames).forEach(function (k) { return attrNames[k].name = ""; });
                var rx = /%([a-zA-Z0-9_]+)(=([a-zA-Z0-9_]+))?/g;
                var m = void 0;
                var i = 0;
                while (m = rx.exec(fn.attributes.block)) {
                    if (i == 0 && instance) {
                        attrNames["this"].name = m[1];
                        if (m[3])
                            attrNames["this"].shadowType = m[3];
                        m = rx.exec(fn.attributes.block);
                        if (!m)
                            break;
                    }
                    var at = attrNames[fn.parameters[i++].name];
                    at.name = m[1];
                    if (m[3])
                        at.shadowType = m[3];
                }
            }
            return attrNames;
        }
        blocks.parameterNames = parameterNames;
        function parseFields(b) {
            // normalize and validate common errors
            // made while translating
            var nb = b.replace(/%\s+/g, '%');
            if (nb != b)
                pxt.log("block has extra spaces: " + b);
            if (nb[0] == nb[0].toLocaleUpperCase() && nb[0] != nb[0].toLowerCase())
                pxt.log("block is capitalized: " + b);
            nb = nb.replace(/\s*\|\s*/g, '|');
            return nb.split('|').map(function (n, ni) {
                var m = /([^%]*)\s*%([a-zA-Z0-9_]+)/.exec(n);
                if (!m)
                    return { n: n, ni: ni };
                var pre = m[1];
                if (pre)
                    pre = pre.trim();
                var p = m[2];
                return { n: n, ni: ni, pre: pre, p: p };
            });
        }
        blocks.parseFields = parseFields;
        var _helpResources;
        function helpResources() {
            if (!_helpResources)
                cacheHelpResources();
            return _helpResources;
        }
        blocks.helpResources = helpResources;
        function cacheHelpResources() {
            _helpResources = {
                'device_while': {
                    name: pxt.Util.lf("a loop that repeats while the condition is true"),
                    tooltip: pxt.Util.lf("Run the same sequence of actions while the condition is met."),
                    url: '/blocks/loops/while',
                    category: 'loops'
                },
                'controls_simple_for': {
                    name: pxt.Util.lf("a loop that repeats the number of times you say"),
                    url: 'blocks/loops/for',
                    category: 'loops'
                },
                'math_op2': {
                    name: pxt.Util.lf("minimum or maximum of 2 numbers"),
                    url: '/blocks/math',
                    operators: {
                        'op': ["min", "max"]
                    },
                    category: 'math'
                },
                'math_op3': {
                    name: pxt.Util.lf("absolute number"),
                    tooltip: pxt.Util.lf("absolute value of a number"),
                    url: '/blocks/math/abs',
                    category: 'math'
                },
                'device_random': {
                    name: pxt.Util.lf("pick random number"),
                    tooltip: pxt.Util.lf("Returns a random integer between 0 and the specified bound (inclusive)."),
                    url: '/blocks/math/random',
                    category: 'math'
                },
                'math_number': {
                    name: pxt.Util.lf("{id:block}number"),
                    url: '/blocks/math/random',
                    category: 'math'
                },
                'math_number_minmax': {
                    name: pxt.Util.lf("{id:block}number"),
                    url: '/blocks/math/random',
                    category: 'math'
                },
                'math_arithmetic': {
                    name: pxt.Util.lf("arithmetic operation"),
                    url: '/blocks/math',
                    operators: {
                        'OP': ["ADD", "MINUS", "MULTIPLY", "DIVIDE", "POWER"]
                    },
                    category: 'math'
                },
                'math_modulo': {
                    name: pxt.Util.lf("division remainder"),
                    tooltip: pxt.Util.lf("Return the remainder from dividing the two numbers."),
                    url: '/blocks/math',
                    category: 'math'
                },
                'variables_change': {
                    name: pxt.Util.lf("update the value of a number variable"),
                    tooltip: pxt.Util.lf("Changes the value of the variable by this amount"),
                    url: '/blocks/variables/change-var',
                    category: 'variables'
                },
                'controls_repeat_ext': {
                    name: pxt.Util.lf("a loop that repeats and increments an index"),
                    tooltip: pxt.Util.lf("Do some statements several times."),
                    url: '/blocks/loops/repeat',
                    category: 'loops'
                },
                'variables_get': {
                    name: pxt.Util.lf("get the value of a variable"),
                    tooltip: pxt.Util.lf("Returns the value of this variable."),
                    url: '/blocks/variables',
                    category: 'variables'
                },
                'variables_set': {
                    name: pxt.Util.lf("assign the value of a variable"),
                    tooltip: pxt.Util.lf("Sets this variable to be equal to the input."),
                    url: '/blocks/variables/assign',
                    category: 'variables'
                },
                'controls_if': {
                    name: pxt.Util.lf("a conditional statement"),
                    tooltip: pxt.Util.lf("If a value is true, then do some statements."),
                    url: '/blocks/logic/if',
                    category: 'logic'
                },
                'logic_compare': {
                    name: pxt.Util.lf("comparing two numbers"),
                    url: '/blocks/logic/boolean',
                    category: 'logic'
                },
                'logic_operation': {
                    name: pxt.Util.lf("boolean operation"),
                    url: '/blocks/logic/boolean',
                    category: 'logic'
                },
                'logic_negate': {
                    name: pxt.Util.lf("logical negation"),
                    tooltip: pxt.Util.lf("Returns true if the input is false. Returns false if the input is true."),
                    url: '/blocks/logic/boolean',
                    category: 'logic'
                },
                'logic_boolean': {
                    name: pxt.Util.lf("a `true` or `false` value"),
                    tooltip: pxt.Util.lf("Returns either true or false."),
                    url: '/blocks/logic/boolean',
                    category: 'logic'
                },
                'text': {
                    name: pxt.Util.lf("a piece of text"),
                    tooltip: pxt.Util.lf("A letter, word, or line of text."),
                    url: 'reference/types/string',
                    category: 'text'
                },
                'text_length': {
                    name: pxt.Util.lf("number of characters in the string"),
                    tooltip: pxt.Util.lf("Returns the number of letters (including spaces) in the provided text."),
                    url: 'reference/types/string-functions',
                    category: 'text'
                },
                'text_join': {
                    name: pxt.Util.lf("join items to create text"),
                    tooltip: pxt.Util.lf("Create a piece of text by joining together any number of items."),
                    url: 'reference/types/string-functions',
                    category: 'text'
                }
            };
        }
    })(blocks = pxt.blocks || (pxt.blocks = {}));
})(pxt || (pxt = {}));
/// <reference path="../typings/globals/winrt/index.d.ts"/>
var pxt;
(function (pxt) {
    var BrowserUtils;
    (function (BrowserUtils) {
        function isWinRT() {
            return typeof Windows !== "undefined";
        }
        BrowserUtils.isWinRT = isWinRT;
        function isIFrame() {
            try {
                return window && window.self !== window.top;
            }
            catch (e) {
                return true;
            }
        }
        BrowserUtils.isIFrame = isIFrame;
        function hasNavigator() {
            return typeof navigator !== "undefined";
        }
        BrowserUtils.hasNavigator = hasNavigator;
        function isWindows() {
            return hasNavigator() && /(Win32|Win64|WOW64)/i.test(navigator.platform);
        }
        BrowserUtils.isWindows = isWindows;
        function isMobile() {
            return hasNavigator() && /mobi/i.test(navigator.userAgent);
        }
        BrowserUtils.isMobile = isMobile;
        //MacIntel on modern Macs
        function isMac() {
            return hasNavigator() && /Mac/i.test(navigator.platform);
        }
        BrowserUtils.isMac = isMac;
        //This is generally appears for Linux
        //Android *sometimes* returns this
        function isLinux() {
            return !!navigator && /Linux/i.test(navigator.platform);
        }
        BrowserUtils.isLinux = isLinux;
        // Detects if we are running on ARM (Raspberry pi)
        function isARM() {
            return hasNavigator() && /arm/i.test(navigator.platform);
        }
        BrowserUtils.isARM = isARM;
        /*
        Notes on browser detection
    
        Actually:   Claims to be:
                    IE  Edge    Chrome  Safari  Firefox
        IE          X                   X?
        Edge            X       X       X
        Chrome                  X       X
        Safari                          X       X
        Firefox                                 X
    
        I allow Opera to go about claiming to be Chrome because it might as well be
        */
        //Edge lies about its user agent and claims to be Chrome, but Edge/Version
        //is always at the end
        function isEdge() {
            return hasNavigator() && /Edge/i.test(navigator.userAgent);
        }
        BrowserUtils.isEdge = isEdge;
        //IE11 also lies about its user agent, but has Trident appear somewhere in
        //the user agent. Detecting the different between IE11 and Edge isn't
        //super-important because the UI is similar enough
        function isIE() {
            return hasNavigator() && /Trident/i.test(navigator.userAgent);
        }
        BrowserUtils.isIE = isIE;
        //Edge and IE11 lie about being Chrome
        function isChrome() {
            return !isEdge() && !isIE() && !!navigator && (/Chrome/i.test(navigator.userAgent) || /Chromium/i.test(navigator.userAgent));
        }
        BrowserUtils.isChrome = isChrome;
        //Chrome and Edge lie about being Safari
        function isSafari() {
            //Could also check isMac but I don't want to risk excluding iOS
            //Checking for iPhone, iPod or iPad as well as Safari in order to detect home screen browsers on iOS
            return !isChrome() && !isEdge() && !!navigator && /(Safari|iPod|iPhone|iPad)/i.test(navigator.userAgent);
        }
        BrowserUtils.isSafari = isSafari;
        //Safari and WebKit lie about being Firefox
        function isFirefox() {
            return !isSafari() && !!navigator && (/Firefox/i.test(navigator.userAgent) || /Seamonkey/i.test(navigator.userAgent));
        }
        BrowserUtils.isFirefox = isFirefox;
        //These days Opera's core is based on Chromium so we shouldn't distinguish between them too much
        function isOpera() {
            return hasNavigator() && /Opera|OPR/i.test(navigator.userAgent);
        }
        BrowserUtils.isOpera = isOpera;
        //Midori *was* the default browser on Raspbian, however isn't any more
        function isMidori() {
            return hasNavigator() && /Midori/i.test(navigator.userAgent);
        }
        BrowserUtils.isMidori = isMidori;
        //Epiphany (code name for GNOME Web) is the default browser on Raspberry Pi
        //Epiphany also lies about being Chrome, Safari, and Chromium
        function isEpiphany() {
            return hasNavigator() && /Epiphany/i.test(navigator.userAgent);
        }
        BrowserUtils.isEpiphany = isEpiphany;
        function isTouchEnabled() {
            return typeof window !== "undefined" &&
                ('ontouchstart' in window // works on most browsers 
                    || navigator.maxTouchPoints > 0); // works on IE10/11 and Surface);
        }
        BrowserUtils.isTouchEnabled = isTouchEnabled;
        function os() {
            if (isWindows())
                return "windows";
            else if (isMac())
                return "mac";
            else if (isLinux() && isARM())
                return "rpi";
            else if (isLinux())
                return "linux";
            else
                return "unknown";
        }
        BrowserUtils.os = os;
        function browser() {
            if (isEdge())
                return "edge";
            if (isEpiphany())
                return "epiphany";
            else if (isMidori())
                return "midori";
            else if (isOpera())
                return "opera";
            else if (isIE())
                return "ie";
            else if (isChrome())
                return "chrome";
            else if (isSafari())
                return "safari";
            else if (isFirefox())
                return "firefox";
            else
                return "unknown";
        }
        BrowserUtils.browser = browser;
        function browserVersion() {
            if (!hasNavigator())
                return null;
            //Unsurprisingly browsers also lie about this and include other browser versions...
            var matches = [];
            if (isOpera()) {
                matches = /(Opera|OPR)\/([0-9\.]+)/i.exec(navigator.userAgent);
            }
            if (isEpiphany()) {
                matches = /Epiphany\/([0-9\.]+)/i.exec(navigator.userAgent);
            }
            else if (isMidori()) {
                matches = /Midori\/([0-9\.]+)/i.exec(navigator.userAgent);
            }
            else if (isSafari()) {
                matches = /Version\/([0-9\.]+)/i.exec(navigator.userAgent);
            }
            else if (isChrome()) {
                matches = /(Chrome|Chromium)\/([0-9\.]+)/i.exec(navigator.userAgent);
            }
            else if (isEdge()) {
                matches = /Edge\/([0-9\.]+)/i.exec(navigator.userAgent);
            }
            else if (isIE()) {
                matches = /(MSIE |rv:)([0-9\.]+)/i.exec(navigator.userAgent);
            }
            else {
                matches = /(Firefox|Seamonkey)\/([0-9\.]+)/i.exec(navigator.userAgent);
            }
            if (!matches || matches.length == 0) {
                return null;
            }
            return matches[matches.length - 1];
        }
        BrowserUtils.browserVersion = browserVersion;
        var hasLoggedBrowser = false;
        function isBrowserSupported() {
            if (!navigator) {
                return true; //All browsers define this, but we can't make any predictions if it isn't defined, so assume the best
            }
            var versionString = browserVersion();
            var v = parseInt(versionString);
            var isRecentChrome = isChrome() && v >= 38;
            var isRecentFirefox = isFirefox() && v >= 31;
            var isRecentEdge = isEdge();
            var isRecentSafari = isSafari() && v >= 9;
            var isRecentOpera = (isOpera() && isChrome()) && v >= 21;
            var isRecentIE = isIE() && v >= 11;
            var isModernBrowser = isRecentChrome || isRecentFirefox || isRecentEdge || isRecentSafari || isRecentOpera || isRecentIE;
            //In the future this should check for the availability of features, such
            //as web workers
            var isSupported = isModernBrowser;
            var isUnsupportedRPI = isMidori() || (isLinux() && isARM() && isEpiphany());
            var isNotSupported = isUnsupportedRPI;
            isSupported = isSupported && !isNotSupported;
            //Bypass
            isSupported = isSupported || /anybrowser=(true|1)/.test(window.location.href);
            if (!hasLoggedBrowser) {
                pxt.log("Browser: " + browser() + " " + versionString + " on " + os());
                if (!isSupported) {
                    pxt.tickEvent("browser.unsupported." + navigator.userAgent);
                }
                hasLoggedBrowser = true;
            }
            return isSupported;
        }
        BrowserUtils.isBrowserSupported = isBrowserSupported;
        function bestResourceForOsAndBrowser(resources, name) {
            if (!resources || resources.length == 0) {
                return null;
            }
            var MatchLevel;
            (function (MatchLevel) {
                MatchLevel[MatchLevel["None"] = 0] = "None";
                MatchLevel[MatchLevel["Any"] = 1] = "Any";
                MatchLevel[MatchLevel["Exact"] = 2] = "Exact";
            })(MatchLevel || (MatchLevel = {}));
            ;
            function matchLevelForStrings(haystack, needle) {
                if (!haystack || !needle) {
                    return MatchLevel.Any; //If either browser or OS isn't defined then we behave the same as *
                }
                if (haystack.indexOf(needle) !== -1) {
                    return MatchLevel.Exact;
                }
                else if (haystack.indexOf("*") !== -1) {
                    return MatchLevel.Any;
                }
                else {
                    return MatchLevel.None;
                }
            }
            var osMatch = function (res) { return matchLevelForStrings(res.os, os()); };
            var browserMatch = function (res) { return matchLevelForStrings(res.browser, browser()); };
            var matches = resources.filter(function (res) { return res.name == name &&
                osMatch(res) != MatchLevel.None &&
                browserMatch(res) != MatchLevel.None; });
            if (matches.length == 0) {
                return null;
            }
            var bestMatch = 0;
            for (var i = 1; i < matches.length; i++) {
                //First we want to match on OS, then on browser
                if (osMatch(matches[i]) > osMatch(matches[bestMatch])) {
                    bestMatch = i;
                }
                else if (browserMatch(matches[i]) > browserMatch(matches[bestMatch])) {
                    bestMatch = i;
                }
            }
            return matches[bestMatch];
        }
        BrowserUtils.bestResourceForOsAndBrowser = bestResourceForOsAndBrowser;
        function suggestedBrowserPath() {
            var match = bestResourceForOsAndBrowser(pxt.appTarget.appTheme.browserSupport, "unsupported");
            return match ? match.path : null;
        }
        BrowserUtils.suggestedBrowserPath = suggestedBrowserPath;
        function devicePixelRatio() {
            if (typeof window === "undefined" || !window.screen)
                return 1;
            if (window.screen.systemXDPI !== undefined
                && window.screen.logicalXDPI !== undefined
                && window.screen.systemXDPI > window.screen.logicalXDPI) {
                return window.screen.systemXDPI / window.screen.logicalXDPI;
            }
            else if (window && window.devicePixelRatio !== undefined) {
                return window.devicePixelRatio;
            }
            return 1;
        }
        BrowserUtils.devicePixelRatio = devicePixelRatio;
        function browserDownloadBinText(text, name, contentType, onError) {
            if (contentType === void 0) { contentType = "application/octet-stream"; }
            return browserDownloadBase64(btoa(text), name, contentType, onError);
        }
        BrowserUtils.browserDownloadBinText = browserDownloadBinText;
        function browserDownloadText(text, name, contentType, onError) {
            if (contentType === void 0) { contentType = "application/octet-stream"; }
            return browserDownloadBase64(btoa(pxt.Util.toUTF8(text)), name, contentType, onError);
        }
        BrowserUtils.browserDownloadText = browserDownloadText;
        function isBrowserDownloadInSameWindow() {
            var windowOpen = /downloadWindowOpen=1/i.test(window.location.href);
            return windowOpen;
        }
        BrowserUtils.isBrowserDownloadInSameWindow = isBrowserDownloadInSameWindow;
        function browserDownloadDataUri(uri, name) {
            var windowOpen = isBrowserDownloadInSameWindow();
            if (windowOpen) {
                window.open(uri, "_self");
            }
            else if (pxt.BrowserUtils.isSafari()) {
                // For mysterious reasons, the "link" trick closes the
                // PouchDB database
                var iframe = document.getElementById("downloader");
                if (!iframe) {
                    pxt.debug('injecting downloader iframe');
                    iframe = document.createElement("iframe");
                    iframe.id = "downloader";
                    iframe.style.position = "absolute";
                    iframe.style.right = "0";
                    iframe.style.bottom = "0";
                    iframe.style.zIndex = "-1";
                    iframe.style.width = "1px";
                    iframe.style.height = "1px";
                    document.body.appendChild(iframe);
                }
                iframe.src = uri;
            }
            else if (pxt.BrowserUtils.isEdge() || pxt.BrowserUtils.isIE()) {
                //Fix for edge
                var byteString = atob(uri.split(',')[1]);
                var ia = pxt.Util.stringToUint8Array(byteString);
                var blob = new Blob([ia], { type: "img/png" });
                window.navigator.msSaveOrOpenBlob(blob, name);
            }
            else {
                var link = window.document.createElement('a');
                if (typeof link.download == "string") {
                    link.href = uri;
                    link.download = name;
                    document.body.appendChild(link); // for FF
                    link.click();
                    document.body.removeChild(link);
                }
                else {
                    document.location.href = uri;
                }
            }
        }
        BrowserUtils.browserDownloadDataUri = browserDownloadDataUri;
        function browserDownloadUInt8Array(buf, name, contentType, onError) {
            if (contentType === void 0) { contentType = "application/octet-stream"; }
            return browserDownloadBase64(btoa(pxt.Util.uint8ArrayToString(buf)), name, contentType, onError);
        }
        BrowserUtils.browserDownloadUInt8Array = browserDownloadUInt8Array;
        function browserDownloadBase64(b64, name, contentType, onError) {
            if (contentType === void 0) { contentType = "application/octet-stream"; }
            pxt.debug('trigger download');
            var isMobileBrowser = /mobi/i.test(navigator.userAgent);
            var isDesktopIE = window.navigator.msSaveOrOpenBlob && !isMobileBrowser;
            var protocol = "data";
            var m = /downloadProtocol=([a-z0-9:/?]+)/i.exec(window.location.href);
            if (m)
                protocol = m[1];
            var dataurl = protocol + ":" + contentType + ";base64," + b64;
            try {
                if (isDesktopIE) {
                    var b = new Blob([pxt.Util.stringToUint8Array(atob(b64))], { type: contentType });
                    var result = window.navigator.msSaveOrOpenBlob(b, name);
                }
                else
                    browserDownloadDataUri(dataurl, name);
            }
            catch (e) {
                if (onError)
                    onError(e);
                pxt.debug("saving failed");
            }
            return dataurl;
        }
        BrowserUtils.browserDownloadBase64 = browserDownloadBase64;
    })(BrowserUtils = pxt.BrowserUtils || (pxt.BrowserUtils = {}));
})(pxt || (pxt = {}));
var pxt;
(function (pxt) {
    var commands;
    (function (commands) {
        // overriden by targets    
        commands.deployCoreAsync = undefined;
        commands.browserDownloadAsync = undefined;
    })(commands = pxt.commands || (pxt.commands = {}));
})(pxt || (pxt = {}));
/// <reference path="../localtypings/pxtarget.d.ts"/>
/// <reference path="emitter/util.ts"/>
var pxt;
(function (pxt) {
    function getLzma() {
        if (pxt.U.isNodeJS)
            return require("lzma");
        else
            return window.LZMA;
    }
    function lzmaDecompressAsync(buf) {
        var lzma = getLzma();
        return new Promise(function (resolve, reject) {
            try {
                lzma.decompress(buf, function (res, error) {
                    resolve(error ? undefined : res);
                });
            }
            catch (e) {
                resolve(undefined);
            }
        });
    }
    pxt.lzmaDecompressAsync = lzmaDecompressAsync;
    function lzmaCompressAsync(text) {
        var lzma = getLzma();
        return new Promise(function (resolve, reject) {
            try {
                lzma.compress(text, 7, function (res, error) {
                    resolve(error ? undefined : new Uint8Array(res));
                });
            }
            catch (e) {
                resolve(undefined);
            }
        });
    }
    pxt.lzmaCompressAsync = lzmaCompressAsync;
})(pxt || (pxt = {}));
// preprocess C++ file to find functions exposed to pxt
var pxt;
(function (pxt) {
    var cpp;
    (function (cpp) {
        var U = pxtc.Util;
        var lf = U.lf;
        function parseExpr(e) {
            e = e.trim();
            e = e.replace(/^\(/, "");
            e = e.replace(/\)$/, "");
            e = e.trim();
            if (/^-/.test(e) && parseExpr(e.slice(1)) != null)
                return -parseExpr(e.slice(1));
            if (/^0x[0-9a-f]+$/i.exec(e))
                return parseInt(e.slice(2), 16);
            if (/^0b[01]+$/i.exec(e))
                return parseInt(e.slice(2), 2);
            if (/^0\d+$/i.exec(e))
                return parseInt(e, 8);
            if (/^\d+$/i.exec(e))
                return parseInt(e, 10);
            return null;
        }
        function nsWriter(nskw) {
            if (nskw === void 0) { nskw = "namespace"; }
            var text = "";
            var currNs = "";
            var setNs = function (ns, over) {
                if (over === void 0) { over = ""; }
                if (currNs == ns)
                    return;
                if (currNs)
                    text += "}\n";
                if (ns)
                    text += over || (nskw + " " + ns + " {\n");
                currNs = ns;
            };
            var indent = "    ";
            return {
                setNs: setNs,
                clear: function () {
                    text = "";
                    currNs = "";
                },
                write: function (s) {
                    if (!s.trim())
                        text += "\n";
                    else {
                        s = s.trim()
                            .replace(/^\s*/mg, indent)
                            .replace(/^(\s*)\*/mg, function (f, s) { return s + " *"; });
                        text += s + "\n";
                    }
                },
                incrIndent: function () {
                    indent += "    ";
                },
                decrIndent: function () {
                    indent = indent.slice(4);
                },
                finish: function () {
                    setNs("");
                    return text;
                }
            };
        }
        cpp.nsWriter = nsWriter;
        function parseCppInt(v) {
            if (!v)
                return null;
            v = v.trim();
            if (/^-?(\d+|0[xX][0-9a-fA-F]+)$/.test(v))
                return parseInt(v);
            return null;
        }
        cpp.parseCppInt = parseCppInt;
        var prevExtInfo;
        var prevSnapshot;
        var PkgConflictError = (function (_super) {
            __extends(PkgConflictError, _super);
            function PkgConflictError(msg) {
                _super.call(this, msg);
                this.isUserError = true;
                this.message = msg;
            }
            return PkgConflictError;
        }(Error));
        cpp.PkgConflictError = PkgConflictError;
        function getExtensionInfo(mainPkg) {
            var pkgSnapshot = {};
            var constsName = "dal.d.ts";
            var sourcePath = "/source/";
            for (var _i = 0, _a = mainPkg.sortedDeps(); _i < _a.length; _i++) {
                var pkg = _a[_i];
                pkg.addSnapshot(pkgSnapshot, [constsName, ".h", ".cpp"]);
            }
            if (prevSnapshot && U.stringMapEq(pkgSnapshot, prevSnapshot)) {
                pxt.debug("Using cached extinfo");
                return prevExtInfo;
            }
            pxt.debug("Generating new extinfo");
            var res = pxtc.emptyExtInfo();
            var isPlatformio = pxt.appTarget.compileService && !!pxt.appTarget.compileService.platformioIni;
            if (isPlatformio)
                sourcePath = "/src/";
            var pointersInc = "\nPXT_SHIMS_BEGIN\n";
            var includesInc = "#include \"pxt.h\"\n";
            var thisErrors = "";
            var dTsNamespace = "";
            var err = function (s) { return thisErrors += "   " + fileName + "(" + lineNo + "): " + s + "\n"; };
            var lineNo = 0;
            var fileName = "";
            var protos = nsWriter("namespace");
            var shimsDTS = nsWriter("declare namespace");
            var enumsDTS = nsWriter("declare namespace");
            var allErrors = "";
            var compileService = pxt.appTarget.compileService;
            if (!compileService)
                compileService = {
                    gittag: "none",
                    serviceId: "nocompile"
                };
            var enumVals = {
                "true": "1",
                "false": "0",
                "null": "0",
                "NULL": "0",
            };
            // we sometimes append _ to C++ names to avoid name clashes
            function toJs(name) {
                return name.trim().replace(/[\_\*]$/, "");
            }
            for (var _b = 0, _c = mainPkg.sortedDeps(); _b < _c.length; _b++) {
                var pkg = _c[_b];
                if (pkg.getFiles().indexOf(constsName) >= 0) {
                    var src = pkg.host().readFile(pkg, constsName);
                    pxt.Util.assert(!!src, constsName + " not found in " + pkg.id);
                    src.split(/\r?\n/).forEach(function (ln) {
                        var m = /^\s*(\w+) = (.*),/.exec(ln);
                        if (m) {
                            enumVals[m[1]] = m[2];
                        }
                    });
                }
            }
            function parseCpp(src, isHeader) {
                var currNs = "";
                var currDocComment = "";
                var currAttrs = "";
                var inDocComment = false;
                var indexedInstanceAttrs;
                var indexedInstanceIdx = -1;
                // replace #if 0 .... #endif with newlines
                src = src.replace(/^\s*#\s*if\s+0\s*$[^]*?^\s*#\s*endif\s*$/mg, function (f) { return f.replace(/[^\n]/g, ""); });
                function interfaceName() {
                    var n = currNs.replace(/Methods$/, "");
                    if (n == currNs)
                        return null;
                    return n;
                }
                lineNo = 0;
                // the C++ types we can map to TypeScript
                function mapType(tp) {
                    switch (tp.replace(/\s+/g, "")) {
                        case "void": return "void";
                        // TODO: need int16_t
                        case "int32_t":
                        case "uint32_t":
                        case "unsigned":
                        case "int": return "number";
                        case "uint16_t": return "uint16";
                        case "int16_t":
                        case "short": return "int16";
                        case "uint8_t":
                        case "byte": return "uint8";
                        case "int8_t":
                        case "sbyte": return "int8";
                        case "bool": return "boolean";
                        case "StringData*": return "string";
                        case "ImageLiteral": return "string";
                        case "Action": return "() => void";
                        default:
                            return toJs(tp);
                    }
                }
                var outp = "";
                var inEnum = false;
                var enumVal = 0;
                enumsDTS.setNs("");
                shimsDTS.setNs("");
                src.split(/\r?\n/).forEach(function (ln) {
                    ++lineNo;
                    var lnNC = ln.replace(/\/\/.*/, "").replace(/\/\*/, "");
                    if (inEnum && lnNC.indexOf("}") >= 0) {
                        inEnum = false;
                        enumsDTS.write("}");
                    }
                    if (inEnum) {
                        var mm = /^\s*(\w+)\s*(=\s*(.*?))?,?\s*$/.exec(lnNC);
                        if (mm) {
                            var nm = mm[1];
                            var v = mm[3];
                            var opt = "";
                            if (v) {
                                v = v.trim();
                                var curr = U.lookup(enumVals, v);
                                if (curr != null) {
                                    opt = "  // " + v;
                                    v = curr;
                                }
                                enumVal = parseCppInt(v);
                                if (enumVal == null)
                                    err("cannot determine value of " + lnNC);
                            }
                            else {
                                enumVal++;
                                v = enumVal + "";
                            }
                            enumsDTS.write("    " + toJs(nm) + " = " + v + "," + opt);
                        }
                        else {
                            enumsDTS.write(ln);
                        }
                    }
                    var enM = /^\s*enum\s+(|class\s+|struct\s+)(\w+)\s*({|$)/.exec(lnNC);
                    if (enM) {
                        inEnum = true;
                        enumVal = -1;
                        enumsDTS.write("");
                        enumsDTS.write("");
                        if (currAttrs || currDocComment) {
                            enumsDTS.write(currDocComment);
                            enumsDTS.write(currAttrs);
                            currAttrs = "";
                            currDocComment = "";
                        }
                        enumsDTS.write("declare enum " + toJs(enM[2]) + " " + enM[3]);
                        if (!isHeader) {
                            protos.setNs(currNs);
                            protos.write("enum " + enM[2] + " : int;");
                        }
                    }
                    if (inEnum) {
                        outp += ln + "\n";
                        return;
                    }
                    if (/^\s*\/\*\*/.test(ln)) {
                        inDocComment = true;
                        currDocComment = ln + "\n";
                        if (/\*\//.test(ln))
                            inDocComment = false;
                        outp += "//\n";
                        return;
                    }
                    if (inDocComment) {
                        currDocComment += ln + "\n";
                        if (/\*\//.test(ln)) {
                            inDocComment = false;
                        }
                        outp += "//\n";
                        return;
                    }
                    if (/^\s*\/\/%/.test(ln)) {
                        currAttrs += ln + "\n";
                        outp += "//\n";
                        return;
                    }
                    outp += ln + "\n";
                    if (/^typedef.*;\s*$/.test(ln)) {
                        protos.setNs(currNs);
                        protos.write(ln);
                    }
                    var m = /^\s*namespace\s+(\w+)/.exec(ln);
                    if (m) {
                        //if (currNs) err("more than one namespace declaration not supported")
                        currNs = m[1];
                        if (interfaceName()) {
                            shimsDTS.setNs("");
                            shimsDTS.write("");
                            shimsDTS.write("");
                            if (currAttrs || currDocComment) {
                                shimsDTS.write(currDocComment);
                                shimsDTS.write(currAttrs);
                                currAttrs = "";
                                currDocComment = "";
                            }
                            var tpName = interfaceName();
                            shimsDTS.setNs(currNs, "declare interface " + tpName + " {");
                        }
                        else if (currAttrs || currDocComment) {
                            shimsDTS.setNs("");
                            shimsDTS.write("");
                            shimsDTS.write("");
                            shimsDTS.write(currDocComment);
                            shimsDTS.write(currAttrs);
                            shimsDTS.setNs(toJs(currNs));
                            enumsDTS.setNs(toJs(currNs));
                            currAttrs = "";
                            currDocComment = "";
                        }
                        return;
                    }
                    m = /^\s*(\w+)([\*\&]*\s+[\*\&]*)(\w+)\s*\(([^\(\)]*)\)\s*(;\s*$|\{|$)/.exec(ln);
                    if (currAttrs && m) {
                        indexedInstanceAttrs = null;
                        var parsedAttrs_1 = pxtc.parseCommentString(currAttrs);
                        if (!currNs)
                            err("missing namespace declaration");
                        var retTp = (m[1] + m[2]).replace(/\s+/g, "");
                        var funName = m[3];
                        var origArgs = m[4];
                        currAttrs = currAttrs.trim().replace(/ \w+\.defl=\w+/g, "");
                        var args = origArgs.split(/,/).filter(function (s) { return !!s; }).map(function (s) {
                            s = s.trim();
                            var m = /(.*)=\s*(-?\w+)$/.exec(s);
                            var defl = "";
                            var qm = "";
                            if (m) {
                                defl = m[2];
                                qm = "?";
                                s = m[1].trim();
                            }
                            m = /^(.*?)(\w+)$/.exec(s);
                            if (!m) {
                                err("invalid argument: " + s);
                                return "";
                            }
                            var argName = m[2];
                            if (parsedAttrs_1.paramDefl[argName]) {
                                defl = parsedAttrs_1.paramDefl[argName];
                                qm = "?";
                            }
                            var numVal = defl ? U.lookup(enumVals, defl) : null;
                            if (numVal != null)
                                defl = numVal;
                            if (defl) {
                                if (parseCppInt(defl) == null)
                                    err("Invalid default value (non-integer): " + defl);
                                currAttrs += " " + argName + ".defl=" + defl;
                            }
                            return "" + argName + qm + ": " + mapType(m[1]);
                        });
                        var numArgs = args.length;
                        var fi = {
                            name: currNs + "::" + funName,
                            type: retTp == "void" ? "P" : "F",
                            args: numArgs,
                            value: null
                        };
                        if (currDocComment) {
                            shimsDTS.setNs(toJs(currNs));
                            shimsDTS.write("");
                            shimsDTS.write(currDocComment);
                            if (/ImageLiteral/.test(m[4]) && !/imageLiteral=/.test(currAttrs))
                                currAttrs += " imageLiteral=1";
                            currAttrs += " shim=" + fi.name;
                            shimsDTS.write(currAttrs);
                            funName = toJs(funName);
                            if (interfaceName()) {
                                var tp0 = (args[0] || "").replace(/^.*:\s*/, "").trim();
                                if (tp0.toLowerCase() != interfaceName().toLowerCase()) {
                                    err(lf("Invalid first argument; should be of type '{0}', but is '{1}'", interfaceName(), tp0));
                                }
                                args.shift();
                                if (args.length == 0 && /\bproperty\b/.test(currAttrs))
                                    shimsDTS.write(funName + ": " + mapType(retTp) + ";");
                                else
                                    shimsDTS.write(funName + "(" + args.join(", ") + "): " + mapType(retTp) + ";");
                            }
                            else {
                                shimsDTS.write("function " + funName + "(" + args.join(", ") + "): " + mapType(retTp) + ";");
                            }
                        }
                        currDocComment = "";
                        currAttrs = "";
                        if (!isHeader) {
                            protos.setNs(currNs);
                            protos.write(retTp + " " + funName + "(" + origArgs + ");");
                        }
                        res.functions.push(fi);
                        if (isPlatformio)
                            pointersInc += "PXT_FNPTR(::" + fi.name + "),\n";
                        else
                            pointersInc += "(uint32_t)(void*)::" + fi.name + ",\n";
                        return;
                    }
                    m = /^\s*(\w+)\s+(\w+)\s*;/.exec(ln);
                    if (currAttrs && m) {
                        var parsedAttrs = pxtc.parseCommentString(currAttrs);
                        if (parsedAttrs.indexedInstanceNS) {
                            indexedInstanceAttrs = parsedAttrs;
                            shimsDTS.setNs(parsedAttrs.indexedInstanceNS);
                            indexedInstanceIdx = 0;
                        }
                        var tp = m[1];
                        var nm = m[2];
                        if (indexedInstanceAttrs) {
                            currAttrs = currAttrs.trim();
                            currAttrs += " fixedInstance shim=" + indexedInstanceAttrs.indexedInstanceShim + "(" + indexedInstanceIdx++ + ")";
                            shimsDTS.write("");
                            shimsDTS.write(currDocComment);
                            shimsDTS.write(currAttrs);
                            shimsDTS.write("const " + nm + ": " + mapType(tp) + ";");
                            currDocComment = "";
                            currAttrs = "";
                            return;
                        }
                    }
                    if (currAttrs && ln.trim()) {
                        err("declaration not understood: " + ln);
                        currAttrs = "";
                        currDocComment = "";
                        return;
                    }
                });
                return outp;
            }
            var currSettings = U.clone(compileService.yottaConfig || {});
            var optSettings = {};
            var settingSrc = {};
            function parseJson(pkg) {
                var j0 = pkg.config.platformio;
                if (j0 && j0.dependencies) {
                    U.jsonCopyFrom(res.platformio.dependencies, j0.dependencies);
                }
                var json = pkg.config.yotta;
                if (!json)
                    return;
                // TODO check for conflicts
                if (json.dependencies) {
                    U.jsonCopyFrom(res.yotta.dependencies, json.dependencies);
                }
                if (json.config) {
                    var cfg = U.jsonFlatten(json.config);
                    for (var _i = 0, _a = Object.keys(cfg); _i < _a.length; _i++) {
                        var settingName = _a[_i];
                        var prev = U.lookup(settingSrc, settingName);
                        var settingValue = cfg[settingName];
                        if (!prev || prev.config.yotta.configIsJustDefaults) {
                            settingSrc[settingName] = pkg;
                            currSettings[settingName] = settingValue;
                        }
                        else if (currSettings[settingName] === settingValue) {
                        }
                        else if (!pkg.parent.config.yotta || !pkg.parent.config.yotta.ignoreConflicts) {
                            var err_1 = new PkgConflictError(lf("conflict on yotta setting {0} between packages {1} and {2}", settingName, pkg.id, prev.id));
                            err_1.pkg0 = prev;
                            err_1.pkg1 = pkg;
                            err_1.settingName = settingName;
                            throw err_1;
                        }
                    }
                }
                if (json.optionalConfig) {
                    var cfg = U.jsonFlatten(json.optionalConfig);
                    for (var _b = 0, _c = Object.keys(cfg); _b < _c.length; _b++) {
                        var settingName = _c[_b];
                        var settingValue = cfg[settingName];
                        // last one wins
                        optSettings[settingName] = settingValue;
                    }
                }
            }
            // This is overridden on the build server, but we need it for command line build
            if (!isPlatformio && pxt.appTarget.compile && pxt.appTarget.compile.hasHex) {
                var cs = pxt.appTarget.compileService;
                U.assert(!!cs.yottaCorePackage);
                U.assert(!!cs.githubCorePackage);
                U.assert(!!cs.gittag);
                var tagged = cs.githubCorePackage + "#" + compileService.gittag;
                res.yotta.dependencies[cs.yottaCorePackage] = tagged;
            }
            if (mainPkg) {
                var seenMain = false;
                // TODO computeReachableNodes(pkg, true)
                for (var _d = 0, _e = mainPkg.sortedDeps(); _d < _e.length; _d++) {
                    var pkg = _e[_d];
                    thisErrors = "";
                    parseJson(pkg);
                    if (pkg == mainPkg) {
                        seenMain = true;
                        // we only want the main package in generated .d.ts
                        shimsDTS.clear();
                        enumsDTS.clear();
                    }
                    else {
                        U.assert(!seenMain);
                    }
                    for (var _f = 0, _g = pkg.getFiles(); _f < _g.length; _f++) {
                        var fn = _g[_f];
                        var isHeader = U.endsWith(fn, ".h");
                        if (isHeader || U.endsWith(fn, ".cpp")) {
                            var fullName = pkg.config.name + "/" + fn;
                            if (pkg.config.name == "core" && isHeader)
                                fullName = fn;
                            if (isHeader)
                                includesInc += "#include \"" + (isPlatformio ? "" : sourcePath.slice(1)) + fullName + "\"\n";
                            var src = pkg.readFile(fn);
                            fileName = fullName;
                            // parseCpp() will remove doc comments, to prevent excessive recompilation
                            src = parseCpp(src, isHeader);
                            res.extensionFiles[sourcePath + fullName] = src;
                            if (pkg.level == 0)
                                res.onlyPublic = false;
                            if (pkg.verProtocol() && pkg.verProtocol() != "pub" && pkg.verProtocol() != "embed")
                                res.onlyPublic = false;
                        }
                    }
                    if (thisErrors) {
                        allErrors += lf("Package {0}:\n", pkg.id) + thisErrors;
                    }
                }
            }
            if (allErrors)
                U.userError(allErrors);
            // merge optional settings
            U.jsonCopyFrom(optSettings, currSettings);
            var configJson = U.jsonUnFlatten(optSettings);
            if (isPlatformio) {
                var iniLines_1 = pxt.appTarget.compileService.platformioIni.slice();
                // TODO merge configjson
                iniLines_1.push("lib_deps =");
                U.iterMap(res.platformio.dependencies, function (pkg, ver) {
                    var pkgSpec = /[@#\/]/.test(ver) ? ver : pkg + "@" + ver;
                    iniLines_1.push("  " + pkgSpec);
                });
                res.generatedFiles["/platformio.ini"] = iniLines_1.join("\n") + "\n";
            }
            else {
                res.yotta.config = configJson;
                var name_1 = "pxt-app";
                if (pxt.appTarget.compileService && pxt.appTarget.compileService.yottaBinary)
                    name_1 = pxt.appTarget.compileService.yottaBinary
                        .replace(/-combined/, "").replace(/\.hex$/, "");
                var moduleJson = {
                    "name": name_1,
                    "version": "0.0.0",
                    "description": "Auto-generated. Do not edit.",
                    "license": "n/a",
                    "dependencies": res.yotta.dependencies,
                    "targetDependencies": {},
                    "bin": "./source"
                };
                res.generatedFiles["/module.json"] = JSON.stringify(moduleJson, null, 4) + "\n";
            }
            res.generatedFiles[sourcePath + "pointers.cpp"] = includesInc + protos.finish() + pointersInc + "\nPXT_SHIMS_END\n";
            res.generatedFiles["/config.json"] = JSON.stringify(configJson, null, 4) + "\n";
            res.generatedFiles[sourcePath + "main.cpp"] = "\n#include \"pxt.h\"\n#ifdef PXT_MAIN\nPXT_MAIN\n#else\nint main() { \n    uBit.init(); \n    pxt::start(); \n    while (1) uBit.sleep(10000);    \n    return 0; \n}\n#endif\n";
            var tmp = res.extensionFiles;
            U.jsonCopyFrom(tmp, res.generatedFiles);
            var creq = {
                config: compileService.serviceId,
                tag: compileService.gittag,
                replaceFiles: tmp,
                dependencies: (!isPlatformio ? res.yotta.dependencies : null)
            };
            var data = JSON.stringify(creq);
            res.sha = U.sha256(data);
            res.compileData = btoa(U.toUTF8(data));
            res.shimsDTS = shimsDTS.finish();
            res.enumsDTS = enumsDTS.finish();
            prevSnapshot = pkgSnapshot;
            prevExtInfo = res;
            return res;
        }
        cpp.getExtensionInfo = getExtensionInfo;
        function fileReadAsArrayBufferAsync(f) {
            if (!f)
                return Promise.resolve(null);
            else {
                return new Promise(function (resolve, reject) {
                    var reader = new FileReader();
                    reader.onerror = function (ev) { return resolve(null); };
                    reader.onload = function (ev) { return resolve(reader.result); };
                    reader.readAsArrayBuffer(f);
                });
            }
        }
        function fromUTF8Bytes(binstr) {
            if (!binstr)
                return "";
            // escape function is deprecated
            var escaped = "";
            for (var i = 0; i < binstr.length; ++i) {
                var k = binstr[i] & 0xff;
                if (k == 37 || k > 0x7f) {
                    escaped += "%" + k.toString(16);
                }
                else {
                    escaped += String.fromCharCode(k);
                }
            }
            // decodeURIComponent does the actual UTF8 decoding
            return decodeURIComponent(escaped);
        }
        function swapBytes(str) {
            var r = "";
            var i = 0;
            for (; i < str.length; i += 2)
                r = str[i] + str[i + 1] + r;
            pxt.Util.assert(i == str.length);
            return r;
        }
        function extractSourceFromBin(bin) {
            var magic = [0x41, 0x14, 0x0E, 0x2F, 0xB8, 0x2F, 0xA2, 0xBB];
            outer: for (var p = 0; p < bin.length; p += 16) {
                if (bin[p] != magic[0])
                    continue;
                for (var i = 0; i < magic.length; ++i)
                    if (bin[p + i] != magic[i])
                        continue outer;
                var metaLen = bin[p + 8] | (bin[p + 9] << 8);
                var textLen = bin[p + 10] | (bin[p + 11] << 8) | (bin[p + 12] << 16) | (bin[p + 13] << 24);
                // TODO test in iOS Safari
                p += 16;
                var end = p + metaLen + textLen;
                if (end > bin.length)
                    continue;
                var bufmeta = bin.slice(p, p + metaLen);
                var buftext = bin.slice(p + metaLen, end);
                return {
                    meta: fromUTF8Bytes(bufmeta),
                    text: buftext
                };
            }
            return null;
        }
        function extractSource(hexfile) {
            if (!hexfile)
                return undefined;
            var metaLen = 0;
            var textLen = 0;
            var toGo = 0;
            var buf;
            var ptr = 0;
            hexfile.split(/\r?\n/).forEach(function (ln) {
                var m = /^:10....0041140E2FB82FA2BB(....)(....)(....)(....)(..)/.exec(ln);
                if (m) {
                    metaLen = parseInt(swapBytes(m[1]), 16);
                    textLen = parseInt(swapBytes(m[2]), 16);
                    toGo = metaLen + textLen;
                    buf = new Uint8Array(toGo);
                }
                else if (toGo > 0) {
                    m = /^:10....00(.*)(..)$/.exec(ln);
                    if (!m)
                        return;
                    var k = m[1];
                    while (toGo > 0 && k.length > 0) {
                        buf[ptr++] = parseInt(k[0] + k[1], 16);
                        k = k.slice(2);
                        toGo--;
                    }
                }
            });
            if (!buf || !(toGo == 0 && ptr == buf.length)) {
                return undefined;
            }
            var bufmeta = new Uint8Array(metaLen);
            var buftext = new Uint8Array(textLen);
            for (var i = 0; i < metaLen; ++i)
                bufmeta[i] = buf[i];
            for (var i = 0; i < textLen; ++i)
                buftext[i] = buf[metaLen + i];
            // iOS Safari doesn't seem to have slice() on Uint8Array
            return {
                meta: fromUTF8Bytes(bufmeta),
                text: buftext
            };
        }
        function unpackSourceFromHexFileAsync(file) {
            if (!file)
                return undefined;
            return fileReadAsArrayBufferAsync(file).then(function (data) {
                var a = new Uint8Array(data);
                return unpackSourceFromHexAsync(a);
            });
        }
        cpp.unpackSourceFromHexFileAsync = unpackSourceFromHexFileAsync;
        function unpackSourceFromHexAsync(dat) {
            var rawEmbed;
            var bin = pxt.appTarget.compile.useUF2 ? ts.pxtc.UF2.toBin(dat) : undefined;
            if (bin) {
                rawEmbed = extractSourceFromBin(bin.buf);
            }
            else {
                var str = fromUTF8Bytes(dat);
                rawEmbed = extractSource(str || "");
            }
            if (!rawEmbed)
                return undefined;
            if (!rawEmbed.meta || !rawEmbed.text) {
                pxt.debug("This .hex file doesn't contain source.");
                return undefined;
            }
            var hd = JSON.parse(rawEmbed.meta);
            if (!hd) {
                pxt.debug("This .hex file is not valid.");
                return undefined;
            }
            else if (hd.compression == "LZMA") {
                return pxt.lzmaDecompressAsync(rawEmbed.text)
                    .then(function (res) {
                    if (!res)
                        return null;
                    var meta = res.slice(0, hd.headerSize || hd.metaSize || 0);
                    var text = res.slice(meta.length);
                    if (meta)
                        pxt.Util.jsonCopyFrom(hd, JSON.parse(meta));
                    return { meta: hd, source: text };
                });
            }
            else if (hd.compression) {
                pxt.debug("Compression type " + hd.compression + " not supported.");
                return undefined;
            }
            else {
                return Promise.resolve({ source: fromUTF8Bytes(rawEmbed.text) });
            }
        }
        cpp.unpackSourceFromHexAsync = unpackSourceFromHexAsync;
    })(cpp = pxt.cpp || (pxt.cpp = {}));
})(pxt || (pxt = {}));
var pxt;
(function (pxt) {
    var hex;
    (function (hex_1) {
        var downloadCache = {};
        var cdnUrlPromise;
        function downloadHexInfoAsync(extInfo) {
            var cachePromise = Promise.resolve();
            if (!downloadCache.hasOwnProperty(extInfo.sha)) {
                cachePromise = downloadHexInfoCoreAsync(extInfo)
                    .then(function (hexFile) {
                    downloadCache[extInfo.sha] = hexFile;
                });
            }
            return cachePromise
                .then(function () {
                return downloadCache[extInfo.sha];
            });
        }
        function getCdnUrlAsync() {
            if (cdnUrlPromise)
                return cdnUrlPromise;
            else {
                var curr = pxt.getOnlineCdnUrl();
                if (curr)
                    return (cdnUrlPromise = Promise.resolve(curr));
                return (cdnUrlPromise = pxt.Cloud.privateGetAsync("clientconfig").then(function (r) { return r.primaryCdnUrl; }));
            }
        }
        function downloadHexInfoCoreAsync(extInfo) {
            var hexurl = "";
            return downloadHexInfoLocalAsync(extInfo)
                .then(function (hex) {
                if (hex) {
                    // Found the hex image in the local server cache, use that
                    return hex;
                }
                return getCdnUrlAsync()
                    .then(function (url) {
                    hexurl = url + "/compile/" + extInfo.sha;
                    return pxt.U.httpGetTextAsync(hexurl + ".hex");
                })
                    .then(function (r) { return r; }, function (e) {
                    return pxt.Cloud.privatePostAsync("compile/extension", { data: extInfo.compileData })
                        .then(function (ret) { return new Promise(function (resolve, reject) {
                        var tryGet = function () {
                            var url = ret.hex.replace(/\.hex/, ".json");
                            pxt.log("polling at " + url);
                            return pxt.Util.httpGetJsonAsync(url)
                                .then(function (json) {
                                if (!json.success)
                                    pxt.U.userError(JSON.stringify(json, null, 1));
                                else {
                                    pxt.log("fetching " + hexurl + ".hex");
                                    resolve(pxt.U.httpGetTextAsync(hexurl + ".hex"));
                                }
                            }, function (e) {
                                setTimeout(tryGet, 1000);
                                return null;
                            });
                        };
                        tryGet();
                    }); });
                })
                    .then(function (text) {
                    return {
                        enums: [],
                        functions: [],
                        hex: text.split(/\r?\n/)
                    };
                });
            });
        }
        function downloadHexInfoLocalAsync(extInfo) {
            if (!pxt.Cloud.localToken || !window || !pxt.Cloud.isLocalHost()) {
                return Promise.resolve();
            }
            return apiAsync("compile/" + extInfo.sha)
                .then(function (json) {
                if (!json || json.notInOfflineCache || !json.hex) {
                    return Promise.resolve();
                }
                json.hex = json.hex.split(/\r?\n/);
                return json;
            })
                .catch(function (e) {
                return Promise.resolve();
            });
        }
        function apiAsync(path, data) {
            return pxt.U.requestAsync({
                url: "/api/" + path,
                headers: { "Authorization": pxt.Cloud.localToken },
                method: data ? "POST" : "GET",
                data: data || undefined,
                allowHttpErrors: true
            }).then(function (r) { return r.json; });
        }
        function storeWithLimitAsync(host, idxkey, newkey, newval, maxLen) {
            if (maxLen === void 0) { maxLen = 10; }
            return host.cacheStoreAsync(newkey, newval)
                .then(function () { return host.cacheGetAsync(idxkey); })
                .then(function (res) {
                var keys;
                try {
                    keys = JSON.parse(res || "[]");
                }
                catch (e) {
                    // cache entry is corrupted, clear cache so that it gets rebuilt
                    console.error('invalid cache entry, clearing entry');
                    keys = [];
                }
                keys = keys.filter(function (k) { return k != newkey; });
                keys.unshift(newkey);
                var todel = keys.slice(maxLen);
                keys = keys.slice(0, maxLen);
                return Promise.map(todel, function (e) { return host.cacheStoreAsync(e, null); })
                    .then(function () { return host.cacheStoreAsync(idxkey, JSON.stringify(keys)); });
            });
        }
        hex_1.storeWithLimitAsync = storeWithLimitAsync;
        function recordGetAsync(host, idxkey, newkey) {
            return host.cacheGetAsync(idxkey)
                .then(function (res) {
                var keys;
                try {
                    keys = JSON.parse(res || "[]");
                }
                catch (e) {
                    // cache entry is corrupted, clear cache so that it gets rebuilt
                    console.error('invalid cache entry, clearing entry');
                    return host.cacheStoreAsync(idxkey, "[]");
                }
                if (keys[0] != newkey) {
                    keys = keys.filter(function (k) { return k != newkey; });
                    keys.unshift(newkey);
                    return host.cacheStoreAsync(idxkey, JSON.stringify(keys));
                }
                else {
                    return null;
                }
            });
        }
        hex_1.recordGetAsync = recordGetAsync;
        function getHexInfoAsync(host, extInfo, cloudModule) {
            if (!extInfo.sha)
                return Promise.resolve(null);
            if (pxtc.hex.isSetupFor(extInfo))
                return Promise.resolve(pxtc.hex.currentHexInfo);
            pxt.debug("get hex info: " + extInfo.sha);
            var key = "hex-" + extInfo.sha;
            return host.cacheGetAsync(key)
                .then(function (res) {
                var cachedMeta;
                try {
                    cachedMeta = res ? JSON.parse(res) : null;
                }
                catch (e) {
                    // cache entry is corrupted, clear cache so that it gets rebuilt
                    console.log('invalid cache entry, clearing entry');
                    cachedMeta = null;
                }
                if (cachedMeta && cachedMeta.hex) {
                    pxt.debug("cache hit, size=" + res.length);
                    cachedMeta.hex = decompressHex(cachedMeta.hex);
                    return recordGetAsync(host, "hex-keys", key)
                        .then(function () { return cachedMeta; });
                }
                else {
                    return downloadHexInfoAsync(extInfo)
                        .then(function (meta) {
                        var origHex = meta.hex;
                        meta.hex = compressHex(meta.hex);
                        var store = JSON.stringify(meta);
                        meta.hex = origHex;
                        return storeWithLimitAsync(host, "hex-keys", key, store)
                            .then(function () { return meta; });
                    }).catch(function (e) {
                        pxt.reportException(e, { sha: extInfo.sha });
                        return Promise.resolve(null);
                    });
                }
            });
        }
        hex_1.getHexInfoAsync = getHexInfoAsync;
        function decompressHex(hex) {
            var outp = [];
            for (var i = 0; i < hex.length; i++) {
                var m = /^([@!])(....)$/.exec(hex[i]);
                if (!m) {
                    outp.push(hex[i]);
                    continue;
                }
                var addr = parseInt(m[2], 16);
                var nxt = hex[++i];
                var buf = "";
                if (m[1] == "@") {
                    buf = "";
                    var cnt = parseInt(nxt, 16);
                    while (cnt-- > 0) {
                        buf += "\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0";
                    }
                }
                else {
                    buf = pxtc.decodeBase64(nxt);
                }
                pxt.Util.assert(buf.length > 0);
                pxt.Util.assert(buf.length % 16 == 0);
                for (var j = 0; j < buf.length;) {
                    var bytes = [0x10, (addr >> 8) & 0xff, addr & 0xff, 0];
                    addr += 16;
                    for (var k = 0; k < 16; ++k) {
                        bytes.push(buf.charCodeAt(j++));
                    }
                    var chk = 0;
                    for (var k = 0; k < bytes.length; ++k)
                        chk += bytes[k];
                    bytes.push((-chk) & 0xff);
                    var r = ":";
                    for (var k = 0; k < bytes.length; ++k) {
                        var b = bytes[k] & 0xff;
                        if (b <= 0xf)
                            r += "0";
                        r += b.toString(16);
                    }
                    outp.push(r.toUpperCase());
                }
            }
            return outp;
        }
        function compressHex(hex) {
            var outp = [];
            var j = 0;
            for (var i = 0; i < hex.length; i += j) {
                var addr = -1;
                var outln = "";
                j = 0;
                var zeroMode = false;
                while (j < 500) {
                    var m = /^:10(....)00(.{32})(..)$/.exec(hex[i + j]);
                    if (!m)
                        break;
                    var h = m[2];
                    var isZero = /^0+$/.test(h);
                    var newaddr = parseInt(m[1], 16);
                    if (addr == -1) {
                        zeroMode = isZero;
                        outp.push((zeroMode ? "@" : "!") + m[1]);
                        addr = newaddr - 16;
                    }
                    else {
                        if (isZero != zeroMode)
                            break;
                        if (addr + 16 != newaddr)
                            break;
                    }
                    if (!zeroMode)
                        outln += h;
                    addr = newaddr;
                    j++;
                }
                if (j == 0) {
                    outp.push(hex[i]);
                    j = 1;
                }
                else {
                    if (zeroMode) {
                        outp.push(j.toString(16));
                    }
                    else {
                        var bin = "";
                        for (var k = 0; k < outln.length; k += 2)
                            bin += String.fromCharCode(parseInt(outln.slice(k, k + 2), 16));
                        outp.push(btoa(bin));
                    }
                }
            }
            return outp;
        }
    })(hex = pxt.hex || (pxt.hex = {}));
})(pxt || (pxt = {}));
var pxt;
(function (pxt) {
    var crowdin;
    (function (crowdin) {
        crowdin.KEY_VARIABLE = "CROWDIN_KEY";
        function apiUri(prj, key, cmd, args) {
            pxt.Util.assert(!!prj && !!key && !!cmd);
            var apiRoot = "https://api.crowdin.com/api/project/" + prj + "/";
            var suff = "?key=" + key;
            if (args)
                suff += "&" + Object.keys(args).map(function (k) { return (k + "=" + encodeURIComponent(args[k])); }).join("&");
            return apiRoot + cmd + suff;
        }
        function downloadTranslationsAsync(prj, key, filename, options) {
            if (options === void 0) { options = {}; }
            var q = { json: "true" };
            var infoUri = apiUri(prj, key, "info", q);
            var r = {};
            filename = normalizeFileName(filename);
            return pxt.Util.httpGetTextAsync(infoUri).then(function (respText) {
                var info = JSON.parse(respText);
                if (!info)
                    throw new Error("info failed");
                var todo = info.languages;
                pxt.log('languages: ' + todo.map(function (l) { return l.code; }).join(', '));
                var nextFile = function () {
                    var item = todo.pop();
                    if (!item)
                        return Promise.resolve();
                    var exportFileUri = apiUri(prj, key, "export-file", {
                        file: filename,
                        language: item.code,
                        export_translated_only: options.translatedOnly ? "1" : "0",
                        export_approved_only: options.validatedOnly ? "1" : "0"
                    });
                    pxt.log("downloading " + item.name + " - " + item.code + " (" + todo.length + " more)");
                    return pxt.Util.httpGetTextAsync(exportFileUri).then(function (transationsText) {
                        try {
                            var translations = JSON.parse(transationsText);
                            if (translations)
                                r[item.code] = translations;
                        }
                        catch (e) {
                            pxt.log(exportFileUri + ' ' + e);
                        }
                        return nextFile();
                    }).delay(1000); // throttling otherwise crowdin fails
                };
                return nextFile();
            }).then(function () { return r; });
        }
        crowdin.downloadTranslationsAsync = downloadTranslationsAsync;
        function mkIncr(filename) {
            var cnt = 0;
            return function incr() {
                if (cnt++ > 10) {
                    throw new Error("Too many API calls for " + filename);
                }
            };
        }
        function createDirectoryAsync(prj, key, name, incr) {
            name = normalizeFileName(name);
            pxt.debug("create directory " + name);
            if (!incr)
                incr = mkIncr(name);
            return pxt.Util.multipartPostAsync(apiUri(prj, key, "add-directory"), { json: "true", name: name })
                .then(function (resp) {
                pxt.debug("crowdin resp: " + resp.statusCode);
                // 400 returned by folder already exists
                if (resp.statusCode == 200 || resp.statusCode == 400)
                    return Promise.resolve();
                var data = resp.json || { error: {} };
                if (resp.statusCode == 404 && data.error.code == 17) {
                    pxt.log("parent directory missing for " + name);
                    var par = name.replace(/\/[^\/]+$/, "");
                    if (par != name) {
                        return createDirectoryAsync(prj, key, par, incr)
                            .then(function () { return createDirectoryAsync(prj, key, name, incr); }); // retry
                    }
                }
                throw new Error("cannot create dir " + name + ": " + resp.toString() + " " + JSON.stringify(data));
            });
        }
        crowdin.createDirectoryAsync = createDirectoryAsync;
        function normalizeFileName(filename) {
            return filename.replace(/\\/g, '/');
        }
        function uploadTranslationAsync(prj, key, filename, data) {
            pxt.Util.assert(!!prj);
            pxt.Util.assert(!!key);
            filename = normalizeFileName(filename);
            var incr = mkIncr(filename);
            function startAsync() {
                return uploadAsync("update-file", { update_option: "update_as_unapproved" });
            }
            function uploadAsync(op, opts) {
                opts["type"] = "auto";
                opts["json"] = "";
                opts["escape_quotes"] = "0";
                incr();
                return pxt.Util.multipartPostAsync(apiUri(prj, key, op), opts, filename, data)
                    .then(function (resp) { return handleResponseAsync(resp); });
            }
            function handleResponseAsync(resp) {
                var code = resp.statusCode;
                var data = JSON.parse(resp.text);
                pxt.debug("upload result: " + code);
                if (code == 404 && data.error.code == 8) {
                    pxt.log("create new translation file: " + filename);
                    return uploadAsync("add-file", {});
                }
                else if (code == 404 && data.error.code == 17) {
                    return createDirectoryAsync(prj, key, filename.replace(/\/[^\/]+$/, ""), incr)
                        .then(function () { return startAsync(); });
                }
                else if (code == 200) {
                    return Promise.resolve();
                }
                else {
                    throw new Error("Error, upload translation: " + filename + ", " + resp + ", " + JSON.stringify(data));
                }
            }
            return startAsync();
        }
        crowdin.uploadTranslationAsync = uploadTranslationAsync;
    })(crowdin = pxt.crowdin || (pxt.crowdin = {}));
})(pxt || (pxt = {}));
/// <reference path='../typings/globals/marked/index.d.ts' />
/// <reference path='../typings/globals/highlightjs/index.d.ts' />
/// <reference path='../localtypings/pxtarget.d.ts' />
/// <reference path="emitter/util.ts"/>
var pxt;
(function (pxt) {
    var docs;
    (function (docs) {
        var marked;
        var U = pxtc.Util;
        var lf = U.lf;
        var stdboxes = {};
        var stdmacros = {};
        var stdSetting = "<!-- @CMD@ @ARGS@ -->";
        var stdsettings = {
            "parent": stdSetting,
            "short": stdSetting,
            "description": "<!-- desc -->"
        };
        function replaceAll(replIn, x, y) {
            return replIn.split(x).join(y);
        }
        function htmlQuote(s) {
            s = replaceAll(s, "&", "&amp;");
            s = replaceAll(s, "<", "&lt;");
            s = replaceAll(s, ">", "&gt;");
            s = replaceAll(s, "\"", "&quot;");
            s = replaceAll(s, "\'", "&#39;");
            return s;
        }
        docs.htmlQuote = htmlQuote;
        // the input already should be HTML-quoted but we want to make sure, and also quote quotes
        function html2Quote(s) {
            if (!s)
                return s;
            return htmlQuote(s.replace(/\&([#a-z0-9A-Z]+);/g, function (f, ent) {
                switch (ent) {
                    case "amp": return "&";
                    case "lt": return "<";
                    case "gt": return ">";
                    case "quot": return "\"";
                    default:
                        if (ent[0] == "#")
                            return String.fromCharCode(parseInt(ent.slice(1)));
                        else
                            return f;
                }
            }));
        }
        docs.html2Quote = html2Quote;
        //The extra YouTube macros are in case there is a timestamp on the YouTube URL.
        //TODO: Add equivalent support for youtu.be links
        var links = [
            {
                rx: /^vimeo\.com\/(\d+)/,
                cmd: "### @vimeo $1"
            },
            {
                rx: /^(www\.youtube\.com\/watch\?v=|youtu\.be\/)([\w\-]+(\#t=([0-9]+m[0-9]+s|[0-9]+m|[0-9]+s))?)/,
                cmd: "### @youtube $2"
            }
        ];
        docs.requireMarked = function () {
            if (typeof marked !== "undefined")
                return marked;
            if (typeof require === "undefined")
                return undefined;
            return require("marked");
        };
        docs.requireHighlightJs = function () {
            if (typeof hljs !== "undefined")
                return hljs;
            if (typeof require === "undefined")
                return undefined;
            return require("highlight.js");
        };
        function parseHtmlAttrs(s) {
            var attrs = {};
            while (s.trim()) {
                var m = /\s*([^=\s]+)=("([^"]*)"|'([^']*)'|(\S*))/.exec(s);
                if (m) {
                    var v = m[3] || m[4] || m[5] || "";
                    attrs[m[1].toLowerCase()] = v;
                }
                else {
                    m = /^\s*(\S+)/.exec(s);
                    attrs[m[1]] = "true";
                }
                s = s.slice(m[0].length);
            }
            return attrs;
        }
        var error = function (s) {
            return ("<div class='ui negative message'>" + htmlQuote(s) + "</div>");
        };
        function prepTemplate(d) {
            var boxes = U.clone(stdboxes);
            var macros = U.clone(stdmacros);
            var settings = U.clone(stdsettings);
            var menus = {};
            var params = d.params;
            var theme = d.theme;
            d.boxes = boxes;
            d.macros = macros;
            d.settings = settings;
            d.html = d.html.replace(/<aside\s+([^<>]+)>([^]*?)<\/aside>/g, function (full, attrsStr, body) {
                var attrs = parseHtmlAttrs(attrsStr);
                var name = attrs["data-name"] || attrs["id"];
                if (!name)
                    return error("id or data-name missing on macro");
                if (/box/.test(attrs["class"])) {
                    boxes[name] = body;
                }
                else if (/aside/.test(attrs["class"])) {
                    boxes[name] = "<!-- BEGIN-ASIDE " + name + " -->" + body + "<!-- END-ASIDE -->";
                }
                else if (/setting/.test(attrs["class"])) {
                    settings[name] = body;
                }
                else if (/menu/.test(attrs["class"])) {
                    menus[name] = body;
                }
                else {
                    macros[name] = body;
                }
                return "<!-- macro " + name + " -->";
            });
            var recMenu = function (m, lev) {
                var templ = menus["item"];
                var mparams = {
                    NAME: m.name,
                };
                if (m.subitems) {
                    if (lev == 0)
                        templ = menus["top-dropdown"];
                    else
                        templ = menus["inner-dropdown"];
                    mparams["ITEMS"] = m.subitems.map(function (e) { return recMenu(e, lev + 1); }).join("\n");
                }
                else {
                    if (/^-+$/.test(m.name)) {
                        templ = menus["divider"];
                    }
                    if (m.path && !/^(https?:|\/)/.test(m.path))
                        return error("Invalid link: " + m.path);
                    mparams["LINK"] = m.path;
                }
                return injectHtml(templ, mparams, ["ITEMS"]);
            };
            var breadcrumbHtml = '';
            if (d.breadcrumb && d.breadcrumb.length > 1) {
                breadcrumbHtml = "\n            <div class=\"ui breadcrumb\">\n                " + d.breadcrumb.map(function (b, i) {
                    return ("<a class=\"" + (i == d.breadcrumb.length - 1 ? "active" : "") + " section\" \n                        href=\"" + html2Quote(b.href) + "\">" + html2Quote(b.name) + "</a>");
                })
                    .join('<i class="right chevron icon divider"></i>') + "\n            </div>";
            }
            params["menu"] = (theme.docMenu || []).map(function (e) { return recMenu(e, 0); }).join("\n");
            params["breadcrumb"] = breadcrumbHtml;
            if (theme.boardName)
                params["boardname"] = html2Quote(theme.boardName);
            if (theme.homeUrl)
                params["homeurl"] = html2Quote(theme.homeUrl);
            params["targetname"] = theme.name || "PXT";
            params["targetlogo"] = theme.docsLogo ? "<img class=\"ui mini image\" src=\"" + U.toDataUri(theme.docsLogo) + "\" />" : "";
            if (d.filepath && theme.githubUrl) {
                //I would have used NodeJS path library, but this code may have to work in browser
                var leadingTrailingSlash = /^\/|\/$/;
                var githubUrl = theme.githubUrl.replace(leadingTrailingSlash, '') + "/blob/master/docs/" + d.filepath.replace(leadingTrailingSlash, '');
                params["github"] = "<p style=\"margin-top:1em\"><a href=\"" + githubUrl + "\"><i class=\"write icon\"></i>" + lf("Edit this page on GitHub") + "</a></p>";
            }
            else {
                params["github"] = "";
            }
            var style = '';
            if (theme.accentColor)
                style += "\n.ui.accent { color: " + theme.accentColor + "; }\n.ui.inverted.accent { background: " + theme.accentColor + "; }\n";
            params["targetstyle"] = style;
            for (var _i = 0, _a = Object.keys(theme); _i < _a.length; _i++) {
                var k = _a[_i];
                var v = theme[k];
                if (params[k] === undefined && typeof v == "string")
                    params[k] = v;
            }
            d.finish = function () { return injectHtml(d.html, params, ["body", "menu", "breadcrumb", "targetlogo", "github",
                "JSON"]); };
        }
        docs.prepTemplate = prepTemplate;
        function renderMarkdown(template, src, theme, pubinfo, breadcrumb, filepath, locale) {
            if (theme === void 0) { theme = null; }
            if (pubinfo === void 0) { pubinfo = null; }
            if (breadcrumb === void 0) { breadcrumb = null; }
            if (filepath === void 0) { filepath = null; }
            if (locale === void 0) { locale = null; }
            var hasPubInfo = true;
            if (!pubinfo) {
                hasPubInfo = false;
                pubinfo = {};
            }
            if (!theme)
                theme = {};
            if (!breadcrumb)
                breadcrumb = [];
            delete pubinfo["private"]; // just in case
            if (pubinfo["time"]) {
                var tm = parseInt(pubinfo["time"]);
                if (!pubinfo["timems"])
                    pubinfo["timems"] = 1000 * tm + "";
                if (!pubinfo["humantime"])
                    pubinfo["humantime"] = U.isoTime(tm);
            }
            if (pubinfo["name"]) {
                pubinfo["dirname"] = pubinfo["name"].replace(/[^A-Za-z0-9_]/g, "-");
                pubinfo["title"] = pubinfo["name"];
            }
            if (hasPubInfo) {
                pubinfo["JSON"] = JSON.stringify(pubinfo, null, 4).replace(/</g, "\\u003c");
            }
            template = template
                .replace(/<!--\s*@include\s+(\S+)\s*-->/g, function (full, fn) {
                var cont = (theme.htmlDocIncludes || {})[fn] || "";
                return "<!-- include " + fn + " -->\n" + cont + "\n<!-- end include -->\n";
            });
            if (locale)
                template = translate(template, locale).text;
            var d = {
                html: template,
                theme: theme,
                params: pubinfo,
                breadcrumb: breadcrumb,
                filepath: filepath
            };
            prepTemplate(d);
            if (!marked) {
                marked = docs.requireMarked();
                var renderer = new marked.Renderer();
                renderer.image = function (href, title, text) {
                    var out = '<img class="ui image" src="' + href + '" alt="' + text + '"';
                    if (title) {
                        out += ' title="' + title + '"';
                    }
                    out += this.options.xhtml ? '/>' : '>';
                    return out;
                };
                marked.setOptions({
                    renderer: renderer,
                    gfm: true,
                    tables: true,
                    breaks: false,
                    pedantic: false,
                    sanitize: true,
                    smartLists: true,
                    smartypants: true,
                    highlight: function (code, lang) {
                        try {
                            var hljs_1 = docs.requireHighlightJs();
                            if (!hljs_1)
                                return code;
                            return hljs_1.highlightAuto(code, [lang.replace('-ignore', '')]).value;
                        }
                        catch (e) {
                            return code;
                        }
                    }
                });
            }
            ;
            //Uses the CmdLink definitions to replace links to YouTube and Vimeo (limited at the moment)
            src = src.replace(/^\s*https?:\/\/(\S+)\s*$/mg, function (f, lnk) {
                var _loop_3 = function(ent) {
                    var m = ent.rx.exec(lnk);
                    if (m) {
                        return { value: ent.cmd.replace(/\$(\d+)/g, function (f, k) {
                            return m[parseInt(k)] || "";
                        }) + "\n" };
                    }
                };
                for (var _i = 0, links_1 = links; _i < links_1.length; _i++) {
                    var ent = links_1[_i];
                    var state_3 = _loop_3(ent);
                    if (typeof state_3 === "object") return state_3.value;
                }
                return f;
            });
            // replace pre-template in markdown
            src = src.replace(/@([a-z]+)@/ig, function (m, param) { return pubinfo[param] || 'unknown macro'; });
            var html = marked(src);
            // support for breaks which somehow don't work out of the box
            html = html.replace(/&lt;br\s*\/&gt;/ig, "<br/>");
            var endBox = "";
            html = html.replace(/<h\d[^>]+>\s*([~@])\s*(.*?)<\/h\d>/g, function (f, tp, body) {
                var m = /^(\w+)\s+(.*)/.exec(body);
                var cmd = m ? m[1] : body;
                var args = m ? m[2] : "";
                var rawArgs = args;
                args = html2Quote(args);
                cmd = html2Quote(cmd);
                if (tp == "@") {
                    var expansion = U.lookup(d.settings, cmd);
                    if (expansion != null) {
                        pubinfo[cmd] = args;
                    }
                    else {
                        expansion = U.lookup(d.macros, cmd);
                        if (expansion == null)
                            return error("Unknown command: @" + cmd);
                    }
                    var ivars = {
                        ARGS: args,
                        CMD: cmd
                    };
                    return injectHtml(expansion, ivars, ["ARGS", "CMD"]);
                }
                else {
                    if (!cmd) {
                        var r = endBox;
                        endBox = "";
                        return r;
                    }
                    var box = U.lookup(d.boxes, cmd);
                    if (box) {
                        var parts = box.split("@BODY@");
                        endBox = parts[1];
                        return parts[0].replace("@ARGS@", args);
                    }
                    else {
                        return error("Unknown box: ~" + cmd);
                    }
                }
            });
            if (!pubinfo["title"]) {
                var titleM = /<h1[^<>]*>([^<>]+)<\/h1>/.exec(html);
                if (titleM)
                    pubinfo["title"] = html2Quote(titleM[1]);
            }
            if (!pubinfo["description"]) {
                var descM = /<p>([^]+?)<\/p>/.exec(html);
                if (descM)
                    pubinfo["description"] = html2Quote(descM[1]);
            }
            pubinfo["twitter"] = html2Quote(theme.twitter || "@mspxtio");
            var registers = {};
            registers["main"] = ""; // first
            html = html.replace(/<!-- BEGIN-ASIDE (\S+) -->([^]*?)<!-- END-ASIDE -->/g, function (f, nam, cont) {
                var s = U.lookup(registers, nam);
                registers[nam] = (s || "") + cont;
                return "<!-- aside -->";
            });
            // fix up spourious newlines at the end of code blocks
            html = html.replace(/\n<\/code>/g, "</code>");
            registers["main"] = html;
            var injectBody = function (tmpl, body) {
                return injectHtml(d.boxes[tmpl] || "@BODY@", { BODY: body }, ["BODY"]);
            };
            html = "";
            for (var _i = 0, _a = Object.keys(registers); _i < _a.length; _i++) {
                var k = _a[_i];
                html += injectBody(k + "-container", registers[k]);
            }
            pubinfo["body"] = html;
            pubinfo["name"] = pubinfo["title"] + " - " + pubinfo["targetname"];
            for (var _b = 0, _c = Object.keys(theme); _b < _c.length; _b++) {
                var k = _c[_b];
                var v = theme[k];
                if (typeof v == "string")
                    pubinfo["theme_" + k] = v;
            }
            return d.finish();
        }
        docs.renderMarkdown = renderMarkdown;
        function injectHtml(template, vars, quoted) {
            if (quoted === void 0) { quoted = []; }
            if (!template)
                return '';
            return template.replace(/@(\w+)@/g, function (f, key) {
                var res = U.lookup(vars, key) || "";
                res += ""; // make sure it's a string
                if (quoted.indexOf(key) < 0) {
                    res = html2Quote(res);
                }
                return res;
            });
        }
        function embedUrl(rootUrl, tag, id, height) {
            var url = rootUrl + "#" + tag + ":" + id;
            var padding = '70%';
            return "<div style=\"position:relative;height:0;padding-bottom:" + padding + ";overflow:hidden;\"><iframe style=\"position:absolute;top:0;left:0;width:100%;height:100%;\" src=\"" + url + "\" frameborder=\"0\" sandbox=\"allow-popups allow-scripts allow-same-origin\"></iframe></div>";
        }
        docs.embedUrl = embedUrl;
        function runUrl(url, padding, id) {
            var embed = "<div style=\"position:relative;height:0;padding-bottom:" + padding + ";overflow:hidden;\"><iframe style=\"position:absolute;top:0;left:0;width:100%;height:100%;\" src=\"" + url + "?id=" + encodeURIComponent(id) + "\" allowfullscreen=\"allowfullscreen\" sandbox=\"allow-popups allow-scripts allow-same-origin\" frameborder=\"0\"></iframe></div>";
            return embed;
        }
        docs.runUrl = runUrl;
        function docsEmbedUrl(rootUrl, id, height) {
            var docurl = rootUrl + "--docs?projectid=" + id;
            height = Math.ceil(height || 300);
            return "<div style=\"position:relative;height:calc(" + height + "px + 5em);width:100%;overflow:hidden;\"><iframe style=\"position:absolute;top:0;left:0;width:100%;height:100%;\" src=\"" + docurl + "\" allowfullscreen=\"allowfullscreen\" frameborder=\"0\" sandbox=\"allow-popups allow-scripts allow-same-origin\"></iframe></div>";
        }
        docs.docsEmbedUrl = docsEmbedUrl;
        var inlineTags = {
            b: 1,
            strong: 1,
            em: 1,
        };
        function translate(html, locale) {
            var missing = {};
            function translateOne(toTranslate) {
                var spm = /^(\s*)([^]*?)(\s*)$/.exec(toTranslate);
                var text = spm[2].replace(/\s+/g, " ");
                if (text == "" || /^((IE=edge,.*|width=device-width.*|(https?:\/\/|\/)[\w@\/\.]+|@[\-\w]+@|\{[^\{\}]+\}|[^a-zA-Z]*|(&nbsp;)+)\s*)+$/.test(text))
                    return null;
                var v = U.lookup(locale, text);
                if (v)
                    text = v;
                else
                    missing[text] = "";
                return spm[1] + text + spm[3];
            }
            html = html.replace(/<([\/\w]+)([^<>]*)>/g, function (full, tagname, args) {
                var key = tagname.replace(/^\//, "").toLowerCase();
                if (inlineTags[key] === 1)
                    return "&llt;" + tagname + args + "&ggt;";
                return full;
            });
            function ungt(s) {
                return s.replace(/&llt;/g, "<").replace(/&ggt;/g, ">");
            }
            html = "<start>" + html;
            html = html.replace(/(<([\/\w]+)([^<>]*)>)([^<>]+)/g, function (full, fullTag, tagname, args, str) {
                if (tagname == "script" || tagname == "style")
                    return ungt(full);
                var tr = translateOne(ungt(str));
                if (tr == null)
                    return ungt(full);
                return fullTag + tr;
            });
            html = html.replace(/(<[^<>]*)(content|placeholder|alt|title)="([^"]+)"/g, function (full, pref, attr, text) {
                var tr = translateOne(text);
                if (tr == null)
                    return full;
                return pref + attr + '="' + text.replace(/"/g, "''") + '"';
            });
            html = html.replace(/^<start>/g, "");
            return {
                text: html,
                missing: missing
            };
        }
        docs.translate = translate;
    })(docs = pxt.docs || (pxt.docs = {}));
})(pxt || (pxt = {}));
var pxt;
(function (pxt) {
    var github;
    (function (github) {
        function listRefsAsync(repopath, namespace) {
            if (namespace === void 0) { namespace = "tags"; }
            return pxt.U.httpGetJsonAsync("https://api.github.com/repos/" + repopath + "/git/refs/" + namespace + "/?per_page=100")
                .then(function (resp) {
                var tagnames = resp
                    .map(function (x) { return x.ref.replace(/^refs\/[^\/]+\//, ""); });
                tagnames.sort(pxt.semver.strcmp);
                return tagnames;
            }, function (err) {
                if (err.statusCode == 404)
                    return [];
                else
                    return Promise.reject(err);
            });
        }
        github.listRefsAsync = listRefsAsync;
        function resolveRefAsync(r) {
            if (r.object.type == "commit")
                return Promise.resolve(r.object.sha);
            else if (r.object.type == "tag")
                return pxt.U.httpGetJsonAsync(r.object.url)
                    .then(function (r) {
                    return r.object.type == "commit" ? r.object.sha :
                        Promise.reject(new Error("Bad type (2nd order) " + r.object.type));
                });
            else
                return Promise.reject(new Error("Bad type " + r.object.type));
        }
        function tagToShaAsync(repopath, tag) {
            if (/^[a-f0-9]{40}$/.test(tag))
                return Promise.resolve(tag);
            return pxt.U.httpGetJsonAsync("https://api.github.com/repos/" + repopath + "/git/refs/tags/" + tag)
                .then(resolveRefAsync, function (e) {
                return pxt.U.httpGetJsonAsync("https://api.github.com/repos/" + repopath + "/git/refs/heads/" + tag)
                    .then(resolveRefAsync);
            });
        }
        github.tagToShaAsync = tagToShaAsync;
        function pkgConfigAsync(repopath, tag) {
            if (tag === void 0) { tag = "master"; }
            var url = "https://raw.githubusercontent.com/" + repopath + "/" + tag + "/" + pxt.CONFIG_NAME;
            return pxt.U.httpGetTextAsync(url)
                .then(function (v) { return JSON.parse(v); });
        }
        github.pkgConfigAsync = pkgConfigAsync;
        function downloadPackageAsync(repoWithTag, config, current) {
            if (current === void 0) { current = null; }
            var p = parseRepoId(repoWithTag);
            if (!p) {
                pxt.log('Unknown github syntax');
                return Promise.resolve(undefined);
            }
            if (!isRepoApproved(p, config)) {
                pxt.tickEvent("github.download.unauthorized");
                pxt.log('Github repo not approved');
                return Promise.resolve(undefined);
            }
            return tagToShaAsync(p.fullName, p.tag)
                .then(function (sha) {
                var pref = "https://raw.githubusercontent.com/" + p.fullName + "/" + sha + "/";
                if (!current)
                    current = { sha: "", files: {} };
                if (current.sha === sha)
                    return Promise.resolve(current);
                else {
                    console.log("Downloading " + repoWithTag + " -> " + sha);
                    return pxt.U.httpGetTextAsync(pref + pxt.CONFIG_NAME)
                        .then(function (pkg) {
                        current.files = {};
                        current.sha = "";
                        current.files[pxt.CONFIG_NAME] = pkg;
                        var cfg = JSON.parse(pkg);
                        return Promise.map(cfg.files.concat(cfg.testFiles || []), function (fn) { return pxt.U.httpGetTextAsync(pref + fn)
                            .then(function (text) {
                            current.files[fn] = text;
                        }); })
                            .then(function () {
                            current.sha = sha;
                            return current;
                        });
                    });
                }
            });
        }
        github.downloadPackageAsync = downloadPackageAsync;
        (function (GitRepoStatus) {
            GitRepoStatus[GitRepoStatus["Unknown"] = 0] = "Unknown";
            GitRepoStatus[GitRepoStatus["Approved"] = 1] = "Approved";
            GitRepoStatus[GitRepoStatus["Banned"] = 2] = "Banned";
        })(github.GitRepoStatus || (github.GitRepoStatus = {}));
        var GitRepoStatus = github.GitRepoStatus;
        function mkRepo(r, config, tag) {
            if (!r)
                return undefined;
            var rr = {
                owner: r.owner.login.toLowerCase(),
                fullName: r.full_name.toLowerCase(),
                name: r.name,
                description: r.description,
                defaultBranch: r.default_branch,
                tag: tag
            };
            rr.status = repoStatus(rr, config);
            return rr;
        }
        function repoStatus(rr, config) {
            return isRepoBanned(rr, config) ? GitRepoStatus.Banned
                : isRepoApproved(rr, config) ? GitRepoStatus.Approved
                    : GitRepoStatus.Unknown;
        }
        github.repoStatus = repoStatus;
        function isOrgBanned(repo, config) {
            if (!repo || !config || !repo.owner)
                return true;
            if (config.bannedOrgs
                && config.bannedOrgs.some(function (org) { return org.toLowerCase() == repo.owner.toLowerCase(); }))
                return true;
            return false;
        }
        function isRepoBanned(repo, config) {
            if (isOrgBanned(repo, config))
                return true;
            if (!repo || !config || !repo.fullName)
                return true;
            if (config.bannedRepos
                && config.bannedRepos.some(function (fn) { return fn.toLowerCase() == repo.fullName.toLowerCase(); }))
                return true;
            return false;
        }
        function isOrgApproved(repo, config) {
            if (!repo || !config)
                return false;
            if (repo.owner
                && config.approvedOrgs
                && config.approvedOrgs.some(function (org) { return org.toLowerCase() == repo.owner.toLowerCase(); }))
                return true;
            return false;
        }
        function isRepoApproved(repo, config) {
            if (isOrgApproved(repo, config))
                return true;
            if (!repo || !config)
                return false;
            if (repo.fullName
                && config.approvedRepos
                && config.approvedRepos.some(function (fn) { return fn.toLowerCase() == repo.fullName.toLowerCase(); }))
                return true;
            return false;
        }
        function repoAsync(id, config) {
            var rid = parseRepoId(id);
            var status = repoStatus(rid, config);
            if (status == GitRepoStatus.Banned)
                return Promise.resolve(undefined);
            // always use proxy
            return pxt.Util.httpGetJsonAsync(pxt.Cloud.apiRoot + "gh/" + rid.fullName)
                .then(function (meta) {
                if (!meta)
                    return undefined;
                return {
                    github: true,
                    owner: rid.owner,
                    fullName: rid.fullName,
                    name: meta.name,
                    description: meta.description,
                    defaultBranch: "master",
                    tag: rid.tag,
                    status: status
                };
            });
        }
        github.repoAsync = repoAsync;
        function searchAsync(query, config) {
            if (!config)
                return Promise.resolve([]);
            var repos = query.split('|').map(parseRepoUrl).filter(function (repo) { return !!repo; });
            if (repos.length > 0)
                return Promise.all(repos.map(function (id) { return repoAsync(id.path, config); }))
                    .then(function (rs) { return rs.filter(function (r) { return r.status == GitRepoStatus.Approved; }); });
            query += " in:name,description,readme \"for PXT/" + pxt.appTarget.id + "\"";
            return pxt.U.httpGetJsonAsync("https://api.github.com/search/repositories?q=" + encodeURIComponent(query))
                .then(function (rs) { return rs.items.map(function (item) { return mkRepo(item, config); }).filter(function (r) { return r.status == GitRepoStatus.Approved; }); });
        }
        github.searchAsync = searchAsync;
        function parseRepoUrl(url) {
            if (!url)
                return undefined;
            var m = /^((https:\/\/)?github.com\/)?([^/]+\/[^/#]+)(#(\w+))?$/i.exec(url.trim());
            if (!m)
                return;
            var r = {
                repo: m ? m[3].toLowerCase() : null,
                tag: m ? m[5] : null
            };
            r.path = r.repo + (r.tag ? '#' + r.tag : '');
            return r;
        }
        github.parseRepoUrl = parseRepoUrl;
        function parseRepoId(repo) {
            if (!repo)
                return undefined;
            repo = repo.replace(/^github:/i, "");
            var m = /([^#]+)(#(.*))?/.exec(repo);
            var owner = m ? m[1].split('/')[0].toLowerCase() : undefined;
            return {
                owner: owner,
                fullName: m ? m[1].toLowerCase() : repo.toLowerCase(),
                tag: m ? m[3] : null
            };
        }
        github.parseRepoId = parseRepoId;
        function isGithubId(id) {
            return id.slice(0, 7) == "github:";
        }
        github.isGithubId = isGithubId;
        function stringifyRepo(p) {
            return p ? "github:" + p.fullName.toLowerCase() + "#" + (p.tag || "master") : undefined;
        }
        github.stringifyRepo = stringifyRepo;
        function noramlizeRepoId(id) {
            return stringifyRepo(parseRepoId(id));
        }
        github.noramlizeRepoId = noramlizeRepoId;
        function latestVersionAsync(path, config) {
            var parsed = parseRepoId(path);
            if (!parsed)
                return Promise.resolve(null);
            return repoAsync(parsed.fullName, config)
                .then(function (scr) {
                if (!scr)
                    return undefined;
                return listRefsAsync(scr.fullName, "tags")
                    .then(function (tags) {
                    tags.sort(pxt.semver.strcmp);
                    tags.reverse();
                    if (tags[0])
                        return Promise.resolve(tags[0]);
                    else
                        return tagToShaAsync(scr.fullName, scr.defaultBranch);
                });
            });
        }
        github.latestVersionAsync = latestVersionAsync;
        function publishGistAsync(token, forceNew, files, name, currentGistId) {
            // Github gist API: https://developer.github.com/v3/gists/
            var data = {
                "description": name,
                "public": false,
                "files": files
            };
            var headers = {};
            var method, url = "https://api.github.com/gists";
            if (token)
                headers['Authorization'] = "token " + token;
            if (currentGistId && token && !forceNew) {
                // Patch existing gist
                method = 'PATCH';
                url += "/" + currentGistId;
            }
            else {
                // Create new gist
                method = 'POST';
            }
            return pxt.U.requestAsync({
                url: url,
                allowHttpErrors: true,
                headers: headers,
                method: method,
                data: data || {} })
                .then(function (resp) {
                if ((resp.statusCode == 200 || resp.statusCode == 201) && resp.json.id) {
                    return Promise.resolve(resp.json.id);
                }
                else if (resp.statusCode == 404 && method == 'PATCH') {
                    return Promise.reject(resp.statusCode);
                }
                else if (resp.statusCode == 404) {
                    return Promise.reject("Make sure to add the ``gist`` scope to your token. " + resp.text);
                }
                return Promise.reject(resp.text);
            });
        }
        github.publishGistAsync = publishGistAsync;
    })(github = pxt.github || (pxt.github = {}));
})(pxt || (pxt = {}));
var pxt;
(function (pxt) {
    var HF2;
    (function (HF2) {
        var HF2_CMD_BININFO = 0x0001; // no arguments
        var HF2_MODE_BOOTLOADER = 0x01;
        var HF2_MODE_USERSPACE = 0x02;
        /*
        struct HF2_BININFO_Result {
            uint32_t mode;
            uint32_t flash_page_size;
            uint32_t flash_num_pages;
            uint32_t max_message_size;
        };
        */
        var HF2_CMD_INFO = 0x0002;
        // no arguments
        // results is utf8 character array
        var HF2_CMD_RESET_INTO_APP = 0x0003; // no arguments, no result
        var HF2_CMD_RESET_INTO_BOOTLOADER = 0x0004; // no arguments, no result
        var HF2_CMD_START_FLASH = 0x0005; // no arguments, no result
        var HF2_CMD_WRITE_FLASH_PAGE = 0x0006;
        /*
        struct HF2_WRITE_FLASH_PAGE_Command {
            uint32_t target_addr;
            uint32_t data[flash_page_size];
        };
        */
        // no result
        var HF2_CMD_CHKSUM_PAGES = 0x0007;
        /*
        struct HF2_CHKSUM_PAGES_Command {
            uint32_t target_addr;
            uint32_t num_pages;
        };
        struct HF2_CHKSUM_PAGES_Result {
            uint16_t chksums[num_pages];
        };
        */
        var HF2_CMD_READ_WORDS = 0x0008;
        /*
        struct HF2_READ_WORDS_Command {
            uint32_t target_addr;
            uint32_t num_words;
        };
        struct HF2_READ_WORDS_Result {
            uint32_t words[num_words];
        };
        */
        var HF2_CMD_WRITE_WORDS = 0x0009;
        /*
        struct HF2_WRITE_WORDS_Command {
            uint32_t target_addr;
            uint32_t num_words;
            uint32_t words[num_words];
        };
        */
        // no result
        var HF2_FLAG_SERIAL_OUT = 0x80;
        var HF2_FLAG_SERIAL_ERR = 0xC0;
        var HF2_FLAG_CMDPKT_LAST = 0x40;
        var HF2_FLAG_CMDPKT_BODY = 0x00;
        var HF2_FLAG_MASK = 0xC0;
        var HF2_SIZE_MASK = 63;
        var HF2_STATUS_OK = 0x00;
        var HF2_STATUS_INVALID_CMD = 0x01;
        var HF2_STATUS_EXEC_ERR = 0x02;
        function write32(buf, pos, v) {
            buf[pos + 0] = (v >> 0) & 0xff;
            buf[pos + 1] = (v >> 8) & 0xff;
            buf[pos + 2] = (v >> 16) & 0xff;
            buf[pos + 3] = (v >> 24) & 0xff;
        }
        HF2.write32 = write32;
        function write16(buf, pos, v) {
            buf[pos + 0] = (v >> 0) & 0xff;
            buf[pos + 1] = (v >> 8) & 0xff;
        }
        HF2.write16 = write16;
        function read32(buf, pos) {
            return (buf[pos] | (buf[pos + 1] << 8) | (buf[pos + 2] << 16) | (buf[pos + 3] << 24)) >>> 0;
        }
        HF2.read32 = read32;
        function read16(buf, pos) {
            return buf[pos] | (buf[pos + 1] << 8);
        }
        HF2.read16 = read16;
        function log(msg) {
            console.log("HF2: " + msg);
        }
        var Wrapper = (function () {
            function Wrapper(io) {
                var _this = this;
                this.io = io;
                this.cmdSeq = pxt.U.randomUint32();
                this.lock = new pxt.U.PromiseQueue();
                this.maxMsgSize = 63; // when running in forwarding mode, we do not really know
                this.bootloaderMode = false;
                this.reconnectTries = 0;
                this.msgs = new pxt.U.PromiseBuffer();
                this.onSerial = function (buf, isStderr) { };
                var frames = [];
                io.onSerial = function (b, e) { return _this.onSerial(b, e); };
                io.onData = function (buf) {
                    var tp = buf[0] & HF2_FLAG_MASK;
                    var len = buf[0] & 63;
                    //console.log(`msg tp=${tp} len=${len}`)
                    var frame = new Uint8Array(len);
                    pxt.U.memcpy(frame, 0, buf, 1, len);
                    if (tp & HF2_FLAG_SERIAL_OUT) {
                        _this.onSerial(frame, tp == HF2_FLAG_SERIAL_ERR);
                        return;
                    }
                    frames.push(frame);
                    if (tp == HF2_FLAG_CMDPKT_BODY) {
                        return;
                    }
                    else {
                        pxt.U.assert(tp == HF2_FLAG_CMDPKT_LAST);
                        var total = 0;
                        for (var _i = 0, frames_1 = frames; _i < frames_1.length; _i++) {
                            var f = frames_1[_i];
                            total += f.length;
                        }
                        var r = new Uint8Array(total);
                        var ptr = 0;
                        for (var _a = 0, frames_2 = frames; _a < frames_2.length; _a++) {
                            var f = frames_2[_a];
                            pxt.U.memcpy(r, ptr, f);
                            ptr += f.length;
                        }
                        frames = [];
                        _this.msgs.push(r);
                    }
                };
                io.onError = function (err) {
                    log("recv error: " + err.message);
                    //this.msgs.pushError(err)
                };
            }
            Wrapper.prototype.resetState = function () {
                this.lock = new pxt.U.PromiseQueue();
                this.info = null;
                this.infoRaw = null;
                this.pageSize = null;
                this.flashSize = null;
                this.maxMsgSize = 63;
                this.bootloaderMode = false;
                this.msgs.drain();
            };
            Wrapper.prototype.reconnectAsync = function (first) {
                var _this = this;
                if (first === void 0) { first = false; }
                this.resetState();
                if (first)
                    return this.initAsync();
                return this.io.reconnectAsync()
                    .then(function () { return _this.initAsync(); })
                    .catch(function (e) {
                    if (_this.reconnectTries < 5) {
                        _this.reconnectTries++;
                        log("error " + e.message + "; reconnecting attempt #" + _this.reconnectTries);
                        return Promise.delay(500)
                            .then(function () { return _this.reconnectAsync(); });
                    }
                    else {
                        throw e;
                    }
                });
            };
            Wrapper.prototype.error = function (m) {
                return this.io.error(m);
            };
            Wrapper.prototype.talkAsync = function (cmd, data) {
                var _this = this;
                if (this.io.talksAsync)
                    return this.io.talksAsync([{ cmd: cmd, data: data }])
                        .then(function (v) { return v[0]; });
                var len = 8;
                if (data)
                    len += data.length;
                var pkt = new Uint8Array(len);
                var seq = ++this.cmdSeq & 0xffff;
                write32(pkt, 0, cmd);
                write16(pkt, 4, seq);
                write16(pkt, 6, 0);
                if (data)
                    pxt.U.memcpy(pkt, 8, data, 0, data.length);
                var numSkipped = 0;
                var handleReturnAsync = function () {
                    return _this.msgs.shiftAsync(1000) // we wait up to a second
                        .then(function (res) {
                        if (read16(res, 0) != seq) {
                            if (numSkipped < 3) {
                                numSkipped++;
                                log("message out of sync, (" + seq + " vs " + read16(res, 0) + "); will re-try");
                                return handleReturnAsync();
                            }
                            _this.error("out of sync");
                        }
                        var info = "";
                        if (res[3])
                            info = "; info=" + res[3];
                        switch (res[2]) {
                            case HF2_STATUS_OK:
                                return res.slice(4);
                            case HF2_STATUS_INVALID_CMD:
                                _this.error("invalid command" + info);
                                break;
                            case HF2_STATUS_EXEC_ERR:
                                _this.error("execution error" + info);
                                break;
                            default:
                                _this.error("error " + res[2] + info);
                                break;
                        }
                        return null;
                    });
                };
                return this.sendMsgAsync(pkt)
                    .then(handleReturnAsync);
            };
            Wrapper.prototype.sendMsgAsync = function (buf) {
                return this.sendMsgCoreAsync(buf);
            };
            Wrapper.prototype.sendSerialAsync = function (buf, useStdErr) {
                if (useStdErr === void 0) { useStdErr = false; }
                if (this.io.sendSerialAsync)
                    return this.io.sendSerialAsync(buf, useStdErr);
                return this.sendMsgCoreAsync(buf, useStdErr ? 2 : 1);
            };
            Wrapper.prototype.sendMsgCoreAsync = function (buf, serial) {
                var _this = this;
                if (serial === void 0) { serial = 0; }
                // Util.assert(buf.length <= this.maxMsgSize)
                var frame = new Uint8Array(64);
                var loop = function (pos) {
                    var len = buf.length - pos;
                    if (len <= 0)
                        return Promise.resolve();
                    if (len > 63) {
                        len = 63;
                        frame[0] = HF2_FLAG_CMDPKT_BODY;
                    }
                    else {
                        frame[0] = HF2_FLAG_CMDPKT_LAST;
                    }
                    if (serial)
                        frame[0] = serial == 1 ? HF2_FLAG_SERIAL_OUT : HF2_FLAG_SERIAL_ERR;
                    frame[0] |= len;
                    for (var i = 0; i < len; ++i)
                        frame[i + 1] = buf[pos + i];
                    return _this.io.sendPacketAsync(frame)
                        .then(function () { return loop(pos + len); });
                };
                return this.lock.enqueue("out", function () { return loop(0); });
            };
            Wrapper.prototype.switchToBootloaderAsync = function () {
                var _this = this;
                if (this.bootloaderMode)
                    return Promise.resolve();
                log("Switching into bootloader mode");
                return this.talkAsync(HF2_CMD_START_FLASH)
                    .then(function () { return _this.initAsync(); })
                    .then(function () {
                    if (!_this.bootloaderMode)
                        _this.error("cannot switch into bootloader mode");
                });
            };
            Wrapper.prototype.reflashAsync = function (blocks) {
                var _this = this;
                return this.flashAsync(blocks)
                    .then(function () { return Promise.delay(100); })
                    .then(function () { return _this.reconnectAsync(); });
            };
            Wrapper.prototype.readWordsAsync = function (addr, numwords) {
                var args = new Uint8Array(8);
                write32(args, 0, addr);
                write32(args, 4, numwords);
                pxt.U.assert(numwords <= 64); // just sanity check
                return this.talkAsync(HF2_CMD_READ_WORDS, args);
            };
            Wrapper.prototype.flashAsync = function (blocks) {
                var _this = this;
                var start = Date.now();
                var fstart = 0;
                var loopAsync = function (pos) {
                    if (pos >= blocks.length)
                        return Promise.resolve();
                    var b = blocks[pos];
                    pxt.U.assert(b.payloadSize == _this.pageSize);
                    var buf = new Uint8Array(4 + b.payloadSize);
                    write32(buf, 0, b.targetAddr);
                    pxt.U.memcpy(buf, 4, b.data, 0, b.payloadSize);
                    return _this.talkAsync(HF2_CMD_WRITE_FLASH_PAGE, buf)
                        .then(function () { return loopAsync(pos + 1); });
                };
                return this.switchToBootloaderAsync()
                    .then(function () {
                    var size = blocks.length * _this.pageSize;
                    log("Starting flash (" + Math.round(size / 1024) + "kB).");
                    fstart = Date.now();
                    return onlyChangedBlocksAsync(blocks, function (a, l) { return _this.readWordsAsync(a, l); });
                })
                    .then(function (res) {
                    if (res.length != blocks.length) {
                        blocks = res;
                        var size = blocks.length * _this.pageSize;
                        log("Performing partial flash (" + Math.round(size / 1024) + "kB).");
                    }
                })
                    .then(function () { return loopAsync(0); })
                    .then(function () {
                    var n = Date.now();
                    var t0 = n - start;
                    var t1 = n - fstart;
                    log("Flashing done at " + Math.round(blocks.length * _this.pageSize / t1 * 1000 / 1024) + " kB/s in " + t0 + "ms (reset " + (t0 - t1) + "ms). Resetting.");
                })
                    .then(function () {
                    return _this.talkAsync(HF2_CMD_RESET_INTO_APP)
                        .catch(function (e) {
                        // error expected here - device is resetting
                    });
                })
                    .then(function () { });
            };
            Wrapper.prototype.initAsync = function () {
                var _this = this;
                return Promise.resolve()
                    .then(function () { return _this.talkAsync(HF2_CMD_BININFO); })
                    .then(function (binfo) {
                    _this.bootloaderMode = binfo[0] == HF2_MODE_BOOTLOADER;
                    _this.pageSize = read32(binfo, 4);
                    _this.flashSize = read32(binfo, 8) * _this.pageSize;
                    _this.maxMsgSize = read32(binfo, 12);
                    log("Connected; msgSize " + _this.maxMsgSize + "B; flash " + _this.flashSize / 1024 + "kB; " + (_this.bootloaderMode ? "bootloader" : "application") + " mode");
                    return _this.talkAsync(HF2_CMD_INFO);
                })
                    .then(function (buf) {
                    _this.infoRaw = pxt.U.fromUTF8(pxt.U.uint8ArrayToString(buf));
                    var info = {};
                    ("Header: " + _this.infoRaw).replace(/^([\w\-]+):\s*([^\n\r]*)/mg, function (f, n, v) {
                        info[n.replace(/-/g, "")] = v;
                        return "";
                    });
                    _this.info = info;
                    var m = /v(\d\S+)\s+(\S+)/.exec(_this.info.Header);
                    _this.info.Parsed = {
                        Version: m[1],
                        Features: m[2],
                    };
                    log("Board-ID: " + _this.info.BoardID);
                })
                    .then(function () {
                    _this.reconnectTries = 0;
                });
            };
            return Wrapper;
        }());
        HF2.Wrapper = Wrapper;
        function readChecksumBlockAsync(readWordsAsync) {
            if (!pxt.appTarget.compile.flashChecksumAddr)
                return Promise.resolve(null);
            return readWordsAsync(pxt.appTarget.compile.flashChecksumAddr, 12)
                .then(function (buf) {
                var blk = pxtc.hex.parseChecksumBlock(buf);
                if (!blk)
                    return null;
                return readWordsAsync(blk.endMarkerPos, 1)
                    .then(function (w) {
                    if (read32(w, 0) != blk.endMarker) {
                        pxt.log("end-marker mismatch");
                        return null;
                    }
                    return blk;
                });
            });
        }
        function onlyChangedBlocksAsync(blocks, readWordsAsync) {
            if (!pxt.appTarget.compile.flashChecksumAddr)
                return Promise.resolve(blocks);
            var blBuf = pxtc.UF2.readBytes(blocks, pxt.appTarget.compile.flashChecksumAddr, 12 * 4);
            var blChk = pxtc.hex.parseChecksumBlock(blBuf);
            if (!blChk)
                return Promise.resolve(blocks);
            return readChecksumBlockAsync(readWordsAsync)
                .then(function (devChk) {
                if (!devChk)
                    return blocks;
                var regionsOk = devChk.regions.filter(function (r) {
                    var hasMatching = blChk.regions.some(function (r2) {
                        return r.checksum == r2.checksum &&
                            r.length == r2.length &&
                            r.start == r2.start;
                    });
                    return hasMatching;
                });
                if (regionsOk.length == 0)
                    return blocks;
                log("skipping flash at: " +
                    regionsOk.map(function (r) {
                        return (pxtc.assembler.tohex(r.start) + " (" + r.length / 1024 + "kB)");
                    })
                        .join(", "));
                var unchangedAddr = function (a) {
                    return regionsOk.some(function (r) { return r.start <= a && a < r.start + r.length; });
                };
                return blocks.filter(function (b) {
                    return !(unchangedAddr(b.targetAddr) &&
                        unchangedAddr(b.targetAddr + b.payloadSize - 1));
                });
            });
        }
        HF2.onlyChangedBlocksAsync = onlyChangedBlocksAsync;
    })(HF2 = pxt.HF2 || (pxt.HF2 = {}));
})(pxt || (pxt = {}));
// see http://semver.org/
var pxt;
(function (pxt) {
    var semver;
    (function (semver) {
        function cmp(a, b) {
            if (!a)
                if (!b)
                    return 0;
                else
                    return 1;
            else if (!b)
                return -1;
            else {
                var d = a.major - b.major || a.minor - b.minor || a.patch - b.patch;
                if (d)
                    return d;
                if (a.pre.length == 0 && b.pre.length > 0)
                    return 1;
                if (a.pre.length > 0 && b.pre.length == 0)
                    return -1;
                for (var i = 0; i < a.pre.length + 1; ++i) {
                    var aa = a.pre[i];
                    var bb = b.pre[i];
                    if (!aa)
                        if (!bb)
                            return 0;
                        else
                            return -1;
                    else if (!bb)
                        return 1;
                    else if (/^\d+$/.test(aa))
                        if (/^\d+$/.test(bb)) {
                            d = parseInt(aa) - parseInt(bb);
                            if (d)
                                return d;
                        }
                        else
                            return -1;
                    else if (/^\d+$/.test(bb))
                        return 1;
                    else {
                        d = pxt.U.strcmp(aa, bb);
                        if (d)
                            return d;
                    }
                }
                return 0;
            }
        }
        semver.cmp = cmp;
        function parse(v) {
            var r = tryParse(v);
            if (!r)
                pxt.U.userError(pxt.U.lf("'{0}' doesn't look like a semantic version number", v));
            return r;
        }
        semver.parse = parse;
        function tryParse(v) {
            if (/^v\d/i.test(v))
                v = v.slice(1);
            var m = /^(\d+)\.(\d+)\.(\d+)(-([0-9a-zA-Z\-\.]+))?(\+([0-9a-zA-Z\-\.]+))?$/.exec(v);
            if (m)
                return {
                    major: parseInt(m[1]),
                    minor: parseInt(m[2]),
                    patch: parseInt(m[3]),
                    pre: m[5] ? m[5].split(".") : [],
                    build: m[7] ? m[7].split(".") : []
                };
            return null;
        }
        semver.tryParse = tryParse;
        function stringify(v) {
            var r = v.major + "." + v.minor + "." + v.patch;
            if (v.pre.length)
                r += "-" + v.pre.join(".");
            if (v.build.length)
                r += "+" + v.build.join(".");
            return r;
        }
        semver.stringify = stringify;
        function strcmp(a, b) {
            var aa = tryParse(a);
            var bb = tryParse(b);
            if (!aa && !bb)
                return pxt.U.strcmp(a, b);
            else
                return cmp(aa, bb);
        }
        semver.strcmp = strcmp;
        function test() {
            console.log("Test semver");
            var d = [
                "0.9.0",
                "1.0.0-0.3.7",
                "1.0.0-alpha", "1.0.0-alpha.1",
                "1.0.0-alpha.beta", "1.0.0-beta",
                "1.0.0-beta.2", "1.0.0-beta.11",
                "1.0.0-rc.1",
                "1.0.0-x.7.z.92",
                "1.0.0",
                "1.0.1",
                "1.9.0", "1.10.0", "1.11.0"
            ];
            for (var i = 0; i < d.length; ++i) {
                var p = parse(d[i]);
                console.log(d[i], p);
                pxt.U.assert(stringify(p) == d[i]);
                for (var j = 0; j < d.length; ++j) {
                    var x = cmp(p, parse(d[j]));
                    console.log(d[i], d[j], x);
                    if (i < j)
                        pxt.U.assert(x < 0);
                    else if (i > j)
                        pxt.U.assert(x > 0);
                    else
                        pxt.U.assert(x == 0);
                }
            }
        }
        semver.test = test;
    })(semver = pxt.semver || (pxt.semver = {}));
})(pxt || (pxt = {}));
var pxt;
(function (pxt) {
    function simshim(prog) {
        var SK = ts.SyntaxKind;
        var checker = prog.getTypeChecker();
        var mainWr = pxt.cpp.nsWriter("declare namespace");
        var currNs = "";
        for (var _i = 0, _a = prog.getSourceFiles(); _i < _a.length; _i++) {
            var src = _a[_i];
            if (!pxt.U.startsWith(src.fileName, "sim/"))
                continue;
            for (var _b = 0, _c = src.statements; _b < _c.length; _b++) {
                var stmt = _c[_b];
                var mod = stmt;
                if (stmt.kind == SK.ModuleDeclaration && mod.name.text == "pxsim") {
                    doStmt(mod.body);
                }
            }
        }
        var res = {};
        res[pxt.appTarget.corepkg] = mainWr.finish();
        return res;
        function typeOf(node) {
            var r;
            if (ts.isExpression(node))
                r = checker.getContextualType(node);
            if (!r)
                r = checker.getTypeAtLocation(node);
            return r;
        }
        /*
        let doSymbol = (sym: ts.Symbol) => {
            if (sym.getFlags() & ts.SymbolFlags.HasExports) {
                typechecker.getExportsOfModule(sym).forEach(doSymbol)
            }
            decls[pxtc.getFullName(typechecker, sym)] = sym
        }
        */
        function emitModuleDeclaration(mod) {
            var prevNs = currNs;
            if (currNs)
                currNs += ".";
            currNs += mod.name.text;
            doStmt(mod.body);
            currNs = prevNs;
        }
        function mapType(tp) {
            var fn = checker.typeToString(tp, null, ts.TypeFormatFlags.UseFullyQualifiedType);
            switch (fn) {
                case "pxsim.RefAction": return "() => void";
                default:
                    return fn.replace(/^pxsim\./, "");
            }
        }
        function promiseElementType(tp) {
            if ((tp.flags & ts.TypeFlags.Reference) && tp.symbol.name == "Promise") {
                return tp.typeArguments[0];
            }
            return null;
        }
        function emitClassDeclaration(cl) {
            var cmts = getExportComments(cl);
            if (!cmts)
                return;
            mainWr.setNs(currNs);
            mainWr.write(cmts);
            var prevNs = currNs;
            if (currNs)
                currNs += ".";
            currNs += cl.name.text;
            mainWr.write("declare class " + cl.name.text + " {");
            mainWr.incrIndent();
            for (var _i = 0, _a = cl.members; _i < _a.length; _i++) {
                var mem = _a[_i];
                switch (mem.kind) {
                    case SK.MethodDeclaration:
                        emitFunctionDeclaration(mem);
                        break;
                    case SK.PropertyDeclaration:
                        emitPropertyDeclaration(mem);
                        break;
                    case SK.Constructor:
                        emitConstructorDeclaration(mem);
                        break;
                    default:
                        break;
                }
            }
            currNs = prevNs;
            mainWr.decrIndent();
            mainWr.write("}");
        }
        function getExportComments(n) {
            var cmts = pxtc.getComments(n);
            if (!/^\s*\/\/%/m.test(cmts))
                return null;
            return cmts;
        }
        function emitPropertyDeclaration(fn) {
            var cmts = getExportComments(fn);
            if (!cmts)
                return;
            var nm = fn.name.getText();
            var attrs = "//% shim=." + nm;
            var tp = checker.getTypeAtLocation(fn);
            mainWr.write(cmts);
            mainWr.write(attrs);
            mainWr.write("public " + nm + ": " + mapType(tp) + ";");
            mainWr.write("");
        }
        function emitConstructorDeclaration(fn) {
            var cmts = getExportComments(fn);
            if (!cmts)
                return;
            var tp = checker.getTypeAtLocation(fn);
            var args = fn.parameters.map(function (p) { return p.name.getText() + ": " + mapType(typeOf(p)); });
            mainWr.write(cmts);
            mainWr.write("//% shim=\"new " + currNs + "\"");
            mainWr.write("constructor(" + args.join(", ") + ");");
            mainWr.write("");
        }
        function emitFunctionDeclaration(fn) {
            var cmts = getExportComments(fn);
            if (!cmts)
                return;
            var fnname = fn.name.getText();
            var isMethod = fn.kind == SK.MethodDeclaration;
            var attrs = "//% shim=" + (isMethod ? "." + fnname : currNs + "::" + fnname);
            var sig = checker.getSignatureFromDeclaration(fn);
            var rettp = checker.getReturnTypeOfSignature(sig);
            var asyncName = /Async$/.test(fnname);
            var prom = promiseElementType(rettp);
            if (prom) {
                attrs += " promise";
                rettp = prom;
                if (!asyncName)
                    pxt.U.userError(currNs + "::" + fnname + " should be called " + fnname + "Async");
            }
            else if (asyncName) {
                pxt.U.userError(currNs + "::" + fnname + " doesn't return a promise");
            }
            var args = fn.parameters.map(function (p) { return ("" + p.name.getText() + (p.questionToken ? "?" : "") + ": " + mapType(typeOf(p))); });
            var localname = fnname.replace(/Async$/, "");
            var defkw = isMethod ? "public" : "function";
            if (!isMethod)
                mainWr.setNs(currNs);
            mainWr.write(cmts);
            mainWr.write(attrs);
            mainWr.write(defkw + " " + localname + "(" + args.join(", ") + "): " + mapType(rettp) + ";");
            mainWr.write("");
        }
        function doStmt(stmt) {
            switch (stmt.kind) {
                case SK.ModuleDeclaration:
                    return emitModuleDeclaration(stmt);
                case SK.ModuleBlock:
                    return stmt.statements.forEach(doStmt);
                case SK.FunctionDeclaration:
                    return emitFunctionDeclaration(stmt);
                case SK.ClassDeclaration:
                    return emitClassDeclaration(stmt);
            }
            //console.log("SKIP", pxtc.stringKind(stmt))
            //let mod = stmt as ts.ModuleDeclaration
            //if (mod.name) console.log(mod.name.text)
            /*
            if (mod.name) {
                let sym = typechecker.getSymbolAtLocation(mod.name)
                if (sym) doSymbol(sym)
            }
            */
        }
    }
    pxt.simshim = simshim;
})(pxt || (pxt = {}));
// See https://github.com/Microsoft/TouchDevelop-backend/blob/master/docs/streams.md
var pxt;
(function (pxt) {
    var streams;
    (function (streams) {
        function createStreamAsync(target, name) {
            return pxt.Cloud.privatePostAsync("streams", { target: target, name: name || 'data' }).then(function (j) { return j; });
        }
        streams.createStreamAsync = createStreamAsync;
        function postPayloadAsync(stream, data) {
            pxt.Util.assert(!!stream.privatekey);
            return pxt.Cloud.privatePostAsync(stream.id + "/data?privatekey=" + stream.privatekey, data);
        }
        streams.postPayloadAsync = postPayloadAsync;
    })(streams = pxt.streams || (pxt.streams = {}));
})(pxt || (pxt = {}));
var pxt;
(function (pxt) {
    var usb;
    (function (usb) {
        var USBError = (function (_super) {
            __extends(USBError, _super);
            function USBError(msg) {
                _super.call(this, msg);
                this.message = msg;
            }
            return USBError;
        }(Error));
        usb.USBError = USBError;
        ;
        ;
        ;
        var HID = (function () {
            function HID(dev) {
                this.dev = dev;
                this.ready = false;
                this.onData = function (v) { };
                this.onError = function (e) { };
                this.readLoop();
            }
            HID.prototype.error = function (msg) {
                throw new USBError(pxt.U.lf("USB error on device {0} ({1})", this.dev.productName, msg));
            };
            HID.prototype.reconnectAsync = function () {
                var _this = this;
                this.ready = false;
                return this.dev.close()
                    .then(function () { return Promise.delay(500); })
                    .then(requestDeviceAsync)
                    .then(function (dev) {
                    _this.dev = dev;
                    return _this.initAsync();
                });
            };
            HID.prototype.sendPacketAsync = function (pkt) {
                var _this = this;
                pxt.Util.assert(pkt.length <= 64);
                return this.dev.transferOut(this.epOut.endpointNumber, pkt)
                    .then(function (res) {
                    if (res.status != "ok")
                        _this.error("USB OUT transfer failed");
                });
            };
            HID.prototype.readLoop = function () {
                var _this = this;
                var loop = function () {
                    if (!_this.ready)
                        Promise.delay(300).then(loop);
                    else
                        _this.recvPacketAsync()
                            .then(function (buf) {
                            _this.onData(buf);
                            loop();
                        }, function (err) {
                            _this.onError(err);
                            Promise.delay(300).then(loop);
                        });
                };
                loop();
            };
            HID.prototype.recvPacketAsync = function () {
                var _this = this;
                return this.dev.transferIn(this.epIn.endpointNumber, 64)
                    .then(function (res) {
                    if (res.status != "ok")
                        _this.error("USB IN transfer failed");
                    var arr = new Uint8Array(res.data.buffer);
                    if (arr.length == 0)
                        return _this.recvPacketAsync();
                    return arr;
                });
            };
            HID.prototype.initAsync = function () {
                var _this = this;
                var dev = this.dev;
                return dev.open()
                    .then(function () { return dev.selectConfiguration(1); })
                    .then(function () {
                    var isHID = function (iface) {
                        return iface.alternates[0].interfaceClass == 0xff &&
                            iface.alternates[0].interfaceSubclass == 42;
                    };
                    //iface.alternates[0].endpoints[0].type == "interrupt";
                    var hid = dev.configurations[0].interfaces.filter(isHID)[0];
                    if (!hid)
                        _this.error("cannot find USB HID interface");
                    _this.altIface = hid.alternates[0];
                    _this.epIn = _this.altIface.endpoints.filter(function (e) { return e.direction == "in"; })[0];
                    _this.epOut = _this.altIface.endpoints.filter(function (e) { return e.direction == "out"; })[0];
                    pxt.Util.assert(_this.epIn.packetSize == 64);
                    pxt.Util.assert(_this.epOut.packetSize == 64);
                    //Util.assert(this.epIn.type == "interrupt");
                    //Util.assert(this.epOut.type == "interrupt");
                    //console.log("USB-device", dev)
                    return dev.claimInterface(hid.interfaceNumber);
                })
                    .then(function () { _this.ready = true; });
            };
            return HID;
        }());
        function requestDeviceAsync() {
            return navigator.usb.requestDevice({ filters: [] });
        }
        function getHidAsync() {
            return requestDeviceAsync()
                .then(function (dev) {
                var h = new HID(dev);
                return h.initAsync()
                    .then(function () { return h; });
            });
        }
        function hf2Async() {
            return getHidAsync()
                .then(function (h) {
                var w = new pxt.HF2.Wrapper(h);
                return w.reconnectAsync(true)
                    .then(function () { return w; });
            });
        }
        var initPromise;
        function initAsync() {
            if (!initPromise)
                initPromise = hf2Async();
            return initPromise;
        }
        usb.initAsync = initAsync;
    })(usb = pxt.usb || (pxt.usb = {}));
})(pxt || (pxt = {}));
// TODO: add a macro facility to make 8-bit assembly easier?
var ts;
(function (ts) {
    var pxtc;
    (function (pxtc) {
        var assembler;
        (function (assembler) {
            function lf(fmt) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                return fmt.replace(/{(\d+)}/g, function (match, index) { return args[+index]; });
            }
            assembler.lf = lf;
            var badNameError = emitErr("opcode name doesn't match", "<name>");
            // An Instruction represents an instruction class with meta-variables
            // that should be substituted given an actually line (Line) of assembly
            // Thus, the Instruction helps us parse a sequence of tokens in a Line
            // as well as extract the relevant values to substitute for the meta-variables.
            // The Instruction also knows how to convert the particular instance into
            // machine code (EmitResult)
            var Instruction = (function () {
                function Instruction(ei, format, opcode, mask, jsFormat) {
                    var _this = this;
                    this.opcode = opcode;
                    this.mask = mask;
                    this.jsFormat = jsFormat;
                    pxtc.assert((opcode & mask) == opcode);
                    this.ei = ei;
                    this.code = format.replace(/\s+/g, " ");
                    this.friendlyFmt = format.replace(/\$\w+/g, function (m) {
                        if (_this.ei.encoders[m])
                            return _this.ei.encoders[m].pretty;
                        return m;
                    });
                    var words = tokenize(format);
                    this.name = words[0];
                    this.args = words.slice(1);
                    // a bit of a hack here...
                    this.is32bit = (jsFormat != undefined);
                }
                Instruction.prototype.emit = function (ln) {
                    var tokens = ln.words;
                    if (tokens[0] != this.name)
                        return badNameError;
                    var r = this.opcode;
                    var j = 1;
                    var stack = 0;
                    var numArgs = [];
                    var labelName = null;
                    var bit32_value = null;
                    var bit32_actual = null;
                    for (var i = 0; i < this.args.length; ++i) {
                        var formal = this.args[i];
                        var actual = tokens[j++];
                        if (formal[0] == "$") {
                            var enc = this.ei.encoders[formal];
                            var v = null;
                            if (enc.isRegister) {
                                v = this.ei.registerNo(actual);
                                if (v == null)
                                    return emitErr("expecting register name", actual);
                                if (this.ei.isPush(this.opcode))
                                    stack++;
                                else if (this.ei.isPop(this.opcode))
                                    stack--;
                            }
                            else if (enc.isImmediate) {
                                actual = actual.replace(/^#/, "");
                                v = ln.bin.parseOneInt(actual);
                                if (v == null) {
                                    return emitErr("expecting number", actual);
                                }
                                else {
                                    // explicit manipulation of stack pointer (SP)
                                    // ARM only
                                    if (this.ei.isAddSP(this.opcode))
                                        stack = -(v / this.ei.wordSize());
                                    else if (this.ei.isSubSP(this.opcode))
                                        stack = (v / this.ei.wordSize());
                                }
                            }
                            else if (enc.isRegList) {
                                // register lists are ARM-specific - this code not used in AVR 
                                if (actual != "{")
                                    return emitErr("expecting {", actual);
                                v = 0;
                                while (tokens[j] != "}") {
                                    actual = tokens[j++];
                                    if (!actual)
                                        return emitErr("expecting }", tokens[j - 2]);
                                    var no = this.ei.registerNo(actual);
                                    if (no == null)
                                        return emitErr("expecting register name", actual);
                                    if (v & (1 << no))
                                        return emitErr("duplicate register name", actual);
                                    v |= (1 << no);
                                    if (this.ei.isPush(this.opcode))
                                        stack++;
                                    else if (this.ei.isPop(this.opcode))
                                        stack--;
                                    if (tokens[j] == ",")
                                        j++;
                                }
                                actual = tokens[j++]; // skip close brace
                            }
                            else if (enc.isLabel) {
                                actual = actual.replace(/^#/, "");
                                if (/^[+-]?\d+$/.test(actual)) {
                                    v = parseInt(actual, 10);
                                    labelName = "rel" + v;
                                }
                                else if (/^0x[0-9a-fA-F]+$/.test(actual)) {
                                    v = parseInt(actual, 16);
                                    labelName = "abs" + v;
                                }
                                else {
                                    labelName = actual;
                                    v = this.ei.getAddressFromLabel(ln.bin, this, actual, enc.isWordAligned);
                                    if (v == null) {
                                        if (ln.bin.finalEmit)
                                            return emitErr("unknown label", actual);
                                        else
                                            // just need some value when we are 
                                            // doing some pass other than finalEmit
                                            v = 8; // needs to be divisible by 4 etc
                                    }
                                }
                                if (this.ei.is32bit(this)) {
                                    // console.log(actual + " " + v.toString())
                                    bit32_value = v;
                                    bit32_actual = actual;
                                    continue;
                                }
                            }
                            else {
                                pxtc.oops();
                            }
                            if (v == null)
                                return emitErr("didn't understand it", actual); // shouldn't happen
                            numArgs.push(v);
                            v = enc.encode(v);
                            // console.log("enc(v) = ",v)
                            if (v == null)
                                return emitErr("argument out of range or mis-aligned", actual);
                            pxtc.assert((r & v) == 0);
                            r |= v;
                        }
                        else if (formal == actual) {
                        }
                        else {
                            return emitErr("expecting " + formal, actual);
                        }
                    }
                    if (tokens[j])
                        return emitErr("trailing tokens", tokens[j]);
                    if (this.ei.is32bit(this)) {
                        return this.ei.emit32(r, bit32_value, ln.bin.normalizeExternalLabel(bit32_actual));
                    }
                    return {
                        stack: stack,
                        opcode: r,
                        numArgs: numArgs,
                        labelName: ln.bin.normalizeExternalLabel(labelName)
                    };
                };
                Instruction.prototype.toString = function () {
                    return this.friendlyFmt;
                };
                return Instruction;
            }());
            assembler.Instruction = Instruction;
            // represents a line of assembly from a file
            var Line = (function () {
                function Line(bin, text) {
                    this.bin = bin;
                    this.text = text;
                }
                Line.prototype.getOpExt = function () {
                    return this.instruction ? this.instruction.code : "";
                };
                Line.prototype.getOp = function () {
                    return this.instruction ? this.instruction.name : "";
                };
                Line.prototype.update = function (s) {
                    this.bin.peepOps++;
                    s = s.replace(/^\s*/, "");
                    if (!s)
                        this.bin.peepDel++;
                    if (s)
                        s += "      ";
                    s = "    " + s;
                    this.text = s + "; WAS: " + this.text.trim();
                    this.instruction = null;
                    this.numArgs = null;
                    this.words = tokenize(s) || [];
                    if (this.words.length == 0)
                        this.type = "empty";
                };
                return Line;
            }());
            assembler.Line = Line;
            // File is the center of the action: parsing a file into a sequence of Lines
            // and also emitting the binary (buf)
            var File = (function () {
                function File(ei) {
                    this.baseOffset = 0;
                    this.checkStack = true;
                    this.inlineMode = false;
                    this.normalizeExternalLabel = function (n) { return n; };
                    this.currLineNo = 0;
                    this.scope = "";
                    this.scopeId = 0;
                    this.errors = [];
                    this.labels = {};
                    this.stackpointers = {};
                    this.stack = 0;
                    this.peepOps = 0;
                    this.peepDel = 0;
                    this.stats = "";
                    this.throwOnError = false;
                    this.disablePeepHole = false;
                    this.stackAtLabel = {};
                    this.currLine = new Line(this, "<start>");
                    this.currLine.lineNo = 0;
                    this.ei = ei;
                    this.ei.file = this;
                }
                File.prototype.emitShort = function (op) {
                    pxtc.assert(0 <= op && op <= 0xffff);
                    this.buf.push(op);
                };
                File.prototype.location = function () {
                    // store one short (2 bytes) per buf location
                    return this.buf.length * 2;
                };
                File.prototype.pc = function () {
                    return this.location() + this.baseOffset;
                };
                // parsing of an "integer", well actually much more than 
                // just that
                File.prototype.parseOneInt = function (s) {
                    if (!s)
                        return null;
                    if (s == "0")
                        return 0;
                    var mul = 1;
                    // recursive-descent parsing of multiplication
                    if (s.indexOf("*") >= 0) {
                        var m_1 = null;
                        while (m_1 = /^([^\*]*)\*(.*)$/.exec(s)) {
                            var tmp = this.parseOneInt(m_1[1]);
                            if (tmp == null)
                                return null;
                            mul *= tmp;
                            s = m_1[2];
                        }
                    }
                    if (s[0] == "-") {
                        mul *= -1;
                        s = s.slice(1);
                    }
                    else if (s[0] == "+") {
                        s = s.slice(1);
                    }
                    var v = null;
                    // allow or'ing of 1 to least-signficant bit
                    if (pxtc.U.endsWith(s, "|1")) {
                        return this.parseOneInt(s.slice(0, s.length - 2)) | 1;
                    }
                    // allow subtracting 1 too
                    if (pxtc.U.endsWith(s, "-1")) {
                        return this.parseOneInt(s.slice(0, s.length - 2)) - 1;
                    }
                    // handle hexadecimal and binary encodings
                    if (s[0] == "0") {
                        if (s[1] == "x" || s[1] == "X") {
                            var m_2 = /^0x([a-f0-9]+)$/i.exec(s);
                            if (m_2)
                                v = parseInt(m_2[1], 16);
                        }
                        else if (s[1] == "b" || s[1] == "B") {
                            var m_3 = /^0b([01]+)$/i.exec(s);
                            if (m_3)
                                v = parseInt(m_3[1], 2);
                        }
                    }
                    // decimal encoding
                    var m = /^(\d+)$/i.exec(s);
                    if (m)
                        v = parseInt(m[1], 10);
                    // stack-specific processing
                    // more special characters to handle
                    if (s.indexOf("@") >= 0) {
                        m = /^(\w+)@(-?\d+)$/.exec(s);
                        if (m) {
                            if (mul != 1)
                                this.directiveError(lf("multiplication not supported with saved stacks"));
                            if (this.stackpointers.hasOwnProperty(m[1])) {
                                // console.log(m[1] + ": " + this.stack + " " + this.stackpointers[m[1]] + " " + m[2])
                                v = this.ei.wordSize() * this.ei.computeStackOffset(m[1], this.stack - this.stackpointers[m[1]] + parseInt(m[2]));
                            }
                            else
                                this.directiveError(lf("saved stack not found"));
                        }
                        m = /^(.*)@(hi|lo)$/.exec(s);
                        if (m && this.looksLikeLabel(m[1])) {
                            v = this.lookupLabel(m[1], true);
                            if (v != null) {
                                v >>= 1;
                                if (0 <= v && v <= 0xffff) {
                                    if (m[2] == "hi")
                                        v = (v >> 8) & 0xff;
                                    else if (m[2] == "lo")
                                        v = v & 0xff;
                                    else
                                        pxtc.oops();
                                }
                                else {
                                    this.directiveError(lf("@hi/lo out of range"));
                                    v = null;
                                }
                            }
                        }
                    }
                    if (v == null && this.looksLikeLabel(s)) {
                        v = this.lookupLabel(s, true);
                        if (v != null)
                            v += this.baseOffset;
                    }
                    if (v == null || isNaN(v))
                        return null;
                    return v * mul;
                };
                File.prototype.looksLikeLabel = function (name) {
                    if (/^(r\d|pc|sp|lr)$/i.test(name))
                        return false;
                    return /^[\.a-zA-Z_][\.:\w+]*$/.test(name);
                };
                File.prototype.scopedName = function (name) {
                    if (name[0] == "." && this.scope)
                        return this.scope + "$" + name;
                    else
                        return name;
                };
                File.prototype.lookupLabel = function (name, direct) {
                    if (direct === void 0) { direct = false; }
                    var v = null;
                    var scoped = this.scopedName(name);
                    if (this.labels.hasOwnProperty(scoped)) {
                        v = this.labels[scoped];
                        v = this.ei.postProcessRelAddress(this, v);
                    }
                    else if (this.lookupExternalLabel) {
                        v = this.lookupExternalLabel(name);
                        if (v != null) {
                            v = this.ei.postProcessAbsAddress(this, v);
                        }
                    }
                    if (v == null && direct) {
                        if (this.finalEmit)
                            this.directiveError(lf("unknown label: {0}", name));
                        else
                            v = 42;
                    }
                    return v;
                };
                File.prototype.align = function (n) {
                    pxtc.assert(n == 2 || n == 4 || n == 8 || n == 16);
                    while (this.location() % n != 0)
                        this.emitShort(0);
                };
                File.prototype.pushError = function (msg, hints) {
                    if (hints === void 0) { hints = ""; }
                    var err = {
                        scope: this.scope,
                        message: lf("  -> Line {2} ('{1}'), error: {0}\n{3}", msg, this.currLine.text, this.currLine.lineNo, hints),
                        lineNo: this.currLine.lineNo,
                        line: this.currLine.text,
                        coremsg: msg,
                        hints: hints
                    };
                    this.errors.push(err);
                    if (this.throwOnError)
                        throw new Error(err.message);
                };
                File.prototype.directiveError = function (msg) {
                    this.pushError(msg);
                    // this.pushError(lf("directive error: {0}", msg))
                };
                File.prototype.emitString = function (l) {
                    function byteAt(s, i) { return (s.charCodeAt(i) || 0) & 0xff; }
                    var m = /^\s*([\w\.]+\s*:\s*)?.\w+\s+(".*")\s*$/.exec(l);
                    var s;
                    if (!m || null == (s = parseString(m[2]))) {
                        this.directiveError(lf("expecting string"));
                    }
                    else {
                        this.align(2);
                        // s.length + 1 to NUL terminate
                        for (var i = 0; i < s.length + 1; i += 2) {
                            this.emitShort((byteAt(s, i + 1) << 8) | byteAt(s, i));
                        }
                    }
                };
                File.prototype.parseNumber = function (words) {
                    var v = this.parseOneInt(words.shift());
                    if (v == null)
                        return null;
                    return v;
                };
                File.prototype.parseNumbers = function (words) {
                    words = words.slice(1);
                    var nums = [];
                    while (true) {
                        var n = this.parseNumber(words);
                        if (n == null) {
                            this.directiveError(lf("cannot parse number at '{0}'", words[0]));
                            break;
                        }
                        else
                            nums.push(n);
                        if (words[0] == ",") {
                            words.shift();
                            if (words[0] == null)
                                break;
                        }
                        else if (words[0] == null) {
                            break;
                        }
                        else {
                            this.directiveError(lf("expecting number, got '{0}'", words[0]));
                            break;
                        }
                    }
                    return nums;
                };
                File.prototype.emitSpace = function (words) {
                    var nums = this.parseNumbers(words);
                    if (nums.length == 1)
                        nums.push(0);
                    if (nums.length != 2)
                        this.directiveError(lf("expecting one or two numbers"));
                    else if (nums[0] % 2 != 0)
                        this.directiveError(lf("only even space supported"));
                    else {
                        var f = nums[1] & 0xff;
                        f = f | (f << 8);
                        for (var i = 0; i < nums[0]; i += 2)
                            this.emitShort(f);
                    }
                };
                File.prototype.emitBytes = function (words) {
                    var nums = this.parseNumbers(words);
                    if (nums.length % 2 != 0) {
                        this.directiveError(".bytes needs an even number of arguments");
                        nums.push(0);
                    }
                    for (var i = 0; i < nums.length; i += 2) {
                        var n0 = nums[i];
                        var n1 = nums[i + 1];
                        if (0 <= n0 && n1 <= 0xff &&
                            0 <= n1 && n0 <= 0xff)
                            this.emitShort((n0 & 0xff) | ((n1 & 0xff) << 8));
                        else
                            this.directiveError(lf("expecting uint8"));
                    }
                };
                File.prototype.emitHex = function (words) {
                    var _this = this;
                    words.slice(1).forEach(function (w) {
                        if (w == ",")
                            return;
                        // TODO: why 4 and not 2?
                        if (w.length % 4 != 0)
                            _this.directiveError(".hex needs an even number of bytes");
                        else if (!/^[a-f0-9]+$/i.test(w))
                            _this.directiveError(".hex needs a hex number");
                        else
                            for (var i = 0; i < w.length; i += 4) {
                                var n = parseInt(w.slice(i, i + 4), 16);
                                n = ((n & 0xff) << 8) | ((n >> 8) & 0xff);
                                _this.emitShort(n);
                            }
                    });
                };
                File.prototype.handleDirective = function (l) {
                    var _this = this;
                    var words = l.words;
                    var expectOne = function () {
                        if (words.length != 2)
                            _this.directiveError(lf("expecting one argument"));
                    };
                    var num0;
                    switch (words[0]) {
                        case ".ascii":
                        case ".asciz":
                        case ".string":
                            this.emitString(l.text);
                            break;
                        case ".align":
                            expectOne();
                            num0 = this.parseOneInt(words[1]);
                            if (num0 != null) {
                                if (num0 == 0)
                                    return;
                                if (num0 <= 4) {
                                    this.align(1 << num0);
                                }
                                else {
                                    this.directiveError(lf("expecting 1, 2, 3 or 4 (for 2, 4, 8, or 16 byte alignment)"));
                                }
                            }
                            else
                                this.directiveError(lf("expecting number"));
                            break;
                        case ".balign":
                            expectOne();
                            num0 = this.parseOneInt(words[1]);
                            if (num0 != null) {
                                if (num0 == 1)
                                    return;
                                if (num0 == 2 || num0 == 4 || num0 == 8 || num0 == 16) {
                                    this.align(num0);
                                }
                                else {
                                    this.directiveError(lf("expecting 2, 4, 8, or 16"));
                                }
                            }
                            else
                                this.directiveError(lf("expecting number"));
                            break;
                        case ".byte":
                            this.emitBytes(words);
                            break;
                        case ".hex":
                            this.emitHex(words);
                            break;
                        case ".hword":
                        case ".short":
                        case ".2bytes":
                            this.parseNumbers(words).forEach(function (n) {
                                // we allow negative numbers
                                if (-0x8000 <= n && n <= 0xffff)
                                    _this.emitShort(n & 0xffff);
                                else
                                    _this.directiveError(lf("expecting int16"));
                            });
                            break;
                        case ".word":
                        case ".4bytes":
                            // TODO: a word is machine-dependent (16-bit for AVR, 32-bit for ARM)
                            this.parseNumbers(words).forEach(function (n) {
                                // we allow negative numbers
                                if (-0x80000000 <= n && n <= 0xffffffff) {
                                    _this.emitShort(n & 0xffff);
                                    _this.emitShort((n >> 16) & 0xffff);
                                }
                                else {
                                    _this.directiveError(lf("expecting int32"));
                                }
                            });
                            break;
                        case ".skip":
                        case ".space":
                            this.emitSpace(words);
                            break;
                        case ".startaddr":
                            if (this.location())
                                this.directiveError(lf(".startaddr can be only be specified at the beginning of the file"));
                            expectOne();
                            this.baseOffset = this.parseOneInt(words[1]);
                            break;
                        // The usage for this is as follows:
                        // push {...}
                        // @stackmark locals   ; locals := sp
                        // ... some push/pops ...
                        // ldr r0, [pc, locals@3] ; load local number 3
                        // ... some push/pops ...
                        // @stackempty locals ; expect an empty stack here
                        case "@stackmark":
                            expectOne();
                            this.stackpointers[words[1]] = this.stack;
                            break;
                        case "@stackempty":
                            if (this.stackpointers[words[1]] == null)
                                this.directiveError(lf("no such saved stack"));
                            else if (this.stackpointers[words[1]] != this.stack)
                                this.directiveError(lf("stack mismatch"));
                            break;
                        case "@scope":
                            this.scope = words[1] || "";
                            this.currLineNo = this.scope ? 0 : this.realCurrLineNo;
                            break;
                        case "@nostackcheck":
                            this.checkStack = false;
                            break;
                        case "@dummystack":
                            expectOne();
                            this.stack += this.parseOneInt(words[1]);
                            break;
                        case ".section":
                        case ".global":
                            this.stackpointers = {};
                            this.stack = 0;
                            this.scope = "$S" + this.scopeId++;
                            break;
                        case ".file":
                        case ".text":
                        case ".cpu":
                        case ".fpu":
                        case ".eabi_attribute":
                        case ".code":
                        case ".thumb_func":
                        case ".type":
                            break;
                        case "@":
                            // @ sp needed
                            break;
                        default:
                            if (/^\.cfi_/.test(words[0])) {
                            }
                            else {
                                this.directiveError(lf("unknown directive"));
                            }
                            break;
                    }
                };
                File.prototype.handleOneInstruction = function (ln, instr) {
                    var op = instr.emit(ln);
                    if (!op.error) {
                        this.stack += op.stack;
                        if (this.checkStack && this.stack < 0)
                            this.pushError(lf("stack underflow"));
                        ln.location = this.location();
                        this.emitShort(op.opcode);
                        if (op.opcode2 != null)
                            this.emitShort(op.opcode2);
                        ln.instruction = instr;
                        ln.numArgs = op.numArgs;
                        return true;
                    }
                    return false;
                };
                File.prototype.handleInstruction = function (ln) {
                    var _this = this;
                    if (ln.instruction) {
                        if (this.handleOneInstruction(ln, ln.instruction))
                            return;
                    }
                    var getIns = function (n) { return _this.ei.instructions.hasOwnProperty(n) ? _this.ei.instructions[n] : []; };
                    if (!ln.instruction) {
                        var ins = getIns(ln.words[0]);
                        for (var i = 0; i < ins.length; ++i) {
                            if (this.handleOneInstruction(ln, ins[i]))
                                return;
                        }
                    }
                    var w0 = ln.words[0].toLowerCase().replace(/s$/, "").replace(/[^a-z]/g, "");
                    var hints = "";
                    var possibilities = getIns(w0).concat(getIns(w0 + "s"));
                    if (possibilities.length > 0) {
                        possibilities.forEach(function (i) {
                            var err = i.emit(ln);
                            hints += lf("   Maybe: {0} ({1} at '{2}')\n", i.toString(), err.error, err.errorAt);
                        });
                    }
                    this.pushError(lf("assembly error"), hints);
                };
                File.prototype.mkLine = function (tx) {
                    var l = new Line(this, tx);
                    l.scope = this.scope;
                    l.lineNo = this.currLineNo;
                    this.lines.push(l);
                    return l;
                };
                File.prototype.prepLines = function (text) {
                    var _this = this;
                    this.currLineNo = 0;
                    this.realCurrLineNo = 0;
                    this.lines = [];
                    text.split(/\r?\n/).forEach(function (tx) {
                        if (_this.errors.length > 10)
                            return;
                        _this.currLineNo++;
                        _this.realCurrLineNo++;
                        var l = _this.mkLine(tx);
                        var words = tokenize(l.text) || [];
                        l.words = words;
                        var w0 = words[0] || "";
                        if (w0.charAt(w0.length - 1) == ":") {
                            var m = /^([\.\w]+):$/.exec(words[0]);
                            if (m) {
                                l.type = "label";
                                l.text = m[1] + ":";
                                l.words = [m[1]];
                                if (words.length > 1) {
                                    words.shift();
                                    l = _this.mkLine(tx.replace(/^[^:]*:/, ""));
                                    l.words = words;
                                    w0 = words[0] || "";
                                }
                                else {
                                    return;
                                }
                            }
                        }
                        var c0 = w0.charAt(0);
                        if (c0 == "." || c0 == "@") {
                            l.type = "directive";
                            if (l.words[0] == "@scope")
                                _this.handleDirective(l);
                        }
                        else {
                            if (l.words.length == 0)
                                l.type = "empty";
                            else
                                l.type = "instruction";
                        }
                    });
                };
                File.prototype.iterLines = function () {
                    var _this = this;
                    this.stack = 0;
                    this.buf = [];
                    this.scopeId = 0;
                    this.lines.forEach(function (l) {
                        if (_this.errors.length > 10)
                            return;
                        _this.currLine = l;
                        if (l.words.length == 0)
                            return;
                        if (l.type == "label") {
                            var lblname = _this.scopedName(l.words[0]);
                            _this.prevLabel = lblname;
                            if (_this.finalEmit) {
                                var curr = _this.labels[lblname];
                                if (curr == null)
                                    pxtc.oops();
                                pxtc.assert(_this.errors.length > 0 || curr == _this.location());
                                if (_this.reallyFinalEmit) {
                                    _this.stackAtLabel[lblname] = _this.stack;
                                }
                            }
                            else {
                                if (_this.labels.hasOwnProperty(lblname))
                                    _this.directiveError(lf("label redefinition"));
                                else if (_this.inlineMode && /^_/.test(lblname))
                                    _this.directiveError(lf("labels starting with '_' are reserved for the compiler"));
                                else {
                                    _this.labels[lblname] = _this.location();
                                }
                            }
                        }
                        else if (l.type == "directive") {
                            _this.handleDirective(l);
                        }
                        else if (l.type == "instruction") {
                            _this.handleInstruction(l);
                        }
                        else if (l.type == "empty") {
                        }
                        else {
                            pxtc.oops();
                        }
                    });
                };
                File.prototype.getSource = function (clean) {
                    var _this = this;
                    var lenTotal = this.buf ? this.buf.length * 2 : 0;
                    var lenThumb = this.labels["_program_end"] || lenTotal;
                    var res = 
                    // ARM-specific
                    lf("; thumb size: {0} bytes; src size {1} bytes\n", lenThumb, lenTotal - lenThumb) +
                        lf("; assembly: {0} lines\n", this.lines.length) +
                        this.stats + "\n\n";
                    var skipOne = false;
                    this.lines.forEach(function (ln, i) {
                        if (ln.words[0] == "_stored_program") {
                            res += "_stored_program: .string \"...\"\n";
                            skipOne = true;
                            return;
                        }
                        if (skipOne) {
                            skipOne = false;
                            return;
                        }
                        var text = ln.text;
                        if (clean) {
                            if (ln.words[0] == "@stackempty" &&
                                _this.lines[i - 1].text == ln.text)
                                return;
                            text = text.replace(/; WAS: .*/, "");
                            if (!text.trim())
                                return;
                        }
                        res += text + "\n";
                    });
                    return res;
                };
                File.prototype.peepHole = function () {
                    // TODO add: str X; ldr X -> str X ?
                    var mylines = this.lines.filter(function (l) { return l.type != "empty"; });
                    for (var i = 0; i < mylines.length; ++i) {
                        var ln = mylines[i];
                        if (/^user/.test(ln.scope))
                            continue;
                        var lnNext = mylines[i + 1];
                        if (!lnNext)
                            continue;
                        var lnNext2 = mylines[i + 2];
                        if (ln.type == "instruction") {
                            this.ei.peephole(ln, lnNext, lnNext2);
                        }
                    }
                };
                File.prototype.peepPass = function (reallyFinal) {
                    if (this.disablePeepHole)
                        return;
                    this.peepOps = 0;
                    this.peepDel = 0;
                    this.peepHole();
                    this.throwOnError = true;
                    this.finalEmit = false;
                    this.labels = {};
                    this.iterLines();
                    pxtc.assert(!this.checkStack || this.stack == 0);
                    this.finalEmit = true;
                    this.reallyFinalEmit = reallyFinal || this.peepOps == 0;
                    this.iterLines();
                    this.stats += lf("; peep hole pass: {0} instructions removed and {1} updated\n", this.peepDel, this.peepOps - this.peepDel);
                };
                File.prototype.getLabels = function () {
                    var _this = this;
                    if (!this.userLabelsCache)
                        this.userLabelsCache = pxtc.U.mapMap(this.labels, function (k, v) { return v + _this.baseOffset; });
                    return this.userLabelsCache;
                };
                File.prototype.emit = function (text) {
                    pxtc.assert(this.buf == null);
                    this.prepLines(text);
                    if (this.errors.length > 0)
                        return;
                    this.labels = {};
                    this.iterLines();
                    if (this.checkStack && this.stack != 0)
                        this.directiveError(lf("stack misaligned at the end of the file"));
                    if (this.errors.length > 0)
                        return;
                    this.finalEmit = true;
                    this.reallyFinalEmit = this.disablePeepHole;
                    this.iterLines();
                    if (this.errors.length > 0)
                        return;
                    var maxPasses = 5;
                    for (var i = 0; i < maxPasses; ++i) {
                        this.peepPass(i == maxPasses);
                        if (this.peepOps == 0)
                            break;
                    }
                };
                return File;
            }());
            assembler.File = File;
            // an assembler provider must inherit from this
            // class and provide Encoders and Instructions
            var AbstractProcessor = (function () {
                function AbstractProcessor() {
                    var _this = this;
                    this.file = null;
                    this.addEnc = function (n, p, e) {
                        var ee = {
                            name: n,
                            pretty: p,
                            encode: e,
                            isRegister: /^\$r\d/.test(n),
                            isImmediate: /^\$i\d/.test(n),
                            isRegList: /^\$rl\d/.test(n),
                            isLabel: /^\$l[a-z]/.test(n),
                        };
                        _this.encoders[n] = ee;
                        return ee;
                    };
                    this.inrange = function (max, v, e) {
                        if (Math.floor(v) != v)
                            return null;
                        if (v < 0)
                            return null;
                        if (v > max)
                            return null;
                        return e;
                    };
                    this.inminmax = function (min, max, v, e) {
                        if (Math.floor(v) != v)
                            return null;
                        if (v < min)
                            return null;
                        if (v > max)
                            return null;
                        return e;
                    };
                    this.inseq = function (seq, v) {
                        var ind = seq.indexOf(v);
                        if (ind < 0)
                            return null;
                        return ind;
                    };
                    this.inrangeSigned = function (max, v, e) {
                        if (Math.floor(v) != v)
                            return null;
                        if (v < -(max + 1))
                            return null;
                        if (v > max)
                            return null;
                        var mask = (max << 1) | 1;
                        return e & mask;
                    };
                    this.addInst = function (name, code, mask, jsFormat) {
                        var ins = new Instruction(_this, name, code, mask, jsFormat);
                        if (!_this.instructions.hasOwnProperty(ins.name))
                            _this.instructions[ins.name] = [];
                        _this.instructions[ins.name].push(ins);
                    };
                    this.encoders = {};
                    this.instructions = {};
                }
                AbstractProcessor.prototype.wordSize = function () {
                    return -1;
                };
                AbstractProcessor.prototype.computeStackOffset = function (kind, offset) {
                    return offset;
                };
                AbstractProcessor.prototype.is32bit = function (i) {
                    return false;
                };
                AbstractProcessor.prototype.emit32 = function (v1, v2, actual) {
                    return null;
                };
                AbstractProcessor.prototype.postProcessRelAddress = function (f, v) {
                    return v;
                };
                AbstractProcessor.prototype.postProcessAbsAddress = function (f, v) {
                    return v;
                };
                AbstractProcessor.prototype.peephole = function (ln, lnNext, lnNext2) {
                    return;
                };
                AbstractProcessor.prototype.registerNo = function (actual) {
                    return null;
                };
                AbstractProcessor.prototype.getAddressFromLabel = function (f, i, s, wordAligned) {
                    if (wordAligned === void 0) { wordAligned = false; }
                    return null;
                };
                AbstractProcessor.prototype.isPop = function (opcode) {
                    return false;
                };
                AbstractProcessor.prototype.isPush = function (opcode) {
                    return false;
                };
                AbstractProcessor.prototype.isAddSP = function (opcode) {
                    return false;
                };
                AbstractProcessor.prototype.isSubSP = function (opcode) {
                    return false;
                };
                AbstractProcessor.prototype.testAssembler = function () {
                    pxtc.assert(false);
                };
                return AbstractProcessor;
            }());
            assembler.AbstractProcessor = AbstractProcessor;
            // utility functions
            function tokenize(line) {
                var words = [];
                var w = "";
                loop: for (var i = 0; i < line.length; ++i) {
                    switch (line[i]) {
                        case "[":
                        case "]":
                        case "!":
                        case "{":
                        case "}":
                        case ",":
                            if (w) {
                                words.push(w);
                                w = "";
                            }
                            words.push(line[i]);
                            break;
                        case " ":
                        case "\t":
                        case "\r":
                        case "\n":
                            if (w) {
                                words.push(w);
                                w = "";
                            }
                            break;
                        case ";":
                            // drop the trailing comment
                            break loop;
                        default:
                            w += line[i];
                            break;
                    }
                }
                if (w) {
                    words.push(w);
                    w = "";
                }
                if (!words[0])
                    return null;
                return words;
            }
            function parseString(s) {
                s = s.replace(/\\\\/g, "\\B") // don't get confused by double backslash
                    .replace(/\\(['\?])/g, function (f, q) { return q; }) // these are not valid in JSON yet valid in C
                    .replace(/\\[z0]/g, "\u0000") // \0 is valid in C 
                    .replace(/\\x([0-9a-f][0-9a-f])/gi, function (f, h) { return "\\u00" + h; })
                    .replace(/\\B/g, "\\\\"); // undo anti-confusion above
                try {
                    return JSON.parse(s);
                }
                catch (e) {
                    return null;
                }
            }
            function emitErr(msg, tok) {
                return {
                    stack: null,
                    opcode: null,
                    error: msg,
                    errorAt: tok
                };
            }
            assembler.emitErr = emitErr;
            function testOne(ei, op, code) {
                var b = new File(ei);
                b.checkStack = false;
                b.emit(op);
                pxtc.assert(b.buf[0] == code);
            }
            function expectError(ei, asm) {
                var b = new File(ei);
                b.emit(asm);
                if (b.errors.length == 0) {
                    pxtc.oops("ASMTEST: expecting error for: " + asm);
                }
                // console.log(b.errors[0].message)
            }
            assembler.expectError = expectError;
            function tohex(n) {
                if (n < 0 || n > 0xffff)
                    return ("0x" + n.toString(16)).toLowerCase();
                else
                    return ("0x" + ("000" + n.toString(16)).slice(-4)).toLowerCase();
            }
            assembler.tohex = tohex;
            function expect(ei, disasm) {
                var exp = [];
                var asm = disasm.replace(/^([0-9a-fA-F]{4,8})\s/gm, function (w, n) {
                    exp.push(parseInt(n.slice(0, 4), 16));
                    if (n.length == 8)
                        exp.push(parseInt(n.slice(4, 8), 16));
                    return "";
                });
                var b = new File(ei);
                b.throwOnError = true;
                b.disablePeepHole = true;
                b.emit(asm);
                if (b.errors.length > 0) {
                    console.debug(b.errors[0].message);
                    pxtc.oops("ASMTEST: not expecting errors");
                }
                if (b.buf.length != exp.length)
                    pxtc.oops("ASMTEST: wrong buf len");
                for (var i = 0; i < exp.length; ++i) {
                    if (b.buf[i] != exp[i])
                        pxtc.oops("ASMTEST: wrong buf content at " + i + " , exp:" + tohex(exp[i]) + ", got: " + tohex(b.buf[i]));
                }
            }
            assembler.expect = expect;
        })(assembler = pxtc.assembler || (pxtc.assembler = {}));
    })(pxtc = ts.pxtc || (ts.pxtc = {}));
})(ts || (ts = {}));
/// <reference path="assembler.ts"/>
/* Docs:
    *
    * Atmel AVR 8-bit Instruction Set Manual
    *  http://www.atmel.com/Images/Atmel-0856-AVR-Instruction-Set-Manual.pdf
    *
    * Common part for Arduino and Circuit Playground
    * http://www.atmel.com/Images/Atmel-7766-8-bit-AVR-ATmega16U4-32U4_Datasheet.pdf
    *
    */
var ts;
(function (ts) {
    var pxtc;
    (function (pxtc) {
        var avr;
        (function (avr) {
            var AVRProcessor = (function (_super) {
                __extends(AVRProcessor, _super);
                function AVRProcessor() {
                    var _this = this;
                    _super.call(this);
                    // TODO: use $lbl whenever we need an address
                    // Registers
                    // $Rd - bits 8:7:6:5:4 (r0)
                    // $Rr - bits 9:3:2:1:0 (r1)
                    this.addEnc("$r0", "R0-31", function (v) { return _this.inrange(31, v, v << 4); });
                    this.addEnc("$r1", "R0-31", function (v) { return _this.inrange(31, v, (v & 15) | ((v & 16) << 5)); });
                    this.addEnc("$r2", "R0-4", function (v) {
                        var r = _this.inseq([24, 26, 28, 30], v);
                        return r == null ? null : r << 4;
                    });
                    this.addEnc("$r3", "R0-16-31", function (v) { return _this.inminmax(16, 31, v, (v - 16) << 4); });
                    this.addEnc("$r4", "R0-7", function (v) { return _this.inrange(7, v, v << 4); });
                    this.addEnc("$r6", "R0-31", function (v) { return _this.inrange(31, v, v << 5 | v); });
                    this.addEnc("$r7", "R0-31", function (v) { return _this.inrange(31, v, v << 3); });
                    this.addEnc("$r8", "Reven", function (v) { return v & 0x1 ? null : (v >> 1) << 4; });
                    this.addEnc("$r9", "Reven", function (v) { return v & 0x1 ? null : (v >> 1); });
                    this.addEnc("$r10", "R0-16-23", function (v) { return _this.inminmax(16, 23, v, (v - 16) << 4); });
                    this.addEnc("$r11", "R0-16-23", function (v) { return _this.inminmax(16, 23, v, v - 16); });
                    this.addEnc("$r12", "R0-16-31", function (v) { return _this.inminmax(16, 31, v, v - 16); });
                    // Immediates:
                    this.addEnc("$i0", "#0-63", function (v) { return _this.inrange(63, v, (v & 0x0f) | (v & 0x30) << 2); });
                    this.addEnc("$i1", "#0-255", function (v) { return _this.inrange(255, v, (v & 0x0f) | (v & 0xf0) << 4); });
                    this.addEnc("$i2", "#0-127", function (v) { return _this.inrange(127, v, v << 3); });
                    this.addEnc("$i3", "#0-255", function (v) { return _this.inrange(255, v, (~v & 0x0f) | (~v & 0xf0) << 4); });
                    this.addEnc("$i4", "#0-15", function (v) { return _this.inrange(15, v, v << 4); });
                    this.addEnc("$i5", "#0-63", function (v) { return _this.inrange(63, v, (v & 0x0f) | (v & 0x30) << 5); });
                    this.addEnc("$i6", "#0-127", function (v) { return _this.inrange(127, v, (v & 0x0f) | (v & 0x70) << 4); });
                    this.addEnc("$i7", "#0-4095", function (v) { return _this.inrange(4095, v, v); });
                    this.addEnc("$i8", "#0-63", function (v) { return _this.inrange(63, v, v & 0x7 | (v & 0x18) << 7) | (v & 0x20) << 7; });
                    this.addEnc("$i9", "#0-7", function (v) { return _this.inrange(7, v, v); });
                    // labels
                    // this.addEnc("$la", "LABEL", v => this.inrange(255, v >> 1, v >> 1)).isWordAligned = true;
                    this.addEnc("$la", "LABEL", function (v) { return _this.inrange(65535, v, v); });
                    this.addEnc("$lb", "LABEL", function (v) { return _this.inrangeSigned(127, v >> 1, v >> 1) << 3; });
                    this.addEnc("$lc", "LABEL", function (v) { return _this.inrange(65535, v >> 1, v >> 1); });
                    this.addEnc("$ld", "LABEL", function (v) { return _this.inrangeSigned(2047, v >> 1, v >> 1); });
                    this.addInst("adc   $r0, $r1", 0x1C00, 0xfC00);
                    this.addInst("add   $r0, $r1", 0x0C00, 0xfC00);
                    // adiw deviates from broken syntax in PDF
                    this.addInst("adiw  $r2, $i0", 0x9600, 0xff00);
                    this.addInst("and   $r0, $r1", 0x2000, 0xfC00);
                    this.addInst("andi  $r3, $i1", 0x7000, 0xf000);
                    this.addInst("asr   $r0", 0x9405, 0xfe0f);
                    this.addInst("bclr  $r4", 0x9488, 0xff8f);
                    this.addInst("bld   $r0, $i9", 0xf800, 0xfe08);
                    this.addInst("brbc  $i9, $lb", 0xf400, 0xfc00);
                    this.addInst("brbs  $i9, $lb", 0xf000, 0xfc00);
                    this.addInst("brcc  $lb", 0xf400, 0xfc07);
                    this.addInst("brcs  $lb", 0xf000, 0xfc07);
                    this.addInst("break", 0x9598, 0xffff);
                    this.addInst("breq  $lb", 0xf001, 0xfc07);
                    this.addInst("brge  $lb", 0xf404, 0xfc07);
                    this.addInst("brhc  $lb", 0xf405, 0xfc07);
                    this.addInst("brhs  $lb", 0xf005, 0xfc07);
                    this.addInst("brid  $lb", 0xf407, 0xfc07);
                    this.addInst("brie  $lb", 0xf007, 0xfc07);
                    // conflict with brbs?
                    this.addInst("brlo  $lb", 0xf000, 0xfc07);
                    this.addInst("brlt  $lb", 0xf004, 0xfc07);
                    this.addInst("brmi  $lb", 0xf002, 0xfc07);
                    this.addInst("brne  $lb", 0xf401, 0xfc07);
                    this.addInst("brpl  $lb", 0xf402, 0xfc07);
                    // error in doc? - this has same opcode as brcc
                    this.addInst("brsh  $lb", 0xf400, 0xfc07);
                    this.addInst("brtc  $lb", 0xf406, 0xfc07);
                    this.addInst("brts  $lb", 0xf006, 0xfc07);
                    this.addInst("brvc  $lb", 0xf403, 0xfc07);
                    this.addInst("brvs  $lb", 0xf003, 0xfc07);
                    this.addInst("bset  $r4", 0x9408, 0xff8f);
                    this.addInst("bst   $r0, $i9", 0xfa00, 0xfe08);
                    // call - 32 bit - special handling
                    this.addInst("call  $lc", 0x940e, 0xffff, "CALL");
                    this.addInst("cbi   $r7, $i9", 0x9800, 0xff00);
                    this.addInst("cbr   $r3, $i3", 0x7000, 0xf000);
                    this.addInst("clc", 0x9488, 0xffff);
                    this.addInst("clh", 0x94d8, 0xffff);
                    this.addInst("cli", 0x94f8, 0xffff);
                    this.addInst("cln", 0x94a8, 0xffff);
                    this.addInst("clr $r6", 0x2400, 0xfc00);
                    this.addInst("cls", 0x94c8, 0xffff);
                    this.addInst("clt", 0x94e8, 0xffff);
                    this.addInst("clv", 0x94b8, 0xffff);
                    this.addInst("clz", 0x9498, 0xffff);
                    this.addInst("com   $r0", 0x9400, 0xfe0f);
                    this.addInst("cp    $r0, $r1", 0x1400, 0xfC00);
                    this.addInst("cpc   $r0, $r1", 0x0400, 0xfC00);
                    this.addInst("cpi   $r3, $i1", 0x3000, 0xf000);
                    this.addInst("cpse  $r0, $r1", 0x1000, 0xfC00);
                    this.addInst("dec   $r0", 0x940a, 0xfe0f);
                    this.addInst("des   $i4", 0x940b, 0xff0f);
                    this.addInst("eicall", 0x9519, 0xffff);
                    this.addInst("eijmp", 0x9419, 0xffff);
                    this.addInst("elpm", 0x95d8, 0xffff);
                    this.addInst("elpm  $r0, Z0", 0x9006, 0xfe0f);
                    this.addInst("elpm  $r0, Z+0", 0x9007, 0xfe0f);
                    this.addInst("eor   $r0, $r1", 0x2400, 0xfC00);
                    this.addInst("fmul   $r10, $r11", 0x0308, 0xff88);
                    this.addInst("fmuls  $r10, $r11", 0x0380, 0xff88);
                    this.addInst("fmulsu $r10, $r11", 0x0388, 0xff88);
                    this.addInst("icall", 0x9509, 0xffff);
                    this.addInst("ijmp", 0x9409, 0xffff);
                    this.addInst("in    $r0, $i5", 0xb000, 0xf800);
                    this.addInst("inc   $r0", 0x9403, 0xfe0f);
                    // jmp - 32 bit - special handling
                    this.addInst("jmp  $lc", 0x940c, 0xffff, "JMP");
                    this.addInst("lac   Z, $r0", 0x9206, 0xfe0f);
                    this.addInst("las   Z, $r0", 0x9205, 0xfe0f);
                    this.addInst("lat   Z, $r0", 0x9207, 0xfe0f);
                    this.addInst("ld    $r0, X", 0x900c, 0xfe0f);
                    this.addInst("ld    $r0, X+", 0x900d, 0xfe0f);
                    this.addInst("ld    $r0, -X", 0x900e, 0xfe0f);
                    this.addInst("ld    $r0, Y", 0x8008, 0xfe0f);
                    this.addInst("ld    $r0, Y+", 0x9009, 0xfe0f);
                    this.addInst("ld    $r0, -Y", 0x900a, 0xfe0f);
                    this.addInst("ldd   $r0, Y, $i8", 0x8008, 0xd208);
                    this.addInst("ld    $r0, Z", 0x8000, 0xfe0f);
                    this.addInst("ld    $r0, Z+", 0x9001, 0xfe0f);
                    this.addInst("ld    $r0, -Z", 0x9002, 0xfe0f);
                    this.addInst("ldd   $r0, Z, $i8", 0x8000, 0xd208);
                    this.addInst("ldi   $r3, $i1", 0xe000, 0xf000);
                    // lds - 32 bit (special handling required)
                    this.addInst("lds   $r0, $la", 0x9000, 0xfe0f, "LDS");
                    this.addInst("lds   $r3, $i6", 0xa000, 0xf800);
                    this.addInst("lpm", 0x95a8, 0xffff);
                    this.addInst("lpm   $r0, Z", 0x9004, 0xfe0f);
                    this.addInst("lpm   $r0, Z+", 0x9005, 0xfe0f);
                    this.addInst("lsl   $r6", 0x0c00, 0xfc00);
                    this.addInst("lsr   $r0", 0x9406, 0xfe0f);
                    this.addInst("mov   $r0, $r1", 0x2C00, 0xfC00);
                    this.addInst("movw  $r8, $r9", 0x0100, 0xff00);
                    this.addInst("mul   $r0, $r1", 0x9c00, 0xfC00);
                    this.addInst("muls  $r3, $r12", 0x0200, 0xff00);
                    this.addInst("mulsu $r10, $r11", 0x0300, 0xff88);
                    this.addInst("neg $r0", 0x9401, 0xfe0f);
                    this.addInst("nop", 0x0000, 0xffff);
                    this.addInst("or    $r0, $r1", 0x2800, 0xfC00);
                    this.addInst("ori   $r3, $i1", 0x6000, 0xf000);
                    this.addInst("out   $i5, $r0", 0xb800, 0xf800);
                    this.addInst("pop $r0", 0x900f, 0xfe0f);
                    this.addInst("push $r0", 0x920f, 0xfe0f);
                    this.addInst("rcall $ld", 0xd000, 0xf000);
                    this.addInst("ret", 0x9508, 0xffff);
                    this.addInst("reti", 0x9518, 0xffff);
                    this.addInst("rjmp $ld", 0xc000, 0xf000);
                    this.addInst("rol $r6", 0x1c00, 0xfc00);
                    this.addInst("ror $r0", 0x9407, 0xfe0f);
                    this.addInst("sbc   $r0, $r1", 0x0800, 0xfC00);
                    this.addInst("sbci  $r3, $i1", 0x4000, 0xf000);
                    this.addInst("sbi   $r7, $i9", 0x9a00, 0xff00);
                    this.addInst("sbic  $r7, $i9", 0x9900, 0xff00);
                    this.addInst("sbis  $r7, $i9", 0x9b00, 0xff00);
                    this.addInst("sbiw  $r2, $i0", 0x9700, 0xff00);
                    this.addInst("sbr   $r3, $i1", 0x6000, 0xf000);
                    this.addInst("sbrc  $r0, $i9", 0xfc00, 0xfe08);
                    this.addInst("sbrs  $r0, $i9", 0xfe00, 0xfe08);
                    this.addInst("sec", 0x9408, 0xffff);
                    this.addInst("seh", 0x9458, 0xffff);
                    this.addInst("sei", 0x9478, 0xffff);
                    this.addInst("sen", 0x9428, 0xffff);
                    this.addInst("sec", 0x9408, 0xffff);
                    this.addInst("ser $r3", 0xef0f, 0xff0f);
                    this.addInst("ses", 0x9448, 0xffff);
                    this.addInst("set", 0x9468, 0xffff);
                    this.addInst("sev", 0x9438, 0xffff);
                    this.addInst("sez", 0x9418, 0xffff);
                    this.addInst("sleep", 0x9588, 0xffff);
                    this.addInst("spm", 0x95e8, 0xffff);
                    this.addInst("st    X, $r0", 0x920c, 0xfe0f);
                    this.addInst("st    X+, $r0", 0x920d, 0xfe0f);
                    this.addInst("st    -X, $r0", 0x920e, 0xfe0f);
                    this.addInst("st    Y, $r0", 0x8208, 0xfe0f);
                    this.addInst("st    Y+, $r0", 0x9209, 0xfe0f);
                    this.addInst("st    -Y, $r0", 0x920a, 0xfe0f);
                    this.addInst("std   Y, $i8, $r0", 0x8208, 0xd208);
                    this.addInst("st    Z, $r0", 0x8200, 0xfe0f);
                    this.addInst("st    Z+, $r0", 0x9201, 0xfe0f);
                    this.addInst("st    -Z, $r0", 0x9202, 0xfe0f);
                    this.addInst("std   Z, $i8, $r0", 0x8200, 0xd208);
                    // sts - 32-bit (special handing required)
                    this.addInst("sts   $la, $r0", 0x9200, 0xfe0f, "STS");
                    this.addInst("sts   $i6, $r3", 0xa800, 0xf800);
                    this.addInst("sub   $r0, $r1", 0x1800, 0xfC00);
                    this.addInst("subi  $r3, $i1", 0x5000, 0xf000);
                    this.addInst("swap  $r0", 0x9402, 0xfe0f);
                    this.addInst("tst   $r6", 0x2000, 0xfc00);
                    this.addInst("wdr", 0x95a8, 0xffff);
                    this.addInst("xch   Z, $r0", 0x9204, 0xfe0F);
                }
                AVRProcessor.prototype.wordSize = function () {
                    return 2;
                };
                // return offset+1 because stack points to next available slot
                AVRProcessor.prototype.computeStackOffset = function (kind, offset) {
                    if (kind == "args")
                        return offset + 2; // the return pointer is stored on the stack, skip it to get to args
                    return offset + 1;
                };
                AVRProcessor.prototype.is32bit = function (i) {
                    return i.is32bit;
                };
                // - the call and jmp instructions have both 16-bit and 22-bit varieties
                // - lds and sts are both 16-bit
                // for now, we only support only 16-bit
                AVRProcessor.prototype.emit32 = function (op, v, actual) {
                    // TODO: optimize call/jmp by rcall/rjmp
                    var off = v >> 1;
                    pxtc.assert(off != null, "off null");
                    if ((off | 0) != off ||
                        // 16-bit only for now (so, can address 128k)
                        !(-128 * 512 <= off && off <= 128 * 512))
                        return pxtc.assembler.emitErr("jump out of range", actual);
                    // note that off is already in instructions, not bytes
                    var imm = off & 0xffff;
                    return {
                        opcode: op,
                        opcode2: imm,
                        stack: 0,
                        numArgs: [v],
                        labelName: actual
                    };
                };
                AVRProcessor.prototype.registerNo = function (actual) {
                    if (!actual)
                        return null;
                    actual = actual.toLowerCase();
                    var m = /^r(\d+)$/.exec(actual);
                    if (m) {
                        var r = parseInt(m[1], 10);
                        if (0 <= r && r < 32)
                            return r;
                    }
                    return null;
                };
                AVRProcessor.prototype.postProcessRelAddress = function (f, v) {
                    return v + f.baseOffset;
                };
                // absolute addresses come in divide by two
                AVRProcessor.prototype.postProcessAbsAddress = function (f, v) {
                    return v << 1;
                };
                AVRProcessor.prototype.getAddressFromLabel = function (f, i, s, wordAligned) {
                    if (wordAligned === void 0) { wordAligned = false; }
                    // lookup absolute, relative, dependeing
                    var l = f.lookupLabel(s);
                    if (l == null)
                        return null;
                    if (i.is32bit)
                        // absolute address
                        return l;
                    // relative address
                    return l - (f.pc() + 2);
                };
                AVRProcessor.prototype.peephole = function (ln, lnNext, lnNext2) {
                    /*
                    let ld = this.encoders["$ld"]
                    let lnop = ln.getOp()
    
                    // replace 32-bit with 16-bit when branch distance is within bounds
                    if ((lnop == "call" || lnop == "jmp") && ln.numArgs[0] != null) {
                        let offset = ln.numArgs[0] - (this.file.baseOffset + ln.location + 2) >> 1
                        if (ld.encode(offset)) {
                            // RULE: call/jmp .somewhere -> rcall/rjmp .somewhere (if fits)
                            if (lnop == "call")
                            ln.update((lnop == "call" ? "rcall " : "rjmp ") + ln.words[1])
                        }
                    }
                    */
                };
                AVRProcessor.prototype.testAssembler = function () {
                    pxtc.assembler.expect(this, "2411       eor	r1, r1 \n" +
                        "be1f       out	0x3f, r1 \n" +
                        "efcf       ldi	r28, 0xFF \n" +
                        "e0da       ldi	r29, 0x0A \n" +
                        "bfde       out	0x3e, r29 \n" +
                        "bfcd      	out	0x3d, r28 \n");
                    pxtc.assembler.expect(this, "0c00      lsl     r0\n" +
                        "920f      push    r0\n" +
                        "e604      ldi     r16, #100        ; 0x64\n" +
                        "903f      pop     r3\n");
                    pxtc.assembler.expect(this, "1412      cp      r1, r2\n" +
                        "f409      brne    l6\n" +
                        "c001      rjmp    l8\n" +
                        "0e01  l6: add     r0, r17\n" +
                        "0000  l8: nop     \n");
                };
                return AVRProcessor;
            }(pxtc.assembler.AbstractProcessor));
            avr.AVRProcessor = AVRProcessor;
        })(avr = pxtc.avr || (pxtc.avr = {}));
    })(pxtc = ts.pxtc || (ts.pxtc = {}));
})(ts || (ts = {}));
var ts;
(function (ts) {
    var pxtc;
    (function (pxtc) {
        pxtc.decodeBase64 = function (s) { return atob(s); };
        // this class defines the interface between the IR
        // and a particular assembler (Thumb, AVR). Thus,
        // the registers mentioned below are VIRTUAL registers
        // required by the IR-machine, rather than PHYSICAL registers
        // at the assembly level.
        // that said, the assumptions below about registers are based on
        // ARM, so a mapping will be needed for other processors
        // Assumptions:
        // - registers can hold a pointer (data or code)
        // - special registers include: sp
        // - fixed registers are r0, r1, r2, r3, r5, r6 
        //   - r0 is the current value (from expression evaluation)
        //   - registers for runtime calls (r0, r1,r2,r3)
        //   - r5 is for captured locals in lambda
        //   - r6 for global{}
        // - for calls to user functions, all arguments passed on stack
        var AssemblerSnippets = (function () {
            function AssemblerSnippets() {
            }
            AssemblerSnippets.prototype.nop = function () { return "TBD "; };
            AssemblerSnippets.prototype.reg_gets_imm = function (reg, imm) { return "TBD"; };
            // Registers are stored on the stack in numerical order 
            AssemblerSnippets.prototype.proc_setup = function (main) { return "TBD"; };
            AssemblerSnippets.prototype.push_fixed = function (reg) { return "TBD"; };
            AssemblerSnippets.prototype.push_local = function (reg) { return "TBD"; };
            AssemblerSnippets.prototype.proc_setup_end = function () { return ""; };
            AssemblerSnippets.prototype.pop_fixed = function (reg) { return "TBD"; };
            AssemblerSnippets.prototype.pop_locals = function (n) { return "TBD"; };
            AssemblerSnippets.prototype.proc_return = function () { return "TBD"; };
            AssemblerSnippets.prototype.debugger_hook = function (lbl) { return "TBD"; };
            AssemblerSnippets.prototype.debugger_bkpt = function (lbl) { return "TBD"; };
            AssemblerSnippets.prototype.breakpoint = function () { return "TBD"; };
            AssemblerSnippets.prototype.unconditional_branch = function (lbl) { return "TBD"; };
            AssemblerSnippets.prototype.beq = function (lbl) { return "TBD"; };
            AssemblerSnippets.prototype.bne = function (lbl) { return "TBD"; };
            AssemblerSnippets.prototype.cmp = function (reg1, reg) { return "TBD"; };
            AssemblerSnippets.prototype.cmp_zero = function (reg1) { return "TBD"; };
            // load_reg_src_off is load/store indirect
            // word? - does offset represent an index that must be multiplied by word size?
            // inf?  - control over size of referenced data
            // str?  - true=Store/false=Load
            // src - can range over
            AssemblerSnippets.prototype.load_reg_src_off = function (reg, src, off, word, store, inf) { return "TBD"; };
            AssemblerSnippets.prototype.rt_call = function (name, r0, r1) { return "TBD"; };
            AssemblerSnippets.prototype.call_lbl = function (lbl) { return "TBD"; };
            AssemblerSnippets.prototype.call_reg = function (reg) { return "TBD"; };
            AssemblerSnippets.prototype.vcall = function (mapMethod, isSet, vtableShift) { return "TBD"; };
            AssemblerSnippets.prototype.prologue_vtable = function (arg_index, vtableShift) { return "TBD"; };
            AssemblerSnippets.prototype.lambda_prologue = function () { return "TBD"; };
            AssemblerSnippets.prototype.lambda_epilogue = function () { return "TBD"; };
            AssemblerSnippets.prototype.load_ptr = function (lbl, reg) { return "TBD"; };
            AssemblerSnippets.prototype.emit_int = function (v, reg) { return "TBD"; };
            return AssemblerSnippets;
        }());
        pxtc.AssemblerSnippets = AssemblerSnippets;
        // helper for emit_int
        function numBytes(n) {
            var v = 0;
            for (var q = n; q > 0; q >>>= 8) {
                v++;
            }
            return v || 1;
        }
        pxtc.numBytes = numBytes;
        var ProctoAssembler = (function () {
            function ProctoAssembler(t, bin, proc) {
                var _this = this;
                this.resText = "";
                this.exprStack = [];
                this.calls = [];
                this.proc = null;
                this.write = function (s) { _this.resText += pxtc.asmline(s); };
                this.t = t;
                this.bin = bin;
                this.proc = proc;
                this.work();
            }
            ProctoAssembler.prototype.getAssembly = function () {
                return this.resText;
            };
            ProctoAssembler.prototype.work = function () {
                var _this = this;
                this.write("\n;\n; Function " + this.proc.getName() + "\n;\n");
                if (this.proc.args.length <= 3)
                    this.emitLambdaWrapper(this.proc.isRoot);
                var baseLabel = this.proc.label();
                var bkptLabel = baseLabel + "_bkpt";
                var locLabel = baseLabel + "_locals";
                this.write("\n.section code\n" + bkptLabel + ":");
                this.write(this.t.breakpoint());
                this.write("\n" + baseLabel + ":\n    @stackmark func\n    @stackmark args\n");
                // create a new function for later use by hex file generation
                this.proc.fillDebugInfo = function (th) {
                    var labels = th.getLabels();
                    _this.proc.debugInfo = {
                        locals: (_this.proc.seqNo == 1 ? _this.bin.globals : _this.proc.locals).map(function (l) { return l.getDebugInfo(); }),
                        args: _this.proc.args.map(function (l) { return l.getDebugInfo(); }),
                        name: _this.proc.getName(),
                        codeStartLoc: pxtc.U.lookup(labels, bkptLabel + "_after"),
                        bkptLoc: pxtc.U.lookup(labels, bkptLabel),
                        localsMark: pxtc.U.lookup(th.stackAtLabel, locLabel),
                        idx: _this.proc.seqNo,
                        calls: _this.calls
                    };
                    for (var _i = 0, _a = _this.calls; _i < _a.length; _i++) {
                        var ci = _a[_i];
                        ci.addr = pxtc.U.lookup(labels, ci.callLabel);
                        ci.stack = pxtc.U.lookup(th.stackAtLabel, ci.callLabel);
                        ci.callLabel = undefined; // don't waste space
                    }
                    for (var i = 0; i < _this.proc.body.length; ++i) {
                        var bi = _this.proc.body[i].breakpointInfo;
                        if (bi) {
                            var off = pxtc.U.lookup(th.stackAtLabel, "__brkp_" + bi.id);
                            pxtc.assert(off === _this.proc.debugInfo.localsMark);
                        }
                    }
                };
                this.write(this.t.proc_setup(true));
                // initialize the locals
                var numlocals = this.proc.locals.length;
                if (numlocals > 0)
                    this.write(this.t.reg_gets_imm("r0", 0));
                this.proc.locals.forEach(function (l) {
                    _this.write(_this.t.push_local("r0") + " ;loc");
                });
                this.write(this.t.proc_setup_end());
                this.write("@stackmark locals");
                this.write(locLabel + ":");
                //console.log(proc.toString())
                this.proc.resolve();
                //console.log("OPT", proc.toString())
                // debugger hook - bit #1 of global #0 determines break on function entry
                // we could have put the 'bkpt' inline, and used `bpl`, but that would be 2 cycles slower
                this.write(this.t.debugger_hook(bkptLabel));
                for (var i = 0; i < this.proc.body.length; ++i) {
                    var s = this.proc.body[i];
                    // console.log("STMT", s.toString())
                    switch (s.stmtKind) {
                        case pxtc.ir.SK.Expr:
                            this.emitExpr(s.expr);
                            break;
                        case pxtc.ir.SK.StackEmpty:
                            if (this.exprStack.length > 0) {
                                for (var _i = 0, _a = this.proc.body.slice(i - 4, i + 1); _i < _a.length; _i++) {
                                    var stmt = _a[_i];
                                    console.log("PREVSTMT " + stmt.toString().trim());
                                }
                                for (var _b = 0, _c = this.exprStack; _b < _c.length; _b++) {
                                    var e = _c[_b];
                                    console.log("EXPRSTACK " + e.currUses + "/" + e.totalUses + " E: " + e.toString());
                                }
                                pxtc.oops("stack should be empty");
                            }
                            this.write("@stackempty locals");
                            break;
                        case pxtc.ir.SK.Jmp:
                            this.emitJmp(s);
                            break;
                        case pxtc.ir.SK.Label:
                            this.write(s.lblName + ":");
                            break;
                        case pxtc.ir.SK.Breakpoint:
                            this.write("__brkp_" + s.breakpointInfo.id + ":");
                            if (s.breakpointInfo.isDebuggerStmt) {
                                var lbl = this.mkLbl("debugger");
                                // bit #0 of debugger register is set when debugger is attached
                                this.t.debugger_bkpt(lbl);
                            }
                            else {
                            }
                            break;
                        default: pxtc.oops();
                    }
                }
                pxtc.assert(0 <= numlocals && numlocals < 127);
                if (numlocals > 0)
                    this.write(this.t.pop_locals(numlocals));
                this.write(this.t.proc_return());
                this.write("@stackempty func");
                this.write("@stackempty args");
            };
            ProctoAssembler.prototype.mkLbl = function (root) {
                return "." + root + this.bin.lblNo++;
            };
            ProctoAssembler.prototype.terminate = function (expr) {
                pxtc.assert(expr.exprKind == pxtc.ir.EK.SharedRef);
                var arg = expr.args[0];
                if (arg.currUses == arg.totalUses)
                    return;
                var numEntries = 0;
                while (numEntries < this.exprStack.length) {
                    var ee = this.exprStack[numEntries];
                    if (ee != arg && ee.currUses != ee.totalUses)
                        break;
                    numEntries++;
                }
                pxtc.assert(numEntries > 0);
                this.write("@dummystack " + numEntries);
                this.write(this.t.pop_locals(numEntries));
            };
            ProctoAssembler.prototype.emitJmp = function (jmp) {
                if (jmp.jmpMode == pxtc.ir.JmpMode.Always) {
                    if (jmp.expr)
                        this.emitExpr(jmp.expr);
                    if (jmp.terminateExpr)
                        this.terminate(jmp.terminateExpr);
                    this.write(this.t.unconditional_branch(jmp.lblName) + " ; with expression");
                }
                else {
                    var lbl = this.mkLbl("jmpz");
                    if (jmp.jmpMode == pxtc.ir.JmpMode.IfJmpValEq) {
                        this.emitExprInto(jmp.expr, "r1");
                        this.write(this.t.cmp("r0", "r1"));
                    }
                    else {
                        this.emitExpr(jmp.expr);
                        // TODO: remove ARM-specific code
                        if (jmp.expr.exprKind == pxtc.ir.EK.RuntimeCall && jmp.expr.data === "thumb::subs") {
                        }
                        else {
                            this.write(this.t.cmp_zero("r0"));
                        }
                    }
                    if (jmp.jmpMode == pxtc.ir.JmpMode.IfNotZero) {
                        this.write(this.t.beq(lbl)); // this is to *skip* the following 'b' instruction; beq itself has a very short range
                    }
                    else {
                        // IfZero or IfJmpValEq
                        this.write(this.t.bne(lbl));
                    }
                    if (jmp.terminateExpr)
                        this.terminate(jmp.terminateExpr);
                    this.write(this.t.unconditional_branch(jmp.lblName));
                    this.write(lbl + ":");
                }
            };
            ProctoAssembler.prototype.clearStack = function () {
                var numEntries = 0;
                while (this.exprStack.length > 0 && this.exprStack[0].currUses == this.exprStack[0].totalUses) {
                    numEntries++;
                    this.exprStack.shift();
                }
                if (numEntries)
                    this.write(this.t.pop_locals(numEntries));
            };
            ProctoAssembler.prototype.withRef = function (name, isRef) {
                return name + (isRef ? "Ref" : "");
            };
            ProctoAssembler.prototype.emitExprInto = function (e, reg) {
                switch (e.exprKind) {
                    case pxtc.ir.EK.NumberLiteral:
                        if (e.data === true)
                            this.write(this.t.emit_int(1, reg));
                        else if (e.data === false)
                            this.write(this.t.emit_int(0, reg));
                        else if (e.data === null)
                            this.write(this.t.emit_int(0, reg));
                        else if (typeof e.data == "number")
                            this.write(this.t.emit_int(e.data, reg));
                        else
                            pxtc.oops();
                        break;
                    case pxtc.ir.EK.PointerLiteral:
                        this.write(this.t.load_ptr(e.data, reg));
                        break;
                    case pxtc.ir.EK.SharedRef:
                        var arg = e.args[0];
                        pxtc.U.assert(!!arg.currUses); // not first use
                        pxtc.U.assert(arg.currUses < arg.totalUses);
                        arg.currUses++;
                        var idx = this.exprStack.indexOf(arg);
                        pxtc.U.assert(idx >= 0);
                        if (idx == 0 && arg.totalUses == arg.currUses) {
                            this.write(this.t.pop_fixed([reg]) + (" ; tmpref @" + this.exprStack.length));
                            this.exprStack.shift();
                            this.clearStack();
                        }
                        else {
                            this.write(this.t.load_reg_src_off(reg, "sp", idx.toString(), true) + (" ; tmpref @" + (this.exprStack.length - idx)));
                        }
                        break;
                    case pxtc.ir.EK.CellRef:
                        var cell = e.data;
                        if (cell.isGlobal()) {
                            var inf = this.bitSizeInfo(cell.bitSize);
                            var off = "#" + cell.index;
                            if (inf.needsSignExt || cell.index >= inf.immLimit) {
                                this.write(this.t.emit_int(cell.index, reg));
                                off = reg;
                            }
                            this.write(this.t.load_reg_src_off(reg, "r6", off, false, false, inf));
                        }
                        else {
                            var _a = this.cellref(cell), src = _a[0], imm = _a[1], idx_1 = _a[2];
                            this.write(this.t.load_reg_src_off(reg, src, imm, idx_1));
                        }
                        break;
                    default: pxtc.oops();
                }
            };
            ProctoAssembler.prototype.bitSizeInfo = function (b) {
                var inf = {
                    size: pxtc.sizeOfBitSize(b),
                    immLimit: 128
                };
                if (inf.size == 1) {
                    inf.immLimit = 32;
                }
                else if (inf.size == 2) {
                    inf.immLimit = 64;
                }
                if (b == 1 /* Int8 */ || b == 3 /* Int16 */) {
                    inf.needsSignExt = true;
                }
                return inf;
            };
            // result in R0
            ProctoAssembler.prototype.emitExpr = function (e) {
                //console.log(`EMITEXPR ${e.sharingInfo()} E: ${e.toString()}`)
                var _this = this;
                switch (e.exprKind) {
                    case pxtc.ir.EK.JmpValue:
                        this.write("; jmp value (already in r0)");
                        break;
                    case pxtc.ir.EK.Nop:
                        // this is there because we need different addresses for breakpoints
                        this.write(this.t.nop());
                        break;
                    case pxtc.ir.EK.Incr:
                        this.emitExpr(e.args[0]);
                        this.emitCallRaw("pxt::incr");
                        break;
                    case pxtc.ir.EK.Decr:
                        this.emitExpr(e.args[0]);
                        this.emitCallRaw("pxt::decr");
                        break;
                    case pxtc.ir.EK.FieldAccess:
                        var info = e.data;
                        // it does the decr itself, no mask
                        return this.emitExpr(pxtc.ir.rtcall(this.withRef("pxtrt::ldfld", info.isRef), [e.args[0], pxtc.ir.numlit(info.idx)]));
                    case pxtc.ir.EK.Store:
                        return this.emitStore(e.args[0], e.args[1]);
                    case pxtc.ir.EK.RuntimeCall:
                        return this.emitRtCall(e);
                    case pxtc.ir.EK.ProcCall:
                        return this.emitProcCall(e);
                    case pxtc.ir.EK.SharedDef:
                        return this.emitSharedDef(e);
                    case pxtc.ir.EK.Sequence:
                        e.args.forEach(function (e) { return _this.emitExpr(e); });
                        return this.clearStack();
                    default:
                        return this.emitExprInto(e, "r0");
                }
            };
            ProctoAssembler.prototype.emitSharedDef = function (e) {
                var arg = e.args[0];
                pxtc.U.assert(arg.totalUses >= 1);
                pxtc.U.assert(arg.currUses === 0);
                arg.currUses = 1;
                if (arg.totalUses == 1)
                    return this.emitExpr(arg);
                else {
                    this.emitExpr(arg);
                    this.exprStack.unshift(arg);
                    this.write(this.t.push_local("r0") + "; tmpstore @" + this.exprStack.length);
                }
            };
            ProctoAssembler.prototype.emitSharedTerminate = function (e) {
                this.emitExpr(e);
                var arg = e.data;
                // ??? missing ???
            };
            ProctoAssembler.prototype.emitRtCall = function (topExpr) {
                var _this = this;
                var info = pxtc.ir.flattenArgs(topExpr);
                info.precomp.forEach(function (e) { return _this.emitExpr(e); });
                info.flattened.forEach(function (a, i) {
                    pxtc.U.assert(i <= 3);
                    _this.emitExprInto(a, "r" + i);
                });
                this.clearStack();
                var name = topExpr.data;
                //console.log("RT",name,topExpr.isAsync)
                if (name == "thumb::ignore")
                    return;
                if (pxtc.U.startsWith(name, "thumb::")) {
                    this.write(this.t.rt_call(name.slice(7), "r0", "r1"));
                }
                else {
                    this.write(this.t.call_lbl(name));
                }
            };
            ProctoAssembler.prototype.emitHelper = function (asm) {
                if (!this.bin.codeHelpers[asm]) {
                    var len = Object.keys(this.bin.codeHelpers).length;
                    this.bin.codeHelpers[asm] = "_hlp_" + len;
                }
                this.write(this.t.call_lbl(this.bin.codeHelpers[asm]));
            };
            ProctoAssembler.prototype.emitProcCall = function (topExpr) {
                var _this = this;
                var stackBottom = 0;
                //console.log("PROCCALL", topExpr.toString())
                var argStmts = topExpr.args.map(function (a, i) {
                    _this.emitExpr(a);
                    _this.write(_this.t.push_local("r0") + " ; proc-arg");
                    a.totalUses = 1;
                    a.currUses = 0;
                    _this.exprStack.unshift(a);
                    if (i == 0)
                        stackBottom = _this.exprStack.length;
                    pxtc.U.assert(_this.exprStack.length - stackBottom == i);
                    return a;
                });
                var lbl = this.mkLbl("proccall");
                var afterall = this.mkLbl("afterall");
                var procid = topExpr.data;
                var procIdx = -1;
                if (procid.virtualIndex != null || procid.ifaceIndex != null) {
                    if (procid.mapMethod) {
                        var isSet = /Set/.test(procid.mapMethod);
                        pxtc.assert(isSet == (topExpr.args.length == 2));
                        pxtc.assert(!isSet == (topExpr.args.length == 1));
                        this.write(this.t.emit_int(procid.mapIdx, "r1"));
                        if (isSet)
                            this.write(this.t.emit_int(procid.ifaceIndex, "r2"));
                        this.write(lbl + ":");
                        this.emitHelper(this.t.vcall(procid.mapMethod, isSet, pxtc.vtableShift));
                    }
                    else {
                        this.write(this.t.prologue_vtable(topExpr.args.length - 1, pxtc.vtableShift));
                        var effIdx = procid.virtualIndex + 4;
                        if (procid.ifaceIndex != null) {
                            this.write(this.t.load_reg_src_off("r0", "r0", "#4") + " ; iface table");
                            effIdx = procid.ifaceIndex;
                        }
                        if (effIdx <= 31) {
                            this.write(this.t.load_reg_src_off("r0", "r0", effIdx.toString(), true) + " ; ld-method");
                        }
                        else {
                            this.write(this.t.emit_int(effIdx * 4, "r1"));
                            this.write(this.t.load_reg_src_off("r0", "r0", "r1") + " ; ld-method");
                        }
                        this.write(lbl + ":");
                        this.write(this.t.call_reg("r0"));
                        this.write(afterall + ":");
                    }
                }
                else {
                    var proc = procid.proc;
                    procIdx = proc.seqNo;
                    this.write(lbl + ":");
                    this.write(this.t.call_lbl(proc.label()));
                }
                this.calls.push({
                    procIndex: procIdx,
                    stack: 0,
                    addr: 0,
                    callLabel: lbl,
                });
                for (var _i = 0, argStmts_1 = argStmts; _i < argStmts_1.length; _i++) {
                    var a = argStmts_1[_i];
                    a.currUses = 1;
                }
                this.clearStack();
            };
            ProctoAssembler.prototype.emitStore = function (trg, src) {
                switch (trg.exprKind) {
                    case pxtc.ir.EK.CellRef:
                        var cell = trg.data;
                        this.emitExpr(src);
                        if (cell.isGlobal()) {
                            var inf = this.bitSizeInfo(cell.bitSize);
                            var off = "#" + cell.index;
                            if (cell.index >= inf.immLimit) {
                                this.write(this.t.emit_int(cell.index, "r1"));
                                off = "r1";
                            }
                            this.write(this.t.load_reg_src_off("r0", "r6", off, false, true, inf));
                        }
                        else {
                            var _a = this.cellref(cell), reg = _a[0], imm = _a[1], off = _a[2];
                            this.write(this.t.load_reg_src_off("r0", reg, imm, off, true));
                        }
                        break;
                    case pxtc.ir.EK.FieldAccess:
                        var info = trg.data;
                        // it does the decr itself, no mask
                        this.emitExpr(pxtc.ir.rtcall(this.withRef("pxtrt::stfld", info.isRef), [trg.args[0], pxtc.ir.numlit(info.idx), src]));
                        break;
                    default: pxtc.oops();
                }
            };
            ProctoAssembler.prototype.cellref = function (cell) {
                if (cell.isGlobal()) {
                    throw pxtc.oops();
                }
                else if (cell.iscap) {
                    pxtc.assert(0 <= cell.index && cell.index < 32);
                    return ["r5", cell.index.toString(), true];
                }
                else if (cell.isarg) {
                    var idx = this.proc.args.length - cell.index - 1;
                    return ["sp", "args@" + idx.toString(), false];
                }
                else {
                    return ["sp", "locals@" + cell.index, false];
                }
            };
            ProctoAssembler.prototype.emitLambdaWrapper = function (isMain) {
                var _this = this;
                var node = this.proc.action;
                this.write("");
                this.write(".section code");
                if (isMain)
                    this.write(this.t.unconditional_branch(".themain"));
                this.write(".balign 4");
                this.write(this.proc.label() + "_Lit:");
                this.write(".short 0xffff, 0x0000   ; action literal");
                this.write("@stackmark litfunc");
                if (isMain)
                    this.write(".themain:");
                var parms = this.proc.args.map(function (a) { return a.def; });
                this.write(this.t.proc_setup());
                this.write(this.t.push_fixed(["r5", "r6"]));
                if (parms.length >= 1)
                    this.write(this.t.push_local("r1"));
                parms.forEach(function (_, i) {
                    if (i >= 3)
                        pxtc.U.userError(pxtc.U.lf("only up to three parameters supported in lambdas"));
                    if (i > 0)
                        _this.write(_this.t.push_local("r" + (i + 1)));
                });
                this.write(this.t.proc_setup_end());
                var asm = this.t.lambda_prologue();
                this.proc.args.forEach(function (p, i) {
                    if (p.isRef()) {
                        var _a = _this.cellref(p), reg = _a[0], off = _a[1], idx = _a[2];
                        asm += _this.t.load_reg_src_off("r0", reg, off, idx) + "\n";
                        asm += _this.t.call_lbl("pxt::incr") + "\n";
                    }
                });
                asm += this.t.lambda_epilogue();
                this.emitHelper(asm); // using shared helper saves about 3% of binary size
                this.write(this.t.call_lbl(this.proc.label()));
                if (parms.length)
                    this.write(this.t.pop_locals(parms.length));
                this.write(this.t.pop_fixed(["r6", "r5"]));
                this.write(this.t.proc_return());
                this.write("@stackempty litfunc");
            };
            ProctoAssembler.prototype.emitCallRaw = function (name) {
                var inf = pxtc.hex.lookupFunc(name);
                pxtc.assert(!!inf, "unimplemented raw function: " + name);
                this.write(this.t.call_lbl(name) + " ; *" + inf.type + inf.args + " (raw)");
            };
            return ProctoAssembler;
        }());
        pxtc.ProctoAssembler = ProctoAssembler;
    })(pxtc = ts.pxtc || (ts.pxtc = {}));
})(ts || (ts = {}));
// Make sure backbase.ts is loaded before us, otherwise 'extends AssemblerSnippets' fails at runtime
/// <reference path="backbase.ts"/>
var ts;
(function (ts) {
    var pxtc;
    (function (pxtc) {
        // AVR:
        // - 32 8-bit registers (R0 - R31), with mapping to data addresses 0x0000 - 0x001F
        //   - X-register R26 (low), R27 (high)
        //   - Y-register R28 (low), R29 (high), Frame Pointer (FP)
        //   - Z-register R30 (low), R31 (high), use for indirect addressing
        // - 64 I/0 registers ($00-$3F), with mapping to data addresses 0x0020 - 0x005F
        // - 160 Ext I/O registers (0x0060-0x00FF)
        // - Internal SRAM 0x100-
        // - SP: special register in I/O space (0x3D, 0x3E)
        // - instructions that use SP
        //   - PUSH Rr (dec SP by 1) 
        //   - CALL, ICALL, RCALL (dec by 2 - 16 bit code pointer)
        //   - POP Rd (inc SP by 1)
        //   - RET, RETI (inc by 2 - 16 bit code pointer)
        // - in AVR, 0x0060 is lowest address for the stack
        // - stack grows from high (RAMEND) to low (top of stack)
        // Text below from http://gcc.gnu.org/wiki/avr-gcc 
        // R0 is used as scratch register that need not to be restored after its usage. 
        // R1 always contains zero.
        /*
         * Call-Used Registers
         *
         * R18–R27, R30, R31. These GPRs are call clobbered.
         * An ordinary function may use them without restoring the contents.
         */
        /*
         * Call-Saved Registers
         *
         * R2–R17, (R28, R29) FP
         * The remaining GPRs are call-saved, i.e. a function that uses such a registers must restore its original content.
         * This applies even if the register is used to pass a function argument.
         * R1 The zero-register is implicity call-saved (implicit because R1 is a fixed register).
         */
        /*
         * Frame layout
         *
         * Y-register (R28-R29) is frame pointer
         *
         * Pseudos that don't get a hard register will be put into a stack slot and loaded / stored as needed.
         * The stack grows downwards.
         * Stack pointer and frame pointer are not aligned, i.e. 1-byte aligned.
         * After the function prologue, the frame pointer will point one byte below the stack frame,
         * i.e. Y+1 points to the bottom of the stack frame.
         */
        /*
         * Calling convention
         *
         * - An argument is passed either completely in registers or completely in memory.
         * - To find the register where a function argument is passed, follow this procedure:
         *   0. X = 26
         *   1. If the argument SIZE is an odd number of bytes, round up SIZE to the next even number.
         *   2. X = X -SIZE
         *   3. If the new X is at least 8 and the size of the object is non-zero,
         *      then the low-byte of the argument is passed in RX. Subsequent bytes of the argument
         *      are passed in the subsequent registers, i.e. in increasing register numbers.
         *   4. If X < 8 or the SIZE = 0, the argument will be passed in memory.
         *   5. If the current argument is passed in memory, stop the procedure: All subsequent arguments will also be passed in memory.
         *   6. If there are arguments left, goto 1. and proceed with the next argument.
         *
         * - Return values with a size of 1 byte up to and including a size of 8 bytes will be returned in registers.
         * - Return values whose size is outside that range will be returned in memory.
         * - If the return value of a function is returned in registers, the same registers are used as if
         *   the value was the first parameter of a non-varargs function.
         * For example, an 8-bit value is returned in R24 and an 32-bit value is returned R22...R25.
         */
        // for now, everything is 16-bit (word)
        var AVRSnippets = (function (_super) {
            __extends(AVRSnippets, _super);
            function AVRSnippets() {
                _super.apply(this, arguments);
                // mapping from virtual registers to AVR registers
                this.rmap_lo = {
                    "r0": "r24",
                    "r1": "r22",
                    "r2": "r20",
                    "r3": "r18",
                    "r5": "r26",
                    "r6": "r2" // Z - we really mean r2 YES, because r30 is used as Z
                };
                this.rmap_hi = {
                    "r0": "r25",
                    "r1": "r23",
                    "r2": "r21",
                    "r3": "r19",
                    "r5": "r27",
                    "r6": "r3"
                };
                this.inst_lo = {
                    "adds": "add",
                    "subs": "sub",
                    "ands": "and",
                    "orrs": "or",
                    "eors": "eor",
                    "muls": "Number_::",
                    "lsls": "Number_::",
                    "asrs": "Number_::",
                    "lsrs": "Number_::" // case SK.GreaterThanGreaterThanGreaterThanToken
                };
                this.inst_hi = {
                    "adds": "adc",
                    "subs": "sbc",
                    "ands": "and",
                    "orrs": "or",
                    "eors": "eor"
                };
            }
            AVRSnippets.prototype.nop = function () { return "nop"; };
            AVRSnippets.prototype.reg_gets_imm = function (reg, imm) {
                var imm_lo = imm & 0xff;
                var imm_hi = (imm & 0xff00) >> 8;
                return "\n    ldi " + this.rmap_lo[reg] + ", #" + imm_lo + "\n    ldi " + this.rmap_hi[reg] + ", #" + imm_hi;
            };
            AVRSnippets.prototype.push_fixed = function (regs) {
                var _this = this;
                var res = "";
                regs.forEach(function (r) {
                    res = res + ("\npush " + _this.rmap_lo[r] + "\npush " + _this.rmap_hi[r]);
                });
                res += "\n    @dummystack " + regs.length + "\n    in r28, 0x3d\n    in r29, 0x3e";
                return res;
            };
            AVRSnippets.prototype.pop_fixed = function (regs) {
                var _this = this;
                var res = "";
                regs.forEach(function (r) {
                    res = res + ("\npop " + _this.rmap_hi[r] + "\npop " + _this.rmap_lo[r]);
                });
                res += "\n    in r28, 0x3d\n    in r29, 0x3e\n    @dummystack -" + regs.length;
                return res;
            };
            AVRSnippets.prototype.proc_setup = function (main) {
                var set_r1_zero = main ? "eor r1, r1" : "";
                // push the frame pointer
                return "\n    " + set_r1_zero + "\n    push r28\n    push r29\n    @dummystack 1\n    in r28, 0x3d\n    in r29, 0x3e";
            };
            AVRSnippets.prototype.proc_return = function () {
                // pop frame pointer and return
                return "\n    pop r29\n    pop r28\n    in r28, 0x3d\n    in r29, 0x3e\n    @dummystack -1\n    ret";
            };
            AVRSnippets.prototype.debugger_hook = function (lbl) { return "eor r1, r1"; };
            AVRSnippets.prototype.debugger_bkpt = function (lbl) { return "eor r1, r1"; };
            AVRSnippets.prototype.breakpoint = function () { return "eor r1, r1"; };
            AVRSnippets.prototype.push_local = function (reg) {
                return "\n    push " + this.rmap_lo[reg] + "\n    push " + this.rmap_hi[reg] + "\n    @dummystack 1\n    in r28, 0x3d\n    in r29, 0x3e";
            };
            AVRSnippets.prototype.pop_locals = function (n) {
                return "\n    in\tr28, 0x3d\n    in\tr29, 0x3e\n    adiw\tr28, #2*" + n + "\n    out\t0x3d, r28\n    out\t0x3e, r29\n    @dummystack -" + n;
            };
            AVRSnippets.prototype.unconditional_branch = function (lbl) { return "jmp " + lbl; };
            AVRSnippets.prototype.beq = function (lbl) { return "breq " + lbl; };
            AVRSnippets.prototype.bne = function (lbl) { return "brne " + lbl; };
            AVRSnippets.prototype.cmp = function (reg1, reg2) {
                var reg1_lo = this.rmap_lo[reg1];
                var reg1_hi = this.rmap_hi[reg1];
                var reg2_lo = this.rmap_lo[reg2];
                var reg2_hi = this.rmap_hi[reg2];
                return "\n    cp " + reg1_lo + ", " + reg2_lo + "\n    cpc " + reg1_hi + ", " + reg2_hi;
            };
            AVRSnippets.prototype.cmp_zero = function (reg) {
                var reg_lo = this.rmap_lo[reg];
                return "\n    cp " + reg_lo + ", r1";
            };
            // load_reg_src_off is load/store indirect
            // word? - does offset represent an index that must be multiplied by word size?
            // inf?  - control over size of referenced data
            // str?  - true=Store/false=Load
            AVRSnippets.prototype.load_reg_src_off = function (reg, src, off, word, store, inf) {
                pxtc.assert(src != "r1");
                var tgt_reg = "";
                var prelude = "";
                var _this = this;
                function spill_it(new_off) {
                    prelude += "\n    " + _this.reg_gets_imm("r1", new_off) + "\n    ";
                    if (tgt_reg == "Y") {
                        prelude += "\n    movw r30, r28\n";
                    }
                    prelude += "\n    add r30, " + _this.rmap_lo["r1"] + "\n    adc r31, " + _this.rmap_hi["r1"];
                    off = "0";
                    tgt_reg = "Z";
                }
                // different possibilities for src: r0, r5, sp, r6
                // any indirection we want to do using Y+C, Z+C (recall Y=sp, r6 -> Z)
                if (src != "sp") {
                    prelude = "\n    movw r30, " + this.rmap_lo[src];
                    tgt_reg = "Z";
                }
                else {
                    tgt_reg = "Y"; // sp -> FP = r29
                }
                // different possibilities for off
                if (word || off[0] == "#") {
                    var new_off = 0;
                    if (word) {
                        // word true implies off is an integer
                        new_off = 2 * parseInt(off);
                    }
                    else {
                        // word false means we have #integer
                        new_off = parseInt(off.slice(1));
                    }
                    if (0 <= new_off && new_off <= 63) {
                        off = new_off.toString();
                    }
                    else {
                        spill_it(new_off);
                    }
                }
                else if (off[0] == "r") {
                    if (tgt_reg == "Y") {
                        prelude += "\n    movw r30, r28\n";
                    }
                    prelude += "\n    add r30, " + this.rmap_lo[off] + "\n    adc r31, " + this.rmap_hi[off];
                    off = "0";
                }
                else {
                }
                var _a = ["TBD", "TBD"], off_lo = _a[0], off_hi = _a[1];
                if (off.indexOf("@") == -1) {
                    // in AVR, SP/FP points to next available slot, so need to bump 
                    _b = (tgt_reg == "Y") ? [(parseInt(off) + 2).toString(), (parseInt(off) + 1).toString()] : [off, off + "|1"], off_lo = _b[0], off_hi = _b[1];
                }
                else {
                    // locals@offset and args@offset used in stack context, so also need to handle
                    _c = [off, off + "-1"], off_lo = _c[0], off_hi = _c[1];
                }
                if (store) {
                    return "\n    " + prelude + "\n    std " + tgt_reg + ", " + off_lo + ", " + this.rmap_lo[reg] + "\n    std " + tgt_reg + ", " + off_hi + ", " + this.rmap_hi[reg];
                }
                else {
                    return "\n    " + prelude + "\n    ldd " + this.rmap_lo[reg] + ", " + tgt_reg + ", " + off_lo + "\n    ldd " + this.rmap_hi[reg] + ", " + tgt_reg + ", " + off_hi;
                }
                var _b, _c;
            };
            AVRSnippets.prototype.rt_call = function (name, r0, r1) {
                pxtc.assert(r0 == "r0" && r1 == "r1");
                if (this.inst_lo[name] == "Number_::") {
                    return this.call_lbl("Number_::" + name);
                }
                else {
                    return "\n    " + this.inst_lo[name] + " r24, r22\n    " + this.inst_hi[name] + " r25, r23";
                }
            };
            AVRSnippets.prototype.call_lbl = function (lbl) { return "call " + lbl; };
            AVRSnippets.prototype.call_reg = function (reg) {
                return "\n    movw r30, " + this.rmap_lo[reg] + "\n    icall";
            };
            // no virtuals for now
            AVRSnippets.prototype.vcall = function (mapMethod, isSet, vtableShift) { pxtc.assert(false); return ""; };
            AVRSnippets.prototype.prologue_vtable = function (arg_index, vtableShift) { pxtc.assert(false); return ""; };
            AVRSnippets.prototype.lambda_prologue = function () {
                return "\n    @stackmark args\n    " + this.proc_setup() + "\n    movw r26, r24";
            };
            AVRSnippets.prototype.lambda_epilogue = function () {
                return "\n    call pxtrt::getGlobalsPtr\n    movw r2, r24\n    " + this.proc_return() + "\n    @stackempty args";
            };
            AVRSnippets.prototype.load_ptr = function (lbl, reg) {
                pxtc.assert(!!lbl);
                return "\n    ldi " + this.rmap_lo[reg] + ", " + lbl + "@lo\n    ldi " + this.rmap_hi[reg] + ", " + lbl + "@hi";
            };
            AVRSnippets.prototype.emit_int = function (v, reg) {
                return this.reg_gets_imm(reg, v);
            };
            return AVRSnippets;
        }(pxtc.AssemblerSnippets));
        pxtc.AVRSnippets = AVRSnippets;
    })(pxtc = ts.pxtc || (ts.pxtc = {}));
})(ts || (ts = {}));
var ts;
(function (ts) {
    var pxtc;
    (function (pxtc) {
        // TODO: ARM specific code should be lifted out 
        var jsOpMap = {
            "thumb::adds": "+",
            "thumb::subs": "-",
            "Number_::div": "/",
            "Number_::mod": "%",
            "thumb::muls": "*"
        };
        function shimToJs(shimName) {
            shimName = shimName.replace(/::/g, ".");
            if (shimName.slice(0, 4) == "pxt.")
                shimName = "pxtcore." + shimName.slice(4);
            return "pxsim." + shimName;
        }
        pxtc.shimToJs = shimToJs;
        function vtableToJs(info) {
            var s = ("var " + info.id + "_VT = {\n") +
                ("  name: " + JSON.stringify(pxtc.getName(info.decl)) + ",\n") +
                ("  refmask: " + JSON.stringify(info.refmask) + ",\n") +
                "  methods: [\n";
            for (var _i = 0, _a = info.vtable; _i < _a.length; _i++) {
                var m = _a[_i];
                s += "    " + m.label() + ",\n";
            }
            s += "  ],\n";
            s += "  iface: [\n";
            var i = 0;
            for (var _b = 0, _c = info.itable; _b < _c.length; _b++) {
                var m = _c[_b];
                s += "    " + (m ? m.label() : "null") + ",  // " + (info.itableInfo[i] || ".") + "\n";
                i++;
            }
            s += "  ],\n";
            s += "};\n";
            return s;
        }
        function jsEmit(bin) {
            var jssource = "";
            if (!bin.target.jsRefCounting)
                jssource += "pxsim.noRefCounting();\n";
            bin.procs.forEach(function (p) {
                jssource += "\n" + irToJS(bin, p) + "\n";
            });
            bin.usedClassInfos.forEach(function (info) {
                jssource += vtableToJs(info);
            });
            if (bin.res.breakpoints)
                jssource += "\nsetupDebugger(" + bin.res.breakpoints.length + ")\n";
            jssource += "\npxsim.setupStringLiterals(" +
                JSON.stringify(pxtc.U.mapMap(bin.strings, function (k, v) { return 1; }), null, 1) +
                ")\n";
            bin.writeFile(pxtc.BINARY_JS, jssource);
        }
        pxtc.jsEmit = jsEmit;
        function irToJS(bin, proc) {
            var resText = "";
            var writeRaw = function (s) { resText += s + "\n"; };
            var write = function (s) { resText += "    " + s + "\n"; };
            var EK = pxtc.ir.EK;
            var refCounting = !!bin.target.jsRefCounting;
            writeRaw("\nvar " + proc.label() + " " + (bin.procs[0] == proc ? "= entryPoint" : "") + " = function (s) {\nvar r0 = s.r0, step = s.pc;\ns.pc = -1;\nwhile (true) { \nif (yieldSteps-- < 0 && maybeYield(s, step, r0)) return null;\nswitch (step) {\n  case 0:\n");
            //console.log(proc.toString())
            proc.resolve();
            //console.log("OPT", proc.toString())
            proc.locals.forEach(function (l) {
                write(locref(l) + " = 0;");
            });
            if (proc.args.length) {
                write("if (s.lambdaArgs) {");
                proc.args.forEach(function (l, i) {
                    write("  " + locref(l) + " = " + (l.isRef() ? "pxtrt.incr" : "") + "(s.lambdaArgs[" + i + "]);");
                });
                write("  s.lambdaArgs = null;");
                write("}");
            }
            var exprStack = [];
            var lblIdx = 0;
            var asyncContinuations = [];
            for (var _i = 0, _a = proc.body; _i < _a.length; _i++) {
                var s = _a[_i];
                if (s.stmtKind == pxtc.ir.SK.Label)
                    s.lblId = ++lblIdx;
            }
            for (var _b = 0, _c = proc.body; _b < _c.length; _b++) {
                var s = _c[_b];
                switch (s.stmtKind) {
                    case pxtc.ir.SK.Expr:
                        emitExpr(s.expr);
                        break;
                    case pxtc.ir.SK.StackEmpty:
                        for (var _d = 0, exprStack_1 = exprStack; _d < exprStack_1.length; _d++) {
                            var e = exprStack_1[_d];
                            if (e.totalUses !== e.currUses)
                                pxtc.oops();
                        }
                        exprStack = [];
                        break;
                    case pxtc.ir.SK.Jmp:
                        emitJmp(s);
                        break;
                    case pxtc.ir.SK.Label:
                        writeRaw("  case " + s.lblId + ":");
                        break;
                    case pxtc.ir.SK.Breakpoint:
                        emitBreakpoint(s);
                        break;
                    default: pxtc.oops();
                }
            }
            write("return leave(s, r0)");
            writeRaw("  default: oops()");
            writeRaw("} } }");
            var info = pxtc.nodeLocationInfo(proc.action);
            info.functionName = proc.getName();
            writeRaw(proc.label() + ".info = " + JSON.stringify(info));
            if (proc.isRoot)
                writeRaw(proc.label() + ".continuations = [ " + asyncContinuations.join(",") + " ]");
            return resText;
            function emitBreakpoint(s) {
                var id = s.breakpointInfo.id;
                write("s.lastBrkId = " + id + ";");
                if (!bin.options.breakpoints)
                    return;
                var lbl = ++lblIdx;
                var brkCall = "return breakpoint(s, " + lbl + ", " + id + ", r0);";
                if (s.breakpointInfo.isDebuggerStmt)
                    write(brkCall);
                else
                    write("if ((breakAlways && isBreakFrame(s)) || breakpoints[" + id + "]) " + brkCall);
                writeRaw("  case " + lbl + ":");
            }
            function locref(cell) {
                if (cell.isGlobal())
                    return "globals." + cell.uniqueName();
                else if (cell.iscap)
                    return "s.caps[" + cell.index + "]";
                return "s." + cell.uniqueName();
            }
            function emitJmp(jmp) {
                var trg = "{ step = " + jmp.lbl.lblId + "; continue; }";
                if (jmp.jmpMode == pxtc.ir.JmpMode.Always) {
                    if (jmp.expr)
                        emitExpr(jmp.expr);
                    write(trg);
                }
                else if (jmp.jmpMode == pxtc.ir.JmpMode.IfJmpValEq) {
                    write("if (r0 == (" + emitExprInto(jmp.expr) + ")) " + trg);
                }
                else {
                    emitExpr(jmp.expr);
                    if (jmp.jmpMode == pxtc.ir.JmpMode.IfNotZero) {
                        write("if (r0) " + trg);
                    }
                    else {
                        write("if (!r0) " + trg);
                    }
                }
            }
            function withRef(name, isRef) {
                return name + (isRef ? "Ref" : "");
            }
            function emitExprInto(e) {
                switch (e.exprKind) {
                    case EK.NumberLiteral:
                        if (e.data === true)
                            return "1";
                        else if (e.data === false)
                            return "0";
                        else if (e.data === null)
                            return "0";
                        else if (typeof e.data == "number")
                            return e.data + "";
                        else
                            throw pxtc.oops();
                    case EK.PointerLiteral:
                        return e.jsInfo;
                    case EK.SharedRef:
                        var arg = e.args[0];
                        pxtc.U.assert(!!arg.currUses); // not first use
                        pxtc.U.assert(arg.currUses < arg.totalUses);
                        arg.currUses++;
                        var idx = exprStack.indexOf(arg);
                        pxtc.U.assert(idx >= 0);
                        return "s.tmp_" + idx;
                    case EK.CellRef:
                        var cell = e.data;
                        return locref(cell);
                    default: throw pxtc.oops();
                }
            }
            // result in R0
            function emitExpr(e) {
                //console.log(`EMITEXPR ${e.sharingInfo()} E: ${e.toString()}`)
                switch (e.exprKind) {
                    case EK.JmpValue:
                        write("// jmp value (already in r0)");
                        break;
                    case EK.Nop:
                        write("// nop");
                        break;
                    case EK.Incr:
                        emitExpr(e.args[0]);
                        if (refCounting)
                            write("pxtrt.incr(r0);");
                        break;
                    case EK.Decr:
                        emitExpr(e.args[0]);
                        if (refCounting)
                            write("pxtrt.decr(r0);");
                        break;
                    case EK.FieldAccess:
                        var info_1 = e.data;
                        if (info_1.shimName) {
                            pxtc.assert(!refCounting);
                            emitExpr(e.args[0]);
                            write("r0 = r0" + info_1.shimName + ";");
                            return;
                        }
                        // it does the decr itself, no mask
                        return emitExpr(pxtc.ir.rtcall(withRef("pxtrt::ldfld", info_1.isRef), [e.args[0], pxtc.ir.numlit(info_1.idx)]));
                    case EK.Store:
                        return emitStore(e.args[0], e.args[1]);
                    case EK.RuntimeCall:
                        return emitRtCall(e);
                    case EK.ProcCall:
                        return emitProcCall(e);
                    case EK.SharedDef:
                        return emitSharedDef(e);
                    case EK.Sequence:
                        return e.args.forEach(emitExpr);
                    default:
                        write("r0 = " + emitExprInto(e) + ";");
                }
            }
            function emitSharedDef(e) {
                var arg = e.args[0];
                pxtc.U.assert(arg.totalUses >= 1);
                pxtc.U.assert(arg.currUses === 0);
                arg.currUses = 1;
                if (arg.totalUses == 1)
                    return emitExpr(arg);
                else {
                    emitExpr(arg);
                    var idx = exprStack.length;
                    exprStack.push(arg);
                    write("s.tmp_" + idx + " = r0;");
                }
            }
            function emitRtCall(topExpr) {
                var info = pxtc.ir.flattenArgs(topExpr);
                info.precomp.forEach(emitExpr);
                var name = topExpr.data;
                var args = info.flattened.map(emitExprInto);
                var text = "";
                if (name[0] == ".")
                    text = "" + args[0] + name + "(" + args.slice(1).join(", ") + ")";
                else if (pxtc.U.startsWith(name, "new "))
                    text = "new " + shimToJs(name.slice(4)) + "(" + args.join(", ") + ")";
                else if (args.length == 2 && bin.target.floatingPoint && pxtc.U.lookup(jsOpMap, name))
                    text = "(" + args[0] + " " + pxtc.U.lookup(jsOpMap, name) + " " + args[1] + ")";
                else
                    text = shimToJs(name) + "(" + args.join(", ") + ")";
                if (topExpr.callingConvention == pxtc.ir.CallingConvention.Plain) {
                    write("r0 = " + text + ";");
                }
                else {
                    var loc = ++lblIdx;
                    asyncContinuations.push(loc);
                    if (topExpr.callingConvention == pxtc.ir.CallingConvention.Promise) {
                        write("(function(cb) { " + text + ".done(cb) })(buildResume(s, " + loc + "));");
                    }
                    else {
                        write("setupResume(s, " + loc + ");");
                        write(text + ";");
                    }
                    write("checkResumeConsumed();");
                    write("return;");
                    writeRaw("  case " + loc + ":");
                    write("r0 = s.retval;");
                }
            }
            function emitProcCall(topExpr) {
                var frameExpr = pxtc.ir.rtcall("<frame>", []);
                frameExpr.totalUses = 1;
                frameExpr.currUses = 0;
                var frameIdx = exprStack.length;
                exprStack.push(frameExpr);
                var procid = topExpr.data;
                var proc = procid.proc;
                var frameRef = "s.tmp_" + frameIdx;
                var lblId = ++lblIdx;
                write(frameRef + " = { fn: " + (proc ? proc.label() : null) + ", parent: s };");
                //console.log("PROCCALL", topExpr.toString())
                topExpr.args.forEach(function (a, i) {
                    emitExpr(a);
                    write(frameRef + ".arg" + i + " = r0;");
                });
                write("s.pc = " + lblId + ";");
                if (procid.ifaceIndex != null) {
                    if (procid.mapMethod) {
                        write("if (" + frameRef + ".arg0.vtable === 42) {");
                        var args = topExpr.args.map(function (a, i) { return (frameRef + ".arg" + i); });
                        args.splice(1, 0, procid.mapIdx.toString());
                        write("  s.retval = " + shimToJs(procid.mapMethod) + "(" + args.join(", ") + ");");
                        write("  " + frameRef + ".fn = doNothing;");
                        write("} else");
                    }
                    write(frameRef + ".fn = " + frameRef + ".arg0.vtable.iface[" + procid.ifaceIndex + "];");
                }
                else if (procid.virtualIndex != null) {
                    pxtc.assert(procid.virtualIndex >= 0);
                    write(frameRef + ".fn = " + frameRef + ".arg0.vtable.methods[" + procid.virtualIndex + "];");
                }
                write("return actionCall(" + frameRef + ")");
                writeRaw("  case " + lblId + ":");
                write("r0 = s.retval;");
                frameExpr.currUses = 1;
            }
            function bitSizeConverter(b) {
                switch (b) {
                    case 0 /* None */: return "";
                    case 1 /* Int8 */: return "pxsim.pxtrt.toInt8";
                    case 3 /* Int16 */: return "pxsim.pxtrt.toInt16";
                    case 5 /* Int32 */: return "pxsim.pxtrt.toInt32";
                    case 2 /* UInt8 */: return "pxsim.pxtrt.toUInt8";
                    case 4 /* UInt16 */: return "pxsim.pxtrt.toUInt16";
                    default: throw pxtc.oops();
                }
            }
            function emitStore(trg, src) {
                switch (trg.exprKind) {
                    case EK.CellRef:
                        var cell = trg.data;
                        emitExpr(src);
                        write(locref(cell) + " = " + bitSizeConverter(cell.bitSize) + "(r0);");
                        break;
                    case EK.FieldAccess:
                        var info_2 = trg.data;
                        // it does the decr itself, no mask
                        emitExpr(pxtc.ir.rtcall(withRef("pxtrt::stfld", info_2.isRef), [trg.args[0], pxtc.ir.numlit(info_2.idx), src]));
                        break;
                    default: pxtc.oops();
                }
            }
        }
    })(pxtc = ts.pxtc || (ts.pxtc = {}));
})(ts || (ts = {}));
// Make sure backbase.ts is loaded before us, otherwise 'extends AssemblerSnippets' fails at runtime
/// <reference path="backbase.ts"/>
var ts;
(function (ts) {
    var pxtc;
    (function (pxtc) {
        // snippets for ARM Thumb assembly
        var ThumbSnippets = (function (_super) {
            __extends(ThumbSnippets, _super);
            function ThumbSnippets() {
                _super.apply(this, arguments);
            }
            ThumbSnippets.prototype.nop = function () { return "nop"; };
            ThumbSnippets.prototype.reg_gets_imm = function (reg, imm) {
                return "movs " + reg + ", #" + imm;
            };
            ThumbSnippets.prototype.push_fixed = function (regs) { return "push {" + regs.join(", ") + "}"; };
            ThumbSnippets.prototype.pop_fixed = function (regs) { return "pop {" + regs.join(", ") + "}"; };
            ThumbSnippets.prototype.proc_setup = function (main) { return "push {lr}"; };
            ThumbSnippets.prototype.proc_return = function () { return "pop {pc}"; };
            ThumbSnippets.prototype.debugger_hook = function (lbl) {
                return "\n    ldr r0, [r6, #0]\n    lsls r0, r0, #30\n    bmi " + lbl + "\n" + (lbl + "_after") + ":\n";
            };
            ThumbSnippets.prototype.debugger_bkpt = function (lbl) {
                return "\n    ldr r0, [r6, #0]\n    lsls r0, r0, #31\n    bpl " + lbl + "\n    bkpt 2\n" + lbl + ":";
            };
            ThumbSnippets.prototype.breakpoint = function () {
                return "bkpt 1";
            };
            ThumbSnippets.prototype.push_local = function (reg) { return "push {" + reg + "}"; };
            ThumbSnippets.prototype.pop_locals = function (n) { return "add sp, #4*" + n + " ; pop locals" + n; };
            ThumbSnippets.prototype.unconditional_branch = function (lbl) { return "bb " + lbl; };
            ThumbSnippets.prototype.beq = function (lbl) { return "beq " + lbl; };
            ThumbSnippets.prototype.bne = function (lbl) { return "bne " + lbl; };
            ThumbSnippets.prototype.cmp = function (reg1, reg2) { return "cmp " + reg1 + ", " + reg2; };
            ThumbSnippets.prototype.cmp_zero = function (reg1) { return "cmp " + reg1 + ", #0"; };
            ThumbSnippets.prototype.load_reg_src_off = function (reg, src, off, word, store, inf) {
                if (word) {
                    off = "#4*" + off;
                }
                var str = "str";
                var ldr = "ldr";
                if (inf) {
                    if (inf.immLimit == 32)
                        str = "strb";
                    else if (inf.immLimit == 64)
                        str = "strh";
                    if (inf.needsSignExt)
                        ldr = str.replace("str", "ldrs");
                    else
                        ldr = str.replace("str", "ldr");
                }
                if (store)
                    return str + " " + reg + ", [" + src + ", " + off + "]";
                else
                    return ldr + " " + reg + ", [" + src + ", " + off + "]";
            };
            ThumbSnippets.prototype.rt_call = function (name, r0, r1) {
                return name + " " + r0 + ", " + r1;
            };
            ThumbSnippets.prototype.call_lbl = function (lbl) {
                return "bl " + lbl;
            };
            ThumbSnippets.prototype.call_reg = function (reg) {
                return "blx " + reg;
            };
            ThumbSnippets.prototype.vcall = function (mapMethod, isSet, vtableShift) {
                return "\n    ldr r0, [sp, #" + (isSet ? 4 : 0) + "] ; ld-this\n    ldrh r3, [r0, #2] ; ld-vtable\n    lsls r3, r3, #" + vtableShift + "\n    ldr r3, [r3, #4] ; iface table\n    cmp r3, #43\n    beq .objlit\n.nonlit:\n    lsls r1, " + (isSet ? "r2" : "r1") + ", #2\n    ldr r0, [r3, r1] ; ld-method\n    bx r0\n.objlit:\n    " + (isSet ? "ldr r2, [sp, #0]" : "") + "\n    push {lr}\n    bl " + mapMethod + "\n    pop {pc}\n";
            };
            ThumbSnippets.prototype.prologue_vtable = function (arg_top_index, vtableShift) {
                return "\n    ldr r0, [sp, #4*" + arg_top_index + "]  ; ld-this\n    ldrh r0, [r0, #2] ; ld-vtable\n    lsls r0, r0, #" + vtableShift + "\n    ";
            };
            ThumbSnippets.prototype.lambda_prologue = function () {
                return "\n    @stackmark args\n    push {lr}\n    mov r5, r0\n";
            };
            ThumbSnippets.prototype.lambda_epilogue = function () {
                return "\n    bl pxtrt::getGlobalsPtr\n    mov r6, r0\n    pop {pc}\n    @stackempty args\n";
            };
            ThumbSnippets.prototype.load_ptr = function (lbl, reg) {
                pxtc.assert(!!lbl);
                return "\n    movs " + reg + ", " + lbl + "@hi  ; ldptr\n    lsls " + reg + ", " + reg + ", #8\n    adds " + reg + ", " + lbl + "@lo\n";
            };
            ThumbSnippets.prototype.emit_int = function (v, reg) {
                var movWritten = false;
                function writeMov(v) {
                    pxtc.assert(0 <= v && v <= 255);
                    var result = "";
                    if (movWritten) {
                        if (v)
                            result = "adds " + reg + ", #" + v + "\n";
                    }
                    else
                        result = "movs " + reg + ", #" + v + "\n";
                    movWritten = true;
                    return result;
                }
                function shift(v) {
                    if (v === void 0) { v = 8; }
                    return "lsls " + reg + ", " + reg + ", #" + v + "\n";
                }
                pxtc.assert(v != null);
                var n = Math.floor(v);
                var isNeg = false;
                if (n < 0) {
                    isNeg = true;
                    n = -n;
                }
                // compute number of lower-order 0s and shift that amount
                var numShift = 0;
                if (n > 0xff) {
                    var shifted = n;
                    while ((shifted & 1) == 0) {
                        shifted >>>= 1;
                        numShift++;
                    }
                    if (pxtc.numBytes(shifted) < pxtc.numBytes(n)) {
                        n = shifted;
                    }
                    else {
                        numShift = 0;
                    }
                }
                var result = "";
                switch (pxtc.numBytes(n)) {
                    case 4:
                        result += writeMov((n >>> 24) & 0xff);
                        result += shift();
                    case 3:
                        result += writeMov((n >>> 16) & 0xff);
                        result += shift();
                    case 2:
                        result += writeMov((n >>> 8) & 0xff);
                        result += shift();
                    case 1:
                        result += writeMov(n & 0xff);
                        break;
                    default:
                        pxtc.oops();
                }
                if (numShift)
                    result += shift(numShift);
                if (isNeg) {
                    result += "negs " + reg + ", " + reg;
                }
                return result;
            };
            return ThumbSnippets;
        }(pxtc.AssemblerSnippets));
        pxtc.ThumbSnippets = ThumbSnippets;
    })(pxtc = ts.pxtc || (ts.pxtc = {}));
})(ts || (ts = {}));
var pxt;
(function (pxt) {
    var Cloud;
    (function (Cloud) {
        var Util = pxtc.Util;
        Cloud.apiRoot = "https://www.pxt.io/api/";
        Cloud.accessToken = "";
        Cloud.localToken = "";
        var _isOnline = true;
        Cloud.onOffline = function () { };
        function offlineError(url) {
            var e = new Error(Util.lf("Cannot access {0} while offline", url));
            e.isOffline = true;
            return Promise.delay(1000).then(function () { return Promise.reject(e); });
        }
        function hasAccessToken() {
            return !!Cloud.accessToken;
        }
        Cloud.hasAccessToken = hasAccessToken;
        function isLocalHost() {
            try {
                return /^http:\/\/(localhost|127\.0\.0\.1):\d+\//.test(window.location.href)
                    && !/nolocalhost=1/.test(window.location.href)
                    && !pxt.webConfig.isStatic;
            }
            catch (e) {
                return false;
            }
        }
        Cloud.isLocalHost = isLocalHost;
        function privateRequestAsync(options) {
            options.url = Cloud.apiRoot + options.url;
            options.allowGzipPost = true;
            if (!Cloud.isOnline()) {
                return offlineError(options.url);
            }
            if (Cloud.accessToken) {
                if (!options.headers)
                    options.headers = {};
                options.headers["x-td-access-token"] = Cloud.accessToken;
            }
            return Util.requestAsync(options)
                .catch(function (e) {
                if (e.statusCode == 0) {
                    if (_isOnline) {
                        _isOnline = false;
                        Cloud.onOffline();
                    }
                    return offlineError(options.url);
                }
                else {
                    return Promise.reject(e);
                }
            });
        }
        Cloud.privateRequestAsync = privateRequestAsync;
        function privateGetTextAsync(path) {
            return privateRequestAsync({ url: path }).then(function (resp) { return resp.text; });
        }
        Cloud.privateGetTextAsync = privateGetTextAsync;
        function privateGetAsync(path) {
            return privateRequestAsync({ url: path }).then(function (resp) { return resp.json; });
        }
        Cloud.privateGetAsync = privateGetAsync;
        function downloadScriptFilesAsync(id) {
            return privateRequestAsync({ url: id + "/text" }).then(function (resp) {
                return JSON.parse(resp.text);
            });
        }
        Cloud.downloadScriptFilesAsync = downloadScriptFilesAsync;
        function downloadMarkdownAsync(docid, locale, live) {
            docid = docid.replace(/^\//, "");
            var url = "md/" + pxt.appTarget.id + "/" + docid;
            if (locale != "en") {
                url += "?lang=" + encodeURIComponent(Util.userLanguage());
                if (live)
                    url += "&live=1";
            }
            if (Cloud.isLocalHost() && !live)
                return Util.requestAsync({
                    url: "/api/" + url,
                    headers: { "Authorization": Cloud.localToken },
                    method: "GET",
                    allowHttpErrors: true
                }).then(function (resp) {
                    if (resp.statusCode == 404)
                        return privateGetTextAsync(url);
                    else
                        return resp.json;
                });
            else
                return privateGetTextAsync(url);
        }
        Cloud.downloadMarkdownAsync = downloadMarkdownAsync;
        function privateDeleteAsync(path) {
            return privateRequestAsync({ url: path, method: "DELETE" }).then(function (resp) { return resp.json; });
        }
        Cloud.privateDeleteAsync = privateDeleteAsync;
        function privatePostAsync(path, data) {
            return privateRequestAsync({ url: path, data: data || {} }).then(function (resp) { return resp.json; });
        }
        Cloud.privatePostAsync = privatePostAsync;
        function isLoggedIn() { return !!Cloud.accessToken; }
        Cloud.isLoggedIn = isLoggedIn;
        function isOnline() { return _isOnline; }
        Cloud.isOnline = isOnline;
        function getServiceUrl() {
            return Cloud.apiRoot.replace(/\/api\/$/, "");
        }
        Cloud.getServiceUrl = getServiceUrl;
        function getUserId() {
            var m = /^0(\w+)\./.exec(Cloud.accessToken);
            if (m)
                return m[1];
            return null;
        }
        Cloud.getUserId = getUserId;
        function parseScriptId(uri) {
            var target = pxt.appTarget;
            if (!uri || !target.appTheme || !target.appTheme.embedUrl)
                return undefined;
            var embedUrl = Util.escapeForRegex(Util.stripUrlProtocol(target.appTheme.embedUrl));
            var m = new RegExp("^((https://)?" + embedUrl + ")?(api/oembed?url=.*%2F([^&]*)&.*?|(.+))$", 'i').exec(uri.trim());
            var scriptid = m && (m[3] || m[4]) ? (m[3] ? m[3].toLowerCase() : m[4].toLowerCase()) : null;
            return scriptid;
        }
        Cloud.parseScriptId = parseScriptId;
    })(Cloud = pxt.Cloud || (pxt.Cloud = {}));
})(pxt || (pxt = {}));
var ts;
(function (ts) {
    var pxtc;
    (function (pxtc) {
        var decompiler;
        (function (decompiler) {
            var SK = ts.SyntaxKind;
            var lowerCaseAlphabetStartCode = 97;
            var lowerCaseAlphabetEndCode = 122;
            var ShadowType;
            (function (ShadowType) {
                ShadowType[ShadowType["Boolean"] = 0] = "Boolean";
                ShadowType[ShadowType["Number"] = 1] = "Number";
                ShadowType[ShadowType["String"] = 2] = "String";
            })(ShadowType || (ShadowType = {}));
            var ops = {
                "+": { type: "math_arithmetic", op: "ADD" },
                "-": { type: "math_arithmetic", op: "MINUS" },
                "/": { type: "math_arithmetic", op: "DIVIDE" },
                "*": { type: "math_arithmetic", op: "MULTIPLY" },
                "%": { type: "math_modulo", leftName: "DIVIDEND", rightName: "DIVISOR" },
                "<": { type: "logic_compare", op: "LT" },
                "<=": { type: "logic_compare", op: "LTE" },
                ">": { type: "logic_compare", op: "GT" },
                ">=": { type: "logic_compare", op: "GTE" },
                "==": { type: "logic_compare", op: "EQ" },
                "===": { type: "logic_compare", op: "EQ" },
                "!=": { type: "logic_compare", op: "NEQ" },
                "!==": { type: "logic_compare", op: "NEQ" },
                "&&": { type: "logic_operation", op: "AND" },
                "||": { type: "logic_operation", op: "OR" },
            };
            /*
             * Matches a single line comment and extracts the text.
             * Breakdown:
             *     ^\s*     - matches leading whitespace
             *      \/\/s*  - matches double slash
             *      (.*)    - matches rest of the comment
             */
            var singleLineCommentRegex = /^\s*\/\/\s*(.*)$/;
            /*
             * Matches one line of a multi-line comment and extracts the text.
             * Breakdown:
             *      ^\s*                                        - matches leading whitespace
             *      (?:\/\*\*?)                                 - matches beginning of a multi-line comment (/* or /**)
             *      (?:\*)                                      - matches a single asterisk that might begin a line in the body of the comment
             *      (?:(?:(?:\/\*\*?)|(?:\*))(?!\/))            - combines the previous two regexes but does not match either if followed by a slash
             *      ^\s*(?:(?:(?:\/\*\*?)|(?:\*))(?!\/))?\s*    - matches all possible beginnings of a multi-line comment line (/*, /**, *, or just whitespace)
             *      (.*?)                                       - matches the text of the comment line
             *      (?:\*?\*\/)?$                               - matches the end of the multiline comment (one or two asterisks and a slash) or the end of a line within the comment
             */
            var multiLineCommentRegex = /^\s*(?:(?:(?:\/\*\*?)|(?:\*))(?!\/))?\s*(.*?)(?:\*?\*\/)?$/;
            var builtinBlocks = {
                "Math.random": { blockId: "device_random", block: "pick random 0 to %limit" },
                "Math.abs": { blockId: "math_op3", block: "absolute of %x" },
                "Math.min": { blockId: "math_op2", block: "of %x|and %y" },
                "Math.max": { blockId: "math_op2", block: "of %x|and %y", fields: "<field name=\"op\">max</field>" }
            };
            var RenameMap = (function () {
                function RenameMap(renames) {
                    this.renames = renames;
                    this.renames.sort(function (a, b) { return a.span.start - b.span.start; });
                }
                RenameMap.prototype.getRenamesInSpan = function (start, end) {
                    var res = [];
                    for (var _i = 0, _a = this.renames; _i < _a.length; _i++) {
                        var rename = _a[_i];
                        if (rename.span.start > end) {
                            break;
                        }
                        else if (rename.span.start >= start) {
                            res.push(rename);
                        }
                    }
                    return res;
                };
                RenameMap.prototype.getRenameForPosition = function (position) {
                    for (var _i = 0, _a = this.renames; _i < _a.length; _i++) {
                        var rename = _a[_i];
                        if (rename.span.start > position) {
                            return undefined;
                        }
                        else if (rename.span.start === position) {
                            return rename;
                        }
                    }
                    return undefined;
                };
                return RenameMap;
            }());
            decompiler.RenameMap = RenameMap;
            var LSHost = (function () {
                function LSHost(p) {
                    this.p = p;
                }
                LSHost.prototype.getCompilationSettings = function () {
                    var opts = this.p.getCompilerOptions();
                    opts.noLib = true;
                    return opts;
                };
                LSHost.prototype.getNewLine = function () { return "\n"; };
                LSHost.prototype.getScriptFileNames = function () {
                    return this.p.getSourceFiles().map(function (f) { return f.fileName; });
                };
                LSHost.prototype.getScriptVersion = function (fileName) {
                    return "0";
                };
                LSHost.prototype.getScriptSnapshot = function (fileName) {
                    var f = this.p.getSourceFile(fileName);
                    return {
                        getLength: function () { return f.getFullText().length; },
                        getText: function () { return f.getFullText(); },
                        getChangeRange: function () { return undefined; }
                    };
                };
                LSHost.prototype.getCurrentDirectory = function () { return "."; };
                LSHost.prototype.getDefaultLibFileName = function (options) { return null; };
                LSHost.prototype.useCaseSensitiveFileNames = function () { return true; };
                return LSHost;
            }());
            /**
             * Uses the language service to ensure that there are no duplicate variable
             * names in the given file. All variables in Blockly are global, so this is
             * necessary to prevent local variables from colliding.
             */
            function buildRenameMap(p, s) {
                var service = ts.createLanguageService(new LSHost(p));
                var allRenames = [];
                collectNameCollisions();
                if (allRenames.length) {
                    return new RenameMap(allRenames);
                }
                return undefined;
                function collectNameCollisions() {
                    var takenNames = {};
                    checkChildren(s);
                    function checkChildren(n) {
                        ts.forEachChild(n, function (child) {
                            if (ts.isDeclaration(child) && ts.isVariableLike(child) && child.name.kind === SK.Identifier) {
                                var name_2 = child.name.getText();
                                if (takenNames[name_2]) {
                                    var newName_1 = getNewName(name_2);
                                    var renames = service.findRenameLocations(s.fileName, child.name.pos + 1, false, false);
                                    if (renames) {
                                        renames.forEach(function (r) {
                                            allRenames.push({
                                                name: newName_1,
                                                diff: newName_1.length - name_2.length,
                                                span: r.textSpan
                                            });
                                        });
                                    }
                                }
                                else {
                                    takenNames[name_2] = true;
                                }
                            }
                            checkChildren(child);
                        });
                    }
                    function getNewName(name) {
                        // If the variable is a single lower case letter, try and rename it to a different letter (i.e. i -> j)
                        if (name.length === 1) {
                            var charCode = name.charCodeAt(0);
                            if (charCode >= lowerCaseAlphabetStartCode && charCode <= lowerCaseAlphabetEndCode) {
                                var offset = charCode - lowerCaseAlphabetStartCode;
                                for (var i = 1; i < 26; i++) {
                                    var newChar = String.fromCharCode(lowerCaseAlphabetStartCode + ((offset + i) % 26));
                                    if (!takenNames[newChar]) {
                                        takenNames[newChar] = true;
                                        return newChar;
                                    }
                                }
                            }
                        }
                        // For all other names, add a number to the end. Start at 2 because it probably makes more sense for kids
                        for (var i = 2;; i++) {
                            var toTest = name + i;
                            if (!takenNames[toTest]) {
                                takenNames[toTest] = true;
                                return toTest;
                            }
                        }
                    }
                }
            }
            decompiler.buildRenameMap = buildRenameMap;
            function decompileToBlocks(blocksInfo, file, options, renameMap) {
                var stmts = file.statements;
                var result = {
                    blocksInfo: blocksInfo,
                    outfiles: {}, diagnostics: [], success: true, times: {}
                };
                var fileText = file.getFullText();
                var output = "";
                var varUsages = {};
                var autoDeclarations = [];
                var n = codeBlock(stmts, undefined, true);
                emitStatementNode(n);
                result.outfiles[file.fileName.replace(/(\.blocks)?\.\w*$/i, '') + '.blocks'] = "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n" + output + "</xml>";
                return result;
                function write(s, suffix) {
                    if (suffix === void 0) { suffix = "\n"; }
                    output += s + suffix;
                }
                function error(n, msg) {
                    var messageText = msg || "Language feature \"" + n.getFullText().trim() + "\"\" not supported in blocks";
                    var diags = pxtc.patchUpDiagnostics([{
                            file: file,
                            start: n.getFullStart(),
                            length: n.getFullWidth(),
                            messageText: messageText,
                            category: ts.DiagnosticCategory.Error,
                            code: 1001
                        }]);
                    pxt.debug("decompilation error: " + messageText);
                    pxtc.U.pushRange(result.diagnostics, diags);
                    result.success = false;
                }
                function isEventExpression(expr) {
                    if (expr.expression.kind == SK.CallExpression) {
                        var call = expr.expression;
                        var callInfo = call.callInfo;
                        if (!callInfo) {
                            error(expr);
                            return false;
                        }
                        return callInfo.attrs.blockId && !callInfo.isExpression && hasArrowFunction(callInfo);
                    }
                    return false;
                }
                function isOutputExpression(expr) {
                    switch (expr.kind) {
                        case SK.BinaryExpression:
                            return !/[=<>]/.test(expr.operatorToken.getText());
                        case SK.PrefixUnaryExpression: {
                            var op = expr.operator;
                            return op != SK.PlusPlusToken && op != SK.MinusMinusToken;
                        }
                        case SK.PostfixUnaryExpression: {
                            var op = expr.operator;
                            return op != SK.PlusPlusToken && op != SK.MinusMinusToken;
                        }
                        case SK.CallExpression:
                            var callInfo = expr.callInfo;
                            if (!callInfo) {
                                error(expr);
                            }
                            return callInfo.isExpression;
                        case SK.ParenthesizedExpression:
                        case SK.NumericLiteral:
                        case SK.StringLiteral:
                        case SK.NoSubstitutionTemplateLiteral:
                        case SK.TrueKeyword:
                        case SK.FalseKeyword:
                        case SK.NullKeyword:
                            return true;
                        default: return false;
                    }
                }
                function emitStatementNode(n) {
                    if (!n) {
                        return;
                    }
                    openBlockTag(n.type);
                    emitBlockNodeCore(n);
                    if (n.handlers) {
                        n.handlers.forEach(emitHandler);
                    }
                    if (n.next) {
                        write("<next>");
                        emitStatementNode(n.next);
                        write("</next>");
                    }
                    if (n.comment !== undefined) {
                        write("<comment pinned=\"false\">" + pxtc.U.htmlEscape(n.comment) + "</comment>");
                    }
                    closeBlockTag();
                }
                function emitBlockNodeCore(n) {
                    if (n.mutation) {
                        write("<mutation ", "");
                        for (var key in n.mutation) {
                            write(key + "=\"" + n.mutation[key] + "\" ", "");
                        }
                        write("/>");
                    }
                    if (n.fields) {
                        n.fields.forEach(emitFieldNode);
                    }
                    if (n.inputs) {
                        n.inputs.forEach(emitValueNode);
                    }
                }
                function emitValueNode(n) {
                    write("<value name=\"" + n.name + "\">");
                    var emitShadowOnly = false;
                    if (n.value.kind === "expr") {
                        var value = n.value;
                        switch (value.type) {
                            case "math_number":
                            case "logic_boolean":
                            case "text":
                                emitShadowOnly = true;
                                break;
                            default:
                        }
                    }
                    if (emitShadowOnly) {
                        emitOutputNode(n.value, true);
                    }
                    else {
                        // Emit a shadow block to appear if the given input is removed
                        if (n.shadowType !== undefined) {
                            switch (n.shadowType) {
                                case ShadowType.Number:
                                    write("<shadow type=\"math_number\"><field name=\"NUM\">0</field></shadow>");
                                    break;
                                case ShadowType.Boolean:
                                    write("<shadow type=\"logic_boolean\"><field name=\"BOOL\">TRUE</field></shadow>");
                                    break;
                                case ShadowType.String:
                                    write("<shadow type=\"text\"><field name=\"TEXT\"></field></shadow>");
                                    break;
                                default:
                            }
                        }
                        emitOutputNode(n.value);
                    }
                    write("</value>");
                }
                function emitFieldNode(n) {
                    write("<field name=\"" + pxtc.U.htmlEscape(n.name) + "\">" + pxtc.U.htmlEscape(n.value.toString()) + "</field>");
                }
                function emitHandler(h) {
                    write("<statement name=\"" + pxtc.U.htmlEscape(h.name) + "\">");
                    emitStatementNode(h.statement);
                    write("</statement>");
                }
                function emitOutputNode(n, shadow) {
                    if (shadow === void 0) { shadow = false; }
                    if (n.kind === "text") {
                        var node = n;
                        write(node.value);
                    }
                    else {
                        var node = n;
                        var tag = shadow ? "shadow" : "block";
                        write("<" + tag + " type=\"" + pxtc.U.htmlEscape(node.type) + "\">");
                        emitBlockNodeCore(node);
                        write("</" + tag + ">");
                    }
                }
                function openBlockTag(type) {
                    write("<block type=\"" + pxtc.U.htmlEscape(type) + "\">");
                }
                function closeBlockTag() {
                    write("</block>");
                }
                function getOutputBlock(n) {
                    if (checkExpression(n)) {
                        return getTypeScriptExpressionBlock(n);
                    }
                    else {
                        switch (n.kind) {
                            case SK.ExpressionStatement:
                                return getOutputBlock(n.expression);
                            case SK.ParenthesizedExpression:
                                return getOutputBlock(n.expression);
                            case SK.Identifier:
                                return getIdentifier(n);
                            case SK.StringLiteral:
                            case SK.FirstTemplateToken:
                            case SK.NoSubstitutionTemplateLiteral:
                                return getStringLiteral(n.text);
                            case SK.NumericLiteral:
                                return getNumericLiteral(n.text);
                            case SK.TrueKeyword:
                                return getBooleanLiteral(true);
                            case SK.FalseKeyword:
                                return getBooleanLiteral(false);
                            case SK.BinaryExpression:
                                return getBinaryExpression(n);
                            case SK.PrefixUnaryExpression:
                                return getPrefixUnaryExpression(n);
                            case SK.PropertyAccessExpression:
                                return getPropertyAccessExpression(n);
                            case SK.CallExpression:
                                return getStatementBlock(n);
                            default:
                                error(n, pxtc.Util.lf("Unsupported syntax kind for output expression block: {0}", SK[n.kind]));
                                break;
                        }
                        return undefined;
                    }
                }
                function applyRenamesInRange(text, start, end) {
                    if (renameMap) {
                        var renames = renameMap.getRenamesInSpan(start, end);
                        if (renames.length) {
                            var offset_1 = 0;
                            renames.forEach(function (rename) {
                                var sIndex = rename.span.start + offset_1 - start;
                                var eIndex = sIndex + rename.span.length;
                                offset_1 += rename.diff;
                                text = text.slice(0, sIndex) + rename.name + text.slice(eIndex);
                            });
                        }
                    }
                    return text;
                }
                function getTypeScriptExpressionBlock(n) {
                    var text = applyRenamesInRange(n.getFullText(), n.getFullStart(), n.getEnd());
                    return getFieldBlock(pxtc.TS_OUTPUT_TYPE, "EXPRESSION", text);
                }
                function getBinaryExpression(n) {
                    var op = n.operatorToken.getText();
                    var npp = ops[op];
                    // Could be string concatenation
                    if (isTextJoin(n)) {
                        var args = [];
                        collectTextJoinArgs(n, args);
                        var result_1 = {
                            kind: "expr",
                            type: "text_join",
                            mutation: {
                                "items": args.length.toString()
                            },
                            inputs: []
                        };
                        for (var i = 0; i < args.length; i++) {
                            result_1.inputs.push(getValue("ADD" + i, args[i], ShadowType.String));
                        }
                        return result_1;
                    }
                    var result = {
                        kind: "expr",
                        type: npp.type,
                        fields: [],
                        inputs: []
                    };
                    if (npp.op) {
                        result.fields.push(getField("OP", npp.op));
                    }
                    var shadowType = (op === "&&" || op === "||") ? ShadowType.Boolean : ShadowType.Number;
                    result.inputs.push(getValue(npp.leftName || "A", n.left, shadowType));
                    result.inputs.push(getValue(npp.rightName || "B", n.right, shadowType));
                    return result;
                    function isTextJoin(n) {
                        if (n.kind === SK.BinaryExpression) {
                            var b = n;
                            if (b.operatorToken.getText() === "+") {
                                var info = n.exprInfo;
                                return !!info;
                            }
                        }
                        return false;
                    }
                    function collectTextJoinArgs(n, result) {
                        if (isTextJoin(n)) {
                            collectTextJoinArgs(n.left, result);
                            collectTextJoinArgs(n.right, result);
                        }
                        else {
                            result.push(n);
                        }
                    }
                }
                function getValue(name, contents, shadowType) {
                    var value;
                    if (typeof contents === "number") {
                        value = getNumericLiteral(contents.toString());
                    }
                    else if (typeof contents === "boolean") {
                        value = getBooleanLiteral(contents);
                    }
                    else if (typeof contents === "string") {
                        value = getStringLiteral(contents);
                    }
                    else {
                        value = getOutputBlock(contents);
                    }
                    return { kind: "value", name: name, value: value, shadowType: shadowType };
                }
                function getIdentifier(identifier) {
                    var name = getVariableName(identifier);
                    varUsages[name] = true;
                    return getFieldBlock("variables_get", "VAR", name);
                }
                function getNumericLiteral(value) {
                    return getFieldBlock("math_number", "NUM", value);
                }
                function getStringLiteral(value) {
                    return getFieldBlock("text", "TEXT", value);
                }
                function getBooleanLiteral(value) {
                    return getFieldBlock("logic_boolean", "BOOL", value ? "TRUE" : "FALSE");
                }
                function getFieldBlock(type, fieldName, value) {
                    return {
                        kind: "expr",
                        type: type,
                        fields: [getField(fieldName, value)]
                    };
                }
                function getField(name, value) {
                    return {
                        kind: "field",
                        name: name,
                        value: value,
                    };
                }
                // TODO: Add a real negation block
                function negateNumericNode(node) {
                    return {
                        kind: "expr",
                        type: "math_arithmetic",
                        inputs: [
                            getValue("A", 0),
                            getValue("B", node, ShadowType.Number)
                        ],
                        fields: [
                            getField("OP", "MINUS")
                        ]
                    };
                }
                function getPrefixUnaryExpression(node) {
                    switch (node.operator) {
                        case SK.ExclamationToken:
                            var r = { kind: "expr", type: "logic_negate" };
                            r.inputs = [getValue("BOOL", node.operand, ShadowType.Boolean)];
                            return r;
                        case SK.PlusToken:
                            return getOutputBlock(node.operand);
                        case SK.MinusToken:
                            if (node.operand.kind == SK.NumericLiteral) {
                                return getNumericLiteral("-" + node.operand.text);
                            }
                            else {
                                return negateNumericNode(node.operand);
                            }
                        default:
                            error(node);
                            break;
                    }
                    return undefined;
                }
                function getPropertyAccessExpression(n) {
                    var callInfo = n.callInfo;
                    if (!callInfo) {
                        error(n);
                        return;
                    }
                    var value = pxtc.U.htmlEscape(callInfo.attrs.blockId || callInfo.qName);
                    if (callInfo.attrs.blockIdentity) {
                        var parentCallInfo = n.parent && n.parent.callInfo;
                        if (callInfo.attrs.enumval && parentCallInfo && parentCallInfo.attrs.useEnumVal) {
                            value = callInfo.attrs.enumval;
                        }
                        var idfn = blocksInfo.apis.byQName[callInfo.attrs.blockIdentity];
                        var f = /%([a-zA-Z0-9_]+)/.exec(idfn.attributes.block);
                        return {
                            kind: "expr",
                            type: pxtc.U.htmlEscape(idfn.attributes.blockId),
                            fields: [{
                                    kind: "field",
                                    name: pxtc.U.htmlEscape(f[1]),
                                    value: value
                                }]
                        };
                    }
                    else {
                        return {
                            kind: "text",
                            value: value
                        };
                    }
                }
                function getStatementBlock(n, next, parent) {
                    var node = n;
                    var stmt;
                    if (checkStatement(node)) {
                        stmt = getTypeScriptStatementBlock(node);
                    }
                    else {
                        switch (node.kind) {
                            case SK.Block:
                                return codeBlock(node.statements, next);
                            case SK.ExpressionStatement:
                                return getStatementBlock(node.expression, next, parent || node);
                            case SK.VariableStatement:
                                return codeBlock(node.declarationList.declarations, next, false, parent || node);
                            case SK.ArrowFunction:
                                return getArrowFunctionStatement(node, next);
                            case SK.BinaryExpression:
                                stmt = getBinaryExpressionStatement(node);
                                break;
                            case SK.PostfixUnaryExpression:
                            case SK.PrefixUnaryExpression:
                                stmt = getIncrementStatement(node);
                                break;
                            case SK.VariableDeclaration:
                                var decl = node;
                                if (isAutoDeclaration(decl)) {
                                    // Don't emit null or automatic initializers;
                                    // They are implicit within the blocks. But do track them in case they
                                    // never get used in the blocks (and thus won't be emitted again)
                                    trackAutoDeclaration(decl);
                                    return getNext();
                                }
                                stmt = getVariableDeclarationStatement(node);
                                break;
                            case SK.WhileStatement:
                                stmt = getWhileStatement(node);
                                break;
                            case SK.IfStatement:
                                stmt = getIfStatement(node);
                                break;
                            case SK.ForStatement:
                                stmt = getForStatement(node);
                                break;
                            case SK.CallExpression:
                                stmt = getCallStatement(node);
                                break;
                            default:
                                if (next) {
                                    error(node, pxtc.Util.lf("Unsupported statement in block: {0}", SK[node.kind]));
                                }
                                else {
                                    error(node, pxtc.Util.lf("Statement kind unsupported in blocks: {0}", SK[node.kind]));
                                }
                                return;
                        }
                    }
                    if (stmt) {
                        stmt.next = getNext();
                        if (stmt.next) {
                            stmt.next.prev = stmt;
                        }
                    }
                    var commentRanges = ts.getLeadingCommentRangesOfNode(parent || node, file);
                    if (commentRanges) {
                        var commentText = getCommentText(commentRanges);
                        if (commentText && stmt) {
                            stmt.comment = commentText;
                        }
                        else {
                        }
                    }
                    return stmt;
                    function getNext() {
                        if (next && next.length) {
                            return getStatementBlock(next.shift(), next);
                        }
                        return undefined;
                    }
                }
                function getTypeScriptStatementBlock(node) {
                    var r = {
                        kind: "statement",
                        type: pxtc.TS_STATEMENT_TYPE,
                        mutation: {}
                    };
                    var text = node.getText();
                    var start = node.getStart();
                    var end = node.getEnd();
                    text = applyRenamesInRange(text, start, end);
                    var declaredVariables = [];
                    if (node.kind === SK.VariableStatement) {
                        for (var _i = 0, _a = node.declarationList.declarations; _i < _a.length; _i++) {
                            var declaration = _a[_i];
                            declaredVariables.push(getVariableName(declaration.name));
                        }
                    }
                    if (declaredVariables.length) {
                        r.mutation["declaredvars"] = declaredVariables.join(",");
                    }
                    var parts = text.split("\n");
                    r.mutation["numlines"] = parts.length.toString();
                    parts.forEach(function (p, i) {
                        r.mutation[("line" + i)] = pxtc.U.htmlEscape(p);
                    });
                    return r;
                }
                function getImageLiteralStatement(node, info) {
                    var arg = node.arguments[0];
                    if (arg.kind != SK.StringLiteral && arg.kind != SK.NoSubstitutionTemplateLiteral) {
                        error(node);
                        return;
                    }
                    var res = {
                        kind: "statement",
                        type: info.attrs.blockId,
                        fields: []
                    };
                    var leds = (arg.text || '').replace(/\s+/g, '');
                    var nc = info.attrs.imageLiteral * 5;
                    if (nc * 5 != leds.length) {
                        error(node, pxtc.Util.lf("Invalid image pattern"));
                        return;
                    }
                    for (var r = 0; r < 5; ++r) {
                        for (var c = 0; c < nc; ++c) {
                            res.fields.push(getField("LED" + c + r, /[#*1]/.test(leds[r * nc + c]) ? "TRUE" : "FALSE"));
                        }
                    }
                    return res;
                }
                function getBinaryExpressionStatement(n) {
                    if (n.left.kind !== SK.Identifier) {
                        error(n, pxtc.Util.lf("Only variable names may be assigned to"));
                        return;
                    }
                    var name = n.left.text;
                    switch (n.operatorToken.kind) {
                        case SK.EqualsToken:
                            return getVariableSetOrChangeBlock(n.left, n.right);
                        case SK.PlusEqualsToken:
                            return getVariableSetOrChangeBlock(n.left, n.right, true);
                        case SK.MinusEqualsToken:
                            return {
                                kind: "statement",
                                type: "variables_change",
                                inputs: [{
                                        kind: "value",
                                        name: "VALUE",
                                        value: negateNumericNode(n.right),
                                        shadowType: ShadowType.Number
                                    }],
                                fields: [getField("VAR", getVariableName(n.left))]
                            };
                        default:
                            error(n, pxtc.Util.lf("Unsupported operator token in statement {0}", SK[n.operatorToken.kind]));
                            return;
                    }
                }
                function getWhileStatement(n) {
                    return {
                        kind: "statement",
                        type: "device_while",
                        inputs: [getValue("COND", n.expression, ShadowType.Boolean)],
                        handlers: [{ name: "DO", statement: getStatementBlock(n.statement) }]
                    };
                }
                function getIfStatement(n) {
                    var flatif = flattenIfStatement(n);
                    var r = {
                        kind: "statement",
                        type: "controls_if",
                        mutation: {
                            "elseif": (flatif.ifStatements.length - 1).toString(),
                            "else": flatif.elseStatement ? "1" : "0"
                        },
                        inputs: [],
                        handlers: []
                    };
                    flatif.ifStatements.forEach(function (stmt, i) {
                        r.inputs.push(getValue("IF" + i, stmt.expression, ShadowType.Boolean));
                        r.handlers.push({ name: "DO" + i, statement: getStatementBlock(stmt.thenStatement) });
                    });
                    if (flatif.elseStatement) {
                        r.handlers.push({ name: "ELSE", statement: getStatementBlock(flatif.elseStatement) });
                    }
                    return r;
                }
                function getForStatement(n) {
                    var initializer = n.initializer;
                    var indexVar = initializer.declarations[0].name.text;
                    var condition = n.condition;
                    var r = {
                        kind: "statement",
                        type: "controls_simple_for",
                        fields: [getField("VAR", getVariableName(initializer.declarations[0].name))],
                        inputs: [],
                        handlers: []
                    };
                    // FIXME: We never decompile repeat blocks correctly, they are always converted into a for-loop.
                    // To decompile repeat, we would need to check to make sure the initialized variable is
                    // never referenced in the loop body
                    if (condition.operatorToken.kind === SK.LessThanToken) {
                        r.inputs.push({
                            kind: "value",
                            name: "TO",
                            shadowType: ShadowType.Number,
                            value: {
                                kind: "expr",
                                type: "math_arithmetic",
                                fields: [getField("OP", "MINUS")],
                                inputs: [
                                    getValue("A", condition.right, ShadowType.Number),
                                    getValue("B", 1)
                                ]
                            }
                        });
                    }
                    else if (condition.operatorToken.kind === SK.LessThanEqualsToken) {
                        r.inputs.push(getValue("TO", condition.right, ShadowType.Number));
                    }
                    r.handlers.push({ name: "DO", statement: getStatementBlock(n.statement) });
                    return r;
                }
                function getVariableSetOrChangeBlock(name, value, changed, overrideName) {
                    if (changed === void 0) { changed = false; }
                    if (overrideName === void 0) { overrideName = false; }
                    var renamed = getVariableName(name);
                    varUsages[renamed] = true;
                    // We always do a number shadow even if the variable is not of type number
                    return {
                        kind: "statement",
                        type: changed ? "variables_change" : "variables_set",
                        inputs: [getValue("VALUE", value, ShadowType.Number)],
                        fields: [getField("VAR", renamed)]
                    };
                }
                function getVariableDeclarationStatement(n) {
                    if (addVariableDeclaration(n)) {
                        return getVariableSetOrChangeBlock(n.name, n.initializer);
                    }
                    return undefined;
                }
                function getIncrementStatement(node) {
                    var isPlusPlus = node.operator === SK.PlusPlusToken;
                    if (!isPlusPlus && node.operator !== SK.MinusMinusToken) {
                        error(node);
                        return;
                    }
                    return getVariableSetOrChangeBlock(node.operand, isPlusPlus ? 1 : -1, true);
                }
                function getCallStatement(node) {
                    var info = node.callInfo;
                    if (!info) {
                        error(node);
                        return;
                    }
                    if (!info.attrs.blockId || !info.attrs.block) {
                        var builtin = builtinBlocks[info.qName];
                        if (!builtin) {
                            error(node);
                            return;
                        }
                        info.attrs.block = builtin.block;
                        info.attrs.blockId = builtin.blockId;
                    }
                    if (info.attrs.imageLiteral) {
                        return getImageLiteralStatement(node, info);
                    }
                    if (ts.isFunctionLike(info.decl)) {
                    }
                    var argNames = [];
                    info.attrs.block.replace(/%(\w+)/g, function (f, n) {
                        argNames.push(n);
                        return "";
                    });
                    if (info.attrs.defaultInstance) {
                        argNames.unshift("__instance__");
                    }
                    var r = {
                        kind: "statement",
                        type: info.attrs.blockId
                    };
                    info.args.forEach(function (e, i) {
                        if (i === 0 && info.attrs.defaultInstance) {
                            if (e.getText() === info.attrs.defaultInstance) {
                                return;
                            }
                            else {
                                r.mutation = { "showing": "true" };
                            }
                        }
                        if (info.attrs.mutatePropertyEnum && i === info.args.length - 2) {
                            // Implicit in the blocks
                            return;
                        }
                        switch (e.kind) {
                            case SK.ArrowFunction:
                                var m = getDestructuringMutation(e);
                                if (m) {
                                    r.mutation = m;
                                }
                                (r.handlers || (r.handlers = [])).push({ name: "HANDLER", statement: getStatementBlock(e) });
                                break;
                            case SK.PropertyAccessExpression:
                                var callInfo = e.callInfo;
                                var shadow = callInfo && !!callInfo.attrs.blockIdentity;
                                var aName = pxtc.U.htmlEscape(argNames[i]);
                                if (shadow) {
                                    (r.inputs || (r.inputs = [])).push(getValue(aName, e));
                                }
                                else {
                                    var expr = getOutputBlock(e);
                                    if (expr.kind === "text") {
                                        (r.fields || (r.fields = [])).push(getField(aName, expr.value));
                                    }
                                    else {
                                        (r.inputs || (r.inputs = [])).push({
                                            kind: "value",
                                            name: aName,
                                            value: expr
                                        });
                                    }
                                }
                                break;
                            default:
                                var v = void 0;
                                var vName = pxtc.U.htmlEscape(argNames[i]);
                                if (info.qName == "Math.random") {
                                    v = {
                                        kind: "value",
                                        name: vName,
                                        value: getMathRandomArgumentExpresion(e)
                                    };
                                }
                                else {
                                    v = getValue(vName, e);
                                }
                                (r.inputs || (r.inputs = [])).push(v);
                                break;
                        }
                    });
                    return r;
                }
                // function openCallExpressionBlockWithRestParameter(call: ts.CallExpression, info: pxtc.CallInfo) {
                //     openBlockTag(info.attrs.blockId);
                //     write(`<mutation count="${info.args.length}" />`)
                //     info.args.forEach((expression, index) => {
                //         emitValue("value_input_" + index, expression, ShadowType.Number);
                //     });
                // }
                function getDestructuringMutation(callback) {
                    var bindings = getObjectBindingProperties(callback);
                    if (bindings) {
                        return {
                            "callbackproperties": bindings[0].join(","),
                            "renamemap": pxtc.Util.htmlEscape(JSON.stringify(bindings[1]))
                        };
                    }
                    return undefined;
                }
                function getMathRandomArgumentExpresion(e) {
                    switch (e.kind) {
                        case SK.NumericLiteral:
                            var n_1 = e;
                            return getNumericLiteral((parseInt(n_1.text) - 1).toString());
                        case SK.BinaryExpression:
                            var op = e;
                            if (op.operatorToken.kind == SK.PlusToken && op.right.text == "1") {
                                return getOutputBlock(op.left);
                            }
                        default:
                            //This will definitely lead to an error, but the above are the only two cases generated by blocks
                            return getOutputBlock(e);
                    }
                }
                function getArrowFunctionStatement(n, next) {
                    if (n.parameters.length > 0 && !(n.parameters.length === 1 && n.parameters[0].name.kind === SK.ObjectBindingPattern)) {
                        error(n);
                        return;
                    }
                    return getStatementBlock(n.body, next);
                }
                function flattenIfStatement(n) {
                    var r = {
                        ifStatements: [{
                                expression: n.expression,
                                thenStatement: n.thenStatement
                            }],
                        elseStatement: n.elseStatement
                    };
                    if (n.elseStatement && n.elseStatement.kind == SK.IfStatement) {
                        var flat = flattenIfStatement(n.elseStatement);
                        r.ifStatements = r.ifStatements.concat(flat.ifStatements);
                        r.elseStatement = flat.elseStatement;
                    }
                    return r;
                }
                function codeBlock(statements, next, topLevel, parent) {
                    if (topLevel === void 0) { topLevel = false; }
                    var eventStatements = [];
                    var blockStatements = next || [];
                    // Go over the statements in reverse so that we can insert the nodes into the existing list if there is one
                    statements.reverse().forEach(function (statement) {
                        if (statement.kind == SK.ExpressionStatement && isEventExpression(statement) && !checkStatement(statement)) {
                            eventStatements.unshift(statement);
                        }
                        else {
                            blockStatements.unshift(statement);
                        }
                    });
                    eventStatements.map(function (n) { return getStatementBlock(n); }).forEach(emitStatementNode);
                    if (blockStatements.length) {
                        // wrap statement in "on start" if top level
                        var stmt = getStatementBlock(blockStatements.shift(), blockStatements, parent);
                        var emitOnStart = topLevel && !options.snippetMode;
                        if (emitOnStart) {
                            // Preserve any variable edeclarations that were never used
                            var current_1 = stmt;
                            autoDeclarations.forEach(function (_a) {
                                var name = _a[0], node = _a[1];
                                if (varUsages[name]) {
                                    return;
                                }
                                var v = getVariableSetOrChangeBlock(node.name, node.initializer, false, true);
                                v.next = current_1;
                                current_1 = v;
                            });
                            return {
                                kind: "statement",
                                type: ts.pxtc.ON_START_TYPE,
                                handlers: [{
                                        name: "HANDLER",
                                        statement: current_1
                                    }]
                            };
                        }
                        return stmt;
                    }
                    return undefined;
                }
                function isLiteralNode(node) {
                    if (!node) {
                        return false;
                    }
                    switch (node.kind) {
                        case SK.ParenthesizedExpression:
                            return isLiteralNode(node.expression);
                        case SK.NumericLiteral:
                        case SK.StringLiteral:
                        case SK.NoSubstitutionTemplateLiteral:
                        case SK.TrueKeyword:
                        case SK.FalseKeyword:
                            return true;
                        case SK.PrefixUnaryExpression:
                            var expression = node;
                            return (expression.operator === SK.PlusToken || expression.operator === SK.MinusToken) && isLiteralNode(expression.operand);
                        default:
                            return false;
                    }
                }
                /**
                 * Takes a series of comment ranges and converts them into string suitable for a
                 * comment block in blockly. All comments above a statement will be included,
                 * regardless of single vs multi line and whitespace. Paragraphs are delineated
                 * by empty lines between comments (a commented empty line, not an empty line
                 * between two separate comment blocks)
                 */
                function getCommentText(commentRanges) {
                    var text = "";
                    var currentLine = "";
                    for (var _i = 0, commentRanges_1 = commentRanges; _i < commentRanges_1.length; _i++) {
                        var commentRange = commentRanges_1[_i];
                        var commentText = fileText.substr(commentRange.pos, commentRange.end - commentRange.pos);
                        if (commentRange.kind === ts.SyntaxKind.SingleLineCommentTrivia) {
                            appendMatch(commentText, singleLineCommentRegex);
                        }
                        else {
                            var lines = commentText.split("\n");
                            for (var _a = 0, lines_1 = lines; _a < lines_1.length; _a++) {
                                var line = lines_1[_a];
                                appendMatch(line, multiLineCommentRegex);
                            }
                        }
                    }
                    text += currentLine;
                    return text.trim();
                    function appendMatch(line, regex) {
                        var match = regex.exec(line);
                        if (match) {
                            var matched = match[1].trim();
                            if (matched) {
                                currentLine += currentLine ? " " + matched : matched;
                            }
                            else {
                                text += currentLine + "\n";
                                currentLine = "";
                            }
                        }
                    }
                }
                function trackAutoDeclaration(n) {
                    autoDeclarations.push([getVariableName(n.name), n]);
                }
                function addVariableDeclaration(node) {
                    if (node.name.kind !== SK.Identifier) {
                        error(node, pxtc.Util.lf("Variable declarations may not use binding patterns"));
                        return false;
                    }
                    else if (!node.initializer) {
                        error(node, pxtc.Util.lf("Variable declarations must have an initializer"));
                        return false;
                    }
                    return true;
                }
                function getVariableName(name) {
                    if (renameMap) {
                        var rename = renameMap.getRenameForPosition(name.getStart());
                        if (rename) {
                            return rename.name;
                        }
                    }
                    return name.text;
                }
            }
            decompiler.decompileToBlocks = decompileToBlocks;
            function checkStatement(node) {
                switch (node.kind) {
                    case SK.WhileStatement:
                    case SK.IfStatement:
                    case SK.Block:
                        return undefined;
                    case SK.ExpressionStatement:
                        return checkStatement(node.expression);
                    case SK.VariableStatement:
                        return checkVariableStatement(node);
                    case SK.CallExpression:
                        return checkCall(node);
                    case SK.VariableDeclaration:
                        return checkVariableDeclaration(node);
                    case SK.PostfixUnaryExpression:
                    case SK.PrefixUnaryExpression:
                        return checkIncrementorExpression(node);
                    case SK.ArrowFunction:
                        return checkArrowFunction(node);
                    case SK.BinaryExpression:
                        return checkBinaryExpression(node);
                    case SK.ForStatement:
                        return checkForStatement(node);
                }
                return pxtc.Util.lf("Unsupported statement in block: {0}", SK[node.kind]);
                function checkForStatement(n) {
                    if (!n.initializer || !n.incrementor || !n.condition) {
                        return pxtc.Util.lf("for loops must have an initializer, incrementor, and condition");
                    }
                    if (n.initializer.kind !== SK.VariableDeclarationList) {
                        return pxtc.Util.lf("only variable declarations are permitted in for loop initializers");
                    }
                    var initializer = n.initializer;
                    if (!initializer.declarations) {
                        return pxtc.Util.lf("for loop with out-of-scope variables not supported");
                    }
                    if (initializer.declarations.length != 1) {
                        return pxtc.Util.lf("for loop with multiple variables not supported");
                    }
                    var indexVar = initializer.declarations[0].name.text;
                    if (!incrementorIsValid(indexVar)) {
                        return pxtc.Util.lf("for loop incrementors may only increment the variable declared in the initializer");
                    }
                    if (n.condition.kind !== SK.BinaryExpression) {
                        return pxtc.Util.lf("for loop conditionals must be binary comparison operations");
                    }
                    var condition = n.condition;
                    if (condition.left.kind !== SK.Identifier || condition.left.text !== indexVar) {
                        return pxtc.Util.lf("left side of for loop conditional must be the variable declared in the initializer");
                    }
                    if (condition.operatorToken.kind !== SK.LessThanToken && condition.operatorToken.kind !== SK.LessThanEqualsToken) {
                        return pxtc.Util.lf("for loop conditional operator must be either < or <=");
                    }
                    return undefined;
                    function incrementorIsValid(varName) {
                        if (n.incrementor.kind === SK.PostfixUnaryExpression || n.incrementor.kind === SK.PrefixUnaryExpression) {
                            var incrementor = n.incrementor;
                            if (incrementor.operator === SK.PlusPlusToken && incrementor.operand.kind === SK.Identifier) {
                                return incrementor.operand.text === varName;
                            }
                        }
                        return false;
                    }
                }
                function checkBinaryExpression(n) {
                    if (n.left.kind !== SK.Identifier) {
                        return pxtc.Util.lf("Only variable names may be assigned to");
                    }
                    switch (n.operatorToken.kind) {
                        case SK.EqualsToken:
                            return checkExpression(n.right);
                        case SK.PlusEqualsToken:
                        case SK.MinusEqualsToken:
                            return undefined;
                        default:
                            return pxtc.Util.lf("Unsupported operator token in statement {0}", SK[n.operatorToken.kind]);
                    }
                }
                function checkArrowFunction(n) {
                    if (n.parameters.length > 0 && !(n.parameters.length === 1 && n.parameters[0].name.kind === SK.ObjectBindingPattern)) {
                        return pxtc.Util.lf("Unsupported parameters in error function");
                    }
                    return undefined;
                }
                function checkIncrementorExpression(n) {
                    if (n.operand.kind != SK.Identifier) {
                        return pxtc.Util.lf("-- and ++ may only be used on an identifier");
                    }
                    if (n.operator !== SK.PlusPlusToken && n.operator !== SK.MinusMinusToken) {
                        return pxtc.Util.lf("Only ++ and -- supported as prefix or postfix unary operators in a statement");
                    }
                    return undefined;
                }
                function checkVariableDeclaration(n) {
                    var check;
                    if (n.name.kind !== SK.Identifier) {
                        check = pxtc.Util.lf("Variable declarations may not use binding patterns");
                    }
                    else if (!n.initializer) {
                        check = pxtc.Util.lf("Variable declarations must have an initializer");
                    }
                    else if (!isAutoDeclaration(n)) {
                        check = checkExpression(n.initializer);
                    }
                    if (check) {
                    }
                    return check;
                }
                function checkVariableStatement(n) {
                    for (var _i = 0, _a = n.declarationList.declarations; _i < _a.length; _i++) {
                        var declaration = _a[_i];
                        var res = checkVariableDeclaration(declaration);
                        if (res) {
                            return res;
                        }
                    }
                    return undefined;
                }
                function checkCall(n) {
                    var info = n.callInfo;
                    if (!info) {
                        return pxtc.Util.lf("Function call not supported in the blocks");
                    }
                    if (!info.attrs.blockId || !info.attrs.block) {
                        var builtin = builtinBlocks[info.qName];
                        if (!builtin) {
                            return pxtc.Util.lf("Function call not supported in the blocks");
                        }
                        info.attrs.block = builtin.block;
                        info.attrs.blockId = builtin.blockId;
                    }
                    if (info.attrs.imageLiteral) {
                        var arg = n.arguments[0];
                        if (arg.kind != SK.StringLiteral && arg.kind != SK.NoSubstitutionTemplateLiteral) {
                            return pxtc.Util.lf("Only string literals supported for image literals");
                        }
                        var leds = (arg.text || '').replace(/\s+/g, '');
                        var nc = info.attrs.imageLiteral * 5;
                        if (nc * 5 != leds.length) {
                            return pxtc.Util.lf("Invalid image pattern");
                        }
                        return undefined;
                    }
                    var argNames = [];
                    info.attrs.block.replace(/%(\w+)/g, function (f, n) {
                        argNames.push(n);
                        return "";
                    });
                    var argumentDifference = info.args.length - argNames.length;
                    if (argumentDifference > 0 && !(info.attrs.defaultInstance && argumentDifference === 1) && !checkForDestructuringMutation()) {
                        var hasCallback = hasArrowFunction(info);
                        if (argumentDifference > 1 || !hasCallback) {
                            return pxtc.Util.lf("Function call has more arguments than are supported by its block");
                        }
                    }
                    return undefined;
                    function checkForDestructuringMutation() {
                        // If the mutatePropertyEnum is set, the array literal and the destructured
                        // properties must have matching names
                        if (info.attrs.mutatePropertyEnum && argumentDifference === 2 && info.args.length >= 2) {
                            var arrayArg = info.args[info.args.length - 2];
                            var callbackArg = info.args[info.args.length - 1];
                            if (arrayArg.kind === SK.ArrayLiteralExpression && callbackArg.kind === SK.ArrowFunction) {
                                var propNames_1 = [];
                                // Make sure that all elements in the array literal are enum values
                                var allLiterals = !arrayArg.elements.some(function (e) {
                                    if (e.kind === SK.PropertyAccessExpression && e.expression.kind === SK.Identifier) {
                                        propNames_1.push(e.name.text);
                                        return e.expression.text !== info.attrs.mutatePropertyEnum;
                                    }
                                    return true;
                                });
                                if (allLiterals) {
                                    // Also need to check that the array literal's values and the destructured values match
                                    var bindings = getObjectBindingProperties(callbackArg);
                                    if (bindings) {
                                        var names_1 = bindings[0];
                                        return names_1.length === propNames_1.length && !propNames_1.some(function (p) { return names_1.indexOf(p) === -1; });
                                    }
                                }
                            }
                        }
                        return false;
                    }
                }
            }
            function isAutoDeclaration(decl) {
                if (decl.initializer) {
                    if (decl.initializer.kind === ts.SyntaxKind.NullKeyword || decl.initializer.kind === ts.SyntaxKind.FalseKeyword) {
                        return true;
                    }
                    else if (ts.isStringOrNumericLiteral(decl.initializer.kind)) {
                        var text = decl.initializer.getText();
                        return text === "0" || isEmptyString(text);
                    }
                    else {
                        var callInfo = decl.initializer.callInfo;
                        if (callInfo && callInfo.isAutoCreate)
                            return true;
                    }
                }
                return false;
            }
            function getCallInfo(checker, node, apiInfo) {
                var symb = checker.getSymbolAtLocation(node);
                if (symb) {
                    var qName = checker.getFullyQualifiedName(symb);
                    if (qName) {
                        return apiInfo.byQName[qName];
                    }
                }
                return undefined;
            }
            function getObjectBindingProperties(callback) {
                if (callback.parameters.length === 1 && callback.parameters[0].name.kind === SK.ObjectBindingPattern) {
                    var elements = callback.parameters[0].name.elements;
                    var renames_1 = {};
                    var properties = elements.map(function (e) {
                        if (checkName(e.propertyName) && checkName(e.name)) {
                            var name_3 = e.name.text;
                            if (e.propertyName) {
                                var propName = e.propertyName.text;
                                renames_1[propName] = name_3;
                                return propName;
                            }
                            return name_3;
                        }
                        else {
                            return "";
                        }
                    });
                    return [properties, renames_1];
                }
                return undefined;
                function checkName(name) {
                    if (name && name.kind !== SK.Identifier) {
                        // error(name, Util.lf("Only identifiers may be used for variable names in object destructuring patterns"));
                        return false;
                    }
                    return true;
                }
            }
            function checkExpression(n) {
                switch (n.kind) {
                    case SK.StringLiteral:
                    case SK.FirstTemplateToken:
                    case SK.NoSubstitutionTemplateLiteral:
                    case SK.NumericLiteral:
                    case SK.TrueKeyword:
                    case SK.FalseKeyword:
                    case SK.ExpressionStatement:
                        return undefined;
                    case SK.ParenthesizedExpression:
                        return checkExpression(n.expression);
                    case SK.Identifier:
                        return isUndefined(n) ? pxtc.Util.lf("Undefined is not supported in blocks") : undefined;
                    case SK.BinaryExpression:
                        var op1 = n.operatorToken.getText();
                        return ops[op1] ? undefined : pxtc.Util.lf("Could not find operator {0}", op1);
                    case SK.PrefixUnaryExpression:
                        var op2 = n.operator;
                        return op2 === SK.MinusToken || op2 === SK.PlusToken || op2 === SK.ExclamationToken ?
                            undefined : pxtc.Util.lf("Unsupported prefix unary operator{0}", op2);
                    case SK.PropertyAccessExpression:
                        return checkPropertyAccessExpression(n);
                    case SK.CallExpression:
                        return checkStatement(n);
                }
                return pxtc.Util.lf("Unsupported syntax kind for output expression block: {0}", SK[n.kind]);
                function checkPropertyAccessExpression(n) {
                    var callInfo = n.callInfo;
                    if (callInfo && (callInfo.attrs.blockIdentity || callInfo.decl.kind === SK.EnumMember)) {
                        return undefined;
                    }
                    return pxtc.Util.lf("No call info found");
                }
            }
            function isEmptyString(a) {
                return a === "\"\"" || a === "''" || a === "``";
            }
            function isUndefined(node) {
                return node && node.kind === SK.Identifier && node.text === "undefined";
            }
            function hasArrowFunction(info) {
                var parameters = info.decl.parameters;
                return info.args.some(function (arg, index) { return arg && arg.kind === SK.ArrowFunction; });
            }
        })(decompiler = pxtc.decompiler || (pxtc.decompiler = {}));
    })(pxtc = ts.pxtc || (ts.pxtc = {}));
})(ts || (ts = {}));
/// <reference path="assembler.ts"/>
/* Docs:
 *
 * Thumb 16-bit Instruction Set Quick Reference Card
 *   http://infocenter.arm.com/help/topic/com.arm.doc.qrc0006e/QRC0006_UAL16.pdf
 *
 * ARMv6-M Architecture Reference Manual (bit encoding of instructions)
 *   http://ecee.colorado.edu/ecen3000/labs/lab3/files/DDI0419C_arm_architecture_v6m_reference_manual.pdf
 *
 * The ARM-THUMB Procedure Call Standard
 *   http://www.cs.cornell.edu/courses/cs414/2001fa/armcallconvention.pdf
 *
 * Cortex-M0 Technical Reference Manual: 3.3. Instruction set summary (cycle counts)
 *   http://infocenter.arm.com/help/index.jsp?topic=/com.arm.doc.ddi0432c/CHDCICDF.html  // M0
 *   http://infocenter.arm.com/help/index.jsp?topic=/com.arm.doc.ddi0484c/CHDCICDF.html  // M0+
 */
var ts;
(function (ts) {
    var pxtc;
    (function (pxtc) {
        var thumb;
        (function (thumb) {
            var ThumbProcessor = (function (_super) {
                __extends(ThumbProcessor, _super);
                function ThumbProcessor() {
                    var _this = this;
                    _super.call(this);
                    // Registers
                    // $r0 - bits 2:1:0
                    // $r1 - bits 5:4:3
                    // $r2 - bits 7:2:1:0
                    // $r3 - bits 6:5:4:3
                    // $r4 - bits 8:7:6
                    // $r5 - bits 10:9:8
                    this.addEnc("$r0", "R0-7", function (v) { return _this.inrange(7, v, v); });
                    this.addEnc("$r1", "R0-7", function (v) { return _this.inrange(7, v, v << 3); });
                    this.addEnc("$r2", "R0-15", function (v) { return _this.inrange(15, v, (v & 7) | ((v & 8) << 4)); });
                    this.addEnc("$r3", "R0-15", function (v) { return _this.inrange(15, v, v << 3); });
                    this.addEnc("$r4", "R0-7", function (v) { return _this.inrange(7, v, v << 6); });
                    this.addEnc("$r5", "R0-7", function (v) { return _this.inrange(7, v, v << 8); });
                    // this for setting both $r0 and $r1 (two argument adds and subs)
                    this.addEnc("$r01", "R0-7", function (v) { return _this.inrange(7, v, (v | v << 3)); });
                    // Immdiates:
                    // $i0 - bits 7-0
                    // $i1 - bits 7-0 * 4
                    // $i2 - bits 6-0 * 4
                    // $i3 - bits 8-6
                    // $i4 - bits 10-6
                    // $i5 - bits 10-6 * 4
                    // $i6 - bits 10-6, 0 is 32
                    // $i7 - bits 10-6 * 2
                    this.addEnc("$i0", "#0-255", function (v) { return _this.inrange(255, v, v); });
                    this.addEnc("$i1", "#0-1020", function (v) { return _this.inrange(255, v / 4, v >> 2); });
                    this.addEnc("$i2", "#0-510", function (v) { return _this.inrange(127, v / 4, v >> 2); });
                    this.addEnc("$i3", "#0-7", function (v) { return _this.inrange(7, v, v << 6); });
                    this.addEnc("$i4", "#0-31", function (v) { return _this.inrange(31, v, v << 6); });
                    this.addEnc("$i5", "#0-124", function (v) { return _this.inrange(31, v / 4, (v >> 2) << 6); });
                    this.addEnc("$i6", "#1-32", function (v) { return v == 0 ? null : v == 32 ? 0 : _this.inrange(31, v, v << 6); });
                    this.addEnc("$i7", "#0-62", function (v) { return _this.inrange(31, v / 2, (v >> 1) << 6); });
                    this.addEnc("$rl0", "{R0-7,...}", function (v) { return _this.inrange(255, v, v); });
                    this.addEnc("$rl1", "{LR,R0-7,...}", function (v) { return (v & 0x4000) ? _this.inrange(255, (v & ~0x4000), 0x100 | (v & 0xff)) : _this.inrange(255, v, v); });
                    this.addEnc("$rl2", "{PC,R0-7,...}", function (v) { return (v & 0x8000) ? _this.inrange(255, (v & ~0x8000), 0x100 | (v & 0xff)) : _this.inrange(255, v, v); });
                    this.addEnc("$la", "LABEL", function (v) { return _this.inrange(255, v / 4, v >> 2); }).isWordAligned = true;
                    this.addEnc("$lb", "LABEL", function (v) { return _this.inrangeSigned(127, v / 2, v >> 1); });
                    this.addEnc("$lb11", "LABEL", function (v) { return _this.inrangeSigned(1023, v / 2, v >> 1); });
                    //this.addInst("nop",                   0xbf00, 0xffff);  // we use mov r8,r8 as gcc
                    this.addInst("adcs  $r0, $r1", 0x4140, 0xffc0);
                    this.addInst("add   $r2, $r3", 0x4400, 0xff00, "$r2 += $r3");
                    this.addInst("add   $r5, pc, $i1", 0xa000, 0xf800);
                    this.addInst("add   $r5, sp, $i1", 0xa800, 0xf800);
                    this.addInst("add   sp, $i2", 0xb000, 0xff80);
                    this.addInst("adds  $r0, $r1, $i3", 0x1c00, 0xfe00);
                    this.addInst("adds  $r0, $r1, $r4", 0x1800, 0xfe00);
                    this.addInst("adds  $r01, $r4", 0x1800, 0xfe00);
                    this.addInst("adds  $r5, $i0", 0x3000, 0xf800, "$r5 += $i0");
                    this.addInst("adr   $r5, $la", 0xa000, 0xf800);
                    this.addInst("ands  $r0, $r1", 0x4000, 0xffc0);
                    this.addInst("asrs  $r0, $r1", 0x4100, 0xffc0);
                    this.addInst("asrs  $r0, $r1, $i6", 0x1000, 0xf800);
                    this.addInst("bics  $r0, $r1", 0x4380, 0xffc0);
                    this.addInst("bkpt  $i0", 0xbe00, 0xff00);
                    this.addInst("blx   $r3", 0x4780, 0xff87);
                    this.addInst("bx    $r3", 0x4700, 0xff80);
                    this.addInst("cmn   $r0, $r1", 0x42c0, 0xffc0);
                    this.addInst("cmp   $r0, $r1", 0x4280, 0xffc0);
                    this.addInst("cmp   $r2, $r3", 0x4500, 0xff00);
                    this.addInst("cmp   $r5, $i0", 0x2800, 0xf800);
                    this.addInst("eors  $r0, $r1", 0x4040, 0xffc0);
                    this.addInst("ldmia $r5!, $rl0", 0xc800, 0xf800);
                    this.addInst("ldmia $r5, $rl0", 0xc800, 0xf800);
                    this.addInst("ldr   $r0, [$r1, $i5]", 0x6800, 0xf800);
                    this.addInst("ldr   $r0, [$r1, $r4]", 0x5800, 0xfe00);
                    this.addInst("ldr   $r5, [pc, $i1]", 0x4800, 0xf800);
                    this.addInst("ldr   $r5, $la", 0x4800, 0xf800);
                    this.addInst("ldr   $r5, [sp, $i1]", 0x9800, 0xf800);
                    this.addInst("ldrb  $r0, [$r1, $i4]", 0x7800, 0xf800);
                    this.addInst("ldrb  $r0, [$r1, $r4]", 0x5c00, 0xfe00);
                    this.addInst("ldrh  $r0, [$r1, $i7]", 0x8800, 0xf800);
                    this.addInst("ldrh  $r0, [$r1, $r4]", 0x5a00, 0xfe00);
                    this.addInst("ldrsb $r0, [$r1, $r4]", 0x5600, 0xfe00);
                    this.addInst("ldrsh $r0, [$r1, $r4]", 0x5e00, 0xfe00);
                    this.addInst("lsls  $r0, $r1", 0x4080, 0xffc0, "$r0 = $r0 << $r1");
                    this.addInst("lsls  $r0, $r1, $i4", 0x0000, 0xf800, "$r0 = $r1 << $i4");
                    this.addInst("lsrs  $r0, $r1", 0x40c0, 0xffc0);
                    this.addInst("lsrs  $r0, $r1, $i6", 0x0800, 0xf800);
                    this.addInst("mov   $r0, $r1", 0x4600, 0xffc0, "$r0 = $r1");
                    //this.addInst("mov   $r2, $r3",        0x4600, 0xff00);
                    this.addInst("movs  $r0, $r1", 0x0000, 0xffc0, "$r0 = $r1");
                    this.addInst("movs  $r5, $i0", 0x2000, 0xf800, "$r5 = $i0");
                    this.addInst("muls  $r0, $r1", 0x4340, 0xffc0);
                    this.addInst("mvns  $r0, $r1", 0x43c0, 0xffc0);
                    this.addInst("negs  $r0, $r1", 0x4240, 0xffc0, "$r0 = -$r1");
                    this.addInst("nop", 0x46c0, 0xffff); // mov r8, r8
                    this.addInst("orrs  $r0, $r1", 0x4300, 0xffc0);
                    this.addInst("pop   $rl2", 0xbc00, 0xfe00);
                    this.addInst("push  $rl1", 0xb400, 0xfe00);
                    this.addInst("rev   $r0, $r1", 0xba00, 0xffc0);
                    this.addInst("rev16 $r0, $r1", 0xba40, 0xffc0);
                    this.addInst("revsh $r0, $r1", 0xbac0, 0xffc0);
                    this.addInst("rors  $r0, $r1", 0x41c0, 0xffc0);
                    this.addInst("sbcs  $r0, $r1", 0x4180, 0xffc0);
                    this.addInst("sev", 0xbf40, 0xffff);
                    this.addInst("stmia $r5!, $rl0", 0xc000, 0xf800);
                    this.addInst("str   $r0, [$r1, $i5]", 0x6000, 0xf800);
                    this.addInst("str   $r0, [$r1, $r4]", 0x5000, 0xfe00);
                    this.addInst("str   $r5, [sp, $i1]", 0x9000, 0xf800);
                    this.addInst("strb  $r0, [$r1, $i4]", 0x7000, 0xf800);
                    this.addInst("strb  $r0, [$r1, $r4]", 0x5400, 0xfe00);
                    this.addInst("strh  $r0, [$r1, $i7]", 0x8000, 0xf800);
                    this.addInst("strh  $r0, [$r1, $r4]", 0x5200, 0xfe00);
                    this.addInst("sub   sp, $i2", 0xb080, 0xff80);
                    this.addInst("subs  $r0, $r1, $i3", 0x1e00, 0xfe00);
                    this.addInst("subs  $r0, $r1, $r4", 0x1a00, 0xfe00);
                    this.addInst("subs  $r01, $r4", 0x1a00, 0xfe00);
                    this.addInst("subs  $r5, $i0", 0x3800, 0xf800);
                    this.addInst("svc   $i0", 0xdf00, 0xff00);
                    this.addInst("sxtb  $r0, $r1", 0xb240, 0xffc0);
                    this.addInst("sxth  $r0, $r1", 0xb200, 0xffc0);
                    this.addInst("tst   $r0, $r1", 0x4200, 0xffc0);
                    this.addInst("udf   $i0", 0xde00, 0xff00);
                    this.addInst("uxtb  $r0, $r1", 0xb2c0, 0xffc0);
                    this.addInst("uxth  $r0, $r1", 0xb280, 0xffc0);
                    this.addInst("wfe", 0xbf20, 0xffff);
                    this.addInst("wfi", 0xbf30, 0xffff);
                    this.addInst("yield", 0xbf10, 0xffff);
                    this.addInst("cpsid i", 0xb672, 0xffff);
                    this.addInst("cpsie i", 0xb662, 0xffff);
                    this.addInst("beq   $lb", 0xd000, 0xff00);
                    this.addInst("bne   $lb", 0xd100, 0xff00);
                    this.addInst("bcs   $lb", 0xd200, 0xff00);
                    this.addInst("bcc   $lb", 0xd300, 0xff00);
                    this.addInst("bmi   $lb", 0xd400, 0xff00);
                    this.addInst("bpl   $lb", 0xd500, 0xff00);
                    this.addInst("bvs   $lb", 0xd600, 0xff00);
                    this.addInst("bvc   $lb", 0xd700, 0xff00);
                    this.addInst("bhi   $lb", 0xd800, 0xff00);
                    this.addInst("bls   $lb", 0xd900, 0xff00);
                    this.addInst("bge   $lb", 0xda00, 0xff00);
                    this.addInst("blt   $lb", 0xdb00, 0xff00);
                    this.addInst("bgt   $lb", 0xdc00, 0xff00);
                    this.addInst("ble   $lb", 0xdd00, 0xff00);
                    this.addInst("bhs   $lb", 0xd200, 0xff00); // cs
                    this.addInst("blo   $lb", 0xd300, 0xff00); // cc
                    this.addInst("b     $lb11", 0xe000, 0xf800, "B");
                    this.addInst("bal   $lb11", 0xe000, 0xf800, "B");
                    // handled specially - 32 bit instruction
                    this.addInst("bl    $lb", 0xf000, 0xf800, "BL");
                    // this is normally emitted as 'b' but will be emitted as 'bl' if needed
                    this.addInst("bb    $lb", 0xe000, 0xf800, "B");
                }
                ThumbProcessor.prototype.wordSize = function () {
                    return 4;
                };
                ThumbProcessor.prototype.is32bit = function (i) {
                    return i.name == "bl" || i.name == "bb";
                };
                ThumbProcessor.prototype.postProcessAbsAddress = function (f, v) {
                    v = v & 0xfffffffe;
                    v -= f.baseOffset;
                    return v;
                };
                ThumbProcessor.prototype.emit32 = function (v0, v, actual) {
                    if (v % 2)
                        return pxtc.assembler.emitErr("uneven BL?", actual);
                    var off = v / 2;
                    pxtc.assert(off != null);
                    if ((off | 0) != off ||
                        // we can actually support more but the board has 256k (128k instructions)
                        !(-128 * 1024 <= off && off <= 128 * 1024))
                        return pxtc.assembler.emitErr("jump out of range", actual);
                    // note that off is already in instructions, not bytes
                    var imm11 = off & 0x7ff;
                    var imm10 = (off >> 11) & 0x3ff;
                    return {
                        opcode: (off & 0xf0000000) ? (0xf400 | imm10) : (0xf000 | imm10),
                        opcode2: (0xf800 | imm11),
                        stack: 0,
                        numArgs: [v],
                        labelName: actual
                    };
                };
                ThumbProcessor.prototype.getAddressFromLabel = function (f, i, s, wordAligned) {
                    if (wordAligned === void 0) { wordAligned = false; }
                    var l = f.lookupLabel(s);
                    if (l == null)
                        return null;
                    var pc = f.location() + 4;
                    if (wordAligned)
                        pc = pc & 0xfffffffc;
                    return l - pc;
                };
                ThumbProcessor.prototype.isPop = function (opcode) {
                    return opcode == 0xbc00;
                };
                ThumbProcessor.prototype.isPush = function (opcode) {
                    return opcode == 0xb400;
                };
                ThumbProcessor.prototype.isAddSP = function (opcode) {
                    return opcode == 0xb000;
                };
                ThumbProcessor.prototype.isSubSP = function (opcode) {
                    return opcode == 0xb080;
                };
                ThumbProcessor.prototype.peephole = function (ln, lnNext, lnNext2) {
                    var lb11 = this.encoders["$lb11"];
                    var lb = this.encoders["$lb"];
                    var lnop = ln.getOp();
                    var isSkipBranch = false;
                    if (lnop == "bne" || lnop == "beq") {
                        if (lnNext.getOp() == "b" && ln.numArgs[0] == 0)
                            isSkipBranch = true;
                        if (lnNext.getOp() == "bb" && ln.numArgs[0] == 2)
                            isSkipBranch = true;
                    }
                    if (lnop == "bb" && lb11.encode(ln.numArgs[0]) != null) {
                        // RULE: bb .somewhere -> b .somewhere (if fits)
                        ln.update("b " + ln.words[1]);
                    }
                    else if (lnop == "b" && ln.numArgs[0] == -2) {
                        // RULE: b .somewhere; .somewhere: -> .somewhere:
                        ln.update("");
                    }
                    else if (lnop == "bne" && isSkipBranch && lb.encode(lnNext.numArgs[0]) != null) {
                        // RULE: bne .next; b .somewhere; .next: -> beq .somewhere
                        ln.update("beq " + lnNext.words[1]);
                        lnNext.update("");
                    }
                    else if (lnop == "beq" && isSkipBranch && lb.encode(lnNext.numArgs[0]) != null) {
                        // RULE: beq .next; b .somewhere; .next: -> bne .somewhere
                        ln.update("bne " + lnNext.words[1]);
                        lnNext.update("");
                    }
                    else if (lnop == "push" && lnNext.getOp() == "pop" && ln.numArgs[0] == lnNext.numArgs[0]) {
                        // RULE: push {X}; pop {X} -> nothing
                        pxtc.assert(ln.numArgs[0] > 0);
                        ln.update("");
                        lnNext.update("");
                    }
                    else if (lnop == "push" && lnNext.getOp() == "pop" &&
                        ln.words.length == 4 &&
                        lnNext.words.length == 4) {
                        // RULE: push {rX}; pop {rY} -> mov rY, rX
                        pxtc.assert(ln.words[1] == "{");
                        ln.update("mov " + lnNext.words[2] + ", " + ln.words[2]);
                        lnNext.update("");
                    }
                    else if (lnNext2 && ln.getOpExt() == "movs $r5, $i0" && lnNext.getOpExt() == "mov $r0, $r1" &&
                        ln.numArgs[0] == lnNext.numArgs[1] &&
                        clobbersReg(lnNext2, ln.numArgs[0])) {
                        // RULE: movs rX, #V; mov rY, rX; clobber rX -> movs rY, #V
                        ln.update("movs r" + lnNext.numArgs[0] + ", #" + ln.numArgs[1]);
                        lnNext.update("");
                    }
                    else if (lnop == "pop" && singleReg(ln) >= 0 && lnNext.getOp() == "push" &&
                        singleReg(ln) == singleReg(lnNext)) {
                        // RULE: pop {rX}; push {rX} -> ldr rX, [sp, #0]
                        ln.update("ldr r" + singleReg(ln) + ", [sp, #0]");
                        lnNext.update("");
                    }
                    else if (lnNext2 && lnop == "push" && singleReg(ln) >= 0 && preservesReg(lnNext, singleReg(ln)) &&
                        lnNext2.getOp() == "pop" && singleReg(ln) == singleReg(lnNext2)) {
                        // RULE: push {rX}; movs rY, #V; pop {rX} -> movs rY, #V (when X != Y)
                        ln.update("");
                        lnNext2.update("");
                    }
                };
                ThumbProcessor.prototype.registerNo = function (actual) {
                    if (!actual)
                        return null;
                    actual = actual.toLowerCase();
                    switch (actual) {
                        case "pc":
                            actual = "r15";
                            break;
                        case "lr":
                            actual = "r14";
                            break;
                        case "sp":
                            actual = "r13";
                            break;
                    }
                    var m = /^r(\d+)$/.exec(actual);
                    if (m) {
                        var r = parseInt(m[1], 10);
                        if (0 <= r && r < 16)
                            return r;
                    }
                    return null;
                };
                ThumbProcessor.prototype.testAssembler = function () {
                    pxtc.assembler.expectError(this, "lsl r0, r0, #8");
                    pxtc.assembler.expectError(this, "push {pc,lr}");
                    pxtc.assembler.expectError(this, "push {r17}");
                    pxtc.assembler.expectError(this, "mov r0, r1 foo");
                    pxtc.assembler.expectError(this, "movs r14, #100");
                    pxtc.assembler.expectError(this, "push {r0");
                    pxtc.assembler.expectError(this, "push lr,r0}");
                    pxtc.assembler.expectError(this, "pop {lr,r0}");
                    pxtc.assembler.expectError(this, "b #+11");
                    pxtc.assembler.expectError(this, "b #+102400");
                    pxtc.assembler.expectError(this, "bne undefined_label");
                    pxtc.assembler.expectError(this, ".foobar");
                    pxtc.assembler.expect(this, "0200      lsls    r0, r0, #8\n" +
                        "b500      push    {lr}\n" +
                        "2064      movs    r0, #100        ; 0x64\n" +
                        "b401      push    {r0}\n" +
                        "bc08      pop     {r3}\n" +
                        "b501      push    {r0, lr}\n" +
                        "bd20      pop {r5, pc}\n" +
                        "bc01      pop {r0}\n" +
                        "4770      bx      lr\n" +
                        "0000      .balign 4\n" +
                        "e6c0      .word   -72000\n" +
                        "fffe\n");
                    pxtc.assembler.expect(this, "4291      cmp     r1, r2\n" +
                        "d100      bne     l6\n" +
                        "e000      b       l8\n" +
                        "1840  l6: adds    r0, r0, r1\n" +
                        "4718  l8: bx      r3\n");
                    pxtc.assembler.expect(this, "          @stackmark base\n" +
                        "b403      push    {r0, r1}\n" +
                        "          @stackmark locals\n" +
                        "9801      ldr     r0, [sp, locals@1]\n" +
                        "b401      push    {r0}\n" +
                        "9802      ldr     r0, [sp, locals@1]\n" +
                        "bc01      pop     {r0}\n" +
                        "          @stackempty locals\n" +
                        "9901      ldr     r1, [sp, locals@1]\n" +
                        "9102      str     r1, [sp, base@0]\n" +
                        "          @stackempty locals\n" +
                        "b002      add     sp, #8\n" +
                        "          @stackempty base\n");
                    pxtc.assembler.expect(this, "b090      sub sp, #4*16\n" +
                        "b010      add sp, #4*16\n");
                    pxtc.assembler.expect(this, "6261      .string \"abc\"\n" +
                        "0063      \n");
                    pxtc.assembler.expect(this, "6261      .string \"abcde\"\n" +
                        "6463      \n" +
                        "0065      \n");
                    pxtc.assembler.expect(this, "3042      adds r0, 0x42\n" +
                        "1c0d      adds r5, r1, #0\n" +
                        "d100      bne #0\n" +
                        "2800      cmp r0, #0\n" +
                        "6b28      ldr r0, [r5, #48]\n" +
                        "0200      lsls r0, r0, #8\n" +
                        "2063      movs r0, 0x63\n" +
                        "4240      negs r0, r0\n" +
                        "46c0      nop\n" +
                        "b500      push {lr}\n" +
                        "b401      push {r0}\n" +
                        "b402      push {r1}\n" +
                        "b404      push {r2}\n" +
                        "b408      push {r3}\n" +
                        "b520      push {r5, lr}\n" +
                        "bd00      pop {pc}\n" +
                        "bc01      pop {r0}\n" +
                        "bc02      pop {r1}\n" +
                        "bc04      pop {r2}\n" +
                        "bc08      pop {r3}\n" +
                        "bd20      pop {r5, pc}\n" +
                        "9003      str r0, [sp, #4*3]\n");
                };
                return ThumbProcessor;
            }(pxtc.assembler.AbstractProcessor));
            thumb.ThumbProcessor = ThumbProcessor;
            // if true then instruction doesn't write r<n> and doesn't read/write memory
            function preservesReg(ln, n) {
                if (ln.getOpExt() == "movs $r5, $i0" && ln.numArgs[0] != n)
                    return true;
                return false;
            }
            function clobbersReg(ln, n) {
                // TODO add some more
                if (ln.getOp() == "pop" && ln.numArgs[0] & (1 << n))
                    return true;
                return false;
            }
            function singleReg(ln) {
                pxtc.assert(ln.getOp() == "push" || ln.getOp() == "pop");
                var k = 0;
                var ret = -1;
                var v = ln.numArgs[0];
                while (v > 0) {
                    if (v & 1) {
                        if (ret == -1)
                            ret = k;
                        else
                            ret = -2;
                    }
                    v >>= 1;
                    k++;
                }
                if (ret >= 0)
                    return ret;
                else
                    return -1;
            }
        })(thumb = pxtc.thumb || (pxtc.thumb = {}));
    })(pxtc = ts.pxtc || (ts.pxtc = {}));
})(ts || (ts = {}));
var ts;
(function (ts) {
    var pxtc;
    (function (pxtc) {
        var ir;
        (function (ir) {
            var U = pxtc.Util;
            var assert = U.assert;
            (function (EK) {
                EK[EK["None"] = 0] = "None";
                EK[EK["NumberLiteral"] = 1] = "NumberLiteral";
                EK[EK["PointerLiteral"] = 2] = "PointerLiteral";
                EK[EK["RuntimeCall"] = 3] = "RuntimeCall";
                EK[EK["ProcCall"] = 4] = "ProcCall";
                EK[EK["SharedRef"] = 5] = "SharedRef";
                EK[EK["SharedDef"] = 6] = "SharedDef";
                EK[EK["FieldAccess"] = 7] = "FieldAccess";
                EK[EK["Store"] = 8] = "Store";
                EK[EK["CellRef"] = 9] = "CellRef";
                EK[EK["Incr"] = 10] = "Incr";
                EK[EK["Decr"] = 11] = "Decr";
                EK[EK["Sequence"] = 12] = "Sequence";
                EK[EK["JmpValue"] = 13] = "JmpValue";
                EK[EK["Nop"] = 14] = "Nop";
            })(ir.EK || (ir.EK = {}));
            var EK = ir.EK;
            (function (CallingConvention) {
                CallingConvention[CallingConvention["Plain"] = 0] = "Plain";
                CallingConvention[CallingConvention["Async"] = 1] = "Async";
                CallingConvention[CallingConvention["Promise"] = 2] = "Promise";
            })(ir.CallingConvention || (ir.CallingConvention = {}));
            var CallingConvention = ir.CallingConvention;
            var Node = (function () {
                function Node() {
                }
                Node.prototype.isExpr = function () { return false; };
                Node.prototype.isStmt = function () { return false; };
                return Node;
            }());
            ir.Node = Node;
            var Expr = (function (_super) {
                __extends(Expr, _super);
                function Expr(exprKind, args, data) {
                    _super.call(this);
                    this.exprKind = exprKind;
                    this.args = args;
                    this.data = data;
                    this.callingConvention = CallingConvention.Plain;
                }
                Expr.clone = function (e) {
                    var copy = new Expr(e.exprKind, e.args.slice(0), e.data);
                    if (e.jsInfo)
                        copy.jsInfo = e.jsInfo;
                    if (e.totalUses) {
                        copy.totalUses = e.totalUses;
                        copy.currUses = e.currUses;
                    }
                    copy.callingConvention = e.callingConvention;
                    return copy;
                };
                Expr.prototype.isExpr = function () { return true; };
                Expr.prototype.isPure = function () {
                    return this.isStateless() || this.exprKind == EK.CellRef;
                };
                Expr.prototype.isStateless = function () {
                    switch (this.exprKind) {
                        case EK.NumberLiteral:
                        case EK.PointerLiteral:
                        case EK.SharedRef:
                            return true;
                        default: return false;
                    }
                };
                Expr.prototype.sharingInfo = function () {
                    var arg0 = this;
                    if (this.exprKind == EK.SharedRef || this.exprKind == EK.SharedDef) {
                        arg0 = this.args[0];
                        if (!arg0)
                            arg0 = { currUses: "", totalUses: "" };
                    }
                    return arg0.currUses + "/" + arg0.totalUses;
                };
                Expr.prototype.toString = function () {
                    switch (this.exprKind) {
                        case EK.NumberLiteral:
                            return this.data + "";
                        case EK.PointerLiteral:
                            return this.data + "";
                        case EK.CellRef:
                            return this.data.toString();
                        case EK.JmpValue:
                            return "JMPVALUE";
                        case EK.Nop:
                            return "NOP";
                        case EK.SharedRef:
                            return "SHARED_REF(" + this.args[0].toString() + ")";
                        case EK.SharedDef:
                            return "SHARED_DEF(" + this.args[0].toString() + ")";
                        case EK.Incr:
                            return "INCR(" + this.args[0].toString() + ")";
                        case EK.Decr:
                            return "DECR(" + this.args[0].toString() + ")";
                        case EK.FieldAccess:
                            return this.args[0].toString() + "." + this.data.name;
                        case EK.RuntimeCall:
                            return this.data + "(" + this.args.map(function (a) { return a.toString(); }).join(", ") + ")";
                        case EK.ProcCall:
                            var procid = this.data;
                            var name_4 = "";
                            if (procid.ifaceIndex != null)
                                name_4 = "IFACE@" + procid.ifaceIndex;
                            else if (procid.virtualIndex != null)
                                name_4 = "VTABLE@" + procid.virtualIndex;
                            else
                                name_4 = pxtc.getDeclName(procid.proc.action);
                            return name_4 + "(" + this.args.map(function (a) { return a.toString(); }).join(", ") + ")";
                        case EK.Sequence:
                            return "(" + this.args.map(function (a) { return a.toString(); }).join("; ") + ")";
                        case EK.Store:
                            return "{ " + this.args[0].toString() + " := " + this.args[1].toString() + " }";
                        default: throw pxtc.oops();
                    }
                };
                Expr.prototype.canUpdateCells = function () {
                    switch (this.exprKind) {
                        case EK.NumberLiteral:
                        case EK.PointerLiteral:
                        case EK.CellRef:
                        case EK.JmpValue:
                        case EK.SharedRef:
                        case EK.Nop:
                            return false;
                        case EK.SharedDef:
                        case EK.Incr:
                        case EK.Decr:
                        case EK.FieldAccess:
                            return this.args[0].canUpdateCells();
                        case EK.RuntimeCall:
                        case EK.ProcCall:
                        case EK.Sequence:
                            return true;
                        case EK.Store:
                            return true;
                        default: throw pxtc.oops();
                    }
                };
                return Expr;
            }(Node));
            ir.Expr = Expr;
            (function (SK) {
                SK[SK["None"] = 0] = "None";
                SK[SK["Expr"] = 1] = "Expr";
                SK[SK["Label"] = 2] = "Label";
                SK[SK["Jmp"] = 3] = "Jmp";
                SK[SK["StackEmpty"] = 4] = "StackEmpty";
                SK[SK["Breakpoint"] = 5] = "Breakpoint";
            })(ir.SK || (ir.SK = {}));
            var SK = ir.SK;
            (function (JmpMode) {
                JmpMode[JmpMode["Always"] = 1] = "Always";
                JmpMode[JmpMode["IfZero"] = 2] = "IfZero";
                JmpMode[JmpMode["IfNotZero"] = 3] = "IfNotZero";
                JmpMode[JmpMode["IfJmpValEq"] = 4] = "IfJmpValEq";
            })(ir.JmpMode || (ir.JmpMode = {}));
            var JmpMode = ir.JmpMode;
            var Stmt = (function (_super) {
                __extends(Stmt, _super);
                function Stmt(stmtKind, expr) {
                    _super.call(this);
                    this.stmtKind = stmtKind;
                    this.expr = expr;
                }
                Stmt.prototype.isStmt = function () { return true; };
                Stmt.prototype.toString = function () {
                    var inner = this.expr ? this.expr.toString() : "{null}";
                    switch (this.stmtKind) {
                        case ir.SK.Expr:
                            return "    " + inner + "\n";
                        case ir.SK.Jmp:
                            var fin = "goto " + this.lblName + "\n";
                            switch (this.jmpMode) {
                                case JmpMode.Always:
                                    if (this.expr)
                                        return "    { JMPVALUE := " + inner + " } " + fin;
                                    else
                                        return "    " + fin;
                                case JmpMode.IfZero:
                                    return "    if (! " + inner + ") " + fin;
                                case JmpMode.IfNotZero:
                                    return "    if (" + inner + ") " + fin;
                                case JmpMode.IfJmpValEq:
                                    return "    if (r0 == " + inner + ") " + fin;
                                default: throw pxtc.oops();
                            }
                        case ir.SK.StackEmpty:
                            return "    ;\n";
                        case ir.SK.Breakpoint:
                            return "    // brk " + (this.breakpointInfo.id) + "\n";
                        case ir.SK.Label:
                            return this.lblName + ":\n";
                        default: throw pxtc.oops();
                    }
                };
                return Stmt;
            }(Node));
            ir.Stmt = Stmt;
            var Cell = (function () {
                function Cell(index, def, info) {
                    this.index = index;
                    this.def = def;
                    this.info = info;
                    this.isarg = false;
                    this.iscap = false;
                    this._isRef = false;
                    this._isLocal = false;
                    this._isGlobal = false;
                    this.bitSize = 0 /* None */;
                    if (def && info) {
                        pxtc.setCellProps(this);
                    }
                }
                Cell.prototype.getName = function () {
                    return pxtc.getDeclName(this.def);
                };
                Cell.prototype.getDebugInfo = function () {
                    return {
                        name: this.getName(),
                        type: "TODO"
                    };
                };
                Cell.prototype.toString = function () {
                    var n = "";
                    if (this.def)
                        n += this.getName() || "?";
                    if (this.isarg)
                        n = "ARG " + n;
                    if (this.isRef())
                        n = "REF " + n;
                    //if (this.isByRefLocal()) n = "BYREF " + n
                    return "[" + n + "]";
                };
                Cell.prototype.uniqueName = function () {
                    if (this.isarg)
                        return "arg" + this.index; // have to keep names stable for inheritance
                    return this.getName().replace(/[^\w]/g, "_") + "___" + pxtc.getNodeId(this.def);
                };
                Cell.prototype.refSuffix = function () {
                    if (this.isRef())
                        return "Ref";
                    else
                        return "";
                };
                Cell.prototype.isRef = function () { return this._isRef; };
                Cell.prototype.isLocal = function () { return this._isLocal; };
                Cell.prototype.isGlobal = function () { return this._isGlobal; };
                Cell.prototype.loadCore = function () {
                    return op(EK.CellRef, null, this);
                };
                Cell.prototype.load = function () {
                    var r = this.loadCore();
                    if (this.isByRefLocal())
                        return rtcall("pxtrt::ldloc" + this.refSuffix(), [r]);
                    if (this.refCountingHandledHere())
                        return op(EK.Incr, [r]);
                    return r;
                };
                Cell.prototype.refCountingHandledHere = function () {
                    return this.isRef() && !this.isByRefLocal();
                };
                Cell.prototype.isByRefLocal = function () {
                    return this.isLocal() && this.info.captured && this.info.written;
                };
                Cell.prototype.storeDirect = function (src) {
                    return op(EK.Store, [this.loadCore(), src]);
                };
                Cell.prototype.storeByRef = function (src) {
                    if (this.isByRefLocal()) {
                        return rtcall("pxtrt::stloc" + this.refSuffix(), [this.loadCore(), src]);
                    }
                    else {
                        if (this.refCountingHandledHere()) {
                            var tmp = shared(src);
                            return op(EK.Sequence, [
                                tmp,
                                op(EK.Decr, [this.loadCore()]),
                                this.storeDirect(tmp)
                            ]);
                        }
                        else {
                            return this.storeDirect(src);
                        }
                    }
                };
                Object.defineProperty(Cell.prototype, "isTemporary", {
                    get: function () {
                        return false;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Cell;
            }());
            ir.Cell = Cell;
            //Cells that represent variables that are generated by the compiler as temporaries
            //The user cannot access these cells from JS or blocks
            var UnnamedCell = (function (_super) {
                __extends(UnnamedCell, _super);
                function UnnamedCell(index, owningProc) {
                    _super.call(this, index, null, null);
                    this.index = index;
                    this.owningProc = owningProc;
                    this.uid = UnnamedCell.unnamedCellCounter++;
                }
                UnnamedCell.prototype.getName = function () {
                    return "unnamed" + this.uid;
                };
                UnnamedCell.prototype.uniqueName = function () {
                    return this.getName() + "___U" + this.index;
                };
                UnnamedCell.prototype.isByRefLocal = function () {
                    return false;
                };
                Object.defineProperty(UnnamedCell.prototype, "isTemporary", {
                    get: function () {
                        return true;
                    },
                    enumerable: true,
                    configurable: true
                });
                UnnamedCell.unnamedCellCounter = 0;
                return UnnamedCell;
            }(Cell));
            ir.UnnamedCell = UnnamedCell;
            function noRefCount(e) {
                switch (e.exprKind) {
                    case ir.EK.Sequence:
                        return noRefCount(e.args[e.args.length - 1]);
                    case ir.EK.NumberLiteral:
                        return true;
                    case ir.EK.RuntimeCall:
                        switch (e.data) {
                            case "String_::mkEmpty":
                            case "pxt::ptrOfLiteral":
                                return true;
                            default:
                                return false;
                        }
                    case ir.EK.SharedDef:
                    case ir.EK.SharedRef:
                        return noRefCount(e.args[0]);
                    default:
                        return false;
                }
            }
            var Procedure = (function (_super) {
                __extends(Procedure, _super);
                function Procedure() {
                    _super.apply(this, arguments);
                    this.numArgs = 0;
                    this.isRoot = false;
                    this.locals = [];
                    this.captured = [];
                    this.args = [];
                    this.body = [];
                    this.lblNo = 0;
                }
                Procedure.prototype.reset = function () {
                    this.body = [];
                    this.lblNo = 0;
                    this.locals = [];
                    this.captured = [];
                    this.args = [];
                };
                Procedure.prototype.label = function () {
                    return pxtc.getFunctionLabel(this.action, this.bindings);
                };
                Procedure.prototype.matches = function (id) {
                    if (this.action == id.action) {
                        U.assert(this.bindings.length == id.bindings.length);
                        for (var i = 0; i < this.bindings.length; ++i)
                            if (this.bindings[i].isRef != id.bindings[i].isRef)
                                return false;
                        return true;
                    }
                    return false;
                };
                Procedure.prototype.toString = function () {
                    return "\nPROC " + pxtc.getDeclName(this.action) + "\n" + this.body.map(function (s) { return s.toString(); }).join("") + "\n";
                };
                Procedure.prototype.emit = function (stmt) {
                    this.body.push(stmt);
                };
                Procedure.prototype.emitExpr = function (expr) {
                    this.emit(stmt(SK.Expr, expr));
                };
                Procedure.prototype.mkLabel = function (name) {
                    var lbl = stmt(SK.Label, null);
                    lbl.lblName = "." + name + "_" + this.lblNo++ + "_" + this.seqNo;
                    lbl.lbl = lbl;
                    return lbl;
                };
                Procedure.prototype.emitLbl = function (lbl) {
                    this.emit(lbl);
                };
                Procedure.prototype.emitLblDirect = function (lblName) {
                    var lbl = stmt(SK.Label, null);
                    lbl.lblName = lblName;
                    lbl.lbl = lbl;
                    this.emit(lbl);
                };
                Procedure.prototype.getName = function () {
                    var text = this.action && this.action.name ? this.action.name.text : null;
                    return text || "inline";
                };
                Procedure.prototype.mkLocal = function (def, info) {
                    var l = new Cell(this.locals.length, def, info);
                    this.locals.push(l);
                    return l;
                };
                Procedure.prototype.mkLocalUnnamed = function (isRef) {
                    if (isRef === void 0) { isRef = false; }
                    var uc = new UnnamedCell(this.locals.length, this);
                    uc._isRef = isRef;
                    this.locals.push(uc);
                    return uc;
                };
                Procedure.prototype.localIndex = function (l, noargs) {
                    if (noargs === void 0) { noargs = false; }
                    return this.captured.filter(function (n) { return n.def == l; })[0] ||
                        this.locals.filter(function (n) { return n.def == l; })[0] ||
                        (noargs ? null : this.args.filter(function (n) { return n.def == l; })[0]);
                };
                Procedure.prototype.stackEmpty = function () {
                    this.emit(stmt(SK.StackEmpty, null));
                };
                Procedure.prototype.emitClrIfRef = function (p) {
                    assert(!p.isGlobal() && !p.iscap);
                    if (p.isRef() || p.isByRefLocal()) {
                        this.emitExpr(op(EK.Decr, [p.loadCore()]));
                    }
                };
                Procedure.prototype.emitClrs = function () {
                    var _this = this;
                    if (this.isRoot)
                        return;
                    var lst = this.locals.concat(this.args);
                    lst.forEach(function (p) { return _this.emitClrIfRef(p); });
                };
                Procedure.prototype.emitJmpZ = function (trg, expr) {
                    this.emitJmp(trg, expr, JmpMode.IfZero);
                };
                Procedure.prototype.emitJmp = function (trg, expr, mode, terminate) {
                    if (mode === void 0) { mode = JmpMode.Always; }
                    if (terminate === void 0) { terminate = null; }
                    var jmp = stmt(SK.Jmp, expr);
                    jmp.jmpMode = mode;
                    jmp.terminateExpr = terminate;
                    if (typeof trg == "string")
                        jmp.lblName = trg;
                    else {
                        jmp.lbl = trg;
                        jmp.lblName = jmp.lbl.lblName;
                    }
                    this.emit(jmp);
                };
                Procedure.prototype.resolve = function () {
                    var _this = this;
                    var iterargs = function (e, f) {
                        if (e.args)
                            for (var i = 0; i < e.args.length; ++i)
                                e.args[i] = f(e.args[i]);
                    };
                    var refdef = function (e) {
                        switch (e.exprKind) {
                            case EK.SharedDef: throw U.oops();
                            case EK.SharedRef:
                                var arg = e.args[0];
                                if (!arg.totalUses) {
                                    arg.totalUses = -1;
                                    arg.currUses = 0;
                                    var e2 = Expr.clone(e);
                                    e2.exprKind = EK.SharedDef;
                                    e2.args[0] = refdef(e2.args[0]);
                                    return e2;
                                }
                                else {
                                    arg.totalUses--;
                                    return e;
                                }
                        }
                        iterargs(e, refdef);
                        return e;
                    };
                    var opt = function (e) {
                        if (e.exprKind == EK.SharedRef)
                            return e;
                        iterargs(e, opt);
                        if ((e.exprKind == EK.Decr || e.exprKind == EK.Incr) && noRefCount(e.args[0])) {
                            return e.args[0];
                        }
                        switch (e.exprKind) {
                            case EK.Decr:
                                if (e.args[0].exprKind == EK.Incr)
                                    return e.args[0].args[0];
                                break;
                            case EK.Sequence:
                                e.args = e.args.filter(function (a, i) { return i == e.args.length - 1 || !a.isPure(); });
                                break;
                        }
                        return e;
                    };
                    var cntuses = function (e) {
                        switch (e.exprKind) {
                            case EK.SharedDef:
                                var arg = e.args[0];
                                //console.log(arg)
                                U.assert(arg.totalUses < 0);
                                U.assert(arg.currUses === 0);
                                if (arg.totalUses == -1)
                                    return cntuses(arg);
                                else
                                    arg.totalUses = 1;
                                break;
                            case EK.SharedRef:
                                U.assert(e.args[0].totalUses > 0);
                                e.args[0].totalUses++;
                                return e;
                        }
                        iterargs(e, cntuses);
                        return e;
                    };
                    this.body = this.body.filter(function (s) {
                        if (s.expr) {
                            //console.log("OPT", s.expr.toString())
                            s.expr = opt(refdef(s.expr));
                            //console.log("INTO", s.expr.toString())
                            if (s.stmtKind == ir.SK.Expr && s.expr.isPure())
                                return false;
                        }
                        return true;
                    });
                    var lbls = U.toDictionary(this.body.filter(function (s) { return s.stmtKind == ir.SK.Label; }), function (s) { return s.lblName; });
                    for (var i = 0; i < this.body.length; ++i)
                        this.body[i].stmtNo = i;
                    for (var _i = 0, _a = this.body; _i < _a.length; _i++) {
                        var s = _a[_i];
                        if (s.expr) {
                            //console.log("CNT", s.expr.toString())
                            s.expr = cntuses(s.expr);
                        }
                        switch (s.stmtKind) {
                            case ir.SK.Expr:
                                break;
                            case ir.SK.Jmp:
                                s.lbl = U.lookup(lbls, s.lblName);
                                if (!s.lbl)
                                    pxtc.oops("missing label: " + s.lblName);
                                s.lbl.lblNumUses++;
                                break;
                            case ir.SK.StackEmpty:
                            case ir.SK.Label:
                            case ir.SK.Breakpoint:
                                break;
                            default: pxtc.oops();
                        }
                    }
                    var findIdx = 1;
                    var findNext = function (i) {
                        var res = [];
                        var loop = function (i) {
                            while (i < _this.body.length) {
                                var s = _this.body[i];
                                if (s.findIdx === findIdx)
                                    return;
                                s.findIdx = findIdx;
                                switch (s.stmtKind) {
                                    case ir.SK.Jmp:
                                        if (s.jmpMode == ir.JmpMode.Always)
                                            i = s.lbl.stmtNo - 1;
                                        else
                                            loop(s.lbl.stmtNo); // fork
                                        break;
                                    case ir.SK.Breakpoint:
                                        res.push(s.breakpointInfo);
                                        return;
                                }
                                i++;
                            }
                        };
                        findIdx++;
                        loop(i);
                        return res;
                    };
                    var allBrkp = [];
                    for (var _b = 0, _c = this.body; _b < _c.length; _b++) {
                        var s = _c[_b];
                        if (s.stmtKind == ir.SK.Breakpoint) {
                            s.breakpointInfo.successors = findNext(s.stmtNo + 1).map(function (b) { return b.id; });
                            allBrkp[s.breakpointInfo.id] = s.breakpointInfo;
                        }
                    }
                    var debugSucc = false;
                    if (debugSucc) {
                        var s = "BRKP: " + this.getName() + ":\n";
                        for (var i = 0; i < allBrkp.length; ++i) {
                            var b = allBrkp[i];
                            if (!b)
                                continue;
                            s += (b.line + 1) + ": ";
                            var n = allBrkp[i + 1];
                            if (n && b.successors.length == 1 && b.successors[0] == n.id)
                                s += ".";
                            else
                                s += b.successors.map(function (b) { return ("" + (allBrkp[b].line + 1)); }).join(", ");
                            s += "\n";
                        }
                        console.log(s);
                    }
                };
                return Procedure;
            }(Node));
            ir.Procedure = Procedure;
            function iterExpr(e, f) {
                f(e);
                if (e.args)
                    for (var _i = 0, _a = e.args; _i < _a.length; _i++) {
                        var a = _a[_i];
                        iterExpr(a, f);
                    }
            }
            ir.iterExpr = iterExpr;
            function stmt(kind, expr) {
                return new Stmt(kind, expr);
            }
            ir.stmt = stmt;
            function op(kind, args, data) {
                return new Expr(kind, args, data);
            }
            ir.op = op;
            function numlit(v) {
                return op(EK.NumberLiteral, null, v);
            }
            ir.numlit = numlit;
            function shared(expr) {
                switch (expr.exprKind) {
                    case EK.NumberLiteral:
                    case EK.SharedRef:
                        return expr;
                }
                return op(EK.SharedRef, [expr]);
            }
            ir.shared = shared;
            function ptrlit(lbl, jsInfo) {
                var r = op(EK.PointerLiteral, null, lbl);
                r.jsInfo = jsInfo;
                return r;
            }
            ir.ptrlit = ptrlit;
            function rtcall(name, args) {
                return op(EK.RuntimeCall, args, name);
            }
            ir.rtcall = rtcall;
            function rtcallMask(name, mask, callingConv, args) {
                var decrs = [];
                args = args.map(function (a, i) {
                    if (mask & (1 << i)) {
                        a = shared(a);
                        decrs.push(op(EK.Decr, [a]));
                        return a;
                    }
                    else
                        return a;
                });
                var r = op(EK.RuntimeCall, args, name);
                r.callingConvention = callingConv;
                if (decrs.length > 0) {
                    r = shared(r);
                    decrs.unshift(r);
                    decrs.push(r);
                    r = op(EK.Sequence, decrs);
                }
                return r;
            }
            ir.rtcallMask = rtcallMask;
            function flattenArgs(topExpr) {
                var didStateUpdate = false;
                var complexArgs = [];
                for (var _i = 0, _a = U.reversed(topExpr.args); _i < _a.length; _i++) {
                    var a = _a[_i];
                    if (a.isStateless())
                        continue;
                    if (a.exprKind == EK.CellRef && !didStateUpdate)
                        continue;
                    if (a.canUpdateCells())
                        didStateUpdate = true;
                    complexArgs.push(a);
                }
                complexArgs.reverse();
                var precomp = [];
                var flattened = topExpr.args.map(function (a) {
                    var idx = complexArgs.indexOf(a);
                    if (idx >= 0) {
                        var sharedRef = a;
                        var sharedDef = a;
                        if (a.exprKind == EK.SharedDef) {
                            a.args[0].totalUses++;
                            sharedRef = ir.op(EK.SharedRef, [a.args[0]]);
                        }
                        else {
                            sharedRef = ir.op(EK.SharedRef, [a]);
                            sharedDef = ir.op(EK.SharedDef, [a]);
                            a.totalUses = 2;
                            a.currUses = 0;
                        }
                        precomp.push(sharedDef);
                        return sharedRef;
                    }
                    else
                        return a;
                });
                return { precomp: precomp, flattened: flattened };
            }
            ir.flattenArgs = flattenArgs;
        })(ir = pxtc.ir || (pxtc.ir = {}));
    })(pxtc = ts.pxtc || (ts.pxtc = {}));
})(ts || (ts = {}));
/// <reference path="../../localtypings/pxtarget.d.ts"/>
/// <reference path="../../localtypings/pxtpackage.d.ts"/>
var ts;
(function (ts) {
    var pxtc;
    (function (pxtc) {
        pxtc.assert = pxtc.Util.assert;
        pxtc.oops = pxtc.Util.oops;
        pxtc.U = pxtc.Util;
        pxtc.ON_START_TYPE = "pxt-on-start";
        pxtc.TS_STATEMENT_TYPE = "typescript_statement";
        pxtc.TS_OUTPUT_TYPE = "typescript_expression";
        pxtc.BINARY_JS = "binary.js";
        pxtc.BINARY_HEX = "binary.hex";
        pxtc.BINARY_ASM = "binary.asm";
        pxtc.BINARY_UF2 = "binary.uf2";
        var EK = pxtc.ir.EK;
        pxtc.SK = ts.SyntaxKind;
        pxtc.numReservedGlobals = 1;
        var lastNodeId = 0;
        var currNodeWave = 1;
        function getNodeId(n) {
            var nn = n;
            if (nn.pxtNodeWave !== currNodeWave) {
                nn.pxtNodeId = ++lastNodeId;
                nn.pxtNodeWave = currNodeWave;
            }
            return nn.pxtNodeId;
        }
        pxtc.getNodeId = getNodeId;
        function stringKind(n) {
            if (!n)
                return "<null>";
            return ts.SyntaxKind[n.kind];
        }
        pxtc.stringKind = stringKind;
        function inspect(n) {
            console.log(stringKind(n));
        }
        // next free error 9261
        function userError(code, msg, secondary) {
            if (secondary === void 0) { secondary = false; }
            var e = new Error(msg);
            e.ksEmitterUserError = true;
            e.ksErrorCode = code;
            if (secondary && inCatchErrors) {
                if (!lastSecondaryError) {
                    lastSecondaryError = msg;
                    lastSecondaryErrorCode = code;
                }
                return e;
            }
            throw e;
        }
        function isRefType(t) {
            checkType(t);
            if (t.flags & ts.TypeFlags.ThisType)
                return true;
            if (t.flags & ts.TypeFlags.Null)
                return false;
            if (t.flags & ts.TypeFlags.Undefined)
                return false;
            if (t.flags & ts.TypeFlags.TypeParameter) {
                var b = lookupTypeParameter(t);
                if (b)
                    return b.isRef;
                pxtc.U.oops("unbound type parameter: " + checker.typeToString(t));
            }
            if (t.flags & (ts.TypeFlags.NumberLike | ts.TypeFlags.Boolean))
                return false;
            var sym = t.getSymbol();
            if (sym) {
                var decl = sym.valueDeclaration || sym.declarations[0];
                if (decl) {
                    var attrs = parseComments(decl);
                    if (attrs.noRefCounting)
                        return false;
                }
            }
            return true;
        }
        function isRefDecl(def) {
            if (def.isThisParameter)
                return true;
            //let tp = checker.getDeclaredTypeOfSymbol(def.symbol)
            var tp = typeOf(def);
            return isRefType(tp);
        }
        function getBitSize(decl) {
            if (!decl || !decl.type)
                return 0 /* None */;
            if (!(typeOf(decl).flags & ts.TypeFlags.Number))
                return 0 /* None */;
            if (decl.type.kind != pxtc.SK.TypeReference)
                return 0 /* None */;
            switch (decl.type.typeName.getText()) {
                case "int8": return 1 /* Int8 */;
                case "int16": return 3 /* Int16 */;
                case "int32": return 5 /* Int32 */;
                case "uint8": return 2 /* UInt8 */;
                case "uint16": return 4 /* UInt16 */;
                default: return 0 /* None */;
            }
        }
        function sizeOfBitSize(b) {
            switch (b) {
                case 0 /* None */: return 4;
                case 1 /* Int8 */: return 1;
                case 3 /* Int16 */: return 2;
                case 5 /* Int32 */: return 4;
                case 2 /* UInt8 */: return 1;
                case 4 /* UInt16 */: return 2;
                default: throw pxtc.oops();
            }
        }
        pxtc.sizeOfBitSize = sizeOfBitSize;
        function setCellProps(l) {
            l._isRef = isRefDecl(l.def);
            l._isLocal = isLocalVar(l.def) || isParameter(l.def);
            l._isGlobal = isGlobalVar(l.def);
            if (!l.isRef() && typeOf(l.def).flags & ts.TypeFlags.Void) {
                pxtc.oops("void-typed variable, " + l.toString());
            }
            l.bitSize = getBitSize(l.def);
            if (l.isLocal() && l.bitSize != 0 /* None */) {
                l.bitSize = 0 /* None */;
                userError(9256, lf("bit sizes are not supported for locals and parameters"));
            }
        }
        pxtc.setCellProps = setCellProps;
        function isStringLiteral(node) {
            switch (node.kind) {
                case pxtc.SK.TemplateHead:
                case pxtc.SK.TemplateMiddle:
                case pxtc.SK.TemplateTail:
                case pxtc.SK.StringLiteral:
                case pxtc.SK.NoSubstitutionTemplateLiteral:
                    return true;
                default: return false;
            }
        }
        function isEmptyStringLiteral(e) {
            return isStringLiteral(e) && e.text == "";
        }
        function isStatic(node) {
            return node.modifiers && node.modifiers.some(function (m) { return m.kind == pxtc.SK.StaticKeyword; });
        }
        function classFunctionPref(node) {
            if (!node)
                return null;
            switch (node.kind) {
                case pxtc.SK.MethodDeclaration: return "";
                case pxtc.SK.Constructor: return "new/";
                case pxtc.SK.GetAccessor: return "get/";
                case pxtc.SK.SetAccessor: return "set/";
                default:
                    return null;
            }
        }
        function classFunctionKey(node) {
            return classFunctionPref(node) + getName(node);
        }
        function isClassFunction(node) {
            return classFunctionPref(node) != null;
        }
        function getEnclosingMethod(node) {
            if (!node)
                return null;
            if (isClassFunction(node))
                return node;
            return getEnclosingMethod(node.parent);
        }
        function isInAnyWayGeneric(node) {
            return isGenericFunction(node) || hasGenericParent(node);
        }
        function hasGenericParent(node) {
            var par = getEnclosingFunction(node);
            if (par)
                return isGenericFunction(par) || hasGenericParent(par);
            return false;
        }
        function getEnclosingFunction(node0) {
            var node = node0;
            while (true) {
                node = node.parent;
                if (!node)
                    userError(9229, lf("cannot determine parent of {0}", stringKind(node0)));
                switch (node.kind) {
                    case pxtc.SK.MethodDeclaration:
                    case pxtc.SK.Constructor:
                    case pxtc.SK.GetAccessor:
                    case pxtc.SK.SetAccessor:
                    case pxtc.SK.FunctionDeclaration:
                    case pxtc.SK.ArrowFunction:
                    case pxtc.SK.FunctionExpression:
                        return node;
                    case pxtc.SK.SourceFile:
                        return null;
                }
            }
        }
        function isGlobalVar(d) {
            if (!d)
                return false;
            return (d.kind == pxtc.SK.VariableDeclaration && !getEnclosingFunction(d)) ||
                (d.kind == pxtc.SK.PropertyDeclaration && isStatic(d));
        }
        function isLocalVar(d) {
            return d.kind == pxtc.SK.VariableDeclaration && !isGlobalVar(d);
        }
        function isParameter(d) {
            return d.kind == pxtc.SK.Parameter;
        }
        function isTopLevelFunctionDecl(decl) {
            return (decl.kind == pxtc.SK.FunctionDeclaration && !getEnclosingFunction(decl)) ||
                isClassFunction(decl);
        }
        function isSideEffectfulInitializer(init) {
            if (!init)
                return false;
            if (isStringLiteral(init))
                return false;
            switch (init.kind) {
                case pxtc.SK.NullKeyword:
                case pxtc.SK.NumericLiteral:
                case pxtc.SK.TrueKeyword:
                case pxtc.SK.FalseKeyword:
                    return false;
                default:
                    return true;
            }
        }
        var numberAttributes = ["weight", "imageLiteral"];
        var lf = pxtc.assembler.lf;
        var checker;
        var lastSecondaryError;
        var lastSecondaryErrorCode = 0;
        var inCatchErrors = 0;
        var typeBindings = [];
        function getComments(node) {
            if (node.kind == pxtc.SK.VariableDeclaration)
                node = node.parent.parent; // we need variable stmt
            var cmtCore = function (node) {
                var src = ts.getSourceFileOfNode(node);
                var doc = ts.getLeadingCommentRangesOfNodeFromText(node, src.text);
                if (!doc)
                    return "";
                var cmt = doc.map(function (r) { return src.text.slice(r.pos, r.end); }).join("\n");
                return cmt;
            };
            if (node.symbol && node.symbol.declarations.length > 1) {
                return node.symbol.declarations.map(cmtCore).join("\n");
            }
            else {
                return cmtCore(node);
            }
        }
        pxtc.getComments = getComments;
        function parseCommentString(cmt) {
            var res = {
                paramDefl: {},
                callingConvention: pxtc.ir.CallingConvention.Plain,
                _source: cmt
            };
            var didSomething = true;
            while (didSomething) {
                didSomething = false;
                cmt = cmt.replace(/\/\/%[ \t]*([\w\.]+)(=(("[^"\n]+")|'([^'\n]+)'|([^\s]*)))?/, function (f, n, d0, d1, v0, v1, v2) {
                    var v = v0 ? JSON.parse(v0) : (d0 ? (v0 || v1 || v2) : "true");
                    if (pxtc.U.endsWith(n, ".defl")) {
                        res.paramDefl[n.slice(0, n.length - 5)] = v;
                    }
                    else if (pxtc.U.endsWith(n, ".min")) {
                        if (!res.paramMin)
                            res.paramMin = {};
                        res.paramMin[n.slice(0, n.length - 4)] = v;
                    }
                    else if (pxtc.U.endsWith(n, ".max")) {
                        if (!res.paramMax)
                            res.paramMax = {};
                        res.paramMax[n.slice(0, n.length - 4)] = v;
                    }
                    else if (pxtc.U.startsWith(n, "blockFieldEditorParams")) {
                        if (!res.blockFieldEditorParams)
                            res.blockFieldEditorParams = {};
                        res.blockFieldEditorParams[n.slice(23, n.length)] = v;
                    }
                    else {
                        res[n] = v;
                    }
                    didSomething = true;
                    return "//% ";
                });
            }
            for (var _i = 0, numberAttributes_1 = numberAttributes; _i < numberAttributes_1.length; _i++) {
                var n = numberAttributes_1[_i];
                if (typeof res[n] == "string")
                    res[n] = parseInt(res[n]);
            }
            if (res.trackArgs) {
                res.trackArgs = res.trackArgs.split(/[ ,]+/).map(function (s) { return parseInt(s) || 0; });
            }
            res.paramHelp = {};
            res.jsDoc = "";
            cmt = cmt.replace(/\/\*\*([^]*?)\*\//g, function (full, doccmt) {
                doccmt = doccmt.replace(/\n\s*(\*\s*)?/g, "\n");
                doccmt = doccmt.replace(/^\s*@param\s+(\w+)\s+(.*)$/mg, function (full, name, desc) {
                    res.paramHelp[name] = desc;
                    return "";
                });
                res.jsDoc += doccmt;
                return "";
            });
            res.jsDoc = res.jsDoc.trim();
            if (res.async)
                res.callingConvention = pxtc.ir.CallingConvention.Async;
            if (res.promise)
                res.callingConvention = pxtc.ir.CallingConvention.Promise;
            if (res.subcategories) {
                try {
                    res.subcategories = JSON.parse(res.subcategories);
                }
                catch (e) {
                    res.subcategories = undefined;
                }
            }
            return res;
        }
        pxtc.parseCommentString = parseCommentString;
        function parseCommentsOnSymbol(symbol) {
            var cmts = "";
            for (var _i = 0, _a = symbol.declarations; _i < _a.length; _i++) {
                var decl = _a[_i];
                cmts += getComments(decl);
            }
            return parseCommentString(cmts);
        }
        pxtc.parseCommentsOnSymbol = parseCommentsOnSymbol;
        function parseComments(node0) {
            if (!node0 || node0.isBogusFunction)
                return parseCommentString("");
            var node = node0;
            var cached = node.pxtCommentAttrs;
            if (cached)
                return cached;
            var res = parseCommentString(getComments(node));
            res._name = getName(node);
            node.pxtCommentAttrs = res;
            return res;
        }
        pxtc.parseComments = parseComments;
        function getName(node) {
            if (!node.name || node.name.kind != pxtc.SK.Identifier)
                return "???";
            return node.name.text;
        }
        pxtc.getName = getName;
        function isArrayType(t) {
            return (t.flags & ts.TypeFlags.Reference) && t.symbol.name == "Array";
        }
        function isInterfaceType(t) {
            return t.flags & ts.TypeFlags.Interface;
        }
        function genericRoot(t) {
            if (t.flags & ts.TypeFlags.Reference) {
                var r = t;
                if (r.typeArguments && r.typeArguments.length)
                    return r.target;
            }
            return null;
        }
        function isClassType(t) {
            // check if we like the class?
            return !!(t.flags & ts.TypeFlags.Class) || !!(t.flags & ts.TypeFlags.ThisType);
        }
        function isPossiblyGenericClassType(t) {
            var g = genericRoot(t);
            if (g)
                return isClassType(g);
            return isClassType(t);
        }
        function arrayElementType(t) {
            if (isArrayType(t))
                return checkType(t.typeArguments[0]);
            return null;
        }
        function deconstructFunctionType(t) {
            var sigs = checker.getSignaturesOfType(t, ts.SignatureKind.Call);
            if (sigs && sigs.length == 1)
                return sigs[0];
            return null;
        }
        function lookupTypeParameter(t) {
            if (!(t.flags & ts.TypeFlags.TypeParameter))
                return null;
            for (var i = typeBindings.length - 1; i >= 0; --i)
                if (typeBindings[i].tp == t)
                    return typeBindings[i];
            return null;
        }
        function checkType(t) {
            var ok = ts.TypeFlags.String | ts.TypeFlags.Number | ts.TypeFlags.Boolean |
                ts.TypeFlags.Void | ts.TypeFlags.Enum | ts.TypeFlags.Null | ts.TypeFlags.Undefined;
            if ((t.flags & ok) == 0) {
                if (isArrayType(t))
                    return t;
                if (isClassType(t))
                    return t;
                if (isInterfaceType(t))
                    return t;
                if (deconstructFunctionType(t))
                    return t;
                if (lookupTypeParameter(t))
                    return t;
                var g = genericRoot(t);
                if (g) {
                    checkType(g);
                    t.typeArguments.forEach(checkType);
                    return t;
                }
                userError(9201, lf("unsupported type: {0} 0x{1}", checker.typeToString(t), t.flags.toString(16)), true);
            }
            return t;
        }
        function typeOf(node) {
            var r;
            if (node.typeOverride)
                return node.typeOverride;
            if (ts.isExpression(node))
                r = checker.getContextualType(node);
            if (!r) {
                try {
                    r = checker.getTypeAtLocation(node);
                }
                catch (e) {
                    userError(9203, lf("Unknown type for expression"));
                }
            }
            return checkType(r);
        }
        function isGenericFunction(fun) {
            return getTypeParameters(fun).length > 0;
        }
        function getTypeParameters(fun) {
            // TODO add check for methods of generic classes
            if (fun.typeParameters && fun.typeParameters.length)
                return fun.typeParameters;
            if (isClassFunction(fun) || fun.kind == pxtc.SK.MethodSignature) {
                if (fun.parent.kind == pxtc.SK.ClassDeclaration || fun.parent.kind == pxtc.SK.InterfaceDeclaration) {
                    var tp = fun.parent.typeParameters;
                    return tp || [];
                }
            }
            return [];
        }
        function funcHasReturn(fun) {
            var sig = checker.getSignatureFromDeclaration(fun);
            var rettp = checker.getReturnTypeOfSignature(sig);
            return !(rettp.flags & ts.TypeFlags.Void);
        }
        function getDeclName(node) {
            var text = node && node.name ? node.name.text : null;
            if (!text && node.kind == pxtc.SK.Constructor)
                text = "constructor";
            if (node && node.parent && node.parent.kind == pxtc.SK.ClassDeclaration)
                text = node.parent.name.text + "." + text;
            text = text || "inline";
            return text;
        }
        pxtc.getDeclName = getDeclName;
        function getTypeBindings(t) {
            var g = genericRoot(t);
            if (!g)
                return [];
            return getTypeBindingsCore(g.typeParameters, t.typeArguments);
        }
        function getTypeBindingsCore(typeParameters, args) {
            pxtc.U.assert(typeParameters.length == args.length);
            return typeParameters.map(function (tp, i) { return ({ tp: tp, isRef: isRefType(args[i]) }); });
        }
        function getEnclosingTypeBindings(func) {
            var bindings = [];
            addEnclosingTypeBindings(bindings, func);
            return bindings;
        }
        function addEnclosingTypeBindings(bindings, func) {
            if (!func)
                return;
            for (var outer = getEnclosingFunction(func); outer; outer = getEnclosingFunction(outer)) {
                var _loop_4 = function(tp) {
                    var res = checker.getTypeAtLocation(tp);
                    var binding = typeBindings.filter(function (b) { return b.tp == res; })[0];
                    if (!binding) {
                        pxtc.U.oops("cannot find binding for: " + checker.typeToString(res));
                    }
                    bindings.push(binding);
                };
                for (var _i = 0, _a = getTypeParameters(outer); _i < _a.length; _i++) {
                    var tp = _a[_i];
                    _loop_4(tp);
                }
            }
        }
        function refMask(types) {
            if (!types || !types.length)
                return "";
            return "_" + types.map(function (t) { return t.isRef ? "R" : "P"; }).join("");
        }
        function getFunctionLabel(node, bindings) {
            var text = getDeclName(node);
            return "_" + text.replace(/[^\w]+/g, "_") + "_" + getNodeId(node) + refMask(bindings);
        }
        pxtc.getFunctionLabel = getFunctionLabel;
        function mkBogusMethod(info, name) {
            var rootFunction = {
                kind: pxtc.SK.MethodDeclaration,
                parameters: [],
                name: {
                    kind: pxtc.SK.Identifier,
                    text: name,
                    pos: 0,
                    end: 0
                },
                body: {
                    kind: pxtc.SK.Block,
                    statements: []
                },
                parent: info.decl,
                pos: 0,
                end: 0,
                isBogusFunction: true,
            };
            return rootFunction;
        }
        function compileBinary(program, host, opts, res) {
            var diagnostics = ts.createDiagnosticCollection();
            checker = program.getTypeChecker();
            var classInfos = {};
            var usedDecls = {};
            var usedWorkList = [];
            var variableStatus = {};
            var functionInfo = {};
            var irCachesToClear = [];
            var ifaceMembers = {};
            var nextIfaceMemberId = 0;
            var autoCreateFunctions = {};
            lastNodeId = 0;
            currNodeWave++;
            if (opts.target.isNative) {
                if (!opts.hexinfo) {
                    // we may have not been able to compile or download the hex file
                    return {
                        diagnostics: [{
                                file: program.getSourceFiles()[0],
                                start: 0,
                                length: 0,
                                category: ts.DiagnosticCategory.Error,
                                code: 9043,
                                messageText: lf("The hex file is not available, please connect to internet and try again.")
                            }],
                        emitSkipped: true
                    };
                }
                pxtc.hex.setupFor(opts.target, opts.extinfo || emptyExtInfo(), opts.hexinfo);
                pxtc.hex.setupInlineAssembly(opts);
                opts.breakpoints = true;
            }
            var bin = new Binary();
            var proc;
            bin.res = res;
            bin.options = opts;
            bin.target = opts.target;
            function reset() {
                bin.reset();
                proc = null;
                res.breakpoints = [{
                        id: 0,
                        isDebuggerStmt: false,
                        fileName: "bogus",
                        start: 0,
                        length: 0,
                        line: 0,
                        column: 0,
                        successors: null
                    }];
            }
            if (opts.computeUsedSymbols) {
                res.usedSymbols = {};
                res.usedArguments = {};
            }
            var allStmts = opts.forceEmit && res.diagnostics.length > 0
                ? [] // TODO: panic
                : pxtc.Util.concat(program.getSourceFiles().map(function (f) { return f.statements; }));
            var src = program.getSourceFiles()[0];
            var rootFunction = {
                kind: pxtc.SK.FunctionDeclaration,
                parameters: [],
                name: {
                    text: "<main>",
                    pos: 0,
                    end: 0
                },
                body: {
                    kind: pxtc.SK.Block,
                    statements: allStmts
                },
                parent: src,
                pos: 0,
                end: 0,
                isRootFunction: true,
                isBogusFunction: true
            };
            markUsed(rootFunction);
            usedWorkList = [];
            reset();
            emit(rootFunction);
            layOutGlobals();
            emitVTables();
            if (diagnostics.getModificationCount() == 0) {
                reset();
                bin.finalPass = true;
                emit(rootFunction);
                catchErrors(rootFunction, finalEmit);
            }
            return {
                diagnostics: diagnostics.getDiagnostics(),
                emitSkipped: !!opts.noEmit
            };
            function error(node, code, msg, arg0, arg1, arg2) {
                diagnostics.add(ts.createDiagnosticForNode(node, {
                    code: code,
                    message: msg,
                    key: msg.replace(/^[a-zA-Z]+/g, "_"),
                    category: ts.DiagnosticCategory.Error,
                }, arg0, arg1, arg2));
            }
            function unhandled(n, info, code) {
                if (code === void 0) { code = 9202; }
                // If we have info then we may as well present that instead
                if (info) {
                    return userError(code, info);
                }
                if (!n) {
                    userError(code, lf("Sorry, this language feature isn't supported"));
                }
                var syntax = stringKind(n);
                var maybeSupportInFuture = false;
                var alternative = null;
                switch (n.kind) {
                    case ts.SyntaxKind.ForInStatement:
                        syntax = lf("for in loops");
                        break;
                    case ts.SyntaxKind.ForOfStatement:
                        syntax = lf("for of loops");
                        maybeSupportInFuture = true;
                        break;
                    case ts.SyntaxKind.PropertyAccessExpression:
                        syntax = lf("property access");
                        break;
                    case ts.SyntaxKind.DeleteExpression:
                        syntax = lf("delete");
                        break;
                    case ts.SyntaxKind.GetAccessor:
                        syntax = lf("get accessor method");
                        maybeSupportInFuture = true;
                        break;
                    case ts.SyntaxKind.SetAccessor:
                        syntax = lf("set accessor method");
                        maybeSupportInFuture = true;
                        break;
                    case ts.SyntaxKind.TaggedTemplateExpression:
                        syntax = lf("tagged templates");
                        break;
                    case ts.SyntaxKind.TypeOfExpression:
                        syntax = lf("typeof");
                        break;
                    case ts.SyntaxKind.SpreadElementExpression:
                        syntax = lf("spread");
                        break;
                    case ts.SyntaxKind.TryStatement:
                    case ts.SyntaxKind.CatchClause:
                    case ts.SyntaxKind.FinallyKeyword:
                    case ts.SyntaxKind.ThrowStatement:
                        syntax = lf("throwing and catching exceptions");
                        break;
                    case ts.SyntaxKind.ClassExpression:
                        syntax = lf("class expressions");
                        alternative = lf("declare a class as class C {} not let C = class {}");
                        break;
                    default:
                        break;
                }
                var msg = "";
                if (maybeSupportInFuture) {
                    msg = lf("{0} not currently supported", syntax);
                }
                else {
                    msg = lf("{0} not supported", syntax);
                }
                if (alternative) {
                    msg += " - " + alternative;
                }
                return userError(code, msg);
            }
            function nodeKey(f) {
                return getNodeId(f) + "";
            }
            function getFunctionInfo(f) {
                var key = nodeKey(f);
                var info = functionInfo[key];
                if (!info)
                    functionInfo[key] = info = {
                        decl: f,
                        capturedVars: []
                    };
                return info;
            }
            function getVarInfo(v) {
                var key = getNodeId(v) + "";
                var info = variableStatus[key];
                if (!info)
                    variableStatus[key] = info = {};
                return info;
            }
            function recordUse(v, written) {
                if (written === void 0) { written = false; }
                var info = getVarInfo(v);
                if (written)
                    info.written = true;
                var varParent = getEnclosingFunction(v);
                if (varParent == null || varParent == proc.action) {
                }
                else {
                    var curr = proc.action;
                    while (curr && curr != varParent) {
                        var info2 = getFunctionInfo(curr);
                        if (info2.capturedVars.indexOf(v) < 0)
                            info2.capturedVars.push(v);
                        curr = getEnclosingFunction(curr);
                    }
                    info.captured = true;
                }
            }
            function scope(f) {
                var prevProc = proc;
                var prevBindings = typeBindings.slice();
                try {
                    f();
                }
                finally {
                    proc = prevProc;
                    typeBindings = prevBindings;
                }
            }
            function getIfaceMemberId(name) {
                var v = pxtc.U.lookup(ifaceMembers, name);
                if (v != null)
                    return v;
                for (var _i = 0, _a = bin.usedClassInfos; _i < _a.length; _i++) {
                    var inf = _a[_i];
                    for (var _b = 0, _c = inf.methods; _b < _c.length; _b++) {
                        var m = _c[_b];
                        if (getName(m) == name)
                            markFunctionUsed(m, inf.bindings);
                    }
                }
                v = ifaceMembers[name] = nextIfaceMemberId++;
                return v;
            }
            function finalEmit() {
                if (diagnostics.getModificationCount() || opts.noEmit || !host)
                    return;
                bin.writeFile = function (fn, data) {
                    return host.writeFile(fn, data, false, null);
                };
                if (opts.target.isNative) {
                    if (opts.extinfo.yotta)
                        bin.writeFile("yotta.json", JSON.stringify(opts.extinfo.yotta, null, 2));
                    if (opts.extinfo.platformio)
                        bin.writeFile("platformio.json", JSON.stringify(opts.extinfo.platformio, null, 2));
                    pxtc.processorEmit(bin, opts, res);
                }
                else {
                    pxtc.jsEmit(bin);
                }
            }
            function typeCheckVar(decl) {
                if (!decl) {
                    userError(9203, lf("variable has unknown type"));
                }
                if (typeOf(decl).flags & ts.TypeFlags.Void) {
                    userError(9203, lf("void-typed variables not supported"));
                }
            }
            function lookupCell(decl) {
                if (isGlobalVar(decl)) {
                    markUsed(decl);
                    typeCheckVar(decl);
                    var ex = bin.globals.filter(function (l) { return l.def == decl; })[0];
                    if (!ex) {
                        ex = new pxtc.ir.Cell(null, decl, getVarInfo(decl));
                        bin.globals.push(ex);
                    }
                    return ex;
                }
                else {
                    var res_2 = proc.localIndex(decl);
                    if (!res_2) {
                        if (bin.finalPass)
                            userError(9204, lf("cannot locate identifer"));
                        else
                            res_2 = proc.mkLocal(decl, getVarInfo(decl));
                    }
                    return res_2;
                }
            }
            function getBaseClassInfo(node) {
                if (node.heritageClauses)
                    for (var _i = 0, _a = node.heritageClauses; _i < _a.length; _i++) {
                        var h = _a[_i];
                        switch (h.token) {
                            case pxtc.SK.ExtendsKeyword:
                                if (!h.types || h.types.length != 1)
                                    throw userError(9228, lf("invalid extends clause"));
                                var tp = typeOf(h.types[0]);
                                if (isClassType(tp)) {
                                    return getClassInfo(tp);
                                }
                                else {
                                    throw userError(9228, lf("cannot inherit from this type"));
                                }
                            // ignore it - implementation of interfaces is implicit
                            case pxtc.SK.ImplementsKeyword:
                                break;
                            default:
                                throw userError(9228, lf("invalid heritage clause"));
                        }
                    }
                return null;
            }
            function getVTable(inf) {
                pxtc.assert(inf.isUsed);
                if (inf.vtable)
                    return inf.vtable;
                var tbl = inf.baseClassInfo ? getVTable(inf.baseClassInfo).slice(0) : [];
                scope(function () {
                    pxtc.U.pushRange(typeBindings, inf.bindings);
                    for (var _i = 0, _a = inf.methods; _i < _a.length; _i++) {
                        var m = _a[_i];
                        var minf = getFunctionInfo(m);
                        if (minf.virtualRoot) {
                            var key = classFunctionKey(m);
                            var done = false;
                            var proc_1 = lookupProc(m, inf.bindings);
                            for (var i = 0; i < tbl.length; ++i) {
                                if (classFunctionKey(tbl[i].action) == key) {
                                    tbl[i] = proc_1;
                                    minf.virtualIndex = i;
                                    done = true;
                                }
                            }
                            if (!done) {
                                minf.virtualIndex = tbl.length;
                                tbl.push(proc_1);
                            }
                        }
                    }
                    inf.vtable = tbl;
                    inf.itable = [];
                    inf.itableInfo = [];
                    var storeIface = function (name, proc) {
                        var id = getIfaceMemberId(name);
                        inf.itable[id] = proc;
                        inf.itableInfo[id] = name;
                        pxtc.assert(!!proc);
                    };
                    var emitSynthetic = function (fn, fill) {
                        var proc = lookupProc(fn, inf.bindings);
                        if (!proc) {
                            scope(function () {
                                emitFuncCore(fn, inf.bindings);
                                proc = lookupProc(fn, inf.bindings);
                                proc.body = [];
                                fill(proc);
                            });
                        }
                        pxtc.assert(!!proc);
                        storeIface(getName(fn), proc);
                    };
                    var _loop_5 = function(fld0) {
                        var fld = fld0;
                        var fname = getName(fld);
                        var setname = "set/" + fname;
                        if (isIfaceMemberUsed(fname)) {
                            if (!fld.irGetter)
                                fld.irGetter = mkBogusMethod(inf, fname);
                            var idx_2 = fieldIndexCore(inf, fld, typeOf(fld));
                            emitSynthetic(fld.irGetter, function (proc) {
                                // we skip final decr, but the ldfld call will do its own decr
                                var access = pxtc.ir.op(EK.FieldAccess, [proc.args[0].loadCore()], idx_2);
                                emitInJmpValue(access);
                            });
                        }
                        if (isIfaceMemberUsed(setname)) {
                            if (!fld.irSetter) {
                                fld.irSetter = mkBogusMethod(inf, setname);
                                fld.irSetter.parameters.unshift({
                                    kind: pxtc.SK.Parameter,
                                    name: { text: "v" },
                                    parent: fld.irSetter,
                                    typeOverride: typeOf(fld)
                                });
                            }
                            var idx_3 = fieldIndexCore(inf, fld, typeOf(fld));
                            emitSynthetic(fld.irSetter, function (proc) {
                                // decrs work out
                                var access = pxtc.ir.op(EK.FieldAccess, [proc.args[0].loadCore()], idx_3);
                                proc.emitExpr(pxtc.ir.op(EK.Store, [access, proc.args[1].loadCore()]));
                            });
                        }
                    };
                    for (var _b = 0, _c = inf.allfields; _b < _c.length; _b++) {
                        var fld0 = _c[_b];
                        _loop_5(fld0);
                    }
                    for (var curr = inf; curr; curr = curr.baseClassInfo) {
                        for (var _d = 0, _e = curr.methods; _d < _e.length; _d++) {
                            var m = _e[_d];
                            var n = getName(m);
                            if (isIfaceMemberUsed(n)) {
                                var id = getIfaceMemberId(n);
                                if (!inf.itable[id]) {
                                    storeIface(n, lookupProc(m, curr.bindings));
                                }
                            }
                        }
                    }
                    for (var i = 0; i < inf.itable.length; ++i)
                        if (!inf.itable[i])
                            inf.itable[i] = null; // avoid undefined
                    for (var _f = 0, _g = Object.keys(ifaceMembers); _f < _g.length; _f++) {
                        var k = _g[_f];
                        inf.itableInfo[ifaceMembers[k]] = k;
                    }
                });
                return inf.vtable;
            }
            function getClassInfo(t, decl, bindings) {
                if (decl === void 0) { decl = null; }
                if (bindings === void 0) { bindings = null; }
                if (!decl)
                    decl = t.symbol.valueDeclaration;
                if (!bindings)
                    bindings = t
                        ? getTypeBindings(t)
                        : decl.typeParameters
                            ? decl.typeParameters.map(function (p) { return ({ isRef: true, tp: checker.getTypeAtLocation(p) }); })
                            : [];
                var id = "C" + getNodeId(decl) + refMask(bindings);
                var info = classInfos[id];
                if (!info) {
                    var reffields_1 = [];
                    var primitivefields_1 = [];
                    info = {
                        id: id,
                        numRefFields: 0,
                        allfields: [],
                        attrs: parseComments(decl),
                        decl: decl,
                        refmask: null,
                        baseClassInfo: null,
                        methods: [],
                        bindings: bindings
                    };
                    if (info.attrs.autoCreate)
                        autoCreateFunctions[info.attrs.autoCreate] = true;
                    classInfos[id] = info;
                    // only do it after storing our in case we run into cycles (which should be errors)
                    info.baseClassInfo = getBaseClassInfo(decl);
                    scope(function () {
                        pxtc.U.pushRange(typeBindings, bindings);
                        for (var _i = 0, _a = decl.members; _i < _a.length; _i++) {
                            var mem = _a[_i];
                            if (mem.kind == pxtc.SK.PropertyDeclaration) {
                                var pdecl = mem;
                                if (isRefType(typeOf(pdecl)))
                                    reffields_1.push(pdecl);
                                else
                                    primitivefields_1.push(pdecl);
                                info.allfields.push(pdecl);
                            }
                            else if (isClassFunction(mem) && mem.kind != pxtc.SK.Constructor) {
                                var minf = getFunctionInfo(mem);
                                minf.parentClassInfo = info;
                                info.methods.push(mem);
                            }
                        }
                        if (info.baseClassInfo) {
                            info.allfields = info.baseClassInfo.allfields.concat(info.allfields);
                            info.numRefFields = -1;
                            var nameMap = {};
                            for (var curr = info.baseClassInfo; !!curr; curr = curr.baseClassInfo) {
                                for (var _b = 0, _c = curr.methods; _b < _c.length; _b++) {
                                    var m = _c[_b];
                                    nameMap[classFunctionKey(m)] = m;
                                }
                            }
                            for (var _d = 0, _e = info.methods; _d < _e.length; _d++) {
                                var m = _e[_d];
                                var prev = pxtc.U.lookup(nameMap, classFunctionKey(m));
                                if (prev) {
                                    var minf = getFunctionInfo(m);
                                    var pinf = getFunctionInfo(prev);
                                    if (prev.parameters.length != m.parameters.length)
                                        error(m, 9255, lf("the overriding method is currently required to have the same number of arguments as the base one"));
                                    minf.virtualRoot = pinf;
                                    if (!pinf.virtualRoot)
                                        pinf.virtualRoot = pinf;
                                    pxtc.assert(pinf.virtualRoot == pinf);
                                    if (!pinf.virtualInstances)
                                        pinf.virtualInstances = [];
                                    pinf.virtualInstances.push(minf);
                                }
                            }
                        }
                        else {
                            info.allfields = reffields_1.concat(primitivefields_1);
                            info.numRefFields = reffields_1.length;
                        }
                        info.refmask = info.allfields.map(function (f) { return isRefType(typeOf(f)); });
                    });
                }
                return info;
            }
            function emitImageLiteral(s) {
                if (!s)
                    s = "0 0 0 0 0\n0 0 0 0 0\n0 0 0 0 0\n0 0 0 0 0\n0 0 0 0 0\n";
                var x = 0;
                var w = 0;
                var h = 0;
                var lit = "";
                s += "\n";
                for (var i = 0; i < s.length; ++i) {
                    switch (s[i]) {
                        case ".":
                        case "_":
                        case "0":
                            lit += "0,";
                            x++;
                            break;
                        case "#":
                        case "*":
                        case "1":
                            lit += "1,";
                            x++;
                            break;
                        case "\t":
                        case "\r":
                        case " ": break;
                        case "\n":
                            if (x) {
                                if (w == 0)
                                    w = x;
                                else if (x != w)
                                    userError(9205, lf("lines in image literal have to have the same width (got {0} and then {1} pixels)", w, x));
                                x = 0;
                                h++;
                            }
                            break;
                        default:
                            userError(9206, lf("Only 0 . _ (off) and 1 # * (on) are allowed in image literals"));
                    }
                }
                var lbl = "_img" + bin.lblNo++;
                if (lit.length % 4 != 0)
                    lit += "42"; // pad
                bin.otherLiterals.push("\n.balign 4\n" + lbl + ": .short 0xffff\n        .short " + w + ", " + h + "\n        .byte " + lit + "\n");
                var jsLit = "new pxsim.Image(" + w + ", [" + lit + "])";
                return {
                    kind: pxtc.SK.NumericLiteral,
                    imageLiteral: lbl,
                    jsLit: jsLit
                };
            }
            function mkSyntheticInt(v) {
                return {
                    kind: pxtc.SK.NumericLiteral,
                    text: v.toString()
                };
            }
            function emitLocalLoad(decl) {
                if (isGlobalVar(decl)) {
                    var attrs = parseComments(decl);
                    if (attrs.shim)
                        return emitShim(decl, decl, []);
                }
                var l = lookupCell(decl);
                recordUse(decl);
                var r = l.load();
                //console.log("LOADLOC", l.toString(), r.toString())
                return r;
            }
            function emitFunLiteral(f) {
                var attrs = parseComments(f);
                if (attrs.shim)
                    userError(9207, lf("built-in functions cannot be yet used as values; did you forget ()?"));
                if (isGenericFunction(f))
                    userError(9232, lf("generic functions cannot be yet used as values; did you forget ()?"));
                var info = getFunctionInfo(f);
                if (info.location) {
                    return info.location.load();
                }
                else {
                    pxtc.assert(!bin.finalPass || info.capturedVars.length == 0);
                    return emitFunLitCore(f);
                }
            }
            function emitIdentifier(node) {
                var decl = getDecl(node);
                if (decl && (decl.kind == pxtc.SK.VariableDeclaration || decl.kind == pxtc.SK.Parameter || decl.kind === pxtc.SK.BindingElement)) {
                    return emitLocalLoad(decl);
                }
                else if (decl && decl.kind == pxtc.SK.FunctionDeclaration) {
                    return emitFunLiteral(decl);
                }
                else {
                    if (node.text == "undefined")
                        return pxtc.ir.numlit(null);
                    else
                        throw unhandled(node, lf("Unknown or undeclared identifier"), 9235);
                }
            }
            function emitParameter(node) { }
            function emitAccessor(node) {
                emitFunctionDeclaration(node);
            }
            function emitThis(node) {
                var meth = getEnclosingMethod(node);
                if (!meth)
                    userError(9208, lf("'this' used outside of a method"));
                var inf = getFunctionInfo(meth);
                if (!inf.thisParameter) {
                    //console.log("get this param,", meth.kind, nodeKey(meth))
                    //console.log("GET", meth)
                    pxtc.oops("no this");
                }
                return emitLocalLoad(inf.thisParameter);
            }
            function emitSuper(node) { }
            function emitStringLiteral(str) {
                if (str == "") {
                    return pxtc.ir.rtcall("String_::mkEmpty", []);
                }
                else {
                    var lbl = bin.emitString(str);
                    var ptr = pxtc.ir.ptrlit(lbl + "meta", JSON.stringify(str));
                    return pxtc.ir.rtcall("pxt::ptrOfLiteral", [ptr]);
                }
            }
            function emitLiteral(node) {
                if (node.kind == pxtc.SK.NumericLiteral) {
                    if (node.imageLiteral) {
                        return pxtc.ir.ptrlit(node.imageLiteral, node.jsLit);
                    }
                    else {
                        var parsed = parseFloat(node.text);
                        if (!opts.target.floatingPoint) {
                            if (Math.floor(parsed) !== parsed) {
                                userError(9257, lf("Decimal numbers are not supported"));
                            }
                            else if (parsed << 0 !== parsed) {
                                userError(9258, lf("Number is either too big or too small"));
                            }
                        }
                        return pxtc.ir.numlit(parsed);
                    }
                }
                else if (isStringLiteral(node)) {
                    return emitStringLiteral(node.text);
                }
                else {
                    throw pxtc.oops();
                }
            }
            function emitTemplateExpression(node) {
                var concat = function (a, b) {
                    return isEmptyStringLiteral(b) ? a :
                        pxtc.ir.rtcallMask("String_::concat", 3, pxtc.ir.CallingConvention.Plain, [
                            a,
                            emitAsString(b)
                        ]);
                };
                // TODO could optimize for the case where node.head is empty
                var expr = emitAsString(node.head);
                for (var _i = 0, _a = node.templateSpans; _i < _a.length; _i++) {
                    var span = _a[_i];
                    expr = concat(expr, span.expression);
                    expr = concat(expr, span.literal);
                }
                return expr;
            }
            function emitTemplateSpan(node) { }
            function emitJsxElement(node) { }
            function emitJsxSelfClosingElement(node) { }
            function emitJsxText(node) { }
            function emitJsxExpression(node) { }
            function emitQualifiedName(node) { }
            function emitObjectBindingPattern(node) { }
            function emitArrayBindingPattern(node) { }
            function emitArrayLiteral(node) {
                var eltT = arrayElementType(typeOf(node));
                var isRef = isRefType(eltT);
                var flag = 0;
                if (eltT.flags & ts.TypeFlags.String)
                    flag = 3;
                else if (isRef)
                    flag = 1;
                var coll = pxtc.ir.shared(pxtc.ir.rtcall("Array_::mk", [pxtc.ir.numlit(flag)]));
                for (var _i = 0, _a = node.elements; _i < _a.length; _i++) {
                    var elt = _a[_i];
                    var e = pxtc.ir.shared(emitExpr(elt));
                    proc.emitExpr(pxtc.ir.rtcall("Array_::push", [coll, e]));
                    if (isRef) {
                        proc.emitExpr(pxtc.ir.op(EK.Decr, [e]));
                    }
                }
                return coll;
            }
            function emitObjectLiteral(node) {
                var expr = pxtc.ir.shared(pxtc.ir.rtcall("pxtrt::mkMap", []));
                node.properties.forEach(function (p) {
                    var refSuff = "";
                    if (isRefCountedExpr(p.initializer))
                        refSuff = "Ref";
                    proc.emitExpr(pxtc.ir.rtcall("pxtrt::mapSet" + refSuff, [
                        pxtc.ir.op(EK.Incr, [expr]),
                        pxtc.ir.numlit(getIfaceMemberId(p.name.getText())),
                        emitExpr(p.initializer)
                    ]));
                });
                return expr;
            }
            function emitPropertyAssignment(node) {
                if (isStatic(node)) {
                    emitVariableDeclaration(node);
                    return;
                }
                if (node.initializer)
                    userError(9209, lf("class field initializers not supported"));
                // do nothing
            }
            function emitShorthandPropertyAssignment(node) { }
            function emitComputedPropertyName(node) { }
            function emitPropertyAccess(node) {
                var decl = getDecl(node);
                if (decl.kind == pxtc.SK.GetAccessor) {
                    return emitCallCore(node, node, [], null);
                }
                var attrs = parseComments(decl);
                var callInfo = {
                    decl: decl,
                    qName: pxtc.getFullName(checker, decl.symbol),
                    attrs: attrs,
                    args: [],
                    isExpression: true
                };
                node.callInfo = callInfo;
                if (decl.kind == pxtc.SK.EnumMember) {
                    var ev = attrs.enumval;
                    if (!ev) {
                        var val = checker.getConstantValue(decl);
                        if (val == null) {
                            if (decl.initializer)
                                return emitExpr(decl.initializer);
                            userError(9210, lf("Cannot compute enum value"));
                        }
                        ev = val + "";
                    }
                    if (/^[+-]?\d+$/.test(ev))
                        return pxtc.ir.numlit(parseInt(ev));
                    return pxtc.ir.rtcall(ev, []);
                }
                else if (decl.kind == pxtc.SK.PropertySignature) {
                    return emitCallCore(node, node, [], null, decl, node.expression);
                }
                else if (decl.kind == pxtc.SK.PropertyDeclaration) {
                    if (isStatic(decl)) {
                        return emitLocalLoad(decl);
                    }
                    var idx = fieldIndex(node);
                    callInfo.args.push(node.expression);
                    return pxtc.ir.op(EK.FieldAccess, [emitExpr(node.expression)], idx);
                }
                else if (isClassFunction(decl) || decl.kind == pxtc.SK.MethodSignature) {
                    throw userError(9211, lf("cannot use method as lambda; did you forget '()' ?"));
                }
                else if (decl.kind == pxtc.SK.FunctionDeclaration) {
                    return emitFunLiteral(decl);
                }
                else if (decl.kind == pxtc.SK.VariableDeclaration) {
                    return emitLocalLoad(decl);
                }
                else {
                    throw unhandled(node, lf("Unknown property access for {0}", stringKind(decl)), 9237);
                }
            }
            function emitIndexedAccess(node, assign) {
                if (assign === void 0) { assign = null; }
                var t = typeOf(node.expression);
                var indexer = null;
                if (!assign && t.flags & ts.TypeFlags.String)
                    indexer = "String_::charAt";
                else if (isArrayType(t))
                    indexer = assign ? "Array_::setAt" : "Array_::getAt";
                else if (isInterfaceType(t)) {
                    var attrs = parseCommentsOnSymbol(t.symbol);
                    indexer = assign ? attrs.indexerSet : attrs.indexerGet;
                }
                if (indexer) {
                    if (typeOf(node.argumentExpression).flags & ts.TypeFlags.NumberLike) {
                        var args = [node.expression, node.argumentExpression];
                        return rtcallMask(indexer, args, pxtc.ir.CallingConvention.Plain, assign ? [assign] : []);
                    }
                    else {
                        throw unhandled(node, lf("non-numeric indexer on {0}", indexer), 9238);
                    }
                }
                else {
                    throw unhandled(node, lf("unsupported indexer"), 9239);
                }
            }
            function isOnDemandDecl(decl) {
                var res = (isGlobalVar(decl) && !isSideEffectfulInitializer(decl.initializer)) ||
                    isTopLevelFunctionDecl(decl);
                if (opts.testMode && res) {
                    if (!pxtc.U.startsWith(ts.getSourceFileOfNode(decl).fileName, "pxt_modules"))
                        return false;
                }
                return res;
            }
            function isUsed(decl) {
                return !isOnDemandDecl(decl) || usedDecls.hasOwnProperty(nodeKey(decl));
            }
            function markFunctionUsed(decl, bindings) {
                if (!bindings || !bindings.length)
                    markUsed(decl);
                else {
                    var info = getFunctionInfo(decl);
                    if (!info.usages) {
                        usedDecls[nodeKey(decl)] = decl;
                        info.usages = [];
                        info.prePassUsagesEmitted = 0;
                        if (opts.computeUsedSymbols && decl && decl.symbol)
                            res.usedSymbols[pxtc.getFullName(checker, decl.symbol)] = null;
                    }
                    var mask_1 = refMask(bindings);
                    if (!info.usages.some(function (u) { return refMask(u) == mask_1; })) {
                        info.usages.push(bindings);
                        usedWorkList.push(decl);
                    }
                }
            }
            function markUsed(decl) {
                if (opts.computeUsedSymbols && decl && decl.symbol)
                    res.usedSymbols[pxtc.getFullName(checker, decl.symbol)] = null;
                if (decl && !isUsed(decl)) {
                    usedDecls[nodeKey(decl)] = decl;
                    usedWorkList.push(decl);
                }
            }
            function getDecl(node) {
                if (!node)
                    return null;
                var sym = checker.getSymbolAtLocation(node);
                var decl = sym ? sym.valueDeclaration : null;
                markUsed(decl);
                return decl;
            }
            function isRefCountedExpr(e) {
                // we generate a fake NULL expression for default arguments
                // we also generate a fake numeric literal for image literals
                if (e.kind == pxtc.SK.NullKeyword || e.kind == pxtc.SK.NumericLiteral)
                    return !!e.isRefOverride;
                // no point doing the incr/decr for these - they are statically allocated anyways
                if (isStringLiteral(e))
                    return false;
                return isRefType(typeOf(e));
            }
            function getMask(args) {
                pxtc.assert(args.length <= 8);
                var m = 0;
                args.forEach(function (a, i) {
                    if (isRefCountedExpr(a))
                        m |= (1 << i);
                });
                return m;
            }
            function emitShim(decl, node, args) {
                var attrs = parseComments(decl);
                var hasRet = !(typeOf(node).flags & ts.TypeFlags.Void);
                var nm = attrs.shim;
                if (nm.indexOf('(') >= 0) {
                    var parse = /(.*)\((\d+)\)$/.exec(nm);
                    if (parse) {
                        nm = parse[1];
                        args.push(mkSyntheticInt(parseInt(parse[2])));
                    }
                }
                if (nm == "TD_NOOP") {
                    pxtc.assert(!hasRet);
                    return pxtc.ir.numlit(0);
                }
                if (nm == "TD_ID") {
                    pxtc.assert(args.length == 1);
                    return emitExpr(args[0]);
                }
                if (opts.target.isNative) {
                    pxtc.hex.validateShim(getDeclName(decl), nm, hasRet, args.length);
                }
                return rtcallMask(nm, args, attrs.callingConvention);
            }
            function isNumericLiteral(node) {
                switch (node.kind) {
                    case pxtc.SK.NullKeyword:
                    case pxtc.SK.TrueKeyword:
                    case pxtc.SK.FalseKeyword:
                    case pxtc.SK.NumericLiteral:
                        return true;
                    default:
                        return false;
                }
            }
            function addDefaultParameters(sig, args, attrs) {
                if (!sig)
                    return;
                var parms = sig.getParameters();
                if (parms.length > args.length) {
                    parms.slice(args.length).forEach(function (p) {
                        if (p.valueDeclaration &&
                            p.valueDeclaration.kind == pxtc.SK.Parameter) {
                            var prm = p.valueDeclaration;
                            if (!prm.initializer) {
                                var defl = attrs.paramDefl[getName(prm)];
                                args.push(irToNode(defl ? pxtc.ir.numlit(parseInt(defl)) : null));
                            }
                            else {
                                if (!isNumericLiteral(prm.initializer)) {
                                    userError(9212, lf("only numbers, null, true and false supported as default arguments"));
                                }
                                args.push(prm.initializer);
                            }
                        }
                        else {
                            userError(9213, lf("unsupported default argument (shouldn't happen)"));
                        }
                    });
                }
                if (attrs.imageLiteral) {
                    if (!isStringLiteral(args[0])) {
                        userError(9214, lf("Only image literals (string literals) supported here; {0}", stringKind(args[0])));
                    }
                    args[0] = emitImageLiteral(args[0].text);
                }
            }
            function emitCallExpression(node) {
                var sig = checker.getResolvedSignature(node);
                return emitCallCore(node, node.expression, node.arguments, sig);
            }
            function emitCallCore(node, funcExpr, callArgs, sig, decl, recv) {
                if (decl === void 0) { decl = null; }
                if (recv === void 0) { recv = null; }
                if (!decl)
                    decl = getDecl(funcExpr);
                var isMethod = false;
                if (decl)
                    switch (decl.kind) {
                        case pxtc.SK.PropertySignature:
                        case pxtc.SK.MethodDeclaration:
                        case pxtc.SK.MethodSignature:
                        case pxtc.SK.GetAccessor:
                        case pxtc.SK.SetAccessor:
                            isMethod = true;
                            break;
                        case pxtc.SK.ModuleDeclaration:
                        case pxtc.SK.FunctionDeclaration:
                            // has special handling
                            break;
                        default:
                            decl = null; // no special handling
                            break;
                    }
                var attrs = parseComments(decl);
                var hasRet = !(typeOf(node).flags & ts.TypeFlags.Void);
                var args = callArgs.slice(0);
                var callInfo = {
                    decl: decl,
                    qName: decl ? pxtc.getFullName(checker, decl.symbol) : "?",
                    attrs: attrs,
                    args: args.slice(0),
                    isExpression: hasRet
                };
                node.callInfo = callInfo;
                if (callInfo.args.length == 0 && pxtc.U.lookup(autoCreateFunctions, callInfo.qName))
                    callInfo.isAutoCreate = true;
                var bindings = [];
                if (sig) {
                    var trg = sig.target;
                    var typeParams = sig.typeParameters || (trg ? trg.typeParameters : null) || [];
                    bindings = getTypeBindingsCore(typeParams, typeParams.map(function (x) { return sig.mapper(x); }));
                }
                var isSelfGeneric = bindings.length > 0;
                addEnclosingTypeBindings(bindings, decl);
                if (res.usedArguments && attrs.trackArgs) {
                    var tracked = attrs.trackArgs.map(function (n) { return args[n]; }).map(function (e) {
                        var d = getDecl(e);
                        if (d && d.kind == pxtc.SK.EnumMember)
                            return pxtc.getFullName(checker, d.symbol);
                        else
                            return "*";
                    }).join(",");
                    var fn = pxtc.getFullName(checker, decl.symbol);
                    var lst = res.usedArguments[fn];
                    if (!lst) {
                        lst = res.usedArguments[fn] = [];
                    }
                    if (lst.indexOf(tracked) < 0)
                        lst.push(tracked);
                }
                function emitPlain() {
                    return mkProcCall(decl, args.map(emitExpr), bindings);
                }
                addDefaultParameters(sig, args, attrs);
                if (decl && decl.kind == pxtc.SK.FunctionDeclaration) {
                    var info = getFunctionInfo(decl);
                    if (!info.location) {
                        if (attrs.shim && !hasShimDummy(decl)) {
                            return emitShim(decl, node, args);
                        }
                        markFunctionUsed(decl, bindings);
                        return emitPlain();
                    }
                }
                if (funcExpr.kind == pxtc.SK.SuperKeyword) {
                    var baseCtor = proc.classInfo.baseClassInfo.ctor;
                    pxtc.assert(!bin.finalPass || !!baseCtor);
                    var ctorArgs = args.map(emitExpr);
                    ctorArgs.unshift(emitThis(funcExpr));
                    return mkProcCallCore(baseCtor, null, ctorArgs);
                }
                if (isMethod) {
                    var isSuper = false;
                    if (isStatic(decl)) {
                    }
                    else if (recv || funcExpr.kind == pxtc.SK.PropertyAccessExpression) {
                        if (!recv)
                            recv = funcExpr.expression;
                        if (recv.kind == pxtc.SK.SuperKeyword) {
                            isSuper = true;
                        }
                        args.unshift(recv);
                        callInfo.args.unshift(recv);
                        bindings = getTypeBindings(typeOf(recv)).concat(bindings);
                    }
                    else
                        unhandled(node, lf("strange method call"), 9241);
                    var info = getFunctionInfo(decl);
                    if (info.virtualRoot)
                        info = info.virtualRoot;
                    if (!info.isUsed) {
                        info.isUsed = true;
                        for (var _i = 0, _a = info.virtualInstances || []; _i < _a.length; _i++) {
                            var vinst = _a[_i];
                            if (vinst.parentClassInfo.isUsed)
                                markFunctionUsed(vinst.decl, bindings);
                        }
                    }
                    if (info.virtualRoot && !isSuper) {
                        pxtc.assert(!bin.finalPass || info.virtualIndex != null);
                        return mkProcCallCore(null, info.virtualIndex, args.map(emitExpr));
                    }
                    if (attrs.shim && !hasShimDummy(decl)) {
                        return emitShim(decl, node, args);
                    }
                    else if (attrs.helper) {
                        var syms = checker.getSymbolsInScope(node, ts.SymbolFlags.Module);
                        var helpersModule = syms.filter(function (s) { return s.name == "helpers"; })[0].valueDeclaration;
                        var helperStmt = helpersModule.body.statements.filter(function (s) { return s.symbol.name == attrs.helper; })[0];
                        if (!helperStmt)
                            userError(9215, lf("helpers.{0} not found", attrs.helper));
                        if (helperStmt.kind != pxtc.SK.FunctionDeclaration)
                            userError(9216, lf("helpers.{0} isn't a function", attrs.helper));
                        decl = helperStmt;
                        var sig_1 = checker.getSignatureFromDeclaration(decl);
                        var tp_1 = sig_1.getTypeParameters() || [];
                        if (tp_1.length != bindings.length)
                            pxtc.U.oops("helpers type parameter mismatch"); // can it happen?
                        bindings.forEach(function (b, i) {
                            b.tp = tp_1[i];
                        });
                        markFunctionUsed(decl, bindings);
                        return emitPlain();
                    }
                    else if (decl.kind == pxtc.SK.MethodSignature || decl.kind == pxtc.SK.PropertySignature) {
                        var name_5 = getName(decl);
                        var res_3 = mkProcCallCore(null, null, args.map(emitExpr), getIfaceMemberId(name_5));
                        if (decl.kind == pxtc.SK.PropertySignature) {
                            var pid = res_3.data;
                            pid.mapIdx = pid.ifaceIndex;
                            var refSuff = "";
                            if (args.length == 2) {
                                if (isRefCountedExpr(args[1]))
                                    refSuff = "Ref";
                                pid.ifaceIndex = getIfaceMemberId("set/" + name_5);
                                pid.mapMethod = "pxtrt::mapSet" + refSuff;
                            }
                            else {
                                if (isRefType(typeOf(node)))
                                    refSuff = "Ref";
                                pid.mapMethod = "pxtrt::mapGet" + refSuff;
                            }
                        }
                        return res_3;
                    }
                    else {
                        markFunctionUsed(decl, bindings);
                        return emitPlain();
                    }
                }
                if (isSelfGeneric)
                    pxtc.U.oops("invalid generic call");
                if (decl && decl.kind == pxtc.SK.ModuleDeclaration) {
                    if (getName(decl) == "String")
                        userError(9219, lf("to convert X to string use: X + \"\""));
                    else
                        userError(9220, lf("namespaces cannot be called directly"));
                }
                // otherwise we assume a lambda
                if (args.length > 3)
                    userError(9217, lf("lambda functions with more than 3 arguments not supported"));
                var suff = args.length + "";
                args.unshift(funcExpr);
                callInfo.args.unshift(funcExpr);
                // lambdas do not decr() arguments themselves; do it normally with getMask()
                return pxtc.ir.rtcallMask("pxt::runAction" + suff, getMask(args), pxtc.ir.CallingConvention.Async, args.map(emitExpr));
            }
            function mkProcCallCore(proc, vidx, args, ifaceIdx) {
                if (ifaceIdx === void 0) { ifaceIdx = null; }
                var data = {
                    proc: proc,
                    virtualIndex: vidx,
                    ifaceIndex: ifaceIdx
                };
                return pxtc.ir.op(EK.ProcCall, args, data);
            }
            function lookupProc(decl, bindings) {
                var id = { action: decl, bindings: bindings };
                return bin.procs.filter(function (p) { return p.matches(id); })[0];
            }
            function mkProcCall(decl, args, bindings) {
                var proc = lookupProc(decl, bindings);
                pxtc.assert(!!proc || !bin.finalPass);
                return mkProcCallCore(proc, null, args);
            }
            function layOutGlobals() {
                var globals = bin.globals.slice(0);
                // stable-sort globals, with smallest first, because "strh/b" have
                // smaller immediate range than plain "str" (and same for "ldr")
                globals.forEach(function (g, i) { return g.index = i; });
                globals.sort(function (a, b) {
                    return sizeOfBitSize(a.bitSize) - sizeOfBitSize(b.bitSize) ||
                        a.index - b.index;
                });
                var currOff = pxtc.numReservedGlobals * 4;
                for (var _i = 0, globals_1 = globals; _i < globals_1.length; _i++) {
                    var g = globals_1[_i];
                    var sz = sizeOfBitSize(g.bitSize);
                    while (currOff & (sz - 1))
                        currOff++; // align
                    g.index = currOff;
                    currOff += sz;
                }
                bin.globalsWords = (currOff + 3) >> 2;
            }
            function emitVTables() {
                for (var _i = 0, _a = bin.usedClassInfos; _i < _a.length; _i++) {
                    var info = _a[_i];
                    getVTable(info); // gets cached
                }
            }
            function getCtor(decl) {
                return decl.members.filter(function (m) { return m.kind == pxtc.SK.Constructor; })[0];
            }
            function isIfaceMemberUsed(name) {
                return pxtc.U.lookup(ifaceMembers, name) != null;
            }
            function markClassUsed(info) {
                if (info.isUsed)
                    return;
                info.isUsed = true;
                if (info.baseClassInfo)
                    markClassUsed(info.baseClassInfo);
                bin.usedClassInfos.push(info);
                for (var _i = 0, _a = info.methods; _i < _a.length; _i++) {
                    var m = _a[_i];
                    var minf = getFunctionInfo(m);
                    if (isIfaceMemberUsed(getName(m)) || (minf.virtualRoot && minf.virtualRoot.isUsed))
                        markFunctionUsed(m, info.bindings);
                }
                var ctor = getCtor(info.decl);
                if (ctor) {
                    markFunctionUsed(ctor, info.bindings);
                }
            }
            function emitNewExpression(node) {
                var t = typeOf(node);
                if (isArrayType(t)) {
                    throw pxtc.oops();
                }
                else if (isPossiblyGenericClassType(t)) {
                    var classDecl = getDecl(node.expression);
                    if (classDecl.kind != pxtc.SK.ClassDeclaration) {
                        userError(9221, lf("new expression only supported on class types"));
                    }
                    var ctor = void 0;
                    var info = getClassInfo(typeOf(node), classDecl);
                    // find ctor to call in base chain
                    for (var parinfo = info; parinfo; parinfo = parinfo.baseClassInfo) {
                        ctor = getCtor(parinfo.decl);
                        if (ctor)
                            break;
                    }
                    markClassUsed(info);
                    var lbl = info.id + "_VT";
                    var obj = pxtc.ir.rtcall("pxt::mkClassInstance", [pxtc.ir.ptrlit(lbl, lbl)]);
                    obj = pxtc.ir.shared(obj);
                    if (ctor) {
                        markUsed(ctor);
                        var args = node.arguments.slice(0);
                        var ctorAttrs = parseComments(ctor);
                        addDefaultParameters(checker.getResolvedSignature(node), args, ctorAttrs);
                        var compiled = args.map(emitExpr);
                        if (ctorAttrs.shim)
                            // we drop 'obj' variable
                            return pxtc.ir.rtcall(ctorAttrs.shim, compiled);
                        compiled.unshift(pxtc.ir.op(EK.Incr, [obj]));
                        proc.emitExpr(mkProcCall(ctor, compiled, []));
                        return obj;
                    }
                    else {
                        if (node.arguments && node.arguments.length)
                            userError(9222, lf("constructor with arguments not found"));
                        return obj;
                    }
                }
                else {
                    throw unhandled(node, lf("unknown type for new"), 9243);
                }
            }
            function emitTaggedTemplateExpression(node) { }
            function emitTypeAssertion(node) {
                return emitExpr(node.expression);
            }
            function emitAsExpression(node) {
                return emitExpr(node.expression);
            }
            function emitParenExpression(node) {
                return emitExpr(node.expression);
            }
            function getParameters(node) {
                var res = node.parameters.slice(0);
                if (!isStatic(node) && isClassFunction(node)) {
                    var info = getFunctionInfo(node);
                    if (!info.thisParameter) {
                        info.thisParameter = {
                            kind: pxtc.SK.Parameter,
                            name: { text: "this" },
                            isThisParameter: true,
                            parent: node
                        };
                    }
                    res.unshift(info.thisParameter);
                }
                return res;
            }
            function emitFunLitCore(node, raw) {
                if (raw === void 0) { raw = false; }
                var lbl = getFunctionLabel(node, getEnclosingTypeBindings(node));
                var r = pxtc.ir.ptrlit(lbl + "_Lit", lbl);
                if (!raw) {
                    r = pxtc.ir.rtcall("pxt::ptrOfLiteral", [r]);
                }
                return r;
            }
            function emitFuncCore(node, bindings) {
                var info = getFunctionInfo(node);
                var lit = null;
                var isExpression = node.kind == pxtc.SK.ArrowFunction || node.kind == pxtc.SK.FunctionExpression;
                var isRef = function (d) {
                    if (isRefDecl(d))
                        return true;
                    var info = getVarInfo(d);
                    return (info.captured && info.written);
                };
                var refs = info.capturedVars.filter(function (v) { return isRef(v); });
                var prim = info.capturedVars.filter(function (v) { return !isRef(v); });
                var caps = refs.concat(prim);
                var locals = caps.map(function (v, i) {
                    var l = new pxtc.ir.Cell(i, v, getVarInfo(v));
                    l.iscap = true;
                    return l;
                });
                // forbid: let x = function<T>(a:T) { }
                if (isExpression && isGenericFunction(node))
                    userError(9233, lf("function expressions cannot be generic"));
                if (caps.length > 0 && isGenericFunction(node))
                    userError(9234, lf("nested functions cannot be generic yet"));
                // if no captured variables, then we can get away with a plain pointer to code
                if (caps.length > 0) {
                    pxtc.assert(getEnclosingFunction(node) != null);
                    lit = pxtc.ir.shared(pxtc.ir.rtcall("pxt::mkAction", [pxtc.ir.numlit(refs.length), pxtc.ir.numlit(caps.length), emitFunLitCore(node, true)]));
                    caps.forEach(function (l, i) {
                        var loc = proc.localIndex(l);
                        if (!loc)
                            userError(9223, lf("cannot find captured value: {0}", checker.symbolToString(l.symbol)));
                        var v = loc.loadCore();
                        if (loc.isRef() || loc.isByRefLocal())
                            v = pxtc.ir.op(EK.Incr, [v]);
                        proc.emitExpr(pxtc.ir.rtcall("pxtrt::stclo", [lit, pxtc.ir.numlit(i), v]));
                    });
                    if (node.kind == pxtc.SK.FunctionDeclaration) {
                        info.location = proc.mkLocal(node, getVarInfo(node));
                        proc.emitExpr(info.location.storeDirect(lit));
                        lit = null;
                    }
                }
                else {
                    if (isExpression) {
                        lit = emitFunLitCore(node);
                    }
                }
                pxtc.assert(!!lit == isExpression);
                var id = { action: node, bindings: bindings };
                var existing = bin.procs.filter(function (p) { return p.matches(id); })[0];
                if (existing) {
                    proc = existing;
                    proc.reset();
                }
                else {
                    pxtc.assert(!bin.finalPass);
                    proc = new pxtc.ir.Procedure();
                    proc.isRoot = !!node.isRootFunction;
                    proc.action = node;
                    proc.info = info;
                    proc.bindings = bindings;
                    bin.addProc(proc);
                }
                proc.captured = locals;
                if (node.parent.kind == pxtc.SK.ClassDeclaration) {
                    var parClass = node.parent;
                    var numTP = parClass.typeParameters ? parClass.typeParameters.length : 0;
                    pxtc.assert(bindings.length >= numTP);
                    var classInfo = getClassInfo(null, parClass, bindings.slice(0, numTP));
                    if (proc.classInfo)
                        pxtc.assert(proc.classInfo == classInfo);
                    else
                        proc.classInfo = classInfo;
                    if (node.kind == pxtc.SK.Constructor) {
                        if (classInfo.ctor)
                            pxtc.assert(classInfo.ctor == proc);
                        else
                            classInfo.ctor = proc;
                    }
                }
                pxtc.U.pushRange(typeBindings, bindings);
                var destructuredParameters = [];
                proc.args = getParameters(node).map(function (p, i) {
                    if (p.name.kind === pxtc.SK.ObjectBindingPattern) {
                        destructuredParameters.push(p);
                    }
                    var l = new pxtc.ir.Cell(i, p, getVarInfo(p));
                    l.isarg = true;
                    return l;
                });
                proc.args.forEach(function (l) {
                    //console.log(l.toString(), l.info)
                    if (l.isByRefLocal()) {
                        // TODO add C++ support function to do this
                        var tmp = pxtc.ir.shared(pxtc.ir.rtcall("pxtrt::mkloc" + l.refSuffix(), []));
                        proc.emitExpr(pxtc.ir.rtcall("pxtrt::stloc" + l.refSuffix(), [tmp, l.loadCore()]));
                        proc.emitExpr(l.storeDirect(tmp));
                    }
                });
                destructuredParameters.forEach(function (dp) { return emitVariableDeclaration(dp); });
                if (node.body.kind == pxtc.SK.Block) {
                    emit(node.body);
                }
                else {
                    var v = emitExpr(node.body);
                    proc.emitJmp(getLabels(node).ret, v, pxtc.ir.JmpMode.Always);
                }
                proc.emitLblDirect(getLabels(node).ret);
                proc.stackEmpty();
                if (funcHasReturn(proc.action)) {
                    var v = pxtc.ir.shared(pxtc.ir.op(EK.JmpValue, []));
                    proc.emitExpr(v); // make sure we save it
                    proc.emitClrs();
                    var lbl = proc.mkLabel("final");
                    proc.emitJmp(lbl, v, pxtc.ir.JmpMode.Always);
                    proc.emitLbl(lbl);
                }
                else {
                    proc.emitClrs();
                }
                pxtc.assert(!bin.finalPass || usedWorkList.length == 0);
                while (usedWorkList.length > 0) {
                    var f = usedWorkList.pop();
                    emit(f);
                }
                return lit;
            }
            function hasShimDummy(node) {
                if (opts.target.isNative)
                    return false;
                var f = node;
                return f.body && (f.body.kind != pxtc.SK.Block || f.body.statements.length > 0);
            }
            function emitFunctionDeclaration(node) {
                if (!isUsed(node))
                    return;
                var attrs = parseComments(node);
                if (attrs.shim != null) {
                    if (opts.target.isNative) {
                        pxtc.hex.validateShim(getDeclName(node), attrs.shim, funcHasReturn(node), getParameters(node).length);
                    }
                    if (!hasShimDummy(node))
                        return;
                }
                if (node.flags & ts.NodeFlags.Ambient)
                    return;
                if (!node.body)
                    return;
                var info = getFunctionInfo(node);
                var lit = null;
                if (isGenericFunction(node)) {
                    if (!info.usages) {
                        pxtc.assert(opts.testMode && !usedDecls[nodeKey(node)] && !bin.finalPass);
                        // test mode - make fake binding
                        var bindings = getTypeParameters(node).map(function (t) { return ({
                            tp: checker.getTypeAtLocation(t),
                            isRef: true
                        }); });
                        addEnclosingTypeBindings(bindings, node);
                        pxtc.U.assert(bindings.length > 0);
                        info.usages = [bindings];
                    }
                    pxtc.U.assert(info.usages.length > 0, "no generic usages recorded");
                    var todo = info.usages;
                    if (!bin.finalPass) {
                        todo = info.usages.slice(info.prePassUsagesEmitted);
                        info.prePassUsagesEmitted = info.usages.length;
                    }
                    var _loop_6 = function(bindings) {
                        scope(function () {
                            var nolit = emitFuncCore(node, bindings);
                            pxtc.U.assert(nolit == null);
                        });
                    };
                    for (var _i = 0, todo_1 = todo; _i < todo_1.length; _i++) {
                        var bindings = todo_1[_i];
                        _loop_6(bindings);
                    }
                }
                else {
                    scope(function () {
                        lit = emitFuncCore(node, getEnclosingTypeBindings(node));
                    });
                }
                return lit;
            }
            function emitDeleteExpression(node) { }
            function emitTypeOfExpression(node) { }
            function emitVoidExpression(node) { }
            function emitAwaitExpression(node) { }
            function emitPrefixUnaryExpression(node) {
                var tp = typeOf(node.operand);
                if (node.operator == pxtc.SK.ExclamationToken) {
                    return pxtc.ir.rtcall("Boolean_::bang", [emitCondition(node.operand)]);
                }
                if (tp.flags & ts.TypeFlags.Number) {
                    switch (node.operator) {
                        case pxtc.SK.PlusPlusToken:
                            return emitIncrement(node.operand, "thumb::adds", false);
                        case pxtc.SK.MinusMinusToken:
                            return emitIncrement(node.operand, "thumb::subs", false);
                        case pxtc.SK.MinusToken:
                            return pxtc.ir.rtcall("thumb::subs", [pxtc.ir.numlit(0), emitExpr(node.operand)]);
                        case pxtc.SK.PlusToken:
                            return emitExpr(node.operand); // no-op
                        default:
                            break;
                    }
                }
                throw unhandled(node, lf("unsupported prefix unary operation"), 9245);
            }
            function doNothing() { }
            function needsCache(e) {
                var c = e;
                c.needsIRCache = true;
                irCachesToClear.push(c);
            }
            function prepForAssignment(trg, src) {
                if (src === void 0) { src = null; }
                var prev = irCachesToClear.length;
                if (trg.kind == pxtc.SK.PropertyAccessExpression || trg.kind == pxtc.SK.ElementAccessExpression) {
                    needsCache(trg.expression);
                }
                if (src)
                    needsCache(src);
                if (irCachesToClear.length == prev)
                    return doNothing;
                else
                    return function () {
                        for (var i = prev; i < irCachesToClear.length; ++i) {
                            irCachesToClear[i].cachedIR = null;
                            irCachesToClear[i].needsIRCache = false;
                        }
                        irCachesToClear.splice(prev, irCachesToClear.length - prev);
                    };
            }
            function irToNode(expr, isRef) {
                if (isRef === void 0) { isRef = false; }
                return {
                    kind: pxtc.SK.NullKeyword,
                    isRefOverride: isRef,
                    valueOverride: expr
                };
            }
            function emitIncrement(trg, meth, isPost, one) {
                if (one === void 0) { one = null; }
                var cleanup = prepForAssignment(trg);
                var oneExpr = one ? emitExpr(one) : pxtc.ir.numlit(1);
                var prev = pxtc.ir.shared(emitExpr(trg));
                var result = pxtc.ir.shared(pxtc.ir.rtcall(meth, [prev, oneExpr]));
                emitStore(trg, irToNode(result));
                cleanup();
                return isPost ? prev : result;
            }
            function emitPostfixUnaryExpression(node) {
                var tp = typeOf(node.operand);
                if (tp.flags & ts.TypeFlags.Number) {
                    switch (node.operator) {
                        case pxtc.SK.PlusPlusToken:
                            return emitIncrement(node.operand, "thumb::adds", true);
                        case pxtc.SK.MinusMinusToken:
                            return emitIncrement(node.operand, "thumb::subs", true);
                        default:
                            break;
                    }
                }
                throw unhandled(node, lf("unsupported postfix unary operation"), 9246);
            }
            function fieldIndexCore(info, fld, t) {
                var attrs = parseComments(fld);
                return {
                    idx: info.allfields.indexOf(fld),
                    name: getName(fld),
                    isRef: isRefType(t),
                    shimName: attrs.shim
                };
            }
            function fieldIndex(pacc) {
                var tp = typeOf(pacc.expression);
                if (isPossiblyGenericClassType(tp)) {
                    var info = getClassInfo(tp);
                    return fieldIndexCore(info, getFieldInfo(info, pacc.name.text), typeOf(pacc));
                }
                else {
                    throw unhandled(pacc, lf("bad field access"), 9247);
                }
            }
            function getFieldInfo(info, fieldName) {
                var field = info.allfields.filter(function (f) { return f.name.text == fieldName; })[0];
                if (!field) {
                    userError(9224, lf("field {0} not found", fieldName));
                }
                return field;
            }
            function emitStore(trg, src) {
                var decl = getDecl(trg);
                var isGlobal = isGlobalVar(decl);
                if (trg.kind == pxtc.SK.Identifier || isGlobal) {
                    if (decl && (isGlobal || decl.kind == pxtc.SK.VariableDeclaration || decl.kind == pxtc.SK.Parameter)) {
                        var l = lookupCell(decl);
                        recordUse(decl, true);
                        proc.emitExpr(l.storeByRef(emitExpr(src)));
                    }
                    else {
                        unhandled(trg, lf("bad target identifier"), 9248);
                    }
                }
                else if (trg.kind == pxtc.SK.PropertyAccessExpression) {
                    var decl_1 = getDecl(trg);
                    if (decl_1 && decl_1.kind == pxtc.SK.GetAccessor) {
                        decl_1 = ts.getDeclarationOfKind(decl_1.symbol, pxtc.SK.SetAccessor);
                        if (!decl_1) {
                            unhandled(trg, lf("setter not available"), 9253);
                        }
                        proc.emitExpr(emitCallCore(trg, trg, [src], null, decl_1));
                    }
                    else if (decl_1 && decl_1.kind == pxtc.SK.PropertySignature) {
                        proc.emitExpr(emitCallCore(trg, trg, [src], null, decl_1));
                    }
                    else {
                        proc.emitExpr(pxtc.ir.op(EK.Store, [emitExpr(trg), emitExpr(src)]));
                    }
                }
                else if (trg.kind == pxtc.SK.ElementAccessExpression) {
                    proc.emitExpr(emitIndexedAccess(trg, emitExpr(src)));
                }
                else {
                    unhandled(trg, lf("bad assignment target"), 9249);
                }
            }
            function handleAssignment(node) {
                var cleanup = prepForAssignment(node.left, node.right);
                emitStore(node.left, node.right);
                var res = emitExpr(node.right);
                cleanup();
                return res;
            }
            function rtcallMask(name, args, callingConv, append) {
                if (callingConv === void 0) { callingConv = pxtc.ir.CallingConvention.Plain; }
                if (append === void 0) { append = null; }
                var args2 = args.map(emitExpr);
                if (append)
                    args2 = args2.concat(append);
                return pxtc.ir.rtcallMask(name, getMask(args), callingConv, args2);
            }
            function emitInJmpValue(expr) {
                var lbl = proc.mkLabel("ldjmp");
                proc.emitJmp(lbl, expr, pxtc.ir.JmpMode.Always);
                proc.emitLbl(lbl);
            }
            function emitLazyBinaryExpression(node) {
                var lbl = proc.mkLabel("lazy");
                var left = emitExpr(node.left);
                var isString = typeOf(node.left).flags & ts.TypeFlags.String;
                if (node.operatorToken.kind == pxtc.SK.BarBarToken) {
                    if (isString)
                        left = pxtc.ir.rtcall("pxtrt::emptyToNull", [left]);
                    proc.emitJmp(lbl, left, pxtc.ir.JmpMode.IfNotZero);
                }
                else if (node.operatorToken.kind == pxtc.SK.AmpersandAmpersandToken) {
                    left = pxtc.ir.shared(left);
                    if (isString) {
                        var slbl = proc.mkLabel("lazyStr");
                        proc.emitJmp(slbl, pxtc.ir.rtcall("pxtrt::emptyToNull", [left]), pxtc.ir.JmpMode.IfNotZero);
                        proc.emitJmp(lbl, left, pxtc.ir.JmpMode.Always, left);
                        proc.emitLbl(slbl);
                        if (isRefCountedExpr(node.left))
                            proc.emitExpr(pxtc.ir.op(EK.Decr, [left]));
                        else
                            // make sure we have reference and the stack is cleared
                            proc.emitExpr(pxtc.ir.rtcall("thumb::ignore", [left]));
                    }
                    else {
                        if (isRefCountedExpr(node.left))
                            proc.emitExpr(pxtc.ir.op(EK.Decr, [left]));
                        proc.emitJmpZ(lbl, left);
                    }
                }
                else {
                    pxtc.oops();
                }
                proc.emitJmp(lbl, emitExpr(node.right), pxtc.ir.JmpMode.Always);
                proc.emitLbl(lbl);
                return pxtc.ir.op(EK.JmpValue, []);
            }
            function stripEquals(k) {
                switch (k) {
                    case pxtc.SK.PlusEqualsToken: return pxtc.SK.PlusToken;
                    case pxtc.SK.MinusEqualsToken: return pxtc.SK.MinusToken;
                    case pxtc.SK.AsteriskEqualsToken: return pxtc.SK.AsteriskToken;
                    case pxtc.SK.AsteriskAsteriskEqualsToken: return pxtc.SK.AsteriskAsteriskToken;
                    case pxtc.SK.SlashEqualsToken: return pxtc.SK.SlashToken;
                    case pxtc.SK.PercentEqualsToken: return pxtc.SK.PercentToken;
                    case pxtc.SK.LessThanLessThanEqualsToken: return pxtc.SK.LessThanLessThanToken;
                    case pxtc.SK.GreaterThanGreaterThanEqualsToken: return pxtc.SK.GreaterThanGreaterThanToken;
                    case pxtc.SK.GreaterThanGreaterThanGreaterThanEqualsToken: return pxtc.SK.GreaterThanGreaterThanGreaterThanToken;
                    case pxtc.SK.AmpersandEqualsToken: return pxtc.SK.AmpersandToken;
                    case pxtc.SK.BarEqualsToken: return pxtc.SK.BarToken;
                    case pxtc.SK.CaretEqualsToken: return pxtc.SK.CaretToken;
                    default: return pxtc.SK.Unknown;
                }
            }
            function emitBrk(node) {
                var src = ts.getSourceFileOfNode(node);
                if (opts.justMyCode && pxtc.U.startsWith(src.fileName, "pxt_modules"))
                    return;
                var pos = node.pos;
                while (/^\s$/.exec(src.text[pos]))
                    pos++;
                var p = ts.getLineAndCharacterOfPosition(src, pos);
                var e = ts.getLineAndCharacterOfPosition(src, node.end);
                var brk = {
                    id: res.breakpoints.length,
                    isDebuggerStmt: node.kind == pxtc.SK.DebuggerStatement,
                    fileName: src.fileName,
                    start: pos,
                    length: node.end - pos,
                    line: p.line,
                    endLine: e.line,
                    column: p.character,
                    endColumn: e.character,
                    successors: null
                };
                res.breakpoints.push(brk);
                var st = pxtc.ir.stmt(pxtc.ir.SK.Breakpoint, null);
                st.breakpointInfo = brk;
                proc.emit(st);
            }
            function simpleInstruction(k) {
                switch (k) {
                    case pxtc.SK.PlusToken: return "thumb::adds";
                    case pxtc.SK.MinusToken: return "thumb::subs";
                    // we could expose __aeabi_idiv directly...
                    case pxtc.SK.SlashToken: return "Number_::div";
                    case pxtc.SK.PercentToken: return "Number_::mod";
                    case pxtc.SK.AsteriskToken: return "thumb::muls";
                    case pxtc.SK.AmpersandToken: return "thumb::ands";
                    case pxtc.SK.BarToken: return "thumb::orrs";
                    case pxtc.SK.CaretToken: return "thumb::eors";
                    case pxtc.SK.LessThanLessThanToken: return "thumb::lsls";
                    case pxtc.SK.GreaterThanGreaterThanToken: return "thumb::asrs";
                    case pxtc.SK.GreaterThanGreaterThanGreaterThanToken: return "thumb::lsrs";
                    // these could be compiled to branches butthis is more code-size efficient
                    case pxtc.SK.LessThanEqualsToken: return "Number_::le";
                    case pxtc.SK.LessThanToken: return "Number_::lt";
                    case pxtc.SK.GreaterThanEqualsToken: return "Number_::ge";
                    case pxtc.SK.GreaterThanToken: return "Number_::gt";
                    case pxtc.SK.EqualsEqualsToken:
                    case pxtc.SK.EqualsEqualsEqualsToken:
                        return "Number_::eq";
                    case pxtc.SK.ExclamationEqualsEqualsToken:
                    case pxtc.SK.ExclamationEqualsToken:
                        return "Number_::neq";
                    default: return null;
                }
            }
            function emitBinaryExpression(node) {
                if (node.operatorToken.kind == pxtc.SK.EqualsToken) {
                    return handleAssignment(node);
                }
                var lt = typeOf(node.left);
                var rt = typeOf(node.right);
                if (node.operatorToken.kind == pxtc.SK.PlusToken) {
                    if (lt.flags & ts.TypeFlags.String || rt.flags & ts.TypeFlags.String) {
                        node.exprInfo = { leftType: checker.typeToString(lt), rightType: checker.typeToString(rt) };
                    }
                }
                var shim = function (n) { return rtcallMask(n, [node.left, node.right]); };
                if (node.operatorToken.kind == pxtc.SK.CommaToken) {
                    if (isNoopExpr(node.left))
                        return emitExpr(node.right);
                    else {
                        var v = emitIgnored(node.left);
                        return pxtc.ir.op(EK.Sequence, [v, emitExpr(node.right)]);
                    }
                }
                switch (node.operatorToken.kind) {
                    case pxtc.SK.BarBarToken:
                    case pxtc.SK.AmpersandAmpersandToken:
                        return emitLazyBinaryExpression(node);
                }
                if ((lt.flags & ts.TypeFlags.NumberLike) && (rt.flags & ts.TypeFlags.NumberLike)) {
                    var noEq = stripEquals(node.operatorToken.kind);
                    var shimName = simpleInstruction(noEq || node.operatorToken.kind);
                    if (!shimName)
                        unhandled(node.operatorToken, lf("unsupported numeric operator"), 9250);
                    if (noEq)
                        return emitIncrement(node.left, shimName, false, node.right);
                    return shim(shimName);
                }
                if (node.operatorToken.kind == pxtc.SK.PlusToken) {
                    if ((lt.flags & ts.TypeFlags.String) || (rt.flags & ts.TypeFlags.String)) {
                        return pxtc.ir.rtcallMask("String_::concat", 3, pxtc.ir.CallingConvention.Plain, [
                            emitAsString(node.left),
                            emitAsString(node.right)]);
                    }
                }
                if (node.operatorToken.kind == pxtc.SK.PlusEqualsToken &&
                    (lt.flags & ts.TypeFlags.String)) {
                    var cleanup = prepForAssignment(node.left);
                    var post = pxtc.ir.shared(pxtc.ir.rtcallMask("String_::concat", 3, pxtc.ir.CallingConvention.Plain, [
                        emitExpr(node.left),
                        emitAsString(node.right)]));
                    emitStore(node.left, irToNode(post));
                    cleanup();
                    return pxtc.ir.op(EK.Incr, [post]);
                }
                if ((lt.flags & ts.TypeFlags.String) && (rt.flags & ts.TypeFlags.String)) {
                    switch (node.operatorToken.kind) {
                        case pxtc.SK.LessThanEqualsToken:
                        case pxtc.SK.LessThanToken:
                        case pxtc.SK.GreaterThanEqualsToken:
                        case pxtc.SK.GreaterThanToken:
                        case pxtc.SK.EqualsEqualsToken:
                        case pxtc.SK.EqualsEqualsEqualsToken:
                        case pxtc.SK.ExclamationEqualsEqualsToken:
                        case pxtc.SK.ExclamationEqualsToken:
                            return pxtc.ir.rtcall(simpleInstruction(node.operatorToken.kind), [shim("String_::compare"), pxtc.ir.numlit(0)]);
                        default:
                            unhandled(node.operatorToken, lf("unknown string operator"), 9251);
                    }
                }
                switch (node.operatorToken.kind) {
                    case pxtc.SK.EqualsEqualsToken:
                    case pxtc.SK.EqualsEqualsEqualsToken:
                        return shim("Number_::eq");
                    case pxtc.SK.ExclamationEqualsEqualsToken:
                    case pxtc.SK.ExclamationEqualsToken:
                        return shim("Number_::neq");
                    default:
                        throw unhandled(node.operatorToken, lf("unknown generic operator"), 9252);
                }
            }
            function emitAsString(e) {
                var r = emitExpr(e);
                // TS returns 'any' as type of template elements
                if (isStringLiteral(e))
                    return r;
                var tp = typeOf(e);
                if (tp.flags & ts.TypeFlags.NumberLike)
                    return pxtc.ir.rtcall("Number_::toString", [r]);
                else if (tp.flags & ts.TypeFlags.Boolean)
                    return pxtc.ir.rtcall("Boolean_::toString", [r]);
                else if (tp.flags & ts.TypeFlags.String)
                    return r; // OK
                else {
                    var decl = tp.symbol ? tp.symbol.valueDeclaration : null;
                    if (decl && (decl.kind == pxtc.SK.ClassDeclaration || decl.kind == pxtc.SK.InterfaceDeclaration)) {
                        var classDecl = decl;
                        var toString_1 = classDecl.members.filter(function (m) {
                            return (m.kind == pxtc.SK.MethodDeclaration || m.kind == pxtc.SK.MethodSignature) &&
                                m.parameters.length == 0 &&
                                getName(m) == "toString";
                        })[0];
                        if (toString_1) {
                            var ee = e;
                            return emitCallCore(ee, ee, [], null, toString_1, ee);
                        }
                        else {
                            throw userError(9254, lf("type {0} lacks toString() method", getName(decl)));
                        }
                    }
                    throw userError(9225, lf("don't know how to convert to string"));
                }
            }
            function emitConditionalExpression(node) {
                var els = proc.mkLabel("condexprz");
                var fin = proc.mkLabel("condexprfin");
                proc.emitJmp(els, emitCondition(node.condition), pxtc.ir.JmpMode.IfZero);
                proc.emitJmp(fin, emitExpr(node.whenTrue), pxtc.ir.JmpMode.Always);
                proc.emitLbl(els);
                proc.emitJmp(fin, emitExpr(node.whenFalse), pxtc.ir.JmpMode.Always);
                proc.emitLbl(fin);
                var v = pxtc.ir.shared(pxtc.ir.op(EK.JmpValue, []));
                proc.emitExpr(v); // make sure we save it
                return v;
            }
            function emitSpreadElementExpression(node) { }
            function emitYieldExpression(node) { }
            function emitBlock(node) {
                node.statements.forEach(emit);
            }
            function checkForLetOrConst(declList) {
                if ((declList.flags & ts.NodeFlags.Let) || (declList.flags & ts.NodeFlags.Const)) {
                    return true;
                }
                throw userError(9260, lf("variable needs to be defined using 'let' instead of 'var'"));
            }
            function emitVariableStatement(node) {
                if (node.flags & ts.NodeFlags.Ambient)
                    return;
                checkForLetOrConst(node.declarationList);
                node.declarationList.declarations.forEach(emit);
            }
            function emitExpressionStatement(node) {
                emitExprAsStmt(node.expression);
            }
            function emitCondition(expr) {
                var inner = emitExpr(expr);
                // in both cases unref is internal, so no mask
                if (typeOf(expr).flags & ts.TypeFlags.String) {
                    return pxtc.ir.rtcall("pxtrt::stringToBool", [inner]);
                }
                else if (isRefCountedExpr(expr)) {
                    return pxtc.ir.rtcall("pxtrt::ptrToBool", [inner]);
                }
                else {
                    return inner;
                }
            }
            function emitIfStatement(node) {
                emitBrk(node);
                var elseLbl = proc.mkLabel("else");
                proc.emitJmpZ(elseLbl, emitCondition(node.expression));
                emit(node.thenStatement);
                var afterAll = proc.mkLabel("afterif");
                proc.emitJmp(afterAll);
                proc.emitLbl(elseLbl);
                if (node.elseStatement)
                    emit(node.elseStatement);
                proc.emitLbl(afterAll);
            }
            function getLabels(stmt) {
                var id = getNodeId(stmt);
                return {
                    fortop: ".fortop." + id,
                    cont: ".cont." + id,
                    brk: ".brk." + id,
                    ret: ".ret." + id
                };
            }
            function emitDoStatement(node) {
                emitBrk(node);
                var l = getLabels(node);
                proc.emitLblDirect(l.cont);
                emit(node.statement);
                proc.emitJmpZ(l.brk, emitCondition(node.expression));
                proc.emitJmp(l.cont);
                proc.emitLblDirect(l.brk);
            }
            function emitWhileStatement(node) {
                emitBrk(node);
                var l = getLabels(node);
                proc.emitLblDirect(l.cont);
                proc.emitJmpZ(l.brk, emitCondition(node.expression));
                emit(node.statement);
                proc.emitJmp(l.cont);
                proc.emitLblDirect(l.brk);
            }
            function isNoopExpr(node) {
                if (!node)
                    return true;
                switch (node.kind) {
                    case pxtc.SK.Identifier:
                    case pxtc.SK.StringLiteral:
                    case pxtc.SK.NumericLiteral:
                    case pxtc.SK.NullKeyword:
                        return true; // no-op
                }
                return false;
            }
            function emitIgnored(node) {
                var v = emitExpr(node);
                var a = typeOf(node);
                if (!(a.flags & ts.TypeFlags.Void)) {
                    if (isRefType(a)) {
                        v = pxtc.ir.op(EK.Decr, [v]);
                    }
                }
                return v;
            }
            function emitExprAsStmt(node) {
                if (isNoopExpr(node))
                    return;
                emitBrk(node);
                var v = emitIgnored(node);
                proc.emitExpr(v);
                proc.stackEmpty();
            }
            function emitForStatement(node) {
                if (node.initializer && node.initializer.kind == pxtc.SK.VariableDeclarationList) {
                    checkForLetOrConst(node.initializer);
                    node.initializer.declarations.forEach(emit);
                }
                else {
                    emitExprAsStmt(node.initializer);
                }
                emitBrk(node);
                var l = getLabels(node);
                proc.emitLblDirect(l.fortop);
                if (node.condition)
                    proc.emitJmpZ(l.brk, emitCondition(node.condition));
                emit(node.statement);
                proc.emitLblDirect(l.cont);
                emitExprAsStmt(node.incrementor);
                proc.emitJmp(l.fortop);
                proc.emitLblDirect(l.brk);
            }
            function emitForOfStatement(node) {
                if (!(node.initializer && node.initializer.kind == pxtc.SK.VariableDeclarationList)) {
                    unhandled(node, "only a single variable may be used to iterate a collection");
                    return;
                }
                var declList = node.initializer;
                if (declList.declarations.length != 1) {
                    unhandled(node, "only a single variable may be used to iterate a collection");
                    return;
                }
                checkForLetOrConst(declList);
                //Typecheck the expression being iterated over
                var t = typeOf(node.expression);
                var indexer = "";
                var length = "";
                if (t.flags & ts.TypeFlags.String) {
                    indexer = "String_::charAt";
                    length = "String_::length";
                }
                else if (isArrayType(t)) {
                    indexer = "Array_::getAt";
                    length = "Array_::length";
                }
                else {
                    unhandled(node.expression, "cannot use for...of with this expression");
                    return;
                }
                //As the iterator isn't declared in the usual fashion we must mark it as used, otherwise no cell will be allocated for it
                markUsed(declList.declarations[0]);
                var iterVar = emitVariableDeclaration(declList.declarations[0]); // c
                //Start with null, TODO: Is this necessary
                proc.emitExpr(iterVar.storeByRef(pxtc.ir.numlit(0)));
                proc.stackEmpty();
                // Store the expression (it could be a string literal, for example) for the collection being iterated over
                // Note that it's alaways a ref-counted type
                var collectionVar = proc.mkLocalUnnamed(true); // a
                proc.emitExpr(collectionVar.storeByRef(emitExpr(node.expression)));
                // Declaration of iterating variable
                var intVarIter = proc.mkLocalUnnamed(); // i
                proc.emitExpr(intVarIter.storeByRef(pxtc.ir.numlit(0)));
                proc.stackEmpty();
                emitBrk(node);
                var l = getLabels(node);
                proc.emitLblDirect(l.fortop);
                // i < a.length()
                // we use loadCore() on collection variable so that it doesn't get incr()ed
                // we could have used load() and rtcallMask to be more regular
                proc.emitJmpZ(l.brk, pxtc.ir.rtcall("Number_::lt", [intVarIter.load(), pxtc.ir.rtcall(length, [collectionVar.loadCore()])]));
                // c = a[i]
                proc.emitExpr(iterVar.storeByRef(pxtc.ir.rtcall(indexer, [collectionVar.loadCore(), intVarIter.load()])));
                emit(node.statement);
                proc.emitLblDirect(l.cont);
                // i = i + 1
                proc.emitExpr(intVarIter.storeByRef(pxtc.ir.rtcall("thumb::adds", [intVarIter.load(), pxtc.ir.numlit(1)])));
                proc.emitJmp(l.fortop);
                proc.emitLblDirect(l.brk);
                proc.emitExpr(collectionVar.storeByRef(pxtc.ir.numlit(0))); // clear it, so it gets GCed
            }
            function emitForInOrForOfStatement(node) { }
            function emitBreakOrContinueStatement(node) {
                emitBrk(node);
                var label = node.label ? node.label.text : null;
                var isBreak = node.kind == pxtc.SK.BreakStatement;
                function findOuter(parent) {
                    if (!parent)
                        return null;
                    if (label && parent.kind == pxtc.SK.LabeledStatement &&
                        parent.label.text == label)
                        return parent.statement;
                    if (parent.kind == pxtc.SK.SwitchStatement && !label && isBreak)
                        return parent;
                    if (!label && ts.isIterationStatement(parent, false))
                        return parent;
                    return findOuter(parent.parent);
                }
                var stmt = findOuter(node);
                if (!stmt)
                    error(node, 9230, lf("cannot find outer loop"));
                else {
                    var l = getLabels(stmt);
                    if (node.kind == pxtc.SK.ContinueStatement) {
                        if (!ts.isIterationStatement(stmt, false))
                            error(node, 9231, lf("continue on non-loop"));
                        else
                            proc.emitJmp(l.cont);
                    }
                    else if (node.kind == pxtc.SK.BreakStatement) {
                        proc.emitJmp(l.brk);
                    }
                    else {
                        pxtc.oops();
                    }
                }
            }
            function emitReturnStatement(node) {
                emitBrk(node);
                var v = null;
                if (node.expression) {
                    v = emitExpr(node.expression);
                }
                else if (funcHasReturn(proc.action)) {
                    v = pxtc.ir.numlit(null); // == return undefined
                }
                proc.emitJmp(getLabels(proc.action).ret, v, pxtc.ir.JmpMode.Always);
            }
            function emitWithStatement(node) { }
            function emitSwitchStatement(node) {
                emitBrk(node);
                var switchType = typeOf(node.expression);
                var isNumber = !!(switchType.flags & ts.TypeFlags.NumberLike);
                var l = getLabels(node);
                var defaultLabel;
                var quickCmpMode = isNumber;
                var expr = pxtc.ir.shared(emitExpr(node.expression));
                var plainExpr = expr;
                if (isNumber) {
                    emitInJmpValue(expr);
                }
                var lbls = node.caseBlock.clauses.map(function (cl) {
                    var lbl = proc.mkLabel("switch");
                    if (cl.kind == pxtc.SK.CaseClause) {
                        var cc = cl;
                        var cmpExpr = emitExpr(cc.expression);
                        if (switchType.flags & ts.TypeFlags.String) {
                            var cmpCall = pxtc.ir.rtcallMask("String_::compare", isRefCountedExpr(cc.expression) ? 3 : 2, pxtc.ir.CallingConvention.Plain, [cmpExpr, expr]);
                            expr = pxtc.ir.op(EK.Incr, [expr]);
                            proc.emitJmp(lbl, cmpCall, pxtc.ir.JmpMode.IfZero, plainExpr);
                        }
                        else if (isRefCountedExpr(cc.expression)) {
                            var cmpCall = pxtc.ir.rtcallMask("Number_::eq", 3, pxtc.ir.CallingConvention.Plain, [cmpExpr, expr]);
                            quickCmpMode = false;
                            expr = pxtc.ir.op(EK.Incr, [expr]);
                            proc.emitJmp(lbl, cmpCall, pxtc.ir.JmpMode.IfNotZero, plainExpr);
                        }
                        else {
                            if (cmpExpr.exprKind == EK.NumberLiteral) {
                                if (!quickCmpMode) {
                                    emitInJmpValue(expr);
                                    quickCmpMode = true;
                                }
                                proc.emitJmp(lbl, cmpExpr, pxtc.ir.JmpMode.IfJmpValEq, plainExpr);
                            }
                            else {
                                var cmpCall = pxtc.ir.rtcallMask("Number_::eq", 0, pxtc.ir.CallingConvention.Plain, [cmpExpr, expr]);
                                quickCmpMode = false;
                                proc.emitJmp(lbl, cmpCall, pxtc.ir.JmpMode.IfNotZero, plainExpr);
                            }
                        }
                    }
                    else if (cl.kind == pxtc.SK.DefaultClause) {
                        // Save default label for emit at the end of the
                        // tests section. Default label doesn't have to come at the
                        // end in JS.
                        pxtc.assert(!defaultLabel);
                        defaultLabel = lbl;
                    }
                    else {
                        pxtc.oops();
                    }
                    return lbl;
                });
                if (defaultLabel)
                    proc.emitJmp(defaultLabel, plainExpr);
                else
                    proc.emitJmp(l.brk, plainExpr);
                node.caseBlock.clauses.forEach(function (cl, i) {
                    proc.emitLbl(lbls[i]);
                    cl.statements.forEach(emit);
                });
                proc.emitLblDirect(l.brk);
            }
            function emitCaseOrDefaultClause(node) { }
            function emitLabeledStatement(node) {
                var l = getLabels(node.statement);
                emit(node.statement);
                proc.emitLblDirect(l.brk);
            }
            function emitThrowStatement(node) { }
            function emitTryStatement(node) { }
            function emitCatchClause(node) { }
            function emitDebuggerStatement(node) {
                emitBrk(node);
            }
            function emitVariableDeclaration(node) {
                if (node.name.kind === pxtc.SK.ObjectBindingPattern) {
                    if (!node.initializer) {
                        node.name.elements.forEach(function (e) { return emitVariableDeclaration(e); });
                        return null;
                    }
                    else {
                        userError(9259, "Object destructuring with initializers is not supported");
                    }
                }
                typeCheckVar(node);
                if (!isUsed(node)) {
                    return null;
                }
                var loc = isGlobalVar(node) ?
                    lookupCell(node) : proc.mkLocal(node, getVarInfo(node));
                if (loc.isByRefLocal()) {
                    proc.emitClrIfRef(loc); // we might be in a loop
                    proc.emitExpr(loc.storeDirect(pxtc.ir.rtcall("pxtrt::mkloc" + loc.refSuffix(), [])));
                }
                if (node.kind === pxtc.SK.BindingElement) {
                    emitBrk(node);
                    proc.emitExpr(loc.storeByRef(bindingElementAccessExpression(node)[0]));
                    proc.stackEmpty();
                }
                else if (node.initializer) {
                    // TODO make sure we don't emit code for top-level globals being initialized to zero
                    emitBrk(node);
                    proc.emitExpr(loc.storeByRef(emitExpr(node.initializer)));
                    proc.stackEmpty();
                }
                return loc;
            }
            function bindingElementAccessExpression(bindingElement) {
                var target = bindingElement.parent.parent;
                var parentAccess;
                var parentType;
                if (target.kind === pxtc.SK.BindingElement) {
                    var parent_1 = bindingElementAccessExpression(target);
                    parentAccess = parent_1[0];
                    parentType = parent_1[1];
                }
                else {
                    parentType = typeOf(target);
                }
                var propertyName = (bindingElement.propertyName || bindingElement.name);
                if (isPossiblyGenericClassType(parentType)) {
                    var info = getClassInfo(parentType);
                    parentAccess = parentAccess || emitLocalLoad(target);
                    var myType = checker.getTypeOfSymbolAtLocation(checker.getPropertyOfType(parentType, propertyName.text), bindingElement);
                    return [
                        pxtc.ir.op(EK.FieldAccess, [parentAccess], fieldIndexCore(info, getFieldInfo(info, propertyName.text), myType)),
                        myType
                    ];
                }
                else {
                    throw unhandled(bindingElement, lf("bad field access"), 9247);
                }
            }
            function emitClassExpression(node) { }
            function emitClassDeclaration(node) {
                getClassInfo(null, node);
                node.members.forEach(emit);
            }
            function emitInterfaceDeclaration(node) {
                var attrs = parseComments(node);
                if (attrs.autoCreate)
                    autoCreateFunctions[attrs.autoCreate] = true;
            }
            function emitEnumDeclaration(node) {
                //No code needs to be generated, enum names are replaced by constant values in generated code
            }
            function emitEnumMember(node) { }
            function emitModuleDeclaration(node) {
                if (node.flags & ts.NodeFlags.Ambient)
                    return;
                emit(node.body);
            }
            function emitImportDeclaration(node) { }
            function emitImportEqualsDeclaration(node) { }
            function emitExportDeclaration(node) { }
            function emitExportAssignment(node) { }
            function emitSourceFileNode(node) {
                node.statements.forEach(emit);
            }
            function catchErrors(node, f) {
                var prevErr = lastSecondaryError;
                inCatchErrors++;
                try {
                    lastSecondaryError = null;
                    var res_4 = f(node);
                    if (lastSecondaryError)
                        userError(lastSecondaryErrorCode, lastSecondaryError);
                    lastSecondaryError = prevErr;
                    inCatchErrors--;
                    return res_4;
                }
                catch (e) {
                    inCatchErrors--;
                    lastSecondaryError = null;
                    if (!e.ksEmitterUserError)
                        console.log(e.stack);
                    var code = e.ksErrorCode || 9200;
                    error(node, code, e.message);
                    return null;
                }
            }
            function emitExpr(node0) {
                var node = node0;
                if (node.cachedIR) {
                    if (isRefCountedExpr(node0))
                        return pxtc.ir.op(EK.Incr, [node.cachedIR]);
                    return node.cachedIR;
                }
                var res = catchErrors(node, emitExprInner) || pxtc.ir.numlit(0);
                if (node.needsIRCache) {
                    node.cachedIR = pxtc.ir.shared(res);
                    return node.cachedIR;
                }
                return res;
            }
            function emitExprInner(node) {
                var expr = emitExprCore(node);
                if (expr.isExpr())
                    return expr;
                throw new Error("expecting expression");
            }
            function emit(node) {
                catchErrors(node, emitNodeCore);
            }
            function emitNodeCore(node) {
                switch (node.kind) {
                    case pxtc.SK.SourceFile:
                        return emitSourceFileNode(node);
                    case pxtc.SK.InterfaceDeclaration:
                        return emitInterfaceDeclaration(node);
                    case pxtc.SK.VariableStatement:
                        return emitVariableStatement(node);
                    case pxtc.SK.ModuleDeclaration:
                        return emitModuleDeclaration(node);
                    case pxtc.SK.EnumDeclaration:
                        return emitEnumDeclaration(node);
                    //case SyntaxKind.MethodSignature:
                    case pxtc.SK.FunctionDeclaration:
                    case pxtc.SK.Constructor:
                    case pxtc.SK.MethodDeclaration:
                        emitFunctionDeclaration(node);
                        return;
                    case pxtc.SK.ExpressionStatement:
                        return emitExpressionStatement(node);
                    case pxtc.SK.Block:
                    case pxtc.SK.ModuleBlock:
                        return emitBlock(node);
                    case pxtc.SK.VariableDeclaration:
                        emitVariableDeclaration(node);
                        return;
                    case pxtc.SK.IfStatement:
                        return emitIfStatement(node);
                    case pxtc.SK.WhileStatement:
                        return emitWhileStatement(node);
                    case pxtc.SK.DoStatement:
                        return emitDoStatement(node);
                    case pxtc.SK.ForStatement:
                        return emitForStatement(node);
                    case pxtc.SK.ForOfStatement:
                        return emitForOfStatement(node);
                    case pxtc.SK.ContinueStatement:
                    case pxtc.SK.BreakStatement:
                        return emitBreakOrContinueStatement(node);
                    case pxtc.SK.LabeledStatement:
                        return emitLabeledStatement(node);
                    case pxtc.SK.ReturnStatement:
                        return emitReturnStatement(node);
                    case pxtc.SK.ClassDeclaration:
                        return emitClassDeclaration(node);
                    case pxtc.SK.PropertyDeclaration:
                    case pxtc.SK.PropertyAssignment:
                        return emitPropertyAssignment(node);
                    case pxtc.SK.SwitchStatement:
                        return emitSwitchStatement(node);
                    case pxtc.SK.TypeAliasDeclaration:
                        // skip
                        return;
                    case pxtc.SK.DebuggerStatement:
                        return emitDebuggerStatement(node);
                    case pxtc.SK.GetAccessor:
                    case pxtc.SK.SetAccessor:
                        return emitAccessor(node);
                    case pxtc.SK.ImportEqualsDeclaration:
                        // this doesn't do anything in compiled code
                        return emitImportEqualsDeclaration(node);
                    case pxtc.SK.EmptyStatement:
                        return;
                    default:
                        unhandled(node);
                }
            }
            function emitExprCore(node) {
                switch (node.kind) {
                    case pxtc.SK.NullKeyword:
                        var v = node.valueOverride;
                        if (v)
                            return v;
                        return pxtc.ir.numlit(null);
                    case pxtc.SK.TrueKeyword:
                        return pxtc.ir.numlit(true);
                    case pxtc.SK.FalseKeyword:
                        return pxtc.ir.numlit(false);
                    case pxtc.SK.TemplateHead:
                    case pxtc.SK.TemplateMiddle:
                    case pxtc.SK.TemplateTail:
                    case pxtc.SK.NumericLiteral:
                    case pxtc.SK.StringLiteral:
                    case pxtc.SK.NoSubstitutionTemplateLiteral:
                        //case SyntaxKind.RegularExpressionLiteral:
                        return emitLiteral(node);
                    case pxtc.SK.PropertyAccessExpression:
                        return emitPropertyAccess(node);
                    case pxtc.SK.BinaryExpression:
                        return emitBinaryExpression(node);
                    case pxtc.SK.PrefixUnaryExpression:
                        return emitPrefixUnaryExpression(node);
                    case pxtc.SK.PostfixUnaryExpression:
                        return emitPostfixUnaryExpression(node);
                    case pxtc.SK.ElementAccessExpression:
                        return emitIndexedAccess(node);
                    case pxtc.SK.ParenthesizedExpression:
                        return emitParenExpression(node);
                    case pxtc.SK.TypeAssertionExpression:
                        return emitTypeAssertion(node);
                    case pxtc.SK.ArrayLiteralExpression:
                        return emitArrayLiteral(node);
                    case pxtc.SK.NewExpression:
                        return emitNewExpression(node);
                    case pxtc.SK.SuperKeyword:
                    case pxtc.SK.ThisKeyword:
                        return emitThis(node);
                    case pxtc.SK.CallExpression:
                        return emitCallExpression(node);
                    case pxtc.SK.FunctionExpression:
                    case pxtc.SK.ArrowFunction:
                        return emitFunctionDeclaration(node);
                    case pxtc.SK.Identifier:
                        return emitIdentifier(node);
                    case pxtc.SK.ConditionalExpression:
                        return emitConditionalExpression(node);
                    case pxtc.SK.AsExpression:
                        return emitAsExpression(node);
                    case pxtc.SK.TemplateExpression:
                        return emitTemplateExpression(node);
                    case pxtc.SK.ObjectLiteralExpression:
                        return emitObjectLiteral(node);
                    default:
                        unhandled(node);
                        return null;
                }
            }
        }
        pxtc.compileBinary = compileBinary;
        function emptyExtInfo() {
            var pio = pxt.appTarget.compileService && !!pxt.appTarget.compileService.platformioIni;
            var r = {
                functions: [],
                generatedFiles: {},
                extensionFiles: {},
                sha: "",
                compileData: "",
                shimsDTS: "",
                enumsDTS: "",
                onlyPublic: true
            };
            if (pio)
                r.platformio = { dependencies: {} };
            else
                r.yotta = { config: {}, dependencies: {} };
            return r;
        }
        pxtc.emptyExtInfo = emptyExtInfo;
        var Binary = (function () {
            function Binary() {
                this.procs = [];
                this.globals = [];
                this.finalPass = false;
                this.writeFile = function (fn, cont) { };
                this.usedClassInfos = [];
                this.sourceHash = "";
                this.strings = {};
                this.otherLiterals = [];
                this.codeHelpers = {};
                this.lblNo = 0;
            }
            Binary.prototype.reset = function () {
                this.lblNo = 0;
                this.otherLiterals = [];
                this.strings = {};
            };
            Binary.prototype.addProc = function (proc) {
                pxtc.assert(!this.finalPass);
                this.procs.push(proc);
                proc.seqNo = this.procs.length;
                //proc.binary = this
            };
            Binary.prototype.emitString = function (s) {
                if (this.strings.hasOwnProperty(s))
                    return this.strings[s];
                var lbl = "_str" + this.lblNo++;
                this.strings[s] = lbl;
                return lbl;
            };
            return Binary;
        }());
        pxtc.Binary = Binary;
    })(pxtc = ts.pxtc || (ts.pxtc = {}));
})(ts || (ts = {}));
/// <reference path="../../built/typescriptServices.d.ts"/>
/// <reference path="../../localtypings/pxtarget.d.ts"/>
// Enforce order:
/// <reference path="util.ts"/>
/// <reference path="cloud.ts"/>
/// <reference path="assembler.ts"/>
/// <reference path="avr.ts"/>
/// <reference path="thumb.ts"/>
/// <reference path="ir.ts"/>
/// <reference path="emitter.ts"/>
/// <reference path="backthumb.ts"/>
/// <reference path="decompiler.ts"/>
var ts;
(function (ts) {
    var pxtc;
    (function (pxtc) {
        function computeUsedParts(resp, ignoreBuiltin) {
            if (ignoreBuiltin === void 0) { ignoreBuiltin = false; }
            if (!resp.usedSymbols || !pxt.appTarget.simulator || !pxt.appTarget.simulator.parts)
                return [];
            var parts = [];
            for (var symbol in resp.usedSymbols) {
                var info = resp.usedSymbols[symbol];
                if (info && info.attributes.parts) {
                    var partsRaw = info.attributes.parts;
                    if (partsRaw) {
                        var partsSplit = partsRaw.split(/[ ,]+/);
                        partsSplit.forEach(function (p) {
                            if (0 < p.length && parts.indexOf(p) < 0) {
                                parts.push(p);
                            }
                        });
                    }
                }
            }
            if (ignoreBuiltin) {
                var builtinParts_1 = pxt.appTarget.simulator.boardDefinition.onboardComponents;
                if (builtinParts_1)
                    parts = parts.filter(function (p) { return builtinParts_1.indexOf(p) < 0; });
            }
            //sort parts (so breadboarding layout is stable w.r.t. code ordering)
            parts.sort();
            parts = parts.reverse(); //not strictly necessary, but it's a little
            // nicer for demos to have "ledmatrix"
            // before "buttonpair"
            return parts;
        }
        pxtc.computeUsedParts = computeUsedParts;
        function getTsCompilerOptions(opts) {
            var options = ts.getDefaultCompilerOptions();
            options.target = ts.ScriptTarget.ES5;
            options.module = ts.ModuleKind.None;
            options.noImplicitAny = true;
            options.noImplicitReturns = true;
            options.allowUnreachableCode = true;
            return options;
        }
        pxtc.getTsCompilerOptions = getTsCompilerOptions;
        function nodeLocationInfo(node) {
            var file = ts.getSourceFileOfNode(node);
            var _a = ts.getLineAndCharacterOfPosition(file, node.pos), line = _a.line, character = _a.character;
            var _b = ts.getLineAndCharacterOfPosition(file, node.end), endLine = _b.line, endChar = _b.character;
            var r = {
                start: node.pos,
                length: node.end - node.pos,
                line: line,
                column: character,
                endLine: endLine,
                endColumn: endChar,
                fileName: file.fileName,
            };
            return r;
        }
        pxtc.nodeLocationInfo = nodeLocationInfo;
        function patchUpDiagnostics(diags) {
            var highPri = diags.filter(function (d) { return d.code == 1148; });
            if (highPri.length > 0)
                diags = highPri;
            return diags.map(function (d) {
                if (!d.file) {
                    var rr = {
                        code: d.code,
                        start: d.start,
                        length: d.length,
                        line: 0,
                        column: 0,
                        messageText: d.messageText,
                        category: d.category,
                        fileName: "?",
                    };
                    return rr;
                }
                var pos = ts.getLineAndCharacterOfPosition(d.file, d.start);
                var r = {
                    code: d.code,
                    start: d.start,
                    length: d.length,
                    line: pos.line,
                    column: pos.character,
                    messageText: d.messageText,
                    category: d.category,
                    fileName: d.file.fileName,
                };
                if (r.code == 1148)
                    r.messageText = pxtc.Util.lf("all symbols in top-level scope are always exported; please use a namespace if you want to export only some");
                return r;
            });
        }
        pxtc.patchUpDiagnostics = patchUpDiagnostics;
        function compile(opts) {
            var startTime = Date.now();
            var res = {
                outfiles: {},
                diagnostics: [],
                success: false,
                times: {},
            };
            var fileText = {};
            for (var fileName in opts.fileSystem) {
                fileText[normalizePath(fileName)] = opts.fileSystem[fileName];
            }
            var setParentNodes = true;
            var options = getTsCompilerOptions(opts);
            var host = {
                getSourceFile: function (fn, v, err) {
                    fn = normalizePath(fn);
                    var text = "";
                    if (fileText.hasOwnProperty(fn)) {
                        text = fileText[fn];
                    }
                    else {
                        if (err)
                            err("File not found: " + fn);
                    }
                    return ts.createSourceFile(fn, text, v, setParentNodes);
                },
                fileExists: function (fn) {
                    fn = normalizePath(fn);
                    return fileText.hasOwnProperty(fn);
                },
                getCanonicalFileName: function (fn) { return fn; },
                getDefaultLibFileName: function () { return "no-default-lib.d.ts"; },
                writeFile: function (fileName, data, writeByteOrderMark, onError) {
                    res.outfiles[fileName] = data;
                },
                getCurrentDirectory: function () { return "."; },
                useCaseSensitiveFileNames: function () { return true; },
                getNewLine: function () { return "\n"; },
                readFile: function (fn) {
                    fn = normalizePath(fn);
                    return fileText[fn] || "";
                },
                directoryExists: function (dn) { return true; },
            };
            if (!opts.sourceFiles)
                opts.sourceFiles = Object.keys(opts.fileSystem);
            var tsFiles = opts.sourceFiles.filter(function (f) { return pxtc.U.endsWith(f, ".ts"); });
            var program = ts.createProgram(tsFiles, options, host);
            // First get and report any syntactic errors.
            res.diagnostics = patchUpDiagnostics(program.getSyntacticDiagnostics());
            if (res.diagnostics.length > 0) {
                if (opts.forceEmit) {
                    pxt.debug('syntactic errors, forcing emit');
                    pxtc.compileBinary(program, host, opts, res);
                }
                return res;
            }
            // If we didn't have any syntactic errors, then also try getting the global and
            // semantic errors.
            res.diagnostics = patchUpDiagnostics(program.getOptionsDiagnostics().concat(program.getGlobalDiagnostics()));
            if (res.diagnostics.length == 0) {
                res.diagnostics = patchUpDiagnostics(program.getSemanticDiagnostics());
            }
            var emitStart = Date.now();
            res.times["typescript"] = emitStart - startTime;
            if (opts.ast) {
                res.ast = program;
            }
            if (opts.ast || opts.forceEmit || res.diagnostics.length == 0) {
                var binOutput = pxtc.compileBinary(program, host, opts, res);
                res.times["compilebinary"] = Date.now() - emitStart;
                res.diagnostics = patchUpDiagnostics(binOutput.diagnostics);
            }
            if (res.diagnostics.length == 0)
                res.success = true;
            for (var _i = 0, _a = opts.sourceFiles; _i < _a.length; _i++) {
                var f = _a[_i];
                if (pxtc.Util.startsWith(f, "built/"))
                    res.outfiles[f.slice(6)] = opts.fileSystem[f];
            }
            return res;
        }
        pxtc.compile = compile;
        function decompile(opts, fileName) {
            var resp = compile(opts);
            if (!resp.success)
                return resp;
            var file = resp.ast.getSourceFile(fileName);
            var apis = pxtc.getApiInfo(resp.ast);
            var blocksInfo = pxtc.getBlocksInfo(apis);
            var bresp = pxtc.decompiler.decompileToBlocks(blocksInfo, file, { snippetMode: false }, pxtc.decompiler.buildRenameMap(resp.ast, file));
            return bresp;
        }
        pxtc.decompile = decompile;
        function normalizePath(path) {
            path = path.replace(/\\/g, "/");
            var parts = [];
            path.split("/").forEach(function (part) {
                if (part === ".." && parts.length) {
                    parts.pop();
                }
                else if (part !== ".") {
                    parts.push(part);
                }
            });
            return parts.join("/");
        }
    })(pxtc = ts.pxtc || (ts.pxtc = {}));
})(ts || (ts = {}));
var ts;
(function (ts) {
    var pxtc;
    (function (pxtc) {
        var TokenKind;
        (function (TokenKind) {
            TokenKind[TokenKind["None"] = 0] = "None";
            TokenKind[TokenKind["Whitespace"] = 1] = "Whitespace";
            TokenKind[TokenKind["Identifier"] = 2] = "Identifier";
            TokenKind[TokenKind["Keyword"] = 3] = "Keyword";
            TokenKind[TokenKind["Operator"] = 4] = "Operator";
            TokenKind[TokenKind["CommentLine"] = 5] = "CommentLine";
            TokenKind[TokenKind["CommentBlock"] = 6] = "CommentBlock";
            TokenKind[TokenKind["NewLine"] = 7] = "NewLine";
            TokenKind[TokenKind["Literal"] = 8] = "Literal";
            TokenKind[TokenKind["Tree"] = 9] = "Tree";
            TokenKind[TokenKind["Block"] = 10] = "Block";
            TokenKind[TokenKind["EOF"] = 11] = "EOF";
        })(TokenKind || (TokenKind = {}));
        var inputForMsg = "";
        function lookupKind(k) {
            for (var _i = 0, _a = Object.keys(ts.SyntaxKind); _i < _a.length; _i++) {
                var o = _a[_i];
                if (ts.SyntaxKind[o] === k)
                    return o;
            }
            return "?";
        }
        var SK = ts.SyntaxKind;
        function showMsg(t, msg) {
            var pos = t.pos;
            var ctx = inputForMsg.slice(pos - 20, pos) + "<*>" + inputForMsg.slice(pos, pos + 20);
            console.log(ctx.replace(/\n/g, "<NL>"), ": L ", t.lineNo, msg);
        }
        function infixOperatorPrecedence(kind) {
            switch (kind) {
                case SK.CommaToken:
                    return 2;
                case SK.EqualsToken:
                case SK.PlusEqualsToken:
                case SK.MinusEqualsToken:
                case SK.AsteriskEqualsToken:
                case SK.AsteriskAsteriskEqualsToken:
                case SK.SlashEqualsToken:
                case SK.PercentEqualsToken:
                case SK.LessThanLessThanEqualsToken:
                case SK.GreaterThanGreaterThanEqualsToken:
                case SK.GreaterThanGreaterThanGreaterThanEqualsToken:
                case SK.AmpersandEqualsToken:
                case SK.BarEqualsToken:
                case SK.CaretEqualsToken:
                    return 5;
                case SK.QuestionToken:
                case SK.ColonToken:
                    return 7; // ternary operator
                case SK.BarBarToken:
                    return 10;
                case SK.AmpersandAmpersandToken:
                    return 20;
                case SK.BarToken:
                    return 30;
                case SK.CaretToken:
                    return 40;
                case SK.AmpersandToken:
                    return 50;
                case SK.EqualsEqualsToken:
                case SK.ExclamationEqualsToken:
                case SK.EqualsEqualsEqualsToken:
                case SK.ExclamationEqualsEqualsToken:
                    return 60;
                case SK.LessThanToken:
                case SK.GreaterThanToken:
                case SK.LessThanEqualsToken:
                case SK.GreaterThanEqualsToken:
                case SK.InstanceOfKeyword:
                case SK.InKeyword:
                case SK.AsKeyword:
                    return 70;
                case SK.LessThanLessThanToken:
                case SK.GreaterThanGreaterThanToken:
                case SK.GreaterThanGreaterThanGreaterThanToken:
                    return 80;
                case SK.PlusToken:
                case SK.MinusToken:
                    return 90;
                case SK.AsteriskToken:
                case SK.SlashToken:
                case SK.PercentToken:
                    return 100;
                case SK.AsteriskAsteriskToken:
                    return 101;
                case SK.DotToken:
                    return 120;
                default:
                    return 0;
            }
        }
        function getTokKind(kind) {
            switch (kind) {
                case SK.EndOfFileToken:
                    return TokenKind.EOF;
                case SK.SingleLineCommentTrivia:
                    return TokenKind.CommentLine;
                case SK.MultiLineCommentTrivia:
                    return TokenKind.CommentBlock;
                case SK.NewLineTrivia:
                    return TokenKind.NewLine;
                case SK.WhitespaceTrivia:
                    return TokenKind.Whitespace;
                case SK.ShebangTrivia:
                case SK.ConflictMarkerTrivia:
                    return TokenKind.CommentBlock;
                case SK.NumericLiteral:
                case SK.StringLiteral:
                case SK.RegularExpressionLiteral:
                case SK.NoSubstitutionTemplateLiteral:
                case SK.TemplateHead:
                case SK.TemplateMiddle:
                case SK.TemplateTail:
                    return TokenKind.Literal;
                case SK.Identifier:
                    return TokenKind.Identifier;
                default:
                    if (kind < SK.Identifier)
                        return TokenKind.Operator;
                    return TokenKind.Keyword;
            }
        }
        var brokenRegExps = false;
        function tokenize(input) {
            inputForMsg = input;
            var scanner = ts.createScanner(ts.ScriptTarget.Latest, false, ts.LanguageVariant.Standard, input, function (msg) {
                var pos = scanner.getTextPos();
                console.log("scanner error", pos, msg.message);
            });
            var tokens = [];
            var braceBalance = 0;
            var templateLevel = -1;
            while (true) {
                var kind = scanner.scan();
                if (kind == SK.CloseBraceToken && braceBalance == templateLevel) {
                    templateLevel = -1;
                    kind = scanner.reScanTemplateToken();
                }
                if (brokenRegExps && kind == SK.SlashToken || kind == SK.SlashEqualsToken) {
                    var tmp = scanner.reScanSlashToken();
                    if (tmp == SK.RegularExpressionLiteral)
                        kind = tmp;
                }
                if (kind == SK.GreaterThanToken) {
                    kind = scanner.reScanGreaterToken();
                }
                var tok = {
                    kind: getTokKind(kind),
                    synKind: kind,
                    lineNo: 0,
                    pos: scanner.getTokenPos(),
                    text: scanner.getTokenText(),
                };
                if (kind == SK.OpenBraceToken)
                    braceBalance++;
                if (kind == SK.CloseBraceToken) {
                    if (--braceBalance < 0)
                        braceBalance = -10000000;
                }
                tokens.push(tok);
                if (kind == SK.TemplateHead || kind == SK.TemplateMiddle) {
                    templateLevel = braceBalance;
                }
                if (tok.kind == TokenKind.EOF)
                    break;
            }
            // Util.assert(tokens.map(t => t.text).join("") == input)
            return { tokens: tokens, braceBalance: braceBalance };
        }
        function skipWhitespace(tokens, i) {
            while (tokens[i] && tokens[i].kind == TokenKind.Whitespace)
                i++;
            return i;
        }
        // We do not want empty lines in the source to get lost - they serve as a sort of comment dividing parts of code
        // We turn them into empty comments here
        function emptyLinesToComments(tokens, cursorPos) {
            var output = [];
            var atLineBeg = true;
            var lineNo = 1;
            for (var i = 0; i < tokens.length; ++i) {
                if (atLineBeg) {
                    var bkp = i;
                    i = skipWhitespace(tokens, i);
                    if (tokens[i].kind == TokenKind.NewLine) {
                        var isCursor = false;
                        if (cursorPos >= 0 && tokens[i].pos >= cursorPos) {
                            cursorPos = -1;
                            isCursor = true;
                        }
                        output.push({
                            text: "",
                            kind: TokenKind.CommentLine,
                            pos: tokens[i].pos,
                            lineNo: lineNo,
                            synKind: SK.SingleLineCommentTrivia,
                            isCursor: isCursor
                        });
                    }
                    else {
                        i = bkp;
                    }
                }
                output.push(tokens[i]);
                tokens[i].lineNo = lineNo;
                if (tokens[i].kind == TokenKind.NewLine) {
                    atLineBeg = true;
                    lineNo++;
                }
                else {
                    atLineBeg = false;
                }
                if (cursorPos >= 0 && tokens[i].pos >= cursorPos) {
                    cursorPos = -1;
                }
            }
            return output;
        }
        // Add Tree tokens where needed
        function matchBraces(tokens) {
            var braceStack = [];
            var braceTop = function () { return braceStack[braceStack.length - 1]; };
            braceStack.push({
                synKind: SK.EndOfFileToken,
                token: {
                    children: [],
                },
            });
            var pushClose = function (tok, synKind) {
                var token = tok;
                token.children = [];
                token.kind = TokenKind.Tree;
                braceStack.push({ synKind: synKind, token: token });
            };
            for (var i = 0; i < tokens.length; ++i) {
                var token = tokens[i];
                var top_1 = braceStack[braceStack.length - 1];
                top_1.token.children.push(token);
                switch (token.kind) {
                    case TokenKind.Operator:
                        switch (token.synKind) {
                            case SK.OpenBraceToken:
                            case SK.OpenParenToken:
                            case SK.OpenBracketToken:
                                pushClose(token, token.synKind + 1);
                                break;
                            case SK.CloseBraceToken:
                            case SK.CloseParenToken:
                            case SK.CloseBracketToken:
                                top_1.token.children.pop();
                                while (true) {
                                    top_1 = braceStack.pop();
                                    if (top_1.synKind == token.synKind) {
                                        top_1.token.endToken = token;
                                        break;
                                    }
                                    // don't go past brace with other closing parens
                                    if (braceStack.length == 0 || top_1.synKind == SK.CloseBraceToken) {
                                        braceStack.push(top_1);
                                        break;
                                    }
                                }
                                break;
                            default:
                                break;
                        }
                        break;
                }
            }
            return braceStack[0].token.children;
        }
        function mkEOF() {
            return {
                kind: TokenKind.EOF,
                synKind: SK.EndOfFileToken,
                pos: 0,
                lineNo: 0,
                text: ""
            };
        }
        function mkSpace(t, s) {
            return {
                kind: TokenKind.Whitespace,
                synKind: SK.WhitespaceTrivia,
                pos: t.pos - s.length,
                lineNo: t.lineNo,
                text: s
            };
        }
        function mkNewLine(t) {
            return {
                kind: TokenKind.NewLine,
                synKind: SK.NewLineTrivia,
                pos: t.pos,
                lineNo: t.lineNo,
                text: "\n"
            };
        }
        function mkBlock(toks) {
            return {
                kind: TokenKind.Block,
                synKind: SK.OpenBraceToken,
                pos: toks[0].pos,
                lineNo: toks[0].lineNo,
                stmts: [{ tokens: toks }],
                text: "{",
                endToken: null
            };
        }
        function mkVirtualTree(toks) {
            return {
                kind: TokenKind.Tree,
                synKind: SK.WhitespaceTrivia,
                pos: toks[0].pos,
                lineNo: toks[0].lineNo,
                children: toks,
                endToken: null,
                text: ""
            };
        }
        function isExprEnd(t) {
            if (!t)
                return false;
            switch (t.synKind) {
                case SK.IfKeyword:
                case SK.ElseKeyword:
                case SK.LetKeyword:
                case SK.ConstKeyword:
                case SK.VarKeyword:
                case SK.DoKeyword:
                case SK.WhileKeyword:
                case SK.SwitchKeyword:
                case SK.CaseKeyword:
                case SK.DefaultKeyword:
                case SK.ForKeyword:
                case SK.ReturnKeyword:
                case SK.BreakKeyword:
                case SK.ContinueKeyword:
                case SK.TryKeyword:
                case SK.CatchKeyword:
                case SK.FinallyKeyword:
                case SK.DeleteKeyword:
                case SK.FunctionKeyword:
                case SK.ClassKeyword:
                case SK.YieldKeyword:
                case SK.DebuggerKeyword:
                    return true;
                default:
                    return false;
            }
        }
        function delimitStmts(tokens, inStmtCtx, ctxToken) {
            if (ctxToken === void 0) { ctxToken = null; }
            var res = [];
            var i = 0;
            var currCtxToken;
            var didBlock = false;
            tokens = tokens.concat([mkEOF()]);
            while (tokens[i].kind != TokenKind.EOF) {
                var stmtBeg = i;
                skipToStmtEnd();
                pxtc.Util.assert(i > stmtBeg, "Error at " + tokens[i].text);
                addStatement(tokens.slice(stmtBeg, i));
            }
            return res;
            function addStatement(tokens) {
                if (inStmtCtx)
                    tokens = trimWhitespace(tokens);
                if (tokens.length == 0)
                    return;
                tokens.forEach(delimitIn);
                tokens = injectBlocks(tokens);
                var merge = false;
                if (inStmtCtx && res.length > 0) {
                    var prev = res[res.length - 1];
                    var prevKind = prev.tokens[0].synKind;
                    var thisKind = tokens[0].synKind;
                    if ((prevKind == SK.IfKeyword && thisKind == SK.ElseKeyword) ||
                        (prevKind == SK.TryKeyword && thisKind == SK.CatchKeyword) ||
                        (prevKind == SK.TryKeyword && thisKind == SK.FinallyKeyword) ||
                        (prevKind == SK.CatchKeyword && thisKind == SK.FinallyKeyword)) {
                        tokens.unshift(mkSpace(tokens[0], " "));
                        pxtc.Util.pushRange(res[res.length - 1].tokens, tokens);
                        return;
                    }
                }
                res.push({
                    tokens: tokens
                });
            }
            function injectBlocks(tokens) {
                var output = [];
                var i = 0;
                while (i < tokens.length) {
                    if (tokens[i].blockSpanLength) {
                        var inner = tokens.slice(i, i + tokens[i].blockSpanLength);
                        var isVirtual = !!inner[0].blockSpanIsVirtual;
                        delete inner[0].blockSpanLength;
                        delete inner[0].blockSpanIsVirtual;
                        i += inner.length;
                        inner = injectBlocks(inner);
                        if (isVirtual) {
                            output.push(mkVirtualTree(inner));
                        }
                        else {
                            output.push(mkSpace(inner[0], " "));
                            output.push(mkBlock(trimWhitespace(inner)));
                        }
                    }
                    else {
                        output.push(tokens[i++]);
                    }
                }
                return output;
            }
            function delimitIn(t) {
                if (t.kind == TokenKind.Tree) {
                    var tree = t;
                    tree.children = pxtc.Util.concat(delimitStmts(tree.children, false, tree).map(function (s) { return s.tokens; }));
                }
            }
            function nextNonWs(stopOnNewLine) {
                if (stopOnNewLine === void 0) { stopOnNewLine = false; }
                while (true) {
                    i++;
                    switch (tokens[i].kind) {
                        case TokenKind.Whitespace:
                        case TokenKind.CommentBlock:
                        case TokenKind.CommentLine:
                            break;
                        case TokenKind.NewLine:
                            if (stopOnNewLine)
                                break;
                            break;
                        default:
                            return;
                    }
                }
            }
            function skipOptionalNewLine() {
                while (tokens[i].kind == TokenKind.Whitespace) {
                    i++;
                }
                if (tokens[i].kind == TokenKind.NewLine)
                    i++;
            }
            function skipUntilBlock() {
                while (true) {
                    i++;
                    switch (tokens[i].kind) {
                        case TokenKind.EOF:
                            return;
                        case TokenKind.Tree:
                            if (tokens[i].synKind == SK.OpenBraceToken) {
                                i--;
                                expectBlock();
                                return;
                            }
                            break;
                    }
                }
            }
            function handleBlock() {
                pxtc.Util.assert(tokens[i].synKind == SK.OpenBraceToken);
                var tree = tokens[i];
                pxtc.Util.assert(tree.kind == TokenKind.Tree);
                var blk = tokens[i];
                blk.stmts = delimitStmts(tree.children, true, currCtxToken);
                delete tree.children;
                blk.kind = TokenKind.Block;
                i++;
                didBlock = true;
            }
            function expectBlock() {
                var begIdx = i + 1;
                nextNonWs();
                if (tokens[i].synKind == SK.OpenBraceToken) {
                    handleBlock();
                    skipOptionalNewLine();
                }
                else {
                    skipToStmtEnd();
                    tokens[begIdx].blockSpanLength = i - begIdx;
                }
            }
            function skipToStmtEnd() {
                while (true) {
                    var t = tokens[i];
                    var bkp = i;
                    currCtxToken = t;
                    didBlock = false;
                    if (t.kind == TokenKind.EOF)
                        return;
                    if (inStmtCtx && t.synKind == SK.SemicolonToken) {
                        i++;
                        skipOptionalNewLine();
                        return;
                    }
                    if (t.synKind == SK.EqualsGreaterThanToken) {
                        nextNonWs();
                        if (tokens[i].synKind == SK.OpenBraceToken) {
                            handleBlock();
                            continue;
                        }
                        else {
                            var begIdx = i;
                            skipToStmtEnd();
                            var j = i;
                            while (tokens[j].kind == TokenKind.NewLine)
                                j--;
                            tokens[begIdx].blockSpanLength = j - begIdx;
                            tokens[begIdx].blockSpanIsVirtual = true;
                            return;
                        }
                    }
                    if (inStmtCtx && infixOperatorPrecedence(t.synKind)) {
                        var begIdx = i;
                        // an infix operator at the end of the line prevents the newline from ending the statement
                        nextNonWs();
                        if (isExprEnd(tokens[i])) {
                            // unless next line starts with something statement-like
                            i = begIdx;
                        }
                        else {
                            continue;
                        }
                    }
                    if (inStmtCtx && t.kind == TokenKind.NewLine) {
                        nextNonWs();
                        t = tokens[i];
                        // if we get a infix operator other than +/- after newline, it's a continuation
                        if (infixOperatorPrecedence(t.synKind) && t.synKind != SK.PlusToken && t.synKind != SK.MinusToken) {
                            continue;
                        }
                        else {
                            i = bkp + 1;
                            return;
                        }
                    }
                    if (t.synKind == SK.OpenBraceToken && ctxToken && ctxToken.synKind == SK.ClassKeyword) {
                        var jj = i - 1;
                        while (jj >= 0 && tokens[jj].kind == TokenKind.Whitespace)
                            jj--;
                        if (jj < 0 || tokens[jj].synKind != SK.EqualsToken) {
                            i--;
                            expectBlock(); // method body
                            return;
                        }
                    }
                    pxtc.Util.assert(bkp == i);
                    switch (t.synKind) {
                        case SK.ForKeyword:
                        case SK.WhileKeyword:
                        case SK.IfKeyword:
                        case SK.CatchKeyword:
                            nextNonWs();
                            if (tokens[i].synKind == SK.OpenParenToken) {
                                expectBlock();
                            }
                            else {
                                continue; // just continue until new line
                            }
                            return;
                        case SK.DoKeyword:
                            expectBlock();
                            i--;
                            nextNonWs();
                            if (tokens[i].synKind == SK.WhileKeyword) {
                                i++;
                                continue;
                            }
                            else {
                                return;
                            }
                        case SK.ElseKeyword:
                            nextNonWs();
                            if (tokens[i].synKind == SK.IfKeyword) {
                                continue; // 'else if' - keep scanning
                            }
                            else {
                                i = bkp;
                                expectBlock();
                                return;
                            }
                        case SK.TryKeyword:
                        case SK.FinallyKeyword:
                            expectBlock();
                            return;
                        case SK.ClassKeyword:
                        case SK.NamespaceKeyword:
                        case SK.ModuleKeyword:
                        case SK.InterfaceKeyword:
                        case SK.FunctionKeyword:
                            skipUntilBlock();
                            return;
                    }
                    pxtc.Util.assert(!didBlock, "forgot continue/return after expectBlock");
                    i++;
                }
            }
        }
        function isWhitespaceOrNewLine(tok) {
            return tok && (tok.kind == TokenKind.Whitespace || tok.kind == TokenKind.NewLine);
        }
        function removeIndent(tokens) {
            var output = [];
            var atLineBeg = false;
            for (var i = 0; i < tokens.length; ++i) {
                if (atLineBeg)
                    i = skipWhitespace(tokens, i);
                if (tokens[i]) {
                    output.push(tokens[i]);
                    atLineBeg = tokens[i].kind == TokenKind.NewLine;
                }
            }
            return output;
        }
        function trimWhitespace(toks) {
            toks = toks.slice(0);
            while (isWhitespaceOrNewLine(toks[0]))
                toks.shift();
            while (isWhitespaceOrNewLine(toks[toks.length - 1]))
                toks.pop();
            return toks;
        }
        function normalizeSpace(tokens) {
            var output = [];
            var i = 0;
            var lastNonTrivialToken = mkEOF();
            tokens = tokens.concat([mkEOF()]);
            while (i < tokens.length) {
                i = skipWhitespace(tokens, i);
                var token = tokens[i];
                if (token.kind == TokenKind.EOF)
                    break;
                var j = skipWhitespace(tokens, i + 1);
                if (token.kind == TokenKind.NewLine && tokens[j].synKind == SK.OpenBraceToken) {
                    i = j; // skip NL
                    continue;
                }
                var needsSpace = true;
                var last = output.length == 0 ? mkNewLine(token) : output[output.length - 1];
                switch (last.synKind) {
                    case SK.ExclamationToken:
                    case SK.TildeToken:
                    case SK.DotToken:
                        needsSpace = false;
                        break;
                    case SK.PlusToken:
                    case SK.MinusToken:
                    case SK.PlusPlusToken:
                    case SK.MinusMinusToken:
                        if (last.isPrefix)
                            needsSpace = false;
                        break;
                }
                switch (token.synKind) {
                    case SK.DotToken:
                    case SK.CommaToken:
                    case SK.NewLineTrivia:
                    case SK.ColonToken:
                    case SK.SemicolonToken:
                    case SK.OpenBracketToken:
                        needsSpace = false;
                        break;
                    case SK.PlusPlusToken:
                    case SK.MinusMinusToken:
                        if (last.kind == TokenKind.Tree || last.kind == TokenKind.Identifier || last.kind == TokenKind.Keyword)
                            needsSpace = false;
                    /* fall through */
                    case SK.PlusToken:
                    case SK.MinusToken:
                        if (lastNonTrivialToken.kind == TokenKind.EOF ||
                            infixOperatorPrecedence(lastNonTrivialToken.synKind) ||
                            lastNonTrivialToken.synKind == SK.SemicolonToken)
                            token.isPrefix = true;
                        break;
                    case SK.OpenParenToken:
                        if (last.kind == TokenKind.Identifier)
                            needsSpace = false;
                        if (last.kind == TokenKind.Keyword)
                            switch (last.synKind) {
                                case SK.IfKeyword:
                                case SK.ForKeyword:
                                case SK.WhileKeyword:
                                case SK.SwitchKeyword:
                                case SK.ReturnKeyword:
                                case SK.ThrowKeyword:
                                case SK.CatchKeyword:
                                    break;
                                default:
                                    needsSpace = false;
                            }
                        break;
                }
                if (last.kind == TokenKind.NewLine)
                    needsSpace = false;
                if (needsSpace)
                    output.push(mkSpace(token, " "));
                output.push(token);
                if (token.kind != TokenKind.NewLine)
                    lastNonTrivialToken = token;
                i++;
            }
            return output;
        }
        function finalFormat(ind, token) {
            if (token.synKind == SK.NoSubstitutionTemplateLiteral &&
                /^`[\s\.#01]*`$/.test(token.text)) {
                var lines = token.text.slice(1, token.text.length - 1).split("\n").map(function (l) { return l.replace(/\s/g, ""); }).filter(function (l) { return !!l; });
                if (lines.length < 4 || lines.length > 5)
                    return;
                var numFrames = Math.floor((Math.max.apply(Math, lines.map(function (l) { return l.length; })) + 2) / 5);
                if (numFrames <= 0)
                    numFrames = 1;
                var out = "`\n";
                for (var i = 0; i < 5; ++i) {
                    var l = lines[i] || "";
                    while (l.length < numFrames * 5)
                        l += ".";
                    l = l.replace(/0/g, ".");
                    l = l.replace(/1/g, "#");
                    l = l.replace(/...../g, function (m) { return "/" + m; });
                    out += ind + l.replace(/./g, function (m) { return " " + m; }).replace(/\//g, " ").slice(3) + "\n";
                }
                out += ind + "`";
                token.text = out;
            }
        }
        function toStr(v) {
            if (Array.isArray(v))
                return "[[ " + v.map(toStr).join("  ") + " ]]";
            if (typeof v.text == "string")
                return JSON.stringify(v.text);
            return v + "";
        }
        pxtc.toStr = toStr;
        function format(input, pos) {
            var r = tokenize(input);
            //if (r.braceBalance != 0) return null
            var topTokens = r.tokens;
            topTokens = emptyLinesToComments(topTokens, pos);
            topTokens = matchBraces(topTokens);
            var topStmts = delimitStmts(topTokens, true);
            var ind = "";
            var output = "";
            var outpos = -1;
            var indIncrLine = 0;
            topStmts.forEach(ppStmt);
            topStmts.forEach(function (s) { return s.tokens.forEach(findNonBlocks); });
            if (outpos == -1)
                outpos = output.length;
            return {
                formatted: output,
                pos: outpos
            };
            function findNonBlocks(t) {
                if (t.kind == TokenKind.Tree) {
                    var tree = t;
                    if (t.synKind == SK.OpenBraceToken) {
                    }
                    tree.children.forEach(findNonBlocks);
                }
                else if (t.kind == TokenKind.Block) {
                    t.stmts.forEach(function (s) { return s.tokens.forEach(findNonBlocks); });
                }
            }
            function incrIndent(parToken, f) {
                if (indIncrLine == parToken.lineNo) {
                    f();
                }
                else {
                    indIncrLine = parToken.lineNo;
                    var prev = ind;
                    ind += "    ";
                    f();
                    ind = prev;
                }
            }
            function ppStmt(s) {
                var toks = removeIndent(s.tokens);
                if (toks.length == 1 && !toks[0].isCursor && toks[0].text == "") {
                    output += "\n";
                    return;
                }
                output += ind;
                incrIndent(toks[0], function () {
                    ppToks(toks);
                });
                if (output[output.length - 1] != "\n")
                    output += "\n";
            }
            function writeToken(t) {
                if (outpos == -1 && t.pos + t.text.length >= pos) {
                    outpos = output.length + (pos - t.pos);
                }
                output += t.text;
            }
            function ppToks(tokens) {
                tokens = normalizeSpace(tokens);
                var _loop_7 = function(i) {
                    var t = tokens[i];
                    finalFormat(ind, t);
                    writeToken(t);
                    switch (t.kind) {
                        case TokenKind.Tree:
                            var tree_1 = t;
                            incrIndent(t, function () {
                                ppToks(removeIndent(tree_1.children));
                            });
                            if (tree_1.endToken) {
                                writeToken(tree_1.endToken);
                            }
                            break;
                        case TokenKind.Block:
                            var blk = t;
                            if (blk.stmts.length == 0) {
                                output += " ";
                            }
                            else {
                                output += "\n";
                                blk.stmts.forEach(ppStmt);
                                output += ind.slice(4);
                            }
                            if (blk.endToken)
                                writeToken(blk.endToken);
                            else
                                output += "}";
                            break;
                        case TokenKind.NewLine:
                            if (tokens[i + 1] && tokens[i + 1].kind == TokenKind.CommentLine &&
                                tokens[i + 1].text == "" && !tokens[i + 1].isCursor)
                                break; // no indent for empty line
                            if (i == tokens.length - 1)
                                output += ind.slice(4);
                            else
                                output += ind;
                            break;
                        case TokenKind.Whitespace:
                            break;
                    }
                };
                for (var i = 0; i < tokens.length; ++i) {
                    _loop_7(i);
                }
            }
        }
        pxtc.format = format;
    })(pxtc = ts.pxtc || (ts.pxtc = {}));
})(ts || (ts = {}));
var ts;
(function (ts) {
    var pxtc;
    (function (pxtc) {
        // HEX file documentation at: https://en.wikipedia.org/wiki/Intel_HEX
        /* From above:
        This example shows a file that has four data records followed by an end-of-file record:
    
    :10010000214601360121470136007EFE09D2190140
    :100110002146017E17C20001FF5F16002148011928
    :10012000194E79234623965778239EDA3F01B2CAA7
    :100130003F0156702B5E712B722B732146013421C7
    :00000001FF
    
            A record (line of text) consists of six fields (parts) that appear in order from left to right:
            - Start code, one character, an ASCII colon ':'.
            - Byte count, two hex digits, indicating the number of bytes (hex digit pairs) in the data field.
              The maximum byte count is 255 (0xFF). 16 (0x10) and 32 (0x20) are commonly used byte counts.
            - Address, four hex digits, representing the 16-bit beginning memory address offset of the data.
              The physical address of the data is computed by adding this offset to a previously established
              base address, thus allowing memory addressing beyond the 64 kilobyte limit of 16-bit addresses.
              The base address, which defaults to zero, can be changed by various types of records.
              Base addresses and address offsets are always expressed as big endian values.
            - Record type (see record types below), two hex digits, 00 to 05, defining the meaning of the data field.
            - Data, a sequence of n bytes of data, represented by 2n hex digits. Some records omit this field (n equals zero).
              The meaning and interpretation of data bytes depends on the application.
            - Checksum, two hex digits, a computed value that can be used to verify the record has no errors.
    
        */
        pxtc.vtableShift = 2;
        var UF2;
        (function (UF2) {
            UF2.startMagic = "UF2\x0AWQ]\x9E";
            UF2.endMagic = "0o\xB1\x0A";
            UF2.UF2_MAGIC_START0 = 0x0A324655; // "UF2\n"
            UF2.UF2_MAGIC_START1 = 0x9E5D5157; // Randomly selected
            UF2.UF2_MAGIC_END = 0x0AB16F30; // Ditto
            function parseBlock(block) {
                var wordAt = function (k) {
                    return (block[k] + (block[k + 1] << 8) + (block[k + 2] << 16) + (block[k + 3] << 24)) >>> 0;
                };
                if (!block || block.length != 512 ||
                    wordAt(0) != UF2.UF2_MAGIC_START0 || wordAt(4) != UF2.UF2_MAGIC_START1 ||
                    wordAt(block.length - 4) != UF2.UF2_MAGIC_END)
                    return null;
                return {
                    flags: wordAt(8),
                    targetAddr: wordAt(12),
                    payloadSize: wordAt(16),
                    blockNo: wordAt(20),
                    numBlocks: wordAt(24),
                    data: block.slice(32, 512 - 4)
                };
            }
            UF2.parseBlock = parseBlock;
            function parseFile(blocks) {
                var r = [];
                for (var i = 0; i < blocks.length; i += 512) {
                    var b = parseBlock(blocks.slice(i, i + 512));
                    if (b)
                        r.push(b);
                }
                return r;
            }
            UF2.parseFile = parseFile;
            function toBin(blocks) {
                if (blocks.length < 512)
                    return null;
                var curraddr = -1;
                var appstartaddr = -1;
                var bufs = [];
                for (var i = 0; i < blocks.length; ++i) {
                    var ptr = i * 512;
                    var bl = parseBlock(blocks.slice(ptr, ptr + 512));
                    if (!bl)
                        continue;
                    if (curraddr == -1) {
                        curraddr = bl.targetAddr;
                        appstartaddr = curraddr;
                    }
                    var padding = bl.targetAddr - curraddr;
                    if (padding < 0 || padding % 4 || padding > 1024 * 1024)
                        continue;
                    if (padding > 0)
                        bufs.push(new Uint8Array(padding));
                    bufs.push(blocks.slice(ptr + 32, ptr + 32 + bl.payloadSize));
                    curraddr = bl.targetAddr + bl.payloadSize;
                }
                var len = 0;
                for (var _i = 0, bufs_1 = bufs; _i < bufs_1.length; _i++) {
                    var b = bufs_1[_i];
                    len += b.length;
                }
                if (len == 0)
                    return null;
                var r = new Uint8Array(len);
                var dst = 0;
                for (var _a = 0, bufs_2 = bufs; _a < bufs_2.length; _a++) {
                    var b = bufs_2[_a];
                    for (var i = 0; i < b.length; ++i)
                        r[dst++] = b[i];
                }
                return {
                    buf: r,
                    start: appstartaddr,
                };
            }
            UF2.toBin = toBin;
            function setWord(block, ptr, v) {
                block[ptr] = (v & 0xff);
                block[ptr + 1] = ((v >> 8) & 0xff);
                block[ptr + 2] = ((v >> 16) & 0xff);
                block[ptr + 3] = ((v >> 24) & 0xff);
            }
            function newBlockFile() {
                return {
                    currBlock: null,
                    currPtr: -1,
                    blocks: [],
                    ptrs: []
                };
            }
            UF2.newBlockFile = newBlockFile;
            function serializeFile(f) {
                for (var i = 0; i < f.blocks.length; ++i) {
                    setWord(f.blocks[i], 24, f.blocks.length);
                }
                var res = "";
                for (var _i = 0, _a = f.blocks; _i < _a.length; _i++) {
                    var b = _a[_i];
                    res += pxtc.Util.uint8ArrayToString(b);
                }
                return res;
            }
            UF2.serializeFile = serializeFile;
            function hasAddr(b, a) {
                if (!b)
                    return false;
                return b.targetAddr <= a && a < b.targetAddr + b.payloadSize;
            }
            function readBytes(blocks, addr, length) {
                var res = new Uint8Array(length);
                var bl;
                for (var i = 0; i < length; ++i, ++addr) {
                    if (!hasAddr(bl, addr))
                        bl = blocks.filter(function (b) { return hasAddr(b, addr); })[0];
                    if (bl)
                        res[i] = bl.data[addr - bl.targetAddr];
                }
                return res;
            }
            UF2.readBytes = readBytes;
            function writeBytes(f, addr, bytes) {
                var currBlock = f.currBlock;
                var needAddr = addr >> 8;
                // account for unaligned writes
                // this function is only used to write small chunks, so recursion is fine
                var firstChunk = 256 - (addr & 0xff);
                if (bytes.length > firstChunk) {
                    writeBytes(f, addr, bytes.slice(0, firstChunk));
                    writeBytes(f, addr + firstChunk, bytes.slice(firstChunk));
                    return;
                }
                if (needAddr != f.currPtr) {
                    var i = 0;
                    currBlock = null;
                    for (var i_1 = 0; i_1 < f.ptrs.length; ++i_1) {
                        if (f.ptrs[i_1] == needAddr) {
                            currBlock = f.blocks[i_1];
                            break;
                        }
                    }
                    if (!currBlock) {
                        currBlock = new Uint8Array(512);
                        setWord(currBlock, 0, UF2.UF2_MAGIC_START0);
                        setWord(currBlock, 4, UF2.UF2_MAGIC_START1);
                        setWord(currBlock, 12, needAddr << 8);
                        setWord(currBlock, 16, 256);
                        setWord(currBlock, 20, f.blocks.length);
                        setWord(currBlock, 512 - 4, UF2.UF2_MAGIC_END);
                        f.blocks.push(currBlock);
                        f.ptrs.push(needAddr);
                    }
                    f.currPtr = needAddr;
                    f.currBlock = currBlock;
                }
                var p = (addr & 0xff) + 32;
                for (var i = 0; i < bytes.length; ++i)
                    currBlock[p + i] = bytes[i];
            }
            UF2.writeBytes = writeBytes;
            function writeHex(f, hex) {
                var upperAddr = "0000";
                for (var i = 0; i < hex.length; ++i) {
                    var m = /:02000004(....)/.exec(hex[i]);
                    if (m) {
                        upperAddr = m[1];
                    }
                    m = /^:..(....)00(.*)[0-9A-F][0-9A-F]$/.exec(hex[i]);
                    if (m) {
                        var newAddr = parseInt(upperAddr + m[1], 16);
                        var hh = m[2];
                        var arr = [];
                        for (var j = 0; j < hh.length; j += 2) {
                            arr.push(parseInt(hh[j] + hh[j + 1], 16));
                        }
                        writeBytes(f, newAddr, arr);
                    }
                }
            }
            UF2.writeHex = writeHex;
        })(UF2 = pxtc.UF2 || (pxtc.UF2 = {}));
        // TODO should be internal
        var hex;
        (function (hex_2) {
            var funcInfo;
            var hex;
            var jmpStartAddr;
            var jmpStartIdx;
            var bytecodePaddingSize;
            var bytecodeStartAddr;
            var bytecodeStartIdx;
            var asmLabels = {};
            hex_2.asmTotalSource = "";
            hex_2.defaultPageSize = 0x400;
            // utility function
            function swapBytes(str) {
                var r = "";
                var i = 0;
                for (; i < str.length; i += 2)
                    r = str[i] + str[i + 1] + r;
                pxtc.assert(i == str.length);
                return r;
            }
            function parseChecksumBlock(buf, pos) {
                if (pos === void 0) { pos = 0; }
                var magic = pxt.HF2.read32(buf, pos);
                if ((magic & 0x7fffffff) != 0x07eeb07c) {
                    pxt.log("no checksum block magic");
                    return null;
                }
                var endMarkerPos = pxt.HF2.read32(buf, pos + 4);
                var endMarker = pxt.HF2.read32(buf, pos + 8);
                if (endMarkerPos & 3) {
                    pxt.log("invalid end marker position");
                    return null;
                }
                var pageSize = 1 << (endMarker & 0xff);
                if (pageSize != pxt.appTarget.compile.flashCodeAlign) {
                    pxt.log("invalid page size: " + pageSize);
                    return null;
                }
                var blk = {
                    magic: magic,
                    endMarkerPos: endMarkerPos,
                    endMarker: endMarker,
                    regions: []
                };
                for (var i = pos + 12; i < buf.length - 7; i += 8) {
                    var r = {
                        start: pageSize * pxt.HF2.read16(buf, i),
                        length: pageSize * pxt.HF2.read16(buf, i + 2),
                        checksum: pxt.HF2.read32(buf, i + 4)
                    };
                    if (r.length && r.checksum) {
                        blk.regions.push(r);
                    }
                    else {
                        break;
                    }
                }
                //console.log(hexDump(buf), blk)
                return blk;
            }
            hex_2.parseChecksumBlock = parseChecksumBlock;
            function hexDump(bytes, startOffset) {
                if (startOffset === void 0) { startOffset = 0; }
                function toHex(n, len) {
                    if (len === void 0) { len = 8; }
                    var r = n.toString(16);
                    while (r.length < len)
                        r = "0" + r;
                    return r;
                }
                var r = "";
                for (var i = 0; i < bytes.length; i += 16) {
                    r += toHex(startOffset + i) + ": ";
                    var t = "";
                    for (var j = 0; j < 16; j++) {
                        if ((j & 3) == 0)
                            r += " ";
                        var v = bytes[i + j];
                        if (v == null) {
                            r += "   ";
                            continue;
                        }
                        r += toHex(v, 2) + " ";
                        if (32 <= v && v < 127)
                            t += String.fromCharCode(v);
                        else
                            t += ".";
                    }
                    r += " " + t + "\n";
                }
                return r;
            }
            hex_2.hexDump = hexDump;
            function setupInlineAssembly(opts) {
                asmLabels = {};
                var asmSources = opts.sourceFiles.filter(function (f) { return pxtc.U.endsWith(f, ".asm"); });
                hex_2.asmTotalSource = "";
                var asmIdx = 0;
                for (var _i = 0, asmSources_1 = asmSources; _i < asmSources_1.length; _i++) {
                    var f = asmSources_1[_i];
                    var src = opts.fileSystem[f];
                    src.replace(/^\s*(\w+):/mg, function (f, lbl) {
                        asmLabels[lbl] = true;
                        return "";
                    });
                    var code = ".section code\n" +
                        "@stackmark func\n" +
                        "@scope user" + asmIdx++ + "\n" +
                        src + "\n" +
                        "@stackempty func\n" +
                        "@scope\n";
                    hex_2.asmTotalSource += code;
                }
            }
            hex_2.setupInlineAssembly = setupInlineAssembly;
            function isSetupFor(extInfo) {
                return currentSetup == extInfo.sha;
            }
            hex_2.isSetupFor = isSetupFor;
            function parseHexBytes(bytes) {
                bytes = bytes.replace(/^[\s:]/, "");
                if (!bytes)
                    return [];
                var m = /^([a-f0-9][a-f0-9])/i.exec(bytes);
                if (m)
                    return [parseInt(m[1], 16)].concat(parseHexBytes(bytes.slice(2)));
                else
                    throw pxtc.oops("bad bytes " + bytes);
            }
            var currentSetup = null;
            // setup for a particular .hex template file (which corresponds to the C++ source in included packages and the board)
            function flashCodeAlign(opts) {
                return opts.flashCodeAlign || hex_2.defaultPageSize;
            }
            hex_2.flashCodeAlign = flashCodeAlign;
            // some hex files use '02' records instead of '04' record for addresses. go figure.
            function patchSegmentHex(hex) {
                for (var i = 0; i < hex.length; ++i) {
                    // :020000021000EC
                    if (hex[i][8] == '2') {
                        var m = /^:02....02(....)..$/.exec(hex[i]);
                        pxtc.U.assert(!!m);
                        var upaddr = parseInt(m[1], 16) * 16;
                        pxtc.U.assert((upaddr & 0xffff) == 0);
                        hex[i] = hexBytes([0x02, 0x00, 0x00, 0x04, 0x00, upaddr >> 16]);
                    }
                }
            }
            function setupFor(opts, extInfo, hexinfo) {
                if (isSetupFor(extInfo))
                    return;
                currentSetup = extInfo.sha;
                hex_2.currentHexInfo = hexinfo;
                hex = hexinfo.hex;
                patchSegmentHex(hex);
                var i = 0;
                var upperAddr = "0000";
                var lastAddr = 0;
                var lastIdx = 0;
                bytecodeStartAddr = 0;
                var hitEnd = function () {
                    if (!bytecodeStartAddr) {
                        var bytes = parseHexBytes(hex[lastIdx]);
                        var missing = (0x10 - ((lastAddr + bytes[0]) & 0xf)) & 0xf;
                        if (missing)
                            if (bytes[2] & 0xf) {
                                var next = lastAddr + bytes[0];
                                var newline = [missing, next >> 8, next & 0xff, 0x00];
                                for (var i_2 = 0; i_2 < missing; ++i_2)
                                    newline.push(0x00);
                                lastIdx++;
                                hex.splice(lastIdx, 0, hexBytes(newline));
                                bytecodeStartAddr = next + missing;
                            }
                            else {
                                if (bytes[0] != 0x10) {
                                    bytes.pop(); // checksum
                                    bytes[0] = 0x10;
                                    while (bytes.length < 20)
                                        bytes.push(0x00);
                                    hex[lastIdx] = hexBytes(bytes);
                                }
                                bytecodeStartAddr = lastAddr + 16;
                            }
                        else {
                            bytecodeStartAddr = lastAddr + bytes[0];
                        }
                        bytecodeStartIdx = lastIdx + 1;
                        var pageSize = flashCodeAlign(opts);
                        hex_2.bytecodeStartAddrPadded = (bytecodeStartAddr & ~(pageSize - 1)) + pageSize;
                        var paddingBytes = hex_2.bytecodeStartAddrPadded - bytecodeStartAddr;
                        pxtc.assert((paddingBytes & 0xf) == 0);
                        bytecodePaddingSize = paddingBytes;
                    }
                };
                for (; i < hex.length; ++i) {
                    var m = /:02000004(....)/.exec(hex[i]);
                    if (m) {
                        upperAddr = m[1];
                    }
                    m = /^:..(....)00/.exec(hex[i]);
                    if (m) {
                        var newAddr = parseInt(upperAddr + m[1], 16);
                        if (newAddr >= 0x3C000)
                            hitEnd();
                        lastIdx = i;
                        lastAddr = newAddr;
                    }
                    if (/^:00000001/.test(hex[i]))
                        hitEnd();
                    // random magic number, which marks the beginning of the array of function pointers in the .hex file
                    // it is defined in pxt-microbit-core
                    m = /^:10....000108010842424242010801083ED8E98D/.exec(hex[i]);
                    if (m) {
                        jmpStartAddr = lastAddr;
                        jmpStartIdx = i;
                    }
                }
                if (!jmpStartAddr)
                    pxtc.oops("No hex start");
                if (!bytecodeStartAddr)
                    pxtc.oops("No hex end");
                funcInfo = {};
                var funs = extInfo.functions;
                for (var i_3 = jmpStartIdx + 1; i_3 < hex.length; ++i_3) {
                    var m = /^:10(....)00(.{16})/.exec(hex[i_3]);
                    if (!m)
                        continue;
                    var s = hex[i_3].slice(9);
                    var step = opts.shortPointers ? 4 : 8;
                    while (s.length >= step) {
                        var inf = funs.shift();
                        if (!inf)
                            return;
                        funcInfo[inf.name] = inf;
                        var hexb = s.slice(0, step);
                        //console.log(inf.name, hexb)
                        inf.value = parseInt(swapBytes(hexb), 16);
                        if (!inf.value) {
                            pxtc.U.oops("No value for " + inf.name + " / " + hexb);
                        }
                        s = s.slice(step);
                    }
                }
                pxtc.oops();
            }
            hex_2.setupFor = setupFor;
            function validateShim(funname, shimName, hasRet, numArgs) {
                if (shimName == "TD_ID" || shimName == "TD_NOOP")
                    return;
                if (pxtc.U.lookup(asmLabels, shimName))
                    return;
                var nm = funname + "(...) (shim=" + shimName + ")";
                var inf = lookupFunc(shimName);
                if (inf) {
                    if (!hasRet) {
                        if (inf.type != "P")
                            pxtc.U.userError("expecting procedure for " + nm);
                    }
                    else {
                        if (inf.type != "F")
                            pxtc.U.userError("expecting function for " + nm);
                    }
                    if (numArgs != inf.args)
                        pxtc.U.userError("argument number mismatch: " + numArgs + " vs " + inf.args + " in C++");
                }
                else {
                    pxtc.U.userError("function not found: " + nm);
                }
            }
            hex_2.validateShim = validateShim;
            function lookupFunc(name) {
                return funcInfo[name];
            }
            hex_2.lookupFunc = lookupFunc;
            function lookupFunctionAddr(name) {
                var inf = lookupFunc(name);
                if (inf)
                    return inf.value;
                return null;
            }
            hex_2.lookupFunctionAddr = lookupFunctionAddr;
            function hexTemplateHash() {
                var sha = currentSetup ? currentSetup.slice(0, 16) : "";
                while (sha.length < 16)
                    sha += "0";
                return sha.toUpperCase();
            }
            hex_2.hexTemplateHash = hexTemplateHash;
            function hexPrelude() {
                return "    .startaddr 0x" + hex_2.bytecodeStartAddrPadded.toString(16) + "\n";
            }
            hex_2.hexPrelude = hexPrelude;
            function hexBytes(bytes) {
                var chk = 0;
                var r = ":";
                bytes.forEach(function (b) { return chk += b; });
                bytes.push((-chk) & 0xff);
                bytes.forEach(function (b) { return r += ("0" + b.toString(16)).slice(-2); });
                return r.toUpperCase();
            }
            function patchHex(bin, buf, shortForm, useuf2) {
                var myhex = hex.slice(0, bytecodeStartIdx);
                pxtc.assert(buf.length < 32000);
                // store the size of the program (in 16 bit words)
                buf[17] = buf.length;
                var zeros = [];
                for (var i = 0; i < bytecodePaddingSize >> 1; ++i)
                    zeros.push(0);
                buf = zeros.concat(buf);
                var ptr = 0;
                function nextLine(buf, addr) {
                    var bytes = [0x10, (addr >> 8) & 0xff, addr & 0xff, 0];
                    for (var j = 0; j < 8; ++j) {
                        bytes.push((buf[ptr] || 0) & 0xff);
                        bytes.push((buf[ptr] || 0) >>> 8);
                        ptr++;
                    }
                    return bytes;
                }
                // 0x4209 is the version number matching pxt-microbit-core
                var hd = [0x4209, 0, hex_2.bytecodeStartAddrPadded & 0xffff, hex_2.bytecodeStartAddrPadded >>> 16];
                var tmp = hexTemplateHash();
                for (var i = 0; i < 4; ++i)
                    hd.push(parseInt(swapBytes(tmp.slice(i * 4, i * 4 + 4)), 16));
                var uf2 = useuf2 ? UF2.newBlockFile() : null;
                if (uf2) {
                    UF2.writeHex(uf2, myhex);
                    UF2.writeBytes(uf2, jmpStartAddr, nextLine(hd, jmpStartIdx).slice(4));
                    if (bin.checksumBlock) {
                        var bytes = [];
                        for (var _i = 0, _a = bin.checksumBlock; _i < _a.length; _i++) {
                            var w = _a[_i];
                            bytes.push(w & 0xff, w >> 8);
                        }
                        UF2.writeBytes(uf2, bin.target.flashChecksumAddr, bytes);
                    }
                }
                else {
                    myhex[jmpStartIdx] = hexBytes(nextLine(hd, jmpStartAddr));
                    if (bin.checksumBlock) {
                        pxtc.U.oops("checksum block in HEX not implemented yet");
                    }
                }
                ptr = 0;
                if (shortForm)
                    myhex = [];
                var addr = bytecodeStartAddr;
                var upper = (addr - 16) >> 16;
                while (ptr < buf.length) {
                    if (uf2) {
                        UF2.writeBytes(uf2, addr, nextLine(buf, addr).slice(4));
                    }
                    else {
                        if ((addr >> 16) != upper) {
                            upper = addr >> 16;
                            myhex.push(hexBytes([0x02, 0x00, 0x00, 0x04, upper >> 8, upper & 0xff]));
                        }
                        myhex.push(hexBytes(nextLine(buf, addr)));
                    }
                    addr += 16;
                }
                if (!shortForm) {
                    var app = hex.slice(bytecodeStartIdx);
                    if (uf2)
                        UF2.writeHex(uf2, app);
                    else
                        pxtc.Util.pushRange(myhex, app);
                }
                if (uf2)
                    return [UF2.serializeFile(uf2)];
                else
                    return myhex;
            }
            hex_2.patchHex = patchHex;
        })(hex = pxtc.hex || (pxtc.hex = {}));
        function asmline(s) {
            if (!/(^[\s;])|(:$)/.test(s))
                s = "    " + s;
            return s + "\n";
        }
        pxtc.asmline = asmline;
        function stringLiteral(s) {
            var r = "\"";
            for (var i = 0; i < s.length; ++i) {
                // TODO generate warning when seeing high character ?
                var c = s.charCodeAt(i) & 0xff;
                var cc = String.fromCharCode(c);
                if (cc == "\\" || cc == "\"")
                    r += "\\" + cc;
                else if (cc == "\n")
                    r += "\\n";
                else if (c <= 0xf)
                    r += "\\x0" + c.toString(16);
                else if (c < 32 || c > 127)
                    r += "\\x" + c.toString(16);
                else
                    r += cc;
            }
            return r + "\"";
        }
        function emitStrings(bin) {
            for (var _i = 0, _a = Object.keys(bin.strings); _i < _a.length; _i++) {
                var s = _a[_i];
                var lbl = bin.strings[s];
                // string representation of DAL - 0xffff in general for ref-counted objects means it's static and shouldn't be incr/decred
                bin.otherLiterals.push("\n.balign 4\n" + lbl + "meta: .short 0xffff, " + s.length + "\n" + lbl + ": .string " + stringLiteral(s) + "\n");
            }
        }
        function vtableToAsm(info) {
            var s = "\n        .balign " + (1 << pxtc.vtableShift) + "\n" + info.id + "_VT:\n        .short " + (info.refmask.length * 4 + 4) + "  ; size in bytes\n        .byte " + (info.vtable.length + 2) + ", 0  ; num. methods\n";
            s += "        .word " + info.id + "_IfaceVT\n";
            s += "        .word pxt::RefRecord_destroy|1\n";
            s += "        .word pxt::RefRecord_print|1\n";
            for (var _i = 0, _a = info.vtable; _i < _a.length; _i++) {
                var m = _a[_i];
                s += "        .word " + m.label() + "|1\n";
            }
            var refmask = info.refmask.map(function (v) { return v ? "1" : "0"; });
            while (refmask.length < 2 || refmask.length % 2 != 0)
                refmask.push("0");
            s += "        .byte " + refmask.join(",") + "\n";
            // VTable for interface method is just linear. If we ever have lots of interface
            // methods and lots of classes this could become a problem. We could use a table
            // of (iface-member-id, function-addr) pairs and binary search.
            // See https://codethemicrobit.com/nymuaedeou for Thumb binary search.
            s += "\n        .balign 4\n" + info.id + "_IfaceVT:\n";
            for (var _b = 0, _c = info.itable; _b < _c.length; _b++) {
                var m = _c[_b];
                s += "        .word " + (m ? m.label() + "|1" : "0") + "\n";
            }
            s += "\n";
            return s;
        }
        function serialize(bin, opts) {
            var asmsource = "; start\n" + hex.hexPrelude() + "        \n    .hex 708E3B92C615A841C49866C975EE5197 ; magic number\n    .hex " + hex.hexTemplateHash() + " ; hex template hash\n    .hex 0000000000000000 ; @SRCHASH@\n    .short " + bin.globalsWords + "   ; num. globals\n    .short 0 ; patched with number of words resulting from assembly\n    .word 0 ; reserved\n    .word 0 ; reserved\n    .word 0 ; reserved\n";
            var snippets = null;
            if (opts.target.nativeType == "AVR")
                snippets = new pxtc.AVRSnippets();
            else
                snippets = new pxtc.ThumbSnippets();
            bin.procs.forEach(function (p) {
                var p2a = new pxtc.ProctoAssembler(snippets, bin, p);
                asmsource += "\n" + p2a.getAssembly() + "\n";
            });
            bin.usedClassInfos.forEach(function (info) {
                asmsource += vtableToAsm(info);
            });
            pxtc.U.iterMap(bin.codeHelpers, function (code, lbl) {
                asmsource += "    .section code\n" + lbl + ":\n" + code + "\n";
            });
            asmsource += hex.asmTotalSource;
            asmsource += "_js_end:\n";
            emitStrings(bin);
            asmsource += bin.otherLiterals.join("");
            asmsource += "_program_end:\n";
            return asmsource;
        }
        function patchSrcHash(bin, src) {
            var sha = pxtc.U.sha256(src);
            bin.sourceHash = sha;
            return src.replace(/\n.*@SRCHASH@\n/, "\n    .hex " + sha.slice(0, 16).toUpperCase() + " ; program hash\n");
        }
        function processorInlineAssemble(nativeType, src) {
            var b = mkProcessorFile(nativeType);
            b.disablePeepHole = true;
            b.emit(src);
            throwAssemblerErrors(b);
            var res = [];
            for (var i = 0; i < b.buf.length; i += 2) {
                res.push((((b.buf[i + 1] || 0) << 16) | b.buf[i]) >>> 0);
            }
            return res;
        }
        pxtc.processorInlineAssemble = processorInlineAssemble;
        function mkProcessorFile(nativeType) {
            var processor = null;
            if (nativeType == "AVR")
                processor = new pxtc.avr.AVRProcessor();
            else
                processor = new pxtc.thumb.ThumbProcessor();
            processor.testAssembler(); // just in case
            var b = new pxtc.assembler.File(processor);
            b.lookupExternalLabel = hex.lookupFunctionAddr;
            b.normalizeExternalLabel = function (s) {
                var inf = hex.lookupFunc(s);
                if (inf)
                    return inf.name;
                return s;
            };
            // b.throwOnError = true;
            return b;
        }
        function throwAssemblerErrors(b) {
            if (b.errors.length > 0) {
                var userErrors_1 = "";
                b.errors.forEach(function (e) {
                    var m = /^user(\d+)/.exec(e.scope);
                    if (m) {
                        // This generally shouldn't happen, but it may for certin kind of global 
                        // errors - jump range and label redefinitions
                        var no = parseInt(m[1]); // TODO lookup assembly file name
                        userErrors_1 += pxtc.U.lf("At inline assembly:\n");
                        userErrors_1 += e.message;
                    }
                });
                if (userErrors_1) {
                    //TODO
                    console.log(pxtc.U.lf("errors in inline assembly"));
                    console.log(userErrors_1);
                    throw new Error(b.errors[0].message);
                }
                else {
                    throw new Error(b.errors[0].message);
                }
            }
        }
        var peepDbg = false;
        function assemble(nativeType, bin, src) {
            var b = mkProcessorFile(nativeType);
            b.emit(src);
            src = b.getSource(!peepDbg);
            throwAssemblerErrors(b);
            return {
                src: src,
                buf: b.buf,
                thumbFile: b
            };
        }
        function addSource(meta, binstring) {
            var metablob = pxtc.Util.toUTF8(meta);
            var totallen = metablob.length + binstring.length;
            if (totallen > 40000) {
                return "; program too long\n";
            }
            var str = "\n    .balign 16\n    .hex 41140E2FB82FA2BB\n    .short " + metablob.length + "\n    .short " + binstring.length + "\n    .short 0, 0   ; future use\n\n_stored_program: .string \"";
            var addblob = function (b) {
                for (var i = 0; i < b.length; ++i) {
                    var v = b.charCodeAt(i) & 0xff;
                    if (v <= 0xf)
                        str += "\\x0" + v.toString(16);
                    else
                        str += "\\x" + v.toString(16);
                }
            };
            addblob(metablob);
            addblob(binstring);
            str += "\"\n";
            return str;
        }
        function processorEmit(bin, opts, cres) {
            var src = serialize(bin, opts);
            src = patchSrcHash(bin, src);
            if (opts.embedBlob)
                src += addSource(opts.embedMeta, pxtc.decodeBase64(opts.embedBlob));
            var checksumWords = 8;
            var pageSize = hex.flashCodeAlign(opts.target);
            if (opts.target.flashChecksumAddr) {
                var k = 0;
                while (pageSize > (1 << k))
                    k++;
                var endMarker = parseInt(bin.sourceHash.slice(0, 8), 16);
                var progStart = hex.bytecodeStartAddrPadded / pageSize;
                endMarker = (endMarker & 0xffffff00) | k;
                var templBeg = 0;
                var templSize = progStart;
                // we exclude the checksum block from the template
                if (opts.target.flashChecksumAddr < hex.bytecodeStartAddrPadded) {
                    templBeg = Math.ceil((opts.target.flashChecksumAddr + 32) / pageSize);
                    templSize -= templBeg;
                }
                src += "\n    .balign 4\n__end_marker:\n    .word " + endMarker + "\n\n; ------- this will get removed from the final binary ------\n__flash_checksums:\n    .word 0x87eeb07c ; magic\n    .word __end_marker ; end marker position\n    .word " + endMarker + " ; end marker\n    ; template region\n    .short " + templBeg + ", " + templSize + "\n    .word 0x" + hex.hexTemplateHash().slice(0, 8) + "\n    ; user region\n    .short " + progStart + ", 0xffff\n    .word 0x" + bin.sourceHash.slice(0, 8) + "\n    .word 0x0 ; terminator\n";
            }
            bin.writeFile(pxtc.BINARY_ASM, src);
            var res = assemble(opts.target.nativeType, bin, src);
            if (res.src)
                bin.writeFile(pxtc.BINARY_ASM, res.src);
            if (res.buf) {
                if (opts.target.flashChecksumAddr) {
                    var pos = res.thumbFile.lookupLabel("__flash_checksums") / 2;
                    pxtc.U.assert(pos == res.buf.length - checksumWords * 2);
                    var chk = res.buf.slice(res.buf.length - checksumWords * 2);
                    res.buf.splice(res.buf.length - checksumWords * 2, checksumWords * 2);
                    var len = Math.ceil(res.buf.length * 2 / pageSize);
                    chk[chk.length - 5] = len;
                    bin.checksumBlock = chk;
                }
                if (opts.target.useUF2) {
                    var myhex = btoa(hex.patchHex(bin, res.buf, false, true)[0]);
                    bin.writeFile(pxtc.BINARY_UF2, myhex);
                }
                else {
                    var myhex = hex.patchHex(bin, res.buf, false, false).join("\r\n") + "\r\n";
                    bin.writeFile(pxtc.BINARY_HEX, myhex);
                }
            }
            for (var _i = 0, _a = cres.breakpoints; _i < _a.length; _i++) {
                var bkpt = _a[_i];
                var lbl = pxtc.U.lookup(res.thumbFile.getLabels(), "__brkp_" + bkpt.id);
                if (lbl != null)
                    bkpt.binAddr = lbl;
            }
            for (var _b = 0, _c = bin.procs; _b < _c.length; _b++) {
                var proc = _c[_b];
                proc.fillDebugInfo(res.thumbFile);
            }
            cres.procDebugInfo = bin.procs.map(function (p) { return p.debugInfo; });
        }
        pxtc.processorEmit = processorEmit;
        pxtc.validateShim = hex.validateShim;
    })(pxtc = ts.pxtc || (ts.pxtc = {}));
})(ts || (ts = {}));
var ts;
(function (ts) {
    var pxtc;
    (function (pxtc) {
        var reportDiagnostic = reportDiagnosticSimply;
        function reportDiagnostics(diagnostics, host) {
            for (var _i = 0, diagnostics_1 = diagnostics; _i < diagnostics_1.length; _i++) {
                var diagnostic = diagnostics_1[_i];
                reportDiagnostic(diagnostic, host);
            }
        }
        function reportDiagnosticSimply(diagnostic, host) {
            var output = "";
            if (diagnostic.file) {
                var _a = ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start), line = _a.line, character = _a.character;
                var relativeFileName = diagnostic.file.fileName;
                output += relativeFileName + "(" + (line + 1) + "," + (character + 1) + "): ";
            }
            var category = ts.DiagnosticCategory[diagnostic.category].toLowerCase();
            output += category + " TS" + diagnostic.code + ": " + ts.flattenDiagnosticMessageText(diagnostic.messageText, ts.sys.newLine) + ts.sys.newLine;
            ts.sys.write(output);
        }
        function plainTsc(dir) {
            var commandLine = ts.parseCommandLine([]);
            var configFileName = ts.findConfigFile(dir, ts.sys.fileExists);
            return performCompilation();
            function parseConfigFile() {
                var cachedConfigFileText = ts.sys.readFile(configFileName);
                var result = ts.parseConfigFileTextToJson(configFileName, cachedConfigFileText);
                var configObject = result.config;
                if (!configObject) {
                    reportDiagnostics([result.error], /* compilerHost */ undefined);
                    ts.sys.exit(ts.ExitStatus.DiagnosticsPresent_OutputsSkipped);
                    return;
                }
                var configParseResult = ts.parseJsonConfigFileContent(configObject, ts.sys, dir, commandLine.options, configFileName);
                if (configParseResult.errors.length > 0) {
                    reportDiagnostics(configParseResult.errors, /* compilerHost */ undefined);
                    ts.sys.exit(ts.ExitStatus.DiagnosticsPresent_OutputsSkipped);
                    return;
                }
                return configParseResult;
            }
            function performCompilation() {
                var configParseResult = parseConfigFile();
                var compilerHost = ts.createCompilerHost(configParseResult.options);
                compilerHost.getDefaultLibFileName = function () { return "node_modules/typescript/lib/lib.d.ts"; };
                return compile(configParseResult.fileNames, configParseResult.options, compilerHost);
            }
        }
        pxtc.plainTsc = plainTsc;
        function compile(fileNames, compilerOptions, compilerHost) {
            var program = ts.createProgram(fileNames, compilerOptions, compilerHost);
            compileProgram();
            return program;
            function compileProgram() {
                var diagnostics = program.getSyntacticDiagnostics();
                if (diagnostics.length === 0) {
                    diagnostics = program.getOptionsDiagnostics().concat(program.getGlobalDiagnostics());
                    if (diagnostics.length === 0) {
                        diagnostics = program.getSemanticDiagnostics();
                    }
                }
                reportDiagnostics(diagnostics, compilerHost);
                //const emitOutput = program.emit();
                //diagnostics = diagnostics.concat(emitOutput.diagnostics);
            }
        }
    })(pxtc = ts.pxtc || (ts.pxtc = {}));
})(ts || (ts = {}));
/// <reference path="../../typings/globals/fusejs/index.d.ts" />
var ts;
(function (ts) {
    var pxtc;
    (function (pxtc) {
        (function (SymbolKind) {
            SymbolKind[SymbolKind["None"] = 0] = "None";
            SymbolKind[SymbolKind["Method"] = 1] = "Method";
            SymbolKind[SymbolKind["Property"] = 2] = "Property";
            SymbolKind[SymbolKind["Function"] = 3] = "Function";
            SymbolKind[SymbolKind["Variable"] = 4] = "Variable";
            SymbolKind[SymbolKind["Module"] = 5] = "Module";
            SymbolKind[SymbolKind["Enum"] = 6] = "Enum";
            SymbolKind[SymbolKind["EnumMember"] = 7] = "EnumMember";
            SymbolKind[SymbolKind["Class"] = 8] = "Class";
            SymbolKind[SymbolKind["Interface"] = 9] = "Interface";
        })(pxtc.SymbolKind || (pxtc.SymbolKind = {}));
        var SymbolKind = pxtc.SymbolKind;
        pxtc.placeholderChar = "◊";
        pxtc.defaultImgLit = "\n. . . . .\n. . . . .\n. . # . .\n. . . . .\n. . . . .\n";
        function localizeApisAsync(apis, mainPkg) {
            var lang = pxtc.Util.userLanguage();
            if (pxtc.Util.userLanguage() == "en")
                return Promise.resolve(apis);
            return mainPkg.localizationStringsAsync(lang)
                .then(function (loc) { return pxtc.Util.values(apis.byQName).forEach(function (fn) {
                var jsDoc = loc[fn.qName];
                if (jsDoc) {
                    fn.attributes.jsDoc = jsDoc;
                    if (fn.parameters)
                        fn.parameters.forEach(function (pi) { return pi.description = loc[(fn.qName + "|param|" + pi.name)] || pi.description; });
                }
                if (fn.attributes.block) {
                    var locBlock = loc[(fn.qName + "|block")];
                    if (locBlock) {
                        fn.attributes.block = locBlock;
                    }
                }
                var nsDoc = loc['{id:category}' + pxtc.Util.capitalize(fn.qName)];
                if (nsDoc) {
                    fn.attributes.block = nsDoc;
                }
            }); })
                .then(function () { return apis; });
        }
        pxtc.localizeApisAsync = localizeApisAsync;
        /**
         * Unlocalized category name for a symbol
         */
        function blocksCategory(si) {
            var n = !si ? undefined : (si.attributes.blockNamespace || si.namespace);
            return n ? pxtc.Util.capitalize(n.split('.')[0]) : undefined;
        }
        pxtc.blocksCategory = blocksCategory;
        function renderDefaultVal(apis, p, imgLit, cursorMarker) {
            if (p.initializer)
                return p.initializer;
            if (p.defaults)
                return p.defaults[0];
            if (p.type == "number")
                return "0";
            if (p.type == "boolean")
                return "false";
            else if (p.type == "string") {
                if (imgLit) {
                    imgLit = false;
                    return "`" + pxtc.defaultImgLit + cursorMarker + "`";
                }
                return "\"" + cursorMarker + "\"";
            }
            var si = apis ? pxtc.Util.lookup(apis.byQName, p.type) : undefined;
            if (si && si.kind == SymbolKind.Enum) {
                var en = pxtc.Util.values(apis.byQName).filter(function (e) { return e.namespace == p.type; })[0];
                if (en)
                    return en.namespace + "." + en.name;
            }
            var m = /^\((.*)\) => (.*)$/.exec(p.type);
            if (m)
                return "(" + m[1] + ") => {\n    " + cursorMarker + "\n}";
            return pxtc.placeholderChar;
        }
        function renderCall(apiInfo, si) {
            return si.namespace + "." + si.name + renderParameters(apiInfo, si) + ";";
        }
        pxtc.renderCall = renderCall;
        function renderParameters(apis, si, cursorMarker) {
            if (cursorMarker === void 0) { cursorMarker = ''; }
            if (si.parameters) {
                var imgLit_1 = !!si.attributes.imageLiteral;
                return "(" + si.parameters
                    .filter(function (p) { return !p.initializer; })
                    .map(function (p) { return renderDefaultVal(apis, p, imgLit_1, cursorMarker); }).join(", ") + ")";
            }
            return '';
        }
        pxtc.renderParameters = renderParameters;
        function getSymbolKind(node) {
            switch (node.kind) {
                case pxtc.SK.MethodDeclaration:
                case pxtc.SK.MethodSignature:
                    return SymbolKind.Method;
                case pxtc.SK.PropertyDeclaration:
                case pxtc.SK.PropertySignature:
                    return SymbolKind.Property;
                case pxtc.SK.FunctionDeclaration:
                    return SymbolKind.Function;
                case pxtc.SK.VariableDeclaration:
                    return SymbolKind.Variable;
                case pxtc.SK.ModuleDeclaration:
                    return SymbolKind.Module;
                case pxtc.SK.EnumDeclaration:
                    return SymbolKind.Enum;
                case pxtc.SK.EnumMember:
                    return SymbolKind.EnumMember;
                case pxtc.SK.ClassDeclaration:
                    return SymbolKind.Class;
                case pxtc.SK.InterfaceDeclaration:
                    return SymbolKind.Interface;
                default:
                    return SymbolKind.None;
            }
        }
        function isExported(decl) {
            if (decl.modifiers && decl.modifiers.some(function (m) { return m.kind == pxtc.SK.PrivateKeyword || m.kind == pxtc.SK.ProtectedKeyword; }))
                return false;
            var symbol = decl.symbol;
            if (!symbol)
                return false;
            while (true) {
                var parSymbol = symbol.parent;
                if (parSymbol)
                    symbol = parSymbol;
                else
                    break;
            }
            var topDecl = symbol.valueDeclaration || symbol.declarations[0];
            if (topDecl.kind == pxtc.SK.VariableDeclaration)
                topDecl = topDecl.parent.parent;
            if (topDecl.parent && topDecl.parent.kind == pxtc.SK.SourceFile)
                return true;
            else
                return false;
        }
        function isInKsModule(decl) {
            while (decl) {
                if (decl.kind == pxtc.SK.SourceFile) {
                    var src = decl;
                    return src.fileName.indexOf("pxt_modules") >= 0;
                }
                decl = decl.parent;
            }
            return false;
        }
        function createSymbolInfo(typechecker, qName, stmt) {
            function typeOf(tn, n, stripParams) {
                if (stripParams === void 0) { stripParams = false; }
                var t = typechecker.getTypeAtLocation(n);
                if (!t)
                    return "None";
                if (stripParams) {
                    t = t.getCallSignatures()[0].getReturnType();
                }
                return typechecker.typeToString(t, null, ts.TypeFormatFlags.UseFullyQualifiedType);
            }
            var kind = getSymbolKind(stmt);
            if (kind != SymbolKind.None) {
                var decl = stmt;
                var attributes_1 = pxtc.parseComments(decl);
                if (attributes_1.weight < 0)
                    return null;
                var m = /^(.*)\.(.*)/.exec(qName);
                var hasParams = kind == SymbolKind.Function || kind == SymbolKind.Method;
                var pkg = null;
                var src = ts.getSourceFileOfNode(stmt);
                if (src) {
                    var m_4 = /^pxt_modules\/([^\/]+)/.exec(src.fileName);
                    if (m_4)
                        pkg = m_4[1];
                }
                var extendsTypes = undefined;
                if (kind == SymbolKind.Class || kind == SymbolKind.Interface) {
                    var cl = stmt;
                    extendsTypes = [];
                    if (cl.heritageClauses)
                        for (var _i = 0, _a = cl.heritageClauses; _i < _a.length; _i++) {
                            var h = _a[_i];
                            if (h.types) {
                                for (var _b = 0, _c = h.types; _b < _c.length; _b++) {
                                    var t = _c[_b];
                                    extendsTypes.push(typeOf(t, t));
                                }
                            }
                        }
                }
                return {
                    kind: kind,
                    namespace: m ? m[1] : "",
                    name: m ? m[2] : qName,
                    attributes: attributes_1,
                    pkg: pkg,
                    extendsTypes: extendsTypes,
                    retType: kind == SymbolKind.Module ? "" : typeOf(decl.type, decl, hasParams),
                    parameters: !hasParams ? null : (decl.parameters || []).map(function (p) {
                        var n = pxtc.getName(p);
                        var desc = attributes_1.paramHelp[n] || "";
                        var minVal = attributes_1.paramMin ? attributes_1.paramMin[n] : undefined;
                        var maxVal = attributes_1.paramMax ? attributes_1.paramMax[n] : undefined;
                        var m = /\beg\.?:\s*(.+)/.exec(desc);
                        var props;
                        if (attributes_1.mutate && p.type.kind === pxtc.SK.FunctionType) {
                            var callBackSignature = typechecker.getSignatureFromDeclaration(p.type);
                            var callbackParameters_1 = callBackSignature.getParameters();
                            pxtc.assert(callbackParameters_1.length > 0);
                            props = typechecker.getTypeAtLocation(callbackParameters_1[0].valueDeclaration).getProperties().map(function (prop) {
                                return { name: prop.getName(), type: typechecker.typeToString(typechecker.getTypeOfSymbolAtLocation(prop, callbackParameters_1[0].valueDeclaration)) };
                            });
                        }
                        var options = {};
                        if (minVal)
                            options['min'] = { value: minVal };
                        if (maxVal)
                            options['max'] = { value: maxVal };
                        return {
                            name: n,
                            description: desc,
                            type: typeOf(p.type, p),
                            initializer: p.initializer ? p.initializer.getText() : attributes_1.paramDefl[n],
                            defaults: m && m[1].trim() ? m[1].split(/,\s*/).map(function (e) { return e.trim(); }) : undefined,
                            properties: props,
                            options: options
                        };
                    })
                };
            }
            return null;
        }
        function getBlocksInfo(info) {
            var blocks = pxtc.Util.values(info.byQName)
                .filter(function (s) { return !!s.attributes.block && !!s.attributes.blockId && (s.kind != pxtc.SymbolKind.EnumMember); });
            return {
                apis: info,
                blocks: blocks,
                blocksById: pxt.Util.toDictionary(blocks, function (b) { return b.attributes.blockId; })
            };
        }
        pxtc.getBlocksInfo = getBlocksInfo;
        function genMarkdown(pkg, apiInfo, options) {
            if (options === void 0) { options = {}; }
            var files = {};
            var infos = pxtc.Util.values(apiInfo.byQName);
            var namespaces = infos.filter(function (si) { return si.kind == SymbolKind.Module; }).sort(compareSymbol);
            var enumMembers = infos.filter(function (si) { return si.kind == SymbolKind.EnumMember; }).sort(compareSymbol);
            var calls = {};
            infos.filter(function (si) { return !!si.qName; }).forEach(function (si) { return calls[si.qName] = renderCall(apiInfo, si); });
            var locStrings = {};
            var jsdocStrings = {};
            var helpPages = {};
            var reference = "";
            var nameToFilename = function (n) { return n.replace(/([A-Z])/g, function (m) { return '-' + m.toLowerCase(); }); };
            var writeRef = function (s) { return reference += s + "\n"; };
            var writeLoc = function (si) {
                if (!options.locs || !si.qName) {
                    return;
                }
                // must match blockly loader
                var ns = ts.pxtc.blocksCategory(si);
                if (ns)
                    locStrings[("{id:category}" + ns)] = ns;
                if (si.attributes.jsDoc)
                    jsdocStrings[si.qName] = si.attributes.jsDoc;
                if (si.attributes.block)
                    locStrings[(si.qName + "|block")] = si.attributes.block;
                if (si.parameters)
                    si.parameters.filter(function (pi) { return !!pi.description; }).forEach(function (pi) {
                        jsdocStrings[(si.qName + "|param|" + pi.name)] = pi.description;
                    });
            };
            var sipkg = pkg && pkg != "core" ? "```package\n" + pkg + "\n```\n" : '';
            var writeApi = function (ns, si, call) {
                if (!options.docs || !si.qName)
                    return;
                var api = "# " + si.name.replace(/[A-Z]/g, function (m) { return ' ' + m; }) + "\n\n" + si.attributes.jsDoc.split(/\n\./)[0] + "\n\n```sig\n" + call + "\n```\n\n## Parameters\n" + (si.parameters || []).map(function (p) { return ("\n* **" + p.name + "**: [" + p.type + "](/reference/blocks/" + p.type + "), " + p.description); }) + "\n\n## Example\n\n```blocks\n" + call + "\n```\n\n## See Also\n\n" + (ns.namespace ? "[" + ns.namespace + "](/reference/" + nameToFilename(ns.namespace) + ")" : "") + "\n" + sipkg + "\n";
                files[("reference/" + nameToFilename(ns.name) + "/" + nameToFilename(si.name) + ".md")] = api;
            };
            var mapLocs = function (m, name) {
                if (!options.locs)
                    return;
                var locs = {};
                Object.keys(m).sort().forEach(function (l) { return locs[l] = m[l]; });
                files[pkg + name + "-strings.json"] = JSON.stringify(locs, null, 2);
            };
            var writePackage = function (w) {
                if (options.package) {
                    w("");
                    w("```package");
                    w(pkg);
                    w("```");
                }
            };
            var writeHelpPages = function (h, w) {
                w("");
                w("### See Also");
                w("");
                w(Object.keys(h).map(function (k) { return ("[" + k + "](/reference/" + h[k] + ")"); }).join(', '));
            };
            writeRef("# " + pkg + " Reference");
            writeRef('');
            writeRef('```namespaces');
            var _loop_8 = function(ns) {
                var nsHelpPages = {};
                var syms = infos
                    .filter(function (si) { return si.namespace == ns.name && !!si.attributes.jsDoc; })
                    .sort(compareSymbol);
                if (!syms.length)
                    return "continue";
                if (!ns.attributes.block)
                    ns.attributes.block = ns.name; // reusing this field to store localized namespace name
                writeLoc(ns);
                helpPages[ns.name] = ns.name.replace("s+", "-");
                var nsmd = "";
                var writeNs = function (s) {
                    nsmd += s + "\n";
                };
                writeNs("# " + capitalize(ns.name));
                writeNs('');
                if (ns.attributes.jsDoc) {
                    writeNs("" + ns.attributes.jsDoc);
                    writeNs('');
                }
                writeNs('```cards');
                syms.forEach(function (si, i) {
                    writeLoc(si);
                    if (si.attributes.help)
                        nsHelpPages[si.name] = si.attributes.help;
                    var call = calls[si.qName];
                    if (i == 0)
                        writeRef(call);
                    writeNs(call);
                    if (!si.attributes.help)
                        writeApi(ns, si, call);
                });
                writeNs('```');
                writePackage(writeNs);
                writeHelpPages(nsHelpPages, writeNs);
                if (options.docs)
                    files["reference/" + nameToFilename(ns.name) + '.md'] = nsmd;
            };
            for (var _i = 0, namespaces_1 = namespaces; _i < namespaces_1.length; _i++) {
                var ns = namespaces_1[_i];
                var state_8 = _loop_8(ns);
                if (state_8 === "continue") continue;
            }
            if (options.locs)
                enumMembers.forEach(function (em) {
                    if (em.attributes.block)
                        locStrings[(em.qName + "|block")] = em.attributes.block;
                    if (em.attributes.jsDoc)
                        locStrings[em.qName] = em.attributes.jsDoc;
                });
            writeRef('```');
            writePackage(writeRef);
            writeHelpPages(helpPages, writeRef);
            if (options.docs)
                files[pkg + "-reference.md"] = reference;
            mapLocs(locStrings, "");
            mapLocs(jsdocStrings, "-jsdoc");
            return files;
            function hasBlock(sym) {
                return !!sym.attributes.block && !!sym.attributes.blockId;
            }
            function capitalize(name) {
                return name[0].toUpperCase() + name.slice(1);
            }
            function urlify(name) {
                return name.replace(/[A-Z]/g, '-$&').toLowerCase();
            }
            function compareSymbol(l, r) {
                var c = -(hasBlock(l) ? 1 : -1) + (hasBlock(r) ? 1 : -1);
                if (c)
                    return c;
                c = -(l.attributes.weight || 50) + (r.attributes.weight || 50);
                if (c)
                    return c;
                return pxtc.U.strcmp(l.name, r.name);
            }
        }
        pxtc.genMarkdown = genMarkdown;
        function getApiInfo(program, legacyOnly) {
            if (legacyOnly === void 0) { legacyOnly = false; }
            var res = {
                byQName: {}
            };
            var typechecker = program.getTypeChecker();
            var collectDecls = function (stmt) {
                if (stmt.kind == pxtc.SK.VariableStatement) {
                    var vs = stmt;
                    vs.declarationList.declarations.forEach(collectDecls);
                    return;
                }
                // if (!isExported(stmt as Declaration)) return; ?
                if (isExported(stmt)) {
                    if (!stmt.symbol) {
                        console.warn("no symbol", stmt);
                        return;
                    }
                    var qName = getFullName(typechecker, stmt.symbol);
                    var si_1 = createSymbolInfo(typechecker, qName, stmt);
                    if (si_1) {
                        var existing = pxtc.U.lookup(res.byQName, qName);
                        if (existing) {
                            si_1.attributes = pxtc.parseCommentString(existing.attributes._source + "\n" +
                                si_1.attributes._source);
                            if (existing.extendsTypes) {
                                si_1.extendsTypes = si_1.extendsTypes || [];
                                existing.extendsTypes.forEach(function (t) {
                                    if (si_1.extendsTypes.indexOf(t) === -1) {
                                        si_1.extendsTypes.push(t);
                                    }
                                });
                            }
                        }
                        res.byQName[qName] = si_1;
                    }
                }
                if (stmt.kind == pxtc.SK.ModuleDeclaration) {
                    var mod = stmt;
                    if (mod.body.kind == pxtc.SK.ModuleBlock) {
                        var blk = mod.body;
                        blk.statements.forEach(collectDecls);
                    }
                }
                else if (stmt.kind == pxtc.SK.InterfaceDeclaration) {
                    var iface = stmt;
                    iface.members.forEach(collectDecls);
                }
                else if (stmt.kind == pxtc.SK.ClassDeclaration) {
                    var iface = stmt;
                    iface.members.forEach(collectDecls);
                }
                else if (stmt.kind == pxtc.SK.EnumDeclaration) {
                    var e = stmt;
                    e.members.forEach(collectDecls);
                }
            };
            for (var _i = 0, _a = program.getSourceFiles(); _i < _a.length; _i++) {
                var srcFile = _a[_i];
                srcFile.statements.forEach(collectDecls);
            }
            var toclose = [];
            // store qName in symbols
            for (var qName in res.byQName) {
                var si = res.byQName[qName];
                si.qName = qName;
                si.attributes._source = null;
                if (si.extendsTypes && si.extendsTypes.length)
                    toclose.push(si);
            }
            // transitive closure of inheritance
            var closed = {};
            var closeSi = function (si) {
                if (pxtc.U.lookup(closed, si.qName))
                    return;
                closed[si.qName] = true;
                var mine = {};
                mine[si.qName] = true;
                for (var _i = 0, _a = si.extendsTypes || []; _i < _a.length; _i++) {
                    var e = _a[_i];
                    mine[e] = true;
                    var psi = res.byQName[e];
                    if (psi) {
                        closeSi(psi);
                        for (var _b = 0, _c = psi.extendsTypes; _b < _c.length; _b++) {
                            var ee = _c[_b];
                            mine[ee] = true;
                        }
                    }
                }
                si.extendsTypes = Object.keys(mine);
            };
            toclose.forEach(closeSi);
            if (legacyOnly) {
                // conflicts with pins.map()
                delete res.byQName["Array.map"];
            }
            return res;
        }
        pxtc.getApiInfo = getApiInfo;
        function getFullName(typechecker, symbol) {
            return typechecker.getFullyQualifiedName(symbol);
        }
        pxtc.getFullName = getFullName;
        function fillCompletionEntries(program, symbols, r, apiInfo) {
            var typechecker = program.getTypeChecker();
            for (var _i = 0, symbols_1 = symbols; _i < symbols_1.length; _i++) {
                var s = symbols_1[_i];
                var qName = getFullName(typechecker, s);
                if (!r.isMemberCompletion && pxtc.Util.lookup(apiInfo.byQName, qName))
                    continue; // global symbol
                if (pxtc.Util.lookup(r.entries, qName))
                    continue;
                var decl = s.valueDeclaration || (s.declarations || [])[0];
                if (!decl)
                    continue;
                var si = createSymbolInfo(typechecker, qName, decl);
                if (!si)
                    continue;
                si.isContextual = true;
                //let tmp = ts.getLocalSymbolForExportDefault(s)
                //let name = typechecker.symbolToString(tmp || s)
                r.entries[qName] = si;
            }
        }
        pxtc.fillCompletionEntries = fillCompletionEntries;
    })(pxtc = ts.pxtc || (ts.pxtc = {}));
})(ts || (ts = {}));
var ts;
(function (ts) {
    var pxtc;
    (function (pxtc) {
        var service;
        (function (service_1) {
            var emptyOptions = {
                fileSystem: {},
                sourceFiles: [],
                target: { isNative: false, hasHex: false },
                hexinfo: null
            };
            var Host = (function () {
                function Host() {
                    this.opts = emptyOptions;
                    this.fileVersions = {};
                    this.projectVer = 0;
                }
                Host.prototype.getProjectVersion = function () {
                    return this.projectVer + "";
                };
                Host.prototype.setFile = function (fn, cont) {
                    if (this.opts.fileSystem[fn] != cont) {
                        this.fileVersions[fn] = (this.fileVersions[fn] || 0) + 1;
                        this.opts.fileSystem[fn] = cont;
                        this.projectVer++;
                    }
                };
                Host.prototype.setOpts = function (o) {
                    var _this = this;
                    pxtc.Util.iterMap(o.fileSystem, function (fn, v) {
                        if (_this.opts.fileSystem[fn] != v) {
                            _this.fileVersions[fn] = (_this.fileVersions[fn] || 0) + 1;
                        }
                    });
                    this.opts = o;
                    this.projectVer++;
                };
                Host.prototype.getCompilationSettings = function () {
                    return pxtc.getTsCompilerOptions(this.opts);
                };
                Host.prototype.getScriptFileNames = function () {
                    return this.opts.sourceFiles.filter(function (f) { return pxtc.U.endsWith(f, ".ts"); });
                };
                Host.prototype.getScriptVersion = function (fileName) {
                    return (this.fileVersions[fileName] || 0).toString();
                };
                Host.prototype.getScriptSnapshot = function (fileName) {
                    var f = this.opts.fileSystem[fileName];
                    if (f)
                        return ts.ScriptSnapshot.fromString(f);
                    else
                        return null;
                };
                Host.prototype.getNewLine = function () { return "\n"; };
                Host.prototype.getCurrentDirectory = function () { return "."; };
                Host.prototype.getDefaultLibFileName = function (options) { return null; };
                Host.prototype.log = function (s) { console.log("LOG", s); };
                Host.prototype.trace = function (s) { console.log("TRACE", s); };
                Host.prototype.error = function (s) { console.error("ERROR", s); };
                Host.prototype.useCaseSensitiveFileNames = function () { return true; };
                return Host;
            }());
            var service;
            var host;
            var lastApiInfo;
            var lastBlocksInfo;
            var lastFuse;
            var builtinItems;
            var tbSubset;
            function fileDiags(fn) {
                if (!/\.ts$/.test(fn))
                    return [];
                var d = service.getSyntacticDiagnostics(fn);
                if (!d || !d.length)
                    d = service.getSemanticDiagnostics(fn);
                if (!d)
                    d = [];
                return d;
            }
            var blocksInfoOp = function () { return lastBlocksInfo || (lastBlocksInfo = pxtc.getBlocksInfo(lastApiInfo)); };
            var operations = {
                reset: function () {
                    service.cleanupSemanticCache();
                    host.setOpts(emptyOptions);
                },
                setOptions: function (v) {
                    host.setOpts(v.options);
                },
                getCompletions: function (v) {
                    if (v.fileContent) {
                        host.setFile(v.fileName, v.fileContent);
                    }
                    var program = service.getProgram(); // this synchornizes host data as well
                    var data = service.getCompletionData(v.fileName, v.position);
                    if (!data)
                        return {};
                    var typechecker = program.getTypeChecker();
                    var r = {
                        entries: {},
                        isMemberCompletion: data.isMemberCompletion,
                        isNewIdentifierLocation: data.isNewIdentifierLocation,
                        isTypeLocation: false // TODO
                    };
                    pxtc.fillCompletionEntries(program, data.symbols, r, lastApiInfo);
                    return r;
                },
                compile: function (v) {
                    return pxtc.compile(v.options);
                },
                decompile: function (v) {
                    return pxtc.decompile(v.options, v.fileName);
                },
                assemble: function (v) {
                    return {
                        words: pxtc.processorInlineAssemble(host.opts.target.nativeType, v.fileContent)
                    };
                },
                fileDiags: function (v) { return pxtc.patchUpDiagnostics(fileDiags(v.fileName)); },
                allDiags: function () {
                    var global = service.getCompilerOptionsDiagnostics() || [];
                    var byFile = host.getScriptFileNames().map(fileDiags);
                    var allD = global.concat(pxtc.Util.concat(byFile));
                    if (allD.length == 0) {
                        var res = {
                            outfiles: {},
                            diagnostics: [],
                            success: true,
                            times: {}
                        };
                        var binOutput = pxtc.compileBinary(service.getProgram(), null, host.opts, res);
                        allD = binOutput.diagnostics;
                    }
                    return pxtc.patchUpDiagnostics(allD);
                },
                apiInfo: function () {
                    lastBlocksInfo = undefined;
                    lastFuse = undefined;
                    return lastApiInfo = pxtc.getApiInfo(service.getProgram());
                },
                blocksInfo: blocksInfoOp,
                apiSearch: function (v) {
                    var SEARCH_RESULT_COUNT = 7;
                    var search = v.search;
                    var blockInfo = blocksInfoOp(); // cache
                    if (!builtinItems) {
                        builtinItems = [];
                        var helpResources = pxt.blocks.helpResources();
                        var _loop_9 = function(id) {
                            var helpItem = helpResources[id];
                            if (helpItem.operators) {
                                var _loop_10 = function(op) {
                                    var opValues = helpItem.operators[op];
                                    opValues.forEach(function (v) { return builtinItems.push({
                                        id: id,
                                        name: helpItem.name,
                                        jsdoc: helpItem.tooltip,
                                        block: v,
                                        field: [op, v]
                                    }); });
                                };
                                for (var op in helpItem.operators) {
                                    _loop_10(op);
                                }
                            }
                            else {
                                builtinItems.push({
                                    id: id,
                                    name: helpItem.name,
                                    jsdoc: helpItem.tooltip
                                });
                            }
                        };
                        for (var id in helpResources) {
                            _loop_9(id);
                        }
                    }
                    var subset;
                    var fnweight = function (fn) {
                        var fnw = fn.attributes.weight || 50;
                        var nsInfo = blockInfo.apis.byQName[fn.namespace];
                        var nsw = nsInfo ? (nsInfo.attributes.weight || 50) : 50;
                        var ad = (nsInfo ? nsInfo.attributes.advanced : false) || fn.attributes.advanced;
                        var weight = (nsw * 1000 + fnw) * (ad ? 1 : 1e6);
                        return weight;
                    };
                    if (!lastFuse) {
                        var blockInfo_1 = blocksInfoOp(); // cache
                        var weights_1 = {};
                        var builtinSearchSet = void 0;
                        if (search.subset) {
                            tbSubset = search.subset;
                            builtinSearchSet = builtinItems.filter(function (s) { return tbSubset[s.id]; });
                        }
                        if (tbSubset) {
                            subset = blockInfo_1.blocks.filter(function (s) { return tbSubset[s.attributes.blockId]; });
                        }
                        else {
                            subset = blockInfo_1.blocks;
                            builtinSearchSet = builtinItems;
                        }
                        var searchSet = subset.map(function (s) {
                            return {
                                id: s.attributes.blockId,
                                qName: s.qName,
                                name: s.name,
                                nameSpace: s.namespace,
                                block: s.attributes.block,
                                jsDoc: s.attributes.jsDoc
                            };
                        });
                        var mw_1 = 0;
                        subset.forEach(function (b) {
                            var w = weights_1[b.qName] = fnweight(b);
                            mw_1 = Math.max(mw_1, w);
                        });
                        searchSet = searchSet.concat(builtinSearchSet);
                        var fuseOptions = {
                            shouldSort: true,
                            threshold: 0.6,
                            location: 0,
                            distance: 100,
                            maxPatternLength: 16,
                            minMatchCharLength: 2,
                            findAllMatches: false,
                            caseSensitive: false,
                            keys: [
                                { name: 'name', weight: 0.5 },
                                { name: 'namespace', weight: 0.3 },
                                { name: 'block', weight: 0.7 },
                                { name: 'jsDoc', weight: 0.1 }
                            ],
                            sortFn: function (a, b) {
                                var wa = a.qName ? 1 - weights_1[a.item.qName] / mw_1 : 1;
                                var wb = b.qName ? 1 - weights_1[b.item.qName] / mw_1 : 1;
                                // allow 10% wiggle room for weights
                                return a.score * (1 + wa / 10) - b.score * (1 + wb / 10);
                            }
                        };
                        lastFuse = new Fuse(searchSet, fuseOptions);
                    }
                    var fns = lastFuse.search(search.term)
                        .slice(0, SEARCH_RESULT_COUNT);
                    return fns;
                }
            };
            function performOperation(op, arg) {
                init();
                var res = null;
                if (operations.hasOwnProperty(op)) {
                    try {
                        res = operations[op](arg) || {};
                    }
                    catch (e) {
                        res = {
                            errorMessage: e.stack
                        };
                    }
                }
                else {
                    res = {
                        errorMessage: "No such operation: " + op
                    };
                }
                return res;
            }
            service_1.performOperation = performOperation;
            function init() {
                if (!service) {
                    host = new Host();
                    service = ts.createLanguageService(host);
                }
            }
        })(service = pxtc.service || (pxtc.service = {}));
    })(pxtc = ts.pxtc || (ts.pxtc = {}));
})(ts || (ts = {}));
