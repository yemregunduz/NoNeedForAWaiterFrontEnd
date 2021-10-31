import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators,FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  deviceInfo:DeviceInfo = null;
  constructor(private formBuilder:FormBuilder,private authService:AuthService,private toastrService:ToastrService,private router:Router,private deviceDetectorService:DeviceDetectorService) { }

  ngOnInit(): void {
    this.createLoginForm();
    this.deviceInfo = this.deviceDetectorService.getDeviceInfo()
    localStorage.setItem('deviceInfo',this.deviceInfo.os)
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
        localStorage.setItem('token',response.data.token)
        localStorage.setItem('restaurantId',response.data.restaurantId.toString())
        localStorage.setItem('userId',response.data.userId.toString())
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
