import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReqsService {
  private baseUrl = 'http://localhost:3000';
  constructor(private HttpClient:HttpClient) { }
  // services
  addServices(data: any): any {
      return this.HttpClient.post(`${this.baseUrl}/services/addServices`, data);
    }
    getAllServices(): any {
      return this.HttpClient.get(`${this.baseUrl}/services/getAllServices`);
    }
    editServices(data:any): any {
      return this.HttpClient.put(`${this.baseUrl}/services/editServices`,data);
    }
    deleteService(id:any): any {
      return this.HttpClient.delete(`${this.baseUrl}/services/deleteService/${id}`);
    }

    // ----------_____________----------
}
