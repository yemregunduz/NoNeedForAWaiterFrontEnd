import { Component, OnInit,ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { delay } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  constructor(private observer:BreakpointObserver,private toastrService:ToastrService,private router:Router) { }

  ngOnInit(): void {
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
    localStorage.clear()
    this.router.navigate(["login"]);
    this.toastrService.success("Giriş sayfasına yönlendiriliyorsunuz.","Çıkış başarılı!")
  }
}
