import { MessageCircle } from 'lucide-react';
import { useRef, useState, type FormEvent } from 'react';
import { whatsappLink } from '../content/site';
import { useCopy } from '../i18n/LanguageProvider';
import { Button } from './Button';

/**
 * Contact enquiry.
 *
 * There is no backend, so this does not submit anywhere. It validates locally,
 * builds a message and hands the visitor to WhatsApp, where nothing leaves their
 * device until they press send. The UI says so before they press anything, and
 * never claims the hospital has received the message.
 *
 * Deliberately no field asks for symptoms or medical history: a first contact
 * should not require disclosing health information.
 */
export function ContactEnquiry() {
  const copy = useCopy();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState<{ name?: string; phone?: string; blocked?: string }>({});

  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();

    const digits = phone.replace(/\D/g, '').replace(/^91(?=\d{10}$)/, '').replace(/^0(?=\d{10}$)/, '');
    const next: typeof errors = {};
    if (name.trim().length < 2) next.name = copy.contact.enquiry.errors.name;
    if (!/^\d{10}$/.test(digits)) next.phone = copy.contact.enquiry.errors.phone;
    setErrors(next);

    if (next.name || next.phone) {
      (next.name ? nameRef : phoneRef).current?.focus();
      return;
    }

    const opened = window.open(
      whatsappLink(copy.contact.enquiry.message({ name: name.trim(), phone: digits, note: note.trim() })),
      '_blank',
      'noopener',
    );
    if (!opened) {
      setErrors({ blocked: copy.contact.enquiry.errors.blocked });
      return;
    }
  };

  return (
    <section aria-labelledby="enquiry-title" className="pb-20 md:pb-24">
      <div className="mx-auto max-w-[42rem]">
        <h2 id="enquiry-title" className="t-h2 text-teal-950">
          {copy.contact.enquiry.title}
        </h2>
        <p className="mt-3 t-lead text-ink-soft">{copy.contact.enquiry.lead}</p>

        <p className="mt-5 flex items-start gap-2.5 rounded-[var(--radius-sm)] bg-sand px-4 py-3 t-small text-ink-soft">
          <MessageCircle className="mt-0.5 size-4 shrink-0 text-teal-700" aria-hidden="true" />
          {copy.contact.enquiry.disclaimer}
        </p>

        <form onSubmit={submit} noValidate className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <label htmlFor="enq-name" className="block t-label uppercase text-ink-muted">
              {copy.contact.enquiry.name}
            </label>
            <input
              ref={nameRef}
              id="enq-name"
              name="name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'enq-name-error' : undefined}
              className="mt-1.5 min-h-12 w-full rounded-[var(--radius-sm)] border border-line bg-paper px-3.5"
            />
            {errors.name && (
              <p id="enq-name-error" role="alert" className="mt-1.5 t-meta text-emergency-700">
                {errors.name}
              </p>
            )}
          </div>

          <div className="sm:col-span-1">
            <label htmlFor="enq-phone" className="block t-label uppercase text-ink-muted">
              {copy.contact.enquiry.phone}
            </label>
            <input
              ref={phoneRef}
              id="enq-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? 'enq-phone-error' : undefined}
              className="mt-1.5 min-h-12 w-full rounded-[var(--radius-sm)] border border-line bg-paper px-3.5"
            />
            {errors.phone && (
              <p id="enq-phone-error" role="alert" className="mt-1.5 t-meta text-emergency-700">
                {errors.phone}
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="enq-note" className="block t-label uppercase text-ink-muted">
              {copy.contact.enquiry.note}
            </label>
            <textarea
              id="enq-note"
              name="note"
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              aria-describedby="enq-note-help"
              className="mt-1.5 w-full rounded-[var(--radius-sm)] border border-line bg-paper px-3.5 py-3"
            />
            <p id="enq-note-help" className="mt-1.5 t-meta text-ink-muted">
              {copy.contact.enquiry.noteHelp}
            </p>
          </div>

          {errors.blocked && (
            <p role="alert" className="sm:col-span-2 t-small text-emergency-700">
              {errors.blocked}
            </p>
          )}

          <div className="sm:col-span-2">
            <Button type="submit" size="lg" icon={<MessageCircle aria-hidden="true" />}>
              {copy.contact.enquiry.submit}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
