import { TrendingUp, Users, Clock, Award } from 'lucide-react';
import { useReveal, useCountUp } from '@/hooks/useScrollAnimations';

const STATS = [
  { icon: TrendingUp, value: 5, suffix: 'M+', label: 'Total Reach Generated', sublabel: 'Across all platforms' },
  { icon: Users, value: 40, suffix: '+', label: 'Brands Scaled', sublabel: 'From startups to established' },
  { icon: Clock, value: 6, suffix: ' yrs', label: 'Experience', sublabel: 'In social media management' },
  { icon: Award, value: 120, suffix: '+', label: 'Campaigns Launched', sublabel: 'With measurable outcomes' },
];

export function Stats() {
  const { ref, isVisible } = useReveal<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section className="relative border-y border-white/[0.05] bg-ink-900/40 py-20 md:py-28">
      <div className="absolute inset-0 bg-gradient-to-r from-azure-900/10 via-transparent to-glow-600/10" />

      <div ref={ref} className="container-px relative z-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <StatItem key={stat.label} {...stat} start={isVisible} delay={i * 150} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({
  icon: Icon,
  value,
  suffix,
  label,
  sublabel,
  start,
  delay,
}: {
  icon: typeof TrendingUp;
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
  start: boolean;
  delay: number;
}) {
  const count = useCountUp(value, 2000, start);

  return (
    <div
      className={`text-center transition-all duration-700 ease-out-quint ${
        start ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-azure-500/10 text-azure-400">
        <Icon className="h-5 w-5" />
      </div>
      <div className="font-display text-4xl font-bold text-white sm:text-5xl">
        {count}
        <span className="text-gradient-blue">{suffix}</span>
      </div>
      <div className="mt-2 text-sm font-medium text-slate-300">{label}</div>
      <div className="mt-0.5 text-xs text-slate-600">{sublabel}</div>
    </div>
  );
}
