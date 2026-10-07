import { Reveal, Rise } from '@/components/Reveal';
import { SectionLabel } from '@/components/SectionLabel';

const PRINCIPLES = [
  { title: 'Strategy before aesthetics', body: 'A beautiful feed that sells nothing is decoration. Every post earns its place.' },
  { title: 'Data settles arguments', body: 'Creative instinct sets the direction. Numbers decide what stays.' },
  { title: 'Consistency builds trust', body: 'Audiences return to brands that show up on schedule, in a voice they recognise.' },
  { title: 'Engagement over vanity', body: 'Saves, replies and clicks tell me more than follower counts ever will.' },
];

const CAPABILITIES = [
  'Content strategy',
  'Community management',
  'Paid social',
  'Brand storytelling',
  'Analytics and reporting',
  'Influencer partnerships',
];

export function About() {
  return (
    <section id="about" className="section-py">
      <div className="container-px">
        <SectionLabel index="01" label="About" className="mb-14 md:mb-20" />

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Rise
                as="h2"
                text="I turn scrolling into *stopping.*"
                className="font-display text-display-lg"
              />
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <p className="text-2xl leading-snug md:text-[1.75rem]">
                For six years I've helped founders and established companies find a voice on
                social that people actually listen to.
              </p>
            </Reveal>
            <Reveal delay={100} className="mt-8 space-y-5 text-base leading-relaxed text-muted">
              <p>
                The approach doesn't change with the size of the brand. Understand the audience,
                shape the message, then let the data tell us what to do next.
              </p>
              <p>
                I don't chase trends. I study them, keep what fits the brand and drop what
                doesn't. The result is a feed that moves people toward a decision, not one that
                only looks good in a grid.
              </p>
            </Reveal>

            <ol className="mt-16 border-b border-fg/10">
              {PRINCIPLES.map((p, i) => (
                <Reveal as="li" key={p.title} delay={i * 70} className="grid grid-cols-[3rem_1fr] gap-x-4 border-t border-fg/10 py-6">
                  <span className="tabular pt-1 text-xs text-muted">0{i + 1}</span>
                  <div>
                    <h3 className="font-display text-display-sm">{p.title}</h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">{p.body}</p>
                  </div>
                </Reveal>
              ))}
            </ol>

            <Reveal className="mt-16">
              <h3 className="text-xs uppercase tracking-[0.18em] text-muted">Capabilities</h3>
              <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-base">
                {CAPABILITIES.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
