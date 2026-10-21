"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uProgress;
  uniform float uMorph;
  uniform float uScatter;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform vec2 uMouse;
  uniform float uMouseStrength;
  attribute vec3 aTo;
  attribute vec3 aStart;
  attribute float aLum;
  attribute float aRand;
  varying float vAlpha;
  varying float vAccent;

  float ease(float t) { return t * t * (3.0 - 2.0 * t); }

  void main() {
    // Intro: fly in from a scattered cloud, staggered per point
    float p = ease(clamp(uProgress * 1.5 - aRand * 0.5, 0.0, 1.0));
    // Morph: current word -> next word, staggered, bulging toward the camera mid-flight
    float m = ease(clamp(uMorph * 1.6 - aRand * 0.6, 0.0, 1.0));
    vec3 word = mix(position, aTo, m);
    word.z += sin(m * 3.14159) * (aRand - 0.3) * 0.5;
    vec3 pos = mix(aStart, word, p);

    // Idle shimmer
    pos.z += sin(uTime * 0.9 + aRand * 6.2831) * 0.02;
    pos.xy += vec2(sin(uTime * 0.7 + aRand * 40.0), cos(uTime * 0.6 + aRand * 30.0)) * 0.004;

    // Cursor parts the points and lifts them toward the camera
    vec2 d = pos.xy - uMouse;
    float f = smoothstep(0.55, 0.0, length(d)) * uMouseStrength;
    pos.xy += normalize(d + 1e-5) * f * 0.3;
    pos.z += f * 0.6;

    // Scroll blows the word apart, drifting upward
    pos += (aStart * 0.8 + vec3(0.0, 1.0, 0.0)) * uScatter * (0.4 + aRand);

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * (0.5 + aLum * 0.7) * uPixelRatio * (1.0 / -mv.z) * (1.0 + f * 0.9);
    vAlpha = aLum * (1.0 - uScatter * 0.9) * (0.25 + 0.75 * p);
    vAccent = step(0.975, aRand) + f * 0.9 + sin(m * 3.14159) * 0.35;
  }
`;

const fragment = /* glsl */ `
  uniform vec3 uAccent;
  varying float vAlpha;
  varying float vAccent;
  void main() {
    float r = length(gl_PointCoord - 0.5);
    if (r > 0.5) discard;
    float a = smoothstep(0.5, 0.1, r) * vAlpha;
    vec3 col = mix(vec3(0.95, 0.95, 0.93), uAccent, clamp(vAccent, 0.0, 1.0));
    gl_FragColor = vec4(col, a);
  }
`;

/** Rasterises a word and returns `count` points on its glyphs, centred, in units where width = 1. */
function sampleWord(word: string, count: number, family: string) {
  const W = 1400, H = 420;
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const ctx = c.getContext("2d", { willReadFrequently: true })!;
  let size = 360;
  ctx.font = `600 ${size}px ${family}`;
  size = Math.min(size, (size * W * 0.94) / ctx.measureText(word).width);
  ctx.font = `600 ${size}px ${family}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#fff";
  ctx.fillText(word, W / 2, H / 2);

  const { data } = ctx.getImageData(0, 0, W, H);
  const hits: number[] = [];
  for (let y = 0; y < H; y += 3) for (let x = 0; x < W; x += 3) if (data[(y * W + x) * 4 + 3] > 140) hits.push(x, y);

  const out = new Float32Array(count * 3);
  const n = hits.length / 2;
  for (let i = 0; i < count; i++) {
    const k = ((Math.random() * n) | 0) * 2;
    out[i * 3] = (hits[k] + Math.random() * 3) / W - 0.5;
    out[i * 3 + 1] = -((hits[k + 1] + Math.random() * 3) / W - H / W / 2);
    out[i * 3 + 2] = 0;
  }
  return out;
}

/**
 * WebGL particle type: points fly in to spell a word, morph through `words` on a loop,
 * part around the cursor and scatter on scroll. Renders only while on screen.
 */
