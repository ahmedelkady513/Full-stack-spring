import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  private totalPrice: Subject<number> = new Subject<number>();
  private totalQuantity: Subject<number> = new Subject<number>();

  totalPrice$: Observable<number> = this.totalPrice.asObservable();
  totalQuantity$: Observable<number> = this.totalQuantity.asObservable();

  constructor() { }

  addToCart(cartItem: CartItem) {
    // check if we already have the item in our cart
    let alreadExistsInCart: boolean = false;
    let existingCartItem: CartItem | undefined = undefined;
    //find the item in the cart base on item id

    if (this.cartItems.length > 0) {
      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === cartItem.id);
    }

    // check if we found the item
    alreadExistsInCart = (existingCartItem != undefined);


    if (alreadExistsInCart) {
      existingCartItem!.quantity++;
    }
    else {
      this.cartItems.push(cartItem)
    }

    // compute car total price and total quantity
    this.computeCartTotals();

  }
  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    // publish the new values ... all subscribers will recieve the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }
}
