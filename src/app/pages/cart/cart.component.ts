import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  carts: any[] = [];
  loading: boolean = false;

  constructor(
    private cartApi: CartService,
    private productApi: ProductsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getCart();
  }

  getCart() {
    const token = localStorage.getItem('access_token');

    if (!token) {
      this.router.navigate(['/']);
      return;
    }

    this.carts = [];
    this.loading = true;

    this.cartApi.getCart(token).subscribe((cart: any) => {
      cart.products.map((product: any) => {
        this.productApi
          .getProductsById(product.productId)
          .subscribe((data: any) => {
            this.carts = [...this.carts, data];
            this.loading = false;
          });
      });
    });
  }

  deleteProductToCart(id: string) {
    const token = localStorage.getItem('access_token');

    if (!token) {
      return alert('Unauthorized');
    }

    this.cartApi.deleteCartProduct(id, token).subscribe((data) => {
      this.getCart();
    });
  }

  handleCheckout() {
    const token = localStorage.getItem('access_token');

    if (!token) {
      return alert('Unauthorized');
    }

    this.cartApi.checkout(token).subscribe((data: any) => {
      if (data.success) {
        alert('checkout successfully :)');
        window.location.reload();
      }
    });
  }
}
