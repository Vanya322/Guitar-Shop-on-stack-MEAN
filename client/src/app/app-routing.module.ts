import { NgModule } from '@angular/core';

import { AdminRegisterComponent } from './components/admin-components/admin-register/admin-register.component'
import { CategoriesComponent } from "./components/admin-components/categories/categories.component";
import { ProductsComponent } from "./components/admin-components/products/products.component";

import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsMainComponent } from './components/products-main/products-main.component';
import { RegisterComponent } from './components/register/register.component';


const routes: Routes = [
  { path: 'admin-panel/admin-register-panel', component: AdminRegisterComponent },
  { path: 'admin-panel/categories-panel', component: CategoriesComponent },
  { path: 'admin-panel/products-panel', component: ProductsComponent },

  { path: '', redirectTo: 'login', pathMatch: 'full'  },
  { path: 'products', component: ProductsMainComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
