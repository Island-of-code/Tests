"use strict";

function AlienBehaviour() {

}

AlienBehaviour.prototype.update = function (gameContext, alien)
{
    if ((Date.now() - alien.lastShotTime) > Math.random() * 1000000) {

        var alienShot = new AlienShot(gameContext, alien.x + (alien.width / 2), alien.y + (alien.height /2));
        gameContext.glyphsTree.alienShots.push(alienShot);
        alien.lastShotTime = Date.now();
    }

    if ((Date.now() - alien.lastMove) > 6000) {

        alien.setMovingState(0, 30);
        alien.lastMove = Date.now();
    }

}
