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
  cartData: any[] = [];
  loading: boolean = false;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private cartApi: CartService,
    private productApi: ProductsService
  ) {
    this.getCart();

    this.subscriptions.add(
      this.cartApi.cartUpdate.subscribe(() => {
        this.getCart();
      })
    );
  }

  getCart() {
    this.loading = true;
    this.carts = [];
    this.cartApi.getCart().subscribe((data: any) => {
      this.carts = data.products;
      data.products.map((product: any) => {
        this.productApi
          .getProductsById(product.productId)
          .subscribe((data: any) => {
            this.cartData.push(data);

            for (let i = 0; i < this.carts.length; i++) {
              this.carts[i].productId = this.cartData[i];
            }
            this.loading = false;
          });
      });
    });
  }

  deleteProductToCart(id: string) {
    this.cartApi.deleteCartProduct(id).subscribe((data) => {
      this.cartApi.cartUpdate.next(true);
    });
  }

  handleCheckout() {
    this.cartApi.checkout().subscribe((data: any) => {
      if (data.success) {
        window.location.reload();
      }
    });
  }
}
