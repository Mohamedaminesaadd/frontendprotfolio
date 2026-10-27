import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  ChatRequest,
  ChatResponse
} from '../models/chat.model';

@Injectable({
  providedIn: 'root'
})
export class AIAgentService {

  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly apiUrl =
    'https://kerry-ham-planning-modifications.trycloudflare.com/api/chat';

  private getOrCreateThreadId(): string {

    // Server / SSR
    if (!isPlatformBrowser(this.platformId)) {
      return 'ssr-session';
    }

    // Browser
    let threadId = localStorage.getItem('thread_id');

    if (!threadId) {
      threadId = crypto.randomUUID();
      localStorage.setItem('thread_id', threadId);
    }

    return threadId;
  }

  sendMessage(
    message: string,
    threadId?: string
  ): Observable<ChatResponse> {

    const request: ChatRequest = {
      message,
      thread_id: threadId || this.getOrCreateThreadId()
    };

    return this.http.post<ChatResponse>(
      this.apiUrl,
      request
    );
  }
}
