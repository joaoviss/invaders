import { canvas, ctx } from "./consts.js";

export default class Bullet {
    constructor(pos) {
        this.pos = pos;
        this.width = 5; 
        this.height = 7; 
        this.speed = 5;
    }
    draw() {
        ctx.save();
        ctx.fillStyle = 'yellow';
        ctx.fillRect(this.pos.x - this.width / 2, this.pos.y, this.width, this.height);
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