"use strict";

Alien.width = 5;
Alien.height = 10;

Alien.prototype = Object.create(Glyph.prototype);

function Alien(gameContext, x) {

    Glyph.call(this, gameContext);
    
    var self = this;
    this.x = x;
    this.y = Alien.height;
    this.width = Alien.width;
    this.height = Alien.height;
    this.destroy = false;
    var ctx = this.gameContext.ctx;

    this.renderObject = function (controlEvent) {

        if (self.destroy) {
            return;
        }

        ctx.fillStyle = "#FF0000";
        ctx.fillRect(self.x, self.y, self.width, self.height);
    };
}

