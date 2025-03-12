import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import {Product} from '../models/product.model'; 
import { ProductService } from '../services/product.servie';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [RouterModule , CommonModule] 
})
export class HomeComponent implements OnInit {
  showModel = false;
  products: Product[] = [];
  filteredProducts: Product[] = []; 
  showModal: boolean = false;
  selectedCategory: string = 'All'; 

  constructor(private router: Router  , 
    private authService: AuthService , 
    private productService: ProductService , 
    private cartService: CartService) {}

  ngOnInit() {
    // 🔹 Agar user login nahi hai, to login page pe bhej do

    this.fetchProducts(); 

    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  fetchProducts()
  {
    this.productService.getProducts().subscribe({
      next: (data)=>
      {
        this.products = data;
        this.filterProducts();
      },

      error:(err)=>{
        console.error('Error in fetching products', err); 
      }
    });
  }

  filterProducts() {
    if (this.selectedCategory === 'All') {
      this.filteredProducts = this.products;
    } else if (this.selectedCategory === 'UpperWear') {
      this.filteredProducts = this.products.filter(p => p.categoryId === 3);
    } else if (this.selectedCategory === 'BottomWear') {
      this.filteredProducts = this.products.filter(p => p.categoryId === 2);
    } else if (this.selectedCategory === 'Shoes') {
      this.filteredProducts = this.products.filter(p => p.categoryId === 1);
    }
  }

  setCategory(category: string) {
    this.selectedCategory = category;
    this.filterProducts();
  }




  checkLogin(product :Product)
  {
    console.log("🔹 Checking if user is logged in...");

   
    
   
    if (!this.authService.isLoggedIn()) {
      // 🔹 Agar login nahi hai, to modal show karo
      this.showModal = true;
    } else {
      // 🔹 Agar login hai, to cart pe bhej do
      this.cartService.addToCart(product).subscribe({
        next: () => {
          console.log("✅ Item added successfully, now navigating to cart...");
           this.showModal = true ; 
        //  this.router.navigate(['/cart']);
        },
        error: (err) => console.error("❌ Error in adding to cart:", err)
      });
    }
  }
    

    navigateToCart() {
      this.showModal = false;
      this.router.navigate(['/cart']);
    }

    navigateToHome() {
      this.showModal = false;
      this.router.navigate(['']);
    }

  

}
