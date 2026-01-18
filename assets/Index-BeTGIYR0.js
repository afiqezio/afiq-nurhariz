const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AboutSection-DWVtDI0s.js","assets/ui-vendor-ZA3sFIcL.js","assets/react-vendor-khv3atvK.js","assets/data-Bb9NHsLD.js","assets/index-BcIB5-pj.js","assets/index-BkgZFEmw.css","assets/ProjectsSection-D3XzgS0y.js","assets/SkillsSection-DdTWUvjB.js","assets/ContactSection-C_-xioAD.js"])))=>i.map(i=>d[i]);
import{_ as U}from"./index-BcIB5-pj.js";import{j as i}from"./ui-vendor-ZA3sFIcL.js";import{r as c,u as Fe}from"./react-vendor-khv3atvK.js";import{c as Ce,h as ke,C as Ee,n as Ae}from"./data-Bb9NHsLD.js";import{C as ie,D as Ne,R as Re,L as B,a as V,V as u,S as re,b as oe,M as $,P as J,c as O,d as Le,W as Ie,e as Be,H as Ve,F as Oe,f as He,B as Ue,g as Pe,h as We,A as Ye}from"./three-vendor-BnRZnIug.js";const Ge=["#5227FF","#FF9FFC","#B19EEF"];function Xe({mouseForce:m=20,cursorSize:p=100,isViscous:y=!1,viscous:f=30,iterationsViscous:x=32,iterationsPoisson:b=32,dt:_=.014,BFECC:C=!0,resolution:S=.5,isBounce:k=!1,colors:K=Ge,style:ne={},className:ae="",autoDemo:E=!0,autoSpeed:A=.5,autoIntensity:N=2.2,takeoverDuration:R=.25,autoResumeDelay:L=1e3,autoRampDuration:I=.6}){const P=c.useRef(null),h=c.useRef(null),W=c.useRef(null),D=c.useRef(null),Y=c.useRef(null),Q=c.useRef(!0),G=c.useRef(null);return c.useEffect(()=>{if(!P.current)return;function d(n){let e;Array.isArray(n)&&n.length>0?e=n.length===1?[n[0],n[0]]:n:e=["#ffffff","#ffffff"];const t=e.length,s=new Uint8Array(t*4);for(let o=0;o<t;o++){const a=new ie(e[o]);s[o*4+0]=Math.round(a.r*255),s[o*4+1]=Math.round(a.g*255),s[o*4+2]=Math.round(a.b*255),s[o*4+3]=255}const r=new Ne(s,t,1,Re);return r.magFilter=B,r.minFilter=B,r.wrapS=V,r.wrapT=V,r.generateMipmaps=!1,r.needsUpdate=!0,r}const T=d(K),X=new Le(0,0,0,0);class ce{width=0;height=0;aspect=1;pixelRatio=1;isMobile=!1;breakpoint=768;fboWidth=null;fboHeight=null;time=0;delta=0;container=null;renderer=null;clock=null;init(e){this.container=e;const t=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),s=navigator.deviceMemory&&navigator.deviceMemory<4,r=t||s?1:2;this.pixelRatio=Math.min(window.devicePixelRatio||1,r),this.resize(),this.renderer=new Ie({antialias:!t&&!s,alpha:!0,powerPreference:t||s?"low-power":"high-performance"}),this.renderer.autoClear=!1,this.renderer.setClearColor(new ie(0),0),this.renderer.setPixelRatio(this.pixelRatio),this.renderer.setSize(this.width,this.height);const o=this.renderer.domElement;o.style.width="100%",o.style.height="100%",o.style.display="block",this.clock=new Be,this.clock.start()}resize(){if(!this.container)return;const e=this.container.getBoundingClientRect();this.width=Math.max(1,Math.floor(e.width)),this.height=Math.max(1,Math.floor(e.height)),this.aspect=this.width/this.height,this.renderer&&this.renderer.setSize(this.width,this.height,!1)}update(){this.clock&&(this.delta=this.clock.getDelta(),this.time+=this.delta)}}const l=new ce;class le{mouseMoved=!1;coords=new u;coords_old=new u;diff=new u;timer=null;container=null;docTarget=null;listenerTarget=null;isHoverInside=!1;hasUserControl=!1;isAutoActive=!1;autoIntensity=2;takeoverActive=!1;takeoverStartTime=0;takeoverDuration=.25;takeoverFrom=new u;takeoverTo=new u;onInteract=null;_onMouseMove=this.onDocumentMouseMove.bind(this);_onTouchStart=this.onDocumentTouchStart.bind(this);_onTouchMove=this.onDocumentTouchMove.bind(this);_onTouchEnd=this.onTouchEnd.bind(this);_onDocumentLeave=this.onDocumentLeave.bind(this);init(e){this.container=e,this.docTarget=e.ownerDocument||null;const t=this.docTarget?.defaultView||(typeof window<"u"?window:null);t&&(this.listenerTarget=t,this.listenerTarget.addEventListener("mousemove",this._onMouseMove),this.listenerTarget.addEventListener("touchstart",this._onTouchStart,{passive:!0}),this.listenerTarget.addEventListener("touchmove",this._onTouchMove,{passive:!0}),this.listenerTarget.addEventListener("touchend",this._onTouchEnd),this.docTarget?.addEventListener("mouseleave",this._onDocumentLeave))}dispose(){this.listenerTarget&&(this.listenerTarget.removeEventListener("mousemove",this._onMouseMove),this.listenerTarget.removeEventListener("touchstart",this._onTouchStart),this.listenerTarget.removeEventListener("touchmove",this._onTouchMove),this.listenerTarget.removeEventListener("touchend",this._onTouchEnd)),this.docTarget&&this.docTarget.removeEventListener("mouseleave",this._onDocumentLeave),this.listenerTarget=null,this.docTarget=null,this.container=null}isPointInside(e,t){if(!this.container)return!1;const s=this.container.getBoundingClientRect();return s.width===0||s.height===0?!1:e>=s.left&&e<=s.right&&t>=s.top&&t<=s.bottom}updateHoverState(e,t){return this.isHoverInside=this.isPointInside(e,t),this.isHoverInside}setCoords(e,t){if(!this.container)return;this.timer&&window.clearTimeout(this.timer);const s=this.container.getBoundingClientRect();if(s.width===0||s.height===0)return;const r=(e-s.left)/s.width,o=(t-s.top)/s.height;this.coords.set(r*2-1,-(o*2-1)),this.mouseMoved=!0,this.timer=window.setTimeout(()=>{this.mouseMoved=!1},100)}setNormalized(e,t){this.coords.set(e,t),this.mouseMoved=!0}onDocumentMouseMove(e){if(this.updateHoverState(e.clientX,e.clientY)){if(this.onInteract&&this.onInteract(),this.isAutoActive&&!this.hasUserControl&&!this.takeoverActive){if(!this.container)return;const t=this.container.getBoundingClientRect(),s=(e.clientX-t.left)/t.width,r=(e.clientY-t.top)/t.height;this.takeoverFrom.copy(this.coords),this.takeoverTo.set(s*2-1,-(r*2-1)),this.takeoverStartTime=performance.now(),this.takeoverActive=!0,this.hasUserControl=!0,this.isAutoActive=!1;return}this.setCoords(e.clientX,e.clientY),this.hasUserControl=!0}}onDocumentTouchStart(e){if(e.touches.length!==1)return;const t=e.touches[0];this.updateHoverState(t.clientX,t.clientY)&&(this.onInteract&&this.onInteract(),this.setCoords(t.clientX,t.clientY),this.hasUserControl=!0)}onDocumentTouchMove(e){if(e.touches.length!==1)return;const t=e.touches[0];this.updateHoverState(t.clientX,t.clientY)&&(this.onInteract&&this.onInteract(),this.setCoords(t.clientX,t.clientY))}onTouchEnd(){this.isHoverInside=!1}onDocumentLeave(){this.isHoverInside=!1}update(){if(this.takeoverActive){const e=(performance.now()-this.takeoverStartTime)/(this.takeoverDuration*1e3);if(e>=1)this.takeoverActive=!1,this.coords.copy(this.takeoverTo),this.coords_old.copy(this.coords),this.diff.set(0,0);else{const t=e*e*(3-2*e);this.coords.copy(this.takeoverFrom).lerp(this.takeoverTo,t)}}this.diff.subVectors(this.coords,this.coords_old),this.coords_old.copy(this.coords),this.coords_old.x===0&&this.coords_old.y===0&&this.diff.set(0,0),this.isAutoActive&&!this.takeoverActive&&this.diff.multiplyScalar(this.autoIntensity)}}const v=new le;class ue{mouse;manager;enabled;speed;resumeDelay;rampDurationMs;active=!1;current=new u(0,0);target=new u;lastTime=performance.now();activationTime=0;margin=.2;_tmpDir=new u;constructor(e,t,s){this.mouse=e,this.manager=t,this.enabled=s.enabled,this.speed=s.speed,this.resumeDelay=s.resumeDelay||3e3,this.rampDurationMs=(s.rampDuration||0)*1e3,this.pickNewTarget()}pickNewTarget(){const e=Math.random;this.target.set((e()*2-1)*(1-this.margin),(e()*2-1)*(1-this.margin))}forceStop(){this.active=!1,this.mouse.isAutoActive=!1}update(){if(!this.enabled)return;const e=performance.now();if(e-this.manager.lastUserInteraction<this.resumeDelay){this.active&&this.forceStop();return}if(this.mouse.isHoverInside){this.active&&this.forceStop();return}if(this.active||(this.active=!0,this.current.copy(this.mouse.coords),this.lastTime=e,this.activationTime=e),!this.active)return;this.mouse.isAutoActive=!0;let s=(e-this.lastTime)/1e3;this.lastTime=e,s>.2&&(s=.016);const r=this._tmpDir.subVectors(this.target,this.current),o=r.length();if(o<.01){this.pickNewTarget();return}r.normalize();let a=1;if(this.rampDurationMs>0){const F=Math.min(1,(e-this.activationTime)/this.rampDurationMs);a=F*F*(3-2*F)}const z=this.speed*s*a,g=Math.min(z,o);this.current.addScaledVector(r,g),this.mouse.setNormalized(this.current.x,this.current.y)}}const M=`
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
`,he=`
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
`,de=`
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
`,Z=`
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
`,ve=`
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
`,pe=`
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
`,fe=`
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
`,me=`
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
`,xe=`
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
`,ge=`
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
`;class j{props;uniforms;scene=null;camera=null;material=null;geometry=null;plane=null;constructor(e){this.props=e||{},this.uniforms=this.props.material?.uniforms}init(...e){this.scene=new re,this.camera=new oe,this.uniforms&&(this.material=new O(this.props.material),this.geometry=new J(2,2),this.plane=new $(this.geometry,this.material),this.scene.add(this.plane))}update(...e){!l.renderer||!this.scene||!this.camera||(l.renderer.setRenderTarget(this.props.output||null),l.renderer.render(this.scene,this.camera),l.renderer.setRenderTarget(null))}}class ye extends j{line;constructor(e){super({material:{vertexShader:M,fragmentShader:Z,uniforms:{boundarySpace:{value:e.cellScale},px:{value:e.cellScale},fboSize:{value:e.fboSize},velocity:{value:e.src.texture},dt:{value:e.dt},isBFECC:{value:!0}}},output:e.dst}),this.uniforms=this.props.material.uniforms,this.init()}init(){super.init(),this.createBoundary()}createBoundary(){const e=new Ue,t=new Float32Array([-1,-1,0,-1,1,0,-1,1,0,1,1,0,1,1,0,1,-1,0,1,-1,0,-1,-1,0]);e.setAttribute("position",new Pe(t,3));const s=new O({vertexShader:he,fragmentShader:Z,uniforms:this.uniforms});this.line=new We(e,s),this.scene.add(this.line)}update(...e){const{dt:t,isBounce:s,BFECC:r}=e[0]||{};this.uniforms&&(typeof t=="number"&&(this.uniforms.dt.value=t),typeof s=="boolean"&&(this.line.visible=s),typeof r=="boolean"&&(this.uniforms.isBFECC.value=r),super.update())}}class we extends j{mouse;constructor(e){super({output:e.dst}),this.init(e)}init(e){super.init();const t=new J(1,1),s=new O({vertexShader:de,fragmentShader:fe,blending:Ye,depthWrite:!1,uniforms:{px:{value:e.cellScale},force:{value:new u(0,0)},center:{value:new u(0,0)},scale:{value:new u(e.cursor_size,e.cursor_size)}}});this.mouse=new $(t,s),this.scene.add(this.mouse)}update(...e){const t=e[0]||{},s=v.diff.x/2*(t.mouse_force||0),r=v.diff.y/2*(t.mouse_force||0),o=t.cellScale||{x:1,y:1},a=t.cursor_size||0,z=a*o.x,g=a*o.y,F=Math.min(Math.max(v.coords.x,-1+z+o.x*2),1-z-o.x*2),ze=Math.min(Math.max(v.coords.y,-1+g+o.y*2),1-g-o.y*2),q=this.mouse.material.uniforms;q.force.value.set(s,r),q.center.value.set(F,ze),q.scale.value.set(a,a),super.update()}}class be extends j{constructor(e){super({material:{vertexShader:M,fragmentShader:ge,uniforms:{boundarySpace:{value:e.boundarySpace},velocity:{value:e.src.texture},velocity_new:{value:e.dst_.texture},v:{value:e.viscous},px:{value:e.cellScale},dt:{value:e.dt}}},output:e.dst,output0:e.dst_,output1:e.dst}),this.init()}update(...e){const{viscous:t,iterations:s,dt:r}=e[0]||{};if(!this.uniforms)return;let o,a;typeof t=="number"&&(this.uniforms.v.value=t);const z=s??0;for(let g=0;g<z;g++)g%2===0?(o=this.props.output0,a=this.props.output1):(o=this.props.output1,a=this.props.output0),this.uniforms.velocity_new.value=o.texture,this.props.output=a,typeof r=="number"&&(this.uniforms.dt.value=r),super.update();return a}}class _e extends j{constructor(e){super({material:{vertexShader:M,fragmentShader:pe,uniforms:{boundarySpace:{value:e.boundarySpace},velocity:{value:e.src.texture},px:{value:e.cellScale},dt:{value:e.dt}}},output:e.dst}),this.init()}update(...e){const{vel:t}=e[0]||{};this.uniforms&&t&&(this.uniforms.velocity.value=t.texture),super.update()}}class Se extends j{constructor(e){super({material:{vertexShader:M,fragmentShader:me,uniforms:{boundarySpace:{value:e.boundarySpace},pressure:{value:e.dst_.texture},divergence:{value:e.src.texture},px:{value:e.cellScale}}},output:e.dst,output0:e.dst_,output1:e.dst}),this.init()}update(...e){const{iterations:t}=e[0]||{};let s,r;const o=t??0;for(let a=0;a<o;a++)a%2===0?(s=this.props.output0,r=this.props.output1):(s=this.props.output1,r=this.props.output0),this.uniforms&&(this.uniforms.pressure.value=s.texture),this.props.output=r,super.update();return r}}class De extends j{constructor(e){super({material:{vertexShader:M,fragmentShader:xe,uniforms:{boundarySpace:{value:e.boundarySpace},pressure:{value:e.src_p.texture},velocity:{value:e.src_v.texture},px:{value:e.cellScale},dt:{value:e.dt}}},output:e.dst}),this.init()}update(...e){const{vel:t,pressure:s}=e[0]||{};this.uniforms&&t&&s&&(this.uniforms.velocity.value=t.texture,this.uniforms.pressure.value=s.texture),super.update()}}class Te{options;fbos={vel_0:null,vel_1:null,vel_viscous0:null,vel_viscous1:null,div:null,pressure_0:null,pressure_1:null};fboSize=new u;cellScale=new u;boundarySpace=new u;advection;externalForce;viscous;divergence;poisson;pressure;constructor(e){this.options={iterations_poisson:32,iterations_viscous:32,mouse_force:20,resolution:.5,cursor_size:100,viscous:30,isBounce:!1,dt:.014,isViscous:!1,BFECC:!0,...e},this.init()}init(){this.calcSize(),this.createAllFBO(),this.createShaderPass()}getFloatType(){return/(iPad|iPhone|iPod)/i.test(navigator.userAgent)?Ve:Oe}createAllFBO(){const t={type:this.getFloatType(),depthBuffer:!1,stencilBuffer:!1,minFilter:B,magFilter:B,wrapS:V,wrapT:V};for(const s in this.fbos)this.fbos[s]=new He(this.fboSize.x,this.fboSize.y,t)}createShaderPass(){this.advection=new ye({cellScale:this.cellScale,fboSize:this.fboSize,dt:this.options.dt,src:this.fbos.vel_0,dst:this.fbos.vel_1}),this.externalForce=new we({cellScale:this.cellScale,cursor_size:this.options.cursor_size,dst:this.fbos.vel_1}),this.viscous=new be({cellScale:this.cellScale,boundarySpace:this.boundarySpace,viscous:this.options.viscous,src:this.fbos.vel_1,dst:this.fbos.vel_viscous1,dst_:this.fbos.vel_viscous0,dt:this.options.dt}),this.divergence=new _e({cellScale:this.cellScale,boundarySpace:this.boundarySpace,src:this.fbos.vel_viscous0,dst:this.fbos.div,dt:this.options.dt}),this.poisson=new Se({cellScale:this.cellScale,boundarySpace:this.boundarySpace,src:this.fbos.div,dst:this.fbos.pressure_1,dst_:this.fbos.pressure_0}),this.pressure=new De({cellScale:this.cellScale,boundarySpace:this.boundarySpace,src_p:this.fbos.pressure_0,src_v:this.fbos.vel_viscous0,dst:this.fbos.vel_0,dt:this.options.dt})}calcSize(){const e=Math.max(1,Math.round(this.options.resolution*l.width)),t=Math.max(1,Math.round(this.options.resolution*l.height));this.cellScale.set(1/e,1/t),this.fboSize.set(e,t)}resize(){this.calcSize();for(const e in this.fbos)this.fbos[e].setSize(this.fboSize.x,this.fboSize.y)}update(){this.options.isBounce?this.boundarySpace.set(0,0):this.boundarySpace.copy(this.cellScale),this.advection.update({dt:this.options.dt,isBounce:this.options.isBounce,BFECC:this.options.BFECC}),this.externalForce.update({cursor_size:this.options.cursor_size,mouse_force:this.options.mouse_force,cellScale:this.cellScale});let e=this.fbos.vel_1;this.options.isViscous&&(e=this.viscous.update({viscous:this.options.viscous,iterations:this.options.iterations_viscous,dt:this.options.dt})),this.divergence.update({vel:e});const t=this.poisson.update({iterations:this.options.iterations_poisson});this.pressure.update({vel:e,pressure:t})}}class Me{simulation;scene;camera;output;constructor(){this.simulation=new Te,this.scene=new re,this.camera=new oe,this.output=new $(new J(2,2),new O({vertexShader:M,fragmentShader:ve,transparent:!0,depthWrite:!1,uniforms:{velocity:{value:this.simulation.fbos.vel_0.texture},boundarySpace:{value:new u},palette:{value:T},bgColor:{value:X}}})),this.scene.add(this.output)}resize(){this.simulation.resize()}render(){l.renderer&&(l.renderer.setRenderTarget(null),l.renderer.render(this.scene,this.camera))}update(){this.simulation.update(),this.render()}}class je{props;output;autoDriver;lastUserInteraction=performance.now();running=!1;_loop=this.loop.bind(this);_resize=this.resize.bind(this);_onVisibility;constructor(e){this.props=e,l.init(e.$wrapper),v.init(e.$wrapper),v.autoIntensity=e.autoIntensity,v.takeoverDuration=e.takeoverDuration,v.onInteract=()=>{this.lastUserInteraction=performance.now(),this.autoDriver&&this.autoDriver.forceStop()},this.autoDriver=new ue(v,this,{enabled:e.autoDemo,speed:e.autoSpeed,resumeDelay:e.autoResumeDelay,rampDuration:e.autoRampDuration}),this.init(),window.addEventListener("resize",this._resize),this._onVisibility=()=>{document.hidden?this.pause():Q.current&&this.start()},document.addEventListener("visibilitychange",this._onVisibility)}init(){l.renderer&&(this.props.$wrapper.prepend(l.renderer.domElement),this.output=new Me)}resize(){l.resize(),this.output.resize()}render(){this.autoDriver&&this.autoDriver.update(),v.update(),l.update(),this.output.update()}loop(){this.running&&(this.render(),D.current=requestAnimationFrame(this._loop))}start(){this.running||(this.running=!0,this._loop())}pause(){this.running=!1,D.current&&(cancelAnimationFrame(D.current),D.current=null)}dispose(){try{if(window.removeEventListener("resize",this._resize),this._onVisibility&&document.removeEventListener("visibilitychange",this._onVisibility),v.dispose(),l.renderer){const e=l.renderer.domElement;e&&e.parentNode&&e.parentNode.removeChild(e),l.renderer.dispose()}}catch{}}}const w=P.current;w.style.position=w.style.position||"relative",w.style.overflow=w.style.overflow||"hidden";const ee=new je({$wrapper:w,autoDemo:E,autoSpeed:A,autoIntensity:N,takeoverDuration:R,autoResumeDelay:L,autoRampDuration:I});h.current=ee,(()=>{if(!h.current)return;const n=h.current.output?.simulation;if(!n)return;const e=n.options.resolution;Object.assign(n.options,{mouse_force:m,cursor_size:p,isViscous:y,viscous:f,iterations_viscous:x,iterations_poisson:b,dt:_,BFECC:C,resolution:S,isBounce:k}),S!==e&&n.resize()})(),ee.start();const te=new IntersectionObserver(n=>{const e=n[0],t=e.isIntersecting&&e.intersectionRatio>0;Q.current=t,h.current&&(t&&!document.hidden?h.current.start():h.current.pause())},{threshold:[0,.01,.1]});te.observe(w),Y.current=te;const se=new ResizeObserver(()=>{h.current&&(G.current&&cancelAnimationFrame(G.current),G.current=requestAnimationFrame(()=>{h.current&&h.current.resize()}))});return se.observe(w),W.current=se,()=>{if(D.current&&cancelAnimationFrame(D.current),W.current)try{W.current.disconnect()}catch{}if(Y.current)try{Y.current.disconnect()}catch{}h.current&&h.current.dispose(),h.current=null}},[C,p,_,k,y,b,x,m,S,f,K,E,A,N,R,L,I]),c.useEffect(()=>{const d=h.current;if(!d)return;const T=d.output?.simulation;if(!T)return;const X=T.options.resolution;Object.assign(T.options,{mouse_force:m,cursor_size:p,isViscous:y,viscous:f,iterations_viscous:x,iterations_poisson:b,dt:_,BFECC:C,resolution:S,isBounce:k}),d.autoDriver&&(d.autoDriver.enabled=E,d.autoDriver.speed=A,d.autoDriver.resumeDelay=L,d.autoDriver.rampDurationMs=I*1e3,d.autoDriver.mouse&&(d.autoDriver.mouse.autoIntensity=N,d.autoDriver.mouse.takeoverDuration=R)),S!==X&&T.resize()},[m,p,y,f,x,b,_,C,S,k,E,A,N,R,L,I]),i.jsx("div",{ref:P,className:`w-full h-full relative overflow-hidden pointer-events-none touch-none ${ae||""}`,style:ne})}const qe=()=>{const m=new Date().getFullYear();return i.jsx("footer",{className:"py-12 px-6 border-t border-slate-800 text-center text-slate-400 text-sm",children:i.jsxs("div",{className:"max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4",children:[i.jsxs("p",{children:["© ",m," Afiq Nurhariz. Built with React, Tailwind & TypeScript."]}),i.jsx("div",{className:"flex gap-6",children:Ce.map(p=>i.jsx("a",{href:p.href,target:"_blank",rel:"noopener noreferrer",className:"hover:text-primary-400 transition-colors",children:p.label},p.label))})]})})},$e=()=>i.jsxs("section",{className:"relative h-screen flex items-center justify-center overflow-hidden",children:[i.jsxs("div",{className:"absolute inset-0 z-0",children:[i.jsx("div",{className:"absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"}),i.jsx("div",{className:"absolute inset-0 hero-video-overlay"})]}),i.jsxs("div",{className:"relative z-10 max-w-7xl mx-auto px-6 text-center",children:[i.jsxs("div",{className:"inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-xs font-semibold text-primary-400 mb-8 animate-bounce",children:[i.jsx("span",{className:"w-2 h-2 rounded-full bg-primary-500"}),"Available for new opportunities"]}),i.jsxs("h1",{className:"font-display text-5xl md:text-8xl font-black tracking-tight mb-6 leading-tight",children:["Crafting the ",i.jsx("br",{}),i.jsx("span",{className:"gradient-text",children:"Future of Tech"})]}),i.jsxs("p",{className:"max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-10 leading-relaxed font-light",children:["I'm ",i.jsx("span",{className:"text-white font-medium",children:ke.name}),", a ",i.jsx("span",{className:"text-white font-medium",children:"Full-Stack Engineer"})," and ",i.jsx("span",{className:"text-white font-medium",children:"AI Developer"})," specializing in building intelligent, high-performance applications that bridge the gap between human intuition and machine intelligence."]}),i.jsxs("div",{className:"flex flex-col sm:flex-row gap-4 justify-center items-center",children:[i.jsxs("a",{href:"#projects",className:"px-8 py-4 rounded-full bg-primary-600 hover:bg-primary-500 text-white font-bold transition-all shadow-xl shadow-primary-500/25 flex items-center gap-2 group",children:["Explore My Work",i.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5 group-hover:translate-x-1 transition-transform",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:i.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M14 5l7 7m0 0l-7 7m7-7H3"})})]}),i.jsx("a",{href:"#about",className:"px-8 py-4 rounded-full glass hover:bg-slate-800 text-white font-bold transition-all",children:"Learn About Me"})]}),i.jsxs("div",{className:"mt-20 flex flex-wrap justify-center gap-6 opacity-50 grayscale hover:grayscale-0 transition-all duration-700",children:[i.jsx("span",{className:"px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm",children:"Full-Stack"}),i.jsx("span",{className:"px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm",children:"Mobile Developer"}),i.jsx("span",{className:"px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm",children:"AI Engineer"})]})]}),i.jsx("div",{className:"absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50",children:i.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6 text-white",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:i.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M19 14l-7 7m0 0l-7-7m7 7V3"})})})]}),Je=c.lazy(()=>U(()=>import("./AboutSection-DWVtDI0s.js"),__vite__mapDeps([0,1,2,3,4,5]))),Ke=c.lazy(()=>U(()=>import("./ProjectsSection-D3XzgS0y.js"),__vite__mapDeps([6,1,2,3,4,5]))),Qe=c.lazy(()=>U(()=>import("./SkillsSection-DdTWUvjB.js"),__vite__mapDeps([7,1,2,3,4,5]))),Ze=c.lazy(()=>U(()=>import("./ContactSection-C_-xioAD.js"),__vite__mapDeps([8,1,2,3,4,5]))),H=()=>i.jsx("div",{className:"py-20 px-4 md:px-8 lg:px-16 flex justify-center",children:i.jsx("div",{className:"animate-pulse text-muted-foreground",children:"Loading..."})}),nt=()=>{const m=Fe(),p=x=>{m("/view",{state:x})},y=c.useMemo(()=>{if(typeof window>"u")return!1;const x=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),b=navigator.deviceMemory&&navigator.deviceMemory<4,_=navigator.connection?.effectiveType&&["slow-2g","2g","3g"].includes(navigator.connection.effectiveType);return x||b||_},[]),f=c.useMemo(()=>y?{resolution:.25,iterationsViscous:16,iterationsPoisson:16,mouseForce:15,cursorSize:80}:{resolution:.4,iterationsViscous:24,iterationsPoisson:24,mouseForce:20,cursorSize:100},[y]);return i.jsxs("div",{className:"min-h-screen relative",children:[i.jsx("div",{className:"absolute inset-0 -z-10 h-full min-h-screen",children:i.jsx(Xe,{className:"w-full h-full",colors:["#5227FF","#FF9FFC","#B19EEF"],mouseForce:f.mouseForce,cursorSize:f.cursorSize,isViscous:!1,viscous:30,iterationsViscous:f.iterationsViscous,iterationsPoisson:f.iterationsPoisson,resolution:f.resolution,isBounce:!1,autoDemo:!0,autoSpeed:.5,autoIntensity:2.2,takeoverDuration:.25,autoResumeDelay:3e3,autoRampDuration:.6})}),i.jsx(Ee,{items:Ae}),i.jsxs("main",{className:"relative z-10",children:[i.jsx($e,{}),i.jsx(c.Suspense,{fallback:i.jsx(H,{}),children:i.jsx(Je,{})}),i.jsx(c.Suspense,{fallback:i.jsx(H,{}),children:i.jsx(Ke,{onViewProject:p})}),i.jsx(c.Suspense,{fallback:i.jsx(H,{}),children:i.jsx(Qe,{})}),i.jsx(c.Suspense,{fallback:i.jsx(H,{}),children:i.jsx(Ze,{})})]}),i.jsx(qe,{})]})};export{nt as default};
