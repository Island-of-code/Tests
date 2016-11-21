"use strict";

function Sprite(ctx, url, pos, size, speed, frames, dir, once) {
    this.ctx = ctx;
    this.pos = pos;
    this.size = size;
    this.speed = typeof speed === 'number' ? speed : 0;
    this.frames = frames;
    this._index = 0;
    this.url = url;
    this.dir = dir || 'horizontal';
    this.once = once;
    this.x = 0;
    this.y = 0;
};

Sprite.prototype.update = function (dt) {
    this._index += this.speed * dt;
}

Sprite.prototype.render = function () {
    var frame;

    if (this.speed > 0) {
        var max = this.frames.length;
        var idx = Math.floor(this._index);
        frame = this.frames[idx % max];

        if (this.once && idx >= max) {
            this.done = true;
            if (this.doneEvent)
                this.doneEvent();
            return;
        }
    }
    else {
        frame = 0;
    }
    
    var x = this.pos[0];
    var y = this.pos[1];

    if (this.dir == 'vertical') {
        y += frame * this.size[1];
    }
    else {
        x += frame * this.size[0];
    }

    this.ctx.drawImage(resources.get(this.url),
                   x, y,
                   this.size[0], this.size[1],
                   this.x, this.y,
                   this.size[0], this.size[1]);
}