import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { ICategoryName, ICategoryNameinput } from './model/categoryName.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CooperativeNameService extends BaseService<ICategoryName, ICategoryNameinput> {

  constructor(http: HttpClient, cookieService: CookieService) {
    super(http, 'CooperativeCategoryName', cookieService);
  }

  //Get All Coop Names
  getAllCoopName(): Observable<ICategoryName[]> {
    return this.http.get<ICategoryName[]>(`${environment.apiBaseUrl}/api/CooperativeCategoryName/all`);
  }
}
