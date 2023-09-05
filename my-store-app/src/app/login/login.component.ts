import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import the Router service
import { ClientService } from 'src/app/Services/client.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  loggedinClient: any;

  constructor(private router:Router, private clientService:ClientService){}

  onLogin() {
    // Get name 
    this.loggedinClient = this.clientService.getClienProfileByName(this.username).subscribe(
      response => {
        this.loggedinClient = response;
        if (this.username === this.loggedinClient.first_name) {
          // Successful login
          this.router.navigate(['/store-landing'], {queryParams: {data:JSON.stringify(this.loggedinClient)}});
          // Redirect to another page or perform other actions
        }
      },
      error => {
        this.errorMessage = "User not found! Please register.";

        console.error('Error:', error);
      }      
    );
  }

}
