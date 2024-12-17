import Background from "./background.js";
import Player from "./player.js";
import Hud from "./hud.js";
import Enemy from "./enemy.js";

// const canvas = document.querySelector('#canvas');
let playerHealth = 5;
let enemyhealth = 3;
let enemyPoints = 1;
let score = 0;
let lives = 3;
let ctx = canvas.getContext('2d');
let background = new Background();
let enemies = null;
let enemyCount = 1;
let player = null;
let hud = new Hud(40, playerHealth);
let loop = null;
let stage = 1;
let count = 0;
let lineSize = 30;

function printText(text) {
    ctx.save();
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    ctx.fillStyle = 'red';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    text.forEach((phrase, index) => {
        if (index !== 0)
            lineSize = lineSize * 0.9;
        ctx.font = `${lineSize}pt 'Press Start 2p'`;
        ctx.fillText(phrase, canvas.width / 2, canvas.height / 2 + (lineSize + 20) * index);
    });
    clearInterval(loop);
    addListeners();
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
                    if (enemies.length === 0) {
                        printText(['Missão completa!', `${hud.format(score)} pontos`]);
                        stage++;
                    }
                }
            } else {
                printText(['Game Over!', `${hud.format(score)} pontos`]);
                clearInterval(loop);
            }
        break;
        case 'Enemy':
            if (bullet.hit(player)) {
                controller.erase(bullet);
                if (player.health > 1) {
                    player.health--;
                } else {
                    // player.explode().then(() => {
                    //     let oldHealth = player.health;
                        player = new Player(playerHealth);
                        // player.health = oldHealth;
                        lives--;
                    // });
                }
            }
            break;
        }
    });
}
function addListeners() {
    if (++count % 5 === 0)
        enemyCount++;
    addEventListener('keydown', play);
    canvas.addEventListener('touchstart', play);
}
function removeListeners() {
    removeEventListener('keydown', play);
    canvas.removeEventListener('touchstart', play);
}
function play() {
    removeListeners();
    player = new Player(playerHealth); 
    enemies = Array.from({length: enemyCount}, () => new Enemy(enemyhealth, enemyPoints));
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
        hud.update(score, stage, player.health, lives);
        addEventListener('keydown', ({code}) => {
            if (code == 'Space') player.dead = true;
        });
    }, 1000 / 60);
}
printText(['Toque para começar:', '(Ou aperte alguma', 'tecla)']);
// play();