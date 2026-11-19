import { Component, CUSTOM_ELEMENTS_SCHEMA, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {

  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly email = 'meadaminee2002@gmail.com';

  contact = {
    name: '',
    email: '',
    message: ''
  };


  /**
   * There is no mail backend: the form opens the visitor's own email
   * client with the message pre-filled (mailto).
   */
  sendMessage(): void {

    if (!this.isBrowser) {
      return;
    }

    const subject = `Portfolio contact — ${this.contact.name}`.trim();

    const body =
      `${this.contact.message}\n\n— ${this.contact.name}` +
      (this.contact.email ? ` (${this.contact.email})` : '');

    window.location.href =
      `mailto:${this.email}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

  }

}
