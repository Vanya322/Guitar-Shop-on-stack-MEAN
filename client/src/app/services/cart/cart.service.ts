import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { Tovar, User } from 'src/app/models/model'
import { ProductListService } from '../product-list/product-list.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartTovars: any = [];
  myCart: any = [];
  allTovatsIds: any = [];


  constructor(
    private productListService: ProductListService,
    private userService: UserService,
  ) {

  }

  getCartTovars() {

  }

  addTovarToCart(tovar: Tovar) {

  }

  deleteTovar(deletedTovarName: any | undefined) {

  }

}
