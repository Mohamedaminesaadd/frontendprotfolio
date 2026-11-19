import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'theme';

const THEME_COLOR: Record<Theme, string> = {
  dark: '#090a0f',
  light: '#f7f9fc'
};

/**
 * Light / dark theme.
 *
 * - The inline script in index.html sets <html data-theme> before the first
 *   paint (saved choice, else the OS preference), so there is no flash.
 * - This service reads that value, toggles it, and remembers the choice.
 * - Until the visitor picks a theme, it follows OS changes live.
 * - Switching uses a View Transition: the new theme grows as a circle from
 *   the toggle button (skipped with reduced motion or when unsupported).
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {

  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly theme = signal<Theme>('dark');

  constructor() {
    if (!this.isBrowser) {
      return;
    }

    const root = this.document.documentElement;
    const current: Theme = root.dataset['theme'] === 'light' ? 'light' : 'dark';
    this.theme.set(current);

    // Follow the OS setting until the visitor makes an explicit choice.
    window
      .matchMedia('(prefers-color-scheme: light)')
      .addEventListener('change', (event) => {
        if (!this.savedTheme()) {
          this.apply(event.matches ? 'light' : 'dark');
        }
      });
  }

  /** Switch theme; `origin` is the element the reveal grows from. */
  toggle(origin?: HTMLElement): void {
    if (!this.isBrowser) {
      return;
    }

    const next: Theme = this.theme() === 'dark' ? 'light' : 'dark';
    const change = () => {
      this.apply(next);
      this.save(next);
    };

    const doc = this.document as Document & {
      startViewTransition?: (update: () => void) => {
        ready: Promise<void>;
        finished: Promise<void>;
      };
    };

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!doc.startViewTransition || reduceMotion) {
      change();
      return;
    }

    // Circle origin: the toggle's center (works for mouse and keyboard).
    const rect = origin?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const root = this.document.documentElement;
    root.classList.add('theme-switching');

    const transition = doc.startViewTransition(change);

    transition.ready
      .then(() => {
        root.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${radius}px at ${x}px ${y}px)`
            ]
          },
          {
            duration: 550,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            pseudoElement: '::view-transition-new(root)'
          }
        );
      })
      .catch(() => undefined);

    transition.finished
      .catch(() => undefined)
      .finally(() => root.classList.remove('theme-switching'));
  }

  private apply(theme: Theme): void {
    const root = this.document.documentElement;
    root.dataset['theme'] = theme;

    this.document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', THEME_COLOR[theme]);

    this.theme.set(theme);
  }

  private savedTheme(): Theme | null {
    try {
      const value = localStorage.getItem(STORAGE_KEY);
      return value === 'light' || value === 'dark' ? value : null;
    } catch {
      return null;
    }
  }

  private save(theme: Theme): void {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* storage blocked (private mode): the choice lasts for this visit */
    }
  }

}
