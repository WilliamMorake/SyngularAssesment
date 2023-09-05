import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Products } from '../models/product.model';
import { environment } from 'src/environments/environment.development';
import { CartItem } from '../models/cart-item.model';
import { orderItems } from '../models/orderItems.model';

@Injectable({
  providedIn: 'root'
})
export class OrderItemsService {

  baseApiUrl: string = environment.baseApiUrl;
  logedInClient: any;
  
  constructor(private http: HttpClient) { }

  addToCart(orderitem:orderItems){
    const requestBody = JSON.stringify(orderitem);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.http.post<any>(this.baseApiUrl+'/api/Order_items/AddItemToCart', requestBody, httpOptions)
      .subscribe(
        response => {
          console.log('Response:', response);
        },
        error => {
          console.error('Error:', error);
        }
      );
  }

  GetCartItems(clientId:number){
    return this.http.get<CartItem[]>(this.baseApiUrl+'/api/Order_items/GetCartItems?clientId='+clientId);
  }

  clearCart(clientId:number){
   const data = {};
   console.log("Were ckearing something....")
   const httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json'
     })
   };

   return this.http.post<any>(this.baseApiUrl+'/api/Order_items/ClearCart?clientId='+clientId, data, httpOptions)
     .subscribe(
       response => {
         console.log('Response:', response);
       },
       error => {
         console.error('Error:', error);
       }
     );
  }

  RemoveItemFromCart(id:number){
    const data = {orderId:id};
    console.log("Were removing something...");
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }) 
    };
 
    return this.http.post<any>(this.baseApiUrl+'/api/Order_items/RemoveItemFromCart?orderItemId='+id, data, httpOptions)
      .subscribe(
        response => {
          console.log('Response:', response);
        },
        error => {
          console.error('Error:', error);
        }
      );
  }

  getCartItems(){

  }
}
