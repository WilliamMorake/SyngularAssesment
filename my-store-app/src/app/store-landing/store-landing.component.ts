import { Component } from '@angular/core';
import { ClientService } from 'src/app/Services/client.service';
import { ProductsService } from '../Services/products.service';
import { Clients } from '../models/clients.model';
import { Products } from '../models/product.model';
import { ActivatedRoute } from '@angular/router';
import { orderItems } from '../models/orderItems.model';
import { OrderItemsService } from '../Services/orderItems.service';
import { CartComponent } from '../cart/cart.component';
import { Router } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ItemAddedModalComponent } from '../item-added-modal/item-added-modal.component';

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
  modalRef: MdbModalRef<CartComponent> | null = null;
  modalAddRef: MdbModalRef<ItemAddedModalComponent> | null = null;

  constructor(private route: ActivatedRoute, private productService: ProductsService, private orderitemService:OrderItemsService, private clientservice:ClientService, private router:Router, private modalservice:MdbModalService) {
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
    console.log("And the quantity is: ", this.quantity);

    var oderedItemData = {
      clientId: this.clients.client_id,
      productId: product.product_id,
      quantity: product.quantity
    }

    
    console.log("Well I thats the order: ", oderedItemData);
    this.orderitemService.addToCart(oderedItemData);
    itemAdd : ItemAddedModalComponent;
    
    this.modalAddRef = this.modalservice.open(ItemAddedModalComponent, {
      modalClass: 'modal-dialog-centered',
      data: {
        productName: product.description,
      },
    });
  }


  viewCart(){
    this.modalRef = this.modalservice.open(CartComponent, {
      modalClass: 'modal-dialog-centered'
    });
  }

  viewCartItems(){
    this.viewCart();
  }

}
