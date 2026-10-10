/* Hero 3D: a Himachal valley at dusk. A small town on the valley floor,
   map pins rising over local shops with pulse rings, glowing "signal" arcs
   between them (online), drifting clouds and fireflies.
   Drag to orbit, mouse parallax, scroll flies the camera into the valley. */
(function () {
  'use strict';
  var hero = document.getElementById('top');
  var canvas = document.getElementById('scene');
  if (!hero || !canvas) return;

  function init() {
    if (!window.THREE) { hero.classList.add('no-3d'); return; }
    var T = THREE;
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var small = window.innerWidth < 700;
    var renderer;
    try {
      renderer = new T.WebGLRenderer({ canvas: canvas, alpha: true, antialias: !small, powerPreference: 'high-performance' });
    } catch (e) {
      hero.classList.add('no-3d');
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, small ? 1.25 : 1.6));
    hero.classList.add('has-3d');

    var scene = new T.Scene();
    var HORIZON = 0xE9A949;
    scene.fog = new T.Fog(HORIZON, 90, 300);
    var camera = new T.PerspectiveCamera(45, 1, 0.5, 900);

    /* ---------- helpers ---------- */
    function rnd(i) { var v = Math.sin(i * 127.1 + 311.7) * 43758.5453; return v - Math.floor(v); }
    function noise(x, z, s) {
      return Math.sin(x * 0.07 + s) * Math.cos(z * 0.09 + s * 1.7) * 0.5 +
             Math.sin(x * 0.19 + s * 2) * 0.25 + Math.abs(Math.sin(x * 0.045 + s)) * 0.9;
    }
    function glowTexture(inner, outer) {
      var c = document.createElement('canvas'); c.width = c.height = 128;
      var g = c.getContext('2d'), gr = g.createRadialGradient(64, 64, 0, 64, 64, 64);
      gr.addColorStop(0, inner); gr.addColorStop(0.35, outer); gr.addColorStop(1, 'rgba(255,255,255,0)');
      g.fillStyle = gr; g.fillRect(0, 0, 128, 128);
      var t = new T.CanvasTexture(c); return t;
    }
    var glow = glowTexture('rgba(255,236,170,1)', 'rgba(255,200,90,.35)');
    var soft = glowTexture('rgba(255,255,255,.9)', 'rgba(255,240,225,.35)');

    /* ---------- sky dome ---------- */
    var skyG = new T.SphereGeometry(420, 32, 16);
    var sp = skyG.attributes.position, skyC = new Float32Array(sp.count * 3);
    var top = new T.Color(0x0B2620), mid = new T.Color(0x2E6B57), low = new T.Color(0xF2B85A), cc = new T.Color();
    for (var i = 0; i < sp.count; i++) {
      var y = sp.getY(i) / 420;               // -1..1
      if (y > 0.25) cc.copy(mid).lerp(top, Math.min(1, (y - 0.25) / 0.6));
      else cc.copy(low).lerp(mid, Math.max(0, (y + 0.05) / 0.3));
      skyC[i * 3] = cc.r; skyC[i * 3 + 1] = cc.g; skyC[i * 3 + 2] = cc.b;
    }
    skyG.setAttribute('color', new T.BufferAttribute(skyC, 3));
    scene.add(new T.Mesh(skyG, new T.MeshBasicMaterial({ vertexColors: true, side: T.BackSide, fog: false, depthWrite: false })));

    /* ---------- light ---------- */
    scene.add(new T.HemisphereLight(0xFFE2A8, 0x0F3A30, 0.8));
    var key = new T.DirectionalLight(0xFFC979, 1.15);
    key.position.set(60, 45, -120);
    scene.add(key);
    var fill = new T.DirectionalLight(0x9FD3C0, 0.35);
    fill.position.set(-50, 30, 60);
    scene.add(fill);

    /* ---------- sun ---------- */
    var sun = new T.Group();
    sun.add(new T.Mesh(new T.SphereGeometry(9, 24, 16), new T.MeshBasicMaterial({ color: 0xFFE7A0, fog: false })));
    var halo = new T.Sprite(new T.SpriteMaterial({ map: glow, transparent: true, depthWrite: false, fog: false, blending: T.AdditiveBlending, opacity: 0.85 }));
    halo.scale.set(80, 80, 1); sun.add(halo);
    sun.position.set(48, 34, -240);
    scene.add(sun);

    /* ---------- mountain ridges ---------- */
    var rock = new T.Color(0x8C9A93), snow = new T.Color(0xF6F7F3), c = new T.Color();
    function ridge(o) {
      var g = new T.PlaneGeometry(o.w || 360, o.d, small ? 46 : 84, small ? 14 : 26);
      g.rotateX(-Math.PI / 2);
      var p = g.attributes.position, col = new Float32Array(p.count * 3), base = new T.Color(o.c);
      for (var i = 0; i < p.count; i++) {
        var x = p.getX(i), z = p.getZ(i);
        var t = 1 - (z + o.d / 2) / o.d;
        var h = Math.max(0, noise(x, z + o.z, o.s)) * o.a * (0.15 + 0.85 * t) + (rnd(i + o.s) - 0.5) * o.a * 0.1;
        if (o.valley) h *= Math.min(1, Math.pow(Math.abs(x - o.valley) / 70, 1.6) + 0.08);
        p.setY(i, h);
        var k = h / (o.a * 1.5);
        c.copy(base);
        if (k > 0.42) c.lerp(rock, Math.min(1, (k - 0.42) * 3));
        if (o.sn && k > 0.58) c.lerp(snow, Math.min(1, (k - 0.58) * 5));
        col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
      }
      g.setAttribute('color', new T.BufferAttribute(col, 3));
      g.computeVertexNormals();
      var m = new T.Mesh(g, new T.MeshStandardMaterial({ vertexColors: true, flatShading: true, roughness: 1, metalness: 0 }));
      m.position.set(0, o.y || 0, o.z);
      scene.add(m);
    }
    ridge({ z: -190, d: 110, a: 44, s: 13, c: 0x4E8573, sn: 1, w: 520 });
    ridge({ z: -120, d: 90, a: 28, s: 9, c: 0x2F6A58, sn: 1, w: 440 });
    ridge({ z: -62, d: 70, a: 16, s: 4, c: 0x1B4D40, sn: 0, valley: 22 });
    ridge({ z: 40, d: 60, a: 10, s: 1, c: 0x0E2C25, sn: 0, valley: 22 });

    // valley floor
    var floorG = new T.PlaneGeometry(400, 160, 40, 16); floorG.rotateX(-Math.PI / 2);
    var fp = floorG.attributes.position;
    for (i = 0; i < fp.count; i++) fp.setY(i, Math.sin(fp.getX(i) * 0.05) * Math.cos(fp.getZ(i) * 0.07) * 0.6 - 0.4);
    floorG.computeVertexNormals();
    var floor = new T.Mesh(floorG, new T.MeshStandardMaterial({ color: 0x1D5143, flatShading: true, roughness: 1 }));
    floor.position.z = -10;
    scene.add(floor);

    // pine trees scattered on the floor edges
    var treeN = small ? 70 : 160;
    var treeG = new T.ConeGeometry(1, 3.2, 6); treeG.translate(0, 1.6, 0);
    var trees = new T.InstancedMesh(treeG, new T.MeshStandardMaterial({ color: 0x123A30, flatShading: true, roughness: 1 }), treeN);
    var dm = new T.Object3D(), placed = 0;
    for (i = 0; placed < treeN && i < treeN * 4; i++) {
      var tx = (rnd(i * 3.1) - 0.5) * 200, tz = -40 + rnd(i * 7.7) * 70;
      if (tx > 0 && tx < 46 && tz > -28 && tz < 14) continue;   // keep the town clear
      var s = 0.8 + rnd(i * 1.9) * 1.1;
      dm.position.set(tx, -0.3, tz); dm.scale.set(s, s * (0.9 + rnd(i) * 0.5), s); dm.updateMatrix();
      trees.setMatrixAt(placed++, dm.matrix);
    }
    trees.count = placed;
    scene.add(trees);

    /* ---------- the town ---------- */
    var TOWN = { x: 22, z: -8 };
    var houseN = small ? 18 : 30;
    var bodyG = new T.BoxGeometry(1, 1, 1); bodyG.translate(0, 0.5, 0);
    var roofG = new T.ConeGeometry(0.82, 0.7, 4); roofG.rotateY(Math.PI / 4); roofG.translate(0, 0.35, 0);
    var bodies = new T.InstancedMesh(bodyG, new T.MeshStandardMaterial({ color: 0xEDE4D3, roughness: 0.9 }), houseN);
    var roofs = new T.InstancedMesh(roofG, new T.MeshStandardMaterial({ color: 0xA8352A, flatShading: true, roughness: 0.8 }), houseN);
    var winPos = [], houses = [];
    for (i = 0; i < houseN; i++) {
      var a = rnd(i * 5.3) * Math.PI * 2, r = 2 + Math.sqrt(rnd(i * 2.9)) * 16;
      var hx = TOWN.x + Math.cos(a) * r * 1.3, hz = TOWN.z + Math.sin(a) * r * 0.8;
      var w = 1.8 + rnd(i * 4.1) * 1.6, hh = 1.6 + rnd(i * 8.3) * 2.2, d = 1.8 + rnd(i * 6.7) * 1.2;
      var rot = (rnd(i * 9.1) - 0.5) * 0.6;
      dm.position.set(hx, -0.2, hz); dm.rotation.set(0, rot, 0); dm.scale.set(w, hh, d); dm.updateMatrix();
      bodies.setMatrixAt(i, dm.matrix);
      dm.position.set(hx, hh - 0.2, hz); dm.scale.set(w * 1.25, 1.2, d * 1.25); dm.updateMatrix();
      roofs.setMatrixAt(i, dm.matrix);
      houses.push({ x: hx, z: hz, h: hh });
      var wn = 1 + Math.floor(rnd(i * 3.3) * 3);
      for (var k2 = 0; k2 < wn; k2++) winPos.push(hx + (rnd(i + k2 * 11) - 0.5) * w * 0.7, 0.7 + rnd(i * k2 + 2) * (hh - 1), hz + d / 2 + 0.05);
    }
    scene.add(bodies); scene.add(roofs);
    var wg = new T.BufferGeometry(); wg.setAttribute('position', new T.BufferAttribute(new Float32Array(winPos), 3));
    var windows = new T.Points(wg, new T.PointsMaterial({ color: 0xFFD27A, size: 0.55, transparent: true, opacity: 0.95 }));
    scene.add(windows);

    /* ---------- map pins + pulse rings ---------- */
    var pinColors = [0xF0B429, 0xE0483A, 0xF0B429, 0xFFFFFF, 0xE0483A];
    var pins = [], pinCount = small ? 4 : 5;
    var headG = new T.SphereGeometry(1.15, 20, 14);
    var tipG = new T.ConeGeometry(0.9, 2.4, 20); tipG.rotateX(Math.PI); tipG.translate(0, -1.3, 0);
    var dotG = new T.SphereGeometry(0.42, 12, 8);
    var ringG = new T.RingGeometry(0.85, 1.1, 40); ringG.rotateX(-Math.PI / 2);
    for (i = 0; i < pinCount; i++) {
      var hs = houses[Math.floor(i * houses.length / pinCount + 1) % houses.length];
      var col = pinColors[i % pinColors.length];
      var mat = new T.MeshStandardMaterial({ color: col, emissive: col, emissiveIntensity: 0.45, roughness: 0.35, metalness: 0.1 });
      var pin = new T.Group();
      pin.add(new T.Mesh(headG, mat));
      pin.add(new T.Mesh(tipG, mat));
      var dot = new T.Mesh(dotG, new T.MeshBasicMaterial({ color: 0x0E2A24 })); dot.position.z = 0.95; pin.add(dot);
      var ph = new T.Sprite(new T.SpriteMaterial({ map: glow, transparent: true, depthWrite: false, blending: T.AdditiveBlending, opacity: 0.5 }));
      ph.scale.set(7, 7, 1); pin.add(ph);
      var baseY = hs.h + 4.5 + rnd(i * 13) * 3;
      pin.position.set(hs.x, baseY, hs.z);
      scene.add(pin);
      var rings = [];
      for (var q = 0; q < 2; q++) {
        var rm = new T.Mesh(ringG, new T.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.6, depthWrite: false, side: T.DoubleSide }));
        rm.position.set(hs.x, 0.15, hs.z); scene.add(rm); rings.push(rm);
      }
      pins.push({ g: pin, y: baseY, ph: rnd(i * 21) * 6, rings: rings });
    }

    /* ---------- signal arcs between pins (the "online" layer) ---------- */
    var arcs = [];
    var arcMat = new T.LineBasicMaterial({ color: 0xFFE3A3, transparent: true, opacity: 0.45 });
    var pulseMat = new T.SpriteMaterial({ map: glow, transparent: true, depthWrite: false, blending: T.AdditiveBlending });
    for (i = 0; i < pins.length; i++) {
      var A = pins[i].g.position, B = pins[(i + 1) % pins.length].g.position;
      var M = A.clone().add(B).multiplyScalar(0.5); M.y += 10 + A.distanceTo(B) * 0.35;
      var curve = new T.QuadraticBezierCurve3(A.clone(), M, B.clone());
      scene.add(new T.Line(new T.BufferGeometry().setFromPoints(curve.getPoints(48)), arcMat));
      var pulse = new T.Sprite(pulseMat); pulse.scale.set(2.6, 2.6, 1); scene.add(pulse);
      arcs.push({ c: curve, p: pulse, o: i / pins.length });
    }

    /* ---------- clouds ---------- */
    var clouds = [], cloudN = small ? 5 : 9;
    for (i = 0; i < cloudN; i++) {
      var cg = new T.Group();
      var puffs = 4 + Math.floor(rnd(i * 2.2) * 4);
      for (var pf = 0; pf < puffs; pf++) {
        var spr = new T.Sprite(new T.SpriteMaterial({ map: soft, transparent: true, depthWrite: false, opacity: 0.55, color: 0xFFF1DE }));
        var sc = 14 + rnd(i * 10 + pf) * 16; spr.scale.set(sc, sc * 0.55, 1);
        spr.position.set((pf - puffs / 2) * 7 + rnd(pf + i) * 4, rnd(pf * 3 + i) * 3, rnd(pf * 7 + i) * 4);
        cg.add(spr);
      }
      cg.position.set(-180 + rnd(i * 4.4) * 360, 26 + rnd(i * 3.7) * 22, -150 + rnd(i * 5.1) * 120);
      cg.userData.v = 1.2 + rnd(i * 6.6) * 1.8;
      scene.add(cg); clouds.push(cg);
    }

    /* ---------- fireflies ---------- */
    var fN = small ? 50 : 120, fpos = new Float32Array(fN * 3);
    for (i = 0; i < fN; i++) {
      fpos[i * 3] = (rnd(i + 3) - 0.5) * 160;
      fpos[i * 3 + 1] = 1 + rnd(i + 50) * 26;
      fpos[i * 3 + 2] = -50 + rnd(i + 99) * 90;
    }
    var fg = new T.BufferGeometry(); fg.setAttribute('position', new T.BufferAttribute(fpos, 3));
    var flies = new T.Points(fg, new T.PointsMaterial({ map: glow, color: 0xFFE08A, size: 1.6, transparent: true, depthWrite: false, blending: T.AdditiveBlending, opacity: 0.9 }));
    scene.add(flies);

    /* ---------- interaction ---------- */
    var mx = 0, my = 0, yaw = 0, yawT = 0.22, vel = 0, dragging = false, lastX = 0, idle = 0;
    var sign = document.querySelector('.sign');
    window.addEventListener('pointermove', function (e) {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
      if (dragging) {
        var dx = (e.clientX - lastX) / window.innerWidth;
        lastX = e.clientX; yawT -= dx * 2.2; vel = -dx * 2.2; idle = 0;
      }
    }, { passive: true });
    hero.addEventListener('pointerdown', function (e) {
      if (e.target.closest('a,button,input,select,textarea,.sign')) return;
      if (e.pointerType === 'mouse') e.preventDefault();   // no text selection while dragging
      dragging = true; lastX = e.clientX; hero.classList.add('dragging');
    });
    window.addEventListener('pointerup', function () { dragging = false; hero.classList.remove('dragging'); });
    window.addEventListener('pointercancel', function () { dragging = false; hero.classList.remove('dragging'); });

    function size() {
      var w = canvas.clientWidth || hero.clientWidth, h = canvas.clientHeight || hero.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.fov = w / h < 0.9 ? 62 : 45;
      LOOK_Y = w / h < 0.9 ? 22 : 24;
      RAD = w / h < 0.9 ? 1.25 : 1;
      camera.updateProjectionMatrix();
    }

    var target = new T.Vector3(), last = 0, LOOK_Y = 24, RAD = 1;
    function frame(t) {
      var time = t * 0.001, dt = Math.min(0.05, (t - last) * 0.001 || 0.016); last = t;
      var p = Math.min(1, Math.max(0, window.scrollY / hero.offsetHeight));

      // camera: orbit around the town, drift when idle, fly in on scroll
      if (!dragging) { yawT += vel; vel *= 0.92; idle += dt; if (idle > 2.5) yawT += Math.sin(time * 0.12) * 0.0009; }
      yawT = Math.max(-0.75, Math.min(0.9, yawT));
      yaw += (yawT - yaw) * 0.06;
      var radius = (74 - p * 26) * RAD, height = 24 - p * 8 + -my * 4;
      var cx = TOWN.x - 14, cz = TOWN.z;
      camera.position.set(cx + Math.sin(yaw + mx * 0.12) * radius, height, cz + Math.cos(yaw + mx * 0.12) * radius);
      target.set(cx + 4, LOOK_Y - p * 6, cz - 30);
      camera.lookAt(target);

      // pins bob and their rings pulse outward
      for (var i = 0; i < pins.length; i++) {
        var pn = pins[i], ph = time * 1.4 + pn.ph;
        pn.g.position.y = pn.y + Math.sin(ph) * 0.8;
        pn.g.rotation.y = time * 0.8 + pn.ph;
        for (var r = 0; r < pn.rings.length; r++) {
          var k = ((time * 0.45 + pn.ph * 0.2 + r * 0.5) % 1);
          pn.rings[r].scale.setScalar(1 + k * 7);
          pn.rings[r].material.opacity = 0.65 * (1 - k);
        }
      }
      // signals travel along the arcs
      for (i = 0; i < arcs.length; i++) {
        var u = (time * 0.18 + arcs[i].o) % 1;
        arcs[i].p.position.copy(arcs[i].c.getPoint(u));
        arcs[i].p.material.opacity = Math.sin(u * Math.PI);
      }
      for (i = 0; i < clouds.length; i++) {
        clouds[i].position.x += clouds[i].userData.v * dt * 2;
        if (clouds[i].position.x > 200) clouds[i].position.x = -200;
      }
      flies.position.y = Math.sin(time * 0.5) * 1.2;
      flies.material.opacity = 0.65 + Math.sin(time * 2.1) * 0.25;
      windows.material.opacity = 0.85 + Math.sin(time * 3.3) * 0.08;
      halo.material.opacity = 0.75 + Math.sin(time * 0.7) * 0.1;

      renderer.render(scene, camera);
      if (sign && !reduce && window.innerWidth > 860) {
        sign.style.transform = 'rotate(-1.6deg) rotateY(' + (mx * 8).toFixed(2) + 'deg) rotateX(' + (-my * 6).toFixed(2) + 'deg)';
      }
    }

    var raf = 0, visible = true;
    function loop(t) { frame(t); raf = requestAnimationFrame(loop); }
    function start() { if (!raf && visible && !document.hidden) raf = requestAnimationFrame(loop); }
    function stop() { cancelAnimationFrame(raf); raf = 0; }

    size();
    if ('ResizeObserver' in window) new ResizeObserver(function () { size(); if (reduce) frame(0); }).observe(hero);
    else window.addEventListener('resize', size);

    if (reduce) { frame(0); hero.classList.add('still'); return; }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) { visible = en[0].isIntersecting; visible ? start() : stop(); }).observe(hero);
    }
    document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });
    start();
  }

  if (window.THREE) init();
  else window.addEventListener('load', init);
})();
