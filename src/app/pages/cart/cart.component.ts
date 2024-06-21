import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ProductsService } from '../../services/products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  carts: any[] = [];
  loading: boolean = false;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private cartApi: CartService,
    private productApi: ProductsService
  ) {}

  ngOnInit() {
    this.getCart();

    this.subscriptions.add(
      this.cartApi.cartUpdate.subscribe(() => {
        this.getCart();
      })
    );
  }

  getCart() {
    const token = localStorage.getItem('access_token');

    if (!token) return;

    this.loading = true;
    this.carts = [];

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
      this.cartApi.cartUpdate.next(true);
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
