import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductListService } from '../../services/member-services/product-list/product-list.service';
import { Product } from 'src/app/models/product.model'
import { CartService } from 'src/app/services/member-services/cart/cart.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] | undefined;
  productCounts: {[k: string]: any} = {};

  @Output() onLoad = new EventEmitter()

  constructor(
    private productListService: ProductListService,
    private cartService: CartService,
    public dialog: MatDialog,
  ) {
    productListService.onGetProducts
      .subscribe((products: Product[]) => {
        this.products = products;
        this.products.forEach((it) => {
          this.productCounts[it.id] = 1;
        })
        this.onLoad.emit(false);
      })
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productListService.getProducts();
  }

  addProductToCart(product: Product, count: Number) {
    this.cartService.addProductToCart(product, count)
  }
}
