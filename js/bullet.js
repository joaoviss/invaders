import { canvas, ctx } from "./consts.js";

export default class Bullet {
    constructor(pos) {
        this.pos = pos;
        this.speed = 5;
    }
    draw() {
        ctx.save();
        ctx.fillStyle = 'yellow';
        ctx.fillRect(this.pos.x, this.pos.y, 3, 5);
        ctx.restore();
    }
    update() {
        this.pos.y -= this.speed;
        this.draw();
    }
    shoot() {
        this.update();
        requestAnimationFrame(() => this.shoot());
    }
}