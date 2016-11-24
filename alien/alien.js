"use strict";


Alien.prototype = Object.create(Glyph.prototype);
Alien.behaviour = new AlienBehaviour();

function Alien(gameContext, pos, size, spriteOptions) {
    
    Glyph.call(this, gameContext, pos, size);

    this.lastShotTime = Date.now();
    this.lastMoveTime = Date.now();
    this.dx = 0;
    this.dy = 0;
    
    this.currentSprite = new Sprite(gameContext.ctx,
            spriteOptions.name,
            [0, 0],
            [this.width, this.height],
            16,
            spriteOptions.frames || [0],
            null,
            false);

    this.explosionSprite = new Sprite(gameContext.ctx,
            "exploer.png",
            [0, 117],
            [39, 39],
            16,
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            null,
            true);

    this.frames = this.currentSprite.frames;

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
    this.currentSprite.onDoneEvent = function () {
        self.delete();
        if (self.onDestroyEvent)
            self.onDestroyEvent();
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