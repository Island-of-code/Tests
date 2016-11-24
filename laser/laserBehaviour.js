"use strict";

function LaserBehaviour() {

}

LaserBehaviour.prototype.update = function (gameContext, laser) {

    if (inputController.event.laser.dx && laser.x > -10 && laser.x < gameContext.canvasWidth + 10 ) {
        laser.x += inputController.event.laser.dx;
        laser.setMovingState(true);
    }
    else
        laser.setMovingState(false);


    if (inputController.event.shot) {

        if ((Date.now() - laser.lastShotTime) > 300) {

            gameContext.glyphsTree.shots.push(new Shot(gameContext, laser.x + (laser.width / 2) - 1, laser.y -2 ));
            laser.lastShotTime = Date.now();
        }
    }
}
