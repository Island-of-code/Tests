"use strict";

Alien.width = 5;
Alien.height = 10;

Alien.prototype = Object.create(Glyph.prototype);
Alien.behaviour = new AlienBehaviour();

function Alien(gameContext, x) {
    
    Glyph.call(this, gameContext);
    var self = this;
    this.x = x;
    this.y = Alien.height;
    this.width = Alien.width;
    this.height = Alien.height;
    var ctx = this.gameContext.ctx;
    this.lastShotTime = Date.now();

    this.handleInput = function(input) {
        Alien.behaviour.update(gameContext, self, input);
    }

    this.update = function () {

    }

    this.render = function () {

        if (self.destroy) {
            return;
        }
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(self.x, self.y, self.width, self.height);
    };
}

