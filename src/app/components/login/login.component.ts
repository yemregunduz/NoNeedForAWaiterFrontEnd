import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators,FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  deviceInfo:DeviceInfo = null;
  constructor(private formBuilder:FormBuilder,private authService:AuthService,private toastrService:ToastrService,private router:Router,
    private deviceDetectorService:DeviceDetectorService,private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
    this.createLoginForm();
    this.deviceInfo = this.deviceDetectorService.getDeviceInfo()
    this.localStorageService.add('deviceInfo',this.deviceInfo.os)
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }
  login(){
    if(this.loginForm.valid){
      let loginModel = Object.assign({},this.loginForm.value)
      this.authService.login(loginModel).subscribe(response=>{
        this.localStorageService.add('token',response.data.token)
        this.localStorageService.add('restaurantId',response.data.restaurantId.toString())
        this.localStorageService.add('userId',response.data.userId.toString())
        this.toastrService.success("Giriş başarılı!","Başarılı!")
        this.loginForm.reset()
        this.router.navigate(["mainpage"])
      },responseError=>{
        console.log(responseError.error)
        this.toastrService.error(responseError.error,"Hata")
      })
    }
  }

}
