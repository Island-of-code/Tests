"use strict";

function AlienBehaviour(alien) {


}

AlienBehaviour.prototype.update = function(gameContext, alien, input) {
    if (input.shot) {

        if ((Date.now() - alien.lastShot) > 500) {
            gameContext.glyphsTree.shots.push(new Shot(gameContext, gameContext.glyphsTree.laser.x));
            alien.lastShotTime = Date.now();
        }
    }

}
