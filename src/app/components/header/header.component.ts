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

  constructor(
    private router: Router,
    private productData: ProductsService,
    private user: UserService,
    private cart: CartService
  ) {
    cart.getCart().subscribe((data: any) => {
      this.cartL = data.products;
    });
    user.getUser().subscribe((res: any) => {
      this.userData = res;
    });
  }

  signOut() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.reload();
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
