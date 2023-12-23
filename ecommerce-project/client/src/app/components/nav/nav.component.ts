import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ProductCategory } from 'src/app/common/product-category';
import { AuthenticationService } from 'src/app/services/Authentication.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
  searchIcon = faSearch;
  categories: ProductCategory[] = [];
  
  constructor(public authService: AuthenticationService, private productService: ProductService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.productService.getProductCategories().subscribe(
      (result) => this.categories = result
    );
  }
}
