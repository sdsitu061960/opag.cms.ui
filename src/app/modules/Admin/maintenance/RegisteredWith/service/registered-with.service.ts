import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { IRegisteredWith, IRegisteredWithInput } from '../model/registered-with.model';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class RegisteredWithService extends BaseService<IRegisteredWith, IRegisteredWithInput> {

  constructor(http: HttpClient, cookieService: CookieService) {
    super(http, 'RegisteredWith', cookieService);
  }
}
