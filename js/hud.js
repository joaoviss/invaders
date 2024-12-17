export default class Hud {
    #s = 0;
    #m = 0;
    #i = 0;
    
    constructor(height, health) {
        this.height = height;
        this.fullHealth = health;
        this.y = canvas.height - height;
    }
    update(score, stage, health, lives) {
        this.score = score;
        this.stage = stage;
        this.health = health;
        this.lives = lives;
    }
    draw(ctx) {
        ctx.textBaseline = 'middle';
        ctx.font = "15pt 'Press Start 2p'";

        ctx.save();
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = 'white';
        ctx.fillRect(0, this.y, canvas.width, this.height);
        ctx.restore();

        const gradient = ctx.createLinearGradient(canvas.width / 2, 0, canvas.width / 2 + 200, 0);
        gradient.addColorStop(0, 'red');
        gradient.addColorStop(0.5, 'yellow');
        gradient.addColorStop(1, 'green');

        ctx.save();
        ctx.fillStyle = gradient;
        ctx.strokeStyle = 'white';
        ctx.fillRect(canvas.width / 2, (this.y + this.height / 2) - 10, (this.health * 200) / this.fullHealth, 20);
        ctx.strokeRect(canvas.width / 2, (this.y + this.height / 2) - 10, 200, 20);
        ctx.restore();

        ctx.fillStyle = 'black';
        ctx.textAlign = 'left';
        ctx.fillText(`${this.format(this.score)} pts.`, 20, this.y + this.height / 2);
        ctx.fillText(`${this.stage}ª fase`, 180, this.y + this.height / 2);
        ctx.textAlign = 'right';
        ctx.fillText(`${this.time()}`, canvas.width / 2 - 20, this.y + this.height / 2);
        ctx.fillText(`${this.lives} vidas`, canvas.width - 20, this.y + this.height / 2);
    }
    format(n) {
        return (n < 10) ? `0${n}` : n;
    }
    time() {
        if (++this.#i % 60 === 0) {
            if (this.#m < 59) {
                if (this.#s < 59) {
                    this.#s++;
                } else {
                    this.#m++;
                    this.#s = 0;
                }
            } else {
                this.#m = 0;
            }
        }
        return `${this.format(this.#m)}:${this.format(this.#s)}`;
    }
}
