import { addListeners, controls } from "./controls.js";

export default class Player {
    img = document.querySelector('.player-sprite');
    width = this.img.width / 2;
    height = this.img.height;
    speed = 3;
    frame = 0;
    i = 0;
    
    constructor(ctx, bulletController, x) {
        this.ctx = ctx;
        this.pos = {x: x, y: canvas.height - this.height - 50};
        this.bulletController = bulletController;
        addListeners(this);
    }
    draw() {
        controls(this);
        if (++this.i % 25 === 0)
            this.frame = this.frame == 0 ? 1 : 0;
        this.ctx.drawImage( 
            this.img, 
            this.frame * this.width, 0,
            this.width, this.height,
            this.pos.x, this.pos.y,
            this.width, this.height
        );
    }
    shoot() {
        this.bulletController.shoot({
            x: this.pos.x + this.width / 2, 
            y: this.pos.y - 5
        });
    }
}
