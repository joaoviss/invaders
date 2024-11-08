import { canvas } from "./consts.js";
import Enemy from "./enemy.js";

export default class Swarm {
    constructor(map) {
        this.pos = {x: 0, y: 0};
        this.y = 0;
        this.speed = {x: 1, y: 5, a: 5};
        this.angle = 0;
        this.curve = 20;
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
        this.pos.x += this.speed.x;
        if (
            (this.pos.x < this.margin.left) || 
            (this.pos.x + this.width > this.margin.right)
        ) {
            this.speed.x *= -1;
            this.y += this.speed.y;
        }
        this.pos.y = this.curve * Math.sin(this.angle * Math.PI/180) + this.y;
        this.angle += this.speed.a;
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
            this.width = this.enemies.map(col => col.at(0).width)
            .reduce((acc,cur) => acc + cur, 0);
/* 
            let lengths = this.enemies.map(col => {
                return col.reduce((acc, cur) => acc + cur.height, 0);
            })
            this.height = Math.max(...lengths);
//  */
        } catch (error) {}
    }
    collision(thing) {
        return this.enemies.flat().some(e => e.collision(thing));
    }
    out() {
        return this.enemies.flat().some(e => e.out());
    }
}
