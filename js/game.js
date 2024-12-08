import Player from "./player.js";
import Enemy from "./enemy.js";
import BulletController from "./bulletController.js";

export default class Game {

    img = document.querySelector('.space');
    
    constructor(canvas) {
        this.bgY = -canvas.height;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.playerBulletController = new BulletController('orange', -3, 70);
        this.enemyBulletController = new BulletController('red', 3, 40);
        this.player = new Player(canvas, this.playerBulletController);
        this.enemy = new Enemy(canvas, this.enemyBulletController, 5);
    }
    play() {
        let loop = setInterval(() => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.bgY += (this.bgY < 0) ? 1 : -this.canvas.height;
            this.ctx.drawImage(this.img, 0, this.bgY, this.canvas.width, this.canvas.height * 2);
            this.player.draw(this.ctx);
            this.enemy.draw(this.ctx);
            this.playerBulletController.draw(this.ctx);
            this.enemyBulletController.draw(this.ctx);
            this.collision(this.player);
            // this.collision([this.player, this.enemy]);
            this.display();
        }, 1000 / 60);
    }
/*
/*/
    collision(who) {
        let controller = who.bulletController;
        controller.bullets.forEach(bullet => {
            if (bullet.hit(this.enemy)) {
                controller.erase(bullet);
                if (this.enemy.health > 1)
                    this.enemy.health--;
                else {
                    this.enemy = new Enemy(this.canvas, this.enemyBulletController, 5);
                    this.player.score++;
                }
                    // switch (who.constructor.name) {
                    // case 'Player':
                    //     break;
                    //     case 'Enemy':
                    //         this.player.health--;
                    //     break;
                    // }
            }
        });
    }
// */
    display() {
        this.ctx.textBaseline = 'middle';
        this.ctx.font = "15pt 'Press Start 2p'";

        this.ctx.save();
        this.ctx.globalAlpha = 0.3;
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0, this.canvas.height - 50, this.canvas.width, this.canvas.height);
        this.ctx.restore();

        this.ctx.save();

        this.ctx.fillStyle = 'white';
        this.ctx.textAlign = 'left';
        this.ctx.fillRect(this.canvas.width /2 - 50, this.canvas.height - 35, 200, 20);
        
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(this.player.getScore, 25, this.canvas.height - 25);
    }
}
