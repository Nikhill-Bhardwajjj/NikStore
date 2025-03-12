import { Component , OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Product } from '../models/product.model';
import { Cart } from '../models/cart.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule , FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent  implements OnInit{
  showModal = false ; 
  cart: Cart | null = null;
  userId: string | null = null;

  cartItems: Product[] = [];


  

  constructor(private cartService: CartService   
    , private authService: AuthService
     , private orderService: OrderService 
    , private router: Router ) {}

  ngOnInit() {
    this.userId = this.authService.getUserId(); 
    if(this.userId)
    {
      this.cartService.getCartItems(this.userId).subscribe({
        next: (items: any) => {
          console.log('🛒 Cart Items:', items);
             this.cart = items;
             this.cartItems = items.cartItems;
          console.log('cart Item' , this.cartItems)
          
  
        },
        error: (err) => console.error('❌ Error fetching cart', err)
      });

    }
    else {
      console.error('❌ User not logged in');
    }
    
  }

  getTotalPrice(): number {
    return this.cart?.cartItems?.reduce((sum, item) => sum + (item.product.price * item.quantity), 0) || 0;
  }

  removeItem(cartItemId: number) {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('User not logged in');
      return;
    }
    this.cartService.removeFromCart(userId, cartItemId).subscribe({
      next: (response) => {
          console.log("✅ Item removed successfully!", response);
          this.reloadCart(); // Cart update karne ke liye
      },
      error: (err) => {
          console.error("❌ Error removing item:", err);
      }
  });

}

reloadCart() {
  if (this.userId) {
      this.cartService.getCartItems(this.userId).subscribe({
          next: (items: any) => {
              console.log('🔄 Cart reloaded:', items);
              this.cart = items;
          },
          error: (err) => console.error('❌ Error reloading cart', err)
      });
  }
}

placeOrder() {
  if (!this.cart) {
    alert('❌ Cart is empty!');
    return;
  }

  this.orderService.placeOrder(this.cart).subscribe({
    next: (response) => {
      console.log('✅ Order placed successfully:', response);
      
      this.cart = null; // 🛑 Order hone ke baad cart clear kar diya
      this.showModal = true ; 
    },
    error: (err) => {
      console.error('❌ Error placing order:', err);
      alert('❌ Order failed, please try again.');
    }
  });
}

increaseQuantity(item: any) {
  if (!this.userId) {
    alert("User not logged in");
    return;
  }

  this.cartService.updateCartItemQuantity(this.userId, item.id, item.quantity + 1).subscribe({
    next: (updatedCart) => {
      console.log("✅ Quantity increased successfully!", updatedCart);
      this.reloadCart();
    },
    error: (err) => console.error("❌ Error increasing quantity:", err)
  });
}

decreaseQuantity(item: any) {
  if (!this.userId) {
    alert("User not logged in");
    return;
  }

  if (item.quantity > 1) {
    this.cartService.updateCartItemQuantity(this.userId, item.id, item.quantity - 1).subscribe({
      next: (updatedCart) => {
        console.log("✅ Quantity decreased successfully!", updatedCart);
        this.reloadCart();
      },
      error: (err) => console.error("❌ Error decreasing quantity:", err)
    });
  } else {
    this.removeItem(item.id); // Agar quantity 1 hai, to remove item call kar denge
  }
}


openHome(){
this.showModal =false ; 
  this.router.navigate([''])

}


openOrder(){
  this.showModal = false ; 

  this.router.navigate(['/order'])

}



}












