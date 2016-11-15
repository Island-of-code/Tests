"use strict";

function GameDataContext(ctx, canvasElement) {

    this.ctx = ctx;
    this.canvasHeight = canvasElement.height;
    this.canvasWidth = canvasElement.width;
    this.glyphsTree = {
        laser: null,
        shots: [],
        aliens: []
    };

    
}
