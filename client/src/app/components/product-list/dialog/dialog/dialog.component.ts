import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/member-services/cart/cart.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  loading = true;

  constructor(
    private cartService: CartService
  ) {

  }

  ngOnInit() {
  }

}
