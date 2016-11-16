"use strict";

function ShotBehaviour() {

    
}


ShotBehaviour.prototype.update = function (gameContext, shot, input) {

        shot.y -= 2;
        if (shot.y < 0)
            shot.destroy = true;

        gameContext.glyphsTree.aliens.some(function (alien) {
            if (glyphHelper.macroCollision(shot, alien)) {
                alien.destroy = true;
                shot.destroy = true;
                return true;
            }
        });
        
        gameContext.glyphsTree.alienShots.some(function (alienShot) {
            if (glyphHelper.macroCollision(shot, alienShot)) {
                alienShot.destroy = true;
                shot.destroy = true;
                return true;
            }
        });


}
