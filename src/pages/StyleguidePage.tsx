/**
 * Development-only reference of tokens and base components (/styleguide).
 * Not built into production and not linked from the site.
 */
import { CalendarDays, MessageCircle, Phone } from 'lucide-react';
import { Accordion } from '../components/Accordion';
import { Button } from '../components/Button';
import { Container } from '../components/Container';
import { DoctorCard } from '../components/DoctorCard';
import { Photo, type PhotoShape } from '../components/Photo';
import { ServiceCard } from '../components/ServiceCard';
import { doctors, services } from '../content/site';
import { useCopy } from '../i18n/LanguageProvider';

const swatches = [
  ['ivory', '#fbf7f0'], ['paper', '#fffdf9'], ['sand', '#f3ece0'], ['ink', '#1f2a27'], ['ink-soft', '#4b5753'],
  ['teal-700', '#1f5a51'], ['teal-900', '#12362f'], ['teal-100', '#dcebe6'], ['clay-500', '#bf6e45'], ['clay-600', '#a3552f'],
  ['clay-100', '#f6e6da'], ['sage-100', '#e6ece1'], ['sage-300', '#b7c6ac'], ['emergency', '#b3261e'],
];

export default function StyleguidePage() {
  const copy = useCopy();
  const shapes: PhotoShape[] = ['arch', 'cradle', 'leaf', 'soft', 'circle'];
  return (
    <Container className="space-y-20 py-16">
      <section>
        <h2 className="t-h3">Colour</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          {swatches.map(([name, hex]) => (
            <div key={name}>
              <div className="h-20 rounded-2xl ring-1 ring-line" style={{ background: hex }} />
              <p className="mt-2 text-[0.9375rem] font-semibold">{name}</p>
              <p className="text-[0.9375rem] text-ink-muted">{hex}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="t-h3">Type</h2>
        <p className="t-display text-teal-950">{copy.hero.title}</p>
        <p className="t-h1 text-teal-950">{copy.pages.ivf.title}</p>
        <p className="t-h2 text-teal-950">{copy.services.title}</p>
        <p className="t-h3 text-teal-950">{copy.pregnancy.title}</p>
        <p className="t-lead max-w-2xl">{copy.hero.lead}</p>
        <p className="max-w-2xl">{copy.maternity.lead}</p>
        <p className="t-label text-sage-700">{copy.pregnancy.label}</p>
        <p className="t-number text-[6rem] text-clay-600">70,000+</p>
      </section>

      <section>
        <h2 className="t-h3">Buttons</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button size="lg" icon={<CalendarDays aria-hidden="true" />}>{copy.actions.book}</Button>
          <Button variant="secondary" size="lg" icon={<MessageCircle aria-hidden="true" />}>{copy.actions.chatWhatsapp}</Button>
          <Button variant="emergency" icon={<Phone aria-hidden="true" />}>{copy.actions.callEmergency}</Button>
          <Button variant="quiet">{copy.maternity.more}</Button>
        </div>
        <div className="mt-6 flex flex-wrap gap-3 rounded-[2rem] bg-teal-900 p-8">
          <Button variant="light" size="lg">{copy.ivf.whatsapp}</Button>
          <Button variant="lightOutline" size="lg">{copy.ivf.book}</Button>
        </div>
      </section>

      <section>
        <h2 className="t-h3">Image shapes and fallback tiles</h2>
        <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-5">
          {shapes.map((s, i) => (
            <div key={s}>
              <Photo id={(['hero-main', 'ivf-consultation', 'maternity-labour', 'service-gynaecology', 'hero-secondary'] as const)[i]} shape={s} aspect={s === 'circle' ? 1 : 4 / 5} />
              <p className="mt-2 text-[0.9375rem] text-ink-muted">{s}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="t-h3">Cards</h2>
        <div className="mt-6 grid gap-8 md:grid-cols-3">
          <ServiceCard service={services[0]} />
          <ServiceCard service={services[6]} />
          <DoctorCard doctor={doctors[0]} />
        </div>
      </section>

      <section className="max-w-3xl">
        <h2 className="t-h3">Accordion</h2>
        <div className="mt-6">
          <Accordion
            defaultOpen="a"
            items={[
              { id: 'a', title: copy.faq.items.booking.q, body: copy.faq.items.booking.a },
              { id: 'b', title: copy.faq.items.sundays.q, body: copy.faq.items.sundays.a },
            ]}
          />
        </div>
      </section>
    </Container>
  );
}
