import { EventEmitter, Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { Product } from 'src/app/models/model'
import { API_KEY } from "../../../utils/utils";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductListService {

  products: Product[] = [];
  onGetProducts = new EventEmitter();

  constructor(
    private http: HttpClient,
  ) { }


  getProducts() {
    this.http.get<Product[]>(`${API_KEY}/products`)
      .subscribe((products) => {
        this.products = products;
        this.onGetProducts.emit(this.products)
      })
  }

  addProductToCart() {

  }

}
