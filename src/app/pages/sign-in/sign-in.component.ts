import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  user: any = {
    email: '',
    password: '',
  };

  userEx: any = null;

  constructor(private userData: UserService, private router: Router) {
    const token = localStorage.getItem('access_token');

    if (token) {
      router.navigate(['/']);
    }
  }

  signIn() {
    this.userData.login(this.user);
  }
}
