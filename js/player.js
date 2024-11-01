import { canvas, ctx, enemy, player } from "./consts.js";

export default class Player {
    i = 0;
    frame = 0;
    constructor() {
        this.pos = { x: 250, y: canvas.height - player.height - 10 };
        this.speed = 3;
        this.left = false;
        this.right = false;
        this.shoot = false;
        addEventListener('keydown', ({code}) => {
            switch (code) {
                case 'Numpad4': this.left = true; break;
                case 'Numpad6': this.right = true; break;
                case 'Space': this.shoot = true; break;
            }
        });
        addEventListener('keyup', ({code}) => {
            switch (code) {
                case 'Numpad4': this.left = false; break;
                case 'Numpad6': this.right = false; break;
                case 'Space': this.shoot = false; break;
            }
        });
    }
    draw() {
        ctx.drawImage(
            player.image, 
            this.frame * player.width, 0, 
            player.width, player.height,
            this.pos.x, this.pos.y, 
            player.width, player.height
        );
    }
    update() {
        if (++this.i % 15 === 0)
            this.frame = this.frame === 0 ? 1 : 0;
        if (this.left) this.pos.x -= this.pos.x > 0 ? this.speed : 0;
        if (this.right) this.pos.x += this.pos.x + player.width < canvas.width ? this.speed : 0;
        console.log(this.left, this.right, this.shoot);
        
        this.draw();
    }
}
