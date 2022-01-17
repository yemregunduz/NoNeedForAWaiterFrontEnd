import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from 'src/app/models/cartItem';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductImageService } from 'src/app/services/product-image.service';

@Component({
  selector: 'app-shopping-cart-dialog',
  templateUrl: './shopping-cart-dialog.component.html',
  styleUrls: ['./shopping-cart-dialog.component.css']
})
export class ShoppingCartDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public cartItems:CartItem[],private productImageService:ProductImageService,private cartService:CartService,private toastrService:ToastrService) { }
  cartTotal:any=sessionStorage.getItem("cartTotal")
  restaurantIdFromStorage = parseInt(localStorage.getItem("restaurantId"))
  quantity:number= 0
  @Output() clickOnConfirmCartOut = new EventEmitter();
  @Output() addToCartOut = new EventEmitter();
  ngOnInit(): void {
  }
  getProductImagePath(productImagePath:string){
    return this.productImageService.getProductImagePath(productImagePath)
  }
  getCart(){
    this.cartItems=this.cartService.listCart()
    sessionStorage.setItem("cartItems",JSON.stringify(this.cartItems))
  }
  addToCart(product:Product){
    
    if(product.stock<1){
      this.toastrService.error("Stokta ürün yok!","Hata!")
    }
    else{
      this.cartService.addToCart(product);
      sessionStorage.setItem("cartItems",JSON.stringify(this.cartItems))
      this.calculateCartTotal()
    }
    this.addToCartOut.emit();
    this.checkCartItemQuantity(product)
    console.log(product)
    console.log(this.cartItems)
  }
  calculateCartTotal(){
    if(this.cartItems.length>0){
      this.cartTotal=this.cartItems.map(m=>m.lineTotal).reduce((acc,currentValue) => acc+currentValue)
    this.cartItems.map(m=>{
      m.cartTotal=this.cartTotal
      sessionStorage.setItem("cartTotal",this.cartTotal)
      return m;
    })
    }   
}
  removeFromCart(product:Product){
    this.cartService.removeFromCart(product);
    this.calculateCartTotal()
    this.getCart()
    if(this.cartItems.length==0){
      sessionStorage.removeItem("cartTotal")
      sessionStorage.removeItem("cartItems")
    }
    if(!this.cartItems.find(c=>c.product.id==product.id)){
      (document.getElementById(product.id+'quantity') as HTMLInputElement).value="0"
    }
    else{
      this.checkCartItemQuantity(product);
    }
  }
  checkCartItemQuantity(product:Product){
    (document.getElementById(product.id+'quantity') as HTMLInputElement).value=this.cartItems.find(c=>c.product.id==product.id).quantity.toString()
  }
  clickOnConfirmCart(){
    this.clickOnConfirmCartOut.emit()
  }
  
}
