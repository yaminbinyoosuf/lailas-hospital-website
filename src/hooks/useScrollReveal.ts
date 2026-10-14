import { useEffect } from 'react';

/**
 * Progressive-enhancement scroll reveal.
 *
 * Elements carrying `className="reveal"` fade and rise into place once they
 * enter the viewport. The hidden state only applies after JS adds
 * `reveal-ready` to <html>, so content is never invisible without JS.
 *
 * A MutationObserver picks up elements added later — this matters because
 * routes are lazily loaded with React.lazy, so a page's `.reveal` nodes often
 * mount *after* this effect first runs. Without the observer they would stay
 * at opacity 0 indefinitely.
 *
 * Re-runs on every route change so the observers are rebuilt against the new tree.
 */
export function useScrollReveal(routeKey: string) {
  useEffect(() => {
    const root = document.documentElement;

    const prefersReduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      root.classList.remove('reveal-ready');
      return;
    }

    root.classList.add('reveal-ready');

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('reveal-in');
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.05 },
    );

    const tracked = new WeakSet<Element>();

    /** Register a `.reveal` node for observation, exactly once. */
    const register = (node: Element) => {
      if (tracked.has(node)) return;
      tracked.add(node);

      // Stagger siblings that opt in via data-reveal-index.
      const index = (node as HTMLElement).dataset.revealIndex;
      if (index) {
        (node as HTMLElement).style.setProperty(
          '--reveal-delay',
          `${Math.min(Number(index), 8) * 70}ms`,
        );
      }
      observer.observe(node);
    };

    const scan = (scope: ParentNode = document) => {
      scope.querySelectorAll<HTMLElement>('.reveal').forEach(register);
    };

    scan();

    // Catch lazily-mounted route content and anything rendered after mount.
    const mutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.classList.contains('reveal')) register(node);
          scan(node);
        });
      }
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    /**
     * FAIL-SAFE. If anything prevents the observer from firing — a browser
     * quirk, an extension, a layout thrash — every node is forced visible well
     * before a patient would notice. Content must never be stranded invisible
     * on a hospital site.
     */
    const failSafe = window.setTimeout(() => {
      document.querySelectorAll<HTMLElement>('.reveal:not(.reveal-in)').forEach((node) => {
        const rect = node.getBoundingClientRect();
        // Anything already in (or above) the viewport is revealed outright.
        if (rect.top < window.innerHeight * 1.25) node.classList.add('reveal-in');
      });
    }, 1200);

    return () => {
      window.clearTimeout(failSafe);
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, [routeKey]);
}
