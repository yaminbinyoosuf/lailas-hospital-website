import type { ReactNode } from 'react';
import { Container } from '../components/Container';
import { Reveal } from '../components/Reveal';

/** Closing invitation on inner pages. */
export function CtaBand({ title, body, actions }: { title: string; body: string; actions: ReactNode }) {
  return (
    <section aria-labelledby="cta-title" className="py-20 md:py-24">
      <Container>
        <Reveal className="grid gap-8 overflow-hidden rounded-[2.5rem] bg-teal-800 px-7 py-12 text-ivory md:grid-cols-12 md:items-center md:px-14 md:py-16">
          <div className="md:col-span-7">
            <h2 id="cta-title" className="t-h2 text-ivory">
              {title}
            </h2>
            <p className="t-lead mt-4 !text-teal-100">{body}</p>
          </div>
          <div className="flex flex-col gap-3 md:col-span-5 md:items-end">{actions}</div>
        </Reveal>
      </Container>
    </section>
  );
}
