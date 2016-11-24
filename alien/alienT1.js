"use strict";

AlienT1.width = 30;
AlienT1.height = 24;

AlienT1.prototype = Object.create(Alien.prototype);
AlienT1.behaviour = new AlienBehaviour();

function AlienT1(gameContext, x, y) {
    
    Alien.call(this, gameContext, { x: x, y: y }, { width: AlienT1.width, height: AlienT1.height }, 
        { name: "enemyBlack2.png" });

}

