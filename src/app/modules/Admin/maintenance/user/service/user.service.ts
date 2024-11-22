import { Injectable } from '@angular/core';
import { IGetUser, IUpdateUser } from '../models/user.model';
import { BaseService } from 'src/app/shared/services/base.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/modules/public/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<IGetUser, IUpdateUser> {

  constructor(http: HttpClient, cookieService: CookieService, authService: AuthService) {
    super(http, 'users', cookieService, authService);
  }

  getAlluser(): Observable<IGetUser[]> {
    return this.http.get<IGetUser[]>(`${environment.apiBaseUrl}/api/users/?addAuth=true`);
  }
  
}
