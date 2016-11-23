"use strict";

function GameContext(ctx) {

    this.ctx = ctx;
    this.canvasHeight = ctx.canvas.height;
    this.canvasWidth = ctx.canvas.width;
    this.glyphsTree = {
        laser: null,
        shots: [],
        aliens: [],
        alienShots: []
    };
    
}
