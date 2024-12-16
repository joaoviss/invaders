import Background from "./background.js";
import Player from "./player.js";
import Hud from "./hud.js";
import Enemy from "./enemy.js";

export default class Game {
    
    constructor() {
        this.playerHealth = 5;
        this.ctx = canvas.getContext('2d');
        this.background = new Background();
        this.player = new Player(this.playerHealth); 
        this.enemy = new Enemy(3);
        this.hud = new Hud(40, this.playerHealth);
        this.score = 0;
        this.lives = 3;
    }
    play() {
        this.loop = setInterval(() => {
            this.ctx.clearRect(0, 0, canvas.width, canvas.height);
            this.background.draw(this.ctx);
            this.collision(this.enemy);
            this.collision(this.player);
            this.player.draw(this.ctx);
            this.enemy.draw(this.ctx);
            this.hud.draw(this.ctx, this.score, this.player.health, this.lives);
        }, 1000 / 60);
    }
        gameOver() {
            this.ctx.save();
            this.ctx.globalAlpha = 0.8;
            this.ctx.fillStyle = 'black';
            this.ctx.fillRect(0, 0, canvas.width, canvas.height);
            this.ctx.restore();
            this.ctx.fillStyle = 'red';
            this.ctx.textBaseline = 'middle';
            this.ctx.textAlign = 'center';
            this.ctx.font = "30pt 'Press Start 2p'";-
            this.ctx.fillText(`Game Over!`, canvas.width / 2, canvas.height  / 2);
        }
    collision(who) {
        let controller = who.bulletController;
        controller.bullets.forEach(bullet => {
            switch (who.constructor.name) {
                case 'Player':
                    if (bullet.hit(this.enemy)) {
                        controller.erase(bullet);
                        if (this.enemy.health > 1) {
                            this.enemy.health--;
                        } else {
                            this.enemy = new Enemy(3);
                            this.score++;
                        }
                    }
                break;
                case 'Enemy':
                    if (bullet.hit(this.player)) {
                        controller.erase(bullet);
                        if (this.lives > 1) {
                            if (this.player.health > 1) {
                                this.player.health--;
                            } else {
                                this.player = new Player(); 
                                this.lives--;
                            }
                        } else {
                            this.gameOver();
                            clearInterval(this.loop);
                        }
                    }
                break;
            }
        });
    }
}