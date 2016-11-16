"use strict";

var glyphHelper = (function () {

    function macroCollision(obj1, obj2) {
        var XColl = false;
        var YColl = false;

        if ((obj1.x + obj1.width >= obj2.x) && (obj1.x <= obj2.x + obj2.width)) XColl = true;
        if ((obj1.y + obj1.height >= obj2.y) && (obj1.y <= obj2.y + obj2.height)) YColl = true;

        if (XColl & YColl) { return true; }
        return false;
    }

    return {
        macroCollision: macroCollision
    }

})();