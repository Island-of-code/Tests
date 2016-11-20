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

    

    //this.sprite = new Sprite(ctx, "./images/laser.png", [0, 0], [50, 50]);
    this.sprite = new Sprite(ctx, "./images/exploer.png", [0, 117],
                                       [39, 39],
                                       16,
                                       [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                                       null,
                                       false);

    this.handleInput = function(input) {
        Laser.behaviour.update(gameContext, self, input);
    }

    this.update = function (dt) {

        this.sprite.update(dt);
    }

    this.render = function () {

        
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(self.x, self.y, self.width, self.height);
        this.sprite.render();
    };
}




