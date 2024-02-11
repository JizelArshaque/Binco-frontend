import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { MyordersComponent } from './myorders/myorders.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { OrdersComponent } from './orders/orders.component';
import { AllproductsComponent } from './allproducts/allproducts.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddItemsComponent } from './add-items/add-items.component';
import { MydetailsComponent } from './mydetails/mydetails.component';
import { HttpClientModule } from '@angular/common/http';
import { EditItemComponent } from './edit-item/edit-item.component'


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ViewProductComponent,
    WishlistComponent,
    MyordersComponent,
    CartComponent,
    CheckoutComponent,
    AdminhomeComponent,
    OrdersComponent,
    AllproductsComponent,
    PagenotfoundComponent,
    HeaderComponent,
    FooterComponent,
    AddItemsComponent,
    MydetailsComponent,
    EditItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
