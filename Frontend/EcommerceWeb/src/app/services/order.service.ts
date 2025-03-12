// order.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart.model';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'https://localhost:5001/api/orders'; // Backend API URL

  constructor(private http: HttpClient) {}

  // Place Order
  placeOrder(cart: Cart): Observable<any> {
    console.log("🛒 Placing Order..."); // Step 1

    if (!cart || !cart.cartItems || cart.cartItems.length === 0) {
      console.error("❌ Cart is empty or undefined!", cart);
      return new Observable(observer => {
        observer.error("Cart is empty!");
      });
    }

    const orderData = {
      userId: cart.userId,
      items: cart.cartItems.map(item => {
        console.log("📦 Adding item:", item); // Step 2: Check each item
        return {
          productId: item.product.id,
          quantity: item.quantity
        };
      }),
      totalPrice: cart.cartItems.reduce((sum, item) => {
        const itemTotal = item.product.price * item.quantity;
        console.log(`💰 Calculating Price: ${item.product.name} - ${itemTotal}`);
        return sum + itemTotal;
      }, 0),
      shippingAddress: {
        street: '123 Main St',
        city: 'New Delhi',
        state: 'Delhi',
        zipCode: '110001'
      },
      paymentMethod: 'CreditCard'
    };

    console.log("📤 Sending Order Data:", orderData); // Step 3: Final Order Data Check


      
    return this.http.post(`${this.apiUrl}/place`, orderData);
  }

  // Get Orders by User
  getOrdersByUser(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`);
  }

  // Remove Order
  removeOrder(orderId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/remove/${orderId}`);
  }
}
