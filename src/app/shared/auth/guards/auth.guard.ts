import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { InvokeFunctionExpr } from '@angular/compiler';
import { AuthService } from 'src/app/modules/public/services/auth.service';
import { jwtDecode } from "jwt-decode"


// Helper function to check if the token is expired
function isTokenExpired(token: string): boolean {
  const decodedToken: any = jwtDecode(token);
  const expirationDate = decodedToken.exp * 1000; // Convert to milliseconds
  const currentTime = new Date().getTime();
  return expirationDate < currentTime;
}

// The Auth Guard Function
export const authGuard: CanActivateFn = (route, state) => {

  const cookieService = inject(CookieService);
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.getUser();  // Get user from the AuthService

  // Check for JWT token in cookies
  let token = cookieService.get('Authorization');

  if (token && user) {
    // Clean the token
    token = token.replace('Bearer ', '');

    // Check if the token is expired
    if (isTokenExpired(token)) {
      // Logout the user if token has expired
      authService.logout();
      return router.createUrlTree(['/'], { queryParams: { returnUrl: state.url } });
    }

    // If the token is valid, check if user has the required role for this route
    const requiredRole = route.data['requiredRole'] || 'Writer'; // Default role to 'Writer'
    
    if (user.roles.includes(requiredRole)) {
      return true;  // User has the right role, allow access
    } else {
      alert('Unauthorized access attempt.🥱🤭');
      // Redirect to unauthorized page or show appropriate message
      return router.createUrlTree(['/']);
    }

  } else {
    // If no token or no user found, logout and redirect to login/admin page
    authService.logout();
    return router.createUrlTree(['/admin'], { queryParams: { returnUrl: state.url } });
  }
};
