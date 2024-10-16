import { Component } from '@angular/core';
import { LoginRequest } from './models/login-request.model';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  model: LoginRequest;
  errorMessage: string = ''; 
  showError: boolean = false; 

  constructor(private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) {
    this.model = {
      email: '',
      password: ''
    };

  }

  // onFormSubmit(): void {
  //   this.authService.login(this.model)
  //     .subscribe({
  //       next: (response) => {
  //         //set auth service
  //         this.cookieService.set('Authorization', `Bearer ${response.token}`,
  //           undefined, '/', undefined, true, 'Strict'
  //         );


  //         //set user from local strorage
  //         this.authService.setUser({
  //           email: response.email,
  //           roles: response.roles
  //         });

  //         //Redirect back
  //         this.router.navigateByUrl('/admin/dashboard');
  //       }
  //     })
  // }

  onFormSubmit(): void {
    this.errorMessage = '';
    this.showError = false;

    this.authService.login(this.model)
      .subscribe({
        next: (response) => {
          // Clear the error message
          this.errorMessage = '';

          // Set cookies, user info, and navigate to dashboard
          this.cookieService.set('Authorization', `Bearer ${response.token}`,
            undefined, '/', undefined, true, 'Strict'
          );

          this.authService.setUser({
            email: response.email,
            roles: response.roles
          });

          this.router.navigateByUrl('/admin/dashboard');
        },
        error: (error: Error) => {
          // Set the error message to display in the UI
          this.errorMessage = error.message || 'An error occurred during login. Please try again.';

          this.showError = true;

          // Hide the error message after 3 seconds
          setTimeout(() => {
            this.showError = false;
          }, 3000);  
        }
      });
  }
}
