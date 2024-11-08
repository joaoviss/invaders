import { canvas, ctx } from "./consts.js";
import { addEventListeners, controlls, test } from "./controlls.js";
import Swarm from "./swarm.js";
import Player from "./player.js";
import Bullet from "./bullet.js";


export default class Game {
    loop = null;
    constructor(map) {
        this.lives = 3;
        this.player = new Player();
        this.swarm = new Swarm(map);
        test(this);
        addEventListeners();
    }
    animate() {
        controlls(this.player);
        ctx.clearRect(0, 0, canvas.width, canvas.height);    
        this.player.update();
        this.swarm.update();
        /*
        if (this.swarm.collision(this.player)) {
            this.swarm.speed.x = 0;
            this.swarm.speed.y = 0;
        }
        // */
        if (this.lives > 0) {
            this.loop = requestAnimationFrame(() => {
                this.animate();
            });
        }
        /* 
        if ((this.swarm.out()) || (this.swarm.collision(this.player))) {
            this.gameOver();
            this.lives--;
            // this.swarm.speed.x = 0;
            // cancelAnimationFrame(this.loop);
        }
        // */
    }
    gameOver() {
        ctx.font = '40pt "Press Start 2p"';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = "#f08";
        ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2);
    }
}
