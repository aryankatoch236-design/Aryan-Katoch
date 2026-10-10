(function () {
  'use strict';
  var hero = document.getElementById('top');
  var canvas = document.getElementById('scene');
  if (!hero || !canvas || !window.THREE) return;

  var T = THREE;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var small = window.innerWidth < 700;
  var renderer;
  try {
    renderer = new T.WebGLRenderer({ canvas: canvas, alpha: true, antialias: !small });
  } catch (e) {
    canvas.style.display = 'none'; // the CSS gradient stays as the background
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));

  var scene = new T.Scene();
  scene.fog = new T.Fog(0xE9B44C, 70, 240);
  var camera = new T.PerspectiveCamera(45, 1, 1, 500);
  scene.add(new T.HemisphereLight(0xFFE7B0, 0x143D33, 0.85));
  var key = new T.DirectionalLight(0xFFD38A, 1.05);
  key.position.set(40, 50, 30);
  scene.add(key);

  function noise(x, z, s) {
    return Math.sin(x * 0.07 + s) * Math.cos(z * 0.09 + s * 1.7) * 0.5 +
           Math.sin(x * 0.19 + s * 2) * 0.25 + Math.abs(Math.sin(x * 0.045 + s)) * 0.9;
  }
  function rnd(i) { var v = Math.sin(i * 127.1) * 43758.5453; return v - Math.floor(v); }

  var rock = new T.Color(0x8C9A93), snow = new T.Color(0xF4F6F2), c = new T.Color();

  function ridge(o) {
    var g = new T.PlaneGeometry(280, o.d, small ? 40 : 70, small ? 14 : 24);
    g.rotateX(-Math.PI / 2);
    var p = g.attributes.position, col = new Float32Array(p.count * 3), base = new T.Color(o.c);
    for (var i = 0; i < p.count; i++) {
      var x = p.getX(i), z = p.getZ(i);
      var t = 1 - (z + o.d / 2) / o.d;               // 1 at the back edge, 0 at the front
      var h = Math.max(0, noise(x, z + o.z, o.s)) * o.a * (0.2 + 0.8 * t) + (rnd(i + o.s) - 0.5) * o.a * 0.1;
      p.setY(i, h);
      var k = h / (o.a * 1.5);
      c.copy(base);
      if (k > 0.45) c.lerp(rock, Math.min(1, (k - 0.45) * 3));
      if (o.sn && k > 0.62) c.lerp(snow, Math.min(1, (k - 0.62) * 6));
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }
    g.setAttribute('color', new T.BufferAttribute(col, 3));
    g.computeVertexNormals();
    var m = new T.Mesh(g, new T.MeshStandardMaterial({ vertexColors: true, flatShading: true, roughness: 1, metalness: 0 }));
    m.position.set(0, 0, o.z);
    scene.add(m);
  }
  ridge({ z: 12,  d: 70, a: 8,  s: 1, c: 0x0F3028, sn: 0 });
  ridge({ z: -42, d: 70, a: 15, s: 4, c: 0x1B4D40, sn: 0 });
  ridge({ z: -98, d: 80, a: 22, s: 9, c: 0x3C7766, sn: 1 });

  var sun = new T.Mesh(new T.SphereGeometry(10, 24, 16), new T.MeshBasicMaterial({ color: 0xFFE08A, fog: false }));
  sun.position.set(34, 48, -170);
  scene.add(sun);

  var n = small ? 40 : 90, pos = new Float32Array(n * 3);
  for (var i = 0; i < n; i++) {
    pos[i * 3] = (rnd(i) - 0.5) * 180;
    pos[i * 3 + 1] = 3 + rnd(i + 50) * 40;
    pos[i * 3 + 2] = -60 + rnd(i + 99) * 80;
  }
  var eg = new T.BufferGeometry();
  eg.setAttribute('position', new T.BufferAttribute(pos, 3));
  var embers = new T.Points(eg, new T.PointsMaterial({ color: 0xFFE08A, size: 1.1, transparent: true, opacity: 0.8, fog: false }));
  scene.add(embers);

  var mx = 0, my = 0, raf = 0;
  var sign = document.querySelector('.sign');
  window.addEventListener('pointermove', function (e) {
    mx = e.clientX / window.innerWidth - 0.5;
    my = e.clientY / window.innerHeight - 0.5;
  }, { passive: true });

  function size() {
    var w = hero.clientWidth, h = hero.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  function frame(t) {
    var time = t * 0.001;
    var p = Math.min(1, Math.max(0, window.scrollY / hero.offsetHeight));
    camera.position.set(mx * 8 + Math.sin(time * 0.15) * 2, 15 - p * 4, 62 - p * 12);
    camera.lookAt(0, 9 + p * 4, -40);
    embers.position.y = Math.sin(time * 0.4) * 1.5;
    renderer.render(scene, camera);
    if (sign && !reduce && window.innerWidth > 860) {
      sign.style.transform = 'rotate(-1.6deg) rotateY(' + (mx * 7).toFixed(2) + 'deg) rotateX(' + (-my * 5).toFixed(2) + 'deg)';
    }
  }
  function loop(t) { frame(t); raf = requestAnimationFrame(loop); }
  function start() { if (!raf) raf = requestAnimationFrame(loop); }
  function stop() { cancelAnimationFrame(raf); raf = 0; }

  size();
  if ('ResizeObserver' in window) {
    new ResizeObserver(function () { size(); if (reduce) frame(0); }).observe(hero);
  } else {
    window.addEventListener('resize', size);
  }

  if (reduce) { frame(0); return; }      // one still frame, no animation
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      entries[0].isIntersecting ? start() : stop();
    }).observe(hero);
  } else {
    start();
  }
  document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });
})();
