import { Component, OnInit,ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { delay } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import $ from 'jquery'
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';
import { UserDetailDto } from 'src/app/models/userDetailDto';
import { UserImageService } from 'src/app/services/user-image.service';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  deviceInfoFromStorage = localStorage.getItem('deviceInfo')
  user:UserDetailDto = new UserDetailDto();
  constructor(private observer:BreakpointObserver,private toastrService:ToastrService,public router:Router,private localStorageService:LocalStorageService,
    private userService:UserService,private userImageService:UserImageService) { }

  ngOnInit(): void {
    this.getUserDetailDtoByUserId()
  }
  ngAfterViewInit(){
    this.observer
    .observe(['(max-width: 800px)'])
    .pipe(delay(1))
    .subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }
  logout(){
    this.localStorageService.remove("token")
    this.localStorageService.remove("restaurantId")
    this.localStorageService.remove("userId")
    this.router.navigate(["login"]);
    this.toastrService.success("Giriş sayfasına yönlendiriliyorsunuz.","Çıkış başarılı!")
  }
  closeSidenavAfterClick(){
    if(this.deviceInfoFromStorage=="iOS" || this.deviceInfoFromStorage=="Android"){
      this.sidenav.close();
    }
  }
  scrollUp(){
    $("#matSidenav").scrollTop(0)
  }
  getUserDetailDtoByUserId(){
    this.userService.getUserDetailDtoByUserId(parseInt(this.localStorageService.getItem("userId"))).subscribe(response=>{
      this.user = response.data
    })
  }
  getUserImagePath(imagePath:string){
    return this.userImageService.getImagePath(imagePath);
  }
}
