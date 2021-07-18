import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { Tovar } from 'src/app/models/model'

@Injectable({
  providedIn: 'root'
})
export class ProductListService {

  tovars: Tovar[] = [];

  constructor(
  ) {
    this.getTovars();
  }

  getTovars() {

  }

}
