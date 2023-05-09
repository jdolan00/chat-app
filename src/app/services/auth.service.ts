import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3005/api/auth';
  private currentUser: any;

  constructor(private http: HttpClient) {
    const user = localStorage.getItem('user');
    if (user) {
      this.currentUser = JSON.parse(user);
    }
  }

  register(username: string, password: string) {
    const body = { username, password };
    return this.http.post(`${this.baseUrl}/register`, body);
  }

  login(username: string, password: string) {
    const body = { username, password };
    return this.http.post(`${this.baseUrl}/login`, body);
  }

  logout() {
    // Your logout logic here
    // For example, clear the user authentication information from local storage or cookies
    localStorage.removeItem('user');
    this.currentUser = null;
  }

  getCurrentUser() {
    return this.currentUser;
  }
}
