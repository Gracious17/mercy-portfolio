const PLATFORMS = ['Instagram', 'TikTok', 'LinkedIn', 'YouTube', 'X', 'Threads', 'Meta Ads', 'Facebook'];

export function Marquee() {
  return (
    <div className="group relative overflow-hidden border-y border-fg/10 py-6 md:py-8" aria-label="Platforms I work on">
      <div className="mask-fade-edges">
        <div className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused]">
          {[...PLATFORMS, ...PLATFORMS].map((platform, i) => (
            <div key={`${platform}-${i}`} className="flex items-center" aria-hidden={i >= PLATFORMS.length}>
              <span
                className={`whitespace-nowrap px-8 font-display text-4xl md:px-12 md:text-6xl ${
                  i % 2 ? 'italic text-muted' : 'text-fg'
                }`}
              >
                {platform}
              </span>
              <span className="h-2 w-2 rounded-full bg-accent" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
