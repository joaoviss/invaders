import Ship from "./ship.js";

export default class Player extends Ship {

    img = document.querySelector('.player-sprite');
    trigger = true;
    speed = 5;
    score = 0;
    health = 5;
    width = this.img.width / 2;
    height = this.img.height;
    radius = this.img.width / 4;
    left = false;
    right = false;
    
    constructor(canvas, bulletController) {
        super(canvas, bulletController);
        this.x = canvas.width /2 - this.radius;
        this.y = canvas.height - this.radius - 55;+
        this.addListeners();
    }
    draw(ctx) {
        if (this.left) 
            this.x -= (this.x > 0) ? this.speed : 0;
        if (this.right) 
            this.x += (this.x < this.canvas.width) ? this.speed : 0;
        super.draw(ctx);
        if (this.trigger) this.shot();
    }
    addListeners() {
        addEventListener('keydown', ({code}) => {
            switch (code) {
                case 'Numpad4': this.x -= (this.x > 0) ? this.speed : 0; break;
                case 'Numpad6': this.x += (this.x <= this.canvas.width - this.width) ? this.speed : 0; break;
                case 'Space': this.trigger = true;
            }
        });
        addEventListener('keyup', ({code}) => {
            if (code == 'Space')
                this.trigger = false;
        });
        canvas.addEventListener('touchstart', ({touches}) => {
            if (touches[0].clientX < window.innerWidth / 2)
                this.left = true;
            else
                this.right = true;
        });
        
        this.canvas.addEventListener('touchend', () => {
            this.left = false;
            this.right = false;
        });
    }
    shot() {
        this.bulletController.reload(this.x, this.y - this.radius);
    }
    get getScore() {
        return (this.score < 10) ? `0${this.score}` : this.score;
    }
}
