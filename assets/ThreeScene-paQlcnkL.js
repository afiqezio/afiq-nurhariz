import{a as J}from"./react-vendor-7jCbmHAf.js";import{W as Q,S as U,P as Z,I as b,a as h,A as y,F as q,V as $,M as S,B as ee,b as P,c as oe,C as te}from"./three-vendor-CNe-AdDl.js";const A=`
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
`,_=`
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
`,ne=`
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
`,ie=`
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
`,se=({maxDpr:f=1.5})=>(J.useEffect(()=>{const C=document.getElementById("scene-canvas");if(!C)return;const n=new Q({canvas:C,antialias:!0,alpha:!0});n.setPixelRatio(Math.min(window.devicePixelRatio,f)),n.setSize(window.innerWidth,window.innerHeight),n.setClearColor(0,0);const c=new U,p=new Z(60,window.innerWidth/window.innerHeight,.1,100);p.position.z=6;const o={uTime:{value:0},uScroll:{value:0},uMouse:{value:new $(0,0)},uVelocity:{value:0}},H=new b(2.1,32),E=new h({vertexShader:A,fragmentShader:_,uniforms:o,transparent:!0,side:q,blending:y,depthWrite:!1}),i=new S(H,E);c.add(i);const G=new b(2.18,10),L=new h({vertexShader:A,fragmentShader:_,uniforms:o,transparent:!0,wireframe:!0,blending:y,depthWrite:!1}),g=new S(G,L);c.add(g);const R=new b(.85,24),V=new h({vertexShader:A,fragmentShader:_,uniforms:o,transparent:!0,side:q,blending:y,depthWrite:!1}),r=new S(R,V);c.add(r);const m=1200,w=new Float32Array(m*3),I=new Float32Array(m),T=new Float32Array(m);for(let e=0;e<m;e++){const u=3.5+Math.random()*5.5,t=Math.acos(2*Math.random()-1),s=Math.random()*Math.PI*2;w[e*3]=u*Math.sin(t)*Math.cos(s),w[e*3+1]=u*Math.sin(t)*Math.sin(s),w[e*3+2]=u*Math.cos(t);const X=Math.random();I[e]=X<.85?.25+Math.random()*.5:.7+Math.random()*.7,T[e]=Math.random()}const l=new ee;l.setAttribute("position",new P(w,3)),l.setAttribute("aSize",new P(I,1)),l.setAttribute("aHue",new P(T,1));const F=new h({vertexShader:ne,fragmentShader:ie,transparent:!0,depthWrite:!1,blending:y}),v=new oe(l,F);c.add(v);let W=0,B=0,x=0,a=0,d=0,M=0;const z=()=>{M=document.documentElement.scrollHeight-window.innerHeight};z();const D=new ResizeObserver(z);D.observe(document.body);const j=()=>{W=M>0?window.scrollY/M:0;const e=window.scrollY-B;x=x*.6+e*.4,B=window.scrollY},Y=e=>{a=(e.clientX/window.innerWidth-.5)*2,d=-(e.clientY/window.innerHeight-.5)*2};window.addEventListener("scroll",j,{passive:!0}),window.addEventListener("mousemove",Y,{passive:!0});const k=()=>{p.aspect=window.innerWidth/window.innerHeight,p.updateProjectionMatrix(),n.setPixelRatio(Math.min(window.devicePixelRatio,f)),n.setSize(window.innerWidth,window.innerHeight),z()};window.addEventListener("resize",k);let N;const K=new te,O=()=>{N=requestAnimationFrame(O);const e=K.getElapsedTime();o.uTime.value=e,o.uScroll.value+=(W-o.uScroll.value)*.05,o.uMouse.value.x+=(a-o.uMouse.value.x)*.05,o.uMouse.value.y+=(d-o.uMouse.value.y)*.05;const u=Math.max(-1,Math.min(1,x/60));o.uVelocity.value+=(u-o.uVelocity.value)*.1,x*=.9;const t=o.uScroll.value;i.position.x=Math.sin(t*Math.PI)*2.5,i.position.y=t*-1.5,g.position.copy(i.position);const s=e*.25+t*Math.PI*1.4;r.position.x=-Math.sin(s)*3+Math.cos(t*Math.PI)*.8,r.position.y=Math.cos(s)*1.4-t*.8,r.position.z=-1.5+Math.sin(s*.5)*1,r.rotation.y=-e*.12+a*.4,r.rotation.x=e*.07-d*.3,i.rotation.y=e*.08+a*.3,i.rotation.x=e*.05+d*.2,g.rotation.copy(i.rotation),v.rotation.y=e*.02+a*.15,v.rotation.x=e*.01+d*.1,v.position.y=-o.uVelocity.value*.4,v.position.x=a*.3,n.render(c,p)};return O(),()=>{cancelAnimationFrame(N),window.removeEventListener("scroll",j),window.removeEventListener("mousemove",Y),window.removeEventListener("resize",k),D.disconnect(),n.dispose(),H.dispose(),E.dispose(),G.dispose(),L.dispose(),R.dispose(),V.dispose(),l.dispose(),F.dispose()}},[f]),null);export{se as default};
