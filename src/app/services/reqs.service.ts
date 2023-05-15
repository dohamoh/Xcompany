import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReqsService {
  private baseUrl = 'http://localhost:3000';
  header={
    authorization: `Bearer__${localStorage.getItem('userToken')}`,
  }
  constructor(private HttpClient: HttpClient) {}
  // services
  addServices(data: any): any {
    return this.HttpClient.post(`${this.baseUrl}/services/addServices`, data);
  }
  getAllServices(): any {
    return this.HttpClient.get(`${this.baseUrl}/services/getAllServices`);
  }
  editServices(data: any): any {
    return this.HttpClient.put(`${this.baseUrl}/services/editServices`, data);
  }
  deleteService(id: any): any {
    return this.HttpClient.delete(
      `${this.baseUrl}/services/deleteService/${id}`
    );
  }

  // ----------_____________----------
  // register
  signUp(data: any): any {
    console.log(data);

    return this.HttpClient.post(`${this.baseUrl}/auth/signUp`, data);
  }
  logIn(data: any): any {
    return this.HttpClient.post(`${this.baseUrl}/auth/logIn`, data);
  }
  getUserRole(token: any): any {
    return this.HttpClient.get(`${this.baseUrl}/auth/getUserRole/${token}`);
  }
  //___________----------------______________
  //payment
  // /${authToken}  , authToken:any
  processPayment(stripeToken:any , amount:any , email:any): Observable<any> {
    return this.HttpClient.post(`${this.baseUrl}/payment/proceedPayment`, {token:stripeToken , amount , email});
  }
  //____________-----------------____________
  // client
  addClient(data: any): any {
    return this.HttpClient.post(`${this.baseUrl}/client/addClient`, data);
  }
  getAllClients(): any {
    return this.HttpClient.get(`${this.baseUrl}/client/getAllClients`);
  }



  // -------___________-------

  // user
  addToCart(id: any): any {
    let data = {
      id,
    };
    return this.HttpClient.put(`${this.baseUrl}/user/addToCart`, data, {
      headers:this.header
    });
  }
  removeFromCart(id: any): any {
    let data = {
      id,
    };
    return this.HttpClient.put(`${this.baseUrl}/user/removeFromCart`, data, {
      headers:this.header
    });
  }
  clearCart(): any {


    let token = localStorage.getItem('userToken');
    return this.HttpClient.put(`${this.baseUrl}/user/clearCart`, token, {
      headers:this.header
    });
  }

  searchUser(data:any): any {
    return this.HttpClient.post(`${this.baseUrl}/user/searchUser`, data, {
      headers:this.header
    });
  }

addAdmin(data:any): any {
    return this.HttpClient.put(`${this.baseUrl}/user/addAdmin`, data, {
      headers:this.header
    });
  }
  addSuperAdmin(data:any): any {
    return this.HttpClient.put(`${this.baseUrl}/user/addSuperAdmin`, data, {
      headers:this.header
    });
  }
  removeAdmin(data:any): any {
    return this.HttpClient.put(`${this.baseUrl}/user/removeAdmin`, data, {
      headers:this.header
    });
  }
  getAllUser(): any {
    return this.HttpClient.get(`${this.baseUrl}/user/getAllUser`);
  }



  // orders
  addOrder(data:any): any {
    return this.HttpClient.post(`${this.baseUrl}/orders/addOrder`, data, {
      headers:this.header
    });
  }
  getAllOrders(): any {
    return this.HttpClient.get(`${this.baseUrl}/orders/getAllOrders`);
  }
  updateOrderStatus(data:any): any {
    return this.HttpClient.put(`${this.baseUrl}/orders/updateOrderStatus`,data,{
      headers:this.header
    });
  }
}
