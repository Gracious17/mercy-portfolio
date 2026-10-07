import { useState } from 'react';
import { Reveal, Rise } from '@/components/Reveal';
import { SectionLabel } from '@/components/SectionLabel';

const TESTIMONIALS = [
  {
    quote:
      'Within four months our Instagram engagement went from 1.2% to 7.8%. Mercy doesn’t just post. She plans, measures and delivers.',
    author: 'Sarah Chen',
    role: 'Founder, Bloom Skincare',
  },
  {
    quote:
      'She took our scattered efforts and turned them into a strategy we could actually follow. Our TikTok went from 800 followers to 15,000 in three months.',
    author: 'Marcus Reid',
    role: 'Owner, Forge Fitness',
  },
  {
    quote:
      'The rare social media manager who understands business goals. She tied our LinkedIn to the sales pipeline and brought in 45 qualified leads in a quarter.',
    author: 'David Okafor',
    role: 'Partner, Atlas Consulting',
  },
  {
    quote:
      'Zero to sold out in eight weeks. The launch was so precise we couldn’t keep up with demand.',
    author: 'Elena Rossi',
    role: 'Co-founder, Casa Verde',
  },
];

const DURATION = 8000;

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = () => setCurrent((c) => (c + 1) % TESTIMONIALS.length);

  // Pause for a mouse hover or keyboard focus only. A tap on a phone fires both
  // events and would otherwise freeze the rotation for good.
  return (
    <section
      id="testimonials"
      className="section-py border-t border-fg/10"
      onPointerEnter={(e) => e.pointerType === 'mouse' && setPaused(true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && setPaused(false)}
      onFocus={(e) => e.target.matches(':focus-visible') && setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="container-px">
        <div className="mb-12 md:mb-20">
          <SectionLabel index="05" label="Clients" className="mb-8" />
          <Rise as="h2" text="In their *words.*" className="font-display text-display-lg" />
        </div>

        <div className="grid gap-10 sm:gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Quotes are stacked in one grid cell so the block keeps the height of the longest */}
          <Reveal className="grid lg:col-span-8">
            {TESTIMONIALS.map((t, i) => (
              <figure
                key={t.author}
                aria-hidden={i !== current}
                // Outgoing quote fades quickly; the incoming one waits for it so the two never overlap
                className={`col-start-1 row-start-1 transition-[opacity,transform] ease-out-quint ${
                  i === current
                    ? 'translate-y-0 opacity-100 delay-300 duration-700'
                    : 'pointer-events-none -translate-y-2 opacity-0 duration-300'
                }`}
              >
                <blockquote className="font-display text-[clamp(1.85rem,3.6vw,3.25rem)] leading-[1.12] tracking-[-0.015em]">
                  <span className="text-accent">&ldquo;</span>
                  {t.quote}
                  <span className="text-accent">&rdquo;</span>
                </blockquote>
                <figcaption className="mt-8 text-sm sm:mt-10">
                  <span className="text-fg">{t.author}</span>
                  <span className="text-muted">, {t.role}</span>
                </figcaption>
              </figure>
            ))}
          </Reveal>

          <Reveal delay={120} className="lg:col-span-3 lg:col-start-10">
            {/* Two-up grid on phones keeps the selector short; a single column beside the quote on desktop */}
            <ul className="grid grid-cols-2 gap-x-5 lg:grid-cols-1 lg:border-b lg:border-fg/10" aria-label="Choose a testimonial">
              {TESTIMONIALS.map((t, i) => {
                const active = i === current;
                return (
                  <li key={t.author} className="relative border-t border-fg/10">
                    <button
                      onClick={() => setCurrent(i)}
                      aria-pressed={active}
                      className={`w-full py-4 text-left transition-colors duration-300 lg:py-5 ${
                        active ? 'text-fg' : 'text-muted hover:text-fg'
                      }`}
                    >
                      <span className="block text-sm sm:text-base">{t.author}</span>
                      <span className="mt-1 block text-xs text-muted">{t.role}</span>
                    </button>
                    {active && (
                      <span
                        key={current}
                        onAnimationEnd={next}
                        className="absolute -top-px left-0 h-px w-full origin-left bg-accent"
                        style={{
                          animation: `progress ${DURATION}ms linear forwards`,
                          animationPlayState: paused ? 'paused' : 'running',
                        }}
                        aria-hidden="true"
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
