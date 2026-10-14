import { Container } from '../components/Container';
import { PageMeta } from '../components/PageMeta';
import { useCopy } from '../i18n/LanguageProvider';

export function PrivacyPage() {
  const copy = useCopy();
  const page = copy.pages.privacy;
  return (
    <>
      <PageMeta page="privacy" />
      <article className="py-16 md:py-24">
        <Container className="max-w-3xl">
          <h1 className="t-h1 text-teal-950">{page.title}</h1>
          <p className="mt-4 text-ink-muted">{page.updated}</p>
          {page.sections.map((s) => (
            <section key={s.title} className="mt-12">
              <h2 className="t-h3 text-teal-950">{s.title}</h2>
              {s.body.map((b) => (
                <p key={b} className="mt-4 text-ink-soft">
                  {b}
                </p>
              ))}
            </section>
          ))}
        </Container>
      </article>
    </>
  );
}
