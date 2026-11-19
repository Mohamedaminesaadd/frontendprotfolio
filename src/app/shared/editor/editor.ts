import { Component } from '@angular/core';

interface ProfileField {
  label: string;
  value: string;
  wide?: boolean;
}

/**
 * Profile facts card (formerly the developer.ts editor).
 * Every value comes from the CV.
 */
@Component({
  selector: 'app-code-editor',
  standalone: true,
  templateUrl: './editor.html',
  styleUrl: './editor.css'
})
export class Editor {

  readonly fields: ProfileField[] = [
    { label: 'Role', value: 'Final-year Computer Engineering student', wide: true },
    { label: 'School', value: 'ENIS — École Nationale d\'Ingénieurs de Sfax', wide: true },
    { label: 'Graduation', value: 'Expected 2027' },
    { label: 'Location', value: 'Sfax, Tunisia' },
    { label: 'Focus', value: 'Cybersecurity · Distributed systems · AI for security', wide: true },
    { label: 'Looking for', value: 'End-of-studies (PFE) internship in cybersecurity', wide: true },
    { label: 'Languages', value: 'Arabic (native) · French · English', wide: true }
  ];

}
