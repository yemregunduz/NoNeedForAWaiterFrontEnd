import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-add-dialog',
  templateUrl: './product-add-dialog.component.html',
  styleUrls: ['./product-add-dialog.component.css']
})
export class ProductAddDialogComponent implements OnInit {

  @Output() onAdded = new EventEmitter()
  productAddForm:FormGroup
  restaurantIdFromStorage:number =parseInt(localStorage.getItem("restaurantId")) 
  categories:Category[]

  constructor(private formBuilder:FormBuilder,private productService:ProductService,private toastrService:ToastrService,private categoryService:CategoryService) { }
  
  ngOnInit(): void {
    this.createProductAddForm()
    this. getAllCategories()
  }
  createProductAddForm(){
    this.productAddForm = this.formBuilder.group({
      restaurantId:[this.restaurantIdFromStorage,Validators.required],
      categoryId:["",Validators.required],
      productName:["",[Validators.required,Validators.minLength(2),Validators.maxLength(50)]],
      stock:["",[Validators.required,Validators.minLength(0)]],
      unitPrice:["",Validators.required],
      productDescription:[""]
    })
  }
  productAdd(){
    if(this.productAddForm.valid){
      let productModel = Object.assign({},this.productAddForm.value)
      this.productService.productAdd(productModel).subscribe(response=>{
        this.toastrService.success("Ürün eklendi.","Başarılı!")
        this.onAdded.emit();
      },responseError=>{
        this.toastrService.error(responseError.error,"Hata!")
      })
    }
    else{
      this.toastrService.error("Formu eksiksiz doldurunuz.","Hata!")
    }
  }
  getAllCategories(){
    this.categoryService.getAllCategories().subscribe(response=>{
      this.categories = response.data;
    })
  }

}
