import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class CartApiService {

  constructor(private client: HttpClient) { }

  getAllItems(){
    return this.client.get('http://localhost:3000/cart-items');
  }

  deleteItem(item: Item){
    let id = item.id;

    return this.client.delete(`http://localhost:3000/cart-items/${id}`);
  }

  addItem(item: Item){
    return this.client.post('http://localhost:3000/cart-items', item);
    
  }


}
