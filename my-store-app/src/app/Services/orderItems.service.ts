import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Products } from '../models/product.model';
import { environment } from 'src/environments/environment.development';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class OrderItemsService {

  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  addToCart(clientId:number, productId: number, quantity:number){
    const data = {};

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.http.post<any>(this.baseApiUrl+'/api/Order_items/AddItemToCart?clientId='+clientId+'&productId='+productId+'&quantity='+quantity, data, httpOptions)
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

  getCartItems(){

  }
}
