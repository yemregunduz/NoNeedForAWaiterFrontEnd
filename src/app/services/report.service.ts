import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BestSellingProductDetailDto } from '../models/bestSellingProductDetailDto';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  apiUrl= "https://localhost:44351/api/reports/"
  constructor(private httpClient:HttpClient) { }

  getTop10BestSellingProducts(){
    let newPath = this.apiUrl+"gettop10bestsellingproduct"
    return this.httpClient.get<ListResponseModel<BestSellingProductDetailDto>>(newPath);
  }
  
}
