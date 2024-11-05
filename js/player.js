import { canvas, ctx } from "./consts.js";

export default class Player {
    i = 0;
    j = 15;
    frame = 0;
    constructor() {
        this.image = document.querySelector('.player-sprite');
        this.width = this.image.width / 2;
        this.height = this.image.height;
        this.pos = { x: 250, y: canvas.height - this.height - 10 };
        this.speed = { x: 3, y: 0 };
    }
    draw() {
        ctx.drawImage(
            this.image, 
            this.frame * this.width, 0, 
            this.width, this.height,
            this.pos.x, this.pos.y, 
            this.width, this.height
        );
    }
    update() {
        if (++this.i % 15 === 0)
            this.frame = this.frame === 0 ? 1 : 0;
        this.draw();
    }
}
