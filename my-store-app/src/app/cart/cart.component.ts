// cart.component.ts
import { Component } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { OrderItemsService } from '../Services/orderItems.service';
import { ClientService } from '../Services/client.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems: CartItem[] = [];
  count: number = 0;

  constructor(private oderItemsService: OrderItemsService, private clientService:ClientService) {


  } 

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

  getTotalPrice(){
    let totaPrice = 0;
    this.cartItems.forEach(element => {
      totaPrice += element.price;
    });
    return totaPrice; 
    
  }
}
