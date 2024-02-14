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
  deliver:boolean=false

  getallorder(){
    this.api.getallOrderApi().subscribe({
      next:(res:any)=>{
        this.allOrder=res
        // console.log(this.allOrder);
        
      },
      error:(err:any)=>{
        Swal.fire('no Orders!')
      }
    })
  }

  changeStatus(id:any){
    const targetValue = id;
    const foundObject = this.allOrder.filter((obj:any) => obj._id === targetValue);
    foundObject.forEach((obj:any) => {
      obj.status = 'dispatched';
    });
    const item:any = foundObject[0]
    console.log(item);
    this.api.updateOrderStatus(item,id).subscribe({
      next:(res:any)=>{
        Swal.fire('Order Status Updated!')
        this.getallorder()
        this.deliver=true
      },
      error:(err:any)=>{
        Swal.fire(err.error)
      }
    })
  }

  delivered(id:any){
    const targetValue = id;
    const foundObject = this.allOrder.filter((obj:any) => obj._id === targetValue);
    foundObject.forEach((obj:any) => {
      obj.status = 'Items Delivered!';
    });
    const item:any = foundObject[0]
    console.log(item);
    this.api.updateOrderStatus(item,id).subscribe({
      next:(res:any)=>{
        Swal.fire('Order Status Updated!')
        this.getallorder()
        this.deliver=true
      },
      error:(err:any)=>{
        Swal.fire(err.error)
      }
    })


  }

}
