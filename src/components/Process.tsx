import { useEffect, useRef, useState } from 'react';
import { Reveal, Rise } from '@/components/Reveal';
import { SectionLabel } from '@/components/SectionLabel';

const STEPS = [
  {
    title: 'Discovery and audit',
    when: 'Week 1',
    description:
      'A close look at your brand, audience, competitors and current accounts. I find the gaps and the quick wins before touching a single post.',
    items: ['Brand audit', 'Competitor analysis', 'Audience research', 'Platform assessment'],
  },
  {
    title: 'Strategy and planning',
    when: 'Week 2',
    description:
      'A written strategy covering content pillars, cadence, tone of voice and growth tactics, signed off by you before anything goes live.',
    items: ['Content pillars', 'Editorial calendar', 'Voice and tone guide', 'Growth roadmap'],
  },
  {
    title: 'Execution and launch',
    when: 'Week 3 onward',
    description:
      'Content goes live. I run production, scheduling, publishing and community so quality holds steady across every platform.',
    items: ['Content production', 'Scheduling', 'Community engagement', 'Live optimisation'],
  },
  {
    title: 'Measure and refine',
    when: 'Every month',
    description:
      'A monthly report with clear numbers and clear recommendations. We double down on what works and cut what doesn’t.',
    items: ['Performance report', 'Data analysis', 'Strategy refinement', 'Quarterly review'],
  },
];

export function Process() {
  const listRef = useRef<HTMLOListElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [reached, setReached] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const list = listRef.current;
      if (!list) return;
      const trigger = window.innerHeight * 0.62;
      const rect = list.getBoundingClientRect();
      const progress = Math.min(Math.max((trigger - rect.top) / rect.height, 0), 1);
      if (lineRef.current) lineRef.current.style.transform = `scaleY(${progress})`;
      setReached(stepRefs.current.filter((el) => el && el.getBoundingClientRect().top < trigger).length);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section id="process" className="section-py border-t border-fg/10">
      <div className="container-px grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionLabel index="04" label="Process" className="mb-8" />
            <Rise as="h2" text="How we'll *work together.*" className="font-display text-display-lg" />
            <Reveal delay={150}>
              <p className="mt-8 max-w-sm text-base leading-relaxed text-muted">
                Four stages, no guesswork. You'll always know what is happening, what comes
                next and why.
              </p>
            </Reveal>
          </div>
        </div>

        <ol ref={listRef} className="relative lg:col-span-6 lg:col-start-7">
          {/* Progress rail */}
          <span className="absolute bottom-0 left-0 top-0 w-px bg-fg/10" aria-hidden="true" />
          <span
            ref={lineRef}
            className="absolute bottom-0 left-0 top-0 w-px origin-top bg-accent"
            style={{ transform: 'scaleY(0)' }}
            aria-hidden="true"
          />

          {STEPS.map((step, i) => {
            const active = i < reached;
            return (
              <li
                key={step.title}
                ref={(el) => (stepRefs.current[i] = el)}
                className={`relative pb-14 pl-8 transition-opacity sm:pb-20 sm:pl-10 duration-700 last:pb-0 md:pl-14 ${
                  active ? 'opacity-100' : 'opacity-[0.35]'
                }`}
              >
                <span
                  className={`absolute left-0 top-3 h-2.5 w-2.5 -translate-x-1/2 rounded-full border transition-colors duration-500 ${
                    active ? 'border-accent bg-accent' : 'border-fg/30 bg-canvas'
                  }`}
                  aria-hidden="true"
                />
                <div className="flex items-baseline justify-between gap-4 text-xs uppercase tracking-[0.16em] text-muted">
                  <span className="tabular">Step 0{i + 1}</span>
                  <span>{step.when}</span>
                </div>
                <h3 className="mt-4 font-display text-display-md">{step.title}</h3>
                <p className="mt-4 max-w-md text-base leading-relaxed text-muted">{step.description}</p>
                <p className="mt-5 text-sm text-fg/80">{step.items.join(', ')}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
