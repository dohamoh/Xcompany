import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { OurServicesComponent } from './components/our-services/our-services.component';
import { OurClientsComponent } from './components/our-clients/our-clients.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { AdminComponent } from './components/admin/admin.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { LoggedInGuard } from './services/logged-in.guard';
import { LoggedOutGuard } from './services/logged-out.guard';
import { IsAdminGuard } from './services/is-admin.guard';
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [
  {path:'',redirectTo:"home",pathMatch:'full'},
  {path: 'home', component:HomeComponent},
  {path: 'services', component:OurServicesComponent},
  {path: 'ourClients', component:OurClientsComponent},
  {path: 'contactUs',canActivate:[LoggedInGuard] , component:ContactUsComponent},
  {path: 'signUp',canActivate:[LoggedOutGuard], component:SignUpComponent},
  {path: 'logIn', component:LogInComponent},
  {path: 'admin',canActivate:[IsAdminGuard] , component:AdminComponent},
  {path: 'clientDetails', component:ClientDetailsComponent},
  {path: 'cart', component:CartComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
