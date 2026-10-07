import { Reveal } from '@/components/Reveal';

export function SectionLabel({ index, label, className = '' }: { index: string; label: string; className?: string }) {
  return (
    <Reveal variant="fade" className={`flex items-baseline gap-4 text-xs uppercase tracking-[0.18em] text-muted ${className}`}>
      <span className="tabular text-fg">{index}</span>
      <span>{label}</span>
    </Reveal>
  );
}
