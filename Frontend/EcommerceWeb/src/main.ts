import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), // HTTP requests ke liye
    provideRouter(routes), // Routing ke liye
    importProvidersFrom(FormsModule) , 
    provideAnimations(), // ✅ Required for animations
    provideToastr({ // ✅ Toastr global settings
      positionClass: 'toast-top-right',
      timeOut: 3000,
      closeButton: true,
      progressBar: true
    })
  ]
}).catch((err) => console.error(err));
