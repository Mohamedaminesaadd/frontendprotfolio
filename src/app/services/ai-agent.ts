import { Injectable, inject } from '@angular/core';
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

  // ==========================================================
  // PRODUCTION API
  // ==========================================================

  private readonly apiUrl =
    'https://protfolio-2-e7t3.onrender.com/api/chat';

  // ==========================================================
  // SEND MESSAGE
  // ==========================================================

  sendMessage(
    message: string,
    threadId: string
  ): Observable<ChatResponse> {

    const request: ChatRequest = {
      message: message,
      thread_id: threadId
    };

    return this.http.post<ChatResponse>(
      this.apiUrl,
      request
    );
  }
}