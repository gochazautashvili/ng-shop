import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { UserService } from '../../services/user.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public keyword: string = '';
  public userData: any = null;
  public cartL: any[] = [];
  public userMenu: boolean = false;

  constructor(
    private router: Router,
    private productData: ProductsService,
    private user: UserService,
    private cart: CartService
  ) {
    const token = localStorage.getItem('access_token');

    if (!token) return;

    cart.getCart(token).subscribe((data: any) => {
      this.cartL = data.products;
    });
    user.getUser(token).subscribe({
      next: (res: any) => {
        this.userData = res;
      },
      error: (error) => {
        if (!error.ok) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
        }
      },
    });
  }

  userControllers() {
    this.userMenu = !this.userMenu;
  }

  searchByCategory() {
    if (this.keyword.trim() !== '') {
      this.router.navigate(['/'], { queryParams: { keyword: this.keyword } });
    } else {
      this.router.navigate(['/']);
    }
    this.productData.productUpdate.next(true);
  }
}
