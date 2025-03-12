import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { BehaviorSubject , Observable } from 'rxjs';
import { tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://localhost:5001/api/Auth'; 
  private userSubject = new BehaviorSubject<any>(this.getUser());

  constructor(private http: HttpClient ) {}

  login(credentials: any): Observable<any> {
    console.log("🟡 Attempting Login with Credentials:", credentials);
    return this.http.post(`${this.baseUrl}/login`, credentials).pipe(
      tap((response: any) => {
        console.log("✅ Login Response:", response);
        console.log("✅ User Object:", response.user);
        console.log("✅ Token:", response.token);
        console.log("✅ User Email:", response.user.email);
        console.log("✅ User Role:", response.user.role);
        if (response.token) {
          localStorage.setItem('token', response.token);


         
          
            localStorage.setItem('user', JSON.stringify(response.user)); // ✅ Store user with role
            localStorage.setItem('userId' , response.user.id);
            console.log('user id is : - ' , response.user.id);
            localStorage.setItem('role', response.user.role);
            this.userSubject.next(response.user); // ✅ Update UI
            console.log("🟢 Token & User Saved:", response.user);
          
          
          
        }
      })
    );
  }  

  getUserRole()
  {
    return   localStorage.getItem('role');
    
  }

  registration(userData: any):Observable<any>{
    console.log("Attempting to Register a user with this userData" , userData); 

    return this.http.post(`${this.baseUrl}/register` , userData).pipe(
      tap((response: any)=>{
        console.log("✅ Registration Successful:", response);
      
            
      })
    );
  }
  

  getUserId(): string | null {
    const user = this.getUser();
    const userId  = localStorage.getItem('userId')
    console.log("🔹 Fetched User Object:", user);
    console.log("🔹 Fetched User ID:", userId);  // 🛑 Debug ID
  
    if (userId==null) {
      console.error("❌ User ID is missing in localStorage!");
    }
  
    return userId
  }
  
  logout() {
    console.log("🔴 Clearing Token & User Data...");
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role'); 
    localStorage.removeItem('userId')
    this.userSubject.next(null); // ✅ Update UI
  }

  getToken() {
    const token = localStorage.getItem('token');
    console.log("🔹 Fetched Token:", token);
    return token;
  }

  getUser() {
    const userData = localStorage.getItem('user');
    console.log("🔹 Fetched User Data:", userData);
    const user =  userData ? JSON.parse(userData) : null;

    if (user && !user.role) {
      user.role = this.getRole(); // ✅ Agar role missing hai toh localStorage se le lo
    }
  
    console.log("🔹 Fetched User Data:", user);
    return user;

  }
  getRole()
  {
    const  role = localStorage.getItem('role');
    console.log("🔹 Fetched User role:", role);
    return role ;

  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    const user = this.getUser();
    const role = this.getRole();
    const loggedIn = !!token && user !== null;
    
    console.log("🔹 Is User Logged In?", loggedIn);
    return loggedIn;
  }
  

  getUserObservable() {
    return this.userSubject.asObservable();
  }
}