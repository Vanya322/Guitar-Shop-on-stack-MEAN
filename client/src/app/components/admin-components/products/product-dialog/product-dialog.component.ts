import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import { Product } from "../../../../models/product.model";
import { Category } from "../../../../models/category.model";
import { ProductsService } from '../../../../services/admin-services/products/products.service'
@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent implements OnInit {

  imageFile: any;

  product: FormGroup = new FormGroup({
    id: new FormControl(this.data.product.id),
    name: new FormControl(this.data.product.name),
    price: new FormControl(this.data.product.price),
    description: new FormControl(this.data.product.description),
    count: new FormControl(this.data.product.count),
    categoryList: new FormControl(this.data.product.categoryList.map(category => category.id)),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      product: Product,
      categories: Category[],
    },
    private productsService: ProductsService,
  ) { }

  ngOnInit(): void {
  }

  addOrSaveCategory() {
    this.productsService.addOrSaveProduct(this.product.value, this.imageFile)
  }

  onChange(event: any) {
    this.imageFile = event.target.files[0];
  }

}
