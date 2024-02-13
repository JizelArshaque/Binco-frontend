import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GserviceService {

  constructor(private http:HttpClient) {
    
   }
  

  server_url = 'http://localhost:3000'


  addTokenToheaders(){
    let headers = new HttpHeaders()
    const token = sessionStorage.getItem("token")

    if(token){
      headers = headers.append('Authorization',`Bearer ${token}`)
    }

    return{headers}
  }


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

  // addtowishlist
  wishlistApi(product:any){
    return this.http.post(`${this.server_url}/add/wishlist`,product,this.addTokenToheaders())
  }

  // get item wihslis

  getWishlisApi(){
    return this.http.get(`${this.server_url}/getwishlist/items`,this.addTokenToheaders())
  }

  // remove from wishlist

  removeWishlistApi(id:any){
    return this.http.delete(`${this.server_url}/remove/wishlistItem/${id}`,this.addTokenToheaders())
  }
  

  // add to cart

  addToCartApi(item:any){
    return this.http.post(`${this.server_url}/cart/item`,item,this.addTokenToheaders())
  }
  
  // getcart

  getcartApi(){
    return this.http.get(`${this.server_url}/getcart/item`,this.addTokenToheaders())
  }

  // remove cart item

  removecartitemApi(id:any){
    return this.http.delete(`${this.server_url}/removecart/item/${id}`)
  }

  // increment quantity
  incrementcartQApi(id:any){
    return this.http.get(`${this.server_url}/quantityInc/${id}`)
  }

  // decrement quantity
  decrementcartQapi(id:any){
    return this.http.get(`${this.server_url}/quantityDec/${id}`)
  }

  cartGoneApi(){
    return this.http.delete(`${this.server_url}/cart/empty`,this.addTokenToheaders())
  }

  // order creation
  createOrderApi(item:any){
    return this.http.post(`${this.server_url}/order/creation`,item,this.addTokenToheaders())
  }
}
