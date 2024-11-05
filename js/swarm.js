import { canvas } from "./consts.js";
import Enemy from "./enemy.js";

export default class Swarm {
    constructor(map) {
        this.pos = {x: 0, y: 0};
        this.speed = {x: 3, y: 50};
        this.enemies = map.map((col, c) => {
            return col.map((type, r) => {
                return new Enemy(type, this.pos, {x: c, y: r});
            });
        });
        this.margin = {
            left: 0,
            right: canvas.width
        };
    }
    draw() {
        this.enemies.flat().forEach(e => {
            e.update(this.pos);
        });
    }
    update() {
        this.#reshape();
        console.log(this.width);
        this.pos.x += this.speed.x;
        if (
            (this.pos.x < this.margin.left) || 
            (this.pos.x + this.width > this.margin.right)
        ) {
            this.speed.x *= -1;

            this.pos.y += this.speed.y;
        }
        this.draw();
    }
    #reshape() {
        if (this.enemies.length > 1) {
            if (this.enemies.at(0).length == 0) {
                this.enemies.shift();
                this.margin.left -= this.enemies.at(0)[0].width;
                this.margin.right -= this.enemies.at(-1)[0].width;
            }
            if (this.enemies.at(-1).length == 0) {
                this.enemies.pop();
            }
        }
        try {
            this.width = this.enemies.map(row => row.at(0).width)
            .reduce((acc,cur) => acc + cur, 0);
        } catch (error) {}
    }
    collision(thing) {
        return this.enemies.flat().some(e => this.collision(thing));
    }
    out() {
        return this.enemies.flat().some(e => e.out());
    }
}
