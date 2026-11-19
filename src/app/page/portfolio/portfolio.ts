import {
  Component,
  DestroyRef,
  afterNextRender,
  inject
} from '@angular/core';

import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

import { Home } from '../home/home';
import { About } from '../about/about';
import { Projects } from '../projects/projects';
import { Skills } from '../skills/skills';
import { Contact } from '../contact/contact';
import { SiteFooter } from '../../shared/site-footer/site-footer';


/** Routes that map to a section of this single-page portfolio. */
const SECTION_ROUTES = ['about', 'projects', 'skills', 'contact'];


@Component({
  selector: 'app-portfolio',

  standalone: true,

  imports: [
    Home,
    About,
    Projects,
    Skills,
    Contact,
    SiteFooter
  ],

  templateUrl: './portfolio.html',

  styleUrl: './portfolio.css'
})
export class Portfolio {

  private readonly router = inject(Router);

  private readonly destroyRef = inject(DestroyRef);

  constructor() {

    // Direct visits such as /projects land on the matching section.
    afterNextRender(() => {

      this.scrollToRouteSection(false);

      const subscription = this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(() => this.scrollToRouteSection(true));

      this.destroyRef.onDestroy(() => subscription.unsubscribe());

    });

  }


  private scrollToRouteSection(smooth: boolean): void {

    const path = this.router.url.split(/[?#]/)[0].replace(/^\//, '');

    if (!SECTION_ROUTES.includes(path)) {
      return;
    }

    requestAnimationFrame(() => {
      document.getElementById(path)?.scrollIntoView({
        behavior: smooth ? 'smooth' : 'auto',
        block: 'start'
      });
    });

  }

}
