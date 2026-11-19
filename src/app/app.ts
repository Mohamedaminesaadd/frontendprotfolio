import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';

import { RouterOutlet } from '@angular/router';

import { Navbar } from './shared/navbar/navbar';
import { StarField } from './components/star-field/star-field';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [
    RouterOutlet,
    Navbar,
    StarField
  ],

  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],

  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}