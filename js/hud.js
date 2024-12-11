export default class Hud {
    #score = 0;
    
    constructor(height, player) {
        this.height = height;
        this.player = player;
        this.y = canvas.height - height;
    }
    draw(ctx) {
        ctx.textBaseline = 'middle';
        ctx.font = "15pt 'Press Start 2p'";
        let healthX = canvas.width /2 - 100;
        //* 
        ctx.save();
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = 'white';
        ctx.fillRect(0, this.y, canvas.width, this.height);
        ctx.restore();
        //*/
        ctx.save();
        
        const gradient = ctx.createLinearGradient(healthX, 0, healthX + 200, 0);
        gradient.addColorStop(0, 'red');
        gradient.addColorStop(0.5, 'yellow');
        gradient.addColorStop(1, 'green');
        ctx.fillStyle = gradient;
        ctx.strokeStyle = 'white';
        ctx.fillRect(healthX, (this.y + this.height / 2) - 10, (this.player.health * 200) / this.player.fullHealth, 20);
        ctx.strokeRect(healthX, (this.y + this.height / 2) - 10, 200, 20);
        ctx.restore();
        // 
        ctx.fillStyle = 'black';
        ctx.textAlign = 'left';
        ctx.fillText(`${this.score} pts.`, 20, this.y + this.height / 2);
        ctx.textAlign = 'right';
        ctx.fillText(`${this.player.lives} vidas`, canvas.width - 20, this.y + this.height / 2);
        //*/
    }
    get score() {
        return (this.#score < 10) ? `0${this.#score}` : this.#score;
    }
    set score(score) {
        this.#score = score;
    }
}
