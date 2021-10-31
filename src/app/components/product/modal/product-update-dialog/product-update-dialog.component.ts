import { Component, Inject, OnInit, Output,EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-product-update-dialog',
  templateUrl: './product-update-dialog.component.html',
  styleUrls: ['./product-update-dialog.component.css']
})
export class ProductUpdateDialogComponent implements OnInit {
  
  categories:Category[]
  productUpdateForm:FormGroup
  @Output() onUpdated = new EventEmitter();

  constructor(private formBuilder:FormBuilder,public productUpdateDialogRef:MatDialogRef<ProductUpdateDialogComponent>,@Inject(MAT_DIALOG_DATA) public product:Product,
  private productService:ProductService,private toastrService:ToastrService,private categoryService:CategoryService) { }
  
  ngOnInit(): void {
    this.createProductUpdateForm()
    this.getAllCategories()
  }
  
  createProductUpdateForm(){
    this.productUpdateForm = this.formBuilder.group({
      id:[this.product.id,Validators.required],
      restaurantId:[this.product.restaurantId,Validators.required],
      categoryId:[this.product.categoryId,Validators.required],
      productName:[this.product.productName,[Validators.required,Validators.minLength(2),Validators.maxLength(50)]],
      stock:[this.product.stock,[Validators.required,Validators.minLength(0)]],
      unitPrice:[this.product.unitPrice,Validators.required],
      productDescription:[this.product.productDescription]
    })
  }
  productUpdate(product:Product){
    if(this.productUpdateForm.valid){
      product = Object.assign({},this.productUpdateForm.value)
      this.productService.productUpdate(product).subscribe(response=>{
        this.toastrService.success("Ürün güncellendi.","Başarılı!")
        this.onUpdated.emit()
      },responseError=>{
        this.toastrService.error(responseError.error,"Hata!")
      })
    }
    else{
      this.toastrService.error("Formu eksiksiz dolurunuz.","Hata!")
    }
  }
  getAllCategories(){
    this.categoryService.getAllCategories().subscribe(response=>{
      this.categories = response.data
    })
  }
}
