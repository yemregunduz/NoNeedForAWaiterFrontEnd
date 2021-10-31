import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { User } from '../models/user';
import { UserDetailDto } from '../models/userDetailDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl="https://localhost:44351/api/users/"
  constructor(private httpClient:HttpClient) { }

  getAllUserByRestaurantIdAndStatus(restaurantId:number,status:boolean){
    let newPath = this.apiUrl+"getallusersbyrestaurantidandstatus?restaurantId="+restaurantId+"&status="+status
    return this.httpClient.get<ListResponseModel<UserDetailDto>>(newPath);
  }
  
  updateUserStatus(user:any){
    let newPath = this.apiUrl+"updateuserstatus"
    return this.httpClient.post<ResponseModel>(newPath,user);
  }
  deleteUser(user:User){
    let newPath = this.apiUrl+"delete"
    return this.httpClient.post<ResponseModel>(newPath,user);
  }
  updateUserWithoutPassword(employee:UserDetailDto){
    let newPath = this.apiUrl+"updateuserwithoutpassword"
    return this.httpClient.post<ResponseModel>(newPath,employee)
  }
} 
