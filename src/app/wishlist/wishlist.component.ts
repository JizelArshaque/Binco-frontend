import { Component, OnInit } from '@angular/core';
import { GserviceService } from '../service/gservice.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit{
  constructor(private api:GserviceService,private router:Router){}
  ngOnInit(): void {
    this.getWishlist()
  }

  items:any = []

  getWishlist(){
    this.api.getWishlisApi().subscribe({
      next:(res:any)=>{
        this.items=res
        console.log(this.items);
        
      },
      error:(err:any)=>{
        Swal.fire(err.error)
      }
    })
  }

  delete(id:any){
    this.api.removeWishlistApi(id).subscribe({
      next:(res:any)=>{
        // Swal.fire('Item Removed From Wishlist!')
        this.getWishlist()
      },
      error:(err:any)=>{
        Swal.fire(err.error)
      }
    })

  }

  cartItem(item:any){
    if(sessionStorage.getItem("token")){
      console.log(item);
      this.api.addToCartApi(item).subscribe({
        next:(res:any)=>{
          Swal.fire('Item Added To cart!')
          this.delete(item._id)
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
