import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-new-products-cards',
  templateUrl: './new-products-cards.component.html',
  styleUrl: './new-products-cards.component.css'
})
export class NewProductsCardsComponent implements OnInit{
  recentProducts : Product[] = [];
  cartIcon = faShoppingCart;
  constructor(private productService : ProductService){
  }

  ngOnInit(): void {
    this.productService.getRecentylAddedProducts(4).subscribe(
      (next) => this.recentProducts = next
    );
  }

}
