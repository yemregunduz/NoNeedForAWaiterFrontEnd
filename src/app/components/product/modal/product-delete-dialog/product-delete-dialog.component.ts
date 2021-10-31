import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-delete-dialog',
  templateUrl: './product-delete-dialog.component.html',
  styleUrls: ['./product-delete-dialog.component.css']
})
export class ProductDeleteDialogComponent implements OnInit {

  @Output() onDeleted = new EventEmitter();

  constructor(public productDeleteDialogRef:MatDialogRef<ProductDeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) public product: Product,
  private productService:ProductService,private toastrService:ToastrService) { }

  ngOnInit(): void {
  }


  productDelete(product:Product){
    this.productService.productDelete(product).subscribe(response=>{
      this.toastrService.success(product.productName+" adlı ürün silindi.","Başarılı!")
      this.onDeleted.emit()
    },responseError=>{
      this.toastrService.error(responseError.error,"Hata!")
    })

  }
}
