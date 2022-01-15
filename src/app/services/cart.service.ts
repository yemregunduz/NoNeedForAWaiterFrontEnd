import { Injectable } from '@angular/core';
import { CartItem } from '../models/cartItem';
import { CartItems } from '../models/cartItems';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  addToCart(product:Product){
    let cartItem = CartItems.find(c=>c.product.id);
    if(cartItem){
      cartItem.quantity=cartItem.quantity+1
      this.calculateLineTotalAndCartTotal(product)
    }
    else{
      let cartItem = new CartItem();
      cartItem.product = product;
      cartItem.quantity=1;
      CartItems.push(cartItem);
     
    }
  }
  removeFromCart(product:Product){
    let item=CartItems.find(c=>c.product.id===product.id);
    if(item.quantity>=2){
      item.quantity=item.quantity-1
      this.calculateLineTotalAndCartTotal(product)
    }
    else if(item.quantity===1){
      CartItems.splice(CartItems.indexOf(item),1)
    }
  }
  removeAllCart(){
    while(CartItems.length)
    {
      CartItems.pop();
    }
  }
  calculateLineTotalAndCartTotal(product:Product){
    let cartItem = CartItems.find(c=>c.product.id===product.id)
    cartItem.lineTotal = product.unitPrice*cartItem.quantity

    let cartTotal = CartItems.map(c=>c.lineTotal).reduce((acc,currentValue)=>acc+currentValue);
    CartItems.map(c=>{
      c.cartTotal = cartTotal
      return c;
    })
  }
  listCart():CartItem[]{
    return CartItems;
  }
}
