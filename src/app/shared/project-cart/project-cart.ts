import { Component, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { Project } from '../../page/projects/projects.data';

/**
 * Project card — keeps the original "code window" look
 * (traffic-light dots + file name header).
 *
 *  - wide:    full-width card with a step bar + titled detail columns (EVA-Guard)
 *  - large:   featured project, highlights + optional demo video
 *  - compact: smaller card for secondary / learning projects
 */
@Component({
  selector: 'app-project-cart',
  standalone: true,
  templateUrl: './project-cart.html',
  styleUrl: './project-cart.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjectCart {
  @Input({ required: true }) project!: Project;
  @Input() variant: 'wide' | 'large' | 'compact' = 'large';
}
