import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GserviceService } from '../service/gservice.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private fb:FormBuilder,private api:GserviceService,private router:Router){}

  loginForm = this.fb.group({
    email:["",[Validators.email,Validators.required]],
    password:["",[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })



  login(){

    if(this.loginForm.valid){
        const email = this.loginForm.value.email
        const password = this.loginForm.value.password

        const user = {email,password}

        this.api.loginApi(user).subscribe({
          next:(res:any)=>{
            console.log(res);
            sessionStorage.setItem("token",res.token)
            sessionStorage.setItem("username",res.existingUser.username)

            
            if(res.existingUser.email== "admin@binco.com"){
              Swal.fire('Hello Admin!')
              this.router.navigateByUrl('/admin/home')
            }else{
              Swal.fire('login Successfull')
              this.router.navigateByUrl("/allproduct")
            }
          },
          error:(err:any)=>{
            Swal.fire(err.error)
            console.log(err);
            
          }
        })
      }else{
        Swal.fire('invalid Input! Please try again!')
      }
    }

  

}
