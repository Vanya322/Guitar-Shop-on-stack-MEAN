import {EventEmitter, Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import {CartProduct, CartProductDto} from 'src/app/models/cart-product.model'
import {User, UserDto} from 'src/app/models/user.model'
import { HttpClient } from "@angular/common/http";
import { API_KEY } from "../../../utils/utils";
import {UserService} from "../user/user.service";

import {debounceTime, map, tap, delay } from 'rxjs/operators'
import { Product } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  user: User | undefined;
  onUpdateOrCreate = new EventEmitter();
  onUpdateCountProductsInCart = new EventEmitter();
  observableCartProducts: Observable<CartProduct[]> = new Observable<CartProduct[]>();
  countProductsInCart: number = 0;

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {
    this.userService.userSuccessEvent
      .subscribe((user: User) => {
        this.user = user
        this.observableCartProducts = this.loadCartProducts();
        this.getCountProductsInCart();
      })
  }

  loadCartProducts():Observable<CartProduct[]> {
    return this.http.get<CartProductDto[]>(`${API_KEY}/carts/${this.user!.id}`)
      .pipe(
        map(products => products.map(product => CartProduct.toModel(product)))
      )
  }

  getCartProducts():Observable<CartProduct[]> {
    return this.observableCartProducts;
  }

  addProductToCart(product: Product, count: number) {
    this.http.put(`${API_KEY}/carts/add/${this.user!.id}/${product.id}`, {
      count,
    }).subscribe(() => {
        this.onUpdateOrCreate.emit();
        this.updateCountProductsInCart(count, true);
    });
  }

  updateProduct(product: CartProduct) {
    this.observableCartProducts.subscribe((items) => {
      this.http.put(`${API_KEY}/carts/update/${this.user!.id}`,{
        product,
      })
        .pipe(
          delay(500),
          tap(() => {
            // const oldProduct = items.find((it) => it.id === product.id);
            // if(oldProduct!.countInCart !== product.countInCart) {
            //
            //   console.log(oldProduct!.countInCart ,product.countInCart,oldProduct!.countInCart < product.countInCart);
            //
            //   let count: number = 0;
            //
            //   if(oldProduct!.countInCart < product.countInCart) {
            //     count = product.countInCart - oldProduct!.countInCart;
            //   } else {
            //     count = oldProduct!.countInCart - product.countInCart;
            //   }
            //
            //   this.updateCountProductsInCart(count, oldProduct!.countInCart < product.countInCart);
            // }
            const oldProduct = items.find((it) => it.id === product.id);
            console.log(oldProduct!.countInCart ,product.countInCart,oldProduct!.countInCart < product.countInCart);
            this.updateCountProductsInCart(1, oldProduct!.countInCart < product.countInCart);
          })
        )
        .subscribe(() => {});
    })

  }

  deleteProduct(product: CartProduct) {
    console.log(product)
    this.http.delete(`${API_KEY}/carts/${this.user!.id}/${product.id}`)
      .subscribe(() => {
        this.onUpdateOrCreate.emit();
        this.updateCountProductsInCart(product.countInCart, false);
      });
  }

  deleteAllProducts() {
    this.http.delete<CartProduct[]>(`${API_KEY}/carts/${this.user!.id}`)
      .subscribe(() => {
        this.onUpdateOrCreate.emit();
        this.updateCountProductsInCart(this.countProductsInCart, false);
      });
  }

  getCountProductsInCart() {
    this.observableCartProducts.subscribe((cartProducts) => {
      cartProducts.forEach((product) => {
        this.countProductsInCart += product.countInCart;
      })
      this.onUpdateCountProductsInCart.emit(this.countProductsInCart)
    })
  }

  updateCountProductsInCart(count: number, isSum: boolean) {
    this.onUpdateCountProductsInCart.emit(
      isSum
        ? this.countProductsInCart += count
        : this.countProductsInCart -= count
    )
  }
}
