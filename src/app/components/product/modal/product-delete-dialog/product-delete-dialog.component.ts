import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { ProductImageService } from 'src/app/services/product-image.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-delete-dialog',
  templateUrl: './product-delete-dialog.component.html',
  styleUrls: ['./product-delete-dialog.component.css']
})
export class ProductDeleteDialogComponent implements OnInit {

  @Output() onDeleted = new EventEmitter();

  constructor(public productDeleteDialogRef:MatDialogRef<ProductDeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) public product: Product,
  private productService:ProductService,private toastrService:ToastrService,private productImageService:ProductImageService) { }

  ngOnInit(): void {
  }


  productDelete(product:Product){
    if(product.productImagePath!=null){
      console.log("init çalıştı")
      console.log(product.productImageId)
      let promise = new Promise((resolve,reject)=>{
        this.productImageService.deleteProductImage(product.productImageId).subscribe(response=>{
          resolve(response.message)
        })
      })
      promise.then((success)=>{
        this.productService.productDelete(product).subscribe(response=>{
          this.toastrService.success(product.productName+" adlı ürün silindi.","Başarılı!")
          this.onDeleted.emit()
        },responseError=>{
          this.toastrService.error(responseError.error,"Hata!")
        })
      })
    }
    else{
      this.productService.productDelete(product).subscribe(response=>{
        this.toastrService.success(product.productName+" adlı ürün silindi","Başarılı")
        this.onDeleted.emit()
      },responseError=>{
        this.toastrService.error(responseError.error,"Hata!")
      })
    }
    

  }
}
