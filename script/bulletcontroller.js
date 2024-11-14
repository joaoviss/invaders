import Bullet from "./bullet.js";

export default class BulletController {
    next = 0;
    delay = 25;
    bullets = [];

    constructor(ctx) {
        this.ctx = ctx;
    }
    shoot(pos) {
       if (this.next <= 0) {
            this.bullets.push(new Bullet(this.ctx, pos));
            this.next = this.delay;
        }
        this.next--;
    }
    draw() {
        this.bullets.forEach(bullet => {
            if (bullet.isOffScreen()) {
                let index = this.bullets.indexOf(bullet);
                this.bullets.splice(index, 1);
            }
            bullet.draw();
        });
    }
}
