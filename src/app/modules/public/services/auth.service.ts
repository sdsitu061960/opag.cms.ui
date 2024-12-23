import { Injectable } from '@angular/core';
import { LoginRequest } from '../login/login/models/login-request.model';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { LoginResponse } from '../login/login/models/login-response.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { User } from '../login/login/models/user.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  $user = new BehaviorSubject<User | undefined>(undefined);

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiBaseUrl}/api/auth/login`, {
      email: request.email,
      password: request.password
    }).pipe(
      tap((response: LoginResponse) => {
        // Set the token in cookies or localStorage

        let t = 'Bearer ' + response.token;

        this.cookieService.set('Authorization', t, { path: '/' });
        // Optionally set it in localStorage if you need to access it there
        localStorage.setItem('token', t);
        // Set the user after successful login
        const user: User = {
          email: response.email,
          roles: response.roles
        };
        this.setUser(user);
      }),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Something went wrong. Please try again.';
        if (error.status === 400 && error.error?.errors) {
          const validationErrors = error.error.errors;
          if (validationErrors[''] && validationErrors[''].length > 0) {
            errorMessage = validationErrors[''][0];
          }
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  setUser(user: User): void {
    this.$user.next(user);
    // Store user info in local storage
    localStorage.setItem('user-email', user.email);
    localStorage.setItem('user-roles', user.roles.join(','));
  }

  user(): Observable<User | undefined> {
    return this.$user.asObservable();
  }

  getUser(): User | undefined {
    const email = localStorage.getItem('user-email');
    const roles = localStorage.getItem('user-roles');

    if (email && roles) {
      const user: User = {
        email: email,
        roles: roles.split(',')
      }
      return user;
    }
    return undefined;
  }

  logout(): void {
    localStorage.clear();
    this.cookieService.delete('Authorization', '/');
    this.$user.next(undefined);
  }
}


// export class AuthService {

//   $user = new BehaviorSubject<User | undefined>(undefined);

//   constructor(private http: HttpClient, private cookieService: CookieService) { }

//   // login(request: LoginRequest): Observable<LoginResponse> {
//   //   return this.http.post<LoginResponse>(`${environment.apiBaseUrl}/api/auth/login`,
//   //     {
//   //       email: request.email,
//   //       password: request.password
//   //     }
//   //   );
//   // } 

//   login(request: LoginRequest): Observable<LoginResponse> {
//     return this.http.post<LoginResponse>(`${environment.apiBaseUrl}/api/auth/login`, {
//       email: request.email,
//       password: request.password
//     }).pipe(
//       catchError((error: HttpErrorResponse) => {
//         // Extract the error message
//         let errorMessage = 'Something went wrong. Please try again.';
//         if (error.status === 400 && error.error?.errors) {
//           const validationErrors = error.error.errors;
//           if (validationErrors[''] && validationErrors[''].length > 0) {
//             errorMessage = validationErrors[''][0];  // This will capture "Email or Password Incorrect"
//           }
//         }
//         return throwError(() => new Error(errorMessage));
//       })
//     );
//   }


//   setUser(user: User): void {

//     this.$user.next(user);
//     //Local stroage
//     localStorage.setItem('user-email', user.email);
//     localStorage.setItem('user-roles', user.roles.join(','));
//   }

//   //can subcricbe
//   user(): Observable<User | undefined> {
//     return this.$user.asObservable();
//   }

//   getUser(): User | undefined {
//     const email = localStorage.getItem('user-email');
//     const roles = localStorage.getItem('user-roles');

//     if (email && roles) {
//       const user: User = {
//         email: email,
//         roles: roles.split(',')
//       }

//       return user;
//     }
//     return undefined;
//   }


//   logout(): void {
//     localStorage.clear();
//     //Delete Jwt Token
//     this.cookieService.delete('Authorization', '/');
//     this.$user.next(undefined);
//   }
// }
