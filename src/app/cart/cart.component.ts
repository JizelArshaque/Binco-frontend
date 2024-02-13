import { Component, OnInit } from '@angular/core';
import { GserviceService } from '../service/gservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  ngOnInit(): void {
    this.getCart()
    
    
  }

  constructor(private api:GserviceService){}
  

  allItem:any = []
  total:number=0

  getCart(){
    this.api.getcartApi().subscribe({
      next:(res:any)=>{
        this.allItem = res
        if(this.allItem){
          this.grandtotal()
        }
        // console.log(this.allItem);
        
      },
      error:(err:any)=>{
        Swal.fire(err.error)
      }
    })
  }

  grandtotal(){
    if(this.allItem){
      this.total = this.allItem.map((item:any)=>item.TotalPrice).reduce((n1:any,n2:any)=>n1+n2)
    }

    // this.total=Math.ceil(this.products.map((item:any)=>item.grandtotal).reduce((n1:any,n2:any)=>n1+n2))
  }

  remove(id:any){
    this.api.removecartitemApi(id).subscribe({
      next:(res:any)=>{
        Swal.fire('Item removed from cart!')
        this.getCart()
        this.grandtotal()
        
      },
      error:(err:any)=>{
        Swal.fire(err.error)
      }
    })

    
  }

  incrementq(id:any){
    this.api.incrementcartQApi(id).subscribe({
      next:(res:any)=>{
        this.getCart()
        this.grandtotal()
      },
      error:(err:any)=>{
        Swal.fire('could not increment !')
      }
    })
  }

  decrementq(id:any){
    this.api.decrementcartQapi(id).subscribe({
      next:(res:any)=>{
        this.getCart()
        this.grandtotal()
      },
      error:(err:any)=>{
        Swal.fire('could not increment !')
      }
    })
  }

  emptycart(){
    this.api.cartGoneApi().subscribe({
      next:(res:any)=>{
      // Swal.fire(res)
      this.getCart()
    },
    error:(err:any)=>{
      // Swal.fire(err.error)
    }
  })
  }

}
