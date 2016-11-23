"use strict";

Alien.width = 5;
Alien.height = 10;

Alien.prototype = Object.create(Glyph.prototype);
Alien.behaviour = new AlienBehaviour();

function Alien(gameContext, x, y, width, height) {
    
    Glyph.call(this, gameContext, x, y, width, height);

    this.lastShotTime = Date.now();
    this.lastMove = Date.now();
    this.dx = 0;
    this.dy = 0;
    
    this.explosionSprite = new Sprite(gameContext.ctx,
            "exploer.png",
            [0, 117],
            [39, 39],
            16,
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            null,
            true);


}

Alien.prototype.handleInput = function () {
    Alien.behaviour.update(this._gameContext, this);
}

Alien.prototype.setMovingState = function (deltaX, deltaY) {
    this.dx = deltaX;
    this.dy = deltaY;
}

Alien.prototype.explosion = function () {
    this.currentSprite = this.explosionSprite;
    var self = this;
    this.currentSprite.doneEvent = function () {
        self.delete();
        if (self.destroyEvent)
            self.destroyEvent();
    }
    this.frames = this.explosionSprite.frames;
}

Alien.prototype.update = function (dt) {

    if (this.dx > 0) {
        this.x++;
        this.dx--;
    }
    if (this.dx < 0) {
        this.x--;
        this.dx++;
    }
    if (this.dy > 0) {
        this.y++;
        this.dy--;
    }
    if (this.dy < 0) {
        this.y--;
        this.dy++;
    }

    this.currentSprite.update(dt);
}