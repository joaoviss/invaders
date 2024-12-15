
export default class Background {

    img = document.querySelector('.space');

    constructor() {
        this.y = -canvas.height;
    }
    draw(ctx) {
        this.y += (this.y < 0) ? 1 : -canvas.height;
        ctx.drawImage(this.img, 0, this.y, canvas.width, canvas.height * 2);
    }
}
