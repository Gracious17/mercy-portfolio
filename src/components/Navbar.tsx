import { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useScrollProgress, useActiveSection } from '@/hooks/useScrollAnimations';

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'work', label: 'Work' },
  { id: 'process', label: 'Process' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'contact', label: 'Contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const progress = useScrollProgress();
  const activeSection = useActiveSection(NAV_LINKS.map((l) => l.id));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-azure-400 via-glow-400 to-azure-600 transition-[width] duration-150 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out-quint ${
          scrolled
            ? 'bg-ink-950/80 backdrop-blur-xl border-b border-white/[0.06] py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <nav className="container-px flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, 'home')}
            className="group flex items-center gap-2.5"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-azure-500 to-azure-700 text-sm font-bold text-white transition-transform duration-500 ease-out-quint group-hover:rotate-12 group-hover:scale-110">
              M
            </span>
            <span className="font-display text-lg font-semibold tracking-tight text-white">
              Mercy<span className="text-azure-400">.</span>
            </span>
          </a>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    activeSection === link.id
                      ? 'text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {activeSection === link.id && (
                    <span className="absolute inset-0 rounded-full bg-white/[0.06] border border-white/[0.08]" />
                  )}
                  <span className="relative">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="hidden md:inline-flex btn-primary !px-5 !py-2.5 !text-xs"
            >
              Let's Talk
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white transition-colors hover:bg-white/5 lg:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 bg-ink-950/95 backdrop-blur-2xl transition-all duration-500 lg:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex h-full flex-col items-center justify-center gap-2">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleNavClick(e, link.id)}
              className={`font-display text-3xl font-semibold transition-all duration-500 ${
                mobileOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              } ${
                activeSection === link.id ? 'text-azure-400' : 'text-white'
              }`}
              style={{ transitionDelay: mobileOpen ? `${i * 60 + 100}ms` : '0ms' }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, 'contact')}
            className="btn-primary mt-8"
            style={{
              transitionDelay: mobileOpen ? `${NAV_LINKS.length * 60 + 100}ms` : '0ms',
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.5s ease-out-quint',
            }}
          >
            Let's Talk
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </>
  );
}
