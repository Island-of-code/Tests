﻿"use strict";

function Game(canvasElement) {

    // A cross-browser requestAnimationFrame
    var requestAnimFrame = (function() {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    var ctx = canvasElement.getContext("2d");
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    ctx.font = "normal 16pt Arial";
    var backgroundPattern = ctx.createPattern(resourceHelper.get("darkPurple.png"), "repeat");

    var gameContext = new GameContext(ctx);;
    var glyphsTree = null;
    var fps = 0;
    var gameOver = false;
    var gamePause = false;
    var player = null;

    renderCanvas();

    this.pauseGame = function () {

        gamePause = true;

    }

    this.resumeGame = function () {
        if (gamePause) {
            gamePause = false;
            renderLoop();
        }
    }

    this.startNewGame = function() {

        gameOver = true;

        window.setTimeout(function() {
            
            gameContext = new GameContext(ctx);
            glyphsTree = gameContext.glyphsTree;

            gameOver = false;
            gamePause = false;

            player = {
                lives: 3,
                score: 0
            };

            addAliens(20);
            initLaser();
            renderLoop();

        }, 100);

        
        
    };


    function initLaser() {

        if (player.lives === 0) {
            gameOver = true;
            return;
        }

        var laser = new Laser(gameContext);
        player.lives -= 1;
        laser.destroyEvent = function () {
                initLaser();
        }
        glyphsTree.laser = laser;
    }


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

        map.forEach(function(elem, indexY) {

            var y = (indexY * (AlienT1.height + 10));
            var step = gameContext.canvasWidth / (elem.length + 1);
            var x = step;

            elem.forEach(function(item, indexX) {

                var alien = new AlienT1(gameContext, x - (AlienT1.width / 2), y);
                alien.destroyEvent = function() {
                    player.score += 10;
                }
                glyphsTree.aliens.push(alien);
                x += step;
            });

        });
    }

    function updateGlyphArray(glyphs, dt) {

        var deleted = [];

        for (var i = 0; i < glyphs.length; i++) {

            if (glyphs[i].isDeleted) {
                deleted.push(glyphs[i]);
            } else {
                glyphs[i].update(dt);
            }
        }
        //console.log("destroy=" + forDelete.length);
        for (var i = 0; i < deleted.length; i++) {
            glyphs.splice(glyphs.indexOf(deleted[i]), 1);
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

    var lastTime = Date.now();

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
        gameContext.ctx.fillText(fps + " fps", gameContext.canvasWidth - 70, 26);

        gameContext.ctx.fillText("score: " + player.score, 10, 26);
        gameContext.ctx.fillText("lives :" + player.lives, 10, 46);

        if (gameOver || gamePause)
            return;

        lastTime = now;
        requestAnimFrame(renderLoop);
    }
}