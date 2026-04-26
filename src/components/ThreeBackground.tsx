import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeBackgroundProps {
  className?: string;
}

const ThreeBackground = ({ className = '' }: ThreeBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 5;

    const CYAN = 0x22d3ee;

    // Icosahedron wireframe
    const icoGeo = new THREE.IcosahedronGeometry(1.6, 1);
    const icoMat = new THREE.MeshBasicMaterial({ color: CYAN, wireframe: true, transparent: true, opacity: 0.18 });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    ico.position.set(3.2, 0, -1);
    scene.add(ico);

    // Outer torus ring
    const ringGeo = new THREE.TorusGeometry(2.2, 0.008, 4, 80);
    const ringMat = new THREE.MeshBasicMaterial({ color: CYAN, transparent: true, opacity: 0.08 });
    const ring3d = new THREE.Mesh(ringGeo, ringMat);
    ring3d.position.set(3.2, 0, -1);
    ring3d.rotation.x = Math.PI / 4;
    scene.add(ring3d);

    // Particles
    const count = 220;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 22;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
    }
    const ptGeo = new THREE.BufferGeometry();
    ptGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const ptMat = new THREE.PointsMaterial({ color: CYAN, size: 0.025, transparent: true, opacity: 0.4 });
    const points = new THREE.Points(ptGeo, ptMat);
    scene.add(points);

    // Horizontal grid lines
    for (let i = -5; i <= 5; i++) {
      const g = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-12, i * 1.4, -4),
        new THREE.Vector3(12,  i * 1.4, -4),
      ]);
      const m = new THREE.LineBasicMaterial({ color: CYAN, transparent: true, opacity: 0.025 });
      scene.add(new THREE.Line(g, m));
    }

    let mouse = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener('resize', resize);

    let t = 0;
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      t += 0.005;
      ico.rotation.x = t * 0.4;
      ico.rotation.y = t * 0.6;
      ring3d.rotation.z = t * 0.2;
      ico.position.x = 3.2 + mouse.x * 0.15;
      ico.position.y = mouse.y * 0.1;
      points.rotation.y = t * 0.04 + mouse.x * 0.04;
      points.rotation.x = mouse.y * 0.02;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', resize);
      icoGeo.dispose();
      icoMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      ptGeo.dispose();
      ptMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
};

export default ThreeBackground;
