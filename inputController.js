"use strict";

var inputController = (function () {
    var pressedKeys = {};
    var objects = {
        laser: {}
    };
    function setKey(event, status) {
        var code = event.keyCode;
        var key;

        switch (code) {
            case 32:
                return 'SPACE';
                
                break;
            case 37:
                key = 'LEFT'; break;
            case 38:
                key = 'UP'; break;
            case 39:
                key = 'RIGHT'; break;
            case 40:
                key = 'DOWN'; break;
            default:
                // Convert ASCII codes to letters
                key = String.fromCharCode(code);
        }

        pressedKeys[key] = status;
    }

    document.addEventListener('keydown', function (e) {

        setKey(e, "down");

        if (isDown("LEFT")) {
            objects.rightDown = 1;
            objects.laser.dx = 1;
        }

    });

    document.addEventListener('keyup', function (e) {
        setKey(e, "up");
    });

    window.addEventListener('blur', function () {
        pressedKeys = {};
    });

    function isDown(key) {
        return pressedKeys[key.toUpperCase()];
    }

    return {
        isDown: isDown,
        objects: objects
    };
})();