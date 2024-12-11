import Ship from "./ship.js";
import { left, right, addListeners } from "./controlls.js";

export default class Player extends Ship {

    img = document.querySelector('.player-sprite');
    trigger = true;
    speed = 5;
    score = 0;
    width = this.img.width / 2;
    height = this.img.height;
    radius = this.img.width / 4;
    
    constructor(bulletController, lives, health) {
        super();
        this.bulletController = bulletController;
        this.health = health;
        this.lives = lives;
        this.fullHealth = health;
        this.x = canvas.width /2 - this.radius;
        this.y = canvas.height - this.radius - 55;
        addListeners();
    }
    draw(ctx) {
        if (left) 
            this.x -= (this.x > 0) ? this.speed : 0;
        if (right) 
        this.x += (this.x < canvas.width) ? this.speed : 0;
        this.bulletController.reload(ctx, this.x, this.y - this.radius);
        super.draw(ctx);
    }
}
