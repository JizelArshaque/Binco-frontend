import { Component, OnInit } from '@angular/core';
import { GserviceService } from '../service/gservice.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit{
  ngOnInit(): void {
    this.route.params.subscribe((res:any)=>{
      const id=res.id
      console.log(id);
      this.getsingleItem(id)      
    })
  }

  constructor(private api:GserviceService, private route:ActivatedRoute,private fb:FormBuilder,private router:Router){}

  Item:any={}

  // edititemform = this.fb.group({
  //   id:["",[Validators,Validators.pattern('[0-9]*')]],
  //   name:["",[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
  //   description:["",[Validators.required]],
  //   price:["",[Validators.required,Validators.pattern('[0-9]*')]],
  //   imageUrl:["",[Validators.required]]
  // })




  update(id:any){
    // console.log(this.Item);
    // console.log(id);
    
    this.api.updateAPi(this.Item,id).subscribe({
      next:(res:any)=>{
        Swal.fire('update Scuccessful!')
        this.getsingleItem(this.Item.id)
        this.router.navigateByUrl('/add/item')
      },
      error:(err:any)=>{
        Swal.fire(err.error)
      }
    })
    
    
  }
  
  

  getsingleItem(id:any){
    this.api.getsingleItemApi(id).subscribe({
      next:(res:any)=>{
        this.Item=res[0]
        console.log(this.Item);
        
      },
      error:(err:any)=>{
        Swal.fire(err.error)
      }
    })
  }

  cancel(id:any){
    this.getsingleItem(id)
    this.router.navigateByUrl('/add/item')
  }



}
