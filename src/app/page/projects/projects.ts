import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';

import { ProjectCart } from '../../shared/project-cart/project-cart';
import { PROJECTS, Project, ProjectGroup } from './projects.data';


@Component({
  selector: 'app-projects',
  standalone: true,

  imports: [
    ProjectCart
  ],

  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],

  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class Projects {

  readonly current = this.byGroup('current');
  readonly featured = this.byGroup('featured');
  readonly other = this.byGroup('other');
  readonly learning = this.byGroup('learning');

  private byGroup(group: ProjectGroup): Project[] {
    return PROJECTS.filter((project) => project.group === group);
  }

}
