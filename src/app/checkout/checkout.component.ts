import { Component, OnInit } from '@angular/core';
import { GserviceService } from '../service/gservice.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, Validators } from '@angular/forms';
import { IPayPalConfig,ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
  ngOnInit(): void {
    this.getinvoice()
    this.initConfig();
  }

  public payPalConfig ? : IPayPalConfig;


  constructor(private api:GserviceService,private router:Router , private fb:FormBuilder){}

  checkoutForm = this.fb.group({
    fullname :["",[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    place :["",[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    phone:["",[Validators.required,Validators.pattern('[0-9]*')]],
    pincode:["",[Validators.required,Validators.pattern('[0-9]*')]]

  })

  

  allItem:any=[]
  GrandTotal:number=0
  makePayment:boolean=false
  payment:boolean=false

  getinvoice(){
    
      this.api.getcartApi().subscribe({
        next:(res:any)=>{
          this.allItem = res
          this.grandtotal()
          // console.log(this.allItem);
          
        },
        error:(err:any)=>{
          Swal.fire('Cartempty?')
        }
      })
    
  }
  grandtotal(){
    this.GrandTotal = this.allItem.map((item:any)=>item.TotalPrice).reduce((n1:any,n2:any)=>n1+n2)

    // this.total=Math.ceil(this.products.map((item:any)=>item.grandtotal).reduce((n1:any,n2:any)=>n1+n2))
  }
  confirm(){
    if(this.checkoutForm.valid){
      this.makePayment=true
    }else{
      Swal.fire('please fill the form properly!')
    }
    
  }

  cancel(){
    this.makePayment=false

  }

  makePaymentF(){
   this.payment=true
    
  }

  goBack(){
    this.checkoutForm.reset()
    this.router.navigateByUrl('/cart')
  }

  emptycart(){
    this.api.cartGoneApi().subscribe({
      next:(res:any)=>{
      // Swal.fire(res)
      // this.getCart()
    },
    error:(err:any)=>{
      // Swal.fire(err.error)
    }
  })
  }

  ordercreation(){
    const fullname = this.checkoutForm.value.fullname
    const place =  this.checkoutForm.value.place
    const phone =  this.checkoutForm.value.phone
    const pincode =  this.checkoutForm.value.pincode

    const GTotal = this.GrandTotal 
    

    const items:any = this.allItem 

    const currentDate = new Date();
    const dateString = currentDate.toString();
    const status = `Order placed`
    // console.log(dateString);  

    const order = { fullname, place , phone, pincode, GTotal, dateString,status }
    console.log(order);

    this.api.createOrderApi(order).subscribe({
      next:((res:any)=>{
        Swal.fire('ordercreated')
      }),
      error:(err:any)=>{
        Swal.fire(err.error)
      }
    })


    

    

  }
 

private initConfig(): void {
    this.payPalConfig = {
        currency: 'USD',
        clientId: 'sb',
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: `${this.GrandTotal}`,
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: `${this.GrandTotal}`
                        }
                    }
                },
               
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then((details:any) => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });

        },
        // successfull payment
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            this.emptycart()
            this.router.navigateByUrl('/allproduct')
            Swal.fire('payment successfull!')
            this.ordercreation()

        },
        // payment canceled
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
            Swal.fire('payment failed!')
            

        },
        // error in payment
        onError: err => {
            console.log('OnError', err);
            
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
            
        }
    };
}
}


