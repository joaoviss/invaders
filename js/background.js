

export default class Background {

    img = document.querySelector('.space');

    constructor(canvas) {
        this.canvas = canvas;
        this.y = -canvas.height;
    }
    draw(ctx) {
        this.y += (this.y < 0) ? 1 : -this.canvas.height;
        ctx.drawImage(this.img, 0, this.y, this.canvas.width, this.canvas.height * 2);
    }
}
