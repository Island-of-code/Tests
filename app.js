"use strict";

var myApp = angular.module("myApp", ["ngEventAggregator"]);

myApp.controller("MainController",
[
    "$scope", "eventAggregator", function($scope, eventAggregator) {

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

            var controlEvent = {
                laser: {}
            };

            var ctx = canvasElement.getContext("2d");
            var gameContext = new GameDataContext(ctx, canvasElement);
            var gameLoopInterval = null;
            var glyphsTree = gameContext.glyphsTree;
            var lastShotTime = new Date();

            eventAggregator.on("rightDown.happens",
                function() {
                    controlEvent.laser.dx = 1;
                });

            eventAggregator.on("rightUp.happens",
                function() {
                    controlEvent.laser.dx = 0;
                });

            eventAggregator.on("leftDown.happens",
                function() {
                    controlEvent.laser.dx = -1;
                });

            eventAggregator.on("leftUp.happens",
                function() {
                    controlEvent.laser.dx = 0;
                });

            eventAggregator.on("upUp.happens",
                function() {
                    controlEvent.shot = false;
                });

            eventAggregator.on("upDown.happens",
                function() {
                    controlEvent.shot = true;
                });

            this.run = function() {

                addAliens(20);
                glyphsTree.laser = new Laser(gameContext);
                gameLoopInterval = setInterval(renderLoop, 30);
            };

            function addAliens(count) {
                var x = gameContext.canvasWidth / count;
                var step = x;
                for (var i = 0; i < count-1; i++) {
                    glyphsTree.aliens.push(new Alien(gameContext, x - (Alien.width / 2)));
                    x += step;
                }
            }

            function renderCollectionAndFilter(glyphs, controlEvent) {

                var forDelete = [];

                for (var i = 0; i < glyphs.length; i++) {

                    if (glyphs.destroy) {
                        forDelete.push(i);
                    } else {
                        glyphs[i].renderObject(controlEvent);
                    }
                }

                for (var i = 0; i < forDelete.length; i++) {
                    glyphs.splice(forDelete[i], 1);
                }
            }
            
            function renderLoop() {

                renderCanvas();

                glyphsTree.laser.renderObject(controlEvent);

                if (controlEvent.shot) {

                    if ((new Date() - lastShotTime) > 100) {
                        glyphsTree.shots.push(new Shot(gameContext, glyphsTree.laser.x));
                        lastShotTime = new Date();
                    }
                }

                renderCollectionAndFilter(glyphsTree.shots, controlEvent);
                renderCollectionAndFilter(glyphsTree.aliens, controlEvent);
            }

            function renderCanvas() {
                ctx.fillStyle = "#000000";
                ctx.fillRect(0, 0, 600, 600);
            }
        }

        var canvasElement = document.getElementById("canvas");
        $scope.greeting = "Hola!";

        var game = new Game(canvasElement, eventAggregator);
        game.run();

    }
]);