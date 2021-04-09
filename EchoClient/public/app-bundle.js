/* my-library version 1 */

(function (g, f) {
    function define(d, f) {
        typeof document !== 'undefined' && (document.currentScript.app = {});
        f(document.currentScript.app, ...d.filter((d) => d !== 'exports').map(window.app));
    }
    define.amd = !0;
    typeof exports === 'object' && typeof module !== 'undefined'
        ? f(exports, require('@equinor/echo-core'), require('react'))
        : typeof define === 'function' && define.amd
        ? define(['exports', '@equinor/echo-core', 'react'], f)
        : ((g = typeof globalThis !== 'undefined' ? globalThis : g || self), f((g.testApp = {}), g.EchoCore, g.React));
})(this, function (exports, EchoCore, React) {
    'use strict';
    function _interopDefaultLegacy(e) {
        return e && typeof e === 'object' && 'default' in e ? e : { default: e };
    }
    var EchoCore__default = /*#__PURE__*/ _interopDefaultLegacy(EchoCore);
    var React__default = /*#__PURE__*/ _interopDefaultLegacy(React);
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
    var css_248z = '.app-module_bg__2NyWh{background-color:#8a2be2;color:#7fff00;text-align:center;padding-top:150}';
    var style = { bg: 'app-module_bg__2NyWh' };
    styleInject(css_248z);
    var App = function App() {
        EchoCore.useInitial(function () {
            EchoCore__default['default'].registerPanels();
        });
        return /*#__PURE__*/ React__default['default'].createElement(
            'div',
            {
                className: style.bg
            },
            /*#__PURE__*/ React__default['default'].createElement('h1', null, 'This is awesome!!'),
            /*#__PURE__*/ React__default['default'].createElement('p', null, 'Hello there this is a test.2.')
        );
    };
    function setup() {
        return App;
    }
    exports.setup = setup;
    Object.defineProperty(exports, '__esModule', { value: true });
});
/* Echo Core Team 2021 */
