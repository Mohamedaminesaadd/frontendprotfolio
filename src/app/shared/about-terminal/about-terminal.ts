import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';


export interface Certificate {
  title: string;
  /** Issuing institution — only when stated on the certificate. */
  issuer?: string;
  platform: string;
  icon: string;
  tone: string;
  verifyUrl: string;
}


@Component({
  selector: 'app-about-terminal',
  standalone: true,

  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],

  templateUrl: './about-terminal.html',
  styleUrl: './about-terminal.css'
})
export class AboutTerminal {

  /** Verified certificates — each links to its original verification page. */
  readonly certificates: Certificate[] = [
    {
      title: 'Prompt Engineering for ChatGPT',
      issuer: 'Vanderbilt University',
      platform: 'Coursera',
      icon: 'mdi:robot-outline',
      tone: 'indigo',
      verifyUrl: 'https://www.coursera.org/account/accomplishments/verify/O7KXUQDI1C26'
    },
    {
      title: 'Product Design and UX/UI Fundamentals',
      issuer: 'Xbox',
      platform: 'Coursera',
      icon: 'mdi:palette-outline',
      tone: 'rose',
      verifyUrl: 'https://www.coursera.org/account/accomplishments/verify/N6SO50QPA03S'
    },
    {
      title: 'Angular 11+ & Material UI: Build Responsive Web Apps',
      platform: 'Coursera',
      icon: 'mdi:angular',
      tone: 'emerald',
      verifyUrl: 'https://coursera.org/share/95db7c5b76dcf6a2dfe3306ac6fa9057'
    }
  ];

}
