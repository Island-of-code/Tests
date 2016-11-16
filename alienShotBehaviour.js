"use strict";

function AlienShotBehaviour() {


}

AlienShotBehaviour.prototype.update = function (gameContext, alienShot, input) {
    alienShot.y += 2;
    if (alienShot.y > gameContext.canvasHeight)
        alienShot.destroy = true;
}
