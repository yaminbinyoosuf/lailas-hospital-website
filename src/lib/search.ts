import {
  SPECIALITIES,
  DOCTORS_DATA,
  HEALTH_ARTICLES,
  TRIAGE_RULES,
  HOSPITAL_DATA,
  type Speciality,
  type DoctorProfile,
  type HealthArticle,
} from '../data/hospitalData';

/* ============================================================================
   Instant search across specialities, doctors, treatments and health articles.
   Runs entirely client-side over the static data layer — no network, no
   debounce needed, and it never blocks typing on low-end phones.
   ========================================================================== */

export type SearchKind = 'speciality' | 'doctor' | 'article' | 'answer';

export interface SearchResult {
  id: string;
  kind: SearchKind;
  title: string;
  subtitle: string;
  /** Which haystack field matched — drives the "why am I seeing this" hint. */
  matchedOn: string;
  /** Route to navigate to, or null when the result opens a booking instead. */
  path: string | null;
  specialityId?: string;
  icon: string;
  score: number;
}

const KIND_LABEL: Record<SearchKind, string> = {
  speciality: 'Department',
  doctor: 'Doctor',
  article: 'Health article',
  answer: 'Common question',
};

export const kindLabel = (kind: SearchKind): string => KIND_LABEL[kind];

/** Normalise for matching: lowercase, strip punctuation and accents. */
const normalise = (value: string): string =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

/**
 * Scores a haystack against the query.
 * Prefix matches on a word outrank mid-word matches, and every extra matched
 * token adds weight so multi-word searches like "knee pain" behave sensibly.
 */
function score(haystack: string, needles: string[]): number {
  const text = normalise(haystack);
  let total = 0;
  for (const needle of needles) {
    if (!needle) continue;
    if (text === needle) total += 12;
    else if (text.startsWith(needle)) total += 7;
    else if (new RegExp(`\\b${needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`).test(text)) total += 5;
    else if (text.includes(needle)) total += 2;
  }
  return total;
}

/* --- Pre-built index ------------------------------------------------------ */
/* Built once at module load so search is a pure in-memory scan.             */

interface IndexEntry {
  id: string;
  kind: SearchKind;
  title: string;
  subtitle: string;
  /** Concatenated searchable text. */
  haystack: string;
  /** Human-readable description of which field matched. */
  matchedOn: string;
  path: string | null;
  specialityId?: string;
  icon: string;
}

/** Doctors whose only speciality is not yet bookable shouldn't dominate. */
const bookableIds = new Set(
  SPECIALITIES.filter((s) => !s.comingSoon).map((s) => s.id),
);

function buildIndex(): IndexEntry[] {
  const entries: IndexEntry[] = [];

  for (const s of SPECIALITIES) {
    entries.push({
      id: `speciality-${s.id}`,
      kind: 'speciality',
      title: s.title,
      subtitle: s.shortDesc,
      haystack: [
        s.title,
        s.shortTitle,
        s.category,
        s.services.join(' '),
        s.searchTerms.join(' '),
        s.shortDesc,
      ].join(' '),
      matchedOn: 'Department',
      path: `/specialities#${s.id}`,
      specialityId: s.id,
      icon: s.icon,
    });
  }

  for (const d of DOCTORS_DATA) {
    entries.push({
      id: `doctor-${d.id}`,
      kind: 'doctor',
      title: d.name,
      subtitle: `${d.designation} · ${d.specialty}`,
      haystack: [d.name, d.designation, d.specialty, d.qualifications, d.languages.join(' ')].join(' '),
      matchedOn: 'Doctor or clinic',
      path: '/doctors',
      specialityId: d.specialityIds.find((id) => bookableIds.has(id)) ?? d.specialityIds[0],
      icon: 'stethoscope',
    });
  }

  for (const a of HEALTH_ARTICLES) {
    entries.push({
      id: `article-${a.id}`,
      kind: 'article',
      title: a.title,
      subtitle: `${a.category} · ${a.readMinutes} min read`,
      haystack: [a.title, a.excerpt, a.category].join(' '),
      matchedOn: 'Health resource',
      path: '/resources',
      icon: 'book',
    });
  }

  // Triage rules double as a plain-language answer layer ("my knee hurts").
  for (const rule of TRIAGE_RULES) {
    entries.push({
      id: `answer-${rule.id}`,
      kind: 'answer',
      title: rule.label,
      subtitle: rule.advice,
      haystack: [rule.label, rule.keywords.join(' '), rule.advice].join(' '),
      matchedOn: 'Care guidance',
      path: null,
      specialityId: rule.specialityId,
      icon: 'help',
    });
  }

  return entries;
}

const INDEX: IndexEntry[] = buildIndex();

/** Frequently searched terms, shown as suggestions before the user types. */
export const POPULAR_SEARCHES = [
  'Periods problem',
  'Pregnancy check-up',
  'Fever',
  'Knee pain',
  'Cannot conceive',
  'Child vaccination',
  'Blood test',
];

export interface SearchOptions {
  limit?: number;
  kinds?: SearchKind[];
}

export function searchHospital(rawQuery: string, options: SearchOptions = {}): SearchResult[] {
  const { limit = 8, kinds } = options;
  const query = normalise(rawQuery);
  if (query.length < 2) return [];

  const needles = query.split(' ').filter((n) => n.length > 0);

  let pool = INDEX;
  if (kinds?.length) {
    const allowed = new Set(kinds);
    pool = pool.filter((e) => allowed.has(e.kind));
  }

  const scored: SearchResult[] = [];
  for (const entry of pool) {
    const entryScore = score(entry.haystack, needles);
    if (entryScore <= 0) continue;
    // Slight preference for booked-able clinical results over articles.
    const kindBoost = entry.kind === 'speciality' ? 3 : entry.kind === 'doctor' ? 2 : 0;
    const bookableBoost = entry.specialityId && !bookableIds.has(entry.specialityId) ? -2 : 0;
    scored.push({
      id: entry.id,
      kind: entry.kind,
      title: entry.title,
      subtitle: entry.subtitle,
      matchedOn: entry.matchedOn,
      path: entry.path,
      specialityId: entry.specialityId,
      icon: entry.icon,
      score: entryScore + kindBoost + bookableBoost,
    });
  }

  scored.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
  return scored.slice(0, limit);
}

/** Direct phone numbers surfaced as a search result when someone types them. */
export const SEARCH_EMERGENCY_HINT = `For a medical emergency, call ${HOSPITAL_DATA.emergency.display} immediately — do not wait for an online reply.`;

/* --- Re-exported shapes for consumers ------------------------------------ */

export type { Speciality, DoctorProfile, HealthArticle };