export default function ParticleWords({ words, className = "" }: { words: string[]; className?: string }) {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mount.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.innerWidth < 768;
    const count = small ? 7000 : 15000;
    let disposed = false;
    let raf = 0;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance" });
    const dpr = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(dpr);
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 20);
    camera.position.z = 3;

    const uniforms = {
      uTime: { value: 0 },
      uProgress: { value: reduce ? 1 : 0 },
      uMorph: { value: 0 },
      uScatter: { value: 0 },
      uSize: { value: small ? 18 : 22 },
      uPixelRatio: { value: dpr },
      uMouse: { value: new THREE.Vector2(9, 9) },
      uMouseStrength: { value: 0 },
      uAccent: { value: new THREE.Color("#ff5b2e") },
    };
    const material = new THREE.ShaderMaterial({ vertexShader: vertex, fragmentShader: fragment, uniforms, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
    const geometry = new THREE.BufferGeometry();
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let viewH = 1, viewW = 1;
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = el;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      viewH = 2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
      viewW = viewH * camera.aspect;
      points.scale.setScalar(Math.min(viewW * (small ? 0.94 : 0.76), viewH * 2.4));
    };
    resize();
    window.addEventListener("resize", resize);

    const target = new THREE.Vector2(9, 9);
    let strength = 0;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      const ny = -(((e.clientY - r.top) / r.height) * 2 - 1);
      target.set((nx * viewW) / 2 / points.scale.x, (ny * viewH) / 2 / points.scale.y);
      strength = 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const onScroll = () => {
      const k = Math.min(Math.max(window.scrollY / (window.innerHeight * 0.9), 0), 1);
      uniforms.uScatter.value = Math.pow(k, 1.3);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(el);

    const start = async () => {
      await document.fonts.ready;
      if (disposed) return;
      const family = getComputedStyle(document.body).fontFamily;
      const targets = words.map((w) => sampleWord(w, count, family));
      const rand = new Float32Array(count), lum = new Float32Array(count), from = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        rand[i] = Math.random();
        lum[i] = 0.35 + Math.random() * 0.65;
        const t = Math.random() * Math.PI * 2, u = Math.acos(2 * Math.random() - 1), r = 0.8 + Math.random() * 1.2;
        from[i * 3] = r * Math.sin(u) * Math.cos(t);
        from[i * 3 + 1] = r * Math.sin(u) * Math.sin(t) * 0.6;
        from[i * 3 + 2] = r * Math.cos(u);
      }
      let current = 0;
      const pos = new THREE.Float32BufferAttribute(targets[0].slice(), 3);
      const to = new THREE.Float32BufferAttribute(targets[1 % targets.length].slice(), 3);
      geometry.setAttribute("position", pos);
      geometry.setAttribute("aTo", to);
      geometry.setAttribute("aStart", new THREE.Float32BufferAttribute(from, 3));
      geometry.setAttribute("aLum", new THREE.Float32BufferAttribute(lum, 1));
      geometry.setAttribute("aRand", new THREE.Float32BufferAttribute(rand, 1));

      if (reduce) { renderer.render(scene, camera); return; }

      const HOLD = 2.6, MORPH = 1.6;
      let phase = -1.2; // extra hold on the first word while the intro plays
      let last = performance.now();
      const loop = () => {
        raf = requestAnimationFrame(loop);
        const now = performance.now();
        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;
        if (!visible) return;
        uniforms.uTime.value += dt;
        if (uniforms.uProgress.value < 1) uniforms.uProgress.value = Math.min(uniforms.uProgress.value + dt / 2.2, 1);

        if (targets.length > 1 && window.scrollY < window.innerHeight * 0.5) {
          phase += dt;
          if (phase > HOLD) uniforms.uMorph.value = Math.min((phase - HOLD) / MORPH, 1);
          if (phase > HOLD + MORPH) {
            // Commit the morph: the next word becomes the base, queue the one after
            current = (current + 1) % targets.length;
            (pos.array as Float32Array).set(targets[current]);
            (to.array as Float32Array).set(targets[(current + 1) % targets.length]);
            pos.needsUpdate = true;
            to.needsUpdate = true;
            uniforms.uMorph.value = 0;
            phase = 0;
          }
        }

        uniforms.uMouse.value.lerp(target, 0.12);
        strength *= 0.985;
        uniforms.uMouseStrength.value += (strength - uniforms.uMouseStrength.value) * 0.1;
        renderer.render(scene, camera);
      };
      loop();
    };
    start();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [words]);

  return <div ref={mount} aria-hidden className={`[&>canvas]:block [&>canvas]:h-full [&>canvas]:w-full ${className}`} />;
}
