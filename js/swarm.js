import { canvas, enemy } from "./consts.js";
import Enemy from "./enemy.js";

export default class Swarm {
    constructor(map) {
        this.pos = {x: 0, y: 0};
        this.speed = {x: -2, y: 0};
        this.enemies = map.map((col, c) => {
            return col.map((type, r) => {
                return new Enemy(type, this.pos, {x: c * enemy.width, y: r * enemy.height});
            });
        });
        //*
        addEventListener('keydown', ({code}) => {
            switch(code) {
                case 'ControlLeft': this.enemies.at(0).pop(); break;
                case 'ShiftLeft': this.enemies.at(-1).pop(); break;
            }
        });
        // */
    }
    draw() {
        this.enemies.flat().forEach(e => {
            e.update(this.pos);
        });
    }
    update() {
        this.#reshape();
        this.pos.x += this.speed.x;
        let width = this.enemies.length * enemy.width;
        if (
            (this.pos.x < 0) ||
            (this.pos.x + width > canvas.width)
        ) {
            this.speed.x *= -1;
            this.pos.y += 5;
        }
        this.draw();
    }
    #reshape() {
        if (this.enemies.length > 1) {
            if (this.enemies.at(0).length == 0) {
                this.enemies.shift();
            }
            if (this.enemies.at(-1).length == 0) {
                this.enemies.pop();
            }
        }
    }
}