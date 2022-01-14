
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

  constructor(private localStorageService:LocalStorageService,private toastrService:ToastrService,private router:Router,private userOperationClaimService:UserOperationClaimService){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.localStorageService.getItem("token")
      return true
  }
  
}
