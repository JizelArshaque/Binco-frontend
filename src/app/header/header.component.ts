import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  ngOnInit(): void {
    
    if(sessionStorage.getItem("username")){
      this.header()
    }
    
  }

  constructor(private router:Router){}

 


  username:any = sessionStorage.getItem("username")
  show:boolean=false
  
  header(){
    if(this.username){
      this.show =true
    }else{
      this.show=false

    }
  }

 

  

}
