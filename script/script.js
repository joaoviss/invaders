import Player from "./player.js";
import Enemy from "./enemy.js";
import BulletController from "./bulletcontroller.js";

const ctx = canvas.getContext('2d')

let bc = new BulletController(ctx);
let pl = new Player(bc, ctx, canvas.width / 2 );
let enemies = Array.from({length: 15}, () => new Enemy(ctx, ~~(Math.random() * 5), {x: 10, y: 10}));

(() => {
    setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pl.draw();
        enemies.forEach(enemy => {
            enemy.update();
        });
        bc.draw();
    }, 1000 / 60);
})();
