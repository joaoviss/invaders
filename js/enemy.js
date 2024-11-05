import { canvas, ctx, defaultText } from "./consts.js";

export default class Enemy {
    #i = 0;
    #frame = 0;
    constructor(type, pos, offset) {
        this.image = document.querySelector('.enemy-sprite');
        this.width = this.image.width / 2;
        this.height = this.image.height / 5;
        this.type = type;
        this.offset = {
            x: offset.x * this.width,
            y: offset.y * this.height
        };
        this.pos = {
            x: pos.x + this.offset.x,
            y: pos.y + this.offset.y
        };
    }

    draw() {
        ctx.drawImage(
            this.image, 
            this.#frame * this.width,
            this.type * this.height,
            this.width, this.height,
            this.pos.x, this.pos.y, this.width, this.height
        );
        defaultText();
        ctx.fillText(
            this.type + 1, 
            this.pos.x + this.width / 2,
            this.pos.y + this.height / 2
        );
    }
    update(pos) {
        this.pos.x = pos.x + this.offset.x;
        this.pos.y = pos.y + this.offset.y;
        if (++this.#i % 10 == 0)
            this.#frame = this.#frame == 0 ? 1 : 0;
        this.draw();
    }
    collision(thing) {
        return (
            (this.pos.x <= thing.pos.x + thing.width) &&
            (this.pos.y <= thing.pos.y + thing.height) &&
            (this.pos.x + this.width >= thing.pos.x) &&
            (this.pos.y + this.height >= thing.pos.y)
        );
    }
    out = () => this.pos.y + this.height >= canvas.height;
}
