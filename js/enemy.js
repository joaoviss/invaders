import Ship from "./ship.js";
import BulletController from "./bulletController.js";

export default class Enemy extends Ship {

    img = document.querySelector('.enemy-sprite');
    width = this.img.width / 2;
    height = this.img.height;
    radius = this.img.width / 4;
    angle = 0;
    angleSpeed = 5;
    
    constructor(health, points) {
        super();
        this.bulletController = new BulletController(
            'red', 
            Math.random() * 2 + 3,
            Math.random() * 10 + 30
        );

        this.points = points;
        this.health = health;
        this.fullHealth = health;
        this.speed = Math.random() * 4 + 2;
        this.speed *= (Math.random() - 0.5 > 0) ? 1 : -1;
        this.x = (Math.random() - 0.5 > 0) ? 0 : canvas.width;
        this.y = this.radius;
        this.curve = 20//~~(Math.random() * this.radius) + this.radius * 2;
    }
    draw(ctx) {
        if (++this.i % 5 === 0)
            this.frame = this.frame == 0 ? 1 : 0;
        this.angle += this.angleSpeed;
        // this.x1 = this.curve * Math.sin(this.angle * Math.PI / 180);
        this.y = this.curve * Math.cos(this.angle * Math.PI / 180) + this.radius * 2;
        if ((this.x < 0) || (this.x > canvas.width))
            this.speed *= -1;
        this.x += this.speed;
        this.bulletController.reload(ctx, this.x, this.y + this.radius);
        this.printHealth(ctx);
        super.draw(ctx);
    }
    printHealth(ctx) {
        let gradient = ctx.createLinearGradient(0, 0, 0, this.height);
        gradient.addColorStop(0, 'red');
        gradient.addColorStop(0.354, 'orange');
        gradient.addColorStop(0.654, 'yellow');
        gradient.addColorStop(1, 'green');
        ctx.save();
        ctx.fillStyle = gradient;
        ctx.strokeStyle = 'white';
        ctx.fillRect(this.x + this.radius, this.y - this.radius, 5, this.health*this.height/this.fullHealth);
        ctx.strokeRect(this.x + this.radius, this.y - this.radius, 5, this.height);
        ctx.restore();
    }
}
