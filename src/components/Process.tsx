import { Search, PenTool, Rocket, LineChart } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

const STEPS = [
  {
    icon: Search,
    title: 'Discovery & Audit',
    duration: 'Week 1',
    description:
      'Deep dive into your brand, audience, competitors, and current social presence. I identify gaps, opportunities, and quick wins before touching a single post.',
    items: ['Brand audit', 'Competitor analysis', 'Audience research', 'Platform assessment'],
  },
  {
    icon: PenTool,
    title: 'Strategy & Planning',
    duration: 'Week 2',
    description:
      'A documented strategy that covers content pillars, posting cadence, tone of voice, and growth tactics — aligned with your business objectives.',
    items: ['Content pillars', 'Editorial calendar', 'Voice & tone guide', 'Growth roadmap'],
  },
  {
    icon: Rocket,
    title: 'Execution & Launch',
    duration: 'Week 3+',
    description:
      'Content goes live. I manage creation, scheduling, publishing, and community engagement — maintaining quality and consistency across every platform.',
    items: ['Content production', 'Scheduling & publishing', 'Community engagement', 'Real-time optimization'],
  },
  {
    icon: LineChart,
    title: 'Measure & Optimize',
    duration: 'Ongoing',
    description:
      "Monthly reports with clear metrics and recommendations. I double down on what works, cut what doesn't, and continuously refine the approach.",
    items: ['Performance reports', 'Data analysis', 'Strategy refinement', 'Quarterly reviews'],
  },
];

export function Process() {
  return (
    <section id="process" className="relative section-py overflow-hidden bg-ink-900/30">
      <div className="absolute inset-0 bg-grid-pattern bg-[size:80px_80px] opacity-20" />

      <div className="container-px relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-20 text-center">
          <Reveal className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-azure-500" />
            <span className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-azure-400">
              Process
            </span>
            <span className="h-px w-12 bg-azure-500" />
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-display text-display-lg font-bold text-white">
              How we'll <span className="text-gradient-blue">work together</span>.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mx-auto mt-4 max-w-xl text-base text-slate-400">
              A clear, proven process — no guesswork, no surprises. You'll always know what's
              happening and why.
            </p>
          </Reveal>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line - desktop */}
          <div className="absolute left-0 right-0 top-[44px] hidden h-px bg-gradient-to-r from-transparent via-azure-500/30 to-transparent lg:block" />

          <div className="grid gap-8 lg:grid-cols-4 lg:gap-6">
            {STEPS.map((step, i) => (
              <Reveal key={step.title} variant="up" delay={i * 120}>
                <div className="group relative">
                  {/* Step number circle */}
                  <div className="relative z-10 mb-6 flex items-center gap-4 lg:block">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-azure-500/30 bg-ink-900 text-azure-400 transition-all duration-500 ease-out-quint group-hover:border-azure-400 group-hover:bg-azure-500/10 group-hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.5)]">
                      <step.icon className="h-5 w-5" />
                    </div>
                    <span className="font-display text-xs font-semibold uppercase tracking-wider text-slate-500 lg:absolute lg:top-3 lg:left-16">
                      {step.duration}
                    </span>
                  </div>

                  {/* Card */}
                  <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-500 ease-out-quint group-hover:border-azure-500/20 group-hover:bg-white/[0.04]">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="font-display text-3xl font-bold text-white/[0.06] transition-colors group-hover:text-azure-500/15">
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="mb-3 font-display text-lg font-semibold text-white">
                      {step.title}
                    </h3>
                    <p className="mb-4 text-sm leading-relaxed text-slate-400">
                      {step.description}
                    </p>
                    <ul className="space-y-2">
                      {step.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-xs text-slate-500">
                          <span className="h-1 w-1 rounded-full bg-azure-400" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
