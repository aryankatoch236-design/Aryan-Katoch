import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { STRATEGY_NODES } from '../../data/portfolioData';

/*
 * ARYAN KATOCH — "GROUND CORE" 3D WORLD
 * One fixed WebGL scene the camera travels down as you scroll:
 *   y =   0  Hero: a floating hexagonal Himachal island — snow peaks, a small town,
 *            glowing map pins with pulse rings (offline), signal arcs between them (online),
 *            a wireframe geo-fence dome and orbit rings. Drag to rotate.
 *   y = -25  The 360° Hybrid Engine: six touch-points (gold = online, ember = offline) around a hub.
 *   y = -50  A hexagonal tunnel the camera flies into before the contact section.
 */

interface SceneContainerProps {
  scrollProgress: number;
  activeSection: string;
  onHoverStrategyNode?: (nodeId: string) => void;
  hoveredStrategyNode?: string;
  easterEggActive?: boolean;
}

const GOLD = 0xffb020;
const EMBER = 0xff5a1f;
const SAND = 0xffe3a8;

export const SceneContainer: React.FC<SceneContainerProps> = ({
  scrollProgress,
  activeSection,
  onHoverStrategyNode,
  hoveredStrategyNode,
  easterEggActive
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({ scrollProgress, activeSection, hoveredStrategyNode, easterEggActive });

  useEffect(() => {
    stateRef.current = { scrollProgress, activeSection, hoveredStrategyNode, easterEggActive };
  }, [scrollProgress, activeSection, hoveredStrategyNode, easterEggActive]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isSmall = () => window.innerWidth < 1024;
    const heroBaseY = () => (window.innerWidth < 640 ? 1.55 : window.innerWidth < 1024 ? 1.2 : 0.1);
    const mobile = window.innerWidth < 700;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: !mobile, alpha: true, powerPreference: 'high-performance' });
    } catch {
      return; // no WebGL: the dark page background still works
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.5 : 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060504, 0.034);
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 8);

    /* ---------- lights ---------- */
    scene.add(new THREE.AmbientLight(0x2a1a0c, 1.6));
    scene.add(new THREE.HemisphereLight(0xffe3b0, 0x1a0c05, 0.9));
    const coreLight = new THREE.PointLight(GOLD, 6, 22);
    scene.add(coreLight);
    const rim = new THREE.DirectionalLight(EMBER, 2.2);
    rim.position.set(-5, 4, 3);
    scene.add(rim);
    const key = new THREE.DirectionalLight(0xfff0d6, 1.4);
    key.position.set(4, 6, 5);
    scene.add(key);

    /* ---------- helpers ---------- */
    const rnd = (i: number) => {
      const v = Math.sin(i * 127.1 + 311.7) * 43758.5453;
      return v - Math.floor(v);
    };
    const glowTex = (() => {
      const c = document.createElement('canvas');
      c.width = c.height = 128;
      const g = c.getContext('2d')!;
      const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64);
      gr.addColorStop(0, 'rgba(255,240,200,1)');
      gr.addColorStop(0.3, 'rgba(255,176,32,.45)');
      gr.addColorStop(1, 'rgba(255,120,30,0)');
      g.fillStyle = gr;
      g.fillRect(0, 0, 128, 128);
      return new THREE.CanvasTexture(c);
    })();

    /* =========================================================
       HERO: GROUND CORE (floating hex island)
       ========================================================= */
    const heroRoot = new THREE.Group(); // position / tilt
    scene.add(heroRoot);
    const island = new THREE.Group(); // spins (auto + drag)
    heroRoot.add(island);

    const R = 2.4;
    const apothem = R * Math.cos(Math.PI / 6);
    const normals = [Math.PI / 6, Math.PI / 2, (5 * Math.PI) / 6].map((a) => [Math.sin(a), Math.cos(a)]);
    const hexDist = (x: number, z: number) =>
      Math.max(...normals.map(([nx, nz]) => Math.abs(x * nx + z * nz)));

    // terrain top
    const seg = mobile ? 46 : 70;
    const terrainGeom = new THREE.PlaneGeometry(R * 2.2, R * 2.2, seg, seg);
    terrainGeom.rotateX(-Math.PI / 2);
    const tp = terrainGeom.attributes.position as THREE.BufferAttribute;
    const tCol = new Float32Array(tp.count * 3);
    const cGrass = new THREE.Color(0x3a4a1e), cForest = new THREE.Color(0x1f2c12), cRock = new THREE.Color(0x5a4636), cSnow = new THREE.Color(0xfff6e6), cc = new THREE.Color();
    for (let i = 0; i < tp.count; i++) {
      let x = tp.getX(i), z = tp.getZ(i);
      const d = hexDist(x, z);
      if (d > apothem) { const k = apothem / d; x *= k; z *= k; }
      const edge = Math.min(1, Math.max(0, (apothem - hexDist(x, z)) / 0.45)); // 0 at rim
      // mountains mostly at the back (z < 0), valley for the town in front
      const back = Math.max(0, Math.min(1, (-z + 0.2) / 1.6));
      const ridge = Math.max(0,
        Math.sin(x * 2.1 + 1.3) * 0.5 + Math.cos(z * 2.7) * 0.35 + Math.sin((x + z) * 3.3) * 0.2 + 0.35);
      const peak = Math.exp(-((x + 0.5) ** 2 + (z + 1.1) ** 2) * 1.6) * 1.25 + Math.exp(-((x - 0.9) ** 2 + (z + 0.9) ** 2) * 2.2) * 0.9;
      let h = (ridge * 0.55 * back + peak) * edge;
      h += (rnd(i) - 0.5) * 0.04 * edge;
      tp.setXYZ(i, x, Math.max(0, h), z);
      const t = h / 1.3;
      cc.copy(cGrass).lerp(cForest, Math.min(1, back * 0.8));
      if (t > 0.35) cc.lerp(cRock, Math.min(1, (t - 0.35) * 3));
      if (t > 0.62) cc.lerp(cSnow, Math.min(1, (t - 0.62) * 5));
      tCol[i * 3] = cc.r; tCol[i * 3 + 1] = cc.g; tCol[i * 3 + 2] = cc.b;
    }
    terrainGeom.setAttribute('color', new THREE.BufferAttribute(tCol, 3));
    terrainGeom.computeVertexNormals();
    const terrain = new THREE.Mesh(terrainGeom, new THREE.MeshStandardMaterial({ vertexColors: true, flatShading: true, roughness: 0.95, metalness: 0 }));
    island.add(terrain);

    // earth slab + rock underside (hexagonal, point-down)
    const slab = new THREE.Mesh(
      new THREE.CylinderGeometry(R, R * 0.97, 0.32, 6, 1),
      new THREE.MeshStandardMaterial({ color: 0x3b2414, flatShading: true, roughness: 1 })
    );
    slab.position.y = -0.16;
    island.add(slab);
    const rockGeom = new THREE.ConeGeometry(R * 0.97, 2.7, 6, 4);
    rockGeom.rotateX(Math.PI);
    const rp = rockGeom.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < rp.count; i++) {
      const y = rp.getY(i);
      if (y < 1.3 && y > -1.3) {
        rp.setX(i, rp.getX(i) * (0.85 + rnd(i * 3) * 0.3));
        rp.setZ(i, rp.getZ(i) * (0.85 + rnd(i * 7) * 0.3));
      }
    }
    rockGeom.computeVertexNormals();
    const rock = new THREE.Mesh(rockGeom, new THREE.MeshStandardMaterial({ color: 0x24160d, flatShading: true, roughness: 1, emissive: 0x2a0d02, emissiveIntensity: 0.4 }));
    rock.position.y = -0.32 - 1.35;
    island.add(rock);
    // glowing hex rim line
    const rimPts: THREE.Vector3[] = [];
    for (let k = 0; k <= 6; k++) {
      const a = (k / 6) * Math.PI * 2;
      rimPts.push(new THREE.Vector3(Math.sin(a) * R, 0.01, Math.cos(a) * R));
    }
    const rimLine = new THREE.Line(new THREE.BufferGeometry().setFromPoints(rimPts), new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0.9 }));
    island.add(rimLine);

    // town (front valley)
    const houseN = mobile ? 16 : 26;
    const bodyG = new THREE.BoxGeometry(1, 1, 1); bodyG.translate(0, 0.5, 0);
    const roofG = new THREE.ConeGeometry(0.78, 0.6, 4); roofG.rotateY(Math.PI / 4); roofG.translate(0, 0.3, 0);
    const bodies = new THREE.InstancedMesh(bodyG, new THREE.MeshStandardMaterial({ color: 0xd8ccb4, roughness: 0.85 }), houseN);
    const roofs = new THREE.InstancedMesh(roofG, new THREE.MeshStandardMaterial({ color: 0xb8401f, flatShading: true, roughness: 0.7 }), houseN);
    const dm = new THREE.Object3D();
    const houses: { x: number; z: number; h: number }[] = [];
    const winPos: number[] = [];
    for (let i = 0; i < houseN; i++) {
      const a = rnd(i * 5.3) * Math.PI * 2, r = 0.15 + Math.sqrt(rnd(i * 2.9)) * 0.95;
      const hx = Math.cos(a) * r * 1.2 + 0.1, hz = 0.75 + Math.sin(a) * r * 0.6;
      if (hexDist(hx, hz) > apothem - 0.25) continue;
      const w = 0.16 + rnd(i * 4.1) * 0.12, hh = 0.14 + rnd(i * 8.3) * 0.2, dd = 0.16 + rnd(i * 6.7) * 0.1;
      dm.position.set(hx, 0, hz); dm.rotation.set(0, (rnd(i * 9.1) - 0.5) * 0.8, 0); dm.scale.set(w, hh, dd); dm.updateMatrix();
      bodies.setMatrixAt(houses.length, dm.matrix);
      dm.position.set(hx, hh, hz); dm.scale.set(w * 1.3, 0.22, dd * 1.3); dm.updateMatrix();
      roofs.setMatrixAt(houses.length, dm.matrix);
      houses.push({ x: hx, z: hz, h: hh });
      winPos.push(hx, hh * 0.55, hz + dd / 2 + 0.005);
    }
    bodies.count = roofs.count = houses.length;
    island.add(bodies, roofs);
    const winGeom = new THREE.BufferGeometry();
    winGeom.setAttribute('position', new THREE.Float32BufferAttribute(winPos, 3));
    const windows = new THREE.Points(winGeom, new THREE.PointsMaterial({ map: glowTex, color: 0xffc766, size: 0.12, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    island.add(windows);

    // pine trees
    const treeN = mobile ? 40 : 80;
    const treeG = new THREE.ConeGeometry(0.06, 0.2, 5); treeG.translate(0, 0.1, 0);
    const trees = new THREE.InstancedMesh(treeG, new THREE.MeshStandardMaterial({ color: 0x173018, flatShading: true }), treeN);
    let tc = 0;
    for (let i = 0; i < treeN * 3 && tc < treeN; i++) {
      const tx = (rnd(i * 3.7) - 0.5) * 2 * R, tz = (rnd(i * 1.3) - 0.5) * 2 * R;
      if (hexDist(tx, tz) > apothem - 0.15 || (tz > 0.2 && Math.abs(tx) < 1.3)) continue;
      // sample nearest terrain height roughly
      let best = 0, bd = 9;
      for (let v = 0; v < tp.count; v += 7) {
        const d2 = (tp.getX(v) - tx) ** 2 + (tp.getZ(v) - tz) ** 2;
        if (d2 < bd) { bd = d2; best = tp.getY(v); }
      }
      if (best > 0.55) continue; // no trees on snow
      const s = 0.8 + rnd(i) * 0.7;
      dm.position.set(tx, best, tz); dm.rotation.set(0, 0, 0); dm.scale.set(s, s, s); dm.updateMatrix();
      trees.setMatrixAt(tc++, dm.matrix);
    }
    trees.count = tc;
    island.add(trees);

    // map pins + pulse rings
    const pinColors = [GOLD, EMBER, SAND, EMBER, GOLD];
    const pinN = Math.min(5, houses.length);
    const headG = new THREE.SphereGeometry(0.11, 18, 12);
    const tipG = new THREE.ConeGeometry(0.085, 0.22, 16); tipG.rotateX(Math.PI); tipG.translate(0, -0.12, 0);
    const ringG = new THREE.RingGeometry(0.08, 0.1, 40); ringG.rotateX(-Math.PI / 2);
    const pins: { g: THREE.Group; y: number; ph: number; rings: THREE.Mesh[] }[] = [];
    for (let i = 0; i < pinN; i++) {
      const hs = houses[Math.floor((i * houses.length) / pinN)];
      const col = pinColors[i];
      const mat = new THREE.MeshStandardMaterial({ color: col, emissive: col, emissiveIntensity: 0.9, roughness: 0.3, metalness: 0.2 });
      const g = new THREE.Group();
      g.add(new THREE.Mesh(headG, mat), new THREE.Mesh(tipG, mat));
      const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.6 }));
      halo.scale.set(0.7, 0.7, 1);
      g.add(halo);
      const y = hs.h + 0.5 + rnd(i * 13) * 0.25;
      g.position.set(hs.x, y, hs.z);
      island.add(g);
      const rings: THREE.Mesh[] = [];
      for (let q = 0; q < 2; q++) {
        const rm = new THREE.Mesh(ringG, new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.6, depthWrite: false, side: THREE.DoubleSide }));
        rm.position.set(hs.x, 0.02, hs.z);
        island.add(rm);
        rings.push(rm);
      }
      pins.push({ g, y, ph: rnd(i * 21) * 6, rings });
    }

    // signal arcs (online layer)
    const arcs: { c: THREE.QuadraticBezierCurve3; p: THREE.Sprite; o: number }[] = [];
    const arcMat = new THREE.LineBasicMaterial({ color: SAND, transparent: true, opacity: 0.55 });
    for (let i = 0; i < pins.length; i++) {
      const A = pins[i].g.position.clone(), B = pins[(i + 1) % pins.length].g.position.clone();
      const M = A.clone().add(B).multiplyScalar(0.5); M.y += 0.6 + A.distanceTo(B) * 0.5;
      const curve = new THREE.QuadraticBezierCurve3(A, M, B);
      island.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(40)), arcMat));
      const p = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
      p.scale.set(0.32, 0.32, 1);
      island.add(p);
      arcs.push({ c: curve, p, o: i / pins.length });
    }

    // geo-fence dome
    const dome = new THREE.Mesh(
      new THREE.SphereGeometry(R * 1.32, 24, 10, 0, Math.PI * 2, 0, Math.PI / 2),
      new THREE.MeshBasicMaterial({ color: GOLD, wireframe: true, transparent: true, opacity: 0.09, depthWrite: false })
    );
    heroRoot.add(dome);

    // orbit rings
    const orbitRings: THREE.Line[] = [];
    [3.6, 4.1, 4.6].forEach((radius, idx) => {
      const pts: THREE.Vector3[] = [];
      for (let k = 0; k <= 96; k++) {
        const th = (k / 96) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(th) * radius, Math.sin(th) * radius, 0));
      }
      const line = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(pts),
        new THREE.LineBasicMaterial({ color: [GOLD, EMBER, SAND][idx], transparent: true, opacity: [0.55, 0.45, 0.3][idx] })
      );
      line.rotation.x = Math.PI / 2 + (idx - 1) * 0.35;
      line.rotation.y = idx * 0.4;
      heroRoot.add(line);
      orbitRings.push(line);
    });

    /* ---------- particles (ember dust) ---------- */
    const particleCount = mobile ? 1600 : 3200;
    const pGeom = new THREE.BufferGeometry();
    const pos = new Float32Array(particleCount * 3), origin = new Float32Array(particleCount * 3), col = new Float32Array(particleCount * 3);
    const cA = new THREE.Color(EMBER), cB = new THREE.Color(GOLD), cW = new THREE.Color(0xffffff);
    for (let i = 0; i < particleCount; i++) {
      const r = 3 + Math.random() * 18, th = Math.random() * Math.PI * 2, ph = Math.acos(Math.random() * 2 - 1);
      const x = r * Math.sin(ph) * Math.cos(th), y = r * Math.sin(ph) * Math.sin(th) - Math.random() * 40, z = r * Math.cos(ph);
      pos.set([x, y, z], i * 3); origin.set([x, y, z], i * 3);
      const m = Math.random(), pc = m < 0.5 ? cA : m < 0.88 ? cB : cW;
      col.set([pc.r, pc.g, pc.b], i * 3);
    }
    pGeom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    pGeom.setAttribute('color', new THREE.BufferAttribute(col, 3));
    const particles = new THREE.Points(pGeom, new THREE.PointsMaterial({ size: 0.05, vertexColors: true, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false }));
    scene.add(particles);

    /* =========================================================
       STRATEGY: 360° HYBRID ENGINE
       ========================================================= */
    const strategyGroup = new THREE.Group();
    strategyGroup.position.set(0, -25, 0);
    scene.add(strategyGroup);
    const hub = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.9, 1),
      new THREE.MeshStandardMaterial({ color: 0x1a0f06, emissive: EMBER, emissiveIntensity: 0.6, metalness: 0.8, roughness: 0.25, flatShading: true })
    );
    strategyGroup.add(hub);
    const hubCage = new THREE.Mesh(new THREE.IcosahedronGeometry(1.35, 1), new THREE.MeshBasicMaterial({ color: GOLD, wireframe: true, transparent: true, opacity: 0.35 }));
    strategyGroup.add(hubCage);
    // dividing line: online (top) vs offline (bottom)
    const hexRingPts: THREE.Vector3[] = [];
    for (let k = 0; k <= 6; k++) {
      const a = (k / 6) * Math.PI * 2 + Math.PI / 6;
      hexRingPts.push(new THREE.Vector3(Math.cos(a) * 3.3, Math.sin(a) * 3.3, 0));
    }
    strategyGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(hexRingPts), new THREE.LineBasicMaterial({ color: SAND, transparent: true, opacity: 0.25 })));

    const nodeMeshes: THREE.Mesh[] = [];
    STRATEGY_NODES.forEach((n) => {
      const c = new THREE.Color(n.color);
      const mesh = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.42, 0),
        new THREE.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: 0.75, roughness: 0.3, metalness: 0.6, flatShading: true })
      );
      mesh.position.set(...n.position);
      mesh.userData = { id: n.id };
      strategyGroup.add(mesh);
      nodeMeshes.push(mesh);
      strategyGroup.add(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3(...n.position)]),
        new THREE.LineBasicMaterial({ color: c, transparent: true, opacity: 0.55 })
      ));
    });

    /* =========================================================
       TUNNEL (hexagonal)
       ========================================================= */
    const tunnelGroup = new THREE.Group();
    tunnelGroup.position.set(0, -50, 0);
    scene.add(tunnelGroup);
    for (let r = 0; r < 18; r++) {
      const pts: THREE.Vector3[] = [];
      const tr = 3.4 + Math.sin(r * 0.4) * 0.5;
      for (let s = 0; s <= 6; s++) {
        const th = (s / 6) * Math.PI * 2 + r * 0.08;
        pts.push(new THREE.Vector3(Math.cos(th) * tr, Math.sin(th) * tr, -r * 3.4));
      }
      tunnelGroup.add(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(pts),
        new THREE.LineBasicMaterial({ color: r % 2 ? EMBER : GOLD, transparent: true, opacity: 0.35 + (18 - r) * 0.03 })
      ));
    }

    /* ---------- interaction ---------- */
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const raycaster = new THREE.Raycaster();
    const mv = new THREE.Vector2();
    let dragging = false, lastX = 0, spinVel = 0, spinOffset = 0;

    const onPointerMove = (e: PointerEvent) => {
      mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.ty = -(e.clientY / window.innerHeight) * 2 + 1;
      if (dragging) {
        const dx = (e.clientX - lastX) / window.innerWidth;
        lastX = e.clientX;
        spinOffset += dx * 5;
        spinVel = dx * 5;
      }
      if (e.pointerType === 'mouse' && stateRef.current.activeSection === 'strategy') {
        mv.set(mouse.tx, mouse.ty);
        raycaster.setFromCamera(mv, camera);
        const hit = raycaster.intersectObjects(nodeMeshes);
        if (hit.length && onHoverStrategyNode) onHoverStrategyNode(hit[0].object.userData.id);
      }
    };
    const onPointerDown = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      if (window.scrollY > window.innerHeight * 0.8) return;
      if (t.closest('a,button,input,select,textarea,label,[data-no-drag]')) return;
      dragging = true;
      lastX = e.clientX;
    };
    const onPointerUp = () => { dragging = false; };
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);

    const layout = () => {
      // island sits right of the headline on desktop, centred lower on mobile
      if (isSmall()) { heroRoot.position.set(0.2, heroBaseY(), -1); heroRoot.scale.setScalar(window.innerWidth < 640 ? 0.62 : 0.8); }
      else { heroRoot.position.set(3.7, heroBaseY(), -0.5); heroRoot.scale.setScalar(0.92); }
      // park the engine and the tunnel where their sections actually are on this page
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const at = (id: string, fallback: number) => {
        const el = document.getElementById(id);
        if (!el || max <= 0) return fallback;
        const f = Math.min(1, Math.max(0, (el.offsetTop + el.offsetHeight * 0.35 - window.innerHeight * 0.5) / max));
        return -f * 65;
      };
      strategyGroup.position.y = at('strategy', -25);
      strategyGroup.position.z = isSmall() ? -4 : -1.5;
      strategyGroup.scale.setScalar(isSmall() ? 0.7 : 1);
      tunnelGroup.position.y = at('contact', -50) + 4;
    };
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      layout();
    };
    layout();
    const settle = window.setTimeout(layout, 1500);
    const ro = 'ResizeObserver' in window ? new ResizeObserver(() => layout()) : null;
    ro?.observe(document.body);
    window.addEventListener('resize', onResize);

    /* ---------- loop ---------- */
    const clock = new THREE.Clock();
    let raf = 0;
    const speed = reduceMotion ? 0.25 : 1;
    const tmpV = new THREE.Vector3();

    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (document.hidden) return;
      const t = clock.getElapsedTime() * speed;
      const { scrollProgress: sp, hoveredStrategyNode: hNode, easterEggActive: egg } = stateRef.current;

      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;

      const camY = -sp * 65;
      const camZ = 8 + Math.sin(sp * Math.PI * 4) * 2 - (sp > 0.85 ? (sp - 0.85) * 15 : 0);
      const camX = mouse.x * 0.8 + Math.sin(sp * Math.PI * 2) * 0.5;
      camera.position.x += (camX - camera.position.x) * 0.06;
      camera.position.y += (camY - camera.position.y) * 0.06;
      camera.position.z += (camZ - camera.position.z) * 0.06;
      camera.rotation.y = -mouse.x * 0.1;
      camera.rotation.x = mouse.y * 0.08;

      // island: tilt toward camera, slow spin + drag inertia
      if (!dragging) { spinOffset += spinVel; spinVel *= 0.94; }
      const coreSpeed = egg ? 4 : 1;
      island.rotation.y = t * 0.12 * coreSpeed + spinOffset;
      heroRoot.rotation.x = 0.42 + mouse.y * 0.08;
      heroRoot.rotation.z = Math.sin(t * 0.3) * 0.03;
      heroRoot.position.y += (heroBaseY() + Math.sin(t * 0.8) * 0.12 - heroRoot.position.y) * 0.05;
      dome.rotation.y = -t * 0.05;
      orbitRings.forEach((ring, i) => { ring.rotation.z = t * (0.25 + i * 0.12) * (i % 2 ? -1 : 1) * coreSpeed; });

      pins.forEach((p) => {
        const ph = t * 1.6 + p.ph;
        p.g.position.y = p.y + Math.sin(ph) * 0.06;
        p.g.rotation.y = t * 1.2 + p.ph;
        p.rings.forEach((rm, r) => {
          const k = (t * 0.5 + p.ph * 0.2 + r * 0.5) % 1;
          rm.scale.setScalar(1 + k * 6);
          (rm.material as THREE.MeshBasicMaterial).opacity = 0.7 * (1 - k);
        });
      });
      arcs.forEach((a) => {
        const u = (t * 0.22 + a.o) % 1;
        a.p.position.copy(a.c.getPoint(u));
        a.p.material.opacity = Math.sin(u * Math.PI);
      });

      // strategy engine
      strategyGroup.rotation.y = t * 0.2;
      strategyGroup.rotation.z = Math.sin(t * 0.2) * 0.1;
      hub.rotation.x = t * 0.3; hubCage.rotation.y = -t * 0.25;
      nodeMeshes.forEach((m) => {
        const on = m.userData.id === hNode;
        const s = on ? 1.6 : 1;
        m.scale.lerp(tmpV.set(s, s, s), 0.1);
        m.rotation.y += on ? 0.05 : 0.01;
      });
      tunnelGroup.rotation.z = t * 0.1;

      // particles
      const pa = pGeom.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3, ox = origin[i3], oy = origin[i3 + 1], oz = origin[i3 + 2];
        if (egg) {
          pa[i3] = ox + Math.sin(t * 6 + i) * 1.2;
          pa[i3 + 1] = oy + Math.cos(t * 6 + i) * 1.2;
          pa[i3 + 2] = oz + Math.sin(t * 8) * 2;
        } else {
          pa[i3] = ox + Math.sin(t * 0.5 + i) * 0.3;
          pa[i3 + 1] = oy + Math.cos(t * 0.4 + i) * 0.3 + ((t * 0.15 + rnd(i)) % 1) * 0.6; // embers drift up
          pa[i3 + 2] = oz + Math.sin(t * 0.3 + i * 0.5) * 0.3;
        }
      }
      pGeom.attributes.position.needsUpdate = true;

      coreLight.intensity = 5 + Math.sin(t * 2.5) * 1.5;
      coreLight.position.set(heroRoot.position.x, camY + 1.5, 2);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(settle);
      ro?.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
      window.removeEventListener('resize', onResize);
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden" style={{ opacity: 0.97 }} />;
};
