"use strict";

function Glyph(gameContext, pos, size) {
    this._gameContext = gameContext;
    this.x = pos[0];
    this.y = pos[1];
    this.width = size[0];
    this.height = size[1];
    this.isDeleted = false;
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

