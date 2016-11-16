"use strict";

function LaserBehaviour() {

}

LaserBehaviour.prototype.update = function (gameContext, laser, input) {

    if (input.laser.dx) {
        laser.x += input.laser.dx;
    }

    if (input.shot) {

        if ((Date.now() - laser.lastShotTime) > 500) {
            gameContext.glyphsTree.shots.push(new Shot(gameContext, gameContext.glyphsTree.laser.x));
            laser.lastShotTime = Date.now();
        }
    }

}
