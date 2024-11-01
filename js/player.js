import { canvas, ctx, player } from "./consts.js";

export default class Player {
    #i = 0;
    #frame = 0;
    constructor() {
        this.pos = { x: 250, y: 0 };
        this.speed = 3;
    }
    draw() {
        ctx.drawImage(
            player.image, 
            this.#frame * player.width, 0, 
            player.width, player.height,
            this.pos.x, this.pos.y, 
            player.width, player.height
        );
    }
    update() {
        if (++this.#i % 15 === 0)
            this.#frame = this.#frame === 0 ? 1 : 0

        this.draw();
    }
}