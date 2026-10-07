import { Check, Quote } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

const PHILOSOPHIES = [
  'Strategy before aesthetics',
  'Data validates creativity',
  'Consistency builds trust',
  'Engagement over vanity metrics',
];

const SKILLS = [
  { label: 'Content Strategy', level: 95 },
  { label: 'Community Management', level: 90 },
  { label: 'Paid Social Campaigns', level: 85 },
  { label: 'Brand Storytelling', level: 92 },
  { label: 'Analytics & Reporting', level: 88 },
  { label: 'Influencer Collaboration', level: 80 },
];

export function About() {
  return (
    <section id="about" className="relative section-py overflow-hidden">
      {/* Background accents */}
      <div className="absolute left-0 top-1/4 h-px w-full bg-gradient-to-r from-transparent via-azure-500/20 to-transparent" />
      <div className="absolute -right-32 top-1/2 h-96 w-96 rounded-full bg-azure-700/10 blur-[120px]" />

      <div className="container-px mx-auto max-w-7xl">
        {/* Section label */}
        <Reveal className="mb-16 flex items-center gap-3">
          <span className="h-px w-12 bg-azure-500" />
          <span className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-azure-400">
            About
          </span>
        </Reveal>

        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left: Image + quote card */}
          <Reveal variant="left" className="relative">
            <div className="relative">
              {/* Main image */}
              <div className="relative overflow-hidden rounded-2xl border border-white/[0.08]">
                <img
                  src="https://images.pexels.com/photos/36819484/pexels-photo-36819484.jpeg?auto=compress&cs=tinysrgb&h=900&w=700"
                  alt="Mercy Ubachukwu — Social Media Manager"
                  className="aspect-[4/5] w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />

                {/* Name overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="font-display text-2xl font-bold text-white">
                    Mercy Ubachukwu
                  </div>
                  <div className="mt-1 text-sm text-azure-300">
                    Social Media Manager & Brand Strategist
                  </div>
                </div>
              </div>

              {/* Floating quote card */}
              <div className="absolute -bottom-8 -right-4 max-w-xs rounded-2xl glass-dark p-5 shadow-2xl sm:-right-8">
                <Quote className="mb-3 h-5 w-5 text-azure-400" />
                <p className="text-sm leading-relaxed text-slate-300">
                  "Good content gets seen. Great content gets remembered. I build for the
                  latter."
                </p>
              </div>

              {/* Decorative frame */}
              <div className="absolute -left-4 -top-4 h-24 w-24 rounded-tl-2xl border-l-2 border-t-2 border-azure-500/30" />
            </div>
          </Reveal>

          {/* Right: Story + philosophy + skills */}
          <div className="flex flex-col justify-center gap-10">
            <Reveal variant="right">
              <h2 className="font-display text-display-md font-bold text-white">
                I turn scrolling into{' '}
                <span className="text-gradient-blue">stopping</span>.
              </h2>
            </Reveal>

            <Reveal variant="right" delay={100}>
              <div className="space-y-4 text-base leading-relaxed text-slate-400">
                <p>
                  For over six years, I've helped brands find their voice in the crowded world
                  of social media. From solo founders to established companies, my approach
                  stays the same — understand the audience, craft the message, and let the
                  data guide what comes next.
                </p>
                <p>
                  I don't chase trends. I study them, adapt what works, and discard what
                  doesn't. Every post, every campaign, every story is a deliberate step toward
                  a business outcome — not just a feed that looks nice.
                </p>
              </div>
            </Reveal>

            {/* Philosophy pills */}
            <Reveal variant="up" delay={200}>
              <div className="flex flex-wrap gap-3">
                {PHILOSOPHIES.map((p) => (
                  <div
                    key={p}
                    className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-2 text-sm text-slate-300 transition-colors hover:border-azure-500/30 hover:text-white"
                  >
                    <Check className="h-3.5 w-3.5 text-azure-400" />
                    {p}
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Skill bars */}
            <Reveal variant="up" delay={300}>
              <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
                {SKILLS.map((skill) => (
                  <SkillBar key={skill.label} {...skill} />
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillBar({ label, level }: { label: string; level: number }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-slate-300">{label}</span>
        <span className="text-xs text-slate-500">{level}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink-700">
        <div
          className="h-full rounded-full bg-gradient-to-r from-azure-500 to-glow-400 transition-[width] duration-1000 ease-out-quint"
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
}
