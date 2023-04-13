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

const routes: Routes = [
  {path:'',redirectTo:"home",pathMatch:'full'},
  {path: 'home', component:HomeComponent},
  {path: 'services', component:OurServicesComponent},
  {path: 'ourClients', component:OurClientsComponent},
  {path: 'contactUs', component:ContactUsComponent},
  {path: 'signUp', component:SignUpComponent},
  {path: 'logIn', component:LogInComponent},
  {path: 'admin', component:AdminComponent},
  {path: 'clientDetails', component:ClientDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
