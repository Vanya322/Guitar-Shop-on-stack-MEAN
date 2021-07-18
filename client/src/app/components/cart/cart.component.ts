import { Component, OnInit } from '@angular/core';
import { Tovar } from 'src/app/models/model'
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartProducts: Tovar[] = [];
  displayedColumns: string[] = ['Name', 'Description', 'Price', 'Count', 'AllPrice', 'Add', 'Drop'];
  loadingCart = true;

  displayCartProducts:any = []

  constructor(
    private cartService: CartService,
    ) {

    }

  ngOnInit() {
    this.getCartProducts();
  }

  getCartProducts() {

  }

  deleteProduct(tovar: any) {

  }

  deleteAllProducts() {

  }

}
