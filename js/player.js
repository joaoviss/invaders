import { canvas, ctx } from "./consts.js";
import { doShoot } from "./controlls.js";
import Bullet from "./bullet.js";

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
        this.bullets = [];
    }
    shoot() {;
        if (++this.j % 15 === 0) {
            this.bullets.push(
                new Bullet({
                    x: this.pos.x + this.width / 2,
                    y: this.pos.y
                })
            );
            this.bullets.pop().update();
        }
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
        console.log(doShoot);
        if (doShoot) {
            this.shoot();
        };
    }
}

