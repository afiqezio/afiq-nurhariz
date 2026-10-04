import { useEffect, useRef, useState } from "react";
import type * as THREE from "three";

export type Skill = { name: string; category: string; level: number };

type Category = { key: string; label: string; color: string; dir: [number, number, number] };

// Equatorial slots for the big domains, poles for the small ones.
const CATS: Category[] = [
  { key: "AI/ML", label: "AI / ML", color: "#f4a87a", dir: [0, 0, 1] },
  { key: "Frontend", label: "Frontend", color: "#9b8cff", dir: [1, 0, 0] },
  { key: "Database", label: "Database", color: "#4fd8a8", dir: [0, 0, -1] },
  { key: "Backend", label: "Backend", color: "#5aa9f0", dir: [-1, 0, 0] },
  { key: "Mobile", label: "Mobile", color: "#f08fd0", dir: [0, 1, 0] },
  { key: "DevOps", label: "DevOps", color: "#dcc65a", dir: [0, -1, 0] },
];
const ALL_COLOR = "oklch(0.72 0.2 295)";

interface SkillOrbitProps {
  skills: Skill[];
}

// Single 3D component: every skill on one globe, clustered by domain.
// Filter chips bring a domain to the front; drag to orbit; hover/tap a node for detail.
const SkillOrbit = ({ skills }: SkillOrbitProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const meterRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const setCatRef = useRef<(key: string) => void>(() => {});
  const [active, setActive] = useState("All");

  const count = (key: string) =>
    key === "All" ? skills.length : skills.filter((s) => s.category === key).length;

  const selectCat = (key: string) => {
    setActive(key);
    setCatRef.current(key);
  };

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    let disposed = false;
    let cleanup = () => {};

    // three.js is loaded on demand so it stays out of the initial bundle
    Promise.all([import("@/lib/orbitThree"), document.fonts?.ready]).then(([T]) => {
      if (disposed) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const renderer = new T.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      const scene = new T.Scene();
      const camera = new T.PerspectiveCamera(35, 1, 0.1, 100);
      const globe = new T.Group();
      scene.add(globe);
      globe.quaternion.setFromEuler(new T.Euler(0.32, -0.5, 0));

      const disposables: { dispose: () => void }[] = [];
      const track = <D extends { dispose: () => void }>(d: D) => {
        disposables.push(d);
        return d;
      };

      // Faint latitude / longitude cage
      {
        const pts: number[] = [];
        const seg = 96;
        for (let lat = -60; lat <= 60; lat += 30) {
          const y = Math.sin((lat * Math.PI) / 180);
          const r = Math.cos((lat * Math.PI) / 180);
          for (let i = 0; i < seg; i++) {
            const a = (i / seg) * Math.PI * 2;
            const b = ((i + 1) / seg) * Math.PI * 2;
            pts.push(Math.cos(a) * r, y, Math.sin(a) * r, Math.cos(b) * r, y, Math.sin(b) * r);
          }
        }
        for (let lon = 0; lon < 180; lon += 30) {
          const t = (lon * Math.PI) / 180;
          for (let i = 0; i < seg; i++) {
            const a = (i / seg) * Math.PI * 2;
            const b = ((i + 1) / seg) * Math.PI * 2;
            pts.push(
              Math.cos(a) * Math.cos(t), Math.sin(a), Math.cos(a) * Math.sin(t),
              Math.cos(b) * Math.cos(t), Math.sin(b), Math.cos(b) * Math.sin(t)
            );
          }
        }
        const g = track(new T.BufferGeometry());
        g.setAttribute("position", new T.Float32BufferAttribute(pts, 3));
        const m = track(new T.LineBasicMaterial({ color: 0xb8b0d8, transparent: true, opacity: 0.055, depthWrite: false }));
        globe.add(new T.LineSegments(g, m));
      }

      // Shared glow texture
      const glowTex = (() => {
        const c = document.createElement("canvas");
        c.width = c.height = 64;
        const x = c.getContext("2d")!;
        const g = x.createRadialGradient(32, 32, 0, 32, 32, 32);
        g.addColorStop(0, "rgba(255,255,255,1)");
        g.addColorStop(0.25, "rgba(255,255,255,0.5)");
        g.addColorStop(1, "rgba(255,255,255,0)");
        x.fillStyle = g;
        x.fillRect(0, 0, 64, 64);
        return track(new T.CanvasTexture(c));
      })();

      const textSprite = (text: string, worldH: number) => {
        const c = document.createElement("canvas");
        const x = c.getContext("2d")!;
        const px = 64;
        const font = `500 ${px}px Geist, sans-serif`;
        x.font = font;
        const w = Math.ceil(x.measureText(text).width + px * 0.6);
        const h = Math.ceil(px * 1.5);
        c.width = w;
        c.height = h;
        x.font = font;
        x.fillStyle = "#ece8e1";
        x.textBaseline = "middle";
        x.textAlign = "center";
        x.fillText(text, w / 2, h / 2);
        const tex = track(new T.CanvasTexture(c));
        tex.minFilter = T.LinearFilter;
        tex.generateMipmaps = false;
        const mat = track(new T.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, depthTest: false }));
        const s = new T.Sprite(mat);
        s.center.set(0.5, -0.18);
        s.userData.aspect = w / h;
        s.userData.h = worldH;
        s.scale.set(worldH * (w / h), worldH, 1);
        return s;
      };

      // ---------- Build nodes ----------
      type Node = {
        skill: Skill; cat: Category; base: THREE.Vector3;
        dot: THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>;
        glow: THREE.Sprite; label: THREE.Sprite; col: THREE.Color;
        idx: number; emph: number; hov: number;
      };
      type Hub = { cat: Category; dir: THREE.Vector3; lines: THREE.LineSegments<THREE.BufferGeometry, THREE.LineBasicMaterial>; emph: number; items: Skill[] };
      const nodes: Node[] = [];
      const hubs: Hub[] = [];
      const hitTargets: THREE.Mesh[] = [];
      const hitGeo = track(new T.SphereGeometry(0.075, 8, 8));
      const hitMat = track(new T.MeshBasicMaterial({ visible: false }));
      const dotGeo = track(new T.SphereGeometry(0.017, 12, 12));

      let order = 0;
      CATS.forEach((cat) => {
        const c = new T.Vector3(...cat.dir).normalize();
        const helper = Math.abs(c.y) > 0.9 ? new T.Vector3(1, 0, 0) : new T.Vector3(0, 1, 0);
        const t1 = new T.Vector3().crossVectors(c, helper).normalize();
        const t2 = new T.Vector3().crossVectors(c, t1).normalize();
        const items = skills.filter((s) => s.category === cat.key).sort((a, b) => b.level - a.level);
        const n = items.length;
        if (!n) return;
        const capR = 0.16 + 0.11 * Math.sqrt(n);
        const col = new T.Color(cat.color);
        const linePts: number[] = [];
        const core = c.clone().multiplyScalar(0.55);

        items.forEach((s, i) => {
          // Sunflower spread on a spherical cap around the domain's axis
          const r = n === 1 ? 0 : capR * Math.sqrt((i + 0.5) / n);
          const th = i * 2.39996 + cat.dir[0] * 0.7;
          const p = c.clone().multiplyScalar(Math.cos(r))
            .add(t1.clone().multiplyScalar(Math.cos(th) * Math.sin(r)))
            .add(t2.clone().multiplyScalar(Math.sin(th) * Math.sin(r)))
            .normalize();

          const g = new T.Group();
          g.position.copy(p);
          globe.add(g);
          const dot = new T.Mesh(dotGeo, track(new T.MeshBasicMaterial({ color: col, transparent: true })));
          const glow = new T.Sprite(
            track(new T.SpriteMaterial({ map: glowTex, color: col, transparent: true, blending: T.AdditiveBlending, depthWrite: false }))
          );
          glow.scale.setScalar(0.13);
          const label = textSprite(s.name, 0.074 * (0.82 + s.level * 0.4));
          const hit = new T.Mesh(hitGeo, hitMat);
          g.add(glow, dot, label, hit);
          const node: Node = { skill: s, cat, base: p, dot, glow, label, col, idx: order++, emph: 1, hov: 0 };
          hit.userData.node = node;
          hitTargets.push(hit);
          nodes.push(node);
          linePts.push(core.x, core.y, core.z, p.x, p.y, p.z);
        });

        const lg = track(new T.BufferGeometry());
        lg.setAttribute("position", new T.Float32BufferAttribute(linePts, 3));
        const lines = new T.LineSegments(
          lg,
          track(new T.LineBasicMaterial({ color: col, transparent: true, opacity: 0.18, depthWrite: false }))
        );
        globe.add(lines);
        hubs.push({ cat, dir: c, lines, emph: 1, items });
      });

      // ---------- State ----------
      let activeCat = "All";
      let hovered: Node | null = null;
      let pinned: Node | null = null;
      let focusQ: THREE.Quaternion | null = null;
      const vel = { x: 0, y: 0 };
      const AUTO = reduce ? 0 : 0.0016;
      let dragging = false;
      let last = { x: 0, y: 0 };
      let downAt = { x: 0, y: 0 };
      let moved = 0;
      const pointer = new T.Vector2(-9, -9);
      let pointerIn = false;
      const ray = new T.Raycaster();
      const tmp = new T.Vector3();

      const updateReadout = () => {
        const n = pinned || hovered;
        let color: string, eye: string, name: string, v: number, meta: string;
        if (n) {
          color = n.cat.color; eye = n.cat.label; name = n.skill.name; v = n.skill.level;
          meta = `Proficiency · ${Math.round(n.skill.level * 100)}%`;
        } else {
          const hub = hubs.find((h) => h.cat.key === activeCat);
          if (hub) {
            const avg = hub.items.reduce((a, s) => a + s.level, 0) / hub.items.length;
            color = hub.cat.color; eye = "Domain"; name = hub.cat.label; v = avg;
            meta = `${hub.items.length} tools · avg ${Math.round(avg * 100)}%`;
          } else {
            color = ALL_COLOR; eye = "Full constellation"; name = `${skills.length} tools`; v = 1;
            meta = `${hubs.length} domains · one orbit`;
          }
        }
        root.style.setProperty("--rc", color);
        if (eyebrowRef.current) eyebrowRef.current.textContent = eye;
        if (nameRef.current) nameRef.current.textContent = name;
        if (metaRef.current) metaRef.current.textContent = meta;
        meterRef.current?.style.setProperty("--v", v.toFixed(3));
      };

      setCatRef.current = (key: string) => {
        activeCat = key;
        pinned = null;
        const hub = hubs.find((h) => h.cat.key === key);
        if (hub) {
          // Rotate the globe so the domain's cluster faces the camera
          const world = hub.dir.clone().applyQuaternion(globe.quaternion);
          const front = new T.Vector3(0, 0.12, 1).normalize();
          focusQ = new T.Quaternion().setFromUnitVectors(world, front).multiply(globe.quaternion.clone());
          if (reduce) { globe.quaternion.copy(focusQ); focusQ = null; }
          vel.x = vel.y = 0;
        } else {
          focusQ = null;
        }
        updateReadout();
        wake();
      };

      // ---------- Pointer ----------
      const yAxis = new T.Vector3(0, 1, 0);
      const xAxis = new T.Vector3(1, 0, 0);
      const qy = new T.Quaternion();
      const qx = new T.Quaternion();
      const rot = (dx: number, dy: number) => {
        qy.setFromAxisAngle(yAxis, dx);
        qx.setFromAxisAngle(xAxis, dy);
        globe.quaternion.premultiply(qy).premultiply(qx);
      };
      const onDown = (e: PointerEvent) => {
        dragging = true;
        moved = 0;
        last = { x: e.clientX, y: e.clientY };
        downAt = last;
        canvas.setPointerCapture(e.pointerId);
        canvas.classList.add("is-dragging");
      };
      const onMove = (e: PointerEvent) => {
        pointerIn = true;
        const r = canvas.getBoundingClientRect();
        pointer.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
        wake();
        if (!dragging) return;
        const dx = e.clientX - last.x;
        const dy = e.clientY - last.y;
        last = { x: e.clientX, y: e.clientY };
        moved = Math.hypot(e.clientX - downAt.x, e.clientY - downAt.y);
        if (moved > 4) focusQ = null;
        vel.y = dx * 0.0055;
        vel.x = dy * 0.0045;
        rot(vel.y, vel.x);
      };
      const onUp = () => {
        if (!dragging) return;
        dragging = false;
        canvas.classList.remove("is-dragging");
        // A tap (not a drag) pins / unpins the node under the pointer
        if (moved < 5) {
          pinned = hovered && pinned !== hovered ? hovered : null;
          updateReadout();
        }
      };
      const onCancel = () => {
        dragging = false;
        canvas.classList.remove("is-dragging");
      };
      const onLeave = () => {
        pointerIn = false;
        if (hovered) { hovered = null; updateReadout(); }
      };
      canvas.addEventListener("pointerdown", onDown);
      canvas.addEventListener("pointermove", onMove);
      canvas.addEventListener("pointerup", onUp);
      canvas.addEventListener("pointercancel", onCancel);
      canvas.addEventListener("pointerleave", onLeave);

      // ---------- Loop — runs only while visible and something is moving ----------
      let raf = 0;
      let visible = false;
      let introStart = 0;
      let lastT = 0;
      const smooth = (a: number, b: number, x: number) => {
        const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
        return t * t * (3 - 2 * t);
      };

      const frame = (now: number) => {
        raf = 0;
        const dt = lastT ? Math.min(now - lastT, 64) / 16.67 : 1;
        lastT = now;
        if (!introStart) introStart = now;
        const intro = (now - introStart) / 1000;

        if (focusQ) {
          globe.quaternion.slerp(focusQ, 1 - Math.pow(0.9, dt));
          if (globe.quaternion.angleTo(focusQ) < 0.002) focusQ = null;
        } else if (!dragging) {
          vel.x *= Math.pow(0.93, dt);
          vel.y *= Math.pow(0.93, dt);
          const auto = activeCat === "All" && !pinned ? AUTO : 0;
          rot((vel.y + auto) * dt, vel.x * dt);
        }

        // Hover pick (front-facing, emphasised nodes only)
        let hit: Node | null = null;
        if (pointerIn && !dragging) {
          ray.setFromCamera(pointer, camera);
          for (const h of ray.intersectObjects(hitTargets, false)) {
            const n = h.object.userData.node as Node;
            tmp.copy(n.base).applyQuaternion(globe.quaternion);
            if (tmp.z > -0.15 && n.emph > 0.5) { hit = n; break; }
          }
        }
        if (hit !== hovered) {
          hovered = hit;
          updateReadout();
          canvas.classList.toggle("is-hover", !!hit);
        }

        const k = 1 - Math.pow(0.86, dt);
        let busy =
          !!focusQ || dragging || Math.abs(vel.x) + Math.abs(vel.y) > 0.0002 ||
          (activeCat === "All" && !pinned && AUTO > 0) || intro < 2.6;
        const focusNode = pinned || hovered;

        nodes.forEach((n) => {
          const tE = activeCat === "All" || n.cat.key === activeCat ? 1 : 0;
          const tH = focusNode === n ? 1 : 0;
          n.emph += (tE - n.emph) * k;
          n.hov += (tH - n.hov) * k;
          if (Math.abs(tE - n.emph) > 0.002 || Math.abs(tH - n.hov) > 0.002) busy = true;
          tmp.copy(n.base).applyQuaternion(globe.quaternion);
          const depth = 0.22 + 0.78 * smooth(-1, 0.9, tmp.z);
          const labelDepth = smooth(-0.45, 0.35, tmp.z);
          const appear = reduce ? 1 : smooth(0, 1, (intro - 0.2 - n.idx * 0.035) / 0.7);
          const dim = focusNode && focusNode !== n ? 0.55 : 1;
          const e = 0.12 + 0.88 * n.emph;
          const sc = appear * (0.7 + 0.3 * n.emph + 0.35 * n.hov);
          n.dot.scale.setScalar(sc);
          n.dot.material.opacity = depth * e;
          n.glow.scale.setScalar(0.13 * sc * (1 + n.hov * 0.8));
          n.glow.material.opacity = depth * e * (0.55 + 0.45 * n.hov);
          const ls = appear * (0.92 + 0.08 * n.emph + 0.18 * n.hov);
          n.label.scale.set(n.label.userData.h * n.label.userData.aspect * ls, n.label.userData.h * ls, 1);
          n.label.material.opacity = labelDepth * (0.06 + 0.94 * n.emph) * dim * appear;
          n.label.material.color.setRGB(1, 1, 1).lerp(n.col, 0.15 + 0.85 * n.hov);
          n.label.renderOrder = 10 + Math.round(tmp.z * 10);
        });

        hubs.forEach((h) => {
          const tE = activeCat === "All" ? 0.6 : h.cat.key === activeCat ? 1 : 0.08;
          h.emph += (tE - h.emph) * k;
          tmp.copy(h.dir).applyQuaternion(globe.quaternion);
          const depth = smooth(-0.6, 0.5, tmp.z);
          const appear = reduce ? 1 : smooth(0.6, 1.8, intro);
          h.lines.material.opacity = (0.04 + 0.22 * h.emph) * (0.35 + 0.65 * depth) * appear;
        });

        renderer.render(scene, camera);
        if (busy && visible) raf = requestAnimationFrame(frame);
        else lastT = 0;
      };
      const wake = () => {
        if (!raf && visible) raf = requestAnimationFrame(frame);
      };

      // ---------- Resize / visibility ----------
      const resize = () => {
        const w = root.clientWidth;
        const h = root.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        const fit = camera.aspect < 1 ? 1.42 : 1.3;
        const tanH = Math.tan((camera.fov * Math.PI) / 360);
        camera.position.set(0, 0, fit / tanH / Math.min(1, camera.aspect));
        camera.updateProjectionMatrix();
        wake();
      };
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(root);

      const viewObserver = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting && !document.hidden;
          if (visible) lastT = 0;
          wake();
        },
        { rootMargin: "100px 0px" }
      );
      viewObserver.observe(root);

      resize();
      updateReadout();

      cleanup = () => {
        cancelAnimationFrame(raf);
        resizeObserver.disconnect();
        viewObserver.disconnect();
        canvas.removeEventListener("pointerdown", onDown);
        canvas.removeEventListener("pointermove", onMove);
        canvas.removeEventListener("pointerup", onUp);
        canvas.removeEventListener("pointercancel", onCancel);
        canvas.removeEventListener("pointerleave", onLeave);
        setCatRef.current = () => {};
        disposables.forEach((d) => d.dispose());
        renderer.dispose();
      };
    });

    return () => {
      disposed = true;
      cleanup();
    };
  }, [skills]);

  const chips = [{ key: "All", label: "All", color: ALL_COLOR }, ...CATS];

  return (
    <div className="orbit" id="skill-orbit" ref={rootRef}>
      <canvas className="orbit-canvas" ref={canvasRef} aria-hidden="true" />
      <div className="orbit-filters" role="group" aria-label="Filter skills by domain">
        {chips.map((c) => (
          <button
            key={c.key}
            type="button"
            className={`orbit-chip${active === c.key ? " active" : ""}`}
            style={{ "--c": c.color } as React.CSSProperties}
            onClick={() => selectCat(c.key)}
          >
            <i />
            {c.label}
            <b>{String(count(c.key)).padStart(2, "0")}</b>
          </button>
        ))}
      </div>
      <div className="orbit-readout" aria-live="polite">
        <div className="orbit-readout-eyebrow" ref={eyebrowRef}>Full constellation</div>
        <div className="orbit-readout-name" ref={nameRef}>{skills.length} tools</div>
        <div className="orbit-readout-meter" ref={meterRef} />
        <div className="orbit-readout-meta" ref={metaRef}>{CATS.length} domains · one orbit</div>
      </div>
      <div className="orbit-hint">Drag to orbit · Tap a node</div>
      <ul className="orbit-list sr-only">
        {CATS.map((c) => (
          <li key={c.key}>
            {c.label}: {skills.filter((s) => s.category === c.key).map((s) => s.name).join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillOrbit;
