import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId?: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  //pagination properties
  pageNumber: number = 1;
  pageSize: number = 10;
  totalElements: number = 0;

  previousSearchText: string = "";

  constructor(private productService: ProductService, private route: ActivatedRoute, private cartService: CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    }
    else {
      this.handleListProducts();
    }
  }

  handleSearchProducts() {
    const searchText: string = this.route.snapshot.paramMap.get('keyword')!;

    // if we have a different keyword that previous
    // then set pageNumber to 1

    if (this.previousSearchText != searchText) {
      this.pageNumber = 1;
    }
    this.previousSearchText = searchText;

    this.productService.SearchProductsPaginate(searchText, this.pageNumber - 1, this.pageSize).subscribe(this.processResult());
  }

  handleListProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id')

    if (hasCategoryId) {
      // get the id param string. convert string to a number using the + symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }
    else {
      this.currentCategoryId = 1;
    }

    // check if we have ad ifferenct catrgory than previous
    // note : angular will reuse a component if it s currently beign viewed so if it differenet catogry using the same component the pagenumber wotn be set to 1 at the top of this file
    // if we have a differenet category id than previous
    // then set pageNumber back to 1
    if (this.previousCategoryId != this.currentCategoryId) {
      this.pageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;
    this.productService.getProductsListForCategoryPaginate(this.currentCategoryId, (this.pageNumber - 1), this.pageSize).subscribe(this.processResult());
  }
  // event function for the page size selector
  updatePageSize(pageSize: string) {
    this.pageSize = +pageSize;
    this.pageNumber = 1;
    this.listProducts();
  }
  // helper method to process result of type GetResponseProducts
  processResult() {
    return (data: any) => {
      this.products = data._embedded.products;
      this.pageNumber = data.page.number + 1;
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    };
  }

  addToCart(product: Product) {
    const cartItem = new CartItem(product.id, product.name, product.imageUrl, product.unitPrice);
    this.cartService.addToCart(cartItem);
  }

}
