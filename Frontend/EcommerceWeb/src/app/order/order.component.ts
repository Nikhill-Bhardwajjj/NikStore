import { Component , OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { AuthService } from '../auth/auth.service';
import { ProductService } from '../services/product.servie';
import { CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface OrderItem {
  productId: number;
  quantity: number;
  product?: Product; // Product data assign karne ke liye optional field
}

interface Product {
  name: string;
  imageUrl: string;
  price: number;
}

interface Order {
  userId: string;
  items: OrderItem[];
  totalPrice: number;
  shippingAddress: string | null;
  paymentMethod: string;
}

@Component({
  selector: 'app-order',
  imports: [CommonModule , FormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {

  orders: any[] = [];
  userId: string | null = null;
  expandedOrderIndex: number | null = null;
  

  

  constructor(private orderService: OrderService ,
     private authService: AuthService,
     private productService: ProductService
   )
    { }

    ngOnInit() {
      this.userId = this.authService.getUserId();
      if (this.userId) {
        this.orderService.getOrdersByUser(this.userId).subscribe({
          next: (data: Order[]) => {
            console.log('📦 Orders Data:', JSON.stringify(data, null, 2)); // Debug response
            this.orders = data;
            this.fetchProductDetails();
          },
          error: (err) => {
            console.error('❌ Error fetching orders:', err);
          },
        });
      } else {
        console.error('❌ User not logged in');
      }
    }
  
    fetchProductDetails() {
      this.orders.forEach((order) => {
        order.items.forEach((item: OrderItem) => {
          this.productService.getProductById(item.productId).subscribe({
            next: (product: Product) => {
              item.product = product; // Product data assign kar rahe hain
            },
            error: (err) => {
              console.error(`❌ Error fetching product ${item.productId}:`, err);
            },
          });
        });
      });
    }
  

    toggleOrderDetails(index: number) {
      this.expandedOrderIndex = this.expandedOrderIndex === index ? null : index;
    }
  }