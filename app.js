"use strict";

var myApp = angular.module("myApp", ["ngEventAggregator"]);

myApp.controller("MainController",
[
    "$scope", "eventAggregator", function($scope, eventAggregator) {

    // A cross-browser requestAnimationFrame
    var requestAnimFrame = (function(){
        return window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function(callback){
                window.setTimeout(callback, 1000 / 60);
            };
    })();

        window.onkeydown = function(event) {
            if (event.key === "ArrowRight") {
                eventAggregator.trigger("rightDown.happens", { event: event });
            }
            if (event.key === "ArrowLeft") {
                eventAggregator.trigger("leftDown.happens", { event: event });
            }

            if (event.key === "ArrowUp") {
                eventAggregator.trigger("upDown.happens", { event: event });
            }


        };
        window.onkeyup = function(event) {
            if (event.key === "ArrowRight") {
                eventAggregator.trigger("rightUp.happens", { event: event });
            }
            if (event.key === "ArrowLeft") {
                eventAggregator.trigger("leftUp.happens", { event: event });
            }

            if (event.key === "ArrowUp") {
                eventAggregator.trigger("upUp.happens", { event: event });
            }
        };

        function Game(canvasElement, eventAggregator) {

           var input = {
                laser: {}
            };

            var ctx = canvasElement.getContext("2d");
            var gameContext = new GameDataContext(ctx, canvasElement);
            var glyphsTree = gameContext.glyphsTree;
            

            eventAggregator.on("rightDown.happens",
                function() {
                    input.rightDown = 1;
                    input.laser.dx = 1;
                });

            eventAggregator.on("rightUp.happens",
                function() {
                    input.laser.dx = 0;
                    input.rightDown = 0;

                    if (input.leftDown)
                        input.laser.dx = -1;
                });

            eventAggregator.on("leftDown.happens",
                function() {
                    input.laser.dx = -1;
                    input.leftDown = 1;


                });

            eventAggregator.on("leftUp.happens",
                function() {
                    input.laser.dx = 0;
                    input.leftDown = 0;
                    
                    if(input.rightDown)
                        input.laser.dx = 1;

                });

            eventAggregator.on("upUp.happens",
                function() {
                    input.shot = false;
                });

            eventAggregator.on("upDown.happens",
                function() {
                    input.shot = true;
                });

            this.run = function() {

                addAliens(20);
                glyphsTree.laser = new Laser(gameContext);
                renderLoop();
            };

            function addAliens(count) {
                var x = gameContext.canvasWidth / count;
                var step = x;
                for (var i = 0; i < count-1; i++) {
                    glyphsTree.aliens.push(new Alien(gameContext, x - (Alien.width / 2)));
                    x += step;
                }
            }

            function updateForGlyphArray(glyphs, dt) {

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
            function renderForGlyphArray(glyphs) {
                for (var i = 0; i < glyphs.length; i++) {
                    glyphs[i].render();
                }
            }
            function handleInputForGlyphArray(glyphs) {
                for (var i = 0; i < glyphs.length; i++) {
                    glyphs[i].handleInput(input);
                }
            }
            
            
            function handleInput() {

                glyphsTree.laser.handleInput(input);
                handleInputForGlyphArray(glyphsTree.shots);
                handleInputForGlyphArray(glyphsTree.aliens);
                handleInputForGlyphArray(glyphsTree.alienShots);
            }
            function updateObjects(dt) {
                 
                glyphsTree.laser.update(dt);
                updateForGlyphArray(glyphsTree.shots, dt);
                updateForGlyphArray(glyphsTree.aliens, dt);
                updateForGlyphArray(glyphsTree.alienShots, dt);
            }
            function render() {

                renderCanvas();
                glyphsTree.laser.render();
                renderForGlyphArray(glyphsTree.shots);
                renderForGlyphArray(glyphsTree.aliens);
                renderForGlyphArray(glyphsTree.alienShots);
            }

            function renderCanvas() {
                ctx.fillStyle = "#000000";
                ctx.fillRect(0, 0, gameContext.canvasWidth, gameContext.canvasHeight);
            }
    
            var lastTime;
            function renderLoop() {

                var now = Date.now();
                var dt = (now - lastTime) / 1000.0;

                handleInput();
                updateObjects(dt);
                render();
                
                lastTime = now;
                requestAnimFrame(renderLoop);
            }
        }

        var canvasElement = document.getElementById("canvas");
        $scope.greeting = "Hola!";

        var game = new Game(canvasElement, eventAggregator);
        
        resources.onReady(function() { game.run(); });
        resources.load([
            "./images/laser.png", './images/exploer.png']);
        
    }
]);