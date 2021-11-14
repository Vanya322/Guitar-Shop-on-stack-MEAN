import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartComponent } from './components/cart/cart.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ProductsMainComponent } from './components/products-main/products-main.component';
import { ProductsCategoryComponent } from './components/products-category/products-category.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CategoriesComponent } from './components/admin-components/categories/categories.component';
import { AdminRegisterComponent } from './components/admin-components/admin-register/admin-register.component';
import { ProductsComponent } from './components/admin-components/products/products.component';
import { CategoryDialogComponent } from './components/admin-components/categories/category-dialog/category-dialog.component';
import { ProductDialogComponent } from './components/admin-components/products/product-dialog/product-dialog.component';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    ProductListComponent,
    CartComponent,
    ProductsMainComponent,
    ProductsCategoryComponent,
    LoginComponent,
    RegisterComponent,
    CategoriesComponent,
    AdminRegisterComponent,
    ProductsComponent,
    CategoryDialogComponent,
    ProductDialogComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
