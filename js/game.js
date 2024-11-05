import { canvas, ctx } from "./consts.js";
import { goLeft, goRight, doShoot, addEventListeners } from "./controlls.js";
import Bullet from "./bullet.js";
import Swarm from "./swarm.js";
import Player from "./player.js";

export default class Game {
    loop = null;
    constructor(map) {
        this.lives = 3;
        this.player = new Player();
        this.swarm = new Swarm(map);
        this.test();
        addEventListeners();
    }
    animate() {
        this.controlls();
        ctx.clearRect(0, 0, canvas.width, canvas.height);    
        this.player.update();
        this.swarm.update();
        if (this.lives > 0) {
            this.loop = requestAnimationFrame(() => {
                this.animate();
            });
        }
        if ((this.swarm.out()) ||
            this.swarm.collision(this.player))
            // this.lives--;
            cancelAnimationFrame(this.loop);
        // }
    }
    controlls() {
        if (goLeft) 
            this.player.pos.x -= this.player.pos.x > 0 ? this.player.speed.x : 0;
        if (goRight) 
            this.player.pos.x += (this.player.pos.x + this.player.width < canvas.width) ? this.player.speed.x : 0;
        if (doShoot) {
            let bullet = new Bullet({
                x: this.player.pos.x + this.player.width / 2, 
                y: canvas.height - this.player.height - 15
            });
            bullet.shoot();
        }
    }
    test() {
        addEventListener('keydown', ({code}) => {
            switch(code) {
                case 'ControlLeft': this.swarm.enemies.at(0).pop(); break;
                case 'ShiftLeft': this.swarm.enemies.at(-1).pop(); break;
            }
        });
    }
}
