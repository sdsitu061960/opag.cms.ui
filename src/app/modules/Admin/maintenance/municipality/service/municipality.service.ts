import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { IMunicipality, IMunicipalityInput } from '../model/municipality';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/modules/public/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MunicipalityService extends BaseService<IMunicipality, IMunicipalityInput> {

  constructor(http: HttpClient, cookieService: CookieService, authService: AuthService) {
    super(http, 'municipality', cookieService, authService);
  }

  //get all muni
  getAllMunicipalities(): Observable<IMunicipality[]> {
    return this.http.get<IMunicipality[]>(`${environment.apiBaseUrl}/api/Municipality/all`);
  }
}
