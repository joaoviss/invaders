import Player from "./player.js";
import Enemy from "./enemy.js";
import BulletController from "./bulletcontroller.js";

export default class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.eBulletController = new BulletController(this.ctx, -5);
    }
    play() {
        let bulletController = new BulletController(this.ctx, 5);
        let player = new Player(this.ctx, bulletController, canvas.width / 2 );
        let enemies = Array.from({length: 15}, () => new Enemy(this.ctx, ~~(Math.random() * 5), {x: 10, y: 10}));
        setInterval(() => {
            this.ctx.clearRect(0, 0, canvas.width, canvas.height);
            player.draw();
            enemies.forEach(enemy => {
                enemy.update();
            });
            bulletController.draw();
            this.collision(bulletController, enemies);
            this.score();
        }, 1000 / 60);
    }
    collision(bulletController, enemies) {
        bulletController.bullets.forEach(bullet => {
            enemies.forEach(enemy => {
                if (bullet.hit(enemy)) {
                    let bulletIndex = bulletController.bullets.indexOf(bullet);
                    bulletController.bullets.splice(bulletIndex, 1);
                    if (enemy.type > 0) {
                        enemy.type--;
                    } else {
                        let enemyIndex = enemies.indexOf(enemy);
                        enemies.splice(enemyIndex, 1);
                    }
                }
           });
        });
    }
    score() {
        this.ctx.save();
        this.ctx.globalAlpha = 0.25;
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0, canvas.height - 45, canvas.width, 45);
    }
}
