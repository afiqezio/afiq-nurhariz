import { useEffect } from "react";
import * as THREE from "three";

const VERT_BLOB = `
uniform float uTime;
uniform float uScroll;
uniform vec2 uMouse;
uniform float uVelocity;
varying vec3 vPos;
varying vec3 vNormal;
varying float vDistort;

vec3 mod289v3(vec3 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 mod289v4(vec4 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 permute(vec4 x){ return mod289v4(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }
float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289v3(i);
  vec4 p = permute( permute( permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );
  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
}

void main(){
  vNormal = normalize(normal);
  vec3 p = position;
  float t = uTime * 0.18;
  float scrollPush = uScroll * 0.6;
  float mouseLift = (uMouse.x + uMouse.y) * 0.15;
  float velKick = uVelocity * 0.9;
  float n = snoise(p * 0.85 + vec3(t, t * 0.7, t * 0.4));
  float n2 = snoise(p * 1.6 + vec3(-t * 0.5, t, t * 0.3));
  float distort = n * 0.55 + n2 * 0.22 + scrollPush * sin(t + p.y) * 0.18 + mouseLift * 0.1 + velKick * 0.25;
  vDistort = distort;
  p += normal * distort;
  vPos = p;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}
`;

const FRAG_BLOB = `
varying vec3 vPos;
varying vec3 vNormal;
varying float vDistort;

void main(){
  // Muted violet core + deep indigo shadow
  vec3 coreHot   = vec3(0.48, 0.26, 0.72);   // dimmed violet
  vec3 coreMid   = vec3(0.28, 0.14, 0.58);   // muted purple
  vec3 coreDeep  = vec3(0.06, 0.02, 0.18);   // deeper indigo
  vec3 rimGlow   = vec3(0.58, 0.40, 0.78);   // softened rim

  float fresnel = pow(1.0 - abs(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0))), 2.8);
  float innerGlow = pow(1.0 - abs(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0))), 1.1);
  float t = clamp(vDistort * 0.9 + 0.5, 0.0, 1.0);

  vec3 col = mix(coreDeep, coreMid, t);
  col = mix(col, coreHot, innerGlow * 0.35);
  col += rimGlow * fresnel * 0.45;

  // alpha: dark center, soft glowing rim
  float alpha = 0.10 + fresnel * 0.40 + innerGlow * 0.04;
  gl_FragColor = vec4(col, alpha);
}
`;

const VERT_PARTICLES = `
attribute float aSize;
attribute float aHue;
varying float vAlpha;
varying float vHue;
void main(){
  vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
  // Smaller sprites — reduced multiplier
  gl_PointSize = aSize * (120.0 / -mvPos.z);
  vAlpha = aSize;
  vHue = aHue;
  gl_Position = projectionMatrix * mvPos;
}
`;

const FRAG_PARTICLES = `
varying float vAlpha;
varying float vHue;
void main(){
  vec2 uv = gl_PointCoord - vec2(0.5);
  float d = length(uv);
  if(d > 0.5) discard;
  // soft circular falloff, brighter center
  float falloff = pow(1.0 - d * 2.0, 2.2);

  // Two purple tones for depth: deeper violet vs hot lavender
  vec3 deep  = vec3(0.36, 0.20, 0.78);
  vec3 light = vec3(0.70, 0.48, 1.00);
  vec3 col = mix(deep, light, vHue);

  // Tiny hot core
  col += vec3(0.20, 0.12, 0.35) * pow(falloff, 4.0);

  float alpha = falloff * vAlpha * 0.85;
  gl_FragColor = vec4(col, alpha);
}
`;

