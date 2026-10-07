import { Fragment, useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import { useReveal } from '@/hooks/useScrollAnimations';

type Tag = 'div' | 'section' | 'article' | 'li' | 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'ul';

interface RevealProps {
  children: ReactNode;
  className?: string;
  variant?: 'up' | 'fade' | 'image';
  delay?: number;
  as?: Tag;
  style?: CSSProperties;
}

export function Reveal({
  children,
  className = '',
  variant = 'up',
  delay = 0,
  as: El = 'div',
  style,
}: RevealProps) {
  const { ref, isVisible } = useReveal<HTMLElement>();
  const variantClass = variant === 'fade' ? 'reveal-fade' : variant === 'image' ? 'reveal-image' : 'reveal';

  return (
    <El
      ref={ref as never}
      className={`${variantClass} ${isVisible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </El>
  );
}

interface RiseProps {
  /** Wrap words in *asterisks* to set them in italic. */
  text: string;
  as?: Tag;
  className?: string;
  /** Colour the italic words with the accent. */
  accent?: boolean;
  delay?: number;
  stagger?: number;
  /** Play on mount instead of on scroll (for content above the fold). */
  immediate?: boolean;
}

/** Headline where each word rises out of a mask, one after another. */
export function Rise({
  text,
  as: El = 'span',
  className = '',
  accent = false,
  delay = 0,
  stagger = 55,
  immediate = false,
}: RiseProps) {
  const { ref, isVisible } = useReveal<HTMLElement>({ threshold: 0.2 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!immediate) return;
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, [immediate]);

  const visible = immediate ? mounted : isVisible;
  const plain = text.replace(/\*/g, '');

  let index = 0;
  const segments = text.split('*').map((segment, s) => {
    const italic = s % 2 === 1;
    return segment
      .split(' ')
      .filter(Boolean)
      .map((word) => {
        const i = index++;
        return (
          <Fragment key={`${s}-${i}`}>
            <span className="rise-word">
              <span
                className={`rise-inner ${italic ? `italic ${accent ? 'text-accent' : ''}` : ''}`}
                style={{ transitionDelay: `${delay + i * stagger}ms` }}
              >
                {word}
              </span>
            </span>{' '}
          </Fragment>
        );
      });
  });

  return (
    <El ref={ref as never} aria-label={plain} className={`${visible ? 'is-visible' : ''} ${className}`}>
      <span aria-hidden="true">{segments}</span>
    </El>
  );
}
