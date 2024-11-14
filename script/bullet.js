export default class Bullet {   
    speed = 5;
    width = 3;
    height = 5;
    constructor(ctx, pos) {
        this.ctx = ctx;
        this.pos = pos;
    }
    draw() {
        this.ctx.fillStyle = 'red';
        this.pos.y -= this.speed;
        this.ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }
    isOffScreen = () => this.pos.y <= -this.height;
    hit(enemy) {
        
    }
}
