import { Component, OnInit } from '@angular/core';
import { Product } from "../../../models/product.model";
import { Category } from "../../../models/category.model";
import { ProductsService } from "../../../services/admin-services/products/products.service";
import { CategoriesService } from "../../../services/admin-services/categories/categories.service";
import { MatDialog } from "@angular/material/dialog";
import { ProductDialogComponent } from './product-dialog/product-dialog.component'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  categories: Category[] = [];

  displayedColumns: string[] = ['name', 'categoryList', 'price', 'description', 'image', 'count', 'actions' ];
  loadingProducts: boolean = false;

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private dialog: MatDialog,
  ) {
    productsService.onUpdateOrCreate
      .subscribe(() => {
        this.getProducts();
      })
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.loadingProducts = true;
    this.productsService.getProducts()
      .subscribe((products: Product[]) => {
        this.products = [...products];
        this.loadingProducts = false;
      });
    this.categoriesService.getCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      })

  }

  deleteProduct(product: Product) {
    this.loadingProducts = true;
    this.productsService.deleteProduct(product)
      .subscribe(() => {
        this.getProducts();
        this.loadingProducts = false;
      });
  }

  openAddEditDialog(product: Product) {
    this.dialog.open(ProductDialogComponent, {
      data: { product, categories: this.categories }
    });
  }

  getCategoryList(categoryList: Category[]) {
    return categoryList.map(category => category.name).join(", ")
  }
}
