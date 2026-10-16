import type { ReactNode } from 'react';
import { Container } from '../components/Container';
import { Photo } from '../components/Photo';
import type { ImageId } from '../content/images';

interface Props {
  title: string;
  lead: string;
  imageId?: ImageId;
  actions?: ReactNode;
}

/** Inner page opening: an asymmetric split with an arch photo, or text only. */
export function PageHero({ title, lead, imageId, actions }: Props) {
  return (
    <section aria-labelledby="page-title">
      <Container
        className={
          imageId
            ? 'grid items-center gap-12 pt-10 pb-16 md:pt-14 lg:grid-cols-12 lg:gap-16 lg:pb-24'
            : 'pt-12 pb-14 md:pt-20 md:pb-20'
        }
      >
        <div className={imageId ? 'lg:col-span-7' : 'max-w-3xl'}>
          <h1 id="page-title" className="t-h1 text-teal-950">
            {title}
          </h1>
          <p className="t-lead mt-6 max-w-[36rem] text-ink-soft">{lead}</p>
          {actions && <div className="mt-9 flex flex-col gap-3 sm:flex-row">{actions}</div>}
        </div>
        {imageId && (
          <div className="lg:col-span-5">
            <div className="p-2 sm:p-2.5 glass-card rounded-[calc(var(--radius-lg)+0.5rem)] shadow-[var(--shadow-lift)] mx-auto max-w-[28rem]">
              <Photo id={imageId} shape="none" priority sizes="(min-width: 1024px) 34vw, 90vw" className="rounded-[var(--radius-lg)]" />
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
