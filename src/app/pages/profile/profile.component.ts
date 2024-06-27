import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  public user: any = null;
  public loading: boolean = false;
  public passwordModelOpen: boolean = false;
  public passwordResetting: boolean = false;
  public resetpassword = {
    oldPassword: '',
    newPassword: '',
  };

  constructor(private userAPI: UserService, private router: Router) {}

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    const token = localStorage.getItem('access_token');

    if (token) {
      this.userAPI.getUser(token).subscribe((data) => {
        this.user = data;
      });
    } else {
      this.router.navigate(['/']);
    }
  }

  signOut() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.reload();
  }

  passwordModule(e: any, btn?: boolean) {
    if (e.target.id === 'module' || btn) {
      this.passwordModelOpen = !this.passwordModelOpen;
    }
  }

  handleGenderChange(gender: string) {
    this.user.gender = gender;
  }

  updateUserProfile() {
    const token = localStorage.getItem('access_token');

    if (!token) return;

    this.loading = true;

    this.userAPI.updateUserDate(token, this.user).subscribe((res) => {
      this.getUser();
      this.loading = false;
    });
  }

  updateUserPassword() {
    const token = localStorage.getItem('access_token');

    if (!token) return;
    this.passwordResetting = true;

    this.userAPI
      .updateUserPassword(token, this.resetpassword)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.access_token);
        localStorage.setItem('refresh_token', res.refresh_token);
        this.passwordResetting = false;
      });
  }
}
