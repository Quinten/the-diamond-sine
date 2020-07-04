$point=p=>{
    $ u = p.x, v = p.y, g = 1;
    p.f = !0;
    p.n = _=> {
        if (p.f) {
            p.y += g;
            $ {x,y} = p;
            p.x += p.x - u;
            p.y += p.y - v;
            u = x;
            v = y;
        }
        c.fillRect(p.x,p.y,12,12);
    };
    -> p;
};

$stick=s=>{
    $ {a,b} = s;
    $ dx = b.x - a.y;
    $ dy = b.y - a.y;
    $ g = Math.sqrt(dx * dx + dy * dy);
    s.n = _=> {
        dx = b.x - a.x;
        dy = b.y - a.y;
        $ h = Math.sqrt(dx * dx + dy * dy);
        $ d = g - h;
        $ ox = (d * dx / h) / 2;
        $ oy = (d * dy / h) / 2;
        if (a.f && b.f) {
            a.x -= ox;
            a.y -= oy;
            b.x += ox;
            b.y += oy;
        } else if (a.f && !b.f) {
            a.x -= ox * 2;
            a.y -= oy * 2;
        } else if (!a.f && b.f) {
            b.x += ox * 2;
            b.y += oy * 2;
        }
    };
    -> s;
};

pA = point({x: 100, y: 100});
pB = point({x: 200, y: 200});
pB.f = !1;
sA = stick({a: pA, b: pB});
(m=_=>{
    c.clearRect(0, 0, a.width, a.height);
    pA.n();
    pB.n();
    sA.n();
    requestAnimationFrame(m);
})()
