import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Reveal, Rise } from '@/components/Reveal';
import { SectionLabel } from '@/components/SectionLabel';
import { onAnchorClick } from '@/lib/scroll';

const PROJECTS = [
  {
    title: 'Bloom Skincare',
    category: 'Beauty and wellness',
    platforms: 'Instagram',
    color: '#E8B9AE',
    headline: { value: '+140%', label: 'Follower growth in six months' },
    description: "Rebuilt the brand's Instagram from the ground up around education instead of promotion.",
    approach: ['Ingredient explainer carousels', 'Monthly live Q&A with the founder', 'Customer review reposts'],
    metrics: [
      { value: '5.4%', label: 'Engagement, from 1.8%' },
      { value: '180K', label: 'Monthly reach' },
      { value: '2x', label: 'Saves per post' },
    ],
  },
  {
    title: 'Forge Fitness',
    category: 'Health and fitness',
    platforms: 'TikTok, paid social',
    color: '#D4EC6A',
    headline: { value: '+210%', label: 'TikTok follower growth in four months' },
    description: 'A TikTok-first strategy that made a neighbourhood gym the one people in the area talk about.',
    approach: ['Short-form coaching clips, four a week', 'Member transformation series', 'Small retargeting ads to trial sign-ups'],
    metrics: [
      { value: '650K', label: 'Video views' },
      { value: '320', label: 'Trial sign-ups' },
      { value: '4K', label: 'Followers, from 1.3K' },
    ],
  },
  {
    title: 'Atlas Consulting',
    category: 'B2B services',
    platforms: 'LinkedIn',
    color: '#A9C1E0',
    headline: { value: '18', label: 'Qualified leads in one quarter' },
    description: 'A LinkedIn content programme that gave the founders a consistent, credible voice in their field.',
    approach: ['Founder ghostwriting, three posts a week', 'Monthly industry breakdown', 'Content mapped to the sales pipeline'],
    metrics: [
      { value: '+95%', label: 'Profile views' },
      { value: '4.1%', label: 'Engagement rate' },
      { value: '3', label: 'Posts a week' },
    ],
  },
  {
    title: 'Casa Verde',
    category: 'Lifestyle and home',
    platforms: 'Instagram, TikTok',
    color: '#B4CBA6',
    headline: { value: '12 wks', label: 'From launch to first batch sold out' },
    description: 'A launch campaign for a small sustainable home goods brand that sold out its first production batch.',
    approach: ['Pre-launch waitlist campaign', 'Styled room shoots for Reels', 'Product seeding with 8 home creators'],
    metrics: [
      { value: '+160%', label: 'Profile visits' },
      { value: '240K', label: 'Campaign reach' },
      { value: '2.1x', label: 'Return on ad spend' },
    ],
  },
];

const clamp = (n: number) => Math.min(Math.max(n, 0), 1);

export function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  // Pinned horizontal scroll on large screens; native swipe everywhere else
  const [pinned, setPinned] = useState(false);
  const [distance, setDistance] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    // Cards need roughly 500px of height to tell their story, so short screens keep the swipe layout
    const mq = window.matchMedia('(min-width: 1024px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)');
    const apply = () => setPinned(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  // Shared by both modes: progress bar and which card is in front
  const syncUi = (progress: number) => {
    if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
    const viewport = viewportRef.current;
    if (!viewport) return;
    const target = viewport.getBoundingClientRect().left + parseFloat(getComputedStyle(viewport).paddingLeft);
    let best = 0;
    let bestGap = Infinity;
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const gap = Math.abs(card.getBoundingClientRect().left - target);
      if (gap < bestGap) {
        bestGap = gap;
        best = i;
      }
    });
    setActive(Math.min(best, PROJECTS.length - 1));
  };

  // Measure how far the track has to travel sideways
  useEffect(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;
    if (!pinned) {
      track.style.transform = '';
      setDistance(0);
      return;
    }
    const measure = () => setDistance(Math.max(track.scrollWidth - viewport.clientWidth, 0));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    ro.observe(viewport);
    return () => ro.disconnect();
  }, [pinned]);

  // Desktop: vertical scroll drives horizontal movement
  useEffect(() => {
    if (!pinned) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;
      const travel = section.offsetHeight - window.innerHeight;
      const progress = travel > 0 ? clamp(-section.getBoundingClientRect().top / travel) : 0;
      track.style.transform = `translate3d(${-progress * distance}px, 0, 0)`;
      syncUi(progress);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, [pinned, distance]);

  // Mobile: the swipe position drives the same UI
  const onSwipe = () => {
    const v = viewportRef.current;
    if (!v || pinned) return;
    const max = v.scrollWidth - v.clientWidth;
    syncUi(max > 0 ? clamp(v.scrollLeft / max) : 0);
  };

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative border-t border-fg/10"
      style={pinned ? { height: `calc(100vh + ${distance}px)` } : undefined}
    >
      <div className={pinned ? 'sticky top-0 flex h-screen flex-col overflow-hidden pb-8 pt-20' : 'py-20 sm:py-28'}>
        {/* Header */}
        <div className="container-px mb-10 flex flex-col gap-8 sm:mb-12 lg:mb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionLabel index="03" label="Selected work" className="mb-5" />
            <Rise
              as="h2"
              text="Results, *not just* a nice grid."
              className={`font-display ${pinned ? 'text-[clamp(2.5rem,4.4vw,4.5rem)] leading-none tracking-[-0.025em]' : 'text-display-md lg:text-display-lg'}`}
            />
          </div>
          <Reveal className="flex items-center gap-5 lg:min-w-[18rem]">
            <span className="tabular text-sm">
              <span className="text-fg">0{active + 1}</span>
              <span className="text-muted"> / 0{PROJECTS.length}</span>
            </span>
            <span className="relative h-px flex-1 bg-fg/15">
              <span ref={barRef} className="absolute inset-0 origin-left bg-accent" style={{ transform: 'scaleX(0)' }} />
            </span>
            <span className="text-xs uppercase tracking-[0.16em] text-muted">{pinned ? 'Scroll' : 'Swipe'}</span>
          </Reveal>
        </div>

        {/* Track */}
        <div
          ref={viewportRef}
          onScroll={onSwipe}
          className={`container-px ${
            pinned
              ? 'min-h-0 flex-1'
              : 'no-scrollbar snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-px-5 sm:scroll-px-8'
          }`}
        >
          <div
            ref={trackRef}
            className={`flex w-max gap-4 sm:gap-6 ${pinned ? 'h-full will-change-transform' : ''}`}
          >
            {PROJECTS.map((p, i) => (
              <CaseCard
                key={p.title}
                cardRef={(el) => (cardRefs.current[i] = el)}
                project={p}
                index={i}
                isActive={active === i}
                pinned={pinned}
              />
            ))}

            {/* Closing card */}
            <div
              ref={(el) => (cardRefs.current[PROJECTS.length] = el)}
              className="flex w-[80vw] shrink-0 snap-start flex-col justify-between gap-10 border border-fg/10 bg-surface p-6 sm:w-[60vw] sm:p-8 lg:h-full lg:w-[min(36vw,520px)] lg:p-10"
            >
              <span className="text-xs uppercase tracking-[0.16em] text-muted">Next case study</span>
              <p className="font-display text-display-md">
                Your brand, <span className="italic text-accent">next.</span>
              </p>
              <a href="#contact" onClick={onAnchorClick('contact')} className="btn btn-solid self-start">
                Start a project
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>

            {/* Trailing space so the last card can snap flush on mobile */}
            <span className="w-px shrink-0 lg:hidden" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}

