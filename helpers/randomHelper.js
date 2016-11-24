"use strict";

var randomHelper = (function () {

    function integer(min, max) {
        var rand = min + Math.random() * (max - min);
        rand = Math.round(rand);
        return rand;
    }

    return {
        integer: integer
    }

})();