"use strict";

function LaserBehaviour() {


}

LaserBehaviour.prototype.update = function (gameContext, laser) {

    var dx = inputController.event.laser.dx;
    if (laser.x + dx < -20)
        dx = 0;
    if (laser.x + dx > gameContext.canvasWidth)
        dx = 0;

      laser.setMovingX(dx);
       // laser.setMovingState(true);
    
    //else
       // laser.setMovingState(false);


    if (inputController.event.upDown) {

        if ((Date.now() - laser.lastShotTime) > 500) {

            gameContext.glyphsTree.shots.push(new Shot(gameContext, laser.x + (laser.width / 2) - 1, laser.y -2 ));
            laser.lastShotTime = Date.now();
            laser.playShotSound();
        }
    }
}
