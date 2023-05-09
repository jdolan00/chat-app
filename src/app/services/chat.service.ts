import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private baseUrl = 'http://localhost:3005/api/chat';

  constructor(private http: HttpClient) { }

  getMessages() {
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.get(`${this.baseUrl}/messages`, { headers });
  }

  postMessage(username: string, message: string) { // Add username parameter here
    const token = localStorage.getItem('token');
    const body = { username, message }; // Include username in body
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.post(`${this.baseUrl}/message`, body, { headers });
  }
}
