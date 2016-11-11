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
                ship: {}
            };

            var ctx = canvasElement.getContext("2d");
            var ship = null;
            var gameLoopInterval = null;
            var glyphsTree = {
                ship: null,
                shots : []
        };

            eventAggregator.on("rightDown.happens",
                function() {
                    controlEvent.ship.dx = 1;
                });

            eventAggregator.on("rightUp.happens",
                function() {
                    controlEvent.ship.dx = 0;
                });

            eventAggregator.on("leftDown.happens",
                function() {
                    controlEvent.ship.dx = -1;
                });

            eventAggregator.on("leftUp.happens",
                function() {
                    controlEvent.ship.dx = 0;
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
                ship = new Ship(ctx);
                glyphsTree.ship = ship;
                gameLoopInterval = setInterval(loop, 33);
            };

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


            function loop() {

                renderCanvas();

                glyphsTree.ship.renderObject(controlEvent);

                if (controlEvent.shot) {
                    glyphsTree.shots.push(new Shot(ctx, ship.x));
                }

                renderCollectionAndFilter(glyphsTree.shots, controlEvent);
            }

            function renderCanvas() {
                ctx.fillStyle = "#000000";
                ctx.fillRect(0, 0, 600, 600);
            }

        }


        function Shot(ctx, x) {

            var that = this;
            this.destroy = false;

            var canvasH = ctx.canvas.height;

            this.x = x;
            var y = 10;

            var height = 10;
            var width = 5;

            this.renderObject = function(message) {
                if (that.destroy) {
                    return;
                }
                y++;
                if (y > canvasH)
                    that.destroy = true;

                ctx.fillStyle = "#FF0000";
                ctx.fillRect(that.x, y, height, width);
            };
        }


        function Ship(ctx) {

            var that = this;
            this.x = 10;
            this.height = 10;
            this.width = 10;
            this.destroy = false;

            this.renderObject = function(controlEvent) {

                if (controlEvent.ship.dx) {
                    that.x += controlEvent.ship.dx;
                }

                ctx.fillStyle = "#FF0000";
                ctx.fillRect(that.x, 10, that.height, that.width);
            };
        }

        var canvasElement = document.getElementById("canvas");
        $scope.greeting = "Hola!";

        var game = new Game(canvasElement, eventAggregator);
        game.run();

    }
]);