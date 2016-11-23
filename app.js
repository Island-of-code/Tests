"use strict";

var canvasElement = document.getElementById("canvas");
var game;

resourceHelper.onReady(function() {

    game = new Game(canvasElement);
    //game.startNewGame();
});

function startNewGame() {
    game.startNewGame();
}

function pauseGame() {
    game.pauseGame();
}

function resumeGame() {
    game.resumeGame();
}

resourceHelper.load([
    "laser.png",
    "laserBlue03.png",
    "darkPurple.png",
    "laserRed16.png",
    "enemyBlack2.png",
    "laserGreen11.png",
    "playerShip3_green_small.png",
    "exploer.png",
    "star4.png"
]);
        
