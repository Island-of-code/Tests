"use strict";

function AlienGroupeBehaviour(gameContext) {

    this._gameContext = gameContext;

    this.lastMovePauseTimeY = 5000;
    this.lastMovePauseTimeX = 5000;

    this.lastMoveTimeY = Date.now();
    this.lastMoveTimeX = Date.now();

}

AlienGroupeBehaviour.prototype.update = function (dt) {

    var now = Date.now();

    if ((now - this.lastMoveTimeY) > this.lastMovePauseTimeY) {

        this._gameContext.glyphsTree.aliens.forEach(item => item.setMovingY(10));
        this.lastMoveTimeY = Date.now();
        this.lastMovePauseTimeY = randomHelper.integer(5000, 10000);
    }

    if ((now - this.lastMoveTimeX) > this.lastMovePauseTimeX) {

        var dir = randomHelper.integer(0, 10) > 5 ? -1 : 1;

        this._gameContext.glyphsTree.aliens.forEach(item => item.setMovingX(10 * dir));
        this.lastMoveTimeX = Date.now();
        this.lastMovePauseTimeX = randomHelper.integer(1000, 4000);
    }

    
}
