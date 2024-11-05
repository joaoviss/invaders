export const
canvas = document.querySelector('canvas'),
ctx = canvas.getContext('2d'),
defaultText = () => {
    ctx.fillStyle = '#fff';
    ctx.font = "10pt 'Press Start 2P'";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'hanging';
}