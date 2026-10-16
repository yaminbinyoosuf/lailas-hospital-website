import type { ReactNode } from 'react';
import { Container } from '../components/Container';
import type { ImageId } from '../content/images';

interface Props {
  title: string;
  lead: string;
  imageId?: ImageId;
  actions?: ReactNode;
}

/** Inner page opening. The artwork on this site is deliberately typographic
 * until verified hospital photography is available. */
export function PageHero({ title, lead, imageId, actions }: Props) {
  return (
    <section aria-labelledby="page-title" className="page-hero">
      <Container
        className={
          imageId
            ? 'max-w-[76rem] pt-14 pb-16 md:pt-20 md:pb-24'
            : 'pt-12 pb-14 md:pt-20 md:pb-20'
        }
      >
        <div className={imageId ? 'max-w-4xl' : 'max-w-3xl'}>
          <h1 id="page-title" className="t-h1 text-teal-950">
            {title}
          </h1>
          <p className="t-lead mt-6 max-w-[36rem]">{lead}</p>
          {actions && <div className="mt-9 flex flex-col gap-3 sm:flex-row">{actions}</div>}
        </div>
      </Container>
    </section>
  );
}
