import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from "@angular/material/core";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatTooltipModule} from '@angular/material/tooltip';
import {A11yModule} from '@angular/cdk/a11y';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSliderModule} from '@angular/material/slider';
import {MatSortModule} from '@angular/material/sort';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import {MatRippleModule} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogModule} from '@angular/material/dialog';
import {MatChipsModule} from '@angular/material/chips';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatBadgeModule} from '@angular/material/badge';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatTreeModule} from '@angular/material/tree';
import {NgxPaginationModule} from 'ngx-pagination'
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ProductComponent } from './components/product/product.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ProductAddDialogComponent } from './components/product/modal/product-add-dialog/product-add-dialog.component';
import { ProductDeleteDialogComponent } from './components/product/modal/product-delete-dialog/product-delete-dialog.component';
import { ProductUpdateDialogComponent } from './components/product/modal/product-update-dialog/product-update-dialog.component';
import { UserComponent } from './components/user/user.component';
import { UserAddDialogComponent } from './components/user/modal/user-add-dialog/user-add-dialog.component';
import { UserUpdateDialogComponent } from './components/user/modal/user-update-dialog/user-update-dialog.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { UserDeleteDialogComponent } from './components/user/modal/user-delete-dialog/user-delete-dialog.component';
import { UserFilterPipePipe } from './pipes/user-filter-pipe.pipe';
import { ProductFilterPipePipe } from './pipes/product-filter-pipe.pipe';
import { ProfileComponent } from './components/profile/profile.component';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { ClientSideComponent } from './components/client-side/client-side.component';
import { OrderComponent } from './components/order/order.component';
import { OrderDetailsDialogComponent } from './components/order/modal/order-details-dialog/order-details-dialog.component';
import { ShoppingCartDialogComponent } from './components/client-side/modal/shopping-cart-dialog/shopping-cart-dialog.component';
import { CategoryProductPipe } from './pipes/category-product.pipe';
import { PaymentComponent } from './components/payment/payment.component';
import { PaymentSuccessComponent } from './components/payment/payment-success/payment-success.component';
import { QrCodeComponent } from './components/qr-code/qr-code.component';
import { TableQrCodeDialogComponent } from './components/qr-code/modal/table-qr-code-dialog/table-qr-code-dialog.component';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductComponent,
    SidenavComponent,
    ProductAddDialogComponent,
    ProductDeleteDialogComponent,
    ProductUpdateDialogComponent,
    UserComponent,
    UserAddDialogComponent,
    UserUpdateDialogComponent,
    SafeHtmlPipe,
    UserDeleteDialogComponent,
    UserFilterPipePipe,
    ProductFilterPipePipe,
    ProfileComponent,
    DateFormatPipe,
    ClientSideComponent,
    OrderComponent,
    OrderDetailsDialogComponent,
    ShoppingCartDialogComponent,
    CategoryProductPipe,
    PaymentComponent,
    PaymentSuccessComponent,
    QrCodeComponent,
    TableQrCodeDialogComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatTooltipModule,
    A11yModule,
    MatExpansionModule,
    MatTabsModule,
    MatSliderModule,
    MatSortModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatSelectModule,
    MatRippleModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatMenuModule,
    MatListModule,
    MatGridListModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatDividerModule,
    MatChipsModule,
    MatDialogModule,
    HttpClientModule,
    MatTreeModule,
    CdkAccordionModule,
    CdkTreeModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    }),
    NgbModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true},
    { provide: MAT_DATE_LOCALE, useValue: 'tr-TR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
