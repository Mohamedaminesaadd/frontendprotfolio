import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Bubble {
  style: string;
}

/**
 * Gooey "bubbles" footer.
 * Bubbles rise from the footer edge; an SVG blur + alpha-threshold
 * filter (#footer-blob) merges them into the footer band.
 *
 * Bubble values come from a seeded PRNG so the server-rendered HTML
 * and the browser render are identical (no hydration mismatch).
 */
@Component({
  selector: 'app-site-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './site-footer.html',
  styleUrl: './site-footer.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SiteFooter {

  readonly year = new Date().getFullYear();

  readonly bubbles: Bubble[] = SiteFooter.makeBubbles(96, 20261118);

  readonly sections = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Projects', path: '/projects' },
    { label: 'Skills', path: '/skills' },
    { label: 'Contact', path: '/contact' }
  ];

  readonly projects = [
    { label: 'EVA-Guard', url: 'https://github.com/Mohamedaminesaadd/EVA-Guard_Project' },
    { label: 'HPIS', url: 'https://github.com/Mohamedaminesaadd/HIPS' },
    { label: 'Photovoltaic Platform', url: 'https://github.com/Mohamedaminesaadd/platefome-de-gestion-de-travaill-dans-les-project-photopholtiaque' },
    { label: 'AI Fitness Coach', url: 'https://github.com/Mohamedaminesaadd/AI-Fitness-Coach-Setup-Dependencies' }
  ];

  readonly links = [
    { label: 'GitHub', url: 'https://github.com/Mohamedaminesaadd' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/mohamed-amine-50956b296/' },
    { label: 'Hugging Face', url: 'https://huggingface.co/moahmedamine' },
    { label: 'Email', url: 'mailto:meadaminee2002@gmail.com' }
  ];

  private static makeBubbles(count: number, seed: number): Bubble[] {
    // mulberry32
    let a = seed >>> 0;
    const random = () => {
      a = (a + 0x6d2b79f5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };

    return Array.from({ length: count }, () => {
      const size = (2 + random() * 4).toFixed(2);
      const distance = (6 + random() * 4).toFixed(2);
      const position = (-5 + random() * 110).toFixed(2);
      const time = (2 + random() * 2).toFixed(2);
      const delay = (-1 * (2 + random() * 2)).toFixed(2);

      return {
        style:
          `--size:${size}rem; --distance:${distance}rem; --position:${position}%; ` +
          `--time:${time}s; --delay:${delay}s;`
      };
    });
  }

}
