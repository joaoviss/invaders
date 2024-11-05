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
        /* 
        if (offsetX < canvas.width / 2) 
            goLeft = true;
        else 
            goRight = true;
        /*/
        console.log(offsetX);
        // */
    });
    /*
    canvas.addEventListener('mouseup', (offsetX) => {
        if (offsetX < canvas.width / 2) 
            goLeft = false;
        else
            goRight = false;
    });
    /*/
	canvas.addEventListener(`mouseup`, () => {
        goLeft = false;
        goRight = false;
    });
    // */
}