const ThreeScene = () => {
  useEffect(() => {
    const canvas = document.getElementById("scene-canvas") as HTMLCanvasElement | null;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 6;

    const uniforms = {
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uVelocity: { value: 0 },
    };

    // Blob — additive for glow
    const blobGeo = new THREE.IcosahedronGeometry(2.1, 32);
    const blobMat = new THREE.ShaderMaterial({
      vertexShader: VERT_BLOB,
      fragmentShader: FRAG_BLOB,
      uniforms,
      transparent: true,
      side: THREE.FrontSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const blob = new THREE.Mesh(blobGeo, blobMat);
    scene.add(blob);

    // Wireframe overlay — subtle
    const wireGeo = new THREE.IcosahedronGeometry(2.18, 10);
    const wireMat = new THREE.ShaderMaterial({
      vertexShader: VERT_BLOB,
      fragmentShader: FRAG_BLOB,
      uniforms,
      transparent: true,
      wireframe: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const wire = new THREE.Mesh(wireGeo, wireMat);
    scene.add(wire);

    // Secondary smaller blob — orbits opposite for richer depth
    const blob2Geo = new THREE.IcosahedronGeometry(0.85, 24);
    const blob2Mat = new THREE.ShaderMaterial({
      vertexShader: VERT_BLOB,
      fragmentShader: FRAG_BLOB,
      uniforms,
      transparent: true,
      side: THREE.FrontSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const blob2 = new THREE.Mesh(blob2Geo, blob2Mat);
    scene.add(blob2);

    // Particles — purple, smaller, denser
    const particleCount = 1200;
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const hues = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      const r = 3.5 + Math.random() * 5.5;
      const theta = Math.acos(2 * Math.random() - 1);
      const phi = Math.random() * Math.PI * 2;
      positions[i * 3] = r * Math.sin(theta) * Math.cos(phi);
      positions[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
      positions[i * 3 + 2] = r * Math.cos(theta);
      // Heavy weight on tiny particles, occasional larger ones
      const roll = Math.random();
      sizes[i] = roll < 0.85 ? 0.25 + Math.random() * 0.5 : 0.7 + Math.random() * 0.7;
      hues[i] = Math.random();
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    particleGeo.setAttribute("aHue", new THREE.BufferAttribute(hues, 1));
    const particleMat = new THREE.ShaderMaterial({
      vertexShader: VERT_PARTICLES,
      fragmentShader: FRAG_PARTICLES,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Scroll / mouse state
    let scrollProgress = 0;
    let lastScrollY = 0;
    let velocity = 0;
    let mouseX = 0;
    let mouseY = 0;

    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      const dy = window.scrollY - lastScrollY;
      velocity = velocity * 0.6 + dy * 0.4;
      lastScrollY = window.scrollY;
    };

    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouse, { passive: true });

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    let rafId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      uniforms.uTime.value = elapsed;
      uniforms.uScroll.value += (scrollProgress - uniforms.uScroll.value) * 0.05;
      uniforms.uMouse.value.x += (mouseX - uniforms.uMouse.value.x) * 0.05;
      uniforms.uMouse.value.y += (mouseY - uniforms.uMouse.value.y) * 0.05;
      const targetVel = Math.max(-1, Math.min(1, velocity / 60));
      uniforms.uVelocity.value += (targetVel - uniforms.uVelocity.value) * 0.1;
      velocity *= 0.9;

      const s = uniforms.uScroll.value;
      blob.position.x = Math.sin(s * Math.PI) * 2.5;
      blob.position.y = s * -1.5;
      wire.position.copy(blob.position);

      // Secondary blob orbits opposite, smaller orbit
      const orbit = elapsed * 0.25 + s * Math.PI * 1.4;
      blob2.position.x = -Math.sin(orbit) * 3.0 + Math.cos(s * Math.PI) * 0.8;
      blob2.position.y = Math.cos(orbit) * 1.4 - s * 0.8;
      blob2.position.z = -1.5 + Math.sin(orbit * 0.5) * 1.0;
      blob2.rotation.y = -elapsed * 0.12 + mouseX * 0.4;
      blob2.rotation.x = elapsed * 0.07 - mouseY * 0.3;

      blob.rotation.y = elapsed * 0.08 + mouseX * 0.3;
      blob.rotation.x = elapsed * 0.05 + mouseY * 0.2;
      wire.rotation.copy(blob.rotation);

      // Particles — velocity drives Y drift, mouse adds parallax
      particles.rotation.y = elapsed * 0.02 + mouseX * 0.15;
      particles.rotation.x = elapsed * 0.01 + mouseY * 0.1;
      particles.position.y = -uniforms.uVelocity.value * 0.4;
      particles.position.x = mouseX * 0.3;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      blobGeo.dispose();
      blobMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      blob2Geo.dispose();
      blob2Mat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  return null;
};

export default ThreeScene;
