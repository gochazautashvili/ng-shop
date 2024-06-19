import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  productUpdate: Subject<boolean> = new Subject<boolean>();
  constructor(private http: HttpClient) {}

  rateProduct(productId: string, rate: number, token: string) {
    return this.http.post(
      'https://api.everrest.educata.dev/shop/products/rate',
      { productId, rate },
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  getSearchProducts(
    query: string,
    id: number | string,
    brand: string,
    price: string,
    rating: string
  ) {
    return this.http.get(
      `https://api.everrest.educata.dev/shop/products/search?page_size=15&keywords=${query}&category_id=${id}&brand=${brand}&price_max=${price}&rating=${rating}`
    );
  }

  getProductsById(id: string) {
    return this.http.get(
      `https://api.everrest.educata.dev/shop/products/id/${id}`
    );
  }

  getAllCategory() {
    return this.http.get(
      'https://api.everrest.educata.dev/shop/products/categories'
    );
  }

  getAllBrands() {
    return this.http.get(
      'https://api.everrest.educata.dev/shop/products/brands'
    );
  }
}
