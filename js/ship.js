export default class Ship {
    
    i = 0;
    frame = 0;
    
    constructor(canvas, bulletController) {
        this.canvas = canvas;
        this.bulletController = bulletController;
    }
    draw(ctx) {
        // ctx.strokeStyle = 'red';
        // ctx.beginPath();
        // ctx.arc(this.x, this.y, this.radius, 0, Math.PI *2);
        // ctx.stroke();
        if (++this.i % 5 === 0)
            this.frame = this.frame == 0 ? 1 : 0;
        ctx.drawImage(
            this.img,
            this.frame * this.width, 0,
            this.width, this.height, 
            this.x - this.width /2,  this.y - this.height /2, 
            this.width, this.height
        );
    }
}
