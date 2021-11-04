import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserDetailDto } from 'src/app/models/userDetailDto';
import { UserImage } from 'src/app/models/userImage';
import { UserOperationClaim } from 'src/app/models/userOperationClaim';
import { UserImageService } from 'src/app/services/user-image.service';
import { UserOperationClaimService } from 'src/app/services/user-operation-claim.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-delete-dialog',
  templateUrl: './user-delete-dialog.component.html',
  styleUrls: ['./user-delete-dialog.component.css']
})
export class UserDeleteDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public formerEmployee:UserDetailDto,private userService:UserService,private toastrService:ToastrService) { }
  userImages:UserImage[]=[]
  userOperationClaims:UserOperationClaim[]=[]
  @Output() onDeleted = new EventEmitter()
  ngOnInit(): void {
  }
  
  deleteUser(formerEmployee:UserDetailDto){
    this.userService.deleteUser(formerEmployee).subscribe(response=>{
      this.toastrService.success(formerEmployee.firstName+" "+formerEmployee.lastName+" adlı " +response.message.toLocaleLowerCase(),"Başarılı!")
      this.onDeleted.emit()
    },responseError=>{
      this.toastrService.error(responseError.error,"Hata!")
    })
  }
  
}
