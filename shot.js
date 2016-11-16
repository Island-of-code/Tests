"use strict";

Shot.width = 2;
Shot.height = 4;
Shot.prototype = Object.create(Glyph.prototype);

function Shot(gameContext, x) {

    Glyph.call(this, gameContext);

    var self = this;
    this.x = x;
    this.y = gameContext.canvasHeight - 10;
    this.width = Shot.width;
    this.height = Shot.height;
    var ctx = gameContext.ctx;
    var glyphsTree = gameContext.glyphsTree;

    this.handleInput = function (input) {

    }

    this.updateState = function () {

        self.y -= 2;
        if (self.y < 0)
            self.destroy = true;

        gameContext.glyphsTree.aliens.some(function(alien) {
            if (glyphHelper.macroCollision(self, alien)) {
                alien.destroy = true;
                self.destroy = true;
                return true;
            }
        });
    }

    this.render = function () {

        if (self.destroy) {
            return;
        }
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(self.x, self.y, self.width, self.height);
        //ctx.fillRect(self.x, self.y + self.height + 3, self.width, self.height);

        
    };
}

