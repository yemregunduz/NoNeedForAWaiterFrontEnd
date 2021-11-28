import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { OperationClaim } from 'src/app/models/operationClaim';
import { Title } from 'src/app/models/title';
import { UserDetailDto } from 'src/app/models/userDetailDto';
import { UserImage } from 'src/app/models/userImage';
import { UserOperationClaim } from 'src/app/models/userOperationClaim';
import { UserOperationClaimDetailDto } from 'src/app/models/UserOperationClaimDetailDto';

import { OperationClaimService } from 'src/app/services/operation-claim.service';
import { TitleService } from 'src/app/services/title.service';
import { UserImageService } from 'src/app/services/user-image.service';
import { UserOperationClaimService } from 'src/app/services/user-operation-claim.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-update-dialog',
  templateUrl: './user-update-dialog.component.html',
  styleUrls: ['./user-update-dialog.component.css']
})
export class UserUpdateDialogComponent implements OnInit {

  userUpdateForm:FormGroup
  titles:Title[]
  userImagePath:any
  userImageFile:File
  userImages:UserImage[]=[]
  imageId:number
  operationClaims:OperationClaim[]
  userOperationClaims:UserOperationClaimDetailDto[]
  filteredOperationClaims : Observable<OperationClaim[]>
  @Output() onUpdated = new EventEmitter()
  constructor(private formBuilder:FormBuilder,@Inject(MAT_DIALOG_DATA) public employee:UserDetailDto,private titleService:TitleService,private userService:UserService,
  private toastrService:ToastrService,private userImageService:UserImageService,private userOperationClaimService:UserOperationClaimService,
  private operationClaimService:OperationClaimService) { }

  ngOnInit(): void {
    this.getAllTitles()
    this.createUserUpdateForm();
    this.getUserImagesByUserId();
    this.getAllOperationClaims();
    this.getAllUserOperationClaimDetailsByUserId();
    
  }
  createUserUpdateForm(){
    this.userUpdateForm = this.formBuilder.group({
      id:[this.employee.id,Validators.required],
      restaurantId:[this.employee.restaurantId,Validators.required],
      firstName:[this.employee.firstName,[Validators.required,Validators.maxLength(50)],],
      lastName:[this.employee.lastName,[Validators.required,Validators.maxLength(50)]],
      titleId:[this.employee.titleId,Validators.required],
      salary:[this.employee.salary,Validators.required],
      email:[this.employee.email,[Validators.required,Validators.email]],
      status:[this.employee.status,Validators.required]

    })
    
  }
  getAllTitles(){
    this.titleService.getAllTitles().subscribe(response=>{
      this.titles = response.data
    })
  }
  updateUser(employee:UserDetailDto){
    if(this.userUpdateForm.valid){
      if(this.userUpdateForm.dirty){
        console.log(this.userUpdateForm)
        employee = Object.assign({},this.userUpdateForm.value)
        this.userService.updateUser(employee).subscribe(response=>{
          this.onUpdated.emit()
          this.toastrService.success(response.message,"Başarılı!")
        },responseError=>{
          this.toastrService.error(responseError.error,"Hata!")
        })
      }
    }
    else{
      this.toastrService.error("Formu eksiksiz doldurunuz.","Hata!")
    }
  }
  getUserImagesByUserId(){
    this.userImageService.getAllUserImagesByUserId(this.employee.id).subscribe(response=>{
      this.userImages = response.data
      if(response.data.length>0)
      this.imageId = response.data[0].id;
    })
  }
  getUserImagePath(userImagePath:string){
    return this.userImageService.getImagePath(userImagePath)
  }
  onChangeFileInput(event:Event){
    const element = event.currentTarget as HTMLInputElement
    const reader = new FileReader()
    let fileList:FileList | null = element.files
    this.userImageFile = fileList[0]
    reader.readAsDataURL(fileList[0])
    reader.onload = () =>{
      this.userImagePath = reader.result as string
    }
  }
  updateUserImage(){
    console.log(this.imageId)
    if(this.userImageFile!=null&&this.userImagePath!=null && this.userImages.length>0){
      this.userImageService.updateUserImage(this.userImageFile,this.imageId).subscribe(response=>{
          this.onUpdated.emit()
          this.setUserImagePathAndImageFileToNull()
          this.getUserImagesByUserId();
          this.toastrService.success(response.message,"Başarılı!")
      },responseError=>{
        this.toastrService.error(responseError.error,"Kullanıcı fotoğrafı güncellenemedi!")
      })
    }
    if(this.userImagePath!=null && this.userImages.length==0){
      this.addUserImage();
    }
  }
  addUserImage(){
      this.userImageService.addUserImage(this.userImageFile,this.employee.id).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı!")
        this.setUserImagePathAndImageFileToNull()
        this.onUpdated.emit()
      },responseError=>{
        this.toastrService.error(responseError.error,"Hata!")
      })  
  }
  setUserImagePathAndImageFileToNull(){
    this.userImagePath = null;
    this.userImageFile = null;
  }
  getAllOperationClaims(){
    this.operationClaimService.getAllOperationClaims().subscribe(response=>{
      this.operationClaims = response.data
    })
  }
  getAllUserOperationClaimDetailsByUserId(){
    this.userOperationClaimService.getAllUserOperationClaimDetailsByUserId(this.employee.id).subscribe(response=>{
      this.userOperationClaims = response.data
    })
  }
}
