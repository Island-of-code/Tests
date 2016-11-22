"use strict";

function AlienShotBehaviour() {


}

AlienShotBehaviour.prototype.update = function (gameContext, alienShot) {

    alienShot.y += 1;
    if (alienShot.y > gameContext.canvasHeight) {
        alienShot.destroy = true;
        
    }
    
    if (geometryHelper.checkCollision(alienShot, gameContext.glyphsTree.laser)) {
        gameContext.glyphsTree.laser.explosion();
    }
}
