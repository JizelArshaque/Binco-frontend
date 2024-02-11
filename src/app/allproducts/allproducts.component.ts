import { Component, OnInit } from '@angular/core';
import { GserviceService } from '../service/gservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-allproducts',
  templateUrl: './allproducts.component.html',
  styleUrls: ['./allproducts.component.css']
})
export class AllproductsComponent implements OnInit{
  ngOnInit(): void {
    this.getproducts()
    
  }
  constructor(private api:GserviceService){}
  allItem:any=[]

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

}
