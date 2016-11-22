"use strict";

AlienT1.width = 30;
AlienT1.height = 24;

AlienT1.prototype = Object.create(Alien.prototype);
AlienT1.behaviour = new AlienBehaviour();

function AlienT1(gameContext, x, y) {
    
    Alien.call(this, gameContext, x, y, AlienT1.width, AlienT1.height);

    this.currentSprite = new Sprite(gameContext.ctx,
            "./images/enemyBlack2.png",
            [0, 0],
            [this.width, this.height],
            16,
            [0],
            null,
            false);

    this.frames = this.currentSprite.frames;
   
}

