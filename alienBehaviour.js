"use strict";

function AlienBehaviour(alien) {


}

AlienBehaviour.prototype.update = function(gameContext, alien, input) {
    
    

    if ((Date.now() - alien.lastShotTime) > 1000) {
        gameContext.glyphsTree.alienShots.push(new AlienShot(gameContext, alien.x));
        alien.lastShotTime = Date.now();
        }

}
