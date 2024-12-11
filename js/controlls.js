export let left = false, right = false;

export function addListeners() {
    keyControlls();
    touchControlls();
}
function touchControlls() {
    canvas.addEventListener('touchstart', ({touches}) => {
        if (touches[0].clientX < window.innerWidth / 2)
            left = true;
        else
            right = true;
    });
    canvas.addEventListener('touchend', () => {
        left = false;
        right = false;
    });
}
function keyControlls() {
    addEventListener('keydown', ({code}) => {
        switch (code) {
            case 'Numpad4': 
                left = true;
                break;
            case 'Numpad6': 
                right = true;
                break;
        }
    });
    addEventListener('keyup', () => {
        left = false;
        right = false;
    });
/*
// */
}


