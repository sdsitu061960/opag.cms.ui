import { AfterViewInit, Component } from '@angular/core';
import { LoginRequest } from './models/login-request.model';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit{

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
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.generateSnowfall();
    }, 100); // 100ms delay
  }

  generateSnowfall() {
    const snowContainer = document.getElementById('snow-container');
    
    if (snowContainer) {
      // Function to create a snowflake
      const createSnowflake = () => {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflake.textContent = '❄️'; // You can use other snowflake-like symbols

        // Randomize size
        const size = Math.random() * 1.5 + 0.5 + 'em';
        snowflake.style.fontSize = size;

        // Randomize horizontal position
        const horizontalPosition = Math.random() * 100 + '%';
        snowflake.style.left = horizontalPosition;

        // Randomize animation duration
        const fallDuration = Math.random() * 5 + 5 + 's'; // Between 5s and 10s
        const driftDuration = Math.random() * 5 + 4 + 's'; // Between 4s and 9s
        snowflake.style.animationDuration = `${fallDuration}, ${driftDuration}`;

        // Append to container
        snowContainer.appendChild(snowflake);

        // Remove snowflake after it falls
        setTimeout(() => {
          snowflake.remove();
        }, parseFloat(fallDuration) * 1000);
      };

      // Create snowflakes at intervals
      setInterval(createSnowflake, 200); // Creates a snowflake every 200ms
    } else {
      console.error("snow-container element not found");
    }
  }

  isLoading = false;

  onFormSubmit(): void {
    this.errorMessage = '';
    this.showError = false;
    this.isLoading = true;

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
          this.isLoading = false; // Stop loading after successful login
        },
        error: (error: any) => {
          // Set the error message to display in the UI
          this.errorMessage = error.message || 'An error occurred during login. Please try again.';
          this.showError = true;

          // Stop loading and hide error after a few seconds
          this.isLoading = false;
          setTimeout(() => {
            this.showError = false;
          }, 3000);
        }
      });
  }

  // onLogin() {
  //   this.isLoading = true;
    
  //   // Simulate a login process (replace with actual login logic)
  //   setTimeout(() => {
  //     this.isLoading = false;
  //     // Handle login success or failure
  //   }, 2000); // Adjust the timeout duration as needed
  // }

  // onFormSubmit(): void {
  //   this.errorMessage = '';
  //   this.showError = false;

  //   this.authService.login(this.model)
  //     .subscribe({
  //       next: (response) => {
  //         // Clear the error message
  //         this.errorMessage = '';

  //         // Set cookies, user info, and navigate to dashboard
  //         this.cookieService.set('Authorization', `Bearer ${response.token}`,
  //           undefined, '/', undefined, true, 'Strict'
  //         );

  //         this.authService.setUser({
  //           email: response.email,
  //           roles: response.roles
  //         });

  //         this.router.navigateByUrl('/admin/dashboard');
  //       },
  //       error: (error: Error) => {
  //         // Set the error message to display in the UI
  //         this.errorMessage = error.message || 'An error occurred during login. Please try again.';

  //         this.showError = true;

  //         // Hide the error message after 3 seconds
  //         setTimeout(() => {
  //           this.showError = false;
  //         }, 3000);  
  //       }
  //     });
  // }
}
