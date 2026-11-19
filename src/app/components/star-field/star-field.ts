import { isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, afterNextRender, inject, signal } from '@angular/core';

interface StarLayer {
  count: number;
  colors: string[];
}

/**
 * Parallax pixel stars (pure-CSS technique): each layer is a 1–3px
 * element whose box-shadow draws hundreds of "stars"; the layer and an
 * ::after copy placed 2000px below scroll up forever at different speeds.
 *
 * Dark theme: the reference's #1B2735 → #090A0F sky with white stars.
 * Light theme: a pale daylight sky with stars in the site palette.
 * Positions are generated once in the browser (the reference does it with
 * Sass random() at build time) so the prerendered HTML stays small;
 * all drawing and motion is plain CSS.
 */
@Component({
  selector: 'app-star-field',
  standalone: true,
  templateUrl: './star-field.html',
  styleUrl: './star-field.css'
})
export class StarField {

  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly small = signal('none');
  readonly medium = signal('none');
  readonly big = signal('none');

  private static readonly FIELD = 2000;

  constructor() {
    if (!this.isBrowser) {
      return;
    }

    afterNextRender(() => {
      // Colors are CSS variables, so a theme switch recolors the stars
      // without regenerating them (see star-field.css).
      this.small.set(this.shadows({
        count: 700,
        colors: ['var(--star-s1)', 'var(--star-s2)', 'var(--star-s3)']
      }));

      this.medium.set(this.shadows({
        count: 200,
        colors: ['var(--star-m1)', 'var(--star-m2)', 'var(--star-m3)']
      }));

      this.big.set(this.shadows({
        count: 100,
        colors: ['var(--star-b1)', 'var(--star-b2)', 'var(--star-b3)']
      }));
    });
  }

  private shadows(layer: StarLayer): string {
    const width = Math.max(StarField.FIELD, window.innerWidth);
    const parts: string[] = [];

    for (let i = 0; i < layer.count; i++) {
      const x = Math.floor(Math.random() * width);
      const y = Math.floor(Math.random() * StarField.FIELD);
      const color = layer.colors[i % layer.colors.length];
      parts.push(`${x}px ${y}px ${color}`);
    }

    return parts.join(', ');
  }

}
