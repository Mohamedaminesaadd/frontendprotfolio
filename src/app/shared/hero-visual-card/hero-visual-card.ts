import { Component } from '@angular/core';

import { Chat } from '../chat/chat';

@Component({
  selector: 'app-hero-visual-card',
  standalone: true,

  imports: [
    Chat
  ],

  templateUrl: './hero-visual-card.html',
  styleUrl: './hero-visual-card.css',
})
export class HeroVisualCard {}
