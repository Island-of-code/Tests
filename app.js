"use strict";

var canvasElement = document.getElementById("canvas");

resourceHelper.onReady(function() {

    var game = new Game(canvasElement);
    game.run();
});

resourceHelper.load([
    "laser.png",
    "laserBlue03.png",
    "darkPurple.png",
    "laserRed16.png",
    "enemyBlack2.png",
    "laserGreen11.png",
    "playerShip3_green_small.png",
    "exploer.png"
]);
        
