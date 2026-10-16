import { Plus } from 'lucide-react';
import { useId, useRef, useState, type KeyboardEvent } from 'react';
import { cn } from '../lib/format';

export interface AccordionItem {
  id: string;
  title: string;
  body: string;
}

/**
 * Accessible accordion. Answers stay in the markup (for search engines and
 * find-in-page) and are made inert while closed. Arrow keys, Home and End
 * move between questions.
 */
export function Accordion({ items, defaultOpen }: { items: AccordionItem[]; defaultOpen?: string }) {
  const [open, setOpen] = useState<string | null>(defaultOpen ?? null);
  const base = useId();
  const listRef = useRef<HTMLDivElement>(null);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const buttons = Array.from(listRef.current?.querySelectorAll<HTMLButtonElement>('[data-acc-trigger]') ?? []);
    const i = buttons.indexOf(e.currentTarget);
    const go = (n: number) => {
      e.preventDefault();
      buttons[(n + buttons.length) % buttons.length]?.focus();
    };
    if (e.key === 'ArrowDown') go(i + 1);
    else if (e.key === 'ArrowUp') go(i - 1);
    else if (e.key === 'Home') go(0);
    else if (e.key === 'End') go(buttons.length - 1);
  };

  return (
    <div ref={listRef} className="space-y-3.5">
      {items.map((item) => {
        const isOpen = open === item.id;
        const triggerId = `${base}-${item.id}-t`;
        const panelId = `${base}-${item.id}-p`;
        return (
          <div
            key={item.id}
            className={cn(
              'glass-card rounded-[var(--radius-md)] px-6 md:px-8 border border-white/80 shadow-xs transition-all duration-300',
              isOpen && 'shadow-md border-teal-600/30 bg-paper/90',
            )}
          >
            <h3 className="t-h4">
              <button
                id={triggerId}
                type="button"
                data-acc-trigger
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : item.id)}
                onKeyDown={onKeyDown}
                className="flex min-h-16 w-full items-center justify-between gap-6 py-5 text-left t-h4 font-semibold text-ink transition-colors hover:text-teal-800"
              >
                <span>{item.title}</span>
                <span
                  className={cn(
                    'grid size-9 shrink-0 place-items-center rounded-full border transition-[transform,background-color,border-color] duration-300',
                    isOpen ? 'rotate-45 border-teal-700 bg-teal-700 text-ivory' : 'border-line bg-ivory text-teal-800',
                  )}
                  aria-hidden="true"
                >
                  <Plus className="size-4" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              inert={!isOpen}
              className={cn(
                'grid transition-[grid-template-rows,opacity] duration-400 ease-[var(--ease-gentle)]',
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-[34rem] pb-6 text-ink-soft leading-relaxed">{item.body}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
