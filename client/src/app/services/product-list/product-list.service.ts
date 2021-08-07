import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { Product } from 'src/app/models/model'

@Injectable({
  providedIn: 'root'
})
export class ProductListService {

  products: Product[] = [];

  constructor(
  ) {
    this.getTovars();
  }

  getTovars() {

  }

}
