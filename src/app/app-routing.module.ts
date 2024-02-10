import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AllproductsComponent } from './allproducts/allproducts.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { MyordersComponent } from './myorders/myorders.component';
import { OrdersComponent } from './orders/orders.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AddItemsComponent } from './add-items/add-items.component';
import { MydetailsComponent } from './mydetails/mydetails.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'allproduct',component:AllproductsComponent},
  {path:'viewproduct/:id',component:ViewProductComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'cart',component:CartComponent},
  {path:'wishlist',component:WishlistComponent},
  {path:'checkout',component:CheckoutComponent},
  {path:'admin/home',component:AdminhomeComponent},
  {path:'myorders',component:MyordersComponent},
  {path:'orders',component:OrdersComponent},
  {path:'add/item',component:AddItemsComponent},
  {path:'account/mydetails',component:MydetailsComponent},
  {path:'**',component:PagenotfoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
