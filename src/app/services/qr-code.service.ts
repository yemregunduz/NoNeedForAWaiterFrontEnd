import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { qrCode } from '../models/qrCode';
import { qrCodeTableDto } from '../models/qrCodeTableDto';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class QrCodeService {

  apiUrl = "https://localhost:44351/api/qrcodes/"
  constructor(private httpClient:HttpClient) { }

  qrCodeAdd(qrCode:qrCode){
    let newPath = this.apiUrl+"add"
    return this.httpClient.post<ResponseModel>(newPath,qrCode);
  }
  qrCodeDelete(qrCode:qrCode){
    let newPath = this.apiUrl+"delete"
    return this.httpClient.post<ResponseModel>(newPath,qrCode);
  }
  qrCodeUpdate(qrCode:qrCode){
    let newPath = this.apiUrl+"update"
    return this.httpClient.post<ResponseModel>(newPath,qrCode);
  }
  getAllQrCodeTableDtosByRestaurantId(restaurantId:number){
    let newPath = this.apiUrl+"getallqrcodetabledtosbyrestaurantid?restaurantId="+restaurantId;
    return this.httpClient.get<ListResponseModel<qrCodeTableDto>>(newPath);
  }
  getAllQrCodeTableDtosByTableId(tableId:number){
    let newPath = this.apiUrl+"getallqrcodetabledtosbytableid?tableId="+tableId
    return this.httpClient.get<ListResponseModel<qrCodeTableDto>>(newPath);
  }
}
