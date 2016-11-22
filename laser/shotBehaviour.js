"use strict";

function ShotBehaviour() {


}


ShotBehaviour.prototype.update = function(gameContext, shot) {

    shot.y -= 4;
    if (shot.y < 0)
        shot.destroy = true;

    gameContext.glyphsTree.aliens.some(function(alien) {
        if (geometryHelper.checkCollision(shot, alien)) {
            alien.explosion();
            shot.destroy = true;
            return true;
        }
    });

    gameContext.glyphsTree.alienShots.some(function(alienShot) {
        if (geometryHelper.checkCollision(shot, alienShot)) {
            alienShot.destroy = true;
            shot.destroy = true;
            return true;
        }
    });
};
