import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { InvokeFunctionExpr } from '@angular/compiler';
import { AuthService } from 'src/app/modules/public/services/auth.service';
import { jwtDecode } from "jwt-decode"

export const authGuard: CanActivateFn = (route, state) => {

  const cookieService = inject(CookieService);
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.getUser();

  //check for JWT token
  let token = cookieService.get('Authorization');

  if (token && user) {
    //Clean the token
    token = token.replace('Bearer ', '');
    const decodedToken: any = token = jwtDecode(token);

    //check if token is expired
    const expirationDate = decodedToken.exp * 1000;
    const currentTime = new Date().getTime();

    if (expirationDate < currentTime) {
      //Logout
      authService.logout();
      return router.createUrlTree(['/'], { queryParams: { returnUrl: state.url } });
    } else {
      //Token is still valid
      if (user.roles.includes('Writer')) {
        return true;
      } else {
        alert('Unauthorized');
        console.log('Unauthorized');
        return false;
      }

    }
  } else {
    //Logout
    authService.logout();
    return router.createUrlTree(['/admin'], { queryParams: { returnUrl: state.url } });
  }

  return true;
};
