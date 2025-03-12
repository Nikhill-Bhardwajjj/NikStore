import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject , Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { tap } from 'rxjs/operators';
import { Cart } from '../models/cart.model';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  private apiUrl = 'https://localhost:5001/api/cart';
  private cartSubject = new BehaviorSubject<Cart | null>(null);
  

  constructor(private http: HttpClient, private authService: AuthService) {
    console.log("🟢 CartService initialized!");
    this.loadCart();
  }


  private loadCart() {
    console.log(`🔄 Fetching cart...`);

    const userId = this.authService.getUserId();
    if (!userId) {
      console.warn("⚠ No User ID found, skipping cart load.");
    return;
  }

      console.log(`🔄 Fetching cart for user: ${userId}...`);
      
      const token = this.authService.getToken(); // ✅ Token fetch karo
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<Cart>(`${this.apiUrl}`, { headers }).subscribe({
      next: (cart) => {
        console.log("✅ Cart fetched successfully!", cart);
        this.cartSubject.next(cart);
      },
      error: (err) => console.error("❌ Error fetching cart:", err)
    });
  }

   
   


  addToCart(product: Product): Observable<any> {
    const userId = this.authService.getUserId();

    if (!userId) {
      console.error("❌ User ID missing, cannot add to cart.");
      return new Observable(); // Empty observable return kar raha hoon
    }

    
    

    const token = this.authService.getToken(); // ✅ Token fetch karo
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const cartItem = {
      productId: product.id,
      quantity: 1
    };

    console.log("🛒 Adding item to cart...", cartItem);



    return this.http.post(`${this.apiUrl}/add`, cartItem, { headers }).pipe(
      tap({
        next: (res) => {
          console.log("✅ Cart item added successfully!", res);
          this.loadCart(); // ✅ Backend pe add hone ke baad cart reload karo
        },
        error: (err) => console.error("❌ Error adding to cart:", err)
      })
    );
  }

  // 🔹 Cart ko observe karne ka method
  getCartItems(userId: string): Observable<Cart> {
    const token = localStorage.getItem('token'); // ✅ JWT Token fetch karo
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // ✅ Token Header me bhejo
    });

    return this.http.get<Cart>(`${this.apiUrl}/${userId}`, { headers });
  }

  removeFromCart(userId: string, cartItemId: number): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  
    return this.http.delete<any>(`${this.apiUrl}/remove/${userId}/${cartItemId}`, { headers });
  }


  updateCartItemQuantity(userId: string, cartItemId: number, quantity: number): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

  return this.http.put(`${this.apiUrl}/update-quantity/${userId}/${cartItemId}/${quantity}`, {}, { headers }).pipe(
    tap({
      next: (res) => {
        console.log("✅ Quantity updated successfully!", res);
        this.loadCart(); // Backend pe update hone ke baad cart refresh karo
      },
      error: (err) => console.error("❌ Error updating quantity:", err)
    })
  );
}

  



}