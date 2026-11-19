import { Routes } from '@angular/router';

import { Portfolio } from './page/portfolio/portfolio';
import { ChatPage } from './page/chat-page/chat-page';

/*
 * The section URLs (/about, /projects, ...) are children of ONE Portfolio
 * route, so moving between sections keeps the page alive — including the
 * homepage chat conversation. Portfolio scrolls to the matching section.
 */
export const routes: Routes = [
  {
    path: '',
    component: Portfolio,
    children: [
      { path: '', children: [] },
      { path: 'about', children: [] },
      { path: 'projects', children: [] },
      { path: 'skills', children: [] },
      { path: 'contact', children: [] }
    ]
  },

  {
    path: 'chat',
    component: ChatPage
  },

  {
    path: '**',
    redirectTo: ''
  }
];
