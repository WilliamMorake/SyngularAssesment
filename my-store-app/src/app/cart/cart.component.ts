// cart.component.ts
import { Component } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { OrderItemsService } from '../Services/orderItems.service';
import { ClientService } from '../Services/client.service';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent {
  cartItems: CartItem[] = [];
  count: number = 0;

  constructor(private mdbmodalref:MdbModalRef<CartComponent>,private oderItemsService: OrderItemsService, private clientService:ClientService) {} 

  ngOnInit() {
    this.oderItemsService.GetCartItems(this.clientService.getClienId()).subscribe(
      response => {
        this.cartItems = response;
        console.log('Cart user:', this.cartItems);
      },
      error => {
        console.error('Error:', error);
      }      
    );
  }

  clearItemCart() {
    this.oderItemsService.clearCart(this.clientService.getClienId());
    this.cartItems = [];
  }

  removeItem(item:any){
    // Find the index of the item to remove
    const indexToRemove = this.cartItems.indexOf(item);

    // Check if the item exists in the array
    if (indexToRemove !== -1) {
      // Remove the item from the array
      this.oderItemsService.RemoveItemFromCart(item.id);
      this.cartItems.splice(indexToRemove, 1);
    }
  }

  getTotalPrice(){
    let totaPrice = 0;
    this.cartItems.forEach(element => {
      totaPrice += element.price;
    });
    return totaPrice; 
  }

  closeCart(){
    this.mdbmodalref.close();
  }
}
