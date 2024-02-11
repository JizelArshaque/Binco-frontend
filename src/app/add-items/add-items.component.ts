import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GserviceService } from '../service/gservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.css']
})
export class AddItemsComponent implements OnInit{

  ngOnInit(): void {
    this.getItem()
  }

  constructor(private fb:FormBuilder,private api:GserviceService){}


  allItem:any=[]


  // itemImage:any=""

  addItemForm = this.fb.group({
    id:["",[Validators.required,Validators.pattern('[0-9]*')]],
    name:["",[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    description:["",[Validators.required]],
    price:["",[Validators.required,Validators.pattern('[0-9]*')]],
    imageUrl:["",[Validators.required]]
  })

  addItem(){
    if(this.addItemForm.valid){
      const id = this.addItemForm.value.id
      const name = this.addItemForm.value.name
      const description = this.addItemForm.value.description
      const price = this.addItemForm.value.price
      const imageUrl = this.addItemForm.value.imageUrl

      // const image = this.itemImage


      const item = {id , name , description , price , imageUrl }
      
      // console.log( item);
      this.api.addItemApi(item).subscribe({
        next:(res:any)=>{
          Swal.fire('item Added Successfully!')
          
          this.getItem()
          this.addItemForm.reset()
        },
        error:(err:any)=>{
          Swal.fire(err.error)
        }
      })      
    }else{
      Swal.fire('please check the item details and fill the form again!')
    }
  }



  getItem(){
    this.api.getItemApi().subscribe({
      next:(res:any)=>{
        this.allItem=res
      },
      error:(err:any)=>{
        console.log(err.error);
        
      }
    })
  }

  // delete item

  delete(id:any){
    this.api.deleteItemApi(id).subscribe({
      next:(res:any)=>{
        Swal.fire('Item deleted!')
        this.getItem()
      },
      error:(err:any)=>{
        Swal.fire(err.error)
      }
    })
  }

    
  



  // getImage(event:any){
  //   let fileDetail= event.target.files[0]
  //   let fr = new FileReader()

  //   fr.readAsDataURL(fileDetail)

  //   fr.onload= (event:any)=>{
  //     // console.log(event.target.result);
  //     this.itemImage=event.target.result;

      
  //   }
  // }

}
