import Player from "./player.js";
import Hud from "./hud.js";
import Enemy from "./enemy.js";
import BulletController from "./bulletController.js";

export default class Game {

    img = document.querySelector('.space');
    
    constructor() {
        this.bgY = -canvas.height;
        this.ctx = canvas.getContext('2d');
        this.playerBulletController = new BulletController('orange', -3, 70);
        this.enemyBulletController = new BulletController('red', 3, 40);
        this.player = new Player(this.playerBulletController, 3, 10); 
        this.enemy = new Enemy(this.enemyBulletController, 3);
        this.hud = new Hud(40, this.player);
        this.score = 0;
    }
    play() {
        this.loop = setInterval(() => {
            this.ctx.clearRect(0, 0, canvas.width, canvas.height);
            this.bgY += (this.bgY < 0) ? 1 : -canvas.height;
            this.ctx.drawImage(this.img, 0, this.bgY, canvas.width, canvas.height * 2);
            this.player.draw(this.ctx);
            this.enemy.draw(this.ctx);
            this.hud.draw(this.ctx);
            this.collision(this.enemy);
            this.collision(this.player);
        }, 1000 / 60);
    }
    gameOver() {
        this.ctx.globalAlpha = 0.6;
        this.ctx.save();
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, canvas.width, canvas.height);
        this.ctx.restore();
        this.ctx.fillStyle = 'red';
        this.ctx.textBaseline = 'middle';
        this.ctx.textAlign = 'center';
        this.ctx.font = "20pt 'Press Start 2p'";-
        this.ctx.fillText(`Game Over!`, canvas.width / 2, canvas.height  / 2);
    }
    collision(who) {
        let controller = who.bulletController;
        controller.bullets.forEach(bullet => {
            switch (who.constructor.name) {
                case 'Player':
                    if (bullet.hit(this.enemy)) {
                        if (this.enemy.health > 1) {
                            controller.erase(bullet);
                            this.enemy.health--;
                        } else {
                            this.enemy = new Enemy(this.enemyBulletController, 3);
                            this.hud.score = this.player.score++;
                        }
                    }
                break;
                case 'Enemy':
                    if (bullet.hit(this.player)) {
                        if (this.player.lives > 1) {
                            if (this.player.health > 1) {
                                controller.erase(bullet);
                                this.player.health--;
                            } else {
                                this.player.lives--;
                            }
                        } else {
                            clearInterval(this.loop);
                            this.gameOver();
                        }
                    }
                break;
            }
        });
    }
}