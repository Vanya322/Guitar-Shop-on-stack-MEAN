import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductListService } from '../../services/member-services/product-list/product-list.service';
import { Product } from 'src/app/models/model'
import { CartService } from 'src/app/services/member-services/cart/cart.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog/dialog.component'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] | undefined;

  @Output() onLoad = new EventEmitter()

  constructor(
    private productListService: ProductListService,
    private cartService: CartService,
    public dialog: MatDialog,
  ) {
    productListService.onGetProducts
      .subscribe((products: Product[]) => {
        this.products = products;
        console.log("EMIT")
        this.onLoad.emit(false);
      })
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productListService.getProducts();
  }

  addProductToCart(product: Product) {
;
  }

  openDialog() {
    this.dialog.open(DialogComponent);
  }

}
