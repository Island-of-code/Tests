"use strict";

var inputController = (function () {
    var input = {
        laser: {}
    };
    function handleDownKey(event, status) {
        var code = event.keyCode;
        var key;

        switch (code) {
            case 32:
                return 'SPACE';
                
                break;
            case 37:
                key = 'LEFT';
                input.laser.dx = -1;
                input.leftDown = 1;
                break;
            case 38:
                key = 'UP';
                input.shot = true;
                break;
            case 39:
                key = 'RIGHT';

                input.rightDown = 1;
                input.laser.dx = 1;

                break;
            case 40:
                key = 'DOWN'; break;
            default:
                // Convert ASCII codes to letters
                key = String.fromCharCode(code);
        }
    }

    function handleUpKey(event, status) {
        var code = event.keyCode;
        var key;

        switch (code) {
            case 32:
                return 'SPACE';

                break;
            case 37:
                key = 'LEFT';
                input.laser.dx = 0;
                input.leftDown = 0;

                if (input.rightDown)
                    input.laser.dx = 1;


                break;
            case 38:
                key = 'UP';
                input.shot = false;

                break;
            case 39:
                key = 'RIGHT';

                input.laser.dx = 0;
                input.rightDown = 0;

                if (input.leftDown)
                    input.laser.dx = -1;

                break;
            case 40:
                key = 'DOWN'; break;
            default:
                // Convert ASCII codes to letters
                key = String.fromCharCode(code);
        }
    }

    document.addEventListener('keydown', function (e) {
        handleDownKey(e);
    });

    document.addEventListener('keyup', function (e) {
        handleUpKey(e);
    });

    window.addEventListener('blur', function () {
        //pressedKeys = {};
    });

    return {
        input: input
    };
})();