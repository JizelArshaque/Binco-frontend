import { Component, OnInit } from '@angular/core';
import { GserviceService } from '../service/gservice.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-allproducts',
  templateUrl: './allproducts.component.html',
  styleUrls: ['./allproducts.component.css']
})
export class AllproductsComponent implements OnInit{
  ngOnInit(): void {
    this.getproducts()
    this.username = sessionStorage.getItem("username")
    
  }
  constructor(private api:GserviceService,private router:Router){}
  username:any=""
  allItem:any=[]
  p:number=0
  searchkey:any=""

  getproducts(){
    this.api.getItemApi().subscribe({
      next:(res:any)=>{
        this.allItem=res

      },
      error:(err:any)=>{
        Swal.fire(err.error)
      }
    })
  }



  wishlistItem(item:any){
    if(sessionStorage.getItem("token")){
      this.api.wishlistApi(item).subscribe({
        next:(res:any)=>{
          Swal.fire('item added to wishlist')
        },
        error:(err:any)=>{
          Swal.fire(err.error)
        }
      })
    }else{
      Swal.fire('please login First!')
      this.router.navigateByUrl('/login')
    }
    
  }


  cartItem(item:any){
    if(sessionStorage.getItem("token")){
      console.log(item);
      
      this.api.addToCartApi(item).subscribe({
        next:(res:any)=>{
          Swal.fire('Item Added To cart!')
        },
        error:(err:any)=>{
          Swal.fire('could not add to cart at the moment! please try after some time!')
        }
      })
    }else{
      Swal.fire('please login First!')
      this.router.navigateByUrl('/login')
    }
    
  }

}
