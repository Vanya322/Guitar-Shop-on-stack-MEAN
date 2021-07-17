import { Component, OnInit } from '@angular/core';
import { Tovar } from 'src/app/models/model'
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartTovars: Tovar[] = [];
  displayedColumns: string[] = ['Name', 'Description', 'Price', 'Count', 'AllPrice', 'Add', 'Drop'];
  loadingCart = true;

  displayCartTovars:any = []

  constructor(
    private cartService: CartService,
    ) {

    }

  ngOnInit() {
    this.getCartTovars();
  }

  getCartTovars() {

  }

  deleteTovar(tovar: any) {

  }

  deleteAllTovars() {

  }

}
