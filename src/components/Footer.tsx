import { ArrowUp } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { onAnchorClick } from '@/lib/scroll';

// TODO: replace with Mercy's real profile URLs
const SOCIALS = [
  { label: 'Instagram', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'TikTok', href: '#' },
  { label: 'X', href: '#' },
];

const NAV = [
  { label: 'About', id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Work', id: 'work' },
  { label: 'Process', id: 'process' },
  { label: 'Clients', id: 'testimonials' },
  { label: 'Contact', id: 'contact' },
];

export function Footer() {
  return (
    <footer className="relative z-10 overflow-hidden border-t border-fg/10 pt-20">
      <div className="container-px">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 text-sm lg:grid-cols-12">
          <div className="col-span-2 lg:col-span-5">
            <p className="max-w-xs text-base leading-relaxed text-muted">
              Social media management for brands that want growth they can measure.
            </p>
          </div>

          <nav className="lg:col-span-2 lg:col-start-7" aria-label="Footer">
            <div className="text-xs uppercase tracking-[0.16em] text-muted">Site</div>
            <ul className="mt-4">
              {NAV.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} onClick={onAnchorClick(n.id)} className="link-underline inline-block py-1.5">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <div className="text-xs uppercase tracking-[0.16em] text-muted">Social</div>
            <ul className="mt-4">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a href={s.href} className="link-underline inline-block py-1.5" target="_blank" rel="noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-2 lg:justify-self-end">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group flex items-center gap-3 text-sm"
            >
              Back to top
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-fg/20 transition-[background-color,border-color,color] duration-500 group-hover:border-fg group-hover:bg-fg group-hover:text-canvas">
                <ArrowUp className="h-4 w-4 transition-transform duration-500 ease-out-quint group-hover:-translate-y-0.5" />
              </span>
            </button>
          </div>
        </div>

        {/* Stacked on phones so each word can be large; one line from md up */}
        <Reveal variant="fade" className="mt-20 md:mt-32">
          <div className="pb-[0.06em] font-display text-[20vw] leading-[0.82] tracking-[-0.045em] md:whitespace-nowrap md:text-[13.5vw]" aria-hidden="true">
            <span className="block md:inline">Mercy </span>
            <span className="block italic text-muted md:inline">Ubachukwu</span>
          </div>
        </Reveal>

        <div className="flex flex-col justify-between gap-2 border-t border-fg/10 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-6 text-xs text-muted sm:flex-row">
          <span>&copy; {new Date().getFullYear()} Mercy Ubachukwu</span>
          <span>Lagos, Nigeria</span>
        </div>
      </div>
    </footer>
  );
}
