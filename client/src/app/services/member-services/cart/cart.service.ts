import {EventEmitter, Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import {CartProduct, CartProductDto} from 'src/app/models/cart-product.model'
import {User, UserDto} from 'src/app/models/user.model'
import { HttpClient } from "@angular/common/http";
import { API_KEY } from "../../../utils/utils";
import {UserService} from "../user/user.service";
import { map } from 'rxjs/operators'
import { Product } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  user: User | undefined;
  onUpdateOrCreate = new EventEmitter();

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {
    this.userService.userSuccessEvent
      .subscribe((user: User) => {
        this.user = user
      })
  }

  getCartProducts():Observable<CartProduct[]> {
    return this.http.get<CartProductDto[]>(`${API_KEY}/carts/${this.user!.id}`)  
      .pipe(
        map(products => products.map(product => CartProduct.toModel(product)))
      )
  }

  addProductToCart(product: Product) {
    this.http.put(`${API_KEY}/carts/${this.user!.id}/${product.id}`, {})
      .subscribe(() => {
        this.onUpdateOrCreate.emit();
      });
  }

  deleteProduct(product: Product) {
    this.http.delete(`${API_KEY}/carts/${this.user!.id}/${product.id}`)
      .subscribe(() => {
        this.onUpdateOrCreate.emit();
      });
  }

  deleteAllProducts() {
    this.http.delete<CartProduct[]>(`${API_KEY}/carts/${this.user!.id}`)
      .subscribe(() => {
        this.onUpdateOrCreate.emit();
      });
  }

}
