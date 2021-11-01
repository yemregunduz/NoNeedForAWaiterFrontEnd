import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { ProductImageService } from 'src/app/services/product-image.service';
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
  productImagePath:any
  productImageFile : File

  constructor(private formBuilder:FormBuilder,private productService:ProductService,private toastrService:ToastrService,private categoryService:CategoryService,
    private productImageService:ProductImageService) { }
  
  ngOnInit(): void {
    this.createProductAddForm()
    this.getAllCategories()
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
      let productId:number
      if(this.productImagePath!=null){
        var promise = new Promise((resolve,reject)=>{
          this.productService.productAdd(productModel).subscribe(response=>{
            this.toastrService.success(response.message,"Başarılı!")
            this.onAdded.emit()
            productId = response.data.id
            resolve(response.message)
          },responseError=>{
            this.toastrService.error(responseError.error,"Hata!")
          })
        })
        promise.then((success)=>{
          this.addProductImage(this.productImageFile,productId)
          
        })
      }
      else{
        this.productService.productAdd(productModel).subscribe(response=>{
          this.toastrService.success(response.message,"Başarılı!")
          this.onAdded.emit();
        })
      }     
    }
    else{
      this.toastrService.error("Formu eksiksiz giriniz","Hata!")
    }
    
  }
  getAllCategories(){
    this.categoryService.getAllCategories().subscribe(response=>{
      this.categories = response.data;
    })
  }
  addProductImage(file:File,productId:number){
    this.productImageService.addProductImage(file,productId).subscribe(response=>{
      this.onAdded.emit();
    })
  }
  onChangeFileInput(event:Event){
    const element = event.currentTarget as HTMLInputElement
    const reader = new FileReader()
    let fileList:FileList | null = element.files
    this.productImageFile = fileList[0]
    reader.readAsDataURL(fileList[0])
    reader.onload = () =>{
      this.productImagePath = reader.result as string;
    } 

}
}
