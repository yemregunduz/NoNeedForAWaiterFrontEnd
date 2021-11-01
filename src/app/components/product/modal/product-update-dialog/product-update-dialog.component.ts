import { Component, Inject, OnInit, Output,EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { ProductImage } from 'src/app/models/productImage';
import { CategoryService } from 'src/app/services/category.service';
import { ProductImageService } from 'src/app/services/product-image.service';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-product-update-dialog',
  templateUrl: './product-update-dialog.component.html',
  styleUrls: ['./product-update-dialog.component.css']
})
export class ProductUpdateDialogComponent implements OnInit {
  
  categories:Category[]
  productUpdateForm:FormGroup
  productImages: ProductImage[];
  productImageFile:File
  productImagePath:string
  productImageId:number
  @Output() onUpdated = new EventEmitter();

  constructor(private formBuilder:FormBuilder,public productUpdateDialogRef:MatDialogRef<ProductUpdateDialogComponent>,@Inject(MAT_DIALOG_DATA) public product:Product,
  private productService:ProductService,private toastrService:ToastrService,private categoryService:CategoryService,private productImageService:ProductImageService) { }
  
  ngOnInit(): void {
    this.createProductUpdateForm()
    this.getAllCategories()
    this.getAllProductImagesByProductId()
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
  updateProduct(product:Product){
    if(this.productUpdateForm.valid){
      if(this.productUpdateForm.dirty){
        product = Object.assign({},this.productUpdateForm.value)
        this.productService.productUpdate(product).subscribe(response=>{
          this.toastrService.success(response.message,"Başarılı!")
          this.onUpdated.emit()
        },responseError=>{
          this.toastrService.error(responseError.error,"Hata!")
        })
      }   
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
  getAllProductImagesByProductId(){
    this.productImageService.getAllProductsImageByProductId(this.product.id).subscribe(response=>{
      this.productImages = response.data;
      this.productImageId = response.data[0].id
    })
  }
  getProductImagePath(productImagePath:string){
    return this.productImageService.getProductImagePath(productImagePath);
  }
  onChangeFileInput(event:Event){
    const element = event.currentTarget as HTMLInputElement
    const reader = new FileReader()
    let fileList:FileList | null = element.files
    this.productImageFile = fileList[0]
    reader.readAsDataURL(fileList[0])
    reader.onload = () =>{
      this.productImagePath = reader.result as string
    }
  }
  updateProductImage(){
    if(this.productImageFile!=null&&this.productImagePath!=null && this.productImages.length>0){
      this.productImageService.updateProductImage(this.productImageFile,this.productImageId).subscribe(response=>{
          this.onUpdated.emit()
          this.setProductImagePathAndProductImageFileToNull()
          this.toastrService.success(response.message,"Başarılı!")
      },responseError=>{
        this.toastrService.error(responseError.error,"Ürün fotoğrafı güncellenemedi!")
      })
    }
    if(this.productImagePath!=null && this.productImages.length==0){
      this.addProductImage();
    }
  }

  addProductImage(){
    this.productImageService.addProductImage(this.productImageFile,this.product.id).subscribe(response=>{
      this.toastrService.success(response.message,"Başarılı!")
        this.setProductImagePathAndProductImageFileToNull()
        this.onUpdated.emit()
      },responseError=>{
        this.toastrService.error(responseError.error,"Hata!")
      })
  }
  setProductImagePathAndProductImageFileToNull(){
    this.productImageFile = null;
    this.productImagePath = null;
  }
}
