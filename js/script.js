import Game from "./game.js";

let enemy_map = [
    [4, 3, 2, 1, 0],
    [0, 0, 2, 4, 4],
    [1, 3, 1, 3, 1],
    [0, 0, 2, 4, 4],
    [4, 3, 2, 1, 0]
];

let game = new Game(enemy_map);

game.animate();

// console.log(game.swarm.enemies.map(row => row.at(0).width)
// .reduce((acc,cur) => acc + cur, 0));
