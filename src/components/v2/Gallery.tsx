"use client";
import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { useGSAP } from "@gsap/react";
import { featuredProjects } from "@/lib/site";

gsap.registerPlugin(Draggable, InertiaPlugin);

/**
 * Selected work as an endless, draggable strip (huyml.co pattern). It drifts on its own,
 * follows the pointer with inertia when dragged, and wraps seamlessly. The archive below
 * holds the facts; this is the browse.
 */
export default function Gallery() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const proxy = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = track.current;
    if (!el || !proxy.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = gsap.utils.toArray<HTMLElement>(el.children);
    const gap = parseFloat(getComputedStyle(el).columnGap || "0");
    const widths = items.map((i) => i.offsetWidth + gap);
    const total = widths.reduce((a, b) => a + b, 0);
    const half = total / 2; // items are duplicated once
    let pos = 0;
    let drift = reduce ? 0 : 0.35;
    const wrap = gsap.utils.wrap(-half, 0);

    const render = () => {
      let x = pos;
      items.forEach((item, i) => {
        // each item's x is its offset plus the shared scroll, wrapped around the loop
        const base = widths.slice(0, i).reduce((a, b) => a + b, 0);
        const wx = gsap.utils.wrap(-widths[i], total - widths[i], base + x);
        gsap.set(item, { x: wx - base });
      });
    };
    const tick = () => { pos -= drift; pos = wrap(pos); render(); };
    gsap.ticker.add(tick);

    let last = 0;
    const d = Draggable.create(proxy.current, {
      type: "x",
      trigger: el,
      inertia: true,
      onPress() { last = this.x; drift = 0; },
      onDrag() { pos = wrap(pos + (this.x - last)); last = this.x; },
      onThrowUpdate() { pos = wrap(pos + (this.x - last)); last = this.x; },
      onThrowComplete() { drift = reduce ? 0 : 0.35; },
      onRelease() { if (!this.isThrowing) drift = reduce ? 0 : 0.35; },
    })[0];

    render();
    return () => { gsap.ticker.remove(tick); d.kill(); };
  }, { scope: root });

  const list = [...featuredProjects, ...featuredProjects];

  return (
    <section ref={root} id="work" className="overflow-hidden py-24 md:py-40">
      <div className="px-5 md:px-10">
        <div className="rule flex items-center justify-between pt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-faint">
          <span>( 01 )</span><span>Selected work · drag</span>
        </div>
      </div>

      <div className="relative mt-10 cursor-grab select-none active:cursor-grabbing md:mt-14">
        <div ref={proxy} className="absolute h-px w-px opacity-0" aria-hidden />
        <div ref={track} className="flex gap-5 pl-5 md:gap-8 md:pl-10">
          {list.map((p, i) => (
            <figure key={`${p.slug}-${i}`} className="w-[78vw] shrink-0 will-change-transform md:w-[42vw] lg:w-[34vw]" aria-hidden={i >= featuredProjects.length}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-line bg-bg-elev">
                <Image src={p.image} alt={i < featuredProjects.length ? `${p.title} - preview` : ""} fill sizes="(max-width: 768px) 78vw, 40vw" className="object-cover" draggable={false} />
              </div>
              <figcaption className="mt-4 flex items-baseline justify-between gap-4">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-faint">{p.category}</p>
                  <h3 className="display mt-1 text-2xl md:text-3xl">{p.title}</h3>
                </div>
                <span className="font-mono text-xs text-fg-faint">{String(i % featuredProjects.length + 1).padStart(2, "0")}</span>
              </figcaption>
              <p className="mt-2 max-w-md text-sm text-fg-muted">{p.story}</p>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
