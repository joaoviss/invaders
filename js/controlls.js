import { canvas } from "./consts.js";

export let
goLeft = false,
goRight = false,
doShoot = false;

export function addEventListeners() {
    addEventListener('keydown', ({code}) => {
        switch (code) {
            case 'Numpad4': goLeft = true; break;
            case 'Numpad6': goRight = true; break;
            case 'Space': doShoot = true; break;
        }
    });
    addEventListener('keyup', ({code}) => {
        switch (code) {
            case 'Numpad4': goLeft = false; break;
            case 'Numpad6': goRight = false; break;
            case 'Space': doShoot = false; break;
        }
    });
    canvas.addEventListener('mousedown', ({offsetX}) => {
        (offsetX < canvas.width / 2) ? goLeft = true : goRight = true;
        /* 
        canvas.onMouseup(() => {
            goLeft = goRight = false;
        });
        // */
    });
}
export function test(what) {
    addEventListener('keydown', ({code}) => {
        switch(code) {
            case 'ControlLeft': what.swarm.enemies.at(0).pop(); break;
            case 'ShiftLeft': what.swarm.enemies.at(-1).pop(); break;
        }
    });
}
