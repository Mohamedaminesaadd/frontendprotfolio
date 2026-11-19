import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';


export interface Certificate {
  title: string;
  /** Issuing institution — only when stated on the certificate. */
  issuer?: string;
  platform: string;
  icon: string;
  tone: string;
  /** Official verification page — only when the certificate gives one. */
  verifyUrl?: string;
  /** Credential ID printed on the certificate (shown when there is no URL). */
  credentialId?: string;
  /** Date printed on the certificate. */
  date?: string;
}


@Component({
  selector: 'app-about-terminal',
  standalone: true,
  imports: [NgTemplateOutlet],

  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],

  templateUrl: './about-terminal.html',
  styleUrl: './about-terminal.css'
})
export class AboutTerminal {

  /**
   * Certificates — taken from the original documents. Coursera ones link to
   * their verification page; the Scrum certificate gives no URL, so it shows
   * its printed certificate ID instead (no link is invented).
   */
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
    },
    {
      title: 'Scrum Fundamentals Certified (SFC™)',
      issuer: 'SCRUMstudy',
      platform: 'VMEdu, Inc.',
      icon: 'mdi:account-group-outline',
      tone: 'navy',
      credentialId: '1145972',
      date: 'Feb 2026'
    }
  ];

}
