import BulletController from "./bulletcontroller.js";

export default class Enemy {
    img = document.querySelector('.enemy-sprite');
    width = this.img.width / 2;
    height = this.img.height / 5;
    frame = 0;
    i = 0;
    speed = {x: Math.random() + 2, y: 20, a: Math.random() * 3};
    angle = 0;
    curve = Math.random() * 50 + 50; 
    
    constructor(ctx, type, pos) {
        this.ctx = ctx;
        this.bulletController = new BulletController(this.ctx, -5)
        this.type = type;
        this.pos = pos;
        this.y = 0;
    }
    draw() {
        this.ctx.drawImage(
            this.img, 
            this.frame * this.width, this.type * this.height,
            this.width, this.height,
            this.pos.x, this.pos.y,
            this.width, this.height
        );
        this.ctx.fillStyle = 'white';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'hanging';
        this.ctx.font = "10pt 'Press Start 2P'";
        this.ctx.fillText(
            this.type + 1, 
            this.pos.x + this.width / 2, 
            this.pos.y + this.height / 2
        );
    }
    update() {
        if (++this.i % 25 === 0)
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

    hit = (player) => (
        (player.pos.x <= this.pos.x + this.width) ||
        // (player.pos.y <= this.pos.y + this.height) ||
        (player.pos.x + player.width > this.pos.x) &&
        (player.pos.y + player.height > this.pos.y)
    );
    out = () => this.pos.y + this.height >= canvas.height;
    shoot() {
        this.bulletController.shoot({
            x: this.pos.x + this.width / 2, 
            y: this.pos.y + this.height+ 5
        });
    }
}
