import { useState } from 'react';
import { ArrowUpRight, TrendingUp, Eye, Heart, Target } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

const PROJECTS = [
  {
    title: 'Bloom Skincare',
    category: 'Beauty & Wellness',
    image: 'https://images.pexels.com/photos/15595051/pexels-photo-15595051.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: "Rebuilt the brand's Instagram presence from the ground up with an educational content strategy.",
    tags: ['Instagram', 'Content Strategy', 'Community'],
    metrics: [
      { icon: TrendingUp, value: '+340%', label: 'Follower Growth' },
      { icon: Heart, value: '8.2%', label: 'Engagement Rate' },
      { icon: Eye, value: '2.1M', label: 'Monthly Reach' },
    ],
    accent: 'from-rose-500/20 to-azure-500/10',
  },
  {
    title: 'Forge Fitness',
    category: 'Health & Fitness',
    image: 'https://images.pexels.com/photos/4499737/pexels-photo-4499737.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'TikTok-first strategy that turned a local gym into a nationally recognized fitness brand.',
    tags: ['TikTok', 'Video Content', 'Paid Ads'],
    metrics: [
      { icon: TrendingUp, value: '+580%', label: 'Follower Growth' },
      { icon: Eye, value: '4.5M', label: 'Video Views' },
      { icon: Target, value: '12K', label: ' Leads Generated' },
    ],
    accent: 'from-azure-500/20 to-glow-500/10',
  },
  {
    title: 'Atlas Consulting',
    category: 'B2B Services',
    image: 'https://images.pexels.com/photos/7970815/pexels-photo-7970815.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'LinkedIn thought leadership program that positioned the founders as industry authorities.',
    tags: ['LinkedIn', 'Thought Leadership', 'Lead Gen'],
    metrics: [
      { icon: TrendingUp, value: '+220%', label: 'Profile Views' },
      { icon: Target, value: '45+', label: 'Qualified Leads' },
      { icon: Heart, value: '6.5%', label: 'Engagement Rate' },
    ],
    accent: 'from-glow-500/20 to-azure-600/10',
  },
  {
    title: 'Casa Verde',
    category: 'Lifestyle & Home',
    image: 'https://images.pexels.com/photos/15635251/pexels-photo-15635251.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Multi-platform launch campaign for a sustainable home goods brand — from zero to sold-out.',
    tags: ['Instagram', 'Pinterest', 'Launch Campaign'],
    metrics: [
      { icon: TrendingUp, value: '+450%', label: 'Brand Awareness' },
      { icon: Eye, value: '1.8M', label: 'Campaign Reach' },
      { icon: Target, value: '3.2x', label: 'ROAS' },
    ],
    accent: 'from-emerald-500/20 to-azure-500/10',
  },
];

export function Work() {
  const [active, setActive] = useState(0);

  return (
    <section id="work" className="relative section-py overflow-hidden">
      <div className="absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-azure-700/10 blur-[120px]" />

      <div className="container-px mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16">
          <Reveal className="mb-4 flex items-center gap-3">
            <span className="h-px w-12 bg-azure-500" />
            <span className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-azure-400">
              Selected Work
            </span>
          </Reveal>
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <Reveal delay={100}>
              <h2 className="font-display text-display-lg font-bold text-white">
                Results that <span className="text-gradient-blue">speak</span>.
              </h2>
            </Reveal>
            <Reveal variant="right" delay={200}>
              <p className="max-w-sm text-base text-slate-400">
                A selection of brands I've helped grow. Each engagement is unique — these are
                the outcomes, not just the aesthetics.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Project showcase */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Project list - left column */}
          <div className="lg:col-span-4">
            <div className="flex flex-col gap-2">
              {PROJECTS.map((project, i) => (
                <Reveal key={project.title} variant="left" delay={i * 80}>
                  <button
                    onClick={() => setActive(i)}
                    className={`group flex w-full items-center justify-between rounded-xl border p-4 text-left transition-all duration-400 ease-out-quint ${
                      active === i
                        ? 'border-azure-500/30 bg-white/[0.04]'
                        : 'border-white/[0.04] bg-transparent hover:border-white/10 hover:bg-white/[0.02]'
                    }`}
                  >
                    <div>
                      <div
                        className={`font-display text-base font-semibold transition-colors ${
                          active === i ? 'text-white' : 'text-slate-400'
                        }`}
                      >
                        {project.title}
                      </div>
                      <div className="mt-0.5 text-xs text-slate-500">{project.category}</div>
                    </div>
                    <ArrowUpRight
                      className={`h-4 w-4 transition-all duration-300 ${
                        active === i
                          ? 'translate-x-0 -translate-y-0 text-azure-400 opacity-100'
                          : 'text-slate-600 opacity-0 group-hover:opacity-50'
                      }`}
                    />
                  </button>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Project detail - right column */}
          <div className="lg:col-span-8">
            <Reveal variant="right">
              <div
                key={active}
                className="animate-scale-in relative overflow-hidden rounded-2xl border border-white/[0.08]"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={PROJECTS[active].image}
                    alt={PROJECTS[active].title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out-quint"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />

                  {/* Tags */}
                  <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                    {PROJECTS[active].tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full glass px-3 py-1 text-xs font-medium text-slate-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="relative -mt-20 p-6 sm:p-8">
                  <div className={`mb-4 inline-block rounded-lg bg-gradient-to-r ${PROJECTS[active].accent} px-3 py-1 text-xs font-medium text-white`}>
                    {PROJECTS[active].category}
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
                    {PROJECTS[active].title}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-400">
                    {PROJECTS[active].description}
                  </p>

                  {/* Metrics */}
                  <div className="mt-6 grid grid-cols-3 gap-4 border-t border-white/[0.06] pt-6">
                    {PROJECTS[active].metrics.map((metric) => (
                      <div key={metric.label}>
                        <metric.icon className="mb-2 h-4 w-4 text-azure-400" />
                        <div className="font-display text-xl font-bold text-white sm:text-2xl">
                          {metric.value}
                        </div>
                        <div className="mt-0.5 text-[11px] text-slate-500 sm:text-xs">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
