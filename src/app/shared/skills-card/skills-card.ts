import {
  Component,
  Input,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';

export interface Skill {
  name: string;
  icon: string;
}

@Component({
  selector: 'app-skills-card',
  standalone: true,
  templateUrl: './skills-card.html',
  styleUrl: './skills-card.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SkillsCard {

  @Input({ required: true })
  categoryName!: string;

  @Input({ required: true })
  categoryIcon!: string;

  @Input({ required: true })
  skills: Skill[] = [];

  /** Projects where these skills were applied. */
  @Input()
  usedIn: string[] = [];

  /** Color tone of the card (emerald, indigo, sky, amber, rose, violet). */
  @Input()
  tone = 'emerald';
}
