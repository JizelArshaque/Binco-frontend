import { Component, OnInit } from '@angular/core';
import { GserviceService } from '../service/gservice.service';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private api:GserviceService, private route:ActivatedRoute){}

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



}
