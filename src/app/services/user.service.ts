import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  register(user: any) {
    return this.http.post(
      'https://api.everrest.educata.dev/auth/sign_up',
      user
    );
  }

  login(user: any) {
    this.VerifyEmail(user.email);

    this.http
      .post('https://api.everrest.educata.dev/auth/sign_in', user)
      .subscribe((data: any) => {
        alert('შეამოწმეთ თქვენი მეილი და დაასრულეთ რეგისტრაცია');
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        window.location.reload();
      });
  }

  getUser() {
    const token = localStorage.getItem('access_token');

    return this.http.get('https://api.everrest.educata.dev/auth', {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  VerifyEmail(email: string) {
    this.http.post('https://api.everrest.educata.dev/auth/verify_email', {
      email,
    });
  }
}
