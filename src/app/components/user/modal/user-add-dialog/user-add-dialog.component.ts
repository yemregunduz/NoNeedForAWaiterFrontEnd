import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { OperationClaim } from 'src/app/models/operationClaim';
import { Title } from 'src/app/models/title';
import { UserOperationClaim } from 'src/app/models/userOperationClaim';
import { AuthService } from 'src/app/services/auth.service';
import { OperationClaimService } from 'src/app/services/operation-claim.service';
import { TitleService } from 'src/app/services/title.service';
import { UserImageService } from 'src/app/services/user-image.service';
import { UserOperationClaimService } from 'src/app/services/user-operation-claim.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-add-dialog',
  templateUrl: './user-add-dialog.component.html',
  styleUrls: ['./user-add-dialog.component.css']
})
export class UserAddDialogComponent implements OnInit {

  userImagePath:any
  userImageFile:File
  titles:Title[]
  operationClaims:OperationClaim[]
  userAddForm:FormGroup
  userOperationClaimAddForm:FormGroup
  restaurantIdFromStorage:number = parseInt(localStorage.getItem('restaurantId'))
  operationClaimsToAdded: number[] =[]
  @Output() onAdded = new EventEmitter()
  constructor(private userService:UserService,private toastrService:ToastrService,private formBuilder:FormBuilder,
    private authService:AuthService,private titleService:TitleService,private userImageService:UserImageService,
    private operationClaimService:OperationClaimService,private userOperationClaimService:UserOperationClaimService) { }

  ngOnInit(): void {
    this.createUserAddForm();
    this.getAllTitles();
    this.getAllOperationClaims();
    this.createUserOperationClaimAddForm();
  }
  
  createUserAddForm(){
    this.userAddForm = this.formBuilder.group({
      restaurantId:[this.restaurantIdFromStorage,Validators.required],
      firstName:["",[Validators.required,Validators.maxLength(50)],],
      lastName:["",[Validators.required,Validators.maxLength(50)]],
      titleId:["",Validators.required],
      salary:["",Validators.required],
      email:["",[Validators.required,Validators.email]],
      password:["",[Validators.required,Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@!%*?+#&'()[=\"€])[A-Za-z\\d$@!%*?+#&'()[=\"€']{8,}")]],
      status:[true,Validators.required]
    })
  }
  userAdd(){
      if(this.userAddForm.valid){
        let registerModel = Object.assign({},this.userAddForm.value)
        let userId:number
        if(this.userImagePath!=null || this.operationClaimsToAdded.length>0){
          var promise = new Promise((resolve,reject)=>{
            this.authService.register(registerModel).subscribe(response=>{
              this.toastrService.success(response.message,"Başarılı!")
              this.onAdded.emit()
              userId = response.data.id
              this.userOperationClaimAddForm.patchValue({
                userId:response.data.id
              })
              resolve(response.message)
            },responseError=>{
              this.toastrService.error(responseError.error,"Hata!")
            })
          })
          promise.then((success)=>{
            if(this.userImagePath!=null){
              this.addUserImage(this.userImageFile,userId)
            }
            for (let i = 0; i < this.operationClaimsToAdded.length; i++) {
              this.userOperationClaimAddForm.patchValue({
                operationClaimId: this.operationClaimsToAdded[i]
              })
              this.addUserOperationClaim();  
            }
          })
        }
        else{
          this.authService.register(registerModel).subscribe(response=>{
            this.toastrService.success(response.message,"Başarılı!")
            this.onAdded.emit();
          })
        }     
      }
      else{
        this.toastrService.error("Formu eksiksiz giriniz","Hata!")
      }
  }
  getAllTitles(){
    this.titleService.getAllTitles().subscribe(response=>{
      this.titles = response.data
      
    })
  }
  onChangeFileInput(event:Event){
    const element = event.currentTarget as HTMLInputElement
    const reader = new FileReader()
    let fileList:FileList | null = element.files
    this.userImageFile = fileList[0]
    reader.readAsDataURL(fileList[0])
    reader.onload = () =>{
      this.userImagePath = reader.result as string;
    }   
  }
  addUserImage(file:File,userId:number){
    if(this.userImagePath!=null){
      this.userImageService.addUserImage(file,userId).subscribe(response=>{
        this.onAdded.emit();
      })
    }
  }
  getAllOperationClaims(){
    this.operationClaimService.getAllOperationClaims().subscribe(response=>{
      this.operationClaims = response.data
    })
  }
  addItemOperationClaimsToAdded(operationClaimId:number){
    const index = this.operationClaimsToAdded.indexOf(operationClaimId)
    if(index < 0){
      this.operationClaimsToAdded.push(operationClaimId)
    }
    else{
      this.operationClaimsToAdded.splice(index,1)
    }
  }
  createUserOperationClaimAddForm(){
    this.userOperationClaimAddForm = this.formBuilder.group({
      userId:[Validators.required],
      operationClaimId:[Validators.required]
    })
  }
  addUserOperationClaim(){
    if(this.userOperationClaimAddForm.valid){
      let userOperationClaimModel = Object.assign({},this.userOperationClaimAddForm.value)
      this.userOperationClaimService.addUserOperationClaim(userOperationClaimModel).subscribe(response=>{
        this.onAdded.emit();
      })
    }
  }
}
