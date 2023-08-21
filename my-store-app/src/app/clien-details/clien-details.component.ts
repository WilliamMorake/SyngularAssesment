import { Component } from '@angular/core';
import { ClientService } from '../Services/client.service';
import { Clients } from '../models/clients.model';

@Component({
  selector: 'app-clien-details',
  templateUrl: './clien-details.component.html',
  styleUrls: ['./clien-details.component.css']
})



export class ClienDetailsComponent {
  firstName: string = '';
  lastName: string = '';
  addressType: string = '';
  streetAddress: string = '';
  suburb: string = '';
  city: string = '';
  postalCode: string = '';

  constructor(private clientService:ClientService) {
  
  }

  submitClientDetails() {
     let clientDetails = {
      first_name: this.firstName,
      last_name: this.lastName,
      address_type: this.addressType,
      street_address: this.streetAddress,
      suburb: this.suburb,
      city: this.city,
      postal_code: this.postalCode
    };

    this.clientService.createClient(<Clients>clientDetails);
    console.log('Client Details:', clientDetails);
    // You can perform further actions, such as sending the details to a server or storing in a service.
  }
}
