import { useId, useState, type FormEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Reveal, Rise } from '@/components/Reveal';
import { SectionLabel } from '@/components/SectionLabel';
import { Portrait } from '@/components/Portrait';

const EMAIL = 'hello@mercyubachukwu.com';

const SERVICES = ['Strategy', 'Content', 'Community', 'Paid social', 'Reporting', 'Influencers', 'Everything'];
const BUDGETS = ['Under $1k', '$1k to $3k', '$3k to $5k', '$5k+'];

type Form = { name: string; email: string; company: string; message: string };
const EMPTY: Form = { name: '', email: '', company: '', message: '' };

export function Contact() {
  const [form, setForm] = useState<Form>(EMPTY);
  const [services, setServices] = useState<string[]>([]);
  const [budget, setBudget] = useState('');
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [sent, setSent] = useState(false);

  const update = (field: keyof Form, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const toggleService = (s: string) =>
    setServices((list) => (list.includes(s) ? list.filter((x) => x !== s) : [...list, s]));

  const validate = () => {
    const next: typeof errors = {};
    if (!form.name.trim()) next.name = 'Please add your name';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Please add a valid email';
    if (!form.message.trim()) next.message = 'Tell me a little about the project';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  // No backend yet: hand the enquiry to the visitor's email app, pre-filled.
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.company && `Company: ${form.company}`,
      services.length > 0 && `Interested in: ${services.join(', ')}`,
      budget && `Monthly budget: ${budget}`,
      '',
      form.message,
    ]
      .filter((line) => line !== false && line !== '')
      .join('\n');

    const subject = `New project enquiry from ${form.name}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const reset = () => {
    setForm(EMPTY);
    setServices([]);
    setBudget('');
    setSent(false);
  };

  return (
    <section id="contact" className="section-py border-t border-fg/10 bg-surface">
      <div className="container-px grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="flex flex-col justify-between gap-12 lg:col-span-5">
          <div>
            <SectionLabel index="06" label="Contact" className="mb-8" />
            <Rise as="h2" text="Have a brand to grow? *Let's talk.*" accent className="font-display text-display-lg" />
            <Reveal delay={150}>
              <p className="mt-8 max-w-sm text-base leading-relaxed text-muted">
                Tell me about the brand and what you want from social. I reply to every enquiry
                within 24 hours.
              </p>
            </Reveal>
          </div>

          <Reveal delay={200} className="space-y-8 text-sm">
            <div className="flex items-center gap-4">
              {/* Zoomed in on the face so it reads at avatar size */}
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full border border-fg/15 sm:h-20 sm:w-20">
                <Portrait className="h-full w-full origin-[50%_36%] scale-[1.9]" monogramClassName="text-4xl" />
              </div>
              <div>
                <div className="font-display text-display-sm leading-none">Mercy Ubachukwu</div>
                <div className="mt-1.5 text-muted">Every enquiry is read and answered by me.</div>
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.16em] text-muted">Email</div>
              <a href={`mailto:${EMAIL}`} className="link-underline mt-2 inline-block font-display text-display-sm">
                {EMAIL}
              </a>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-xs uppercase tracking-[0.16em] text-muted">Based in</div>
                <div className="mt-2">Lagos, working worldwide</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.16em] text-muted">Reply time</div>
                <div className="mt-2">Within 24 hours</div>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={100} className="lg:col-span-6 lg:col-start-7">
          {sent ? (
            <div className="flex h-full flex-col justify-center border-t border-fg/10 pt-10" role="status">
              <p className="font-display text-display-md">
                Thank you, {form.name.split(' ')[0]}.
              </p>
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
                Your email app should have opened with the message ready to send. If it
                didn&rsquo;t, write to me directly at{' '}
                <a href={`mailto:${EMAIL}`} className="text-fg underline underline-offset-4">
                  {EMAIL}
                </a>
                .
              </p>
              <button onClick={reset} className="link-underline mt-10 self-start pb-1 text-sm">
                Send another enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-10">
              <div className="grid gap-10 sm:grid-cols-2">
                <Field label="Your name" value={form.name} error={errors.name} autoComplete="name" onChange={(v) => update('name', v)} />
                <Field label="Email" type="email" value={form.email} error={errors.email} autoComplete="email" onChange={(v) => update('email', v)} />
              </div>
              <Field label="Company or brand" optional value={form.company} autoComplete="organization" onChange={(v) => update('company', v)} />

              <ChipGroup label="What do you need?" options={SERVICES} isSelected={(s) => services.includes(s)} onToggle={toggleService} />
              <ChipGroup label="Monthly budget" options={BUDGETS} isSelected={(b) => budget === b} onToggle={(b) => setBudget(budget === b ? '' : b)} />

              <Field label="About the project" multiline value={form.message} error={errors.message} onChange={(v) => update('message', v)} />

              <button type="submit" className="btn btn-solid w-full sm:w-auto">
                Send enquiry
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  error,
  optional,
  multiline,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  error?: string;
  optional?: boolean;
  multiline?: boolean;
  autoComplete?: string;
}) {
  const id = useId();
  const className = `peer w-full resize-none border-b bg-transparent pb-3 pt-2 text-lg text-fg outline-none transition-colors duration-300 placeholder:text-fg/25 focus:border-fg ${
    error ? 'border-red-400' : 'border-fg/20 hover:border-fg/40'
  }`;
  const shared = {
    id,
    value,
    'aria-invalid': !!error,
    'aria-describedby': error ? `${id}-error` : undefined,
    className,
  };

  return (
    <div>
      <label htmlFor={id} className="flex justify-between text-xs uppercase tracking-[0.16em] text-muted">
        {label}
        {optional && <span className="normal-case tracking-normal text-fg/30">Optional</span>}
      </label>
      {multiline ? (
        <textarea {...shared} rows={4} onChange={(e) => onChange(e.target.value)} placeholder="Goals, timelines, anything useful" />
      ) : (
        <input {...shared} type={type} autoComplete={autoComplete} onChange={(e) => onChange(e.target.value)} />
      )}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

function ChipGroup({
  label,
  options,
  isSelected,
  onToggle,
}: {
  label: string;
  options: string[];
  isSelected: (o: string) => boolean;
  onToggle: (o: string) => void;
}) {
  return (
    <fieldset>
      <legend className="text-xs uppercase tracking-[0.16em] text-muted">{label}</legend>
      <div className="mt-4 flex flex-wrap gap-2">
        {options.map((o) => {
          const on = isSelected(o);
          return (
            <button
              key={o}
              type="button"
              onClick={() => onToggle(o)}
              aria-pressed={on}
              className={`min-h-11 rounded-full border px-4 py-2.5 text-sm transition-[background-color,border-color,color,transform] duration-300 active:scale-[0.96] ${
                on ? 'no-halo border-fg bg-fg text-canvas' : 'border-fg/20 text-fg/80 hover:border-fg/60 hover:text-fg'
              }`}
            >
              {o}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
