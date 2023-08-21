import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Products } from '../models/product.model';
import { environment } from 'src/environments/environment.development';
import { orderItems } from '../models/orderItems.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  getClienProducts(){
    return this.http.get<Products[]>(this.baseApiUrl+'/api/Product/GetProducts');
  }

  getClienProduct(client: number){
    return this.http.get<Products[]>(this.baseApiUrl+'/api/Product/GetProduct?productId='+client);
  }

  addToCart(product:Products){
    //this.http.post<orderItems>()
  }
  
 /* getClienProfileByName(client: string){
    return this.http.get<Clients>(this.baseApiUrl+'/api/Client/GetClientByname?clientName='+client);
    //return this.user;
  }  */
}
