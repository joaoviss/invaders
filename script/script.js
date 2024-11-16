
import Game from "./game.js";

const ctx = canvas.getContext('2d');

let lives = 3;

//*
let game = new Game(ctx);
game.play();    
/*/ 
while (lives > 0) {
    let game = new Game(ctx);
    game.play();    
}
//  */