import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { Product } from '../models/product';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl="https://localhost:44351/api/products/"
  constructor(private httpClient:HttpClient) { }

  getAllProductDetailsDtoByRestaurantId(restaurantId:number){
    let newPath = this.apiUrl+"getallproductdetailsdtobyrestaurantid?restaurantId="+restaurantId;
    return this.httpClient.get<ListResponseModel<Product>>(newPath);
  }
  getAllProductDetailsDtoByCategoryIdAndRestaurantId(categoryId:number,restaurantId:number){
    let newPath = this.apiUrl+"getallproductdetailsdtobycategoryidandrestaurantid?categoryId="+categoryId+"&restaurantId"+restaurantId;
    return this.httpClient.get<ListResponseModel<Product>>(newPath);
  }
  productAdd(product:Product){
    let newPath= this.apiUrl+"add"
    return this.httpClient.post<SingleResponseModel<Product>>(newPath,product);
  }
  productDelete(product:Product){
    let newPath=this.apiUrl+"delete"
    return this.httpClient.post<ResponseModel>(newPath,product);
  }
  productUpdate(product:Product){
    let newPath=this.apiUrl+"update"
    return this.httpClient.post<ResponseModel>(newPath,product);
  }
}
