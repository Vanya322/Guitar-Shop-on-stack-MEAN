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

  products: Product[]  = [];
  displayProducts: Product[] = [];
  productCounts: {[k: string]: any} = {};
  productFilter: string[] = [];
  title: string = "Все товары";

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
        this.displayProducts = [...this.products];
        this.onLoad.emit(false);
      })

    productListService.onChangeProductFilter
      .subscribe((filter: string) => {
        const index = this.productFilter.findIndex((it) => it === filter);

        if (index !== -1) {
          this.productFilter.splice(index, 1);
        } else {
          this.productFilter.push(filter);
        }

        this.reviewProducts();
      })
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productListService.getProducts();
  }

  reviewProducts() {
    if (this.productFilter.length) {
      this.displayProducts = this.products.filter((product) => (
        this.productFilter.every((filter) => product.categoryList.some((it) => it.name === filter))
      ))
      this.title = `Фильтр: ${ this.productFilter.join(", ")}`
    } else {
      this.displayProducts = this.products;
      this.title = "Все товары";
    }
  }

  addProductToCart(product: Product, count: number) {
    this.cartService.addProductToCart(product, count)
  }

  checkOnSail(product: Product) {
    return product.categoryList.some((category) => category.name === "Акции")
  }
}
