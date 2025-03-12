import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule , FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], // "styleUrl" → "styleUrls"
 
})
export class LoginComponent {

  email: string = '';  //  Variables ko define kiya
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {} // Constructor class ke andar rakha

  login() {
    
    const credentials = { email: this.email, password: this.password };
    
    const userData = { email: this.email, password: this.password }; //  userData define kiya
     this.authService.login(credentials).subscribe(
      (response: any) => {
        localStorage.setItem('token', response.token);  // ✅ Token Store
        const user = this.decodeToken(response.token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('role' , response.user.role);
        console.log(user.role)
        console.log(response.user.role)
        if (response.user.role === 'Admin') {
          this.router.navigate(['/adminpage']);
        } else {
          this.router.navigate(['']);
        }
      },
      (error) => {
        this.errorMessage = 'Invalid email or password';
      }
    );
  }

  decodeToken(token: string) {
    const payload = JSON.parse(atob(token.split('.')[1])); // ✅ Decode Token
    return {
      email: payload.email,
      fullName: payload.FullName || '',
      role: payload.Role || ''
    };
  }

  openRegister() {
    this.router.navigate(['/register']);
  }
}
