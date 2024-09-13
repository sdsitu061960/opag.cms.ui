import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/shared/services/base.service';
import { IBarangay, IBarangayInput } from '../model/barangay.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class BarangayService extends BaseService<IBarangay, IBarangayInput> {

  constructor(http: HttpClient, cookieService: CookieService) {
    super(http, 'barangay', cookieService);
  }

  //Custom Service below

}
