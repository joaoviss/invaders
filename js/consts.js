let enemy_image = document.querySelector('.enemy-sprite'),
player_image = document.querySelector('.player-sprite');

export const
canvas = document.querySelector('canvas'),
ctx = canvas.getContext('2d'),
enemy = {
    image: enemy_image,
    width: enemy_image.width / 2,
    height: enemy_image.height / 5
},
player = {
    image: player_image,
    width: player_image.width / 2,
    height: player_image.height
}
