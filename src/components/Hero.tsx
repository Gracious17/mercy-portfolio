import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Sparkles, TrendingUp, MousePointerClick } from 'lucide-react';
import { useMousePosition } from '@/hooks/useScrollAnimations';

const FLOATING_TAGS = [
  { label: 'Instagram', x: '8%', y: '22%', delay: 0 },
  { label: 'TikTok', x: '85%', y: '18%', delay: 0.5 },
  { label: 'LinkedIn', x: '5%', y: '68%', delay: 1 },
  { label: 'Content Strategy', x: '82%', y: '65%', delay: 1.5 },
  { label: 'Brand Growth', x: '15%', y: '45%', delay: 0.8 },
  { label: 'Analytics', x: '78%', y: '42%', delay: 1.2 },
];

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const mouse = useMousePosition();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const getParallax = (depth: number) => {
    if (!heroRef.current) return { x: 0, y: 0 };
    const rect = heroRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    return {
      x: ((mouse.x - cx) / rect.width) * depth,
      y: ((mouse.y - cy) / rect.height) * depth,
    };
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden bg-ink-950 pt-32 pb-20"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid-pattern bg-[size:60px_60px] opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-950/50 to-ink-900" />

      {/* Animated radial glows */}
      <div
        className="absolute left-[20%] top-[30%] h-[500px] w-[500px] rounded-full bg-azure-600/15 blur-[120px]"
        style={{ transform: `translate(${getParallax(30).x}px, ${getParallax(30).y}px)` }}
      />
      <div
        className="absolute right-[15%] bottom-[20%] h-[400px] w-[400px] rounded-full bg-glow-500/10 blur-[100px]"
        style={{ transform: `translate(${getParallax(-20).x}px, ${getParallax(-20).y}px)` }}
      />

      {/* Floating platform tags */}
      {FLOATING_TAGS.map((tag, i) => (
        <div
          key={tag.label}
          className="pointer-events-none absolute z-10 hidden md:block"
          style={{ left: tag.x, top: tag.y }}
        >
          <div
            className="animate-float rounded-full glass px-4 py-2 text-xs font-medium text-slate-300"
            style={{ animationDelay: `${tag.delay}s` }}
          >
            <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-azure-400" />
            {tag.label}
          </div>
        </div>
      ))}

      {/* Content */}
      <div className="container-px relative z-20 mx-auto flex min-h-[calc(100vh-8rem)] max-w-7xl flex-col items-center justify-center text-center">
        {/* Availability badge */}
        <div
          className={`mb-8 transition-all duration-700 ease-out-quint ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <div className="inline-flex items-center gap-2.5 rounded-full glass px-4 py-2 text-xs font-medium text-slate-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-green-400" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>
            Available for new clients — Q4 2026
          </div>
        </div>

        {/* Headline */}
        <h1
          className={`font-display text-display-2xl font-bold tracking-tight transition-all duration-1000 ease-out-quint ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
          style={{ transitionDelay: '100ms' }}
        >
          <span className="text-gradient">Social media</span>
          <br />
          <span className="text-white">that earns </span>
          <span className="text-gradient-blue bg-gradient-animate">attention</span>
        </h1>

        {/* Subheadline */}
        <p
          className={`mt-8 max-w-2xl text-lg leading-relaxed text-slate-400 transition-all duration-1000 ease-out-quint sm:text-xl ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          I'm <span className="font-medium text-white">Mercy Ubachukwu</span> — a social media
          manager helping brands grow with intention, not noise. Strategy-led content,
          data-driven decisions, and campaigns that convert followers into customers.
        </p>

        {/* CTAs */}
        <div
          className={`mt-10 flex flex-col items-center gap-4 transition-all duration-1000 ease-out-quint sm:flex-row ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
          style={{ transitionDelay: '500ms' }}
        >
          <a href="#work" className="btn-primary group">
            View Selected Work
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a href="#contact" className="btn-ghost group">
            Book a Strategy Call
            <Sparkles className="h-4 w-4 text-azure-400 transition-transform duration-300 group-hover:rotate-12" />
          </a>
        </div>

        {/* Quick stats */}
        <div
          className={`mt-16 grid w-full max-w-2xl grid-cols-3 gap-4 transition-all duration-1000 ease-out-quint sm:gap-8 ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
          style={{ transitionDelay: '700ms' }}
        >
          {[
            { value: '120+', label: 'Campaigns Launched', icon: TrendingUp },
            { value: '5M+', label: 'Reach Generated', icon: Sparkles },
            { value: '40+', label: 'Brands Scaled', icon: ArrowUpRight },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <stat.icon className="mx-auto mb-2 h-4 w-4 text-azure-400/70" />
              <div className="font-display text-2xl font-bold text-white sm:text-3xl">
                {stat.value}
              </div>
              <div className="mt-1 text-xs text-slate-500 sm:text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 z-20 -translate-x-1/2 transition-all duration-1000 ${
          mounted ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transitionDelay: '1000ms' }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-slate-600">Scroll</span>
          <div className="flex h-9 w-5 justify-center rounded-full border border-white/15 pt-1.5">
            <div className="h-1.5 w-1 animate-bounce-subtle rounded-full bg-azure-400" />
          </div>
        </div>
      </div>

      {/* Decorative cursor hint - subtle */}
      <div className="pointer-events-none absolute bottom-8 right-8 z-20 hidden items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-slate-700 lg:flex">
        <MousePointerClick className="h-3 w-3" />
        Move to explore
      </div>
    </section>
  );
}
