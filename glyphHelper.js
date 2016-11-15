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

    function Intersection(ax1, ay1, ax2, ay2, bx1, by1, bx2, by2) {
        var v1 = (bx2 - bx1) * (ay1 - by1) - (by2 - by1) * (ax1 - bx1);
        var v2 = (bx2 - bx1) * (ay2 - by1) - (by2 - by1) * (ax2 - bx1);
        var v3 = (ax2 - ax1) * (by1 - ay1) - (ay2 - ay1) * (bx1 - ax1);
        var v4 = (ax2 - ax1) * (by2 - ay1) - (ay2 - ay1) * (bx2 - ax1);
        var res = (v1 * v2 < 0) && (v3 * v4 < 0);
        return res;
    }

    return {
        macroCollision: macroCollision
    }

})();