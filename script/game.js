import Player from "./player.js";
import Enemy from "./enemy.js";
import BulletController from "./bulletcontroller.js";

export default class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.bulletController = new BulletController(this.ctx);
        this.player = new Player(this.bulletController, this.ctx, canvas.width / 2 );
        this.enemies = Array.from({length: 15}, () => new Enemy(this.ctx, ~~(Math.random() * 5), {x: 10, y: 10}));
    }
    play() {
        setInterval(() => {
            this.ctx.clearRect(0, 0, canvas.width, canvas.height);
            this.player.draw();
            this.enemies.forEach(enemy => {
                enemy.update();
            });
            this.bulletController.draw();
            this.collision();
        }, 1000 / 60);
    }
    collision() {
        this.bulletController.bullets.forEach(bullet => {
            this.enemies.forEach(enemy => {
                if (bullet.hit(enemy)) {
                    let bulletIndex = this.bulletController.bullets.indexOf(bullet);
                    this.bulletController.bullets.splice(bulletIndex, 1);
                    if (enemy.type > 0)
                        enemy.type--;
                    else {
                        let enemyIndex = this.enemies.indexOf(enemy);
                        this.enemies.splice(enemyIndex, 1);
                    }


                }
           });
        });
    }
}
