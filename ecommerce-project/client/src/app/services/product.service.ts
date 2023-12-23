import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../common/product';
import { Observable, map } from 'rxjs';
import { ProductCategory } from '../common/product-category';
import { GetResponseProducts } from '../common/get-response-products';
import { GetResponseProductCategory } from '../common/get-response-product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private baseUrl = 'http://localhost:8080/api/products'

  private categoryUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) { }

  //method that takes category Id , currentpage , currentpage size and return list of products for the given category
  getProductsListForCategoryPaginate(CategoryId: number, currentPage: number, currentPageSize: number): Observable<GetResponseProducts> {
    const productsUrl = `${this.baseUrl}/search/findByCategoryId?id=${CategoryId}&page=${currentPage}&size=${currentPageSize}`;
    return this.httpClient.get<GetResponseProducts>(productsUrl);
  }
  //method that takes category Id and return list of products for the given category
  getProductsListForCategory(CategoryId: number): Observable<Product[]> {
    const productsUrl = `${this.baseUrl}/search/findByCategoryId?id=${CategoryId}`;
    return this.getProducts(productsUrl);
  }
  // method that takes search Text , pageNumber, pageSize and return list of products
  SearchProductsPaginate(searchText: string, currentPage: number, currentPageSize: number): Observable<GetResponseProducts> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${searchText}&page=${currentPage}&size=${currentPageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }
  // method that takes search Text and return list of products
  searchProducts(searchText: string): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${searchText}`;
    return this.getProducts(searchUrl); //help method getProducts
  }
  // helper method that retrun obeservable of product from the given link
  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }
  //method that take product id and get the product details
  getProduct(productId: number): Observable<Product> {
    const productUrl = `${this.baseUrl}/${productId}`;
    return this.httpClient.get<Product>(productUrl);
  }
  // get availble categories
  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }
  //get most recent added products
  getRecentylAddedProducts(numberOfProducts : number) : Observable<Product[]> {
    return this.getProducts(`${this.baseUrl}?sort=createdAt,desc&size=${numberOfProducts}`);
  }
}
