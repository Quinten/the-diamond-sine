u = 24;
uu = u * u;
v = u / 2;
vv = v * v;
q = Math.sqrt(vv * 2);

// colors
b.style.background = '#334';
c.fillStyle = '#eff';

// centering
c.translate((a.width - uu) / 2, (a.height - uu) / 2);

P = Math.PI;
V = c.fillRect.bind(c);
R = c.rotate.bind(c);

// sprites
g = [

    // 0 nothing
    _ => _,

    // 1 dirt
    _ => V(-v, -v, u - 1, u - 1),

    // 2 boulder
    _ => [c.beginPath(), c.arc(0, 0, v - 1, 0, P*2), c.fill()],

    // 3 daimond
    _ => [R(P/4), V(-q/2, -q/2, q, q)],

    // 4 player
    _ => [R(P/4), V(-q/2, -q/6, q, q/3), R(P/2), V(-q/2, -q/6, q, q/3)]
];

// pseudo random number generator
// https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
m = i => (x = Math.sin(i++) * 10000) => x * x % 1;

$ = 1; // current level

// (re)build level
z = _ => {
    // reset prng
    r = m($);
    // start position
    s = r() * uu | 0;
    // grid
    p = [];
    while (p.length < uu) {
        p.push(
            // player
            (p.length == s) ? 4 : // player
                // always dirt above player
                ((p.length == s - u) ||
                    // less dirt in higher levels
                    (r() > .1 + $ * .08) ? 1 :
                    // other stuff
                    r() * 4 | 0
                )
        );
    }
    f();
};

// end of level check method
E = (g, G, l) => {
    if (p.indexOf(g) == -1) {
        setTimeout(_ => {
            alert(G);
            $ = $ + l;
            z();
        }, 5);
    }
};

// main loop
f = _ => {
    c.clearRect(-1, -1, uu + 2, uu + 2);
    y = 0;
    while (y < uu) {
        x = 0;
        while (x < u) {
            // drop boulders
            o = y + x;
            while (p[y + x] == 2 && p[o] == 2 && (p[o + u] == 0 || p[o + u] == 2)) {
                if (p[o + u] == 0) {
                    p[y + x] = 0;
                }
                o = o + u;
                p[o] = 2;
                // crush player
                // and diamonds (otherwise unsolvable)
                if (p[o + u] == 4 || p[o + u] == 3) {
                    p[o + u] = 0;
                }
            }
            // draw graphics
            c.save();
            c.translate(x * u + u / 2, y + u / 2);
            g[p[y + x]]();
            c.restore();
            x += 1;
        }
        y += u;
    }
    // player crushed, game over
    E(4, 'RIP', 0);
    // no more diamonds, level complete
    E(3, 'LVL ' + $ + ' OK', 1);
};

z(); // kick off

onkeyup = e => {
    // movement from keycode
    // https://xem.github.io/articles/jsgamesinputs.html
    //console.log('lld*rlurdu'[e.which%32%17]);
    w = [-1, -1, u, 0, 1, -1, -u, 1, u, -u][e.which%32%17];

    // next position
    n = s + w;
    // wrapping player around the playing field
    k = ((s / u | 0) - (n / u | 0)) * u * (w * w % u);
    n = (n + uu + k) % uu;

    // step on certain tiles
    if (!!(p[n] % 2) || p[n] == 0) {
        p[s] = 0;
        s = n;
        p[s] = 4;
        f();
    }
};
