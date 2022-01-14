import { Component, EventEmitter, NgModule, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { UserDetailDto } from 'src/app/models/userDetailDto';
import { UserImage } from 'src/app/models/userImage';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserImageService } from 'src/app/services/user-image.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  userUpdateForm:FormGroup
  userImagePath:any
  userImageFile:File
  userImages:UserImage[]=[]
  imageId:number
  user:UserDetailDto = new UserDetailDto();
  dateOfBirth = new Date();
  dateOfRecruitment = new Date();
  dateOfDismissal = new Date();
  @Output() onUpdated = new EventEmitter()
  
  constructor(private userService:UserService,private localStorageService: LocalStorageService,private formBuilder:FormBuilder,private toastrService:ToastrService,
    private userImageService:UserImageService) { }

 
  ngOnInit(): void {
    this.getUserByUserId()
    this.createUserUpdateForm()
    this.getUserImagesByUserId()
  }
  
  getUserByUserId(){
    this.userService.getUserDetailDtoByUserId(parseInt(this.localStorageService.getItem("userId"))).subscribe(response=>{
      this.user = response.data
      this.createUserUpdateForm()
    })
  }
  createUserUpdateForm(){
    this.userUpdateForm = this.formBuilder.group({
      id:[this.user.id,Validators.required],
      restaurantId:[this.user.restaurantId,Validators.required],
      firstName:[this.user.firstName,[Validators.required,Validators.maxLength(50)]],
      lastName:[this.user.lastName,[Validators.required,Validators.maxLength(50)]],
      titleId:[this.user.titleId,Validators.required],
      salary:[this.user.salary,Validators.required],
      tcNo:[this.user.tcNo,[Validators.required,Validators.minLength(11)]],
      mobilePhoneNumber:[this.user.mobilePhoneNumber,[Validators.required,Validators.minLength(11),Validators.maxLength(11)]],
      fixedPhoneNumber:[this.user.fixedPhoneNumber],
      dateOfBirth:[this.user.dateOfBirth,[Validators.required]],
      dateOfRecruitment:[this.user.dateOfRecruitment],
      dateOfDismissal:[this.user.dateOfDismissal],
      email:[this.user.email,[Validators.required,Validators.email]],
      status:[this.user.status,Validators.required]
    })
  }
  updateUser(user:UserDetailDto){
    if(this.userUpdateForm.valid){
      if(this.userUpdateForm.dirty){
        user = Object.assign({},this.userUpdateForm.value)
        this.userService.updateUser(user).subscribe(response=>{
          this.getUserByUserId();
          this.toastrService.success(response.message,"Başarılı!")
        },responseError=>{
          this.toastrService.error(responseError.error,"Hata!")
        })
      }
    }
    else{
      this.toastrService.error("Formu eksiksiz doldurunuz.","Hata!")
      console.log(this.userUpdateForm)
    }
  }
  updateUserImage(){
    if(this.userImageFile!=null&&this.userImagePath!=null && this.userImages.length>0){
      this.userImageService.updateUserImage(this.userImageFile,this.imageId).subscribe(response=>{
          this.setUserImagePathAndImageFileToNull()
          this.getUserImagesByUserId();
          this.onUpdated.emit()
          this.toastrService.success(response.message,"Başarılı!")
      },responseError=>{
        this.toastrService.error(responseError.error,"Fotoğrafınız güncellenemedi!")
      })
    }
    if(this.userImagePath!=null && this.userImages.length==0){
      this.addUserImage();
    }
  }
  addUserImage(){
    this.userImageService.addUserImage(this.userImageFile,this.user.id).subscribe(response=>{
      this.toastrService.success(response.message,"Başarılı!")
      this.setUserImagePathAndImageFileToNull()
    },responseError=>{
      this.toastrService.error(responseError.error,"Hata!")
    })  
}
  getUserImagesByUserId(){
    this.userImageService.getAllUserImagesByUserId(parseInt(this.localStorageService.getItem("userId")) ).subscribe(response=>{
      this.userImages = response.data
      if(response.data.length>0)
      this.imageId = response.data[0].id;
    })
  }
  getUserImagePath(userImagePath:string){
    return this.userImageService.getImagePath(userImagePath)
  }
  setUserImagePathAndImageFileToNull(){
    this.userImagePath = null;
    this.userImageFile = null;
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
  numberOnly(event:any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
