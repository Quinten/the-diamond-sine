u = 24;
uu = u * u;
v = u / 2;
vv = v * v;
q = Math.sqrt(vv * 2);

// colors
b.style.background = '#000';
c.fillStyle = '#fff';

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

// mulberry 32 seeded pseudo random number generator
// https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
/*
m = i => (t = i += 0x6D2B79F5) => [
    t = Math.imul(t ^ t >>> 15, t | 1),
    t ^= t + Math.imul(t ^ t >>> 7, t | 61),
    ((t ^ t >>> 14) >>> 0) / 4294967296
][2];
*/
// This one is actually shorter
m = i => (x = Math.sin(i++) * 10000) => x * x % 1;

$ = 1; // current level

z = _ => {
    // reset prng
    r = m($);
    // start position
    s = r() * uu | 0;
    // grid
    p = [];
    while (p.length < uu) {
        //p.push(r() * g.length | 0);
        p.push((p.length == s) ? 4 : ((r() > .4) ? 1 : r() * 4 | 0));
    }
}
z();

f = _ => {
    c.clearRect(0, 0, uu, uu);
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
    if (p.indexOf(4) === -1) {
        setTimeout(_ => {
            alert('ouch');
            z();
            f();
        }, 40);
    }
    // no more diamonds, level complete
    if (p.indexOf(3) === -1) {
        setTimeout(_ => {
            alert('Level ' + $ + ' cleared!');
            $++;
            z();
            f();
        }, 40);
    }
};
f();


onkeyup = e => {
    // https://xem.github.io/articles/jsgamesinputs.html
    //console.log('lld*rlurdu'[e.which%32%17]);

    w = [-1, -1, u, 0, 1, -1, -u, 1, u, -u][e.which%32%17];
    p[s] = 0;
    n = (s + w < 0) ? s + w + uu : ((s + w) % uu);
    if (p[n] !== 2) {
        s = n;
        p[s] = (p[s] == 2) ? 2 : 4;
        f();
    }
};
