"use strict";

Laser.width = 10;
Laser.height = 10;

Laser.prototype = Object.create(Glyph.prototype);
Laser.behaviour = new LaserBehaviour();

function Laser(gameContext) {

    Glyph.call(this, gameContext);
    var self = this;
    var ctx = gameContext.ctx;
    this.x = gameContext.canvasWidth / 2;
    this.y = gameContext.canvasHeight - 10;
    this.width = Laser.width;
    this.height = Laser.height;
    this.lastShotTime = Date.now();
    this.sprite = new Sprite(ctx, "images/laser.png", [this.x, this.y], [this.width, this.height]);

    this.handleInput = function(input) {
        Laser.behaviour.update(gameContext, self, input);
    }

    this.update = function () {
    }

    this.render = function () {

        this.sprite.render();
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(self.x, self.y, self.width, self.height);
    };
}




