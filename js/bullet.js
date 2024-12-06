export default class Bullet {
    
    width = 5;
    height = 5;
    
    constructor(color, radius, speed, x, y) {
        this.color = color;
        this.radius = radius;
        this.speed = speed;
        this.x = x - this.width /2;
        this.y = y;
    }
    draw(ctx) {
        this.y += this.speed;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
    isOut = () => this.y <= -this.height;
    hit = (that) => Math.hypot(this.x - that.x, this.y - that.y) <= this.radius + that.radius;
}