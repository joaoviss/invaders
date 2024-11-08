import Game from "./game.js";
import { canvas, ctx } from "./consts.js";
import Bullet from "./bullet.js";

let enemy_map = [
    [4, 3, 2, 1, 0],
    [0, 0, 2, 4, 4],
    [1, 3, 1, 3, 1],
    [0, 0, 2, 4, 4],
    [4, 3, 2, 1, 0]
];

let game = new Game(enemy_map);

game.animate();

/*
setInterval(() => {
    game.player.addBullets();
    game.player.bullets.pop().shoot();
}, 1000);
// */