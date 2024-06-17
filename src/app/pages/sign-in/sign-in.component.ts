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
    userData.getUser().subscribe((data: any) => {
      this.userEx = data;

      if (this.userEx) {
        router.navigate(['/']);
      }
    });
  }

  signIn() {
    this.userData.login(this.user);
  }
}
