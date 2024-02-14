import { Component, OnInit } from '@angular/core';
import { GserviceService } from '../service/gservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit{
  ngOnInit(): void {
    this.getallorder()
  }

  constructor(private api:GserviceService){}

  allOrder:any=[]

  getallorder(){
    this.api.getallOrderApi().subscribe({
      next:(res:any)=>{
        this.allOrder=res
        console.log(this.allOrder);
        
      },
      error:(err:any)=>{
        Swal.fire('no Orders!')
      }
    })
  }

  changeStatus(id:any){
    
    
  }

}
