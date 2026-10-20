"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * The one hard idea on the site: a field of ~14k "signals" (points) that drift with noise,
 * light up and ripple around the cursor, and compress as you scroll — a nod to clustering
 * 150k news signals a day into events. Kept cheap: one draw call, DPR capped, pauses off-screen.
 */

const vertex = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;      // in plane units
  uniform float uScroll;    // 0..1
  uniform float uPixelRatio;
  attribute float aSeed;
  varying float vGlow;

  // simplex-ish 2D noise (cheap)
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy)); vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1; i = mod(i, 289.0);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0); m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0; vec3 h = abs(x) - 0.5; vec3 ox = floor(x + 0.5); vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g; g.x = a0.x * x0.x + h.x * x0.y; g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec3 p = position;
    float t = uTime * 0.12;
    float n = snoise(p.xy * 0.35 + t + aSeed * 0.01);
    float n2 = snoise(p.xy * 0.9 - t * 0.6);
    // drift
    p.x += n * 0.35;
    p.y += n2 * 0.25;
    // scroll compresses the field toward a horizontal band (events forming)
    p.y *= 1.0 - uScroll * 0.55;
    p.z += (n + n2) * 0.4 * (1.0 - uScroll);

    // cursor ripple
    float d = distance(p.xy, uMouse);
    float ring = smoothstep(2.2, 0.0, d);
    float wave = sin(d * 6.0 - uTime * 3.0) * 0.5 + 0.5;
    p.z += ring * wave * 0.9;
    vGlow = ring * (0.5 + 0.5 * wave) + max(n, 0.0) * 0.25;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    float size = (1.2 + vGlow * 2.6 + aSeed * 0.8) * uPixelRatio;
    gl_PointSize = size * (14.0 / -mv.z);
  }
`;

const fragment = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uAccent;
  varying float vGlow;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float r = dot(c, c);
    if (r > 0.25) discard;
    float alpha = smoothstep(0.25, 0.05, r);
    vec3 col = mix(uColor, uAccent, smoothstep(0.55, 1.0, vGlow));
    gl_FragColor = vec4(col, alpha * (0.18 + vGlow * 0.8));
  }
`;

function Field({ reduce }: { reduce: boolean }) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const { viewport, gl } = useThree();
  const mouse = useRef(new THREE.Vector2(100, 100));
  const target = useRef(new THREE.Vector2(100, 100));

  const { positions, seeds } = useMemo(() => {
    const cols = 150, rows = 90;
    const pos = new Float32Array(cols * rows * 3);
    const seed = new Float32Array(cols * rows);
    let i = 0;
    for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
      pos[i * 3] = (x / (cols - 1) - 0.5) * 22;
      pos[i * 3 + 1] = (y / (rows - 1) - 0.5) * 13;
      pos[i * 3 + 2] = 0;
      seed[i] = Math.random();
      i++;
    }
    return { positions: pos, seeds: seed };
  }, []);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(100, 100) },
    uScroll: { value: 0 },
    uPixelRatio: { value: Math.min(gl.getPixelRatio(), 1.5) },
    uColor: { value: new THREE.Color("#f5f5f3") },
    uAccent: { value: new THREE.Color("#c8ff5a") },
  }), [gl]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * viewport.width;
      const y = -(e.clientY / window.innerHeight - 0.5) * viewport.height;
      target.current.set(x, y);
    };
    const onLeave = () => target.current.set(100, 100);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => { window.removeEventListener("pointermove", onMove); document.documentElement.removeEventListener("mouseleave", onLeave); };
  }, [viewport.width, viewport.height]);

  useFrame((state, delta) => {
    if (!mat.current) return;
    const u = mat.current.uniforms;
    u.uTime.value += delta * (reduce ? 0.3 : 1);
    mouse.current.lerp(target.current, 0.08);
    u.uMouse.value.copy(mouse.current);
    const h = window.innerHeight || 1;
    u.uScroll.value = THREE.MathUtils.clamp(window.scrollY / h, 0, 1);
  });

  return (
    <points frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSeed" args={[seeds, 1]} />
      </bufferGeometry>
      <shaderMaterial ref={mat} vertexShader={vertex} fragmentShader={fragment} uniforms={uniforms} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

export default function SignalField() {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.05 });
    if (wrap.current) io.observe(wrap.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0" aria-hidden>
      <Canvas
        dpr={[1, 1.5]}
        frameloop={visible ? "always" : "never"}
        camera={{ position: [0, 0, 9], fov: 50 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <Field reduce={reduce} />
      </Canvas>
      {/* vignette so type stays readable over the field */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--bg)_85%)]" />
    </div>
  );
}
