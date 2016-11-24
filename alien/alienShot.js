"use strict";

AlienShot.width = 2;
AlienShot.height = 8;

AlienShot.prototype = Object.create(Glyph.prototype);
AlienShot.behaviour = new AlienShotBehaviour();

function AlienShot(gameContext, x, y) {
    
    Glyph.call(this, gameContext, [x, y], [AlienShot.width, AlienShot.height]);
    
    var ctx = this._gameContext.ctx;
    
    this.currentSprite = new Sprite(ctx,
            "laserBlue03.png",
            [0, 0],
            [this.width, this.height],
            16,
            [0],
            null,
            false);
   
}

AlienShot.prototype.handleInput = function () {
    AlienShot.behaviour.update(this._gameContext, this);
}

AlienShot.prototype.update = function (dt) {
    this.currentSprite.update(dt);
}