"use strict";

Alien.width = 5;
Alien.height = 10;

Alien.prototype = Object.create(Glyph.prototype);
Alien.behaviour = new AlienBehaviour();

function Alien(gameContext, x, y, width, height) {
    
    Glyph.call(this, gameContext);
    var self = this;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.lastShotTime = Date.now();
    this.lastMove = Date.now();
    this.dx = 0;
    this.dy = 0;
    this.frames = [0];

    var self = this;
    this.explosionSprite = new Sprite(gameContext.ctx,
            "./images/exploer.png",
            [0, 117],
            [39, 32],
            16,
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            null,
            true);

    this.handleInput = function(input) {
        Alien.behaviour.update(gameContext, self, input);
    }

    this.update = function (dt) {

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

    

    this.explosion = function () {
        this.currentSprite = this.explosionSprite;
        this.currentSprite.doneEvent = function () {
            self.destroy = true;
        }
        this.frames = this.explosionSprite.frames;
    }

    this.setMovingState = function (deltaX, deltaY) {
        this.dx = deltaX;
        this.dy = deltaY;
    }

}

