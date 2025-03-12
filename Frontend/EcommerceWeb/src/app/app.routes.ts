import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CartComponent } from './cart/cart.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { OrderComponent } from './order/order.component';
import { AuthGuard } from './auth.gaurd';
import { AdminGuard } from './admin.guard';

export const routes: Routes = [

    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
        { path: 'login', component: LoginComponent   },
        { path: 'register', component: RegisterComponent  },
        {path: 'cart' , component:CartComponent ,  canActivate: [AuthGuard] },
        {path: 'adminpage' , component:AdminpageComponent ,  canActivate: [AdminGuard]},
        {path: 'order' , component:OrderComponent ,  canActivate: [AuthGuard] }, 
        { path: '**', redirectTo: '/login', pathMatch: 'full' } 
      
];
