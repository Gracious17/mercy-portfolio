import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useActiveSection } from '@/hooks/useScrollAnimations';
import { onAnchorClick } from '@/lib/scroll';

const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'work', label: 'Work' },
  { id: 'process', label: 'Process' },
  { id: 'testimonials', label: 'Clients' },
] as const;

const SECTION_IDS = ['home', ...NAV_LINKS.map((l) => l.id), 'contact'] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const active = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 320 && y > lastY.current);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const go = (e: React.MouseEvent, id: string) => onAnchorClick(id, () => setOpen(false))(e);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-500 ease-out-quint ${
          hidden && !open ? '-translate-y-full' : 'translate-y-0'
        } ${
          scrolled && !open
            ? 'border-b border-fg/10 bg-canvas/85 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <nav className="container-px flex h-16 items-center justify-between md:h-20">
          <a href="#home" onClick={(e) => go(e, 'home')} className="group relative z-10 flex items-baseline gap-1.5">
            <span className="font-display text-2xl leading-none">Mercy</span>
            <span className="font-display text-2xl italic leading-none text-muted transition-colors duration-500 group-hover:text-fg">
              Ubachukwu
            </span>
          </a>

          <ul className="hidden items-center gap-9 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => go(e, link.id)}
                  aria-current={active === link.id ? 'true' : undefined}
                  className={`link-underline pb-1 text-sm transition-colors duration-300 ${
                    active === link.id ? 'text-fg' : 'text-muted hover:text-fg'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="relative z-10 flex items-center gap-3">
            <a href="#contact" onClick={(e) => go(e, 'contact')} className="btn btn-solid hidden !px-5 !py-2.5 md:inline-flex">
              Start a project
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="relative -mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
            >
              <span
                className={`absolute h-px w-6 bg-fg transition-transform duration-500 ease-out-quint ${
                  open ? 'rotate-45' : '-translate-y-1'
                }`}
              />
              <span
                className={`absolute h-px w-6 bg-fg transition-transform duration-500 ease-out-quint ${
                  open ? '-rotate-45' : 'translate-y-1'
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 flex flex-col overflow-y-auto overscroll-contain bg-canvas pt-20 transition-[clip-path] duration-700 ease-out-expo lg:hidden ${
          open ? '[clip-path:inset(0_0_0_0)]' : 'pointer-events-none [clip-path:inset(0_0_100%_0)]'
        }`}
        aria-hidden={!open}
      >
        <ul className="container-px flex flex-1 flex-col justify-center py-6">
          {[...NAV_LINKS, { id: 'contact', label: 'Contact' } as const].map((link, i) => (
            <li key={link.id} className="overflow-hidden border-b border-fg/10 first:border-t">
              <a
                href={`#${link.id}`}
                onClick={(e) => go(e, link.id)}
                tabIndex={open ? 0 : -1}
                className={`flex items-baseline gap-5 py-3 font-display text-[clamp(2.5rem,11vw,4.5rem)] leading-none transition-transform duration-700 ease-out-expo ${
                  open ? 'translate-y-0' : 'translate-y-full'
                }`}
                style={{ transitionDelay: open ? `${120 + i * 50}ms` : '0ms' }}
              >
                <span className="tabular font-sans text-xs text-muted">0{i + 1}</span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="container-px flex items-center justify-between gap-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-2 text-sm text-muted">
          <a href="mailto:hello@mercyubachukwu.com" tabIndex={open ? 0 : -1}>hello@mercyubachukwu.com</a>
          <span>Lagos, NG</span>
        </div>
      </div>
    </>
  );
}
