import { Component, OnInit, ViewChild,Inject, Output, EventEmitter } from '@angular/core';
import { MatDialog,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { ProductImageService } from 'src/app/services/product-image.service';
import { ProductService } from 'src/app/services/product.service';
import { LoginComponent } from '../login/login.component';
import { ProductAddDialogComponent } from './modal/product-add-dialog/product-add-dialog.component';
import { ProductDeleteDialogComponent } from './modal/product-delete-dialog/product-delete-dialog.component';
import { ProductUpdateDialogComponent } from './modal/product-update-dialog/product-update-dialog.component';

declare var $:any
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
  filterText:string
  @Output() scrolled = new EventEmitter()
  constructor(private productService:ProductService,private toastrService:ToastrService,public dialog:MatDialog,private productImageService:ProductImageService) { }

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

      if(response.data.length%20 == 0){
        this.page = this.page-1;
      }
    })
  }
  onPageChange(page:number){
    this.page=page;
    this.scrolled.emit();
  }
  openProductAddDialog(){
    const productAddDialogRef = this.dialog.open(ProductAddDialogComponent);
    productAddDialogRef.componentInstance.onAdded.subscribe(response=>{
      this.getAllProductDetailsDtoByRestaurantId();
      productAddDialogRef.close();
    })
  }
  openProductDeleteDialog(product:Product){
    const productDeleteDialogRef = this.dialog.open(ProductDeleteDialogComponent,{
      minWidth: '25%',
      data: product
    })
    productDeleteDialogRef.componentInstance.onDeleted.subscribe(response=>{
      this.getAllProductDetailsDtoByRestaurantId();
    })
  }
  openProductUpdateDialog(product:Product){
    const productUpdateDialogRef = this.dialog.open(ProductUpdateDialogComponent,{
      data:product
    })
     productUpdateDialogRef.componentInstance.onUpdated.subscribe(response=>{
      this.getAllProductDetailsDtoByRestaurantId();
      productUpdateDialogRef.close();
    })
  }
  getProductImagePath(productImagePath:string){
    return this.productImageService.getProductImagePath(productImagePath);
  }
  trackByFn(index: number, product: Product): any {
    return product.id;
  }
}
