import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientSideComponent } from './components/client-side/client-side.component';
import { LoginComponent } from './components/login/login.component';
import { OrderComponent } from './components/order/order.component';
import { PaymentSuccessComponent } from './components/payment/payment-success/payment-success.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProductAddDialogComponent } from './components/product/modal/product-add-dialog/product-add-dialog.component';
import { ProductDeleteDialogComponent } from './components/product/modal/product-delete-dialog/product-delete-dialog.component';
import { ProductUpdateDialogComponent } from './components/product/modal/product-update-dialog/product-update-dialog.component';
import { ProductComponent } from './components/product/product.component';
import { ProfileComponent } from './components/profile/profile.component';
import { QrCodeComponent } from './components/qr-code/qr-code.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { UserAddDialogComponent } from './components/user/modal/user-add-dialog/user-add-dialog.component';
import { UserUpdateDialogComponent } from './components/user/modal/user-update-dialog/user-update-dialog.component';
import { UserComponent } from './components/user/user.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"",redirectTo:"/mainpage", pathMatch:"full"},
  {path:"mainpage",component:SidenavComponent,canActivate:[LoginGuard],children:[
    {path:"products",component:ProductComponent,children:[
      {path:"productadd",component:ProductAddDialogComponent},
      {path:"productdelete",component:ProductDeleteDialogComponent},
      {path:"productupdate",component:ProductUpdateDialogComponent}
    ]},
    {path:"users",component:UserComponent,canActivate:[AuthGuard], children:[
      {path:"useradd",component:UserAddDialogComponent},
      {path:"userupdate",component:UserUpdateDialogComponent}
    ]},
    {path:"profile",component:ProfileComponent},
    {path:"orders",component:OrderComponent},
    {path:"qrcodes",component:QrCodeComponent}
  ]},
  {path:"login",component:LoginComponent},
  {path:"clientside/:tableId",component:ClientSideComponent},
  {path:"payment",component:PaymentComponent},
  {path:"paymentsuccess",component:PaymentSuccessComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
