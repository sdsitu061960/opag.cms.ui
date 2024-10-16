import { Injectable } from '@angular/core';
import { ICommodity, ICommodityinput } from '../model/commodity.model';
import { BaseService } from 'src/app/shared/services/base.service';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/modules/public/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CommodityService extends BaseService<ICommodity, ICommodityinput> {

  constructor(http: HttpClient, cookieService: CookieService, authService: AuthService) {
    super(http, 'Commodity', cookieService, authService);
  }
}
