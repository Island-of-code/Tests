"use strict";

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
    ctx.font = "normal 16pt Century Gothic";

    var backgroundPattern = ctx.createPattern(resourceHelper.get("darkPurple.png"), "repeat");
    var gameContext = new GameContext(ctx);
    var glyphsTree = null;
    var fps = 0;
    var player = null;
    var self = this;

    var alienGroupeBehaviour = null;
    var isGameOver = false;
    var isGamePause = false;
    var lastTime = Date.now();

    renderCanvas();

    Object.defineProperty(this, "isGameOver", {
        set: function (value) {
            isGameOver = value;
            if (this.onGameOverEvent)
                this.onGameOverEvent();
        },
        get: function () {
            return isGameOver;
        }
    });

    Object.defineProperty(this, "isGamePause", {
        set: function (value) {
            isGamePause = value;
            if (this.onGamePauseEvent)
                this.onGamePauseEvent();
        },
        get: function () {
            return isGamePause;
        }
    });
    
    this.pauseGame = function() {
        this.isGamePause = true;
    };
    this.resumeGame = function() {
        if (this.isGamePause && !this.isGameOver) {
            this.isGamePause = false;
            renderLoop();
        }
    };
    this.startNewGame = function() {

        isGameOver = true;

        window.setTimeout(function() {

                gameContext = new GameContext(ctx);
                glyphsTree = gameContext.glyphsTree;
                alienGroupeBehaviour = new AlienGroupeBehaviour(gameContext);
                alienGroupeBehaviour.onGameOverEvent = function() {
                    self.isGameOver = true;
                }

                isGameOver = false;
                isGamePause = false;

                player = {
                    lives: 3,
                    score: 0,
                    level: 1
                };

                addAliens(20);
                repareLaser();
                renderLoop();

            },
            100);

    };

    function repareLaser() {

        if (player.lives === 0) {
            self.isGameOver = true;
            return;
        }

        var laser = new Laser(gameContext);
        player.lives -= 1;
        laser.onDestroyEvent = function() {
            repareLaser();
        };
        glyphsTree.laser = laser;
    }

    function clearEnemies() {
        glyphsTree.aliens = [];
        glyphsTree.shots = [];
        glyphsTree.alienShots = [];
    }

    function createAlienByType(type, x, y) {
        switch (type) {
        case 1:
            return new Alien(gameContext, [x, y], [30, 24], { name: "enemyBlack2.png" });
        case 2:
            return new Alien(gameContext, [x, y], [30, 31], { name: "enemyBlue4.png" });
        case 3:
            return new Alien(gameContext, [x, y], [40, 33], { name: "enemyGreen3.png" });
        case 4:
            return new Alien(gameContext, [x, y], [30, 26], { name: "enemyGreen5.png" });
        case 5:
            return new Alien(gameContext, [x, y], [30, 27], { name: "enemyRed1.png" });

        default:
            throw new Error("Alien type is bad");
        }
    }

    function generateRandomNumber(min, max) {

        var number = Math.floor((Math.random() * 100) + 1);
        while (number < min || number > max || number === 0)
            number = Math.floor((Math.random() * 100) + 1);
        return number;
    }

    function generateAliensMap() {

        var result = [];
        for (var i = 0; i < 5; i++) {
            var alienType = generateRandomNumber(1, 5);
            var row = [];
            for (var j = 0; j < generateRandomNumber(4, 13); j++) {
                row.push(alienType);
            }
            result.push(row);
        }
        return result;
    }

    function startNextLevel() {

        player.level++;
        clearEnemies();
        addAliens();
    }

    function addAliens() {

        var map = generateAliensMap();
        var lastHeight = 10;
        var y = 30;
        map.forEach(function(elem) {
            y = y + lastHeight + 10;
            var step = gameContext.canvasWidth / (elem.length + 1);
            var x = step;
            elem.forEach(function(item) {
                var alien = createAlienByType(item, 0, y);
                alien.x = x - (alien.width / 2);
                alien.onDestroyEvent = function() {
                    player.score += 10;
                    if (glyphsTree.aliens.every(item => item.isDeleted)) {
                        startNextLevel();
                    }
                };
                glyphsTree.aliens.push(alien);
                x += step;
                lastHeight = alien.height;
            });

        });
    }

    function updateGlyphArray(glyphs, dt) {

        var deleted = [];
        glyphs.forEach(item => {

            if (item.isDeleted) 
                deleted.push(item);
             else 
                item.update(dt);
        });
        deleted.forEach(item => {
            glyphs.splice(glyphs.indexOf(item), 1);
        });
    }

    function renderGlyphArray(glyphs) {
        glyphs.forEach(item => {
            item.render();
        });
    }

    function handleInputGlyphArray(glyphs) {
        glyphs.forEach(item => {
            item.handleInput();
        });
    }

    function handleInput() {

        glyphsTree.laser.handleInput();
        handleInputGlyphArray(glyphsTree.shots);
        handleInputGlyphArray(glyphsTree.aliens);
        handleInputGlyphArray(glyphsTree.alienShots);
    }

    function updateObjects(dt) {

        glyphsTree.laser.update(dt);
        alienGroupeBehaviour.update(dt);
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
        gameContext.ctx.fillStyle = "#BB94CB";
        gameContext.ctx.fillText(fps + " fps", gameContext.canvasWidth - 70, 26);

        gameContext.ctx.fillText("Score: " + player.score, 10, 26);
        gameContext.ctx.fillText("Lives: " + player.lives, 150, 26);
        gameContext.ctx.fillText("Level: " + player.level, 250, 26);

        gameContext.ctx.fillRect(5, 35, gameContext.canvasWidth - 10, 1);

        if (isGameOver || isGamePause)
            return;

        lastTime = now;
        requestAnimFrame(renderLoop);
    }
}