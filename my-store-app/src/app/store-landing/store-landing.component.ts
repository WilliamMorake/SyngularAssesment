import { Component } from '@angular/core';
import { ClientService } from 'src/app/Services/client.service';
import { ProductsService } from '../Services/products.service';
import { Clients } from '../models/clients.model';
import { Products } from '../models/product.model';
import { ActivatedRoute } from '@angular/router';
import { orderItems } from '../models/orderItems.model';
import { OrderItemsService } from '../Services/orderItems.service';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-store-landing',
  templateUrl: './store-landing.component.html',
  styleUrls: ['./store-landing.component.css']
})
export class StoreLandingComponent {
  clients: any;
  cartItems: orderItems[] = [];
  products: Products[] = [];
  quantity: number = 1;
 
  shouldShowChild: boolean = true;

  constructor(private route: ActivatedRoute, private productService: ProductsService, private orderitemService:OrderItemsService, private clientservice:ClientService) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['data']) {
        this.clients = JSON.parse(params['data']);
      }
    });
    console.log('Were still ok');
    this.productService.getClienProducts().subscribe(
      response => {
        this.products = response;
        console.log('Received user:', this.products); 
      },
      error => {
        console.error('Error:', error);
      }      
    );

   this.clientservice.setClienId(this.clients.client_id);
  } 

  addToCart(product:Products){
    product.quantity = this.quantity;
    console.log("Well I cliked: ",product);
    this.orderitemService.addToCart(this.clients.client_id,product.product_id,product.quantity);
  }

  getTotalPrice(){

  }

  clearCart(){

  }

  ngAfterViewInit() {
    this.refreshComponent();
  }

  refreshComponent() {
    this.shouldShowChild = false;
    setTimeout(() => {
      this.shouldShowChild = true;
    });
  }
}
