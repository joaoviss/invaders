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
let hud = new Hud(40, playerHealth);
let loop = null;

function gameOver() {
    ctx.save();
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    ctx.fillStyle = 'red';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.font = "30pt 'Press Start 2p'";-
    ctx.fillText(`Game Over!`, canvas.width / 2, canvas.height  / 2);
}

function collision(who, enemy = null) {
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
                    let index = enemies.indexOf(enemy);
                    enemies.splice(index, 1);
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
        hud.draw(ctx);
        player.draw(ctx);
        enemies.forEach(enemy => {
            enemy.draw(ctx);
            collision(enemy);
            collision(player, enemy);
        });
        hud.update(score, player.health, lives);
        if (player.health == 0)
            return true;
        addEventListener('keydown', ({code}) => {
            if (code == 'Space') player.explode();
        });
    }, 1000 / 60);
})();
