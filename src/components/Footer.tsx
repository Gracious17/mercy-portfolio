import { Instagram, Linkedin, Twitter, ArrowUp, Heart } from 'lucide-react';

const SOCIALS = [
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Twitter, label: 'Twitter / X', href: '#' },
];

const NAV = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/[0.06] bg-ink-950 pt-20 pb-8">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-azure-500/30 to-transparent" />

      <div className="container-px mx-auto max-w-7xl">
        {/* Top section */}
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-azure-500 to-azure-700 text-sm font-bold text-white">
                M
              </span>
              <span className="font-display text-lg font-semibold tracking-tight text-white">
                Mercy<span className="text-azure-400">.</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              Social media manager helping brands grow with intention, strategy, and content
              that converts.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-slate-400 transition-all duration-300 hover:border-azure-500/40 hover:bg-azure-500/10 hover:text-azure-300"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:justify-self-center">
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Navigate
            </h4>
            <ul className="mt-4 grid grid-cols-2 gap-x-8 gap-y-3">
              {NAV.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="link-underline text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="lg:justify-self-end">
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Ready to grow?
            </h4>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              Book a free 30-minute strategy call and let's map out your social media growth.
            </p>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="btn-primary mt-5"
            >
              Get Started
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-white/[0.06]" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-slate-500 sm:flex-row">
          <p className="flex items-center gap-1.5">
            © {new Date().getFullYear()} Mercy Ubachukwu. Crafted with
            <Heart className="h-3.5 w-3.5 fill-azure-500 text-azure-500" />
            and intention.
          </p>
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-slate-500 transition-colors hover:text-white"
          >
            Back to top
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 transition-all duration-300 group-hover:border-azure-500/40 group-hover:bg-azure-500/10">
              <ArrowUp className="h-3.5 w-3.5" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
