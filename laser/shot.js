"use strict";

Shot.width = 4;
Shot.height = 24;
Shot.prototype = Object.create(Glyph.prototype);
Shot.behaviour = new ShotBehaviour();

function Shot(gameContext, x, y) {

    Glyph.call(this, gameContext, [x, y], [Shot.width, Shot.height]);
    this.dy = 10;

    this.currentSprite = new Sprite(gameContext.ctx,
            "laserRed16.png",
            [0, 0],
            [this.width, this.height],
            16,
            [0],
            null,
            false);

    this.frames = this.currentSprite.frames;

    this.explosionSprite = new Sprite(gameContext.ctx,
           "star4.png",
           [0, 0],
           [16, 15],
           16,
           [0, 1, 2],
           null,
           true);


}

Shot.prototype.explosion = function () {
    this.currentSprite = this.explosionSprite;
    var self = this;
    this.currentSprite.onDoneEvent = function () {
        self.delete();
    }
    this.y -= 6;
    this.x -= 6;
    this.dy = 0;
    this.frames = this.explosionSprite.frames;
}


Shot.prototype.handleInput = function () {
    Shot.behaviour.update(this._gameContext, this);
}

Shot.prototype.update = function (dt) {

    this.currentSprite.update(dt);
}