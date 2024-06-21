import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) {}

  register(user: any) {
    this.http
      .post('https://api.everrest.educata.dev/auth/sign_up', user)
      .subscribe({
        next: (data: any) => {
          alert('რეგისტრაცია წარმატებით დასრულდა განაგრძეთ');
          this.router.navigate(['auth/sign-in']);
          window.location.reload();
        },
        error: (error: any) => {
          if (!error.ok) {
            alert(error.error.error);
            return;
          }
        },
      });
  }

  login(user: any) {
    this.VerifyEmail(user.email);

    this.http
      .post('https://api.everrest.educata.dev/auth/sign_in', user)
      .subscribe({
        next: (data: any) => {
          alert('შეამოწმეთ თქვენი მეილი და დაასრულეთ რეგისტრაცია');
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('refresh_token', data.refresh_token);
          window.location.reload();
        },
        error: (error: any) => {
          if (!error.ok) {
            alert(error.error.error);
            return;
          }
        },
      });
  }

  getUser(token: string) {
    return this.http.get('https://api.everrest.educata.dev/auth', {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getUserById(id: string, token: string) {
    return this.http.get(`https://api.everrest.educata.dev/auth/id/${id}`, {
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
