import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from 'src/app/models/cartItem';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductImageService } from 'src/app/services/product-image.service';

import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-client-side',
  templateUrl: './client-side.component.html',
  styleUrls: ['./client-side.component.css']
})
export class ClientSideComponent implements OnInit {

  constructor(private productService:ProductService,private productImageService:ProductImageService,private toastrService:ToastrService,private cartService:CartService) { }
  products:Product[]
  cartItems:CartItem[]=[]
  cartTotal:any=sessionStorage.getItem("cartTotal")
  restaurantIdFromStorage = parseInt(localStorage.getItem("restaurantId"))
  ngOnInit(): void {
    this.getAllProductDetailsDtoByRestaurantId()
    this.getCart();
  }
  getAllProductDetailsDtoByRestaurantId(){
    this.productService.getAllProductDetailsDtoByRestaurantId(this.restaurantIdFromStorage).subscribe(response=>{
      this.products = response.data
    })
  }
  getProductImagePath(productImagePath:string){
    return this.productImageService.getProductImagePath(productImagePath);
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
      this.cartService.addToCart(product)
      sessionStorage.setItem("cartItems",JSON.stringify(this.cartItems))
    }
    console.log(this.cartItems,this.cartTotal)
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
    this.toastrService.error("Sepetten silindi.",product.productName)
    this.calculateCartTotal()
    this.getCart()
    if(this.cartItems.length==0){
      sessionStorage.removeItem("cartTotal")
      sessionStorage.removeItem("cartItems")
    }
  }
}
