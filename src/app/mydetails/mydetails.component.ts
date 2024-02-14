import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GserviceService } from '../service/gservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mydetails',
  templateUrl: './mydetails.component.html',
  styleUrls: ['./mydetails.component.css']
})
export class MydetailsComponent implements OnInit{

  ngOnInit(): void {
    this.getdetails()
  }

  constructor(private router:Router,private api:GserviceService){}
  details:any=[]

  getdetails(){
    const ue = sessionStorage.getItem("email")
    // console.log(ue);
    
    this.api.getuserdetsApi(ue).subscribe({
      next:(res:any)=>{
        this.details=res[0]
        console.log('wowo',this.details);
        
      },
      error:(err:any)=>{
        Swal.fire('Please login again!')
        // this.logout()
      }
    })
  }

  logout(){
    sessionStorage.removeItem("username")
    sessionStorage.removeItem("token")
    this.router.navigateByUrl("")
  }
}
