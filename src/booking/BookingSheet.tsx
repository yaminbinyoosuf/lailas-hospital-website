import { ArrowLeft, Check, MessageCircle, Phone, Send, X } from 'lucide-react';
import { useEffect, useId, useMemo, useRef, useState, type FormEvent } from 'react';
import { Button } from '../components/Button';
import { booking, contact, doctors, hours, services, whatsappLink, type Weekday } from '../content/site';
import { useCopy } from '../i18n/LanguageProvider';
import { addDays, cn, formatDate, formatHours } from '../lib/format';
import type { BookingTarget } from './BookingProvider';

type Step = 'who' | 'day' | 'details' | 'done';
const STEPS: Step[] = ['who', 'day', 'details'];

interface Props {
  initialTarget?: BookingTarget;
  onClosed: () => void;
}

/**
 * One booking flow for the whole site: who, which day, name and phone.
 * Sends to VITE_BOOKING_ENDPOINT when set, otherwise opens WhatsApp.
 */
export default function BookingSheet({ initialTarget, onClosed }: Props) {
  const copy = useCopy();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const ids = useId();

  const [target, setTarget] = useState<BookingTarget | undefined>(initialTarget);
  const [step, setStep] = useState<Step>(initialTarget ? 'day' : 'who');
  const [day, setDay] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<{ name?: string; phone?: string; send?: string }>({});
  const [sending, setSending] = useState(false);
  const [sentVia, setSentVia] = useState<'whatsapp' | 'form'>('whatsapp');

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.showModal();
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    headingRef.current?.focus();
  }, [step]);

  const close = () => dialogRef.current?.close();

  const doctor = target?.kind === 'doctor' ? doctors.find((d) => d.id === target.id) : undefined;
  const whoLabel = target
    ? target.kind === 'doctor'
      ? `${doctor!.name}`
      : copy.services.items[target.id].name
    : '';

  const openDays: Weekday[] = doctor ? doctor.opd.days : hours.opd.days;
  const dayOptions = useMemo(() => {
    const today = new Date();
    const out: { key: string; label: string; sub: string }[] = [];
    for (let i = 0; out.length < booking.daysAhead && i < 14; i++) {
      const d = addDays(today, i);
      if (!openDays.includes(d.getDay() as Weekday)) continue;
      const date = formatDate(d, copy, { day: 'numeric', month: 'long' });
      const label = i === 0 ? copy.time.today : i === 1 ? copy.time.tomorrow : copy.time.days[d.getDay()];
      out.push({ key: d.toDateString(), label, sub: date });
    }
    return out;
  }, [openDays, copy]);

  const stepIndex = STEPS.indexOf(step);

  const chooseTarget = (t: BookingTarget) => {
    setTarget(t);
    setStep('day');
  };

  const chooseDay = (label: string) => {
    setDay(label);
    setStep('details');
  };

  const back = () => {
    if (step === 'details') setStep('day');
    else if (step === 'day') setStep('who');
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const digits = phone.replace(/\D/g, '').replace(/^91(?=\d{10}$)/, '').replace(/^0(?=\d{10}$)/, '');
    const next: typeof errors = {};
    if (name.trim().length < 2) next.name = copy.booking.errors.name;
    if (!/^\d{10}$/.test(digits)) next.phone = copy.booking.errors.phone;
    setErrors(next);
    if (next.name || next.phone) {
      document.getElementById(next.name ? `${ids}-name` : `${ids}-phone`)?.focus();
      return;
    }
    const details = { name: name.trim(), phone: digits, who: whoLabel, day: day ?? copy.booking.day.anyDay };

    if (booking.endpoint) {
      setSending(true);
      try {
        const res = await fetch(booking.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...details, language: copy.lang, page: window.location.pathname }),
        });
        if (!res.ok) throw new Error(String(res.status));
        setSentVia('form');
        setStep('done');
      } catch {
        setErrors({ send: copy.booking.errors.send });
      } finally {
        setSending(false);
      }
      return;
    }

    window.open(whatsappLink(copy.booking.message(details)), '_blank', 'noopener');
    setSentVia('whatsapp');
    setStep('done');
  };

  const choice =
    'flex min-h-14 w-full items-center justify-between gap-4 rounded-2xl border border-line bg-paper px-5 py-3 text-left transition-colors hover:border-teal-600 hover:bg-teal-50';

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={`${ids}-title`}
      onClose={onClosed}
      onClick={(e) => e.target === dialogRef.current && close()}
      className="sheet fixed inset-x-0 top-auto bottom-0 m-0 max-h-[92dvh] w-full max-w-none overflow-hidden rounded-t-[2rem] bg-ivory p-0 text-ink sm:inset-0 sm:m-auto sm:h-fit sm:max-w-xl sm:rounded-[2rem]"
    >
      <div className="flex max-h-[92dvh] flex-col">
        <div className="flex items-start justify-between gap-4 border-b border-line px-6 pt-5 pb-4">
          <div>
            <p id={`${ids}-title`} className="font-serif text-2xl text-teal-950">
              {copy.booking.title}
            </p>
            {step !== 'done' && (
              <p className="mt-1 text-[0.9375rem] text-ink-muted">{copy.booking.stepOf(stepIndex + 1, STEPS.length)}</p>
            )}
          </div>
          <button
            type="button"
            onClick={close}
            className="grid size-12 shrink-0 place-items-center rounded-full border border-ink/15"
            aria-label={copy.a11y.close}
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <div className="overflow-y-auto px-6 pt-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
          {step !== 'done' && (
            <a
              href={`tel:${contact.primary.tel}`}
              className="mb-5 flex min-h-12 items-center gap-3 rounded-xl bg-emergency-50 px-4 py-2 text-[0.9375rem] text-emergency-700"
            >
              <Phone className="size-4 shrink-0" aria-hidden="true" />
              <span>{copy.booking.emergency(contact.primary.display)}</span>
            </a>
          )}

          {step === 'who' && (
            <div>
              <h2 ref={headingRef} tabIndex={-1} className="t-h3 outline-none">
                {copy.booking.who.title}
              </h2>
              <p className="mt-5 font-semibold text-ink-soft">{copy.booking.who.departments}</p>
              <ul className="mt-3 grid gap-2">
                {services
                  .filter((s) => s.bookable)
                  .map((s) => (
                    <li key={s.id}>
                      <button type="button" className={choice} onClick={() => chooseTarget({ kind: 'service', id: s.id })}>
                        <span className="font-semibold">{copy.services.items[s.id].name}</span>
                        <span className="text-[0.9375rem] text-ink-muted">{copy.services.items[s.id].availability}</span>
                      </button>
                    </li>
                  ))}
              </ul>
              <p className="mt-6 font-semibold text-ink-soft">{copy.booking.who.doctors}</p>
              <ul className="mt-3 grid gap-2">
                {doctors.map((d) => (
                  <li key={d.id}>
                    <button type="button" className={choice} onClick={() => chooseTarget({ kind: 'doctor', id: d.id })}>
                      <span>
                        <span className="block font-semibold">{d.name}</span>
                        <span className="block text-[0.9375rem] text-ink-muted">{copy.doctors.profiles[d.id].focus}</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {step === 'day' && (
            <div>
              <Summary label={copy.booking.summary.seeing} value={whoLabel} />
              <h2 ref={headingRef} tabIndex={-1} className="t-h3 mt-5 outline-none">
                {copy.booking.day.title}
              </h2>
              <p className="mt-1 text-ink-soft">{copy.booking.day.hint}</p>
              {doctor && (
                <p className="mt-1 text-[0.9375rem] text-ink-muted">
                  {copy.doctors.opd}: {formatHours(doctor.opd, copy)}
                </p>
              )}
              <ul className="mt-5 grid grid-cols-2 gap-2">
                {dayOptions.map((d) => (
                  <li key={d.key}>
                    <button
                      type="button"
                      onClick={() => chooseDay(`${d.label}, ${d.sub}`)}
                      className={cn(choice, 'flex-col items-start justify-center gap-0')}
                    >
                      <span className="font-semibold">{d.label}</span>
                      <span className="text-[0.9375rem] text-ink-muted">{d.sub}</span>
                    </button>
                  </li>
                ))}
                <li className="col-span-2">
                  <button type="button" onClick={() => chooseDay(copy.booking.day.anyDay)} className={choice}>
                    <span className="font-semibold">{copy.booking.day.anyDay}</span>
                  </button>
                </li>
              </ul>
              <p className="mt-3 text-[0.9375rem] text-ink-muted">{copy.booking.day.closedNote}</p>
            </div>
          )}

          {step === 'details' && (
            <form onSubmit={submit} noValidate>
              <Summary label={copy.booking.summary.seeing} value={whoLabel} />
              <Summary label={copy.booking.summary.day} value={day ?? ''} />
              <h2 ref={headingRef} tabIndex={-1} className="t-h3 mt-5 outline-none">
                {copy.booking.details.title}
              </h2>
              <div className="mt-4 grid gap-4">
                <Field
                  id={`${ids}-name`}
                  label={copy.booking.details.name}
                  value={name}
                  onChange={setName}
                  error={errors.name}
                  autoComplete="name"
                />
                <Field
                  id={`${ids}-phone`}
                  label={copy.booking.details.phone}
                  hint={copy.booking.details.phoneHint}
                  value={phone}
                  onChange={setPhone}
                  error={errors.phone}
                  autoComplete="tel"
                  type="tel"
                  inputMode="tel"
                />
              </div>
              <p className="mt-4 text-[0.9375rem] text-ink-muted">{copy.booking.details.privacy}</p>
              {errors.send && (
                <p role="alert" className="mt-4 rounded-xl bg-emergency-50 px-4 py-3 text-emergency-700">
                  {errors.send}
                </p>
              )}
              <Button
                type="submit"
                size="lg"
                className="mt-6 w-full"
                disabled={sending}
                icon={booking.endpoint ? <Send aria-hidden="true" /> : <MessageCircle aria-hidden="true" />}
              >
                {sending ? copy.booking.sending : booking.endpoint ? copy.booking.sendForm : copy.booking.sendWhatsapp}
              </Button>
            </form>
          )}

          {step === 'done' && (
            <div className="py-4 text-center">
              <span className="mx-auto grid size-16 place-items-center rounded-full bg-teal-100 text-teal-800">
                <Check className="size-8" aria-hidden="true" />
              </span>
              <h2 ref={headingRef} tabIndex={-1} className="t-h3 mt-5 outline-none" role="status">
                {sentVia === 'form' ? copy.booking.done.formTitle : copy.booking.done.whatsappTitle}
              </h2>
              <p className="mx-auto mt-3 max-w-sm text-ink-soft">
                {sentVia === 'form' ? copy.booking.done.formBody : copy.booking.done.whatsappBody}
              </p>
              <Button variant="secondary" className="mt-6" onClick={close}>
                {copy.booking.done.close}
              </Button>
            </div>
          )}

          {(step === 'day' || step === 'details') && (
            <Button variant="quiet" className="mt-4" onClick={back} icon={<ArrowLeft aria-hidden="true" />}>
              {copy.booking.back}
            </Button>
          )}
        </div>
      </div>
    </dialog>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <p className="flex items-baseline gap-2 text-[0.9375rem]">
      <span className="text-ink-muted">{label}:</span>
      <span className="font-semibold text-teal-900">{value}</span>
    </p>
  );
}

interface FieldProps {
  id: string;
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  autoComplete?: string;
  type?: string;
  inputMode?: 'tel' | 'text';
}

function Field({ id, label, hint, value, onChange, error, autoComplete, type = 'text', inputMode }: FieldProps) {
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined;
  return (
    <div>
      <label htmlFor={id} className="block font-semibold">
        {label}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="text-[0.9375rem] text-ink-muted">
          {hint}
        </p>
      )}
      <input
        id={id}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cn(
          'mt-2 block min-h-14 w-full rounded-2xl border bg-paper px-4 text-[1.0625rem] outline-none transition-colors focus:border-teal-700 focus:ring-2 focus:ring-teal-200',
          error ? 'border-emergency' : 'border-line',
        )}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-[0.9375rem] font-semibold text-emergency-700">
          {error}
        </p>
      )}
    </div>
  );
}
