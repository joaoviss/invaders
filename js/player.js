import Ship from "./ship.js";
import BulletController from "./bulletController.js";
import { left, right, addListeners } from "./controlls.js";

export default class Player extends Ship {

    img = document.querySelector('.player-sprite');
    trigger = true;
    speed = 5;
    score = 0;
    width = this.img.width / 11;
    height = this.img.height;
    radius = this.width / 4;
    
    constructor(health = 5) {
        super();
        this.bulletController = new BulletController('orange', -3, 70)
        this.health = health;
        this.x = canvas.width / 2;
        this.y = canvas.height - this.radius - 55;
        addListeners();
    }
    draw(ctx) {
        if (left) 
            this.x -= (this.x > 0) ? this.speed : 0;
        if (right) 
            this.x += (this.x < canvas.width) ? this.speed : 0;
        if (++this.i % 5 === 0)
            this.frame = this.frame < 1 ? 1 : 0;
        this.bulletController.reload(ctx, this.x, this.y - this.radius);
        super.draw(ctx);
    }
    explode() {
        // if (this.i % 5 === 0) {4
            // this.frame = 2;
            this.frame += (this.frame < 10) ? 1 : 0;
        // }
    }
}

