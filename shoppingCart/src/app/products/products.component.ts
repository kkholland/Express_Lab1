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
  newProduct: string = '';
  newPrice: number = 5;
  newQuantity: number = 1;

  constructor(private service: CartApiService) { }

  ngOnInit(): void {
    this.service.getAllItems().subscribe(item => this.cartItems = item);
  }

  deleteItem(item:Item){
    this.service.deleteItem(item).subscribe();
    this.service.getAllItems().subscribe(item => this.cartItems = item);
  }

  addItem(product: string, price: number, quantity: number){
    let postItem: Item = {
      product: product,
      price: price,
      quantity: quantity,
    }

    this.service.addItem(postItem).subscribe();
    this.service.getAllItems().subscribe(item => this.cartItems = item);

    this.newItem = false;
  }

}
