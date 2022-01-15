import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { Order } from '../models/order';
import { OrderTableDto } from '../models/orderTableDto';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  apiUrl = "https://localhost:44351/api/orders/"
  constructor(private httpClient:HttpClient) { }

  addOrder(order:Order){
    let newPath = this.apiUrl+"add"
    return this.httpClient.post<ResponseModel>(newPath,order);
  }
  deleteOrder(order:Order){
    let newPath = this.apiUrl+"delete"
    return this.httpClient.post<ResponseModel>(newPath,order);
  }
  updateOrder(order:any){
    let newPath = this.apiUrl+"update"
    return this.httpClient.post<ResponseModel>(newPath,order)
  }
  getAllOrderTablesDtoByRestaurantId(restaurantId:number){
    let newPath = this.apiUrl+"getallordertablesdtobyrestaurantid?restaurantId="+restaurantId
    return this.httpClient.get<ListResponseModel<OrderTableDto>>(newPath);
  }
  getAllOrderTablesDtoByTableId(tableId:number){
    let newPath = this.apiUrl+"getallordertablesdtobytableid?tableId="+tableId
    return this.httpClient.get<ListResponseModel<OrderTableDto>>(newPath);
  }

  getAllOrderTablesDtoByRestaurantIdAndOrderStatus(restaurantId:number,orderStatus:number){
    let newPath= this.apiUrl+"getallordertablesdtobyrestaurantidandorderstatus?restaurantId="+restaurantId+"&orderStatus="+orderStatus
    return this.httpClient.get<ListResponseModel<OrderTableDto>>(newPath);
  }

  
}
