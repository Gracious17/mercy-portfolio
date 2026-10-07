import { type ReactNode } from 'react';
import { useReveal } from '@/hooks/useScrollAnimations';

interface RevealProps {
  children: ReactNode;
  className?: string;
  variant?: 'up' | 'scale' | 'left' | 'right';
  delay?: number;
  as?: 'div' | 'section' | 'article' | 'li' | 'span';
}

export function Reveal({
  children,
  className = '',
  variant = 'up',
  delay = 0,
  as: Tag = 'div',
}: RevealProps) {
  const { ref, isVisible } = useReveal<HTMLElement>();

  const variantClass =
    variant === 'scale'
      ? 'reveal-scale'
      : variant === 'left'
        ? 'reveal-left'
        : variant === 'right'
          ? 'reveal-right'
          : 'reveal';

  return (
    <Tag
      ref={ref as never}
      className={`${variantClass} ${isVisible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
