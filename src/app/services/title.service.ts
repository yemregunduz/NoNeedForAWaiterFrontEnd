import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { Title } from '../models/title';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  apiUrl="https://localhost:44351/api/titles/"
  constructor(private httpClient:HttpClient) { }

  addTitle(title:Title){
    let newPath = this.apiUrl+"add";
    return this.httpClient.post(newPath,title);
  }
  deleteTitle(title:Title){
    let newPath = this.apiUrl+"delete"
    return this.httpClient.post(newPath,title);
  }
  updateTitle(title:Title){
    let newPath = this.apiUrl+"update"
    return this.httpClient.post(newPath,title);
  }
  getAllTitles(){
    let newPath = this.apiUrl+"getall"
    return this.httpClient.get<ListResponseModel<Title>>(newPath);
  }
}
