let sprite = ({
    x = 0,
    y = 0
} = {}) => {
    let draw = _ => {
        c.fillRect(x - 16, y - 16, 32, 32);
    };
    return {x: (_ = x) => x = _ , y, draw};
};
let player = sprite({x : innerWidth / 2, y: innerHeight / 2});
let {x, y} = player;
console.log(x);
//x.e = 8;
//console.log(x);
setInterval(() => {
    player.x(player.x() + 1);
    player.draw();
}, 17);
