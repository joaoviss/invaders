let goLeft = false,
goRight = false,
doShoot = true;

export function controls(target) {
    if (goLeft)
        target.pos.x -= (target.pos.x - target.speed >= 0) ? target.speed : 0;
    if (goRight)
        target.pos.x += (target.pos.x + target.width + target.speed <= canvas.width) ? target.speed : 0;
    if (doShoot)
        target.shoot();
}

export function addListeners() {
    addEventListener('keydown', ({code}) => {
        switch (code) {
            case 'Numpad4': goLeft = true; break;
            case 'Numpad6': goRight = true; break;
            case 'Space': doShoot = true; break;
        }
    });
    addEventListener('keyup', () => {
            goLeft = goRight = doShoot = false;
    });
}
