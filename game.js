"use strict";

function Game(canvasElement) {

    // A cross-browser requestAnimationFrame
    var requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    var ctx = canvasElement.getContext("2d");
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    ctx.font = "normal 16pt Arial";

    var gameContext = new GameContext(ctx, canvasElement);
    var glyphsTree = gameContext.glyphsTree;
    var backgroundPattern = ctx.createPattern(resourceHelper.get('darkPurple.png'), 'repeat');
    var fps = 0;

    //eventAggregator.on("rightDown.happens",
    //    function () {
    //        input.rightDown = 1;
    //        input.laser.dx = 1;
    //    });

    //eventAggregator.on("rightUp.happens",
    //    function () {
    //        input.laser.dx = 0;
    //        input.rightDown = 0;

    //        if (input.leftDown)
    //            input.laser.dx = -1;
    //    });

    //eventAggregator.on("leftDown.happens",
    //    function () {
    //        input.laser.dx = -1;
    //        input.leftDown = 1;


    //    });

    //eventAggregator.on("leftUp.happens",
    //    function () {
    //        input.laser.dx = 0;
    //        input.leftDown = 0;

    //        if (input.rightDown)
    //            input.laser.dx = 1;

    //    });

    //eventAggregator.on("upUp.happens",
    //    function () {
    //        input.shot = false;
    //    });

    //eventAggregator.on("upDown.happens",
    //    function () {
    //        input.shot = true;
    //    });

    this.run = function () {

        addAliens(20);
        glyphsTree.laser = new Laser(gameContext);
        renderLoop();
    };


    function addAliens(count) {

        var map = [
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1],
            [1]
        ];

        map.forEach(function (elem, index_y) {

            var y = (index_y * (AlienT1.height + 10));
            var step = gameContext.canvasWidth / (elem.length + 1);
            var x = step;

            elem.forEach(function (item, index_x) {

                var alien = new AlienT1(gameContext, x - (AlienT1.width / 2), y);

                glyphsTree.aliens.push(alien);

                x += step;

            });

        });
    }

    function updateGlyphArray(glyphs, dt) {

        var forDelete = [];

        for (var i = 0; i < glyphs.length; i++) {

            if (glyphs[i].destroy) {
                forDelete.push(glyphs[i]);
            } else {
                glyphs[i].update(dt);
            }
        }
        //console.log("destroy=" + forDelete.length);
        for (var i = 0; i < forDelete.length; i++) {
            glyphs.splice(glyphs.indexOf(forDelete[i]), 1);
        }
    }
    function renderGlyphArray(glyphs) {
        for (var i = 0; i < glyphs.length; i++) {
            glyphs[i].render();
        }
    }
    function handleInputGlyphArray(glyphs) {
        for (var i = 0; i < glyphs.length; i++) {
            glyphs[i].handleInput();
        }
    }


    function handleInput() {

        glyphsTree.laser.handleInput();
        handleInputGlyphArray(glyphsTree.shots);
        handleInputGlyphArray(glyphsTree.aliens);
        handleInputGlyphArray(glyphsTree.alienShots);
    }

    function updateObjects(dt) {

        glyphsTree.laser.update(dt);
        updateGlyphArray(glyphsTree.shots, dt);
        updateGlyphArray(glyphsTree.aliens, dt);
        updateGlyphArray(glyphsTree.alienShots, dt);
    }

    function renderObjects() {

        renderGlyphArray(glyphsTree.shots);
        renderGlyphArray(glyphsTree.aliens);
        renderGlyphArray(glyphsTree.alienShots);
        glyphsTree.laser.render();
    }

    function renderCanvas() {

        ctx.fillStyle = backgroundPattern;
        ctx.fillRect(0, 0, gameContext.canvasWidth, gameContext.canvasHeight);
    }

    var lastTime = Date.now();;
    function renderLoop() {

        var now = Date.now();
        var dt = (now - lastTime) / 1000.0;

        handleInput();
        updateObjects(dt);
        renderCanvas();
        renderObjects();

        //display FPS
        var delta = (now - lastTime) / 1000;
        fps = Math.round(1 / delta);
        gameContext.ctx.fillStyle = "Black";
        gameContext.ctx.fillText(fps + " fps", 10, 26);

        lastTime = now;
        requestAnimFrame(renderLoop);
    }
}