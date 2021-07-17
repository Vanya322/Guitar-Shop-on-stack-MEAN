import { Component, OnInit } from '@angular/core';
import { ProductListService } from 'src/app/services/product-list.service';

@Component({
  selector: 'app-products-category',
  templateUrl: './products-category.component.html',
  styleUrls: ['./products-category.component.css']
})
export class ProductsCategoryComponent implements OnInit {

  categoryes = [
    {
      title: 'Инструмент',
      panel: [
        'Guitars',
        'Drum',
        'Keybord'
      ]
    },
    {
      title: 'Производиль',
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
