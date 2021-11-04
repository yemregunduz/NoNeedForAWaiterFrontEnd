import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { OperationClaim } from '../models/operationClaim';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class OperationClaimService {

  apiUrl = "https://localhost:44351/api/operationclaims/"
  constructor(private httpClient:HttpClient) { }

  addOperationClaim(operationClaim:OperationClaim){
    let newPath = this.apiUrl+"add"
    return this.httpClient.post<ResponseModel>(newPath,operationClaim);
  }
  deleteOperationClaim(operationClaim:OperationClaim){
    let newPath = this.apiUrl+"delete"
    return this.httpClient.post<ResponseModel>(newPath,operationClaim);
  }
  updateOperationClaim(operationClaim:OperationClaim){
    let newPath = this.apiUrl+"update"
    return this.httpClient.post<ResponseModel>(newPath,operationClaim)
  }
  getAllOperationClaims(){
    let newPath = this.apiUrl+"getall"
    return this.httpClient.get<ListResponseModel<OperationClaim>>(newPath);
  }
}
