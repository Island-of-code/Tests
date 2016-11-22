"use strict";

var inputController = (function() {
    var input = {
        laser: {}
    };

    function handleDownKey(event, status) {
        var code = event.keyCode;
        var key;

        switch (code) {
        case 32:
            key = "SPACE";
            break;
        case 37:
            key = "LEFT";
            input.laser.dx = -2;
            input.leftDown = true;
            break;
        case 38:
            key = "UP";
            input.shot = true;
            break;
        case 39:
            key = "RIGHT";
            input.rightDown = true;
            input.laser.dx = 2;
            break;
        case 40:
            key = "DOWN";
            break;
        default:
        }

        input.key = key;
    }

    function handleUpKey(event, status) {
        var code = event.keyCode;
        var key;

        switch (code) {
        case 32:
            key = "SPACE";
            break;
        case 37:
            key = "LEFT";
            input.laser.dx = 0;
            input.leftDown = false;

            if (input.rightDown)
                input.laser.dx = 2;

            break;
        case 38:
            key = "UP";
            input.shot = false;
            break;
        case 39:
            key = "RIGHT";
            input.laser.dx = 0;
            input.rightDown = false;

            if (input.leftDown)
                input.laser.dx = -2;

            break;
        case 40:
            key = "DOWN";
            break;
        default:
        }
        input.key = key;
    }

    document.addEventListener("keydown",
        function(e) {
            handleDownKey(e);
        });

    document.addEventListener("keyup",
        function(e) {
            handleUpKey(e);
        });

    window.addEventListener("blur",
        function() {
            //pressedKeys = {};
        });

    return {
        event: input
    };
})();