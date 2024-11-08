import { canvas } from "./consts.js";

export let
goLeft = false,
goRight = false,
doShoot = false;

export function addEventListeners() {
    // Adds listeners for the keys.

    //  On press:
    addEventListener('keydown', ({code}) => {
        switch (code) {
            case 'Numpad4': goLeft = true; break;
            case 'Numpad6': goRight = true; break;
            case 'Space': doShoot = true; break;
        }
    });

    //  On release:
    addEventListener('keyup', ({code}) => {
        switch (code) {
            case 'Numpad4': goLeft = false; break;
            case 'Numpad6': goRight = false; break;
            case 'Space': doShoot = false; break;
        }
    });

    // Adds listeners for the mouse:
    
    //  On press (right or left side of the canvas):
    addEventListener('touchstart', ({screenX}) => {
        (screenX < screen.width / 2) ? goLeft = true : goRight = true;
    });
    
    //  On release (any place the canvas):
    addEventListener('touchend', () => {
        goLeft = goRight = false;
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
export function controlls(player) {
    if (goLeft) 
        player.pos.x -= player.pos.x > 0 ? player.speed.x : 0;
    if (goRight) 
        player.pos.x += (player.pos.x + player.width < canvas.width) ? player.speed.x : 0;
    if (doShoot)
        player.shoot();
}