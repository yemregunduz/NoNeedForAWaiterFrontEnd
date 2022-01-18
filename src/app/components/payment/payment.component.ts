import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from 'src/app/models/cartItem';
import { OrderDetail } from 'src/app/models/orderDetail';
import { CartService } from 'src/app/services/cart.service';
import { OrderDetailService } from 'src/app/services/order-detail.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductImageService } from 'src/app/services/product-image.service';
import { ShoppingCartDialogComponent } from '../client-side/modal/shopping-cart-dialog/shopping-cart-dialog.component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(private cartService:CartService,private productImageService:ProductImageService,private dialog:MatDialog,private orderService:OrderService,
    private formBuilder:FormBuilder,private orderDetailService:OrderDetailService,private toastrService:ToastrService,private router:Router) { }
  cartItems:CartItem[]=[]
  quantity:number
  orderAddForm:FormGroup
  orderDetails:OrderDetail[]=[];
  orderDetailAddForm:FormGroup
  cartTotal = parseFloat(sessionStorage.getItem("cartTotal")) 
  panelOpenState=false;
  ngOnInit(): void {
    this.getCartItems();
    this.createOrderAddForm();
    this.setOrderDetails();
  }
  getCartItems(){
    this.cartItems =JSON.parse(sessionStorage.getItem("cartItems"))
    console.log(this.cartItems)
  }
  getProductImagePath(productImagePath:string){
    return this.productImageService.getProductImagePath(productImagePath)
  }
  openShoppingCartDialog(cartItems:CartItem[]){
    const shoppingCartDialogRef = this.dialog.open(ShoppingCartDialogComponent,{
      minWidth:'25%',
      data:cartItems,
      disableClose:true
    })
    shoppingCartDialogRef.componentInstance.clickOnConfirmCartOut.subscribe(response=>{
      shoppingCartDialogRef.close();
      this.getCartItems();
    })
    shoppingCartDialogRef.componentInstance.addToCartOut.subscribe(response=>{
      this.quantity +=1
    })
  }
  setOrderDetails(){
    this.orderDetails = this.cartItems.map(function(cartItem){
      return {
        id:null,
        orderId : null,
        productId : cartItem.product.id,
        quantity :cartItem.quantity,
        lineTotal : cartItem.lineTotal
      }
    })
  }
  createOrderAddForm(){
    this.orderAddForm=this.formBuilder.group({
      tableId:[parseInt(sessionStorage.getItem("tableId")),Validators.required],
      orderDate:[new Date(),Validators.required],
      orderStatus:[0,Validators.required],
      orderAmount:[this.cartTotal,Validators.required]
    })
    console.log(this.cartTotal)
  }
  createOrderDetailForm(orderDetail:OrderDetail){
    this.orderDetailAddForm = this.formBuilder.group({
      orderId:[orderDetail.orderId,Validators.required],
      productId:[orderDetail.productId,Validators.required],
      quantity:[orderDetail.quantity,Validators.required],
      lineTotal:[orderDetail.lineTotal,Validators.required]
    })
  }
  makePaymentAndConfirmOrder(){
    if(this.cartItems.length>=0){
      if(this.orderAddForm.valid){
        let orderModel = Object.assign({},this.orderAddForm.value)
        this.orderService.addOrder(orderModel).subscribe(response=>{
          for (let i = 0; i < this.orderDetails.length; i++) {
            this.orderDetails[i].orderId = response.data.id
            this.createOrderDetailForm(this.orderDetails[i])
            let orderDetailModel = Object.assign({},this.orderDetailAddForm.value)
            this.orderDetailService.addOrderDetail(orderDetailModel).subscribe(response=>{
              if(response.success==true){
                if(sessionStorage.getItem("cartItems")!=null){
                  sessionStorage.removeItem("cartItems")
                  sessionStorage.removeItem("cartTotal")
                  this.cartService.removeAllCart();
                  this.toastrService.success("Siparişiniz alındı.","Sepet temizlendi.")
                  this.router.navigate(['/paymentsuccess'])
                }
              }
            })
          }
        })
      }
    }
    
  }
}
