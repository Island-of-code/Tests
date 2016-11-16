"use strict";

AlienShot.width = 1;
AlienShot.height = 10;

AlienShot.prototype = Object.create(Glyph.prototype);

function AlienShot(gameContext, x) {
    
    Glyph.call(this, gameContext);
    var self = this;
    this.x = x;
    this.y = AlienShot.height;
    this.width = AlienShot.width;
    this.height = AlienShot.height;

    var ctx = this.gameContext.ctx;
    
    this.handleInput = function(input) {
        AlienShot.behaviour.update(gameContext, self, input);
    }

    this.updateState = function () {

    }

    this.render = function () {

        if (self.destroy) {
            return;
        }
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(self.x, self.y, self.width, self.height);
    };
}