type Project = (typeof PROJECTS)[number];

function CaseCard({
  project: p,
  index,
  isActive,
  pinned,
  cardRef,
}: {
  project: Project;
  index: number;
  isActive: boolean;
  pinned: boolean;
  cardRef: (el: HTMLElement | null) => void;
}) {
  return (
    <article
      ref={cardRef}
      className={`flex w-[86vw] shrink-0 snap-start flex-col overflow-hidden border border-fg/10 bg-surface transition-[filter] duration-700 ease-out-quint sm:w-[72vw] lg:h-full lg:w-[min(76vw,1180px)] lg:flex-row ${
        pinned && !isActive ? 'brightness-[0.45]' : 'brightness-100'
      }`}
    >
      {/* Brand panel */}
      <div
        className="no-halo relative flex aspect-[5/4] flex-col justify-between overflow-hidden p-6 text-[#0B0C10] sm:aspect-[16/10] sm:p-8 lg:aspect-auto lg:w-[46%] lg:p-8 xl:w-[52%] xl:p-10"
        style={{ backgroundColor: p.color }}
      >
        <span
          className="pointer-events-none absolute -bottom-[0.22em] -right-[0.06em] select-none font-display text-[clamp(14rem,40vw,30rem)] italic leading-none opacity-[0.12]"
          aria-hidden="true"
        >
          {p.title.charAt(0)}
        </span>

        <div className="relative flex items-start justify-between gap-4 text-[0.6875rem] uppercase tracking-[0.16em] sm:text-xs">
          <span>
            {p.category}
            <br />
            <span className="opacity-60">{p.platforms}</span>
          </span>
          <span className="tabular">0{index + 1}</span>
        </div>

        <div className="relative overflow-hidden">
          <div
            className={`transition-transform duration-1000 ease-out-expo ${
              isActive || !pinned ? 'translate-y-0' : 'translate-y-[30%]'
            }`}
          >
            <div className="tabular font-display text-[clamp(4.5rem,15vw,7rem)] leading-[0.85] tracking-[-0.04em] lg:text-[clamp(5rem,8vw,10rem)]">
              {p.headline.value}
            </div>
            <div className="mt-3 max-w-[16rem] text-sm opacity-75">{p.headline.label}</div>
          </div>
        </div>
      </div>

      {/* Story */}
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-8 p-6 sm:p-8 lg:gap-5 lg:p-8 xl:p-10">
        <div>
          <h3 className="font-display text-display-sm xl:text-display-md">{p.title}</h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted sm:text-base lg:text-sm xl:text-base">{p.description}</p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.16em] text-muted">What I did</div>
          <ul className="mt-3 space-y-2 text-sm">
            {p.approach.map((a) => (
              <li key={a} className="flex gap-3">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                {a}
              </li>
            ))}
          </ul>
        </div>

        <dl className="grid grid-cols-3 gap-4 border-t border-fg/10 pt-5">
          {p.metrics.map((m) => (
            <div key={m.label} className="flex min-w-0 flex-col-reverse">
              <dt className="mt-2 text-[0.6875rem] leading-snug text-muted sm:text-xs">{m.label}</dt>
              <dd className="tabular font-display text-[clamp(1.6rem,6vw,2.5rem)] leading-none tracking-[-0.02em] lg:text-[clamp(1.6rem,2.3vw,2.5rem)]">
                {m.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
}
