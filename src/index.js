M = Math;
P = M.PI;
h = location;
u = 24;
U = u * u;
v = u / 2;
q = M.sqrt(v * v * 2);
Q = - q / 2;

T = c.fillRect.bind(c);
R = c.rotate.bind(c);

// graphics
g = [

    // 0 nothing
    _ => _,

    // 1 dirt
    _ => T(-v, -v, u - 1, u - 1),

    // 2 boulder
    _ => [c.beginPath(), c.arc(0, 0, v - 1, 0, P*2), c.fill()],

    // 3 daimond
    _ => [R(P/4), T(Q, Q, q, q)],

    // 4 player
    _ => [R(P/4), T(Q, Q/3, q, q/3), R(P/2), T(Q, Q/3, q, q/3)]
];

// pseudo random number generator
// https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
m = i => (x = M.sin(i++) * 10000) => x * x % 1;

// parse the current level from the address bar hash
// #1, #2, #3, ...
// You can also do decimal levels like #0.000001
// falsy or NaN is replaced by 1
$ = Number(h.hash.slice(1)) || 1;

// (re)build level
z = _ => {
    // reset prng
    r = m(h.hash = $);
    // grid
    p = [];
    while (p.length < U) {
        p.push(
            // less dirt in higher levels
            (r() > .1 + $ * .08) ? 1 :
            // other stuff
            r() * 4 | 0
        );
    }
    // player start position
    s = r() * U | 0;
    p[s] = 4;
    // always dirt above player
    // otherwise infinite killing is possible
    p[(s - u + U) % U] = 1;
    // render
    f();
};

// end of level animation/check
H = 0;
E = (C, l) => setTimeout(_ => {
    if (H >= U) {
        H = 0;
        z($ = $ + l);
    } else {
        p = p.map(C);
        f(H = H + u);
    }
}, u);

// main loop
f = _ => {
    T(0, 0, a.width, a.height);
    y = 0;
    while (y < U) {
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
            c.fillStyle = 'snow';
            c.translate(
                ((a.width - U) / 2) + (x * u + u / 2),
                ((a.height - U) / 2) + (y + u / 2)
            );
            g[p[y + x]]();
            c.restore();
            x += 1;
        }
        y += u;
    }

    // player crushed, game over
    if (p.indexOf(4) == -1) {
        E((e, i) => ((i < H && r() > .6)) ? 0 : e, 0);

    // no more diamonds, level complete
    } else if (p.indexOf(3) == -1) {
        E(e => (r() * 3 | 0) || 4, 1);
    }
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
    n = (n + U + k) % U;

    // step on certain tiles
    if (!!(p[n] % 2) || p[n] == 0) {
        p[s] = 0;
        s = n;
        p[s] = 4;
        f();
    }
};
