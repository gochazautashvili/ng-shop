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

  handleGenderChange(gender: string) {
    this.user.gender = gender;
  }

  constructor(private userData: UserService, private router: Router) {
    const token = localStorage.getItem('access_token');

    if (token) {
      router.navigate(['/']);
    }
  }

  signUp() {
    this.userData.register(this.user).subscribe((data: any) => {});
  }
}
