import React, { useEffect, useMemo, useState } from 'react';
import {
  Baby,
  Heart,
  Brain,
  Bone,
  Activity,
  Stethoscope,
  FlaskConical,
  Pill,
  Ambulance,
  Sparkles,
  Check,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  Video,
  Building2,
  User,
  Phone,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
  Languages,
  TriangleAlert,
  RotateCcw,
} from 'lucide-react';
import {
  BOOKABLE_SPECIALITIES,
  DOCTORS_DATA,
  HOSPITAL_DATA,
  getSpeciality,
  doctorsForSpeciality,
  type DoctorProfile,
  type SpecialityIcon,
} from '../data/hospitalData';
import { Modal } from './Overlay';
import { Button } from './ui';

/* ============================================================================
   Frictionless appointment booking — 4-step wizard
   ----------------------------------------------------------------------------
   Step 1  Choose speciality      (grouped, with pending-confirmation notices)
   Step 2  Choose doctor          (or a department desk)
   Step 3  Date, time + modality  (in-person vs video)
   Step 4  Details & confirmation (with review before submit)

   The draft is mirrored to localStorage so a patient who is interrupted does
   not lose what they typed. No clinical information is ever requested.
   ========================================================================== */

const ICONS: Record<SpecialityIcon, React.ElementType> = {
  baby: Baby,
  heart: Heart,
  brain: Brain,
  bone: Bone,
  child: Activity,
  stethoscope: Stethoscope,
  flask: FlaskConical,
  pill: Pill,
  ambulance: Ambulance,
  sparkles: Sparkles,
};

export type AppointmentMode = 'in-person' | 'video';

interface BookingState {
  specialityId: string;
  doctorId: string;
  date: string;
  time: string;
  mode: AppointmentMode;
  fullName: string;
  phone: string;
  email: string;
  notes: string;
  consent: boolean;
}

const EMPTY: BookingState = {
  specialityId: '',
  doctorId: '',
  date: '',
  time: '',
  mode: 'in-person',
  fullName: '',
  phone: '',
  email: '',
  notes: '',
  consent: false,
};

const DRAFT_KEY = 'lailas.booking.draft.v1';

const STEPS = [
  { id: 1, label: 'Speciality' },
  { id: 2, label: 'Doctor' },
  { id: 3, label: 'Date & time' },
  { id: 4, label: 'Confirm' },
] as const;

/** Half-hour slots across the published OPD window (Mon–Sat, 9:00–17:00). */
const SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30',
];

