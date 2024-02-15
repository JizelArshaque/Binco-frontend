import { Component, OnInit } from '@angular/core';
import { GserviceService } from '../service/gservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyordersComponent implements OnInit{
  constructor(private api:GserviceService){}
  ngOnInit(): void {
    this.getmyorders()
    this.username=sessionStorage.getItem("username")
    
  }
  username:any=""
  allOrder:any=[]
   getmyorders(){
    this.api.getOrderApi().subscribe({
      next:(res:any)=>{
        this.allOrder=res
        // console.log(this.allOrder);
        
      },
      error:(err:any)=>{
        Swal.fire('no orders!')
      }
    })
   }
}
