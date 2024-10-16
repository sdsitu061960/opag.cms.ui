import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { ICooperativeType, ICooperativeTypeInput } from '../module/cooperative-type.model';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/modules/public/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CooperativeTypeService extends BaseService<ICooperativeType, ICooperativeTypeInput> {

  constructor(http: HttpClient, cookieService: CookieService, authService: AuthService) {
    super(http, 'CooperativeType', cookieService, authService);
  }

  //Get All Coop Type 
  getAllCoopType(): Observable<ICooperativeType[]> {
    return this.http.get<ICooperativeType[]>(`${environment.apiBaseUrl}/api/CooperativeType/all`)
  }
}
