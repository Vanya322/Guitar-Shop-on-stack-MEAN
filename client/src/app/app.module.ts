import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

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
import { DialogComponent } from './components/product-list/dialog/dialog/dialog.component';
import { CategoriesComponent } from './components/admin-components/categories/categories.component';
import { AdminRegisterComponent } from './components/admin-components/admin-register/admin-register.component';
import { ProductsComponent } from './components/admin-components/products/products.component';




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
    DialogComponent,
    CategoriesComponent,
    AdminRegisterComponent,
    ProductsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
