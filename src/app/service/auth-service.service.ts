import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }

  islogged(){
    return !!sessionStorage.getItem("username")

  }
}
