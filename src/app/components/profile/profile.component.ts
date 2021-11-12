import { Component, OnInit } from '@angular/core';
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
  constructor(private userService:UserService,private localStorageService: LocalStorageService,private formBuilder:FormBuilder,private toastrService:ToastrService,
    private userImageService:UserImageService) { }

 
  ngOnInit(): void {
    this.getUserByUserId()
    this.createUserUpdateForm()
  }
  getUserByUserId(){
    this.userService.getUserDetailDtoByUserId(parseInt(this.localStorageService.getItem("userId"))).subscribe(response=>{
      this.user = response.data
      this.createUserUpdateForm()
      console.log(this.user)
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
      email:[this.user.email,[Validators.required,Validators.email]],
      status:[this.user.status,Validators.required]
    })
  }
  updateUserWithoutPassword(user:UserDetailDto){
    if(this.userUpdateForm.valid){
      if(this.userUpdateForm.dirty){
        user = Object.assign({},this.userUpdateForm.value)
        this.userService.updateUserWithoutPassword(user).subscribe(response=>{
          
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
  updateUserImage(){
    console.log(this.imageId)
    if(this.userImageFile!=null&&this.userImagePath!=null && this.userImages.length>0){
      this.userImageService.updateUserImage(this.userImageFile,this.imageId).subscribe(response=>{
          this.setUserImagePathAndImageFileToNull()
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
    this.userImageService.addUserImage(this.userImageFile,this.user.id).subscribe(response=>{
      this.toastrService.success(response.message,"Başarılı!")
      this.setUserImagePathAndImageFileToNull()
    },responseError=>{
      this.toastrService.error(responseError.error,"Hata!")
    })  
}
  getUserImagesByUserId(){
    this.userImageService.getAllUserImagesByUserId(this.user.id).subscribe(response=>{
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
}
