import Ship from "./ship.js";

export default class Enemy extends Ship {

    img = document.querySelector('.enemy-sprite');
    width = this.img.width / 2;
    height = this.img.height;
    radius = this.img.width / 4;
    angle = 0;
    angleSpeed = 0.3;
    curve = ~~(Math.random() * this.radius) + this.radius;
    
    constructor(bulletController, health) {
        super();
        this.bulletController = bulletController;
        this.health = health;
        this.fullHealth = health;
        this.x = (Math.random() - 0.5 > 0) ? 0 : canvas.width;
        this.speed = (Math.random() - 0.5 > 0) ? 3 : -3;
        this.y = this.radius;
    }
    draw(ctx) {
        this.angle += this.angleSpeed;
        // this.x += this.curve * Math.sin(this.angle * Math.PI / 180);
        // this.y = this.curve * Math.cos(this.angle * Math.PI / 180);
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
