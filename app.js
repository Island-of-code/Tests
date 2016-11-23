"use strict";

var canvasElement = document.getElementById("canvas");
var game;

var newGameButton = document.getElementById("newGame");
var resumeGameButton = document.getElementById("resumeGame");


resourceHelper.onReady(function() {

    game = new Game(canvasElement);
    game.onGameOverEvent = function () {
        newGameButton.style.visibility = "visible";
        resumeGameButton.style.visibility = "hidden";
    };

    //game.startNewGame();
});

function startNewGame() {
    newGameButton.style.visibility = "hidden";
    resumeGameButton.style.visibility = "hidden";
    game.startNewGame();
}

function resumeGame() {
    game.resumeGame();
    newGameButton.style.visibility = "hidden";
    resumeGameButton.style.visibility = "hidden";
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

document.addEventListener("keydown",
    function(e) {
        if (e.key === "Escape") {

            if (game.isGameOver)
                return;

            if (game.isGamePause) {
                game.resumeGame();
                newGameButton.style.visibility = "hidden";
                resumeGameButton.style.visibility = "hidden";

            } else {
                
                game.pauseGame();
                newGameButton.style.visibility = "visible";
                resumeGameButton.style.visibility = "visible";
            }
        }
    });