"use strict";

function AlienShotBehaviour() {


}

AlienShotBehaviour.prototype.update = function (gameContext, alienShot, input) {

    alienShot.y += 1;
    //console.log("y=" + alienShot.y);
    if (alienShot.y > gameContext.canvasHeight) {
        alienShot.destroy = true;
        
    }
    
    //if (glyphHelper.macroCollision(alienShot, gameContext.glyphsTree.laser)) {
    //    gameContext.glyphsTree.laser.explosion();
    //}
}
