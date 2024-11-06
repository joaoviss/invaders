import Game from "./game.js";
import { canvas, ctx } from "./consts.js";

let enemy_map = [
    [4, 3, 2, 1, 0],
    [0, 0, 2, 4, 4],
    [1, 3, 1, 3, 1],
    [0, 0, 2, 4, 4],
    [4, 3, 2, 1, 0]
];

let game = new Game(enemy_map);

game.animate();

ctx.save();
ctx.font = '40pt "Press Start 2p"';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillStyle = "#ef3";
ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2);