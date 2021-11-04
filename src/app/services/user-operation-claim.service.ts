import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { UserOperationClaim } from '../models/userOperationClaim';
import { UserOperationClaimDetailDto } from '../models/UserOperationClaimDetailDto';

@Injectable({
  providedIn: 'root'
})
export class UserOperationClaimService {

  apiUrl="https://localhost:44351/api/useroperationclaims/"
  constructor(private httpClient:HttpClient) { }

  addUserOperationClaim(userOperationClaim:UserOperationClaim){
    let newPath = this.apiUrl+"add"
    return this.httpClient.post<ResponseModel>(newPath,userOperationClaim);
  }
  deleteUserOperationClaim(userOperationClaim:UserOperationClaim){
    let newPath= this.apiUrl+"delete"
    return this.httpClient.post<ResponseModel>(newPath,userOperationClaim);
  }
  updateUserOperationClaim(userOperationClaim:UserOperationClaim){
    let newPath = this.apiUrl+"update"
    return this.httpClient.post<ResponseModel>(newPath,userOperationClaim)
  }
  getAllUserOperationClaimDetailsByUserId(userId:number){
    let newPath = this.apiUrl+"getalluseroperationclaimdetailsbyuserid?userId="+userId
    return this.httpClient.get<ListResponseModel<UserOperationClaimDetailDto>>(newPath);
  }
  getAllUserOperationClaimsByUserId(userId:number){
    let newPath = this.apiUrl+"getalluseroperationclaimsbyuserid?userId="+userId
    return this.httpClient.get<ListResponseModel<UserOperationClaim>>(newPath)
  }
}
