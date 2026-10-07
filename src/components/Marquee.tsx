const PLATFORMS = [
  'Instagram',
  'TikTok',
  'LinkedIn',
  'YouTube',
  'Twitter / X',
  'Facebook',
  'Pinterest',
  'Threads',
  'Snapchat',
  'Google Analytics',
  'Meta Ads',
  'Canva Pro',
  'Later',
  'Buffer',
  'Sprout Social',
  'Figma',
];

export function Marquee() {
  return (
    <div className="relative border-y border-white/[0.05] bg-ink-900/50 py-6">
      <div className="mask-fade-edges overflow-hidden">
        <div className="flex w-max animate-marquee items-center gap-12">
          {[...PLATFORMS, ...PLATFORMS].map((platform, i) => (
            <div
              key={`${platform}-${i}`}
              className="flex items-center gap-3 whitespace-nowrap"
            >
              <span className="h-1 w-1 rounded-full bg-azure-500/50" />
              <span className="font-display text-sm font-medium uppercase tracking-wider text-slate-500 transition-colors hover:text-slate-300">
                {platform}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
