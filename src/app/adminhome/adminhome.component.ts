import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GserviceService } from '../service/gservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements OnInit{
  ngOnInit(): void {
    this.getcounts()
  }

  constructor(private router:Router,private api:GserviceService){}
  allOrder:any=[]
  totalAmount:number=0
  orderNumber:number=0



  logout(){
    sessionStorage.removeItem("username")
    sessionStorage.removeItem("token")
    this.router.navigateByUrl("")
  }



  getcounts(){
    this.api.getallOrderApi().subscribe({
      next:(res:any)=>{
        this.allOrder=res
        console.log(this.allOrder);
        const totalPrice: number = this.allOrder.reduce((acc:number, order:any) => acc + order.GTotal, 0);
        const length = this.allOrder.length
        this.orderNumber=length

       this.totalAmount=totalPrice
        
        
      },
      error:(err:any)=>{
        Swal.fire('no Orders!')
      }
    })
  }

}
