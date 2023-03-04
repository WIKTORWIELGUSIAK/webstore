import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, Products } from '../models/product.modal';

const STORE_BASE_URL = 'https://fakestoreapi.com';
const STORE_BASE_URL2 = 'https://dummyjson.com';
@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private httpClient: HttpClient) {}
  getAllProducts(
    limit = '99',
    sort = 'desc',
    category?: string,
    categoryParam = category && category !== 'all'
      ? '/category/' + category
      : ''
  ): Observable<Products> {
    return this.httpClient.get<Products>(
      `${STORE_BASE_URL2}/products${categoryParam}?limit=${limit}`
    );
  }

  getAllCategories(): Observable<Array<string>> {
    return this.httpClient.get<Array<string>>(
      `${STORE_BASE_URL}/products/categories`
    );
  }
  getAllCategories2(): Observable<Array<string>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient.get<Array<any>>(
      `${STORE_BASE_URL2}/products/categories`
    );
  }
}
