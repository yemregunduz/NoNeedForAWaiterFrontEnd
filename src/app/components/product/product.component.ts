import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  page:number=1;
  totalRecords:number;
  products : Product[];
  restaurantIdFromStorage:number = parseInt(localStorage.getItem('restaurantId'))
  constructor(private productService:ProductService,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getAllProductDetailsDtoByRestaurantId()
  }

  getAllProductDetailsDtoByCategoryIdAndRestaurantId(categoryId:number,restaurantId:number){
    this.productService.getAllProductDetailsDtoByCategoryIdAndRestaurantId(categoryId,restaurantId).subscribe(response=>{
      this.products = response.data
    })
  }
  getAllProductDetailsDtoByRestaurantId(){
    this.productService.getAllProductDetailsDtoByRestaurantId(this.restaurantIdFromStorage).subscribe(response=>{
      this.products = response.data
      this.totalRecords = response.data.length
    })
  }
  onPageChange(page:number){
    this.page=page;
    window.scrollTo(0, 0);
    console.log("hahahaha")
  }

}
