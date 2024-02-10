import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GserviceService {

  constructor(private http:HttpClient) {
    
   }
  

  server_url = 'http://localhost:3000'


  // registerusers

  registerApi(user:any){
    return this.http.post(`${this.server_url}/register/user`,user)
  }

  // login user
  loginApi(user:any){
    return this.http.post(`${this.server_url}/login/user`,user)
  }

  // add item

  addItemApi(item:any){
    return this.http.post(`${this.server_url}/add/item`,item)
  }
  
  // get item

  getItemApi(){
    return this.http.get(`${this.server_url}/get/items`)
  }

  
}
