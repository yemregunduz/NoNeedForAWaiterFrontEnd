import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { OrderDetail } from '../models/orderDetail';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {

  apiUrl = "https://localhost:44351/api/orderdetails/"
  constructor(private httpClient:HttpClient) { }

  addOrderDetail(orderDetail:OrderDetail){
    let newPath = this.apiUrl+"add"
    return this.httpClient.post<ResponseModel>(newPath,orderDetail);
  }
  deleteOrderDetail(orderDetail:OrderDetail){
    let newPath = this.apiUrl+"delete"
    return this.httpClient.post<ResponseModel>(newPath,orderDetail);
  }
  updateOrderDetail(orderDetail:OrderDetail){
    let newPath = this.apiUrl+"update"
    return this.httpClient.post<ResponseModel>(newPath,orderDetail); 
  }
  getAllOrderDetailsByOrderId(orderId:number){
    let newPath = this.apiUrl+"getallorderdetailsbyorderid?orderId="+orderId
    return this.httpClient.get<ListResponseModel<OrderDetail>>(newPath);
  }
}