const formatSlot = (slot: string): string => {
  const [h, m] = slot.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, '0')} ${suffix}`;
};

const formatDateLong = (iso: string): string => {
  if (!iso) return '';
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });
};

/** Next N selectable dates (today onward), skipping nothing — doctors filter. */
function upcomingDates(count = 14): string[] {
  const out: string[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 0; i < count; i += 1) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    out.push(d.toISOString().split('T')[0]);
  }
  return out;
}

const dayOfWeek = (iso: string): number => new Date(`${iso}T00:00:00`).getDay();

const isDesk = (doc: DoctorProfile): boolean => /desk|team/i.test(doc.name);

/* -------------------------------------------------------------------------- */

interface AppointmentWizardProps {
  isOpen: boolean;
  onClose: () => void;
  /** Pre-selects a speciality, e.g. from search or a department card. */
  defaultSpecialityId?: string;
  /** Jumps straight to a specific step (used by "Choose doctor" links). */
  initialStep?: number;
}

export const AppointmentWizard: React.FC<AppointmentWizardProps> = ({
  isOpen,
  onClose,
  defaultSpecialityId,
  initialStep = 1,
}) => {
  const [step, setStep] = useState(initialStep);
  const [form, setForm] = useState<BookingState>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState<string | null>(null);

  const dates = useMemo(() => upcomingDates(14), []);
  const speciality = getSpeciality(form.specialityId);
  const doctors = useMemo(
    () => (form.specialityId ? doctorsForSpeciality(form.specialityId) : []),
    [form.specialityId],
  );
  const doctor = DOCTORS_DATA.find((d) => d.id === form.doctorId);

  /* --- Restore / persist the draft ------------------------------------- */
  useEffect(() => {
    if (!isOpen) return;
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<BookingState>;
        setForm((prev) => ({ ...prev, ...parsed, consent: false }));
      }
    } catch {
      /* storage unavailable (private mode) — proceed with a blank form */
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({ ...form, consent: false }));
    } catch {
      /* non-fatal */
    }
  }, [form, isOpen]);

  /* --- Reset + seed when opened ---------------------------------------- */
  useEffect(() => {
    if (!isOpen) return;
    setStep(initialStep);
    setErrors({});
    setReference(null);
    setSubmitting(false);
    setForm((prev) => ({
      ...prev,
      specialityId: defaultSpecialityId ?? prev.specialityId,
      doctorId: defaultSpecialityId ? '' : prev.doctorId,
      date: '',
      time: '',
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, defaultSpecialityId, initialStep]);

  const set = <K extends keyof BookingState>(key: K, value: BookingState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key as string]) return prev;
      const next = { ...prev };
      delete next[key as string];
      return next;
    });
  };

  /* --- Validation ------------------------------------------------------ */
  const validateStep = (which: number): boolean => {
    const next: Record<string, string> = {};

    if (which === 1 && !form.specialityId) {
      next.specialityId = 'Please choose the department you need.';
    }
    if (which === 2 && !form.doctorId) {
      next.doctorId = 'Please choose a doctor or clinic desk.';
    }
    if (which === 3) {
      if (!form.date) next.date = 'Please pick a date.';
      if (!form.time) next.time = 'Please pick a time slot.';
    }
    if (which === 4) {
      if (!form.fullName.trim()) next.fullName = 'Please enter the patient’s name.';
      else if (form.fullName.trim().length < 2) next.fullName = 'Name must be at least 2 characters.';

      const digits = form.phone.replace(/[\s\-+()]/g, '');
      if (!form.phone.trim()) next.phone = 'Please enter a contact phone number.';
      else if (digits.length < 10) next.phone = 'Please enter a valid 10-digit mobile number.';

      if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
        next.email = 'Please check the email address, or leave it blank.';
      }
      if (!form.consent) next.consent = 'Please confirm you agree to be contacted.';
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const goNext = () => {
    if (!validateStep(step)) return;
    setStep((s) => Math.min(4, s + 1));
  };
  const goBack = () => {
    setErrors({});
    setStep((s) => Math.max(1, s - 1));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(4)) return;
    setSubmitting(true);
    // Client-side acknowledgement only; reception confirms the slot by phone.
    setTimeout(() => {
      const ref = `LH-${new Date().getFullYear()}-${String(
        Math.floor(1000 + Math.random() * 9000),
      )}`;
      setReference(ref);
      setSubmitting(false);
      try {
        localStorage.removeItem(DRAFT_KEY);
      } catch {
        /* non-fatal */
      }
    }, 800);
  };

  const resetAndClose = () => {
    setForm(EMPTY);
    setStep(1);
    setReference(null);
    setErrors({});
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch {
      /* non-fatal */
    }
    onClose();
  };

  /** Re-run the wizard for a fresh booking. */
  const bookAnother = () => {
    setForm(EMPTY);
    setStep(1);
    setReference(null);
    setErrors({});
  };

  const availableDates = useMemo(() => {
    if (!doctor) return dates;
    // Sunday OPD is closed; restrict to the doctor's consulting days.
    return dates.filter((d) => doctor.consultingDays.includes(dayOfWeek(d)));
  }, [dates, doctor]);

  /* --- Render ---------------------------------------------------------- */

  return (
    <Modal
      isOpen={isOpen}
      onClose={resetAndClose}
      title={reference ? 'Appointment request received' : 'Book an appointment'}
      eyebrow={reference ? undefined : `Step ${step} of 4`}
      description={
        reference ? undefined : `${HOSPITAL_DATA.name} · Chemmad, Malappuram`
      }
      size="xl"
    >
      {/* Emergency notice — always visible, never dismissible */}
      {!reference && (
        <div className="mb-5 flex items-start gap-3 rounded-xl border border-critical-line bg-critical-soft px-4 py-3">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-critical" aria-hidden="true" />
          <p className="text-sm leading-relaxed text-critical">
            <strong className="font-semibold">This form is not for emergencies.</strong> For urgent
            care call{' '}
            <a href={`tel:${HOSPITAL_DATA.emergency.tel}`} className="tabular-numbers font-semibold underline">
              {HOSPITAL_DATA.emergency.display}
            </a>{' '}
            or come directly to casualty.
          </p>
        </div>
      )}

      {/* Progress */}
      {!reference && (
        <ol className="mb-6 flex items-center gap-1.5" aria-label="Booking progress">
          {STEPS.map((s) => {
            const done = step > s.id;
            const current = step === s.id;
            return (
              <li key={s.id} className="flex flex-1 items-center gap-1.5">
                <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                  <span
                    className={`flex items-center gap-1.5 text-xs font-semibold ${
                      current ? 'text-brand-800' : done ? 'text-sand-600' : 'text-ink-soft'
                    }`}
                  >
                    <span
                      className={`grid h-5 w-5 shrink-0 place-items-center rounded-full text-[0.6875rem] ${
                        done
                          ? 'bg-brand-600 text-white'
                          : current
                            ? 'bg-brand-700 text-white'
                            : 'bg-brand-100 text-ink-soft'
                      }`}
                      aria-hidden="true"
                    >
                      {done ? <Check className="h-3 w-3" /> : s.id}
                    </span>
                    <span className="truncate">{s.label}</span>
                  </span>
                  <span
                    className={`h-1 rounded-full ${current || done ? 'bg-brand-500' : 'bg-brand-100'}`}
                    aria-hidden="true"
                  />
                </div>
              </li>
            );
          })}
        </ol>
      )}

      {/* ------------------------------- SUCCESS ------------------------- */}
      {reference ? (
        <div className="space-y-6 py-2 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success-soft text-success">
            <CheckCircle2 className="h-9 w-9" />
          </div>
          <div>
            <h3 className="display text-2xl">Thank you — your request is with us</h3>
            <p className="mx-auto mt-3 max-w-lg rounded-2xl bg-canvas p-5 text-[0.9375rem] leading-relaxed text-ink-soft">
              “Thank you for contacting Lailas Hospital and IVF Centre. Your enquiry has been
              received. Please contact the hospital directly if your request is urgent.”
            </p>
          </div>

          <dl className="mx-auto grid max-w-lg grid-cols-1 gap-3 rounded-xl border border-line bg-white p-5 text-left text-sm sm:grid-cols-2">
            <div>
              <dt className="text-ink-soft">Reference</dt>
              <dd className="tabular-numbers font-semibold text-brand-800">{reference}</dd>
            </div>
            <div>
              <dt className="text-ink-soft">Department</dt>
              <dd className="font-semibold text-brand-800">{speciality?.title}</dd>
            </div>
            <div>
              <dt className="text-ink-soft">Doctor</dt>
              <dd className="font-semibold text-brand-800">{doctor?.name}</dd>
            </div>
            <div>
              <dt className="text-ink-soft">Requested slot</dt>
              <dd className="font-semibold text-brand-800">
                {formatDateLong(form.date)}, {formatTime(form.time)}
              </dd>
            </div>
            <div>
              <dt className="text-ink-soft">Visit type</dt>
              <dd className="font-semibold text-brand-800">
                {form.mode === 'video' ? 'Video consultation' : 'In person at hospital'}
              </dd>
            </div>
            <div>
              <dt className="text-ink-soft">Patient</dt>
              <dd className="font-semibold text-brand-800">{form.fullName}</dd>
            </div>
          </dl>

          <p className="mx-auto max-w-lg text-sm text-ink-soft">
            This is a request, not a confirmed slot. Our reception team will call{' '}
            <span className="tabular-numbers font-medium text-brand-800">{form.phone}</span> during
            OPD hours to confirm the timing.
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-1">
            <Button
              onClick={() => {
                window.location.href = `tel:${HOSPITAL_DATA.emergency.tel}`;
              }}
              size="lg"
            >
              <Phone className="h-4 w-4" />
              Call hospital reception
            </Button>
            <Button variant="secondary" size="lg" onClick={bookAnother}>
              <RotateCcw className="h-4 w-4" />
              Book another
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={submit} noValidate>
          {/* ------------------------------ STEP 1 ------------------------ */}
          {step === 1 && (
            <fieldset>
              <legend className="text-base font-semibold text-brand-800">
                What do you need help with?
              </legend>
              <p className="mt-1 text-sm text-ink-soft">
                Choose a department. You can change this on the next step.
              </p>

              {errors.specialityId && (
                <p role="alert" className="mt-3 text-sm font-medium text-critical">
                  {errors.specialityId}
                </p>
              )}

              <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {BOOKABLE_SPECIALITIES.map((s) => {
                  const Icon = ICONS[s.icon] ?? Stethoscope;
                  const selected = form.specialityId === s.id;
                  return (
                    <label
                      key={s.id}
                      className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition-all duration-200 ${
                        selected
                          ? 'border-brand-600 bg-brand-50 ring-2 ring-brand-500/25'
                          : 'border-line bg-white hover:border-brand-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="speciality"
                        value={s.id}
                        checked={selected}
                        onChange={() => {
                          set('specialityId', s.id);
                          set('doctorId', '');
                          set('date', '');
                          set('time', '');
                        }}
                        className="sr-only"
                      />
                      <span
                        className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${
                          selected ? 'bg-brand-700 text-white' : 'bg-brand-50 text-brand-700'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2">
                          <span className="font-semibold text-brand-800">{s.title}</span>
                          {selected && <Check className="h-4 w-4 shrink-0 text-sand-600" />}
                        </span>
                        <span className="mt-1 block text-xs leading-relaxed text-ink-soft">
                          {s.availability}
                        </span>
                        {!s.verified && (
                          <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-brand-50 px-2 py-0.5 text-[0.6875rem] font-medium text-sand-600">
                            <TriangleAlert className="h-3 w-3" />
                            Pending confirmation
                          </span>
                        )}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          )}

          {/* ------------------------------ STEP 2 ------------------------ */}
          {step === 2 && (
            <fieldset>
              <legend className="text-base font-semibold text-brand-800">
                Who would you like to see?
              </legend>
              <p className="mt-1 text-sm text-ink-soft">
                {speciality?.title} · {doctors.length} option{doctors.length === 1 ? '' : 's'}
              </p>

              {errors.doctorId && (
                <p role="alert" className="mt-3 text-sm font-medium text-critical">
                  {errors.doctorId}
                </p>
              )}

              <div className="mt-4 space-y-2.5">
                {doctors.length === 0 && (
                  <p className="rounded-2xl border border-line bg-canvas p-4 text-sm text-ink-soft">
                    No named consultant is listed for this department yet. Choose the department desk
                    below and reception will allocate the duty clinician.
                  </p>
                )}

                {doctors.map((d) => {
                  const selected = form.doctorId === d.id;
                  const initials = d.name
                    .replace(/^(Dr\.?|Department of)\s*/i, '')
                    .split(/\s+/)
                    .slice(0, 2)
                    .map((w) => w[0])
                    .join('')
                    .toUpperCase();
                  return (
                    <label
                      key={d.id}
                      className={`flex cursor-pointer items-start gap-3.5 rounded-xl border p-4 transition-all duration-200 ${
                        selected
                          ? 'border-brand-600 bg-brand-50 ring-2 ring-brand-500/25'
                          : 'border-line bg-white hover:border-brand-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="doctor"
                        value={d.id}
                        checked={selected}
                        onChange={() => {
                          set('doctorId', d.id);
                          set('date', '');
                          set('time', '');
                        }}
                        className="sr-only"
                      />
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-sand-600 to-brand-800 font-display text-base font-semibold text-white">
                        {initials}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold text-brand-800">{d.name}</span>
                        <span className="mt-0.5 block text-sm text-coral-600">{d.designation}</span>
                        <span className="mt-1 block text-sm text-ink-soft">{d.specialty}</span>
                        <span className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-soft">
                          <span className="inline-flex items-center gap-1">
                            <Languages className="h-3.5 w-3.5" aria-hidden="true" />
                            {d.languages.join(', ')}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                            {isDesk(d) ? 'Department desk' : 'Named consultant'}
                          </span>
                        </span>
                        {d.isVerifiedPlaceholder && (
                          <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-brand-50 px-2 py-0.5 text-[0.6875rem] font-medium text-sand-600">
                            <TriangleAlert className="h-3 w-3" />
                            Credentials pending verification
                          </span>
                        )}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          )}

          {/* ------------------------------ STEP 3 ------------------------ */}
          {step === 3 && (
            <fieldset>
              <legend className="text-base font-semibold text-brand-800">
                Choose your visit type, date and time
              </legend>

              {/* Modality toggle */}
              <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {(
                  [
                    {
                      id: 'in-person' as const,
                      label: 'In person',
                      detail: 'Examination, scans and procedures at the hospital',
                      Icon: Building2,
                    },
                    {
                      id: 'video' as const,
                      label: 'Video consultation',
                      detail: 'Follow-ups and second opinions where no examination is needed',
                      Icon: Video,
                    },
                  ]
                ).map((opt) => {
                  const selected = form.mode === opt.id;
                  return (
                    <label
                      key={opt.id}
                      className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-all duration-200 ${
                        selected
                          ? 'border-brand-600 bg-brand-50 ring-2 ring-brand-500/25'
                          : 'border-line bg-white hover:border-brand-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="mode"
                        value={opt.id}
                        checked={selected}
                        onChange={() => {
                          set('mode', opt.id);
                          set('time', '');
                        }}
                        className="sr-only"
                      />
                      <span
                        className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${
                          selected ? 'bg-brand-700 text-white' : 'bg-brand-50 text-brand-700'
                        }`}
                      >
                        <opt.Icon className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block font-semibold text-brand-800">{opt.label}</span>
                        <span className="mt-0.5 block text-xs leading-relaxed text-ink-soft">
                          {opt.detail}
                        </span>
                      </span>
                    </label>
                  );
                })}
              </div>

              {form.mode === 'video' && (
                <p className="mt-3 flex items-start gap-2.5 rounded-2xl border border-line bg-canvas p-3.5 text-sm text-ink-soft">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-sand-600" aria-hidden="true" />
                  A video link is sent by SMS once reception confirms. Video appointments cannot
                  replace scans, sample collection or emergency care.
                </p>
              )}

              {/* Date */}
              <div className="mt-6">
                <p className="text-sm font-semibold text-brand-800">
                  Pick a date{' '}
                  <span className="font-normal text-ink-soft">
                    (showing consulting days{doctor ? ` for ${doctor.name}` : ''})
                  </span>
                </p>
                {errors.date && (
                  <p role="alert" className="mt-2 text-sm font-medium text-critical">
                    {errors.date}
                  </p>
                )}
                <div className="mt-2.5 flex gap-2 overflow-x-auto pb-2">
                  {availableDates.length === 0 && (
                    <p className="text-sm text-ink-soft">
                      No consulting days in the next fortnight. Please call reception.
                    </p>
                  )}
                  {availableDates.map((d) => {
                    const selected = form.date === d;
                    const dt = new Date(`${d}T00:00:00`);
                    return (
                      <button
                        key={d}
                        type="button"
                        onClick={() => {
                          set('date', d);
                          set('time', '');
                        }}
                        aria-pressed={selected}
                        className={`flex min-h-[4.5rem] w-[4.25rem] shrink-0 flex-col items-center justify-center rounded-xl border transition-all duration-200 ${
                          selected
                            ? 'border-brand-600 bg-brand-700 text-white'
                            : 'border-line bg-white text-brand-800 hover:border-brand-300'
                        }`}
                      >
                        <span className="text-[0.6875rem] font-medium uppercase tracking-wide opacity-80">
                          {dt.toLocaleDateString('en-IN', { weekday: 'short' })}
                        </span>
                        <span className="text-lg font-semibold leading-tight">{dt.getDate()}</span>
                        <span className="text-[0.6875rem] opacity-80">
                          {dt.toLocaleDateString('en-IN', { month: 'short' })}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time */}
              <div className="mt-5">
                <p className="text-sm font-semibold text-brand-800">Pick a time</p>
                {errors.time && (
                  <p role="alert" className="mt-2 text-sm font-medium text-critical">
                    {errors.time}
                  </p>
                )}
                <div className="mt-2.5 grid grid-cols-3 gap-2 sm:grid-cols-5">
                  {SLOTS.map((slot) => {
                    const selected = form.time === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        disabled={!form.date}
                        onClick={() => set('time', slot)}
                        aria-pressed={selected}
                        className={`min-h-11 rounded-xl border px-2 text-sm font-medium tabular-numbers transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40 ${
                          selected
                            ? 'border-brand-600 bg-brand-700 text-white'
                            : 'border-line bg-white text-brand-800 hover:border-brand-300'
                        }`}
                      >
                        {formatSlot(slot)}
                      </button>
                    );
                  })}
                </div>
                {!form.date && (
                  <p className="mt-2 text-xs text-ink-soft">Choose a date first to enable time slots.</p>
                )}
              </div>
            </fieldset>
          )}

          {/* ------------------------------ STEP 4 ------------------------ */}
          {step === 4 && (
            <fieldset className="space-y-4">
              <legend className="text-base font-semibold text-brand-800">
                Your details &amp; confirmation
              </legend>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="bk-name" className="mb-1.5 block text-sm font-semibold text-brand-800">
                    Patient name <span className="text-coral-600">*</span>
                  </label>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-sand-500" />
                    <input
                      id="bk-name"
                      type="text"
                      autoComplete="name"
                      value={form.fullName}
                      onChange={(e) => set('fullName', e.target.value)}
                      aria-invalid={!!errors.fullName}
                      aria-describedby={errors.fullName ? 'bk-name-err' : undefined}
                      placeholder="Full name"
                      className="w-full rounded-lg border border-line bg-canvas py-3 pl-10 pr-3 text-base text-ink placeholder:text-sand-500 focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-500/10"
                    />
                  </div>
                  {errors.fullName && (
                    <p id="bk-name-err" role="alert" className="mt-1.5 text-sm font-medium text-critical">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="bk-phone" className="mb-1.5 block text-sm font-semibold text-brand-800">
                    Mobile number <span className="text-coral-600">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-sand-500" />
                    <input
                      id="bk-phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={(e) => set('phone', e.target.value)}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? 'bk-phone-err' : 'bk-phone-help'}
                      placeholder="98460 00000"
                      className="w-full rounded-lg border border-line bg-canvas py-3 pl-10 pr-3 text-base tabular-numbers text-ink placeholder:text-sand-500 focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-500/10"
                    />
                  </div>
                  {errors.phone ? (
                    <p id="bk-phone-err" role="alert" className="mt-1.5 text-sm font-medium text-critical">
                      {errors.phone}
                    </p>
                  ) : (
                    <p id="bk-phone-help" className="mt-1.5 text-xs text-ink-soft">
                      We call this number to confirm the slot.
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="bk-email" className="mb-1.5 block text-sm font-semibold text-brand-800">
                  Email <span className="font-normal text-ink-soft">(optional)</span>
                </label>
                <input
                  id="bk-email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => set('email', e.target.value)}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'bk-email-err' : undefined}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-line bg-canvas px-4 py-3 text-base text-ink placeholder:text-sand-500 focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-500/10"
                />
                {errors.email && (
                  <p id="bk-email-err" role="alert" className="mt-1.5 text-sm font-medium text-critical">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="bk-notes" className="mb-1.5 block text-sm font-semibold text-brand-800">
                  Anything we should know? <span className="font-normal text-ink-soft">(optional)</span>
                </label>
                <textarea
                  id="bk-notes"
                  rows={3}
                  value={form.notes}
                  onChange={(e) => set('notes', e.target.value)}
                  aria-describedby="bk-notes-help"
                  placeholder="For example: I prefer a morning slot."
                  className="w-full rounded-lg border border-line bg-canvas px-4 py-3 text-base text-ink placeholder:text-sand-500 focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-500/10"
                />
                <p id="bk-notes-help" className="mt-1.5 text-xs text-ink-soft">
                  Please do not include medical history or test results here.
                </p>
              </div>

              {/* Review summary */}
              <div className="rounded-2xl border border-line bg-canvas p-4">
                <p className="text-sm font-semibold text-brand-800">Please check your request</p>
                <dl className="mt-2.5 grid grid-cols-1 gap-x-4 gap-y-2 text-sm sm:grid-cols-2">
                  <div className="flex gap-2">
                    <dt className="text-ink-soft">Department:</dt>
                    <dd className="font-medium text-brand-800">{speciality?.title}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-ink-soft">Doctor:</dt>
                    <dd className="font-medium text-brand-800">{doctor?.name}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-ink-soft">Date:</dt>
                    <dd className="font-medium text-brand-800">{formatDateLong(form.date)}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-ink-soft">Time:</dt>
                    <dd className="font-medium tabular-numbers text-brand-800">
                      {formatTime(form.time)}
                    </dd>
                  </div>
                  <div className="flex gap-2 sm:col-span-2">
                    <dt className="text-ink-soft">Visit type:</dt>
                    <dd className="font-medium text-brand-800">
                      {form.mode === 'video' ? 'Video consultation' : 'In person at hospital'}
                    </dd>
                  </div>
                </dl>
              </div>

              <div>
                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-white p-4 text-sm text-ink-soft">
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => set('consent', e.target.checked)}
                    aria-invalid={!!errors.consent}
                    className="mt-0.5 h-5 w-5 shrink-0 rounded border-line text-brand-700 accent-brand-700 focus:ring-brand-500"
                  />
                  <span className="leading-relaxed">
                    I agree that Lailas Hospital and IVF Centre may contact me about this request. I
                    understand this is a request and not a confirmed appointment.{' '}
                    <span className="text-coral-600">*</span>
                  </span>
                </label>
                {errors.consent && (
                  <p role="alert" className="mt-1.5 text-sm font-medium text-critical">
                    {errors.consent}
                  </p>
                )}
              </div>
            </fieldset>
          )}

          {/* ------------------------------ NAV --------------------------- */}
          <div className="mt-7 flex flex-col-reverse items-stretch gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              {step > 1 && (
                <Button variant="ghost" onClick={goBack}>
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </Button>
              )}
            </div>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center">
              <span className="text-center text-xs text-ink-soft sm:text-right">
                Step {step} of 4
              </span>
              {step < 4 ? (
                <Button onClick={goNext} size="lg">
                  Continue
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button type="submit" size="lg" disabled={submitting}>
                  {submitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Calendar className="h-4 w-4" />
                  )}
                  {submitting ? 'Sending request…' : 'Request this appointment'}
                </Button>
              )}
            </div>
          </div>
        </form>
      )}
    </Modal>
  );
};

/** Local formatter kept beside the slot list it formats. */
function formatTime(slot: string): string {
  if (!slot) return '';
  return formatSlot(slot);
}
