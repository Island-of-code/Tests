"use strict";

function GameContext(ctx, canvasElement) {

    this.ctx = ctx;
    this.canvasHeight = canvasElement.height;
    this.canvasWidth = canvasElement.width;
    this.glyphsTree = {
        laser: null,
        shots: [],
        aliens: [],
        alienShots: []
    };
    this.player = {
        lives: 3,
        score: 0
    };
}
