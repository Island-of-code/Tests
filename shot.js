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

    this.renderObject = function (controlEvent) {
        if (self.destroy) {
            return;
        }
        self.y -= 2;
        if (self.y < 0)
            self.destroy = true;

        ctx.fillStyle = "#FF0000";
        ctx.fillRect(self.x, self.y, self.width, self.height);
        ctx.fillRect(self.x, self.y + self.height + 3, self.width, self.height);

        for (var i = 0; i < gameContext.glyphsTree.aliens.length; i++) {
            if (glyphHelper.macroCollision(self, gameContext.glyphsTree.aliens[i])) {
                glyphsTree.aliens[i].destroy = true;
                this.destroy = true;
                break;

            }

        }
    };
}

