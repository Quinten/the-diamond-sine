u = 24;
uu = u * u;
b.style.background = '#000';
c.fillStyle = '#fff';
c.translate((a.width - uu) / 2, (a.height - uu) / 2);

// mulberry 32 seeded pseudo random number generator
// https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
m = i => (t = i += 0x6D2B79F5) => [
    t = Math.imul(t ^ t >>> 15, t | 1),
    t ^= t + Math.imul(t ^ t >>> 7, t | 61),
    ((t ^ t >>> 14) >>> 0) / 4294967296
][2];

r = m(0xff0000);

p = [];
while (p.length < uu) {
    p.push(r() > .2);
}

y = 0;
while (y < uu) {
    x = 0;
    while (x < u) {
        if (p[y + x]) {
            c.fillRect(x * u, y, u - 1, u - 1);
        }
        x += 1;
    }
    y += u;
}
