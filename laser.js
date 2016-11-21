"use strict";

Laser.width = 35;
Laser.height = 27;

Laser.prototype = Object.create(Glyph.prototype);
Laser.behaviour = new LaserBehaviour();

function Laser(gameContext) {

    Glyph.call(this, gameContext);
    var self = this;
    var ctx = gameContext.ctx;
    this.x = gameContext.canvasWidth / 2;
    this.y = gameContext.canvasHeight - Laser.height;
    this.width = Laser.width;
    this.height = Laser.height;
    this.lastShotTime = Date.now();
    this._moveFrames = [0, 1];
    this._fixFrames = [0];
    
    this.currentSprite = new Sprite(ctx,
            "./images/playerShip3_green_small.png",
            [0, 0],
            [this.width, this.height],
            16,
            [0],
            null,
            false);

    this.explosionSprite = new Sprite(ctx,
            "./images/exploer.png",
            [0, 117],
            [39, 32],
            16,
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            null,
            true);

    this.frames = this.currentSprite.frames;

    this.handleInput = function(input) {
        Laser.behaviour.update(gameContext, self, input);
    }

    this.update = function (dt) {
        this.currentSprite.update(dt);
    }

    this.explosion = function() {
        this.currentSprite = this.explosionSprite;
        this.frames = this.explosionSprite.frames;
    }

    this.setMovingState = function(state) {
        if (state === true)
            this.frames = this._fixFrames;
        else
            this.frames = this._fixFrames;
    }

}




