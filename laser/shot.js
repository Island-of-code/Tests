"use strict";

Shot.width = 4;
Shot.height = 24;
Shot.prototype = Object.create(Glyph.prototype);
Shot.behaviour = new ShotBehaviour();

function Shot(gameContext, x, y) {

    Glyph.call(this, gameContext, x, y, Shot.width, Shot.height);

    this.currentSprite = new Sprite(gameContext.ctx,
            "laserRed16.png",
            [0, 0],
            [this.width, this.height],
            16,
            [0],
            null,
            false);

    this.frames = this.currentSprite.frames;

    
}

Shot.prototype.handleInput = function () {
    Shot.behaviour.update(this._gameContext, this);
}

Shot.prototype.update = function (dt) {

    this.currentSprite.update(dt);
}