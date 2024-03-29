import { Component, OnInit } from '@angular/core';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

  cartIcon = faBasketShopping;
  totalPrice: number = 0.00;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.updateCartStatus();
  }

  updateCartStatus() {
    // subscribe to the cart totalPrice
    this.cartService.totalPrice$.subscribe(
      data => this.totalPrice = data
    );

    // subdcribe to the cart totalQunantity
    this.cartService.totalQuantity$.subscribe(
      data => this.totalQuantity =data
    );
    
  }

}
