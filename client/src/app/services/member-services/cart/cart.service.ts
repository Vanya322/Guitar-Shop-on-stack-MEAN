import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { Product, User } from 'src/app/models/model'
import { ProductListService } from '../product-list/product-list.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartProducts: any = [];
  myCart: any = [];
  allProductIds: any = [];


  constructor(
    private productListService: ProductListService,
    private userService: UserService,
  ) {

  }

  getCartProducts() {

  }

  addProductToCart(product: Product) {

  }

  deleteTovar(deletedProductName: any | undefined) {

  }

}
