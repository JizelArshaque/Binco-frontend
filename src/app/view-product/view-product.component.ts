import { Component, OnInit } from '@angular/core';
import { GserviceService } from '../service/gservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit{
  ngOnInit(): void {
    this.route.params.subscribe((res:any)=>{
      const id=res.id
      console.log(id);
      this.getItem(id)      
    })
  }

  constructor(private api:GserviceService, private route:ActivatedRoute,private router:Router){}

  item:any={}

  getItem(id:any){
    this.api.getsingleItemApi(id).subscribe({
      next:(res:any)=>{
        this.item=res[0]
        console.log(this.item);
        
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
