export default class Enemy {
    img = document.querySelector('.enemy-sprite');
    width = this.img.width / 2;
    height = this.img.height / 5;
    frame = 0;
    
    constructor(ctx, type, pos) {
        this.ctx = ctx;
        this.pos = pos;
        this.y = 0;
        this.speed = {x: Math.random() * 3, y: 10, a: Math.random() * 3};
        this.type = type;
        this.angle = 0;
        this.curve = Math.random() * 50 + 50; 
    }
    draw() {
        this.ctx.drawImage(
            this.img, 
            this.frame * this.width, this.type * this.height,
            this.width, this.height,
            this.pos.x, this.pos.y,
            this.width, this.height
        );
    }
    update() {
        this.frame = this.frame == 0 ? 1 : 0;
        if ((this.pos.x <= 0) || (this.pos.x + this.width >= canvas.width)) {
            this.speed.x *= -1;
            this.speed.a = Math.random() * 5;
            this.y += this.speed.y;
        }
        this.pos.x += this.speed.x;
        this.pos.y = this.curve * Math.sin(this.angle * Math.PI / 180) + this.y;
        this.angle += this.speed.a;
        this.draw();
    }
}
