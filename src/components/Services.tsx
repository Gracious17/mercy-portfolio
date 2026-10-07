import { useState } from 'react';
import {
  LayoutGrid,
  PenTool,
  BarChart3,
  Users,
  Megaphone,
  Camera,
  ArrowUpRight,
} from 'lucide-react';
import { Reveal } from '@/components/Reveal';

const SERVICES = [
  {
    icon: LayoutGrid,
    title: 'Social Media Strategy',
    description:
      'A comprehensive roadmap tailored to your brand — platform selection, posting cadence, content pillars, and growth milestones that align with business goals.',
    deliverables: ['Audit & competitive analysis', 'Content pillar framework', '90-day roadmap', 'KPI definition'],
  },
  {
    icon: PenTool,
    title: 'Content Creation',
    description:
      'Scroll-stopping visuals, compelling copy, and video content that captures your brand voice. From concept to published post, fully managed.',
    deliverables: ['Graphic design & carousels', 'Short-form video editing', 'Caption writing', 'Hashtag research'],
  },
  {
    icon: BarChart3,
    title: 'Analytics & Reporting',
    description:
      'Monthly performance reports that go beyond vanity metrics. I translate data into clear, actionable recommendations for what to do next.',
    deliverables: ['Monthly performance dashboards', 'Growth trend analysis', 'Audience insights', 'Actionable recommendations'],
  },
  {
    icon: Users,
    title: 'Community Management',
    description:
      'Building a loyal community means showing up daily. I handle comments, DMs, and engagement to turn passive followers into active advocates.',
    deliverables: ['Comment & DM management', 'Engagement strategy', 'Crisis response protocols', 'Community guidelines'],
  },
  {
    icon: Megaphone,
    title: 'Paid Social Campaigns',
    description:
      'Targeted ad campaigns across Meta, TikTok, and LinkedIn. From audience targeting to creative testing to optimization — done right.',
    deliverables: ['Ad creative production', 'Audience targeting & segmentation', 'A/B testing framework', 'Budget optimization'],
  },
  {
    icon: Camera,
    title: 'Influencer Collaboration',
    description:
      'Identifying, vetting, and managing influencer partnerships that deliver authentic reach and measurable ROI for your brand.',
    deliverables: ['Influencer identification & vetting', 'Outreach & negotiation', 'Campaign management', 'Performance tracking'],
  },
];

export function Services() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="services" className="relative section-py overflow-hidden bg-ink-900/30">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern bg-[size:80px_80px] opacity-20" />
      <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-azure-500/30 to-transparent" />

      <div className="container-px relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal className="mb-4 flex items-center gap-3">
              <span className="h-px w-12 bg-azure-500" />
              <span className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-azure-400">
                Services
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="font-display text-display-lg font-bold text-white">
                Everything your brand
                <br />
                needs to <span className="text-gradient-blue">show up right</span>.
              </h2>
            </Reveal>
          </div>
          <Reveal variant="right" delay={200}>
            <p className="max-w-sm text-base text-slate-400">
              Full-service social media management or project-based engagements — scaled to
              your needs, priced for your budget.
            </p>
          </Reveal>
        </div>

        {/* Service grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <Reveal key={service.title} variant="up" delay={i * 80}>
              <div
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className={`group relative h-full overflow-hidden rounded-2xl border p-7 transition-all duration-500 ease-out-quint ${
                  hovered === i
                    ? 'border-azure-500/30 bg-white/[0.04]'
                    : 'border-white/[0.06] bg-white/[0.02]'
                }`}
              >
                {/* Glow on hover */}
                <div
                  className={`absolute -right-20 -top-20 h-40 w-40 rounded-full bg-azure-500/10 blur-3xl transition-opacity duration-500 ${
                    hovered === i ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                {/* Number */}
                <div className="absolute right-6 top-6 font-display text-5xl font-bold text-white/[0.04] transition-colors duration-500 group-hover:text-azure-500/10">
                  0{i + 1}
                </div>

                {/* Icon */}
                <div className="relative mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-azure-500/20 to-azure-700/10 text-azure-400 transition-all duration-500 ease-out-quint group-hover:from-azure-500/30 group-hover:to-glow-500/20 group-hover:text-azure-300">
                    <service.icon className="h-5 w-5" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="relative mb-3 font-display text-xl font-semibold text-white">
                  {service.title}
                </h3>
                <p className="relative mb-5 text-sm leading-relaxed text-slate-400">
                  {service.description}
                </p>

                {/* Deliverables - reveal on hover */}
                <div
                  className={`relative overflow-hidden transition-all duration-500 ease-out-quint ${
                    hovered === i ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="border-t border-white/[0.06] pt-4">
                    <ul className="space-y-2">
                      {service.deliverables.map((d) => (
                        <li key={d} className="flex items-center gap-2 text-xs text-slate-400">
                          <span className="h-1 w-1 rounded-full bg-azure-400" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Arrow indicator */}
                <div
                  className={`relative mt-5 flex items-center gap-1.5 text-sm font-medium text-azure-400 transition-all duration-300 ${
                    hovered === i ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'
                  }`}
                >
                  Learn more
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
