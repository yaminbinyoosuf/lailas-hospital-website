import React from 'react';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbsProps {
  items: { label: string; path?: string }[];
  onNavigate: (path: string) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onNavigate }) => {
  return (
    <nav aria-label="Breadcrumb" className="py-2 text-sm">
      <ol className="flex flex-wrap items-center gap-1.5 text-ink-soft">
        <li>
          <button
            onClick={() => onNavigate('/')}
            className="rounded-full px-2 py-1 transition-colors hover:bg-white hover:text-brand-800"
          >
            Home
          </button>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={`${item.label}-${index}`}>
              <li aria-hidden="true">
                <ChevronRight className="h-3.5 w-3.5 text-brand-300" />
              </li>
              <li>
                {isLast || !item.path ? (
                  <span
                    aria-current="page"
                    className="px-2 py-1 font-semibold text-brand-800"
                  >
                    {item.label}
                  </span>
                ) : (
                  <button
                    onClick={() => onNavigate(item.path!)}
                    className="rounded-full px-2 py-1 transition-colors hover:bg-white hover:text-brand-800"
                  >
                    {item.label}
                  </button>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};
