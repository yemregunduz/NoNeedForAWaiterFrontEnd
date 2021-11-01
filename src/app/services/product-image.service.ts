import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { ProductImage } from '../models/productImage';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ProductImageService {

  apiUrl = "https://localhost:44351/api/productimages/"
  constructor(private httpClient: HttpClient) { }

  addProductImage(file:File,productId:number){
    let newPath = this.apiUrl+"add"
    const sendForm = new FormData();
    sendForm.append("productId",JSON.stringify(productId));
    sendForm.append("productImage",file);
    return this.httpClient.post<ResponseModel>(newPath,sendForm)
  }
  updateProductImage(file:File,imageId:number){
    let newPath = this.apiUrl+"update"
    const sendForm = new FormData();
    sendForm.append("imageId",JSON.stringify(imageId));
    sendForm.append("productImage",file);
    return this.httpClient.post<ResponseModel>(newPath,sendForm)
  }
  deleteProductImage(imageId:number){
    let newPath = this.apiUrl+"delete";
    const sendForm = new FormData();
    sendForm.append("imageId",JSON.stringify(imageId))
    return this.httpClient.post<ResponseModel>(newPath,sendForm)
  }
  getAllProductsImageByProductId(productId:number){
    let newPath = this.apiUrl+"getallproductimagesbyproductid?productId="+productId
    return this.httpClient.get<ListResponseModel<ProductImage>>(newPath);
  }
  getProductImagePath(productImagePath:string){
    return "https://localhost:44351/"+productImagePath
  }
}
