import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  DestroyRef,
  PLATFORM_ID,
  afterNextRender,
  inject,
  signal
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ThemeService } from '../../core/theme.service';

interface NavStep {
  id: string;
  path: string;
  label: string;
}

/**
 * Navigation as a progress stepper (inspired by the reference's
 * multi-step progress bar): numbered squares joined by a track that
 * fills green as the visitor scrolls through the portfolio.
 */
@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Navbar {

  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly destroyRef = inject(DestroyRef);
  readonly router = inject(Router);
  readonly theme = inject(ThemeService);

  readonly steps: NavStep[] = [
    { id: 'home', path: '/', label: 'Home' },
    { id: 'about', path: '/about', label: 'About' },
    { id: 'projects', path: '/projects', label: 'Projects' },
    { id: 'skills', path: '/skills', label: 'Skills' },
    { id: 'contact', path: '/contact', label: 'Contact' }
  ];

  /** Index of the section currently in view (-1 on /chat). */
  readonly active = signal(0);

  constructor() {
    afterNextRender(() => {
      let frame = 0;

      const update = () => {
        frame = 0;

        if (this.router.url.startsWith('/chat')) {
          this.active.set(-1);
          return;
        }

        const probe = window.innerHeight * 0.4;
        let current = 0;

        this.steps.forEach((step, index) => {
          const el = document.getElementById(step.id);
          if (el && el.getBoundingClientRect().top <= probe) {
            current = index;
          }
        });

        // Bottom of the page: the last step is reached.
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
          current = this.steps.length - 1;
        }

        this.active.set(current);
      };

      const onScroll = () => {
        if (!frame) {
          frame = requestAnimationFrame(update);
        }
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });

      const sub = this.router.events
        .pipe(filter((e) => e instanceof NavigationEnd))
        .subscribe(() => setTimeout(update, 50));

      update();

      this.destroyRef.onDestroy(() => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
        sub.unsubscribe();
        if (frame) {
          cancelAnimationFrame(frame);
        }
      });
    });
  }

  /** Fill of the progress track, in percent. */
  progress(): number {
    const index = this.active();
    return index <= 0 ? 0 : (index / (this.steps.length - 1)) * 100;
  }

  navigateTo(sectionId: string, path: string): void {
    if (sectionId === 'chat') {
      void this.router.navigateByUrl(path);
      return;
    }

    void this.router.navigateByUrl(path).then(() => {
      if (!this.isBrowser) return;

      requestAnimationFrame(() => {
        document.getElementById(sectionId)?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      });
    });
  }

}
