import { Component, OnInit } from '@angular/core';
import { CartApiService } from '../cart-api.service';
import { Item } from '../item';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  cartItems: any | null = null;
  newItem: boolean = false;

  constructor(private service: CartApiService) { }

  ngOnInit(): void {
    this.service.getAllItems().subscribe(item => this.cartItems = item);
  }

  deleteItem(item:Item){
    this.service.deleteItem(item).subscribe();
    this.service.getAllItems().subscribe(item => this.cartItems = item);
  }

}
