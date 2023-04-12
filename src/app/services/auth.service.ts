import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:3000/auth'

  constructor(private HttpClient:HttpClient) { }

  signUp(data:any):any {
   return this.HttpClient.post(`${this.baseUrl}/signUp` , data)
  }
}
