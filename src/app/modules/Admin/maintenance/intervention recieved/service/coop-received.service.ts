import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { ICoopReceived, ICoopReceivedInput } from '../model/coo-received.model';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/modules/public/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CoopReceivedService extends BaseService<ICoopReceived, ICoopReceivedInput> {

  constructor(http: HttpClient, cookieService: CookieService, authService: AuthService) {
    super(http, 'InterventionReceived', cookieService, authService);
  }

}
