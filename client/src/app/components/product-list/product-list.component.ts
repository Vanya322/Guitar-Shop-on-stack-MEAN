import { Component, OnInit } from '@angular/core';
import { ProductListService } from './../../services/product-list.service';
import { Tovar } from 'src/app/models/model'
import { CartService } from 'src/app/services/cart.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog/dialog.component'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList: Tovar[] | undefined;

  constructor(
    private productListService: ProductListService,
    private cartService: CartService,
    public dialog: MatDialog,
    ) {

  }

  ngOnInit() {

  }

  addTovarToCart(tovar: Tovar) {
;
  }

  openDialog() {
    this.dialog.open(DialogComponent);
  }

}
