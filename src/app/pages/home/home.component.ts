import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  products: any[] = [];
  loading: boolean = false;
  categories: any[] = [];
  brands: any[] = [];
  activePrice: string = '2000';
  activeRating: string = '1';
  user: any = null;

  activeCategory: string | number = '';
  activeBrand: string = '';

  constructor(
    private productsData: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
    private userApi: UserService
  ) {
    const token = localStorage.getItem('access_token');

    if (token) {
      userApi.getUser(token).subscribe((data) => {
        this.user = data;
      });
    }

    route.queryParams.subscribe((data: any) => {
      this.activeCategory = data.category;
      this.activeBrand = data.brand;

      this.getSearchedProducts(
        data.keyword || '',
        data.category || '',
        data.brand || '',
        data.price || '2000',
        data.rating || '1'
      );
    });
    this.getCategory();
    this.getBrand();
  }

  // get products

  getSearchedProducts(
    query: string,
    id: string | number,
    brand: string,
    price: string,
    rating: string
  ) {
    this.loading = true;
    this.products = [];

    this.productsData
      .getSearchProducts(query, id, brand, price, rating)
      .subscribe((data: any) => {
        this.products = data.products;
        this.loading = false;
      });
  }

  // search fc
  handleRatingChange(e: any) {
    this.activeRating = e.target.value;
    this.router.navigate(['/'], {
      queryParams: { rating: e.target.value },
      queryParamsHandling: 'merge',
    });
  }

  handlePriceChange(e: any) {
    this.activePrice = e.target.value;
    this.router.navigate(['/'], {
      queryParams: { price: e.target.value },
      queryParamsHandling: 'merge',
    });
  }

  searchByCategory(category: string) {
    this.activeCategory = category;

    if (category !== '') {
      this.router.navigate(['/'], {
        queryParams: { category: category },
        queryParamsHandling: 'merge',
      });
    } else {
      this.router.navigate(['/']);
    }
    this.productsData.productUpdate.next(true);
  }

  searchByBrand(brand: string) {
    this.activeBrand = brand;

    if (brand !== '') {
      this.router.navigate(['/'], {
        queryParams: { brand: brand },
        queryParamsHandling: 'merge',
      });
    } else {
      this.router.navigate(['/']);
    }
    this.productsData.productUpdate.next(true);
  }

  // get filter data

  getCategory() {
    this.productsData.getAllCategory().subscribe((data: any) => {
      this.categories = data;
    });
  }

  getBrand() {
    this.productsData.getAllBrands().subscribe((data: any) => {
      this.brands = data;
    });
  }
}
