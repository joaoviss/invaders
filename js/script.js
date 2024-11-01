import { canvas, ctx, enemy } from "./consts.js";
import Swarm from "./swarm.js";
import Player from "./player.js";

let enemy_map = [
    [4, 3, 2, 1, 0],
    [0, 0, 2, 4, 4],
    [1, 3, 1, 3, 1],
    [0, 0, 2, 4, 4],
    [4, 3, 2, 1, 0]
];

let player = new Player();
let swarm = new Swarm(enemy_map);
let loop = null;

(function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);    
    player.update();
    swarm.update();
    loop = requestAnimationFrame(animate);
})();
