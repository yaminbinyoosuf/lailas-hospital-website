import type { ReactNode } from 'react';
import { CalendarDays, Phone } from 'lucide-react';
import { contact } from '../content/site';
import { useBooking } from '../booking/BookingProvider';
import { Button, ButtonAnchor } from '../components/Button';
import { Container } from '../components/Container';
import { Reveal } from '../components/Reveal';
import { useCopy } from '../i18n/LanguageProvider';

/**
 * Premium mid-page CTA band.
 *
 * Sits between the Services section and the Maternity Story to give
 * visitors a clear invitation to act before they continue reading.
 * Dark teal gradient background with a radial mesh overlay for depth.
 */
export function CtaHomeBand() {
  const copy = useCopy();
  const { open } = useBooking();

  return (
    <section
      aria-labelledby="cta-home-title"
      className="relative overflow-hidden bg-teal-950"
    >
      {/* Background mesh — three soft radial washes for depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: [
            'radial-gradient(ellipse 80% 60% at 10% 50%, rgb(43 107 96 / 0.55), transparent 65%)',
            'radial-gradient(ellipse 50% 80% at 90% 20%, rgb(209 139 99 / 0.18), transparent 60%)',
            'radial-gradient(ellipse 40% 50% at 60% 90%, rgb(19 54 47 / 0.6), transparent 55%)',
          ].join(', '),
        }}
      />

      {/* Subtle grid overlay — reinforces premium, clinical precision */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgb(255 253 249 / 1) 1px, transparent 1px), linear-gradient(90deg, rgb(255 253 249 / 1) 1px, transparent 1px)',
          backgroundSize: '4rem 4rem',
        }}
      />

      <Container className="relative z-10 py-20 md:py-28">
        <Reveal className="grid gap-10 md:grid-cols-12 md:items-center">
          {/* Copy */}
          <div className="md:col-span-7">
            <span className="inline-flex items-center rounded-full bg-teal-800/70 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-teal-200 ring-1 ring-teal-600/40">
              {copy.strip.emergency.split(',')[0]}
            </span>
            <h2 id="cta-home-title" className="t-h2 mt-5 max-w-[22ch] text-ivory">
              Ready to take the next step?
            </h2>
            <p className="t-lead mt-4 max-w-[38rem] !text-teal-100/80">
              Our team is here every day. Book an appointment online, or call us right now.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 sm:flex-row md:col-span-5 md:flex-col md:items-end lg:flex-row lg:items-center lg:justify-end">
            <Button
              size="lg"
              variant="light"
              icon={<CalendarDays aria-hidden="true" />}
              onClick={() => open()}
            >
              {copy.actions.book}
            </Button>
            <ButtonAnchor
              href={`tel:${contact.primary.tel}`}
              variant="lightOutline"
              size="lg"
              icon={<Phone aria-hidden="true" />}
            >
              {copy.actions.call}
            </ButtonAnchor>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/** Inner-page variant — keeps the existing API working */
export function CtaBand({ title, body, actions }: { title: string; body: string; actions: ReactNode }) {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden bg-teal-900 text-ivory">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 70% 80% at 0% 50%, rgb(11 36 31 / 0.5), transparent 60%), radial-gradient(ellipse 50% 60% at 100% 50%, rgb(209 139 99 / 0.12), transparent 55%)',
        }}
      />
      <Container className="relative z-10">
        <div className="grid gap-8 py-16 md:grid-cols-12 md:items-center md:py-20">
          <div className="md:col-span-7">
            <h2 id="cta-title" className="t-h2 text-ivory">{title}</h2>
            <p className="t-lead mt-4 !text-teal-100">{body}</p>
          </div>
          <div className="flex flex-col gap-3 md:col-span-5 md:items-end">{actions}</div>
        </div>
      </Container>
    </section>
  );
}
