import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Clients } from 'src/app/models/clients.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  userId: number = 0;
  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  getClienProfile(client: number){
    return this.http.get<Clients>(this.baseApiUrl+'/api/Client?clientId='+client);
  }

  getClienProfileByName(client: string){
    return this.http.get<Clients>(this.baseApiUrl+'/api/Client/GetClientByname?clientName='+client);
    //return this.user;
  }  

  setClienId(clientId:number){
    this.userId = clientId;
  }

  getClienId(){
    return this.userId;
  }

  createClient(client:Clients){
    const data = JSON.stringify(client);
    //console.log('The founded: ', data);

    

    //***** */

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
 
    return this.http.post<Clients>(this.baseApiUrl+'/api/Client/RegisterClient', client, httpOptions)
      .subscribe(
        response => {
          console.log('Response:', response);
        },
        error => {
          console.error('Error:', error);
        }
      );
  }
}
