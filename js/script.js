import Game from "./game.js";

const canvas = document.querySelector('#canvas');

const game = new Game(canvas);
game.play();

addEventListener('keydown', ({code}) => {
    if (code == 'Space')
        game.gameOver();
});