import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { UserService } from '../../services/user.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.scss',
})
export class SingleProductComponent {
  products: any = null;
  loading: boolean = false;
  users: any[] = [];
  user: any = null;

  constructor(
    private productAPI: ProductsService,
    private route: ActivatedRoute,
    public datePipe: DatePipe,
    private userAPI: UserService,
    private cartApi: CartService,
    private router: Router
  ) {
    const token = localStorage.getItem('access_token');

    this.loading = true;

    if (token) {
      userAPI.getUser(token).subscribe((data) => {
        this.user = data;
      });
    }

    route.params.subscribe((data: any) => {
      productAPI.getProductsById(data.productId).subscribe((data: any) => {
        data.ratings.map((rating: any) => {
          if (rating.userId !== '663fc0a3cab554b5a4116efa' && token) {
            this.userAPI
              .getUserById(rating.userId, token)
              .subscribe((data: any) => {
                this.users = [...this.users, { data, rating }];
              });
          }
        });

        this.products = data;
        this.loading = false;
      });
    });
  }

  rateProduct(id: string, number: number) {
    const token = localStorage.getItem('access_token');

    if (!token) {
      return alert('Unauthorized');
    }

    this.productAPI.rateProduct(id, number, token).subscribe((data: any) => {
      console.log(data);
    });
  }

  handleAddInToCart(id: string) {
    const token = localStorage.getItem('access_token');

    if (!token) {
      alert('Unauthorized');
      this.router.navigate(['/auth/sign-in']);
      return;
    }

    if (!!this.user.cartID) {
      this.cartApi.updateCart(id, 1, token).subscribe((data) => {});
    } else {
      this.cartApi.addToCart(id, 1, token).subscribe((data) => {});
    }

    this.cartApi.cartUpdate.next(true);
  }
}
