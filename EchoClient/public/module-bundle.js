(function (g, f) {
    function define(d, f) {
        typeof document !== 'undefined' && (document.currentScript.module = {});
        f(document.currentScript.module, ...d.filter((d) => d !== 'exports').map(window.app));
    }
    define.amd = !0;
    typeof exports === 'object' && typeof module !== 'undefined'
        ? f(exports, require('@equinor/echo-core'), require('react'))
        : typeof define === 'function' && define.amd
        ? define(['exports', '@equinor/echo-core', 'react'], f)
        : ((g = typeof globalThis !== 'undefined' ? globalThis : g || self),
          f((g['echo-module'] = {}), g['*'], g['^17']['0']['2']));
})(this, function (exports, EchoCore, React) {
    ('use strict');
    function _interopDefaultLegacy(e) {
        return e && typeof e === 'object' && 'default' in e ? e : { default: e };
    }
    var EchoCore__default = /*#__PURE__*/ _interopDefaultLegacy(EchoCore);
    var React__default = /*#__PURE__*/ _interopDefaultLegacy(React);
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator['throw'](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = {
                label: 0,
                sent: function () {
                    if (t[0] & 1) throw t[1];
                    return t[1];
                },
                trys: [],
                ops: []
            },
            f,
            y,
            t,
            g;
        return (
            (g = { next: verb(0), throw: verb(1), return: verb(2) }),
            typeof Symbol === 'function' &&
                (g[Symbol.iterator] = function () {
                    return this;
                }),
            g
        );
        function verb(n) {
            return function (v) {
                return step([n, v]);
            };
        }
        function step(op) {
            if (f) throw new TypeError('Generator is already executing.');
            while (_)
                try {
                    if (
                        ((f = 1),
                        y &&
                            (t =
                                op[0] & 2
                                    ? y['return']
                                    : op[0]
                                    ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                                    : y.next) &&
                            !(t = t.call(y, op[1])).done)
                    )
                        return t;
                    if (((y = 0), t)) op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (
                                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                                (op[0] === 6 || op[0] === 2)
                            ) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2]) _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                } catch (e) {
                    op = [6, e];
                    y = 0;
                } finally {
                    f = t = 0;
                }
            if (op[0] & 5) throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    function __read(o, n) {
        var m = typeof Symbol === 'function' && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o),
            r,
            ar = [],
            e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        } catch (error) {
            e = { error: error };
        } finally {
            try {
                if (r && !r.done && (m = i['return'])) m.call(i);
            } finally {
                if (e) throw e.error;
            }
        }
        return ar;
    }
    function styleInject(css, ref) {
        if (ref === void 0) ref = {};
        var insertAt = ref.insertAt;

        if (!css || typeof document === 'undefined') {
            return;
        }

        var head = document.head || document.getElementsByTagName('head')[0];
        var style = document.createElement('style');
        style.type = 'text/css';

        if (insertAt === 'top') {
            if (head.firstChild) {
                head.insertBefore(style, head.firstChild);
            } else {
                head.appendChild(style);
            }
        } else {
            head.appendChild(style);
        }

        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
    }
    var css_248z = '.app-module_wrapper__WV5yl{margin-top:150px;padding:16px;text-align:center}';
    var style = { wrapper: 'app-module_wrapper__WV5yl' };
    styleInject(css_248z);
    var baseApiUrl = EchoCore.EchoEnv.env().REACT_APP_API_URL;

    function getVersion() {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        return [4, EchoCore__default['default'].EchoClient.fetch(baseApiUrl + '/Version')];

                    case 1:
                        data = _a.sent();
                        return [4, data.text()];

                    case 2:
                        return [2, _a.sent()];
                }
            });
        });
    }

    var App = function App() {
        var _a = __read(React.useState(''), 2),
            echoVersion = _a[0],
            setEchoVersion = _a[1];

        React.useEffect(function () {
            getVersion().then(function (version) {
                setEchoVersion(version);
            });
        });
        return /*#__PURE__*/ React__default['default'].createElement(
            'div',
            {
                className: style.wrapper
            },
            /*#__PURE__*/ React__default['default'].createElement('h1', null, 'Echo App Template woohooo'),
            /*#__PURE__*/ React__default['default'].createElement(
                'p',
                null,
                'This is an app template for Echo Applications'
            ),
            /*#__PURE__*/ React__default['default'].createElement('h6', null, 'Echo v', echoVersion)
        );
    };

    function setup(api) {
        api.registerApp(App);
    }

    exports.setup = setup;
    Object.defineProperty(exports, '__esModule', { value: true });
});
