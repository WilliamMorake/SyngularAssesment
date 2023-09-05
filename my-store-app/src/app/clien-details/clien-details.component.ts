import { Component } from '@angular/core';
import { ClientService } from '../Services/client.service';
import { Clients } from '../models/clients.model';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { SuccessComponent } from '../success/success.component';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-clien-details',
  templateUrl: './clien-details.component.html',
  styleUrls: ['./clien-details.component.css']
})



export class ClienDetailsComponent {
  firstNameInputError: string = '';

  firstName: string = '';
  lastName: string = '';
  addressType: string = '';
  streetAddress: string = '';
  suburb: string = '';
  city: string = '';
  postalCode: string = '';
  errorMessage: string = '';

  registeredClient: any;
  modalRef: MdbModalRef<SuccessComponent> | null = null;

  constructor(private clientService:ClientService, private login:LoginComponent, private router:Router, private modalService: MdbModalService) {
  
  }

  submitClientDetails(form: NgForm) {

    if (form.valid) {
      // Form is valid, you can proceed with submitting the data
      let clientDetails = {
        first_name: this.firstName,
        last_name: this.lastName,
        address_type: this.addressType,
        street_address: this.streetAddress,
        suburb: this.suburb,
        city: this.city,
        postal_code: this.postalCode
      };
  
      this.clientService.setFirstName(this.firstName);
      this.clientService.createClient(<Clients> clientDetails);
      
      console.log('Client Details:', clientDetails);
      this.openModal();
    } else {
      // Form is invalid, display error messages or handle as needed
      this.errorMessage = 'Form is invalid, please fill in all the fields';
    }
  }

  openModal() {
    this.modalRef = this.modalService.open(SuccessComponent, {
      modalClass: 'modal-dialog-centered'
    });
  }
}
