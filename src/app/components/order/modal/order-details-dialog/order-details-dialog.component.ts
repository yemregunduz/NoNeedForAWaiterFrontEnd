import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { OrderDetail } from 'src/app/models/orderDetail';
import { OrderDetailDto } from 'src/app/models/orderDetailDto';
import { OrderTableDto } from 'src/app/models/orderTableDto';
import { OrderDetailService } from 'src/app/services/order-detail.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductImageService } from 'src/app/services/product-image.service';

@Component({
  selector: 'app-order-details-dialog',
  templateUrl: './order-details-dialog.component.html',
  styleUrls: ['./order-details-dialog.component.css']
})
export class OrderDetailsDialogComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) public order:OrderTableDto,private orderDetailService:OrderDetailService,
  private productImageService:ProductImageService,private orderService:OrderService,private toastrService:ToastrService) { }
  orderDetails:OrderDetailDto[]=[]
  @Output() onUpdated = new EventEmitter();
  ngOnInit(): void {
    this.getAllOrderDetailDtosByOrderId()
  }
  getAllOrderDetailDtosByOrderId(){
    this.orderDetailService.getAllOrderDetailDtosByOrderId(this.order.id).subscribe(response=>{
      this.orderDetails = response.data;
    })
  }
  updateOrderStatusToPreparing(order:OrderTableDto){
    order.orderStatus = 1
    this.orderService.updateOrder(order).subscribe(response=>{
      this.toastrService.success("Sipariş durumu güncellendi.","Başarılı!")
      this.onUpdated.emit();
    },responseError=>{
      this.toastrService.error(responseError.error,"Hata!")
    })
  }
  updateOrderStatusAsReady(order:OrderTableDto){
    order.orderStatus = 2
    this.orderService.updateOrder(order).subscribe(response=>{
      this.toastrService.success("Sipariş durumu güncellendi.","Başarılı!")
      this.onUpdated.emit();
    },responseError=>{
      this.toastrService.error(responseError.error,"Hata!")
    })
  }
  getProductImagePath(productImagePath:string){
    return this.productImageService.getProductImagePath(productImagePath);
  }
}
