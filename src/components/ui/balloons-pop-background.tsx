import { useEffect, useRef } from 'react';

export type BalloonColor = { base: string; light: string; dark: string };

const DEFAULT_COLORS: BalloonColor[] = [
  { base: '#ff2e63', light: '#ff6b8f', dark: '#9d0b2e' },
  { base: '#00d2ff', light: '#80eaff', dark: '#006a80' },
  { base: '#ffd700', light: '#fff080', dark: '#998100' },
  { base: '#9d50bb', light: '#c089d8', dark: '#4f285e' },
  { base: '#43e97b', light: '#a6f7c1', dark: '#1e6a38' },
  { base: '#ff9a9e', light: '#fecfef', dark: '#cc7a7e' },
  { base: '#00c9ff', light: '#92fe9d', dark: '#00607a' },
];

interface BalloonsPopBackgroundProps {
  className?: string;
  colors?: BalloonColor[];
  /** Balloons on a 1440x900 screen. Scales with viewport area. */
  density?: number;
  /** Balloon fill opacity. */
  opacity?: number;
}

type Particle = { x: number; y: number; size: number; vx: number; vy: number; opacity: number; color: string };

type Balloon = {
  x: number;
  y: number;
  r: number;
  speed: number;
  angle: number;
  wobble: number;
  popped: boolean;
  color: BalloonColor;
  prevX: number;
  tailMidY: number;
  tailEndY: number;
  tailVelMid: number;
  tailVelEnd: number;
};

/**
 * Floating balloons drawn on a full-viewport canvas. Hovering (mouse) or tapping (touch)
 * pops them into a burst of particles. Renders nothing for users who prefer reduced motion.
 */
export function BalloonsPopBackground({
  className = '',
  colors = DEFAULT_COLORS,
  density = 30,
  opacity = 0.92,
}: BalloonsPopBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    const context = canvasEl?.getContext('2d');
    if (!canvasEl || !context) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas: HTMLCanvasElement = canvasEl;
    const ctx: CanvasRenderingContext2D = context;
    const timers = new Set<number>();
    const pointer = { x: -2000, y: -2000 };
    let balloons: Balloon[] = [];
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;

    const pick = () => colors[Math.floor(Math.random() * colors.length)];

    const spawn = (b: Partial<Balloon>, firstLoad: boolean): Balloon => {
      const r = Math.random() * 15 + 30;
      const x = Math.random() * width;
      return Object.assign(b, {
        r,
        x,
        y: firstLoad ? Math.random() * height : height + r + 200,
        color: pick(),
        speed: Math.random() * 1 + 0.4,
        wobble: Math.random() * 0.02 + 0.01,
        angle: Math.random() * Math.PI * 2,
        popped: false,
        prevX: x,
        tailMidY: r + 40,
        tailEndY: r + 120,
        tailVelMid: 0,
        tailVelEnd: 0,
      }) as Balloon;
    };

    const pop = (b: Balloon) => {
      if (b.popped) return;
      b.popped = true;
      for (let i = 0; i < 20; i++) {
        particles.push({
          x: b.x,
          y: b.y,
          color: b.color.base,
          size: Math.random() * 3 + 1,
          vx: (Math.random() - 0.5) * 12,
          vy: (Math.random() - 0.5) * 12,
          opacity: 1,
        });
      }
      const id = window.setTimeout(() => {
        timers.delete(id);
        spawn(b, false);
      }, 1000 + Math.random() * 1000);
      timers.add(id);
    };

    const drawString = (b: Balloon) => {
      const dx = b.x - b.prevX;
      b.prevX = b.x;

      // Spring physics so the string trails and settles behind the drift
      const stiffness = 0.08;
      const damping = 0.85;
      b.tailVelMid = (b.tailVelMid + (b.r + 40 + Math.abs(dx) * 8 - b.tailMidY) * stiffness) * damping;
      b.tailMidY += b.tailVelMid;
      b.tailVelEnd = (b.tailVelEnd + (b.r + 120 + Math.abs(dx) * 14 - b.tailEndY) * stiffness) * damping + 0.35;
      b.tailEndY += b.tailVelEnd;

      const sway = Math.sin(b.angle * 1.8) * 6 + dx * 4;
      ctx.beginPath();
      ctx.moveTo(0, b.r + 5);
      ctx.bezierCurveTo(sway, b.tailMidY * 0.5, -sway, b.tailMidY, sway * 0.6, b.tailEndY);
      ctx.strokeStyle = 'rgba(255,255,255,0.25)';
      ctx.lineWidth = 1.3;
      ctx.stroke();
    };

    const drawBalloon = (b: Balloon) => {
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(Math.sin(b.angle) * 0.06);
      drawString(b);

      const r = b.r;
      ctx.beginPath();
      ctx.moveTo(0, r);
      ctx.bezierCurveTo(-r * 1.2, r * 0.8, -r * 1.3, -r * 1.2, 0, -r * 1.2);
      ctx.bezierCurveTo(r * 1.3, -r * 1.2, r * 1.2, r * 0.8, 0, r);
      ctx.closePath();

      const shade = ctx.createRadialGradient(-r * 0.3, -r * 0.5, r * 0.1, 0, 0, r * 1.5);
      shade.addColorStop(0, b.color.light);
      shade.addColorStop(0.4, b.color.base);
      shade.addColorStop(1, b.color.dark);
      ctx.fillStyle = shade;
      ctx.globalAlpha = opacity;
      ctx.fill();
      ctx.restore();
    };

    const hits = (b: Balloon, x: number, y: number, slack: number) =>
      Math.hypot(b.x - x, b.y - b.r * 0.2 - y) < b.r + slack;

    const populate = () => {
      const count = Math.round(Math.min(Math.max((density * width * height) / (1440 * 900), 10), density * 1.5));
      balloons = Array.from({ length: count }, () => spawn({}, true));
    };

    const resize = () => {
      const widthChanged = window.innerWidth !== width;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Mobile URL bars change only the height while scrolling; keep the balloons where they are
      if (widthChanged) populate();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles = particles.filter((p) => p.opacity > 0);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.2;
        p.opacity -= 0.025;
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      for (const b of balloons) {
        if (b.popped) continue;
        b.y -= b.speed;
        b.angle += b.wobble;
        b.x += Math.sin(b.angle * 0.6) * 0.8;
        if (hits(b, pointer.x, pointer.y, 10)) pop(b);
        if (b.y < -b.r - 200) spawn(b, false);
        if (!b.popped) drawBalloon(b);
      }

      frame = requestAnimationFrame(animate);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };
    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') return;
      balloons.forEach((b) => !b.popped && hits(b, e.clientX, e.clientY, 18) && pop(b));
    };
    const onMouseLeave = () => {
      pointer.x = -2000;
      pointer.y = -2000;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    document.documentElement.addEventListener('mouseleave', onMouseLeave);

    resize();
    animate();

    return () => {
      cancelAnimationFrame(frame);
      timers.forEach((id) => clearTimeout(id));
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [colors, density, opacity]);

  return (
    <div className={`pointer-events-none fixed inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
