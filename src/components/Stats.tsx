import { useCountUp, useReveal } from '@/hooks/useScrollAnimations';

const STATS = [
  { value: 5, suffix: 'M', label: 'People reached across client accounts' },
  { value: 40, suffix: '+', label: 'Brands managed, from startups to established names' },
  { value: 120, suffix: '+', label: 'Campaigns launched with measurable goals' },
  { value: 6, suffix: ' yrs', label: 'Working in social media' },
];

// Hairline dividers for a 2x2 grid on mobile that becomes a single row on desktop
const CELL_BORDERS = [
  'pr-6',
  'border-l pl-6 md:pl-10',
  'border-t pr-6 lg:border-l lg:border-t-0 lg:pl-10',
  'border-l border-t pl-6 md:pl-10 lg:border-t-0',
];

export function Stats() {
  const { ref, isVisible } = useReveal<HTMLDivElement>({ threshold: 0.35 });

  return (
    <section aria-label="Track record" className="border-y border-fg/10 bg-surface">
      <div ref={ref} className="container-px grid grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <Stat key={stat.label} {...stat} index={i} start={isVisible} />
        ))}
      </div>
    </section>
  );
}

function Stat({
  value,
  suffix,
  label,
  index,
  start,
}: {
  value: number;
  suffix: string;
  label: string;
  index: number;
  start: boolean;
}) {
  const count = useCountUp(value, 1800, start);

  return (
    <div className={`flex flex-col justify-between gap-10 border-fg/10 py-12 md:py-16 ${CELL_BORDERS[index]}`}>
      <div className="tabular font-display text-[clamp(3.5rem,7vw,6.5rem)] leading-none tracking-[-0.03em]">
        {count}
        <span className="text-accent">{suffix}</span>
      </div>
      <p
        className={`max-w-[16rem] text-sm leading-relaxed text-muted transition-opacity duration-1000 ${
          start ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transitionDelay: `${300 + index * 120}ms` }}
      >
        {label}
      </p>
    </div>
  );
}
