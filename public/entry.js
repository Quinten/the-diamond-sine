w=[],k=[],n=[],m=Math,z=a.width,j=a.height,P=e=>{let t=e.x,C=e.y,d=1e3+17e3*m.random();return n.push(m=>{if(e.f=m>d){e.y+=.3;let{x:m,y:l}=e;e.x+=e.x-t,e.y+=e.y-C,t=m,C=l}}),e},S=(a,b)=>{let e=b.x-a.x,t=b.y-a.y,C=m.sqrt(e*e+t*t);k.push(l=>{e=b.x-a.x,t=b.y-a.y;let n=m.sqrt(e*e+t*t),d=C-n,r=d*e/n,i=d*t/n;a.f&&b.f?(a.x-=r/2,a.y-=i/2,b.x+=r/2,b.y+=i/2):a.f&&!b.f?(a.x-=r,a.y-=i):!a.f&&b.f&&(b.x+=r,b.y+=i)}),w.push(e=>{c.moveTo(a.x,a.y),c.lineTo(b.x,b.y)})},C=(...e)=>{let t,C;e.forEach(e=>{let a=C,b=P({x:z/2-150+e%15*20,y:j/2-150+20*m.floor(e/15)});t?(S(a,b),C=b):t=C=b}),S(C,t)},C(5,7,97,93,63,64,79,81,21,20),C(8,11,26,24,39,42,102,98,68,69,84,86,56,53),C(105,107,182,183,198,195,180,181,121,120),C(109,112,202,199),C(125,126,186,185),C(113,116,176,174,189,191,206,203,158,160,130,129,144,143),C(117,118,163,164,119,119.9,209.9,209,179,177),(r=e=>{c.clearRect(0,0,z,j),c.beginPath(),n.forEach(t=>t(e)),k.forEach(e=>e()),w.forEach(e=>e()),c.stroke(),requestAnimationFrame(r)})(0);