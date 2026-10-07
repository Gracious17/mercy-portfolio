import { useState } from 'react';

/** Portrait of Mercy (compressed copy of /public/myphoto.png), with a monogram fallback if the file is missing. */
export function Portrait({
  className = '',
  monogramClassName = 'text-[10rem]',
  eager = false,
}: {
  className?: string;
  monogramClassName?: string;
  eager?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`flex items-center justify-center overflow-hidden bg-surface ${className}`} role="img" aria-label="Mercy Ubachukwu">
        <span className={`font-display italic leading-none text-fg/15 ${monogramClassName}`}>M</span>
      </div>
    );
  }

  return (
    <img
      src="/myphoto.jpg"
      width={640}
      height={641}
      alt="Portrait of Mercy Ubachukwu"
      onError={() => setFailed(true)}
      className={`object-cover object-[50%_22%] ${className}`}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      {...(eager ? { fetchPriority: 'high' as const } : {})}
    />
  );
}
