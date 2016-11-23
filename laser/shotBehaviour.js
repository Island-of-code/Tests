"use strict";

function ShotBehaviour() {
    
}

ShotBehaviour.prototype.update = function(gameContext, shot) {

    shot.y -= shot.dy;
    if (shot.y < 0)
        shot.isDeleted = true;

    gameContext.glyphsTree.aliens.some(function(alien) {
        if (geometryHelper.checkCollision(shot, alien)) {
            alien.explosion();
            shot.delete();
            return true;
        }
    });

    gameContext.glyphsTree.alienShots.some(function(alienShot) {
        if (geometryHelper.checkCollision(shot, alienShot)) {
            alienShot.delete();
            shot.explosion();
            
            return true;
        }
    });
};
