import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from 'src/app/models/cartItem';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductImageService } from 'src/app/services/product-image.service';

import { ProductService } from 'src/app/services/product.service';
import { ShoppingCartDialogComponent } from './modal/shopping-cart-dialog/shopping-cart-dialog.component';

@Component({
  selector: 'app-client-side',
  templateUrl: './client-side.component.html',
  styleUrls: ['./client-side.component.css']
})
export class ClientSideComponent implements OnInit {

  constructor(private productService:ProductService,private productImageService:ProductImageService,private toastrService:ToastrService,private cartService:CartService,
    private dialog:MatDialog,private categoryService:CategoryService,private activatedRoute:ActivatedRoute) { }
  products:Product[]
  cartItems:CartItem[]=[]
  categories:Category[]=[]
  cartTotal:any=sessionStorage.getItem("cartTotal")
  restaurantIdFromStorage = parseInt(localStorage.getItem("restaurantId"))
  quantity:number= 0
  ngOnInit(): void {
    this.getAllProductDetailsDtoByRestaurantId()
    this.getCart();
    this.getAllCategories();
    this.setTableId()
  }
  getAllProductDetailsDtoByRestaurantId(){
    this.productService.getAllProductDetailsDtoByRestaurantId(this.restaurantIdFromStorage).subscribe(response=>{
      this.products = response.data
    })
  }
  getAllCategories(){
    this.categoryService.getAllCategories().subscribe(response=>{
      this.categories = response.data
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
      this.cartService.addToCart(product);
      sessionStorage.setItem("cartItems",JSON.stringify(this.cartItems))
      this.calculateCartTotal()
    }
    this.checkCartItemQuantity(product)
    
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
  setCartItemQuantity(product:Product){
    return this.cartItems.find(c=>c.product.id == product.id).quantity
  }
  openShoppingCartDialog(cartItems:CartItem[]){
    const shoppingCartDialogRef = this.dialog.open(ShoppingCartDialogComponent,{
      minWidth:'25%',
      data:cartItems,
    })
    shoppingCartDialogRef.componentInstance.clickOnConfirmCartOut.subscribe(response=>{
      shoppingCartDialogRef.close();
    })
  }
  setTableId(){
    this.activatedRoute.params.subscribe(params=>{
       sessionStorage.setItem("tableId",params['tableId'])
       console.log(params["tableId"])
    })
  }
}

