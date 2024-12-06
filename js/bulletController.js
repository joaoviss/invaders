import Bullet from "./bullet.js";

export default class BulletController {
    bullets = [];
    next = 0;
    
    constructor(color, speed, delay) {
        this.color = color;
        this.speed = speed;
        this.delay = delay;
    }
    draw(ctx) {
        this.bullets.forEach(bullet => {
            if (bullet.isOut())
                this.erase(bullet);
            bullet.draw(ctx);
        });
    }
    reload(x, y) {
        if (--this.next <= 0) {
            this.bullets.push(new Bullet(this.color, 5, this.speed, x, y));
            this.next = this.delay;
        }
    }
    erase(bullet) {
        let index = this.bullets.indexOf(bullet);
        this.bullets.splice(index, 1);
    }
}
