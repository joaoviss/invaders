
import Player from "./player.js";
import Enemy from "./enemy.js";
import BulletController from "./bulletcontroller.js";

export default class Game {
    pts = 0;
    constructor(ctx) {
        this.ctx = ctx;
        this.eBulletController = new BulletController(this.ctx, -5);
    }
    play() {
        let bulletController = new BulletController(this.ctx, 5);
        let player = new Player(this.ctx, bulletController, canvas.width / 2 );
        let enemies = Array.from({length: 15}, () => new Enemy(this.ctx, ~~(Math.random() * 5), {x: 10, y: 10}));
        let loop = setInterval(() => {
            this.ctx.clearRect(0, 0, canvas.width, canvas.height);
            player.draw();
            enemies.forEach(enemy => {
                enemy.update();
            });
            bulletController.draw();
            this.collision(bulletController, enemies);
            this.score();
            if (enemies.some(enemy => enemy.out()))
                clearInterval(loop);
            let j = ~~(Math.random() * enemies.length);
            enemies[j].shoot();
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
                        this.pts += enemy.type + 1;
                        let enemyIndex = enemies.indexOf(enemy);
                        enemies.splice(enemyIndex, 1);
                    }
                }
           });
        });
    }
    score() {
        this.ctx.save();
        this.ctx.globalAlpha = 0.4;
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0, canvas.height - 45, canvas.width, 45);
        this.ctx.restore();
        this.ctx.save();
        this.ctx.fillStyle = '#000';
        this.ctx.font = '15pt "Press Start 2P"';
        this.ctx.textAlign = 'left';
        this.ctx.textBaseline = 'bottom';
        this.ctx.fillText(
            `${this.pts < 10 ? '0' + this.pts : this.pts} pts.`,
            10, canvas.height - 10
        );
        this.ctx.restore();
    }
}
