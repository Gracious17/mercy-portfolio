import { useEffect, useState } from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { Rise } from '@/components/Reveal';
import { Portrait } from '@/components/Portrait';
import { onAnchorClick } from '@/lib/scroll';
import { useZonedTime } from '@/hooks/useScrollAnimations';

export function Hero() {
  const time = useZonedTime('Africa/Lagos');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  // Entrance for the supporting copy, staggered after the headline
  const fadeIn = (delay: number, className = '') => ({
    className: `transition-[opacity,transform] duration-1000 ease-out-quint ${
      mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
    } ${className}`,
    style: { transitionDelay: `${delay}ms` },
  });

  return (
    <section id="home" className="relative flex min-h-[100svh] flex-col pb-10 pt-20 md:pt-28">
      <div className="container-px flex flex-1 flex-col">
        {/* Meta row */}
        <div
          {...fadeIn(0, 'grid grid-cols-2 gap-y-2 border-b border-fg/10 pb-4 text-[0.6875rem] uppercase tracking-[0.14em] text-muted sm:pb-5 sm:text-xs sm:tracking-[0.16em] lg:grid-cols-4 lg:gap-x-6')}
        >
          <span>Social media manager</span>
          <span className="text-right lg:text-left">Brand strategist</span>
          <span>
            Lagos <span className="tabular text-fg">{time}</span>
          </span>
          <span className="flex items-center justify-end gap-2 lg:justify-start">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Booking Q4 2026
          </span>
        </div>

        <div className="grid flex-1 gap-10 pt-10 sm:gap-12 sm:pt-12 lg:grid-cols-12 lg:gap-10 lg:pt-16">
          {/* Copy */}
          <div className="flex flex-col justify-between gap-10 sm:gap-12 lg:col-span-7 lg:pb-10">
            <Rise
              as="h1"
              immediate
              accent
              delay={150}
              stagger={70}
              text="Social media that earns *attention.*"
              className="font-display text-[clamp(3.25rem,13vw,5.75rem)] leading-[0.9] tracking-[-0.035em] lg:text-[clamp(4.5rem,8.5vw,9.5rem)]"
            />

            <div className="grid gap-8 lg:gap-7">
              <p {...fadeIn(650, 'max-w-md text-base leading-relaxed text-muted sm:text-lg')}>
                I help brands grow on social with clear strategy, consistent content and reporting
                that ties every post back to a business goal.
              </p>
              {/* Full-width stacked buttons on phones, inline from small tablets up */}
              <div {...fadeIn(800, 'grid gap-3 sm:flex sm:flex-wrap')}>
                <a href="#contact" onClick={onAnchorClick('contact')} className="btn btn-solid">
                  Book a strategy call
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a href="#work" onClick={onAnchorClick('work')} className="btn btn-outline">
                  See the work
                  <ArrowDownRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Portrait: revealed on mount like the headline, since it is always above the fold */}
          {/* On desktop the width is capped so a 4:5 portrait plus caption always fits the viewport height */}
          <figure className="w-full lg:col-span-5 lg:col-start-8 lg:max-w-[calc((100svh-19rem)*0.8)] lg:self-end lg:justify-self-end">
            <div
              className={`reveal-image relative overflow-hidden border border-fg/10 bg-surface ${mounted ? 'is-visible' : ''}`}
              style={{ transitionDelay: '250ms' }}
            >
              <Portrait eager className="aspect-[4/5] w-full sm:aspect-[4/3] lg:aspect-[4/5]" />
              <span
                {...fadeIn(1200, 'no-halo absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-canvas/80 px-3.5 py-2 text-xs text-fg backdrop-blur-md')}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Taking on new clients
              </span>
            </div>
            <figcaption {...fadeIn(1100, 'mt-4 flex items-baseline justify-between text-xs uppercase tracking-[0.16em] text-muted')}>
              <span>Mercy Ubachukwu</span>
              <span>Three years in social</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
