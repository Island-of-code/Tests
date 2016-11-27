"use strict";

function AlienBehaviour() {

    

}

AlienBehaviour.prototype.update = function (gameContext, alien) {

    var now = Date.now();

    if ((now - alien.lastShotTime) > Math.random() * 1000000) {

        var alienShot = new AlienShot(gameContext, alien.x + (alien.width / 2) - 1, alien.y + (alien.height /2));
        gameContext.glyphsTree.alienShots.push(alienShot);
        alien.lastShotTime = Date.now();
    }

}
