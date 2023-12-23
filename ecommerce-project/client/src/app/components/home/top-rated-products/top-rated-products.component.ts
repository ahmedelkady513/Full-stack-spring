import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { faShoppingCart, faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-top-rated-products',
  templateUrl: './top-rated-products.component.html',
  styleUrl: './top-rated-products.component.css'
})
export class TopRatedProductsComponent implements OnInit {
  recentProducts : Product[] = [];
  cartIcon = faShoppingCart;
  starIcon = faStar;
  constructor(private productService : ProductService){
  }

  ngOnInit(): void {
    this.productService.getRecentylAddedProducts(4).subscribe(
      (next) => this.recentProducts = next
    );
  }
}
