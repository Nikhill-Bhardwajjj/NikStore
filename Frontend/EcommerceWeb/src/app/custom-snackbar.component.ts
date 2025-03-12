import { Component, Inject, AfterViewInit, Renderer2, ElementRef } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { NgClass } from '@angular/common'; 
@Component({
  selector: 'app-custom-snackbar',
  standalone: true, // ✅ Standalone component hai
  imports: [NgClass],
  template: `
    <div [ngClass]="data.type" class=" app-custom-snackbar flex items-center px-4 py-2 rounded-full  text-white " >
      <span class="font-medium">{{ data.message }}</span>
    </div>
  `,


  
  


  
})
export class CustomSnackbarComponent implements AfterViewInit {
    constructor(
      @Inject(MAT_SNACK_BAR_DATA) public data: { message: string , type: string },
      private renderer: Renderer2,
      private el: ElementRef
    ) {}
  
    ngAfterViewInit() {
      const snackBarContainer = this.el.nativeElement.closest('.mat-mdc-snack-bar-container');
      if (snackBarContainer) {
        this.renderer.setStyle(snackBarContainer, 'background', 'transparent');
        this.renderer.setStyle(snackBarContainer, 'box-shadow', 'none');
        this.renderer.setStyle(snackBarContainer, 'padding', '0');
      }
    }
  }