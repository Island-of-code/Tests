"use strict";

Shot.width = 4;
Shot.height = 24;
Shot.prototype = Object.create(Glyph.prototype);
Shot.behaviour = new ShotBehaviour();

function Shot(gameContext, x, y) {

    Glyph.call(this, gameContext);

    var self = this;
    this.x = x;
    this.y = y;
    this.width = Shot.width;
    this.height = Shot.height;
    var ctx = gameContext.ctx;

    this.currentSprite = new Sprite(ctx,
            "./images/laserRed16.png",
            [0, 0],
            [this.width, this.height],
            16,
            [0],
            null,
            false);

    this.frames = this.currentSprite.frames;

    this.handleInput = function (input) {
        Shot.behaviour.update(gameContext, self, input);
    }

    this.update = function (dt) {

        this.currentSprite.update(dt);
    }
}

