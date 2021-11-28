
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { UserOperationClaim } from '../models/userOperationClaim';
import { LocalStorageService } from '../services/local-storage.service';
import { UserOperationClaimService } from '../services/user-operation-claim.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  userOperationClaims:UserOperationClaim[]=[];
  userId = parseInt(this.localStorageService.getItem("userId"));
  haveAuthorization=false
  constructor(private localStorageService:LocalStorageService,private toastrService:ToastrService,private router:Router,private userOperationClaimService:UserOperationClaimService){

  }
  ngOnInit():void{

  }
  getAllOperationClaimsByUserId(){
    this.userOperationClaimService.getAllUserOperationClaimsByUserId(this.userId).subscribe(response=>{
      this.userOperationClaims = response.data;
    })
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.userOperationClaims.forEach(userOperationClaim => {
      if(userOperationClaim.operationClaimId==1){
        this.haveAuthorization == true;
      }
    });
    if(this.haveAuthorization==true){
      
      return true;
    }
    else{
      this.router.navigate(["mainpage"])
      this.toastrService.error("Yetkiniz yok!","Hata!");
      return false;
    }
  }
  
}
