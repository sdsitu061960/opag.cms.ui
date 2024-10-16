import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { IRegisteredWith, IRegisteredWithInput } from '../model/registered-with.model';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/modules/public/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RegisteredWithService extends BaseService<IRegisteredWith, IRegisteredWithInput> {

  constructor(http: HttpClient, cookieService: CookieService, authService: AuthService) {
    super(http, 'RegisteredWith', cookieService, authService);
  }
}
