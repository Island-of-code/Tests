"use strict";

Shot.width = 2;
Shot.height = 4;
Shot.prototype = Object.create(Glyph.prototype);
Shot.behaviour = new ShotBehaviour();

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
        Shot.behaviour.update(gameContext, self, input);
    }

    this.update = function () {

       
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

