"use strict";


Alien.prototype = Object.create(Glyph.prototype);
Alien.behaviour = new AlienBehaviour();

function Alien(gameContext, pos, size, spriteOptions) {
    
    Glyph.call(this, gameContext, pos, size);

    this.lastShotTime = Date.now();
    this.lastMoveTimeY = Date.now();
    this.lastMoveTimeX = Date.now();
    this._dx = 0;
    this._dy = 0;
    this._shotSoundElem = resourceHelper.getSound('shotSound');
    this._explosionSoundElem = resourceHelper.getSound('explosionSound');
    this._movingSoundElem = resourceHelper.getSound('alienMovingSound');


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

Alien.prototype.setMovingY = function (deltaY) {
    this._dy = deltaY;

}

Alien.prototype.setMovingX = function (deltaX) {
    this._dx = deltaX;
    this.playMovingSound();
}

Alien.prototype.playShotSound = function () {
    this._shotSoundElem.play();
}

Alien.prototype.playExplosionSound = function () {
    this._explosionSoundElem.play();
}

Alien.prototype.playMovingSound = function () {
    this._movingSoundElem.play();
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
    this.playExplosionSound();
}

Alien.prototype.update = function (dt) {

    if (this._dx > 0) {
        this.x++;
        this._dx--;
    }
    if (this._dx < 0) {
        this.x--;
        this._dx++;
    }
    if (this._dy > 0) {
        this.y++;
        this._dy--;
    }
    if (this._dy < 0) {
        this.y--;
        this._dy++;
    }

    this.currentSprite.update(dt);
}