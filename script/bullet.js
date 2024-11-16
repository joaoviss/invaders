export default class Bullet {   
    width = 6;
    height = 8
    constructor(ctx, speed, pos) {
        this.ctx = ctx;
        this.speed = speed;
        this.pos = pos;
    }
    draw() {
        this.ctx.fillStyle = 'red';
        this.pos.y -= this.speed;
        this.ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }
    hit(enemy) {
        return (
            (this.pos.x + this.width >= enemy.pos.x) &&
            (this.pos.x <= enemy.pos.x + enemy.width) &&
            (this.pos.y + this.height >= enemy.pos.y) &&
            (this.pos.y <= enemy.pos.y + enemy.height)
        );
    }
    isOffScreen = () => this.pos.y <= -this.height;
}
