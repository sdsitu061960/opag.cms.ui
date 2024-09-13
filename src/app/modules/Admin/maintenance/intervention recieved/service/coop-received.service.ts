import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { ICoopReceived, ICoopReceivedInput } from '../model/coo-received.model';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CoopReceivedService extends BaseService<ICoopReceived, ICoopReceivedInput> {

  constructor(http: HttpClient, cookieService: CookieService) {
    super(http, 'InterventionReceived', cookieService);
  }

}
