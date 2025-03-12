import { Component } from '@angular/core';
import { ProductService } from '../services/product.servie';
import { Product } from '../models/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-adminpage',
  imports: [CommonModule , FormsModule],
  templateUrl: './adminpage.component.html',
  styleUrl: './adminpage.component.css'
})
export class AdminpageComponent {

  product: Product = {
    name: '',
    price: 0,
    description: '',
    imageUrl: '',
    stock: 0,
    categoryId: 0
  };

  selectedFile: File | null = null;

  constructor(private productService: ProductService) {}


  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Read the file as Data URL (Base64)
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.product.imageUrl = e.target.result; // Save Base64 URL
      };
      reader.readAsDataURL(file);
    }
  }

  addProduct() {
    this.productService.addProduct(this.product).subscribe({
      next: (response) => {
        console.log('Product added successfully', response);
        alert('Product added successfully!');
        this.product = { name: '', price: 0, description: '', imageUrl: '', stock: 0, categoryId: 0 }; // Reset Form
      },
      error: (err) => {
        console.error('Error adding product:', err);
        alert('Failed to add product!');
      }
    });

  }

}
