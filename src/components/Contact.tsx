import { useState, type FormEvent } from 'react';
import { Send, CheckCircle2, Loader2, Mail, MapPin, Clock, Instagram, Linkedin, Twitter } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

const SERVICES = [
  'Social Media Strategy',
  'Content Creation',
  'Community Management',
  'Paid Social Campaigns',
  'Analytics & Reporting',
  'Influencer Collaboration',
  'Full Management Package',
];

const BUDGETS = ['< $1,000 / mo', '$1,000 – $3,000 / mo', '$3,000 – $5,000 / mo', '$5,000+ / mo'];

const CONTACT_INFO = [
  { icon: Mail, label: 'Email', value: 'hello@mercyubachukwu.com', href: 'mailto:hello@mercyubachukwu.com' },
  { icon: MapPin, label: 'Location', value: 'Lagos, Nigeria — Remote worldwide', href: null },
  { icon: Clock, label: 'Response Time', value: 'Within 24 hours', href: null },
];

const SOCIALS = [
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Twitter, label: 'Twitter / X', href: '#' },
];

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export function Contact() {
  const [formState, setFormState] = useState<FormState>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    message: '',
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = 'Please enter your name';
    if (!form.email.trim()) next.email = 'Please enter your email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Please enter a valid email';
    if (!form.message.trim()) next.message = 'Please tell me about your project';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setFormState('submitting');
    await new Promise((resolve) => setTimeout(resolve, 1200));

    setFormState('success');
    setForm({ name: '', email: '', company: '', service: '', budget: '', message: '' });
  };

  return (
    <section id="contact" className="relative section-py overflow-hidden">
      <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-azure-500/30 to-transparent" />
      <div className="absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-azure-700/15 blur-[120px]" />
      <div className="absolute -right-32 bottom-1/3 h-96 w-96 rounded-full bg-glow-600/10 blur-[120px]" />

      <div className="container-px relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <Reveal className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-azure-500" />
            <span className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-azure-400">
              Contact
            </span>
            <span className="h-px w-12 bg-azure-500" />
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-display text-display-lg font-bold text-white">
              Let's build something <span className="text-gradient-blue">worth following</span>.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mx-auto mt-4 max-w-xl text-base text-slate-400">
              Tell me about your brand and what you're looking to achieve. I'll get back to you
              within 24 hours with next steps.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-10 lg:grid-cols-5">
          {/* Contact info */}
          <Reveal variant="left" className="lg:col-span-2">
            <div className="flex h-full flex-col justify-between gap-8 rounded-2xl glass-dark p-8">
              <div>
                <h3 className="font-display text-xl font-semibold text-white">
                  Get in touch directly
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  Prefer email or social? Reach out through any of these channels.
                </p>
              </div>

              <div className="space-y-5">
                {CONTACT_INFO.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-azure-500/10 text-azure-400">
                      <item.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wider text-slate-500">
                        {item.label}
                      </div>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="link-underline mt-0.5 block text-sm font-medium text-white"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <div className="mt-0.5 text-sm font-medium text-white">
                          {item.value}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <div className="mb-3 text-xs uppercase tracking-wider text-slate-500">
                  Follow
                </div>
                <div className="flex gap-3">
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
            </div>
          </Reveal>

          {/* Form */}
          <Reveal variant="right" className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField
                  label="Name"
                  required
                  error={errors.name}
                  value={form.name}
                  onChange={(v) => handleChange('name', v)}
                  placeholder="Jane Doe"
                />
                <FormField
                  label="Email"
                  required
                  type="email"
                  error={errors.email}
                  value={form.email}
                  onChange={(v) => handleChange('email', v)}
                  placeholder="jane@brand.com"
                />
                <FormField
                  label="Company"
                  value={form.company}
                  onChange={(v) => handleChange('company', v)}
                  placeholder="Your brand (optional)"
                />
                <FormSelect
                  label="Service"
                  value={form.service}
                  onChange={(v) => handleChange('service', v)}
                  options={SERVICES}
                  placeholder="What do you need?"
                />
              </div>

              <div className="mt-5">
                <FormSelect
                  label="Budget"
                  value={form.budget}
                  onChange={(v) => handleChange('budget', v)}
                  options={BUDGETS}
                  placeholder="Estimated monthly budget"
                />
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Message <span className="text-azure-400">*</span>
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  rows={4}
                  placeholder="Tell me about your brand, goals, and what you're looking to achieve..."
                  className={`w-full resize-none rounded-xl border bg-ink-900/50 px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all duration-300 focus:border-azure-500/50 focus:bg-ink-900/80 ${
                    errors.message ? 'border-red-500/50' : 'border-white/10'
                  }`}
                />
                {errors.message && (
                  <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={formState === 'submitting' || formState === 'success'}
                className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-60"
              >
                {formState === 'submitting' && (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                )}
                {formState === 'success' && (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Message sent!
                  </>
                )}
                {formState === 'idle' && (
                  <>
                    Send Message
                    <Send className="h-4 w-4" />
                  </>
                )}
                {formState === 'error' && (
                  <>
                    Something went wrong — try again
                  </>
                )}
              </button>

              {formState === 'success' && (
                <p className="mt-4 text-center text-sm text-green-400">
                  Thanks for reaching out! I'll get back to you within 24 hours.
                </p>
              )}
              {formState === 'error' && (
                <p className="mt-4 text-center text-sm text-red-400">
                  There was an issue sending your message. Please try again or email me directly.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FormField({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required = false,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">
        {label} {required && <span className="text-azure-400">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-xl border bg-ink-900/50 px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all duration-300 focus:border-azure-500/50 focus:bg-ink-900/80 ${
          error ? 'border-red-500/50' : 'border-white/10'
        }`}
      />
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}

function FormSelect({
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-ink-900/50 px-4 py-3 text-sm text-white outline-none transition-all duration-300 focus:border-azure-500/50 focus:bg-ink-900/80 [&>option]:bg-ink-900"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
