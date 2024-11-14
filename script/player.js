import { addListeners, controls } from "./controls.js";

export default class Player {
    img = document.querySelector('.player-sprite');
    width = this.img.width / 2;
    height = this.img.height;
    frame = 0;
    
    constructor(bulletController, ctx, x) {
        this.ctx = ctx;
        this.pos = {x: x, y: canvas.height - this.height - 20};
        this.speed = 3;
        this.bulletController = bulletController;
        addListeners();
    }
    draw() {
        controls(this);
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
