import { ctx, enemy, defaultText } from "./consts.js";

export default class Enemy {
    #i = 0;
    #frame = 0;
    constructor(type, pos, offset) {
        this.type = type;
        this.offset = offset;
        this.pos = {
            x: pos.x + this.offset.x,
            y: pos.y + this.offset.y
        };
    }

    draw() {
        ctx.drawImage(
            enemy.image, 
            this.#frame * enemy.width,
            this.type * enemy.height,
            enemy.width, enemy.height,
            this.pos.x, this.pos.y, enemy.width, enemy.height
        );
        defaultText();
        ctx.fillText(
            this.pos.x, 
            this.pos.x + enemy.width / 2,
            this.pos.y + enemy.height / 2
        );
    }
    update(pos) {
        this.pos.x = pos.x + this.offset.x;
        this.pos.y = pos.y + this.offset.y;
        if (++this.#i % 10 == 0)
            this.#frame = this.#frame == 0 ? 1 : 0;
        this.draw();
    }
}
