"use strict";

function AlienGroupeBehaviour(gameContext) {

    this._gameContext = gameContext;

    this.lastMovePauseTimeY = 5000;
    this.lastMovePauseTimeX = 1000;

    this.lastMoveTimeY = Date.now();
    this.lastMoveTimeX = Date.now();

    this._maxBorderX = 0;
    this._minBorderX = 0;

    this._maxBorderY = 0;
}

AlienGroupeBehaviour.prototype.update = function(dt) {

    var now = Date.now();

    if ((now - this.lastMoveTimeY) > this.lastMovePauseTimeY) {

        this._gameContext.glyphsTree.aliens.forEach(item => {
            
            if (item.y + item.height > this._gameContext.canvasHeight - 10) {
                this.onGameOverEvent();
                return;
            }
            item.setMovingY(10);
        });
        this.lastMoveTimeY = now;
        this.lastMovePauseTimeY = randomHelper.integer(4000, 6000);
    }

    if ((now - this.lastMoveTimeX) > this.lastMovePauseTimeX) {

        var dir = randomHelper.integer(0, 10) > 5 ? -1 : 1;

        if (this._maxBorderX + 20 > this._gameContext.canvasWidth) //check border
            dir = -1;
        
        if (this._minBorderX < 20) //check border
            dir = 1;
        
        this._maxBorderX = 0;
        this._minBorderX = 20;
        this._gameContext.glyphsTree.aliens.forEach(item => {

            this._maxBorderX = item.x + item.width > this._maxBorderX ? item.x + item.width : this._maxBorderX;
            this._minBorderX = item.x < this._minBorderX ? item.x : this._minBorderX;

            item.setMovingX(10 * dir);
        });

        this.lastMoveTimeX = now;
        this.lastMovePauseTimeX = randomHelper.integer(500, 2000);
    }

    
};
