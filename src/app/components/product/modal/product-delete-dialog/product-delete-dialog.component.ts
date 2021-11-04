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

  constructor( @Inject(MAT_DIALOG_DATA) public product: Product,
  private productService:ProductService,private toastrService:ToastrService) { }

  ngOnInit(): void {
  }


  deleteProduct(product:Product){
    this.productService.productDelete(product).subscribe(response=>{
      this.onDeleted.emit()
      this.toastrService.success(product.productName+" adlı "+response.message.toLocaleLowerCase(),"Başarılı!")
    },responseError=>{
      this.toastrService.error(responseError.Error,"Hata!")
    })
  }
}
