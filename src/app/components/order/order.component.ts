import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderDetail } from 'src/app/models/orderDetail';
import { OrderDetailDto } from 'src/app/models/orderDetailDto';
import { OrderTableDto } from 'src/app/models/orderTableDto';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { OrderDetailService } from 'src/app/services/order-detail.service';
import { OrderService } from 'src/app/services/order.service';
import { OrderDetailsDialogComponent } from './modal/order-details-dialog/order-details-dialog.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders:OrderTableDto[]=[]
  constructor(private orderService:OrderService,private localStorageService:LocalStorageService,private orderDetailService:OrderDetailService,private dialog:MatDialog) { }
  ngOnInit(): void {
    this.getAllOrdersByRestaurantIdAndOrderStatus()
  }

  getAllOrdersByRestaurantIdAndOrderStatus(){
    this.orderService.getAllOrderTablesDtoByRestaurantIdAndOrderStatus(parseInt(this.localStorageService.getItem("restaurantId")),2).subscribe(response=>{
      this.orders = response.data
      console.log(response.data)
    })
  }
  openOrderDetailsDialog(order:OrderTableDto){
    const orderDetailDialogRef = this.dialog.open(OrderDetailsDialogComponent,{
      minWidth:'25%',
      data: order
    })
    orderDetailDialogRef.componentInstance.onUpdated.subscribe(response=>{
      orderDetailDialogRef.close();
      this.getAllOrdersByRestaurantIdAndOrderStatus();
    })
  }
  
}
