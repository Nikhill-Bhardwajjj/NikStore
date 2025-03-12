import { Component  } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomSnackbarComponent } from '../../custom-snackbar.component';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-register',
  imports: [CommonModule , FormsModule ],
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  showModal = false; 
  user={
    fullName: '', 
    email: '', 
    password: '',
    role:''
  }; 

  errorMessage: string =''; 
  
  constructor(private router: Router, private authService: AuthService  , private toastr : ToastrService) {}


  registerUser()
  {
    this.user.role = 'user' ; 
    console.log("🟡 Registering User:", this.user);
    this.authService.registration(this.user).subscribe({
      next: (response)=>{

        console.log("✅ Registration Success:", response);
        this.showModal = true ; 
        setTimeout(() => {
          this.openLogin()
        }, 2000);
      
        

      }, 
      error: (err)=> 
      {
        
        console.error("Registration Failed:" , err);
      
      }
    });

  }

  
  

  openLogin() {
    this.showModal = false
    this.router.navigate(['/login']);
  }


}



