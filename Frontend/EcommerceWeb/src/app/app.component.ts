import { Component, OnInit  , ChangeDetectorRef} from '@angular/core';
import {Router ,  RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/auth.service';






@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {

  menuOpen = false; 
  user: any = null ; 
  constructor(private router: Router , private authService : AuthService , private cdr: ChangeDetectorRef) {}
  
  

  ngOnInit()
  {
    console.log("✅ AppComponent Initialized");

    this.authService.getUserObservable().subscribe(user=>{
      this.user = user;
      console.log("🔹 User Updated in Header:", this.user);
      this.cdr.detectChanges(); 

    }); 
    this.user = this.authService.getUser(); 
    console.log("🔹 Page Reload User Data:", this.user);

    console.log('user role is = ' , this.user.role );


    if(this.user)
    {
      if(this.user.role =='Admin')
        {
          this.router.navigate(['/adminpage']); 
        }
        else{
          this.router.navigate([''])
        }
      }
        else{
          this.router.navigate(['/login'])
        }
      
    }

    isLoginPage(): boolean {
      return this.router.url === '/login' || this.router.url === '/register';
    }
  
  openHome()
  {
    if(this.user.role =='Admin')
    {
      console.log("navigating to admin  page beacuse admin home is this")
      this.router.navigate(['/adminpage'])
    }
    else{
    console.log("🏠 Navigating to Home");
    this.router.navigate([""])
    }
  }

  openLogin() {
    console.log("🔑 Navigating to Login");
    this.router.navigate(['/login']);
  }

  openRegister() {
    console.log("📝 Navigating to Register");
    this.router.navigate(['/register']);
  }

  openCart()
  {
    console.log("🛒 Navigating to Cart");
    this.router.navigate(['/cart'])
  }

  openOrder()
  {
    console.log("🛒 Navigating to Cart");
    this.router.navigate(['/order'])
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    console.log("🔄 Menu Toggle:", this.menuOpen);
  }

  logout()
  {
    console.log("🚪 Logging Out...");
    this.authService.logout(); 
    this.cdr.detectChanges();
    this.user = null; 
    console.log("🔹 User after logout:", this.user);
    this.router.navigate(['/login']);
  }




  title = 'EcommerceWeb';
}
