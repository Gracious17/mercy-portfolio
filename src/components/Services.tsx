import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Reveal, Rise } from '@/components/Reveal';
import { SectionLabel } from '@/components/SectionLabel';

const SERVICES = [
  {
    title: 'Social media strategy',
    summary: 'The plan everything else follows.',
    description:
      'Which platforms matter, what to post, how often and why. A roadmap built around your business goals with milestones you can hold me to.',
    deliverables: ['Audit and competitor analysis', 'Content pillar framework', '90 day roadmap', 'KPI definitions'],
  },
  {
    title: 'Content creation',
    summary: 'Posts people stop for.',
    description:
      'Visuals, copy and short-form video in your brand voice, taken from concept to published post without you chasing anyone.',
    deliverables: ['Graphics and carousels', 'Short-form video editing', 'Caption writing', 'Hashtag and keyword research'],
  },
  {
    title: 'Community management',
    summary: 'Followers into advocates.',
    description:
      'Communities are built by showing up every day. I handle comments, DMs and conversations so your audience always hears back.',
    deliverables: ['Comment and DM management', 'Engagement playbook', 'Crisis response protocol', 'Community guidelines'],
  },
  {
    title: 'Paid social',
    summary: 'Ad spend with a reason.',
    description:
      'Campaigns across Meta, TikTok and LinkedIn, from targeting and creative testing to weekly optimisation against cost per result.',
    deliverables: ['Ad creative production', 'Audience segmentation', 'A/B testing framework', 'Budget pacing'],
  },
  {
    title: 'Analytics and reporting',
    summary: 'Numbers you can act on.',
    description:
      'Monthly reports that skip the vanity metrics and end with clear recommendations for the month ahead.',
    deliverables: ['Monthly performance report', 'Growth trend analysis', 'Audience insights', 'Next month plan'],
  },
  {
    title: 'Influencer partnerships',
    summary: 'Reach that feels earned.',
    description:
      'Finding, vetting and managing creators whose audiences overlap with yours, with tracking that shows what each partnership returned.',
    deliverables: ['Creator shortlist and vetting', 'Outreach and negotiation', 'Campaign management', 'Performance tracking'],
  },
];

export function Services() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="services" className="section-py">
      <div className="container-px">
        <div className="mb-14 grid gap-8 md:mb-20 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionLabel index="02" label="Services" className="mb-8" />
            <Rise as="h2" text="What I can take *off your plate.*" className="font-display text-display-lg" />
          </div>
          <Reveal className="self-end lg:col-span-4 lg:col-start-9">
            <p className="text-base leading-relaxed text-muted">
              Hire me for the full picture or for one piece of it. Every engagement starts with
              a short call to work out which.
            </p>
          </Reveal>
        </div>

        <ul className="border-b border-fg/10">
          {SERVICES.map((s, i) => {
            const isOpen = open === i;
            return (
              <Reveal as="li" key={s.title} delay={i * 50} className="border-t border-fg/10">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`service-${i}`}
                  className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 py-7 text-left md:grid-cols-[4rem_1fr_1fr_auto] md:py-9"
                >
                  <span className="tabular text-xs text-muted">0{i + 1}</span>
                  <span
                    className={`font-display text-display-md transition-[transform,color] duration-500 ease-out-quint group-hover:translate-x-2 ${
                      isOpen ? 'text-fg' : 'text-fg/70 group-hover:text-fg'
                    }`}
                  >
                    {s.title}
                  </span>
                  <span className="hidden text-base text-muted md:block">{s.summary}</span>
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-[transform,background-color,border-color,color] duration-500 ease-out-quint ${
                      isOpen ? 'rotate-45 border-fg bg-fg text-canvas no-halo' : 'border-fg/20 group-hover:border-fg'
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </button>

                <div
                  id={`service-${i}`}
                  className="grid transition-[grid-template-rows] duration-700 ease-out-quint"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <div
                      className={`grid gap-8 pb-10 transition-opacity duration-700 md:grid-cols-[4rem_1fr_1fr_auto] md:gap-x-4 ${
                        isOpen ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <span className="hidden md:block" />
                      <p className="max-w-md text-base leading-relaxed text-muted">{s.description}</p>
                      <ul className="space-y-2.5 text-sm">
                        {s.deliverables.map((d) => (
                          <li key={d} className="flex gap-3">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                            {d}
                          </li>
                        ))}
                      </ul>
                      <span className="hidden w-10 md:block" />
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
