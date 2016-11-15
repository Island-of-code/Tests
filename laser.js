"use strict";

Laser.width = 10;
Laser.height = 10;

Laser.prototype = Object.create(Glyph.prototype);

function Laser(gameContext) {

    Glyph.call(this, gameContext);
    var self = this;
    this.x = gameContext.canvasWidth / 2;
    this.y = gameContext.canvasHeight - 10;
    this.width = Laser.width;
    this.height = Laser.height;
    var ctx = gameContext.ctx;

    this.renderObject = function (controlEvent) {

        if (controlEvent.laser.dx) {
            self.x += controlEvent.laser.dx;
        }

        ctx.fillStyle = "#FF0000";
        ctx.fillRect(self.x, self.y, self.width, self.height);
    };
}




