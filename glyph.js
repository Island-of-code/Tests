"use strict";

function Glyph(gameContext, x, y, width, height) {
    this._gameContext = gameContext;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.isDeleted = false;
    this.sprite = null;
    this.frames = [0];
    this.isDeleted = false;
}

Glyph.prototype.delete = function () {
    this.isDeleted = true;
}

Glyph.prototype.render = function() {

    if (this.isDeleted)
        return;

    this.currentSprite.x = this.x;
    this.currentSprite.y = this.y;
    this.currentSprite.frames = this.frames;
    this.currentSprite.render();
};

