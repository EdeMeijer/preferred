(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.preferred = {}));
}(this, function (exports) { 'use strict';

    function thing (foo) {
        return foo + 42;
    }

    exports.thing = thing;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
