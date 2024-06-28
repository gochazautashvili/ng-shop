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
  products: any[] = [];
  loading: boolean = false;

  constructor(
    private cartApi: CartService,
    private productApi: ProductsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getCart();
  }

  calculateQuantity(products: any, id: string) {
    const filteredCart = products.filter((product: any) => {
      if (product.productId == id) {
        return product.quantity;
      }
    });

    return filteredCart[0].quantity;
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
            this.carts = [...this.carts, { data }];
            this.products = cart.products;
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

  incrementQuantity(id: string, products: any) {
    const token = localStorage.getItem('access_token');

    if (!token) {
      alert('Unauthorized');
      this.router.navigate(['/auth/sign-in']);
      return;
    }

    products.forEach((item: any) => {
      if (item.productId == id) {
        this.cartApi.updateCart(id, item.quantity + 1, token).subscribe({
          next: (data) => {
            this.getCart();
          },
          error: (error) => {
            if (!error.ok) {
              alert(error.error.error);
            }
          },
        });
      }
    });
  }

  decrementQuantity(id: string, products: any) {
    const token = localStorage.getItem('access_token');

    if (!token) {
      alert('Unauthorized');
      this.router.navigate(['/auth/sign-in']);
      return;
    }

    products.forEach((item: any) => {
      if (item.productId == id) {
        this.cartApi.updateCart(id, item.quantity - 1, token).subscribe({
          next: (data) => {
            this.getCart();
          },
          error: (error) => {
            if (!error.ok) {
              alert(error.error.error);
            }
          },
        });
      }
    });
  }
}
