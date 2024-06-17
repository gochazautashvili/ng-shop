import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  user: any = {
    firstName: '',
    lastName: '',
    age: '',
    email: '',
    password: '',
    address: 'string',
    phone: '+995567857478',
    zipcode: 'string',
    avatar:
      'https://tse4.mm.bing.net/th?id=OIP.EYWUoJwu63yE6_AMbZ_X9gHaFj&pid=Api&P=0&h=220',
    gender: '',
  };
  userEx: any = null;

  handleGenderChange(gender: string) {
    this.user.gender = gender;
  }

  constructor(private userData: UserService, private router: Router) {
    userData.getUser().subscribe((data: any) => {
      this.userEx = data;

      if (this.userEx) {
        router.navigate(['/']);
      }
    });
  }

  signUp() {
    this.userData.register(this.user).subscribe((data: any) => {});
  }
}
