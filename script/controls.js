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

export function addListeners(player) {
    addEventListener('keydown', ({code}) => {
        switch (code) {
            case 'Numpad4': goLeft = true; break;
            case 'Numpad6': goRight = true; break;
        }
    });
    addEventListener('keyup', () => {
        goLeft = goRight = false;
    });
    canvas.addEventListener('touchstart', ({touches}) => {
        if (touches[0].clientX < window.innerWidth / 2)
            goLeft = true;
        else
            goRight = true;
    });
    canvas.addEventListener('touchend', () => {
        goLeft = goRight = false;
    })
}

