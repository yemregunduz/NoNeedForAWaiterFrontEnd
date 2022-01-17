import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { Table } from '../models/table';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  apiUrl = "https://localhost:44351/api/tables/"
  constructor(private httpClient:HttpClient) { }

  addTable(table:Table){
    let newPath = this.apiUrl+"add"
    return this.httpClient.post<ResponseModel>(newPath,table);
  }
  deleteTable(table:Table){
    let newPath = this.apiUrl+"delete"
    return this.httpClient.post<ResponseModel>(newPath,table);
  }
  updateTable(table:Table){
    let newPath = this.apiUrl+"update"
    return this.httpClient.post<ResponseModel>(newPath,table);
  }
  getAllTablesByRestaurantId(restaurantId:number){
    let newPath = this.apiUrl+"getalltablesbyrestaurantid?restaurantId="+restaurantId;
    return this.httpClient.get<ListResponseModel<Table>>(newPath);
  }
}
