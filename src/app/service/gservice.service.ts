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

  // delete item

  deleteItemApi(id:any){
    return this.http.delete(`${this.server_url}/delete/item/${id}`)
  }

  // single item to update
  
  getsingleItemApi(id:any){
    return this.http.get(`${this.server_url}/getsingle/item/${id}`)
  }
  
  // update item
  updateAPi(item:any,id:any){
    return this.http.put(`${this.server_url}/update/item/${id}`,item)
  }

  
}
