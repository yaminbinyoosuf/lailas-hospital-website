import { ArrowLeft } from 'lucide-react';
import { ButtonLink } from '../components/Button';
import { Container } from '../components/Container';
import { PageMeta } from '../components/PageMeta';
import { useCopy } from '../i18n/LanguageProvider';

export function NotFoundPage() {
  const copy = useCopy();
  const page = copy.pages.notFound;
  return (
    <>
      <PageMeta page="notFound" />
      <section className="py-24 md:py-36">
        <Container className="max-w-2xl text-center">
          <h1 className="t-h1 text-teal-950">{page.title}</h1>
          <p className="t-lead mt-5 text-ink-soft">{page.body}</p>
          <ButtonLink to="/" size="lg" className="mt-10" icon={<ArrowLeft aria-hidden="true" />}>
            {page.back}
          </ButtonLink>
        </Container>
      </section>
    </>
  );
}
