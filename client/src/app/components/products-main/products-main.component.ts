import { Component, OnInit } from '@angular/core';
import { ProductListService } from 'src/app/services/product-list/product-list.service'

@Component({
  selector: 'app-products-main',
  templateUrl: './products-main.component.html',
  styleUrls: ['./products-main.component.css']
})
export class ProductsMainComponent implements OnInit {

  constructor(private productListService: ProductListService) { }

  ngOnInit(): void {

  }

}
