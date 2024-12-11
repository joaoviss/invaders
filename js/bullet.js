export default class Bullet {
    
    constructor(color, radius, speed, x, y) {
        this.color = color;
        this.radius = radius;
        this.speed = speed;
        this.x = x;
        this.y = y;
    }
    draw(ctx) {
        this.y += this.speed;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
    isOut = () => this.y <= -this.radius * 2 || this.y >= canvas.height + this.radius * 2;

    // Pitágoras :)
    hit = (that) => Math.hypot(this.x - that.x, this.y - that.y) <= this.radius + that.radius;
}