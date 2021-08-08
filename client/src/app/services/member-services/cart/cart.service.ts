import {EventEmitter, Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import {CartProduct, User} from 'src/app/models/model'
import { HttpClient } from "@angular/common/http";
import { API_KEY } from "../../../utils/utils";
import {UserService} from "../user/user.service";

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
    return this.http.get<CartProduct[] | []>(`${API_KEY}/carts/${this.user!.id}`);
  }

  addProductToCart(product: CartProduct) {
    // this.http.put(`${API_KEY}/carts/${product.id}`, {})
    //   .subscribe(() => {
    //     this.onUpdateOrCreate.emit();
    //   });
  }

  deleteProduct(product: CartProduct) {
    // this.http.delete(`${API_KEY}/carts/${product.id}`)
    //   .subscribe(() => {
    //     this.onUpdateOrCreate.emit();
    //   });
  }

  deleteAllProducts() {
    this.http.get<CartProduct[]>(`${API_KEY}/carts`);
  }

}
