import Background from "./background.js";
import Player from "./player.js";
import Hud from "./hud.js";
import Enemy from "./enemy.js";

// const canvas = document.querySelector('#canvas');
let playerHealth = 10;
let enemyhealth = 3;
let enemyPoints = 1;
let score = 0;
let lives = 3;
let ctx = canvas.getContext('2d');
let background = new Background();
let player = new Player(playerHealth); 
let enemies = Array.from({length: 3}, () => new Enemy(enemyhealth, enemyPoints));
let enemy = new Enemy(enemyhealth, enemyPoints);
let hud = new Hud(40, playerHealth);
let loop = null;

function gameOver() {
    ctx.save();
    ctx.globalAlpha = 0.8;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    ctx.fillStyle = 'red';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.font = "30pt 'Press Start 2p'";-
    ctx.fillText(`Game Over!`, canvas.width / 2, canvas.height  / 2);
}

function collision(who) {
    let controller = who.bulletController;
    controller.bullets.forEach(bullet => {
    switch (who.constructor.name) {
        case 'Player':
            if (lives > 0) {
                if (enemy.health > 0) {
                    if (bullet.hit(enemy)) {
                        controller.erase(bullet);
                        enemy.health--;
                    }
                } else {
                    score += enemy.points;
                    enemy = new Enemy(enemyhealth, enemyPoints);
                }
            } else {
                gameOver();
                clearInterval(loop);
            }
        break;
        case 'Enemy':
            if (bullet.hit(player)) {
                if (player.health > 1) {
                    controller.erase(bullet);
                    player.health--;
                } else {
                    player = new Player(playerHealth);
                    lives--;
                }
            }
            break;
        }
    });
}

(function play() {
    loop = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        background.draw(ctx);
        collision(enemy);
        collision(player);
        player.draw(ctx);
        enemy.draw(ctx);
        hud.draw(ctx, score, player.health, lives);
        if (player.health == 0)
            return true;
    }, 1000 / 60);    
})();
