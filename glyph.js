"use strict";

function Glyph(gameContext) {
    this.gameContext = gameContext;
    this.destroy = false;
    this.sprite = null;

    this.render = function () {

        if (this.destroy) {
            return;
        }

        this.currentSprite.x = this.x;
        this.currentSprite.y = this.y;
        this.currentSprite.frames = this.frames;
        this.currentSprite.render();
    };


}

