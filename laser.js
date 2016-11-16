"use strict";

Laser.width = 10;
Laser.height = 10;

Laser.prototype = Object.create(Glyph.prototype);
Laser.behaviour = new LaserBehaviour();

function Laser(gameContext) {

    Glyph.call(this, gameContext);
    var self = this;
    this.x = gameContext.canvasWidth / 2;
    this.y = gameContext.canvasHeight - 10;
    this.width = Laser.width;
    this.height = Laser.height;
    var ctx = gameContext.ctx;
    this.lastShotTime = Date.now();

    this.handleInput = function(input) {
        Laser.behaviour.update(gameContext, self, input);
    }

    this.updateState = function () {
    }

    this.render = function() {
        
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(self.x, self.y, self.width, self.height);
    };
}




