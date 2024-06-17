import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartUpdate: Subject<boolean> = new Subject<boolean>();
  constructor(private http: HttpClient) {}

  addToCart(id: string, quantity: number) {
    const token = localStorage.getItem('access_token');

    return this.http.post(
      'https://api.everrest.educata.dev/shop/cart/product',
      { id, quantity },
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  updateCart(id: string, quantity: number) {
    const token = localStorage.getItem('access_token');

    return this.http.patch(
      'https://api.everrest.educata.dev/shop/cart/product',
      { id, quantity },
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  getCart() {
    const token = localStorage.getItem('access_token');

    return this.http.get(' https://api.everrest.educata.dev/shop/cart', {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  deleteCartProduct(id: string) {
    const token = localStorage.getItem('access_token');

    return this.http.delete(
      'https://api.everrest.educata.dev/shop/cart/product',
      {
        body: { id },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  checkout() {
    const token = localStorage.getItem('access_token');

    return this.http.post(
      'https://api.everrest.educata.dev/shop/cart/checkout',
      {},
      {
        headers: {
          accept: '*/*',
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
}
