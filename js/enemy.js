import Ship from "./ship.js";

export default class Enemy extends Ship {

    img = document.querySelector('.enemy-sprite');
    width = this.img.width / 2;
    height = this.img.height;
    radius = this.img.width / 4;
    
    constructor(canvas, bulletController, health) {
        super(canvas, bulletController);
        this.health = health;
        this.flullHealth = health;
        if (Math.random() - 0.5 > 0) {
            this.x = this.radius;
            this.speed = 3;
        } else {
            this.x = canvas.width - this.radius;
            this.speed = -3;
        };
        this.y = this.radius;
    }
    draw(ctx) {
        if ((this.x - this.radius < 0) || (this.x + this.radius > this.canvas.width))
            this.speed *= -1;
        this.x += this.speed;
        super.draw(ctx);
        this.bulletController.reload(this.x, this.y + this.radius);
        this.printHealth(ctx);
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
        ctx.fillRect(this.x + this.radius, this.y - this.radius, 5, this.health*this.height/this.flullHealth);
        ctx.strokeRect(this.x + this.radius, this.y - this.radius, 5, this.height);
        ctx.restore();
    }
}
