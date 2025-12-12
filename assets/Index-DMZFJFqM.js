const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AboutSection-DXq0DsuL.js","assets/ui-vendor-ZA3sFIcL.js","assets/react-vendor-khv3atvK.js","assets/data-CoOXYXcq.js","assets/index-BudYCfWX.js","assets/index-Cx0HOgK3.css","assets/ReactBitsText-BOqZJqBx.js","assets/three-vendor-BnRZnIug.js","assets/ProjectsSection-Crn6euQO.js","assets/SkillsSection-Get-HwL1.js","assets/ContactSection-D0jIBkBy.js"])))=>i.map(i=>d[i]);
import{c as Re,a as P,_ as W}from"./index-BudYCfWX.js";import{j as i}from"./ui-vendor-ZA3sFIcL.js";import{r as a,u as Ae}from"./react-vendor-khv3atvK.js";import{T as E,h as A,G as Ne,C as Le,n as Be}from"./data-CoOXYXcq.js";import{C as ce,D as Ie,R as Ve,L as G,a as Y,V as f,S as le,b as ue,M as te,P as se,c as U,d as Oe,W as He,e as $e,H as Ge,F as Ye,f as Ue,B as Xe,g as Pe,h as We,A as qe}from"./three-vendor-BnRZnIug.js";/**
 * @license lucide-react v0.451.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ze=Re("FileText",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]),he=({children:p,variant:v="default",size:h="md",className:l="",...u})=>{const _="relative inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",g={default:"text-white shadow-lg hover:shadow-xl focus:ring-slate-500 backdrop-blur-sm",outline:"border-2 backdrop-blur-xl text-slate-200 shadow-lg hover:shadow-xl focus:ring-slate-400",ghost:"bg-transparent text-slate-300 hover:bg-white/10 backdrop-blur-sm focus:ring-slate-400",gradient:"text-white hover:shadow-2xl hover:scale-105 focus:ring-purple-400 relative overflow-hidden"},m={default:{backgroundColor:E.background.secondary,boxShadow:`0 10px 30px ${E.accent.purple}20`},outline:{borderColor:E.border.default,backgroundColor:E.background.card,boxShadow:`0 10px 30px ${E.accent.purple}20`},ghost:{},gradient:{background:E.gradients.primary,boxShadow:`0 10px 30px ${E.accent.purple}40`}},b={sm:"px-4 py-2 text-sm rounded-lg",md:"px-6 py-3 text-base rounded-xl",lg:"px-8 py-4 text-lg rounded-xl"};return i.jsxs("button",{className:P(_,g[v],b[h],l),style:m[v],...u,children:[v==="gradient"&&i.jsx("span",{className:"absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 blur-sm -z-10",style:{background:E.gradients.secondary}}),i.jsx("span",{className:"relative z-10",children:p})]})},Je=({children:p,className:v="",intensity:h=15,style:l})=>{const u=a.useRef(null),[_,g]=a.useState(""),m=z=>{if(!u.current)return;const D=u.current.getBoundingClientRect(),C=z.clientX-D.left,k=z.clientY-D.top,y=D.width/2,M=D.height/2,j=(k-M)/M*-h,x=(C-y)/y*h;g(`perspective(1000px) rotateX(${j}deg) rotateY(${x}deg) scale3d(1.02, 1.02, 1.02)`)},b=()=>{g("perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)")};return i.jsx("div",{ref:u,className:P("transition-transform duration-300 ease-out",v),style:{transform:_,...l},onMouseMove:m,onMouseLeave:b,children:p})},Ke=({children:p,className:v="",blur:h="xl",opacity:l=.1})=>{const u={sm:"backdrop-blur-sm",md:"backdrop-blur-md",lg:"backdrop-blur-lg",xl:"backdrop-blur-xl","2xl":"backdrop-blur-2xl"};return i.jsx("div",{className:P("bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl",u[h],v),style:{backgroundColor:`rgba(15, 23, 42, ${l})`,boxShadow:"0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)"},children:p})},Qe=({children:p,className:v="",delay:h=0,duration:l=.6,stagger:u=.05,gradient:_=!1,gradientColors:g=["#3b82f6","#8b5cf6","#ec4899"]})=>{const m=a.useRef(null),[b,z]=a.useState(!1);a.useEffect(()=>{const C=new IntersectionObserver(k=>{k.forEach(y=>{y.isIntersecting&&z(!0)})},{threshold:.1});return m.current&&C.observe(m.current),()=>{m.current&&C.unobserve(m.current)}},[]);const D=p.split(" ");return p.split(""),i.jsx("div",{ref:m,className:P("inline-block",v),style:{display:"inline-block"},children:D.map((C,k)=>i.jsx("span",{className:"inline-block",style:{marginRight:k<D.length-1?"0.25em":"0"},children:C.split("").map((y,M)=>{const j=D.slice(0,k).join(" ").length+M+k,x={opacity:b?1:0,transform:b?"translateY(0)":"translateY(100%)",transition:`opacity ${l}s ease-out ${h+j*u}s, transform ${l}s ease-out ${h+j*u}s`,display:y===" "?"inline":"inline-block"};return _&&(x.background=`linear-gradient(90deg, ${g.join(", ")})`,x.backgroundSize="200% 200%",x.WebkitBackgroundClip="text",x.WebkitTextFillColor="transparent",x.backgroundClip="text",x.animation="gradientShift 4s ease infinite"),i.jsx("span",{className:"inline-block",style:x,children:y===" "?" ":y},`${k}-${M}`)})},k))})},et=["#5227FF","#FF9FFC","#B19EEF"];function tt({mouseForce:p=20,cursorSize:v=100,isViscous:h=!1,viscous:l=30,iterationsViscous:u=32,iterationsPoisson:_=32,dt:g=.014,BFECC:m=!0,resolution:b=.5,isBounce:z=!1,colors:D=et,style:C={},className:k="",autoDemo:y=!0,autoSpeed:M=.5,autoIntensity:j=2.2,takeoverDuration:x=.25,autoResumeDelay:H=1e3,autoRampDuration:$=.6}){const q=a.useRef(null),w=a.useRef(null),Z=a.useRef(null),N=a.useRef(null),J=a.useRef(null),ie=a.useRef(!0),K=a.useRef(null);return a.useEffect(()=>{if(!q.current)return;function S(n){let e;Array.isArray(n)&&n.length>0?e=n.length===1?[n[0],n[0]]:n:e=["#ffffff","#ffffff"];const t=e.length,s=new Uint8Array(t*4);for(let o=0;o<t;o++){const c=new ce(e[o]);s[o*4+0]=Math.round(c.r*255),s[o*4+1]=Math.round(c.g*255),s[o*4+2]=Math.round(c.b*255),s[o*4+3]=255}const r=new Ie(s,t,1,Ve);return r.magFilter=G,r.minFilter=G,r.wrapS=Y,r.wrapT=Y,r.generateMipmaps=!1,r.needsUpdate=!0,r}const L=S(D),Q=new Oe(0,0,0,0);class de{width=0;height=0;aspect=1;pixelRatio=1;isMobile=!1;breakpoint=768;fboWidth=null;fboHeight=null;time=0;delta=0;container=null;renderer=null;clock=null;init(e){this.container=e;const t=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),s=navigator.deviceMemory&&navigator.deviceMemory<4,r=t||s?1:2;this.pixelRatio=Math.min(window.devicePixelRatio||1,r),this.resize(),this.renderer=new He({antialias:!t&&!s,alpha:!0,powerPreference:t||s?"low-power":"high-performance"}),this.renderer.autoClear=!1,this.renderer.setClearColor(new ce(0),0),this.renderer.setPixelRatio(this.pixelRatio),this.renderer.setSize(this.width,this.height);const o=this.renderer.domElement;o.style.width="100%",o.style.height="100%",o.style.display="block",this.clock=new $e,this.clock.start()}resize(){if(!this.container)return;const e=this.container.getBoundingClientRect();this.width=Math.max(1,Math.floor(e.width)),this.height=Math.max(1,Math.floor(e.height)),this.aspect=this.width/this.height,this.renderer&&this.renderer.setSize(this.width,this.height,!1)}update(){this.clock&&(this.delta=this.clock.getDelta(),this.time+=this.delta)}}const d=new de;class ve{mouseMoved=!1;coords=new f;coords_old=new f;diff=new f;timer=null;container=null;docTarget=null;listenerTarget=null;isHoverInside=!1;hasUserControl=!1;isAutoActive=!1;autoIntensity=2;takeoverActive=!1;takeoverStartTime=0;takeoverDuration=.25;takeoverFrom=new f;takeoverTo=new f;onInteract=null;_onMouseMove=this.onDocumentMouseMove.bind(this);_onTouchStart=this.onDocumentTouchStart.bind(this);_onTouchMove=this.onDocumentTouchMove.bind(this);_onTouchEnd=this.onTouchEnd.bind(this);_onDocumentLeave=this.onDocumentLeave.bind(this);init(e){this.container=e,this.docTarget=e.ownerDocument||null;const t=this.docTarget?.defaultView||(typeof window<"u"?window:null);t&&(this.listenerTarget=t,this.listenerTarget.addEventListener("mousemove",this._onMouseMove),this.listenerTarget.addEventListener("touchstart",this._onTouchStart,{passive:!0}),this.listenerTarget.addEventListener("touchmove",this._onTouchMove,{passive:!0}),this.listenerTarget.addEventListener("touchend",this._onTouchEnd),this.docTarget?.addEventListener("mouseleave",this._onDocumentLeave))}dispose(){this.listenerTarget&&(this.listenerTarget.removeEventListener("mousemove",this._onMouseMove),this.listenerTarget.removeEventListener("touchstart",this._onTouchStart),this.listenerTarget.removeEventListener("touchmove",this._onTouchMove),this.listenerTarget.removeEventListener("touchend",this._onTouchEnd)),this.docTarget&&this.docTarget.removeEventListener("mouseleave",this._onDocumentLeave),this.listenerTarget=null,this.docTarget=null,this.container=null}isPointInside(e,t){if(!this.container)return!1;const s=this.container.getBoundingClientRect();return s.width===0||s.height===0?!1:e>=s.left&&e<=s.right&&t>=s.top&&t<=s.bottom}updateHoverState(e,t){return this.isHoverInside=this.isPointInside(e,t),this.isHoverInside}setCoords(e,t){if(!this.container)return;this.timer&&window.clearTimeout(this.timer);const s=this.container.getBoundingClientRect();if(s.width===0||s.height===0)return;const r=(e-s.left)/s.width,o=(t-s.top)/s.height;this.coords.set(r*2-1,-(o*2-1)),this.mouseMoved=!0,this.timer=window.setTimeout(()=>{this.mouseMoved=!1},100)}setNormalized(e,t){this.coords.set(e,t),this.mouseMoved=!0}onDocumentMouseMove(e){if(this.updateHoverState(e.clientX,e.clientY)){if(this.onInteract&&this.onInteract(),this.isAutoActive&&!this.hasUserControl&&!this.takeoverActive){if(!this.container)return;const t=this.container.getBoundingClientRect(),s=(e.clientX-t.left)/t.width,r=(e.clientY-t.top)/t.height;this.takeoverFrom.copy(this.coords),this.takeoverTo.set(s*2-1,-(r*2-1)),this.takeoverStartTime=performance.now(),this.takeoverActive=!0,this.hasUserControl=!0,this.isAutoActive=!1;return}this.setCoords(e.clientX,e.clientY),this.hasUserControl=!0}}onDocumentTouchStart(e){if(e.touches.length!==1)return;const t=e.touches[0];this.updateHoverState(t.clientX,t.clientY)&&(this.onInteract&&this.onInteract(),this.setCoords(t.clientX,t.clientY),this.hasUserControl=!0)}onDocumentTouchMove(e){if(e.touches.length!==1)return;const t=e.touches[0];this.updateHoverState(t.clientX,t.clientY)&&(this.onInteract&&this.onInteract(),this.setCoords(t.clientX,t.clientY))}onTouchEnd(){this.isHoverInside=!1}onDocumentLeave(){this.isHoverInside=!1}update(){if(this.takeoverActive){const e=(performance.now()-this.takeoverStartTime)/(this.takeoverDuration*1e3);if(e>=1)this.takeoverActive=!1,this.coords.copy(this.takeoverTo),this.coords_old.copy(this.coords),this.diff.set(0,0);else{const t=e*e*(3-2*e);this.coords.copy(this.takeoverFrom).lerp(this.takeoverTo,t)}}this.diff.subVectors(this.coords,this.coords_old),this.coords_old.copy(this.coords),this.coords_old.x===0&&this.coords_old.y===0&&this.diff.set(0,0),this.isAutoActive&&!this.takeoverActive&&this.diff.multiplyScalar(this.autoIntensity)}}const T=new ve;class pe{mouse;manager;enabled;speed;resumeDelay;rampDurationMs;active=!1;current=new f(0,0);target=new f;lastTime=performance.now();activationTime=0;margin=.2;_tmpDir=new f;constructor(e,t,s){this.mouse=e,this.manager=t,this.enabled=s.enabled,this.speed=s.speed,this.resumeDelay=s.resumeDelay||3e3,this.rampDurationMs=(s.rampDuration||0)*1e3,this.pickNewTarget()}pickNewTarget(){const e=Math.random;this.target.set((e()*2-1)*(1-this.margin),(e()*2-1)*(1-this.margin))}forceStop(){this.active=!1,this.mouse.isAutoActive=!1}update(){if(!this.enabled)return;const e=performance.now();if(e-this.manager.lastUserInteraction<this.resumeDelay){this.active&&this.forceStop();return}if(this.mouse.isHoverInside){this.active&&this.forceStop();return}if(this.active||(this.active=!0,this.current.copy(this.mouse.coords),this.lastTime=e,this.activationTime=e),!this.active)return;this.mouse.isAutoActive=!0;let s=(e-this.lastTime)/1e3;this.lastTime=e,s>.2&&(s=.016);const r=this._tmpDir.subVectors(this.target,this.current),o=r.length();if(o<.01){this.pickNewTarget();return}r.normalize();let c=1;if(this.rampDurationMs>0){const O=Math.min(1,(e-this.activationTime)/this.rampDurationMs);c=O*O*(3-2*O)}const V=this.speed*s*c,F=Math.min(V,o);this.current.addScaledVector(r,F),this.mouse.setNormalized(this.current.x,this.current.y)}}const B=`
  attribute vec3 position;
  uniform vec2 px;
  uniform vec2 boundarySpace;
  varying vec2 uv;
  precision highp float;
  void main(){
  vec3 pos = position;
  vec2 scale = 1.0 - boundarySpace * 2.0;
  pos.xy = pos.xy * scale;
  uv = vec2(0.5)+(pos.xy)*0.5;
  gl_Position = vec4(pos, 1.0);
}
`,fe=`
  attribute vec3 position;
  uniform vec2 px;
  precision highp float;
  varying vec2 uv;
  void main(){
  vec3 pos = position;
  uv = 0.5 + pos.xy * 0.5;
  vec2 n = sign(pos.xy);
  pos.xy = abs(pos.xy) - px * 1.0;
  pos.xy *= n;
  gl_Position = vec4(pos, 1.0);
}
`,me=`
    precision highp float;
    attribute vec3 position;
    attribute vec2 uv;
    uniform vec2 center;
    uniform vec2 scale;
    uniform vec2 px;
    varying vec2 vUv;
    void main(){
    vec2 pos = position.xy * scale * 2.0 * px + center;
    vUv = uv;
    gl_Position = vec4(pos, 0.0, 1.0);
}
`,re=`
    precision highp float;
    uniform sampler2D velocity;
    uniform float dt;
    uniform bool isBFECC;
    uniform vec2 fboSize;
    uniform vec2 px;
    varying vec2 uv;
    void main(){
    vec2 ratio = max(fboSize.x, fboSize.y) / fboSize;
    if(isBFECC == false){
        vec2 vel = texture2D(velocity, uv).xy;
        vec2 uv2 = uv - vel * dt * ratio;
        vec2 newVel = texture2D(velocity, uv2).xy;
        gl_FragColor = vec4(newVel, 0.0, 0.0);
    } else {
        vec2 spot_new = uv;
        vec2 vel_old = texture2D(velocity, uv).xy;
        vec2 spot_old = spot_new - vel_old * dt * ratio;
        vec2 vel_new1 = texture2D(velocity, spot_old).xy;
        vec2 spot_new2 = spot_old + vel_new1 * dt * ratio;
        vec2 error = spot_new2 - spot_new;
        vec2 spot_new3 = spot_new - error / 2.0;
        vec2 vel_2 = texture2D(velocity, spot_new3).xy;
        vec2 spot_old2 = spot_new3 - vel_2 * dt * ratio;
        vec2 newVel2 = texture2D(velocity, spot_old2).xy; 
        gl_FragColor = vec4(newVel2, 0.0, 0.0);
    }
}
`,xe=`
    precision highp float;
    uniform sampler2D velocity;
    uniform sampler2D palette;
    uniform vec4 bgColor;
    varying vec2 uv;
    void main(){
    vec2 vel = texture2D(velocity, uv).xy;
    float lenv = clamp(length(vel), 0.0, 1.0);
    vec3 c = texture2D(palette, vec2(lenv, 0.5)).rgb;
    vec3 outRGB = mix(bgColor.rgb, c, lenv);
    float outA = mix(bgColor.a, 1.0, lenv);
    gl_FragColor = vec4(outRGB, outA);
}
`,ge=`
    precision highp float;
    uniform sampler2D velocity;
    uniform float dt;
    uniform vec2 px;
    varying vec2 uv;
    void main(){
    float x0 = texture2D(velocity, uv-vec2(px.x, 0.0)).x;
    float x1 = texture2D(velocity, uv+vec2(px.x, 0.0)).x;
    float y0 = texture2D(velocity, uv-vec2(0.0, px.y)).y;
    float y1 = texture2D(velocity, uv+vec2(0.0, px.y)).y;
    float divergence = (x1 - x0 + y1 - y0) / 2.0;
    gl_FragColor = vec4(divergence / dt);
}
`,be=`
    precision highp float;
    uniform vec2 force;
    uniform vec2 center;
    uniform vec2 scale;
    uniform vec2 px;
    varying vec2 vUv;
    void main(){
    vec2 circle = (vUv - 0.5) * 2.0;
    float d = 1.0 - min(length(circle), 1.0);
    d *= d;
    gl_FragColor = vec4(force * d, 0.0, 1.0);
}
`,ye=`
    precision highp float;
    uniform sampler2D pressure;
    uniform sampler2D divergence;
    uniform vec2 px;
    varying vec2 uv;
    void main(){
    float p0 = texture2D(pressure, uv + vec2(px.x * 2.0, 0.0)).r;
    float p1 = texture2D(pressure, uv - vec2(px.x * 2.0, 0.0)).r;
    float p2 = texture2D(pressure, uv + vec2(0.0, px.y * 2.0)).r;
    float p3 = texture2D(pressure, uv - vec2(0.0, px.y * 2.0)).r;
    float div = texture2D(divergence, uv).r;
    float newP = (p0 + p1 + p2 + p3) / 4.0 - div;
    gl_FragColor = vec4(newP);
}
`,we=`
    precision highp float;
    uniform sampler2D pressure;
    uniform sampler2D velocity;
    uniform vec2 px;
    uniform float dt;
    varying vec2 uv;
    void main(){
    float step = 1.0;
    float p0 = texture2D(pressure, uv + vec2(px.x * step, 0.0)).r;
    float p1 = texture2D(pressure, uv - vec2(px.x * step, 0.0)).r;
    float p2 = texture2D(pressure, uv + vec2(0.0, px.y * step)).r;
    float p3 = texture2D(pressure, uv - vec2(0.0, px.y * step)).r;
    vec2 v = texture2D(velocity, uv).xy;
    vec2 gradP = vec2(p0 - p1, p2 - p3) * 0.5;
    v = v - gradP * dt;
    gl_FragColor = vec4(v, 0.0, 1.0);
}
`,_e=`
    precision highp float;
    uniform sampler2D velocity;
    uniform sampler2D velocity_new;
    uniform float v;
    uniform vec2 px;
    uniform float dt;
    varying vec2 uv;
    void main(){
    vec2 old = texture2D(velocity, uv).xy;
    vec2 new0 = texture2D(velocity_new, uv + vec2(px.x * 2.0, 0.0)).xy;
    vec2 new1 = texture2D(velocity_new, uv - vec2(px.x * 2.0, 0.0)).xy;
    vec2 new2 = texture2D(velocity_new, uv + vec2(0.0, px.y * 2.0)).xy;
    vec2 new3 = texture2D(velocity_new, uv - vec2(0.0, px.y * 2.0)).xy;
    vec2 newv = 4.0 * old + v * dt * (new0 + new1 + new2 + new3);
    newv /= 4.0 * (1.0 + v * dt);
    gl_FragColor = vec4(newv, 0.0, 0.0);
}
`;class I{props;uniforms;scene=null;camera=null;material=null;geometry=null;plane=null;constructor(e){this.props=e||{},this.uniforms=this.props.material?.uniforms}init(...e){this.scene=new le,this.camera=new ue,this.uniforms&&(this.material=new U(this.props.material),this.geometry=new se(2,2),this.plane=new te(this.geometry,this.material),this.scene.add(this.plane))}update(...e){!d.renderer||!this.scene||!this.camera||(d.renderer.setRenderTarget(this.props.output||null),d.renderer.render(this.scene,this.camera),d.renderer.setRenderTarget(null))}}class Se extends I{line;constructor(e){super({material:{vertexShader:B,fragmentShader:re,uniforms:{boundarySpace:{value:e.cellScale},px:{value:e.cellScale},fboSize:{value:e.fboSize},velocity:{value:e.src.texture},dt:{value:e.dt},isBFECC:{value:!0}}},output:e.dst}),this.uniforms=this.props.material.uniforms,this.init()}init(){super.init(),this.createBoundary()}createBoundary(){const e=new Xe,t=new Float32Array([-1,-1,0,-1,1,0,-1,1,0,1,1,0,1,1,0,1,-1,0,1,-1,0,-1,-1,0]);e.setAttribute("position",new Pe(t,3));const s=new U({vertexShader:fe,fragmentShader:re,uniforms:this.uniforms});this.line=new We(e,s),this.scene.add(this.line)}update(...e){const{dt:t,isBounce:s,BFECC:r}=e[0]||{};this.uniforms&&(typeof t=="number"&&(this.uniforms.dt.value=t),typeof s=="boolean"&&(this.line.visible=s),typeof r=="boolean"&&(this.uniforms.isBFECC.value=r),super.update())}}class De extends I{mouse;constructor(e){super({output:e.dst}),this.init(e)}init(e){super.init();const t=new se(1,1),s=new U({vertexShader:me,fragmentShader:be,blending:qe,depthWrite:!1,uniforms:{px:{value:e.cellScale},force:{value:new f(0,0)},center:{value:new f(0,0)},scale:{value:new f(e.cursor_size,e.cursor_size)}}});this.mouse=new te(t,s),this.scene.add(this.mouse)}update(...e){const t=e[0]||{},s=T.diff.x/2*(t.mouse_force||0),r=T.diff.y/2*(t.mouse_force||0),o=t.cellScale||{x:1,y:1},c=t.cursor_size||0,V=c*o.x,F=c*o.y,O=Math.min(Math.max(T.coords.x,-1+V+o.x*2),1-V-o.x*2),Ee=Math.min(Math.max(T.coords.y,-1+F+o.y*2),1-F-o.y*2),ee=this.mouse.material.uniforms;ee.force.value.set(s,r),ee.center.value.set(O,Ee),ee.scale.value.set(c,c),super.update()}}class ke extends I{constructor(e){super({material:{vertexShader:B,fragmentShader:_e,uniforms:{boundarySpace:{value:e.boundarySpace},velocity:{value:e.src.texture},velocity_new:{value:e.dst_.texture},v:{value:e.viscous},px:{value:e.cellScale},dt:{value:e.dt}}},output:e.dst,output0:e.dst_,output1:e.dst}),this.init()}update(...e){const{viscous:t,iterations:s,dt:r}=e[0]||{};if(!this.uniforms)return;let o,c;typeof t=="number"&&(this.uniforms.v.value=t);const V=s??0;for(let F=0;F<V;F++)F%2===0?(o=this.props.output0,c=this.props.output1):(o=this.props.output1,c=this.props.output0),this.uniforms.velocity_new.value=o.texture,this.props.output=c,typeof r=="number"&&(this.uniforms.dt.value=r),super.update();return c}}class Te extends I{constructor(e){super({material:{vertexShader:B,fragmentShader:ge,uniforms:{boundarySpace:{value:e.boundarySpace},velocity:{value:e.src.texture},px:{value:e.cellScale},dt:{value:e.dt}}},output:e.dst}),this.init()}update(...e){const{vel:t}=e[0]||{};this.uniforms&&t&&(this.uniforms.velocity.value=t.texture),super.update()}}class Me extends I{constructor(e){super({material:{vertexShader:B,fragmentShader:ye,uniforms:{boundarySpace:{value:e.boundarySpace},pressure:{value:e.dst_.texture},divergence:{value:e.src.texture},px:{value:e.cellScale}}},output:e.dst,output0:e.dst_,output1:e.dst}),this.init()}update(...e){const{iterations:t}=e[0]||{};let s,r;const o=t??0;for(let c=0;c<o;c++)c%2===0?(s=this.props.output0,r=this.props.output1):(s=this.props.output1,r=this.props.output0),this.uniforms&&(this.uniforms.pressure.value=s.texture),this.props.output=r,super.update();return r}}class ze extends I{constructor(e){super({material:{vertexShader:B,fragmentShader:we,uniforms:{boundarySpace:{value:e.boundarySpace},pressure:{value:e.src_p.texture},velocity:{value:e.src_v.texture},px:{value:e.cellScale},dt:{value:e.dt}}},output:e.dst}),this.init()}update(...e){const{vel:t,pressure:s}=e[0]||{};this.uniforms&&t&&s&&(this.uniforms.velocity.value=t.texture,this.uniforms.pressure.value=s.texture),super.update()}}class je{options;fbos={vel_0:null,vel_1:null,vel_viscous0:null,vel_viscous1:null,div:null,pressure_0:null,pressure_1:null};fboSize=new f;cellScale=new f;boundarySpace=new f;advection;externalForce;viscous;divergence;poisson;pressure;constructor(e){this.options={iterations_poisson:32,iterations_viscous:32,mouse_force:20,resolution:.5,cursor_size:100,viscous:30,isBounce:!1,dt:.014,isViscous:!1,BFECC:!0,...e},this.init()}init(){this.calcSize(),this.createAllFBO(),this.createShaderPass()}getFloatType(){return/(iPad|iPhone|iPod)/i.test(navigator.userAgent)?Ge:Ye}createAllFBO(){const t={type:this.getFloatType(),depthBuffer:!1,stencilBuffer:!1,minFilter:G,magFilter:G,wrapS:Y,wrapT:Y};for(const s in this.fbos)this.fbos[s]=new Ue(this.fboSize.x,this.fboSize.y,t)}createShaderPass(){this.advection=new Se({cellScale:this.cellScale,fboSize:this.fboSize,dt:this.options.dt,src:this.fbos.vel_0,dst:this.fbos.vel_1}),this.externalForce=new De({cellScale:this.cellScale,cursor_size:this.options.cursor_size,dst:this.fbos.vel_1}),this.viscous=new ke({cellScale:this.cellScale,boundarySpace:this.boundarySpace,viscous:this.options.viscous,src:this.fbos.vel_1,dst:this.fbos.vel_viscous1,dst_:this.fbos.vel_viscous0,dt:this.options.dt}),this.divergence=new Te({cellScale:this.cellScale,boundarySpace:this.boundarySpace,src:this.fbos.vel_viscous0,dst:this.fbos.div,dt:this.options.dt}),this.poisson=new Me({cellScale:this.cellScale,boundarySpace:this.boundarySpace,src:this.fbos.div,dst:this.fbos.pressure_1,dst_:this.fbos.pressure_0}),this.pressure=new ze({cellScale:this.cellScale,boundarySpace:this.boundarySpace,src_p:this.fbos.pressure_0,src_v:this.fbos.vel_viscous0,dst:this.fbos.vel_0,dt:this.options.dt})}calcSize(){const e=Math.max(1,Math.round(this.options.resolution*d.width)),t=Math.max(1,Math.round(this.options.resolution*d.height));this.cellScale.set(1/e,1/t),this.fboSize.set(e,t)}resize(){this.calcSize();for(const e in this.fbos)this.fbos[e].setSize(this.fboSize.x,this.fboSize.y)}update(){this.options.isBounce?this.boundarySpace.set(0,0):this.boundarySpace.copy(this.cellScale),this.advection.update({dt:this.options.dt,isBounce:this.options.isBounce,BFECC:this.options.BFECC}),this.externalForce.update({cursor_size:this.options.cursor_size,mouse_force:this.options.mouse_force,cellScale:this.cellScale});let e=this.fbos.vel_1;this.options.isViscous&&(e=this.viscous.update({viscous:this.options.viscous,iterations:this.options.iterations_viscous,dt:this.options.dt})),this.divergence.update({vel:e});const t=this.poisson.update({iterations:this.options.iterations_poisson});this.pressure.update({vel:e,pressure:t})}}class Ce{simulation;scene;camera;output;constructor(){this.simulation=new je,this.scene=new le,this.camera=new ue,this.output=new te(new se(2,2),new U({vertexShader:B,fragmentShader:xe,transparent:!0,depthWrite:!1,uniforms:{velocity:{value:this.simulation.fbos.vel_0.texture},boundarySpace:{value:new f},palette:{value:L},bgColor:{value:Q}}})),this.scene.add(this.output)}resize(){this.simulation.resize()}render(){d.renderer&&(d.renderer.setRenderTarget(null),d.renderer.render(this.scene,this.camera))}update(){this.simulation.update(),this.render()}}class Fe{props;output;autoDriver;lastUserInteraction=performance.now();running=!1;_loop=this.loop.bind(this);_resize=this.resize.bind(this);_onVisibility;constructor(e){this.props=e,d.init(e.$wrapper),T.init(e.$wrapper),T.autoIntensity=e.autoIntensity,T.takeoverDuration=e.takeoverDuration,T.onInteract=()=>{this.lastUserInteraction=performance.now(),this.autoDriver&&this.autoDriver.forceStop()},this.autoDriver=new pe(T,this,{enabled:e.autoDemo,speed:e.autoSpeed,resumeDelay:e.autoResumeDelay,rampDuration:e.autoRampDuration}),this.init(),window.addEventListener("resize",this._resize),this._onVisibility=()=>{document.hidden?this.pause():ie.current&&this.start()},document.addEventListener("visibilitychange",this._onVisibility)}init(){d.renderer&&(this.props.$wrapper.prepend(d.renderer.domElement),this.output=new Ce)}resize(){d.resize(),this.output.resize()}render(){this.autoDriver&&this.autoDriver.update(),T.update(),d.update(),this.output.update()}loop(){this.running&&(this.render(),N.current=requestAnimationFrame(this._loop))}start(){this.running||(this.running=!0,this._loop())}pause(){this.running=!1,N.current&&(cancelAnimationFrame(N.current),N.current=null)}dispose(){try{if(window.removeEventListener("resize",this._resize),this._onVisibility&&document.removeEventListener("visibilitychange",this._onVisibility),T.dispose(),d.renderer){const e=d.renderer.domElement;e&&e.parentNode&&e.parentNode.removeChild(e),d.renderer.dispose()}}catch{}}}const R=q.current;R.style.position=R.style.position||"relative",R.style.overflow=R.style.overflow||"hidden";const oe=new Fe({$wrapper:R,autoDemo:y,autoSpeed:M,autoIntensity:j,takeoverDuration:x,autoResumeDelay:H,autoRampDuration:$});w.current=oe,(()=>{if(!w.current)return;const n=w.current.output?.simulation;if(!n)return;const e=n.options.resolution;Object.assign(n.options,{mouse_force:p,cursor_size:v,isViscous:h,viscous:l,iterations_viscous:u,iterations_poisson:_,dt:g,BFECC:m,resolution:b,isBounce:z}),b!==e&&n.resize()})(),oe.start();const ne=new IntersectionObserver(n=>{const e=n[0],t=e.isIntersecting&&e.intersectionRatio>0;ie.current=t,w.current&&(t&&!document.hidden?w.current.start():w.current.pause())},{threshold:[0,.01,.1]});ne.observe(R),J.current=ne;const ae=new ResizeObserver(()=>{w.current&&(K.current&&cancelAnimationFrame(K.current),K.current=requestAnimationFrame(()=>{w.current&&w.current.resize()}))});return ae.observe(R),Z.current=ae,()=>{if(N.current&&cancelAnimationFrame(N.current),Z.current)try{Z.current.disconnect()}catch{}if(J.current)try{J.current.disconnect()}catch{}w.current&&w.current.dispose(),w.current=null}},[m,v,g,z,h,_,u,p,b,l,D,y,M,j,x,H,$]),a.useEffect(()=>{const S=w.current;if(!S)return;const L=S.output?.simulation;if(!L)return;const Q=L.options.resolution;Object.assign(L.options,{mouse_force:p,cursor_size:v,isViscous:h,viscous:l,iterations_viscous:u,iterations_poisson:_,dt:g,BFECC:m,resolution:b,isBounce:z}),S.autoDriver&&(S.autoDriver.enabled=y,S.autoDriver.speed=M,S.autoDriver.resumeDelay=H,S.autoDriver.rampDurationMs=$*1e3,S.autoDriver.mouse&&(S.autoDriver.mouse.autoIntensity=j,S.autoDriver.mouse.takeoverDuration=x)),b!==Q&&L.resize()},[p,v,h,l,u,_,g,m,b,z,y,M,j,x,H,$]),i.jsx("div",{ref:q,className:`w-full h-full relative overflow-hidden pointer-events-none touch-none ${k||""}`,style:C})}const st=()=>i.jsx("section",{className:"min-h-screen flex items-center justify-center px-4 relative overflow-hidden pt-24 md:pt-32","aria-label":"Hero section",children:i.jsxs("div",{className:"text-center space-y-12 relative z-10 max-w-5xl mx-auto",children:[i.jsxs("div",{className:"relative inline-block animate-float","aria-label":"Profile picture",children:[i.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 rounded-full blur-3xl scale-150"}),i.jsx(Je,{intensity:15,children:i.jsx(Ke,{className:"p-1 rounded-full",children:i.jsxs("div",{className:"relative",children:[i.jsx("img",{src:A.profileImage,alt:`${A.name} profile`,className:"h-32 w-32 md:h-36 md:w-36 rounded-full object-cover ring-4 ring-white/10",width:144,height:144,loading:"eager",decoding:"async"}),i.jsx("div",{className:"absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/10 via-purple-500/10 to-pink-500/10"})]})})})]}),i.jsxs("div",{className:"space-y-8",children:[i.jsxs("div",{className:"space-y-4",children:[i.jsx("p",{className:"text-lg md:text-xl text-slate-400 font-light tracking-wider uppercase",children:A.greeting}),i.jsx("h1",{className:"text-6xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tight",children:i.jsx(Qe,{delay:.3,duration:.8,stagger:.03,gradient:!0,gradientColors:["#3b82f6","#8b5cf6","#ec4899","#06b6d4"],children:A.name})})]}),i.jsxs("div",{className:"space-y-6",children:[i.jsx("p",{className:"text-xl md:text-2xl lg:text-3xl text-slate-200 font-medium tracking-wide",children:A.roles.join(" • ")}),i.jsx("p",{className:"text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed",children:A.description})]})]}),i.jsxs("div",{className:"flex flex-col sm:flex-row gap-6 justify-center items-center pt-8",children:[i.jsxs(he,{variant:"gradient",size:"lg",onClick:()=>window.open(A.resumeUrl,"_blank"),"aria-label":"Download resume",className:"group relative overflow-hidden",children:[i.jsx("span",{className:"absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl scale-150"}),i.jsxs("span",{className:"relative z-10 flex items-center",children:[i.jsx(Ze,{className:"mr-3 h-5 w-5 group-hover:rotate-12 transition-transform duration-300","aria-hidden":"true"}),"Download Resume"]})]}),i.jsx(he,{variant:"outline",size:"lg",onClick:()=>window.open("https://github.com/afiqezio","_blank"),"aria-label":"Visit GitHub profile",className:"group backdrop-blur-xl bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/30",children:i.jsxs("span",{className:"flex items-center",children:[i.jsx(Ne,{className:"mr-3 h-5 w-5 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300","aria-hidden":"true"}),"View GitHub"]})})]})]})}),it=a.lazy(()=>W(()=>import("./AboutSection-DXq0DsuL.js"),__vite__mapDeps([0,1,2,3,4,5,6,7]))),rt=a.lazy(()=>W(()=>import("./ProjectsSection-Crn6euQO.js"),__vite__mapDeps([8,1,2,3,4,5,6,7]))),ot=a.lazy(()=>W(()=>import("./SkillsSection-Get-HwL1.js"),__vite__mapDeps([9,1,2,3,4,5,6,7]))),nt=a.lazy(()=>W(()=>import("./ContactSection-D0jIBkBy.js"),__vite__mapDeps([10,1,2,3,4,5,6,7]))),X=()=>i.jsx("div",{className:"py-20 px-4 md:px-8 lg:px-16 flex justify-center",children:i.jsx("div",{className:"animate-pulse text-muted-foreground",children:"Loading..."})}),at=()=>{const p=Ae(),v=u=>{p("/view",{state:u})},h=a.useMemo(()=>{if(typeof window>"u")return!1;const u=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),_=navigator.deviceMemory&&navigator.deviceMemory<4,g=navigator.connection?.effectiveType&&["slow-2g","2g","3g"].includes(navigator.connection.effectiveType);return u||_||g},[]),l=a.useMemo(()=>h?{resolution:.25,iterationsViscous:16,iterationsPoisson:16,mouseForce:15,cursorSize:80}:{resolution:.4,iterationsViscous:24,iterationsPoisson:24,mouseForce:20,cursorSize:100},[h]);return i.jsxs("div",{className:"min-h-screen relative",children:[i.jsx("div",{className:"absolute inset-0 -z-10 h-full min-h-screen",children:i.jsx(tt,{className:"w-full h-full",colors:["#5227FF","#FF9FFC","#B19EEF"],mouseForce:l.mouseForce,cursorSize:l.cursorSize,isViscous:!1,viscous:30,iterationsViscous:l.iterationsViscous,iterationsPoisson:l.iterationsPoisson,resolution:l.resolution,isBounce:!1,autoDemo:!0,autoSpeed:.5,autoIntensity:2.2,takeoverDuration:.25,autoResumeDelay:3e3,autoRampDuration:.6})}),i.jsx(Le,{items:Be}),i.jsxs("main",{className:"relative z-10",children:[i.jsx(st,{}),i.jsx(a.Suspense,{fallback:i.jsx(X,{}),children:i.jsx(it,{})}),i.jsx(a.Suspense,{fallback:i.jsx(X,{}),children:i.jsx(rt,{onViewProject:v})}),i.jsx(a.Suspense,{fallback:i.jsx(X,{}),children:i.jsx(ot,{})}),i.jsx(a.Suspense,{fallback:i.jsx(X,{}),children:i.jsx(nt,{})})]})]})},pt=Object.freeze(Object.defineProperty({__proto__:null,default:at},Symbol.toStringTag,{value:"Module"}));export{Ke as G,pt as I,he as R,Je as T};
