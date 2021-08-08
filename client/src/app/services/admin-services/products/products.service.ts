import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../../../models/model";
import {API_KEY} from "../../../utils/utils";
import { ToastrHandlerService } from '../../../utils/toastr-handler.service'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products: Product[] = [];
  onUpdateOrCreate = new EventEmitter();

  constructor(
    private http: HttpClient,
    private toasterHandlerService: ToastrHandlerService,
  ) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${API_KEY}/products`);
  }

  deleteProduct(product: Product): Observable<any> {
    return this.http.delete(`${API_KEY}/products/${product.id}`);
  }

  addOrSaveProduct(product: Product, image: File) {
    const fd = new FormData();

    if(image)
      fd.append("image", image)

    if(product.name)
      fd.append("name", product.name)

    if(product.price)
      fd.append("price", String(product.price))

    if(product.description)
      fd.append("description", product.description)

    if(product.categoryList)
      fd.append("categoryList", product.categoryList.join())

    if(product.count)
      fd.append("count", String(product.count))

    if(product.id){
      this.http.put(`${API_KEY}/products/${product.id}`, fd )
        .subscribe(() => {
          this.onUpdateOrCreate.emit();
        },
        (e) => {
          this.toasterHandlerService.errorToaster(e.error.message)
        });

      return;
    }

    this.http.post(`${API_KEY}/products`, fd)
      .subscribe(() => {
        this.onUpdateOrCreate.emit();
      },
      (e) => {
        this.toasterHandlerService.errorToaster(e.error.message)
      });
  }
}
