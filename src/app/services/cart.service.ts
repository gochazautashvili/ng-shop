import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartUpdate: Subject<boolean> = new Subject<boolean>();
  constructor(private http: HttpClient) {}

  addToCart(id: string, quantity: number, token: string) {
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

  updateCart(id: string, quantity: number, token: string) {
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

  getCart(token: string) {
    return this.http.get(' https://api.everrest.educata.dev/shop/cart', {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  deleteCartProduct(id: string, token: string) {
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

  checkout(token: string) {
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
