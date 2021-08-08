import { Component, OnInit } from '@angular/core';
import {CartProduct, Category, Product} from 'src/app/models/model'
import { CartService } from '../../services/member-services/cart/cart.service';
import { ToastrHandlerService } from "../../utils/toastr-handler.service";
import {UserService} from "../../services/member-services/user/user.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartProducts: Product[] = [];
  displayedColumns: string[] = ['name', 'categoryList', 'price', 'description', 'image', 'countInCart', 'allPrice', 'add', 'drop'];
  loadingCart = false;

  constructor(
    private cartService: CartService,
    private userService: UserService,
    private toastr: ToastrHandlerService,
    ) {
      cartService.onUpdateOrCreate
        .subscribe(() => this.getCartProducts())
      userService.userSuccessEvent
        .subscribe(() => this.getCartProducts())
    }

  ngOnInit() {
    if(this.userService.user) {
      this.getCartProducts()
    }
 }

  getCartProducts() {
    this.loadingCart = true;
    this.cartService.getCartProducts()
      .subscribe(cartProducts => {
        this.cartProducts = cartProducts || [];
        this.loadingCart = false;
      },
      (e) => {
        this.toastr.errorToaster(e.error ? e.error.message : e)
      })
  }

  deleteProduct(product: CartProduct) {
    this.cartService.deleteProduct(product);
  }

  deleteAllProducts() {
    this.cartService.deleteAllProducts();
  }

  getCategoryList(categoryList: Category[] | undefined) {
    return categoryList ? categoryList.map(category => category.name) : ""
  }

}
