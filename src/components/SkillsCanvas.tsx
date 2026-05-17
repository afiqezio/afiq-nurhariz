import { useEffect, useRef } from "react";
import * as THREE from "three";

interface SkillNode {
  name: string;
  category: string;
}

interface SkillsCanvasProps {
  skills: SkillNode[];
}

const CATEGORY_COLORS: Record<string, number> = {
  Frontend: 0x7c6ef5,
  Backend: 0x5ba4ff,
  Mobile: 0xff9ffc,
  "AI/ML": 0xffb89c,
  Database: 0x5ff5c0,
  DevOps: 0xffd166,
  Other: 0xaaaaaa,
};

declare global {
  interface Window {
    __highlightSkill?: (name: string | null) => void;
  }
}

const SkillsCanvas = ({ skills }: SkillsCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const W = canvas.clientWidth;
    const H = canvas.clientHeight;
    renderer.setSize(W, H, false);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 100);
    camera.position.z = 5.5;

    // Fibonacci sphere distribution
    const count = skills.length;
    const nodePositions: THREE.Vector3[] = [];
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const radius = 2.2;

    for (let i = 0; i < count; i++) {
      const theta = Math.acos(1 - (2 * (i + 0.5)) / count);
      const phi = (2 * Math.PI * i) / goldenRatio;
      nodePositions.push(
        new THREE.Vector3(
          radius * Math.sin(theta) * Math.cos(phi),
          radius * Math.sin(theta) * Math.sin(phi),
          radius * Math.cos(theta)
        )
      );
    }

    // Node meshes
    const nodeMeshes: THREE.Mesh[] = [];
    const nodeGroup = new THREE.Group();

    skills.forEach((skill, i) => {
      const color = CATEGORY_COLORS[skill.category] ?? 0xaaaaaa;
      const geo = new THREE.SphereGeometry(0.075, 12, 12);
      const mat = new THREE.MeshBasicMaterial({ color });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(nodePositions[i]);
      mesh.userData = { name: skill.name, index: i };
      nodeGroup.add(mesh);
      nodeMeshes.push(mesh);
    });

    // Connection lines
    const linesMaterial = new THREE.LineBasicMaterial({
      color: 0x7c6ef5,
      transparent: true,
      opacity: 0.18,
    });

    for (let i = 0; i < count; i++) {
      const distances = nodePositions.map((p, j) => ({
        j,
        d: nodePositions[i].distanceTo(p),
      }));
      distances.sort((a, b) => a.d - b.d);
      const nearest = distances.slice(1, 3);
      nearest.forEach(({ j }) => {
        if (j > i) {
          const lineGeo = new THREE.BufferGeometry().setFromPoints([
            nodePositions[i],
            nodePositions[j],
          ]);
          nodeGroup.add(new THREE.Line(lineGeo, linesMaterial));
        }
      });
    }

    // Central wireframe icosahedron
    const hubGeo = new THREE.IcosahedronGeometry(0.45, 1);
    const hubMat = new THREE.MeshBasicMaterial({
      color: 0x7c6ef5,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    nodeGroup.add(new THREE.Mesh(hubGeo, hubMat));
    scene.add(nodeGroup);

    // Raycaster
    const raycaster = new THREE.Raycaster();
    raycaster.params.Points = { threshold: 0.1 };

    // Drag rotation
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    let autoRotate = true;
    let rotateTimeout: ReturnType<typeof setTimeout>;

    const getCanvasNDC = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      return new THREE.Vector2(
        ((clientX - rect.left) / rect.width) * 2 - 1,
        -((clientY - rect.top) / rect.height) * 2 + 1
      );
    };

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      autoRotate = false;
      prevMouse = { x: e.clientX, y: e.clientY };
      clearTimeout(rotateTimeout);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (isDragging) {
        const dx = (e.clientX - prevMouse.x) * 0.005;
        const dy = (e.clientY - prevMouse.y) * 0.005;
        nodeGroup.rotation.y += dx;
        nodeGroup.rotation.x += dy;
        prevMouse = { x: e.clientX, y: e.clientY };
      }

      // Hover
      const ndc = getCanvasNDC(e.clientX, e.clientY);
      raycaster.setFromCamera(ndc, camera);
      const hits = raycaster.intersectObjects(nodeMeshes);
      if (hits.length > 0) {
        const name = hits[0].object.userData.name as string;
        canvas.dispatchEvent(new CustomEvent("skill-hover", { detail: { name }, bubbles: true }));
      } else {
        canvas.dispatchEvent(new CustomEvent("skill-hover", { detail: { name: null }, bubbles: true }));
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!isDragging) return;
      isDragging = false;
      rotateTimeout = setTimeout(() => { autoRotate = true; }, 2000);

      // Click
      const ndc = getCanvasNDC(e.clientX, e.clientY);
      raycaster.setFromCamera(ndc, camera);
      const hits = raycaster.intersectObjects(nodeMeshes);
      if (hits.length > 0) {
        const name = hits[0].object.userData.name as string;
        canvas.dispatchEvent(new CustomEvent("skill-select", { detail: { name }, bubbles: true }));
      }
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);

    // Highlight API
    window.__highlightSkill = (name: string | null) => {
      nodeMeshes.forEach((mesh) => {
        const mat = mesh.material as THREE.MeshBasicMaterial;
        const cat = skills[mesh.userData.index]?.category ?? "Other";
        const baseColor = CATEGORY_COLORS[cat] ?? 0xaaaaaa;
        if (name === null) {
          mat.color.setHex(baseColor);
          mesh.scale.setScalar(1);
        } else if (mesh.userData.name === name) {
          mat.color.setHex(0xffffff);
          mesh.scale.setScalar(1.8);
        } else {
          mat.color.setHex(baseColor);
          mesh.scale.setScalar(1);
        }
      });
    };

    const onResize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(canvas);

    let rafId: number;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      if (autoRotate) {
        nodeGroup.rotation.y += 0.003;
        nodeGroup.rotation.x += 0.001;
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(rotateTimeout);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      ro.disconnect();
      renderer.dispose();
      delete window.__highlightSkill;
    };
  }, [skills]);

  return <canvas id="skills-canvas" ref={canvasRef} />;
};

export default SkillsCanvas;
