import { useState, useEffect } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

const TESTIMONIALS = [
  {
    quote:
      "Mercy completely transformed our social media presence. Within four months, our Instagram engagement went from 1.2% to 7.8%. She doesn't just post — she strategizes, analyzes, and delivers. Worth every penny.",
    author: 'Sarah Chen',
    role: 'Founder, Bloom Skincare',
    avatar: 'https://images.pexels.com/photos/7752788/pexels-photo-7752788.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    rating: 5,
  },
  {
    quote:
      "Working with Mercy was the best decision we made this year. She took our scattered social media efforts and turned them into a cohesive, data-driven strategy. Our TikTok following grew from 800 to 15K in three months.",
    author: 'Marcus Reid',
    role: 'Owner, Forge Fitness',
    avatar: 'https://images.pexels.com/photos/33680700/pexels-photo-33680700.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    rating: 5,
  },
  {
    quote:
      "Mercy is the rare social media manager who actually understands business goals. She aligned our LinkedIn strategy with our sales pipeline and brought in 45 qualified leads in one quarter. Incredible work.",
    author: 'David Okafor',
    role: 'Partner, Atlas Consulting',
    avatar: 'https://images.pexels.com/photos/40035691/pexels-photo-40035691.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    rating: 5,
  },
  {
    quote:
      "From zero to sold-out in eight weeks. Mercy launched our brand on social media with such precision and creativity that we couldn't keep up with demand. She's a strategic powerhouse.",
    author: 'Elena Rossi',
    role: 'Co-founder, Casa Verde',
    avatar: 'https://images.pexels.com/photos/40035692/pexels-photo-40035692.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    rating: 5,
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const goPrev = () => setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const goNext = () => setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);

  return (
    <section
      id="testimonials"
      className="relative section-py overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-glow-500/10 blur-[120px]" />
      <div className="absolute -left-32 bottom-1/4 h-96 w-96 rounded-full bg-azure-700/10 blur-[120px]" />

      <div className="container-px relative z-10 mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <Reveal className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-azure-500" />
            <span className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-azure-400">
              Testimonials
            </span>
            <span className="h-px w-12 bg-azure-500" />
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-display text-display-lg font-bold text-white">
              What clients <span className="text-gradient-blue">say</span>.
            </h2>
          </Reveal>
        </div>

        {/* Testimonial carousel */}
        <Reveal variant="scale">
          <div className="relative">
            {/* Large quote mark */}
            <Quote className="absolute -top-8 left-0 h-20 w-20 text-azure-500/10" />

            {/* Slides */}
            <div className="relative overflow-hidden rounded-3xl glass-dark p-8 sm:p-12 lg:p-16">
              <div
                className="flex transition-transform duration-700 ease-out-quint"
                style={{ transform: `translateX(-${current * 100}%)` }}
              >
                {TESTIMONIALS.map((t) => (
                  <div key={t.author} className="min-w-full px-1">
                    {/* Stars */}
                    <div className="mb-6 flex gap-1">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-gold-400 text-gold-400" />
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="font-display text-xl font-medium leading-relaxed text-white sm:text-2xl lg:text-3xl">
                      "{t.quote}"
                    </blockquote>

                    {/* Author */}
                    <div className="mt-8 flex items-center gap-4">
                      <img
                        src={t.avatar}
                        alt={t.author}
                        className="h-12 w-12 rounded-full object-cover border-2 border-azure-500/30"
                        loading="lazy"
                      />
                      <div>
                        <div className="font-display text-base font-semibold text-white">
                          {t.author}
                        </div>
                        <div className="text-sm text-azure-300">{t.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="mt-8 flex items-center justify-between">
              {/* Dots */}
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-2 rounded-full transition-all duration-400 ease-out-quint ${
                      current === i ? 'w-8 bg-azure-400' : 'w-2 bg-white/15 hover:bg-white/30'
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              {/* Arrows */}
              <div className="flex gap-2">
                <button
                  onClick={goPrev}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-all duration-300 hover:border-azure-500/40 hover:text-white"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={goNext}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-all duration-300 hover:border-azure-500/40 hover:text-white"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
