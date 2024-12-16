export default class Ship {
    
    i = 0;
    frame = 0;
    
    draw(ctx) {
        ctx.drawImage(
            this.img,
            this.frame * this.width, 0,
            this.width, this.height, 
            this.x - this.width /2,  this.y - this.height /2, 
            this.width, this.height
        );
    }
}
