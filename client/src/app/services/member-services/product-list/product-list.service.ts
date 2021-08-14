import { EventEmitter, Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { Product, ProductDto } from 'src/app/models/product.model'
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
    this.http.get<ProductDto[]>(`${API_KEY}/products`)
      .subscribe((products) => {
        this.products = products.map(product => Product.toModel(product));
        this.onGetProducts.emit(this.products)
      })
  }

  addProductToCart() {

  }

}
