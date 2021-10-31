import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiUrl = "https://localhost:44351/api/categories/" 
  constructor(private httpClient : HttpClient) { }

  getAllCategories(){
    let newPath = this.apiUrl+"getall"
    return this.httpClient.get<ListResponseModel<Category>>(newPath);
  }
}
