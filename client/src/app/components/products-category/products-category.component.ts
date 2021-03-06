import { Component, OnInit } from '@angular/core';
import { ProductListService } from 'src/app/services/member-services/product-list/product-list.service';

@Component({
  selector: 'app-products-category',
  templateUrl: './products-category.component.html',
  styleUrls: ['./products-category.component.css']
})
export class ProductsCategoryComponent implements OnInit {

  categoryes = [
    {
      title: 'Instrument Type',
      panel: [
        'Guitars',
        'Drum',
        'Keyboard'
      ]
    },
    {
      title: 'Creator',
      panel: [
        'Gibson',
        'Epiphone',
        'Fender',
        'Yamaha',
        'Tama',
        'Korg',
        'Casio',
      ]
    },
  ]

  constructor(
    private productListService: ProductListService,
  ) { }

  ngOnInit(): void {
  }
}
