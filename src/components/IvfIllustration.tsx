/**
 * Line illustrations for the four IVF steps, drawn from the circles in the
 * Lailas logo. Decorative only.
 */
export function IvfIllustration({ step, className }: { step: 0 | 1 | 2 | 3; className?: string }) {
  const s = { stroke: 'currentColor', strokeWidth: 1.6, fill: 'none', strokeLinecap: 'round' as const };
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      {step === 0 && (
        <>
          <circle cx="25" cy="32" r="14" {...s} />
          <circle cx="39" cy="32" r="14" {...s} />
        </>
      )}
      {step === 1 && (
        <>
          <circle cx="32" cy="32" r="20" {...s} strokeDasharray="2 5" />
          <circle cx="32" cy="32" r="9" {...s} />
          <circle cx="47" cy="19" r="3" fill="currentColor" />
        </>
      )}
      {step === 2 && (
        <>
          <circle cx="32" cy="32" r="19" {...s} />
          <circle cx="28" cy="35" r="7" {...s} />
          <circle cx="39" cy="27" r="3.5" {...s} />
        </>
      )}
      {step === 3 && (
        <>
          <path d="M10 30a22 22 0 0 0 44 0" {...s} />
          <circle cx="32" cy="27" r="11" {...s} />
          <circle cx="36" cy="23" r="2.5" fill="currentColor" />
        </>
      )}
    </svg>
  );
}
