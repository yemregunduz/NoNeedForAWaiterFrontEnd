import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { UserImage } from '../models/userImage';

@Injectable({
  providedIn: 'root'
})
export class UserImageService {

  apiUrl="https://localhost:44351/api/userimages/"
  constructor(private httpClient:HttpClient) { }

  addUserImage(file:File,userId:number){
    let newPath = this.apiUrl+"add"
    const sendForm = new FormData();
    sendForm.append("userId",JSON.stringify(userId))
    sendForm.append("userImage",file)
    return this.httpClient.post<ResponseModel>(newPath,sendForm);
  }
  getAllUserImagesByUserId(userId:number){
    let newPath = this.apiUrl+"getalluserimagesbyuserid?userId="+userId
    return this.httpClient.get<ListResponseModel<UserImage>>(newPath)
  }
  getImagePath(imagePath:string){
    return "https://localhost:44351/"+imagePath
  }
  updateUserImage(file:File,imageId:number){
    let newPath = this.apiUrl+"update";
    const sendForm = new FormData();
    sendForm.append("imageId",JSON.stringify(imageId))
    sendForm.append("userImage",file)
    return this.httpClient.post<ResponseModel>(newPath,sendForm)
  }
}
