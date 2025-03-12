import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const authToken = authService.getToken();

    if (authToken) {
        // Token ko request headers me add karna
        const clonedReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${authToken}`
          }
        });
    
        return next(clonedReq);
      }
    
      return next(req);
    };