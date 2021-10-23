import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProductComponent } from './components/product/product.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"mainpage",component:SidenavComponent,canActivate:[LoginGuard],children:[
    {path:"products",component:ProductComponent}
  ]},
  {path:"login",component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
